import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const experience = await prisma.experience.findUnique({
      where: { slug },
      include: {
        provider: true,
        reviews: {
          orderBy: { createdAt: 'desc' },
          take: 5,
          include: {
            user: { select: { name: true, avatarUrl: true } },
          },
        },
      },
    });

    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    const relatedExperiences = await prisma.experience.findMany({
      where: {
        category: experience.category,
        id: { not: experience.id },
        isActive: true,
      },
      take: 3,
      include: {
        provider: {
          select: { id: true, businessNameAr: true, businessNameEn: true, locationCity: true },
        },
      },
    });

    return NextResponse.json({ ...experience, relatedExperiences });
  } catch (error) {
    console.error('GET /api/experiences/[slug] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
