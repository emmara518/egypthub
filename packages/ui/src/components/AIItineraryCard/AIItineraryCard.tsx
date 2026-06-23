'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { AIItineraryCardProps, ItineraryDay } from './AIItineraryCard.types';

function ItineraryDayCard({ day, isExpanded, onToggle }: { day: ItineraryDay; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-surface hover:bg-surface-hover transition-colors text-start"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gold-subtle flex items-center justify-center text-caption font-semibold text-gold">
            {day.day}
          </div>
          <div>
            <span className="text-body-sm font-medium text-text-primary">اليوم {day.day}</span>
            {day.date && <span className="text-caption text-text-muted mr-2">{day.date}</span>}
          </div>
        </div>
        <svg
          className={cn('w-4 h-4 text-text-muted transition-transform', isExpanded && 'rotate-180')}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 space-y-2">
              {day.activities.map((activity, i) => (
                <div key={i} className="flex gap-3 py-2">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-gold mt-1.5" />
                    {i < day.activities.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-caption font-medium text-gold">{activity.time}</span>
                      {activity.duration && (
                        <span className="text-caption text-text-muted">{activity.duration}</span>
                      )}
                    </div>
                    <p className="text-body-sm font-medium text-text-primary mt-0.5">{activity.title}</p>
                    {activity.description && (
                      <p className="text-caption text-text-secondary mt-0.5">{activity.description}</p>
                    )}
                    {activity.location && (
                      <span className="text-caption text-text-muted flex items-center gap-1 mt-0.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        {activity.location}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AIItineraryCard({ title, days, totalDays, onDayClick, className }: AIItineraryCardProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const handleToggle = (day: number) => {
    setExpandedDay((prev) => (prev === day ? null : day));
    onDayClick?.(day);
  };

  return (
    <div className={cn('bg-surface border border-border rounded-xl p-5', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-heading-sm font-semibold text-text-primary">{title}</h3>
        {totalDays && (
          <span className="text-caption text-text-muted">{totalDays} أيام</span>
        )}
      </div>
      <div className="space-y-3">
        {days.map((day) => (
          <ItineraryDayCard
            key={day.day}
            day={day}
            isExpanded={expandedDay === day.day}
            onToggle={() => handleToggle(day.day)}
          />
        ))}
      </div>
    </div>
  );
}
