'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Card } from '../Card';
import { RatingStars } from '../RatingStars';
import { ExperienceBadge } from '../ExperienceBadge';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { ExperienceCardProps } from './ExperienceCard.types';

export function ExperienceCard({
  image,
  title,
  description,
  rating,
  reviewCount,
  price,
  duration,
  location,
  badge,
  onClick,
  className,
}: ExperienceCardProps) {
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
        <div className="relative h-44 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 to-transparent" />
          {badge && (
            <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto">
              <ExperienceBadge type={badge} />
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-heading-sm font-semibold text-text-primary truncate flex-1">{title}</h3>
            <span className="text-body-sm font-bold text-gold whitespace-nowrap">{price}</span>
          </div>

          <div className="flex items-center gap-1.5 text-caption text-text-muted mt-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span className="truncate">{location}</span>
            <span className="mx-1.5 text-border-light">·</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{duration}</span>
          </div>

          {description && (
            <p className="text-body-sm text-text-secondary mt-2 line-clamp-2">{description}</p>
          )}

          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
            <RatingStars rating={rating} size="sm" />
            <span className="text-caption text-text-muted">({reviewCount})</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
