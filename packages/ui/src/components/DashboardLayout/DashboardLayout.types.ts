import type { ReactNode } from 'react';
import type { HeaderNavLink, HeaderUser } from '../Header/Header.types';
import type { SidebarNavItem, SidebarUser } from '../Sidebar/Sidebar.types';
import type { BottomNavItem } from '../BottomNavigation/BottomNavigation.types';

export interface DashboardLayoutProps {
  logo: ReactNode;
  headerNavLinks?: HeaderNavLink[];
  sidebarItems: SidebarNavItem[];
  bottomNavItems?: BottomNavItem[];
  user: HeaderUser & SidebarUser;
  notificationCount?: number;
  activeNav: string;
  onNavigate: (id: string) => void;
  onNotificationClick?: () => void;
  children: ReactNode;
  className?: string;
}
