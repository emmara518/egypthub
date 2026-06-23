import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Offer } from './offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly repo: Repository<Offer>,
  ) {}

  async findAll(page = 1, limit = 20, businessId?: string): Promise<{ data: Offer[]; total: number }> {
    const where: any = { isActive: true, validUntil: MoreThanOrEqual(new Date()) };
    if (businessId) where.businessId = businessId;

    const [data, total] = await this.repo.findAndCount({
      where,
      relations: ['business'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }

  async findById(id: string): Promise<Offer | null> {
    return this.repo.findOne({ where: { id }, relations: ['business'] });
  }

  async create(data: Partial<Offer>): Promise<Offer> {
    const offer = this.repo.create(data);
    return this.repo.save(offer);
  }

  async incrementBookings(id: string): Promise<void> {
    await this.repo.increment({ id }, 'currentBookings', 1);
  }
}
