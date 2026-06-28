import { HeroSkeleton, CardSkeleton } from '@/components/PageSkeleton';

export default function HomeLoading() {
  return (
    <div className="bg-theme-bg">
      <HeroSkeleton />
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-8 space-y-6">
        <CardSkeleton count={5} />
      </div>
    </div>
  );
}
