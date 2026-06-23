'use client';

import { cn } from '../../utils/cn';
import { ChatBubble } from '../ChatBubble';
import { Avatar } from '../Avatar';
import type { ChatMessageProps } from './ChatMessage.types';

export function ChatMessage({ content, role, timestamp, status, avatar, senderName, className }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        'flex items-end gap-2',
        isUser ? 'flex-row-reverse' : 'flex-row',
        className
      )}
      data-message-role={role}
    >
      {avatar && (
        <div className="flex-shrink-0">
          <Avatar src={avatar} alt={senderName || (isUser ? 'أنت' : 'المساعد')} size="sm" />
        </div>
      )}
      <div className="flex flex-col gap-1 max-w-[75%]">
        {senderName && (
          <span
            className={cn(
              'text-caption px-1',
              isUser ? 'text-end' : 'text-start',
              'text-text-muted'
            )}
          >
            {senderName}
          </span>
        )}
        <ChatBubble
          message={content}
          isUser={isUser}
          timestamp={timestamp}
          status={status}
        />
      </div>
    </div>
  );
}
