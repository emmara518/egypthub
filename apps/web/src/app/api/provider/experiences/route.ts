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
    });

    if (!provider) {
      return NextResponse.json({ error: 'Provider profile not found' }, { status: 404 });
    }

    const experiences = await prisma.experience.findMany({
      where: { providerId: provider.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ experiences });
  } catch (error) {
    console.error('GET /api/provider/experiences error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const provider = await prisma.provider.findUnique({
      where: { userId: auth.userId },
    });

    if (!provider) {
      return NextResponse.json({ error: 'Provider profile not found' }, { status: 404 });
    }

    const body = await request.json();
    const {
      slug,
      titleAr,
      titleEn,
      descriptionAr,
      descriptionEn,
      category,
      locationCity,
      priceEgp,
      priceUsd,
      durationHours,
      maxParticipants,
      images,
      included,
      excluded,
    } = body;

    if (!slug || !titleAr || !descriptionAr || !locationCity || priceEgp === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existing = await prisma.experience.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }

    const experience = await prisma.experience.create({
      data: {
        slug,
        titleAr,
        titleEn,
        descriptionAr,
        descriptionEn,
        category,
        locationCity,
        priceEgp,
        priceUsd,
        durationHours,
        maxParticipants,
        images: images || [],
        included: included || [],
        excluded: excluded || [],
        providerId: provider.id,
      },
    });

    return NextResponse.json({ experience }, { status: 201 });
  } catch (error) {
    console.error('POST /api/provider/experiences error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
