'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from '@/components/Icons';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const priceMap: Record<number, number> = {
  1: 180, 2: 150, 3: 200, 4: 220, 5: 190, 6: 250,
  7: 280, 8: 300, 9: 220, 10: 180, 11: 160, 12: 200,
};

function getDaysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}

function getFirstDay(y: number, m: number) {
  return new Date(y, m, 1).getDay();
}

function formatDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

interface Props {
  onSelect?: (checkIn: string, checkOut: string) => void;
}

export default function BookingCalendar({ onSelect }: Props) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  const days = getDaysInMonth(year, month);
  const first = getFirstDay(year, month);

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const handleDay = (d: number) => {
    const date = new Date(year, month, d);
    if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (date > checkIn) {
      setCheckOut(date);
      onSelect?.(formatDate(checkIn), formatDate(date));
    } else {
      setCheckIn(date);
      setCheckOut(null);
    }
  };

  const nightCount = checkIn && checkOut ? Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const totalPrice = nightCount * (priceMap[month] || 200);

  const isInRange = (d: number) => {
    if (!checkIn || !checkOut) return false;
    const date = new Date(year, month, d);
    return date > checkIn && date < checkOut;
  };

  const isSelected = (d: number) => {
    const date = new Date(year, month, d);
    return (checkIn && formatDate(date) === formatDate(checkIn)) ||
           (checkOut && formatDate(date) === formatDate(checkOut));
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-theme-gold/[0.08] hover:border-theme-gold/20 transition-all text-[12px] text-white/50 font-english touch-target"
        aria-label="Open booking calendar"
      >
        <Calendar size={16} />
        <span>{checkIn ? formatDate(checkIn) : 'Check In'}{checkOut ? ` — ${formatDate(checkOut)}` : ''}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            className="absolute top-full mt-2 left-0 z-50 bg-theme-surface border border-theme-gold/20 rounded-xl p-4 shadow-elevation-3 w-[300px]"
          >
            <div className="flex items-center justify-between mb-4">
              <button onClick={prev} className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/60 hover:bg-white/[0.08] transition-all touch-target" aria-label="Previous month"><ChevronLeft size={14} /></button>
              <span className="text-sm font-bold font-english text-white">{MONTHS[month]} {year}</span>
              <button onClick={next} className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/60 hover:bg-white/[0.08] transition-all touch-target" aria-label="Next month"><ChevronRight size={14} /></button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map(d => <div key={d} className="text-center text-[10px] font-english text-white/30 font-semibold">{d}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: first }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: days }).map((_, i) => {
                const d = i + 1;
                const date = new Date(year, month, d);
                const disabled = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const sel = isSelected(d);
                const range = isInRange(d);
                return (
                  <button key={d} disabled={disabled} onClick={() => handleDay(d)}
                    className={`w-8 h-8 rounded-lg text-xs font-english transition-all touch-target relative ${
                      disabled ? 'text-white/10 cursor-not-allowed' :
                      sel ? 'bg-theme-gold text-theme-bg font-bold shadow-[0_0_10px_rgba(212,162,76,0.3)]' :
                      range ? 'bg-theme-gold/15 text-theme-gold' :
                      'text-white/60 hover:bg-white/[0.06]'
                    }`}
                    aria-label={`${MONTHS[month]} ${d}`}
                  >
                    {d}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                      {!disabled && priceMap[month] && (
                        <div className="w-1 h-1 rounded-full bg-theme-gold/40" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {nightCount > 0 && (
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-white/40 font-english">{nightCount} {nightCount === 1 ? 'night' : 'nights'}</span>
                  <p className="text-[9px] text-white/20 font-english">{formatDate(checkIn!)} — {formatDate(checkOut!)}</p>
                </div>
                <span className="text-sm font-bold text-theme-gold font-english">${totalPrice.toLocaleString()}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
