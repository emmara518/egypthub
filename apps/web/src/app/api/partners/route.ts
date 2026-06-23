import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const partners = await prisma.partner.findMany({
    where: { status: 'approved' },
    orderBy: { rating: 'desc' },
  });
  return NextResponse.json({ partners });
}
