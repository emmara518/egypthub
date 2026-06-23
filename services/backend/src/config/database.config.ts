import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  get url(): string {
    return this.configService.getOrThrow<string>('DATABASE_URL');
  }

  get poolMin(): number {
    return this.configService.get<number>('DATABASE_POOL_MIN', 2);
  }

  get poolMax(): number {
    return this.configService.get<number>('DATABASE_POOL_MAX', 10);
  }
}
