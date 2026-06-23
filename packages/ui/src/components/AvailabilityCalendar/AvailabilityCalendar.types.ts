export interface AvailabilityDay { date: string; available: boolean; price?: string; }

export interface AvailabilityCalendarProps {
  month: string;
  days: AvailabilityDay[];
  selectedDate?: string;
  onSelect: (date: string) => void;
  className?: string;
}
