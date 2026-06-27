'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'REFUNDED';
type PaymentStatus = 'UNPAID' | 'PAID' | 'REFUNDED' | 'PARTIALLY_REFUNDED';

interface Booking {
  id: string; reference: string; user: string; email: string; phone: string;
  experience: string; provider: string; category: string; city: string;
  date: string; guests: number; amount: number; currency: string;
  status: BookingStatus; paymentStatus: PaymentStatus; paymentMethod: string;
  createdAt: string; notes?: string; timeline: { action: string; date: string; by: string }[];
}

const BOOKING_STATUS: Record<BookingStatus, { label: string; color: string }> = {
  PENDING: { label: 'معلق', color: 'text-amber-400 bg-amber-500/10' },
  CONFIRMED: { label: 'مؤكد', color: 'text-emerald-400 bg-emerald-500/10' },
  CANCELLED: { label: 'ملغي', color: 'text-red-400 bg-red-500/10' },
  COMPLETED: { label: 'مكتمل', color: 'text-blue-400 bg-blue-500/10' },
  REFUNDED: { label: 'مسترجع', color: 'text-purple-400 bg-purple-500/10' },
};

const PAYMENT_STATUS: Record<PaymentStatus, { label: string; color: string }> = {
  UNPAID: { label: 'غير مدفوع', color: 'text-amber-400 bg-amber-500/10' },
  PAID: { label: 'مدفوع', color: 'text-emerald-400 bg-emerald-500/10' },
  REFUNDED: { label: 'مسترجع', color: 'text-purple-400 bg-purple-500/10' },
  PARTIALLY_REFUNDED: { label: 'مسترجع جزئياً', color: 'text-orange-400 bg-orange-500/10' },
};

const SAMPLE_BOOKINGS: Booking[] = Array.from({ length: 35 }, (_, i) => {
  const statuses: BookingStatus[] = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'REFUNDED'];
  const payStatuses: PaymentStatus[] = ['UNPAID', 'PAID', 'REFUNDED', 'PARTIALLY_REFUNDED'];
  const s = statuses[i % 5];
  const ps = s === 'REFUNDED' ? 'REFUNDED' : s === 'CANCELLED' ? 'UNPAID' : payStatuses[i % 4];
  const amount = [2500, 1800, 3200, 1500, 4200, 2800, 3600, 1200, 5000, 2100][i % 10];
  return {
    id: `BK-${String(i + 1).padStart(4, '0')}`,
    reference: `EGH-${String(10000 + i).padStart(5, '0')}`,
    user: ['أحمد علي', 'سارة محمد', 'خالد حسن', 'نورة أحمد', 'عمر محمود', 'ليلى إبراهيم', 'محمد كريم', 'هند عبدالله', 'يوسف سامي', 'دينا نور'][i % 10],
    email: [`ahmed.a@mail.com`, `sara.m@mail.com`, `khaled.h@mail.com`, `noura.a@mail.com`, `omar.m@mail.com`, `laila.i@mail.com`, `mohamed.k@mail.com`, `hind.a@mail.com`, `youssef.s@mail.com`, `dina.n@mail.com`][i % 10],
    phone: `+20 12${String(30000000 + i * 100000).slice(0, 8)}`,
    experience: [
      'رحلة نيلية بالقاهرة', 'جولة الأهرامات', 'السفاري في الغردقة',
      'غطس في شرم الشيخ', 'جولة الأقصر التاريخية', 'ركوب البالون في الأقصر',
      'استكشاف وادي النطرون', 'رحلة البحر الأحمر', 'جولة سيوة', 'مهرجان التذوق المصري',
    ][i % 10],
    provider: ['شركة النيل السياحية', 'أهرامات مصر', 'مغامرات الصحراء', 'شرم دايف', 'أقصر للسياحة', 'بالون الأقصر', 'وادي النطرون', 'البحر الأحمر', 'سيوة تورز', 'تذوق مصر'][i % 10],
    category: ['مغامرات', 'تاريخية', 'مغامرات', 'رياضات مائية', 'تاريخية', 'مغامرات', 'دينية', 'رياضات مائية', 'استكشاف', 'ترفيه'][i % 10],
    city: ['القاهرة', 'القاهرة', 'الغردقة', 'شرم الشيخ', 'الأقصر', 'الأقصر', 'وادي النطرون', 'الغردقة', 'سيوة', 'القاهرة'][i % 10],
    date: new Date(2026, 4 + (i % 4), 10 + (i % 20)).toISOString(),
    guests: 1 + (i % 6),
    amount,
    currency: 'ج.م',
    status: s,
    paymentStatus: ps,
    paymentMethod: ['بطاقة ائتمان', 'تحويل بنكي', 'محفظة إلكترونية', 'كاش'][i % 4],
    createdAt: new Date(2026, 3 + (i % 5), 1 + (i % 25)).toISOString(),
    timeline: [
      { action: 'تم إنشاء الحجز', date: new Date(2026, 3 + (i % 5), 1 + (i % 25)).toISOString(), by: 'النظام' },
      { action: s !== 'PENDING' ? 'تم تأكيد الحجز' : 'في انتظار التأكيد', date: new Date(2026, 4 + (i % 4), 5 + (i % 20)).toISOString(), by: 'أدمن' },
      ...(s === 'COMPLETED' ? [{ action: 'تم إكمال الحجز', date: new Date(2026, 5 + (i % 3), 10 + (i % 15)).toISOString(), by: 'النظام' }] : []),
      ...(s === 'CANCELLED' ? [{ action: 'تم إلغاء الحجز', date: new Date(2026, 4 + (i % 4), 12 + (i % 10)).toISOString(), by: 'مستخدم' }] : []),
      ...(s === 'REFUNDED' ? [{ action: 'تم الاسترجاع', date: new Date(2026, 5 + (i % 3), 15 + (i % 10)).toISOString(), by: 'أدمن' }] : []),
    ],
  };
});

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

function StatCard({ label, value, sub, icon, color }: { label: string; value: string | number; sub?: string; icon: JSX.Element; color: string }) {
  return (
    <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5 hover:border-theme-gold/25 transition-all">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg`}>
        {icon}
      </div>
      <p className="text-2xl md:text-3xl font-bold font-playfair text-theme mb-0.5">{typeof value === 'number' ? value.toLocaleString('ar-EG') : value}</p>
      <p className="text-xs text-theme-muted font-cairo">{label}</p>
      {sub && <p className="text-[10px] text-theme-muted/50 font-cairo mt-0.5">{sub}</p>}
    </motion.div>
  );
}

export default function BookingsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | ''>('');
  const [payFilter, setPayFilter] = useState<PaymentStatus | ''>('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{ type: string; booking: Booking } | null>(null);

  const filtered = useMemo(() => {
    return SAMPLE_BOOKINGS.filter((b) => {
      if (search && !b.reference.toLowerCase().includes(search.toLowerCase()) && !b.user.includes(search)) return false;
      if (statusFilter && b.status !== statusFilter) return false;
      if (payFilter && b.paymentStatus !== payFilter) return false;
      if (startDate && new Date(b.date) < new Date(startDate)) return false;
      if (endDate && new Date(b.date) > new Date(endDate)) return false;
      if (minAmount && b.amount < Number(minAmount)) return false;
      if (maxAmount && b.amount > Number(maxAmount)) return false;
      return true;
    });
  }, [search, statusFilter, payFilter, startDate, endDate, minAmount, maxAmount]);

  const stats = useMemo(() => {
    const total = SAMPLE_BOOKINGS.length;
    const confirmed = SAMPLE_BOOKINGS.filter((b) => b.status === 'CONFIRMED').length;
    const pending = SAMPLE_BOOKINGS.filter((b) => b.status === 'PENDING').length;
    const cancelled = SAMPLE_BOOKINGS.filter((b) => b.status === 'CANCELLED').length;
    const completed = SAMPLE_BOOKINGS.filter((b) => b.status === 'COMPLETED').length;
    const revenue = SAMPLE_BOOKINGS.filter((b) => b.paymentStatus === 'PAID').reduce((s, b) => s + b.amount, 0);
    return { total, confirmed, pending, cancelled, completed, revenue };
  }, []);

  const handleAction = (type: string, booking: Booking) => {
    setConfirmModal({ type, booking });
  };

  const executeAction = () => {
    if (!confirmModal) return;
    setConfirmModal(null);
    setSelectedBooking(null);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">إدارة الحجوزات</h1>
        <p className="text-sm text-theme-muted font-cairo">عرض وإدارة جميع حجوزات المنصة</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard label="إجمالي الحجوزات" value={stats.total} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>} color="from-blue-500 to-blue-600" />
        <StatCard label="مؤكدة" value={stats.confirmed} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>} color="from-emerald-500 to-emerald-600" />
        <StatCard label="معلقة" value={stats.pending} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>} color="from-amber-500 to-amber-600" />
        <StatCard label="ملغية" value={stats.cancelled} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>} color="from-red-500 to-red-600" />
        <StatCard label="مكتملة" value={stats.completed} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>} color="from-cyan-500 to-cyan-600" />
        <StatCard label="الإيرادات" value={`${stats.revenue.toLocaleString('ar-EG')} ج.م`} sub="المدفوعات المكتملة" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>} color="from-purple-500 to-purple-600" />
      </div>

      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="md:col-span-2">
            <input type="text" placeholder="🔍 بحث بالمرجع أو المستخدم..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:border-theme-gold/40 focus:outline-none transition-all font-cairo" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as BookingStatus | '')}
            className="px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:border-theme-gold/40 focus:outline-none">
            <option value="">كل الحالات</option>
            {Object.entries(BOOKING_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <select value={payFilter} onChange={(e) => setPayFilter(e.target.value as PaymentStatus | '')}
            className="px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:border-theme-gold/40 focus:outline-none">
            <option value="">حالة الدفع</option>
            {Object.entries(PAYMENT_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm focus:border-theme-gold/40 focus:outline-none" />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm focus:border-theme-gold/40 focus:outline-none" />
          <input type="number" placeholder="أقل مبلغ" value={minAmount} onChange={(e) => setMinAmount(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:border-theme-gold/40 focus:outline-none font-english" />
          <input type="number" placeholder="أقصى مبلغ" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:border-theme-gold/40 focus:outline-none font-english" />
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-theme-gold/10 bg-theme-surface/50">
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">المرجع</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">المستخدم</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">التجربة</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">التاريخ</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">الحالة</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">الدفع</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">المبلغ</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, i) => (
                <motion.tr key={b.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                  className={`border-b border-theme-gold/5 hover:bg-theme-gold/[0.02] transition-colors ${i % 2 === 0 ? 'bg-theme-surface/20' : ''}`}>
                  <td className="px-4 py-3 text-xs text-theme-gold font-mono cursor-pointer hover:underline"
                    onClick={() => { setSelectedBooking(b); setShowDetailModal(true); }}>{b.reference}</td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-theme font-cairo">{b.user}</div>
                    <div className="text-[10px] text-theme-muted font-cairo">{b.email}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-theme font-cairo truncate max-w-[150px]">{b.experience}</td>
                  <td className="px-4 py-3 text-xs text-theme-muted font-cairo">{new Date(b.date).toLocaleDateString('ar-EG')}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${BOOKING_STATUS[b.status].color}`}>
                      {BOOKING_STATUS[b.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${PAYMENT_STATUS[b.paymentStatus].color}`}>
                      {PAYMENT_STATUS[b.paymentStatus].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-english text-theme">{b.amount.toLocaleString('ar-EG')} ج.م</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {b.status === 'PENDING' && (
                        <button onClick={() => handleAction('confirm', b)} className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-bold hover:bg-emerald-500/20 transition-all">تأكيد</button>
                      )}
                      {b.status === 'CONFIRMED' && (
                        <button onClick={() => handleAction('complete', b)} className="px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-bold hover:bg-blue-500/20 transition-all">إكمال</button>
                      )}
                      {(b.status === 'PENDING' || b.status === 'CONFIRMED') && (
                        <button onClick={() => handleAction('cancel', b)} className="px-2 py-1 rounded-lg bg-red-500/10 text-red-400 text-[10px] font-bold hover:bg-red-500/20 transition-all">إلغاء</button>
                      )}
                      {b.paymentStatus === 'PAID' && b.status === 'CANCELLED' && (
                        <button onClick={() => handleAction('refund', b)} className="px-2 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-[10px] font-bold hover:bg-purple-500/20 transition-all">استرجاع</button>
                      )}
                      <button onClick={() => { setSelectedBooking(b); setShowDetailModal(true); }}
                        className="px-2 py-1 rounded-lg bg-theme-gold/10 text-theme-gold text-[10px] font-bold hover:bg-theme-gold/20 transition-all">عرض</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-theme-muted font-cairo text-sm">لا توجد حجوزات تطابق البحث</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-theme-gold/10">
          <span className="text-[10px] text-theme-muted font-cairo">إجمالي النتائج: {filtered.length}</span>
        </div>
      </motion.div>

      {showDetailModal && selectedBooking && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-2xl rounded-2xl border border-theme-gold/10 bg-theme-card p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold font-playfair text-theme">تفاصيل الحجز</h2>
              <button onClick={() => setShowDetailModal(false)} className="p-2 rounded-xl hover:bg-theme-surface text-theme-muted">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div><p className="text-[10px] text-theme-muted font-cairo">المرجع</p><p className="text-sm text-theme-gold font-mono">{selectedBooking.reference}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">المستخدم</p><p className="text-sm text-theme font-cairo">{selectedBooking.user}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">البريد الإلكتروني</p><p className="text-sm text-theme font-cairo">{selectedBooking.email}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">رقم الهاتف</p><p className="text-sm text-theme font-cairo">{selectedBooking.phone}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">التجربة</p><p className="text-sm text-theme font-cairo">{selectedBooking.experience}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">مزود الخدمة</p><p className="text-sm text-theme font-cairo">{selectedBooking.provider}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">التصنيف</p><p className="text-sm text-theme font-cairo">{selectedBooking.category}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">المدينة</p><p className="text-sm text-theme font-cairo">{selectedBooking.city}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">تاريخ الحجز</p><p className="text-sm text-theme font-cairo">{new Date(selectedBooking.date).toLocaleDateString('ar-EG')}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">عدد الضيوف</p><p className="text-sm text-theme font-english">{selectedBooking.guests}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">المبلغ</p><p className="text-sm text-theme font-english">{selectedBooking.amount.toLocaleString('ar-EG')} ج.م</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">طريقة الدفع</p><p className="text-sm text-theme font-cairo">{selectedBooking.paymentMethod}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">الحالة</p><span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${BOOKING_STATUS[selectedBooking.status].color}`}>{BOOKING_STATUS[selectedBooking.status].label}</span></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">حالة الدفع</p><span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${PAYMENT_STATUS[selectedBooking.paymentStatus].color}`}>{PAYMENT_STATUS[selectedBooking.paymentStatus].label}</span></div>
            </div>
            <h3 className="text-sm font-bold font-cairo text-theme mb-3">الجدول الزمني</h3>
            <div className="space-y-2">
              {selectedBooking.timeline.map((t, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-theme-surface border border-theme-border">
                  <div className="w-2 h-2 rounded-full bg-theme-gold/60 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-theme font-cairo">{t.action}</p>
                    <p className="text-[10px] text-theme-muted font-cairo">{new Date(t.date).toLocaleString('ar-EG')} — بواسطة: {t.by}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {confirmModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md rounded-2xl border border-theme-gold/10 bg-theme-card p-6">
            <div className="text-center mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                confirmModal.type === 'cancel' ? 'bg-red-500/10' : confirmModal.type === 'refund' ? 'bg-purple-500/10' : 'bg-emerald-500/10'
              }`}>
                <svg className={`w-8 h-8 ${
                  confirmModal.type === 'cancel' ? 'text-red-400' : confirmModal.type === 'refund' ? 'text-purple-400' : 'text-emerald-400'
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d={confirmModal.type === 'cancel' || confirmModal.type === 'refund' ? 'M6 18L18 6M6 6l12 12' : 'M5 13l4 4L19 7'} />
                </svg>
              </div>
              <h3 className="text-lg font-bold font-playfair text-theme mb-2">
                {confirmModal.type === 'confirm' && 'تأكيد الحجز'}
                {confirmModal.type === 'complete' && 'إكمال الحجز'}
                {confirmModal.type === 'cancel' && 'إلغاء الحجز'}
                {confirmModal.type === 'refund' && 'استرجاع المبلغ'}
              </h3>
              <p className="text-sm text-theme-muted font-cairo">
                {confirmModal.type === 'confirm' && `هل أنت متأكد من تأكيد الحجز ${confirmModal.booking.reference}؟`}
                {confirmModal.type === 'complete' && `هل أنت متأكد من إكمال الحجز ${confirmModal.booking.reference}؟`}
                {confirmModal.type === 'cancel' && `هل أنت متأكد من إلغاء الحجز ${confirmModal.booking.reference}؟`}
                {confirmModal.type === 'refund' && `هل أنت متأكد من استرجاع مبلغ ${confirmModal.booking.amount.toLocaleString('ar-EG')} ج.م للحجز ${confirmModal.booking.reference}؟`}
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setConfirmModal(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-theme-gold/20 text-theme-gold text-sm font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
              <button onClick={executeAction} className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold font-cairo transition-all ${
                confirmModal.type === 'cancel' || confirmModal.type === 'refund' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-theme-gold text-dark-900 hover:opacity-90'
              }`}>
                {confirmModal.type === 'confirm' && 'تأكيد الحجز'}
                {confirmModal.type === 'complete' && 'إكمال الحجز'}
                {confirmModal.type === 'cancel' && 'إلغاء الحجز'}
                {confirmModal.type === 'refund' && 'استرجاع المبلغ'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
