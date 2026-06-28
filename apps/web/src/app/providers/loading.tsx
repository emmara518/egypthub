import { HeroSkeleton, CardSkeleton } from '@/components/PageSkeleton';

export default function ProvidersLoading() {
  return (
    <div className="bg-theme-bg min-h-screen">
      <HeroSkeleton />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 pb-24">
        <CardSkeleton count={6} />
      </div>
    </div>
  );
}
