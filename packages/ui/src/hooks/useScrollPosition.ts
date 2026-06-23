'use client';

import { useEffect, useState } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

export function useScrollPosition(): ScrollPosition {
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handler = () => {
      setPosition({ x: window.scrollX, y: window.scrollY });
    };

    handler();
    window.addEventListener('scroll', handler, { passive: true });

    return () => window.removeEventListener('scroll', handler);
  }, []);

  return position;
}
