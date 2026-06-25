'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { HiLockClosed, HiCheck } from 'react-icons/hi';

const BADGES = [
  { id: 'explorer', name: 'مستكشف', icon: '🧭', desc: 'زر 3 مدن مختلفة', condition: (s: any) => s.passport.filter((p: any) => p.visited).length >= 3 },
  { id: 'foodie', name: 'عشاق الطعام', icon: '🍽️', desc: 'جرب 3 أكلات مصرية', condition: () => false },
  { id: 'history_buff', name: 'عاشق التاريخ', icon: '📜', desc: 'زر الأقصر وأسوان', condition: (s: any) => s.passport.some((p: any) => p.city === 'luxor' && p.visited) && s.passport.some((p: any) => p.city === 'aswan' && p.visited) },
  { id: 'beach_lover', name: 'عاشق الشواطئ', icon: '🏖️', desc: 'زر 3 مدن ساحلية', condition: (s: any) => ['sharm-el-sheikh', 'hurghada', 'alexandria', 'dahab'].filter((c) => s.passport.some((p: any) => p.city === c && p.visited)).length >= 3 },
  { id: 'diver', name: 'غواص', icon: '🤿', desc: 'زر شرم الشيخ أو الغردقة', condition: (s: any) => s.passport.some((p: any) => (p.city === 'sharm-el-sheikh' || p.city === 'hurghada') && p.visited) },
  { id: 'photographer', name: 'مصور', icon: '📸', desc: 'شارك 5 صور', condition: () => false },
  { id: 'night_owl', name: 'محب الليل', icon: '🌙', desc: 'أكمل تحديات في الليل', condition: () => false },
  { id: 'lux_traveler', name: 'مسافر فاخر', icon: '💎', desc: 'احجز رحلة فاخرة', condition: () => false },
];

export default function BadgeGrid() {
  const gamification = useAppStore((s) => s.gamification);
  const ownedBadges = gamification.badgeIds || [];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {BADGES.map((badge, i) => {
        const unlocked = ownedBadges.includes(badge.id);
        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className={`relative rounded-xl border p-4 text-center transition-all ${
              unlocked
                ? 'border-theme-gold/30 bg-theme-card'
                : 'border-theme-border bg-theme-surface opacity-55'
            }`}
          >
            {unlocked && (
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-theme-gold flex items-center justify-center">
                <HiCheck className="text-dark-900 text-xs" />
              </div>
            )}
            <div className={`text-3xl mb-2 ${unlocked ? '' : 'grayscale'}`}>
              {unlocked ? badge.icon : <HiLockClosed className="text-theme-muted mx-auto text-2xl" />}
            </div>
            <h4 className={`text-xs font-bold font-cairo mb-0.5 ${unlocked ? 'text-theme' : 'text-theme-muted'}`}>
              {badge.name}
            </h4>
            <p className="text-[9px] text-theme-muted font-cairo leading-tight">{badge.desc}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
