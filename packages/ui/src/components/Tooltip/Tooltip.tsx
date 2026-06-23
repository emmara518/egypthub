'use client';

import { useState, useRef, useCallback, useEffect, cloneElement } from 'react';
import { cn } from '../../utils/cn';
import { Portal } from '../../utils/portal';
import type { TooltipProps, TooltipPosition } from './Tooltip.types';

const positionStyles: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 ml-2',
  right: 'left-full top-1/2 -translate-y-1/2 mr-2',
};

const arrowStyles: Record<TooltipPosition, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-bg-primary',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-bg-primary',
  left: 'left-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-bg-primary',
  right: 'right-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-bg-primary',
};

export function Tooltip({
  content,
  position = 'top',
  variant = 'default',
  delay = 300,
  children,
  maxWidth = 280,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [renderPos, setRenderPos] = useState(position);
  const triggerRef = useRef<HTMLElement>(null);
  const showTimer = useRef<ReturnType<typeof setTimeout>>();
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  const show = useCallback(() => {
    clearTimeout(hideTimer.current);
    showTimer.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    clearTimeout(showTimer.current);
    hideTimer.current = setTimeout(() => setVisible(false), 100);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(showTimer.current);
      clearTimeout(hideTimer.current);
    };
  }, []);

  const triggerEl = cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: (e: React.MouseEvent) => {
      children.props.onMouseEnter?.(e);
      show();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      children.props.onMouseLeave?.(e);
      hide();
    },
    onFocus: (e: React.FocusEvent) => {
      children.props.onFocus?.(e);
      show();
    },
    onBlur: (e: React.FocusEvent) => {
      children.props.onBlur?.(e);
      hide();
    },
    'aria-describedby': visible ? 'tooltip-content' : undefined,
  });

  const getTooltipStyle = (): React.CSSProperties => {
    if (!triggerRef.current) return {};
    const rect = triggerRef.current.getBoundingClientRect();
    const style: React.CSSProperties = { position: 'fixed', zIndex: 1070 };

    switch (renderPos) {
      case 'top':
        style.left = rect.left + rect.width / 2;
        style.bottom = window.innerHeight - rect.top + 8;
        style.transform = 'translateX(-50%)';
        break;
      case 'bottom':
        style.left = rect.left + rect.width / 2;
        style.top = rect.bottom + 8;
        style.transform = 'translateX(-50%)';
        break;
      case 'left':
        style.right = window.innerWidth - rect.left + 8;
        style.top = rect.top + rect.height / 2;
        style.transform = 'translateY(-50%)';
        break;
      case 'right':
        style.left = rect.right + 8;
        style.top = rect.top + rect.height / 2;
        style.transform = 'translateY(-50%)';
        break;
    }

    return style;
  };

  const getArrowStyle = (): React.CSSProperties => {
    if (!triggerRef.current) return {};
    const rect = triggerRef.current.getBoundingClientRect();
    const style: React.CSSProperties = { position: 'fixed', zIndex: 1070 };

    switch (renderPos) {
      case 'top':
        style.left = rect.left + rect.width / 2;
        style.bottom = window.innerHeight - rect.top;
        style.transform = 'translateX(-50%)';
        break;
      case 'bottom':
        style.left = rect.left + rect.width / 2;
        style.top = rect.bottom;
        style.transform = 'translateX(-50%)';
        break;
      case 'left':
        style.right = window.innerWidth - rect.left;
        style.top = rect.top + rect.height / 2;
        style.transform = 'translateY(-50%)';
        break;
      case 'right':
        style.left = rect.right;
        style.top = rect.top + rect.height / 2;
        style.transform = 'translateY(-50%)';
        break;
    }

    return style;
  };

  return (
    <>
      {triggerEl}
      {visible && (
        <Portal>
          <div
            id="tooltip-content"
            role="tooltip"
            style={getTooltipStyle()}
            className={cn(
              'px-3 py-1.5 rounded-md text-body-sm leading-tight',
              'shadow-lg pointer-events-none select-none',
              variant === 'default'
                ? 'bg-bg-primary text-text-primary'
                : 'bg-surface-elevated text-text-primary border border-border',
              variant === 'rich' && 'p-3 space-y-1'
            )}
          >
            {content}
          </div>

          {/* Arrow */}
          <div
            className={cn(
              'w-0 h-0 pointer-events-none',
              arrowStyles[renderPos]
            )}
            style={getArrowStyle()}
          />
        </Portal>
      )}
    </>
  );
}
