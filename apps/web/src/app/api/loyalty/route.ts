import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/api/auth';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

const TIER_THRESHOLDS: { tier: string; xp: number }[] = [
  { tier: 'explorer', xp: 0 },
  { tier: 'bronze', xp: 100 },
  { tier: 'silver', xp: 500 },
  { tier: 'gold', xp: 1500 },
  { tier: 'platinum', xp: 3000 },
  { tier: 'diamond', xp: 6000 },
];

function calculateLoyaltyData(xp: number) {
  const level = Math.floor(xp / 100) + 1;
  const xpToNextLevel = (level * 100) - xp;

  let tier = TIER_THRESHOLDS[0].tier;
  let nextTier: string | null = null;

  for (let i = TIER_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= TIER_THRESHOLDS[i].xp) {
      tier = TIER_THRESHOLDS[i].tier;
      nextTier = i < TIER_THRESHOLDS.length - 1 ? TIER_THRESHOLDS[i + 1].tier : null;
      break;
    }
  }

  const currentThreshold = TIER_THRESHOLDS.find(t => t.tier === tier)!;
  const nextThreshold = nextTier ? TIER_THRESHOLDS.find(t => t.tier === nextTier) : null;
  const progress = nextThreshold
    ? Math.min(100, Math.floor(((xp - currentThreshold.xp) / (nextThreshold.xp - currentThreshold.xp)) * 100))
    : 100;

  return { level, xpToNextLevel, tier, nextTier, progress };
}

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
      include: {
        notifications: {
          where: { isRead: false },
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const { level, xpToNextLevel, tier, nextTier, progress } = calculateLoyaltyData(dbUser.loyaltyXp);

    return NextResponse.json({
      xp: dbUser.loyaltyXp,
      level,
      title: dbUser.loyaltyLevel,
      xpToNextLevel,
      tier,
      nextTier,
      progress,
      achievements: [],
      recentActivity: dbUser.notifications,
    });
  } catch (error) {
    console.error('GET /api/loyalty error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { amount, reason } = body;

    if (typeof amount !== 'number' || amount < 1 || amount > 1000) {
      return NextResponse.json({ error: 'Amount must be between 1 and 1000' }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id: user.userId },
      data: { loyaltyXp: { increment: amount } },
    });

    const { level, xpToNextLevel, tier, nextTier, progress } = calculateLoyaltyData(updated.loyaltyXp);

    return NextResponse.json({
      xp: updated.loyaltyXp,
      level,
      title: updated.loyaltyLevel,
      xpToNextLevel,
      tier,
      nextTier,
      progress,
      reason: reason || null,
    });
  } catch (error) {
    console.error('POST /api/loyalty error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
