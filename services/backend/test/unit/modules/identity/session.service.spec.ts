import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../src/database/prisma/prisma.service';
import { RedisService } from '../../../../src/infrastructure/redis/redis.service';
import { SessionService } from '../../../../src/modules/identity/services/session.service';
import { AuthConfigService } from '../../../../src/config';

describe('SessionService', () => {
  let service: SessionService;
  let prismaMock: Record<string, any>;
  let redisMock: Record<string, any>;

  beforeEach(async () => {
    prismaMock = {
      session: {
        create: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
        count: jest.fn(),
      },
      $connect: jest.fn(),
      $disconnect: jest.fn(),
      $transaction: jest.fn(),
      $queryRawUnsafe: jest.fn(),
    };

    redisMock = {
      set: jest.fn(),
      get: jest.fn(),
      del: jest.fn(),
      getClient: jest.fn().mockReturnValue({
        pipeline: jest.fn().mockReturnValue({
          del: jest.fn(),
          exec: jest.fn().mockResolvedValue([]),
        }),
      }),
      ping: jest.fn(),
      exists: jest.fn(),
      incr: jest.fn(),
      expire: jest.fn(),
      on: jest.fn(),
      connect: jest.fn(),
      quit: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: RedisService, useValue: redisMock },
        { provide: AuthConfigService, useValue: { jwtRefreshExpiry: '7d' } },
      ],
    }).compile();

    service = module.get<SessionService>(SessionService);
  });

  describe('createSession', () => {
    it('should create session with hashed token', async () => {
      const mockSession = {
        sessionId: 'session-1',
        userId: 'user-1',
        refreshTokenHash: 'hash',
        familyId: 'family-1',
        familyCounter: 0,
      };
      prismaMock.session.create.mockResolvedValue(mockSession);

      const result = await service.createSession('user-1', '127.0.0.1');

      expect(result.sessionId).toBe('session-1');
      expect(prismaMock.session.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            userId: 'user-1',
            refreshTokenHash: expect.any(String),
            familyId: expect.any(String),
          }),
        }),
      );
    });
  });

  describe('revokeSession', () => {
    it('should revoke and delete redis family', async () => {
      prismaMock.session.updateMany.mockResolvedValue({ count: 1 });
      prismaMock.session.findFirst.mockResolvedValue({ sessionId: 'session-1', refreshTokenHash: 'hash' });

      const result = await service.revokeSession('some-token');
      expect(result).toBe(true);
      expect(redisMock.del).toHaveBeenCalledWith('session:session-1:family');
    });

    it('should return false when session not found', async () => {
      prismaMock.session.updateMany.mockResolvedValue({ count: 0 });
      const result = await service.revokeSession('invalid-token');
      expect(result).toBe(false);
    });
  });

  describe('getUserActiveSessions', () => {
    it('should count active sessions', async () => {
      prismaMock.session.count.mockResolvedValue(3);
      const count = await service.getUserActiveSessions('user-1');
      expect(count).toBe(3);
    });
  });
});
