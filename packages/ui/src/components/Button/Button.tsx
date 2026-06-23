'use client';

import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Spinner } from '../Spinner/Spinner';
import type { ButtonProps } from './Button.types';

const variantStyles: Record<string, string> = {
  primary:
    'bg-gradient-to-br from-[#D4A24C] to-[#E8C97A] text-[#0A0E17] font-semibold ' +
    'hover:from-[#E8C97A] hover:to-[#D4A24C] hover:shadow-gold ' +
    'active:scale-[0.98] ' +
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100',
  secondary:
    'bg-transparent text-gold border border-gold font-medium ' +
    'hover:bg-[rgba(212,162,76,0.12)] ' +
    'active:scale-[0.98] ' +
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:active:scale-100',
  ghost:
    'bg-transparent text-text-secondary font-medium ' +
    'hover:bg-surface-hover hover:text-text-primary ' +
    'active:scale-[0.98] ' +
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:active:scale-100',
  danger:
    'bg-error text-white font-medium ' +
    'hover:bg-[#DC2626] ' +
    'active:scale-[0.98] ' +
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-error disabled:active:scale-100',
  icon:
    'bg-surface text-text-secondary rounded-full ' +
    'hover:bg-surface-hover hover:text-gold ' +
    'active:scale-[0.95] ' +
    'disabled:opacity-50 disabled:cursor-not-allowed',
};

const sizeStyles: Record<string, string> = {
  sm: 'h-8 px-3 text-body-sm rounded-md gap-1.5',
  md: 'h-10 px-6 text-body-md rounded-lg gap-2',
  lg: 'h-12 px-8 text-body-lg rounded-lg gap-2.5',
};

const iconSizeStyles: Record<string, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isDisabled = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className,
      type = 'button',
      onClick,
      ...props
    },
    ref
  ) => {
    const disabled = isDisabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        aria-disabled={disabled}
        aria-busy={isLoading}
        onClick={disabled ? undefined : onClick}
        className={cn(
          'inline-flex items-center justify-center',
          'transition-all duration-250 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
          'select-none',
          variant === 'icon' ? iconSizeStyles[size] : sizeStyles[size],
          variantStyles[variant],
          fullWidth && 'w-full',
          isLoading && 'cursor-wait',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Spinner size={size === 'lg' ? 'md' : 'sm'} color={variant === 'primary' ? 'muted' : 'gold'} />
        ) : (
          <>
            {leftIcon && <span className="inline-flex rtl:order-1">{leftIcon}</span>}
            {children && <span className="truncate">{children}</span>}
            {rightIcon && <span className="inline-flex rtl:order-1">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
