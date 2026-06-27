'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

interface Coupon {
  id: string; code: string; type: 'percentage' | 'fixed'; value: number; minPurchase: number;
  maxUses: number; usedCount: number; expiry: string; status: 'ACTIVE' | 'EXPIRED' | 'DISABLED' | 'SCHEDULED';
  description: string; createdAt: string; totalDiscount: number;
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  ACTIVE: { label: 'نشط', color: 'text-emerald-400 bg-emerald-500/10' },
  EXPIRED: { label: 'منتهي', color: 'text-red-400 bg-red-500/10' },
  DISABLED: { label: 'معطل', color: 'text-amber-400 bg-amber-500/10' },
  SCHEDULED: { label: 'مجدول', color: 'text-blue-400 bg-blue-500/10' },
};

const MOCK_COUPONS: Coupon[] = [
  { id: 'cp-01', code: 'EGYPT15', type: 'percentage', value: 15, minPurchase: 1000, maxUses: 100, usedCount: 34, expiry: '2025-06-30', status: 'ACTIVE', description: 'خصم 15% على جميع الحجوزات', createdAt: '2025-01-01', totalDiscount: 51000 },
  { id: 'cp-02', code: 'REDSEA20', type: 'percentage', value: 20, minPurchase: 2000, maxUses: 50, usedCount: 18, expiry: '2025-05-15', status: 'ACTIVE', description: 'خصم 20% على رحلات البحر الأحمر', createdAt: '2025-01-05', totalDiscount: 36000 },
  { id: 'cp-03', code: 'WELCOME100', type: 'fixed', value: 100, minPurchase: 500, maxUses: 500, usedCount: 412, expiry: '2025-12-31', status: 'ACTIVE', description: 'خصم 100 جنيه لأول حجز', createdAt: '2024-06-01', totalDiscount: 41200 },
  { id: 'cp-04', code: 'NILE50', type: 'fixed', value: 50, minPurchase: 300, maxUses: 200, usedCount: 156, expiry: '2025-03-20', status: 'EXPIRED', description: 'خصم 50 جنيه على الرحلات النيلية', createdAt: '2024-09-01', totalDiscount: 7800 },
  { id: 'cp-05', code: 'SUMMER25', type: 'percentage', value: 25, minPurchase: 3000, maxUses: 30, usedCount: 5, expiry: '2025-08-31', status: 'ACTIVE', description: 'خصم 25% على الحجوزات الصيفية', createdAt: '2025-02-01', totalDiscount: 15000 },
  { id: 'cp-06', code: 'DIVING10', type: 'percentage', value: 10, minPurchase: 1500, maxUses: 75, usedCount: 22, expiry: '2025-04-30', status: 'SCHEDULED', description: 'خصم 10% على أنشطة الغوص', createdAt: '2025-03-01', totalDiscount: 8800 },
  { id: 'cp-07', code: 'VIP200', type: 'fixed', value: 200, minPurchase: 2000, maxUses: 20, usedCount: 20, expiry: '2025-02-28', status: 'EXPIRED', description: 'خصم VIP 200 جنيه', createdAt: '2024-12-01', totalDiscount: 4000 },
  { id: 'cp-08', code: 'BLACK50', type: 'percentage', value: 50, minPurchase: 5000, maxUses: 10, usedCount: 0, expiry: '2025-11-30', status: 'DISABLED', description: 'خصم 50% - مؤقت', createdAt: '2025-01-15', totalDiscount: 0 },
  { id: 'cp-09', code: 'SAFARI30', type: 'percentage', value: 30, minPurchase: 2500, maxUses: 40, usedCount: 11, expiry: '2025-07-15', status: 'ACTIVE', description: 'خصم 30% على رحلات السفاري', createdAt: '2025-02-10', totalDiscount: 22000 },
  { id: 'cp-10', code: 'LOYALTY75', type: 'fixed', value: 75, minPurchase: 400, maxUses: 300, usedCount: 89, expiry: '2025-09-30', status: 'ACTIVE', description: 'خصم ولاء 75 جنيه', createdAt: '2024-10-01', totalDiscount: 6675 },
  { id: 'cp-11', code: 'RAMADAN20', type: 'percentage', value: 20, minPurchase: 1000, maxUses: 150, usedCount: 67, expiry: '2025-04-10', status: 'EXPIRED', description: 'خصم رمضان 20%', createdAt: '2025-02-20', totalDiscount: 40200 },
  { id: 'cp-12', code: 'NEWUSER50', type: 'fixed', value: 50, minPurchase: 200, maxUses: 1000, usedCount: 523, expiry: '2025-12-31', status: 'ACTIVE', description: 'خصم 50 جنيه للمستخدمين الجدد', createdAt: '2024-06-15', totalDiscount: 26150 },
  { id: 'cp-13', code: 'FAMILY100', type: 'fixed', value: 100, minPurchase: 3000, maxUses: 25, usedCount: 8, expiry: '2025-06-01', status: 'SCHEDULED', description: 'خصم عائلي 100 جنيه', createdAt: '2025-03-10', totalDiscount: 800 },
  { id: 'cp-14', code: 'HOTEL15', type: 'percentage', value: 15, minPurchase: 2000, maxUses: 60, usedCount: 14, expiry: '2025-05-20', status: 'DISABLED', description: 'خصم 15% على الفنادق', createdAt: '2025-01-20', totalDiscount: 8400 },
  { id: 'cp-15', code: 'EID40', type: 'percentage', value: 40, minPurchase: 4000, maxUses: 15, usedCount: 15, expiry: '2025-04-05', status: 'EXPIRED', description: 'خصم العيد 40%', createdAt: '2025-03-15', totalDiscount: 60000 },
  { id: 'cp-16', code: 'WINTER10', type: 'percentage', value: 10, minPurchase: 500, maxUses: 200, usedCount: 43, expiry: '2025-03-01', status: 'EXPIRED', description: 'خصم الشتاء 10%', createdAt: '2024-12-01', totalDiscount: 12900 },
  { id: 'cp-17', code: 'PARTNER25', type: 'fixed', value: 25, minPurchase: 150, maxUses: 0, usedCount: 0, expiry: '2025-12-31', status: 'DISABLED', description: 'خصم شريك - غير مفعل', createdAt: '2025-01-01', totalDiscount: 0 },
  { id: 'cp-18', code: 'GOLD20', type: 'percentage', value: 20, minPurchase: 5000, maxUses: 5, usedCount: 2, expiry: '2025-10-31', status: 'ACTIVE', description: 'خصم ذهبي 20%', createdAt: '2025-03-01', totalDiscount: 20000 },
  { id: 'cp-19', code: 'FLASH60', type: 'percentage', value: 60, minPurchase: 6000, maxUses: 3, usedCount: 3, expiry: '2025-01-31', status: 'EXPIRED', description: 'خصم فلاش 60%', createdAt: '2025-01-25', totalDiscount: 108000 },
  { id: 'cp-20', code: 'SPRING15', type: 'percentage', value: 15, minPurchase: 800, maxUses: 100, usedCount: 0, expiry: '2025-06-15', status: 'SCHEDULED', description: 'خصم الربيع 15%', createdAt: '2025-04-01', totalDiscount: 0 },
  { id: 'cp-21', code: 'SHARM10', type: 'fixed', value: 10, minPurchase: 100, maxUses: 500, usedCount: 234, expiry: '2025-12-31', status: 'ACTIVE', description: 'خصم شرم الشيخ', createdAt: '2024-07-01', totalDiscount: 2340 },
];

export default function CouponsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Coupon | null>(null);
  const [selected, setSelected] = useState<Coupon | null>(null);

  const stats = useMemo(() => {
    const all = MOCK_COUPONS;
    return {
      total: all.length,
      active: all.filter(c => c.status === 'ACTIVE').length,
      expired: all.filter(c => c.status === 'EXPIRED').length,
      used: all.reduce((s, c) => s + c.usedCount, 0),
      totalDiscount: all.reduce((s, c) => s + c.totalDiscount, 0),
    };
  }, []);

  const filtered = useMemo(() => {
    return MOCK_COUPONS.filter(c => {
      if (search && !c.code.toLowerCase().includes(search.toLowerCase()) && !c.description.includes(search)) return false;
      if (statusFilter && c.status !== statusFilter) return false;
      return true;
    });
  }, [search, statusFilter]);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-playfair font-bold text-theme mb-1">كوبونات الخصم</h1>
            <p className="text-sm text-theme-muted font-cairo">إدارة أكواد الخصم والعروض الترويجية</p>
          </div>
          <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            كوبون جديد
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <p className="text-2xl font-bold font-playfair text-theme mb-0.5">{stats.total}</p>
          <p className="text-xs text-theme-muted font-cairo">إجمالي الكوبونات</p>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <p className="text-2xl font-bold font-playfair text-emerald-400 mb-0.5">{stats.active}</p>
          <p className="text-xs text-theme-muted font-cairo">نشط</p>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <p className="text-2xl font-bold font-playfair text-red-400 mb-0.5">{stats.expired}</p>
          <p className="text-xs text-theme-muted font-cairo">منتهي</p>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <p className="text-2xl font-bold font-playfair text-amber-400 mb-0.5">{stats.used.toLocaleString('ar-EG')}</p>
          <p className="text-xs text-theme-muted font-cairo">مستخدم</p>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <p className="text-2xl font-bold font-playfair text-theme-gold mb-0.5">{stats.totalDiscount.toLocaleString('ar-EG')} ج.م</p>
          <p className="text-xs text-theme-muted font-cairo">إجمالي الخصم</p>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 min-w-[200px]">
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث بكود الكوبون أو الوصف..." className="w-full pr-10 pl-3 py-2 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:outline-none focus:border-theme-gold/40">
            <option value="">كل الحالات</option>
            {Object.entries(STATUS_MAP).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-theme-gold/10">
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">الكود</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">النوع</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">القيمة</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">أقل شراء</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">الاستخدام</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">الانتهاء</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">الحالة</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                  className="border-b border-theme-gold/5 hover:bg-theme-surface/50 transition-colors">
                  <td className="py-3 px-2"><span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-theme-gold/10 text-theme-gold border border-theme-gold/20">{c.code}</span></td>
                  <td className="py-3 px-2 text-xs text-theme font-cairo">{c.type === 'percentage' ? 'نسبة مئوية' : 'قيمة ثابتة'}</td>
                  <td className="py-3 px-2 text-xs text-theme font-cairo">{c.type === 'percentage' ? `${c.value}%` : `${c.value} ج.م`}</td>
                  <td className="py-3 px-2 text-xs text-theme-muted font-cairo">{c.minPurchase.toLocaleString('ar-EG')} ج.م</td>
                  <td className="py-3 px-2 text-xs text-theme font-cairo">{c.usedCount}{c.maxUses > 0 ? ` / ${c.maxUses}` : ''}</td>
                  <td className="py-3 px-2 text-[10px] text-theme-muted font-cairo">{new Date(c.expiry).toLocaleDateString('ar-EG')}</td>
                  <td className="py-3 px-2"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${STATUS_MAP[c.status]?.color}`}>{STATUS_MAP[c.status]?.label}</span></td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelected(c)} className="px-2 py-1 rounded-lg bg-theme-gold/10 text-theme-gold text-[10px] font-bold hover:bg-theme-gold/20 transition-all">إحصائيات</button>
                      <button onClick={() => setDeleteConfirm(c)} className="px-2 py-1 rounded-lg bg-red-500/10 text-red-400 text-[10px] font-bold hover:bg-red-500/20 transition-all">حذف</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-8 text-theme-muted font-cairo text-sm">لا توجد كوبونات مطابقة</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-md rounded-2xl border border-theme-gold/10 bg-theme-card p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold font-cairo text-theme">إحصائيات الكوبون</h2>
                <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-theme-surface text-theme-muted">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div className="text-center mb-6">
                <span className="inline-block px-4 py-1.5 rounded-lg text-lg font-bold font-mono bg-theme-gold/10 text-theme-gold border border-theme-gold/20 mb-3">{selected.code}</span>
                <p className="text-sm text-theme-muted font-cairo">{selected.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-theme-surface border border-theme-border text-center">
                  <p className="text-2xl font-bold font-playfair text-theme mb-1">{selected.usedCount}</p>
                  <p className="text-[10px] text-theme-muted font-cairo">مرات الاستخدام</p>
                </div>
                <div className="p-4 rounded-xl bg-theme-surface border border-theme-border text-center">
                  <p className="text-2xl font-bold font-playfair text-theme-gold mb-1">{selected.totalDiscount.toLocaleString('ar-EG')} ج.م</p>
                  <p className="text-[10px] text-theme-muted font-cairo">إجمالي الخصم</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-theme-muted font-cairo">النوع</span><span className="text-theme font-cairo">{selected.type === 'percentage' ? 'نسبة مئوية' : 'قيمة ثابتة'}</span></div>
                <div className="flex justify-between"><span className="text-theme-muted font-cairo">القيمة</span><span className="text-theme font-cairo">{selected.type === 'percentage' ? `${selected.value}%` : `${selected.value} ج.م`}</span></div>
                <div className="flex justify-between"><span className="text-theme-muted font-cairo">أقل مبلغ للشراء</span><span className="text-theme font-cairo">{selected.minPurchase.toLocaleString('ar-EG')} ج.م</span></div>
                <div className="flex justify-between"><span className="text-theme-muted font-cairo">الحد الأقصى</span><span className="text-theme font-cairo">{selected.maxUses > 0 ? selected.maxUses : 'غير محدود'}</span></div>
                <div className="flex justify-between"><span className="text-theme-muted font-cairo">تاريخ الانتهاء</span><span className="text-theme font-cairo">{new Date(selected.expiry).toLocaleDateString('ar-EG')}</span></div>
                <div className="flex justify-between"><span className="text-theme-muted font-cairo">الحالة</span><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${STATUS_MAP[selected.status]?.color}`}>{STATUS_MAP[selected.status]?.label}</span></div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إغلاق</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-sm rounded-2xl border border-theme-gold/10 bg-theme-card p-6 text-center" onClick={e => e.stopPropagation()}>
              <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center bg-red-500/10 border border-red-500/20">
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16"/></svg>
              </div>
              <h3 className="text-lg font-bold font-cairo text-theme mb-2">حذف الكوبون</h3>
              <p className="text-sm text-theme-muted font-cairo mb-1">هل أنت متأكد من حذف كوبون</p>
              <p className="text-theme-gold font-bold font-mono text-lg mb-5">{deleteConfirm.code}</p>
              <div className="flex gap-2 justify-center">
                <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
                <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold font-cairo hover:bg-red-500/20 transition-all">تأكيد الحذف</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showCreate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto" onClick={() => setShowCreate(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-lg rounded-2xl border border-theme-gold/10 bg-theme-card p-6 my-8" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold font-cairo text-theme">إنشاء كوبون جديد</h2>
                <button onClick={() => setShowCreate(false)} className="p-1 rounded-lg hover:bg-theme-surface text-theme-muted">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-theme-muted font-cairo mb-1.5">كود الكوبون</label>
                  <input placeholder="مثل: SUMMER20" className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-theme-muted font-cairo mb-1.5">نوع الخصم</label>
                    <select className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:outline-none focus:border-theme-gold/40">
                      <option>نسبة مئوية</option>
                      <option>قيمة ثابتة</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-theme-muted font-cairo mb-1.5">القيمة</label>
                    <input type="number" placeholder="20" className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-theme-muted font-cairo mb-1.5">أقل مبلغ للشراء</label>
                    <input type="number" placeholder="1000" className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40" />
                  </div>
                  <div>
                    <label className="block text-xs text-theme-muted font-cairo mb-1.5">الحد الأقصى للاستخدام</label>
                    <input type="number" placeholder="100" className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-theme-muted font-cairo mb-1.5">تاريخ الانتهاء</label>
                    <input type="date" className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm focus:outline-none focus:border-theme-gold/40" />
                  </div>
                  <div>
                    <label className="block text-xs text-theme-muted font-cairo mb-1.5">الحالة</label>
                    <select className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:outline-none focus:border-theme-gold/40">
                      <option>نشط</option>
                      <option>معطل</option>
                      <option>مجدول</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-theme-muted font-cairo mb-1.5">الوصف</label>
                  <textarea rows={3} placeholder="وصف الكوبون..." className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40 resize-none" />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
                <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-all">إنشاء الكوبون</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
