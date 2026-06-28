import { CardSkeleton } from '@/components/PageSkeleton';

export default function AIConciergeLoading() {
  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-6">
        <div className="h-5 bg-white/[0.04] rounded animate-pulse w-24 mb-6" />
        <div className="flex gap-6">
          <div className="w-64 shrink-0 space-y-4 hidden lg:block">
            <div className="h-80 rounded-2xl bg-white/[0.04] animate-pulse" />
            <div className="h-40 rounded-2xl bg-white/[0.04] animate-pulse" />
          </div>
          <div className="flex-1">
            <CardSkeleton count={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
