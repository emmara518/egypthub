import { HeroSkeleton, CardSkeleton } from '@/components/PageSkeleton';

export default function DestinationDetailLoading() {
  return (
    <div className="bg-theme-bg min-h-screen">
      <HeroSkeleton />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 pb-24 space-y-8">
        <CardSkeleton count={3} />
      </div>
    </div>
  );
}
