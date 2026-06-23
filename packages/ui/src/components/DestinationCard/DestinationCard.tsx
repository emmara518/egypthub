'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Card } from '../Card';
import { RatingStars } from '../RatingStars';
import { DestinationBadge } from '../DestinationBadge';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { DestinationCardProps } from './DestinationCard.types';

export function DestinationCard({
  image,
  title,
  subtitle,
  rating,
  reviewCount,
  price,
  duration,
  badge,
  onClick,
  className,
}: DestinationCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={!reducedMotion ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
    >
      <Card
        variant="default"
        isHoverable
        onClick={onClick}
        padding="none"
        className={cn('overflow-hidden', className)}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 to-transparent" />
          {badge && (
            <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto">
              <DestinationBadge type={badge} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-heading-sm font-semibold text-text-primary truncate">{title}</h3>
          {subtitle && <p className="text-body-sm text-text-secondary mt-0.5 truncate">{subtitle}</p>}

          <div className="flex items-center gap-2 mt-2">
            <RatingStars rating={rating} size="sm" />
            <span className="text-caption text-text-muted">({reviewCount})</span>
          </div>

          {(price || duration) && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              {price && (
                <span className="text-body-sm font-semibold text-gold">{price}</span>
              )}
              {duration && (
                <span className="text-caption text-text-muted flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  {duration}
                </span>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
