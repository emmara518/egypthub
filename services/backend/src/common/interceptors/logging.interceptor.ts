import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const userId = request.user?.userId ?? 'anonymous';
    const now = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse();
          this.logger.log(`${method} ${url} ${response.statusCode} ${Date.now() - now}ms`, {
            userId,
            duration: Date.now() - now,
          });
        },
        error: (error: Error) => {
          this.logger.error(`${method} ${url} ${error.message} ${Date.now() - now}ms`, {
            userId,
            duration: Date.now() - now,
            error: error.message,
          });
        },
      }),
    );
  }
}
