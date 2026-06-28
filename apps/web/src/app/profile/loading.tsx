import { CardSkeleton, ListSkeleton } from '@/components/PageSkeleton';

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-24 space-y-6">
        <div className="flex items-center gap-4 animate-pulse">
          <div className="w-20 h-20 rounded-full bg-white/[0.04]" />
          <div className="space-y-2">
            <div className="h-5 bg-white/[0.04] rounded w-32" />
            <div className="h-3 bg-white/[0.04] rounded w-24" />
          </div>
        </div>
        <CardSkeleton count={3} />
      </div>
    </div>
  );
}
