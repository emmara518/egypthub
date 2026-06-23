import type { ReactNode, ReactElement } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export type TooltipVariant = 'default' | 'rich';

export interface TooltipProps {
  content: ReactNode;
  position?: TooltipPosition;
  variant?: TooltipVariant;
  delay?: number;
  children: ReactElement;
  maxWidth?: number;
}

export interface TooltipContentProps {
  content: ReactNode;
  position: TooltipPosition;
  variant: TooltipVariant;
  maxWidth: number;
  triggerRect: DOMRect;
}
