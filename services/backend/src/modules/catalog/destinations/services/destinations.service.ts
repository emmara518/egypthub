import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { SlugService } from '../../shared/slug.service';
import { CreateDestinationDto } from '../dto/create-destination.dto';
import { UpdateDestinationDto } from '../dto/update-destination.dto';
import { DestinationResponseDto } from '../dto/destination-response.dto';
import { DestinationFilterDto } from '../dto/destination-filter.dto';

@Injectable()
export class DestinationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly slugService: SlugService,
  ) {}

  async create(dto: CreateDestinationDto): Promise<DestinationResponseDto> {
    const slug = await this.slugService.ensureUnique(
      this.slugService.generate(dto.nameEn),
      (candidate) =>
        this.prisma.$queryRaw`
          SELECT 1 FROM catalog.destinations WHERE slug = ${candidate}
        `.then((r: any[]) => r.length > 0),
    );
    const location = dto.location ? JSON.stringify(dto.location) : null;
    const images = dto.images ? JSON.stringify(dto.images) : null;
    const rows = await this.prisma.$queryRaw<any[]>`
      INSERT INTO catalog.destinations (name_ar, name_en, slug, summary_ar, summary_en, description_ar, description_en, location, image_url, images, status)
      VALUES (${dto.nameAr}, ${dto.nameEn}, ${slug}, ${dto.summaryAr ?? null}, ${dto.summaryEn ?? null}, ${dto.descriptionAr ?? null}, ${dto.descriptionEn ?? null}, ${location}::jsonb, ${dto.imageUrl ?? null}, ${images}::jsonb, ${dto.status ?? 'draft'})
      RETURNING *
    `;
    const dest = rows[0];
    return this.toResponse(dest);
  }

  async findAll(filter?: DestinationFilterDto): Promise<DestinationResponseDto[]> {
    const statusClause = filter?.status
      ? `AND d.status = '${filter.status}'`
      : "AND d.deleted_at IS NULL";
    const searchClause = filter?.search
      ? `AND (d.name_en ILIKE '%${filter.search}%' OR d.name_ar ILIKE '%${filter.search}%')`
      : '';
    const page = filter?.page ?? 1;
    const limit = filter?.limit ?? 20;
    const offset = (page - 1) * limit;
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT d.* FROM catalog.destinations d
      WHERE 1=1 ${this.prisma.$queryRawUnsafe(statusClause)} ${this.prisma.$queryRawUnsafe(searchClause)}
      ORDER BY d.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
    return rows.map(this.toResponse);
  }

  async findById(id: string): Promise<DestinationResponseDto | null> {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM catalog.destinations WHERE destination_id = ${id}
    `;
    return rows.length ? this.toResponse(rows[0]) : null;
  }

  async findBySlug(slug: string): Promise<DestinationResponseDto | null> {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM catalog.destinations WHERE slug = ${slug}
    `;
    return rows.length ? this.toResponse(rows[0]) : null;
  }

  async update(id: string, dto: UpdateDestinationDto): Promise<DestinationResponseDto | null> {
    const existing = await this.findById(id);
    if (!existing) return null;
    const slug =
      dto.nameEn && dto.nameEn !== existing.nameEn
        ? await this.slugService.ensureUnique(
            this.slugService.generate(dto.nameEn),
            (candidate) =>
              this.prisma.$queryRaw`
                SELECT 1 FROM catalog.destinations WHERE slug = ${candidate} AND destination_id != ${id}
              `.then((r: any[]) => r.length > 0),
          )
        : existing.slug;
    const rows = await this.prisma.$queryRaw<any[]>`
      UPDATE catalog.destinations SET
        name_ar = COALESCE(${dto.nameAr ?? null}, name_ar),
        name_en = COALESCE(${dto.nameEn ?? null}, name_en),
        slug = ${slug},
        summary_ar = COALESCE(${dto.summaryAr ?? null}, summary_ar),
        summary_en = COALESCE(${dto.summaryEn ?? null}, summary_en),
        description_ar = COALESCE(${dto.descriptionAr ?? null}, description_ar),
        description_en = COALESCE(${dto.descriptionEn ?? null}, description_en),
        location = COALESCE(${dto.location ? JSON.stringify(dto.location) : null}::jsonb, location),
        image_url = COALESCE(${dto.imageUrl ?? null}, image_url),
        images = COALESCE(${dto.images ? JSON.stringify(dto.images) : null}::jsonb, images),
        status = COALESCE(${dto.status ?? null}, status)
      WHERE destination_id = ${id}
      RETURNING *
    `;
    return this.toResponse(rows[0]);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.prisma.$executeRaw`
      UPDATE catalog.destinations SET deleted_at = NOW() WHERE destination_id = ${id}
    `;
    return result > 0;
  }

  private toResponse(row: any): DestinationResponseDto {
    return {
      destinationId: row.destination_id,
      nameAr: row.name_ar,
      nameEn: row.name_en,
      slug: row.slug,
      summaryAr: row.summary_ar ?? undefined,
      summaryEn: row.summary_en ?? undefined,
      descriptionAr: row.description_ar ?? undefined,
      descriptionEn: row.description_en ?? undefined,
      location: row.location ?? undefined,
      imageUrl: row.image_url ?? undefined,
      images: row.images ?? undefined,
      status: row.status,
      publishedAt: row.published_at ?? undefined,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
