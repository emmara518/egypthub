import type { ReactNode } from 'react';

export interface MetricCardProps {
  icon?: ReactNode;
  value: string | number;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}
