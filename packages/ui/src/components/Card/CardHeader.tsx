import { cn } from '../../utils/cn';
import type { CardHeaderProps } from './Card.types';

export function CardHeader({ title, subtitle, action, className }: CardHeaderProps) {
  if (!title && !subtitle && !action) return null;

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 pb-4 mb-4 border-b border-border',
        className
      )}
    >
      <div className="flex flex-col gap-1 min-w-0">
        {title && (
          <h3 className="text-heading-sm text-text-primary font-semibold truncate">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-body-sm text-text-secondary">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
