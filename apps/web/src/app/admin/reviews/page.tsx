'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

type ReviewStatus = 'PUBLISHED' | 'PENDING' | 'HIDDEN';

interface Review {
  id: string; user: string; userAvatar: string; experience: string;
  rating: number; comment: string; status: ReviewStatus;
  date: string; reported: boolean; reportReason?: string;
  helpfulCount: number; response?: string;
}

const REVIEW_STATUS: Record<ReviewStatus, { label: string; color: string }> = {
  PUBLISHED: { label: 'منشور', color: 'text-emerald-400 bg-emerald-500/10' },
  PENDING: { label: 'قيد الانتظار', color: 'text-amber-400 bg-amber-500/10' },
  HIDDEN: { label: 'مخفي', color: 'text-red-400 bg-red-500/10' },
};

const AR_COMMENTS = [
  'تجربة رائعة جداً، استمتعنا بكل لحظة. الخدمة ممتازة والمرشد كان محترفاً جداً.',
  'المكان جميل لكن الخدمة لم تكن على المستوى المطلوب. يحتاج تحسين في بعض النقاط.',
  'أفضل تجربة قمت بها في مصر على الإطلاق. أنصح الجميع بتجربتها!',
  'جيد ولكن السعر مرتفع قليلاً مقارنة بالخدمات المقدمة.',
  'رحلة لا تنسى! التنظيم كان ممتازاً والطعام شهي جداً.',
  'المرشد كان خبيراً ومطلعاً على التاريخ. استفدت كثيراً من المعلومات.',
  'الموعد لم يكن دقيقاً، تأخرنا نصف ساعة. لكن التجربة بشكل عام كانت جميلة.',
  'ممتاز للأطفال والعائلة. الأنشطة متنوعة ومناسبة لجميع الأعمار.',
  'الغوص كان رائعاً! الشعاب المرجانية خلابة والمدرب محترف.',
  'التجربة كانت متوسطة، توقعت أكثر. الإقامة كانت جيدة لكن النشاطات محدودة.',
  'لا توجد كلمات تصف جمال هذه التجربة! سأكررها بالتأكيد.',
  'الخدمة سيئة والموظفين غير ودودين. لا أنصح به.',
  'منظم بشكل احترافي، كل شيء كان في موعده. شكراً للفريق.',
  'الموقع جميل لكن الزحام كان كبيراً. يفضل زيارته في أيام الأسبوع.',
  'قضينا وقتاً ممتعاً جداً. التنسيق كان رائعاً والمرافق نظيفة.',
  'يحتاج إلى تحسين في التواصل مع العملاء. التأخير في الرد كان مزعجاً.',
  'أجمل رحلة قمت بها! المناظر الطبيعية خلابة والخدمة ممتازة.',
  'جيد جداً بشكل عام. السعر مناسب للخدمات المقدمة.',
  'الطعام لم يكن جيداً لكن التجربة بشكل عام كانت مقبولة.',
  'أنشطة متنوعة وممتعة. سأزورهم مرة أخرى قريباً.',
  'صراحة تجربة مخيبة للآمال. التنظيم كان سيئاً والمرشد غير مؤهل.',
  'ممتاز! كل شيء كان مثالياً من البداية للنهاية.',
  'المكان رائع والخدمة جيدة. ينقصه بعض الأنشطة للكبار فقط.',
  'استمتعت كثيراً بركوب البالون. المنظر من الأعلى كان خرافياً!',
  'التجربة كانت لطيفة لكن قصيرة جداً. تحتاج وقت أطول.',
  'أنصح به بشدة! خاصة للعائلات التي لديها أطفال.',
  'المعبد رائع ولكن المرشد لم يكن متحمساً كفاية.',
  'الغطس مع الدلافين كان حلماً تحقق! تجربة لا تقدر بثمن.',
  'الخدمة ممتازة والموظفين بشوشين. شعرنا بالترحاب منذ اللحظة الأولى.',
  'الرحلة كانت مريحة وممتعة. البحر كان رائعاً والجو مثالي.',
  'يمكن أن يكون أفضل بكثير مع تحسين بعض الجوانب التنظيمية.',
  'تجربة فريدة من نوعها! سأوصي بها جميع أصدقائي.',
];

const SAMPLE_REVIEWS: Review[] = Array.from({ length: 32 }, (_, i) => {
  const statuses: ReviewStatus[] = ['PUBLISHED', 'PUBLISHED', 'PENDING', 'PUBLISHED', 'PUBLISHED', 'HIDDEN', 'PUBLISHED', 'PENDING'];
  const experiences = [
    'رحلة نيلية بالقاهرة', 'جولة الأهرامات', 'السفاري في الغردقة',
    'غطس في شرم الشيخ', 'جولة الأقصر التاريخية', 'ركوب البالون في الأقصر',
    'استكشاف وادي النطرون', 'رحلة البحر الأحمر',
  ];
  const users = [
    'أحمد علي', 'سارة محمد', 'خالد حسن', 'نورة أحمد', 'عمر محمود',
    'ليلى إبراهيم', 'محمد كريم', 'هند عبدالله', 'يوسف سامي', 'دينا نور',
    'محمود فتحي', 'منى جمال', 'حسام الدين', 'شيماء عادل', 'كريم ناجي',
    'إيمان رشاد',
  ];
  return {
    id: `REV-${String(i + 1).padStart(4, '0')}`,
    user: users[i % users.length],
    userAvatar: users[i % users.length].charAt(0),
    experience: experiences[i % experiences.length],
    rating: i < 4 ? 5 : i < 8 ? 4 : i < 14 ? 3 : i < 18 ? 2 : i < 22 ? 1 : [5, 4, 3, 2, 1][i % 5],
    comment: AR_COMMENTS[i % AR_COMMENTS.length],
    status: statuses[i % statuses.length],
    date: new Date(2025, i % 12, 1 + (i % 25), 10 + (i % 8), (i * 7) % 60).toISOString(),
    reported: i % 6 === 0,
    reportReason: i % 6 === 0 ? 'محتوى غير لائق' : undefined,
    helpfulCount: Math.floor(Math.random() * 50) + 1,
    response: i % 4 === 0 ? 'نشكرك على تقييمك الجميل، نحن سعداء بتجربتك معنا. نتمنى رؤيتك مرة أخرى!' : undefined,
  };
});

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: JSX.Element; color: string }) {
  return (
    <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5 hover:border-theme-gold/25 transition-all">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg`}>{icon}</div>
      <p className="text-2xl md:text-3xl font-bold font-playfair text-theme mb-0.5">{typeof value === 'number' ? value.toLocaleString('ar-EG') : value}</p>
      <p className="text-xs text-theme-muted font-cairo">{label}</p>
    </motion.div>
  );
}

export default function ReviewsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | ''>('');
  const [ratingFilter, setRatingFilter] = useState<number | ''>('');
  const [reportedOnly, setReportedOnly] = useState(false);
  const [experienceFilter, setExperienceFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{ type: string; review: Review } | null>(null);

  const filtered = useMemo(() => {
    return SAMPLE_REVIEWS.filter((r) => {
      if (search && !r.comment.includes(search) && !r.id.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter && r.status !== statusFilter) return false;
      if (ratingFilter && r.rating !== ratingFilter) return false;
      if (reportedOnly && !r.reported) return false;
      if (experienceFilter && !r.experience.includes(experienceFilter)) return false;
      if (userFilter && !r.user.includes(userFilter)) return false;
      return true;
    });
  }, [search, statusFilter, ratingFilter, reportedOnly, experienceFilter, userFilter]);

  const stats = useMemo(() => {
    const total = SAMPLE_REVIEWS.length;
    const published = SAMPLE_REVIEWS.filter((r) => r.status === 'PUBLISHED').length;
    const pending = SAMPLE_REVIEWS.filter((r) => r.status === 'PENDING').length;
    const hidden = SAMPLE_REVIEWS.filter((r) => r.status === 'HIDDEN').length;
    const avgRating = SAMPLE_REVIEWS.reduce((s, r) => s + r.rating, 0) / total;
    const totalReports = SAMPLE_REVIEWS.filter((r) => r.reported).length;
    return { total, published, pending, hidden, avgRating, totalReports };
  }, []);

  const handleAction = (type: string, review: Review) => setConfirmModal({ type, review });

  const executeAction = () => {
    if (!confirmModal) return;
    setConfirmModal(null);
    setShowDetailModal(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-xs ${i < rating ? 'text-theme-gold' : 'text-theme-muted/20'}`}>★</span>
    ));
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">إدارة التقييمات</h1>
        <p className="text-sm text-theme-muted font-cairo">مراقبة وإدارة تقييمات المستخدمين للتجارب</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard label="إجمالي التقييمات" value={stats.total} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>} color="from-blue-500 to-blue-600" />
        <StatCard label="منشورة" value={stats.published} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>} color="from-emerald-500 to-emerald-600" />
        <StatCard label="قيد الانتظار" value={stats.pending} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>} color="from-amber-500 to-amber-600" />
        <StatCard label="مخفية" value={stats.hidden} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>} color="from-red-500 to-red-600" />
        <StatCard label="متوسط التقييم" value={stats.avgRating.toFixed(1)} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>} color="from-purple-500 to-purple-600" />
        <StatCard label="البلاغات" value={stats.totalReports} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>} color="from-rose-500 to-rose-600" />
      </div>

      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="md:col-span-2">
            <input type="text" placeholder="🔍 بحث في التقييمات..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:border-theme-gold/40 focus:outline-none transition-all font-cairo" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as ReviewStatus | '')}
            className="px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:border-theme-gold/40 focus:outline-none">
            <option value="">كل الحالات</option>
            {Object.entries(REVIEW_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value ? Number(e.target.value) : '')}
            className="px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:border-theme-gold/40 focus:outline-none">
            <option value="">كل التقييمات</option>
            {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} نجوم</option>)}
          </select>
          <input type="text" placeholder="التجربة" value={experienceFilter} onChange={(e) => setExperienceFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:border-theme-gold/40 focus:outline-none font-cairo" />
          <input type="text" placeholder="المستخدم" value={userFilter} onChange={(e) => setUserFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:border-theme-gold/40 focus:outline-none font-cairo" />
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo cursor-pointer hover:border-theme-gold/30 transition-all">
            <input type="checkbox" checked={reportedOnly} onChange={(e) => setReportedOnly(e.target.checked)}
              className="w-4 h-4 rounded border-theme-gold/30 bg-theme-card text-theme-gold focus:ring-theme-gold/30" />
            المبلغ عنها فقط
          </label>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-theme-gold/10 bg-theme-surface/50">
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">المعرف</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">المستخدم</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">التجربة</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">التقييم</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">التعليق</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">الحالة</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">التاريخ</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">بلاغ</th>
                <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <motion.tr key={r.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                  className={`border-b border-theme-gold/5 hover:bg-theme-gold/[0.02] transition-colors ${i % 2 === 0 ? 'bg-theme-surface/20' : ''}`}>
                  <td className="px-4 py-3 text-xs text-theme-gold font-mono">{r.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-theme-gold/30 to-theme-gold/10 flex items-center justify-center text-xs text-theme-gold font-bold">{r.userAvatar}</div>
                      <span className="text-xs text-theme font-cairo">{r.user}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-theme font-cairo truncate max-w-[120px]">{r.experience}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-0.5">{renderStars(r.rating)}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-theme-muted font-cairo truncate max-w-[180px]">{r.comment}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${REVIEW_STATUS[r.status].color}`}>{REVIEW_STATUS[r.status].label}</span>
                  </td>
                  <td className="px-4 py-3 text-[10px] text-theme-muted font-cairo">{new Date(r.date).toLocaleDateString('ar-EG')}</td>
                  <td className="px-4 py-3">
                    {r.reported ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-red-500/10 text-red-400 text-[10px] font-bold">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                        بلاغ
                      </span>
                    ) : (
                      <span className="text-theme-muted/30 text-[10px]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {r.status === 'PENDING' && (
                        <button onClick={() => handleAction('approve', r)} className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-bold hover:bg-emerald-500/20 transition-all">اعتماد</button>
                      )}
                      {r.status === 'PUBLISHED' && (
                        <button onClick={() => handleAction('hide', r)} className="px-2 py-1 rounded-lg bg-red-500/10 text-red-400 text-[10px] font-bold hover:bg-red-500/20 transition-all">إخفاء</button>
                      )}
                      {r.status === 'HIDDEN' && (
                        <button onClick={() => handleAction('unhide', r)} className="px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-bold hover:bg-blue-500/20 transition-all">إظهار</button>
                      )}
                      <button onClick={() => handleAction('delete', r)} className="px-2 py-1 rounded-lg bg-rose-500/10 text-rose-400 text-[10px] font-bold hover:bg-rose-500/20 transition-all">حذف</button>
                      <button onClick={() => { setSelectedReview(r); setShowDetailModal(true); }}
                        className="px-2 py-1 rounded-lg bg-theme-gold/10 text-theme-gold text-[10px] font-bold hover:bg-theme-gold/20 transition-all">عرض</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12"><p className="text-theme-muted font-cairo text-sm">لا توجد تقييمات تطابق البحث</p></div>
          )}
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-theme-gold/10">
          <span className="text-[10px] text-theme-muted font-cairo">إجمالي النتائج: {filtered.length}</span>
        </div>
      </motion.div>

      {showDetailModal && selectedReview && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-2xl rounded-2xl border border-theme-gold/10 bg-theme-card p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold font-playfair text-theme">تفاصيل التقييم</h2>
              <button onClick={() => setShowDetailModal(false)} className="p-2 rounded-xl hover:bg-theme-surface text-theme-muted">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-theme-gold/30 to-theme-gold/10 flex items-center justify-center text-lg text-theme-gold font-bold">{selectedReview.userAvatar}</div>
              <div>
                <p className="text-sm text-theme font-cairo font-bold">{selectedReview.user}</p>
                <p className="text-[10px] text-theme-muted font-cairo">{new Date(selectedReview.date).toLocaleDateString('ar-EG')}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-3">{renderStars(selectedReview.rating)}</div>
            <p className="text-sm text-theme font-cairo mb-4 leading-relaxed">{selectedReview.comment}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div><p className="text-[10px] text-theme-muted font-cairo">التجربة</p><p className="text-xs text-theme font-cairo">{selectedReview.experience}</p></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">الحالة</p><span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${REVIEW_STATUS[selectedReview.status].color}`}>{REVIEW_STATUS[selectedReview.status].label}</span></div>
              <div><p className="text-[10px] text-theme-muted font-cairo">عدد الإعجابات</p><p className="text-xs text-theme font-english">{selectedReview.helpfulCount}</p></div>
              {selectedReview.reported && (
                <div><p className="text-[10px] text-theme-muted font-cairo">سبب البلاغ</p><span className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 text-[10px] font-bold">{selectedReview.reportReason}</span></div>
              )}
            </div>
            {selectedReview.response && (
              <div className="p-3 rounded-xl bg-theme-surface border border-theme-border">
                <p className="text-[10px] text-theme-muted font-cairo mb-1">رد الإدارة:</p>
                <p className="text-xs text-theme font-cairo">{selectedReview.response}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {confirmModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md rounded-2xl border border-theme-gold/10 bg-theme-card p-6">
            <div className="text-center mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                confirmModal.type === 'delete' ? 'bg-red-500/10' : confirmModal.type === 'hide' ? 'bg-amber-500/10' : 'bg-emerald-500/10'
              }`}>
                <svg className={`w-8 h-8 ${
                  confirmModal.type === 'delete' ? 'text-red-400' : confirmModal.type === 'hide' ? 'text-amber-400' : 'text-emerald-400'
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d={
                    confirmModal.type === 'delete' ? 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' :
                    confirmModal.type === 'hide' ? 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22' :
                    'M5 13l4 4L19 7'
                  } />
                </svg>
              </div>
              <h3 className="text-lg font-bold font-playfair text-theme mb-2">
                {confirmModal.type === 'approve' && 'اعتماد التقييم'}
                {confirmModal.type === 'hide' && 'إخفاء التقييم'}
                {confirmModal.type === 'unhide' && 'إظهار التقييم'}
                {confirmModal.type === 'delete' && 'حذف التقييم'}
              </h3>
              <p className="text-sm text-theme-muted font-cairo">
                {confirmModal.type === 'approve' && 'هل أنت متأكد من اعتماد هذا التقييم؟'}
                {confirmModal.type === 'hide' && 'هل أنت متأكد من إخفاء هذا التقييم؟'}
                {confirmModal.type === 'unhide' && 'هل أنت متأكد من إظهار هذا التقييم؟'}
                {confirmModal.type === 'delete' && 'هل أنت متأكد من حذف هذا التقييم؟ لا يمكن التراجع عن هذا الإجراء.'}
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setConfirmModal(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-theme-gold/20 text-theme-gold text-sm font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
              <button onClick={executeAction} className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold font-cairo transition-all ${
                confirmModal.type === 'delete' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-theme-gold text-dark-900 hover:opacity-90'
              }`}>تأكيد</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
