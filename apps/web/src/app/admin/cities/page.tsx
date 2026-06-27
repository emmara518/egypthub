'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface City {
  id: number;
  nameAr: string;
  nameEn: string;
  region: string;
  partnersCount: number;
  ambassadorsCount: number;
  status: 'active' | 'inactive';
  lat?: number;
  lng?: number;
  image?: string;
}

const initialCities: City[] = [
  { id: 1, nameAr: 'القاهرة', nameEn: 'Cairo', region: 'القاهرة الكبرى', partnersCount: 128, ambassadorsCount: 45, status: 'active' },
  { id: 2, nameAr: 'الإسكندرية', nameEn: 'Alexandria', region: 'الساحل الشمالي', partnersCount: 89, ambassadorsCount: 32, status: 'active' },
  { id: 3, nameAr: 'الأقصر', nameEn: 'Luxor', region: 'صعيد مصر', partnersCount: 56, ambassadorsCount: 18, status: 'active' },
  { id: 4, nameAr: 'أسوان', nameEn: 'Aswan', region: 'صعيد مصر', partnersCount: 42, ambassadorsCount: 12, status: 'active' },
  { id: 5, nameAr: 'الغردقة', nameEn: 'Hurghada', region: 'البحر الأحمر', partnersCount: 97, ambassadorsCount: 28, status: 'active' },
  { id: 6, nameAr: 'شرم الشيخ', nameEn: 'Sharm el-Sheikh', region: 'جنوب سيناء', partnersCount: 74, ambassadorsCount: 22, status: 'active' },
  { id: 7, nameAr: 'الجيزة', nameEn: 'Giza', region: 'القاهرة الكبرى', partnersCount: 63, ambassadorsCount: 15, status: 'active' },
  { id: 8, nameAr: 'مرسى علم', nameEn: 'Marsa Alam', region: 'البحر الأحمر', partnersCount: 31, ambassadorsCount: 8, status: 'active' },
  { id: 9, nameAr: 'دهب', nameEn: 'Dahab', region: 'جنوب سيناء', partnersCount: 27, ambassadorsCount: 11, status: 'active' },
  { id: 10, nameAr: 'سيوة', nameEn: 'Siwa', region: 'الصحراء الغربية', partnersCount: 14, ambassadorsCount: 4, status: 'active' },
  { id: 11, nameAr: 'بورسعيد', nameEn: 'Port Said', region: 'قناة السويس', partnersCount: 22, ambassadorsCount: 6, status: 'inactive' },
  { id: 12, nameAr: 'الأقصر الجديدة', nameEn: 'New Luxor', region: 'صعيد مصر', partnersCount: 8, ambassadorsCount: 2, status: 'inactive' },
  { id: 13, nameAr: 'العلمين', nameEn: 'El Alamein', region: 'الساحل الشمالي', partnersCount: 35, ambassadorsCount: 9, status: 'active' },
  { id: 14, nameAr: 'رأس سدر', nameEn: 'Ras Sedr', region: 'جنوب سيناء', partnersCount: 11, ambassadorsCount: 3, status: 'inactive' },
  { id: 15, nameAr: 'المنصورة', nameEn: 'Mansoura', region: 'الدلتا', partnersCount: 19, ambassadorsCount: 5, status: 'active' },
  { id: 16, nameAr: 'طنطا', nameEn: 'Tanta', region: 'الدلتا', partnersCount: 16, ambassadorsCount: 4, status: 'inactive' },
];

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function CitiesPage() {
  const [cities, setCities] = useState<City[]>(initialCities);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<{ open: boolean; edit?: City }>({ open: false });
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return cities;
    const q = search.toLowerCase();
    return cities.filter(c => c.nameAr.includes(q) || c.nameEn.toLowerCase().includes(q) || c.region.includes(q));
  }, [cities, search]);

  const stats = useMemo(() => ({
    total: cities.length,
    active: cities.filter(c => c.status === 'active').length,
    inactive: cities.filter(c => c.status === 'inactive').length,
    totalPartners: cities.reduce((a, c) => a + c.partnersCount, 0),
  }), [cities]);

  function toggleStatus(id: number) {
    setCities(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c));
  }

  function deleteCity(id: number) {
    setCities(prev => prev.filter(c => c.id !== id));
    setDeleteConfirm(null);
  }

  function saveCity(data: Partial<City>) {
    if (modal.edit) {
      setCities(prev => prev.map(c => c.id === modal.edit!.id ? { ...c, ...data } : c));
    } else {
      const newId = Math.max(...cities.map(c => c.id), 0) + 1;
      setCities(prev => [...prev, { id: newId, nameAr: '', nameEn: '', region: '', partnersCount: 0, ambassadorsCount: 0, status: 'active', ...data }]);
    }
    setModal({ open: false });
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">إدارة المدن</h1>
          <p className="text-sm text-theme-muted font-cairo">إدارة المدن المتاحة على المنصة</p>
        </div>
        <button onClick={() => setModal({ open: true })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          إضافة مدينة
        </button>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي المدن', value: stats.total, color: 'from-blue-500 to-blue-600', icon: '🏙️' },
          { label: 'نشطة', value: stats.active, color: 'from-emerald-500 to-emerald-600', icon: '✅' },
          { label: 'غير نشطة', value: stats.inactive, color: 'from-amber-500 to-amber-600', icon: '⏸️' },
          { label: 'إجمالي الشركاء', value: stats.totalPartners, color: 'from-purple-500 to-purple-600', icon: '🤝' },
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
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث عن مدينة..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-cairo focus:outline-none focus:border-theme-gold/40 transition-all" />
          </div>
          <span className="text-xs text-theme-muted font-cairo">{filtered.length} من {cities.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-theme-gold/10 text-theme-muted text-[11px] font-cairo">
                <th className="pb-3 px-2 font-medium">#</th>
                <th className="pb-3 px-2 font-medium">الاسم (عربي)</th>
                <th className="pb-3 px-2 font-medium">الاسم (إنجليزي)</th>
                <th className="pb-3 px-2 font-medium">المنطقة</th>
                <th className="pb-3 px-2 font-medium">الشركاء</th>
                <th className="pb-3 px-2 font-medium">السفراء</th>
                <th className="pb-3 px-2 font-medium">الحالة</th>
                <th className="pb-3 px-2 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((city, i) => (
                <motion.tr key={city.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                  className="border-b border-theme-gold/5 hover:bg-theme-gold/5 transition-colors">
                  <td className="py-3 px-2 text-xs text-theme-muted font-english">{city.id}</td>
                  <td className="py-3 px-2 text-sm text-theme font-cairo">{city.nameAr}</td>
                  <td className="py-3 px-2 text-sm text-theme-secondary font-english">{city.nameEn}</td>
                  <td className="py-3 px-2 text-xs text-theme-secondary font-cairo">{city.region}</td>
                  <td className="py-3 px-2 text-xs text-theme font-english">{city.partnersCount}</td>
                  <td className="py-3 px-2 text-xs text-theme font-english">{city.ambassadorsCount}</td>
                  <td className="py-3 px-2">
                    <button onClick={() => toggleStatus(city.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-cairo transition-all ${
                        city.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                      {city.status === 'active' ? 'نشط' : 'غير نشط'}
                    </button>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setModal({ open: true, edit: city })}
                        className="p-1.5 rounded-lg hover:bg-theme-gold/10 text-theme-muted hover:text-theme-gold transition-all">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                      </button>
                      <button onClick={() => setDeleteConfirm(city.id)}
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
          <CityModal
            city={modal.edit}
            onClose={() => setModal({ open: false })}
            onSave={saveCity}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="rounded-2xl border border-red-500/20 bg-theme-card p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold font-cairo text-theme mb-2">تأكيد الحذف</h3>
              <p className="text-sm text-theme-secondary font-cairo mb-6">هل أنت متأكد من حذف هذه المدينة؟ لا يمكن التراجع عن هذا الإجراء.</p>
              <div className="flex items-center gap-3 justify-end">
                <button onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
                <button onClick={() => deleteCity(deleteConfirm)}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white text-xs font-bold font-cairo hover:bg-red-600 transition-all">حذف</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CityModal({ city, onClose, onSave }: { city?: City; onClose: () => void; onSave: (d: Partial<City>) => void }) {
  const [form, setForm] = useState({
    nameAr: city?.nameAr || '',
    nameEn: city?.nameEn || '',
    region: city?.region || '',
    lat: city?.lat?.toString() || '',
    lng: city?.lng?.toString() || '',
    image: city?.image || '',
    status: city?.status || 'active' as const,
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        className="rounded-2xl border border-theme-gold/10 bg-theme-card p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold font-cairo text-theme">{city ? 'تعديل مدينة' : 'إضافة مدينة'}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-theme-gold/10 text-theme-muted hover:text-theme-gold transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div className="space-y-4">
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
            <label className="block text-xs text-theme-muted font-cairo mb-1.5">المنطقة</label>
            <input type="text" value={form.region} onChange={e => setForm(p => ({ ...p, region: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-cairo focus:outline-none focus:border-theme-gold/40" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-theme-muted font-cairo mb-1.5">خط العرض</label>
              <input type="text" value={form.lat} onChange={e => setForm(p => ({ ...p, lat: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-english focus:outline-none focus:border-theme-gold/40" />
            </div>
            <div>
              <label className="block text-xs text-theme-muted font-cairo mb-1.5">خط الطول</label>
              <input type="text" value={form.lng} onChange={e => setForm(p => ({ ...p, lng: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-english focus:outline-none focus:border-theme-gold/40" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-theme-muted font-cairo mb-1.5">رابط الصورة</label>
            <input type="text" value={form.image} onChange={e => setForm(p => ({ ...p, image: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-english focus:outline-none focus:border-theme-gold/40" />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs text-theme-muted font-cairo">نشطة</label>
            <button onClick={() => setForm(p => ({ ...p, status: p.status === 'active' ? 'inactive' : 'active' }))}
              className={`relative w-10 h-5 rounded-full transition-all ${form.status === 'active' ? 'bg-emerald-500' : 'bg-theme-border'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${form.status === 'active' ? 'right-[22px]' : 'right-0.5'}`} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-end mt-6 pt-4 border-t border-theme-gold/10">
          <button onClick={onClose}
            className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
          <button onClick={() => onSave({ ...form, lat: form.lat ? Number(form.lat) : undefined, lng: form.lng ? Number(form.lng) : undefined })}
            className="px-4 py-2 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-all">
            {city ? 'حفظ التغييرات' : 'إضافة'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
