'use client';

import { cn } from '../../utils/cn';
import { useCountdown } from '../../hooks/useCountdown';
import type { OfferCountdownProps } from './OfferCountdown.types';

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[36px]">
      <span className="text-body-sm font-bold text-gold tabular-nums leading-none">{String(value).padStart(2, '0')}</span>
      <span className="text-[10px] text-text-muted mt-0.5">{label}</span>
    </div>
  );
}

export function OfferCountdown({ targetDate, className }: OfferCountdownProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  if (isExpired) {
    return (
      <div className={cn('text-body-sm text-error font-medium', className)}>
        انتهى العرض
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {days > 0 && <TimeUnit value={days} label="يوم" />}
      {days > 0 && <span className="text-text-muted text-sm mt-[-8px]">:</span>}
      <TimeUnit value={hours} label="سا" />
      <span className="text-text-muted text-sm mt-[-8px]">:</span>
      <TimeUnit value={minutes} label="د" />
      <span className="text-text-muted text-sm mt-[-8px]">:</span>
      <TimeUnit value={seconds} label="ث" />
    </div>
  );
}
