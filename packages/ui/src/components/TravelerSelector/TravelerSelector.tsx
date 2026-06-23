'use client';

import { cn } from '../../utils/cn';
import { GuestCounter } from '../GuestCounter';
import type { TravelerSelectorProps } from './TravelerSelector.types';

export function TravelerSelector({ types, values, onChange, maxTotal = 10, className }: TravelerSelectorProps) {
  const total = Object.values(values).reduce((a, b) => a + b, 0);

  return (
    <div className={cn('space-y-3', className)} role="group" aria-label="اختيار المسافرين">
      {types.map((type) => (
        <div key={type.id} className="flex items-center justify-between p-4 bg-surface border border-border rounded-xl">
          <div>
            <span className="text-body-sm font-medium text-text-primary">{type.label}</span>
            <p className="text-caption text-text-muted">{type.description}</p>
          </div>
          <GuestCounter value={values[type.id] || 0} onChange={(v) => onChange(type.id, v)} min={type.id === 'adults' ? 1 : 0} max={maxTotal - total + (values[type.id] || 0)} />
        </div>
      ))}
      <p className="text-caption text-text-muted">المجموع: {total} مسافر{total !== 1 ? 'ين' : ''}</p>
    </div>
  );
}
