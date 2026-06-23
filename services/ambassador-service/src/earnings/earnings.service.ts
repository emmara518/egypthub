import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AmbassadorEarning } from './earning.entity';
import { AmbassadorsService } from '../ambassadors/ambassadors.service';

@Injectable()
export class EarningsService {
  constructor(
    @InjectRepository(AmbassadorEarning)
    private readonly repo: Repository<AmbassadorEarning>,
    private readonly ambassadorsService: AmbassadorsService,
  ) {}

  async add(data: { ambassadorId: string; bookingId?: string; amount: number; descriptionAr?: string }): Promise<AmbassadorEarning> {
    const earning = this.repo.create({ ...data, status: 'pending' });
    const saved = await this.repo.save(earning);

    // Update ambassador balance
    await this.ambassadorsService.updateBalance(data.ambassadorId, data.amount);

    return saved;
  }

  async getByAmbassador(ambassadorId: string): Promise<AmbassadorEarning[]> {
    return this.repo.find({
      where: { ambassadorId },
      order: { createdAt: 'DESC' },
    });
  }

  async confirmEarning(id: string): Promise<void> {
    const earning = await this.repo.findOne({ where: { id } });
    if (earning) {
      await this.repo.update(id, { status: 'confirmed' });
    }
  }

  async getTotalEarnings(ambassadorId: string): Promise<number> {
    const result = await this.repo
      .createQueryBuilder('e')
      .select('SUM(e.amount)', 'total')
      .where('e.ambassadorId = :ambassadorId', { ambassadorId })
      .getRawOne();
    return Number(result?.total || 0);
  }
}
