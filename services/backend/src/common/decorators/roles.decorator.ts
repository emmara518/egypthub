import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../constants';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
export type Role = UserRole;
