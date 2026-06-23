'use client';

import { cn } from '../../utils/cn';
import type { TripDurationSelectorProps } from './TripDurationSelector.types';

export function TripDurationSelector({ value = 3, onChange, min = 1, max = 21, className }: TripDurationSelectorProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-body-sm text-text-secondary">المدة</span>
        <span className="text-body-md font-semibold text-gold tabular-nums">
          {value} {value === 1 ? 'يوم' : value <= 10 ? 'أيام' : 'يوماً'}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="عدد أيام الرحلة"
        className={cn(
          'w-full h-2 rounded-full appearance-none cursor-pointer bg-border',
          '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5',
          '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold',
          '[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer',
          '[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110',
          '[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5',
          '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gold',
          '[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-gold/30'
        )}
      />
      <div className="flex justify-between text-caption text-text-muted">
        <span>{min} {min === 1 ? 'يوم' : 'أيام'}</span>
        <span>{max} {max === 1 ? 'يوم' : 'يوماً'}</span>
      </div>
    </div>
  );
}
