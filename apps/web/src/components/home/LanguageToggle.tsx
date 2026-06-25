'use client';

import { useState } from 'react';

export default function LanguageToggle() {
  const [lang, setLang] = useState('EN');

  const toggle = () => {
    const next = lang === 'EN' ? 'AR' : 'EN';
    setLang(next);
    document.documentElement.setAttribute('lang', next.toLowerCase());
    document.documentElement.setAttribute('dir', next === 'AR' ? 'rtl' : 'ltr');
  };

  return (
    <button onClick={toggle}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] text-white/50 hover:border-theme-gold/20 hover:text-theme-gold/70 transition-all font-english touch-target"
      aria-label={`Switch to ${lang === 'EN' ? 'Arabic' : 'English'}`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 3a15 15 0 010 18 15 15 0 010-18z"/><path d="M3 12h18"/></svg>
      <span>{lang}</span>
    </button>
  );
}
