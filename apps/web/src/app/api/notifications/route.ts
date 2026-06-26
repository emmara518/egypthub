import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/api/auth';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await request.json();
    const { userId, type, titleAr, titleEn, bodyAr, bodyEn, actionUrl } = body;

    if (!userId || !type || !titleAr) {
      return NextResponse.json({ error: 'userId, type, and titleAr are required' }, { status: 400 });
    }

    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        titleAr,
        titleEn: titleEn || null,
        bodyAr: bodyAr || null,
        bodyEn: bodyEn || null,
        actionUrl: actionUrl || null,
      },
    });

    return NextResponse.json(notification, { status: 201 });
  } catch (error) {
    console.error('POST /api/notifications error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
