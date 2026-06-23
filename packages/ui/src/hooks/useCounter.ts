'use client';

import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useCounter(
  end: number,
  duration: number = 2000,
  start: number = 0
): number {
  const [value, setValue] = useState(start);
  const reducedMotion = useReducedMotion();
  const rafRef = useRef<number>();

  useEffect(() => {
    if (reducedMotion || duration <= 0) {
      setValue(end);
      return;
    }

    const startTime = performance.now();
    const range = end - start;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + range * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration, start, reducedMotion]);

  return value;
}
