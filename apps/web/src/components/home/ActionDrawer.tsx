'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Close, Search, Calendar as CalIcon, Dollar, Sun, Globe, Play, Clock, Heart, Compass, Location, Star } from '@/components/Icons';

/* ===== Sub-modal components ===== */

function SearchModal({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('');
  const results = [
    { name: 'Pyramids Guided Tour', category: 'History', price: '$120', rating: 4.8 },
    { name: 'Nile Sunset Cruise', category: 'Luxury', price: '$180', rating: 4.9 },
    { name: 'Red Sea Diving', category: 'Diving', price: '$200', rating: 5.0 },
  ].filter(r => !q || r.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="p-4">
      <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search destinations, experiences..."
        className="w-full bg-white/[0.04] border border-theme-gold/20 rounded-xl px-4 py-3 text-sm text-white font-english outline-none placeholder:text-white/30 mb-3" />
      {results.map(r => (
        <div key={r.name} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/[0.03] cursor-pointer border-b border-white/[0.03] last:border-0">
          <div><p className="text-sm font-semibold text-white font-english">{r.name}</p><p className="text-[10px] text-white/40">{r.category}</p></div>
          <div className="text-right"><p className="text-sm font-bold text-theme-gold">{r.price}</p><p className="text-[10px] text-white/40">★ {r.rating}</p></div>
        </div>
      ))}
    </div>
  );
}

function CalendarModal({ onClose }: { onClose: () => void }) {
  const days = Array.from({ length: 30 }, (_, i) => ({ d: i + 1, price: 150 + Math.floor(Math.random() * 200) }));
  const [sel, setSel] = useState<number | null>(null);
  return (
    <div className="p-4">
      <p className="text-[11px] text-white/40 font-english mb-3 text-center">Select your dates to see prices</p>
      <div className="grid grid-cols-6 gap-2">
        {days.map(({ d, price }) => (
          <button key={d} onClick={() => setSel(d)}
            className={`p-2 rounded-xl text-center transition-all touch-target ${sel === d ? 'bg-theme-gold text-theme-bg' : 'bg-white/[0.04] hover:bg-white/[0.08] text-white/60'}`}>
            <p className="text-xs font-bold font-english">{d}</p>
            <p className="text-[8px] font-english opacity-60">${price}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function CurrencyModal({ onClose }: { onClose: () => void }) {
  const [amt, setAmt] = useState(100);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EGP');
  const rates: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.79, SAR: 3.75, AED: 3.67, EGP: 48.5 };
  const flags: Record<string, string> = { USD: '$', EUR: '€', GBP: '£', SAR: '﷼', AED: 'د.إ', EGP: 'ج.م' };
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2">
        <input type="number" value={amt} onChange={e => setAmt(Number(e.target.value))} className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-english outline-none focus:border-theme-gold/30" />
        <select value={from} onChange={e => setFrom(e.target.value)} className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-3 text-sm text-white font-english outline-none">
          {Object.keys(rates).map(c => <option key={c}>{c} {flags[c]}</option>)}
        </select>
      </div>
      <div className="flex items-center justify-center"><div className="w-8 h-8 rounded-full bg-theme-gold/10 flex items-center justify-center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-english">{(amt * rates[to] / rates[from]).toFixed(2)}</div>
        <select value={to} onChange={e => setTo(e.target.value)} className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-3 text-sm text-white font-english outline-none">
          {Object.keys(rates).map(c => <option key={c}>{c} {flags[c]}</option>)}
        </select>
      </div>
      <p className="text-center text-[10px] text-white/30 font-english">1 {from} = {(rates[to] / rates[from]).toFixed(4)} {to}</p>
    </div>
  );
}

function PriceAlertModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (email) setDone(true); };
  return done ? (
    <div className="p-8 text-center"><div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg></div><p className="text-green-400 font-bold font-english">Alert Set!</p><p className="text-xs text-white/40 mt-1">We&apos;ll email you</p></div>
  ) : (
    <form onSubmit={submit} className="p-4 space-y-3">
      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-english outline-none focus:border-theme-gold/30 placeholder:text-white/20" />
      <input type="number" defaultValue={300} placeholder="Target price $" className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-english outline-none focus:border-theme-gold/30" />
      <button type="submit" className="w-full py-3 rounded-xl gold-btn text-sm font-bold">Set Alert</button>
    </form>
  );
}

/* ===== Actions ===== */

interface Action { icon: React.ComponentType<{ size?: number }>; label: string; color: string; modal: React.ReactNode; }

export default function ActionDrawer() {
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const actions: Action[] = [
    { icon: Compass, label: 'بناء رحلتك', color: '#D4A24C', modal: <div className="p-4 space-y-2">
      {['Day 1: Pyramids Tour', 'Day 2: Nile Cruise', 'Day 3: Khan Bazaar'].map(d => <div key={d} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] cursor-pointer hover:border-theme-gold/30 transition-all"><div className="w-2 h-2 rounded-full bg-theme-gold" /><span className="text-sm text-white/70 font-english">{d}</span></div>)}
    </div> },
    { icon: Search, label: 'بحث', color: '#D4A24C', modal: <SearchModal onClose={() => setActiveModal(null)} /> },
    { icon: Location, label: 'استكشف', color: '#41BEDC', modal: <div className="p-4 space-y-2">
      {['الأهرامات', 'النيل', 'البحر الأحمر', 'الأقصر'].map(p => <div key={p} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] cursor-pointer hover:border-theme-gold/30 transition-all"><div className="w-2 h-2 rounded-full bg-theme-gold" /><span className="text-sm text-white/70 font-english">{p}</span></div>)}
    </div> },
    { icon: Star, label: 'المساعد الذكي', color: '#8B5CF6', modal: <div className="p-4 space-y-2">
      {['خطط رحلتي', 'مطاعم', 'نصائح محلية', 'ترجمة'].map(a => <button key={a} className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white text-sm font-english transition-all"><Sparkles size={12} />{a}</button>)}
    </div> },
    { icon: Play, label: 'جولة 360', color: '#EC4899', modal: <div className="p-4 text-center"><div className="aspect-video rounded-xl bg-gradient-to-br from-theme-gold/10 to-theme-bg flex items-center justify-center border border-theme-gold/20 mb-3"><Play size={32} /></div><p className="text-sm text-white/60 font-english">Drag to explore panoramic views</p></div> },
    { icon: CalIcon, label: 'التقويم', color: '#41BEDC', modal: <CalendarModal onClose={() => setActiveModal(null)} /> },
    { icon: Dollar, label: 'العملة', color: '#10B981', modal: <CurrencyModal onClose={() => setActiveModal(null)} /> },
    { icon: Sun, label: 'الطقس', color: '#F59E0B', modal: <div className="p-4 text-center text-white/40 font-english text-sm">Weather: Cairo 34° ☀️<br />Luxor 42° 🔥<br />Alex 29° 🌊</div> },
    { icon: Globe, label: 'اللغة', color: '#8B5CF6', modal: <div className="p-6 space-y-2">
      {['English', 'العربية', 'Français', 'Deutsch'].map(l => <button key={l} className="w-full py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white text-sm font-english transition-all text-left">🌐 {l}</button>)}
    </div> },
    { icon: Clock, label: 'تنبيه الأسعار', color: '#EF4444', modal: <PriceAlertModal onClose={() => setActiveModal(null)} /> },
    { icon: Heart, label: 'مشاركة', color: '#3B82F6', modal: <div className="p-6 text-center"><div className="flex justify-center gap-3 mb-4">{['💬','📘','🐦','📧'].map(s => <div key={s} className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-xl hover:bg-theme-gold/10 hover:border-theme-gold/30 transition-all cursor-pointer">{s}</div>)}</div><div className="bg-white/[0.04] border border-white/10 rounded-xl p-3 text-xs text-white/30 font-english truncate">https://egypthub.com/trip/explore-egypt</div></div> },
    { icon: Sparkles, label: 'دليل صوتي', color: '#A78BFA', modal: <div className="p-4 space-y-1">
      {[{ t: 'Welcome to Egypt', d: '1:30' }, { t: 'Pyramids of Giza', d: '2:15' }, { t: 'Nile River', d: '1:45' }].map(a => <button key={a.t} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-all"><div className="w-8 h-8 rounded-full bg-theme-gold/10 flex items-center justify-center"><Play size={12} /></div><div className="flex-1 text-left"><p className="text-xs font-semibold text-white font-english">{a.t}</p></div><span className="text-[10px] text-white/30">{a.d}</span></button>)}
    </div> },
  ];

  return (
    <>
      {/* Floating Gold Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        onClick={() => setOpen(true)}
        className="fixed bottom-[144px] md:bottom-[84px] right-[24px] z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all touch-target"
        style={{
          background: 'linear-gradient(135deg, #D4A24C, #C89A3D)',
          boxShadow: '0 4px 20px rgba(212,162,76,0.4), 0 0 40px rgba(212,162,76,0.15)',
        }}
        aria-label="Open actions"
      >
        <Sparkles size={20} className="text-theme-bg" />
      </motion.button>

      {/* Drawer Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
            onClick={() => { setOpen(false); setActiveModal(null); }}
          />
        )}
      </AnimatePresence>

      {/* Drawer Panel or Modal */}
      <AnimatePresence>
        {open && !activeModal && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[85] bg-[#0F1525]/95 backdrop-blur-2xl rounded-t-3xl border-t border-theme-gold/20 shadow-[0_-20px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Sparkles size={14} />
                <span className="text-[10px] font-bold font-english tracking-[0.15em] text-theme-gold">QUICK ACTIONS</span>
              </div>
              <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/60 hover:bg-white/[0.08] transition-all touch-target" aria-label="Close"><Close size={14} /></button>
            </div>
            <div className="grid grid-cols-5 gap-3 p-5 max-h-[50vh] overflow-y-auto scrollbar-hide">
              {actions.map((a) => (
                <button key={a.label} onClick={() => setActiveModal(a.label)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all hover:scale-105 active:scale-95 touch-target group"
                  style={{ backgroundColor: `${a.color}08` }}
                  aria-label={a.label}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110" style={{ backgroundColor: `${a.color}15` }}>
                    <a.icon size={18} />
                  </div>
                  <span className="text-[9px] font-cairo text-white/60 font-semibold text-center leading-tight">{a.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Layer */}
      <AnimatePresence>
        {open && activeModal && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-0 left-0 right-0 z-[85] bg-[#0F1525]/95 backdrop-blur-2xl rounded-t-3xl border-t border-theme-gold/20 shadow-[0_-20px_60px_rgba(0,0,0,0.5)] max-h-[70vh] overflow-y-auto scrollbar-hide"
          >
            <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-white/[0.06] sticky top-0 bg-[#0F1525]/95 backdrop-blur-xl z-10">
              <button onClick={() => setActiveModal(null)} className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs font-english transition-all touch-target">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg> Back
              </button>
              <span className="text-[11px] font-bold font-cairo text-theme-gold tracking-[0.1em]">{activeModal}</span>
              <button onClick={() => { setOpen(false); setActiveModal(null); }} className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/60 hover:bg-white/[0.08] transition-all touch-target" aria-label="Close"><Close size={14} /></button>
            </div>
            {actions.find(a => a.label === activeModal)?.modal}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
