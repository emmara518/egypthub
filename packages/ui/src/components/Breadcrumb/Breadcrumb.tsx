'use client';

import { cn } from '../../utils/cn';
import type { BreadcrumbProps } from './Breadcrumb.types';

export function Breadcrumb({
  items,
  separator = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted rtl:rotate-180">
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
  className,
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('', className)}>
      <ol className="flex items-center gap-1.5 flex-wrap list-none m-0 p-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" className="flex items-center">
                  {separator}
                </span>
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className="text-body-sm text-text-primary font-medium"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="text-body-sm text-text-secondary hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-body-sm text-text-secondary">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
