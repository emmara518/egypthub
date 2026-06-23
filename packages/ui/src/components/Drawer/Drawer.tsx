'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { Portal } from '../../utils/portal';
import { useLockedBody } from '../../hooks/useLockedBody';
import type { DrawerProps } from './Drawer.types';
import { drawerSizeMap } from './Drawer.types';

export function Drawer({
  isOpen,
  onClose,
  position = 'right',
  size = 'md',
  title,
  description,
  isDismissable = true,
  showCloseButton = true,
  children,
}: DrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dragY, setDragY] = useState(0);
  const dragging = useRef(false);
  const dragStart = useRef(0);

  useLockedBody(isOpen);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const timer = setTimeout(() => {
        setMounted(false);
        setDragY(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDismissable) onClose();
    },
    [isDismissable, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, handleEscape]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (isDismissable && e.target === e.currentTarget) onClose();
  };

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const panel = e.currentTarget;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    []
  );

  const handleDragStart = (e: React.PointerEvent) => {
    dragging.current = true;
    dragStart.current = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleDragMove = (e: React.PointerEvent) => {
    if (!dragging.current || position !== 'bottom') return;
    const delta = e.clientY - dragStart.current;
    if (delta > 0) setDragY(delta);
  };

  const handleDragEnd = () => {
    dragging.current = false;
    if (dragY > 100) {
      onClose();
    }
    setDragY(0);
  };

  const isHorizontal = position === 'left' || position === 'right';

  const slideTransform = visible
    ? 'translateX(0) translateY(0)'
    : position === 'right'
      ? 'translateX(100%)'
      : position === 'left'
        ? 'translateX(-100%)'
        : `translateY(${100 + (dragY / (typeof window !== 'undefined' ? window.innerHeight : 1000)) * 100}%)`;

  const panelStyle: React.CSSProperties = {
    transform: slideTransform,
    transition: visible ? 'transform 300ms ease-out' : 'transform 300ms ease-in',
  };

  if (!mounted) return null;

  return (
    <Portal>
      <div
        className={cn(
          'fixed inset-0 z-modal',
          'transition-opacity duration-300 ease-in-out',
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
      >
        <div className="fixed inset-0 bg-black/50" />

        <div
          onKeyDown={handleTabKeyDown}
          style={panelStyle}
          className={cn(
            'fixed bg-surface-elevated shadow-xl flex flex-col',
            isHorizontal
              ? 'top-0 bottom-0 h-full'
              : 'left-0 right-0 bottom-0 rounded-t-2xl',
            drawerSizeMap[position][size],
            isHorizontal && (position === 'right' ? 'right-0' : 'left-0')
          )}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
              <div className="min-w-0 flex-1">
                {title && (
                  <h2 id="drawer-title" className="text-heading-md text-text-primary font-semibold">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-body-sm text-text-secondary mt-1">{description}</p>
                )}
              </div>
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="flex-shrink-0 p-1 text-text-muted hover:text-gold transition-colors duration-150 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Drag handle for bottom sheet */}
          {position === 'bottom' && (
            <div
              className="flex justify-center pt-2 pb-1 cursor-grab active:cursor-grabbing"
              onPointerDown={handleDragStart}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerCancel={handleDragEnd}
            >
              <div className="w-8 h-1 rounded-full bg-text-muted" />
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
}
