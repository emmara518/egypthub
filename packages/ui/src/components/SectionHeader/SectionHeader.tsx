import { cn } from '../../utils/cn';
import type { SectionHeaderProps } from './SectionHeader.types';

const alignMap: Record<NonNullable<SectionHeaderProps['align']>, string> = {
  left: 'text-left rtl:text-right',
  center: 'text-center',
  right: 'text-right rtl:text-left',
};

export function SectionHeader({
  title,
  subtitle,
  action,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4', className)}>
      <div className={cn('space-y-1', alignMap[align])}>
        <h2 className="text-heading-md font-semibold text-text-primary">{title}</h2>
        {subtitle && <p className="text-body-md text-text-secondary">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
