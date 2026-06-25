'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Close } from '@/components/Icons';

export default function PriceAlert() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [targetPrice, setTargetPrice] = useState('300');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && targetPrice) {
      setSuccess(true);
      setTimeout(() => { setOpen(false); setSuccess(false); }, 2000);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-theme-gold/20 text-theme-gold text-[10px] font-bold font-english hover:bg-theme-gold/10 transition-all touch-target"
        aria-label="Set price alert"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
        <span>Price Alert</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => { setOpen(false); setSuccess(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0F1525] border border-theme-gold/20 rounded-xl p-5 max-w-[360px] w-full shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-bold font-english tracking-[0.15em] text-theme-gold">PRICE ALERT</span>
                  <h3 className="text-base font-bold font-display text-white mt-0.5">Get notified when price drops</h3>
                </div>
                <button onClick={() => { setOpen(false); setSuccess(false); }} className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/60 hover:bg-white/[0.08] transition-all touch-target" aria-label="Close"><Close size={14} /></button>
              </div>

              {success ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <p className="text-sm font-semibold text-green-400">Alert Set!</p>
                  <p className="text-xs text-white/40 mt-1">We&apos;ll email you at {email}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="text-[11px] text-white/40 font-english block mb-1">Your Email</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-english outline-none focus:border-theme-gold/30 placeholder:text-white/20" />
                  </div>
                  <div className="mb-4">
                    <label className="text-[11px] text-white/40 font-english block mb-1">Target Price (USD)</label>
                    <input type="number" required value={targetPrice} onChange={e => setTargetPrice(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-english outline-none focus:border-theme-gold/30" />
                  </div>
                  <button type="submit" className="w-full py-2.5 rounded-xl gold-btn text-sm font-bold text-center shadow-[0_4px_12px_rgba(212,162,76,0.2)]">
                    Set Alert
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
