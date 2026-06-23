export interface TimelineEntry {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  icon?: string;
  isActive?: boolean;
  isCompleted?: boolean;
}

export interface ConversationTimelineProps {
  entries: TimelineEntry[];
  className?: string;
}
