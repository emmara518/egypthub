'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackupEntry {
  id: number;
  date: string;
  size: string;
  type: 'auto' | 'manual';
  status: 'completed' | 'failed' | 'in_progress';
}

const initialBackups: BackupEntry[] = [
  { id: 1, date: '2026-06-27 03:00:00', size: '256 MB', type: 'auto', status: 'completed' },
  { id: 2, date: '2026-06-26 03:00:00', size: '251 MB', type: 'auto', status: 'completed' },
  { id: 3, date: '2026-06-25 03:00:00', size: '249 MB', type: 'auto', status: 'completed' },
  { id: 4, date: '2026-06-24 12:30:00', size: '248 MB', type: 'manual', status: 'completed' },
  { id: 5, date: '2026-06-24 03:00:00', size: '247 MB', type: 'auto', status: 'completed' },
  { id: 6, date: '2026-06-23 03:00:00', size: '244 MB', type: 'auto', status: 'completed' },
  { id: 7, date: '2026-06-22 03:00:00', size: '242 MB', type: 'auto', status: 'failed' },
  { id: 8, date: '2026-06-21 15:45:00', size: '241 MB', type: 'manual', status: 'completed' },
  { id: 9, date: '2026-06-21 03:00:00', size: '240 MB', type: 'auto', status: 'completed' },
  { id: 10, date: '2026-06-20 03:00:00', size: '238 MB', type: 'auto', status: 'completed' },
  { id: 11, date: '2026-06-19 09:00:00', size: '236 MB', type: 'manual', status: 'completed' },
  { id: 12, date: '2026-06-19 03:00:00', size: '235 MB', type: 'auto', status: 'in_progress' },
];

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function BackupPage() {
  const [backups, setBackups] = useState<BackupEntry[]>(initialBackups);
  const [creating, setCreating] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [restoreConfirm, setRestoreConfirm] = useState<number | null>(null);
  const [autoSettings, setAutoSettings] = useState<{ enabled: boolean; frequency: string; time: string }>({ enabled: true, frequency: 'daily', time: '03:00' });

  const stats = useMemo(() => {
    const completed = backups.filter(b => b.status === 'completed');
    const sizes = completed.map(b => parseFloat(b.size));
    const totalSize = sizes.reduce((a, b) => a + b, 0);
    return {
      total: backups.length,
      latest: backups[0]?.date || '-',
      totalSize: `${totalSize.toFixed(0)} MB`,
    };
  }, [backups]);

  function createBackup() {
    setCreating(true);
    const newEntry: BackupEntry = {
      id: Math.max(...backups.map(b => b.id), 0) + 1,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      size: `${(250 + Math.round(Math.random() * 20)).toString()} MB`,
      type: 'manual',
      status: 'in_progress',
    };
    setBackups(prev => [newEntry, ...prev]);
    setTimeout(() => {
      setBackups(prev => prev.map(b => b.id === newEntry.id ? { ...b, status: 'completed' as const } : b));
      setCreating(false);
    }, 2000);
  }

  function deleteBackup(id: number) {
    setBackups(prev => prev.filter(b => b.id !== id));
    setDeleteConfirm(null);
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">النسخ الاحتياطي</h1>
          <p className="text-sm text-theme-muted font-cairo">إدارة النسخ الاحتياطية لقاعدة البيانات</p>
        </div>
        <button onClick={createBackup} disabled={creating}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 disabled:opacity-50 transition-all">
          {creating ? (
            <><div className="w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full animate-spin" /> جاري الإنشاء...</>
          ) : (
            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>إنشاء نسخة احتياطية</>
          )}
        </button>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-theme-gold/10 bg-theme-card p-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3">
            <span className="text-white text-lg">💾</span>
          </div>
          <p className="text-2xl font-bold font-playfair text-theme mb-0.5">{stats.total}</p>
          <p className="text-xs text-theme-muted font-cairo">إجمالي النسخ</p>
        </div>
        <div className="rounded-2xl border border-theme-gold/10 bg-theme-card p-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-3">
            <span className="text-white text-lg">🕐</span>
          </div>
          <p className="text-lg font-bold font-playfair text-theme mb-0.5 font-english">{stats.latest}</p>
          <p className="text-xs text-theme-muted font-cairo">آخر نسخة</p>
        </div>
        <div className="rounded-2xl border border-theme-gold/10 bg-theme-card p-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-3">
            <span className="text-white text-lg">📦</span>
          </div>
          <p className="text-2xl font-bold font-playfair text-theme mb-0.5">{stats.totalSize}</p>
          <p className="text-xs text-theme-muted font-cairo">الحجم الإجمالي</p>
        </div>
        <div className="rounded-2xl border border-theme-gold/10 bg-theme-card p-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mb-3">
            <span className="text-white text-lg">🗄️</span>
          </div>
          <p className="text-2xl font-bold font-playfair text-theme mb-0.5">١٫٢ GB</p>
          <p className="text-xs text-theme-muted font-cairo">حجم قاعدة البيانات</p>
          <p className="text-[10px] text-theme-muted/50 font-cairo">٤٢ جدول · آخر تحسين: ٢٧ يونيو</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <h2 className="text-sm font-bold font-cairo text-theme mb-4">سجل النسخ الاحتياطية</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-theme-gold/10 text-theme-muted text-[11px] font-cairo">
                  <th className="pb-3 px-2 font-medium">#</th>
                  <th className="pb-3 px-2 font-medium">التاريخ</th>
                  <th className="pb-3 px-2 font-medium">الحجم</th>
                  <th className="pb-3 px-2 font-medium">النوع</th>
                  <th className="pb-3 px-2 font-medium">الحالة</th>
                  <th className="pb-3 px-2 font-medium">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {backups.map((b, i) => (
                  <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.01 }}
                    className="border-b border-theme-gold/5 hover:bg-theme-gold/5 transition-colors">
                    <td className="py-3 px-2 text-xs text-theme-muted font-english">{b.id}</td>
                    <td className="py-3 px-2 text-xs text-theme font-english font-mono">{b.date}</td>
                    <td className="py-3 px-2 text-xs text-theme font-english">{b.size}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-cairo ${
                        b.type === 'auto' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
                      }`}>{b.type === 'auto' ? 'تلقائي' : 'يدوي'}</span>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-cairo ${
                        b.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                        b.status === 'failed' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {b.status === 'completed' ? 'مكتمل' : b.status === 'failed' ? 'فشل' : 'قيد التنفيذ'}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-theme-muted hover:text-emerald-400 transition-all"
                          title="تحميل">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                        </button>
                        <button onClick={() => setRestoreConfirm(b.id)}
                          className="p-1.5 rounded-lg hover:bg-amber-500/10 text-theme-muted hover:text-amber-400 transition-all"
                          title="استعادة">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
                        </button>
                        <button onClick={() => setDeleteConfirm(b.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-theme-muted hover:text-red-400 transition-all"
                          title="حذف">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <h2 className="text-sm font-bold font-cairo text-theme mb-4">إعدادات النسخ التلقائي</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-theme-surface border border-theme-border">
              <span className="text-sm text-theme font-cairo">تفعيل النسخ التلقائي</span>
              <button onClick={() => setAutoSettings(p => ({ ...p, enabled: !p.enabled }))}
                className={`relative w-11 h-6 rounded-full transition-all ${autoSettings.enabled ? 'bg-emerald-500' : 'bg-theme-border'}`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${autoSettings.enabled ? 'right-[22px]' : 'right-0.5'}`} />
              </button>
            </div>
            <div>
              <label className="block text-xs text-theme-muted font-cairo mb-1.5">التكرار</label>
              <select value={autoSettings.frequency} onChange={e => setAutoSettings(p => ({ ...p, frequency: e.target.value as 'daily' | 'weekly' | 'monthly' }))}
                className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:outline-none focus:border-theme-gold/40">
                <option value="daily">يومي</option><option value="weekly">أسبوعي</option><option value="monthly">شهري</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-theme-muted font-cairo mb-1.5">الوقت</label>
              <input type="time" value={autoSettings.time} onChange={e => setAutoSettings(p => ({ ...p, time: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-english focus:outline-none focus:border-theme-gold/40" />
            </div>
            <button
              className="w-full px-4 py-2.5 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-all">
              حفظ الإعدادات
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {deleteConfirm !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="rounded-2xl border border-red-500/20 bg-theme-card p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold font-cairo text-theme mb-2">تأكيد الحذف</h3>
              <p className="text-sm text-theme-secondary font-cairo mb-6">هل أنت متأكد من حذف هذه النسخة الاحتياطية؟</p>
              <div className="flex items-center gap-3 justify-end">
                <button onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
                <button onClick={() => deleteBackup(deleteConfirm)}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white text-xs font-bold font-cairo hover:bg-red-600 transition-all">حذف</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {restoreConfirm !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="rounded-2xl border border-amber-500/20 bg-theme-card p-6 max-w-md w-full">
              <h3 className="text-lg font-bold font-cairo text-theme mb-2">تأكيد الاستعادة</h3>
              <p className="text-sm text-theme-secondary font-cairo mb-2">تحذير: استعادة النسخة الاحتياطية ستؤدي إلى استبدال قاعدة البيانات الحالية. قد تفقد البيانات التي تم إنشاؤها بعد تاريخ النسخة.</p>
              <p className="text-xs text-amber-400 font-cairo mb-6">هذا الإجراء لا يمكن التراجع عنه. يرجى التأكد من عمل نسخة احتياطية أولاً.</p>
              <div className="flex items-center gap-3 justify-end">
                <button onClick={() => setRestoreConfirm(null)}
                  className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
                <button onClick={() => setRestoreConfirm(null)}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold font-cairo hover:bg-amber-600 transition-all">استعادة</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
