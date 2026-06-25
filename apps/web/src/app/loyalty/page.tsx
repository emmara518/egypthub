'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';

interface Reward {
  name: string;
  cost: number;
  desc: string;
}

const REWARDS: Reward[] = [
  { name: 'خصم 10%', cost: 500, desc: 'خصم 10% على رحلتك القادمة' },
  { name: 'دليل مجاني', cost: 1000, desc: 'دليل سياحي مجاني لأشهر المعالم' },
  { name: 'VIP Experience', cost: 2000, desc: 'تجربة VIP كاملة مع مرشد خاص' },
];

const TIERS = [
  { name: 'برونزي', minXp: 0, color: 'from-amber-700/30 to-amber-700/10' },
  { name: 'فضي', minXp: 500, color: 'from-slate-300/30 to-slate-300/10' },
  { name: 'ذهبي', minXp: 1500, color: 'from-yellow-500/30 to-yellow-500/10' },
  { name: 'بلاتيني', minXp: 3000, color: 'from-cyan-300/30 to-cyan-300/10' },
];

export default function LoyaltyPage() {
  const gamification = useAppStore((s) => s.gamification);
  const addXp = useAppStore((s) => s.addXp);
  const xp = gamification.xp;
  const [confirmReward, setConfirmReward] = useState<Reward | null>(null);
  const [claimed, setClaimed] = useState<string[]>([]);

  const tier = useMemo(() => {
    let current = TIERS[0];
    for (const t of TIERS) {
      if (xp >= t.minXp) current = t;
    }
    return current;
  }, [xp]);

  const nextTier = useMemo(() => {
    const idx = TIERS.findIndex((t) => t.name === tier.name);
    return idx < TIERS.length - 1 ? TIERS[idx + 1] : null;
  }, [tier]);

  const progressToNext = nextTier ? Math.min(100, ((xp - tier.minXp) / (nextTier.minXp - tier.minXp)) * 100) : 100;

  const thisMonthPoints = useMemo(() => {
    const monthAgo = Date.now() - 30 * 86400000;
    return gamification.achievements.filter((a) => a.unlocked && a.unlockedAt && new Date(a.unlockedAt).getTime() > monthAgo).length * 50;
  }, [gamification.achievements]);

  const pointsHistory = useMemo(() => {
    return gamification.achievements
      .filter((a) => a.unlocked)
      .slice(-10)
      .map((a) => ({ name: a.name, points: 50, date: a.unlockedAt || '' }));
  }, [gamification.achievements]);

  const handleRedeem = (reward: Reward) => {
    setClaimed((prev) => [...prev, reward.name]);
    addXp(-reward.cost);
    setConfirmReward(null);
  };

  const cardClass = "bg-[#0F1525] border border-theme-gold/20 rounded-2xl p-5";

  return (
    <div className="min-h-screen bg-[#080C18] pt-24 pb-12 px-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white font-cairo mb-2">برنامج الولاء</h1>
          <p className="text-sm text-white/60 font-cairo">اجمع النقاط واستبدلها بمكافآت حصرية</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`${cardClass} mb-4`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-white/50 font-cairo">رصيد النقاط</p>
              <p className="text-3xl font-bold text-theme-gold font-english">{xp}</p>
            </div>
            <div className={`px-4 py-2 rounded-xl bg-gradient-to-br ${tier.color} border border-theme-gold/20`}>
              <p className="text-sm font-bold text-white font-cairo">{tier.name}</p>
            </div>
          </div>
          {nextTier && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white/50 font-cairo">التقدم إلى {nextTier.name}</span>
                <span className="text-xs text-theme-gold font-english">{xp - tier.minXp} / {nextTier.minXp - tier.minXp}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${progressToNext}%` }} className="h-full rounded-full bg-gradient-gold" />
              </div>
            </div>
          )}
          <p className="text-xs text-white/40 mt-3 font-cairo">النقاط المكتسبة هذا الشهر: {thisMonthPoints}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`${cardClass} mb-4`}>
          <h2 className="text-sm font-bold text-theme-gold font-cairo mb-3">المكافآت</h2>
          <div className="grid grid-cols-1 gap-3">
            {REWARDS.map((reward) => (
              <div key={reward.name} className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5">
                <div>
                  <p className="text-sm text-white font-cairo">{reward.name}</p>
                  <p className="text-xs text-white/50 font-cairo">{reward.desc}</p>
                </div>
                <button
                  onClick={() => setConfirmReward(reward)}
                  disabled={xp < reward.cost || claimed.includes(reward.name)}
                  className="px-3 py-1.5 rounded-lg bg-theme-gold/10 border border-theme-gold/30 text-theme-gold text-xs font-cairo disabled:opacity-30 disabled:cursor-not-allowed hover:bg-theme-gold/20 transition-colors"
                >
                  {claimed.includes(reward.name) ? 'تم الاستبدال' : `${reward.cost} نقطة`}
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={cardClass}>
          <h2 className="text-sm font-bold text-theme-gold font-cairo mb-3">سجل النقاط</h2>
          {pointsHistory.length === 0 ? (
            <p className="text-sm text-white/40 font-cairo text-center py-4">لا يوجد سجل بعد</p>
          ) : (
            <div className="space-y-2">
              {pointsHistory.map((h, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5">
                  <div>
                    <span className="text-sm text-white font-cairo">{h.name}</span>
                    <span className="text-[10px] text-white/40 font-cairo mr-2">{new Date(h.date).toLocaleDateString('ar-EG')}</span>
                  </div>
                  <span className="text-xs text-green-400">+{h.points} XP</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {confirmReward && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-[#0F1525] border border-theme-gold/20 rounded-2xl p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold text-white font-cairo mb-2">تأكيد استبدال النقاط</h3>
              <p className="text-sm text-white/70 font-cairo mb-1">هل تريد استبدال {confirmReward.cost} نقطة بـ</p>
              <p className="text-lg text-theme-gold font-cairo font-bold mb-4">{confirmReward.name}</p>
              <div className="flex gap-2">
                <button onClick={() => handleRedeem(confirmReward)} className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-gold text-[#0A0E17] font-cairo font-bold text-sm">تأكيد</button>
                <button onClick={() => setConfirmReward(null)} className="px-4 py-2.5 rounded-xl border border-white/20 text-white/80 font-cairo text-sm">إلغاء</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
