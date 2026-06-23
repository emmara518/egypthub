import type { ReactNode } from 'react';

export interface SidebarNavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: number;
  active?: boolean;
  children?: SidebarNavItem[];
}

export interface SidebarUser {
  name: string;
  avatar?: string;
  email?: string;
  role?: string;
  isPremium?: boolean;
}

export interface SidebarProps {
  items: SidebarNavItem[];
  user?: SidebarUser;
  isCollapsed?: boolean;
  onToggle?: () => void;
  activeItem?: string;
  onNavigate?: (id: string) => void;
  className?: string;
}

export interface MobileSidebarProps {
  items: SidebarNavItem[];
  user?: SidebarUser;
  isOpen: boolean;
  onClose: () => void;
  activeItem?: string;
  onNavigate?: (id: string) => void;
}
