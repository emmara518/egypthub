'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { AIRecommendationCardProps } from './AIRecommendationCard.types';

export function AIRecommendationCard({ title, description, image, reason, matchScore, onClick, className }: AIRecommendationCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      whileHover={!reducedMotion ? { y: -2, scale: 1.01 } : undefined}
      whileTap={!reducedMotion ? { scale: 0.99 } : undefined}
      onClick={onClick}
      className={cn(
        'w-full text-start bg-surface border border-border rounded-xl p-4',
        'hover:border-gold-border transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-gold/30',
        className
      )}
    >
      <div className="flex gap-3">
        {image && (
          <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-body-md font-semibold text-text-primary truncate">{title}</h4>
            {matchScore !== undefined && (
              <span className="flex-shrink-0 text-caption text-gold font-medium">{matchScore}%</span>
            )}
          </div>
          <p className="text-body-sm text-text-secondary mt-0.5 line-clamp-2">{description}</p>
          {reason && (
            <p className="text-caption text-gold mt-1.5 flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21.5l1.5-9H5l9-11-1.5 9H19L9 21.5z" /></svg>
              {reason}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}
