import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './booking.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as crypto from 'crypto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly repo: Repository<Booking>,
    private readonly httpService: HttpService,
  ) {}

  async create(data: {
    userId: string;
    businessId: string;
    offerId?: string;
    ambassadorId?: string;
    totalAmount: number;
    guestCount: number;
    bookingDate: string;
    bookingTime?: string;
    notes?: string;
  }): Promise<Booking> {
    const bookingCode = 'EH-' + crypto.randomBytes(4).toString('hex').toUpperCase().slice(0, 7);

    const booking = this.repo.create({
      ...data,
      bookingCode,
      status: BookingStatus.PENDING,
      commissionAmount: 0,
    });

    const saved = await this.repo.save(booking);

    // Try to notify ambassador service (non-blocking)
    if (data.ambassadorId) {
      try {
        const ambassadorUrl = process.env.AMBASSADOR_SERVICE_URL || 'http://localhost:4004';
        await firstValueFrom(
          this.httpService.post(`${ambassadorUrl}/api/v1/earnings`, {
            bookingId: saved.id,
            ambassadorId: data.ambassadorId,
            amount: 0,
          }),
        );
      } catch {}
    }

    return saved;
  }

  async findAll(page = 1, limit = 20, filters?: { userId?: string; businessId?: string; ambassadorId?: string; status?: string }): Promise<{ data: Booking[]; total: number }> {
    const where: any = {};
    if (filters?.userId) where.userId = filters.userId;
    if (filters?.businessId) where.businessId = filters.businessId;
    if (filters?.ambassadorId) where.ambassadorId = filters.ambassadorId;
    if (filters?.status) where.status = filters.status;

    const [data, total] = await this.repo.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }

  async findById(id: string): Promise<Booking> {
    const booking = await this.repo.findOne({ where: { id } });
    if (!booking) throw new NotFoundException('الحجز مش موجود');
    return booking;
  }

  async findByCode(code: string): Promise<Booking> {
    const booking = await this.repo.findOne({ where: { bookingCode: code } });
    if (!booking) throw new NotFoundException('كود الحجز مش صحيح');
    return booking;
  }

  async updateStatus(id: string, status: BookingStatus): Promise<Booking> {
    await this.findById(id);
    await this.repo.update(id, { status });
    return this.findById(id);
  }

  async getByUser(userId: string): Promise<Booking[]> {
    return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }

  async getByAmbassador(ambassadorId: string): Promise<Booking[]> {
    return this.repo.find({ where: { ambassadorId }, order: { createdAt: 'DESC' } });
  }
}
