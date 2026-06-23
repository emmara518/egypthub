import { cn } from '../../utils/cn';
import { Grid } from '../Grid';
import type { StatsBarProps } from './StatsBar.types';

export function StatsBar({ items, variant = 'default', columns = 4, className }: StatsBarProps) {
  return (
    <div className={cn(
      variant === 'gradient' ? 'bg-gradient-to-r from-gold/10 to-surface-elevated border border-gold/20 rounded-2xl' : 'bg-surface-elevated border border-border rounded-xl',
      'py-8 px-6',
      className
    )}>
      <Grid cols={Math.min(columns, 6) as 1 | 2 | 3 | 4 | 5 | 6} gap={6}>
        {items.map((item) => (
          <div key={item.label} className="text-center">
            {item.icon && <div className="text-gold mb-2 flex justify-center">{item.icon}</div>}
            <div className="text-stat-md font-bold text-gold">{item.value}</div>
            <div className="text-body-sm text-text-secondary mt-0.5">{item.label}</div>
          </div>
        ))}
      </Grid>
    </div>
  );
}
