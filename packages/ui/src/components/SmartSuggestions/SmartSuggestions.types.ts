export interface SmartSuggestion {
  id: string;
  text: string;
  category?: string;
  icon?: string;
}

export interface SmartSuggestionsProps {
  suggestions: SmartSuggestion[];
  onSelect: (suggestion: SmartSuggestion) => void;
  isLoading?: boolean;
  className?: string;
}
