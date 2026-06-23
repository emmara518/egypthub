import { cn } from '../../utils/cn';
import type { TrustBarProps } from './TrustBar.types';

export function TrustBar({
  travelersCount = '10,000+',
  toursCount = '500+',
  reviewsCount = '25,000+',
  satisfactionRate = '98%',
  className,
}: TrustBarProps) {
  const items = [
    { value: travelersCount, label: 'مسافر' },
    { value: toursCount, label: 'رحلة' },
    { value: reviewsCount, label: 'تقييم' },
    { value: satisfactionRate, label: 'رضا' },
  ];

  return (
    <div className={cn('bg-surface-elevated border border-border rounded-xl py-6 px-8', className)}>
      <div className="flex items-center justify-around flex-wrap gap-6">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-heading-md font-bold text-gold">{item.value}</div>
            <div className="text-body-sm text-text-secondary mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
