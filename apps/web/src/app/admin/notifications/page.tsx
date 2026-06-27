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

interface Notification {
  id: string; title: string; type: 'info' | 'warning' | 'success' | 'promotion';
  audience: string; sentDate: string; readCount: number; totalSent: number; message: string; status: 'sent' | 'scheduled' | 'draft';
}

const NOTIF_TYPES: Record<string, { label: string; color: string }> = {
  info: { label: 'معلومات', color: 'text-blue-400 bg-blue-500/10' },
  warning: { label: 'تنبيه', color: 'text-amber-400 bg-amber-500/10' },
  success: { label: 'نجاح', color: 'text-emerald-400 bg-emerald-500/10' },
  promotion: { label: 'ترويج', color: 'text-purple-400 bg-purple-500/10' },
};

const AUDIENCE_OPTIONS = ['جميع المستخدمين', 'المسافرون', 'مزودو الخدمة', 'الشركاء', 'السفراء', 'مستخدم محدد'];
const AUDIENCE_MAP: Record<string, string> = {
  'جميع المستخدمين': 'all', 'المسافرون': 'travelers', 'مزودو الخدمة': 'providers', 'الشركاء': 'partners', 'السفراء': 'ambassadors', 'مستخدم محدد': 'user',
};

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n-01', title: 'عرض خاص: خصم 20% على رحلات النيل', type: 'promotion', audience: 'جميع المستخدمين', sentDate: '2025-01-20', readCount: 452, totalSent: 1200, message: 'احصل على خصم 20% على جميع رحلات النيل لفترة محدودة. استخدم الكود: NILE20', status: 'sent' },
  { id: 'n-02', title: 'تأكيد حجز رحلة سفاري', type: 'success', audience: 'المسافرون', sentDate: '2025-01-19', readCount: 128, totalSent: 180, message: 'تم تأكيد حجز رحلة السفاري في صحراء سيوة بنجاح', status: 'sent' },
  { id: 'n-03', title: 'تنبيه: تغيير موعد الرحلة', type: 'warning', audience: 'جميع المستخدمين', sentDate: '2025-01-18', readCount: 890, totalSent: 1500, message: 'تم تغيير موعد بعض الرحلات بسبب الظروف الجوية. يرجى التحقق من بريدك الإلكتروني', status: 'sent' },
  { id: 'n-04', title: 'ترحيب بعضوية EgyptHub', type: 'info', audience: 'المسافرون', sentDate: '2025-01-17', readCount: 320, totalSent: 450, message: 'مرحباً بك في مجتمع EgyptHub! اكتشف أفضل التجارب السياحية في مصر', status: 'sent' },
  { id: 'n-05', title: 'عرض العيد: خصم 30%', type: 'promotion', audience: 'جميع المستخدمين', sentDate: '2025-01-15', readCount: 2100, totalSent: 3000, message: 'بمناسبة عيد الفطر المبارك، خصم 30% على جميع الحجوزات!', status: 'sent' },
  { id: 'n-06', title: 'تحديث سياسة الإلغاء', type: 'info', audience: 'مزودو الخدمة', sentDate: '2025-01-14', readCount: 56, totalSent: 80, message: 'تم تحديث سياسة الإلغاء للمنصة. يرجى الاطلاع على التحديثات الجديدة', status: 'sent' },
  { id: 'n-07', title: 'تهانينا! تم تحقيق الهدف', type: 'success', audience: 'السفراء', sentDate: '2025-01-13', readCount: 23, totalSent: 35, message: 'أحسنت! لقد حققت هدف الإحالات الشهري. استمر في العمل الرائع!', status: 'sent' },
  { id: 'n-08', title: 'تذكير: تقرير العمولات', type: 'warning', audience: 'الشركاء', sentDate: '2025-01-12', readCount: 67, totalSent: 120, message: 'تذكير بضرورة تقديم تقرير العمولات الشهري قبل نهاية الأسبوع', status: 'sent' },
  { id: 'n-09', title: 'عرض حصري لمشتركي الباقة', type: 'promotion', audience: 'المسافرون', sentDate: '2025-01-11', readCount: 189, totalSent: 250, message: 'عرض حصري لحاملي الباقة الذهبية: غوص مجاني في راس محمد', status: 'sent' },
  { id: 'n-10', title: 'إشعار: شريك جديد في مدينتك', type: 'info', audience: 'السفراء', sentDate: '2025-01-10', readCount: 15, totalSent: 28, message: 'تم إضافة شريك جديد في مدينتك. قم بزيارته وتعرف على خدماته', status: 'sent' },
  { id: 'n-11', title: 'تقييم جديد على ملفك', type: 'success', audience: 'مزودو الخدمة', sentDate: '2025-01-09', readCount: 42, totalSent: 65, message: 'قام أحد العملاء بتقييم خدمتك. يمكنك الاطلاع على التقييم والرد عليه', status: 'sent' },
  { id: 'n-12', title: 'ندوة عبر الإنترنت: السياحة في مصر', type: 'info', audience: 'جميع المستخدمين', sentDate: '2025-01-08', readCount: 780, totalSent: 1200, message: 'ندوة مجانية عبر الإنترنت عن مستقبل السياحة في مصر. سجل الآن!', status: 'sent' },
  { id: 'n-13', title: 'عرض الشتاء: خصم 15%', type: 'promotion', audience: 'جميع المستخدمين', sentDate: '2024-12-20', readCount: 1500, totalSent: 2000, message: 'استمتع بعروض الشتاء وخصم 15% على جميع الحجوزات حتى 31 يناير', status: 'sent' },
  { id: 'n-14', title: 'إعلان شراكة جديدة', type: 'info', audience: 'جميع المستخدمين', sentDate: '2024-12-15', readCount: 3400, totalSent: 5000, message: 'يسعدنا الإعلان عن شراكتنا مع أفضل فنادق ومنتجعات مصر', status: 'sent' },
  { id: 'n-15', title: 'صيانة النظام المجدولة', type: 'warning', audience: 'مزودو الخدمة', sentDate: '2024-12-10', readCount: 78, totalSent: 85, message: 'سيتم إجراء صيانة للنظام يوم الجمعة من 2-4 صباحاً. قد يتأثر الوصول للمنصة', status: 'sent' },
  { id: 'n-16', title: 'ترقية حسابك إلى VIP', type: 'success', audience: 'المسافرون', sentDate: '2024-12-05', readCount: 95, totalSent: 150, message: 'تهانينا! تمت ترقية حسابك إلى عضوية VIP واستمتع بالمزايا الحصرية', status: 'sent' },
  { id: 'n-17', title: 'دعوة: مؤتمر السياحة', type: 'promotion', audience: 'الشركاء', sentDate: '2024-12-01', readCount: 34, totalSent: 60, message: 'دعوة لحضور مؤتمر السياحة المصري السنوي. المقاعد محدودة!', status: 'sent' },
  { id: 'n-18', title: 'إطلاق تطبيق الجوال', type: 'info', audience: 'جميع المستخدمين', sentDate: '2024-11-28', readCount: 5100, totalSent: 8000, message: 'أصبح تطبيق EgyptHub متاحاً الآن على App Store و Google Play', status: 'sent' },
  { id: 'n-19', title: 'مسابقة: اربح رحلة مجانية', type: 'promotion', audience: 'جميع المستخدمين', sentDate: '2024-11-20', readCount: 4200, totalSent: 6000, message: 'شارك في مسابقة EgyptHub واربح رحلة مجانية إلى شرم الشيخ!', status: 'sent' },
  { id: 'n-20', title: 'تحديث الأسعار', type: 'warning', audience: 'مزودو الخدمة', sentDate: '2024-11-15', readCount: 45, totalSent: 80, message: 'تم تحديث أسعار بعض الخدمات على المنصة. يرجى مراجعة قائمة الأسعار', status: 'sent' },
  { id: 'n-21', title: 'عرض الجمعة البيضاء', type: 'promotion', audience: 'جميع المستخدمين', sentDate: '2024-11-25', readCount: 6800, totalSent: 10000, message: 'خصم حتى 50% على جميع الحجوزات في الجمعة البيضاء!', status: 'sent' },
];

export default function NotificationsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [audienceFilter, setAudienceFilter] = useState('');
  const [selected, setSelected] = useState<Notification | null>(null);
  const [sendTitle, setSendTitle] = useState('');
  const [sendMessage, setSendMessage] = useState('');
  const [sendAudience, setSendAudience] = useState('جميع المستخدمين');
  const [sendType, setSendType] = useState('info');
  const [sending, setSending] = useState(false);

  const stats = useMemo(() => {
    const all = MOCK_NOTIFICATIONS;
    return {
      totalSent: all.filter(n => n.status === 'sent').length,
      unread: all.reduce((s, n) => s + (n.totalSent - n.readCount), 0),
      read: all.reduce((s, n) => s + n.readCount, 0),
      scheduled: all.filter(n => n.status === 'scheduled').length,
    };
  }, []);

  const filtered = useMemo(() => {
    return MOCK_NOTIFICATIONS.filter(n => {
      if (search && !n.title.includes(search) && !n.message.includes(search)) return false;
      if (typeFilter && n.type !== typeFilter) return false;
      if (audienceFilter && n.audience !== audienceFilter) return false;
      return true;
    });
  }, [search, typeFilter, audienceFilter]);

  const handleSend = () => {
    if (!sendTitle.trim() || !sendMessage.trim()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSendTitle('');
      setSendMessage('');
      setSendAudience('جميع المستخدمين');
      setSendType('info');
    }, 1500);
  };

  const calculateReadRate = (n: Notification) => n.totalSent > 0 ? Math.round((n.readCount / n.totalSent) * 100) : 0;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-playfair font-bold text-theme mb-1">إدارة الإشعارات</h1>
            <p className="text-sm text-theme-muted font-cairo">إرسال وإدارة الإشعارات للمستخدمين</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <p className="text-2xl font-bold font-playfair text-theme mb-0.5">{stats.totalSent}</p>
          <p className="text-xs text-theme-muted font-cairo">إجمالي المرسلة</p>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <p className="text-2xl font-bold font-playfair text-blue-400 mb-0.5">{stats.unread.toLocaleString('ar-EG')}</p>
          <p className="text-xs text-theme-muted font-cairo">غير مقروءة</p>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <p className="text-2xl font-bold font-playfair text-emerald-400 mb-0.5">{stats.read.toLocaleString('ar-EG')}</p>
          <p className="text-xs text-theme-muted font-cairo">مقروءة</p>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <p className="text-2xl font-bold font-playfair text-purple-400 mb-0.5">{stats.scheduled}</p>
          <p className="text-xs text-theme-muted font-cairo">مجدولة</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <h2 className="text-sm font-bold font-cairo text-theme mb-5">إرسال إشعار جديد</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-theme-muted font-cairo mb-1.5">العنوان</label>
              <input value={sendTitle} onChange={e => setSendTitle(e.target.value)} placeholder="عنوان الإشعار" className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40" />
            </div>
            <div>
              <label className="block text-xs text-theme-muted font-cairo mb-1.5">الرسالة</label>
              <textarea value={sendMessage} onChange={e => setSendMessage(e.target.value)} rows={4} placeholder="نص الإشعار..." className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40 resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-theme-muted font-cairo mb-1.5">الجمهور المستهدف</label>
                <select value={sendAudience} onChange={e => setSendAudience(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:outline-none focus:border-theme-gold/40">
                  {AUDIENCE_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-theme-muted font-cairo mb-1.5">النوع</label>
                <select value={sendType} onChange={e => setSendType(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:outline-none focus:border-theme-gold/40">
                  <option value="info">معلومات</option>
                  <option value="warning">تنبيه</option>
                  <option value="success">نجاح</option>
                  <option value="promotion">ترويج</option>
                </select>
              </div>
            </div>
            <button onClick={handleSend} disabled={sending || !sendTitle.trim() || !sendMessage.trim()}
              className="w-full py-2.5 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {sending ? (
                <><div className="w-4 h-4 border-2 border-dark-900/30 border-t-dark-900 rounded-full animate-spin" /> جاري الإرسال...</>
              ) : (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> إرسال الإشعار</>
              )}
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-3 rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <h2 className="text-sm font-bold font-cairo text-theme mb-4">معاينة الإشعار</h2>
          {sendTitle || sendMessage ? (
            <div className="rounded-xl border border-theme-gold/15 bg-theme-surface p-4">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${NOTIF_TYPES[sendType]?.color || 'bg-theme-gold/10'}`}>
                  {sendType === 'info' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>}
                  {sendType === 'warning' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
                  {sendType === 'success' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
                  {sendType === 'promotion' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-theme font-cairo">{sendTitle || 'عنوان الإشعار'}</p>
                  <p className="text-xs text-theme-secondary font-cairo mt-1">{sendMessage || 'نص الإشعار سيظهر هنا...'}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${NOTIF_TYPES[sendType]?.color}`}>{NOTIF_TYPES[sendType]?.label}</span>
                    <span className="text-[10px] text-theme-muted font-cairo">{sendAudience}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 rounded-xl bg-theme-surface border border-theme-border border-dashed">
              <p className="text-sm text-theme-muted font-cairo">اكتب عنوان ورسالة لمعاينة الإشعار</p>
            </div>
          )}
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
        <h2 className="text-sm font-bold font-cairo text-theme mb-4">سجل الإشعارات</h2>
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="relative flex-1 min-w-[200px]">
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث بالعنوان أو المحتوى..." className="w-full pr-10 pl-3 py-2 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40" />
          </div>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:outline-none focus:border-theme-gold/40">
            <option value="">كل الأنواع</option>
            {Object.entries(NOTIF_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <select value={audienceFilter} onChange={e => setAudienceFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:outline-none focus:border-theme-gold/40">
            <option value="">كل الجمهور</option>
            {AUDIENCE_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-theme-gold/10">
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">العنوان</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">النوع</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">الجمهور</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">التاريخ</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">مقروءة</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2">نسبة المشاهدة</th>
                <th className="pb-3 text-[10px] text-theme-muted font-cairo font-medium px-2"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((n, i) => (
                <motion.tr key={n.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                  className="border-b border-theme-gold/5 hover:bg-theme-surface/50 transition-colors cursor-pointer"
                  onClick={() => setSelected(n)}>
                  <td className="py-3 px-2 text-xs text-theme font-cairo truncate max-w-[180px]">{n.title}</td>
                  <td className="py-3 px-2"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${NOTIF_TYPES[n.type]?.color}`}>{NOTIF_TYPES[n.type]?.label}</span></td>
                  <td className="py-3 px-2 text-[10px] text-theme-muted font-cairo">{n.audience}</td>
                  <td className="py-3 px-2 text-[10px] text-theme-muted font-cairo">{new Date(n.sentDate).toLocaleDateString('ar-EG')}</td>
                  <td className="py-3 px-2 text-xs text-theme font-cairo">{n.readCount.toLocaleString('ar-EG')} / {n.totalSent.toLocaleString('ar-EG')}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded-full bg-theme-surface overflow-hidden">
                        <div className={`h-full rounded-full ${calculateReadRate(n) > 80 ? 'bg-emerald-400' : calculateReadRate(n) > 50 ? 'bg-amber-400' : 'bg-red-400'}`}
                          style={{ width: `${calculateReadRate(n)}%` }} />
                      </div>
                      <span className="text-[10px] text-theme-muted font-english">{calculateReadRate(n)}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <button onClick={(e) => { e.stopPropagation(); setSelected(n); }}
                      className="px-2 py-1 rounded-lg bg-theme-gold/10 text-theme-gold text-[10px] font-bold hover:bg-theme-gold/20 transition-all">تفاصيل</button>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center py-8 text-theme-muted font-cairo text-sm">لا توجد إشعارات مطابقة</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-lg rounded-2xl border border-theme-gold/10 bg-theme-card p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold font-cairo text-theme">تفاصيل الإشعار</h2>
                <button onClick={() => setSelected(null)} className="p-1 rounded-lg hover:bg-theme-surface text-theme-muted">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-theme-surface border border-theme-border">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${NOTIF_TYPES[selected.type]?.color}`}>
                    {selected.type === 'info' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>}
                    {selected.type === 'warning' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
                    {selected.type === 'success' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
                    {selected.type === 'promotion' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-theme font-cairo">{selected.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${NOTIF_TYPES[selected.type]?.color}`}>{NOTIF_TYPES[selected.type]?.label}</span>
                      <span className="text-[10px] text-theme-muted font-cairo">{selected.audience}</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-theme-surface border border-theme-border">
                  <p className="text-[10px] text-theme-muted font-cairo mb-1.5">الرسالة</p>
                  <p className="text-sm text-theme font-cairo leading-relaxed">{selected.message}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-theme-surface border border-theme-border text-center">
                    <p className="text-lg font-bold font-playfair text-theme">{selected.totalSent.toLocaleString('ar-EG')}</p>
                    <p className="text-[10px] text-theme-muted font-cairo">تم الإرسال</p>
                  </div>
                  <div className="p-3 rounded-xl bg-theme-surface border border-theme-border text-center">
                    <p className="text-lg font-bold font-playfair text-emerald-400">{selected.readCount.toLocaleString('ar-EG')}</p>
                    <p className="text-[10px] text-theme-muted font-cairo">مقروءة</p>
                  </div>
                  <div className="p-3 rounded-xl bg-theme-surface border border-theme-border text-center">
                    <p className="text-lg font-bold font-playfair text-theme-gold">{calculateReadRate(selected)}%</p>
                    <p className="text-[10px] text-theme-muted font-cairo">مشاهدة</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إغلاق</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
