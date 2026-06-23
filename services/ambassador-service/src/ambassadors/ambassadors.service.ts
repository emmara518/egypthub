import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ambassador } from './ambassador.entity';
import * as crypto from 'crypto';

@Injectable()
export class AmbassadorsService {
  constructor(
    @InjectRepository(Ambassador)
    private readonly repo: Repository<Ambassador>,
  ) {}

  async register(userId: string, bioAr?: string, cityId?: string): Promise<Ambassador> {
    const existing = await this.repo.findOne({ where: { userId } });
    if (existing) throw new ConflictException('أنت مسجل بالفعل كسفير');

    const referralCode = 'EH' + crypto.randomBytes(3).toString('hex').toUpperCase();

    const ambassador = this.repo.create({
      userId,
      referralCode,
      bioAr,
      cityId,
      isApproved: false,
    });

    return this.repo.save(ambassador);
  }

  async findByUserId(userId: string): Promise<Ambassador> {
    const ambassador = await this.repo.findOne({ where: { userId } });
    if (!ambassador) throw new NotFoundException('أنت مش مسجل كسفير');
    return ambassador;
  }

  async findByReferralCode(code: string): Promise<Ambassador | null> {
    return this.repo.findOne({ where: { referralCode: code } });
  }

  async findById(id: string): Promise<Ambassador> {
    const ambassador = await this.repo.findOne({ where: { id } });
    if (!ambassador) throw new NotFoundException('السفير مش موجود');
    return ambassador;
  }

  async approve(id: string): Promise<Ambassador> {
    await this.findById(id);
    await this.repo.update(id, { isApproved: true });
    return this.findById(id);
  }

  async updateBalance(id: string, amount: number): Promise<void> {
    await this.repo.increment({ id }, 'totalEarnings', amount);
    await this.repo.increment({ id }, 'availableBalance', amount);
  }

  async deductBalance(id: string, amount: number): Promise<void> {
    await this.repo.decrement({ id }, 'availableBalance', amount);
  }

  async findAll(page = 1, limit = 20): Promise<{ data: Ambassador[]; total: number }> {
    const [data, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }
}
