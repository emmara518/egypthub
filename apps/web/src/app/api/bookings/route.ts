import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/api/auth';
import { prisma } from '@/lib/api/prisma';
import type { BookingStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { experienceId, providerId, bookingDate, bookingTime, participants, currency, notes, offerCode } = body;

    if (!experienceId || !providerId || !bookingDate || !participants) {
      return NextResponse.json({ error: 'Missing required fields: experienceId, providerId, bookingDate, participants' }, { status: 400 });
    }

    const experience = await prisma.experience.findUnique({
      where: { id: experienceId },
      select: { priceEgp: true, priceUsd: true, maxParticipants: true },
    });

    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    const participantsNum = Number(participants);
    if (experience.maxParticipants && participantsNum > experience.maxParticipants) {
      return NextResponse.json({ error: `Max participants is ${experience.maxParticipants}` }, { status: 400 });
    }

    if (offerCode) {
      const offer = await prisma.offer.findUnique({ where: { code: offerCode } });
      if (!offer || !offer.isActive || offer.validFrom > new Date() || offer.validUntil < new Date()) {
        return NextResponse.json({ error: 'Invalid or expired offer code' }, { status: 400 });
      }
      if (offer.maxUses !== null && offer.usedCount >= offer.maxUses) {
        return NextResponse.json({ error: 'Offer code has reached max uses' }, { status: 400 });
      }
    }

    const bookingDateParsed = new Date(bookingDate);

    const availability = await prisma.providerAvailability.findUnique({
      where: { experienceId_date: { experienceId, date: bookingDateParsed } },
    });

    if (availability && !availability.isAvailable) {
      return NextResponse.json({ error: 'This date is not available' }, { status: 400 });
    }

    if (availability && (availability.bookedCount + participantsNum) > availability.maxParticipants) {
      return NextResponse.json({ error: 'Not enough availability for requested participants' }, { status: 400 });
    }

    let totalPriceEgp = experience.priceEgp * participantsNum;
    let discountAmount = 0;

    if (offerCode) {
      const offer = await prisma.offer.findUnique({ where: { code: offerCode } });
      if (offer) {
        if (offer.discountType === 'percentage') {
          discountAmount = Math.round((totalPriceEgp * offer.discountValue) / 100 * 100) / 100;
        } else {
          discountAmount = offer.discountValue;
        }
        if (discountAmount > totalPriceEgp) discountAmount = totalPriceEgp;
        totalPriceEgp -= discountAmount;
      }
    }

    const bookingReference = `EH-${Date.now().toString(36).toUpperCase()}`;

    const booking = await prisma.booking.create({
      data: {
        bookingReference,
        userId: user.userId,
        experienceId,
        providerId,
        bookingDate: bookingDateParsed,
        bookingTime: bookingTime || null,
        participants: participantsNum,
        totalPriceEgp,
        totalPriceUsd: experience.priceUsd ? experience.priceUsd * participantsNum : null,
        currency: currency || 'egp',
        offerCode: offerCode || null,
        discountAmount,
        notes: notes || null,
        status: 'PENDING',
        paymentStatus: 'UNPAID',
      },
    });

    if (offerCode) {
      await prisma.offer.update({
        where: { code: offerCode },
        data: { usedCount: { increment: 1 } },
      });
    }

    if (availability) {
      await prisma.providerAvailability.update({
        where: { experienceId_date: { experienceId, date: bookingDateParsed } },
        data: { bookedCount: { increment: participantsNum } },
      });
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as BookingStatus | null;

    const validStatuses: BookingStatus[] = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'REFUNDED'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status filter' }, { status: 400 });
    }

    const where: { userId: string; status?: BookingStatus } = { userId: user.userId };
    if (status) where.status = status;

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        experience: {
          select: { titleAr: true, slug: true, images: true, locationCity: true },
        },
        provider: {
          select: { businessNameAr: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
