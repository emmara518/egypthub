export interface StatsBarItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface StatsBarProps {
  items: StatsBarItem[];
  variant?: 'default' | 'gradient';
  columns?: 2 | 3 | 4 | 5 | 6;
  className?: string;
}
