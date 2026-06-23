import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async fullTextSearch(query: string, entity: string, filters?: any): Promise<any[]> {
    const matches = [];

    if (entity === 'destinations' || entity === 'all') {
      const destinations = await this.prisma.$queryRaw<any[]>`
        SELECT 
          d.destination_id,
          d.name_en,
          d.name_ar,
          d.slug,
          d.summary_en,
          d.summary_ar,
          d.location,
          d.image_url,
          d.created_at
        FROM catalog.destinations d
        WHERE d.name_en ILIKE ${`%${query}%`} OR d.name_ar ILIKE ${`%${query}%`}
        ORDER BY d.created_at DESC
        LIMIT 20
      `;
      matches.push(...destinations.map(d => ({ ...d, type: 'destination' })));
    }

    if (entity === 'experiences' || entity === 'all') {
      const experiences = await this.prisma.$queryRaw<any[]>`
        SELECT 
          e.experience_id,
          e.name_en,
          e.name_ar,
          e.slug,
          e.summary_en,
          e.summary_ar,
          e.location,
          e.image_url,
          e.created_at
        FROM catalog.experiences e
        WHERE e.name_en ILIKE ${`%${query}%`} OR e.name_ar ILIKE ${`%${query}%`}
        ORDER BY e.created_at DESC
        LIMIT 20
      `;
      matches.push(...experiences.map(e => ({ ...e, type: 'experience' })));
    }

    if (entity === 'stories' || entity === 'all') {
      const stories = await this.prisma.$queryRaw<any[]>`
        SELECT 
          s.story_id,
          s.title_en,
          s.title_ar,
          s.slug,
          s.excerpt_en,
          s.excerpt_ar,
          s.image_url,
          s.created_at
        FROM catalog.stories s
        WHERE s.title_en ILIKE ${`%${query}%`} OR s.title_ar ILIKE ${`%${query}%`}
        ORDER BY s.created_at DESC
        LIMIT 20
      `;
      matches.push(...stories.map(s => ({ ...s, type: 'story' })));
    }

    if (entity === 'offers' || entity === 'all') {
      const offers = await this.prisma.$queryRaw<any[]>`
        SELECT 
          o.offer_id,
          o.name_en,
          o.name_ar,
          o.slug,
          o.description_en,
          o.description_ar,
          o.image_url,
          o.created_at
        FROM catalog.offers o
        WHERE o.name_en ILIKE ${`%${query}%`} OR o.name_ar ILIKE ${`%${query}%`}
        ORDER BY o.created_at DESC
        LIMIT 20
      `;
      matches.push(...offers.map(o => ({ ...o, type: 'offer' })));
    }

    return matches;
  }
}
