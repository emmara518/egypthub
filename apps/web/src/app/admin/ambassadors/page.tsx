'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllAmbassadors } from '@/lib/network/ambassadorEngine';
import type { NetworkAmbassador } from '@/lib/network/types';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function AdminAmbassadorsPage() {
  const allAmbassadors = useMemo(() => getAllAmbassadors(), []);
  const [ambassadors, setAmbassadors] = useState<NetworkAmbassador[]>(allAmbassadors);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [verifiedFilter, setVerifiedFilter] = useState<'' | 'verified' | 'unverified'>('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [showView, setShowView] = useState<NetworkAmbassador | null>(null);
  const perPage = 10;

  const [form, setForm] = useState<Partial<NetworkAmbassador>>({
    name: '', nameEn: '', city: '', role: '', bio: '', specialties: [], languages: [],
  });
  const [specialtiesInput, setSpecialtiesInput] = useState('');
  const [languagesInput, setLanguagesInput] = useState('');

  const cities = useMemo(() => [...new Set(ambassadors.map((a) => a.city))], [ambassadors]);
  const roles = useMemo(() => [...new Set(ambassadors.map((a) => a.role))], [ambassadors]);

  const stats = useMemo(() => {
    const activeWithReferrals = ambassadors.filter((a) => a.totalReferrals > 0);
    const avgRating = ambassadors.length > 0
      ? ambassadors.reduce((s, a) => s + a.rating, 0) / ambassadors.length
      : 0;
    const sorted = [...ambassadors].sort((a, b) => b.totalConversions - a.totalConversions);
    return {
      total: ambassadors.length,
      verified: ambassadors.filter((a) => a.verified).length,
      active: activeWithReferrals.length,
      avgRating,
      topPerformer: sorted[0]?.name || '-',
    };
  }, [ambassadors]);

  const filtered = useMemo(() => {
    let result = [...ambassadors];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((a) => a.name.includes(q) || a.nameEn.toLowerCase().includes(q) || a.city.includes(q) || a.id.includes(q));
    }
    if (cityFilter) result = result.filter((a) => a.city === cityFilter);
    if (verifiedFilter === 'verified') result = result.filter((a) => a.verified);
    if (verifiedFilter === 'unverified') result = result.filter((a) => !a.verified);
    if (roleFilter) result = result.filter((a) => a.role === roleFilter);
    return result;
  }, [ambassadors, search, cityFilter, verifiedFilter, roleFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleVerifyToggle = (id: string) => {
    setAmbassadors((prev) => prev.map((a) => (a.id === id ? { ...a, verified: !a.verified } : a)));
  };

  const handleCreate = () => {
    const code = `EGY-AMB-${String(ambassadors.length + 1).padStart(4, '0')}`;
    const newAmb: NetworkAmbassador = {
      id: `ambassador-${String(ambassadors.length + 1).padStart(3, '0')}`,
      name: form.name || '',
      nameEn: form.nameEn || '',
      city: form.city || '',
      bio: form.bio || '',
      bioEn: '',
      role: form.role || 'Local Guide',
      specialties: form.specialties || [],
      languages: form.languages || [],
      rating: 0,
      verified: false,
      referralCode: code,
      totalReferrals: 0,
      totalLeads: 0,
      totalConversions: 0,
      joinedAt: new Date().toISOString(),
      avatarUrl: '/images/avatars/avatar-01.svg',
      socialLinks: {},
    };
    setAmbassadors((prev) => [newAmb, ...prev]);
    setShowCreate(false);
    setForm({});
    setSpecialtiesInput('');
    setLanguagesInput('');
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">السفراء</h1>
          <p className="text-sm text-theme-muted font-cairo">إدارة سفراء المنصة وشركاء الترويج</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-theme-gold text-dark-900 font-bold text-sm font-cairo hover:opacity-90 transition-all">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          سفير جديد
        </button>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'إجمالي السفراء', value: stats.total, icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', color: 'from-purple-500 to-purple-600' },
          { label: 'موثق', value: stats.verified, icon: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', color: 'from-emerald-500 to-emerald-600' },
          { label: 'نشط (إحالات)', value: stats.active, icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', color: 'from-amber-500 to-amber-600' },
          { label: 'متوسط التقييم', value: stats.avgRating.toFixed(1), icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69l1.519-4.674z', color: 'from-blue-500 to-blue-600' },
          { label: 'الأفضل أداءً', value: stats.topPerformer, icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', color: 'from-rose-500 to-rose-600' },
        ].map((s, i) => (
          <motion.div key={i} variants={itemVariants}
            className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d={s.icon} /></svg>
              </div>
            </div>
            <p className="text-2xl font-bold font-playfair text-theme mb-0.5 truncate">{typeof s.value === 'number' ? s.value.toLocaleString('ar-EG') : s.value}</p>
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
          <select value={cityFilter} onChange={(e) => { setCityFilter(e.target.value); setPage(1); }}
            className="bg-theme-surface border border-theme-gold/15 text-theme rounded-xl py-2.5 px-3 text-sm font-cairo outline-none focus:border-theme-gold/40">
            <option value="">كل المدن</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={verifiedFilter} onChange={(e) => { setVerifiedFilter(e.target.value as '' | 'verified' | 'unverified'); setPage(1); }}
            className="bg-theme-surface border border-theme-gold/15 text-theme rounded-xl py-2.5 px-3 text-sm font-cairo outline-none focus:border-theme-gold/40">
            <option value="">جميع الحالات</option>
            <option value="verified">موثق</option>
            <option value="unverified">غير موثق</option>
          </select>
          <select value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
            className="bg-theme-surface border border-theme-gold/15 text-theme rounded-xl py-2.5 px-3 text-sm font-cairo outline-none focus:border-theme-gold/40">
            <option value="">كل الأدوار</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <span className="text-xs text-theme-muted font-cairo whitespace-nowrap">{filtered.length} سفير</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-theme-gold/10 text-theme-muted text-[11px] font-cairo">
                <th className="text-right px-4 py-3 font-medium">المعرف</th>
                <th className="text-right px-4 py-3 font-medium">الاسم</th>
                <th className="text-right px-4 py-3 font-medium">المدينة</th>
                <th className="text-right px-4 py-3 font-medium">الدور</th>
                <th className="text-right px-4 py-3 font-medium">التقييم</th>
                <th className="text-right px-4 py-3 font-medium">الإحالات</th>
                <th className="text-right px-4 py-3 font-medium">العملاء</th>
                <th className="text-right px-4 py-3 font-medium">التحويلات</th>
                <th className="text-right px-4 py-3 font-medium">موثق</th>
                <th className="text-right px-4 py-3 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((a, i) => {
                const conversionRate = a.totalLeads > 0 ? ((a.totalConversions / a.totalLeads) * 100).toFixed(1) : '0.0';
                return (
                  <motion.tr key={a.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                    className={`border-b border-theme-gold/5 hover:bg-theme-gold/[0.02] transition-colors ${i % 2 === 0 ? 'bg-theme-surface/30' : ''}`}>
                    <td className="px-4 py-3 font-english text-xs text-theme-muted">{a.id}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setShowView(a)} className="flex items-center gap-2 text-sm text-theme font-cairo hover:text-theme-gold transition-colors">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-600/10 flex items-center justify-center text-xs font-bold text-amber-400">{a.name.charAt(0)}</div>
                        {a.name}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-xs text-theme-muted font-cairo">{a.city}</td>
                    <td className="px-4 py-3 text-xs text-theme font-cairo">{a.role}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-xs text-theme-gold font-english">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        {a.rating.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-english text-xs text-theme">{a.totalReferrals}</td>
                    <td className="px-4 py-3 font-english text-xs text-theme">{a.totalLeads}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-english text-xs text-theme">{a.totalConversions}</span>
                        <span className="text-[10px] text-theme-muted font-cairo">({conversionRate}%)</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleVerifyToggle(a.id)}
                        className={`p-1.5 rounded-lg transition-all ${a.verified ? 'text-emerald-400 bg-emerald-500/10' : 'text-theme-muted hover:text-emerald-400 hover:bg-emerald-500/10'}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill={a.verified ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setShowView(a)}
                        className="p-1.5 rounded-lg hover:bg-theme-gold/10 text-theme-muted hover:text-theme-gold transition-all">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
              {paginated.length === 0 && (
                <tr><td colSpan={10} className="text-center py-8 text-theme-muted font-cairo text-sm">لا يوجد سفراء</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-theme-gold/10">
            <span className="text-xs text-theme-muted font-cairo">{filtered.length} من إجمالي {ambassadors.length} سفير</span>
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
                <h2 className="text-lg font-bold font-cairo text-theme">سفير جديد</h2>
                <button onClick={() => setShowCreate(false)} className="text-theme-muted hover:text-theme"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="الاسم (عربي)" className="bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 px-4 text-sm font-cairo outline-none focus:border-theme-gold/40" />
                  <input value={form.nameEn || ''} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} placeholder="الاسم (إنجليزي)" className="bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 px-4 text-sm font-english outline-none focus:border-theme-gold/40" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input value={form.city || ''} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="المدينة" className="bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 px-4 text-sm font-cairo outline-none focus:border-theme-gold/40" />
                  <select value={form.role || ''} onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="bg-theme-surface border border-theme-gold/15 text-theme rounded-xl py-2.5 px-4 text-sm font-cairo outline-none focus:border-theme-gold/40">
                    <option value="">اختر الدور</option>
                    {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <textarea value={form.bio || ''} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="نبذة تعريفية"
                  className="w-full bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 px-4 text-sm font-cairo outline-none focus:border-theme-gold/40 resize-none h-20" />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-theme-muted font-cairo mb-1">التخصصات (مفصولة بفاصلة)</p>
                    <input value={specialtiesInput} onChange={(e) => {
                      setSpecialtiesInput(e.target.value);
                      setForm({ ...form, specialties: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) });
                    }} placeholder="غوص، سفاري، تصوير" className="w-full bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 px-4 text-sm font-cairo outline-none focus:border-theme-gold/40" />
                  </div>
                  <div>
                    <p className="text-[10px] text-theme-muted font-cairo mb-1">اللغات (مفصولة بفاصلة)</p>
                    <input value={languagesInput} onChange={(e) => {
                      setLanguagesInput(e.target.value);
                      setForm({ ...form, languages: e.target.value.split(',').map((l) => l.trim()).filter(Boolean) });
                    }} placeholder="عربي، English" className="w-full bg-theme-surface border border-theme-gold/15 text-theme placeholder:text-theme-muted rounded-xl py-2.5 px-4 text-sm font-english outline-none focus:border-theme-gold/40" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <button onClick={handleCreate}
                  className="flex-1 py-2.5 rounded-xl bg-theme-gold text-dark-900 font-bold text-sm font-cairo hover:opacity-90">إنشاء السفير</button>
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
                <h2 className="text-lg font-bold font-cairo text-theme">ملف السفير</h2>
                <button onClick={() => setShowView(null)} className="text-theme-muted hover:text-theme"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></button>
              </div>
              <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-theme-surface border border-theme-gold/10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-600/10 flex items-center justify-center text-xl font-bold text-amber-400">{showView.name.charAt(0)}</div>
                <div className="flex-1">
                  <p className="text-base font-bold font-cairo text-theme">{showView.name}</p>
                  <p className="text-xs text-theme-muted font-english">{showView.nameEn}</p>
                  <p className="text-xs text-theme-muted font-cairo">{showView.city} · {showView.role}</p>
                </div>
                <div className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-cairo ${showView.verified ? 'bg-emerald-500/10 text-emerald-400' : 'bg-theme-border text-theme-muted'}`}>
                  {showView.verified ? 'موثق' : 'غير موثق'}
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="p-3 rounded-xl bg-theme-surface border border-theme-gold/10">
                  <p className="text-[10px] text-theme-muted font-cairo mb-1">نبذة</p>
                  <p className="text-sm text-theme font-cairo">{showView.bio}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'التقييم', value: `${showView.rating.toFixed(1)} ★` },
                    { label: 'الإحالات', value: showView.totalReferrals },
                    { label: 'العملاء', value: showView.totalLeads },
                    { label: 'التحويلات', value: showView.totalConversions },
                    { label: 'معدل التحويل', value: `${showView.totalLeads > 0 ? ((showView.totalConversions / showView.totalLeads) * 100).toFixed(1) : '0'}%` },
                    { label: 'كود الإحالة', value: showView.referralCode },
                  ].map((d) => (
                    <div key={d.label} className="p-3 rounded-xl bg-theme-surface border border-theme-gold/10 text-center">
                      <p className="text-[10px] text-theme-muted font-cairo mb-1">{d.label}</p>
                      <p className="text-sm font-bold text-theme font-english">{d.value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-theme-surface border border-theme-gold/10">
                  <p className="text-[10px] text-theme-muted font-cairo mb-2">التخصصات</p>
                  <div className="flex flex-wrap gap-1.5">
                    {showView.specialties.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded text-[10px] font-bold font-cairo bg-amber-500/10 text-amber-400">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-theme-surface border border-theme-gold/10">
                  <p className="text-[10px] text-theme-muted font-cairo mb-2">اللغات</p>
                  <div className="flex flex-wrap gap-1.5">
                    {showView.languages.map((l) => (
                      <span key={l} className="px-2 py-0.5 rounded text-[10px] font-bold font-cairo bg-blue-500/10 text-blue-400">{l}</span>
                    ))}
                  </div>
                </div>
                {showView.socialLinks.instagram && (
                  <div className="p-3 rounded-xl bg-theme-surface border border-theme-gold/10">
                    <p className="text-[10px] text-theme-muted font-cairo mb-1">إنستغرام</p>
                    <p className="text-sm text-theme-gold font-english">{showView.socialLinks.instagram}</p>
                  </div>
                )}
                {showView.socialLinks.facebook && (
                  <div className="p-3 rounded-xl bg-theme-surface border border-theme-gold/10">
                    <p className="text-[10px] text-theme-muted font-cairo mb-1">فيسبوك</p>
                    <p className="text-sm text-theme-gold font-english">{showView.socialLinks.facebook}</p>
                  </div>
                )}
                <div className="p-3 rounded-xl bg-theme-surface border border-theme-gold/10">
                  <p className="text-[10px] text-theme-muted font-cairo mb-1">تاريخ الانضمام</p>
                  <p className="text-sm text-theme font-cairo">{new Date(showView.joinedAt).toLocaleDateString('ar-EG')}</p>
                </div>
              </div>
              <button onClick={() => setShowView(null)}
                className="w-full py-2.5 rounded-xl border border-theme-gold/20 text-theme-gold text-sm font-cairo hover:bg-theme-gold/10">إغلاق</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
