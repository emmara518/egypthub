import { cn } from '../../utils/cn';
import type { GridProps } from './Grid.types';

const colsMap: Record<NonNullable<GridProps['cols']>, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  12: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-12',
};

const gapMap: Record<NonNullable<GridProps['gap']>, string> = {
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

export function Grid({ children, cols = 1, gap = 4, className }: GridProps) {
  return (
    <div
      className={cn(
        'grid',
        colsMap[cols],
        gapMap[gap],
        className
      )}
    >
      {children}
    </div>
  );
}
