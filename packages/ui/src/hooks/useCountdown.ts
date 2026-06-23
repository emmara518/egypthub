'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function useCountdown(targetDate: Date): Countdown {
  const calc = useCallback((): Countdown => {
    const now = Date.now();
    const diff = targetDate.getTime() - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, isExpired: false };
  }, [targetDate]);

  const [countdown, setCountdown] = useState<Countdown>(calc);

  useEffect(() => {
    setCountdown(calc());
    const interval = setInterval(() => setCountdown(calc()), 1000);
    return () => clearInterval(interval);
  }, [calc]);

  return countdown;
}
