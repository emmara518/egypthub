'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '../../utils/cn';
import { Portal } from '../../utils/portal';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { Toast, ToastType } from './Toast.types';
import { useToast } from './ToastProvider';

const typeStyles: Record<ToastType, { border: string; icon: React.ReactNode }> = {
  success: {
    border: 'border-l-success',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  error: {
    border: 'border-l-error',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  },
  warning: {
    border: 'border-l-warning',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  info: {
    border: 'border-l-info',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
};

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: () => void;
}) {
  const [progress, setProgress] = useState(100);
  const reducedMotion = useReducedMotion();
  const startTime = useRef(Date.now());
  const duration = toast.duration ?? 3000;

  useEffect(() => {
    if (reducedMotion || !duration || duration < 0) return;

    startTime.current = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [duration, reducedMotion]);

  const style = typeStyles[toast.type];

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 w-[360px] bg-surface-elevated border border-border shadow-lg rounded-lg p-4',
        'border-l-4',
        style.border,
        !reducedMotion && 'animate-slide-right'
      )}
    >
      <div className="flex-shrink-0 mt-0.5">{style.icon}</div>

      <div className="flex-1 min-w-0">
        <p className="text-body-sm font-semibold text-text-primary">{toast.title}</p>
        {toast.description && (
          <p className="text-body-sm text-text-secondary mt-0.5">{toast.description}</p>
        )}
        {toast.action && (
          <button
            type="button"
            onClick={() => {
              toast.action?.onClick();
              onDismiss();
            }}
            className="mt-2 text-body-sm text-gold font-medium hover:text-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Close notification"
        className="flex-shrink-0 p-0.5 text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18" /><path d="M6 6l12 12" />
        </svg>
      </button>

      {/* Progress bar */}
      {!reducedMotion && duration && duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-surface-hover rounded-b-lg overflow-hidden">
          <div
            className="h-full bg-gold/50 transition-all duration-100 linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export function ToastContainer() {
  const { toasts, dismiss } = useToast();
  const reducedMotion = useReducedMotion();

  if (toasts.length === 0) return null;

  return (
    <Portal>
      <div
        aria-live="polite"
        className={cn(
          'fixed z-toast flex flex-col gap-3 pointer-events-none',
          'top-4 right-4 ltr:right-4 ltr:left-auto rtl:left-4 rtl:right-auto',
          !reducedMotion && 'top-4',
          'sm:top-4 sm:right-4',
          'max-sm:top-4 max-sm:left-4 max-sm:right-4 max-sm:items-center'
        )}
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onDismiss={() => dismiss(t.id)} />
          </div>
        ))}
      </div>
    </Portal>
  );
}
