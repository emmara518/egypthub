'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';

const RANKS = [
  { level: 1, title: 'مستكشف جديد', icon: '🌱', color: '#CD7F32' },
  { level: 2, title: 'رحالة', icon: '🚶', color: '#C0C0C0' },
  { level: 3, title: 'مغامر', icon: '🗺️', color: '#FFD700' },
  { level: 4, title: 'مستكشف محترف', icon: '🧭', color: '#FFD700' },
  { level: 5, title: 'سفير مصر', icon: '🌟', color: '#FFD700' },
  { level: 6, title: 'أسطورة السياحة', icon: '👑', color: '#FFD700' },
];

const TIERS = [
  { name: 'برونزي', min: 0, color: '#CD7F32', bg: 'rgba(205,127,50,0.12)', border: 'rgba(205,127,50,0.3)' },
  { name: 'فضي', min: 300, color: '#C0C0C0', bg: 'rgba(192,192,192,0.12)', border: 'rgba(192,192,192,0.3)' },
  { name: 'ذهبي', min: 1500, color: '#FFD700', bg: 'rgba(255,215,0,0.12)', border: 'rgba(255,215,0,0.3)' },
];

export default function RankBadge() {
  const { xp, level, title } = useAppStore((s) => s.gamification);

  const currentRank = RANKS.find((r) => r.level === level) || RANKS[0];
  const nextRank = RANKS.find((r) => r.level === level + 1);
  const tier = [...TIERS].reverse().find((t) => xp >= t.min) || TIERS[0];

  const progress = nextRank
    ? ((xp - (RANKS.find((r) => r.level === level)?.level === level ? RANKS[level - 1]?.level * 100 || 0 : 0)) / 100) * 100
    : 100;

  const xpForThisLevel = level === 1 ? 0 : [0, 0, 100, 300, 700, 1500, 3000][level - 1] || 0;
  const xpForNext = level >= 6 ? xp : [100, 300, 700, 1500, 3000, 6000][level] || xp + 1;
  const levelProgress = level >= 6 ? 100 : ((xp - xpForThisLevel) / (xpForNext - xpForThisLevel)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border p-4 text-center"
      style={{ borderColor: tier.border, backgroundColor: tier.bg }}
    >
      <div className="relative inline-block mb-2">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-4xl"
        >
          {currentRank.icon}
        </motion.div>
        {tier.name === 'ذهبي' && (
          <motion.div
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: `0 0 20px ${tier.color}` }}
          />
        )}
      </div>

      <h3 className="font-bold text-sm font-cairo text-theme">{title}</h3>
      <p className="text-xs font-cairo mt-0.5" style={{ color: tier.color }}>
        {tier.name} — {xp.toLocaleString()} XP
      </p>

      {level < 6 && (
        <div className="mt-3">
          <div className="relative h-2 bg-theme-surface rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(levelProgress, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${tier.color}, ${tier.color}88)`,
              }}
            />
          </div>
          <p className="text-[10px] text-theme-muted font-cairo mt-1">
            {xp.toLocaleString()} / {xpForNext.toLocaleString()} XP للمستوى التالي
          </p>
        </div>
      )}

      {level >= 6 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] text-theme-gold font-bold font-cairo mt-2"
        >
          أقصى مستوى تم الوصول إليه 🎉
        </motion.p>
      )}
    </motion.div>
  );
}
