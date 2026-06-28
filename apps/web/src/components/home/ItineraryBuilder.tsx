'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Close, Sun, Calendar, Plus } from '@/components/Icons';

const available = [
  { title: 'Pyramids Guided Tour', duration: '4 hours', price: '$120' },
  { title: 'Nile Sunset Cruise', duration: '3 hours', price: '$180' },
  { title: 'Egyptian Museum Tour', duration: '3 hours', price: '$90' },
  { title: 'Khan El Khalili Bazaar', duration: '2 hours', price: '$50' },
];

export default function ItineraryBuilder() {
  const [open, setOpen] = useState(false);
  const [trip, setTrip] = useState<{ day: number; items: string[] }[]>([]);
  const [dayCount, setDayCount] = useState(3);

  const addDay = () => {
    setTrip(prev => [...prev, { day: prev.length + 1, items: [] }]);
  };

  const addItem = (dayIdx: number, item: string) => {
    setTrip(prev => prev.map((d, i) => i === dayIdx ? { ...d, items: [...d.items, item] } : d));
  };

  const removeItem = (dayIdx: number, itemIdx: number) => {
    setTrip(prev => prev.map((d, i) => i === dayIdx ? { ...d, items: d.items.filter((_, j) => j !== itemIdx) } : d));
  };

  return (
    <>
      <button onClick={() => { setOpen(true); if (trip.length === 0) setTrip(Array.from({ length: 3 }, (_, i) => ({ day: i + 1, items: [] }))); }}
        className="flex items-center gap-2 px-4 py-2 rounded-full gold-btn text-sm font-bold shadow-elevation-gold-1"
        aria-label="Build itinerary"
      >
        <Calendar size={16} />
        <span>Build Your Trip</span>
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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-theme-surface border border-theme-gold/20 rounded-2xl max-w-[550px] w-full max-h-[80vh] shadow-elevation-4 flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0">
                <div>
                  <span className="text-[10px] font-bold font-english tracking-[0.15em] text-theme-gold">TRIP PLANNER</span>
                  <h3 className="text-base font-bold font-display text-white mt-0.5">Drag & Drop Itinerary</h3>
                </div>
                <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/60 hover:bg-white/[0.08] transition-all touch-target" aria-label="Close"><Close size={14} /></button>
              </div>

              <div className="flex gap-4 p-4 overflow-y-auto flex-1" style={{ maxHeight: 'calc(80vh - 120px)' }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold font-english text-white/50">YOUR TRIP</span>
                    <button onClick={addDay} className="flex items-center gap-1 text-[10px] text-theme-gold font-english hover:underline touch-target">
                      <Plus size={12} /> Add Day
                    </button>
                  </div>
                  <div className="space-y-3">
                    {trip.map((day) => (
                      <div key={day.day} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <Sun size={12} />
                            <span className="text-xs font-bold font-english text-white">Day {day.day}</span>
                          </div>
                          <span className="text-[9px] text-white/30">{day.items.length} activities</span>
                        </div>
                        {day.items.length === 0 ? (
                          <p className="text-[10px] text-white/20 font-english italic">Drop activities here</p>
                        ) : (
                          <div className="space-y-1">
                            {day.items.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-theme-gold/[0.04] border border-theme-gold/10 rounded-lg px-2.5 py-1.5">
                                <span className="text-[11px] text-white/70 font-english">{item}</span>
                                <button onClick={() => removeItem(day.day - 1, idx)} className="text-white/20 hover:text-red-400 transition-all touch-target text-[10px]">✕</button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-[160px] shrink-0">
                  <span className="text-[10px] font-bold font-english text-white/50 block mb-2">ACTIVITIES</span>
                  <div className="space-y-1.5">
                    {available.map(a => (
                      <button key={a.title} onClick={() => {
                        const firstEmpty = trip.findIndex(d => true);
                        if (firstEmpty >= 0) addItem(firstEmpty, a.title);
                      }}
                        className="w-full text-left p-2 rounded-lg border border-white/[0.06] hover:border-theme-gold/20 hover:bg-theme-gold/[0.03] transition-all touch-target"
                      >
                        <p className="text-[10px] font-semibold font-english text-white truncate">{a.title}</p>
                        <p className="text-[8px] text-white/30 font-english">{a.duration}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/[0.06] px-5 py-3 flex items-center justify-between shrink-0">
                <span className="text-[10px] text-white/30 font-english">{trip.reduce((sum, d) => sum + d.items.length, 0)} activities selected</span>
                <button className="px-4 py-2 rounded-lg gold-btn text-xs font-bold shadow-elevation-gold-1">Save Itinerary</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
