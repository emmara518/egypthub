'use client';

import { useState, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { MobileSidebar } from '../Sidebar';
import { BottomNavigation } from '../BottomNavigation';
import type { DashboardLayoutProps } from './DashboardLayout.types';

export function DashboardLayout({
  logo,
  headerNavLinks = [],
  sidebarItems,
  bottomNavItems = [],
  user,
  notificationCount = 0,
  activeNav,
  onNavigate,
  onNotificationClick,
  children,
  className,
}: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <div className={cn('min-h-screen bg-bg-primary', className)} dir="">
      {/* Mobile Sidebar (drawer) */}
      <MobileSidebar
        items={sidebarItems}
        user={user}
        isOpen={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        activeItem={activeNav}
        onNavigate={onNavigate}
      />

      {/* Desktop Sidebar */}
      <Sidebar
        items={sidebarItems}
        user={user}
        isCollapsed={sidebarCollapsed}
        onToggle={handleToggleSidebar}
        activeItem={activeNav}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <Header
        logo={logo}
        navLinks={headerNavLinks}
        user={user}
        notificationCount={notificationCount}
        onNotificationClick={onNotificationClick}
        onMobileMenuToggle={handleMobileMenuToggle}
        isMobileMenuOpen={mobileMenuOpen}
        className={cn(
          sidebarCollapsed ? 'lg:mr-[72px] rtl:lg:mr-0 rtl:lg:ml-[72px]' : 'lg:mr-[260px] rtl:lg:mr-0 rtl:lg:ml-[260px]'
        )}
      />

      {/* Main content */}
      <main
        className={cn(
          'pt-16 lg:pt-0 pb-16 lg:pb-0 min-h-screen',
          'transition-all duration-200 ease-in-out',
          sidebarCollapsed
            ? 'lg:mr-[72px] rtl:lg:mr-0 rtl:lg:ml-[72px]'
            : 'lg:mr-[260px] rtl:lg:mr-0 rtl:lg:ml-[260px]'
        )}
      >
        {children}
      </main>

      {/* Bottom Navigation (mobile) */}
      {bottomNavItems.length > 0 && (
        <BottomNavigation
          items={bottomNavItems}
          activeItem={activeNav}
          onChange={onNavigate}
        />
      )}
    </div>
  );
}
