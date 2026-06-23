import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly repo: Repository<City>,
  ) {}

  async findAll(): Promise<City[]> {
    return this.repo.find({ where: { isActive: true }, order: { nameAr: 'ASC' } });
  }

  async findById(id: string): Promise<City | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findBySlug(slug: string): Promise<City | null> {
    return this.repo.findOne({ where: { slug } });
  }
}
