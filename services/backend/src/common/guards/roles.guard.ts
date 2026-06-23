import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole, RoleHierarchy, ErrorCodes } from '../constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException({
        errorCode: ErrorCodes.AUTH_FORBIDDEN,
        message: 'Authentication required',
      });
    }

    const userRole = user.role as UserRole;
    const userLevel = RoleHierarchy[userRole];

    if (userLevel === undefined) {
      throw new ForbiddenException({
        errorCode: ErrorCodes.AUTH_FORBIDDEN,
        message: `Unknown role: ${userRole}`,
      });
    }

    const hasAccess = requiredRoles.some((requiredRole) => {
      const requiredLevel = RoleHierarchy[requiredRole];
      return userLevel >= requiredLevel;
    });

    if (!hasAccess) {
      throw new ForbiddenException({
        errorCode: ErrorCodes.AUTH_FORBIDDEN,
        message: `Insufficient role level. Required: ${requiredRoles.join(' or ')}`,
      });
    }

    return true;
  }
}
