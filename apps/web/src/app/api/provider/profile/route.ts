import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';
import { getAuthUser } from '@/lib/api/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const provider = await prisma.provider.findUnique({
      where: { userId: auth.userId },
      include: {
        experiences: { orderBy: { createdAt: 'desc' } },
        _count: { select: { bookings: true } },
      },
    });

    if (!provider) {
      return NextResponse.json({ error: 'Provider profile not found' }, { status: 404 });
    }

    return NextResponse.json({ provider });
  } catch (error) {
    console.error('GET /api/provider/profile error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      businessNameAr,
      businessNameEn,
      category,
      descriptionAr,
      descriptionEn,
      locationCity,
      locationAddress,
      phone,
      email,
      website,
      socialLinks,
    } = body;

    const provider = await prisma.provider.upsert({
      where: { userId: auth.userId },
      update: {
        businessNameAr,
        businessNameEn,
        category,
        descriptionAr,
        descriptionEn,
        locationCity,
        locationAddress,
        phone,
        email,
        website,
        socialLinks,
      },
      create: {
        userId: auth.userId,
        businessNameAr: businessNameAr || '',
        businessNameEn,
        category,
        descriptionAr,
        descriptionEn,
        locationCity,
        locationAddress,
        phone,
        email,
        website,
        socialLinks,
      },
    });

    return NextResponse.json({ provider });
  } catch (error) {
    console.error('POST /api/provider/profile error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
