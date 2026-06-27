'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';


interface LeaderboardUser { name: string; xp: number; level: number; title: string; isCurrentUser: boolean; }
const mockUsers: LeaderboardUser[] = [
  { name: 'أحمد المصري', xp: 5400, level: 6, title: 'أسطورة السياحة', isCurrentUser: false },
  { name: 'نورا حسن', xp: 4200, level: 5, title: 'سفير مصر', isCurrentUser: false },
  { name: 'يوسف علي', xp: 3800, level: 5, title: 'سفير مصر', isCurrentUser: false },
  { name: 'مريم خالد', xp: 2900, level: 4, title: 'مستكشف محترف', isCurrentUser: false },
  { name: 'عمر سامي', xp: 2400, level: 4, title: 'مستكشف محترف', isCurrentUser: false },
  { name: 'سارة أحمد', xp: 2100, level: 4, title: 'مستكشف محترف', isCurrentUser: false },
  { name: 'خالد محمود', xp: 1800, level: 4, title: 'مستكشف محترف', isCurrentUser: false },
  { name: 'ليلى إبراهيم', xp: 1500, level: 3, title: 'مغامر', isCurrentUser: false },
  { name: 'محمد عبدالله', xp: 1200, level: 3, title: 'مغامر', isCurrentUser: false },
  { name: 'هند جمال', xp: 1000, level: 3, title: 'مغامر', isCurrentUser: false },
  { name: 'كريم ناصر', xp: 850, level: 2, title: 'رحالة', isCurrentUser: false },
  { name: 'دينا شريف', xp: 700, level: 2, title: 'رحالة', isCurrentUser: false },
  { name: 'علي حسين', xp: 550, level: 2, title: 'رحالة', isCurrentUser: false },
  { name: 'منى عادل', xp: 400, level: 2, title: 'رحالة', isCurrentUser: false },
  { name: 'إيهاب سعد', xp: 300, level: 2, title: 'رحالة', isCurrentUser: false },
  { name: 'نسمة طارق', xp: 200, level: 1, title: 'مستكشف جديد', isCurrentUser: false },
  { name: 'ماجد رضا', xp: 150, level: 1, title: 'مستكشف جديد', isCurrentUser: false },
  { name: 'شيماء فتحي', xp: 100, level: 1, title: 'مستكشف جديد', isCurrentUser: false },
  { name: 'هادي نور', xp: 50, level: 1, title: 'مستكشف جديد', isCurrentUser: false },
  { name: 'رنا كمال', xp: 20, level: 1, title: 'مستكشف جديد', isCurrentUser: false },
];

const categories = [
  { id: 'all', label: 'كل الأوقات' },
  { id: 'month', label: 'هذا الشهر' },
  { id: 'week', label: 'هذا الأسبوع' },
] as const;

const RANK_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];

export default function LeaderboardPage() {
  const [category, setCategory] = useState<'all' | 'month' | 'week'>('all');
  const gamification = useAppStore((s) => s.gamification);

  const allUsers = useMemo(() => {
    const users = [{
      name: 'أنت',
      xp: gamification.xp,
      level: gamification.level,
      title: gamification.title,
      isCurrentUser: true,
    }, ...mockUsers];
    users.sort((a, b) => b.xp - a.xp);
    return users.map((u, i) => ({ ...u, rank: i + 1 }));
  }, [gamification.xp, gamification.level, gamification.title]);

  const podium = allUsers.slice(0, 3);
  const rest = allUsers.slice(3);

  return (
    <div className="min-h-screen bg-theme-bg pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair text-theme mb-2">
              قائمة المتصدرين
            </h1>
            <div className="w-20 h-0.5 bg-gradient-gold mx-auto mb-3" />
            <p className="text-theme-secondary font-cairo text-sm">أفضل المستكشفين في مصر</p>
          </div>

          <div className="flex justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as typeof category)}
                className={`px-5 py-2 rounded-xl text-xs font-bold font-cairo transition-all ${
                  category === cat.id
                    ? 'bg-theme-gold text-dark-900'
                    : 'bg-theme-surface text-theme-secondary border border-theme-border hover:border-theme-gold/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-end justify-center gap-4 pt-4">
            {podium.map((user, i) => {
              const heights = ['h-28', 'h-36', 'h-24'];
              const icons = ['crown', 'star', 'star'] as const;
              return (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className={`flex flex-col items-center ${i === 0 ? 'order-2' : i === 1 ? 'order-1' : 'order-3'}`}
                >
                  <div className={`relative ${i === 0 ? 'mb-2' : 'mb-1'}`}>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                      style={{
                        background: `linear-gradient(135deg, ${RANK_COLORS[i]}33, ${RANK_COLORS[i]}11)`,
                        border: `2px solid ${RANK_COLORS[i]}`,
                      }}
                    >
                      {i === 0 ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="var(--gold)"/></svg> : i + 1}
                    </div>
                    {i === 0 && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-2 -right-2"
                      >
                        👑
                      </motion.div>
                    )}
                  </div>
                  <div
                    className={`rounded-t-xl w-24 flex flex-col items-center justify-end p-3 ${heights[i]} ${
                      i === 0
                        ? 'bg-gradient-to-t from-theme-gold/20 to-transparent border-x border-t border-theme-gold/30'
                        : 'bg-theme-card border-x border-t border-theme-border'
                    }`}
                    style={{
                      boxShadow: i === 0 ? '0 -4px 20px rgba(212,162,76,0.15)' : undefined,
                    }}
                  >
                    <p className="text-[10px] font-bold text-theme font-cairo text-center leading-tight">{user.name}</p>
                    <p className="text-[8px] text-theme-muted font-cairo">{user.title}</p>
                    <p className="text-xs font-bold text-theme-gold font-english mt-1">{user.xp.toLocaleString()} XP</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-1"
          >
            {rest.map((user, idx) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  user.isCurrentUser
                    ? 'bg-theme-gold/10 border border-theme-gold/30'
                    : 'bg-theme-card border border-theme-border hover:border-theme-gold/15'
                }`}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-english ${
                  user.rank <= 10 ? 'bg-theme-gold/15 text-theme-gold' : 'bg-theme-surface text-theme-muted'
                }`}>
                  {user.rank}
                </span>
                <div className="w-9 h-9 rounded-full bg-theme-surface border border-theme-border flex items-center justify-center">
                  {user.isCurrentUser ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  ) : (
                    <span className="text-sm">{['🧑', '👩', '👨', '👩', '🧑', '👩', '👨', '👩', '👨', '👩', '🧑', '👩', '👨', '👩', '👨', '👩', '🧑', '👩', '👨', '👩'][idx]}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold font-cairo text-theme flex items-center gap-1">
                    {user.name}
                    {user.isCurrentUser && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded bg-theme-gold/15 text-theme-gold font-cairo">أنت</span>
                    )}
                  </p>
                  <p className="text-[10px] text-theme-muted font-cairo">{user.title}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-theme-gold font-english">{user.xp.toLocaleString()}</p>
                  <p className="text-[9px] text-theme-muted font-cairo">XP</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
