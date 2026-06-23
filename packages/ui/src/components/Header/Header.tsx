'use client';

import { cn } from '../../utils/cn';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { MobileHeader } from './MobileHeader';
import type { HeaderProps } from './Header.types';

export function Header({
  logo,
  navLinks = [],
  user,
  notificationCount = 0,
  onNotificationClick,
  onUserMenuClick,
  onMobileMenuToggle,
  isMobileMenuOpen = false,
  className,
}: HeaderProps) {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md';

  if (isMobile) {
    return (
      <MobileHeader
        logo={logo}
        user={user}
        notificationCount={notificationCount}
        onNotificationClick={onNotificationClick}
        onMenuToggle={onMobileMenuToggle}
        isMenuOpen={isMobileMenuOpen}
        className={className}
      />
    );
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-sticky bg-surface/95 backdrop-blur-md border-b border-border',
        className
      )}
    >
      <div className="flex items-center justify-between h-16 px-6 max-w-screen-3xl mx-auto">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-8">
          <div className="flex-shrink-0">{logo}</div>
          {navLinks.length > 0 && (
            <nav aria-label="Main navigation" className="flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => {
                    link.onClick?.();
                  }}
                  aria-current={link.active ? 'page' : undefined}
                  className={cn(
                    'px-3 py-2 text-body-sm font-medium rounded-lg transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                    link.active
                      ? 'text-gold bg-gold/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  )}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* Right: Notifications + Avatar */}
        <div className="flex items-center gap-2">
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
                <span className="absolute -top-0.5 -right-0.5 rtl:-left-0.5 rtl:-right-auto flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-error text-[10px] font-bold text-white leading-none">
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
            </button>
          )}

          {user && (
            <button
              type="button"
              onClick={onUserMenuClick}
              aria-label={user.name}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <div className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-body-sm font-semibold text-gold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted hidden sm:block">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
