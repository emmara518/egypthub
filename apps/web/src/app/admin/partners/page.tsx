'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllPartners } from '@/lib/network/partnerEngine';
import { getAllAmbassadors } from '@/lib/network/ambassadorEngine';
import type { Partner, PartnerStatus, PartnerCategory } from '@/lib/network/types';

const categories: PartnerCategory[] = ['Hotel', 'Resort', 'Restaurant', 'Dive Center', 'Tour Operator', 'Transportation', 'Shopping', 'Experience Provider'];
const statuses: PartnerStatus[] = ['approved', 'pending-review', 'rejected', 'suspended', 'archived'];

const catLabels: Record<string, string> = {
  Hotel: 'فندق', Resort: 'منتجع', Restaurant: 'مطعم',
  'Dive Center': 'مركز غوص', 'Tour Operator': 'منظم رحلات',
  Transportation: 'نقل', Shopping: 'تسوق', 'Experience Provider': 'مقدم تجارب',
};

const statusLabels: Record<PartnerStatus, string> = {
  draft: 'مسودة', approved: 'معتمد', 'pending-review': 'قيد المراجعة',
  rejected: 'مرفوض', suspended: 'معلق', archived: 'مؤرشف',
};

const statusColors: Record<PartnerStatus, string> = {
  draft: 'bg-theme-border text-theme-muted',
  approved: 'bg-emerald-500/10 text-emerald-400',
  'pending-review': 'bg-amber-500/10 text-amber-400',
  rejected: 'bg-red-500/10 text-red-400',
  suspended: 'bg-rose-500/10 text-rose-400',
  archived: 'bg-theme-border text-theme-muted',
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function AdminPartnersPage() {
  const allPartners = useMemo(() => getAllPartners(), []);
  const ambassadors = useMemo(() => getAllAmbassadors(), []);
  const [partners, setPartners] = useState<Partner[]>(allPartners);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<PartnerStatus | ''>('');
  const [cityFilter, setCityFilter] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [showView, setShowView] = useState<Partner | null>(null);
  const perPage = 10;

  const [form, setForm] = useState<Partial<Partner>>({
    name: '', nameEn: '', category: 'Hotel' as PartnerCategory,
    city: '', description: '', contactEmail: '', contactPhone: '', website: '', address: '',
  });

  const cities = useMemo(() => [...new Set(partners.map((p) => p.city))], [partners]);

  const stats = useMemo(() => ({
    total: partners.length,
    approved: partners.filter((p) => p.status === 'approved').length,
    pending: partners.filter((p) => p.status === 'pending-review').length,
    suspended: partners.filter((p) => p.status === 'suspended').length,
    featured: partners.filter((p) => p.featured).length,
  }), [partners]);

  const filtered = useMemo(() => {
    let result = [...partners];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.includes(q) || p.nameEn.toLowerCase().includes(q) || p.id.includes(q));
    }
    if (statusFilter) result = result.filter((p) => p.status === statusFilter);
    if (cityFilter) result = result.filter((p) => p.city === cityFilter);
    if (catFilter) result = result.filter((p) => p.category === catFilter);
    return result;
  }, [partners, search, statusFilter, cityFilter, catFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleFeaturedToggle = (id: string) => {
    setPartners((prev) => prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));
  };

  const handleStatusChange = (id: string, status: PartnerStatus) => {
    setPartners((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const handleCreate = () => {
    const newPartner: Partner = {
      id: `partner-${String(Date.now())}`,
      name: form.name || '',
      nameEn: form.nameEn || '',
      category: (form.category || 'Hotel') as PartnerCategory,
      city: form.city || '',
      description: form.description || '',
      descriptionEn: '',
      contactEmail: form.contactEmail || '',
      contactPhone: form.contactPhone || '',
      website: form.website || '',
      address: form.address || '',
      coordinates: { lat: 0, lng: 0 },
      status: 'pending-review',
      featured: false,
      rating: 0,
      totalLeads: 0,
      totalReferrals: 0,
      joinedAt: new Date().toISOString(),
      services: [],
      gallery: [],
      ambassadorIds: [],
    };
    setPartners((prev) => [newPartner, ...prev]);
    setShowCreate(false);
    setForm({});
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">الشركاء</h1>
          <p className="text-sm text-theme-muted font-cairo">إدارة شركاء المنصة والخدمات</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-theme-gold text-dark-900 font-bold text-sm font-cairo hover:opacity-90 transition-all">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          شريك جديد
        </button>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'إجمالي الشركاء', value: stats.total, icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', color: 'from-blue-500 to-blue-600' },
          { label: 'معتمد', value: stats.approved, icon: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', color: 'from-emerald-500 to-emerald-600' },
          { label: 'قيد المراجعة', value: stats.pending, icon: 'M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', color: 'from-amber-500 to-amber-600' },
          { label: 'معلق', value: stats.suspended, icon: 'M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636', color: 'from-rose-500 to-rose-600' },
          { label: 'مميز', value: stats.featured, icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69l1.519-4.674z', color: 'from-purple-500 to-purple-600' },
        ].map((s, i) => (
          <motion.div key={i} variants={itemVariants}
            className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d={s.icon} /></svg>
              </div>
            </div>
            <p className="text-2xl font-bold font-playfair text-theme mb-0.5">{s.value}</p>
            <p className="text-xs text-theme-muted font-cairo">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card overflow-hidden mb-6">
        <div className="p-4 border-b border-theme-gold/10 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[180px]">
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" /></svg>
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="بحث..."
              className="w-full bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 pr-10 pl-4 text-sm font-cairo outline-none focus:border-theme-gold/40" />
          </div>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value as PartnerStatus | ''); setPage(1); }}
            className="bg-theme-surface border border-theme-gold/15 text-theme rounded-xl py-2.5 px-3 text-sm font-cairo outline-none focus:border-theme-gold/40">
            <option value="">كل الحالات</option>
            {statuses.map((s) => <option key={s} value={s}>{statusLabels[s]}</option>)}
          </select>
          <select value={cityFilter} onChange={(e) => { setCityFilter(e.target.value); setPage(1); }}
            className="bg-theme-surface border border-theme-gold/15 text-theme rounded-xl py-2.5 px-3 text-sm font-cairo outline-none focus:border-theme-gold/40">
            <option value="">كل المدن</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={catFilter} onChange={(e) => { setCatFilter(e.target.value); setPage(1); }}
            className="bg-theme-surface border border-theme-gold/15 text-theme rounded-xl py-2.5 px-3 text-sm font-cairo outline-none focus:border-theme-gold/40">
            <option value="">كل التصنيفات</option>
            {categories.map((c) => <option key={c} value={c}>{catLabels[c]}</option>)}
          </select>
          <span className="text-xs text-theme-muted font-cairo whitespace-nowrap">{filtered.length} شريك</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-theme-gold/10 text-theme-muted text-[11px] font-cairo">
                <th className="text-right px-4 py-3 font-medium">المعرف</th>
                <th className="text-right px-4 py-3 font-medium">الاسم</th>
                <th className="text-right px-4 py-3 font-medium">التصنيف</th>
                <th className="text-right px-4 py-3 font-medium">المدينة</th>
                <th className="text-right px-4 py-3 font-medium">الحالة</th>
                <th className="text-right px-4 py-3 font-medium">التقييم</th>
                <th className="text-right px-4 py-3 font-medium">العملاء</th>
                <th className="text-right px-4 py-3 font-medium">مميز</th>
                <th className="text-right px-4 py-3 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p, i) => (
                <motion.tr key={p.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                  className={`border-b border-theme-gold/5 hover:bg-theme-gold/[0.02] transition-colors ${i % 2 === 0 ? 'bg-theme-surface/30' : ''}`}>
                  <td className="px-4 py-3 font-english text-xs text-theme-muted">{p.id}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => setShowView(p)} className="text-sm text-theme font-cairo hover:text-theme-gold transition-colors">{p.name}</button>
                  </td>
                  <td className="px-4 py-3 text-xs text-theme font-cairo">{catLabels[p.category] || p.category}</td>
                  <td className="px-4 py-3 text-xs text-theme-muted font-cairo">{p.city}</td>
                  <td className="px-4 py-3">
                    <select value={p.status} onChange={(e) => handleStatusChange(p.id, e.target.value as PartnerStatus)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold font-cairo border ${statusColors[p.status]} outline-none cursor-pointer`}>
                      {statuses.map((s) => <option key={s} value={s}>{statusLabels[s]}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-xs text-theme-gold font-english">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      {p.rating.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-english text-xs text-theme">{p.totalLeads}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleFeaturedToggle(p.id)}
                      className={`transition-all ${p.featured ? 'text-theme-gold' : 'text-theme-muted hover:text-theme-gold'}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={p.featured ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69l1.519-4.674z" /></svg>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setShowView(p)}
                      className="p-1.5 rounded-lg hover:bg-theme-gold/10 text-theme-muted hover:text-theme-gold transition-all">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    </button>
                  </td>
                </motion.tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={9} className="text-center py-8 text-theme-muted font-cairo text-sm">لا يوجد شركاء</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-theme-gold/10">
            <span className="text-xs text-theme-muted font-cairo">{filtered.length} من إجمالي {partners.length} شريك</span>
            <div className="flex items-center gap-1">
              <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg text-xs font-cairo bg-theme-surface border border-theme-gold/15 text-theme disabled:opacity-30 hover:border-theme-gold/30">السابق</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-english font-bold transition-all ${page === i + 1 ? 'bg-theme-gold text-dark-900' : 'bg-theme-surface border border-theme-gold/15 text-theme hover:border-theme-gold/30'}`}>
                  {i + 1}
                </button>
              ))}
              <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg text-xs font-cairo bg-theme-surface border border-theme-gold/15 text-theme disabled:opacity-30 hover:border-theme-gold/30">التالي</button>
            </div>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {showCreate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setShowCreate(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl border border-theme-gold/20 bg-theme-card p-6 overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold font-cairo text-theme">شريك جديد</h2>
                <button onClick={() => setShowCreate(false)} className="text-theme-muted hover:text-theme"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="الاسم (عربي)" className="bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 px-4 text-sm font-cairo outline-none focus:border-theme-gold/40" />
                  <input value={form.nameEn || ''} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} placeholder="الاسم (إنجليزي)" className="bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 px-4 text-sm font-english outline-none focus:border-theme-gold/40" />
                </div>
                <select value={form.category || 'Hotel'} onChange={(e) => setForm({ ...form, category: e.target.value as PartnerCategory })}
                  className="w-full bg-theme-surface border border-theme-gold/15 text-theme rounded-xl py-2.5 px-4 text-sm font-cairo outline-none focus:border-theme-gold/40">
                  {categories.map((c) => <option key={c} value={c}>{catLabels[c]}</option>)}
                </select>
                <input value={form.city || ''} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="المدينة" className="w-full bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 px-4 text-sm font-cairo outline-none focus:border-theme-gold/40" />
                <textarea value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="الوصف"
                  className="w-full bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 px-4 text-sm font-cairo outline-none focus:border-theme-gold/40 resize-none h-20" />
                <div className="grid grid-cols-2 gap-3">
                  <input value={form.contactEmail || ''} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} placeholder="البريد الإلكتروني" className="bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 px-4 text-sm font-english outline-none focus:border-theme-gold/40" />
                  <input value={form.contactPhone || ''} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} placeholder="رقم الهاتف" className="bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 px-4 text-sm font-english outline-none focus:border-theme-gold/40" />
                </div>
                <input value={form.website || ''} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="الموقع الإلكتروني" className="w-full bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 px-4 text-sm font-english outline-none focus:border-theme-gold/40" />
                <input value={form.address || ''} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="العنوان" className="w-full bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 px-4 text-sm font-cairo outline-none focus:border-theme-gold/40" />
              </div>
              <div className="flex items-center gap-3 mt-6">
                <button onClick={handleCreate}
                  className="flex-1 py-2.5 rounded-xl bg-theme-gold text-dark-900 font-bold text-sm font-cairo hover:opacity-90">إنشاء الشريك</button>
                <button onClick={() => setShowCreate(false)}
                  className="px-5 py-2.5 rounded-xl border border-theme-gold/20 text-theme-gold text-sm font-cairo hover:bg-theme-gold/10">إلغاء</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showView && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setShowView(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl border border-theme-gold/20 bg-theme-card p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold font-cairo text-theme">تفاصيل الشريك</h2>
                <button onClick={() => setShowView(null)} className="text-theme-muted hover:text-theme"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-theme-surface border border-theme-gold/10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-gold/30 to-theme-gold/10 flex items-center justify-center text-lg font-bold text-theme-gold">{showView.name.charAt(0)}</div>
                  <div>
                    <p className="text-base font-bold font-cairo text-theme">{showView.name}</p>
                    <p className="text-xs text-theme-muted font-english">{showView.nameEn} · {showView.city}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'التصنيف', value: catLabels[showView.category] || showView.category },
                    { label: 'التقييم', value: `${showView.rating.toFixed(1)} ★` },
                    { label: 'العملاء المحتملين', value: showView.totalLeads },
                    { label: 'الإحالات', value: showView.totalReferrals },
                    { label: 'البريد', value: showView.contactEmail },
                    { label: 'الهاتف', value: showView.contactPhone },
                  ].map((d) => (
                    <div key={d.label} className="p-3 rounded-xl bg-theme-surface border border-theme-gold/10">
                      <p className="text-[10px] text-theme-muted font-cairo mb-1">{d.label}</p>
                      <p className="text-sm text-theme font-cairo">{d.value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-theme-surface border border-theme-gold/10">
                  <p className="text-[10px] text-theme-muted font-cairo mb-1">السفراء المرتبطون</p>
                  <div className="flex flex-wrap gap-1.5">
                    {showView.ambassadorIds.length > 0 ? showView.ambassadorIds.map((aid) => {
                      const amb = ambassadors.find((a) => a.id === aid);
                      return amb ? (
                        <span key={aid} className="px-2 py-0.5 rounded text-[10px] font-bold font-cairo bg-purple-500/10 text-purple-400">{amb.name}</span>
                      ) : null;
                    }) : <span className="text-xs text-theme-muted font-cairo">لا يوجد</span>}
                  </div>
                </div>
                {showView.website && (
                  <div className="p-3 rounded-xl bg-theme-surface border border-theme-gold/10">
                    <p className="text-[10px] text-theme-muted font-cairo mb-1">الموقع الإلكتروني</p>
                    <p className="text-sm text-theme-gold font-english">{showView.website}</p>
                  </div>
                )}
                {showView.address && (
                  <div className="p-3 rounded-xl bg-theme-surface border border-theme-gold/10">
                    <p className="text-[10px] text-theme-muted font-cairo mb-1">العنوان</p>
                    <p className="text-sm text-theme font-cairo">{showView.address}</p>
                  </div>
                )}
              </div>
              <button onClick={() => setShowView(null)}
                className="w-full mt-6 py-2.5 rounded-xl border border-theme-gold/20 text-theme-gold text-sm font-cairo hover:bg-theme-gold/10">إغلاق</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
