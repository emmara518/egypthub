import { cn } from '../../utils/cn';
import type { CardContentProps } from './Card.types';

export function CardContent({ children, className }: CardContentProps) {
  if (!children) return null;

  return (
    <div className={cn('flex-1', className)}>
      {children}
    </div>
  );
}
