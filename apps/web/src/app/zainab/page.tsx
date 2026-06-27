'use client';

import Link from 'next/link';
import { AIConciergeChat } from '@/components/ai';

export default function ZainabPage() {
  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[900px] mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            العودة للرئيسية
          </Link>
          <Link
            href="/ai-concierge"
            className="text-xs text-theme-secondary hover:text-theme-gold transition-colors px-3 py-1.5 rounded-lg border border-theme-gold/20 font-cairo"
          >
            المساعد المتقدم
          </Link>
        </div>

        <div className="rounded-2xl border border-theme-gold/20 bg-theme-card overflow-hidden shadow-gold-border" style={{ height: 'calc(100vh - 160px)' }}>
          <AIConciergeChat />
        </div>
      </div>
    </div>
  );
}
