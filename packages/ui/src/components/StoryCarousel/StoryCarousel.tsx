'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { StoryCard } from '../StoryCard';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { StoryCarouselProps } from './StoryCarousel.types';

export function StoryCarousel({ stories, className }: StoryCarouselProps) {
  const [current, setCurrent] = useState(0);
  const reducedMotion = useReducedMotion();
  const itemsPerView = stories.length < 4 ? stories.length : 3;
  const max = Math.max(0, stories.length - itemsPerView);

  return (
    <div className={cn('relative', className)}>
      <div className="overflow-hidden">
        <motion.div
          animate={{ x: reducedMotion ? 0 : -(current * (100 / itemsPerView)) + '%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="flex gap-6"
        >
          {stories.map((story) => (
            <div key={story.id} className="min-w-[calc(33.333%-16px)] flex-shrink-0">
              <StoryCard {...story} />
            </div>
          ))}
        </motion.div>
      </div>

      {max > 0 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button onClick={() => setCurrent((p) => Math.max(p - 1, 0))} disabled={current === 0}
            className="p-2 rounded-full bg-surface border border-border text-text-muted hover:text-gold hover:border-gold disabled:opacity-30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:rotate-180">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: max + 1 }, (_, i) => (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`}
                className={cn('w-2 h-2 rounded-full transition-all duration-200', i === current ? 'w-6 bg-gold' : 'bg-border')}
              />
            ))}
          </div>
          <button onClick={() => setCurrent((p) => Math.min(p + 1, max))} disabled={current >= max}
            className="p-2 rounded-full bg-surface border border-border text-text-muted hover:text-gold hover:border-gold disabled:opacity-30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:rotate-180">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
