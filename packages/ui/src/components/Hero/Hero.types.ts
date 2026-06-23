import type { ReactNode } from 'react';

export interface HeroProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  gradient?: 'dark' | 'gold' | 'none';
}

export interface HeroContentProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface HeroMediaProps {
  src: string;
  alt: string;
  overlay?: boolean;
  className?: string;
}

export interface HeroSearchProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  className?: string;
}

export interface HeroStatsProps {
  items: { value: string; label: string }[];
  className?: string;
}

export interface HeroCTAProps {
  primaryLabel: string;
  primaryOnClick?: () => void;
  secondaryLabel?: string;
  secondaryOnClick?: () => void;
  className?: string;
}
