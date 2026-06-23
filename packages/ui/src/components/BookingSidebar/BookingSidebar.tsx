'use client';

import { cn } from '../../utils/cn';
import type { BookingSidebarProps } from './BookingSidebar.types';

export function BookingSidebar({ children, title = 'ملخص الحجز', sticky, className }: BookingSidebarProps) {
  return (
    <aside className={cn('space-y-4', sticky && 'sticky top-24', className)} aria-label={title}>
      <div className="bg-surface border border-border rounded-xl p-5">
        <h3 className="text-body-md font-semibold text-text-primary mb-4">{title}</h3>
        {children}
      </div>
    </aside>
  );
}
