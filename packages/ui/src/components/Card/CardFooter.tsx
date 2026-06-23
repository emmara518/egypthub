import { cn } from '../../utils/cn';
import type { CardFooterProps } from './Card.types';

export function CardFooter({ children, className }: CardFooterProps) {
  if (!children) return null;

  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3 pt-4 mt-4 border-t border-border',
        className
      )}
    >
      {children}
    </div>
  );
}
