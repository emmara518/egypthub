import type { ReactNode } from 'react';

export type BadgeColor = 'gold' | 'success' | 'error' | 'warning' | 'info' | 'neutral';

export type BadgeVariant = 'default' | 'dot' | 'outline' | 'count';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  children?: ReactNode;
}
