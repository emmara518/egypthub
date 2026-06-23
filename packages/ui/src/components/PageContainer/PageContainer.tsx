import { cn } from '../../utils/cn';
import type { PageContainerProps } from './PageContainer.types';

const maxWidthMap: Record<NonNullable<PageContainerProps['maxWidth']>, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  '3xl': 'max-w-screen-3xl',
  full: 'max-w-full',
};

const paddingMap: Record<NonNullable<PageContainerProps['paddingY']>, string> = {
  none: 'py-0',
  sm: 'py-4',
  md: 'py-6',
  lg: 'py-8',
  xl: 'py-12',
};

export function PageContainer({
  children,
  className,
  maxWidth = '3xl',
  paddingY = 'md',
}: PageContainerProps) {
  return (
    <main
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        maxWidthMap[maxWidth],
        paddingMap[paddingY],
        className
      )}
    >
      {children}
    </main>
  );
}
