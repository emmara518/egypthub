import { HeroSkeleton, CardSkeleton } from '@/components/PageSkeleton';

export default function ExperiencesLoading() {
  return (
    <div className="bg-theme-bg min-h-screen">
      <HeroSkeleton />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 pb-24">
        <div className="flex gap-3 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-24 rounded-full bg-white/[0.04] animate-pulse" />
          ))}
        </div>
        <CardSkeleton count={6} />
      </div>
    </div>
  );
}
