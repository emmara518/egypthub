'use client';

import { cn } from '../../utils/cn';
import type { PriceBreakdownProps } from './PriceBreakdown.types';

export function PriceBreakdown({ lines, totalLabel = 'الإجمالي', totalAmount, currency = '$', className }: PriceBreakdownProps) {
  return (
    <div className={cn('bg-surface border border-border rounded-xl p-5', className)}>
      <div className="space-y-2">
        {lines.map((line, i) => (
          <div key={i} className={cn('flex items-center justify-between text-body-sm', line.isDiscount && 'text-success', line.isBold ? 'font-semibold text-text-primary' : 'text-text-secondary')}>
            <span>{line.label}</span>
            <span className={cn('tabular-nums', line.isDiscount && 'line-through opacity-60')}>{currency}{line.amount}</span>
          </div>
        ))}
      </div>
      {totalAmount && (
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <span className="text-body-md font-semibold text-text-primary">{totalLabel}</span>
          <span className="text-heading-sm font-bold text-gold">{currency}{totalAmount}</span>
        </div>
      )}
    </div>
  );
}
