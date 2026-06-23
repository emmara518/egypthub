'use client';

import { cn } from '../../utils/cn';
import type { TaxSummaryProps } from './TaxSummary.types';

export function TaxSummary({ title = 'الضرائب والرسوم', taxRows, totalLabel = 'إجمالي الضرائب', totalAmount, currency = '$', className }: TaxSummaryProps) {
  return (
    <div className={cn('bg-surface border border-border rounded-xl p-5', className)}>
      <h4 className="text-body-sm font-semibold text-text-primary mb-3">{title}</h4>
      <div className="space-y-2">
        {taxRows.map((row, i) => (
          <div key={i} className="flex items-center justify-between text-body-sm text-text-secondary">
            <span>{row.label}</span>
            <span className="tabular-nums">{currency}{row.amount}</span>
          </div>
        ))}
      </div>
      {totalAmount && (
        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
          <span className="text-body-sm font-semibold text-text-primary">{totalLabel}</span>
          <span className="text-body-sm font-semibold text-gold">{currency}{totalAmount}</span>
        </div>
      )}
    </div>
  );
}
