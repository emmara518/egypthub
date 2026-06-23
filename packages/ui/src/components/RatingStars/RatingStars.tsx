'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { RatingStarsProps } from './RatingStars.types';

const sizeMap: Record<string, string> = {
  sm: 'w-3.5 h-3.5',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export function RatingStars({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onChange,
  showValue = false,
  className,
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const displayRating = hoverRating ?? rating;

  return (
    <div
      className={cn('inline-flex items-center gap-0.5', className)}
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={`Rated ${rating} out of ${maxRating}`}
      aria-roledescription={interactive ? 'rating' : undefined}
    >
      {Array.from({ length: maxRating }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= displayRating;
        const half = !filled && starValue - 0.5 <= rating;

        return (
          <motion.button
            key={i}
            type="button"
            disabled={!interactive}
            whileHover={!reducedMotion && interactive ? { scale: 1.2 } : undefined}
            whileTap={!reducedMotion && interactive ? { scale: 0.9 } : undefined}
            onClick={() => {
              if (interactive && onChange) onChange(starValue);
            }}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(null)}
            role={interactive ? 'radio' : undefined}
            aria-checked={interactive ? starValue === rating : undefined}
            aria-label={interactive ? `${starValue} star${starValue > 1 ? 's' : ''}` : undefined}
            className={cn(
              sizeMap[size],
              'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm',
              interactive ? 'cursor-pointer' : 'cursor-default'
            )}
          >
            <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              className={cn('w-full h-full', filled ? 'text-gold' : 'text-border')}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </motion.button>
        );
      })}
      {showValue && (
        <span className="text-body-sm text-text-secondary mr-1 rtl:ml-1 rtl:mr-0">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
