'use client';

import { useEffect, useRef } from 'react';

const partners = [
  'FOUR SEASONS', 'AMAN', 'KEMPINSKI', 'STEIGENBERGER', 'Jaz',
  'MARRIOTT', 'HILTON', 'SHANGRI-LA', 'OBEROI', 'FAIRMONT',
];

export default function PartnerLogos() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    let pos = 0;
    const speed = 0.4;

    const loop = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="py-6 md:py-8 bg-theme-bg border-y border-white/[0.03] overflow-hidden">
      <div ref={scrollRef} className="flex gap-10 md:gap-16 overflow-x-hidden scrollbar-hide">
        {[...partners, ...partners, ...partners].map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="shrink-0 font-english text-white/20 hover:text-white/40 transition-colors text-sm md:text-base tracking-widest font-light"
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}
