'use client';

import { cn } from '../../utils/cn';
import type { MobileHeaderProps } from './Header.types';

export function MobileHeader({
  logo,
  user,
  notificationCount = 0,
  onNotificationClick,
  onMenuToggle,
  isMenuOpen = false,
  className,
}: MobileHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-sticky bg-surface/95 backdrop-blur-md border-b border-border lg:hidden',
        className
      )}
    >
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left: Menu toggle */}
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          className="p-2 text-text-muted hover:text-gold transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          {isMenuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18" /><path d="M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Center: Logo */}
        <div className="flex-shrink-0">{logo}</div>

        {/* Right: Notifications + Avatar */}
        <div className="flex items-center gap-1">
          {onNotificationClick && (
            <button
              type="button"
              onClick={onNotificationClick}
              aria-label={`Notifications (${notificationCount})`}
              className="relative p-2 text-text-muted hover:text-gold transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              {notificationCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 rtl:-left-0.5 rtl:-right-auto flex items-center justify-center min-w-[16px] h-[16px] px-1 rounded-full bg-error text-[9px] font-bold text-white leading-none">
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
            </button>
          )}

          {user && (
            <div className="w-7 h-7 rounded-full bg-surface-elevated flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-caption font-semibold text-gold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
