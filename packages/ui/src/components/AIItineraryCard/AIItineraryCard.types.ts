export interface ItineraryDay {
  day: number;
  date?: string;
  activities: {
    time: string;
    title: string;
    description?: string;
    location?: string;
    duration?: string;
  }[];
}

export interface AIItineraryCardProps {
  title: string;
  days: ItineraryDay[];
  totalDays?: number;
  onDayClick?: (day: number) => void;
  className?: string;
}
