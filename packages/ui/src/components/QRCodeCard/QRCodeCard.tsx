'use client';

import { cn } from '../../utils/cn';
import type { QRCodeCardProps } from './QRCodeCard.types';

function QRPlaceholder({ value, size }: { value: string; size: number }) {
  const chars = value.split('').map((c) => c.charCodeAt(0));
  const cells = 11;
  const cellSize = size / cells;
  const pattern: boolean[][] = Array.from({ length: cells }, (_, row) =>
    Array.from({ length: cells }, (_, col) => {
      const idx = (row * cells + col) % chars.length;
      return (chars[idx] ?? 42) % 2 === 0;
    })
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="white" rx="4" />
      {pattern.flatMap((row, r) => row.map((v, c) => v ? <rect key={`${r}-${c}`} x={c * cellSize} y={r * cellSize} width={cellSize} height={cellSize} fill="#1a1a2e" rx="1" /> : null))}
    </svg>
  );
}

export function QRCodeCard({ qrValue, bookingId, instructions = 'استخدم رمز QR للدخول إلى الفعالية', size = 160, className }: QRCodeCardProps) {
  return (
    <div className={cn('bg-surface border border-border rounded-xl p-5 text-center', className)}>
      <div className="flex justify-center mb-3">
        <QRPlaceholder value={qrValue} size={size} />
      </div>
      <p className="text-body-sm font-semibold text-text-primary mb-1">{bookingId}</p>
      <p className="text-caption text-text-muted">{instructions}</p>
    </div>
  );
}
