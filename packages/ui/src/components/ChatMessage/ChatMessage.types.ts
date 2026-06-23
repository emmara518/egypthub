import type { ChatBubbleProps } from '../ChatBubble/ChatBubble.types';

export interface ChatMessageProps {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp?: string;
  status?: ChatBubbleProps['status'];
  avatar?: string;
  senderName?: string;
  className?: string;
}
