import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
  constructor(private readonly configService: ConfigService) {}

  get jwtAccessSecret(): string {
    return this.configService.getOrThrow<string>('JWT_ACCESS_SECRET');
  }

  get jwtRefreshSecret(): string {
    return this.configService.getOrThrow<string>('JWT_REFRESH_SECRET');
  }

  get jwtAccessExpiry(): string {
    return this.configService.get<string>('JWT_ACCESS_EXPIRY', '15m');
  }

  get jwtRefreshExpiry(): string {
    return this.configService.get<string>('JWT_REFRESH_EXPIRY', '7d');
  }

  get jwtIssuer(): string {
    return this.configService.get<string>('JWT_ISSUER', 'egypthub-api');
  }

  get jwtAudience(): string {
    return this.configService.get<string>('JWT_AUDIENCE', 'egypthub-client');
  }
}
