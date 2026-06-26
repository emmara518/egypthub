import Link from 'next/link';

export default function LegalPage({ title, lastUpdated, children, dir = 'ltr' }: { title: string; lastUpdated: string; children: React.ReactNode; dir?: string }) {
  return (
    <div className="min-h-screen bg-theme-bg" dir={dir}>
      <div className="max-w-[800px] mx-auto px-5 md:px-8 py-20 md:py-28">
        <Link href="/" className="inline-flex items-center gap-2 text-theme-gold text-sm font-english mb-8 hover:text-theme-gold/80 transition-all">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to EGYPTHUB
        </Link>
        <div className="border-l-2 border-theme-gold/30 pl-6 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold font-display text-white mb-2">{title}</h1>
          <p className="text-white/40 text-xs font-english">Last updated: {lastUpdated}</p>
        </div>
        <div className="space-y-2">{children}</div>
        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <p className="text-white/30 text-xs font-english">
            EGYPTHUB — Your Story in Egypt. © 2026 All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
