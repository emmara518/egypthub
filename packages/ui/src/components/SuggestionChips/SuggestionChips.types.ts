export interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  isDisabled?: boolean;
  className?: string;
}
