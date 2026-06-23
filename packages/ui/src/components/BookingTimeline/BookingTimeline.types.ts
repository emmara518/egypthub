export interface BookingEvent {
  id: string; title: string; description?: string; timestamp?: string; status?: 'completed' | 'active' | 'pending' | 'cancelled';
}

export interface BookingTimelineProps {
  events: BookingEvent[]; className?: string;
}
