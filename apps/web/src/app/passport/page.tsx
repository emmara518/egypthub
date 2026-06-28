'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import destinations from '@/data/destinations.json';
import LevelProgress from '@/components/gamification/LevelProgress';
import CityStamp from '@/components/gamification/CityStamp';
import BadgeGrid from '@/components/gamification/BadgeGrid';
import achievementsData from '@/data/achievements.json';
import BrandMotif from '@/components/BrandMotif';
import AchievementCard from '@/components/gamification/AchievementCard';
import { HiOutlineGlobe, HiOutlineBadgeCheck } from 'react-icons/hi';

const LEVELS = [
  { level: 6, xp: 6000, title: 'أسطورة السياحة' },
  { level: 5, xp: 3000, title: 'سفير مصر' },
  { level: 4, xp: 1500, title: 'مستكشف محترف' },
  { level: 3, xp: 700, title: 'مغامر' },
  { level: 2, xp: 300, title: 'رحالة' },
  { level: 1, xp: 100, title: 'مستكشف جديد' },
];

export default function PassportPage() {
  const { xp, level, title, passport, stamps, achievements } = useAppStore((s) => s.gamification);
  const visitCity = useAppStore((s) => s.visitCity);
  const addXp = useAppStore((s) => s.addXp);

  const currentLevel = LEVELS.find((l) => l.level === level) || LEVELS[5];
  const nextLevel = LEVELS.find((l) => l.level === level + 1);
  const xpForCurrent = level === 1 ? 0 : LEVELS.filter((l) => l.level < level).reduce((a, l) => a + l.xp, 0);
  const xpForNext = LEVELS.filter((l) => l.level <= level).reduce((a, l) => a + l.xp, 0);
  const xpProgress = nextLevel ? ((xp - xpForCurrent) / (xpForNext - xpForCurrent)) * 100 : 100;

  const visitedCount = passport.filter((p) => p.visited).length;
  const totalCities = destinations.length;
  const completionPct = totalCities > 0 ? Math.round((visitedCount / totalCities) * 100) : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-theme-bg pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">

          <motion.div variants={itemVariants} className="text-center">
            <BrandMotif variant="avatar-ring" size="sm" className="mx-auto mb-3" />
            <h1 className="text-3xl md:text-4xl font-bold font-playfair text-theme mb-2">
              جواز السفر المصري
            </h1>
            <div className="w-20 h-0.5 bg-gradient-gold mx-auto mb-3" />
            <p className="text-theme-secondary font-cairo text-sm">تتبع رحلاتك عبر المدن المصرية</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <LevelProgress />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <HiOutlineGlobe className="text-theme-gold text-xl" />
                <h2 className="text-lg font-bold font-playfair text-theme">المدن المصرية</h2>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold text-theme-gold font-english">{completionPct}%</span>
                <p className="text-[10px] text-theme-muted font-cairo">مكتمل</p>
              </div>
            </div>

            <div className="relative h-2 bg-theme-surface rounded-full overflow-hidden mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPct}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold))',
                  boxShadow: '0 0 8px rgba(212,162,76,0.4)',
                }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {destinations.map((dest) => {
                const entry = passport.find((p) =>
                  p.city === dest.slug || p.city === dest.nameEn
                );
                const visited = entry?.visited || false;
                return (
                  <motion.div
                    key={dest.id}
                    whileHover={{ y: -4 }}
                    className={`rounded-xl border p-4 text-center transition-all ${
                      visited
                        ? 'border-theme-gold/30 bg-theme-gold/5'
                        : 'border-theme-border bg-theme-surface'
                    }`}
                  >
                    <div className="flex justify-center mb-2">
                      <CityStamp
                        city={dest.nameAr}
                        region={dest.slug}
                        visited={visited}
                        date={entry?.date}
                      />
                    </div>
                    <h3 className={`font-bold text-sm font-cairo mb-1 ${visited ? 'text-theme' : 'text-theme-muted'}`}>
                      {dest.nameAr}
                    </h3>
                    {visited && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-1"
                      >
                        <p className="text-[10px] text-theme-gold font-cairo">
                          {entry?.stamps || 1} طوابع
                        </p>
                        <p className="text-[9px] text-theme-muted font-cairo">
                          {entry?.date ? new Date(entry.date).toLocaleDateString('ar-EG') : ''}
                        </p>
                      </motion.div>
                    )}
                    {!visited && (
                      <button
                        onClick={() => {
                          visitCity(dest.slug);
                          addXp(50);
                        }}
                        className="mt-2 px-3 py-1 rounded-lg text-[10px] font-bold font-cairo gold-btn"
                      >
                        أضف المدينة
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
            <div className="flex items-center gap-3 mb-5">
              <HiOutlineBadgeCheck className="text-theme-gold text-xl" />
              <h2 className="text-lg font-bold font-playfair text-theme">الإنجازات</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {achievementsData.map((ach, i) => {
                const stored = achievements?.find((a) => a.id === ach.id);
                return (
                  <AchievementCard
                    key={ach.id}
                    achievement={ach}
                    unlocked={stored?.unlocked || false}
                    unlockedAt={stored?.unlockedAt}
                    index={i}
                  />
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
            <h2 className="text-lg font-bold font-playfair text-theme mb-5">الشارات</h2>
            <BadgeGrid />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
