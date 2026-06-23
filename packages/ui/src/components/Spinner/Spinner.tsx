'use client';

import { cn } from '../../utils/cn';
import type { SpinnerProps } from './Spinner.types';

const sizeStyles: Record<string, string> = {
  xs: 'h-4 w-4 border-2',
  sm: 'h-5 w-5 border-2',
  md: 'h-6 w-6 border-[2.5px]',
  lg: 'h-8 w-8 border-[3px]',
  xl: 'h-12 w-12 border-[3.5px]',
};

const colorStyles: Record<string, string> = {
  gold: 'border-gold/30 border-t-gold',
  white: 'border-white/30 border-t-white',
  muted: 'border-text-muted border-t-text-secondary',
};

export function Spinner({
  size = 'md',
  color = 'gold',
  isCentered = false,
  label = 'Loading',
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      className={cn(
        'inline-flex items-center justify-center',
        isCentered && 'block mx-auto'
      )}
    >
      <div
        className={cn(
          'rounded-full animate-spin',
          sizeStyles[size],
          colorStyles[color]
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
