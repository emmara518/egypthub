'use client';

export function CardSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border border-white/[0.06] bg-theme-surface animate-pulse">
          <div className="aspect-[4/3] bg-white/[0.04]" />
          <div className="p-4 space-y-3">
            <div className="h-3 bg-white/[0.04] rounded w-16" />
            <div className="h-4 bg-white/[0.04] rounded w-3/4" />
            <div className="h-3 bg-white/[0.04] rounded w-1/2" />
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
              <div className="h-5 bg-white/[0.04] rounded w-20" />
              <div className="h-8 bg-white/[0.04] rounded w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-theme-surface animate-pulse">
          <div className="w-14 h-14 rounded-lg bg-white/[0.04]" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-white/[0.04] rounded w-2/3" />
            <div className="h-2.5 bg-white/[0.04] rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-[60vh] flex items-center animate-pulse">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-2xl space-y-4">
          <div className="h-4 bg-white/[0.04] rounded w-24" />
          <div className="h-12 bg-white/[0.04] rounded w-3/4" />
          <div className="h-12 bg-white/[0.04] rounded w-1/2" />
          <div className="h-5 bg-white/[0.04] rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-pulse">
        <div className="rounded-2xl border border-white/[0.06] bg-theme-surface p-8 space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-white/[0.04]" />
          </div>
          <div className="h-6 bg-white/[0.04] rounded w-1/2 mx-auto" />
          <div className="space-y-4">
            <div className="h-12 bg-white/[0.04] rounded-xl" />
            <div className="h-12 bg-white/[0.04] rounded-xl" />
            <div className="h-12 bg-white/[0.04] rounded-xl" />
          </div>
          <div className="h-12 bg-white/[0.04] rounded-xl" />
        </div>
      </div>
    </div>
  );
}
