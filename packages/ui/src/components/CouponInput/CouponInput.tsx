'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { CouponInputProps } from './CouponInput.types';

export function CouponInput({ onApply, onRemove, appliedCode, error, isLoading, className }: CouponInputProps) {
  const [code, setCode] = useState('');

  const handleApply = useCallback(() => {
    const trimmed = code.trim();
    if (trimmed) { onApply(trimmed); setCode(''); }
  }, [code, onApply]);

  if (appliedCode) {
    return (
      <div className={cn('flex items-center justify-between p-3 bg-success/5 border border-success/30 rounded-xl', className)}>
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success"><polyline points="20 6 9 17 4 12" /></svg>
          <span className="text-body-sm font-medium text-success">{appliedCode}</span>
        </div>
        {onRemove && (
          <button onClick={onRemove} className="text-caption text-error hover:text-error/80 transition-colors" aria-label="إزالة الكوبون">إزالة</button>
        )}
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-caption text-text-muted block">رمز الخصم</label>
      <div className="flex gap-2">
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="أدخل رمز الخصم" className="flex-1 bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-body-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-colors" aria-label="رمز الخصم" />
        <motion.button whileTap={{ scale: 0.95 }} onClick={handleApply} disabled={!code.trim() || isLoading} className="px-4 py-2.5 rounded-xl bg-gold text-text-inverse text-body-sm font-semibold hover:bg-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          {isLoading ? '...' : 'تطبيق'}
        </motion.button>
      </div>
      {error && <p className="text-caption text-error">{error}</p>}
    </div>
  );
}
