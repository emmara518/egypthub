import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { AppConfigService } from '../../config';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        pinoHttp: {
          level: config.logLevel,
          transport:
            !config.isProduction
              ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'SYS:standard' } }
              : undefined,
          serializers: {
            req: (req: Record<string, unknown>) => ({
              method: req.method,
              url: req.url,
              requestId: req.id,
            }),
            res: (res: Record<string, unknown>) => ({
              statusCode: res.statusCode,
            }),
          },
          redact: {
            paths: ['req.headers.authorization', 'req.headers.cookie', 'body.password', 'body.token'],
            censor: '***',
          },
        },
      }),
    }),
  ],
})
export class LoggerModule {}
