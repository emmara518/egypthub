'use client';

import { useState } from 'react';
import { cn } from '../../utils/cn';
import type { AvatarProps } from './Avatar.types';
import { avatarSizeMap, statusColorMap, statusDotSizeMap } from './Avatar.types';

export function Avatar({
  size = 'md',
  src,
  name,
  alt,
  status,
  isPremium = false,
  onClick,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const sizeConfig = avatarSizeMap[size];
  const isClickable = !!onClick;

  const initial = name ? name.trim().charAt(0).toUpperCase() : '?';

  const content = (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={cn(
        'relative inline-flex items-center justify-center rounded-full overflow-hidden',
        'bg-surface-elevated text-gold font-semibold',
        'transition-all duration-150 ease-in-out',
        sizeConfig.class,
        isPremium && 'ring-2 ring-gold ring-offset-2 ring-offset-bg-primary',
        isClickable && 'cursor-pointer hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2'
      )}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="select-none">{initial}</span>
      )}

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-surface',
            statusDotSizeMap[size],
            statusColorMap[status]
          )}
          aria-label={status === 'online' ? 'Online' : status === 'offline' ? 'Offline' : 'Away'}
          role="status"
        />
      )}
    </div>
  );

  return content;
}
