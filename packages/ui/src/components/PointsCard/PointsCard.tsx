'use client';

import { cn } from '../../utils/cn';
import type { PointsCardProps } from './PointsCard.types';

const tierColors: Record<string, { bg: string; text: string; bar: string; label: string }> = {
  bronze: { bg: 'bg-amber-50', text: 'text-amber-800', bar: 'bg-amber-500', label: 'برونزي' },
  silver: { bg: 'bg-slate-100', text: 'text-slate-700', bar: 'bg-slate-400', label: 'فضي' },
  gold: { bg: 'bg-yellow-50', text: 'text-yellow-800', bar: 'bg-gold', label: 'ذهبي' },
  platinum: { bg: 'bg-indigo-50', text: 'text-indigo-800', bar: 'bg-indigo-500', label: 'بلاتيني' },
};

export function PointsCard({ points, tier, nextTier, pointsToNext, currency = '$', className }: PointsCardProps) {
  const tc = tierColors[tier];
  const progress = pointsToNext ? Math.min((points / (points + pointsToNext)) * 100, 100) : 100;

  return (
    <div className={cn('rounded-xl p-5 border border-border', tc.bg, className)}>
      <div className="flex items-center justify-between mb-3">
        <div><p className={cn('text-caption font-semibold', tc.text)}>{tc.label}</p><p className="text-display-xs font-bold text-text-primary">{points.toLocaleString()}</p></div>
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={tc.text}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
      </div>
      {nextTier && pointsToNext != null && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-caption text-text-muted">
            <span>{pointsToNext} نقطة للوصول إلى {nextTier}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden">
            <div className={cn('h-full rounded-full transition-all', tc.bar)} style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
