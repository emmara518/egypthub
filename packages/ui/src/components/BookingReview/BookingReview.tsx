'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { BookingReviewProps } from './BookingReview.types';

export function BookingReview({ title, sections, onEdit, onConfirm, className }: BookingReviewProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <h2 className="text-heading-sm font-semibold text-text-primary">{title}</h2>
      {sections.map((section) => (
        <div key={section.title} className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-body-md font-semibold text-text-primary">{section.title}</h3>
            {onEdit && (
              <button onClick={() => onEdit(section.title)} className="text-caption text-gold hover:text-gold-light transition-colors" aria-label={`تعديل ${section.title}`}>
                تعديل
              </button>
            )}
          </div>
          <div className="space-y-2">
            {section.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-body-sm">
                <span className="text-text-secondary">{item.label}</span>
                <span className="text-text-primary font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      {onConfirm && (
        <motion.button whileTap={{ scale: 0.98 }} onClick={onConfirm} className="w-full py-3 rounded-xl bg-gold text-text-inverse text-body-md font-semibold hover:bg-gold-light transition-colors">
          تأكيد الحجز
        </motion.button>
      )}
    </div>
  );
}
