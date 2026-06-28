import { CardSkeleton } from '@/components/PageSkeleton';

export default function DestinationsLoading() {
  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-24 space-y-6">
        <div className="h-10 bg-white/[0.04] rounded animate-pulse w-1/3" />
        <CardSkeleton count={8} />
      </div>
    </div>
  );
}
