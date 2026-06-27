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

interface Payment {
  id: string; reference: string; user: string; amount: number; method: string;
  status: 'PAID' | 'FAILED' | 'PENDING' | 'REFUNDED'; date: string; description: string;
  cardLast4?: string; walletNumber?: string; transactionId: string;
}

const METHODS = ['Fawry', 'Vodafone Cash', 'Instapay', 'Card', 'PayPal', 'Cash'];
const STATUSES: Record<string, { label: string; color: string }> = {
  PAID: { label: 'مدفوع', color: 'text-emerald-400 bg-emerald-500/10' },
  FAILED: { label: 'فاشل', color: 'text-red-400 bg-red-500/10' },
  PENDING: { label: 'معلق', color: 'text-amber-400 bg-amber-500/10' },
  REFUNDED: { label: 'مسترجع', color: 'text-purple-400 bg-purple-500/10' },
};

const MOCK_PAYMENTS: Payment[] = [
  { id: 'p-001', reference: 'TX-10001', user: 'أحمد علي', amount: 2500, method: 'Vodafone Cash', status: 'PAID', date: '2025-01-15', description: 'حجز جولة الأهرامات', transactionId: 'voda-001', walletNumber: '010*****1234' },
  { id: 'p-002', reference: 'TX-10002', user: 'سارة خالد', amount: 1800, method: 'Fawry', status: 'PAID', date: '2025-01-14', description: 'غوص في البحر الأحمر', transactionId: 'faw-002', cardLast4: '4532' },
  { id: 'p-003', reference: 'TX-10003', user: 'محمد حسن', amount: 4200, method: 'Card', status: 'FAILED', date: '2025-01-14', description: 'رحلة نيلية 5 أيام', transactionId: 'card-003', cardLast4: '8976' },
  { id: 'p-004', reference: 'TX-10004', user: 'نورا إبراهيم', amount: 900, method: 'Instapay', status: 'PENDING', date: '2025-01-13', description: 'جولة معبد الكرنك', transactionId: 'insta-004' },
  { id: 'p-005', reference: 'TX-10005', user: 'خالد عبدالله', amount: 3500, method: 'PayPal', status: 'PAID', date: '2025-01-13', description: 'سفاري صحراء سيوة', transactionId: 'paypal-005' },
  { id: 'p-006', reference: 'TX-10006', user: 'هند سليمان', amount: 650, method: 'Cash', status: 'REFUNDED', date: '2025-01-12', description: 'توصيل مطار', transactionId: 'cash-006' },
  { id: 'p-007', reference: 'TX-10007', user: 'موسى الطويل', amount: 5000, method: 'Vodafone Cash', status: 'PAID', date: '2025-01-12', description: 'باقة تجارب فاخرة', transactionId: 'voda-007', walletNumber: '012*****5678' },
  { id: 'p-008', reference: 'TX-10008', user: 'ليلى حسن', amount: 1200, method: 'Fawry', status: 'PENDING', date: '2025-01-11', description: 'جولة أهرامات', transactionId: 'faw-008' },
  { id: 'p-009', reference: 'TX-10009', user: 'أسامة النوبي', amount: 8800, method: 'Card', status: 'PAID', date: '2025-01-11', description: 'حزمة سياحية شاملة', transactionId: 'card-009', cardLast4: '3421' },
  { id: 'p-010', reference: 'TX-10010', user: 'نادية جمال', amount: 2300, method: 'Instapay', status: 'FAILED', date: '2025-01-10', description: 'دورة غوص PADI', transactionId: 'insta-010' },
  { id: 'p-011', reference: 'TX-10011', user: 'يوسف عبدالله', amount: 1500, method: 'PayPal', status: 'PAID', date: '2025-01-10', description: 'جولة sunset الأهرامات', transactionId: 'paypal-011' },
  { id: 'p-012', reference: 'TX-10012', user: 'مريم عادل', amount: 780, method: 'Vodafone Cash', status: 'REFUNDED', date: '2025-01-09', description: 'تذكرة متحف', transactionId: 'voda-012', walletNumber: '010*****9876' },
  { id: 'p-013', reference: 'TX-10013', user: 'أحمد علي', amount: 3200, method: 'Fawry', status: 'PAID', date: '2025-01-09', description: 'رحلة الأقصر', transactionId: 'faw-013' },
  { id: 'p-014', reference: 'TX-10014', user: 'سارة خالد', amount: 450, method: 'Cash', status: 'PAID', date: '2025-01-08', description: 'مشتريات سوق', transactionId: 'cash-014' },
  { id: 'p-015', reference: 'TX-10015', user: 'محمد حسن', amount: 6700, method: 'Card', status: 'PENDING', date: '2025-01-08', description: 'فندق رويال ريف', transactionId: 'card-015', cardLast4: '4532' },
  { id: 'p-016', reference: 'TX-10016', user: 'نورا إبراهيم', amount: 2100, method: 'Instapay', status: 'PAID', date: '2025-01-07', description: 'مغامرة الغوص', transactionId: 'insta-016' },
  { id: 'p-017', reference: 'TX-10017', user: 'خالد عبدالله', amount: 3900, method: 'Vodafone Cash', status: 'FAILED', date: '2025-01-07', description: 'تذكرة طيران', transactionId: 'voda-017', walletNumber: '012*****3456' },
  { id: 'p-018', reference: 'TX-10018', user: 'هند سليمان', amount: 1100, method: 'PayPal', status: 'PAID', date: '2025-01-06', description: 'جولة إسكندرية', transactionId: 'paypal-018' },
  { id: 'p-019', reference: 'TX-10019', user: 'موسى الطويل', amount: 2800, method: 'Fawry', status: 'REFUNDED', date: '2025-01-06', description: 'تخييم صحراوي', transactionId: 'faw-019' },
  { id: 'p-020', reference: 'TX-10020', user: 'ليلى حسن', amount: 5400, method: 'Card', status: 'PAID', date: '2025-01-05', description: 'عمرة سياحية', transactionId: 'card-020', cardLast4: '8976' },
  { id: 'p-021', reference: 'TX-10021', user: 'أسامة النوبي', amount: 1600, method: 'Instapay', status: 'PAID', date: '2025-01-05', description: 'جولة نيلية', transactionId: 'insta-021' },
  { id: 'p-022', reference: 'TX-10022', user: 'نادية جمال', amount: 720, method: 'Cash', status: 'PENDING', date: '2025-01-04', description: 'وجبة مطعم', transactionId: 'cash-022' },
  { id: 'p-023', reference: 'TX-10023', user: 'يوسف عبدالله', amount: 4100, method: 'Vodafone Cash', status: 'PAID', date: '2025-01-04', description: 'حزمة الغوص', transactionId: 'voda-023', walletNumber: '010*****8765' },
  { id: 'p-024', reference: 'TX-10024', user: 'مريم عادل', amount: 980, method: 'Fawry', status: 'FAILED', date: '2025-01-03', description: 'جولة تاريخية', transactionId: 'faw-024' },
  { id: 'p-025', reference: 'TX-10025', user: 'أحمد علي', amount: 15000, method: 'Card', status: 'PAID', date: '2025-01-03', description: 'باقة عائلية كاملة', transactionId: 'card-025', cardLast4: '3421' },
  { id: 'p-026', reference: 'TX-10026', user: 'سارة خالد', amount: 1850, method: 'PayPal', status: 'REFUNDED', date: '2025-01-02', description: 'تذكرة فعاليات', transactionId: 'paypal-026' },
  { id: 'p-027', reference: 'TX-10027', user: 'محمد حسن', amount: 320, method: 'Instapay', status: 'PAID', date: '2025-01-02', description: 'قهوة ومشروبات', transactionId: 'insta-027' },
  { id: 'p-028', reference: 'TX-10028', user: 'نورا إبراهيم', amount: 4900, method: 'Vodafone Cash', status: 'PENDING', date: '2025-01-01', description: 'منتجع سياحي', transactionId: 'voda-028', walletNumber: '012*****2345' },
  { id: 'p-029', reference: 'TX-10029', user: 'خالد عبدالله', amount: 750, method: 'Fawry', status: 'PAID', date: '2025-01-01', description: 'جولة قصيرة', transactionId: 'faw-029' },
  { id: 'p-030', reference: 'TX-10030', user: 'هند سليمان', amount: 2200, method: 'Cash', status: 'PAID', date: '2024-12-31', description: 'سوق الخليلي', transactionId: 'cash-030' },
  { id: 'p-031', reference: 'TX-10031', user: 'أحمد علي', amount: 6000, method: 'Card', status: 'PAID', date: '2024-12-30', description: 'باقة التزلج', transactionId: 'card-031', cardLast4: '4532' },
  { id: 'p-032', reference: 'TX-10032', user: 'سارة خالد', amount: 4500, method: 'Instapay', status: 'REFUNDED', date: '2024-12-30', description: 'تأجير يخت', transactionId: 'insta-032' },
];

function StatCard({ label, value, icon, color, sub }: { label: string; value: string; icon: JSX.Element; color: string; sub?: string }) {
  return (
    <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5 hover:border-theme-gold/25 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>{icon}</div>
      </div>
      <p className="text-2xl font-bold font-playfair text-theme mb-0.5">{value}</p>
      <p className="text-xs text-theme-muted font-cairo">{label}</p>
      {sub && <p className="text-[10px] text-theme-muted/50 font-cairo mt-0.5">{sub}</p>}
    </motion.div>
  );
}

export default function PaymentsPage() {
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ type: string; payment: Payment } | null>(null);

  const stats = useMemo(() => {
    const paid = MOCK_PAYMENTS.filter(p => p.status === 'PAID');
    const totalRevenue = paid.reduce((s, p) => s + p.amount, 0);
    return {
      totalRevenue: totalRevenue.toLocaleString('ar-EG'),
      totalTransactions: MOCK_PAYMENTS.length,
      successful: MOCK_PAYMENTS.filter(p => p.status === 'PAID').length,
      failed: MOCK_PAYMENTS.filter(p => p.status === 'FAILED').length,
      refunded: MOCK_PAYMENTS.filter(p => p.status === 'REFUNDED').length,
    };
  }, []);

  const filtered = useMemo(() => {
    return MOCK_PAYMENTS.filter(p => {
      if (search && !p.reference.toLowerCase().includes(search.toLowerCase()) && !p.user.includes(search)) return false;
      if (methodFilter && p.method !== methodFilter) return false;
      if (statusFilter && p.status !== statusFilter) return false;
      return true;
    });
  }, [search, methodFilter, statusFilter]);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-playfair font-bold text-theme mb-1">إدارة المدفوعات</h1>
            <p className="text-sm text-theme-muted font-cairo">عرض وإدارة جميع المعاملات المالية على المنصة</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-theme-gold/10 text-theme-gold border border-theme-gold/20 text-xs font-bold font-cairo hover:bg-theme-gold/20 transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            تصدير التقرير
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard label="إجمالي الإيرادات" value={`${stats.totalRevenue} ج.م`} color="from-emerald-500 to-emerald-600" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>} />
        <StatCard label="إجمالي المعاملات" value={`${stats.totalTransactions}`} color="from-blue-500 to-blue-600" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>} />
        <StatCard label="ناجحة" value={`${stats.successful}`} color="from-emerald-500 to-emerald-600" sub="مدفوعة بالكامل" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>} />
        <StatCard label="فاشلة" value={`${stats.failed}`} color="from-red-500 to-red-600" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>} />
        <StatCard label="مسترجع" value={`${stats.refunded}`} color="from-purple-500 to-purple-600" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>} />
      </div>

      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 min-w-[200px]">
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث بالمرجع أو المستخدم..." className="w-full pr-10 pl-3 py-2 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40 transition-all" />
          </div>
          <select value={methodFilter} onChange={e => setMethodFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:outline-none focus:border-theme-gold/40">
            <option value="">كل الطرق</option>
            {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:outline-none focus:border-theme-gold/40">
            <option value="">كل الحالات</option>
            {Object.entries(STATUSES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-theme-gold/10">
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">المرجع</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">المستخدم</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">المبلغ</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">الطريقة</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">الحالة</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">التاريخ</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <motion.tr key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                  className="border-b border-theme-gold/5 hover:bg-theme-surface/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedPayment(p)}>
                  <td className="py-3 px-2 text-xs text-theme-gold font-mono">{p.reference}</td>
                  <td className="py-3 px-2 text-xs text-theme font-cairo">{p.user}</td>
                  <td className="py-3 px-2 text-xs text-theme font-cairo">{p.amount.toLocaleString('ar-EG')} ج.م</td>
                  <td className="py-3 px-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-theme-gold/10 text-theme-gold">{p.method}</span>
                  </td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${STATUSES[p.status]?.color || ''}`}>
                      {STATUSES[p.status]?.label || p.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-[10px] text-theme-muted font-cairo">{new Date(p.date).toLocaleDateString('ar-EG')}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-1">
                      {p.status === 'PENDING' && (
                        <button onClick={(e) => { e.stopPropagation(); setConfirmAction({ type: 'paid', payment: p }); }}
                          className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-bold hover:bg-emerald-500/20 transition-all">دفع</button>
                      )}
                      {p.status === 'PAID' && (
                        <button onClick={(e) => { e.stopPropagation(); setConfirmAction({ type: 'refund', payment: p }); }}
                          className="px-2 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-[10px] font-bold hover:bg-purple-500/20 transition-all">استرجاع</button>
                      )}
                      <button onClick={(e) => { e.stopPropagation(); setSelectedPayment(p); }}
                        className="px-2 py-1 rounded-lg bg-theme-gold/10 text-theme-gold text-[10px] font-bold hover:bg-theme-gold/20 transition-all">تفاصيل</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center py-8 text-theme-muted font-cairo text-sm">لا توجد معاملات مطابقة</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedPayment && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedPayment(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-lg rounded-2xl border border-theme-gold/10 bg-theme-card p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold font-cairo text-theme">تفاصيل المعاملة</h2>
                <button onClick={() => setSelectedPayment(null)} className="p-1 rounded-lg hover:bg-theme-surface text-theme-muted">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-[10px] text-theme-muted font-cairo mb-0.5">رقم المعاملة</p><p className="text-sm text-theme font-mono">{selectedPayment.reference}</p></div>
                  <div><p className="text-[10px] text-theme-muted font-cairo mb-0.5">معرف العملية</p><p className="text-sm text-theme font-mono">{selectedPayment.transactionId}</p></div>
                  <div><p className="text-[10px] text-theme-muted font-cairo mb-0.5">المستخدم</p><p className="text-sm text-theme font-cairo">{selectedPayment.user}</p></div>
                  <div><p className="text-[10px] text-theme-muted font-cairo mb-0.5">الوصف</p><p className="text-sm text-theme font-cairo">{selectedPayment.description}</p></div>
                  <div><p className="text-[10px] text-theme-muted font-cairo mb-0.5">المبلغ</p><p className="text-lg font-bold font-playfair text-theme-gold">{selectedPayment.amount.toLocaleString('ar-EG')} ج.م</p></div>
                  <div><p className="text-[10px] text-theme-muted font-cairo mb-0.5">الحالة</p><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${STATUSES[selectedPayment.status]?.color || ''}`}>{STATUSES[selectedPayment.status]?.label}</span></div>
                  <div><p className="text-[10px] text-theme-muted font-cairo mb-0.5">طريقة الدفع</p><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-theme-gold/10 text-theme-gold">{selectedPayment.method}</span></div>
                  <div><p className="text-[10px] text-theme-muted font-cairo mb-0.5">التاريخ</p><p className="text-sm text-theme font-cairo">{new Date(selectedPayment.date).toLocaleDateString('ar-EG')}</p></div>
                </div>
                {selectedPayment.cardLast4 && (
                  <div className="p-3 rounded-xl bg-theme-surface border border-theme-border">
                    <p className="text-[10px] text-theme-muted font-cairo mb-1">معلومات البطاقة</p>
                    <p className="text-sm text-theme font-mono">**** **** **** {selectedPayment.cardLast4}</p>
                  </div>
                )}
                {selectedPayment.walletNumber && (
                  <div className="p-3 rounded-xl bg-theme-surface border border-theme-border">
                    <p className="text-[10px] text-theme-muted font-cairo mb-1">رقم المحفظة</p>
                    <p className="text-sm text-theme font-mono">{selectedPayment.walletNumber}</p>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button onClick={() => setSelectedPayment(null)} className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إغلاق</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {confirmAction && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmAction(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-sm rounded-2xl border border-theme-gold/10 bg-theme-card p-6 text-center" onClick={e => e.stopPropagation()}>
              <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl bg-theme-surface border border-theme-border">
                {confirmAction.type === 'paid' ? '💳' : '↩️'}
              </div>
              <h3 className="text-lg font-bold font-cairo text-theme mb-2">
                {confirmAction.type === 'paid' ? 'تأكيد الدفع' : 'تأكيد الاسترجاع'}
              </h3>
              <p className="text-sm text-theme-muted font-cairo mb-1">
                {confirmAction.type === 'paid' ? 'هل أنت متأكد من تأكيد عملية الدفع للمعاملة' : 'هل أنت متأكد من استرجاع مبلغ المعاملة'}
              </p>
              <p className="text-theme-gold font-bold font-playfair text-lg mb-5">{confirmAction.payment.reference} — {confirmAction.payment.amount.toLocaleString('ar-EG')} ج.م</p>
              <div className="flex gap-2 justify-center">
                <button onClick={() => setConfirmAction(null)} className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
                <button onClick={() => { setConfirmAction(null); setSelectedPayment(null); }}
                  className="px-4 py-2 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-opacity">
                  {confirmAction.type === 'paid' ? 'تأكيد الدفع' : 'تأكيد الاسترجاع'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
