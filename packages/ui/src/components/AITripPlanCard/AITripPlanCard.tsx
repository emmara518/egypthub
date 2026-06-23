'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Badge } from '../Badge';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { AITripPlanCardProps } from './AITripPlanCard.types';

export function AITripPlanCard({ title, description, duration, budget, highlights, days, image, matchScore, onSelect, className }: AITripPlanCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={!reducedMotion ? { y: -2 } : undefined}
      className={cn(
        'bg-surface border border-border rounded-xl overflow-hidden transition-all duration-200',
        'hover:border-gold-border',
        className
      )}
    >
      {image && (
        <div className="relative h-36 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
          {matchScore !== undefined && (
            <div className="absolute top-3 right-3">
              <Badge color="gold" variant="default" size="sm">{matchScore}% مطابقة</Badge>
            </div>
          )}
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-heading-sm font-semibold text-text-primary">{title}</h3>
          {!image && matchScore !== undefined && (
            <Badge color="gold" variant="default" size="sm">{matchScore}%</Badge>
          )}
        </div>
        <p className="text-body-sm text-text-secondary mt-1.5">{description}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 mt-3 text-caption text-text-muted">
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            {budget}
          </span>
        </div>

        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {highlights.map((h) => (
              <Badge key={h} color="neutral" variant="outline" size="sm">{h}</Badge>
            ))}
          </div>
        )}

        {/* Days */}
        {days.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border space-y-2">
            {days.map((day) => (
              <div key={day.day} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gold-subtle flex items-center justify-center text-caption font-semibold text-gold">
                  {day.day}
                </div>
                <div className="min-w-0">
                  <p className="text-body-sm font-medium text-text-primary">{day.title}</p>
                  <p className="text-caption text-text-secondary mt-0.5">{day.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {onSelect && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onSelect}
            className="mt-4 w-full py-2.5 rounded-xl bg-gold text-text-inverse text-body-sm font-semibold hover:bg-gold-light transition-colors"
          >
            اختر هذه الخطة
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
