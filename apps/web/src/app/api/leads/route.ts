import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';
import { getAuthUser } from '@/lib/api/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const data = await request.json();
  if (!data.clientName || !data.clientPhone) {
    return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
  }
  const auth = await getAuthUser();
  const lead = await prisma.lead.create({
    data: {
      source: data.source || 'direct',
      status: 'new',
      clientName: data.clientName,
      clientEmail: data.clientEmail || null,
      clientPhone: data.clientPhone,
      clientNotes: data.clientNotes || null,
      destination: data.destination || null,
      budget: data.budget || null,
      timeline: data.timeline || null,
      ambassadorId: data.ambassadorId || null,
      partnerId: data.partnerId || null,
      ownerId: auth?.userId || null,
    },
  });
  return NextResponse.json({ lead }, { status: 201 });
}

export async function GET() {
  const auth = await getAuthUser();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const where = auth.role === 'ADMIN' ? {} : { ownerId: auth.userId };
  const leads = await prisma.lead.findMany({
    where,
    include: { ambassador: { select: { name: true } }, partner: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  return NextResponse.json({ leads });
}
