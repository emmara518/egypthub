import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cities = await prisma.experience.findMany({
      where: { isActive: true },
      select: {
        locationCity: true,
        locationLat: true,
        locationLng: true,
      },
      distinct: ['locationCity'],
    });

    const result = cities
      .filter((c) => c.locationCity)
      .map((c) => ({
        name: c.locationCity,
        lat: c.locationLat,
        lng: c.locationLng,
      }));

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('GET /api/explorer/cities error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
