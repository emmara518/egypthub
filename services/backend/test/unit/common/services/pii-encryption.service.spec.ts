import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PiiEncryptionService } from '../../../../src/common/services/pii-encryption.service';

describe('PiiEncryptionService', () => {
  let service: PiiEncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PiiEncryptionService,
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('test-encryption-key-min-32-chars-long') },
        },
      ],
    }).compile();

    service = module.get<PiiEncryptionService>(PiiEncryptionService);
  });

  describe('encryptEmail', () => {
    it('should encrypt and hash email', () => {
      const result = service.encryptEmail('Test@Example.com');
      expect(result.encrypted).toContain(':');
      expect(result.hash).toHaveLength(64);
    });

    it('should produce deterministic hash', () => {
      const r1 = service.encryptEmail('test@example.com');
      const r2 = service.encryptEmail('Test@Example.com');
      expect(r1.hash).toBe(r2.hash);
    });

    it('should produce different ciphertexts each time', () => {
      const r1 = service.encryptEmail('test@example.com');
      const r2 = service.encryptEmail('test@example.com');
      expect(r1.encrypted).not.toBe(r2.encrypted);
    });
  });

  describe('decryptEmail', () => {
    it('should round-trip email', () => {
      const { encrypted } = service.encryptEmail('user@domain.com');
      const decrypted = service.decryptEmail(encrypted);
      expect(decrypted).toBe('user@domain.com');
    });
  });

  describe('encryptPhone', () => {
    it('should encrypt and hash phone', () => {
      const result = service.encryptPhone('+201234567890');
      expect(result.encrypted).toContain(':');
      expect(result.hash).toHaveLength(64);
    });
  });

  describe('hashEmail', () => {
    it('should normalize before hashing', () => {
      const h1 = service.hashEmail('Test@Example.com');
      const h2 = service.hashEmail('test@example.com');
      expect(h1).toBe(h2);
    });
  });
});
