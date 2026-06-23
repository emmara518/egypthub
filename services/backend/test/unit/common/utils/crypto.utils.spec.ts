import {
  sha256,
  generateToken,
  encrypt,
  decrypt,
} from '../../../../src/common/utils/crypto.utils';

describe('CryptoUtils', () => {
  describe('sha256', () => {
    it('should produce deterministic hash', () => {
      const hash1 = sha256('test');
      const hash2 = sha256('test');
      expect(hash1).toBe(hash2);
    });

    it('should produce hex string of length 64', () => {
      expect(sha256('test')).toHaveLength(64);
    });
  });

  describe('generateToken', () => {
    it('should generate hex string of expected length', () => {
      const token = generateToken(32);
      expect(token).toHaveLength(64);
    });

    it('should generate unique tokens', () => {
      const t1 = generateToken();
      const t2 = generateToken();
      expect(t1).not.toBe(t2);
    });
  });

  describe('encrypt and decrypt', () => {
    const key = 'a'.repeat(64); // 32 bytes hex

    it('should encrypt and decrypt correctly', () => {
      const plaintext = 'sensitive@email.com';
      const encrypted = encrypt(plaintext, key);
      const decrypted = decrypt(encrypted, key);
      expect(decrypted).toBe(plaintext);
    });

    it('should produce different ciphertexts for same input', () => {
      const plaintext = 'test@example.com';
      const e1 = encrypt(plaintext, key);
      const e2 = encrypt(plaintext, key);
      expect(e1).not.toBe(e2);
    });

    it('should fail to decrypt with wrong key', () => {
      const plaintext = 'secret';
      const encrypted = encrypt(plaintext, key);
      const wrongKey = 'b'.repeat(64);
      expect(() => decrypt(encrypted, wrongKey)).toThrow();
    });
  });
});
