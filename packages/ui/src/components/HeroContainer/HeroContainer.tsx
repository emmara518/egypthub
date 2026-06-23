import { cn } from '../../utils/cn';
import type { HeroContainerProps } from './HeroContainer.types';

const sizeMap: Record<NonNullable<HeroContainerProps['size']>, string> = {
  sm: 'min-h-[300px] py-16',
  md: 'min-h-[400px] py-20',
  lg: 'min-h-[500px] py-24',
  xl: 'min-h-[600px] py-32',
};

const overlayMap: Record<NonNullable<HeroContainerProps['overlay']>, string> = {
  dark: 'before:absolute before:inset-0 before:bg-gradient-to-b before:from-bg-primary/60 before:to-bg-primary/90',
  gold: 'before:absolute before:inset-0 before:bg-gradient-to-b before:from-gold/10 before:to-bg-primary/80',
  none: '',
};

export function HeroContainer({
  children,
  className,
  size = 'md',
  gradient = true,
  overlay = 'dark',
}: HeroContainerProps) {
  return (
    <section
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        sizeMap[size],
        overlayMap[overlay],
        gradient && 'bg-gradient-to-b from-surface-hover to-bg-primary',
        className
      )}
    >
      <div className="relative z-10 w-full max-w-screen-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
