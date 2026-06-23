import {
  Controller,
  Post,
  Body,
  Req,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { CurrentUser, Public } from '../../../common/decorators';

import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshDto } from '../dto/refresh.dto';
import { LogoutDto } from '../dto/logout.dto';
import { MfaSetupDto } from '../dto/mfa-setup.dto';
import { MfaVerifyDto } from '../dto/mfa-verify.dto';
import {
  AuthResponseDto,
  AuthTokensDto,
  MfaSetupResponseDto,
} from '../dto/user-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @Throttle({ default: { limit: 3, ttl: 3600000 } })
  @ApiOperation({ summary: 'Register a new user account' })
  async register(
    @Body() dto: RegisterDto,
    @Req() req: Request,
  ): Promise<AuthResponseDto> {
    const ip = req.ip ?? req.socket.remoteAddress ?? '0.0.0.0';
    const agent = req.headers['user-agent'];
    return this.authService.register(dto, ip, agent);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 300000 } })
  @ApiOperation({ summary: 'Authenticate with email and password' })
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
  ): Promise<AuthResponseDto> {
    const ip = req.ip ?? req.socket.remoteAddress ?? '0.0.0.0';
    const agent = req.headers['user-agent'];
    return this.authService.login(dto, ip, agent);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  async refresh(
    @Body() dto: RefreshDto,
    @Req() req: Request,
  ): Promise<AuthTokensDto> {
    const ip = req.ip ?? req.socket.remoteAddress ?? '0.0.0.0';
    const agent = req.headers['user-agent'];
    return this.authService.refresh(dto.refreshToken, ip, agent);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Revoke current session' })
  async logout(@Body() dto: LogoutDto): Promise<void> {
    return this.authService.logout(dto.refreshToken);
  }

  @Post('mfa/setup')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Initialize MFA setup (TOTP or SMS)' })
  async setupMfa(
    @CurrentUser('userId') userId: string,
    @Body() dto: MfaSetupDto,
  ): Promise<MfaSetupResponseDto> {
    return this.authService.setupMfa(userId, dto.method);
  }

  @Post('mfa/verify')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Verify and enable MFA with TOTP code' })
  async verifyMfa(
    @CurrentUser('userId') userId: string,
    @Body() dto: MfaVerifyDto,
  ): Promise<{ message: string }> {
    await this.authService.verifyAndEnableMfa(userId, dto.code, 'totp');
    return { message: 'MFA enabled successfully' };
  }

  @Post('mfa/disable')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Disable MFA for current user' })
  async disableMfa(@CurrentUser('userId') userId: string): Promise<void> {
    return this.authService.disableMfa(userId);
  }
}
