'use client';

import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';
import type { InputProps } from './Input.types';

const sizeStyles: Record<string, string> = {
  sm: 'h-8 px-3 text-body-sm rounded-md',
  md: 'h-10 px-4 text-body-md rounded-lg',
  lg: 'h-12 px-5 text-body-lg rounded-lg',
};

const iconSizeStyles: Record<string, string> = {
  sm: 'px-8',
  md: 'px-10',
  lg: 'px-12',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      leftIcon,
      rightIcon,
      suffix,
      isError = false,
      errorMessage,
      label,
      helperText,
      isDisabled = false,
      isRequired = false,
      className,
      id: externalId,
      placeholder,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = externalId || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-body-sm text-text-secondary font-medium"
          >
            {label}
            {isRequired && <span className="text-error mr-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-text-muted rtl:right-3 rtl:left-auto">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={isDisabled}
            required={isRequired}
            aria-required={isRequired}
            aria-invalid={isError}
            aria-describedby={
              [isError ? errorId : '', helperText ? helperId : ''].filter(Boolean).join(' ') || undefined
            }
            placeholder={placeholder}
            className={cn(
              'w-full bg-surface text-text-primary placeholder-text-muted',
              'border transition-all duration-150 ease-in-out',
              'focus:outline-none',
              leftIcon && iconSizeStyles[size],
              rightIcon && iconSizeStyles[size],
              sizeStyles[size],
              isError
                ? 'border-error focus:ring-2 focus:ring-error/30'
                : 'border-border hover:border-border-light focus:border-gold focus:ring-2 focus:ring-gold/30',
              isDisabled && 'opacity-50 cursor-not-allowed bg-bg-primary',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-text-muted rtl:left-3 rtl:right-auto">
              {rightIcon}
            </span>
          )}

          {suffix && (
            <span className="absolute inset-y-0 left-3 flex items-center text-text-secondary text-body-sm rtl:left-3 rtl:right-auto">
              {suffix}
            </span>
          )}
        </div>

        {isError && errorMessage && (
          <p id={errorId} className="text-body-sm text-error" role="alert">
            {errorMessage}
          </p>
        )}

        {helperText && !isError && (
          <p id={helperId} className="text-body-sm text-text-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
