'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type StoryStatus = 'PUBLISHED' | 'DRAFT' | 'FEATURED';
type StoryType = 'story' | 'guide' | 'blog';
type TabKey = 'stories' | 'media';

interface Story {
  id: string; title: string; author: string; authorAvatar: string;
  type: StoryType; status: StoryStatus; content: string;
  coverImage: string; tags: string[]; views: number; likes: number;
  date: string; featured: boolean;
}

interface MediaItem {
  id: string; filename: string; type: string; size: string;
  dimensions: string; uploadDate: string; uploadedBy: string;
}

const STORY_STATUS: Record<StoryStatus, { label: string; color: string }> = {
  PUBLISHED: { label: 'منشور', color: 'text-emerald-400 bg-emerald-500/10' },
  DRAFT: { label: 'مسودة', color: 'text-amber-400 bg-amber-500/10' },
  FEATURED: { label: 'مميز', color: 'text-purple-400 bg-purple-500/10' },
};

const STORY_TYPE: Record<StoryType, { label: string; color: string }> = {
  story: { label: 'قصة', color: 'text-blue-400 bg-blue-500/10' },
  guide: { label: 'دليل', color: 'text-emerald-400 bg-emerald-500/10' },
  blog: { label: 'مقال', color: 'text-amber-400 bg-amber-500/10' },
};

const SAMPLE_STORIES: Story[] = Array.from({ length: 22 }, (_, i) => {
  const titles = [
    'رحلة إلى واحة سيوة', 'دليل السياحة في الأقصر', 'أفضل مطاعم القاهرة',
    'قصة شاب من الصحراء', 'نصائح للسفر إلى الغردقة', 'تاريخ الأهرامات',
    'دليل أسعار الفنادق', 'مغامرة في البحر الأحمر', 'ثقافة النوبة',
    'أفضل وقت لزيارة مصر', 'قصة حب من وادي الملوك', 'دليل التسوق في خان الخليلي',
    'أسرار الصحراء البيضاء', 'رحلة عائلية إلى شرم الشيخ', 'تقاليد الضيافة المصرية',
    'جولة في معابد فيلة', 'دليل السياحة العلاجية', 'قصة نجاح سياحة المغامرات',
    'أفضل شواطئ مصر', 'تراث الحرف اليدوية', 'مهرجان التذوق الدولي', 'استكشاف دلتا النيل',
  ];
  const types: StoryType[] = ['story', 'story', 'guide', 'story', 'guide', 'blog', 'guide', 'story', 'blog', 'guide', 'story', 'guide', 'story', 'guide', 'blog', 'story', 'guide', 'story', 'guide', 'blog', 'story', 'story'];
  const statuses: StoryStatus[] = ['PUBLISHED', 'PUBLISHED', 'FEATURED', 'DRAFT', 'PUBLISHED', 'PUBLISHED', 'DRAFT', 'FEATURED', 'PUBLISHED', 'PUBLISHED', 'DRAFT', 'PUBLISHED', 'FEATURED', 'PUBLISHED', 'DRAFT', 'PUBLISHED', 'PUBLISHED', 'FEATURED', 'DRAFT', 'PUBLISHED', 'PUBLISHED', 'DRAFT'];
  const authors = ['محمد علي', 'سارة خالد', 'نورا حسن', 'خالد أحمد', 'هند يوسف', 'عمر كريم', 'ليلى محمود'];
  return {
    id: `ST-${String(i + 1).padStart(3, '0')}`,
    title: titles[i],
    author: authors[i % authors.length],
    authorAvatar: authors[i % authors.length].charAt(0),
    type: types[i],
    status: statuses[i],
    content: 'محتوى المقال الكامل هنا... هذا النص هو نموذج لمحتوى المحتوى الذي سيظهر في المقال أو القصة أو الدليل الإرشادي. يتم استبداله بالمحتوى الحقيقي عند النشر.',
    coverImage: '',
    tags: [['مغامرات', 'سيوة'], ['أقصر', 'تاريخ'], ['مطاعم', 'القاهرة'], ['صحراء', 'مغامرات'], ['غردقة', 'نصائح'], ['تاريخ', 'أهرامات'], ['فنادق', 'أسعار'], ['بحر أحمر', 'غوص'], ['نوبة', 'ثقافة'], ['طقس', 'نصائح'], ['أقصر', 'تاريخ'], ['تسوق', 'القاهرة'], ['صحراء بيضاء', 'مغامرات'], ['شرم الشيخ', 'عائلة'], ['ضيافة', 'ثقافة'], ['معابد', 'فيلا'], ['سياحة علاجية', 'صحة'], ['مغامرات', 'نجاح'], ['شواطئ', 'مصر'], ['حرف يدوية', 'تراث'], ['تذوق', 'مهرجان'], ['دلتا', 'النيل']][i],
    views: 100 + i * 87,
    likes: 10 + i * 12,
    date: new Date(2026, i % 12, 1 + (i % 25)).toISOString(),
    featured: statuses[i] === 'FEATURED',
  };
});

const SAMPLE_MEDIA: MediaItem[] = Array.from({ length: 16 }, (_, i) => ({
  id: `MED-${String(i + 1).padStart(3, '0')}`,
  filename: [
    'egypt-sunset.jpg', 'pyramids-aerial.png', 'red-sea-diving.jpg', 'luxor-temple.jpg',
    'cairo-skyline.png', 'siwa-oasis.jpg', 'nile-cruise.jpg', 'desert-safari.jpg',
    'khan-el-khalili.jpg', 'alexandria-library.png', 'sharm-beach.jpg', 'abu-simbel.jpg',
    'egyptian-food.jpg', 'valley-of-kings.jpg', 'red-sea-coral.jpg', 'dahab-mountain.jpg',
  ][i],
  type: ['jpg', 'png', 'jpg', 'jpg', 'png', 'jpg', 'jpg', 'jpg', 'jpg', 'png', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg'][i],
  size: ['2.4 MB', '4.1 MB', '1.8 MB', '3.2 MB', '5.7 MB', '2.9 MB', '3.5 MB', '2.1 MB', '1.5 MB', '6.3 MB', '2.7 MB', '4.8 MB', '1.2 MB', '3.9 MB', '2.3 MB', '3.1 MB'][i],
  dimensions: ['1920x1080', '3840x2160', '1920x1280', '2048x1536', '4096x2304', '1920x1080', '2560x1440', '1920x1080', '1080x1080', '3840x2160', '1920x1280', '2048x1536', '1200x800', '1920x1080', '1920x1080', '2560x1440'][i],
  uploadDate: new Date(2026, i % 12, 5 + (i * 2) % 20).toISOString(),
  uploadedBy: ['محمد علي', 'سارة خالد', 'نورا حسن', 'خالد أحمد', 'هند يوسف', 'عمر كريم', 'ليلى محمود', 'أدمن النظام'][i % 8],
}));

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

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('stories');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StoryStatus | ''>('');
  const [typeFilter, setTypeFilter] = useState<StoryType | ''>('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ type: string; id: string; title: string } | null>(null);

  const filteredStories = useMemo(() => {
    return SAMPLE_STORIES.filter((s) => {
      if (search && !s.title.includes(search) && !s.author.includes(search)) return false;
      if (statusFilter && s.status !== statusFilter) return false;
      if (typeFilter && s.type !== typeFilter) return false;
      return true;
    });
  }, [search, statusFilter, typeFilter]);

  const stats = useMemo(() => {
    const total = SAMPLE_STORIES.length;
    const published = SAMPLE_STORIES.filter((s) => s.status === 'PUBLISHED').length;
    const draft = SAMPLE_STORIES.filter((s) => s.status === 'DRAFT').length;
    const featured = SAMPLE_STORIES.filter((s) => s.featured).length;
    return { total, published, draft, featured };
  }, []);

  const openEdit = (story?: Story) => {
    setEditingStory(story || null);
    setShowEditModal(true);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">إدارة المحتوى</h1>
            <p className="text-sm text-theme-muted font-cairo">إدارة القصص والمقالات ووسائط الميديا</p>
          </div>
          {activeTab === 'stories' && (
            <button onClick={() => openEdit()} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              إضافة قصة
            </button>
          )}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex gap-1 mb-8 bg-theme-surface rounded-xl p-1 border border-theme-gold/10 w-fit">
        <button onClick={() => setActiveTab('stories')} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold font-cairo transition-all ${
          activeTab === 'stories' ? 'bg-theme-gold/10 text-theme-gold border border-theme-gold/20' : 'text-theme-muted hover:text-theme hover:bg-theme-elevated/50'
        }`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
          القصص والمقالات
        </button>
        <button onClick={() => setActiveTab('media')} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold font-cairo transition-all ${
          activeTab === 'media' ? 'bg-theme-gold/10 text-theme-gold border border-theme-gold/20' : 'text-theme-muted hover:text-theme hover:bg-theme-elevated/50'
        }`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
          معرض الوسائط
        </button>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeTab === 'stories' && (
          <motion.div key="stories" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="إجمالي القصص" value={stats.total} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>} color="from-blue-500 to-blue-600" />
              <StatCard label="منشورة" value={stats.published} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>} color="from-emerald-500 to-emerald-600" />
              <StatCard label="مسودة" value={stats.draft} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>} color="from-amber-500 to-amber-600" />
              <StatCard label="مميزة" value={stats.featured} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>} color="from-purple-500 to-purple-600" />
            </div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <input type="text" placeholder="🔍 بحث في القصص..." value={search} onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:border-theme-gold/40 focus:outline-none transition-all font-cairo" />
                </div>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StoryStatus | '')}
                  className="px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:border-theme-gold/40 focus:outline-none">
                  <option value="">كل الحالات</option>
                  {Object.entries(STORY_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as StoryType | '')}
                  className="px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo focus:border-theme-gold/40 focus:outline-none">
                  <option value="">كل الأنواع</option>
                  {Object.entries(STORY_TYPE).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-theme-card border border-theme-gold/15 text-theme-muted text-xs font-cairo">
                  <span>{filteredStories.length} نتيجة</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="border-b border-theme-gold/10 bg-theme-surface/50">
                      <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">المعرف</th>
                      <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">العنوان</th>
                      <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">الكاتب</th>
                      <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">النوع</th>
                      <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">الحالة</th>
                      <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">المشاهدات</th>
                      <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">الإعجابات</th>
                      <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">التاريخ</th>
                      <th className="px-4 py-3 text-[10px] text-theme-gold font-cairo font-bold">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStories.map((s, i) => (
                      <motion.tr key={s.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                        className={`border-b border-theme-gold/5 hover:bg-theme-gold/[0.02] transition-colors ${i % 2 === 0 ? 'bg-theme-surface/20' : ''}`}>
                        <td className="px-4 py-3 text-xs text-theme-gold font-mono">{s.id}</td>
                        <td className="px-4 py-3 text-xs text-theme font-cairo truncate max-w-[150px]">{s.title}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-theme-gold/30 to-theme-gold/10 flex items-center justify-center text-[10px] text-theme-gold font-bold">{s.authorAvatar}</div>
                            <span className="text-xs text-theme font-cairo">{s.author}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${STORY_TYPE[s.type].color}`}>{STORY_TYPE[s.type].label}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${STORY_STATUS[s.status].color}`}>{STORY_STATUS[s.status].label}</span>
                        </td>
                        <td className="px-4 py-3 text-xs font-english text-theme">{s.views.toLocaleString('ar-EG')}</td>
                        <td className="px-4 py-3 text-xs font-english text-theme">{s.likes.toLocaleString('ar-EG')}</td>
                        <td className="px-4 py-3 text-[10px] text-theme-muted font-cairo">{new Date(s.date).toLocaleDateString('ar-EG')}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => openEdit(s)} className="px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-bold hover:bg-blue-500/20 transition-all">تعديل</button>
                            <button onClick={() => setConfirmModal({ type: 'delete', id: s.id, title: s.title })}
                              className="px-2 py-1 rounded-lg bg-rose-500/10 text-rose-400 text-[10px] font-bold hover:bg-rose-500/20 transition-all">حذف</button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
                {filteredStories.length === 0 && (
                  <div className="text-center py-12"><p className="text-theme-muted font-cairo text-sm">لا توجد قصص تطابق البحث</p></div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'media' && (
          <motion.div key="media" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5 mb-8">
              <div className="flex items-center gap-3">
                <input type="text" placeholder="🔍 بحث في الميديا..." value={search} onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:border-theme-gold/40 focus:outline-none transition-all font-cairo" />
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                  رفع ملف
                </button>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {SAMPLE_MEDIA.filter((m) => !search || m.filename.toLowerCase().includes(search.toLowerCase())).map((media, i) => (
                <motion.div key={media.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
                  className="rounded-2xl border border-theme-gold/10 bg-theme-card overflow-hidden hover:border-theme-gold/25 transition-all group">
                  <div className="aspect-[4/3] bg-gradient-to-br from-theme-surface to-theme-elevated flex items-center justify-center relative">
                    <div className="text-center">
                      <svg className="w-10 h-10 mx-auto text-theme-gold/40 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        {media.type === 'png' || media.type === 'jpg' || media.type === 'jpeg' ? (
                          <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></>
                        ) : (
                          <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>
                        )}
                      </svg>
                      <p className="text-[10px] text-theme-muted font-cairo">{media.type.toUpperCase()}</p>
                    </div>
                    <button onClick={() => setConfirmModal({ type: 'delete-media', id: media.id, title: media.filename })}
                      className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-theme font-cairo truncate">{media.filename}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-theme-muted font-cairo">{media.size}</span>
                      <span className="text-[10px] text-theme-muted font-cairo">{new Date(media.uploadDate).toLocaleDateString('ar-EG')}</span>
                    </div>
                    <p className="text-[10px] text-theme-muted font-cairo mt-0.5">{media.uploadedBy}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-[10px] text-theme-muted font-cairo">{SAMPLE_MEDIA.length} ملف وسائط</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showEditModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-2xl rounded-2xl border border-theme-gold/10 bg-theme-card p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold font-playfair text-theme">{editingStory ? 'تعديل المحتوى' : 'إضافة محتوى جديد'}</h2>
              <button onClick={() => setShowEditModal(false)} className="p-2 rounded-xl hover:bg-theme-surface text-theme-muted">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="md:col-span-2">
                <label className="block text-[10px] text-theme-muted font-cairo mb-1.5">العنوان</label>
                <input type="text" defaultValue={editingStory?.title} placeholder="عنوان القصة أو المقال"
                  className="w-full px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:border-theme-gold/40 focus:outline-none font-cairo" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] text-theme-muted font-cairo mb-1.5">المحتوى</label>
                <textarea rows={6} defaultValue={editingStory?.content} placeholder="اكتب المحتوى هنا..."
                  className="w-full px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:border-theme-gold/40 focus:outline-none font-cairo resize-none" />
              </div>
              <div>
                <label className="block text-[10px] text-theme-muted font-cairo mb-1.5">الكاتب</label>
                <input type="text" defaultValue={editingStory?.author}
                  className="w-full px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm focus:border-theme-gold/40 focus:outline-none font-cairo" />
              </div>
              <div>
                <label className="block text-[10px] text-theme-muted font-cairo mb-1.5">النوع</label>
                <select defaultValue={editingStory?.type || 'story'}
                  className="w-full px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm focus:border-theme-gold/40 focus:outline-none font-cairo">
                  <option value="story">قصة</option>
                  <option value="guide">دليل</option>
                  <option value="blog">مقال</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-theme-muted font-cairo mb-1.5">الوسوم (مفصولة بفاصلة)</label>
                <input type="text" defaultValue={editingStory?.tags?.join(', ')} placeholder="مغامرات, سياحة, مصر"
                  className="w-full px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm placeholder:text-theme-muted focus:border-theme-gold/40 focus:outline-none font-cairo" />
              </div>
              <div>
                <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-theme-card border border-theme-gold/15 text-theme text-sm font-cairo cursor-pointer">
                  <input type="checkbox" defaultChecked={editingStory?.featured}
                    className="w-4 h-4 rounded border-theme-gold/30 bg-theme-card text-theme-gold focus:ring-theme-gold/30" />
                  محتوى مميز
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowEditModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-theme-gold/20 text-theme-gold text-sm font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
              <button onClick={() => setShowEditModal(false)} className="flex-1 px-4 py-2.5 rounded-xl bg-theme-gold text-dark-900 text-sm font-bold font-cairo hover:opacity-90 transition-all">
                {editingStory ? 'حفظ التغييرات' : 'نشر المحتوى'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {confirmModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md rounded-2xl border border-theme-gold/10 bg-theme-card p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg font-bold font-playfair text-theme mb-2">حذف {confirmModal.type === 'delete-media' ? 'الملف' : 'المحتوى'}</h3>
              <p className="text-sm text-theme-muted font-cairo">هل أنت متأكد من حذف {confirmModal.title}؟ لا يمكن التراجع عن هذا الإجراء.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setConfirmModal(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-theme-gold/20 text-theme-gold text-sm font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
              <button onClick={() => setConfirmModal(null)} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold font-cairo hover:bg-red-600 transition-all">حذف</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
