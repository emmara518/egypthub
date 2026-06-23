'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Card } from '../Card';
import { RatingStars } from '../RatingStars';
import { Grid } from '../Grid';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { TestimonialsProps, Testimonial } from './Testimonials.types';

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card variant="default" padding="md" className="h-full">
      <RatingStars rating={testimonial.rating} size="sm" />
      <p className="text-body-sm text-text-primary mt-3 leading-relaxed">"{testimonial.content}"</p>
      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border">
        <div className="w-9 h-9 rounded-full bg-surface-elevated overflow-hidden flex items-center justify-center flex-shrink-0">
          {testimonial.authorAvatar ? (
            <img src={testimonial.authorAvatar} alt={testimonial.authorName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-body-sm font-semibold text-gold">{testimonial.authorName.charAt(0)}</span>
          )}
        </div>
        <div>
          <div className="text-body-sm font-semibold text-text-primary">{testimonial.authorName}</div>
          {testimonial.role && <div className="text-caption text-text-muted">{testimonial.role}</div>}
        </div>
      </div>
    </Card>
  );
}

export function Testimonials({ testimonials, variant = 'grid', className }: TestimonialsProps) {
  const [current, setCurrent] = useState(0);
  const reducedMotion = useReducedMotion();

  if (variant === 'grid') {
    return (
      <Grid cols={3} gap={6} className={className}>
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </Grid>
    );
  }

  return (
    <div className={cn('relative', className)}>
      <div className="overflow-hidden">
        <motion.div
          animate={{ x: reducedMotion ? 0 : -(current * 100) + '%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="flex gap-6"
        >
          {testimonials.map((t) => (
            <div key={t.id} className="min-w-full flex-shrink-0 sm:min-w-[50%] lg:min-w-[33.333%]">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </motion.div>
      </div>

      {testimonials.length > 3 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={cn('w-2 h-2 rounded-full transition-all', i === current ? 'w-6 bg-gold' : 'bg-border')}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
