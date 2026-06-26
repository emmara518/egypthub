import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/api/auth';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

const HEALTH_CHECK_ENDPOINTS = [
  { name: 'Auth Login', path: '/api/auth/login', method: 'POST' },
  { name: 'Experiences List', path: '/api/experiences', method: 'GET' },
  { name: 'Providers List', path: '/api/providers', method: 'GET' },
  { name: 'Search', path: '/api/search?q=egypt', method: 'GET' },
  { name: 'AI Concierge', path: '/api/ai-concierge/chat', method: 'POST' },
  { name: 'Bookings', path: '/api/bookings', method: 'GET' },
  { name: 'Recommendations', path: '/api/recommendations', method: 'GET' },
  { name: 'Loyalty', path: '/api/loyalty', method: 'GET' },
  { name: 'Stories', path: '/api/stories', method: 'GET' },
  { name: 'Explorer Cities', path: '/api/explorer/cities', method: 'GET' },
];

async function checkApiHealth(): Promise<{ name: string; status: string; responseTimeMs: number; error?: string }[]> {
  const results = [];
  for (const endpoint of HEALTH_CHECK_ENDPOINTS) {
    const start = Date.now();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${endpoint.path}`, {
        method: endpoint.method,
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(5000),
      });
      const elapsed = Date.now() - start;
      results.push({
        name: endpoint.name,
        status: res.ok ? 'healthy' : 'degraded',
        responseTimeMs: elapsed,
        error: res.ok ? undefined : `HTTP ${res.status}`,
      });
    } catch (e) {
      results.push({
        name: endpoint.name,
        status: 'down',
        responseTimeMs: Date.now() - start,
        error: e instanceof Error ? e.message : 'Unknown error',
      });
    }
  }
  return results;
}

export async function GET() {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (auth.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const [
      totalUsers,
      recentUsers,
      totalBookings,
      recentBookings,
      totalProviders,
      totalExperiences,
      bookingStats,
      paymentStats,
      totalReviews,
      totalStories,
      activeNotifications,
      eventCount,
      recentEvents,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 5, select: { id: true, name: true, email: true, role: true, createdAt: true } }),
      prisma.booking.count(),
      prisma.booking.findMany({ orderBy: { createdAt: 'desc' }, take: 10, include: { user: { select: { name: true } }, experience: { select: { titleAr: true } } } }),
      prisma.provider.count(),
      prisma.experience.count(),
      prisma.booking.groupBy({ by: ['status'], _count: true }),
      prisma.booking.groupBy({ by: ['paymentStatus'], _count: true }),
      prisma.review.count(),
      prisma.story.count({ where: { isPublished: true } }),
      prisma.notification.count({ where: { isRead: false } }),
      prisma.eventLog.count(),
      prisma.eventLog.findMany({ orderBy: { timestamp: 'desc' }, take: 10, select: { event: true, page: true, userId: true, timestamp: true } }),
    ]);

    const roleDistribution = await prisma.user.groupBy({ by: ['role'], _count: true });
    const recentErrors = recentEvents.filter(e => e.event.toLowerCase().includes('error'));

    const totalEgpRevenue = await prisma.booking.aggregate({ _sum: { totalPriceEgp: true }, where: { paymentStatus: 'PAID' } });

    const successfulBookings = bookingStats.find(b => b.status === 'CONFIRMED')?._count || 0;
    const cancelledBookings = bookingStats.find(b => b.status === 'CANCELLED')?._count || 0;
    const totalAllBookings = bookingStats.reduce((acc, b) => acc + b._count, 0);
    const bookingSuccessRate = totalAllBookings > 0 ? Math.round((successfulBookings / totalAllBookings) * 100) : 0;

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayBookings = await prisma.booking.count({ where: { createdAt: { gte: todayStart } } });
    const todayUsers = await prisma.user.count({ where: { createdAt: { gte: todayStart } } });
    const todayRevenue = await prisma.booking.aggregate({ _sum: { totalPriceEgp: true }, where: { paymentStatus: 'PAID', createdAt: { gte: todayStart } } });

    const apiHealth = await checkApiHealth();
    const healthyCount = apiHealth.filter(a => a.status === 'healthy').length;
    const avgResponse = Math.round(apiHealth.reduce((acc, a) => acc + a.responseTimeMs, 0) / apiHealth.length);

    return NextResponse.json({
      summary: {
        totalUsers,
        totalBookings,
        totalProviders,
        totalExperiences,
        totalReviews,
        totalStories,
        totalRevenueEgp: totalEgpRevenue._sum.totalPriceEgp || 0,
        activeNotifications,
        totalEvents: eventCount,
      },
      today: {
        bookings: todayBookings,
        users: todayUsers,
        revenueEgp: todayRevenue._sum.totalPriceEgp || 0,
      },
      bookings: {
        byStatus: bookingStats.map(b => ({ status: b.status, count: b._count })),
        byPaymentStatus: paymentStats.map(p => ({ status: p.paymentStatus, count: p._count })),
        successRate: bookingSuccessRate,
        recent: recentBookings.map(b => ({
          id: b.id,
          reference: b.bookingReference,
          user: b.user.name,
          experience: b.experience.titleAr,
          status: b.status,
          paymentStatus: b.paymentStatus,
          totalEgp: b.totalPriceEgp,
          createdAt: b.createdAt,
        })),
      },
      users: {
        total: totalUsers,
        distribution: roleDistribution.map(r => ({ role: r.role, count: r._count })),
        recent: recentUsers,
      },
      apiHealth: {
        endpoints: apiHealth,
        healthyCount,
        totalCount: apiHealth.length,
        avgResponseTimeMs: avgResponse,
        overallStatus: healthyCount === apiHealth.length ? 'healthy' : healthyCount > apiHealth.length / 2 ? 'degraded' : 'critical',
      },
      events: {
        total: eventCount,
        recentErrors: recentErrors.slice(0, 5),
        recent: recentEvents.slice(0, 10),
      },
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error('Founder dashboard error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
