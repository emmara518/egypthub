export type CompanionType = 'solo' | 'couple' | 'family' | 'friends' | 'group';

export interface TripCompanionSelectorProps {
  value?: CompanionType;
  onChange: (value: CompanionType) => void;
  className?: string;
}

export const companionOptions: { value: CompanionType; label: string; description: string; icon: string }[] = [
  { value: 'solo', label: 'فردي', description: 'سفر منفرد', icon: '🧑' },
  { value: 'couple', label: 'ثنائي', description: 'سفر مع الشريك', icon: '💑' },
  { value: 'family', label: 'عائلي', description: 'سفر مع العائلة', icon: '👨‍👩‍👧‍👦' },
  { value: 'friends', label: 'أصدقاء', description: 'سفر مع الأصدقاء', icon: '👥' },
  { value: 'group', label: 'مجموعة', description: 'سفر منظم', icon: '👪' },
];
