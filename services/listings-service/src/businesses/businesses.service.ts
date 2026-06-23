import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business, BusinessStatus } from './business.entity';

@Injectable()
export class BusinessesService {
  constructor(
    @InjectRepository(Business)
    private readonly repo: Repository<Business>,
  ) {}

  async findAll(page = 1, limit = 20, filters?: { cityId?: string; categoryId?: string; status?: string; featured?: boolean }): Promise<{ data: Business[]; total: number }> {
    const qb = this.repo.createQueryBuilder('b')
      .leftJoinAndSelect('b.city', 'city')
      .leftJoinAndSelect('b.categories', 'categories');

    if (filters?.cityId) qb.andWhere('b.cityId = :cityId', { cityId: filters.cityId });
    if (filters?.status) qb.andWhere('b.status = :status', { status: filters.status });
    else qb.andWhere('b.status = :active', { active: BusinessStatus.ACTIVE });
    if (filters?.featured) qb.andWhere('b.isFeatured = :featured', { featured: true });

    if (filters?.categoryId) {
      qb.andWhere('categories.id = :categoryId', { categoryId: filters.categoryId });
    }

    qb.skip((page - 1) * limit).take(limit).orderBy('b.isFeatured', 'DESC').addOrderBy('b.createdAt', 'DESC');

    const [data, total] = await qb.getManyAndCount();
    return { data, total };
  }

  async findBySlug(slug: string): Promise<Business> {
    const business = await this.repo.findOne({
      where: { slug },
      relations: ['city', 'categories'],
    });
    if (!business) throw new NotFoundException('المنشأة مش موجودة');
    return business;
  }

  async findById(id: string): Promise<Business> {
    const business = await this.repo.findOne({
      where: { id },
      relations: ['city', 'categories'],
    });
    if (!business) throw new NotFoundException('المنشأة مش موجودة');
    return business;
  }

  async create(data: Partial<Business>): Promise<Business> {
    const business = this.repo.create(data);
    return this.repo.save(business);
  }

  async update(id: string, data: Partial<Business>): Promise<Business> {
    await this.findById(id);
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async updateStatus(id: string, status: BusinessStatus): Promise<Business> {
    return this.update(id, { status } as any);
  }

  async getByOwner(ownerId: string): Promise<Business[]> {
    return this.repo.find({
      where: { ownerId },
      relations: ['city'],
      order: { createdAt: 'DESC' },
    });
  }
}
