import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';
import { getAuthUser } from '@/lib/api/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const auth = await getAuthUser();
  if (!auth || auth.role !== 'AMBASSADOR') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const data = await request.json();
  const ambassador = await prisma.ambassador.upsert({
    where: { userId: auth.userId },
    update: { ...data },
    create: { userId: auth.userId, name: data.name || 'Ambassador', ...data },
  });
  return NextResponse.json({ ambassador });
}
