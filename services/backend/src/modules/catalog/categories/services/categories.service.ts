import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { SlugService } from '../shared/slug.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly slugService: SlugService,
  ) {}

  async create(dto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const slug = await this.slugService.ensureUnique(
      this.slugService.generate(dto.nameEn),
      (candidate) =>
        this.prisma.$queryRaw`
          SELECT 1 FROM catalog.categories WHERE slug = ${candidate}
        `.then((r: any) => r.length > 0),
    );
    const cat = await this.prisma.$queryRaw<any[]>`
      INSERT INTO catalog.categories (name_ar, name_en, slug, description_ar, description_en, icon, image_url, sort_order, is_active)
      VALUES (${dto.nameAr}, ${dto.nameEn}, ${slug}, ${dto.descriptionAr ?? null}, ${dto.descriptionEn ?? null}, ${dto.icon ?? null}, ${dto.imageUrl ?? null}, ${dto.sortOrder ?? 0}, ${dto.isActive ?? true})
      RETURNING category_id, name_ar, name_en, slug, description_ar, description_en, icon, image_url, sort_order, is_active, created_at, updated_at
    `;
    return this.toResponse(cat[0]);
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM catalog.categories WHERE is_active = true ORDER BY sort_order ASC, name_en ASC
    `;
    return rows.map(this.toResponse);
  }

  async findById(id: string): Promise<CategoryResponseDto | null> {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM catalog.categories WHERE category_id = ${id}
    `;
    return rows.length ? this.toResponse(rows[0]) : null;
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<CategoryResponseDto | null> {
    const existing = await this.findById(id);
    if (!existing) return null;
    const slug =
      dto.nameEn && dto.nameEn !== existing.nameEn
        ? await this.slugService.ensureUnique(
            this.slugService.generate(dto.nameEn),
            (candidate) =>
              this.prisma.$queryRaw`
                SELECT 1 FROM catalog.categories WHERE slug = ${candidate} AND category_id != ${id}
              `.then((r: any) => r.length > 0),
          )
        : existing.slug;
    const rows = await this.prisma.$queryRaw<any[]>`
      UPDATE catalog.categories SET
        name_ar = COALESCE(${dto.nameAr ?? null}, name_ar),
        name_en = COALESCE(${dto.nameEn ?? null}, name_en),
        slug = ${slug},
        description_ar = COALESCE(${dto.descriptionAr ?? null}, description_ar),
        description_en = COALESCE(${dto.descriptionEn ?? null}, description_en),
        icon = COALESCE(${dto.icon ?? null}, icon),
        image_url = COALESCE(${dto.imageUrl ?? null}, image_url),
        sort_order = COALESCE(${dto.sortOrder ?? null}, sort_order),
        is_active = COALESCE(${dto.isActive ?? null}, is_active)
      WHERE category_id = ${id}
      RETURNING category_id, name_ar, name_en, slug, description_ar, description_en, icon, image_url, sort_order, is_active, created_at, updated_at
    `;
    return this.toResponse(rows[0]);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.prisma.$executeRaw`
      DELETE FROM catalog.categories WHERE category_id = ${id}
    `;
    return result > 0;
  }

  private toResponse(row: any): CategoryResponseDto {
    return {
      categoryId: row.category_id,
      nameAr: row.name_ar,
      nameEn: row.name_en,
      slug: row.slug,
      descriptionAr: row.description_ar ?? undefined,
      descriptionEn: row.description_en ?? undefined,
      icon: row.icon ?? undefined,
      imageUrl: row.image_url ?? undefined,
      sortOrder: row.sort_order,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
