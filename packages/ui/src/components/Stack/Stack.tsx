import { cn } from '../../utils/cn';
import type { StackProps } from './Stack.types';

const gapMap: Record<NonNullable<StackProps['gap']>, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
};

export function Stack({ children, gap = 4, className }: StackProps) {
  return (
    <div className={cn('flex flex-col', gapMap[gap], className)}>
      {children}
    </div>
  );
}
