import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { SlugService } from '../../shared/slug.service';
import { CreatePartnerDto } from '../dto/create-partner.dto';
import { UpdatePartnerDto } from '../dto/update-partner.dto';
import { PartnerResponseDto } from '../dto/partner-response.dto';

@Injectable()
export class PartnersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly slugService: SlugService,
  ) {}

  async create(dto: CreatePartnerDto): Promise<PartnerResponseDto> {
    const slug = dto.slug || this.slugService.generate(dto.nameEn);
    const location = dto.location ? JSON.stringify(dto.location) : null;
    const images = dto.images ? JSON.stringify(dto.images) : null;
    const rows = await this.prisma.$queryRaw<any[]>`
      INSERT INTO catalog.partners (
        name_ar, name_en, slug, description_ar, description_en,
        email, phone, website, location, image_url, images,
        status, commission_rate
      ) VALUES (
        ${dto.nameAr}, ${dto.nameEn}, ${slug}, ${dto.descriptionAr ?? null}, ${dto.descriptionEn ?? null},
        ${dto.email ?? null}, ${dto.phone ?? null}, ${dto.website ?? null}, ${location}::jsonb, ${dto.imageUrl ?? null}, ${images}::jsonb,
        ${dto.status ?? 'pending'}, ${dto.commissionRate ?? 0.0}
      )
      RETURNING *
    `;
    return this.toResponse(rows[0]);
  }

  async findAll(): Promise<PartnerResponseDto[]> {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM catalog.partners WHERE 1=1 AND status = 'active'
      ORDER BY name_en ASC
    `;
    return rows.map(this.toResponse);
  }

  async findById(id: string): Promise<PartnerResponseDto | null> {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM catalog.partners WHERE partner_id = ${id}
    `;
    return rows.length ? this.toResponse(rows[0]) : null;
  }

  async findBySlug(slug: string): Promise<PartnerResponseDto | null> {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM catalog.partners WHERE slug = ${slug}
    `;
    return rows.length ? this.toResponse(rows[0]) : null;
  }

  async update(id: string, dto: UpdatePartnerDto): Promise<PartnerResponseDto | null> {
    const slug =
      dto.nameEn && (await this.findById(id)).nameEn !== dto.nameEn
        ? await this.slugService.ensureUnique(
            this.slugService.generate(dto.nameEn),
            (candidate) =>
              this.prisma.$queryRaw`
                SELECT 1 FROM catalog.partners WHERE slug = ${candidate} AND partner_id != ${id}
              `.then((r: any[]) => r.length > 0),
          )
        : (await this.findById(id)).slug;
    const location = dto.location ? JSON.stringify(dto.location) : null;
    const rows = await this.prisma.$queryRaw<any[]>`
      UPDATE catalog.partners SET
        name_ar = COALESCE(${dto.nameAr ?? null}, name_ar),
        name_en = COALESCE(${dto.nameEn ?? null}, name_en),
        slug = ${slug},
        description_ar = COALESCE(${dto.descriptionAr ?? null}, description_ar),
        description_en = COALESCE(${dto.descriptionEn ?? null}, description_en),
        email = COALESCE(${dto.email ?? null}, email),
        phone = COALESCE(${dto.phone ?? null}, phone),
        website = COALESCE(${dto.website ?? null}, website),
        location = COALESCE(${location}::jsonb, location),
        image_url = COALESCE(${dto.imageUrl ?? null}, image_url),
        images = COALESCE(${dto.images ? JSON.stringify(dto.images) : null}::jsonb, images),
        status = COALESCE(${dto.status ?? null}, status),
        commission_rate = COALESCE(${dto.commissionRate ?? null}, commission_rate)
      WHERE partner_id = ${id}
      RETURNING *
    `;
    return rows.length ? this.toResponse(rows[0]) : null;
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.prisma.$executeRaw`
      UPDATE catalog.partners SET deleted_at = NOW() WHERE partner_id = ${id}
    `;
    return result > 0;
  }

  private toResponse(row: any): PartnerResponseDto {
    return {
      partnerId: row.partner_id,
      nameAr: row.name_ar,
      nameEn: row.name_en,
      slug: row.slug,
      descriptionAr: row.description_ar ?? undefined,
      descriptionEn: row.description_en ?? undefined,
      email: row.email ?? undefined,
      phone: row.phone ?? undefined,
      website: row.website ?? undefined,
      location: row.location ?? undefined,
      imageUrl: row.image_url ?? undefined,
      images: row.images ?? undefined,
      status: row.status,
      commissionRate: row.commission_rate,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
