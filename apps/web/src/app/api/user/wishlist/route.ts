import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/api/auth';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const wishlist = await prisma.wishlist.findMany({
      where: { userId: user.userId },
      select: { id: true, itemType: true, itemId: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(wishlist);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { itemType, itemId } = await request.json();

    if (!itemType || !itemId) {
      return NextResponse.json({ error: 'itemType and itemId are required' }, { status: 400 });
    }

    const existing = await prisma.wishlist.findUnique({
      where: { userId_itemType_itemId: { userId: user.userId, itemType, itemId } },
    });

    if (existing) {
      return NextResponse.json(existing);
    }

    const item = await prisma.wishlist.create({
      data: { userId: user.userId, itemType, itemId },
      select: { id: true, itemType: true, itemId: true, createdAt: true },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
