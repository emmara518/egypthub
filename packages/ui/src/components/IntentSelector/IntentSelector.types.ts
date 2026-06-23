export interface IntentOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface IntentSelectorProps {
  options: IntentOption[];
  selectedId?: string;
  onSelect: (optionId: string) => void;
  className?: string;
}
