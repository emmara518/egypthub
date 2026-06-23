import { type FC, type SVGProps } from 'react';
import { cn } from '../../utils/cn';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface EgyptianIconProps extends SVGProps<SVGSVGElement> {
  size?: IconSize;
}

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

export const PyramidIcon: FC<EgyptianIconProps> = ({ size = 'md', className, ...props }) => {
  const dim = sizeMap[size];
  return (
    <svg width={dim} height={dim} viewBox="0 0 24 24" fill="none" className={cn(className)} {...props}>
      <path d="M12 2L2 22H22L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 22L10 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <path d="M16 22L14 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
};

export const CompassIcon: FC<EgyptianIconProps> = ({ size = 'md', className, ...props }) => {
  const dim = sizeMap[size];
  return (
    <svg width={dim} height={dim} viewBox="0 0 24 24" fill="none" className={cn(className)} {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2 12H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 8L14.5 14.5L8 12L14.5 14.5L12 8Z" fill="currentColor" opacity="0.3"/>
      <path d="M12 8L14.5 14.5L8 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export const StarIcon: FC<EgyptianIconProps> = ({ size = 'md', className, ...props }) => {
  const dim = sizeMap[size];
  return (
    <svg width={dim} height={dim} viewBox="0 0 24 24" fill="none" className={cn(className)} {...props}>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export const SunIcon: FC<EgyptianIconProps> = ({ size = 'md', className, ...props }) => {
  const dim = sizeMap[size];
  return (
    <svg width={dim} height={dim} viewBox="0 0 24 24" fill="none" className={cn(className)} {...props}>
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 1V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 21V23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M1 12H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M21 12H23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
};

export const WaveIcon: FC<EgyptianIconProps> = ({ size = 'md', className, ...props }) => {
  const dim = sizeMap[size];
  return (
    <svg width={dim} height={dim} viewBox="0 0 24 24" fill="none" className={cn(className)} {...props}>
      <path d="M2 12C4 8 6 8 8 12C10 16 12 16 14 12C16 8 18 8 20 12C22 16 22 16 22 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
};

export const PalmIcon: FC<EgyptianIconProps> = ({ size = 'md', className, ...props }) => {
  const dim = sizeMap[size];
  return (
    <svg width={dim} height={dim} viewBox="0 0 24 24" fill="none" className={cn(className)} {...props}>
      <path d="M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 12C12 8 14 6 17 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 12C12 8 10 6 7 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 12C12 9 13.5 7.5 16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 12C12 9 10.5 7.5 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 12C12 10.5 13 9.5 14 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 12C12 10.5 11 9.5 10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M5 20H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
};

export const LotusIcon: FC<EgyptianIconProps> = ({ size = 'md', className, ...props }) => {
  const dim = sizeMap[size];
  return (
    <svg width={dim} height={dim} viewBox="0 0 24 24" fill="none" className={cn(className)} {...props}>
      <path d="M12 22C12 22 12 14 8 10C4 6 4 3 7 3C10 3 12 7 12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 22C12 22 12 14 16 10C20 6 20 3 17 3C14 3 12 7 12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 22V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 7C12 7 10 4 8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 7C12 7 14 4 16 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
};
