'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SeoPage {
  id: number;
  route: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string;
  lastUpdated: string;
}

const initialPages: SeoPage[] = [
  { id: 1, route: '/', title: 'إيجيبت هب - بوابة السياحة المصرية', description: 'اكتشف أفضل التجارب السياحية في مصر. احجز فنادق، رحلات، وأنشطة في القاهرة، الأقصر، الغردقة والمزيد.', ogTitle: 'إيجيبت هب | EgyptHub', ogDescription: 'منصة حجز التجارب السياحية في مصر', keywords: 'سياحة مصر, حجز فنادق, رحلات مصر', lastUpdated: '2026-06-15' },
  { id: 2, route: '/experiences', title: 'جميع التجارب - إيجيبت هب', description: 'تصفح مئات التجارب السياحية في جميع أنحاء مصر. اختر من بين الغوص، السفاري، الجولات الثقافية والمزيد.', ogTitle: 'التجارب السياحية | إيجيبت هب', ogDescription: 'تصفح جميع التجارب المتاحة', keywords: 'تجارب سياحية, أنشطة مصر, رحلات', lastUpdated: '2026-06-10' },
  { id: 3, route: '/about', title: 'عن إيجيبت هب - قصتنا', description: 'تعرف على قصة إيجيبت هب، مهمتنا في تعزيز السياحة المصرية، وفريق العمل.', ogTitle: 'عن المنصة | إيجيبت هب', ogDescription: 'قصتنا ورؤيتنا للسياحة المصرية', keywords: 'عن المنصة, فريق العمل, مهمتنا', lastUpdated: '2026-06-01' },
  { id: 4, route: '/contact', title: 'اتصل بنا - إيجيبت هب', description: 'تواصل مع فريق إيجيبت هب. نحن هنا لمساعدتك في أي استفسار.', ogTitle: 'اتصل بنا | إيجيبت هب', ogDescription: 'طرق التواصل معنا', keywords: 'اتصال, تواصل, دعم', lastUpdated: '2026-05-28' },
  { id: 5, route: '/destinations', title: 'الوجهات السياحية - إيجيبت هب', description: 'استكشف أجمل الوجهات السياحية في مصر: القاهرة، الأقصر، أسوان، الغردقة، شرم الشيخ والمزيد.', ogTitle: 'الوجهات | إيجيبت هب', ogDescription: 'اكتشف الوجهات المصرية', keywords: 'وجهات سياحية, مدن مصر, سفر', lastUpdated: '2026-06-12' },
  { id: 6, route: '/blog', title: 'مدونة إيجيبت هب - مقالات سياحية', description: 'اقرأ أحدث المقالات والنصائح عن السياحة في مصر، أفضل الأماكن، وأدلة السفر.', ogTitle: 'المدونة | إيجيبت هب', ogDescription: 'نصائح وأدلة سياحية', keywords: 'مدونة سياحية, مقالات مصر, نصائح سفر', lastUpdated: '2026-06-08' },
  { id: 7, route: '/faq', title: 'الأسئلة الشائعة - إيجيبت هب', description: 'إجابات على الأسئلة الشائعة حول الحجز، الدفع، الإلغاء والسفر إلى مصر.', ogTitle: 'الأسئلة الشائعة | إيجيبت هب', ogDescription: 'إجابات لاستفساراتك', keywords: 'أسئلة شائعة, استفسارات, مساعدة', lastUpdated: '2026-05-20' },
  { id: 8, route: '/privacy', title: 'سياسة الخصوصية - إيجيبت هب', description: 'سياسة الخصوصية لكيفية جمع واستخدام وحماية بياناتك على منصة إيجيبت هب.', ogTitle: 'سياسة الخصوصية | إيجيبت هب', ogDescription: 'كيف نحمي بياناتك', keywords: 'خصوصية, بيانات, أمان', lastUpdated: '2026-04-15' },
  { id: 9, route: '/terms', title: 'الشروط والأحكام - إيجيبت هب', description: 'الشروط والأحكام لاستخدام منصة إيجيبت هب لحجز التجارب السياحية.', ogTitle: 'الشروط والأحكام | إيجيبت هب', ogDescription: 'شروط استخدام المنصة', keywords: 'شروط, أحكام, استخدام', lastUpdated: '2026-04-15' },
  { id: 10, route: '/partners', title: 'شركاؤنا - إيجيبت هب', description: 'تعرف على شركائنا من مزودي الخدمات السياحية في جميع أنحاء مصر.', ogTitle: 'الشركاء | إيجيبت هب', ogDescription: 'شركاء النجاح', keywords: 'شركاء, مزودي خدمات, سياحة', lastUpdated: '2026-06-05' },
  { id: 11, route: '/offers', title: 'العروض الخاصة - إيجيبت هب', description: 'استفد من أحدث العروض والخصومات على التجارب والفنادق في مصر.', ogTitle: 'العروض | إيجيبت هب', ogDescription: 'أفضل عروض السياحة', keywords: 'عروض, خصومات, تخفيضات', lastUpdated: '2026-06-14' },
];

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function SeoPage() {
  const [pages, setPages] = useState<SeoPage[]>(initialPages);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<{ open: boolean; page?: SeoPage }>({ open: false });
  const [robotsTxt, setRobotsTxt] = useState('User-agent: *\nAllow: /\n\nSitemap: https://egypthub.com/sitemap.xml');
  const [showRobots, setShowRobots] = useState(false);
  const [showSitemapMsg, setShowSitemapMsg] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return pages;
    const q = search.toLowerCase();
    return pages.filter(p => p.route.includes(q) || p.title.includes(q) || p.description.includes(q));
  }, [pages, search]);

  function savePage(data: Partial<SeoPage>) {
    if (modal.page) {
      setPages(prev => prev.map(p => p.id === modal.page!.id ? { ...p, ...data, lastUpdated: new Date().toISOString().split('T')[0] } : p));
    }
    setModal({ open: false });
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">تحسين محركات البحث</h1>
          <p className="text-sm text-theme-muted font-cairo">إدارة إعدادات SEO لصفحات الموقع</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowRobots(!showRobots)}
            className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">
            robots.txt
          </button>
          <button onClick={() => { setShowSitemapMsg(true); setTimeout(() => setShowSitemapMsg(false), 2000); }}
            className="px-4 py-2 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-all">
            إنشاء Sitemap
          </button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث عن صفحة..."
                className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-cairo focus:outline-none focus:border-theme-gold/40" />
            </div>
            <span className="text-xs text-theme-muted font-cairo">{filtered.length} صفحة</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-theme-gold/10 text-theme-muted text-[11px] font-cairo">
                  <th className="pb-3 px-2 font-medium">المسار</th>
                  <th className="pb-3 px-2 font-medium">العنوان</th>
                  <th className="pb-3 px-2 font-medium">الوصف</th>
                  <th className="pb-3 px-2 font-medium">آخر تحديث</th>
                  <th className="pb-3 px-2 font-medium">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((page, i) => (
                  <motion.tr key={page.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                    className="border-b border-theme-gold/5 hover:bg-theme-gold/5 transition-colors">
                    <td className="py-3 px-2 text-xs text-theme-gold font-mono" dir="ltr">{page.route}</td>
                    <td className="py-3 px-2 text-sm text-theme font-cairo max-w-[200px] truncate">{page.title}</td>
                    <td className="py-3 px-2 text-xs text-theme-secondary max-w-[250px] truncate">{page.description}</td>
                    <td className="py-3 px-2 text-xs text-theme-muted font-english">{page.lastUpdated}</td>
                    <td className="py-3 px-2">
                      <button onClick={() => setModal({ open: true, page })}
                        className="p-1.5 rounded-lg hover:bg-theme-gold/10 text-theme-muted hover:text-theme-gold transition-all">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <h2 className="text-sm font-bold font-cairo text-theme mb-4">إعدادات عامة</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-theme-muted font-cairo mb-1.5">الصورة الافتراضية (OG)</label>
              <input type="text" defaultValue="/og-default.jpg"
                className="w-full px-3 py-2 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-english focus:outline-none focus:border-theme-gold/40" />
            </div>
            <div>
              <label className="block text-xs text-theme-muted font-cairo mb-1.5">حساب Twitter</label>
              <input type="text" defaultValue="@egypthub"
                className="w-full px-3 py-2 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-english focus:outline-none focus:border-theme-gold/40" />
            </div>
            <div>
              <label className="block text-xs text-theme-muted font-cairo mb-1.5">Google Analytics ID</label>
              <input type="text" defaultValue="G-XXXXXXXXXX"
                className="w-full px-3 py-2 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-english focus:outline-none focus:border-theme-gold/40" />
            </div>
            <button className="w-full px-4 py-2 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-all">حفظ</button>
          </div>
        </div>
      </motion.div>

      {showSitemapMsg && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-center">
          <p className="text-sm text-emerald-400 font-cairo">تم إنشاء ملف Sitemap بنجاح ✓</p>
        </motion.div>
      )}

      <AnimatePresence>
        {showRobots && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold font-cairo text-theme">robots.txt</h2>
              <button onClick={() => setShowRobots(false)}
                className="text-xs text-theme-muted hover:text-theme-gold transition-all font-cairo">إغلاق</button>
            </div>
            <textarea value={robotsTxt} onChange={e => setRobotsTxt(e.target.value)} rows={6}
              className="w-full px-3 py-2.5 rounded-xl bg-theme-surface border border-theme-gold/15 text-theme text-sm font-mono focus:outline-none focus:border-theme-gold/40 resize-none" dir="ltr" />
            <button className="mt-3 px-4 py-2 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-all">حفظ robots.txt</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modal.open && modal.page && (
          <SeoModal page={modal.page} onClose={() => setModal({ open: false })} onSave={savePage} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SeoModal({ page, onClose, onSave }: { page: SeoPage; onClose: () => void; onSave: (d: Partial<SeoPage>) => void }) {
  const [form, setForm] = useState({
    title: page.title,
    description: page.description,
    ogTitle: page.ogTitle,
    ogDescription: page.ogDescription,
    keywords: page.keywords,
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        className="rounded-2xl border border-theme-gold/10 bg-theme-card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold font-cairo text-theme mb-1">تحرير SEO</h3>
            <p className="text-xs text-theme-muted font-mono" dir="ltr">{page.route}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-theme-gold/10 text-theme-muted hover:text-theme-gold transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-theme-muted font-cairo">Meta Title</label>
              <span className={`text-[10px] font-english ${form.title.length > 60 ? 'text-red-400' : 'text-theme-muted'}`}>{form.title.length}/60</span>
            </div>
            <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-cairo focus:outline-none focus:border-theme-gold/40" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-theme-muted font-cairo">Meta Description</label>
              <span className={`text-[10px] font-english ${form.description.length > 160 ? 'text-red-400' : 'text-theme-muted'}`}>{form.description.length}/160</span>
            </div>
            <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3}
              className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-cairo focus:outline-none focus:border-theme-gold/40 resize-none" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-theme-muted font-cairo">OG Title</label>
              <span className={`text-[10px] font-english ${form.ogTitle.length > 60 ? 'text-red-400' : 'text-theme-muted'}`}>{form.ogTitle.length}/60</span>
            </div>
            <input type="text" value={form.ogTitle} onChange={e => setForm(p => ({ ...p, ogTitle: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-cairo focus:outline-none focus:border-theme-gold/40" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-theme-muted font-cairo">OG Description</label>
              <span className={`text-[10px] font-english ${form.ogDescription.length > 160 ? 'text-red-400' : 'text-theme-muted'}`}>{form.ogDescription.length}/160</span>
            </div>
            <textarea value={form.ogDescription} onChange={e => setForm(p => ({ ...p, ogDescription: e.target.value }))} rows={2}
              className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-cairo focus:outline-none focus:border-theme-gold/40 resize-none" />
          </div>
          <div>
            <label className="block text-xs text-theme-muted font-cairo mb-1.5">الكلمات المفتاحية</label>
            <input type="text" value={form.keywords} onChange={e => setForm(p => ({ ...p, keywords: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-cairo focus:outline-none focus:border-theme-gold/40" />
          </div>
        </div>

        <div className="rounded-xl bg-theme-surface border border-theme-border p-4 mb-6">
          <p className="text-[10px] text-theme-muted font-cairo mb-2">معاينة ظهور النتيجة في البحث:</p>
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-green-700 font-english" dir="ltr">https://egypthub.com{page.route}</p>
            <p className="text-sm text-blue-700 font-english font-medium">{form.title || page.title}</p>
            <p className="text-xs text-gray-600 font-english">{form.description || page.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 justify-end pt-4 border-t border-theme-gold/10">
          <button onClick={onClose}
            className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
          <button onClick={() => onSave(form)}
            className="px-4 py-2 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-all">حفظ التغييرات</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
