'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MaintenanceLog {
  id: number;
  action: string;
  by: string;
  date: string;
  duration: string;
}

const initialLogs: MaintenanceLog[] = [
  { id: 1, action: 'تفعيل وضع الصيانة', by: 'أحمد علي', date: '2026-06-25 14:30', duration: 'ساعتان' },
  { id: 2, action: 'تعطيل وضع الصيانة', by: 'محمد حسن', date: '2026-06-25 16:30', duration: '-' },
  { id: 3, action: 'تفعيل وضع الصيانة', by: 'النظام', date: '2026-06-20 02:00', duration: 'ساعة واحدة' },
  { id: 4, action: 'تعطيل وضع الصيانة', by: 'النظام', date: '2026-06-20 03:00', duration: '-' },
  { id: 5, action: 'تفعيل وضع الصيانة', by: 'سارة أحمد', date: '2026-06-15 22:00', duration: '٣ ساعات' },
  { id: 6, action: 'تعطيل وضع الصيانة', by: 'سارة أحمد', date: '2026-06-16 01:00', duration: '-' },
  { id: 7, action: 'تفعيل وضع الصيانة', by: 'خالد يوسف', date: '2026-06-10 10:00', duration: '٤ ساعات' },
  { id: 8, action: 'تعطيل وضع الصيانة', by: 'خالد يوسف', date: '2026-06-10 14:00', duration: '-' },
];

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function MaintenancePage() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [message, setMessage] = useState('نعمل على تحسين تجربتك. سنعود قريباً! شكراً لصبركم.');
  const [estimatedReturn, setEstimatedReturn] = useState('2026-06-27T18:00');
  const [allowedIps, setAllowedIps] = useState<string[]>(['192.168.1.1', '10.0.0.1', '203.0.113.1']);
  const [newIp, setNewIp] = useState('');
  const [logs] = useState<MaintenanceLog[]>(initialLogs);
  const [showPreview, setShowPreview] = useState(false);

  const addIp = () => {
    if (newIp && !allowedIps.includes(newIp)) {
      setAllowedIps(prev => [...prev, newIp]);
      setNewIp('');
    }
  };

  const removeIp = (ip: string) => {
    setAllowedIps(prev => prev.filter(i => i !== ip));
  };

  const enableForDuration = (hours: number) => {
    setIsEnabled(true);
    const now = new Date();
    now.setHours(now.getHours() + hours);
    setEstimatedReturn(now.toISOString().slice(0, 16));
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6 max-w-4xl">
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">وضع الصيانة</h1>
        <p className="text-sm text-theme-muted font-cairo">التحكم في وضع الصيانة للموقع</p>
      </motion.div>

      <motion.div variants={itemVariants}
        className={`rounded-2xl border p-6 transition-all ${
          isEnabled ? 'border-red-500/30 bg-red-500/5' : 'border-emerald-500/30 bg-emerald-500/5'
        }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isEnabled ? 'bg-red-500 animate-pulse' : 'bg-emerald-400'}`} />
            <div>
              <h2 className="text-lg font-bold font-cairo text-theme">
                {isEnabled ? 'وضع الصيانة مفعل' : 'الموقع يعمل'}
              </h2>
              <p className="text-xs text-theme-muted font-cairo">
                {isEnabled ? 'الموقع في وضع الصيانة حالياً. الزوار يرون رسالة الصيانة.' : 'الموقع متاح للجميع بشكل طبيعي.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-theme-muted font-cairo">
              {isEnabled ? 'معطل' : 'مفعل'}
            </span>
            <button onClick={() => setIsEnabled(!isEnabled)}
              className={`relative w-14 h-7 rounded-full transition-all ${isEnabled ? 'bg-red-500' : 'bg-emerald-500'}`}>
              <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-all ${isEnabled ? 'right-[30px]' : 'right-0.5'}`} />
            </button>
          </div>
        </div>

        {isEnabled && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-red-500/20 pt-4 mt-4 space-y-4">
            <p className="text-xs text-red-400 font-cairo">الزوار سيشاهدون رسالة الصيانة أدناه:</p>
            <div className="rounded-xl bg-theme-card border border-theme-gold/10 p-4">
              <p className="text-sm text-theme font-cairo">{message}</p>
              {estimatedReturn && (
                <p className="text-xs text-theme-muted font-cairo mt-1">العودة المتوقعة: {new Date(estimatedReturn).toLocaleString('ar-EG')}</p>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <h2 className="text-sm font-bold font-cairo text-theme mb-4">رسالة الصيانة</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-theme-muted font-cairo mb-1.5">نص الرسالة</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4}
                className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-cairo focus:outline-none focus:border-theme-gold/40 resize-none" />
            </div>
            <div>
              <label className="block text-xs text-theme-muted font-cairo mb-1.5">وقت العودة المتوقع</label>
              <input type="datetime-local" value={estimatedReturn} onChange={e => setEstimatedReturn(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-english focus:outline-none focus:border-theme-gold/40" />
            </div>
            <button onClick={() => setShowPreview(true)}
              className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">
              معاينة صفحة الصيانة
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <h2 className="text-sm font-bold font-cairo text-theme mb-4">عناوين IP المسموح بها</h2>
          <p className="text-xs text-theme-muted font-cairo mb-4">هذه العناوين يمكنها تجاوز وضع الصيانة والوصول للموقع.</p>
          <div className="space-y-2 mb-4">
            {allowedIps.map(ip => (
              <div key={ip} className="flex items-center justify-between p-2.5 rounded-xl bg-theme-surface border border-theme-border">
                <span className="text-xs text-theme font-mono" dir="ltr">{ip}</span>
                <button onClick={() => removeIp(ip)}
                  className="p-1 rounded hover:bg-red-500/10 text-theme-muted hover:text-red-400 transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
            ))}
            {allowedIps.length === 0 && (
              <p className="text-xs text-theme-muted font-cairo text-center py-4">لا توجد عناوين IP مسموح بها</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input type="text" value={newIp} onChange={e => setNewIp(e.target.value)} placeholder="أدخل عنوان IP..."
              className="flex-1 px-3 py-2 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-english focus:outline-none focus:border-theme-gold/40"
              onKeyDown={e => e.key === 'Enter' && addIp()} />
            <button onClick={addIp}
              className="px-3 py-2 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-all">إضافة</button>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
        <h2 className="text-sm font-bold font-cairo text-theme mb-4">إجراءات سريعة</h2>
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => enableForDuration(1)}
            className="px-4 py-2.5 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">
            تفعيل لمدة ساعة
          </button>
          <button onClick={() => enableForDuration(2)}
            className="px-4 py-2.5 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">
            تفعيل لمدة ساعتين
          </button>
          <button onClick={() => setIsEnabled(false)}
            className="px-4 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold font-cairo hover:bg-emerald-500/20 transition-all">
            تعطيل وضع الصيانة
          </button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold font-cairo text-theme">سجل الصيانة</h2>
          <span className="text-[10px] text-theme-muted font-cairo">{logs.length} حدث</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-theme-gold/10 text-theme-muted text-[11px] font-cairo">
                <th className="pb-3 px-2 font-medium">الإجراء</th>
                <th className="pb-3 px-2 font-medium">بواسطة</th>
                <th className="pb-3 px-2 font-medium">التاريخ</th>
                <th className="pb-3 px-2 font-medium">المدة</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <motion.tr key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                  className="border-b border-theme-gold/5 hover:bg-theme-gold/5 transition-colors">
                  <td className="py-3 px-2">
                    <span className={`text-sm font-cairo ${log.action.includes('تفعيل') ? 'text-red-400' : 'text-emerald-400'}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-xs text-theme-secondary font-cairo">{log.by}</td>
                  <td className="py-3 px-2 text-xs text-theme-muted font-english">{log.date}</td>
                  <td className="py-3 px-2 text-xs text-theme font-english">{log.duration}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {showPreview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="rounded-2xl border border-theme-gold/10 bg-theme-card p-6 max-w-lg w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold font-cairo text-theme">معاينة صفحة الصيانة</h3>
                <button onClick={() => setShowPreview(false)}
                  className="p-1.5 rounded-lg hover:bg-theme-gold/10 text-theme-muted hover:text-theme-gold transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
              <div className="rounded-xl bg-gradient-to-b from-theme-gold/5 to-theme-bg border border-theme-gold/10 p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-theme-gold/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-theme-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold font-playfair text-theme mb-3">الصيانة جارية</h2>
                <p className="text-theme-secondary font-cairo mb-4">{message}</p>
                {estimatedReturn && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-theme-surface border border-theme-border">
                    <svg className="w-4 h-4 text-theme-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="text-sm text-theme font-cairo">العودة المتوقعة: {new Date(estimatedReturn).toLocaleString('ar-EG')}</span>
                  </div>
                )}
              </div>
              <button onClick={() => setShowPreview(false)}
                className="mt-4 w-full px-4 py-2.5 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-all">إغلاق</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
