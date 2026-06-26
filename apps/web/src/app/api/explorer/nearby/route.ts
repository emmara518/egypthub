import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get('lat') || '0');
    const lng = parseFloat(searchParams.get('lng') || '0');
    const type = searchParams.get('type') || 'all';
    const limit = Math.min(50, parseInt(searchParams.get('limit') || '10', 10));

    const where: Record<string, unknown> = { isActive: true };
    if (type && type !== 'all') {
      where.category = type.toUpperCase();
    }

    const experiences = await prisma.experience.findMany({
      where,
      take: limit,
      orderBy: { averageRating: 'desc' },
      select: {
        id: true,
        slug: true,
        titleAr: true,
        titleEn: true,
        category: true,
        locationCity: true,
        locationLat: true,
        locationLng: true,
        priceEgp: true,
        averageRating: true,
        totalReviews: true,
        images: true,
        durationHours: true,
      },
    });

    const withDistance = experiences
      .filter((e) => e.locationLat != null && e.locationLng != null)
      .map((e) => {
        const dist = haversine(lat, lng, e.locationLat!, e.locationLng!);
        return { ...e, distanceKm: Math.round(dist * 10) / 10 };
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);

    return NextResponse.json({ data: withDistance });
  } catch (error) {
    console.error('GET /api/explorer/nearby error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}
