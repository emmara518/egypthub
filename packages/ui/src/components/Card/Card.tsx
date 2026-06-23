'use client';

import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { CardProps } from './Card.types';
import { paddingMap } from './Card.types';

const variantStyles: Record<string, string> = {
  default: 'bg-surface border border-border shadow-sm',
  featured:
    'bg-surface-elevated border border-gold shadow-gold-lg',
  glass:
    'bg-[rgba(15,20,32,0.8)] backdrop-blur border border-[rgba(255,255,255,0.08)] shadow-md',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      isHoverable = false,
      padding = 'md',
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const isClickable = !!onClick;

    return (
      <div
        ref={ref}
        onClick={onClick}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={
          isClickable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
                }
              }
            : undefined
        }
        className={cn(
          'rounded-xl transition-all duration-250 ease-in-out',
          variantStyles[variant],
          paddingMap[padding],
          isHoverable &&
            'hover:-translate-y-1 hover:border-gold-border hover:shadow-gold cursor-pointer',
          isClickable && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
