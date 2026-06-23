'use client';

import { cn } from '../../utils/cn';
import { companionOptions } from './TripCompanionSelector.types';
import type { TripCompanionSelectorProps, CompanionType } from './TripCompanionSelector.types';

export function TripCompanionSelector({ value, onChange, className }: TripCompanionSelectorProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)} role="radiogroup" aria-label="اختيار رفقة السفر">
      {companionOptions.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            role="radio"
            aria-checked={isSelected}
            className={cn(
              'flex flex-col items-center gap-1 px-4 py-3 rounded-xl border-2 transition-all duration-200 min-w-[80px]',
              isSelected
                ? 'border-gold bg-gold-subtle'
                : 'border-border bg-surface hover:border-gold/50'
            )}
          >
            <span className={isSelected ? 'text-gold' : 'text-text-secondary'}>{option.icon}</span>
            <span className={cn('text-caption font-semibold', isSelected ? 'text-gold' : 'text-text-primary')}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
