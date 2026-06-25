'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Close, Location, Star } from '@/components/Icons';

const categories = ['All', 'History', 'Beach', 'Adventure', 'Luxury', 'Food', 'Culture', 'Diving', 'Desert'];
const priceRanges = ['Any', '$0–$99', '$100–$199', '$200–$499', '$500+'];
const durations = ['Any', '1 Day', '2–3 Days', '4–6 Days', '7+ Days'];
const ratings = ['Any', '4.5+', '4.8+', '5.0'];

const results = [
  { name: 'Pyramids Guided Tour', category: 'History', price: '$120', rating: 4.8, duration: '1 Day' },
  { name: 'Nile Sunset Cruise', category: 'Luxury', price: '$180', rating: 4.9, duration: '4 Hours' },
  { name: 'Red Sea Diving', category: 'Diving', price: '$200', rating: 5.0, duration: '1 Day' },
  { name: 'Luxor Valley of Kings', category: 'History', price: '$150', rating: 4.9, duration: '1 Day' },
  { name: 'Desert Safari', category: 'Adventure', price: '$95', rating: 4.7, duration: '1 Day' },
  { name: 'Alexandria Tour', category: 'Culture', price: '$130', rating: 4.6, duration: '1 Day' },
];

export default function SmartSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [price, setPrice] = useState('Any');
  const [dur, setDur] = useState('Any');
  const [rate, setRate] = useState('Any');

  const filtered = results.filter(r => {
    if (cat !== 'All' && r.category !== cat) return false;
    if (query && !r.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const hasFilters = cat !== 'All' || price !== 'Any' || dur !== 'Any' || rate !== 'Any';

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-theme-gold/10 border border-theme-gold/25 text-theme-gold text-xs font-bold font-english hover:bg-theme-gold/20 transition-all touch-target"
        aria-label="Open search"
      >
        <Search size={14} />
        <span>Search</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#0F1525] border-b border-theme-gold/10 max-w-[700px] mx-auto mt-[15vh] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 p-4 border-b border-white/[0.06]">
                <Search size={18} />
                <input autoFocus type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search destinations, experiences..."
                  className="flex-1 bg-transparent text-sm text-white font-english outline-none placeholder:text-white/30" />
                <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/60 hover:bg-white/[0.08] transition-all touch-target" aria-label="Close"><Close size={14} /></button>
              </div>

              <div className="p-4 border-b border-white/[0.04]">
                <div className="flex flex-wrap gap-1.5 mb-3 stagger-item">
                  {categories.map(c => (
                    <button key={c} onClick={() => setCat(c)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-english font-semibold transition-all touch-target ${
                        cat === c ? 'bg-theme-gold/15 text-theme-gold border border-theme-gold/30' : 'bg-white/[0.04] text-white/50 border border-white/[0.06] hover:border-theme-gold/20'
                      } ${c === 'History' ? 'tag-history' : c === 'Beach' ? 'tag-beach' : c === 'Adventure' ? 'tag-adventure' : c === 'Luxury' ? 'tag-luxury' : c === 'Culture' ? 'tag-culture' : ''}`}>{c}</button>
                  ))}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <select value={price} onChange={e => setPrice(e.target.value)} className="bg-white/[0.04] border border-white/10 rounded-lg px-2.5 py-1.5 text-[10px] text-white/60 font-english outline-none">
                    {priceRanges.map(p => <option key={p}>{p}</option>)}
                  </select>
                  <select value={dur} onChange={e => setDur(e.target.value)} className="bg-white/[0.04] border border-white/10 rounded-lg px-2.5 py-1.5 text-[10px] text-white/60 font-english outline-none">
                    {durations.map(d => <option key={d}>{d}</option>)}
                  </select>
                  <select value={rate} onChange={e => setRate(e.target.value)} className="bg-white/[0.04] border border-white/10 rounded-lg px-2.5 py-1.5 text-[10px] text-white/60 font-english outline-none">
                    {ratings.map(r => <option key={r}>{r}</option>)}
                  </select>
                  {hasFilters && (
                    <button onClick={() => { setCat('All'); setPrice('Any'); setDur('Any'); setRate('Any'); }}
                      className="text-[10px] text-theme-gold font-english underline underline-offset-2">Clear</button>
                  )}
                </div>
              </div>

              <div className="max-h-[300px] overflow-y-auto scrollbar-hide">
                {filtered.length === 0 ? (
                  <div className="p-8 text-center text-[13px] text-white/30 font-english">No results found</div>
                ) : (
                  filtered.map((r, i) => (
                    <div key={r.name} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors cursor-pointer border-b border-white/[0.02]">
                      <div className="w-8 h-8 rounded-lg bg-theme-gold/10 flex items-center justify-center"><Location size={14} /></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold font-english text-white truncate">{r.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-theme-gold/70 font-english">{r.category}</span>
                          <span className="text-[10px] text-white/30">•</span>
                          <span className="text-[10px] text-white/40 font-english">{r.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold font-display text-theme-gold">{r.price}</p>
                        <div className="flex items-center gap-0.5 justify-end"><Star size={9} /><span className="text-[10px] text-white/50">{r.rating}</span></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
