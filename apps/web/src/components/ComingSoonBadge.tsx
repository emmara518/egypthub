'use client';

interface ComingSoonBadgeProps {
  size?: 'sm' | 'md';
}

export default function ComingSoonBadge({ size = 'sm' }: ComingSoonBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center font-cairo font-bold text-theme-gold bg-theme-gold/15 border border-theme-gold/25 rounded-full whitespace-nowrap ${
        size === 'md'
          ? 'px-3 py-1 text-xs gap-0.5 flex-col leading-tight'
          : 'px-2 py-0.5 text-[10px]'
      }`}
    >
      <span>قريباً</span>
      {size === 'md' && (
        <span className="text-[8px] font-english font-normal text-theme-gold/60 leading-none">
          Coming Soon
        </span>
      )}
    </span>
  );
}
