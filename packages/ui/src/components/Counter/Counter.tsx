'use client';

import { cn } from '../../utils/cn';
import { useCounter } from '../../hooks/useCounter';
import type { CounterProps } from './Counter.types';

export function Counter({
  end,
  start = 0,
  duration = 2000,
  suffix = '',
  prefix = '',
  label,
  className,
}: CounterProps) {
  const value = useCounter(end, duration, start);

  return (
    <div className={cn('text-center', className)}>
      <span className="text-stat-lg font-bold text-gold tabular-nums">
        {prefix}{value.toLocaleString()}{suffix}
      </span>
      {label && (
        <div className="text-body-sm text-text-secondary mt-1">{label}</div>
      )}
    </div>
  );
}
