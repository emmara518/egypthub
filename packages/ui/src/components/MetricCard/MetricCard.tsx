import { cn } from '../../utils/cn';
import type { MetricCardProps } from './MetricCard.types';

const trendIcon: Record<string, React.ReactNode> = {
  up: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  ),
  down: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  neutral: null,
};

const trendColor: Record<string, string> = {
  up: 'text-success',
  down: 'text-error',
  neutral: 'text-text-muted',
};

export function MetricCard({ icon, value, label, trend, trendValue, className }: MetricCardProps) {
  return (
    <div className={cn('bg-surface-elevated border border-border rounded-xl p-4', className)}>
      <div className="flex items-start justify-between">
        {icon && <div className="text-gold flex-shrink-0">{icon}</div>}
        {trend && trendValue && (
          <div className={cn('flex items-center gap-0.5 text-caption', trendColor[trend])}>
            {trendIcon[trend]}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div className="mt-2">
        <div className="text-heading-lg font-bold text-text-primary tabular-nums">{value}</div>
        <div className="text-body-sm text-text-secondary mt-0.5">{label}</div>
      </div>
    </div>
  );
}
