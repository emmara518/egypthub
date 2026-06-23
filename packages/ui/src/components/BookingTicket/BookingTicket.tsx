'use client';

import { cn } from '../../utils/cn';
import type { BookingTicketProps } from './BookingTicket.types';

export function BookingTicket({ title, date, time, location, passengers, bookingRef, qrValue, className }: BookingTicketProps) {
  return (
    <div className={cn('bg-surface border border-border rounded-2xl overflow-hidden', className)}>
      <div className="p-5 border-b border-border">
        <h4 className="text-body-md font-bold text-text-primary mb-1">{title}</h4>
        <div className="flex items-center gap-4 text-body-sm text-text-secondary">
          <span>{date}</span>
          <span className="w-px h-4 bg-border" />
          <span>{time}</span>
        </div>
        <p className="text-body-sm text-text-muted mt-1">{location}</p>
      </div>
      <div className="p-5">
        <h5 className="text-caption text-text-muted mb-2">المسافرون</h5>
        <div className="space-y-2 mb-4">
          {passengers.map((p, i) => (
            <div key={i} className="flex items-center justify-between text-body-sm">
              <span className="text-text-primary">{p.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-text-muted">{p.type}</span>
                {p.seat && <span className="text-gold font-mono">مقعد {p.seat}</span>}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-caption text-text-muted">رقم الحجز</span>
          <span className="text-body-sm font-mono font-bold text-gold">{bookingRef}</span>
        </div>
      </div>
    </div>
  );
}
