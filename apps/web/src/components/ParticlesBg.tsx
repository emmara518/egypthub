'use client';

import { usePathname } from 'next/navigation';

export default function ParticlesBg() {
  const pathname = usePathname();
  if (pathname?.startsWith('/screens')) return null;

  return (
    <div className="particles-bg" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="particle" />
      ))}
    </div>
  );
}
