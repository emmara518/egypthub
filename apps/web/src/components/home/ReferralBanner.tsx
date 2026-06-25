'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Close } from '@/components/Icons';

export default function ReferralBanner() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gradient-to-r from-theme-gold/10 via-theme-gold/[0.04] to-transparent border-b border-theme-gold/10 px-4 py-2.5"
        >
          <div className="max-w-[1440px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">🎉</span>
              <p className="text-[11px] text-white/70 font-english">
                <span className="font-bold text-theme-gold">Refer a friend</span> and get <span className="font-bold text-theme-gold">10% off</span> your next booking!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-[10px] font-bold font-english px-3 py-1 rounded-full gold-btn">
                Share Link
              </button>
              <button onClick={() => setDismissed(true)} className="text-white/30 hover:text-white/60 transition-all touch-target" aria-label="Dismiss">
                <Close size={12} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
