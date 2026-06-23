'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiCalendar, HiClock, HiChevronLeft, HiBookmark, HiHeart, HiEye } from 'react-icons/hi';
import { stories } from '@/lib/mock-data';
import StatsBar from '@/components/StatsBar';

const categories = ['الكل', 'تاريخ', 'مغامرات', 'طبيعة', 'مدن', 'رحلات'];

export default function StoriesPage() {
  const [activeCategory, setActiveCategory] = useState('الكل');

  const filtered = useMemo(() => {
    return activeCategory === 'الكل' ? stories : stories.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  const featured = stories.filter(s => s.featured);

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 opacity-[0.03]">
          <svg viewBox="0 0 1440 800" className="w-full h-full">
            <path d="M0 300 Q 200 150 400 300 T 800 300 T 1200 300 T 1440 300" stroke="var(--gold)" strokeWidth="1" fill="none" />
            <path d="M0 400 Q 200 250 400 400 T 800 400 T 1200 400 T 1440 400" stroke="var(--gold)" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-8 pt-20 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-theme-gold/30 text-theme-gold text-xs font-semibold mb-6">
              <HiBookmark className="w-4 h-4" />
              {stories.length} قصة
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-playfair text-theme leading-tight mb-6">
            قصص <span className="text-theme-gold">المسافرين</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-theme/70 mb-10 max-w-2xl font-cairo">
            قصص حقيقية من مسافرين استكشفوا مصر — حكايات ملهمة وتجارب لا تنسى.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-cairo font-medium transition-all duration-200 ${
                  activeCategory === cat ? 'bg-theme-gold text-dark-900' : 'bg-theme-card border border-theme text-theme/70 hover:text-theme-gold hover:border-theme-gold/40'
                }`}>{cat}</button>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent z-10" />
      </section>

      {featured.length > 0 && activeCategory === 'الكل' && (
        <section className="py-16 bg-theme-bg">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-2 font-poppins">قصص مميزة</p>
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-theme">مختارة <span className="text-theme-gold">للقارئ</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((story, idx) => (
                <motion.div key={story.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                  <Link href={`/stories/${story.slug}`}
                    className="group block rounded-2xl overflow-hidden border border-theme-gold/20 bg-theme-card transition-all duration-350 ease-out-expo hover:-translate-y-1 hover:shadow-[0_12px_40px_var(--gold-glow)]">
                    <div className="relative h-56 overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out-expo group-hover:scale-105"
                        style={{ backgroundImage: `url(${story.image})` }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/95 via-dark-900/40 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-dark-900/70 text-theme-gold border border-theme-gold/30 font-cairo">{story.category}</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-xl font-bold font-playfair text-white mb-1 group-hover:text-theme-gold transition-colors">{story.title}</h3>
                        <p className="text-white/70 text-sm font-cairo">{story.subtitle}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-theme-secondary text-sm font-cairo line-clamp-2 mb-3">{story.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-theme-muted font-cairo">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><HiCalendar />{story.date}</span>
                          <span className="flex items-center gap-1"><HiClock />{story.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-6 h-6 rounded-full bg-cover bg-center border border-theme-gold/30" style={{ backgroundImage: `url(${story.authorAvatar})` }} />
                          <span>{story.author}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-24 bg-theme-bg">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          {activeCategory !== 'الكل' && (
            <div className="mb-8">
              <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-2 font-poppins">{filtered.length} قصة</p>
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-theme">قصص <span className="text-theme-gold">{activeCategory}</span></h2>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCategory === 'الكل' ? filtered : filtered).map((story, idx) => (
              <motion.div key={story.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.05 }}>
                <Link href={`/stories/${story.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-theme-gold/10 bg-theme-card transition-all duration-350 ease-out-expo hover:-translate-y-1 hover:shadow-[0_12px_40px_var(--gold-glow)]">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out-expo group-hover:scale-105"
                      style={{ backgroundImage: `url(${story.image})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/30 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-dark-900/70 text-theme-gold border border-theme-gold/30 font-cairo">{story.category}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-bold font-playfair text-white mb-1 group-hover:text-theme-gold transition-colors">{story.title}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-theme-secondary text-sm font-cairo line-clamp-2 mb-3">{story.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-theme-muted font-cairo">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1"><HiCalendar />{story.date}</span>
                        <span>{story.readTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HiHeart className="text-red-400/70" />
                        <span>{story.author}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <StatsBar />
    </>
  );
}
