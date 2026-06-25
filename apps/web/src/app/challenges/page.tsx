'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { HiCheck, HiClock } from 'react-icons/hi';

const challenges = [
  { id: 'visit_cairo', name: 'اكتشف القاهرة', desc: 'زر القاهرة وأضفها لجواز سفرك', xp: 100, icon: '🏛️' },
  { id: 'visit_luxor', name: 'رحلة الأقصر', desc: 'زر الأقصر واستكشف معبد الكرنك', xp: 100, icon: '🏗️' },
  { id: 'red_sea_dive', name: 'غواص البحر الأحمر', desc: 'استكشف الغطس في الغردقة', xp: 150, icon: '🤿' },
  { id: 'desert_safari', name: 'سفاري الصحراء', desc: 'جرب رحلة سفاري في الصحراء البيضاء', xp: 150, icon: '🏜️' },
  { id: 'nile_cruise', name: 'رحلة النيل', desc: 'احجز رحلة نيلية في أسوان', xp: 200, icon: '🚢' },
  { id: 'food_tour', name: 'جولة الطعام', desc: 'جرب 5 أكلات مصرية مختلفة', xp: 100, icon: '🍽️' },
  { id: 'photo_contest', name: 'مسابقة التصوير', desc: 'صور أجمل مكان زرته', xp: 120, icon: '📸' },
  { id: 'visit_5_cities', name: 'مستكشف المدن', desc: 'زر 5 مدن مختلفة', xp: 300, icon: '🗺️' },
];

const monthlyMissions = [
  { id: 'mm_june_cairo', name: 'تحدي يونيو', desc: 'زر 3 معالم في القاهرة هذا الشهر', xp: 250, icon: '🗓️' },
  { id: 'mm_june_photos', name: 'تحدي التصوير', desc: 'التقط 5 صور لمعالم مصرية', xp: 200, icon: '📸' },
  { id: 'mm_june_food', name: 'مغامرة طعام', desc: 'جرب طبقين مصريين تقليديين', xp: 150, icon: '🍲' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ChallengesPage() {
  const completedChallenges = useAppStore((s) => s.gamification.completedChallenges);
  const completeChallenge = useAppStore((s) => s.completeChallenge);
  const addXp = useAppStore((s) => s.addXp);
  const addNotification = useAppStore((s) => s.addNotification);
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const daysRemaining = useMemo(() => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const diff = endOfMonth.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, []);

  const handleComplete = (id: string, name: string, xp: number) => {
    if (completedChallenges.includes(id)) return;
    setAnimatingId(id);
    completeChallenge(id);
    addXp(xp);
    addNotification(`🎉 أكملت التحدي: ${name}`);
    setTimeout(() => setAnimatingId(null), 1000);
  };

  return (
    <div className="min-h-screen bg-theme-bg pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-10">

          <motion.div variants={cardVariants} className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair text-theme mb-2">
              التحديات
            </h1>
            <div className="w-20 h-0.5 bg-gradient-gold mx-auto mb-3" />
            <p className="text-theme-secondary font-cairo text-sm">أكمل التحديات واكسب نقاط خبرة</p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <HiClock className="text-theme-gold text-xl" />
                <h2 className="text-lg font-bold font-playfair text-theme">مهام الشهر</h2>
              </div>
              <div className="flex items-center gap-2 bg-theme-surface px-3 py-1.5 rounded-lg">
                <HiClock className="text-theme-gold text-sm" />
                <span className="text-xs text-theme-secondary font-cairo">{daysRemaining} يوم متبقي</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {monthlyMissions.map((m) => {
                const done = completedChallenges.includes(m.id);
                return (
                  <motion.div
                    key={m.id}
                    whileHover={{ y: -3 }}
                    className={`rounded-xl border p-4 ${
                      done
                        ? 'border-green-500/30 bg-green-500/5'
                        : 'border-theme-gold/20 bg-theme-surface'
                    }`}
                  >
                    <div className="text-3xl mb-2">{m.icon}</div>
                    <h3 className="text-sm font-bold font-cairo text-theme mb-1">{m.name}</h3>
                    <p className="text-xs text-theme-secondary font-cairo mb-3">{m.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-theme-gold font-english">+{m.xp} XP</span>
                      {done ? (
                        <span className="flex items-center gap-1 text-[10px] text-green-400 font-cairo">
                          <HiCheck /> تم
                        </span>
                      ) : (
                        <button
                          onClick={() => handleComplete(m.id, m.name, m.xp)}
                          className="px-3 py-1 rounded-lg text-[10px] font-bold font-cairo gold-btn"
                        >
                          ابدأ
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={cardVariants} className="space-y-4">
            <h2 className="text-xl font-bold font-playfair text-theme px-1">جميع التحديات</h2>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challenges.map((c) => {
                const done = completedChallenges.includes(c.id);
                return (
                  <motion.div
                    key={c.id}
                    variants={cardVariants}
                    whileHover={{ y: -4 }}
                    className={`rounded-2xl border p-5 transition-all ${
                      done
                        ? 'border-green-500/30 bg-green-500/5'
                        : animatingId === c.id
                          ? 'border-theme-gold border-2 bg-theme-gold/10'
                          : 'border-theme-border bg-theme-card'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${
                        done ? 'bg-green-500/15' : 'bg-theme-surface'
                      }`}>
                        {done ? <HiCheck className="text-green-400 text-2xl" /> : c.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-sm font-cairo mb-1 ${done ? 'text-green-400' : 'text-theme'}`}>
                          {c.name}
                        </h3>
                        <p className="text-xs text-theme-secondary font-cairo mb-3">{c.desc}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-theme-gold font-english">+{c.xp} XP</span>
                          {done ? (
                            <span className="flex items-center gap-1 text-xs text-green-400 font-cairo">
                              <HiCheck /> تم
                            </span>
                          ) : (
                            <button
                              onClick={() => handleComplete(c.id, c.name, c.xp)}
                              className="px-4 py-1.5 rounded-lg text-xs font-bold font-cairo gold-btn"
                            >
                              أكمل التحدي
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
