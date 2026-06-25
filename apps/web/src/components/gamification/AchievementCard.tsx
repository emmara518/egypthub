'use client';

import { motion } from 'framer-motion';
import { HiLockClosed, HiCheckCircle } from 'react-icons/hi';

interface Achievement {
  id: string;
  name: string;
  icon: string;
  desc: string;
  xp: number;
}

interface AchievementCardProps {
  achievement: Achievement;
  unlocked: boolean;
  unlockedAt?: string;
  index?: number;
}

export default function AchievementCard({ achievement, unlocked, unlockedAt, index = 0 }: AchievementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={unlocked ? { scale: 1.02 } : undefined}
      className={`relative rounded-2xl border p-4 transition-all ${
        unlocked
          ? 'border-theme-gold/30 bg-theme-card shadow-gold-glow'
          : 'border-theme-border bg-theme-surface opacity-60'
      }`}
    >
      {unlocked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="absolute -top-2 -right-2"
        >
          <HiCheckCircle className="text-theme-gold text-xl" />
        </motion.div>
      )}

      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
          unlocked ? 'bg-theme-gold/15' : 'bg-theme-elevated'
        }`}>
          {unlocked ? achievement.icon : <HiLockClosed className="text-theme-muted" />}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-bold text-sm font-cairo ${unlocked ? 'text-theme' : 'text-theme-muted'}`}>
            {achievement.name}
          </h4>
          <p className="text-xs text-theme-secondary font-cairo mt-0.5">{achievement.desc}</p>
        </div>
        <div className={`px-2.5 py-1 rounded-lg text-xs font-bold font-english ${
          unlocked ? 'bg-theme-gold/15 text-theme-gold' : 'bg-theme-elevated text-theme-muted'
        }`}>
          +{achievement.xp} XP
        </div>
      </div>

      {unlocked && unlockedAt && (
        <p className="text-[10px] text-theme-muted font-cairo mt-2 text-left">
          {new Date(unlockedAt).toLocaleDateString('ar-EG')}
        </p>
      )}

      {unlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(212,162,76,0.08) 0%, transparent 70%)',
          }}
        />
      )}
    </motion.div>
  );
}
