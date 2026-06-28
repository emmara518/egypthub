import { HeroSkeleton, CardSkeleton } from '@/components/PageSkeleton';

export default function ExperienceDetailLoading() {
  return (
    <div className="bg-theme-bg min-h-screen">
      <HeroSkeleton />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 pb-24 space-y-8">
        <div className="flex gap-8">
          <div className="flex-1 space-y-4">
            <div className="h-4 bg-white/[0.04] rounded w-1/4 animate-pulse" />
            <div className="h-6 bg-white/[0.04] rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-white/[0.04] rounded w-full animate-pulse" />
            <div className="h-4 bg-white/[0.04] rounded w-full animate-pulse" />
          </div>
          <div className="w-80 shrink-0 h-60 rounded-2xl bg-white/[0.04] animate-pulse hidden lg:block" />
        </div>
        <CardSkeleton count={3} />
      </div>
    </div>
  );
}
