import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { SlugService } from '../../shared/slug.service';
import { CreateStoryDto } from '../dto/create-story.dto';
import { UpdateStoryDto } from '../dto/update-story.dto';
import { StoryResponseDto } from '../dto/story-response.dto';

@Injectable()
export class StoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly slugService: SlugService,
  ) {}

  async create(dto: CreateStoryDto): Promise<StoryResponseDto> {
    const slug = dto.slug || this.slugService.generate(dto.titleEn);
    const tags = dto.tags ? JSON.stringify(dto.tags) : null;
    const images = dto.images ? JSON.stringify(dto.images) : null;
    const rows = await this.prisma.$queryRaw<any[]>`
      INSERT INTO catalog.stories (
        destination_id, experience_id, title_ar, title_en, slug,
        content_ar, content_en, excerpt_ar, excerpt_en,
        image_url, images, tags, status
      ) VALUES (
        ${dto.destinationId ?? null}, ${dto.experienceId ?? null}, ${dto.titleAr}, ${dto.titleEn}, ${slug},
        ${dto.contentAr ?? null}, ${dto.contentEn ?? null}, ${dto.excerptAr ?? null}, ${dto.excerptEn ?? null},
        ${dto.imageUrl ?? null}, ${images}::jsonb, ${tags}::jsonb, ${dto.status ?? 'draft'}
      )
      RETURNING *
    `;
    const story = rows[0];
    this.eventEmitter.emit('story.created', new StoryCreatedEvent(story.story_id, story.slug));
    return this.toResponse(story);
  }

  async findAll(filter?: any): Promise<StoryResponseDto[]> {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM catalog.stories WHERE 1=1 AND (status = 'published' OR status = 'featured')
      ORDER BY created_at DESC
    `;
    return rows.map(this.toResponse);
  }

  async findById(id: string): Promise<StoryResponseDto | null> {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM catalog.stories WHERE story_id = ${id}
    `;
    return rows.length ? this.toResponse(rows[0]) : null;
  }

  async findBySlug(slug: string): Promise<StoryResponseDto | null> {
    const rows = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM catalog.stories WHERE slug = ${slug}
    `;
    return rows.length ? this.toResponse(rows[0]) : null;
  }

  async update(id: string, dto: UpdateStoryDto): Promise<StoryResponseDto | null> {
    const rows = await this.prisma.$queryRaw<any[]>`
      UPDATE catalog.stories SET
        destination_id = COALESCE(${dto.destinationId ?? null}, destination_id),
        experience_id = COALESCE(${dto.experienceId ?? null}, experience_id),
        title_ar = COALESCE(${dto.titleAr ?? null}, title_ar),
        title_en = COALESCE(${dto.titleEn ?? null}, title_en),
        slug = COALESCE(${dto.slug ?? null}, slug),
        content_ar = COALESCE(${dto.contentAr ?? null}, content_ar),
        content_en = COALESCE(${dto.contentEn ?? null}, content_en),
        excerpt_ar = COALESCE(${dto.excerptAr ?? null}, excerpt_ar),
        excerpt_en = COALESCE(${dto.excerptEn ?? null}, excerpt_en),
        image_url = COALESCE(${dto.imageUrl ?? null}, image_url),
        tags = COALESCE(${dto.tags ? JSON.stringify(dto.tags) : null}::jsonb, tags),
        images = COALESCE(${dto.images ? JSON.stringify(dto.images) : null}::jsonb, images),
        status = COALESCE(${dto.status ?? null}, status)
      WHERE story_id = ${id}
      RETURNING *
    `;
    return rows.length ? this.toResponse(rows[0]) : null;
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.prisma.$executeRaw`
      UPDATE catalog.stories SET deleted_at = NOW() WHERE story_id = ${id}
    `;
    return result > 0;
  }

  private toResponse(row: any): StoryResponseDto {
    return {
      storyId: row.story_id,
      destinationId: row.destination_id ?? undefined,
      experienceId: row.experience_id ?? undefined,
      titleAr: row.title_ar,
      titleEn: row.title_en,
      slug: row.slug,
      contentAr: row.content_ar ?? undefined,
      contentEn: row.content_en ?? undefined,
      excerptAr: row.excerpt_ar ?? undefined,
      excerptEn: row.excerpt_en ?? undefined,
      imageUrl: row.image_url ?? undefined,
      images: row.images ?? undefined,
      tags: row.tags ?? undefined,
      status: row.status,
      publishedAt: row.published_at ?? undefined,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
