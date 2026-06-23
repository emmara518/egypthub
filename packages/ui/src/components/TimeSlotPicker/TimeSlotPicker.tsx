'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { TimeSlotPickerProps } from './TimeSlotPicker.types';

export function TimeSlotPicker({ slots, selectedId, onSelect, date, className }: TimeSlotPickerProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {date && <p className="text-body-sm text-text-secondary">{date}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {slots.map((slot) => {
          const isSelected = selectedId === slot.id;
          const unavailable = slot.isAvailable === false;
          return (
            <motion.button
              key={slot.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => !unavailable && onSelect(slot.id)}
              disabled={unavailable}
              className={cn(
                'flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-200',
                isSelected && 'border-gold bg-gold-subtle',
                !isSelected && !unavailable && 'border-border bg-surface hover:border-gold/50',
                unavailable && 'border-border bg-surface opacity-40 cursor-not-allowed line-through'
              )}
            >
              <span className={cn('text-body-sm font-medium', isSelected ? 'text-gold' : 'text-text-primary')}>{slot.label}</span>
              {slot.price && <span className="text-caption text-text-muted">{slot.price}</span>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
