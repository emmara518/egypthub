import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findByPhone(phone: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { phone } });
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('المستخدم مش موجود');
    return user;
  }

  async create(phone: string, name: string, role: UserRole = UserRole.USER): Promise<User> {
    const existing = await this.findByPhone(phone);
    if (existing) throw new ConflictException('رقم الموبايل ده مسجل بالفعل');

    const user = this.userRepo.create({ phone, name, role });
    return this.userRepo.save(user);
  }

  async setPassword(userId: string, password: string): Promise<void> {
    const hash = await bcrypt.hash(password, 10);
    await this.userRepo.update(userId, { passwordHash: hash });
  }

  async verify(userId: string): Promise<void> {
    await this.userRepo.update(userId, { isVerified: true });
  }

  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    await this.userRepo.update(userId, data);
    return this.findById(userId);
  }

  async getAllUsers(page = 1, limit = 20): Promise<{ users: User[]; total: number }> {
    const [users, total] = await this.userRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { users, total };
  }
}
