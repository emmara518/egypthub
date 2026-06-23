'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import type { Toast, ToastState, ToastProviderProps } from './Toast.types';
import { TOAST_LIMIT, defaultDurations } from './Toast.types';

const ToastContext = createContext<ToastState | null>(null);

export function useToast(): ToastState {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}

let toastCounter = 0;
function generateId(): string {
  toastCounter += 1;
  return `toast-${toastCounter}-${Date.now()}`;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (data: Omit<Toast, 'id'>): string => {
      const id = generateId();
      const newToast: Toast = { ...data, id };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        return updated.length > TOAST_LIMIT ? updated.slice(-TOAST_LIMIT) : updated;
      });

      const duration = data.duration !== undefined ? data.duration : defaultDurations[data.type];
      if (duration !== null && duration > 0) {
        const timer = setTimeout(() => removeToast(id), duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [removeToast]
  );

  const dismiss = useCallback((id: string) => {
    removeToast(id);
  }, [removeToast]);

  const dismissAll = useCallback(() => {
    setToasts([]);
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
  }, []);

  const update = useCallback(
    (id: string, data: Partial<Omit<Toast, 'id'>>) => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...data } : t))
      );
    },
    []
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss, dismissAll, update }}>
      {children}
    </ToastContext.Provider>
  );
}
