export type BudgetLevel = 'budget' | 'moderate' | 'luxury' | 'premium';

export interface TripBudgetSelectorProps {
  value?: BudgetLevel;
  onChange: (value: BudgetLevel) => void;
  className?: string;
}

export const budgetOptions: { value: BudgetLevel; label: string; description: string; icon: string }[] = [
  { value: 'budget', label: 'اقتصادية', description: 'ميزانية محدودة', icon: '💰' },
  { value: 'moderate', label: 'متوسطة', description: 'ميزانية معقولة', icon: '💵' },
  { value: 'luxury', label: 'فاخرة', description: 'ميزانية عالية', icon: '💎' },
  { value: 'premium', label: 'فاخرة جداً', description: 'أفضل ما يمكن', icon: '👑' },
];
