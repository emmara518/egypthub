'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { BookingTimelineProps, BookingEvent } from './BookingTimeline.types';

const statusStyles: Record<string, string> = {
  completed: 'bg-success',
  active: 'bg-gold',
  pending: 'bg-border',
  cancelled: 'bg-error',
};

function TimelineItem({ event, isLast }: { event: BookingEvent; isLast: boolean }) {
  return (
    <div className="relative flex gap-4 pb-6 last:pb-0">
      {!isLast && <div className={cn('absolute top-4 left-4 w-0.5 h-full -translate-x-1/2', event.status === 'completed' ? 'bg-success/40' : 'bg-border')} />}
      <div className="flex flex-col items-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={cn('w-4 h-4 rounded-full border-2', statusStyles[event.status || 'pending'], event.status === 'active' && 'shadow-lg shadow-gold/30', event.status === 'cancelled' && 'border-error', event.status !== 'active' && event.status !== 'cancelled' && 'border-transparent')} />
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <h4 className="text-body-sm font-semibold text-text-primary">{event.title}</h4>
        {event.description && <p className="text-caption text-text-secondary mt-0.5">{event.description}</p>}
        {event.timestamp && <span className="text-caption text-text-muted mt-1 block">{event.timestamp}</span>}
      </div>
    </div>
  );
}

export function BookingTimeline({ events, className }: BookingTimelineProps) {
  return (
    <div className={cn('', className)} role="list" aria-label="الجدول الزمني للحجز">
      {events.map((event, i) => <TimelineItem key={event.id} event={event} isLast={i === events.length - 1} />)}
    </div>
  );
}
