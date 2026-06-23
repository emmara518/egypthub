'use client';

import { useMediaQuery } from './useMediaQuery';

const breakpoints = {
  xs: '(max-width: 479px)',
  sm: '(min-width: 480px) and (max-width: 639px)',
  md: '(min-width: 640px) and (max-width: 767px)',
  lg: '(min-width: 768px) and (max-width: 1023px)',
  xl: '(min-width: 1024px) and (max-width: 1279px)',
  '2xl': '(min-width: 1280px) and (max-width: 1535px)',
  '3xl': '(min-width: 1536px)',
} as const;

type Breakpoint = keyof typeof breakpoints;

export function useBreakpoint(): Breakpoint {
  const xs = useMediaQuery(breakpoints.xs);
  const sm = useMediaQuery(breakpoints.sm);
  const md = useMediaQuery(breakpoints.md);
  const lg = useMediaQuery(breakpoints.lg);
  const xl = useMediaQuery(breakpoints.xl);
  const xxl = useMediaQuery(breakpoints['2xl']);
  const xxxl = useMediaQuery(breakpoints['3xl']);

  if (xs) return 'xs';
  if (sm) return 'sm';
  if (md) return 'md';
  if (lg) return 'lg';
  if (xl) return 'xl';
  if (xxl) return '2xl';
  return '3xl';
}
