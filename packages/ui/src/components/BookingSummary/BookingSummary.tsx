'use client';

import { cn } from '../../utils/cn';
import type { BookingSummaryProps } from './BookingSummary.types';

export function BookingSummary({ title, image, lines, totalLabel, totalValue, className }: BookingSummaryProps) {
  return (
    <div className={cn('bg-surface border border-border rounded-xl overflow-hidden', className)}>
      {image && (
        <div className="h-32 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-body-md font-semibold text-text-primary">{title}</h3>
        <div className="mt-4 space-y-2">
          {lines.map((line, i) => (
            <div key={i} className={cn('flex items-center justify-between text-body-sm', line.isHighlight ? 'text-gold font-semibold' : 'text-text-secondary')}>
              <span>{line.label}</span>
              <span className="text-end">{line.value}</span>
            </div>
          ))}
        </div>
        {(totalLabel && totalValue) && (
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-body-md font-semibold text-text-primary">{totalLabel}</span>
            <span className="text-heading-sm font-bold text-gold">{totalValue}</span>
          </div>
        )}
      </div>
    </div>
  );
}
