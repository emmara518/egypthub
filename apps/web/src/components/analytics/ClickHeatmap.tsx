'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';

interface ClickEvent {
  name: string;
  x: number;
  y: number;
  timestamp: number;
}

const HEATMAP_KEY = 'egypthub-heatmap';

export default function ClickHeatmap() {
  const [show, setShow] = useState(false);
  const [clicks, setClicks] = useState<ClickEvent[]>([]);
  const trackEvent = useAppStore((s) => s.trackEvent);

  useEffect(() => {
    const stored = localStorage.getItem(HEATMAP_KEY);
    if (stored) setClicks(JSON.parse(stored));
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    const event: ClickEvent = {
      name: (e.target as HTMLElement).getAttribute('data-heatmap') || (e.target as HTMLElement).tagName || 'unknown',
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now(),
    };
    setClicks((prev) => {
      const updated = [...prev.slice(-499), event];
      localStorage.setItem(HEATMAP_KEY, JSON.stringify(updated));
      return updated;
    });
    trackEvent('click_' + event.name, window.location.pathname);
  }, [trackEvent]);

  useEffect(() => {
    if (!show) return;
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [show, handleClick]);

  const topClicked = clicks.reduce<Record<string, number>>((acc, c) => {
    acc[c.name] = (acc[c.name] || 0) + 1;
    return acc;
  }, {});

  const sorted = Object.entries(topClicked).sort((a, b) => b[1] - a[1]).slice(0, 10);

  const clearAll = () => {
    localStorage.removeItem(HEATMAP_KEY);
    setClicks([]);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShow(!show)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-theme-gold/10 border border-theme-gold/20 text-theme-gold font-cairo text-sm hover:bg-theme-gold/20 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
        {show ? 'إخفاء' : 'خريطة النقرات'}
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            {clicks.map((c, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-theme-gold/40 pointer-events-none"
                style={{ left: c.x - 6, top: c.y - 6, opacity: Math.min(1, 0.15 + i * 0.001) }}
              />
            ))}
            <div className="absolute top-4 right-4 w-72 bg-[#0F1525]/95 border border-theme-gold/20 rounded-2xl p-4 pointer-events-auto">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white font-cairo">النقرات</h3>
                <button onClick={clearAll} className="text-xs text-red-400 font-cairo">مسح</button>
              </div>
              <div className="space-y-1 max-h-60 overflow-y-auto">
                {sorted.map(([name, count], i) => (
                  <div key={name} className="flex items-center justify-between px-2 py-1 rounded-lg bg-white/5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-theme-gold font-bold w-4 text-left">{i + 1}</span>
                      <span className="text-xs text-white font-cairo truncate max-w-[140px]">{name}</span>
                    </div>
                    <span className="text-xs text-white/60 font-english">{count}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-white/40 mt-2 font-cairo text-center">إجمالي النقرات المسجلة: {clicks.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
