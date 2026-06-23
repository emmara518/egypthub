import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { SlugService } from '../../shared/slug.service';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { UpdateOfferDto } from '../dto/update-offer.dto';
import { OfferResponseDto } from '../dto/offer-response.dto';

@Injectable()
export class OffersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly slugService: SlugService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(dto: CreateOfferDto): Promise<OfferResponseDto> {
    const slug = dto.slug || this.slugService.generate(dto.nameEn);
    const rows = await this.prisma.$queryRaw<any[]>`
      INSERT INTO catalog.offers (
        name_ar, name_en, slug, description_ar, description_en,
        coupon_code, discount_type, discount_value, max_redemptions,
        max_per_user, min_booking_amount, starts_at, expires_at, status, image_url
      ) VALUES (
        ${dto.nameAr}, ${dto.nameEn}, ${slug}, ${dto.descriptionAr ?? null}, ${dto.descriptionEn ?? null},
        ${dto.couponCode ?? null}, ${dto.discountType ?? null}, ${dto.discountValue ?? null}, ${dto.maxRedemptions ?? null},
        ${dto.maxPerUser ?? null}, ${dto.minBookingAmount ?? null}, ${dto.startsAt ?? null}, ${dto.expiresAt ?? null}, ${dto.status ?? 'draft'}, ${dto.imageUrl ?? null}
      )
      RETURNING *
    `;
    const offer = rows[0];

    if (dto.experienceIds?.length) {
      for (const expId of dto.experienceIds) {
        await this.prisma.$executeRaw`
          INSERT INTO catalog.offer_experiences (offer_id, experience_id)
          VALUES (${offer.offer_id}, ${expId})
          ON CONFLICT DO NOTHING
        `;
      }
    }

    this.eventEmitter.emit('offer.created', new OfferCreatedEvent(offer.offer_id, offer.slug));
    return this.toResponse(offer);
  }

  async findAll(): Promise<OfferResponseDto[]> {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM catalog.offers WHERE 1=1 AND status = 'published'
      ORDER BY created_at DESC
    `;
    return Promise.all(rows.map((r) => this.toResponse(r)));
  }

  async findById(id: string): Promise<OfferResponseDto | null> {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM catalog.offers WHERE offer_id = ${id}
    `;
    return rows.length ? this.toResponse(rows[0]) : null;
  }

  async findBySlug(slug: string): Promise<OfferResponseDto | null> {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM catalog.offers WHERE slug = ${slug}
    `;
    return rows.length ? this.toResponse(rows[0]) : null;
  }

  async update(id: string, dto: UpdateOfferDto): Promise<OfferResponseDto | null> {
    const rows = await this.prisma.$queryRaw<any[]>`
      UPDATE catalog.offers SET
        name_ar = COALESCE(${dto.nameAr ?? null}, name_ar),
        name_en = COALESCE(${dto.nameEn ?? null}, name_en),
        slug = COALESCE(${dto.slug ?? null}, slug),
        description_ar = COALESCE(${dto.descriptionAr ?? null}, description_ar),
        description_en = COALESCE(${dto.descriptionEn ?? null}, description_en),
        coupon_code = COALESCE(${dto.couponCode ?? null}, coupon_code),
        discount_type = COALESCE(${dto.discountType ?? null}, discount_type),
        discount_value = COALESCE(${dto.discountValue ?? null}, discount_value),
        max_redemptions = COALESCE(${dto.maxRedemptions ?? null}, max_redemptions),
        max_per_user = COALESCE(${dto.maxPerUser ?? null}, max_per_user),
        min_booking_amount = COALESCE(${dto.minBookingAmount ?? null}, min_booking_amount),
        starts_at = COALESCE(${dto.startsAt ?? null}, starts_at),
        expires_at = COALESCE(${dto.expiresAt ?? null}, expires_at),
        status = COALESCE(${dto.status ?? null}, status),
        image_url = COALESCE(${dto.imageUrl ?? null}, image_url)
      WHERE offer_id = ${id}
      RETURNING *
    `;
    return rows.length ? this.toResponse(rows[0]) : null;
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.prisma.$executeRaw`
      UPDATE catalog.offers SET deleted_at = NOW() WHERE offer_id = ${id}
    `;
    return result > 0;
  }

  private async toResponse(row: any): Promise<OfferResponseDto> {
    const exps = await this.prisma.$queryRaw<{ experience_id: string }[]>`
      SELECT experience_id FROM catalog.offer_experiences WHERE offer_id = ${row.offer_id}
    `;
    return {
      offerId: row.offer_id,
      nameAr: row.name_ar,
      nameEn: row.name_en,
      slug: row.slug,
      descriptionAr: row.description_ar ?? undefined,
      descriptionEn: row.description_en ?? undefined,
      couponCode: row.coupon_code ?? undefined,
      discountType: row.discount_type ?? undefined,
      discountValue: row.discount_value ? Number(row.discount_value) : undefined,
      maxRedemptions: row.max_redemptions ?? undefined,
      maxPerUser: row.max_per_user ?? undefined,
      minBookingAmount: row.min_booking_amount ? Number(row.min_booking_amount) : undefined,
      startsAt: row.starts_at ?? undefined,
      expiresAt: row.expires_at ?? undefined,
      status: row.status,
      imageUrl: row.image_url ?? undefined,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      experiences: exps.map((e) => ({ experienceId: e.experience_id })),
    };
  }
}
