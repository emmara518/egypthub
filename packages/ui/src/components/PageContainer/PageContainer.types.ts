import type { ReactNode } from 'react';

export interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  paddingY?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}
