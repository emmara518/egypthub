import type { ReactNode } from 'react';

export interface BottomNavItem {
  id: string;
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: number;
}

export interface BottomNavigationProps {
  items: BottomNavItem[];
  activeItem: string;
  onChange: (id: string) => void;
  className?: string;
}
