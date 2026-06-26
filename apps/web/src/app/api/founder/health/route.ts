import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/api/auth';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const auth = await getAuthUser();
    if (!auth || auth.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const dbResponseMs = Date.now() - dbStart;

    const routeChecks = [
      { name: 'Database', status: dbResponseMs < 1000 ? 'healthy' : 'degraded', responseTimeMs: dbResponseMs },
      { name: 'Prisma Client', status: 'healthy', responseTimeMs: 0 },
    ];

    return NextResponse.json({
      status: routeChecks.every(r => r.status === 'healthy') ? 'healthy' : 'degraded',
      checks: routeChecks,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      status: 'critical',
      checks: [{ name: 'Database', status: 'down', error: error instanceof Error ? error.message : 'Unknown' }],
      timestamp: new Date().toISOString(),
    }, { status: 200 });
  }
}
