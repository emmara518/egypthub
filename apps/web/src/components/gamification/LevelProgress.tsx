'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { HiStar, HiLockClosed } from 'react-icons/hi';

const LEVELS = [
  { level: 1, title: 'مستكشف جديد', xp: 0, icon: '🌱' },
  { level: 2, title: 'رحالة', xp: 100, icon: '🚶' },
  { level: 3, title: 'مغامر', xp: 300, icon: '🗺️' },
  { level: 4, title: 'مستكشف محترف', xp: 700, icon: '🧭' },
  { level: 5, title: 'سفير مصر', xp: 1500, icon: '🌟' },
  { level: 6, title: 'أسطورة السياحة', xp: 3000, icon: '👑' },
];

export default function LevelProgress() {
  const { xp, level } = useAppStore((s) => s.gamification);

  const currentLevel = LEVELS.find((l) => l.level === level) || LEVELS[0];
  const nextLevel = LEVELS.find((l) => l.level === level + 1);
  const progress = nextLevel
    ? ((xp - currentLevel.xp) / (nextLevel.xp - currentLevel.xp)) * 100
    : 100;

  return (
    <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-theme-muted font-cairo">المستوى {level}</p>
          <h3 className="text-lg font-bold font-playfair text-theme">{currentLevel.title}</h3>
        </div>
        <span className="text-3xl">{currentLevel.icon}</span>
      </div>

      <div className="relative h-3 bg-theme-surface rounded-full overflow-hidden mb-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #D4A24C, #E8C97A, #D4A24C)',
            boxShadow: '0 0 10px rgba(212,162,76,0.4)',
          }}
        />
      </div>

      {nextLevel && (
        <div className="flex justify-between text-xs text-theme-muted font-cairo mb-5">
          <span>{xp.toLocaleString()} XP</span>
          <span>{nextLevel.xp.toLocaleString()} XP</span>
        </div>
      )}

      <div className="grid grid-cols-6 gap-1">
        {LEVELS.map((l, i) => {
          const unlocked = level >= l.level;
          const isCurrent = level === l.level;
          return (
            <motion.div
              key={l.level}
              whileHover={{ scale: 1.1 }}
              className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                isCurrent
                  ? 'bg-theme-gold/15 shadow-gold-glow'
                  : unlocked
                    ? 'bg-theme-surface'
                    : 'bg-theme-surface opacity-40'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mb-1 ${
                  isCurrent
                    ? 'bg-gradient-gold text-dark-900'
                    : unlocked
                      ? 'bg-theme-gold/20 text-theme-gold'
                      : 'bg-theme-elevated text-theme-muted'
                }`}
              >
                {unlocked ? l.icon : <HiLockClosed className="text-xs" />}
              </div>
              <span className={`text-[7px] text-center leading-tight font-cairo ${isCurrent ? 'text-theme-gold font-bold' : unlocked ? 'text-theme-secondary' : 'text-theme-muted'}`}>
                {l.title}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
