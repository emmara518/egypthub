import type { ReactNode } from 'react';

export interface HeroContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  gradient?: boolean;
  overlay?: 'dark' | 'gold' | 'none';
}
