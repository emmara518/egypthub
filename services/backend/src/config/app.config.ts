import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('PORT', 4000);
  }

  get apiPrefix(): string {
    return this.configService.get<string>('API_PREFIX', 'api/v1');
  }

  get corsOrigins(): string[] {
    return (
      this.configService
        .get<string>('CORS_ORIGINS', 'http://localhost:3000')
        ?.split(',') ?? ['http://localhost:3000']
    );
  }

  get logLevel(): string {
    return this.configService.get<string>('LOG_LEVEL', 'info');
  }

  get requestTimeoutMs(): number {
    return this.configService.get<number>('REQUEST_TIMEOUT_MS', 30000);
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV', 'development');
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }
}
