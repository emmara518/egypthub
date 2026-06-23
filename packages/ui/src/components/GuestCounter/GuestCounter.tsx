'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { GuestCounterProps } from './GuestCounter.types';

export function GuestCounter({ value, onChange, min = 0, max = 10, className }: GuestCounterProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <motion.button whileTap={{ scale: 0.9 }} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed" aria-label="إنقاص">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12" /></svg>
      </motion.button>
      <span className="w-6 text-center text-body-md font-semibold text-text-primary tabular-nums" aria-live="polite">{value}</span>
      <motion.button whileTap={{ scale: 0.9 }} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-secondary hover:border-gold hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed" aria-label="زيادة">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
      </motion.button>
    </div>
  );
}
