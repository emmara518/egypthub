'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getAllPartners, getAllAmbassadors, createLead } from '@/lib/network';
import type { Partner } from '@/lib/network';

const categoryLabels: Record<string, string> = {
  Hotel: 'فندق', Resort: 'منتجع', Restaurant: 'مطعم',
  'Dive Center': 'مركز غوص', 'Tour Operator': 'منظم رحلات',
  Transportation: 'مواصلات', Shopping: 'تسوق', 'Experience Provider': 'مقدم تجارب',
};

const cityLabels: Record<string, string> = {
  cairo: 'القاهرة', alexandria: 'الإسكندرية', luxor: 'الأقصر',
  aswan: 'أسوان', hurghada: 'الغردقة', 'sharm-el-sheikh': 'شرم الشيخ',
  dahab: 'دهب', siwa: 'سيوة',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill={s <= Math.round(rating) ? '#F2A00A' : 'none'} stroke={s <= Math.round(rating) ? '#F2A00A' : '#555'} strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="text-amber-400 text-sm font-bold mr-2">{rating}</span>
    </div>
  );
}

function LeadForm({ partnerId }: { partnerId: string }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError('يرجى كتابة الاسم والبريد الإلكتروني');
      return;
    }
    createLead({
      source: 'partner-page', ambassadorId: null, partnerId, status: 'new',
      clientName: form.name, clientEmail: form.email, clientPhone: form.phone,
      clientNotes: form.notes, destination: '', budget: 'medium', timeline: '',
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" className="mx-auto mb-3">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <p className="text-theme font-cairo font-bold">تم إرسال طلبك!</p>
        <p className="text-theme-secondary text-xs font-cairo mt-1">سنتواصل معك قريباً</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="الاسم *"
        className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-gold/15 text-theme font-cairo text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40" />
      <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="البريد الإلكتروني *"
        className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-gold/15 text-theme font-cairo text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40" />
      <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="رقم الهاتف"
        className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-gold/15 text-theme font-cairo text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40" />
      <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="ملاحظات" rows={3}
        className="w-full px-4 py-3 rounded-xl bg-theme-bg border border-theme-gold/15 text-theme font-cairo text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40 resize-none" />
      {error && <p className="text-red-400 text-xs font-cairo">{error}</p>}
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
        className="w-full py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm transition-all hover:bg-theme-gold/90">
        تواصل مع الشريك
      </motion.button>
    </form>
  );
}

export default function PartnerClient({ slug }: { slug: string }) {
  const [partner, setPartner] = useState<Partner | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const all = getAllPartners();
    const found = all.find((p) => {
      const ps = p.nameEn.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      return ps === slug;
    });
    if (found) setPartner(found);
    else setNotFound(true);
  }, [slug]);

  const ambassadors = useMemo(() => {
    if (!partner) return [];
    const all = getAllAmbassadors();
    return all.filter((a) => partner.ambassadorIds.includes(a.id));
  }, [partner]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-playfair font-bold text-theme-gold mb-4">404</h1>
          <p className="text-theme text-lg font-cairo mb-8">الشريك غير موجود</p>
          <Link href="/partners" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo transition-all hover:bg-theme-gold/80">
            العودة للشركاء
          </Link>
        </div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-theme-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg pt-24 pb-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Link href="/partners" className="inline-flex items-center gap-2 text-theme-gold font-cairo text-sm hover:underline">← العودة للشركاء</Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-theme-gold/15 text-theme-gold border border-theme-gold/20 font-cairo">{categoryLabels[partner.category]}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-theme-card text-theme-secondary border border-theme-gold/10 font-cairo">{cityLabels[partner.city] || partner.city}</span>
                    {partner.featured && <span className="px-3 py-1 rounded-full text-xs font-bold bg-theme-gold text-dark-900 font-cairo">مميز</span>}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-playfair font-bold text-theme">{partner.name}</h1>
                  <p className="text-theme-muted text-sm font-cairo mt-1">{partner.nameEn}</p>
                  <div className="mt-2"><StarRating rating={partner.rating} /></div>
                </div>
              </div>
              <p className="text-theme-secondary font-cairo leading-relaxed">{partner.description}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="rounded-2xl border border-theme-gold/15 bg-theme-card p-6">
              <h2 className="text-lg font-bold font-playfair text-theme mb-4">الخدمات</h2>
              <div className="flex flex-wrap gap-2">
                {partner.services.map((s, i) => (
                  <motion.span key={s} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                    className="px-3 py-1.5 rounded-lg bg-theme-bg border border-theme-gold/10 text-theme text-xs font-cairo">{s}</motion.span>
                ))}
              </div>
            </motion.div>

            {partner.gallery.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 className="text-lg font-bold font-playfair text-theme mb-4">معرض الصور</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {partner.gallery.map((img, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
                      className="aspect-[4/3] rounded-xl bg-gradient-to-br from-theme-gold/5 to-theme-card border border-theme-gold/10 overflow-hidden flex items-center justify-center">
                      <div className="text-center p-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto text-theme-muted mb-2">
                          <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                        </svg>
                        <p className="text-[10px] text-theme-muted font-cairo">صورة {i + 1}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {ambassadors.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="rounded-2xl border border-theme-gold/15 bg-theme-card p-6">
                <h2 className="text-lg font-bold font-playfair text-theme mb-4">السفراء المتعاونون</h2>
                <div className="space-y-3">
                  {ambassadors.map((a, i) => (
                    <motion.div key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-theme-bg border border-theme-gold/10">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-theme-gold/20 to-theme-card flex items-center justify-center text-theme-gold text-sm font-bold font-cairo shrink-0">{a.name.charAt(0)}</div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-theme font-cairo truncate">{a.name}</p>
                        <p className="text-[11px] text-theme-muted font-cairo truncate">{a.role}</p>
                      </div>
                      <div className="mr-auto flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#F2A00A" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        <span className="text-amber-400 text-xs font-semibold">{a.rating}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="rounded-2xl border border-theme-gold/15 bg-theme-card p-6">
              <h2 className="text-lg font-bold font-playfair text-theme mb-4">معلومات الاتصال</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-theme-gold shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  <span className="text-theme text-sm font-cairo truncate dir-ltr">{partner.contactEmail}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-theme-gold shrink-0"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
                  <span className="text-theme text-sm font-cairo" dir="ltr">{partner.contactPhone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-theme-gold shrink-0"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-theme-gold text-sm font-cairo hover:underline truncate">{partner.website}</a>
                </div>
                <div className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-theme-gold shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  <span className="text-theme text-sm font-cairo">{partner.address}</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="rounded-2xl border border-theme-gold/15 bg-theme-card p-6">
              <h2 className="text-lg font-bold font-playfair text-theme mb-4">تواصل مع الشريك</h2>
              <LeadForm partnerId={partner.id} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
