import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const city = searchParams.get('city');
    const sort = searchParams.get('sort') || 'newest';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '12', 10)));
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { isActive: true };

    if (category) where.category = category;
    if (city) where.locationCity = city;

    let orderBy: Record<string, string>;
    switch (sort) {
      case 'rating':
        orderBy = { averageRating: 'desc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    const [data, total] = await Promise.all([
      prisma.provider.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          user: { select: { name: true, avatarUrl: true } },
          _count: { select: { experiences: true } },
        },
      }),
      prisma.provider.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({ data, total, page, limit, totalPages });
  } catch (error) {
    console.error('GET /api/providers error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
