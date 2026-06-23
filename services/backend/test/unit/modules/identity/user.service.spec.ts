import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../../src/database/prisma/prisma.service';
import { PiiEncryptionService } from '../../../../src/common/services/pii-encryption.service';
import { UserService } from '../../../../src/modules/identity/services/user.service';

describe('UserService', () => {
  let service: UserService;
  let prismaMock: Record<string, any>;

  const mockUser = {
    userId: 'user-1',
    emailEncrypted: '',
    emailHash: 'hash-email',
    phoneEncrypted: null,
    phoneHash: null,
    passwordHash: 'hash',
    passwordAlgo: 'bcrypt',
    passwordChangedAt: new Date(),
    nameAr: 'محمد',
    nameEn: 'Mohamed',
    nationality: 'Egyptian',
    dateOfBirth: null,
    role: 'traveler',
    status: 'active',
    lastLoginAt: null,
    failedAttempts: 0,
    lockedUntil: null,
    mfaEnabled: false,
    mfaSecret: null,
    mfaMethod: null,
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  beforeEach(async () => {
    prismaMock = {
      user: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        count: jest.fn(),
      },
      $connect: jest.fn(),
      $disconnect: jest.fn(),
      $transaction: jest.fn(),
      $queryRawUnsafe: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaMock },
        {
          provide: PiiEncryptionService,
          useFactory: () => {
            const config = new ConfigService({ ENCRYPTION_KEY: 'test-encryption-key' });
            return new PiiEncryptionService(config);
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('findById', () => {
    it('should throw when user not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      await expect(service.findById('nonexistent')).rejects.toThrow('not found');
    });

    it('should return user when found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUser);
      const result = await service.findById('user-1');
      expect(result.userId).toBe('user-1');
    });
  });

  describe('getUserProfile', () => {
    it('should return decrypted user profile', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        ...mockUser,
        emailEncrypted: (() => {
          const pii = new PiiEncryptionService(new ConfigService({ ENCRYPTION_KEY: 'test-key-pii@2024-encrypt!' }));
          return pii.encryptEmail('user@test.com').encrypted;
        })(),
      });
      const result = await service.getUserProfile('user-1');
      expect(result.email).toBe('user@test.com');
    });
  });

  describe('softDeleteUser', () => {
    it('should set deletedAt', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUser);
      prismaMock.user.update.mockResolvedValue({ ...mockUser, deletedAt: new Date() });
      await service.softDeleteUser('user-1');
      expect(prismaMock.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: 'user-1' },
          data: expect.objectContaining({ deletedAt: expect.any(Date) }),
        }),
      );
    });
  });

  describe('isAccountLocked', () => {
    it('should return false when no lock', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUser);
      const locked = await service.isAccountLocked('user-1');
      expect(locked).toBe(false);
    });

    it('should return true when locked', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        ...mockUser,
        lockedUntil: new Date(Date.now() + 3600000),
      });
      const locked = await service.isAccountLocked('user-1');
      expect(locked).toBe(true);
    });

    it('should auto-unlock after lock expires', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        ...mockUser,
        lockedUntil: new Date(Date.now() - 1000),
      });
      prismaMock.user.update.mockResolvedValue(mockUser);
      const locked = await service.isAccountLocked('user-1');
      expect(locked).toBe(false);
    });
  });
});
