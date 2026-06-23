import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'node:crypto';
import { encrypt, decrypt, sha256 } from '../utils/crypto.utils';

@Injectable()
export class PiiEncryptionService {
  private readonly logger = new Logger(PiiEncryptionService.name);
  private readonly encryptionKey: string;

  constructor(private readonly configService: ConfigService) {
    const key = this.configService.get<string>('ENCRYPTION_KEY');
    if (!key) {
      throw new Error('ENCRYPTION_KEY environment variable is required');
    }
    this.encryptionKey = createHash('sha256').update(key).digest('hex');
  }

  encryptEmail(email: string): { encrypted: string; hash: string } {
    const normalizedEmail = email.toLowerCase().trim();
    const encrypted = encrypt(normalizedEmail, this.encryptionKey);
    const hash = sha256(normalizedEmail);
    return { encrypted, hash };
  }

  decryptEmail(encryptedEmail: string): string {
    return decrypt(encryptedEmail, this.encryptionKey);
  }

  encryptPhone(phone: string): { encrypted: string; hash: string } {
    const normalizedPhone = phone.trim();
    const encrypted = encrypt(normalizedPhone, this.encryptionKey);
    const hash = sha256(normalizedPhone);
    return { encrypted, hash };
  }

  decryptPhone(encryptedPhone: string): string {
    return decrypt(encryptedPhone, this.encryptionKey);
  }

  hashEmail(email: string): string {
    return sha256(email.toLowerCase().trim());
  }

  hashPhone(phone: string): string {
    return sha256(phone.trim());
  }
}
