export interface TripDurationSelectorProps {
  value?: number;
  onChange: (days: number) => void;
  min?: number;
  max?: number;
  className?: string;
}
