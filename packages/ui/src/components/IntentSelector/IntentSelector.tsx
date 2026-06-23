'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { IntentSelectorProps, IntentOption } from './IntentSelector.types';

export function IntentSelector({ options, selectedId, onSelect, className }: IntentSelectorProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-2', className)} role="radiogroup" aria-label="اختيار الغرض">
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        return (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option.id)}
            role="radio"
            aria-checked={isSelected}
            className={cn(
              'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200',
              isSelected
                ? 'border-gold bg-gold-subtle'
                : 'border-border bg-surface hover:border-gold/50'
            )}
          >
            {option.icon && (
              <span className={cn(
                'text-2xl',
                isSelected ? 'text-gold' : 'text-text-secondary'
              )}>
                {option.icon}
              </span>
            )}
            <span className={cn(
              'text-body-sm font-semibold text-center',
              isSelected ? 'text-gold' : 'text-text-primary'
            )}>
              {option.label}
            </span>
            {option.description && (
              <span className="text-caption text-text-muted text-center leading-tight">
                {option.description}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
