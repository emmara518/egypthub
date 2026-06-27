'use client';

export default function OfflinePage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#080C18] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-theme-gold/10 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white font-cairo">أنت غير متصل بالإنترنت</h1>
        <p className="text-sm text-white/60 font-cairo leading-relaxed">
          يرجى التحقق من اتصالك بالإنترنت وحاول مرة أخرى. بعض المحتوى المخزن لا يزال متاحاً للتصفح.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-[#B8942E] text-[#080C18] font-cairo font-bold text-sm hover:opacity-90 transition-opacity"
        >
          حاول مرة أخرى
        </button>
      </div>
    </div>
  );
}
