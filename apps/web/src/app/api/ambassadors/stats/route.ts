import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';
import { getAuthUser } from '@/lib/api/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const auth = await getAuthUser();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const ambassador = await prisma.ambassador.findUnique({
    where: { userId: auth.userId },
    include: { referrals: true, leads: true },
  });
  if (!ambassador) {
    return NextResponse.json({ error: 'Ambassador profile not found' }, { status: 404 });
  }
  return NextResponse.json({
    referrals: ambassador.referrals,
    leads: ambassador.leads,
    totalReferrals: ambassador.totalReferrals,
    totalCommissions: ambassador.totalCommissions,
  });
}
