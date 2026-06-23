'use client';

import { cn } from '../../utils/cn';
import type { DiscountBadgeProps } from './DiscountBadge.types';

export function DiscountBadge({ value, type = 'percentage', description, isExpired, className }: DiscountBadgeProps) {
  return (
    <div className={cn('inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all', isExpired ? 'border-border bg-surface opacity-50' : 'border-success/30 bg-success/5', className)}>
      <span className={cn('text-body-sm font-bold', isExpired ? 'text-text-muted' : 'text-success')}>
        {type === 'percentage' ? `${value}%` : type === 'free' ? 'مجاناً' : `${value}`}
      </span>
      {description && <span className="text-caption text-text-muted">{description}</span>}
      {isExpired && <span className="text-caption text-text-muted">منتهي</span>}
    </div>
  );
}
