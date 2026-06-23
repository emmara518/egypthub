'use client';

import { cn } from '../../utils/cn';
import { budgetOptions } from './TripBudgetSelector.types';
import type { TripBudgetSelectorProps, BudgetLevel } from './TripBudgetSelector.types';

export function TripBudgetSelector({ value, onChange, className }: TripBudgetSelectorProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-2', className)} role="radiogroup" aria-label="اختيار الميزانية">
      {budgetOptions.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            role="radio"
            aria-checked={isSelected}
            className={cn(
              'flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 text-center',
              isSelected
                ? 'border-gold bg-gold-subtle'
                : 'border-border bg-surface hover:border-gold/50'
            )}
          >
            <span className={isSelected ? 'text-gold' : 'text-text-secondary'}>{option.icon}</span>
            <span className={cn('text-body-sm font-semibold', isSelected ? 'text-gold' : 'text-text-primary')}>{option.label}</span>
            <span className="text-caption text-text-muted">{option.description}</span>
          </button>
        );
      })}
    </div>
  );
}
