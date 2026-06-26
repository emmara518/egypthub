import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/api/auth';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    const body = await request.json();
    const { event, page, metadata } = body;

    if (!event || typeof event !== 'string') {
      return NextResponse.json({ error: 'event is required and must be a string' }, { status: 400 });
    }

    const log = await prisma.eventLog.create({
      data: {
        event,
        page: page || null,
        userId: user?.userId || null,
        metadata: metadata || undefined,
      },
    });

    return NextResponse.json({ success: true, id: log.id }, { status: 201 });
  } catch (error) {
    console.error('POST /api/analytics/track error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
