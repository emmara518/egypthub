import type { ReactNode } from 'react';

export interface ChatWindowProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  isOpen?: boolean;
  onClose?: () => void;
  headerAvatar?: string;
  className?: string;
}
