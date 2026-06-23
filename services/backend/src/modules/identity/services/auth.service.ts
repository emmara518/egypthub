import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { PasswordService } from '../../../common/services/password.service';
import { UserService } from './user.service';
import { SessionService } from './session.service';
import { MfaService } from './mfa.service';
import { AuthConfigService } from '../../../config';
import { ErrorCodes } from '../../../common/constants';

import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { AuthResponseDto, UserResponseDto, AuthTokensDto, MfaSetupResponseDto } from '../dto/user-response.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly sessionService: SessionService,
    private readonly mfaService: MfaService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly authConfig: AuthConfigService,
  ) {}

  async register(dto: RegisterDto, ipAddress: string, userAgent?: string): Promise<AuthResponseDto> {
    const { hash: passwordHash, algorithm: passwordAlgo } = await this.passwordService.hash(dto.password);

    const user = await this.userService.createUser(dto, passwordHash, passwordAlgo);

    await this.prisma.passwordHistory.create({
      data: {
        userId: user.userId,
        passwordHash,
        passwordAlgo,
      },
    });

    const session = await this.sessionService.createSession(user.userId, ipAddress, userAgent);
    const tokens = await this.generateTokens(user, session.sessionId);

    return { user, tokens };
  }

  async login(dto: LoginDto, ipAddress: string, userAgent?: string): Promise<AuthResponseDto> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException({
        errorCode: ErrorCodes.AUTH_CREDENTIALS_INVALID,
        message: 'Invalid email or password',
      });
    }

    if (user.deletedAt || user.status === 'suspended') {
      throw new UnauthorizedException({
        errorCode: ErrorCodes.AUTH_UNAUTHORIZED,
        message: 'Account is disabled',
      });
    }

    const isLocked = await this.userService.isAccountLocked(user.userId);
    if (isLocked) {
      throw new UnauthorizedException({
        errorCode: ErrorCodes.AUTH_ACCOUNT_LOCKED,
        message: 'Account is temporarily locked due to too many failed attempts',
      });
    }

    const isValid = await this.passwordService.verify(dto.password, user.passwordHash, user.passwordAlgo);
    if (!isValid) {
      await this.userService.incrementFailedAttempts(user.userId);
      throw new UnauthorizedException({
        errorCode: ErrorCodes.AUTH_CREDENTIALS_INVALID,
        message: 'Invalid email or password',
      });
    }

    if (user.mfaEnabled) {
      if (!dto.mfaCode) {
        throw new UnauthorizedException({
          errorCode: ErrorCodes.AUTH_MFA_REQUIRED,
          message: 'MFA code is required',
        });
      }

      const mfaValid = user.mfaMethod === 'totp'
        ? this.mfaService.verifyTotp(user.mfaSecret!, dto.mfaCode)
        : await this.mfaService.verifyBackupCode(user.userId, dto.mfaCode);

      if (!mfaValid) {
        throw new UnauthorizedException({
          errorCode: ErrorCodes.AUTH_MFA_REQUIRED,
          message: 'Invalid MFA code',
        });
      }
    }

    const needsRehash = await this.passwordService.needsRehash(user.passwordAlgo);
    if (needsRehash) {
      const { hash: newHash, algorithm: newAlgo } = await this.passwordService.rehash(dto.password);
      await this.prisma.user.update({
        where: { userId: user.userId },
        data: { passwordHash: newHash, passwordAlgo: newAlgo },
      });
    }

    await this.userService.updateLastLogin(user.userId);
    const session = await this.sessionService.createSession(user.userId, ipAddress, userAgent);
    const userProfile = await this.userService.getUserProfile(user.userId);
    const tokens = await this.generateTokens(userProfile, session.sessionId);

    return { user: userProfile, tokens };
  }

  async refresh(refreshToken: string, ipAddress: string, userAgent?: string): Promise<AuthTokensDto> {
    const session = await this.sessionService.rotateSession(refreshToken, ipAddress, userAgent);
    if (!session) {
      throw new UnauthorizedException({
        errorCode: ErrorCodes.AUTH_TOKEN_INVALID,
        message: 'Invalid or revoked refresh token',
      });
    }

    const user = await this.userService.getUserProfile(session.sessionId);
    const tokens = await this.generateTokens(user, session.sessionId);
    return tokens;
  }

  async logout(refreshToken: string): Promise<void> {
    await this.sessionService.revokeSession(refreshToken);
  }

  async setupMfa(userId: string, method: 'totp' | 'sms'): Promise<MfaSetupResponseDto> {
    const user = await this.userService.getUserProfile(userId);

    if (method === 'totp') {
      const { secret, qrCodeUrl, backupCodes } = await this.mfaService.generateTotpSecret(userId, user.email);
      return { secret, qrCodeUrl, method, backupCodes };
    }

    return { method, backupCodes: [] };
  }

  async verifyAndEnableMfa(
    userId: string,
    code: string,
    method: string,
    secret?: string,
  ): Promise<void> {
    const setupData = await this.mfaService['redis'].get(`mfa:setup:${userId}`);
    if (!setupData) {
      throw new UnauthorizedException({
        errorCode: ErrorCodes.AUTH_MFA_REQUIRED,
        message: 'MFA setup not initiated. Call setup first.',
      });
    }

    const { secret: storedSecret, backupCodes } = JSON.parse(setupData);

    if (method === 'totp') {
      const isValid = this.mfaService.verifyTotp(storedSecret, code);
      if (!isValid) {
        throw new UnauthorizedException({
          errorCode: ErrorCodes.AUTH_MFA_REQUIRED,
          message: 'Invalid TOTP code',
        });
      }
      await this.mfaService.enableMfa(userId, storedSecret, method, backupCodes);
    }
  }

  async disableMfa(userId: string): Promise<void> {
    await this.mfaService.disableMfa(userId);
  }

  private async generateTokens(user: UserResponseDto, sessionId: string): Promise<AuthTokensDto> {
    const payload = {
      sub: user.userId,
      email: user.email,
      role: user.role,
      sessionId,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.authConfig.jwtAccessSecret,
      expiresIn: this.authConfig.jwtAccessExpiry,
      issuer: this.authConfig.jwtIssuer,
      audience: this.authConfig.jwtAudience,
    });

    const refreshToken = 'stored-via-session';
    const expiresIn = this.parseExpiryToSeconds(this.authConfig.jwtAccessExpiry);

    return {
      accessToken,
      refreshToken,
      expiresIn,
    };
  }

  private parseExpiryToSeconds(expiry: string): number {
    const match = expiry.match(/^(\d+)([smhd])$/);
    if (!match) return 900;
    const value = parseInt(match[1], 10);
    switch (match[2]) {
      case 's': return value;
      case 'm': return value * 60;
      case 'h': return value * 3600;
      case 'd': return value * 86400;
      default: return 900;
    }
  }
}
