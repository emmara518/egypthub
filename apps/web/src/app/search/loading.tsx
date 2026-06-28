import { CardSkeleton } from '@/components/PageSkeleton';

export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8 space-y-6">
        <div className="h-12 bg-white/[0.04] rounded animate-pulse w-2/3" />
        <div className="h-5 bg-white/[0.04] rounded animate-pulse w-1/3" />
        <div className="h-14 rounded-xl bg-white/[0.04] animate-pulse" />
        <CardSkeleton count={3} />
      </div>
    </div>
  );
}
