'use client';

import { cn } from '../../utils/cn';
import type { SkeletonProps } from './Skeleton.types';

const variantStyles: Record<string, string> = {
  text: 'h-4 w-full rounded-md',
  'text-sm': 'h-3 w-full rounded',
  heading: 'h-7 w-[60%] rounded-md',
  circle: 'h-10 w-10 rounded-full',
  card: 'h-[200px] w-full rounded-xl',
  image: 'w-full rounded-xl',
  table: 'h-10 w-full rounded-md',
  button: 'h-10 w-[120px] rounded-lg',
};

export function Skeleton({
  variant = 'text',
  width,
  height,
  className,
}: SkeletonProps) {
  const style: React.CSSProperties = {};

  if (width !== undefined) {
    style.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height !== undefined) {
    style.height = typeof height === 'number' ? `${height}px` : height;
  }

  if (variant === 'image') {
    style.aspectRatio = '4 / 3';
  }

  if (variant === 'table') {
    return (
      <div className="flex flex-col gap-2 w-full" role="status" aria-label="Loading">
        {/* Header row */}
        <div className={cn('bg-surface-elevated animate-pulse-skeleton', variantStyles.table)} style={style} />
        {/* 5 body rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-surface-elevated animate-pulse-skeleton rounded-md h-8 w-full opacity-70" />
        ))}
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'bg-surface-elevated animate-pulse-skeleton',
        variantStyles[variant],
        className
      )}
      style={style}
      tabIndex={-1}
    />
  );
}
