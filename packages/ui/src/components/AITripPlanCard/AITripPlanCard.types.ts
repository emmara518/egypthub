export interface TripDay {
  day: number;
  title: string;
  description: string;
}

export interface AITripPlanCardProps {
  title: string;
  description: string;
  duration: string;
  budget: string;
  highlights: string[];
  days: TripDay[];
  image?: string;
  matchScore?: number;
  onSelect?: () => void;
  className?: string;
}
