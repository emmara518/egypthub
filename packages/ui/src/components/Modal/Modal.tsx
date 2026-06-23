'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { Portal } from '../../utils/portal';
import { useLockedBody } from '../../hooks/useLockedBody';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { ModalProps } from './Modal.types';
import { modalSizeMap } from './Modal.types';

export function Modal({
  isOpen,
  onClose,
  size = 'md',
  title,
  description,
  isDismissable = true,
  showCloseButton = true,
  children,
  footer,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useLockedBody(isOpen);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const timer = setTimeout(() => {
        setMounted(false);
        previousActiveElement.current?.focus();
      }, reducedMotion ? 0 : 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, reducedMotion]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDismissable) {
        onClose();
      }
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
    if (isDismissable && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'Tab' || !contentRef.current) return;

      const focusable = contentRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    []
  );

  if (!mounted) return null;

  return (
    <Portal>
      <div
        className={cn(
          'fixed inset-0 z-modal flex items-center justify-center p-4 sm:p-6',
          'transition-opacity duration-200 ease-in-out',
          visible ? 'opacity-100' : 'opacity-0'
        )}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-desc' : undefined}
      >
        <div
          className={cn(
            'fixed inset-0 bg-black/70 backdrop-blur-sm',
            'transition-opacity duration-200 ease-in-out',
            visible ? 'opacity-100' : 'opacity-0'
          )}
        />

        <div
          ref={contentRef}
          onKeyDown={handleTabKeyDown}
          className={cn(
            'relative w-full bg-surface-elevated shadow-xl',
            'flex flex-col max-h-[85vh]',
            'transition-all duration-200 ease-in-out',
            visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
            modalSizeMap[size],
            size !== 'fullscreen' && 'rounded-2xl'
          )}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between gap-4 px-8 pt-8 pb-4">
              <div className="min-w-0 flex-1">
                {title && (
                  <h2 id="modal-title" className="text-heading-md text-text-primary font-semibold">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="modal-desc" className="text-body-sm text-text-secondary mt-1">
                    {description}
                  </p>
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

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-8 py-4">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-8 pt-4 pb-8 border-t border-border">
              {footer}
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
}
