'use client';

import { cn } from '../../utils/cn';
import type { BottomNavigationProps } from './BottomNavigation.types';

export function BottomNavigation({
  items,
  activeItem,
  onChange,
  className,
}: BottomNavigationProps) {
  return (
    <nav
      aria-label="Bottom navigation"
      className={cn(
        'fixed bottom-0 left-0 right-0 z-fixed',
        'bg-surface-elevated border-t border-border',
        'safe-area-inset-bottom',
        'lg:hidden',
        className
      )}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const isActive = item.id === activeItem;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                item.onClick?.();
                onChange(item.id);
              }}
              aria-current={isActive ? 'page' : undefined}
              aria-label={item.label}
              className={cn(
                'relative flex flex-col items-center justify-center gap-0.5',
                'flex-1 h-full min-w-0 px-1',
                'transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset rounded-sm',
                isActive ? 'text-gold' : 'text-text-muted hover:text-text-secondary'
              )}
            >
              <span className="relative flex-shrink-0">
                {item.icon}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 rtl:-left-1.5 rtl:-right-auto flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-error text-[10px] font-bold text-white leading-none">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </span>
              <span className="text-[10px] leading-none truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
