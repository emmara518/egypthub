import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppConfigService } from './app.config';
import { DatabaseConfigService } from './database.config';
import { RedisConfigService } from './redis.config';
import { AuthConfigService } from './auth.config';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
  ],
  providers: [
    AppConfigService,
    DatabaseConfigService,
    RedisConfigService,
    AuthConfigService,
  ],
  exports: [
    AppConfigService,
    DatabaseConfigService,
    RedisConfigService,
    AuthConfigService,
  ],
})
export class ConfigModule {}
