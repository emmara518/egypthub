import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/api/auth';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const experienceId = searchParams.get('experienceId');

    if (!experienceId) {
      return NextResponse.json({ error: 'experienceId is required' }, { status: 400 });
    }

    const provider = await prisma.provider.findUnique({ where: { userId: user.userId } });
    if (!provider) return NextResponse.json({ error: 'Provider not found' }, { status: 404 });

    const experience = await prisma.experience.findUnique({
      where: { id: experienceId },
      select: { providerId: true },
    });

    if (!experience) return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    if (experience.providerId !== provider.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const availability = await prisma.providerAvailability.findMany({
      where: { experienceId },
      orderBy: { date: 'asc' },
    });

    return NextResponse.json(availability);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { experienceId, date, maxParticipants, timeSlots } = body;

    if (!experienceId || !date) {
      return NextResponse.json({ error: 'experienceId and date are required' }, { status: 400 });
    }

    const provider = await prisma.provider.findUnique({ where: { userId: user.userId } });
    if (!provider) return NextResponse.json({ error: 'Provider not found' }, { status: 404 });

    const experience = await prisma.experience.findUnique({
      where: { id: experienceId },
      select: { providerId: true },
    });

    if (!experience) return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    if (experience.providerId !== provider.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const availability = await prisma.providerAvailability.upsert({
      where: { experienceId_date: { experienceId, date: new Date(date) } },
      update: {
        maxParticipants: maxParticipants ?? 10,
        timeSlots: timeSlots ?? [],
        isAvailable: true,
      },
      create: {
        experienceId,
        date: new Date(date),
        maxParticipants: maxParticipants ?? 10,
        timeSlots: timeSlots ?? [],
      },
    });

    return NextResponse.json(availability, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
