import type { ReactNode } from 'react';

export interface HeaderNavLink {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

export interface HeaderUser {
  name: string;
  avatar?: string;
  isPremium?: boolean;
}

export interface HeaderProps {
  logo: ReactNode;
  navLinks?: HeaderNavLink[];
  user?: HeaderUser;
  notificationCount?: number;
  onNotificationClick?: () => void;
  onUserMenuClick?: () => void;
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
  className?: string;
}

export interface MobileHeaderProps {
  logo: ReactNode;
  user?: HeaderUser;
  notificationCount?: number;
  onNotificationClick?: () => void;
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  className?: string;
}
