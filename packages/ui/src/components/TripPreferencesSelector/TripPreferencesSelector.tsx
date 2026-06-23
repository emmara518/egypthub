'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { TripPreferencesSelectorProps } from './TripPreferencesSelector.types';

export function TripPreferencesSelector({ preferences, selectedIds = [], onChange, max, className }: TripPreferencesSelectorProps) {
  const toggle = useCallback((id: string) => {
    const isSelected = selectedIds.includes(id);
    if (isSelected) {
      onChange(selectedIds.filter((sid) => sid !== id));
    } else {
      if (max && selectedIds.length >= max) return;
      onChange([...selectedIds, id]);
    }
  }, [selectedIds, onChange, max]);

  return (
    <div className={cn('flex flex-wrap gap-2', className)} role="group" aria-label="اختيار الاهتمامات">
      {preferences.map((pref) => {
        const isSelected = selectedIds.includes(pref.id);
        const isDisabled = !isSelected && max !== undefined && selectedIds.length >= max;

        return (
          <motion.button
            key={pref.id}
            whileHover={!isDisabled ? { scale: 1.05 } : undefined}
            whileTap={!isDisabled ? { scale: 0.95 } : undefined}
            onClick={() => toggle(pref.id)}
            disabled={isDisabled}
            className={cn(
              'flex items-center gap-1.5 px-3.5 py-2 rounded-full border-2 transition-all duration-200 text-body-sm',
              isSelected
                ? 'border-gold bg-gold-subtle text-gold'
                : 'border-border bg-surface text-text-secondary hover:border-gold/50',
              isDisabled && 'opacity-40 cursor-not-allowed'
            )}
          >
            {pref.icon && <span>{pref.icon}</span>}
            {pref.label}
          </motion.button>
        );
      })}
    </div>
  );
}
