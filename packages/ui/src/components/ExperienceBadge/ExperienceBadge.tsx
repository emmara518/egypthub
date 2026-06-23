import { cn } from '../../utils/cn';
import type { ExperienceBadgeProps, ExperienceBadgeType } from './ExperienceBadge.types';

const badgeConfig: Record<ExperienceBadgeType, { label: string; color: 'gold' | 'success' | 'info' | 'warning' | 'error' }> = {
  bestseller: { label: 'الأكثر مبيعاً', color: 'gold' },
  'top-rated': { label: 'الأفضل تقييماً', color: 'success' },
  new: { label: 'تجربة جديدة', color: 'info' },
  limited: { label: 'عدد محدود', color: 'warning' },
  private: { label: 'خاص', color: 'error' },
};

export function ExperienceBadge({ type, className }: ExperienceBadgeProps) {
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
