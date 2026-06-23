import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';
import { getAuthUser } from '@/lib/api/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const auth = await getAuthUser();
  const data = await request.json();
  if (!auth) {
    return NextResponse.json({ error: 'You must be logged in' }, { status: 401 });
  }
  const partner = await prisma.partner.upsert({
    where: { userId: auth.userId },
    update: { ...data, status: 'draft' },
    create: { userId: auth.userId, name: data.name || 'Partner', ...data, status: 'draft' },
  });
  return NextResponse.json({ partner });
}

export async function GET() {
  const auth = await getAuthUser();
  if (!auth || (auth.role !== 'PARTNER' && auth.role !== 'ADMIN')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const partner = await prisma.partner.findUnique({
    where: { userId: auth.userId },
    include: { leads: { orderBy: { createdAt: 'desc' }, take: 20 } },
  });
  if (!partner) {
    return NextResponse.json({ error: 'Partner profile not found' }, { status: 404 });
  }
  return NextResponse.json({ partner });
}
