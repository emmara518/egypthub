'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';

export default function InsightsPage() {
  const travelDna = useAppStore((s) => s.travelDna);
  const gamification = useAppStore((s) => s.gamification);
  const funnelEvents = useAppStore((s) => s.funnelEvents);
  const collections = useAppStore((s) => s.collections);

  const totalXp = gamification.xp;
  const thisWeekXp = useMemo(() => {
    const weekAgo = Date.now() - 7 * 86400000;
    return gamification.achievements.filter((a) => a.unlocked && a.unlockedAt && new Date(a.unlockedAt).getTime() > weekAgo).length * 50;
  }, [gamification.achievements]);

  const citiesExplored = gamification.passport.filter((p) => p.visited).length;
  const completionRate = travelDna.completed ? 100 : Math.min(80, (Object.values(travelDna).filter(Boolean).length / 6) * 100);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const [, items] of Object.entries(collections)) {
      for (const item of items) {
        counts[item] = (counts[item] || 0) + 1;
      }
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [collections]);

  const mostVisited = categoryCounts[0]?.[0] || 'مافيش';

  const percentile = gamification.level >= 5 ? 5 : gamification.level >= 4 ? 15 : gamification.level >= 3 ? 30 : gamification.level >= 2 ? 55 : 80;

  const cards = [
    { title: 'ملف المسافر', value: travelDna.travelerType || 'لم يكتمل', icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M8 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', color: 'from-blue-500/20 to-blue-500/5' },
    { title: 'المدن المستكشفة', value: `${citiesExplored} مدينة`, icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', color: 'from-emerald-500/20 to-emerald-500/5' },
    { title: 'XP هذا الأسبوع', value: `${thisWeekXp} نقطة`, icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', color: 'from-amber-500/20 to-amber-500/5' },
    { title: 'الفئة الأكثر زيارة', value: mostVisited, icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', color: 'from-purple-500/20 to-purple-500/5' },
    { title: 'نسبة الإكمال', value: `${Math.round(completionRate)}%`, icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z', color: 'from-rose-500/20 to-rose-500/5' },
    { title: 'المستوى', value: `${gamification.title} (Lv.${gamification.level})`, icon: 'M12 6V4m0 2a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m-6 8a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m0 4v2m0-6V4', color: 'from-theme-gold/20 to-theme-gold/5' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-theme-bg pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white font-cairo mb-2">رؤى ذكية</h1>
          <p className="text-sm text-white/60 font-cairo">تحليلات مخصصة لرحلتك في مصر</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((c, i) => (
            <motion.div key={i} variants={item} className={`bg-gradient-to-br ${c.color} border border-theme-gold/20 rounded-2xl p-5`}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-theme-gold/10 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon} /></svg>
                </div>
                <div>
                  <p className="text-xs text-white/60 font-cairo mb-1">{c.title}</p>
                  <p className="text-lg font-bold text-white font-cairo">{c.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6 bg-[#0F1525] border border-theme-gold/20 rounded-2xl p-5">
          <h2 className="text-sm font-bold text-theme-gold font-cairo mb-3">تصنيفك بين المستخدمين</h2>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#ffffff10" strokeWidth="3" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="#D4A24C" strokeWidth="3" strokeDasharray={`${100 - percentile} ${percentile}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white font-english">%{percentile}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-white font-cairo">أنت في أعلى {percentile}% من المستخدمين</p>
              <p className="text-xs text-white/50 font-cairo mt-1">اكسب المزيد من XP لتحسين تصنيفك</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
