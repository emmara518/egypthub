import { cn } from '../../utils/cn';
import type { BadgeProps } from './Badge.types';

const colorStyles: Record<string, string> = {
  gold: 'bg-gold text-text-inverse',
  success: 'bg-success text-white',
  error: 'bg-error text-white',
  warning: 'bg-warning text-white',
  info: 'bg-info text-white',
  neutral: 'bg-surface text-text-secondary border border-border',
};

const outlineColorStyles: Record<string, string> = {
  gold: 'text-gold border-gold',
  success: 'text-success border-success',
  error: 'text-error border-error',
  warning: 'text-warning border-warning',
  info: 'text-info border-info',
  neutral: 'text-text-secondary border-border',
};

const sizeStyles: Record<string, string> = {
  sm: 'text-[10px] h-[18px]',
  md: 'text-[12px] h-[22px]',
  lg: 'text-[14px] h-[26px]',
};

const dotSizeStyles: Record<string, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
};

export function Badge({
  variant = 'default',
  color = 'gold',
  size = 'md',
  children,
}: BadgeProps) {
  if (variant === 'dot') {
    return (
      <span
        className={cn(
          'inline-block rounded-full',
          dotSizeStyles[size],
          colorStyles[color].split(' ')[0]
        )}
        aria-label={`Status: ${color}`}
        role="status"
      />
    );
  }

  if (variant === 'outline') {
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center rounded-full px-1.5 font-medium border',
          sizeStyles[size],
          outlineColorStyles[color]
        )}
      >
        {children}
      </span>
    );
  }

  if (variant === 'count') {
    return (
      <span
        className={cn(
          'inline-flex items-center justify-center rounded-full px-2 font-bold min-w-[20px]',
          sizeStyles[size],
          'bg-gold text-text-inverse'
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full px-1.5 font-medium',
        sizeStyles[size],
        colorStyles[color]
      )}
    >
      {children}
    </span>
  );
}
