'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
export type Locale = 'ar' | 'en';

function getDir(locale: Locale): 'rtl' | 'ltr' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

interface LangContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  dir: 'rtl' | 'ltr';
}

const LangContext = createContext<LangContextType>({
  locale: 'ar',
  setLocale: () => {},
  toggle: () => {},
  dir: 'rtl',
});

export function useLang() {
  return useContext(LangContext);
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('egypthub-lang') as Locale | null;
    if (saved === 'ar' || saved === 'en') {
      setLocaleState(saved);
    }
    setMounted(true);
  }, []);

  const apply = useCallback((l: Locale) => {
    const root = document.documentElement;
    root.setAttribute('lang', l === 'ar' ? 'ar' : 'en');
    root.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
  }, []);

  useEffect(() => {
    if (!mounted) return;
    apply(locale);
    localStorage.setItem('egypthub-lang', locale);
  }, [locale, mounted, apply]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const toggle = useCallback(() => setLocaleState(prev => prev === 'ar' ? 'en' : 'ar'), []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LangContext.Provider value={{ locale, setLocale, toggle, dir: locale === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </LangContext.Provider>
  );
}
