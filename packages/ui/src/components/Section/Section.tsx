import { cn } from '../../utils/cn';
import type { SectionProps } from './Section.types';

const paddingMap: Record<NonNullable<SectionProps['paddingY']>, string> = {
  none: 'py-0',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-20',
};

const maxWidthMap: Record<NonNullable<SectionProps['maxWidth']>, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  '3xl': 'max-w-screen-3xl',
  full: 'max-w-full',
};

export function Section({
  children,
  className,
  as: Tag = 'section',
  paddingY = 'md',
  maxWidth = '3xl',
}: SectionProps) {
  return (
    <Tag className={cn('w-full', paddingMap[paddingY], className)}>
      <div className={cn('mx-auto px-4 sm:px-6 lg:px-8 w-full', maxWidthMap[maxWidth])}>
        {children}
      </div>
    </Tag>
  );
}
