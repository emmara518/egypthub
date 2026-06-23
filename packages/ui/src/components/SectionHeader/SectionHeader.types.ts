import type { ReactNode } from 'react';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}
