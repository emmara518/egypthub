'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Close, ArrowRight } from '@/components/Icons';

export default function AbandonedRecovery() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          className="fixed bottom-[140px] md:bottom-[80px] right-[24px] z-50 max-w-[300px]"
        >
          <div className="bg-[#0F1525] border border-theme-gold/20 rounded-xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative">
            <button onClick={() => setVisible(false)}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#080C18] border border-theme-gold/20 flex items-center justify-center text-white/50 hover:text-white transition-all touch-target"
              aria-label="Dismiss"
            >
              <Close size={10} />
            </button>
            <div className="flex items-start gap-2">
              <span className="text-lg">🏛️</span>
              <div>
                <p className="text-xs font-bold font-english text-white">Still planning your trip?</p>
                <p className="text-[10px] text-white/50 mt-0.5">Your Pyramids tour is waiting! Save 10% if you book today.</p>
                <button className="flex items-center gap-1 text-[10px] font-bold font-english text-theme-gold mt-1.5 hover:underline">
                  Continue Booking <ArrowRight size={10} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
