import { cn } from '../../utils/cn';
import type { DestinationBadgeProps, DestinationBadgeType } from './DestinationBadge.types';

const badgeConfig: Record<DestinationBadgeType, { label: string; color: 'gold' | 'success' | 'warning' | 'info' | 'error' }> = {
  featured: { label: 'مميز', color: 'gold' },
  popular: { label: 'رائج', color: 'success' },
  trending: { label: 'الأكثر طلباً', color: 'warning' },
  new: { label: 'جديد', color: 'info' },
  exclusive: { label: 'حصري', color: 'error' },
};

export function DestinationBadge({ type, className }: DestinationBadgeProps) {
  const config = badgeConfig[type];
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold leading-none',
        config.color === 'gold' && 'bg-gold/15 text-gold border border-gold/30',
        config.color === 'success' && 'bg-success/15 text-success border border-success/30',
        config.color === 'warning' && 'bg-warning/15 text-warning border border-warning/30',
        config.color === 'info' && 'bg-info/15 text-info border border-info/30',
        config.color === 'error' && 'bg-error/15 text-error border border-error/30',
        className
      )}
    >
      {config.label}
    </span>
  );
}
