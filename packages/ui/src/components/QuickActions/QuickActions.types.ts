export interface QuickAction {
  id: string;
  label: string;
  icon?: string;
  description?: string;
}

export interface QuickActionsProps {
  actions: QuickAction[];
  onAction: (actionId: string) => void;
  columns?: 2 | 3 | 4;
  className?: string;
}
