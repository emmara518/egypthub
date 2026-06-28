import { CardSkeleton } from '@/components/PageSkeleton';

export default function ExploreLoading() {
  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-24 space-y-8">
        <div className="h-10 bg-white/[0.04] rounded animate-pulse w-1/3" />
        <div className="h-5 bg-white/[0.04] rounded animate-pulse w-2/3" />
        <CardSkeleton count={6} />
      </div>
    </div>
  );
}
