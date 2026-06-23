export interface Preference {
  id: string;
  label: string;
  icon?: string;
}

export interface TripPreferencesSelectorProps {
  preferences: Preference[];
  selectedIds?: string[];
  onChange: (selectedIds: string[]) => void;
  max?: number;
  className?: string;
}
