'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { CalendarProps } from './Calendar.types';

const DAYS = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];
const MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

function isSameDay(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function isDisabled(day: Date, min?: Date, max?: Date, disabled?: Date[]) {
  if (min && day < new Date(min.getFullYear(), min.getMonth(), min.getDate())) return true;
  if (max && day > new Date(max.getFullYear(), max.getMonth(), max.getDate())) return true;
  if (disabled?.some((d) => isSameDay(d, day))) return true;
  return false;
}

export function Calendar({ value, onChange, minDate, maxDate, disabledDates, className }: CalendarProps) {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(value || today);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const days = useMemo(() => {
    const d: (number | null)[] = [];
    for (let i = 0; i < startDay; i++) d.push(null);
    for (let i = 1; i <= daysInMonth; i++) d.push(i);
    return d;
  }, [startDay, daysInMonth]);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const handleDayClick = (day: number) => {
    const d = new Date(year, month, day);
    if (!isDisabled(d, minDate, maxDate, disabledDates)) onChange?.(d);
  };

  return (
    <div className={cn('bg-surface border border-border rounded-xl p-4', className)} role="grid" aria-label="التقويم">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors" aria-label="الشهر السابق">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <span className="text-body-sm font-semibold text-text-primary">{MONTHS[month]} {year}</span>
        <button onClick={nextMonth} className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors" aria-label="الشهر التالي">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {DAYS.map((d) => <span key={d} className="text-caption text-text-muted h-8 flex items-center justify-center">{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (day === null) return <div key={`e-${i}`} />;
          const date = new Date(year, month, day);
          const isSel = value && isSameDay(date, value);
          const isToday = isSameDay(date, today);
          const disabled = isDisabled(date, minDate, maxDate, disabledDates);

          return (
            <motion.button
              key={day}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDayClick(day)}
              disabled={disabled}
              className={cn(
                'h-9 rounded-lg text-body-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/30',
                isSel && 'bg-gold text-text-inverse font-semibold',
                !isSel && isToday && 'border border-gold text-gold',
                !isSel && !isToday && !disabled && 'text-text-primary hover:bg-surface-hover',
                disabled && 'text-text-muted/30 cursor-not-allowed'
              )}
            >
              {day}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
