'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { ConversationTimelineProps, TimelineEntry } from './ConversationTimeline.types';

function TimelineDot({ entry }: { entry: TimelineEntry }) {
  const { isActive, isCompleted, icon } = entry;

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-300',
          isCompleted && 'bg-gold text-text-inverse',
          isActive && 'border-2 border-gold bg-gold-subtle text-gold',
          !isActive && !isCompleted && 'border-2 border-border bg-surface text-text-muted'
        )}
      >
        {icon ? (
          <span className="text-body-sm">{icon}</span>
        ) : (
          <div className={cn('w-2 h-2 rounded-full', isCompleted && 'bg-text-inverse', isActive && 'bg-gold', !isActive && !isCompleted && 'bg-border')} />
        )}
      </div>
    </div>
  );
}

export function ConversationTimeline({ entries, className }: ConversationTimelineProps) {
  return (
    <div className={cn('relative', className)} role="list" aria-label="الجدول الزمني للمحادثة">
      {entries.map((entry, index) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          role="listitem"
          className="relative flex gap-4 pb-6 last:pb-0"
        >
          {/* Connector line */}
          {index < entries.length - 1 && (
            <div
              className={cn(
                'absolute top-8 left-4 w-px h-full -translate-x-1/2',
                entry.isCompleted ? 'bg-gold/50' : 'bg-border'
              )}
            />
          )}

          <TimelineDot entry={entry} />

          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-center gap-2">
              <h4
                className={cn(
                  'text-body-sm font-medium',
                  entry.isActive && 'text-gold',
                  entry.isCompleted && 'text-text-primary',
                  !entry.isActive && !entry.isCompleted && 'text-text-secondary'
                )}
              >
                {entry.title}
              </h4>
              {entry.timestamp && (
                <span className="text-caption text-text-muted">{entry.timestamp}</span>
              )}
            </div>
            {entry.description && (
              <p className="text-body-sm text-text-secondary mt-0.5">{entry.description}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
