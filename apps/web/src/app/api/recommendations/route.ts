import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      where: { isActive: true },
      orderBy: [{ averageRating: 'desc' }, { totalReviews: 'desc' }],
      take: 10,
      select: {
        id: true,
        slug: true,
        titleAr: true,
        titleEn: true,
        category: true,
        locationCity: true,
        priceEgp: true,
        averageRating: true,
        totalReviews: true,
        images: true,
        durationHours: true,
      },
    });

    return NextResponse.json({ data: experiences });
  } catch (error) {
    console.error('GET /api/recommendations error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
