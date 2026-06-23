import type { ReactNode } from 'react';

export type DrawerPosition = 'right' | 'left' | 'bottom';

export type DrawerSize = 'sm' | 'md' | 'lg' | 'full';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  size?: DrawerSize;
  title?: string;
  description?: string;
  isDismissable?: boolean;
  showCloseButton?: boolean;
  children?: ReactNode;
}

export const drawerSizeMap: Record<DrawerPosition, Record<DrawerSize, string>> = {
  right: {
    sm: 'max-w-[320px]',
    md: 'max-w-[400px]',
    lg: 'max-w-[560px]',
    full: 'max-w-full',
  },
  left: {
    sm: 'max-w-[320px]',
    md: 'max-w-[400px]',
    lg: 'max-w-[560px]',
    full: 'max-w-full',
  },
  bottom: {
    sm: 'max-h-[30vh]',
    md: 'max-h-[50vh]',
    lg: 'max-h-[75vh]',
    full: 'max-h-full',
  },
};
