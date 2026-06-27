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

interface Commission {
  id: string; ambassador: string; partner: string; amount: number; type: 'flat' | 'percentage' | 'tier';
  status: 'pending' | 'approved' | 'paid' | 'cancelled'; createdAt: string; paidAt: string | null;
  notes: string; leadRef: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: 'معلق', color: 'text-amber-400 bg-amber-500/10' },
  approved: { label: 'معتمد', color: 'text-blue-400 bg-blue-500/10' },
  paid: { label: 'مدفوع', color: 'text-emerald-400 bg-emerald-500/10' },
  cancelled: { label: 'ملغي', color: 'text-red-400 bg-red-500/10' },
};

const TYPE_LABELS: Record<string, string> = { flat: 'ثابتة', percentage: 'نسبة مئوية', tier: 'متدرجة' };

const MOCK_COMMISSIONS: Commission[] = [
  { id: 'c-001', ambassador: 'أحمد علي', partner: 'فندق رويال ريف', amount: 500, type: 'flat', status: 'paid', createdAt: '2025-01-01', paidAt: '2025-01-10', notes: 'عمولة حجز فندق', leadRef: 'L-1001' },
  { id: 'c-002', ambassador: 'سارة خالد', partner: 'دايف دايف للغوص', amount: 1200, type: 'tier', status: 'pending', createdAt: '2025-01-02', paidAt: null, notes: 'عمولة متدرجة - 3 حجوزات', leadRef: 'L-1002' },
  { id: 'c-003', ambassador: 'محمد حسن', partner: 'مطعم سمك رزق', amount: 350, type: 'flat', status: 'approved', createdAt: '2025-01-03', paidAt: null, notes: 'عمولة حجز مطعم', leadRef: 'L-1003' },
  { id: 'c-004', ambassador: 'نورا إبراهيم', partner: 'سفاري الصحراء', amount: 800, type: 'percentage', status: 'paid', createdAt: '2025-01-04', paidAt: '2025-01-15', notes: '10% من قيمة الحجز', leadRef: 'L-1004' },
  { id: 'c-005', ambassador: 'خالد عبدالله', partner: 'فندق رويال ريف', amount: 1500, type: 'tier', status: 'cancelled', createdAt: '2025-01-05', paidAt: null, notes: 'تم الإلغاء لعدم الإكمال', leadRef: 'L-1005' },
  { id: 'c-006', ambassador: 'هند سليمان', partner: 'بازار خان الخليلي', amount: 200, type: 'flat', status: 'pending', createdAt: '2025-01-06', paidAt: null, notes: 'عمولة شراء', leadRef: 'L-1006' },
  { id: 'c-007', ambassador: 'موسى الطويل', partner: 'شركة ترانسفير شرم', amount: 450, type: 'percentage', status: 'approved', createdAt: '2025-01-07', paidAt: null, notes: '5% من عقود النقل', leadRef: 'L-1007' },
  { id: 'c-008', ambassador: 'ليلى حسن', partner: 'قهوة سي سلام', amount: 100, type: 'flat', status: 'paid', createdAt: '2025-01-08', paidAt: '2025-01-18', notes: 'عمولة ترويج', leadRef: 'L-1008' },
  { id: 'c-009', ambassador: 'أسامة النوبي', partner: 'مركب نيل فيلا', amount: 2800, type: 'tier', status: 'paid', createdAt: '2025-01-09', paidAt: '2025-01-20', notes: 'عمولة tier 3 حجوزات', leadRef: 'L-1009' },
  { id: 'c-010', ambassador: 'نادية جمال', partner: 'دايف دايف للغوص', amount: 650, type: 'percentage', status: 'pending', createdAt: '2025-01-10', paidAt: null, notes: '15% من دورة الغوص', leadRef: 'L-1010' },
  { id: 'c-011', ambassador: 'يوسف عبدالله', partner: 'فول وفلافل أبو العلا', amount: 150, type: 'flat', status: 'paid', createdAt: '2025-01-11', paidAt: '2025-01-21', notes: 'عمولة إحالة', leadRef: 'L-1011' },
  { id: 'c-012', ambassador: 'مريم عادل', partner: 'سفاري الصحراء', amount: 950, type: 'tier', status: 'cancelled', createdAt: '2025-01-12', paidAt: null, notes: 'تم إلغاء الحجز', leadRef: 'L-1012' },
  { id: 'c-013', ambassador: 'أحمد علي', partner: 'فندق رويال ريف', amount: 750, type: 'flat', status: 'approved', createdAt: '2025-01-13', paidAt: null, notes: 'عمولة حجز ثاني', leadRef: 'L-1013' },
  { id: 'c-014', ambassador: 'سارة خالد', partner: 'مطعم سمك رزق', amount: 180, type: 'percentage', status: 'pending', createdAt: '2025-01-14', paidAt: null, notes: '8% من فاتورة', leadRef: 'L-1014' },
  { id: 'c-015', ambassador: 'محمد حسن', partner: 'بازار خان الخليلي', amount: 300, type: 'flat', status: 'paid', createdAt: '2025-01-15', paidAt: '2025-01-25', notes: 'عمولة تسويق', leadRef: 'L-1015' },
  { id: 'c-016', ambassador: 'نورا إبراهيم', partner: 'ترانسفير شرم', amount: 520, type: 'tier', status: 'approved', createdAt: '2025-01-16', paidAt: null, notes: 'مستوى tier 2', leadRef: 'L-1016' },
  { id: 'c-017', ambassador: 'خالد عبدالله', partner: 'قهوة سي سلام', amount: 90, type: 'flat', status: 'pending', createdAt: '2025-01-17', paidAt: null, notes: 'عمولة برنامج ولاء', leadRef: 'L-1017' },
  { id: 'c-018', ambassador: 'هند سليمان', partner: 'دايف دايف للغوص', amount: 1100, type: 'percentage', status: 'paid', createdAt: '2025-01-18', paidAt: '2025-01-28', notes: '12% من باقة الغوص', leadRef: 'L-1018' },
  { id: 'c-019', ambassador: 'موسى الطويل', partner: 'فندق رويال ريف', amount: 2000, type: 'tier', status: 'cancelled', createdAt: '2025-01-19', paidAt: null, notes: 'إلغاء بسبب عدم الدفع', leadRef: 'L-1019' },
  { id: 'c-020', ambassador: 'ليلى حسن', partner: 'مطعم سمك رزق', amount: 250, type: 'flat', status: 'approved', createdAt: '2025-01-20', paidAt: null, notes: 'عمولة حجز جماعي', leadRef: 'L-1020' },
  { id: 'c-021', ambassador: 'أسامة النوبي', partner: 'سفاري الصحراء', amount: 720, type: 'percentage', status: 'pending', createdAt: '2025-01-21', paidAt: null, notes: 'عمولة 8%', leadRef: 'L-1021' },
  { id: 'c-022', ambassador: 'نادية جمال', partner: 'فول وفلافل أبو العلا', amount: 130, type: 'flat', status: 'paid', createdAt: '2025-01-22', paidAt: '2025-01-30', notes: 'عمولة إحالة مطعم', leadRef: 'L-1022' },
  { id: 'c-023', ambassador: 'يوسف عبدالله', partner: 'فندق رويال ريف', amount: 3200, type: 'tier', status: 'approved', createdAt: '2025-01-23', paidAt: null, notes: 'مستوى tier 3 - حجوزات متعددة', leadRef: 'L-1023' },
  { id: 'c-024', ambassador: 'مريم عادل', partner: 'بازار خان الخليلي', amount: 0, type: 'flat', status: 'cancelled', createdAt: '2025-01-24', paidAt: null, notes: 'تم الإلغاء', leadRef: 'L-1024' },
  { id: 'c-025', ambassador: 'أحمد علي', partner: 'دايف دايف للغوص', amount: 890, type: 'percentage', status: 'pending', createdAt: '2025-01-25', paidAt: null, notes: '10% من حجز غوص', leadRef: 'L-1025' },
  { id: 'c-026', ambassador: 'سارة خالد', partner: 'ترانسفير شرم', amount: 410, type: 'flat', status: 'paid', createdAt: '2024-12-20', paidAt: '2025-01-05', notes: 'عمولة عقود نقل', leadRef: 'L-1026' },
];

export default function CommissionsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Commission | null>(null);

  const stats = useMemo(() => {
    const all = MOCK_COMMISSIONS;
    return {
      total: all.length,
      pending: all.filter(c => c.status === 'pending').length,
      paid: all.filter(c => c.status === 'paid').length,
      cancelled: all.filter(c => c.status === 'cancelled').length,
      totalAmount: all.reduce((s, c) => s + c.amount, 0),
    };
  }, []);

  const filtered = useMemo(() => {
    return MOCK_COMMISSIONS.filter(c => {
      if (activeTab !== 'all' && c.status !== activeTab) return false;
      if (search && !c.ambassador.includes(search) && !c.partner.includes(search) && !c.id.includes(search)) return false;
      return true;
    });
  }, [activeTab, search]);

  const summary = useMemo(() => ({
    pendingAmount: MOCK_COMMISSIONS.filter(c => c.status === 'pending').reduce((s, c) => s + c.amount, 0),
    paidAmount: MOCK_COMMISSIONS.filter(c => c.status === 'paid').reduce((s, c) => s + c.amount, 0),
  }), []);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-playfair font-bold text-theme mb-1">إدارة العمولات</h1>
            <p className="text-sm text-theme-muted font-cairo">تتبع وإدارة عمولات السفراء والشركاء</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <p className="text-2xl font-bold font-playfair text-theme mb-0.5">{stats.total}</p>
          <p className="text-xs text-theme-muted font-cairo">إجمالي العمولات</p>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <p className="text-2xl font-bold font-playfair text-amber-400 mb-0.5">{stats.pending}</p>
          <p className="text-xs text-theme-muted font-cairo">معلقة</p>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <p className="text-2xl font-bold font-playfair text-emerald-400 mb-0.5">{stats.paid}</p>
          <p className="text-xs text-theme-muted font-cairo">مدفوعة</p>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <p className="text-2xl font-bold font-playfair text-red-400 mb-0.5">{stats.cancelled}</p>
          <p className="text-xs text-theme-muted font-cairo">ملغية</p>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <p className="text-2xl font-bold font-playfair text-theme-gold mb-0.5">{stats.totalAmount.toLocaleString('ar-EG')} ج.م</p>
          <p className="text-xs text-theme-muted font-cairo">إجمالي المبلغ</p>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 min-w-[200px]">
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث بالسفير أو الشريك..." className="w-full pr-10 pl-3 py-2 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40" />
          </div>
          {['all', 'pending', 'paid', 'cancelled'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold font-cairo transition-all ${
                activeTab === tab ? 'bg-theme-gold/10 text-theme-gold border border-theme-gold/20' : 'text-theme-muted hover:text-theme border border-theme-gold/5 hover:border-theme-gold/20'
              }`}>
              {tab === 'all' ? 'الكل' : STATUS_CONFIG[tab]?.label || tab}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-theme-gold/10">
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">المعرف</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">السفير</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">الشريك</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">المبلغ</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">النوع</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">الحالة</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">التاريخ</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                  className="border-b border-theme-gold/5 hover:bg-theme-surface/50 transition-colors">
                  <td className="py-3 px-2 text-xs text-theme-gold font-mono">{c.id}</td>
                  <td className="py-3 px-2 text-xs text-theme font-cairo">{c.ambassador}</td>
                  <td className="py-3 px-2 text-xs text-theme font-cairo">{c.partner}</td>
                  <td className="py-3 px-2 text-xs text-theme font-cairo">{c.amount.toLocaleString('ar-EG')} ج.م</td>
                  <td className="py-3 px-2"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-theme-gold/10 text-theme-gold">{TYPE_LABELS[c.type]}</span></td>
                  <td className="py-3 px-2"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${STATUS_CONFIG[c.status]?.color}`}>{STATUS_CONFIG[c.status]?.label}</span></td>
                  <td className="py-3 px-2 text-[10px] text-theme-muted font-cairo">{new Date(c.createdAt).toLocaleDateString('ar-EG')}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-1">
                      {c.status === 'pending' && (
                        <button onClick={() => setSelected(c)}
                          className="px-2 py-1 rounded-lg bg-theme-gold/10 text-theme-gold text-[10px] font-bold hover:bg-theme-gold/20 transition-all">اعتماد</button>
                      )}
                      <button onClick={() => setSelected(c)}
                        className="px-2 py-1 rounded-lg bg-theme-surface border border-theme-border text-theme-muted text-[10px] font-bold hover:border-theme-gold/20 transition-all">تفاصيل</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-8 text-theme-muted font-cairo text-sm">لا توجد عمولات مطابقة</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <h3 className="text-sm font-bold font-cairo text-theme mb-3">ملخص العمولات المعلقة</h3>
          <p className="text-3xl font-bold font-playfair text-amber-400 mb-1">{summary.pendingAmount.toLocaleString('ar-EG')} ج.م</p>
          <p className="text-xs text-theme-muted font-cairo">إجمالي المبالغ المعلقة</p>
          <div className="mt-3 h-2 rounded-full bg-theme-surface overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-l from-amber-500 to-amber-400" style={{ width: `${stats.totalAmount > 0 ? (summary.pendingAmount / stats.totalAmount) * 100 : 0}%` }} />
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <h3 className="text-sm font-bold font-cairo text-theme mb-3">ملخص العمولات المدفوعة</h3>
          <p className="text-3xl font-bold font-playfair text-emerald-400 mb-1">{summary.paidAmount.toLocaleString('ar-EG')} ج.م</p>
          <p className="text-xs text-theme-muted font-cairo">إجمالي المبالغ المدفوعة</p>
          <div className="mt-3 h-2 rounded-full bg-theme-surface overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-l from-emerald-500 to-emerald-400" style={{ width: `${stats.totalAmount > 0 ? (summary.paidAmount / stats.totalAmount) * 100 : 0}%` }} />
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-lg rounded-2xl border border-theme-gold/10 bg-theme-card p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold font-cairo text-theme">تفاصيل العمولة</h2>
                <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-theme-surface text-theme-muted">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div><p className="text-[10px] text-theme-muted font-cairo mb-0.5">المعرف</p><p className="text-sm text-theme font-mono">{selected.id}</p></div>
                <div><p className="text-[10px] text-theme-muted font-cairo mb-0.5">مرجع العميل</p><p className="text-sm text-theme font-mono">{selected.leadRef}</p></div>
                <div><p className="text-[10px] text-theme-muted font-cairo mb-0.5">السفير</p><p className="text-sm text-theme font-cairo">{selected.ambassador}</p></div>
                <div><p className="text-[10px] text-theme-muted font-cairo mb-0.5">الشريك</p><p className="text-sm text-theme font-cairo">{selected.partner}</p></div>
                <div><p className="text-[10px] text-theme-muted font-cairo mb-0.5">المبلغ</p><p className="text-lg font-bold font-playfair text-theme-gold">{selected.amount.toLocaleString('ar-EG')} ج.م</p></div>
                <div><p className="text-[10px] text-theme-muted font-cairo mb-0.5">النوع</p><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-theme-gold/10 text-theme-gold">{TYPE_LABELS[selected.type]}</span></div>
                <div><p className="text-[10px] text-theme-muted font-cairo mb-0.5">الحالة</p><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${STATUS_CONFIG[selected.status]?.color}`}>{STATUS_CONFIG[selected.status]?.label}</span></div>
                <div><p className="text-[10px] text-theme-muted font-cairo mb-0.5">تاريخ الإنشاء</p><p className="text-sm text-theme font-cairo">{new Date(selected.createdAt).toLocaleDateString('ar-EG')}</p></div>
                {selected.paidAt && (<div><p className="text-[10px] text-theme-muted font-cairo mb-0.5">تاريخ الدفع</p><p className="text-sm text-theme font-cairo">{new Date(selected.paidAt).toLocaleDateString('ar-EG')}</p></div>)}
              </div>
              <div className="p-3 rounded-xl bg-theme-surface border border-theme-border mb-6">
                <p className="text-[10px] text-theme-muted font-cairo mb-1">ملاحظات</p>
                <p className="text-sm text-theme font-cairo">{selected.notes}</p>
              </div>
              <div className="flex gap-2 justify-end">
                {selected.status === 'pending' && (
                  <>
                    <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
                    <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold font-cairo hover:bg-emerald-500/20 transition-all">اعتماد</button>
                  </>
                )}
                {selected.status === 'approved' && (
                  <>
                    <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
                    <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-opacity">تأكيد الدفع</button>
                  </>
                )}
                {(selected.status === 'paid' || selected.status === 'cancelled') && (
                  <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إغلاق</button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
