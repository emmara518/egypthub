export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl overflow-hidden border border-theme-gold/[0.04]">
      <div className="aspect-[4/5] bg-white/[0.03]" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-white/[0.04] rounded w-3/4" />
        <div className="h-2 bg-white/[0.03] rounded w-1/2" />
        <div className="h-2 bg-white/[0.03] rounded w-1/3" />
      </div>
    </div>
  );
}

export function SectionSkeleton({ cards = 5 }: { cards?: number }) {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: cards }).map((_, i) => (
        <div key={i} className="shrink-0 w-[240px]">
          <CardSkeleton />
        </div>
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-8">
      <div className="h-12 bg-white/[0.03] rounded w-2/3" />
      <div className="h-4 bg-white/[0.03] rounded w-1/3" />
      <div className="h-3 bg-white/[0.03] rounded w-1/4" />
    </div>
  );
}
