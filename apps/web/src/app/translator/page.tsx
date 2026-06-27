'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import phrasesData from '@/data/phrases.json';

const CATEGORIES = ['Greetings', 'Food', 'Directions', 'Shopping', 'Emergency'] as const;
const CATEGORY_LABELS: Record<string, string> = {
  Greetings: 'تحيات',
  Food: 'أكل وشرب',
  Directions: 'اتجاهات',
  Shopping: 'تسوق',
  Emergency: 'طوارئ',
};
const CATEGORY_ICONS: Record<string, string> = {
  Greetings: '👋',
  Food: '🍽️',
  Directions: '🗺️',
  Shopping: '🛍️',
  Emergency: '🆘',
};

type Direction = 'ar-to-en' | 'en-to-ar';

interface Phrase {
  arabic: string;
  transliteration: string;
  english: string;
}

export default function TranslatorPage() {
  const [direction, setDirection] = useState<Direction>('ar-to-en');
  const [input, setInput] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Greetings');
  const [copied, setCopied] = useState<string | null>(null);

  const phrases = phrasesData as Record<string, Phrase[]>;

  const currentPhrases = useMemo(() => {
    return phrases[activeCategory] || [];
  }, [activeCategory, phrases]);

  const filteredPhrases = useMemo(() => {
    if (!input.trim()) return currentPhrases;
    const q = input.toLowerCase();
    return currentPhrases.filter(
      p => p.arabic.includes(q) || p.english.toLowerCase().includes(q) || p.transliteration.toLowerCase().includes(q)
    );
  }, [currentPhrases, input]);

  const toggleDirection = () => {
    setDirection(d => d === 'ar-to-en' ? 'en-to-ar' : 'ar-to-en');
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-theme-bg pt-28 pb-16">
      <div className="max-w-[900px] mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold font-playfair text-theme mb-3">
            المترجم <span className="text-theme-gold">الذكي</span>
          </h1>
          <p className="text-theme-secondary font-cairo">ترجمة فورية للعبارات المصرية — بالعربي والإنجليزية والكتابة بالعربي</p>
        </motion.div>

        <div className="rounded-2xl border border-theme-gold/20 bg-theme-card overflow-hidden mb-6 shadow-gold-border">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold font-cairo text-theme">
                {direction === 'ar-to-en' ? 'عربي ← إنجليزي' : 'إنجليزي ← عربي'}
              </span>
              <button onClick={toggleDirection}
                className="w-10 h-10 rounded-xl bg-theme-gold/10 border border-theme-gold/20 flex items-center justify-center hover:bg-theme-gold/20 transition-colors text-theme-gold">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 16l-4-4 4-4" /><path d="M3 12h18" />
                </svg>
              </button>
            </div>
            <textarea value={input} onChange={e => setInput(e.target.value)}
              placeholder={direction === 'ar-to-en' ? 'اكتب كلمة أو جملة عربية...' : 'Type a word or phrase in English...'}
              rows={3}
              className="w-full bg-theme-bg rounded-xl px-4 py-3 text-sm border border-theme focus:border-theme-gold/40 outline-none resize-none placeholder:text-theme-muted text-theme font-cairo" />
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setInput(''); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-cairo font-bold whitespace-nowrap transition-all ${
                activeCategory === cat ? 'bg-theme-gold text-dark-900' : 'bg-theme-card border border-theme-gold/20 text-theme-secondary hover:border-theme-gold/40'
              }`}>
              <span>{CATEGORY_ICONS[cat]}</span>
              <span>{CATEGORY_LABELS[cat]}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filteredPhrases.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                <span className="text-4xl block mb-3">🔍</span>
                <p className="text-theme-secondary font-cairo">لا توجد نتائج</p>
              </motion.div>
            ) : (
              filteredPhrases.map((phrase, i) => (
                <motion.div key={`${activeCategory}-${i}`} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="group rounded-xl border border-theme-gold/10 bg-theme-bg hover:border-theme-gold/30 transition-all overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-1.5">
                        <p className="text-base font-bold font-cairo text-theme">{phrase.arabic}</p>
                        <p className="text-xs text-theme-gold font-cairo">{phrase.transliteration}</p>
                        <p className="text-sm text-theme-secondary font-cairo">{phrase.english}</p>
                      </div>
                      <button onClick={() => handleCopy(direction === 'ar-to-en' ? phrase.english : phrase.arabic, `${activeCategory}-${i}`)}
                        className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-theme-gold/10 transition-all">
                        {copied === `${activeCategory}-${i}` ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400"><path d="M20 6L9 17l-5-5" /></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-theme-gold"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 rounded-2xl border border-theme-gold/20 bg-theme-card p-5 shadow-gold-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">💡</span>
            <h3 className="font-bold font-cairo text-theme">نصيحة للمسافر</h3>
          </div>
          <p className="text-sm text-theme-secondary font-cairo leading-relaxed">
            المصريين بيحبوا لما الزوار يتكلموا عربي — حتى لو كلمة وحدة. جرب تقول &quot;سلام عليكم&quot; أو &quot;شكراً&quot; هتلاقي الناس مبتسمة أكتر!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
