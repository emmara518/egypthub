import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import { RedisService } from '../../../infrastructure/redis/redis.service';
import { PrismaService } from '../../../database/prisma/prisma.service';

@Injectable()
export class MfaService {
  private readonly logger = new Logger(MfaService.name);
  private readonly appName: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly configService: ConfigService,
  ) {
    this.appName = this.configService.get<string>('APP_NAME', 'EgyptHub');
  }

  async generateTotpSecret(
    userId: string,
    email: string,
  ): Promise<{ secret: string; qrCodeUrl: string; backupCodes: string[] }> {
    const secret = speakeasy.generateSecret({
      name: `${this.appName}:${email}`,
      issuer: this.appName,
    });

    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!);
    const backupCodes = this.generateBackupCodes();

    await this.redis.set(
      `mfa:setup:${userId}`,
      JSON.stringify({ secret: secret.base32, backupCodes }),
      300000,
    );

    return {
      secret: secret.base32,
      qrCodeUrl,
      backupCodes,
    };
  }

  verifyTotp(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 1,
    });
  }

  async enableMfa(
    userId: string,
    secret: string,
    method: string,
    backupCodes: string[],
  ): Promise<void> {
    await this.prisma.user.update({
      where: { userId },
      data: {
        mfaEnabled: true,
        mfaSecret: secret,
        mfaMethod: method,
      },
    });

    await this.redis.set(
      `mfa:backup:${userId}`,
      JSON.stringify(backupCodes),
      2592000000,
    );
  }

  async disableMfa(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { userId },
      data: {
        mfaEnabled: false,
        mfaSecret: null,
        mfaMethod: null,
      },
    });

    await this.redis.del(`mfa:backup:${userId}`);
    await this.redis.del(`mfa:setup:${userId}`);
  }

  async verifyBackupCode(userId: string, code: string): Promise<boolean> {
    const data = await this.redis.get(`mfa:backup:${userId}`);
    if (!data) return false;

    const codes: string[] = JSON.parse(data);
    const index = codes.indexOf(code);
    if (index === -1) return false;

    codes.splice(index, 1);
    await this.redis.set(`mfa:backup:${userId}`, JSON.stringify(codes));
    return true;
  }

  async isMfaRequired(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { userId },
      select: { mfaEnabled: true },
    });
    return user?.mfaEnabled ?? false;
  }

  async sendSmsCode(phone: string): Promise<string> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await this.redis.set(`mfa:sms:${phone}`, code, 300000);
    return code;
  }

  async verifySmsCode(phone: string, code: string): Promise<boolean> {
    const stored = await this.redis.get(`mfa:sms:${phone}`);
    if (!stored || stored !== code) return false;
    await this.redis.del(`mfa:sms:${phone}`);
    return true;
  }

  private generateBackupCodes(): string[] {
    const codes: string[] = [];
    for (let i = 0; i < 8; i++) {
      const code = Array.from({ length: 10 }, () =>
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(
          Math.floor(Math.random() * 36),
        ),
      ).join('');
      codes.push(code);
    }
    return codes;
  }
}
