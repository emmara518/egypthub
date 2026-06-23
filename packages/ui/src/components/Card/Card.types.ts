import type { ReactNode, HTMLAttributes } from 'react';

export type CardVariant = 'default' | 'featured' | 'glass';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  isHoverable?: boolean;
  padding?: CardPadding;
  children?: ReactNode;
}

export interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export interface CardContentProps {
  children?: ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children?: ReactNode;
  className?: string;
}

export const paddingMap: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};
