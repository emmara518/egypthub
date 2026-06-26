import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      where: { isActive: true },
      orderBy: [{ averageRating: 'desc' }, { totalReviews: 'desc' }],
      take: 6,
      include: {
        provider: {
          select: { businessNameAr: true, businessNameEn: true, locationCity: true },
        },
      },
    });

    return NextResponse.json({ data: experiences });
  } catch (error) {
    console.error('GET /api/experiences/featured error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
