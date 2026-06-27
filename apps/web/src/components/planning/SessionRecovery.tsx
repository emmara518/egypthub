'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Close } from '@/components/Icons';

export default function SessionRecovery() {
  const { continuePlanning, clearDraft } = useAppStore();
  const [dismissed, setDismissed] = useState(false);

  const draftKeys = Object.keys(continuePlanning);
  const incompleteDrafts = draftKeys.filter(
    (key) => !continuePlanning[key]?.completed
  );

  const show = incompleteDrafts.length > 0 && !dismissed;

  if (!show) return null;

  const resumeDraft = (key: string) => {
    if (key.includes('itinerary') || key.includes('trip')) {
      window.location.href = '/planning';
    } else if (key.includes('booking') || key.includes('checkout')) {
      window.location.href = '/checkout';
    } else {
      window.location.href = '/planning';
    }
  };

  const dismissAll = () => {
    incompleteDrafts.forEach((key) => clearDraft(key));
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md"
      >
        <div className="mx-4 rounded-2xl bg-theme-card border border-theme-gold/20 shadow-elevation-lg overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">📝</span>
                <h3 className="text-sm font-bold text-white font-cairo">
                  وجدنا {incompleteDrafts.length > 1 ? 'مسودات' : 'مسودة'} سابقة
                </h3>
              </div>
              <button
                onClick={() => setDismissed(true)}
                className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white transition-all"
              >
                <Close size={12} />
              </button>
            </div>

            <p className="text-xs text-theme-muted font-cairo mb-3">
              يبدو أنك كنت تخطط لرحلة ولم تكملها بعد. هل تريد المتابعة؟
            </p>

            <div className="space-y-2 mb-3">
              {incompleteDrafts.slice(0, 3).map((key) => (
                <button
                  key={key}
                  onClick={() => resumeDraft(key)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-theme-surface/50 border border-white/5 hover:border-theme-gold/20 transition-all"
                >
                  <span className="text-sm text-white font-cairo">
                    {continuePlanning[key]?.title || key}
                  </span>
                  <span className="text-xs text-theme-gold font-cairo">متابعة</span>
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setDismissed(true)}
                className="flex-1 py-2 rounded-xl border border-white/10 text-theme-secondary text-sm font-cairo hover:border-white/20 transition-all"
              >
                لاحقاً
              </button>
              <button
                onClick={dismissAll}
                className="flex-1 py-2 rounded-xl bg-gradient-gold text-dark-900 text-sm font-bold font-cairo hover:brightness-110 transition-all"
              >
                {incompleteDrafts.length > 1 ? 'تجاهل الكل' : 'تجاهل'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
