import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { SlugService } from '../../shared/slug.service';
import { CreateExperienceDto } from '../dto/create-experience.dto';
import { UpdateExperienceDto } from '../dto/update-experience.dto';
import { ExperienceResponseDto } from '../dto/experience-response.dto';
import { ExperienceFilterDto } from '../dto/experience-filter.dto';

@Injectable()
export class ExperiencesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly slugService: SlugService,
  ) {}

  async create(dto: CreateExperienceDto): Promise<ExperienceResponseDto> {
    const slug = await this.slugService.ensureUnique(
      this.slugService.generate(dto.nameEn),
      (candidate) =>
        this.prisma.$queryRaw`
          SELECT 1 FROM catalog.experiences WHERE slug = ${candidate}
        `.then((r: any[]) => r.length > 0),
    );
    const location =
      dto.latitude != null && dto.longitude != null
        ? JSON.stringify({ lat: dto.latitude, lng: dto.longitude })
        : null;
    const images = dto.images ? JSON.stringify(dto.images) : null;
    const includes = dto.includes ? JSON.stringify(dto.includes) : null;
    const excludes = dto.excludes ? JSON.stringify(dto.excludes) : null;
    const requirements = dto.requirements ? JSON.stringify(dto.requirements) : null;

    const rows = await this.prisma.$queryRaw<any[]>`
      INSERT INTO catalog.experiences (
        destination_id, partner_id, name_ar, name_en, slug,
        summary_ar, summary_en, description_ar, description_en,
        location, duration, duration_unit, max_guests, min_guests,
        original_price, sale_price, currency, image_url, images,
        includes, excludes, requirements, status
      ) VALUES (
        ${dto.destinationId}, ${dto.partnerId ?? null}, ${dto.nameAr}, ${dto.nameEn}, ${slug},
        ${dto.summaryAr ?? null}, ${dto.summaryEn ?? null}, ${dto.descriptionAr ?? null}, ${dto.descriptionEn ?? null},
        ${location}::jsonb, ${dto.duration ?? null}, ${dto.durationUnit ?? null}, ${dto.maxGuests ?? null}, ${dto.minGuests ?? null},
        ${dto.originalPrice ?? null}, ${dto.salePrice ?? null}, ${dto.currency ?? 'EGP'}, ${dto.imageUrl ?? null}, ${images}::jsonb,
        ${includes}::jsonb, ${excludes}::jsonb, ${requirements}::jsonb, ${dto.status ?? 'draft'}
      )
      RETURNING *
    `;
    const exp = rows[0];

    if (dto.categoryIds?.length) {
      for (const catId of dto.categoryIds) {
        await this.prisma.$executeRaw`
          INSERT INTO catalog.experience_categories (experience_id, category_id)
          VALUES (${exp.experience_id}, ${catId})
          ON CONFLICT DO NOTHING
        `;
      }
    }

    return this.toResponse(exp);
  }

  async findAll(filter?: ExperienceFilterDto): Promise<ExperienceResponseDto[]> {
    let joins = '';
    let conditions = 'WHERE e.deleted_at IS NULL';
    if (filter?.destinationId) conditions += ` AND e.destination_id = '${filter.destinationId}'`;
    if (filter?.status) conditions += ` AND e.status = '${filter.status}'`;
    if (filter?.search) conditions += ` AND (e.name_en ILIKE '%${filter.search}%' OR e.name_ar ILIKE '%${filter.search}%')`;
    if (filter?.categoryId) {
      joins = 'JOIN catalog.experience_categories ec ON e.experience_id = ec.experience_id';
      conditions += ` AND ec.category_id = '${filter.categoryId}'`;
    }
    const page = filter?.page ?? 1;
    const limit = filter?.limit ?? 20;
    const offset = (page - 1) * limit;
    const query = `
      SELECT e.* FROM catalog.experiences e ${joins} ${conditions}
      ORDER BY e.created_at DESC LIMIT ${limit} OFFSET ${offset}
    `;
    const rows = await this.prisma.$queryRawUnsafe<any[]>(query);
    return Promise.all(rows.map((r) => this.toResponse(r)));
  }

  async findById(id: string): Promise<ExperienceResponseDto | null> {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM catalog.experiences WHERE experience_id = ${id}
    `;
    return rows.length ? this.toResponse(rows[0]) : null;
  }

  async findBySlug(slug: string): Promise<ExperienceResponseDto | null> {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM catalog.experiences WHERE slug = ${slug}
    `;
    return rows.length ? this.toResponse(rows[0]) : null;
  }

  async update(id: string, dto: UpdateExperienceDto): Promise<ExperienceResponseDto | null> {
    const existing = await this.findById(id);
    if (!existing) return null;
    const slug =
      dto.nameEn && dto.nameEn !== existing.nameEn
        ? await this.slugService.ensureUnique(
            this.slugService.generate(dto.nameEn),
            (candidate) =>
              this.prisma.$queryRaw`
                SELECT 1 FROM catalog.experiences WHERE slug = ${candidate} AND experience_id != ${id}
              `.then((r: any[]) => r.length > 0),
          )
        : existing.slug;

    const rows = await this.prisma.$queryRaw<any[]>`
      UPDATE catalog.experiences SET
        destination_id = COALESCE(${dto.destinationId ?? null}, destination_id),
        partner_id = COALESCE(${dto.partnerId ?? null}, partner_id),
        name_ar = COALESCE(${dto.nameAr ?? null}, name_ar),
        name_en = COALESCE(${dto.nameEn ?? null}, name_en),
        slug = ${slug},
        summary_ar = COALESCE(${dto.summaryAr ?? null}, summary_ar),
        summary_en = COALESCE(${dto.summaryEn ?? null}, summary_en),
        description_ar = COALESCE(${dto.descriptionAr ?? null}, description_ar),
        description_en = COALESCE(${dto.descriptionEn ?? null}, description_en),
        duration = COALESCE(${dto.duration ?? null}, duration),
        duration_unit = COALESCE(${dto.durationUnit ?? null}, duration_unit),
        max_guests = COALESCE(${dto.maxGuests ?? null}, max_guests),
        min_guests = COALESCE(${dto.minGuests ?? null}, min_guests),
        original_price = COALESCE(${dto.originalPrice ?? null}, original_price),
        sale_price = COALESCE(${dto.salePrice ?? null}, sale_price),
        currency = COALESCE(${dto.currency ?? null}, currency),
        image_url = COALESCE(${dto.imageUrl ?? null}, image_url),
        status = COALESCE(${dto.status ?? null}, status),
        version = version + 1
      WHERE experience_id = ${id}
      RETURNING *
    `;
    return this.toResponse(rows[0]);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.prisma.$executeRaw`
      UPDATE catalog.experiences SET deleted_at = NOW() WHERE experience_id = ${id}
    `;
    return result > 0;
  }

  private async toResponse(row: any): Promise<ExperienceResponseDto> {
    const cats = await this.prisma.$queryRaw<{ category_id: string }[]>`
      SELECT category_id FROM catalog.experience_categories WHERE experience_id = ${row.experience_id}
    `;
    return {
      experienceId: row.experience_id,
      destinationId: row.destination_id,
      partnerId: row.partner_id ?? undefined,
      nameAr: row.name_ar,
      nameEn: row.name_en,
      slug: row.slug,
      summaryAr: row.summary_ar ?? undefined,
      summaryEn: row.summary_en ?? undefined,
      descriptionAr: row.description_ar ?? undefined,
      descriptionEn: row.description_en ?? undefined,
      latitude: row.location?.lat ?? undefined,
      longitude: row.location?.lng ?? undefined,
      duration: row.duration ?? undefined,
      durationUnit: row.duration_unit ?? undefined,
      maxGuests: row.max_guests ?? undefined,
      minGuests: row.min_guests ?? undefined,
      originalPrice: row.original_price ? Number(row.original_price) : undefined,
      salePrice: row.sale_price ? Number(row.sale_price) : undefined,
      currency: row.currency,
      imageUrl: row.image_url ?? undefined,
      images: row.images ?? undefined,
      includes: row.includes ?? undefined,
      excludes: row.excludes ?? undefined,
      requirements: row.requirements ?? undefined,
      status: row.status,
      publishedAt: row.published_at ?? undefined,
      version: row.version,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      categories: cats.map((c) => ({ categoryId: c.category_id })),
    };
  }
}
