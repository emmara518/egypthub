'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { AvailabilityCalendarProps } from './AvailabilityCalendar.types';

const DAY_HEADERS = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];

export function AvailabilityCalendar({ month, days, selectedDate, onSelect, className }: AvailabilityCalendarProps) {
  return (
    <div className={cn('bg-surface border border-border rounded-xl p-4', className)}>
      <h4 className="text-body-sm font-semibold text-text-primary mb-4 text-center">{month}</h4>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {DAY_HEADERS.map((d) => <span key={d} className="text-caption text-text-muted h-7 flex items-center justify-center">{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          const isSelected = selectedDate === day.date;
          return (
            <motion.button
              key={day.date || `e-${i}`}
              whileTap={{ scale: 0.9 }}
              onClick={() => day.available && onSelect(day.date)}
              disabled={!day.available}
              className={cn(
                'h-10 rounded-lg flex flex-col items-center justify-center transition-all text-caption',
                isSelected && 'bg-gold text-text-inverse font-semibold',
                !isSelected && day.available && 'text-text-primary hover:bg-surface-hover',
                !day.available && 'text-text-muted/20 cursor-not-allowed'
              )}
            >
              {day.date && <span>{new Date(day.date).getDate()}</span>}
              {day.price && day.available && <span className="text-[8px] text-gold mt-0.5">{day.price}</span>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
