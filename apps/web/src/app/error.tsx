'use client';

import Link from 'next/link';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto rounded-full bg-error/10 flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold font-playfair text-theme mb-2">حدث خطأ غير متوقع</h1>
        <p className="text-theme-secondary font-cairo text-sm mb-8">نأسف للإزعاج، حاول تاني أو ارجع للرئيسية</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset}
            className="px-6 py-3 rounded-xl bg-gradient-gold text-dark-900 font-bold text-sm font-cairo hover:brightness-110 transition-all">
            حاول مرة أخرى
          </button>
          <Link href="/"
            className="px-6 py-3 rounded-xl border border-theme-gold/30 text-theme-gold font-cairo text-sm hover:bg-theme-gold/5 transition-all">
            الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
