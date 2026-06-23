'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { TripPlan } from '@/lib/zainab/types';

interface TripPlannerCardProps {
  plan: TripPlan;
  onClose?: () => void;
}

export default function TripPlannerCard({ plan, onClose }: TripPlannerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="rounded-2xl border border-theme-gold/20 bg-theme-card overflow-hidden"
    >
      <div className="p-4 bg-gradient-to-l from-theme-gold/10 to-transparent border-b border-theme-gold/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-theme font-playfair">{plan.city.nameAr}</h3>
            <p className="text-xs text-theme-gold font-cairo">{plan.totalDuration}</p>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-theme-secondary hover:text-theme transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="relative">
          <div className="absolute right-2 top-0 bottom-0 w-px bg-theme-gold/20" />

          <AnimatePresence>
            {plan.days.map((day, idx) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative pr-6 pb-5 last:pb-0"
              >
                <div className="absolute right-0 top-1 w-3 h-3 rounded-full bg-theme-gold border-2 border-theme-card z-10" />

                <div className="bg-theme-bg rounded-xl p-3 border border-theme hover:border-theme-gold/20 transition-colors">
                  <p className="text-xs font-bold text-theme-gold mb-2 font-cairo">{day.title}</p>
                  <div className="space-y-1.5">
                    {day.experiences.map(exp => (
                      <div key={exp.id} className="flex items-start gap-2">
                        <span className="text-[10px] mt-0.5">{exp.category === 'Adventure' ? '🏔️' : exp.category === 'Culture' ? '🎭' : exp.category === 'History' ? '🏛️' : exp.category === 'Food' ? '🍽️' : '🌴'}</span>
                        <div>
                          <p className="text-xs text-theme font-cairo">{exp.name}</p>
                          <p className="text-[9px] text-theme-muted font-cairo">{exp.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
