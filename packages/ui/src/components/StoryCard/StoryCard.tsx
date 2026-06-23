'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Card } from '../Card';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { StoryCardProps } from './StoryCard.types';

export function StoryCard({
  image,
  title,
  excerpt,
  authorName,
  authorAvatar,
  readTime,
  onClick,
  className,
}: StoryCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={!reducedMotion ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
    >
      <Card variant="glass" isHoverable onClick={onClick} padding="none" className={cn('overflow-hidden', className)}>
        <div className="relative h-40 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 to-transparent" />
        </div>

        <div className="p-4">
          <h3 className="text-heading-sm font-semibold text-text-primary leading-snug line-clamp-2">{title}</h3>
          <p className="text-body-sm text-text-secondary mt-1.5 line-clamp-2">{excerpt}</p>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-surface-elevated overflow-hidden flex items-center justify-center flex-shrink-0">
                {authorAvatar ? (
                  <img src={authorAvatar} alt={authorName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] font-semibold text-gold">{authorName.charAt(0)}</span>
                )}
              </div>
              <span className="text-caption text-text-muted truncate">{authorName}</span>
            </div>
            <span className="text-caption text-text-muted flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              {readTime}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
