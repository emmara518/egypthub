export interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
  timestamp?: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  className?: string;
}
