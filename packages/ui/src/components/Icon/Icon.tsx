import { type FC } from 'react';
import { cn } from '../../utils/cn';
import { iconPaths } from './icon-paths';
import type { IconProps } from './Icon.types';
import { iconSizeMap } from './Icon.types';

export const Icon: FC<IconProps> = ({
  name,
  size = 'md',
  className,
  'aria-label': ariaLabel,
}) => {
  const dimension = iconSizeMap[size];
  const pathData = iconPaths[name];

  if (!pathData) return null;

  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : 'presentation'}
    >
      {pathData}
    </svg>
  );
};
