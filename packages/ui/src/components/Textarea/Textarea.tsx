'use client';

import { forwardRef, useId, useEffect, useState, useCallback, useRef } from 'react';
import { cn } from '../../utils/cn';
import type { TextareaProps } from './Textarea.types';

const defaultRows: Record<string, number> = {
  sm: 3,
  md: 4,
  lg: 6,
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = 'md',
      maxRows = 10,
      showCount = false,
      isError = false,
      errorMessage,
      label,
      isDisabled = false,
      isRequired = false,
      className,
      id: externalId,
      value,
      maxLength,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = externalId || generatedId;
    const errorId = `${textareaId}-error`;
    const countId = `${textareaId}-count`;
    const internalRef = useRef<HTMLTextAreaElement | null>(null);
    const [charCount, setCharCount] = useState(0);

    const autoResize = useCallback(() => {
      const el = internalRef.current;
      if (!el) return;

      el.style.height = 'auto';
      const lineHeight = parseInt(getComputedStyle(el).lineHeight, 10) || 20;
      const maxHeight = lineHeight * maxRows;
      const scrollHeight = el.scrollHeight;

      el.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
      el.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
    }, [maxRows]);

    useEffect(() => {
      autoResize();
    }, [value, autoResize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (maxLength) {
        setCharCount(e.target.value.length);
      }
      autoResize();
      onChange?.(e);
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-body-sm text-text-secondary font-medium"
          >
            {label}
            {isRequired && <span className="text-error mr-1">*</span>}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={(node: HTMLTextAreaElement | null) => {
              internalRef.current = node;
              if (typeof ref === 'function') ref(node);
            }}
            id={textareaId}
            disabled={isDisabled}
            required={isRequired}
            aria-required={isRequired}
            aria-invalid={isError}
            aria-describedby={
              [isError ? errorId : '', showCount ? countId : ''].filter(Boolean).join(' ') || undefined
            }
            value={value}
            maxLength={maxLength}
            onChange={handleChange}
            rows={defaultRows[size]}
            className={cn(
              'w-full bg-surface text-text-primary placeholder-text-muted',
              'border transition-all duration-150 ease-in-out resize-none',
              'focus:outline-none',
              size === 'sm' && 'p-3 text-body-sm rounded-md',
              size === 'md' && 'p-4 text-body-md rounded-lg',
              size === 'lg' && 'p-5 text-body-lg rounded-lg',
              isError
                ? 'border-error focus:ring-2 focus:ring-error/30'
                : 'border-border hover:border-border-light focus:border-gold focus:ring-2 focus:ring-gold/30',
              isDisabled && 'opacity-50 cursor-not-allowed bg-bg-primary',
              className
            )}
            {...props}
          />
        </div>

        <div className="flex items-center justify-between">
          {isError && errorMessage && (
            <p id={errorId} className="text-body-sm text-error" role="alert">
              {errorMessage}
            </p>
          )}
          {showCount && maxLength && (
            <p id={countId} className="text-body-sm text-text-muted mr-auto">
              {typeof value === 'string' ? value.length : charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
