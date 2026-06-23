import type { ReactNode } from 'react';

export interface StackProps {
  children: ReactNode;
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  className?: string;
}
