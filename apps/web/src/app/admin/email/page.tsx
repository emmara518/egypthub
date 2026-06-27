'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmailTemplate {
  id: number;
  name: string;
  nameAr: string;
  subject: string;
  body: string;
  status: 'active' | 'inactive';
  lastUpdated: string;
}

const variables = [
  '{{userName}}', '{{userEmail}}', '{{bookingRef}}', '{{bookingDate}}', '{{amount}}',
  '{{experienceName}}', '{{partnerName}}', '{{city}}', '{{commissionAmount}}', '{{link}}',
  '{{year}}', '{{siteName}}', '{{supportEmail}}',
];

const initialTemplates: EmailTemplate[] = [
  {
    id: 1, name: 'welcome', nameAr: 'بريد ترحيبي', subject: 'مرحباً بك في إيجيبت هب!',
    body: '<div style="font-family:Arial;padding:20px;max-width:600px;margin:auto"><h1>مرحباً {{userName}}!</h1><p>نرحب بك في إيجيبت هب، منصة السياحة المصرية الأولى.</p><p>اكتشف أفضل التجارب والفنادق والأنشطة في جميع أنحاء مصر.</p><a href="{{link}}" style="display:inline-block;padding:12px 24px;background:#c9a84c;color:#1a1a1a;text-decoration:none;border-radius:8px">ابدأ الآن</a><hr><p style="font-size:12px;color:#888">© {{year}} {{siteName}}</p></div>',
    status: 'active', lastUpdated: '2026-06-01',
  },
  {
    id: 2, name: 'booking-confirmation', nameAr: 'تأكيد الحجز', subject: 'تم تأكيد حجزك - {{bookingRef}}',
    body: '<div style="font-family:Arial;padding:20px;max-width:600px;margin:auto"><h1>تم تأكيد الحجز!</h1><p>عزيزي {{userName}}،</p><p>تم تأكيد حجزك لتجربة {{experienceName}} في {{city}}.</p><p><strong>رقم الحجز:</strong> {{bookingRef}}<br><strong>التاريخ:</strong> {{bookingDate}}<br><strong>المبلغ:</strong> {{amount}}</p><a href="{{link}}" style="display:inline-block;padding:12px 24px;background:#c9a84c;color:#1a1a1a;text-decoration:none;border-radius:8px">عرض الحجز</a><hr><p style="font-size:12px;color:#888">© {{year}} {{siteName}}</p></div>',
    status: 'active', lastUpdated: '2026-06-10',
  },
  {
    id: 3, name: 'payment-receipt', nameAr: 'إيصال الدفع', subject: 'إيصال الدفع - {{bookingRef}}',
    body: '<div style="font-family:Arial;padding:20px;max-width:600px;margin:auto"><h1>إيصال الدفع</h1><p>شكراً لك {{userName}} على استخدام إيجيبت هب.</p><p><strong>رقم الحجز:</strong> {{bookingRef}}<br><strong>المبلغ المدفوع:</strong> {{amount}}<br><strong>التاريخ:</strong> {{bookingDate}}</p><hr><p style="font-size:12px;color:#888">للاستفسار: {{supportEmail}}</p></div>',
    status: 'active', lastUpdated: '2026-06-08',
  },
  {
    id: 4, name: 'password-reset', nameAr: 'إعادة تعيين كلمة المرور', subject: 'إعادة تعيين كلمة المرور - إيجيبت هب',
    body: '<div style="font-family:Arial;padding:20px;max-width:600px;margin:auto"><h1>إعادة تعيين كلمة المرور</h1><p>مرحباً {{userName}}،</p><p>لقد تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بك.</p><a href="{{link}}" style="display:inline-block;padding:12px 24px;background:#c9a84c;color:#1a1a1a;text-decoration:none;border-radius:8px">إعادة تعيين كلمة المرور</a><p style="font-size:12px;color:#888">إذا لم تطلب ذلك، يرجى تجاهل هذا البريد.</p><hr><p style="font-size:12px;color:#888">© {{year}} {{siteName}}</p></div>',
    status: 'active', lastUpdated: '2026-05-20',
  },
  {
    id: 5, name: 'commission-paid', nameAr: 'دفع العمولة', subject: 'تم دفع عمولتك - إيجيبت هب',
    body: '<div style="font-family:Arial;padding:20px;max-width:600px;margin:auto"><h1>تم دفع العمولة</h1><p>عزيزي الشريك {{partnerName}}،</p><p>تم إضافة عمولة قدرها {{commissionAmount}} إلى محفظتك.</p><a href="{{link}}" style="display:inline-block;padding:12px 24px;background:#c9a84c;color:#1a1a1a;text-decoration:none;border-radius:8px">عرض المحفظة</a><hr><p style="font-size:12px;color:#888">للاستفسار: {{supportEmail}}</p></div>',
    status: 'inactive', lastUpdated: '2026-06-12',
  },
  {
    id: 6, name: 'promotion', nameAr: 'عرض ترويجي', subject: 'عرض خاص لك {{userName}}! خصم يصل إلى ٣٠٪',
    body: '<div style="font-family:Arial;padding:20px;max-width:600px;margin:auto"><h1>عرض خاص!</h1><p>مرحباً {{userName}}،</p><p>استمتع بخصم يصل إلى ٣٠٪ على حجز تجربتك القادمة في مصر!</p><a href="{{link}}" style="display:inline-block;padding:12px 24px;background:#c9a84c;color:#1a1a1a;text-decoration:none;border-radius:8px">استفد من العرض</a><p style="font-size:12px;color:#888">العرض ساري حتى نهاية الشهر.</p><hr><p style="font-size:12px;color:#888">© {{year}} {{siteName}}</p></div>',
    status: 'inactive', lastUpdated: '2026-06-14',
  },
  {
    id: 7, name: 'newsletter', nameAr: 'النشرة البريدية', subject: 'أخبار إيجيبت هب - أحدث التجارب والعروض',
    body: '<div style="font-family:Arial;padding:20px;max-width:600px;margin:auto"><h1>أخبار إيجيبت هب</h1><p>مرحباً {{userName}}،</p><p>اكتشف أحدث التجارب والعروض الحصرية لهذا الشهر:</p><ul><li>تجارب جديدة في الغردقة</li><li>عروض خاصة على رحلات النيل</li><li>خصومات للسفراء</li></ul><a href="{{link}}" style="display:inline-block;padding:12px 24px;background:#c9a84c;color:#1a1a1a;text-decoration:none;border-radius:8px">تصفح التجارب</a><hr><p style="font-size:12px;color:#888">لإلغاء الاشتراك: <a href="{{link}}/unsubscribe">اضغط هنا</a></p></div>',
    status: 'active', lastUpdated: '2026-06-05',
  },
];

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function EmailPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(initialTemplates);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<{ open: boolean; template?: EmailTemplate }>({ open: false });

  const filtered = useMemo(() => {
    if (!search.trim()) return templates;
    const q = search.toLowerCase();
    return templates.filter(t => t.nameAr.includes(q) || t.subject.includes(q));
  }, [templates, search]);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">قوالب البريد الإلكتروني</h1>
          <p className="text-sm text-theme-muted font-cairo">إدارة قوالب رسائل البريد الإلكتروني</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث عن قالب..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-cairo focus:outline-none focus:border-theme-gold/40" />
          </div>
          <span className="text-xs text-theme-muted font-cairo">{filtered.length} قالب</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-theme-gold/10 text-theme-muted text-[11px] font-cairo">
                <th className="pb-3 px-2 font-medium">القالب</th>
                <th className="pb-3 px-2 font-medium">عنوان البريد</th>
                <th className="pb-3 px-2 font-medium">آخر تحديث</th>
                <th className="pb-3 px-2 font-medium">الحالة</th>
                <th className="pb-3 px-2 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <motion.tr key={t.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                  className="border-b border-theme-gold/5 hover:bg-theme-gold/5 transition-colors">
                  <td className="py-3 px-2 text-sm text-theme font-cairo">{t.nameAr}</td>
                  <td className="py-3 px-2 text-xs text-theme-secondary font-cairo max-w-[300px] truncate">{t.subject}</td>
                  <td className="py-3 px-2 text-xs text-theme-muted font-english">{t.lastUpdated}</td>
                  <td className="py-3 px-2">
                    <button onClick={() => setTemplates(prev => prev.map(tm => tm.id === t.id ? { ...tm, status: tm.status === 'active' ? 'inactive' : 'active' } : tm))}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-cairo ${
                        t.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                      {t.status === 'active' ? 'نشط' : 'غير نشط'}
                    </button>
                  </td>
                  <td className="py-3 px-2">
                    <button onClick={() => setModal({ open: true, template: t })}
                      className="p-1.5 rounded-lg hover:bg-theme-gold/10 text-theme-muted hover:text-theme-gold transition-all">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {modal.open && modal.template && (
          <EmailModal template={modal.template} onClose={() => setModal({ open: false })} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function EmailModal({ template, onClose }: { template: EmailTemplate; onClose: () => void }) {
  const [form, setForm] = useState({ subject: template.subject, body: template.body });
  const [showPreview, setShowPreview] = useState(false);
  const [showSent, setShowSent] = useState(false);

  const previewHtml = form.body
    .replace(/{{userName}}/g, 'أحمد')
    .replace(/{{bookingRef}}/g, 'BK-2026-001')
    .replace(/{{amount}}/g, '١٬٢٠٠ ج.م')
    .replace(/{{experienceName}}/g, 'رحلة نيلية')
    .replace(/{{city}}/g, 'القاهرة')
    .replace(/{{partnerName}}/g, 'شريك مصري')
    .replace(/{{commissionAmount}}/g, '١٨٠ ج.م')
    .replace(/{{bookingDate}}/g, '٢٠٢٦/٠٧/١٥')
    .replace(/{{link}}/g, 'https://egypthub.com')
    .replace(/{{year}}/g, '2026')
    .replace(/{{siteName}}/g, 'إيجيبت هب')
    .replace(/{{supportEmail}}/g, 'support@egypthub.com');

  function sendTest() {
    setShowSent(true);
    setTimeout(() => setShowSent(false), 3000);
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        className="rounded-2xl border border-theme-gold/10 bg-theme-card p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold font-cairo text-theme">تحرير: {template.nameAr}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-theme-gold/10 text-theme-muted hover:text-theme-gold transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs text-theme-muted font-cairo mb-1.5">عنوان البريد (Subject)</label>
            <input type="text" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-cairo focus:outline-none focus:border-theme-gold/40" />
          </div>
          <div>
            <label className="block text-xs text-theme-muted font-cairo mb-1.5">محتوى البريد (HTML)</label>
            <textarea value={form.body} onChange={e => setForm(p => ({ ...p, body: e.target.value }))} rows={12}
              className="w-full px-3 py-2.5 rounded-xl bg-theme-surface border border-theme-gold/15 text-theme text-xs font-mono focus:outline-none focus:border-theme-gold/40 resize-none" dir="ltr" />
          </div>
          <div>
            <label className="block text-xs text-theme-muted font-cairo mb-2">المتغيرات المتاحة:</label>
            <div className="flex flex-wrap gap-1.5">
              {variables.map(v => (
                <span key={v} className="px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold text-[10px] font-mono">{v}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap mb-6">
          <button onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">
            {showPreview ? 'إخفاء المعاينة' : 'معاينة'}
          </button>
          <button onClick={sendTest}
            className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">
            إرسال بريد اختبار
          </button>
          {showSent && <span className="text-xs text-emerald-400 font-cairo">تم إرسال البريد الاختباري ✓</span>}
        </div>

        {showPreview && (
          <div className="rounded-xl border border-theme-gold/10 overflow-hidden mb-6">
            <div className="bg-theme-surface px-4 py-2 border-b border-theme-gold/10">
              <p className="text-xs text-theme-muted font-cairo">معاينة البريد</p>
            </div>
            <div className="bg-white p-4" dangerouslySetInnerHTML={{ __html: previewHtml }} />
          </div>
        )}

        <div className="flex items-center gap-3 justify-end pt-4 border-t border-theme-gold/10">
          <button onClick={onClose}
            className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
          <button onClick={onClose}
            className="px-4 py-2 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-all">حفظ التغييرات</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
