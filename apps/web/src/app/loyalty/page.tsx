'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiStar, HiSparkles, HiArrowUp, HiClock, HiCheck, HiChevronLeft, HiGift } from 'react-icons/hi';

interface LoyaltyData {
  xp: number;
  level: number;
  title: string;
  tier: { name: string; color: string };
  nextTier: { name: string; xpNeeded: number } | null;
  progress: number;
  recentActivity: { action: string; date: string }[];
  rewards: { id: number; title: string; xpCost: number; icon: string }[];
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5 animate-pulse">
      <div className="h-4 w-24 bg-theme-surface rounded mb-3" />
      <div className="h-8 w-32 bg-theme-surface rounded mb-2" />
      <div className="h-3 w-20 bg-theme-surface rounded" />
    </div>
  );
}

function StatSkeleton() {
  return (
    <div className="rounded-2xl border border-theme-gold/10 bg-theme-card p-4 animate-pulse">
      <div className="h-3 w-16 bg-theme-surface rounded mb-2" />
      <div className="h-7 w-20 bg-theme-surface rounded" />
    </div>
  );
}

export default function LoyaltyPage() {
  const [data, setData] = useState<LoyaltyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLoyalty = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/loyalty');
      if (!res.ok) throw new Error('فشل في تحميل بيانات الولاء');
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'حدث خطأ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoyalty();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-bg pt-28 pb-16">
        <div className="container-mobile">
          <div className="mb-8">
            <div className="h-4 w-20 bg-theme-surface rounded animate-pulse mb-2" />
            <div className="h-9 w-64 bg-theme-surface rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <StatSkeleton />
            <StatSkeleton />
          </div>
          <div className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5 animate-pulse">
            <div className="h-5 w-32 bg-theme-surface rounded mb-4" />
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-theme-surface" />
                <div className="flex-1">
                  <div className="h-3 w-40 bg-theme-surface rounded mb-1" />
                  <div className="h-2 w-20 bg-theme-surface rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center px-4 pt-24">
        <div className="text-center">
          <HiSparkles className="w-12 h-12 mx-auto mb-4 text-theme-gold/50" />
          <p className="text-theme-secondary font-cairo mb-4">{error}</p>
          <button onClick={fetchLoyalty}
            className="px-6 py-3 rounded-xl bg-theme-gold hover:bg-theme-gold/80 text-dark-900 font-bold font-cairo transition-all">
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const recentActivity = data.recentActivity || [];
  const rewards = data.rewards || [];

  return (
    <div className="min-h-screen bg-theme-bg pt-28 pb-16">
      <div className="container-mobile">
        <Link href="/"
          className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <HiChevronLeft className="w-4 h-4" />
          العودة للرئيسية
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-theme-gold/30 text-theme-gold text-xs font-semibold mb-3">
            <HiStar className="w-3.5 h-3.5" />برنامج الولاء
          </span>
          <h1 className="text-3xl md:text-4xl font-bold font-playfair text-theme">
            المسافر
          </h1>
          <p className="text-theme-secondary font-cairo mt-1">امنح نقاطاً واستبدلها بمكافآت حصرية</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="rounded-2xl border border-theme-gold/20 bg-gradient-to-l from-theme-gold/10 to-transparent p-5">
            <p className="text-xs text-theme-muted font-cairo mb-1">نقاط الخبرة</p>
            <p className="text-2xl font-bold text-theme-gold font-english">{data.xp.toLocaleString()} XP</p>
            <p className="text-xs text-theme-muted font-cairo mt-1">المستوى {data.level} &middot; {data.title}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
            <p className="text-xs text-theme-muted font-cairo mb-1">الدرجة الحالية</p>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: data.tier.color }} />
              <p className="text-xl font-bold text-theme font-english">{data.tier.name}</p>
            </div>
            {data.nextTier && (
              <p className="text-xs text-theme-muted font-cairo mt-1">
                {data.nextTier.xpNeeded.toLocaleString()} XP للوصول إلى {data.nextTier.name}
              </p>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-theme-muted font-cairo">التقدم</p>
              <span className="text-xs text-theme-gold font-english">{data.progress}%</span>
            </div>
            <div className="w-full h-2 bg-theme-surface rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${data.progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold))', boxShadow: '0 0 8px rgba(212,162,76,0.4)' }} />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <HiClock className="text-theme-gold text-lg" />
                <h2 className="text-lg font-bold font-playfair text-theme">النشاط الأخير</h2>
              </div>
              {recentActivity.length === 0 ? (
                <p className="text-theme-muted text-sm font-cairo">لا يوجد نشاط حتى الآن</p>
              ) : (
                <div className="space-y-3">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-theme-surface border border-theme-border">
                      <div className="w-9 h-9 rounded-lg bg-theme-gold/10 flex items-center justify-center">
                        <HiArrowUp className="text-theme-gold text-sm" />
                      </div>
                      <div>
                        <p className="text-sm text-theme font-cairo">{item.action}</p>
                        <p className="text-xs text-theme-muted font-cairo">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="space-y-4">
            <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <HiGift className="text-theme-gold text-lg" />
                <h2 className="text-lg font-bold font-playfair text-theme">المكافآت</h2>
              </div>
              <div className="space-y-3">
                {rewards.length === 0 ? (
                  <p className="text-theme-muted text-sm font-cairo">لا توجد مكافآت متاحة حالياً</p>
                ) : (
                  rewards.map((reward, i) => (
                    <div key={reward.id} className="flex items-center gap-3 p-3 rounded-xl bg-theme-surface border border-theme-border">
                      <div className="w-10 h-10 rounded-xl bg-theme-gold/10 flex items-center justify-center text-xl shrink-0">
                        {reward.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-theme font-cairo truncate">{reward.title}</p>
                        <p className="text-xs text-theme-gold font-english">{reward.xpCost} XP</p>
                      </div>
                      <button className="px-3 py-1.5 rounded-lg bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:bg-theme-gold/80 transition-all shrink-0">
                        استبدل
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
