import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { User, UserRole } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly nodeEnv: string;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET', 'super-secret-jwt-key-change-in-production');
    this.nodeEnv = this.configService.get<string>('NODE_ENV', 'development');
  }

  async sendOtp(phone: string): Promise<{ message: string }> {
    if (!phone || phone.length < 10) {
      throw new BadRequestException('رقم الموبايل مش صحيح');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // Store OTP in memory (temp — will use Redis in production)
    const Redis = require('ioredis');
    const redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      lazyConnect: true,
    });
    try {
      await redis.connect();
      await redis.set(`otp:${phone}`, code, 'EX', 300);
    } catch {
      // Fallback to in-memory if Redis unavailable
      otpStore.set(phone, { code, expires: new Date(Date.now() + 5 * 60 * 1000) });
    } finally {
      try { await redis.quit(); } catch {}
    }

    console.log(`[OTP Mock] Code for ${phone}: ${code}`);
    return { message: 'تم إرسال رمز التحقق' };
  }

  async verifyOtp(phone: string, code: string): Promise<{ user: any }> {
    let valid = false;
    const Redis = require('ioredis');
    const redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      lazyConnect: true,
    });
    try {
      await redis.connect();
      const stored = await redis.get(`otp:${phone}`);
      if (stored && stored === code) {
        valid = true;
        await redis.del(`otp:${phone}`);
      }
    } catch {
      const stored = otpStore.get(phone);
      if (stored && stored.code === code && new Date() < stored.expires) {
        valid = true;
        otpStore.delete(phone);
      }
    } finally {
      try { await redis.quit(); } catch {}
    }

    if (!valid) {
      throw new BadRequestException('الكود غلط أو انتهت صلاحيته');
    }

    let user = await this.userService.findByPhone(phone);
    if (!user) {
      user = await this.userService.create(phone, phone, UserRole.USER);
    }

    if (!user.isVerified) {
      await this.userService.verify(user.id);
    }

    return { user: this.sanitizeUser(user) };
  }

  async loginWithPassword(phone: string, password: string): Promise<{ accessToken: string; user: any }> {
    const user = await this.userService.findByPhone(phone);
    if (!user) throw new UnauthorizedException('رقم الموبايل أو كلمة السر غلط');

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) throw new UnauthorizedException('رقم الموبايل أو كلمة السر غلط');

    const token = this.generateToken(user);
    return { accessToken: token, user: this.sanitizeUser(user) };
  }

  async getProfile(userId: string): Promise<any> {
    const user = await this.userService.findById(userId);
    return this.sanitizeUser(user);
  }

  async generateToken(user: User): Promise<string> {
    const payload = { sub: user.id, phone: user.phone, role: user.role, name: user.name };
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(user: User): Promise<string> {
    const payload = { sub: user.id, phone: user.phone, role: user.role };
    return this.jwtService.sign(payload, { secret: this.jwtSecret + '_refresh', expiresIn: '7d' });
  }

  private sanitizeUser(user: User): any {
    const { passwordHash, ...rest } = user;
    return rest;
  }
}

// Fallback in-memory OTP store
const otpStore = new Map<string, { code: string; expires: Date }>();
