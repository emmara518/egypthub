import type { ReactNode } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type AvatarStatus = 'online' | 'offline' | 'away';

export interface AvatarProps {
  size?: AvatarSize;
  src?: string;
  name?: string;
  alt?: string;
  status?: AvatarStatus;
  isPremium?: boolean;
  onClick?: () => void;
}

export interface AvatarGroupProps {
  avatars: Array<{
    src?: string;
    name?: string;
    alt?: string;
  }>;
  size?: AvatarSize;
  max?: number;
  className?: string;
}

export const avatarSizeMap: Record<AvatarSize, { size: number; class: string }> = {
  xs: { size: 24, class: 'h-6 w-6 text-[10px]' },
  sm: { size: 32, class: 'h-8 w-8 text-xs' },
  md: { size: 40, class: 'h-10 w-10 text-sm' },
  lg: { size: 56, class: 'h-14 w-14 text-lg' },
  xl: { size: 80, class: 'h-20 w-20 text-2xl' },
  '2xl': { size: 120, class: 'h-30 w-30 text-3xl' },
};

export const statusColorMap: Record<AvatarStatus, string> = {
  online: 'bg-success',
  offline: 'bg-text-muted',
  away: 'bg-warning',
};

export const statusDotSizeMap: Record<AvatarSize, string> = {
  xs: 'h-1.5 w-1.5 ring-[1px]',
  sm: 'h-2 w-2 ring-[1.5px]',
  md: 'h-2.5 w-2.5 ring-[1.5px]',
  lg: 'h-3 w-3 ring-2',
  xl: 'h-3.5 w-3.5 ring-2',
  '2xl': 'h-4 w-4 ring-2',
};
