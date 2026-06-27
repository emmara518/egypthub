'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Close } from '@/components/Icons';

export default function ShareTrip() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const link = 'https://egypthub.com/trip/explore-egypt';

  const copy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-theme-gold/20 text-theme-gold text-[11px] font-bold font-english hover:bg-theme-gold/10 transition-all touch-target"
        aria-label="Share trip"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>
        <span>Share</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-theme-surface border border-theme-gold/20 rounded-xl p-5 max-w-[360px] w-full shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-bold font-english tracking-[0.15em] text-theme-gold">SHARE TRIP</span>
                  <h3 className="text-base font-bold font-display text-white mt-0.5">Share your Egypt adventure</h3>
                </div>
                <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/60 hover:bg-white/[0.08] transition-all touch-target" aria-label="Close"><Close size={14} /></button>
              </div>

              <div className="flex gap-2 justify-center mb-4">
                {[
                  { name: 'WhatsApp', color: '#25D366', icon: '💬' },
                  { name: 'Facebook', color: '#1877F2', icon: '📘' },
                  { name: 'Twitter', color: '#000', icon: '🐦' },
                  { name: 'Email', color: '#EA4335', icon: '📧' },
                ].map(s => (
                  <a key={s.name} href={`https://wa.me/?text=${encodeURIComponent(link)}`} target="_blank" rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all hover:scale-110"
                    style={{ backgroundColor: `${s.color}15`, border: `1px solid ${s.color}30` }}
                    aria-label={`Share on ${s.name}`}
                  >
                    <span>{s.icon}</span>
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-xl p-2">
                <input type="text" value={link} readOnly className="flex-1 bg-transparent text-xs text-white/50 font-english outline-none truncate" />
                <button onClick={copy}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-bold font-english transition-all touch-target ${
                    copied ? 'bg-green-500/20 text-green-400' : 'bg-theme-gold/10 text-theme-gold hover:bg-theme-gold/20'
                  }`}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
