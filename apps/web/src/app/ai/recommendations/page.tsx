'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiStar, HiLocationMarker, HiClock, HiHeart } from 'react-icons/hi';

const categories = ['الكل', 'مطاعم', 'غوص', 'سفاري', 'فنادق', 'يخت', 'تصوير'];

const items = [
  { title: 'مطعم السمكة الذهبية', cat: 'مطاعم', rating: 4.8, price: 'متوسط', location: 'شرم الشيخ', image: '/images/activities/diving.svg' },
  { title: 'غوص في رأس محمد', cat: 'غوص', rating: 4.9, price: '$$$', location: 'شرم الشيخ', image: '/images/activities/diving.svg' },
  { title: 'سفاري صحراء سيناء', cat: 'سفاري', rating: 4.7, price: '$$', location: 'دهب', image: '/images/activities/desert-safari.svg' },
  { title: 'منتجع فور سيزونز', cat: 'فنادق', rating: 4.9, price: '$$$$', location: 'شرم الشيخ', image: '/images/destinations/sharm-el-sheikh.svg' },
  { title: 'رحلة يخت الغروب', cat: 'يخت', rating: 4.8, price: '$$$', location: 'الغردقة', image: '/images/activities/diving.svg' },
  { title: 'جولة تصوير الأقصر', cat: 'تصوير', rating: 4.6, price: '$', location: 'الأقصر', image: '/images/destinations/luxor.svg' },
];

export default function AIRecommendationsPage() {
  const [activeCat, setActiveCat] = useState('الكل');
  const [favorites, setFavorites] = useState<string[]>([]);

  const filtered = activeCat === 'الكل' ? items : items.filter((i) => i.cat === activeCat);

  const toggleFav = (title: string) => {
    setFavorites((prev) => prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]);
  };

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/ai" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <HiChevronLeft className="w-4 h-4" />
          العودة
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-2">توصيات مخصصة</h1>
          <p className="text-sm text-theme-muted font-cairo">اقتراحات ذكية بناءً على رحلاتك السابقة واهتماماتك</p>
        </motion.div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold font-cairo whitespace-nowrap transition-all ${
                activeCat === cat ? 'bg-theme-gold text-dark-900 shadow-gold-glow' : 'bg-theme-card border border-theme-gold/10 text-theme-secondary hover:border-theme-gold/20'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-theme-gold/10 bg-theme-card overflow-hidden group hover:border-theme-gold/20 hover:shadow-gold-border transition-all">
              <div className="relative h-40 bg-theme-surface flex items-center justify-center">
                <span className="text-5xl opacity-20">{item.title[0]}</span>
                <button onClick={() => toggleFav(item.title)}
                  className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-all">
                  <HiHeart className={`w-4 h-4 ${favorites.includes(item.title) ? 'text-red-400 fill-current' : 'text-white'}`} />
                </button>
              </div>
              <div className="p-4">
                <span className="text-[10px] text-theme-gold font-bold font-cairo">{item.cat}</span>
                <h3 className="font-bold text-sm text-theme font-cairo mt-1">{item.title}</h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-[10px] text-theme-muted font-cairo">
                    <HiStar className="text-yellow-400 w-3 h-3" />{item.rating}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-theme-muted font-cairo">
                    <HiLocationMarker className="w-3 h-3" />{item.location}
                  </span>
                  <span className="text-[10px] text-theme-muted font-cairo">{item.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
