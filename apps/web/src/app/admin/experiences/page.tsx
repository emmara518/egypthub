'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

type ExpStatus = 'PUBLISHED' | 'DRAFT' | 'PENDING_REVIEW' | 'ARCHIVED';

interface Experience {
  id: string; title: string; description: string; provider: string; category: string;
  city: string; price: number; originalPrice?: number; duration: string;
  maxGuests: number; images: string[]; includes: string[]; excludes: string[];
  status: ExpStatus; featured: boolean; rating: number; reviewCount: number;
  bookingsCount: number; createdAt: string;
}

const EXP_STATUS: Record<ExpStatus, { label: string; color: string }> = {
  PUBLISHED: { label: 'منشور', color: 'text-emerald-400 bg-emerald-500/10' },
  DRAFT: { label: 'مسودة', color: 'text-amber-400 bg-amber-500/10' },
  PENDING_REVIEW: { label: 'قيد المراجعة', color: 'text-blue-400 bg-blue-500/10' },
  ARCHIVED: { label: 'مؤرشف', color: 'text-theme-muted bg-theme-surface' },
};

const SAMPLE_EXPERIENCES: Experience[] = Array.from({ length: 28 }, (_, i) => {
  const cities = ['القاهرة', 'الغردقة', 'شرم الشيخ', 'الأقصر', 'أسوان', 'سيوة', 'الإسكندرية', 'دهب'];
  const categories = ['مغامرات', 'تاريخية', 'رياضات مائية', 'جولات', 'ترفيه', 'استكشاف', 'دينية', 'تسوق'];
  const providers = ['النيل السياحية', 'أهرامات مصر', 'مغامرات الصحراء', 'شرم دايف', 'أقصر للسياحة', 'سيوة تورز', 'الإسكندرية للسياحة', 'دهب دايف'];
  const statuses: ExpStatus[] = ['PUBLISHED', 'PUBLISHED', 'DRAFT', 'PUBLISHED', 'PENDING_REVIEW', 'PUBLISHED', 'ARCHIVED', 'PUBLISHED'];
  const titles = [
    'رحلة نيلية ساحرة', 'جولة الأهرامات', 'سفاري الصحراء', 'غطس في البحر الأحمر',
    'جولة معبد الكرنك', 'مهرجان التذوق', 'استكشاف الواحات', 'رحلة مركب شراعي',
    'تسلق الجبال', 'جولة البازارات', 'ركوب الخيل', 'غوص مع الدلافين',
    'جولة المعابد', 'تخييم في الصحراء', 'جولة تراثية', 'تذوق المأكولات البحرية',
    'رحلة بالبالون', 'زيارة الأهرامات الجيزة', 'سباق رباعي', 'جولة نيلية غروب',
    'استكشاف المعابد', 'رحلة عائلية', 'تسوق في خان الخليلي', 'جولة آثار الإسكندرية',
    'تزلج مائي', 'رحلة جزر', 'جولة وادي الملوك', 'تخييم واحة سيوة',
  ];
  return {
    id: `EXP-${String(i + 1).padStart(4, '0')}`,
    title: titles[i],
    description: `تجربة مميزة في ${cities[i % 8]} تقدمها ${providers[i % 8]}، استمتع بأفضل الخدمات والأنشطة المتنوعة المناسبة لجميع الأعمار مع مرشدين محترفين.`,
    provider: providers[i % 8],
    category: categories[i % 8],
    city: cities[i % 8],
    price: [2500, 1800, 3200, 4500, 1500, 2800, 3600, 5000][i % 8] + (i * 50),
    originalPrice: i % 3 === 0 ? [3000, 2200, 4000, 5500][i % 4] + (i * 50) : undefined,
    duration: ['ساعتان', '٣ ساعات', 'نصف يوم', 'يوم كامل', 'يومان', '٣ أيام'][i % 6],
    maxGuests: [4, 8, 10, 15, 20, 6, 12, 25][i % 8],
    images: [],
    includes: ['مرشد سياحي', 'مشروبات', 'وجبة خفيفة', 'تأمين', 'انتقالات', 'معدات'][i % 6].split(','),
    excludes: ['الإقامة', 'التذاكر الشخصية', 'البقشيش'].slice(0, i % 3),
    status: statuses[i % 8],
    featured: i % 5 === 0,
    rating: Number((3.5 + (i % 5) * 0.4).toFixed(1)),
    reviewCount: 10 + i * 3,
    bookingsCount: 5 + i * 4,
    createdAt: new Date(2025, i % 12, 1 + (i % 25)).toISOString(),
  };
});

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: JSX.Element; color: string }) {
  return (
    <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5 hover:border-theme-gold/25 transition-all">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg`}>{icon}</div>
      <p className="text-2xl md:text-3xl font-bold font-playfair text-theme mb-0.5">{typeof value === 'number' ? value.toLocaleString('ar-EG') : value}</p>
      <p className="text-xs text-theme-muted font-cairo">{label}</p>
    </motion.div>
  );
}

export default function ExperiencesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ExpStatus | ''>('');
  const [catFilter, setCatFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [providerFilter, setProviderFilter] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailExp, setDetailExp] = useState<Experience | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ type: string; exp: Experience } | null>(null);

  const filtered = useMemo(() => {
    return SAMPLE_EXPERIENCES.filter((e) => {
      if (search && !e.title.includes(search) && !e.id.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter && e.status !== statusFilter) return false;
      if (catFilter && e.category !== catFilter) return false;
      if (cityFilter && e.city !== cityFilter) return false;
      if (providerFilter && e.provider !== providerFilter) return false;
      if (minPrice && e.price < Number(minPrice)) return false;
      if (maxPrice && e.price > Number(maxPrice)) return false;
      return true;
    });
  }, [search, statusFilter, catFilter, cityFilter, providerFilter, minPrice, maxPrice]);

  const stats = useMemo(() => {
    const total = SAMPLE_EXPERIENCES.length;
    const published = SAMPLE_EXPERIENCES.filter((e) => e.status === 'PUBLISHED').length;
    const draft = SAMPLE_EXPERIENCES.filter((e) => e.status === 'DRAFT').length;
    const featured = SAMPLE_EXPERIENCES.filter((e) => e.featured).length;
    const pending = SAMPLE_EXPERIENCES.filter((e) => e.status === 'PENDING_REVIEW').length;
    return { total, published, draft, featured, pending };
  }, []);

  const categories = useMemo(() => [...new Set(SAMPLE_EXPERIENCES.map((e) => e.category))], []);
  const cities = useMemo(() => [...new Set(SAMPLE_EXPERIENCES.map((e) => e.city))], []);

  const handleAction = (type: string, exp: Experience) => setConfirmModal({ type, exp });

  const executeAction = () => {
    if (!confirmModal) return;
    setConfirmModal(null);
    setShowDetailModal(false);
  };

  const openEdit = (exp?: Experience) => {
    setEditingExp(exp || null);
    setShowEditModal(true);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">إدارة التجارب</h1>
            <p className="text-sm text-theme-muted font-cairo">إدارة وتحرير التجارب المتاحة على المنصة</p>
          </div>
          <button onClick={() => openEdit()} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            إضافة تجربة
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard label="إجمالي التجارب" value={stats.total} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>} color="from-blue-500 to-blue-600" />
        <StatCard label="منشورة" value={stats.published} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>} color="from-emerald-500 to-emerald-600" />
        <StatCard label="مسودة" value={stats.draft} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>} color="from-amber-500 to-amber-600" />
        <StatCard label="مميزة" value={stats.featured} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>} color="from-purple-500 to-purple-600" />
        <StatCard label="قيد المراجعة" value={stats.pending} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>} color="from-cyan-500 to-cyan-600" />
      </div>

      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="md:col-span-2">
            <input type="text" placeholder="🔍 بحث بالعنوان أو المعرف..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:border-theme-gold/40 focus:outline-none transition-all font-cairo" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as ExpStatus | '')}
            className="px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:border-theme-gold/40 focus:outline-none">
            <option value="">كل الحالات</option>
            {Object.entries(EXP_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:border-theme-gold/40 focus:outline-none">
            <option value="">كل التصنيفات</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:border-theme-gold/40 focus:outline-none">
            <option value="">كل المدن</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input type="number" placeholder="أقل سعر" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:border-theme-gold/40 focus:outline-none font-english" />
          <input type="number" placeholder="أقصى سعر" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:border-theme-gold/40 focus:outline-none font-english" />
          <input type="text" placeholder="مزود الخدمة" value={providerFilter} onChange={(e) => setProviderFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:border-theme-gold/40 focus:outline-none font-cairo" />
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-theme-gold/10 bg-theme-surface/50">
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">المعرف</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">العنوان</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">مزود الخدمة</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">التصنيف</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">المدينة</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">السعر</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">الحالة</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">مميز</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">التقييم</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">الحجوزات</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e, i) => (
                <motion.tr key={e.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                  className={`border-b border-theme-gold/5 hover:bg-theme-gold/[0.02] transition-colors ${i % 2 === 0 ? 'bg-theme-surface/20' : ''}`}>
                  <td className="px-4 py-3 text-xs text-theme-gold font-mono">{e.id}</td>
                  <td className="px-4 py-3 text-xs text-theme font-cairo truncate max-w-[140px]">{e.title}</td>
                  <td className="px-4 py-3 text-xs text-theme font-cairo">{e.provider}</td>
                  <td className="px-4 py-3 text-xs text-theme-muted font-cairo">{e.category}</td>
                  <td className="px-4 py-3 text-xs text-theme font-cairo">{e.city}</td>
                  <td className="px-4 py-3 text-xs font-english text-theme">
                    {e.originalPrice && <span className="line-through text-theme-muted ml-1">{e.originalPrice.toLocaleString('ar-EG')}</span>}
                    {e.price.toLocaleString('ar-EG')} ج.م
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${EXP_STATUS[e.status].color}`}>{EXP_STATUS[e.status].label}</span>
                  </td>
                  <td className="px-4 py-3">
                    {e.featured ? (
                      <span className="text-amber-400 text-base">★</span>
                    ) : (
                      <span className="text-theme-muted/30 text-base">☆</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-theme-gold">★</span>
                      <span className="font-english text-theme">{e.rating.toFixed(1)}</span>
                      <span className="text-theme-muted text-[10px] font-cairo">({e.reviewCount})</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-english text-theme">{e.bookingsCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {e.status === 'PUBLISHED' && (
                        <button onClick={() => handleAction('unpublish', e)} className="px-2 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-[10px] font-bold hover:bg-amber-500/20 transition-all">إلغاء النشر</button>
                      )}
                      {e.status === 'DRAFT' && (
                        <button onClick={() => handleAction('publish', e)} className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-bold hover:bg-emerald-500/20 transition-all">نشر</button>
                      )}
                      <button onClick={() => handleAction('feature', e)} className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${e.featured ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' : 'bg-theme-surface text-theme-muted hover:text-theme-gold'}`}>
                        {e.featured ? 'إلغاء التمييز' : 'تمييز'}
                      </button>
                      <button onClick={() => openEdit(e)} className="px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-bold hover:bg-blue-500/20 transition-all">تعديل</button>
                      <button onClick={() => { setDetailExp(e); setShowDetailModal(true); }}
                        className="px-2 py-1 rounded-lg bg-theme-gold/10 text-theme-gold text-[10px] font-bold hover:bg-theme-gold/20 transition-all">عرض</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12"><p className="text-theme-muted font-cairo text-sm">لا توجد تجارب تطابق البحث</p></div>
          )}
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-theme-gold/10">
          <span className="text-[10px] text-theme-muted font-cairo">إجمالي النتائج: {filtered.length}</span>
        </div>
      </motion.div>

      {showEditModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-2xl rounded-2xl border border-theme-gold/10 bg-theme-card p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold font-playfair text-theme">{editingExp ? 'تعديل تجربة' : 'إضافة تجربة جديدة'}</h2>
              <button onClick={() => setShowEditModal(false)} className="p-2 rounded-xl hover:bg-theme-surface text-theme-muted">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="md:col-span-2">
                <label className="block text-[10px] text-theme-muted font-cairo mb-1.5">عنوان التجربة</label>
                <input type="text" defaultValue={editingExp?.title} className="w-full px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:border-theme-gold/40 focus:outline-none font-cairo" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] text-theme-muted font-cairo mb-1.5">الوصف</label>
                <textarea rows={3} defaultValue={editingExp?.description} className="w-full px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:border-theme-gold/40 focus:outline-none font-cairo resize-none" />
              </div>
              <div>
                <label className="block text-[10px] text-theme-muted font-cairo mb-1.5">مزود الخدمة</label>
                <input type="text" defaultValue={editingExp?.provider} className="w-full px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm focus:border-theme-gold/40 focus:outline-none font-cairo" />
              </div>
              <div>
                <label className="block text-[10px] text-theme-muted font-cairo mb-1.5">التصنيف</label>
                <select defaultValue={editingExp?.category} className="w-full px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm focus:border-theme-gold/40 focus:outline-none font-cairo">
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-theme-muted font-cairo mb-1.5">المدينة</label>
                <select defaultValue={editingExp?.city} className="w-full px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm focus:border-theme-gold/40 focus:outline-none font-cairo">
                  {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-theme-muted font-cairo mb-1.5">السعر (ج.م)</label>
                <input type="number" defaultValue={editingExp?.price} className="w-full px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm focus:border-theme-gold/40 focus:outline-none font-english" />
              </div>
              <div>
                <label className="block text-[10px] text-theme-muted font-cairo mb-1.5">المدة</label>
                <input type="text" defaultValue={editingExp?.duration} className="w-full px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm focus:border-theme-gold/40 focus:outline-none font-cairo" />
              </div>
              <div>
                <label className="block text-[10px] text-theme-muted font-cairo mb-1.5">الحد الأقصى للضيوف</label>
                <input type="number" defaultValue={editingExp?.maxGuests} className="w-full px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm focus:border-theme-gold/40 focus:outline-none font-english" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] text-theme-muted font-cairo mb-1.5">وسوم (مفصولة بفاصلة)</label>
                <input type="text" placeholder="مغامرة, صحراء, عائلة" className="w-full px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:border-theme-gold/40 focus:outline-none font-cairo" />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowEditModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-theme-gold/20 text-theme-gold text-sm font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
              <button onClick={() => { setShowEditModal(false); }} className="flex-1 px-4 py-2.5 rounded-xl bg-theme-gold text-dark-900 text-sm font-bold font-cairo hover:opacity-90 transition-all">
                {editingExp ? 'حفظ التغييرات' : 'إضافة التجربة'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {showDetailModal && detailExp && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-2xl rounded-2xl border border-theme-gold/10 bg-theme-card p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold font-playfair text-theme">تفاصيل التجربة</h2>
              <button onClick={() => setShowDetailModal(false)} className="p-2 rounded-xl hover:bg-theme-surface text-theme-muted">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div><p className="text-[10px] text-theme-muted font-cairo">المعرف</p><p className="text-sm text-theme-gold font-mono">{detailExp.id}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">العنوان</p><p className="text-sm text-theme font-cairo">{detailExp.title}</p></div>
              <div className="col-span-2"><p className="text-[10px] text-theme-muted font-cairo">الوصف</p><p className="text-sm text-theme font-cairo">{detailExp.description}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">مزود الخدمة</p><p className="text-sm text-theme font-cairo">{detailExp.provider}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">التصنيف</p><p className="text-sm text-theme font-cairo">{detailExp.category}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">المدينة</p><p className="text-sm text-theme font-cairo">{detailExp.city}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">السعر</p><p className="text-sm text-theme font-english">{detailExp.price.toLocaleString('ar-EG')} ج.م</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">المدة</p><p className="text-sm text-theme font-cairo">{detailExp.duration}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">الحد الأقصى</p><p className="text-sm text-theme font-english">{detailExp.maxGuests} ضيوف</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">التقييم</p><p className="text-sm text-theme font-english">{detailExp.rating.toFixed(1)} ★ ({detailExp.reviewCount} تقييم)</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">الحجوزات</p><p className="text-sm text-theme font-english">{detailExp.bookingsCount}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">الحالة</p><span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${EXP_STATUS[detailExp.status].color}`}>{EXP_STATUS[detailExp.status].label}</span></div>
            </div>
            {detailExp.includes.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs font-bold font-cairo text-theme mb-2">يشمل:</h3>
                <div className="flex flex-wrap gap-2">
                  {detailExp.includes.map((item, i) => (
                    <span key={i} className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-cairo">{item}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {confirmModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md rounded-2xl border border-theme-gold/10 bg-theme-card p-6">
            <div className="text-center mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                confirmModal.type === 'publish' || confirmModal.type === 'feature' ? 'bg-emerald-500/10' : 'bg-amber-500/10'
              }`}>
                <svg className={`w-8 h-8 ${confirmModal.type === 'publish' || confirmModal.type === 'feature' ? 'text-emerald-400' : 'text-amber-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d={confirmModal.type === 'unpublish' || confirmModal.type === 'unfeature' ? 'M6 18L18 6M6 6l12 12' : 'M5 13l4 4L19 7'} />
                </svg>
              </div>
              <h3 className="text-lg font-bold font-playfair text-theme mb-2">
                {confirmModal.type === 'publish' && 'نشر التجربة'}
                {confirmModal.type === 'unpublish' && 'إلغاء نشر التجربة'}
                {confirmModal.type === 'feature' && 'تمييز التجربة'}
                {confirmModal.type === 'unfeature' && 'إلغاء تمييز التجربة'}
              </h3>
              <p className="text-sm text-theme-muted font-cairo">
                {confirmModal.type === 'publish' && `هل أنت متأكد من نشر "${confirmModal.exp.title}"؟`}
                {confirmModal.type === 'unpublish' && `هل أنت متأكد من إلغاء نشر "${confirmModal.exp.title}"؟`}
                {confirmModal.type === 'feature' && `هل أنت متأكد من تمييز "${confirmModal.exp.title}" كمميزة؟`}
                {confirmModal.type === 'unfeature' && `هل أنت متأكد من إلغاء تمييز "${confirmModal.exp.title}"؟`}
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setConfirmModal(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-theme-gold/20 text-theme-gold text-sm font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
              <button onClick={executeAction} className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold font-cairo transition-all ${
                confirmModal.type === 'unpublish' ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-theme-gold text-dark-900 hover:opacity-90'
              }`}>تأكيد</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
