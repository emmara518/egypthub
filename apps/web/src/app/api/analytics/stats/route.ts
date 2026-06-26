import { NextResponse } from 'next/server';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'week';

    const now = new Date();
    let since: Date;

    switch (period) {
      case 'day':
        since = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'month':
        since = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'week':
      default:
        since = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    const events = await prisma.eventLog.findMany({
      where: { timestamp: { gte: since } },
    });

    const totalEvents = events.length;
    const uniqueUserIds = new Set(events.filter(e => e.userId).map(e => e.userId));
    const uniqueUsers = uniqueUserIds.size;

    const pageCounts = new Map<string, number>();
    for (const e of events) {
      if (e.page) {
        pageCounts.set(e.page, (pageCounts.get(e.page) || 0) + 1);
      }
    }
    const topPages = [...pageCounts.entries()]
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const eventCounts = new Map<string, number>();
    for (const e of events) {
      eventCounts.set(e.event, (eventCounts.get(e.event) || 0) + 1);
    }
    const funnelData = [...eventCounts.entries()]
      .map(([event, count]) => ({ event, count }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({ totalEvents, uniqueUsers, topPages, funnelData });
  } catch (error) {
    console.error('GET /api/analytics/stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
