export interface TaxRow { label: string; amount: string; }

export interface TaxSummaryProps {
  title?: string; taxRows: TaxRow[]; totalLabel?: string; totalAmount?: string; currency?: string; className?: string;
}
