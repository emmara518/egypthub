'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';

const rates: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, SAR: 3.75, AED: 3.67, EGP: 48.5,
};

const flags: Record<string, string> = { USD: '$', EUR: '€', GBP: '£', SAR: '﷼', AED: 'د.إ', EGP: 'ج.م' };

const CURRENCIES = ['EGP', 'USD', 'EUR', 'GBP', 'AED', 'SAR'];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EGP');
  const [open, setOpen] = useState(false);
  const setAiMemory = useAppStore((s) => s.setAiMemory);
  const aiMemory = useAppStore((s) => s.aiMemory);

  useEffect(() => {
    if (aiMemory?.preferredCurrency) {
      setTo(aiMemory.preferredCurrency);
    }
  }, [aiMemory?.preferredCurrency]);

  const handleCurrencyChange = (currency: string) => {
    setTo(currency);
    setAiMemory('preferredCurrency', currency);
  };

  const result = (amount * rates[to]) / rates[from];

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-theme-gold/[0.08] hover:border-theme-gold/20 text-[11px] text-white/60 font-english transition-all touch-target"
        aria-label="Currency converter"
      >
        <span>{flags[from]}</span>
        <span>→</span>
        <span>{flags[to]}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            className="absolute top-full mt-2 right-0 z-50 bg-theme-surface border border-theme-gold/20 rounded-xl p-4 shadow-elevation-3 w-[240px]"
          >
            <p className="text-[10px] font-bold font-english tracking-[0.15em] text-theme-gold mb-3">CONVERTER</p>

            <div className="flex items-center gap-2 mb-3">
              <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))}
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-english outline-none focus:border-theme-gold/30"
                aria-label="Amount"
              />
              <select value={from} onChange={e => setFrom(e.target.value)}
                className="bg-white/[0.04] border border-white/10 rounded-lg px-2 py-2 text-xs text-white font-english outline-none focus:border-theme-gold/30"
                aria-label="From currency"
              >
                {Object.keys(rates).map(c => <option key={c} value={c}>{c} {flags[c]}</option>)}
              </select>
            </div>

            <div className="flex items-center justify-center mb-3">
              <div className="w-7 h-7 rounded-full bg-theme-gold/10 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-english opacity-70">
                {result.toFixed(2)}
              </div>
              <select value={to} onChange={e => handleCurrencyChange(e.target.value)}
                className="bg-white/[0.04] border border-white/10 rounded-lg px-2 py-2 text-xs text-white font-english outline-none focus:border-theme-gold/30"
                aria-label="To currency"
              >
                {CURRENCIES.map(c => <option key={c} value={c}>{c} {flags[c]}</option>)}
              </select>
            </div>

            <div className="text-center text-[10px] text-white/30 font-english">
              1 {from} = {(rates[to] / rates[from]).toFixed(4)} {to}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
