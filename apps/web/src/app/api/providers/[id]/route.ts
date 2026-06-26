import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const provider = await prisma.provider.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, avatarUrl: true, email: true } },
        experiences: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
        reviews: {
          orderBy: { createdAt: 'desc' },
          take: 5,
          include: {
            user: { select: { name: true, avatarUrl: true } },
          },
        },
      },
    });

    if (!provider) {
      return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
    }

    return NextResponse.json({ provider });
  } catch (error) {
    console.error('GET /api/providers/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
