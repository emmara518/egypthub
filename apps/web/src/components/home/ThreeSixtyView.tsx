'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Close, Play } from '@/components/Icons';

const scenes = [
  { img: '/assets/home/pyramids.jpg?w=1200&q=90', label: 'Giza Pyramids' },
  { img: '/assets/home/nile-sunset.jpg?w=1200&q=90', label: 'Nile Sunset' },
  { img: '/assets/home/luxor-temple.jpg?w=1200&q=90', label: 'Luxor Temple' },
];

export default function ThreeSixtyView() {
  const [open, setOpen] = useState(false);
  const [scene, setScene] = useState(0);
  const [rotation, setRotation] = useState(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  useEffect(() => {
    if (!open) return;
    const handleMouse = (e: MouseEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - lastX.current;
      setRotation(r => r + dx * 0.5);
      lastX.current = e.clientX;
    };
    const handleUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('mouseup', handleUp);
    return () => { window.removeEventListener('mousemove', handleMouse); window.removeEventListener('mouseup', handleUp); };
  }, [open]);

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-white/50 hover:border-theme-gold/20 hover:text-theme-gold/70 transition-all font-english touch-target"
        aria-label="Open 360 view"
      >
        <Play size={12} />
        <span>360° View</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-[#0F1525] border border-theme-gold/20 rounded-2xl overflow-hidden max-w-[700px] w-full shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold font-english tracking-[0.15em] text-theme-gold">360° VIRTUAL TOUR</span>
                </div>
                <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/60 hover:bg-white/[0.08] transition-all touch-target" aria-label="Close"><Close size={14} /></button>
              </div>

              <div className="relative h-[350px] cursor-grab active:cursor-grabbing overflow-hidden"
                onMouseDown={(e) => { dragging.current = true; lastX.current = e.clientX; }}
              >
                <div style={{ transform: `translateX(${-rotation}px)` }} className="flex h-full transition-none">
                  <Image src={scenes[scene].img} alt={scenes[scene].label} width={1200} height={800} className="h-full w-auto object-cover" />
                  <Image src={scenes[1].img} alt="panorama" width={1200} height={800} className="h-full w-auto object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-theme-bg/40 via-transparent to-theme-bg/20 pointer-events-none" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-theme-bg/70 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                  <span className="text-[11px] text-white/80 font-english">{scenes[scene].label}</span>
                </div>
                <div className="absolute top-1/2 left-2 -translate-y-1/2 text-[10px] text-white/30 font-english">← Drag to explore</div>
                <div className="absolute top-1/2 right-2 -translate-y-1/2 text-[10px] text-white/30 font-english">Drag to explore →</div>
              </div>

              <div className="flex gap-1.5 p-3 justify-center border-t border-white/[0.06]">
                {scenes.map((s, i) => (
                  <button key={s.label} onClick={() => setScene(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all touch-target ${
                      scene === i ? 'bg-theme-gold w-6' : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={s.label}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
