'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const availablePromos = [
  {
    id: 1,
    code: 'EGYPT2024',
    discount: 20,
    expiry: '31 ديسمبر 2025',
    terms: 'صالح على جميع التجارب. الحد الأدنى للحجز EGP 500',
    color: 'from-theme-gold to-theme-gold',
  },
  {
    id: 2,
    code: 'SHARM15',
    discount: 15,
    expiry: '28 فبراير 2025',
    terms: 'خصم حصري لشرم الشيخ. يشمل الفنادق والأنشطة',
    color: 'from-[var(--cyan)] to-[var(--teal)]',
  },
  {
    id: 3,
    code: 'WINTER25',
    discount: 25,
    expiry: '15 مارس 2025',
    terms: 'عرض موسمي الشتاء. الحد الأدنى EGP 1000',
    color: 'from-[var(--purple)] to-[#6D28D9]',
  },
  {
    id: 4,
    code: 'FIRST10',
    discount: 10,
    expiry: '30 يونيو 2025',
    terms: 'خصم أول حجز للمستخدمين الجدد فقط',
    color: 'from-[var(--success)] to-[#059669]',
  },
  {
    id: 5,
    code: 'LUXOR30',
    discount: 30,
    expiry: '31 يناير 2025',
    terms: 'خصم خاص بExperience الأقصر. يشمل المعابد والجولات',
    color: 'from-[#F4A261] to-[#E76F51]',
  },
];

export default function PromoCodesPage() {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<typeof availablePromos[0] | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [error, setError] = useState('');

  const handleApply = () => {
    const found = availablePromos.find(p => p.code === promoInput.toUpperCase());
    if (found) {
      setAppliedPromo(found);
      setError('');
    } else {
      setError('كود غير صالح. تحقق من الكود وأعد المحاولة.');
      setAppliedPromo(null);
    }
  };

  const copyCode = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[800px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          العودة للرئيسية
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white font-playfair">العروض والكوبونات</h1>
          <p className="text-theme-muted font-cairo mt-1">استخدم كود الخصم واحصل على عروض حصرية</p>
        </div>

        <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 mb-8">
          <h2 className="text-lg font-bold text-white font-cairo mb-4">أدخل كود الخصم</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={promoInput}
              onChange={e => { setPromoInput(e.target.value); setError(''); }}
              placeholder="مثال: EGYPT2024"
              className="flex-1 bg-theme-surface rounded-xl px-4 py-3 text-sm border border-theme-border focus:border-theme-gold/40 outline-none font-english placeholder:text-theme-muted text-white uppercase tracking-wider"
            />
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleApply}
              className="px-6 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-theme-gold text-theme-bg text-sm font-cairo font-bold shrink-0">
              تطبيق
            </motion.button>
          </div>
          {error && <p className="text-red-400 text-xs font-cairo mt-2">{error}</p>}
          <AnimatePresence>
            {appliedPromo && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-emerald-400 font-cairo font-bold">تم تطبيق الكود بنجاح!</p>
                  <p className="text-xs text-emerald-400/70 font-cairo">خصم {appliedPromo.discount}% — كود: {appliedPromo.code}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <h2 className="text-xl font-bold text-white font-playfair mb-4">العروض المتاحة</h2>

        <div className="space-y-4">
          {availablePromos.map((promo, idx) => (
            <motion.div key={promo.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border border-theme-gold/10 bg-theme-card overflow-hidden hover:border-theme-gold/20 transition-all">
              <div className="flex flex-col sm:flex-row">
                <div className={`relative w-full sm:w-36 h-24 sm:h-auto shrink-0 bg-gradient-to-l ${promo.color} flex items-center justify-center`}>
                  <div className="text-center">
                    <span className="text-3xl font-bold text-white font-english">{promo.discount}%</span>
                    <span className="block text-xs text-white/80 font-cairo">خصم</span>
                  </div>
                </div>
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="px-3 py-1 rounded-lg bg-theme-surface text-white text-sm font-english font-bold tracking-wider border border-theme-border">
                        {promo.code}
                      </span>
                    </div>
                    <motion.button whileTap={{ scale: 0.9 }}
                      onClick={() => copyCode(promo.code, promo.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-cairo transition-all ${
                        copiedId === promo.id
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-theme-gold/10 text-theme-gold border border-theme-gold/20 hover:bg-theme-gold/20'
                      }`}>
                      {copiedId === promo.id ? (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          تم النسخ
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          نسخ الكود
                        </>
                      )}
                    </motion.button>
                  </div>
                  <p className="text-xs text-theme-secondary font-cairo mb-2">{promo.terms}</p>
                  <div className="flex items-center gap-1 text-[10px] text-theme-muted font-cairo">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ينتهي في: {promo.expiry}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-theme-border bg-theme-surface p-6 text-center">
          <svg className="w-10 h-10 text-theme-gold mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <h3 className="text-sm font-bold text-white font-cairo mb-1">فعّل الإشعارات</h3>
          <p className="text-xs text-theme-muted font-cairo">احصل على أحدث العروض والكوبونات مباشرة</p>
        </div>
      </div>
    </div>
  );
}
