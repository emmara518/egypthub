'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Close, Check } from '@/components/Icons';

export default function GuestCheckout() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', travelers: '2' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setDone(true);
    setTimeout(() => { setOpen(false); setDone(false); setStep(1); setForm({ name: '', email: '', phone: '', travelers: '2' }); }, 2500);
  };

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-full gold-btn text-sm font-bold shadow-elevation-gold-1"
        aria-label="Book now"
      >
        Book Now — Guest Checkout
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => { setOpen(false); setStep(1); setDone(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-theme-surface border border-theme-gold/20 rounded-2xl max-w-[420px] w-full shadow-elevation-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                <div>
                  <span className="text-[10px] font-bold font-english tracking-[0.15em] text-theme-gold">GUEST CHECKOUT</span>
                  <h3 className="text-base font-bold font-display text-white mt-0.5">Complete Your Booking</h3>
                </div>
                <button onClick={() => { setOpen(false); setStep(1); setDone(false); }} className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/60 hover:bg-white/[0.08] transition-all touch-target" aria-label="Close"><Close size={14} /></button>
              </div>

              {done ? (
                <div className="p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4"><Check size={24} /></div>
                  <p className="text-lg font-bold text-green-400 font-english">Booking Confirmed!</p>
                  <p className="text-sm text-white/50 mt-1">Check your email for details</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-5">
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="mb-3">
                        <label className="text-[11px] text-white/40 font-english block mb-1">Full Name</label>
                        <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name"
                          className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-english outline-none focus:border-theme-gold/30 placeholder:text-white/20" />
                      </div>
                      <div className="mb-3">
                        <label className="text-[11px] text-white/40 font-english block mb-1">Email Address</label>
                        <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com"
                          className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-english outline-none focus:border-theme-gold/30 placeholder:text-white/20" />
                      </div>
                      <div className="mb-4">
                        <label className="text-[11px] text-white/40 font-english block mb-1">Phone (WhatsApp)</label>
                        <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+20 100 000 0000"
                          className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-english outline-none focus:border-theme-gold/30 placeholder:text-white/20" />
                      </div>
                      <button type="submit" className="w-full py-2.5 rounded-xl gold-btn text-sm font-bold">Continue →</button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="mb-4">
                        <label className="text-[11px] text-white/40 font-english block mb-1">Number of Travelers</label>
                        <select value={form.travelers} onChange={e => setForm(f => ({ ...f, travelers: e.target.value }))}
                          className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-english outline-none focus:border-theme-gold/30">
                          {[1,2,3,4,5,6,7,8].map(n => <option key={n}>{n}</option>)}
                        </select>
                      </div>
                      <div className="bg-theme-gold/[0.04] border border-theme-gold/10 rounded-xl p-3 mb-4">
                        <p className="text-[11px] text-white/40 font-english mb-0.5">Booking Summary</p>
                        <p className="text-xs text-white/70 font-english">Pyramids Guided Tour</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] text-white/40">$120 × {form.travelers} travelers</span>
                          <span className="text-sm font-bold text-theme-gold">${(120 * Number(form.travelers)).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => setStep(1)} className="px-4 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-english hover:bg-white/[0.04] transition-all">← Back</button>
                        <button type="submit" className="flex-1 py-2.5 rounded-xl gold-btn text-sm font-bold">Confirm Booking</button>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
