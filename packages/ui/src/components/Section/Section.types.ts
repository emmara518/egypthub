import type { ReactNode } from 'react';

export interface SectionProps {
  children: ReactNode;
  className?: string;
  as?: 'section' | 'div' | 'article' | 'aside';
  paddingY?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
}
