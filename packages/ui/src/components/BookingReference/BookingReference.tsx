'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { BookingReferenceProps } from './BookingReference.types';

export function BookingReference({ referenceCode, label = 'رمز الحجز', onCopy, className }: BookingReferenceProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(referenceCode).then(() => {
      setCopied(true);
      onCopy?.(referenceCode);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  }, [referenceCode, onCopy]);

  return (
    <div className={cn('flex items-center justify-between p-4 bg-surface border border-border rounded-xl', className)}>
      <div>
        <p className="text-caption text-text-muted mb-0.5">{label}</p>
        <p className="text-body-md font-mono font-bold text-text-primary" dir="ltr">{referenceCode}</p>
      </div>
      <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopy} className={cn('px-4 py-2 rounded-lg text-body-sm font-semibold transition-colors', copied ? 'bg-success/10 text-success border border-success/30' : 'bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20')}>
        {copied ? 'تم النسخ ✓' : 'نسخ'}
      </motion.button>
    </div>
  );
}
