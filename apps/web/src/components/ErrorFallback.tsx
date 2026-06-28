'use client';

import Link from 'next/link';

export default function ErrorFallback({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-theme-gold/10 flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold font-playfair text-white mb-2">حدث خطأ ما</h2>
        <p className="text-white/50 font-cairo mb-8 text-sm">
          {error.message || 'نأسف، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.'}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={reset}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-theme-gold to-theme-gold text-theme-bg font-bold text-sm font-cairo transition-all hover:shadow-[0_0_20px_var(--gold-glow)]">
            إعادة المحاولة
          </button>
          <Link href="/"
            className="px-6 py-3 rounded-xl border border-white/[0.1] text-white/70 text-sm font-cairo hover:bg-white/[0.04] transition-all">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ErrorFallbackSkeleton() {
  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center px-4">
      <div className="w-8 h-8 border-2 border-theme-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
