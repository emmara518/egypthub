import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const city = searchParams.get('city');
    const min_price = searchParams.get('min_price');
    const max_price = searchParams.get('max_price');
    const sort = searchParams.get('sort') || 'newest';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '12', 10)));
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { isActive: true };

    if (category) where.category = category;
    if (city) where.locationCity = city;

    if (min_price || max_price) {
      const priceFilter: Record<string, number> = {};
      if (min_price) priceFilter.gte = parseFloat(min_price);
      if (max_price) priceFilter.lte = parseFloat(max_price);
      where.priceEgp = priceFilter;
    }

    let orderBy: Record<string, string>;
    switch (sort) {
      case 'rating':
        orderBy = { averageRating: 'desc' };
        break;
      case 'price':
        orderBy = { priceEgp: 'asc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    const [data, total] = await Promise.all([
      prisma.experience.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          provider: {
            select: { id: true, businessNameAr: true, businessNameEn: true, locationCity: true },
          },
        },
      }),
      prisma.experience.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({ data, total, page, limit, totalPages });
  } catch (error) {
    console.error('GET /api/experiences error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
