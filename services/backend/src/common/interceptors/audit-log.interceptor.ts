import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../../database/prisma/prisma.service';

const AUDIT_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuditLogInterceptor.name);

  constructor(private readonly prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip } = request;
    const userId = request.user?.userId;

    if (!userId || !AUDIT_METHODS.includes(method)) {
      return next.handle();
    }

    const resource = request.route?.path ?? url.split('?')[0];
    const resourceId = request.params?.id;

    return next.handle().pipe(
      tap({
        next: () => {
          this.writeAuditLog({
            userId,
            action: `${method}_${resource.split('/').pop()}`,
            resource,
            resourceId,
            ipAddress: ip,
            userAgent: request.headers['user-agent'],
          }).catch((err: Error) => this.logger.warn(`Audit log write failed: ${err.message}`));
        },
      }),
    );
  }

  private async writeAuditLog(params: {
    userId: string;
    action: string;
    resource: string;
    resourceId?: string;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<void> {
    await this.prisma.auditLog.create({
      data: {
        userId: params.userId,
        action: params.action,
        resource: params.resource,
        resourceId: params.resourceId,
        ipAddress: params.ipAddress,
        userAgent: params.userAgent,
        metadata: {},
      },
    });
  }
}
