'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { ChatBubbleProps } from './ChatBubble.types';

const statusIcons: Record<string, string> = {
  sending: '○',
  sent: '✓',
  delivered: '✓✓',
  read: '✓✓',
};

const statusColors: Record<string, string> = {
  sending: 'text-text-muted',
  sent: 'text-text-muted',
  delivered: 'text-text-muted',
  read: 'text-gold',
};

export function ChatBubble({ message, isUser = false, timestamp, status, className }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'flex',
        isUser ? 'justify-end' : 'justify-start',
        className
      )}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-2.5',
          isUser
            ? 'bg-gold text-text-inverse rounded-br-md'
            : 'bg-surface text-text-primary rounded-bl-md'
        )}
        role="log"
        aria-label={isUser ? 'رسالتك' : 'رسالة المساعد'}
      >
        <p className="text-body-sm whitespace-pre-wrap break-words">{message}</p>
        {(timestamp || status) && (
          <div
            className={cn(
              'flex items-center gap-1 mt-1',
              isUser ? 'justify-end' : 'justify-start'
            )}
          >
            {timestamp && (
              <span
                className={cn(
                  'text-caption',
                  isUser ? 'text-text-inverse/70' : 'text-text-muted'
                )}
              >
                {timestamp}
              </span>
            )}
            {isUser && status && (
              <span className={cn('text-caption', statusColors[status])}>
                {statusIcons[status]}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
