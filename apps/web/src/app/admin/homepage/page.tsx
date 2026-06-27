'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUploader from '@/components/admin/ImageUploader';
import ImagePicker from '@/components/admin/ImagePicker';

interface HeroSlide {
  id: string;
  imageUrl: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  active: boolean;
  sortOrder: number;
}

interface Banner {
  id: string;
  imageUrl: string;
  titleAr: string;
  titleEn: string;
  link: string;
  active: boolean;
  position: 'top' | 'middle' | 'bottom';
}

interface SectionImage {
  id: string;
  section: string;
  imageUrl: string;
  altAr: string;
  altEn: string;
}

const defaultHeroSlides: HeroSlide[] = [
  { id: 'hero-1', imageUrl: '/assets/back_ground.webp', titleAr: 'اكتشف مصر', titleEn: 'Discover Egypt', subtitleAr: 'رحلات لا تنسى تنتظرك', subtitleEn: 'Unforgettable journeys await', active: true, sortOrder: 0 },
  { id: 'hero-2', imageUrl: '/assets/home/pyramids.jpg', titleAr: 'عظمة الحضارة', titleEn: 'Greatness of Civilization', subtitleAr: 'آلاف السنين من التاريخ', subtitleEn: 'Thousands of years of history', active: true, sortOrder: 1 },
  { id: 'hero-3', imageUrl: '/assets/home/red-sea.jpg', titleAr: 'جمال البحر الأحمر', titleEn: 'Red Sea Beauty', subtitleAr: 'غوص واسترخاء في أروع المواقع', subtitleEn: 'Dive and relax at the best spots', active: false, sortOrder: 2 },
];

const defaultBanners: Banner[] = [
  { id: 'ban-1', imageUrl: '/images/activities/hot-air-balloon.jpg', titleAr: 'عرض خاص: رحلة البالون', titleEn: 'Special Offer: Balloon Ride', link: '/experiences', active: true, position: 'top' },
  { id: 'ban-2', imageUrl: '/images/destinations/luxor.jpg', titleAr: 'اكتشف الأقصر', titleEn: 'Discover Luxor', link: '/destinations/luxor', active: true, position: 'middle' },
  { id: 'ban-3', imageUrl: '/images/destinations/hurghada.jpg', titleAr: 'عروض الغردقة', titleEn: 'Hurghada Deals', link: '/destinations/hurghada', active: false, position: 'bottom' },
];

const defaultSections: SectionImage[] = [
  { id: 'sec-1', section: 'hero-background', imageUrl: '/assets/back_ground.webp', altAr: 'خلفية الصفحة الرئيسية', altEn: 'Hero Background' },
  { id: 'sec-2', section: 'about-egypt', imageUrl: '/images/egypt/pyramids.webp', altAr: 'عن مصر', altEn: 'About Egypt' },
  { id: 'sec-3', section: 'featured-experiences', imageUrl: '/images/experiences/nile-cruise.svg', altAr: 'تجارب مميزة', altEn: 'Featured Experiences' },
  { id: 'sec-4', section: 'destinations', imageUrl: '/images/destinations/cairo.jpg', altAr: 'الوجهات', altEn: 'Destinations' },
  { id: 'sec-5', section: 'stories', imageUrl: '/images/stories/camel-trek.svg', altAr: 'قصص المسافرين', altEn: 'Traveler Stories' },
];

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function HomepageMediaPage() {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(defaultHeroSlides);
  const [banners, setBanners] = useState<Banner[]>(defaultBanners);
  const [sections, setSections] = useState<SectionImage[]>(defaultSections);
  const [activeTab, setActiveTab] = useState<'hero' | 'banners' | 'sections'>('hero');
  const [pickerContext, setPickerContext] = useState<{ target: string; id: string } | null>(null);
  const [editHero, setEditHero] = useState<HeroSlide | null>(null);
  const [editBanner, setEditBanner] = useState<Banner | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 2000);
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">إدارة الصفحة الرئيسية</h1>
          <p className="text-sm text-theme-muted font-cairo">التحكم في صور وبنرات الصفحة الرئيسية</p>
        </div>
        <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          معاينة الموقع
        </Link>
      </motion.div>

      {/* Success Message */}
      <AnimatePresence>
        {successMsg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="mb-4 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-cairo">
            {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="flex gap-1 mb-6 bg-theme-card rounded-xl p-1 border border-theme-gold/10 w-fit">
        {[
          { key: 'hero' as const, label: 'الشريط الرئيسي', icon: '🎠' },
          { key: 'banners' as const, label: 'البنرات', icon: '📢' },
          { key: 'sections' as const, label: 'أقسام الموقع', icon: '📐' },
        ].map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-cairo transition-all ${activeTab === tab.key ? 'bg-theme-gold/10 text-theme-gold border border-theme-gold/20' : 'text-theme-muted hover:text-theme'}`}>
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Hero Slides Tab */}
      {activeTab === 'hero' && (
        <motion.div variants={containerVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-theme-muted font-cairo">{heroSlides.filter(s => s.active).length} نشط من {heroSlides.length}</p>
          </div>
          {heroSlides.map((slide) => (
            <motion.div key={slide.id} variants={itemVariants} layout
              className="rounded-2xl border border-theme-gold/10 bg-theme-card overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-72 h-44 flex-shrink-0 bg-theme-surface">
                  <img src={slide.imageUrl} alt={slide.titleAr} className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatar.png'; }} />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/40" />
                  <button onClick={() => setPickerContext({ target: 'hero', id: slide.id })}
                    className="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-black/50 text-white text-[10px] hover:bg-black/70 transition-all font-cairo">
                    تغيير الصورة
                  </button>
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-bold font-cairo text-theme">{slide.titleAr}</h3>
                      <p className="text-xs text-theme-muted font-cairo">{slide.subtitleAr}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setHeroSlides(prev => prev.map(s => s.id === slide.id ? { ...s, active: !s.active } : s))}
                        className={`relative w-9 h-5 rounded-full transition-all ${slide.active ? 'bg-emerald-500' : 'bg-theme-border'}`}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${slide.active ? 'right-[18px]' : 'right-0.5'}`} />
                      </button>
                      <span className={`text-[10px] font-cairo ${slide.active ? 'text-emerald-400' : 'text-theme-muted'}`}>
                        {slide.active ? 'ظاهر' : 'مخفي'}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <div>
                      <label className="block text-[10px] text-theme-muted font-cairo mb-0.5">العنوان (عربي)</label>
                      <input type="text" value={slide.titleAr} onChange={e => setHeroSlides(prev => prev.map(s => s.id === slide.id ? { ...s, titleAr: e.target.value } : s))}
                        className="w-full px-3 py-1.5 rounded-lg bg-theme-surface border border-theme-gold/10 text-theme text-xs font-cairo focus:outline-none focus:border-theme-gold/30" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-theme-muted font-cairo mb-0.5">العنوان (إنجليزي)</label>
                      <input type="text" value={slide.titleEn} onChange={e => setHeroSlides(prev => prev.map(s => s.id === slide.id ? { ...s, titleEn: e.target.value } : s))}
                        className="w-full px-3 py-1.5 rounded-lg bg-theme-surface border border-theme-gold/10 text-theme text-xs font-english focus:outline-none focus:border-theme-gold/30" />
                    </div>
                  </div>
                  <div className="flex items-center justify-end mt-3 gap-2">
                    <button onClick={() => setDeleteConfirm(slide.id)}
                      className="px-3 py-1.5 rounded-lg text-[10px] text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all font-cairo">
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <motion.button variants={itemVariants}
            onClick={() => {
              const newSlide: HeroSlide = { id: `hero-${Date.now()}`, imageUrl: '/assets/avatar.png', titleAr: '', titleEn: '', subtitleAr: '', subtitleEn: '', active: true, sortOrder: heroSlides.length };
              setHeroSlides(prev => [...prev, newSlide]);
              showSuccess('تمت إضافة شريحة جديدة');
            }}
            className="w-full py-3 rounded-xl border-2 border-dashed border-theme-gold/20 text-theme-gold text-sm font-cairo hover:border-theme-gold/40 hover:bg-theme-gold/5 transition-all">
            + إضافة شريحة جديدة
          </motion.button>
        </motion.div>
      )}

      {/* Banners Tab */}
      {activeTab === 'banners' && (
        <motion.div variants={containerVariants} className="space-y-4">
          {banners.map((banner) => (
            <motion.div key={banner.id} variants={itemVariants} layout
              className="rounded-2xl border border-theme-gold/10 bg-theme-card p-4">
              <div className="flex items-start gap-4">
                <div className="relative w-40 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-theme-surface">
                  <img src={banner.imageUrl} alt={banner.titleAr} className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatar.png'; }} />
                  <button onClick={() => setPickerContext({ target: 'banner', id: banner.id })}
                    className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/50 text-white text-[8px] hover:bg-black/70 transition-all">
                    تغيير
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-bold font-cairo text-theme">{banner.titleAr || 'بدون عنوان'}</h3>
                      <span className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-cairo ${
                        banner.position === 'top' ? 'bg-blue-500/10 text-blue-400' :
                        banner.position === 'middle' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-purple-500/10 text-purple-400'
                      }`}>
                        {banner.position === 'top' ? 'أعلى' : banner.position === 'middle' ? 'وسط' : 'أسفل'}
                      </span>
                    </div>
                    <button onClick={() => setBanners(prev => prev.map(b => b.id === banner.id ? { ...b, active: !b.active } : b))}
                      className={`relative w-9 h-5 rounded-full transition-all ${banner.active ? 'bg-emerald-500' : 'bg-theme-border'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${banner.active ? 'right-[18px]' : 'right-0.5'}`} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input type="text" value={banner.titleAr} onChange={e => setBanners(prev => prev.map(b => b.id === banner.id ? { ...b, titleAr: e.target.value } : b))}
                      placeholder="العنوان (عربي)" className="px-3 py-1.5 rounded-lg bg-theme-surface border border-theme-gold/10 text-theme text-xs font-cairo focus:outline-none focus:border-theme-gold/30" />
                    <input type="text" value={banner.link} onChange={e => setBanners(prev => prev.map(b => b.id === banner.id ? { ...b, link: e.target.value } : b))}
                      placeholder="الرابط" className="px-3 py-1.5 rounded-lg bg-theme-surface border border-theme-gold/10 text-theme text-xs font-english focus:outline-none focus:border-theme-gold/30" />
                    <select value={banner.position} onChange={e => setBanners(prev => prev.map(b => b.id === banner.id ? { ...b, position: e.target.value as Banner['position'] } : b))}
                      className="px-3 py-1.5 rounded-lg bg-theme-surface border border-theme-gold/10 text-theme text-xs font-cairo focus:outline-none focus:border-theme-gold/30">
                      <option value="top">أعلى</option><option value="middle">وسط</option><option value="bottom">أسفل</option>
                    </select>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button onClick={() => setDeleteConfirm(banner.id)} className="px-3 py-1 rounded-lg text-[10px] text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all font-cairo">حذف</button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <motion.button variants={itemVariants}
            onClick={() => {
              const newBanner: Banner = { id: `ban-${Date.now()}`, imageUrl: '/assets/avatar.png', titleAr: '', titleEn: '', link: '/', active: true, position: 'middle' };
              setBanners(prev => [...prev, newBanner]);
              showSuccess('تمت إضافة بنر جديد');
            }}
            className="w-full py-3 rounded-xl border-2 border-dashed border-theme-gold/20 text-theme-gold text-sm font-cairo hover:border-theme-gold/40 hover:bg-theme-gold/5 transition-all">
            + إضافة بنر جديد
          </motion.button>
        </motion.div>
      )}

      {/* Sections Tab */}
      {activeTab === 'sections' && (
        <motion.div variants={containerVariants} className="space-y-4">
          <p className="text-xs text-theme-muted font-cairo">إدارة صور الأقسام الثابتة في الصفحة الرئيسية</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((sec) => (
              <motion.div key={sec.id} variants={itemVariants}
                className="rounded-2xl border border-theme-gold/10 bg-theme-card p-4">
                <div className="relative w-full h-40 rounded-xl overflow-hidden mb-3 bg-theme-surface">
                  <img src={sec.imageUrl} alt={sec.altAr} className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/assets/avatar.png'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 right-2">
                    <p className="text-sm font-bold text-white font-cairo">{sec.altAr}</p>
                  </div>
                  <button onClick={() => setPickerContext({ target: 'section', id: sec.id })}
                    className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-black/50 text-white text-[10px] hover:bg-black/70 transition-all font-cairo">
                    تغيير الصورة
                  </button>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-[10px] text-theme-muted font-cairo mb-0.5">اسم القسم</label>
                    <input type="text" value={sec.section} className="w-full px-3 py-1.5 rounded-lg bg-theme-surface border border-theme-gold/10 text-theme text-xs font-english focus:outline-none" readOnly />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-theme-muted font-cairo mb-0.5">وصف (عربي)</label>
                      <input type="text" value={sec.altAr} onChange={e => setSections(prev => prev.map(s => s.id === sec.id ? { ...s, altAr: e.target.value } : s))}
                        className="w-full px-3 py-1.5 rounded-lg bg-theme-surface border border-theme-gold/10 text-theme text-xs font-cairo focus:outline-none focus:border-theme-gold/30" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-theme-muted font-cairo mb-0.5">وصف (إنجليزي)</label>
                      <input type="text" value={sec.altEn} onChange={e => setSections(prev => prev.map(s => s.id === sec.id ? { ...s, altEn: e.target.value } : s))}
                        className="w-full px-3 py-1.5 rounded-lg bg-theme-surface border border-theme-gold/10 text-theme text-xs font-english focus:outline-none focus:border-theme-gold/30" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Image Picker Modal */}
      <ImagePicker
        open={pickerContext !== null}
        onClose={() => setPickerContext(null)}
        onSelect={(url) => {
          if (!pickerContext) return;
          const { target, id } = pickerContext;
          if (target === 'hero') setHeroSlides(prev => prev.map(s => s.id === id ? { ...s, imageUrl: url } : s));
          else if (target === 'banner') setBanners(prev => prev.map(b => b.id === id ? { ...b, imageUrl: url } : b));
          else if (target === 'section') setSections(prev => prev.map(s => s.id === id ? { ...s, imageUrl: url } : s));
          setPickerContext(null);
          showSuccess('تم تغيير الصورة بنجاح');
        }}
      />

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
              <h3 className="text-lg font-bold font-cairo text-theme mb-2">تأكيد الحذف</h3>
              <p className="text-sm text-theme-secondary font-cairo mb-6">هل أنت متأكد من الحذف؟</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-theme-gold/20 text-theme-gold text-sm font-bold font-cairo hover:bg-theme-gold/10 transition-all">إلغاء</button>
                <button onClick={() => {
                  setHeroSlides(prev => prev.filter(s => s.id !== deleteConfirm));
                  setBanners(prev => prev.filter(b => b.id !== deleteConfirm));
                  setDeleteConfirm(null);
                  showSuccess('تم الحذف');
                }} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold font-cairo hover:bg-red-600 transition-all">حذف</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


