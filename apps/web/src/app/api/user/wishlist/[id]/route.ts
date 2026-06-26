import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/api/auth';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;

    const wishlistItem = await prisma.wishlist.findUnique({ where: { id } });

    if (!wishlistItem) {
      return NextResponse.json({ error: 'Wishlist item not found' }, { status: 404 });
    }

    if (wishlistItem.userId !== user.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.wishlist.delete({ where: { id } });

    return NextResponse.json({ message: 'Wishlist item removed' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
