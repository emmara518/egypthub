import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/api/auth';
import { prisma } from '@/lib/api/prisma';

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { bookingId, paymentMethod } = body;

    if (!bookingId || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields: bookingId, paymentMethod' }, { status: 400 });
    }

    const validMethods = ['card', 'fawry', 'vodafone_cash', 'instapay', 'cash', 'paypal'];
    if (!validMethods.includes(paymentMethod)) {
      return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.userId !== user.userId) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    if (booking.status !== 'PENDING') {
      return NextResponse.json({ error: 'Only PENDING bookings can be paid' }, { status: 400 });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        paymentStatus: 'PAID',
        status: 'CONFIRMED',
        paymentMethod,
      },
    });

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
