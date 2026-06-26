import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim() || '';
    const type = searchParams.get('type') || 'all';
    const city = searchParams.get('city')?.trim() || '';

    if (q.length < 2) {
      return NextResponse.json({ query: q, experiences: [], providers: [], stories: [], total: 0 });
    }

    const qFilter = { contains: q, mode: 'insensitive' as const };
    const cityFilter = city ? { locationCity: { contains: city, mode: 'insensitive' as const } } : {};

    const [experiences, providers, stories] = await Promise.all([
      (type === 'all' || type === 'experience')
        ? prisma.experience.findMany({
            where: {
              isActive: true,
              OR: [
                { titleAr: qFilter },
                { descriptionAr: qFilter },
                { locationCity: qFilter },
              ],
              ...cityFilter,
            },
            select: {
              slug: true,
              titleAr: true,
              category: true,
              locationCity: true,
              priceEgp: true,
              averageRating: true,
              images: true,
            },
            take: 20,
          })
        : [],
      (type === 'all' || type === 'provider')
        ? prisma.provider.findMany({
            where: {
              isActive: true,
              OR: [
                { businessNameAr: qFilter },
                { descriptionAr: qFilter },
                { locationCity: qFilter },
              ],
              ...cityFilter,
            },
            select: {
              id: true,
              businessNameAr: true,
              category: true,
              locationCity: true,
              averageRating: true,
            },
            take: 20,
          })
        : [],
      (type === 'all' || type === 'story')
        ? prisma.story.findMany({
            where: {
              isPublished: true,
              OR: [
                { titleAr: qFilter },
                { bodyAr: qFilter },
              ],
            },
            select: {
              slug: true,
              titleAr: true,
              category: true,
              coverImage: true,
              readTimeMinutes: true,
            },
            take: 20,
          })
        : [],
    ]);

    const mappedExperiences = experiences.map((e) => ({
      slug: e.slug,
      titleAr: e.titleAr,
      category: e.category,
      locationCity: e.locationCity,
      priceEgp: e.priceEgp,
      averageRating: e.averageRating,
      images: e.images[0] ?? null,
    }));

    const total = mappedExperiences.length + providers.length + stories.length;

    return NextResponse.json({
      query: q,
      experiences: mappedExperiences,
      providers,
      stories,
      total,
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
