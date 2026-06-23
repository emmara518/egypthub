import type { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'full' | 'fullscreen';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  title?: string;
  description?: string;
  isDismissable?: boolean;
  showCloseButton?: boolean;
  children?: ReactNode;
  footer?: ReactNode;
}

export const modalSizeMap: Record<ModalSize, string> = {
  sm: 'max-w-[400px]',
  md: 'max-w-[560px]',
  lg: 'max-w-[720px]',
  full: 'max-w-[90vw] max-h-[90vh] rounded-2xl',
  fullscreen: 'max-w-[100vw] max-h-[100vh] rounded-none m-0',
};
