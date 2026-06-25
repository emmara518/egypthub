'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { HiOutlineViewGrid } from 'react-icons/hi';

export default function PassportWidget() {
  const { xp, level, title, passport, stamps } = useAppStore((s) => s.gamification);

  const visitedCount = passport.filter((p) => p.visited).length;
  const totalCount = 8;
  const progress = totalCount > 0 ? (visitedCount / totalCount) * 100 : 0;
  const recentStamps = [...stamps].reverse().slice(0, 3);

  const levels = [
    { level: 1, xpNeeded: 100 },
    { level: 2, xpNeeded: 300 },
    { level: 3, xpNeeded: 700 },
    { level: 4, xpNeeded: 1500 },
    { level: 5, xpNeeded: 3000 },
    { level: 6, xpNeeded: 6000 },
  ];
  const nextLevel = levels.find((l) => l.level === level + 1);
  const currentLevelXP = level === 1 ? 0 : levels[level - 2]?.xpNeeded || 0;
  const nextLevelXP = nextLevel?.xpNeeded || currentLevelXP + 1;
  const xpProgress = nextLevel ? ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100 : 100;

  return (
    <Link href="/passport">
      <motion.div
        whileHover={{ y: -3 }}
        className="rounded-2xl border border-theme-gold/20 bg-theme-card p-4 cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-theme-gold/15 flex items-center justify-center">
              <HiOutlineViewGrid className="text-theme-gold text-sm" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-playfair text-theme">جواز السفر</h3>
              <p className="text-[10px] text-theme-muted font-cairo">{title}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-theme-gold font-cairo">{level}</span>
        </div>

        <div className="relative h-1.5 bg-theme-surface rounded-full overflow-hidden mb-1">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(xpProgress, 100)}%` }}
            transition={{ duration: 1 }}
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #D4A24C, #E8C97A)',
            }}
          />
        </div>
        <p className="text-[9px] text-theme-muted font-cairo mb-3">{xp.toLocaleString()} XP</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-theme-secondary font-cairo">
            {visitedCount}/{totalCount} مدن
          </span>
          <div className="flex gap-1" dir="ltr">
            {recentStamps.map((s) => (
              <span key={s} className="text-xs">📬</span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
