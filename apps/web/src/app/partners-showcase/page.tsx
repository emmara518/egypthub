'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  { id: 'all', label: 'الكل' },
  { id: 'hotel', label: 'فنادق' },
  { id: 'restaurant', label: 'مطاعم' },
  { id: 'activity', label: 'أنشطة' },
];

const categoryIcons: Record<string, JSX.Element> = {
  hotel: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  restaurant: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.5 1.5 0 013 15.546M12 2v20M3 7h18" />
    </svg>
  ),
  activity: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const partners = [
  {
    id: 1,
    name: 'فندق ماريوت شرم الشيخ',
    logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=120&fit=crop',
    category: 'hotel',
    rating: 4.8,
    location: 'شرم الشيخ',
    desc: 'منتجع فاخر على شاطئ البحر الأحمر',
  },
  {
    id: 2,
    name: 'مطعم أبيدوس',
    logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=120&fit=crop',
    category: 'restaurant',
    rating: 4.6,
    location: 'القاهرة',
    desc: 'أفضل المطاعم المصرية التقليدية',
  },
  {
    id: 3,
    name: 'سنوركلينج ريد سي',
    logo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=120&fit=crop',
    category: 'activity',
    rating: 4.9,
    location: 'الغردقة',
    desc: 'رحلات غوص وسنوركلينج احترافية',
  },
  {
    id: 4,
    name: 'هيلتون ريزورت النخلة',
    logo: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=200&h=120&fit=crop',
    category: 'hotel',
    rating: 4.7,
    location: 'الغردقة',
    desc: 'منتجع عائلي مميز على البحر الأحمر',
  },
  {
    id: 5,
    name: 'كافيه الأزهر',
    logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=120&fit=crop',
    category: 'restaurant',
    rating: 4.5,
    location: 'القاهرة',
    desc: 'كافيه يطل على مسجد الأزهر التاريخي',
  },
  {
    id: 6,
    name: ' Safari الصحراء البيضاء',
    logo: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=200&h=120&fit=crop',
    category: 'activity',
    rating: 4.8,
    location: 'الوادي الجديد',
    desc: 'مغامرة فريدة في الصحراء البيضاء',
  },
  {
    id: 7,
    name: ' Kempinski Nile Hotel',
    logo: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&h=120&fit=crop',
    category: 'hotel',
    rating: 4.9,
    location: 'القاهرة',
    desc: 'فندق فاخر على ضفاف النيل',
  },
  {
    id: 8,
    name: 'مطعم فول مدمس',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=120&fit=crop',
    category: 'restaurant',
    rating: 4.4,
    location: 'الإسكندرية',
    desc: 'أشهر مطعم للأكل المصري الشعبي',
  },
  {
    id: 9,
    name: 'uito رحلات نيلية',
    logo: 'https://images.unsplash.com/photo-1568322503122-d21b1d9c8e04?w=200&h=120&fit=crop',
    category: 'activity',
    rating: 4.7,
    location: 'الأقصر',
    desc: 'رحلات بحرية مميزة على النيل',
  },
];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg className={`w-3 h-3 ${filled ? 'text-theme-gold' : 'text-theme-border'}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function PartnersShowcasePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all' ? partners : partners.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          العودة للرئيسية
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white font-playfair">شركاؤنا</h1>
          <p className="text-theme-muted font-cairo mt-1">شركاؤنا المميزون لتجربة سياحية لا تُنسى</p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-cairo whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-theme-gold/10 text-theme-gold border border-theme-gold/20 font-medium'
                  : 'bg-theme-card text-theme-secondary border border-theme-border hover:text-white hover:border-theme-gold/10'
              }`}>
              {cat.id !== 'all' && categoryIcons[cat.id]}
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((partner, idx) => (
            <motion.div key={partner.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border border-theme-gold/10 bg-theme-card overflow-hidden hover:border-theme-gold/25 transition-all group">
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${partner.logo})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-card to-transparent" />
                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold font-cairo backdrop-blur-sm ${
                  partner.category === 'hotel' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  partner.category === 'restaurant' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                  'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {categories.find(c => c.id === partner.category)?.label}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white font-cairo mb-1 group-hover:text-theme-gold transition-colors">{partner.name}</h3>
                <p className="text-xs text-theme-muted font-cairo mb-3">{partner.desc}</p>

                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map(s => <StarIcon key={s} filled={s <= Math.floor(partner.rating)} />)}
                  <span className="text-xs text-white font-english mr-1">{partner.rating}</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-theme-secondary font-cairo">
                  <svg className="w-3.5 h-3.5 text-theme-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {partner.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-lg font-bold text-white font-cairo">لا يوجد شركاء في هذا التصنيف</h3>
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="rounded-2xl border border-theme-gold/10 bg-theme-card p-8 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-white font-playfair mb-2">هل تريد الشراكة معنا؟</h2>
            <p className="text-sm text-theme-muted font-cairo mb-4">انضم إلى شبكة شركائنا واعرض خدماتك لآلاف المسافرين</p>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-theme-gold text-theme-bg text-sm font-cairo font-bold hover:shadow-lg hover:shadow-[#D4A24C]/20 transition-all">
              تواصل معنا
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
