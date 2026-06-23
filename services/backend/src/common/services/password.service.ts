import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

const BCRYPT_ROUNDS = 12;

@Injectable()
export class PasswordService {
  private readonly logger = new Logger(PasswordService.name);
  private argon2Instance: typeof import('argon2') | null = null;

  constructor(private readonly configService: ConfigService) {}

  async hash(password: string): Promise<{ hash: string; algorithm: string }> {
    const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    return { hash, algorithm: 'bcrypt' };
  }

  async verify(password: string, hash: string, algorithm: string): Promise<boolean> {
    switch (algorithm) {
      case 'bcrypt':
        return bcrypt.compare(password, hash);
      case 'argon2id': {
        const argon2 = await this.getArgon2();
        return argon2.verify(hash, password);
      }
      default:
        this.logger.warn(`Unknown algorithm: ${algorithm}, falling back to bcrypt`);
        return bcrypt.compare(password, hash);
    }
  }

  async needsRehash(algorithm: string): Promise<boolean> {
    return algorithm !== 'argon2id';
  }

  async rehash(password: string): Promise<{ hash: string; algorithm: string }> {
    const argon2 = await this.getArgon2();
    const hash = await argon2.hash(password, {
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4,
    });
    return { hash, algorithm: 'argon2id' };
  }

  validatePasswordStrength(password: string): string[] {
    const errors: string[] = [];
    if (password.length < 8) errors.push('Password must be at least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('Password must contain an uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('Password must contain a lowercase letter');
    if (!/\d/.test(password)) errors.push('Password must contain a number');
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
      errors.push('Password must contain a special character');
    return errors;
  }

  private async getArgon2(): Promise<typeof import('argon2')> {
    if (!this.argon2Instance) {
      this.argon2Instance = await import('argon2');
    }
    return this.argon2Instance;
  }
}
