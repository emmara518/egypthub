export interface TravelerType { id: string; label: string; description: string; minAge?: string; }

export interface TravelerSelectorProps {
  types: TravelerType[];
  values: Record<string, number>;
  onChange: (id: string, count: number) => void;
  maxTotal?: number;
  className?: string;
}
