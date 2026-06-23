import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from '../../../../src/common/services/password.service';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService, { provide: ConfigService, useValue: { get: jest.fn() } }],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
  });

  describe('hash and verify', () => {
    it('should hash with bcrypt by default', async () => {
      const result = await service.hash('StrongPass1!');
      expect(result.algorithm).toBe('bcrypt');
      expect(result.hash).toMatch(/^\$2[ab]\$.+\$.+/);
    });

    it('should verify correct password', async () => {
      const { hash, algorithm } = await service.hash('StrongPass1!');
      const valid = await service.verify('StrongPass1!', hash, algorithm);
      expect(valid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const { hash, algorithm } = await service.hash('StrongPass1!');
      const valid = await service.verify('WrongPass1!', hash, algorithm);
      expect(valid).toBe(false);
    });
  });

  describe('rehash', () => {
    it('should detect bcrypt needs rehash', async () => {
      expect(await service.needsRehash('bcrypt')).toBe(true);
    });

    it('should detect argon2id does not need rehash', async () => {
      expect(await service.needsRehash('argon2id')).toBe(false);
    });
  });

  describe('validatePasswordStrength', () => {
    it('should accept strong password', () => {
      expect(service.validatePasswordStrength('StrongPass1!')).toEqual([]);
    });

    it('should reject short password', () => {
      const errors = service.validatePasswordStrength('Ab1!');
      expect(errors).toContain('Password must be at least 8 characters');
    });

    it('should reject password without uppercase', () => {
      const errors = service.validatePasswordStrength('weakpass1!');
      expect(errors).toContain('Password must contain an uppercase letter');
    });

    it('should reject password without number', () => {
      const errors = service.validatePasswordStrength('WeakPass!');
      expect(errors).toContain('Password must contain a number');
    });
  });
});
