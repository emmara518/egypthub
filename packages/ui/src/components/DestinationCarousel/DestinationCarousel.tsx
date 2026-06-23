'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { DestinationCard } from '../DestinationCard';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { DestinationCarouselProps } from './DestinationCarousel.types';

export function DestinationCarousel({ destinations, className }: DestinationCarouselProps) {
  const [current, setCurrent] = useState(0);
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsPerView = 3;
  const max = Math.max(0, destinations.length - itemsPerView);

  const next = () => setCurrent((p) => Math.min(p + 1, max));
  const prev = () => setCurrent((p) => Math.max(p - 1, 0));

  return (
    <div className={cn('relative', className)}>
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          animate={{ x: reducedMotion ? 0 : -(current * (100 / itemsPerView)) + '%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="flex gap-6"
        >
          {destinations.map((dest) => (
            <div key={dest.id} className="min-w-[calc(33.333%-16px)] flex-shrink-0">
              <DestinationCard {...dest} />
            </div>
          ))}
        </motion.div>
      </div>

      {max > 0 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button onClick={prev} disabled={current === 0}
            className="p-2 rounded-full bg-surface border border-border text-text-muted hover:text-gold hover:border-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:rotate-180">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: max + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-200',
                  i === current ? 'w-6 bg-gold' : 'bg-border hover:bg-border-light'
                )}
              />
            ))}
          </div>
          <button onClick={next} disabled={current >= max}
            className="p-2 rounded-full bg-surface border border-border text-text-muted hover:text-gold hover:border-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
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
