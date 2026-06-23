export interface InstallmentPlan { id: string; months: number; monthlyAmount: string; totalAmount?: string; isNoInterest?: boolean; }

export interface InstallmentSelectorProps {
  plans: InstallmentPlan[]; selected: string; onChange: (id: string) => void; currency?: string; className?: string;
}
