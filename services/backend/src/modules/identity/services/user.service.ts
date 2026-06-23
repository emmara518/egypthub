import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { PiiEncryptionService } from '../../../common/services/pii-encryption.service';
import {
  ResourceNotFoundException,
  ResourceConflictException,
} from '../../../common/exceptions';
import { RegisterDto } from '../dto/register.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly piiEncryption: PiiEncryptionService,
  ) {}

  async createUser(dto: RegisterDto, passwordHash: string, passwordAlgo: string): Promise<UserResponseDto> {
    const { encrypted: emailEncrypted, hash: emailHash } = this.piiEncryption.encryptEmail(dto.email);
    const { encrypted: phoneEncrypted, hash: phoneHash } = this.piiEncryption.encryptPhone(dto.phone);

    const existingUser = await this.prisma.user.findUnique({
      where: { emailHash },
      select: { userId: true },
    });

    if (existingUser) {
      throw new ResourceConflictException('User', { field: 'email' });
    }

    const phoneExists = await this.prisma.user.findUnique({
      where: { phoneHash },
      select: { userId: true },
    });

    if (phoneExists) {
      throw new ResourceConflictException('User', { field: 'phone' });
    }

    const user = await this.prisma.user.create({
      data: {
        emailEncrypted,
        emailHash,
        phoneEncrypted,
        phoneHash,
        passwordHash,
        passwordAlgo,
        nameAr: dto.nameAr,
        nameEn: dto.nameEn,
        nationality: dto.nationality,
      },
    });

    return this.toUserResponse(user);
  }

  async findByEmail(email: string) {
    const emailHash = this.piiEncryption.hashEmail(email);
    return this.prisma.user.findUnique({ where: { emailHash } });
  }

  async findById(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { userId } });
    if (!user || user.deletedAt) {
      throw new ResourceNotFoundException('User', userId);
    }
    return user;
  }

  async getUserProfile(userId: string): Promise<UserResponseDto> {
    const user = await this.findById(userId);
    return this.toUserResponse(user);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<UserResponseDto> {
    const user = await this.findById(userId);

    const updateData: Record<string, unknown> = {};

    if (dto.nameAr !== undefined) updateData.nameAr = dto.nameAr;
    if (dto.nameEn !== undefined) updateData.nameEn = dto.nameEn;
    if (dto.nationality !== undefined) updateData.nationality = dto.nationality;
    if (dto.dateOfBirth !== undefined) updateData.dateOfBirth = new Date(dto.dateOfBirth);

    if (dto.phone !== undefined) {
      const { encrypted: phoneEncrypted, hash: phoneHash } = this.piiEncryption.encryptPhone(dto.phone);
      updateData.phoneEncrypted = phoneEncrypted;
      updateData.phoneHash = phoneHash;
    }

    const updated = await this.prisma.user.update({
      where: { userId },
      data: updateData,
    });

    return this.toUserResponse(updated);
  }

  async softDeleteUser(userId: string): Promise<void> {
    await this.findById(userId);
    await this.prisma.user.update({
      where: { userId },
      data: { deletedAt: new Date() },
    });
  }

  async listUsers(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: { deletedAt: null },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where: { deletedAt: null } }),
    ]);

    return {
      data: users.map((u) => this.toUserResponse(u)),
      total,
      page,
      limit,
    };
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { userId },
      data: { lastLoginAt: new Date(), failedAttempts: 0, lockedUntil: null },
    });
  }

  async incrementFailedAttempts(userId: string): Promise<void> {
    const user = await this.findById(userId);
    const newAttempts = user.failedAttempts + 1;

    let lockedUntil: Date | null = null;
    if (newAttempts >= 5) {
      const lockDuration = Math.min(Math.pow(2, newAttempts - 5) * 15, 1440);
      lockedUntil = new Date(Date.now() + lockDuration * 60 * 1000);
    }

    await this.prisma.user.update({
      where: { userId },
      data: { failedAttempts: newAttempts, lockedUntil },
    });
  }

  async isAccountLocked(userId: string): Promise<boolean> {
    const user = await this.findById(userId);
    if (!user.lockedUntil) return false;
    if (user.lockedUntil < new Date()) {
      await this.prisma.user.update({
        where: { userId },
        data: { lockedUntil: null, failedAttempts: 0 },
      });
      return false;
    }
    return true;
  }

  private toUserResponse(user: Record<string, unknown>): UserResponseDto {
    return new UserResponseDto({
      userId: user.userId as string,
      email: this.piiEncryption.decryptEmail(user.emailEncrypted as string),
      phone: user.phoneEncrypted
        ? this.piiEncryption.decryptPhone(user.phoneEncrypted as string)
        : undefined,
      nameAr: user.nameAr as string | undefined,
      nameEn: user.nameEn as string | undefined,
      nationality: user.nationality as string | undefined,
      role: user.role as string,
      status: user.status as string,
      mfaEnabled: user.mfaEnabled as boolean,
      mfaMethod: user.mfaMethod as string | undefined,
      createdAt: user.createdAt as Date,
      updatedAt: user.updatedAt as Date,
    });
  }
}
