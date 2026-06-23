import { cn } from '../../utils/cn';
import type { FlexProps } from './Flex.types';

const dirMap: Record<FlexProps['direction'] & string, string> = {
  row: 'flex-row',
  column: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'column-reverse': 'flex-col-reverse',
};

const alignMap: Record<FlexProps['align'] & string, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyMap: Record<FlexProps['justify'] & string, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const gapMap: Record<NonNullable<FlexProps['gap']>, string> = {
  0: 'gap-0', 1: 'gap-1', 2: 'gap-2', 3: 'gap-3', 4: 'gap-4',
  5: 'gap-5', 6: 'gap-6', 8: 'gap-8', 10: 'gap-10', 12: 'gap-12',
};

export function Flex({
  children,
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = false,
  gap = 0,
  className,
}: FlexProps) {
  return (
    <div
      className={cn(
        'flex',
        dirMap[direction],
        alignMap[align],
        justifyMap[justify],
        wrap && 'flex-wrap',
        gapMap[gap],
        className
      )}
    >
      {children}
    </div>
  );
}
