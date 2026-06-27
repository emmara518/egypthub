'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUploader from '@/components/admin/ImageUploader';
import ImagePicker from '@/components/admin/ImagePicker';

interface MediaItem {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
  uploadedAt: string;
  altAr?: string;
  altEn?: string;
}

const STATIC_MEDIA: MediaItem[] = [
  { id: 'static-1', url: '/assets/back_ground.webp', filename: 'back_ground.webp', size: 156000, type: 'image/webp', uploadedAt: '2026-06-01', altAr: 'خلفية مصر', altEn: 'Egypt Background' },
  { id: 'static-2', url: '/assets/home/pyramids.jpg', filename: 'pyramids.jpg', size: 245000, type: 'image/jpeg', uploadedAt: '2026-06-01', altAr: 'أهرامات الجيزة', altEn: 'Giza Pyramids' },
  { id: 'static-3', url: '/assets/home/nile-sunset.jpg', filename: 'nile-sunset.jpg', size: 312000, type: 'image/jpeg', uploadedAt: '2026-06-01', altAr: 'غروب النيل', altEn: 'Nile Sunset' },
  { id: 'static-4', url: '/assets/home/red-sea.jpg', filename: 'red-sea.jpg', size: 198000, type: 'image/jpeg', uploadedAt: '2026-06-01', altAr: 'البحر الأحمر', altEn: 'Red Sea' },
  { id: 'static-5', url: '/assets/home/luxor-temple.jpg', filename: 'luxor-temple.jpg', size: 267000, type: 'image/jpeg', uploadedAt: '2026-06-01', altAr: 'معبد الأقصر', altEn: 'Luxor Temple' },
  { id: 'static-6', url: '/assets/home/desert-dahab.jpg', filename: 'desert-dahab.jpg', size: 178000, type: 'image/jpeg', uploadedAt: '2026-06-01', altAr: 'صحراء دهب', altEn: 'Dahab Desert' },
  { id: 'static-7', url: '/assets/home/alexandria.jpg', filename: 'alexandria.jpg', size: 223000, type: 'image/jpeg', uploadedAt: '2026-06-01', altAr: 'الإسكندرية', altEn: 'Alexandria' },
  { id: 'static-8', url: '/images/egypt/pyramids.webp', filename: 'pyramids.webp', size: 89000, type: 'image/webp', uploadedAt: '2026-06-01', altAr: 'أهرامات', altEn: 'Pyramids' },
  { id: 'static-9', url: '/images/egypt/nile.webp', filename: 'nile.webp', size: 76000, type: 'image/webp', uploadedAt: '2026-06-01', altAr: 'نيل', altEn: 'Nile' },
  { id: 'static-10', url: '/images/egypt/cairo.webp', filename: 'cairo.webp', size: 82000, type: 'image/webp', uploadedAt: '2026-06-01', altAr: 'القاهرة', altEn: 'Cairo' },
  { id: 'static-11', url: '/images/egypt/luxor.webp', filename: 'luxor.webp', size: 92000, type: 'image/webp', uploadedAt: '2026-06-01', altAr: 'الأقصر', altEn: 'Luxor' },
  { id: 'static-12', url: '/images/egypt/desert.webp', filename: 'desert.webp', size: 67000, type: 'image/webp', uploadedAt: '2026-06-01', altAr: 'صحراء', altEn: 'Desert' },
  { id: 'static-13', url: '/images/egypt/redsea.webp', filename: 'redsea.webp', size: 84000, type: 'image/webp', uploadedAt: '2026-06-01', altAr: 'البحر الأحمر', altEn: 'Red Sea' },
  { id: 'static-14', url: '/images/destinations/cairo.jpg', filename: 'cairo.jpg', size: 195000, type: 'image/jpeg', uploadedAt: '2026-06-01', altAr: 'القاهرة', altEn: 'Cairo' },
  { id: 'static-15', url: '/images/destinations/hurghada.jpg', filename: 'hurghada.jpg', size: 212000, type: 'image/jpeg', uploadedAt: '2026-06-01', altAr: 'الغردقة', altEn: 'Hurghada' },
  { id: 'static-16', url: '/images/destinations/luxor.jpg', filename: 'luxor.jpg', size: 234000, type: 'image/jpeg', uploadedAt: '2026-06-01', altAr: 'الأقصر', altEn: 'Luxor' },
  { id: 'static-17', url: '/images/destinations/alexandria.jpg', filename: 'alexandria.jpg', size: 188000, type: 'image/jpeg', uploadedAt: '2026-06-01', altAr: 'الإسكندرية', altEn: 'Alexandria' },
  { id: 'static-18', url: '/images/destinations/aswan.jpg', filename: 'aswan.jpg', size: 201000, type: 'image/jpeg', uploadedAt: '2026-06-01', altAr: 'أسوان', altEn: 'Aswan' },
  { id: 'static-19', url: '/images/businesses/cleopatra-hotel.jpg', filename: 'cleopatra-hotel.jpg', size: 178000, type: 'image/jpeg', uploadedAt: '2026-06-01', altAr: 'فندق كليوباترا', altEn: 'Cleopatra Hotel' },
  { id: 'static-20', url: '/images/businesses/nile-cruise.jpg', filename: 'nile-cruise.jpg', size: 245000, type: 'image/jpeg', uploadedAt: '2026-06-01', altAr: 'رحلة نيلية', altEn: 'Nile Cruise' },
  { id: 'static-21', url: '/images/activities/diving-activity.jpg', filename: 'diving-activity.jpg', size: 198000, type: 'image/jpeg', uploadedAt: '2026-06-01', altAr: 'غوص', altEn: 'Diving' },
  { id: 'static-22', url: '/images/activities/hot-air-balloon.jpg', filename: 'hot-air-balloon.jpg', size: 215000, type: 'image/jpeg', uploadedAt: '2026-06-01', altAr: 'بالون طائر', altEn: 'Hot Air Balloon' },
  { id: 'static-23', url: '/images/activities/desert-safari.jpg', filename: 'desert-safari.jpg', size: 189000, type: 'image/jpeg', uploadedAt: '2026-06-01', altAr: 'سفاري صحراء', altEn: 'Desert Safari' },
  { id: 'static-24', url: '/images/activities/camel-ride.jpg', filename: 'camel-ride.jpg', size: 167000, type: 'image/jpeg', uploadedAt: '2026-06-01', altAr: 'ركوب الجمال', altEn: 'Camel Ride' },
  { id: 'static-25', url: '/assets/avatar.png', filename: 'avatar.png', size: 32000, type: 'image/png', uploadedAt: '2026-06-01', altAr: 'أفاتار', altEn: 'Avatar' },
];

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.03 } } };
const itemVariants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [detailItem, setDetailItem] = useState<MediaItem | null>(null);
  const [uploadMode, setUploadMode] = useState(false);
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'svg'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('egypthub_media');
      const uploaded: MediaItem[] = stored ? JSON.parse(stored) : [];
      setMedia([...uploaded, ...STATIC_MEDIA]);
    } catch { setMedia(STATIC_MEDIA); }
    setLoading(false);
  }, []);

  const saveToStorage = useCallback((items: MediaItem[]) => {
    const uploaded = items.filter(i => i.id.startsWith('upload-'));
    localStorage.setItem('egypthub_media', JSON.stringify(uploaded));
  }, []);

  const filtered = useMemo(() => {
    let result = media;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(m => m.filename.toLowerCase().includes(q) || (m.altAr || '').includes(q) || (m.altEn || '').toLowerCase().includes(q));
    }
    if (typeFilter === 'svg') result = result.filter(m => m.type.includes('svg'));
    else if (typeFilter === 'image') result = result.filter(m => !m.type.includes('svg'));
    return result;
  }, [media, search, typeFilter]);

  const handleUploaded = useCallback((files: { id: string; url: string; filename: string; size: number; type: string }[]) => {
    const newItems: MediaItem[] = files.map(f => ({
      ...f,
      uploadedAt: new Date().toISOString().split('T')[0],
    }));
    const updated = [...newItems, ...media];
    setMedia(updated);
    saveToStorage(updated);
    setUploadMode(false);
  }, [media, saveToStorage]);

  const handleDelete = useCallback((id: string) => {
    const updated = media.filter(m => m.id !== id);
    setMedia(updated);
    saveToStorage(updated);
    setDeleteConfirm(null);
  }, [media, saveToStorage]);

  const handleCopyUrl = useCallback((url: string, id: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  const stats = useMemo(() => ({
    total: media.length,
    images: media.filter(m => !m.type.includes('svg')).length,
    svgs: media.filter(m => m.type.includes('svg')).length,
    totalSize: media.reduce((a, m) => a + m.size, 0),
  }), [media]);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">مكتبة الوسائط</h1>
          <p className="text-sm text-theme-muted font-cairo">إدارة جميع الصور والملفات في المنصة</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setPickerOpen(true)}
            className="px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">
            اختيار من المكتبة
          </button>
          <button onClick={() => setUploadMode(!uploadMode)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-theme-gold text-dark-900 text-xs font-bold font-cairo hover:opacity-90 transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            رفع صور
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'إجمالي الملفات', value: stats.total, icon: '🖼️', color: 'border-blue-500/30 bg-blue-500/5' },
          { label: 'صور', value: stats.images, icon: '📷', color: 'border-emerald-500/30 bg-emerald-500/5' },
          { label: 'SVG', value: stats.svgs, icon: '🎨', color: 'border-purple-500/30 bg-purple-500/5' },
          { label: 'الحجم الإجمالي', value: formatSize(stats.totalSize), icon: '💾', color: 'border-amber-500/30 bg-amber-500/5' },
        ].map((s, i) => (
          <div key={i} className={`rounded-xl border ${s.color} p-4 text-center`}>
            <p className="text-lg mb-1">{s.icon}</p>
            <p className="text-sm font-bold font-english text-theme">{s.value}</p>
            <p className="text-[10px] text-theme-muted font-cairo">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Upload Area */}
      <AnimatePresence>
        {uploadMode && (
          <motion.div variants={itemVariants} initial="hidden" animate="show" exit={{ opacity: 0, y: -16 }} className="mb-6">
            <ImageUploader onUpload={handleUploaded} className="mb-4" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex items-center gap-3 flex-wrap mb-6">
        <div className="relative flex-1 max-w-xs">
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="بحث عن صور..."
            className="w-full px-4 py-2.5 pr-10 rounded-xl bg-theme-card border border-theme-gold/15 text-theme placeholder:text-theme-muted text-sm font-cairo focus:outline-none focus:border-theme-gold/40" />
        </div>
        <div className="flex gap-1 bg-theme-card rounded-xl p-1 border border-theme-gold/10">
          {(['all', 'image', 'svg'] as const).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-cairo transition-all ${typeFilter === t ? 'bg-theme-gold/10 text-theme-gold' : 'text-theme-muted hover:text-theme'}`}>
              {t === 'all' ? 'الكل' : t === 'image' ? 'صور' : 'SVG'}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-theme-card rounded-xl p-1 border border-theme-gold/10">
          <button onClick={() => setView('grid')} className={`p-1.5 rounded-lg transition-all ${view === 'grid' ? 'bg-theme-gold/10 text-theme-gold' : 'text-theme-muted'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
          </button>
          <button onClick={() => setView('list')} className={`p-1.5 rounded-lg transition-all ${view === 'list' ? 'bg-theme-gold/10 text-theme-gold' : 'text-theme-muted'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
          </button>
        </div>
      </motion.div>

      {/* Media Grid/List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-2 border-theme-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <motion.div variants={itemVariants} className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-theme-gold/5 flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-theme-muted">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <p className="text-theme-muted font-cairo text-sm">لا توجد صور تطابق البحث</p>
        </motion.div>
      ) : view === 'grid' ? (
        <motion.div variants={containerVariants} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map((item) => (
            <motion.div key={item.id} variants={itemVariants} layout
              className="group relative rounded-xl overflow-hidden border border-theme-gold/10 bg-theme-card">
              <div className="aspect-square overflow-hidden">
                <img src={item.url} alt={item.altAr || item.filename}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatar.png'; }} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <p className="text-xs text-white font-cairo truncate">{item.filename}</p>
                <p className="text-[10px] text-white/60 font-english">{formatSize(item.size)}</p>
                <div className="flex gap-1.5 mt-2">
                  <button onClick={() => handleCopyUrl(item.url, item.id)}
                    className="flex-1 p-1.5 rounded-lg bg-white/10 text-white text-[10px] hover:bg-white/20 transition-all font-cairo">
                    {copiedId === item.id ? 'تم النسخ' : 'نسخ الرابط'}
                  </button>
                  <button onClick={() => setDetailItem(item)}
                    className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /></svg>
                  </button>
                  <button onClick={() => setDeleteConfirm(item.id)}
                    className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-all">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-theme-border text-theme-secondary text-[11px]">
                  <th className="text-right px-4 py-3 font-medium font-cairo">الملف</th>
                  <th className="text-right px-4 py-3 font-medium font-cairo">الاسم</th>
                  <th className="text-right px-4 py-3 font-medium font-cairo">النوع</th>
                  <th className="text-right px-4 py-3 font-medium font-cairo">الحجم</th>
                  <th className="text-right px-4 py-3 font-medium font-cairo">التاريخ</th>
                  <th className="text-left px-4 py-3 font-medium font-cairo">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-theme-border/50 hover:bg-theme-surface/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-theme-surface">
                        <img src={item.url} alt="" className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatar.png'; }} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs text-theme font-cairo">{item.filename}</p>
                      {item.altAr && <p className="text-[10px] text-theme-muted font-cairo">{item.altAr}</p>}
                    </td>
                    <td className="px-4 py-3 text-xs text-theme-muted font-english">{item.type.split('/')[1] || item.type}</td>
                    <td className="px-4 py-3 text-xs text-theme-muted font-english">{formatSize(item.size)}</td>
                    <td className="px-4 py-3 text-xs text-theme-muted font-english">{item.uploadedAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => handleCopyUrl(item.url, item.id)}
                          className="px-2 py-1 rounded text-[10px] bg-theme-gold/10 text-theme-gold hover:bg-theme-gold/20 transition-all font-cairo">
                          {copiedId === item.id ? 'تم' : 'نسخ'}
                        </button>
                        <button onClick={() => setDeleteConfirm(item.id)}
                          className="px-2 py-1 rounded text-[10px] bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all font-cairo">
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="rounded-2xl border border-red-500/20 bg-theme-card p-6 max-w-sm w-full text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
              </div>
              <h3 className="text-lg font-bold font-cairo text-theme mb-2">حذف الملف</h3>
              <p className="text-sm text-theme-secondary font-cairo mb-6">هل أنت متأكد من حذف هذا الملف؟ لا يمكن التراجع عن هذا الإجراء.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-theme-gold/20 text-theme-gold text-sm font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold font-cairo hover:bg-red-600 transition-all">حذف</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="rounded-2xl border border-theme-gold/10 bg-theme-card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-cairo text-theme">تفاصيل الملف</h3>
                <button onClick={() => setDetailItem(null)} className="p-1.5 rounded-lg hover:bg-theme-gold/10 text-theme-muted hover:text-theme-gold transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl overflow-hidden bg-theme-surface border border-theme-gold/10">
                  <img src={detailItem.url} alt={detailItem.filename} className="w-full h-64 object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatar.png'; }} />
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'اسم الملف', value: detailItem.filename },
                    { label: 'النوع', value: detailItem.type },
                    { label: 'الحجم', value: formatSize(detailItem.size) },
                    { label: 'تاريخ الرفع', value: detailItem.uploadedAt },
                    { label: 'الرابط', value: detailItem.url },
                  ].map((f) => (
                    <div key={f.label}>
                      <p className="text-[10px] text-theme-muted font-cairo mb-0.5">{f.label}</p>
                      <p className="text-xs text-theme font-english break-all">{f.value}</p>
                    </div>
                  ))}
                  <button onClick={() => { handleCopyUrl(detailItem.url, detailItem.id); }} className="w-full px-4 py-2 rounded-xl bg-theme-gold/10 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/20 transition-all">
                    {copiedId === detailItem.id ? 'تم نسخ الرابط' : 'نسخ الرابط'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Picker */}
      <ImagePicker open={pickerOpen} onClose={() => setPickerOpen(false)} onSelect={() => {}} />
    </motion.div>
  );
}
