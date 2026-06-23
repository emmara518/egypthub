import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WithdrawalRequest } from './withdrawal.entity';
import { AmbassadorsService } from '../ambassadors/ambassadors.service';

@Injectable()
export class WithdrawalsService {
  constructor(
    @InjectRepository(WithdrawalRequest)
    private readonly repo: Repository<WithdrawalRequest>,
    private readonly ambassadorsService: AmbassadorsService,
  ) {}

  async create(data: { ambassadorId: string; amount: number; bankAccountAr?: string; phone?: string }): Promise<WithdrawalRequest> {
    const ambassador = await this.ambassadorsService.findById(data.ambassadorId);

    if (ambassador.availableBalance < data.amount) {
      throw new BadRequestException('الرصيد المتاح مش كفاي');
    }
    if (data.amount < 100) {
      throw new BadRequestException('أقل مبلغ للسحب 100 جنيه');
    }

    const request = this.repo.create({
      ambassadorId: data.ambassadorId,
      amount: data.amount,
      bankAccountAr: data.bankAccountAr,
      phone: data.phone,
      status: 'pending',
    });

    const saved = await this.repo.save(request);

    // Deduct from available balance
    await this.ambassadorsService.deductBalance(data.ambassadorId, data.amount);

    return saved;
  }

  async findByAmbassador(ambassadorId: string): Promise<WithdrawalRequest[]> {
    return this.repo.find({
      where: { ambassadorId },
      order: { createdAt: 'DESC' },
    });
  }

  async findAll(page = 1, limit = 20): Promise<{ data: WithdrawalRequest[]; total: number }> {
    const [data, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }

  async updateStatus(id: string, status: string, adminNotes?: string): Promise<WithdrawalRequest> {
    const request = await this.repo.findOne({ where: { id } });
    if (!request) throw new NotFoundException('طلب السحب مش موجود');

    await this.repo.update(id, { status, adminNotes });
    return this.repo.findOne({ where: { id } }) as Promise<WithdrawalRequest>;
  }
}
