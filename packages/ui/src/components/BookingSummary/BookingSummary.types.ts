export interface BookingSummaryLine { label: string; value: string; isHighlight?: boolean; }

export interface BookingSummaryProps {
  title: string;
  image?: string;
  lines: BookingSummaryLine[];
  totalLabel?: string;
  totalValue?: string;
  className?: string;
}
