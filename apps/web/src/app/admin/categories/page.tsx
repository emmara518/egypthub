'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Category {
  id: number;
  nameAr: string;
  nameEn: string;
  icon: string;
  partnersCount: number;
  status: 'active' | 'inactive';
  featured: boolean;
  description?: string;
}

const initialCategories: Category[] = [
  { id: 1, nameAr: 'فنادق', nameEn: 'Hotels', icon: '🏨', partnersCount: 45, status: 'active', featured: true, description: 'أفضل الفنادق المصرية' },
  { id: 2, nameAr: 'منتجعات', nameEn: 'Resorts', icon: '🌴', partnersCount: 32, status: 'active', featured: true },
  { id: 3, nameAr: 'مطاعم', nameEn: 'Restaurants', icon: '🍽️', partnersCount: 78, status: 'active', featured: true },
  { id: 4, nameAr: 'مراكز غوص', nameEn: 'Dive Centers', icon: '🤿', partnersCount: 18, status: 'active', featured: false },
  { id: 5, nameAr: 'منظمي رحلات', nameEn: 'Tour Operators', icon: '🚌', partnersCount: 27, status: 'active', featured: true },
  { id: 6, nameAr: 'مواصلات', nameEn: 'Transportation', icon: '🚗', partnersCount: 15, status: 'active', featured: false },
  { id: 7, nameAr: 'تسوق', nameEn: 'Shopping', icon: '🛍️', partnersCount: 22, status: 'active', featured: false },
  { id: 8, nameAr: 'رحلات نيلية', nameEn: 'Nile Cruises', icon: '🚢', partnersCount: 11, status: 'active', featured: true },
  { id: 9, nameAr: 'رحلات صحراوية', nameEn: 'Desert Safaris', icon: '🏜️', partnersCount: 14, status: 'active', featured: false },
  { id: 10, nameAr: 'جولات ثقافية', nameEn: 'Cultural Tours', icon: '🏛️', partnersCount: 20, status: 'active', featured: true },
  { id: 11, nameAr: 'سبا ومساج', nameEn: 'Spa & Massage', icon: '💆', partnersCount: 9, status: 'inactive', featured: false },
  { id: 12, nameAr: 'أنشطة مغامرات', nameEn: 'Adventure Activities', icon: '🧗', partnersCount: 16, status: 'active', featured: false },
  { id: 13, nameAr: 'إقامة منزلية', nameEn: 'Home Stays', icon: '🏡', partnersCount: 7, status: 'inactive', featured: false },
];

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const emojis = ['🏨', '🌴', '🍽️', '🤿', '🚌', '🚗', '🛍️', '🚢', '🏜️', '🏛️', '💆', '🧗', '🏡', '🎭', '🎪', '🕌', '⛵', '🎣', '🐪', '🎈'];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<{ open: boolean; edit?: Category }>({ open: false });
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return categories;
    const q = search.toLowerCase();
    return categories.filter(c => c.nameAr.includes(q) || c.nameEn.toLowerCase().includes(q));
  }, [categories, search]);

  const stats = useMemo(() => ({
    total: categories.length,
    active: categories.filter(c => c.status === 'active').length,
    featured: categories.filter(c => c.featured).length,
  }), [categories]);

  function toggleStatus(id: number) {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c));
  }

  function toggleFeatured(id: number) {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, featured: !c.featured } : c));
  }

  function deleteCategory(id: number) {
    setCategories(prev => prev.filter(c => c.id !== id));
    setDeleteConfirm(null);
  }

  function saveCategory(data: Partial<Category>) {
    if (modal.edit) {
      setCategories(prev => prev.map(c => c.id === modal.edit!.id ? { ...c, ...data } : c));
    } else {
      const newId = Math.max(...categories.map(c => c.id), 0) + 1;
      setCategories(prev => [...prev, { id: newId, nameAr: '', nameEn: '', icon: '📁', partnersCount: 0, status: 'active', featured: false, ...data }]);
    }
    setModal({ open: false });
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">إدارة التصنيفات</h1>
          <p className="text-sm text-theme-muted font-cairo">تصنيفات التجارب والخدمات على المنصة</p>
        </div>
        <button onClick={() => setModal({ open: true })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          إضافة تصنيف
        </button>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
        {[
          { label: 'إجمالي التصنيفات', value: stats.total, color: 'from-blue-500 to-blue-600', icon: '📂' },
          { label: 'نشطة', value: stats.active, color: 'from-emerald-500 to-emerald-600', icon: '✅' },
          { label: 'مميزة', value: stats.featured, color: 'from-amber-500 to-amber-600', icon: '⭐' },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-4 hover:border-theme-gold/25 transition-all">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <span className="text-white text-lg">{s.icon}</span>
            </div>
            <p className="text-2xl font-bold font-playfair text-theme mb-0.5">{s.value}</p>
            <p className="text-xs text-theme-muted font-cairo">{s.label}</p>
          </div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث عن تصنيف..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-cairo focus:outline-none focus:border-theme-gold/40" />
          </div>
          <span className="text-xs text-theme-muted font-cairo">{filtered.length} من {categories.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-theme-gold/10 text-theme-muted text-[11px] font-cairo">
                <th className="pb-3 px-2 font-medium">#</th>
                <th className="pb-3 px-2 font-medium">الأيقونة</th>
                <th className="pb-3 px-2 font-medium">الاسم (عربي)</th>
                <th className="pb-3 px-2 font-medium">الاسم (إنجليزي)</th>
                <th className="pb-3 px-2 font-medium">الشركاء</th>
                <th className="pb-3 px-2 font-medium">مميز</th>
                <th className="pb-3 px-2 font-medium">الحالة</th>
                <th className="pb-3 px-2 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cat, i) => (
                <motion.tr key={cat.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                  className="border-b border-theme-gold/5 hover:bg-theme-gold/5 transition-colors">
                  <td className="py-3 px-2 text-xs text-theme-muted font-english">{cat.id}</td>
                  <td className="py-3 px-2 text-xl">{cat.icon}</td>
                  <td className="py-3 px-2 text-sm text-theme font-cairo">{cat.nameAr}</td>
                  <td className="py-3 px-2 text-sm text-theme-secondary font-english">{cat.nameEn}</td>
                  <td className="py-3 px-2 text-xs text-theme font-english">{cat.partnersCount}</td>
                  <td className="py-3 px-2">
                    <button onClick={() => toggleFeatured(cat.id)}
                      className={`p-1 rounded-lg transition-all ${cat.featured ? 'text-amber-400' : 'text-theme-muted hover:text-amber-400'}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={cat.featured ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </button>
                  </td>
                  <td className="py-3 px-2">
                    <button onClick={() => toggleStatus(cat.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-cairo transition-all ${
                        cat.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                      {cat.status === 'active' ? 'نشط' : 'غير نشط'}
                    </button>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setModal({ open: true, edit: cat })}
                        className="p-1.5 rounded-lg hover:bg-theme-gold/10 text-theme-muted hover:text-theme-gold transition-all">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                      </button>
                      <button onClick={() => setDeleteConfirm(cat.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-theme-muted hover:text-red-400 transition-all">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="py-8 text-center text-theme-muted font-cairo text-sm">لا توجد نتائج</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {modal.open && (
          <CategoryModal
            category={modal.edit}
            onClose={() => setModal({ open: false })}
            onSave={saveCategory}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirm !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="rounded-2xl border border-red-500/20 bg-theme-card p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold font-cairo text-theme mb-2">تأكيد الحذف</h3>
              <p className="text-sm text-theme-secondary font-cairo mb-6">هل أنت متأكد من حذف هذا التصنيف؟</p>
              <div className="flex items-center gap-3 justify-end">
                <button onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
                <button onClick={() => deleteCategory(deleteConfirm)}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white text-xs font-bold font-cairo hover:bg-red-600 transition-all">حذف</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CategoryModal({ category, onClose, onSave }: { category?: Category; onClose: () => void; onSave: (d: Partial<Category>) => void }) {
  const [form, setForm] = useState({
    nameAr: category?.nameAr || '',
    nameEn: category?.nameEn || '',
    icon: category?.icon || '📁',
    description: category?.description || '',
    featured: category?.featured || false,
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        className="rounded-2xl border border-theme-gold/10 bg-theme-card p-6 max-w-lg w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold font-cairo text-theme">{category ? 'تعديل تصنيف' : 'إضافة تصنيف'}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-theme-gold/10 text-theme-muted hover:text-theme-gold transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-theme-muted font-cairo mb-1.5">الأيقونة</label>
            <div className="relative">
              <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="w-14 h-14 rounded-xl bg-theme-surface border border-theme-gold/15 flex items-center justify-center text-2xl hover:border-theme-gold/40 transition-all">
                {form.icon}
              </button>
              {showEmojiPicker && (
                <div className="absolute top-16 right-0 z-10 p-3 rounded-xl bg-theme-card border border-theme-gold/10 shadow-xl w-64">
                  <div className="grid grid-cols-7 gap-1">
                    {emojis.map(e => (
                      <button key={e} onClick={() => { setForm(p => ({ ...p, icon: e })); setShowEmojiPicker(false); }}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-theme-gold/10 text-lg transition-all">
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-theme-muted font-cairo mb-1.5">الاسم (عربي)</label>
              <input type="text" value={form.nameAr} onChange={e => setForm(p => ({ ...p, nameAr: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-cairo focus:outline-none focus:border-theme-gold/40" />
            </div>
            <div>
              <label className="block text-xs text-theme-muted font-cairo mb-1.5">الاسم (إنجليزي)</label>
              <input type="text" value={form.nameEn} onChange={e => setForm(p => ({ ...p, nameEn: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-english focus:outline-none focus:border-theme-gold/40" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-theme-muted font-cairo mb-1.5">الوصف</label>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3}
              className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-cairo focus:outline-none focus:border-theme-gold/40 resize-none" />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs text-theme-muted font-cairo">تصنيف مميز</label>
            <button onClick={() => setForm(p => ({ ...p, featured: !p.featured }))}
              className={`relative w-10 h-5 rounded-full transition-all ${form.featured ? 'bg-amber-500' : 'bg-theme-border'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${form.featured ? 'right-[22px]' : 'right-0.5'}`} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-end mt-6 pt-4 border-t border-theme-gold/10">
          <button onClick={onClose}
            className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
          <button onClick={() => onSave(form)}
            className="px-4 py-2 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-all">
            {category ? 'حفظ التغييرات' : 'إضافة'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
