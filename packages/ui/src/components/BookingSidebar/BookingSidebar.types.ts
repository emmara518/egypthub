import type { ReactNode } from 'react';

export interface BookingSidebarProps {
  children: ReactNode;
  title?: string;
  sticky?: boolean;
  className?: string;
}
