'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogEntry {
  id: number;
  timestamp: string;
  event: string;
  type: 'error' | 'warning' | 'info' | 'success';
  user: string;
  page: string;
  details: string;
}

const types: LogEntry['type'][] = ['error', 'warning', 'info', 'success'];

const generateLogs = (): LogEntry[] => {
  const entries: LogEntry[] = [];
  const events = {
    error: ['فشل في معالجة الدفع', 'خطأ في الاتصال بقاعدة البيانات', 'انتهاء مهلة الطلب', 'تعطل خدمة البريد', 'خطأ في تحميل الصورة', 'فشل إرسال الإشعار', 'خطأ في تسجيل الدخول', 'استثناء غير متوقع'],
    warning: ['اقتراب حد التخزين', 'ارتفاع استخدام الذاكرة', 'محاولة تسجيل دخول فاشلة', 'حجز مكرر', 'بطء في استجابة API', 'انخفاض مساحة القرص', 'طلب غير مكتمل', 'مهلة انتهت'],
    info: ['مستخدم جديد مسجل', 'تم إنشاء حجز جديد', 'تم إضافة شريك جديد', 'تم تحديث الإعدادات', 'تم إنشاء نسخة احتياطية', 'تم إرسال بريد ترحيبي', 'تم تفعيل سفير', 'بدء جلسة جديدة'],
    success: ['تمت المعاملة بنجاح', 'تم تحديث الملف الشخصي', 'تم تأكيد الحجز', 'تم إرسال البريد', 'تم تحميل الصورة', 'تم تفعيل الحساب', 'تم إتمام الدفع', 'تم تصدير التقرير'],
  };
  const users = ['أحمد علي', 'محمد حسن', 'سارة أحمد', 'عمر خالد', 'نورا محمود', 'خالد يوسف', 'مريم أحمد', 'يوسف عمر', 'النظام', 'لينا وليد'];
  const pages = ['/home', '/experiences', '/bookings', '/profile', '/admin', '/auth/login', '/checkout', '/partners', '/settings', '/api/payments'];
  const hours = ['02:14', '05:32', '08:45', '10:18', '11:52', '13:07', '14:23', '15:41', '16:55', '17:30', '18:12', '19:44', '20:08', '21:33', '22:58', '23:15', '00:42', '03:27', '06:03', '09:19'];

  for (let i = 1; i <= 42; i++) {
    const type = types[i % 4];
    const eventList = events[type];
    entries.push({
      id: i,
      timestamp: `2026-06-${String(15 + (i % 15)).padStart(2, '0')} ${hours[i % hours.length]}:${String(i % 60).padStart(2, '0')}`,
      event: eventList[i % eventList.length],
      type,
      user: users[i % users.length],
      page: pages[i % pages.length],
      details: `تفاصيل إضافية للحدث رقم ${i}: ${eventList[i % eventList.length]}. معلومات أكثر عن المشكلة والإجراء المتخذ.`,
    });
  }
  return entries;
};

const typeConfig: Record<LogEntry['type'], { label: string; color: string; bg: string }> = {
  error: { label: 'خطأ', color: 'text-red-400', bg: 'bg-red-500/10' },
  warning: { label: 'تحذير', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  info: { label: 'معلومة', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  success: { label: 'نجاح', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
};

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.03 } } };
const itemVariants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function LogsPage() {
  const [logs] = useState(generateLogs);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [clearConfirm, setClearConfirm] = useState(false);

  const filtered = useMemo(() => {
    let result = logs;
    if (filterType !== 'all') result = result.filter(l => l.type === filterType);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(l => l.event.includes(q) || l.user.includes(q) || l.page.includes(q) || l.details.includes(q));
    }
    return result;
  }, [logs, search, filterType]);

  const stats = useMemo(() => ({
    total: logs.length,
    errors: logs.filter(l => l.type === 'error').length,
    warnings: logs.filter(l => l.type === 'warning').length,
    info: logs.filter(l => l.type === 'info').length,
    success: logs.filter(l => l.type === 'success').length,
  }), [logs]);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">سجل النشاطات</h1>
          <p className="text-sm text-theme-muted font-cairo">تتبع جميع الأحداث والإجراءات على المنصة</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-theme-surface border border-theme-border">
            <span className="text-xs text-theme-muted font-cairo">تحديث تلقائي</span>
            <button onClick={() => setAutoRefresh(!autoRefresh)}
              className={`relative w-9 h-4 rounded-full transition-all ${autoRefresh ? 'bg-emerald-500' : 'bg-theme-border'}`}>
              <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all ${autoRefresh ? 'right-[18px]' : 'right-0.5'}`} />
            </button>
          </div>
          <button onClick={() => setClearConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/20 text-red-400 text-xs font-bold font-cairo hover:bg-red-500/10 transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
            مسح السجل
          </button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
        {[
          { label: 'إجمالي الأحداث', value: stats.total, color: 'from-blue-500 to-blue-600', icon: '📊' },
          { label: 'أخطاء', value: stats.errors, color: 'from-red-500 to-red-600', icon: '❌' },
          { label: 'تحذيرات', value: stats.warnings, color: 'from-amber-500 to-amber-600', icon: '⚠️' },
          { label: 'معلومات', value: stats.info, color: 'from-blue-500 to-blue-600', icon: 'ℹ️' },
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
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث في الأحداث..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-cairo focus:outline-none focus:border-theme-gold/40" />
          </div>
          <div className="flex gap-1.5">
            {['all', ...types].map(t => (
              <button key={t} onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-cairo transition-all ${
                  filterType === t ? 'bg-theme-gold text-dark-900' : 'border border-theme-gold/20 text-theme-gold hover:bg-theme-gold/10'
                }`}>
                {t === 'all' ? 'الكل' : typeConfig[t as LogEntry['type']]?.label || t}
              </button>
            ))}
          </div>
          <span className="text-xs text-theme-muted font-cairo">{filtered.length} من {logs.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-theme-gold/10 text-theme-muted text-[11px] font-cairo">
                <th className="pb-3 px-2 font-medium">التوقيت</th>
                <th className="pb-3 px-2 font-medium">الحدث</th>
                <th className="pb-3 px-2 font-medium">النوع</th>
                <th className="pb-3 px-2 font-medium">المستخدم</th>
                <th className="pb-3 px-2 font-medium">الصفحة</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log, i) => (
                <motion.tr key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.01 }}
                  onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                  className="border-b border-theme-gold/5 hover:bg-theme-gold/5 transition-colors cursor-pointer">
                  <td className="py-3 px-2 text-xs text-theme-muted font-english font-mono">{log.timestamp}</td>
                  <td className="py-3 px-2 text-sm text-theme font-cairo">{log.event}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-cairo ${typeConfig[log.type].bg} ${typeConfig[log.type].color}`}>
                      {typeConfig[log.type].label}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-xs text-theme-secondary font-cairo">{log.user}</td>
                  <td className="py-3 px-2 text-xs text-theme-muted font-english">{log.page}</td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="py-8 text-center text-theme-muted font-cairo text-sm">لا توجد نتائج</td></tr>
              )}
              {expandedId !== null && filtered.find(l => l.id === expandedId) && (
                <tr key={`exp-${expandedId}`}>
                  <td colSpan={5} className="py-3 px-4 bg-theme-surface/50 border-b border-theme-gold/5">
                    {(() => {
                      const log = filtered.find(l => l.id === expandedId)!;
                      return (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-theme-muted font-cairo">التفاصيل الكاملة:</span>
                          </div>
                          <p className="text-sm text-theme-secondary font-cairo bg-theme-card p-3 rounded-xl border border-theme-gold/5">{log.details}</p>
                          <div className="flex items-center gap-4 text-[10px] text-theme-muted font-cairo">
                            <span>معرف الحدث: {log.id}</span>
                            <span>الصفحة: {log.page}</span>
                            <span>التوقيت: {log.timestamp}</span>
                          </div>
                        </div>
                      );
                    })()}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {clearConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="rounded-2xl border border-red-500/20 bg-theme-card p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold font-cairo text-theme mb-2">مسح سجل النشاطات</h3>
              <p className="text-sm text-theme-secondary font-cairo mb-6">هل أنت متأكد من مسح جميع سجلات النشاطات؟ لا يمكن التراجع عن هذا الإجراء.</p>
              <div className="flex items-center gap-3 justify-end">
                <button onClick={() => setClearConfirm(false)}
                  className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
                <button onClick={() => { setClearConfirm(false); }}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white text-xs font-bold font-cairo hover:bg-red-600 transition-all">مسح الكل</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
