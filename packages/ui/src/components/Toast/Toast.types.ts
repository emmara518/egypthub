import type { ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number | null;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastState {
  toasts: Toast[];
  toast: (data: Omit<Toast, 'id'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  update: (id: string, data: Partial<Omit<Toast, 'id'>>) => void;
}

export interface ToastProviderProps {
  children: ReactNode;
}

export const TOAST_LIMIT = 5;

export const defaultDurations: Record<ToastType, number> = {
  success: 3000,
  error: 5000,
  warning: 4000,
  info: 3000,
};
