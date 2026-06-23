import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole, RoleHierarchy, ErrorCodes } from '../constants';

type OwnershipResolver = (request: Record<string, unknown>) => string;

@Injectable()
export class OwnershipGuard implements CanActivate {
  private static readonly BYPASS_ROLES = [UserRole.SUPER_ADMIN, UserRole.CONTENT_ADMIN];
  private static resolvers = new Map<string, OwnershipResolver>();

  static register(resource: string, resolver: OwnershipResolver): void {
    OwnershipGuard.resolvers.set(resource, resolver);
  }

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException({
        errorCode: ErrorCodes.AUTH_FORBIDDEN,
        message: 'Authentication required',
      });
    }

    const userRole = user.role as UserRole;
    if (OwnershipGuard.BYPASS_ROLES.includes(userRole)) return true;

    const resourceType = this.reflector.getAllAndOverride<string>('resourceType', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!resourceType) return true;

    const resolver = OwnershipGuard.resolvers.get(resourceType);
    if (!resolver) return true;

    const ownerId = resolver(request);
    if (ownerId !== user.userId) {
      throw new ForbiddenException({
        errorCode: ErrorCodes.RESOURCE_FORBIDDEN,
        message: `You do not own this ${resourceType}`,
      });
    }

    return true;
  }
}
