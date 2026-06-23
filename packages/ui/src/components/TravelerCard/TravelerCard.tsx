'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { TravelerCardProps } from './TravelerCard.types';

export function TravelerCard({ name, type, age, passport, isMain, onRemove, className }: TravelerCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cn('bg-surface border rounded-xl p-4', isMain ? 'border-gold' : 'border-border', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold-subtle flex items-center justify-center text-body-md text-gold font-semibold">{name.charAt(0)}</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-body-sm font-semibold text-text-primary">{name}</span>
              {isMain && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gold text-text-inverse font-medium">أساسي</span>}
            </div>
            <p className="text-caption text-text-muted">{type}{age ? `، ${age}` : ''}</p>
          </div>
        </div>
        {onRemove && (
          <button onClick={onRemove} className="text-caption text-error hover:text-error/80 transition-colors" aria-label={`إزالة ${name}`}>إزالة</button>
        )}
      </div>
      {passport && (
        <div className="mt-3 pt-3 border-t border-border flex items-center gap-2 text-caption text-text-muted">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /></svg>
          {passport}
        </div>
      )}
    </motion.div>
  );
}
