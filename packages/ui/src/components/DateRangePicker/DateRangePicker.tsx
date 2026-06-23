'use client';

import { useState } from 'react';
import { cn } from '../../utils/cn';
import { Calendar } from '../Calendar';
import type { DateRangePickerProps } from './DateRangePicker.types';

function formatDate(d: Date) {
  return d.toLocaleDateString('ar-EG', { weekday: 'short', day: 'numeric', month: 'short' });
}

export function DateRangePicker({ startDate, endDate, onChange, minDate, maxDate, className }: DateRangePickerProps) {
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');

  const handleChange = (date: Date) => {
    if (selecting === 'start') {
      onChange(date, undefined);
      setSelecting('end');
    } else {
      if (startDate && date < startDate) {
        onChange(date, undefined);
        setSelecting('end');
      } else {
        onChange(startDate, date);
        setSelecting('start');
      }
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-3 p-4 bg-surface border border-border rounded-xl">
        <div className="flex-1">
          <span className="text-caption text-text-muted block">تاريخ البداية</span>
          <span className={cn('text-body-sm font-medium', startDate ? 'text-text-primary' : 'text-text-muted')}>
            {startDate ? formatDate(startDate) : 'اختر تاريخ'}
          </span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted rtl:rotate-180"><line x1="5" y1="12" x2="19" y2="12" /></svg>
        <div className="flex-1">
          <span className="text-caption text-text-muted block">تاريخ النهاية</span>
          <span className={cn('text-body-sm font-medium', endDate ? 'text-text-primary' : 'text-text-muted')}>
            {endDate ? formatDate(endDate) : 'اختر تاريخ'}
          </span>
        </div>
      </div>
      <Calendar value={selecting === 'start' ? startDate : endDate} onChange={handleChange} minDate={minDate} maxDate={maxDate} />
      {startDate && endDate && (
        <p className="text-caption text-text-muted text-center">
          {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} ليالٍ
        </p>
      )}
    </div>
  );
}
