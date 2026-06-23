import { Reflector } from '@nestjs/core';
import { ForbiddenException } from '@nestjs/common';
import { RolesGuard } from '../../../../src/common/guards/roles.guard';
import { UserRole } from '../../../../src/common/constants';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: jest.Mocked<Reflector>;

  const createMockContext = (userRole?: UserRole) => ({
    switchToHttp: () => ({
      getRequest: () => ({
        user: userRole ? { userId: 'user-1', role: userRole } : undefined,
      }),
    }),
    getHandler: () => ({}),
    getClass: () => ({}),
  });

  beforeEach(() => {
    reflector = {
      getAllAndOverride: jest.fn(),
      getAllAndMerge: jest.fn(),
      get: jest.fn(),
    } as unknown as jest.Mocked<Reflector>;

    guard = new RolesGuard(reflector);
  });

  it('should allow access when no roles required', () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);
    const result = guard.canActivate(createMockContext(UserRole.TRAVELER) as any);
    expect(result).toBe(true);
  });

  it('should allow TRAVELER to access TRAVELER route', () => {
    reflector.getAllAndOverride.mockReturnValue([UserRole.TRAVELER]);
    const result = guard.canActivate(createMockContext(UserRole.TRAVELER) as any);
    expect(result).toBe(true);
  });

  it('should allow SUPER_ADMIN to access any route', () => {
    reflector.getAllAndOverride.mockReturnValue([UserRole.TRAVELER]);
    const result = guard.canActivate(createMockContext(UserRole.SUPER_ADMIN) as any);
    expect(result).toBe(true);
  });

  it('should deny TRAVELER access to SUPER_ADMIN route', () => {
    reflector.getAllAndOverride.mockReturnValue([UserRole.SUPER_ADMIN]);
    expect(() =>
      guard.canActivate(createMockContext(UserRole.TRAVELER) as any),
    ).toThrow(ForbiddenException);
  });

  it('should allow MARKETING to access MARKETING route', () => {
    reflector.getAllAndOverride.mockReturnValue([UserRole.MARKETING]);
    const result = guard.canActivate(createMockContext(UserRole.MARKETING) as any);
    expect(result).toBe(true);
  });
});
