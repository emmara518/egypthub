import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, bookingValue } = body;

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const offer = await prisma.offer.findFirst({
      where: {
        code,
        isActive: true,
        validFrom: { lte: new Date() },
        validUntil: { gte: new Date() },
      },
    });

    if (!offer) {
      return NextResponse.json({ valid: false, message: 'الكود غير صالح' });
    }

    if (offer.maxUses !== null && offer.usedCount >= offer.maxUses) {
      return NextResponse.json({ valid: false, message: 'الكود غير صالح' });
    }

    if (bookingValue !== undefined && offer.minBookingValue > 0 && Number(bookingValue) < offer.minBookingValue) {
      return NextResponse.json({ valid: false, message: 'الكود غير صالح' });
    }

    let discountAmount = 0;
    const value = Number(bookingValue || 0);

    if (offer.discountType === 'percentage') {
      discountAmount = Math.round((value * offer.discountValue) / 100 * 100) / 100;
    } else {
      discountAmount = offer.discountValue;
    }

    if (discountAmount > value) discountAmount = value;

    return NextResponse.json({
      valid: true,
      discountAmount,
      discountType: offer.discountType,
      discountValue: offer.discountValue,
      message: 'الكود صالح',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
