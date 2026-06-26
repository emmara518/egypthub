'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Close, Play } from '@/components/Icons';

const tracks = [
  { title: 'Welcome to Egypt', desc: 'Journey through 7000 years of history', duration: '1:30' },
  { title: 'Pyramids of Giza', desc: 'The last standing Wonder of the World', duration: '2:15' },
  { title: 'Nile River', desc: 'The lifeblood of Egyptian civilization', duration: '1:45' },
  { title: 'Valley of Kings', desc: 'Tombs of the mighty pharaohs', duration: '2:00' },
];

export default function AudioGuide() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (i: number) => {
    if (playing === i) {
      audioRef.current?.pause();
      setPlaying(null);
    } else {
      setPlaying(i);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-theme-gold/20 text-theme-gold text-xs font-bold font-english hover:bg-theme-gold/10 transition-all touch-target"
        aria-label="Audio guide"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
        <span>Audio Guide</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            className="absolute top-full mt-2 right-0 z-50 bg-[#0F1525] border border-theme-gold/20 rounded-xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.6)] w-[280px]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                <span className="text-[10px] font-bold font-english tracking-[0.15em] text-theme-gold">EGYPTIAN AUDIO GUIDE</span>
              </div>
              <button onClick={() => setOpen(false)} className="w-6 h-6 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/60 hover:bg-white/[0.08] transition-all touch-target" aria-label="Close"><Close size={12} /></button>
            </div>

            <div className="space-y-1">
              {tracks.map((t, i) => (
                <button key={t.title} onClick={() => togglePlay(i)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all touch-target ${
                    playing === i ? 'bg-theme-gold/10 border border-theme-gold/20' : 'hover:bg-white/[0.03] border border-transparent'
                  }`}
                  aria-label={t.title}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    playing === i ? 'bg-theme-gold text-theme-bg' : 'bg-white/[0.06] text-white/60'
                  }`}>
                    {playing === i ? (
                      <div className="flex gap-0.5">
                        {[1,2,3].map(n => (
                          <motion.div key={n} animate={{ height: [4, 12, 4] }} transition={{ duration: 0.6 + n * 0.1, repeat: Infinity }} className="w-0.5 bg-current rounded-full" style={{ height: '4px' }} />
                        ))}
                      </div>
                    ) : <Play size={12} />}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-xs font-semibold font-english text-white truncate">{t.title}</p>
                    <p className="text-[9px] text-white/40 font-english truncate">{t.desc}</p>
                  </div>
                  <span className="text-[10px] text-white/30 font-english">{t.duration}</span>
                </button>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-[9px] text-white/30 font-english">🎙️ Narrated by <span className="text-white/50">Karim</span></span>
              <span className="text-[9px] text-white/20 font-english">Total: 7:30</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
