import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const ambassadors = await prisma.ambassador.findMany({
    include: { user: { select: { id: true, email: true, name: true, avatarUrl: true } } },
    orderBy: { rating: 'desc' },
  });
  return NextResponse.json({ ambassadors });
}
