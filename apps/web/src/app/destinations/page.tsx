'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiSearch, HiAdjustments, HiLocationMarker, HiStar } from 'react-icons/hi';
import { destinations, regions } from '@/lib/mock-data';
import StatsBar from '@/components/StatsBar';
import Testimonials from '@/components/Testimonials';
import HowItWorks from '@/components/HowItWorks';
import DownloadApp from '@/components/DownloadApp';

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredDestinations = useMemo(() => {
    return destinations.filter((d) => {
      const matchesRegion = activeRegion === 'all' || d.region === activeRegion;
      const matchesSearch = !searchQuery || d.name.includes(searchQuery) || d.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [activeRegion, searchQuery]);

  return (
    <>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 opacity-[0.04]">
          <svg viewBox="0 0 1440 800" className="w-full h-full">
            <path d="M0 400 Q 200 200 400 400 T 800 400 T 1200 400 T 1440 400" stroke="var(--gold)" strokeWidth="1" fill="none" />
            <path d="M0 500 Q 200 300 400 500 T 800 500 T 1200 500 T 1440 500" stroke="var(--gold)" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-8 pt-32 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-theme-gold/30 text-theme-gold text-xs font-semibold tracking-wider mb-6">
              <HiLocationMarker className="w-4 h-4" />
              {destinations.length} وجهة
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-playfair text-theme leading-tight mb-6"
          >
            اكتشف <span className="text-theme-gold">مصر</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-theme/70 mb-10 max-w-2xl font-cairo"
          >
            من شواطئ البحر الأحمر إلى معابد صعيد مصر، ومن واحات الصحراء إلى شواطئ المتوسط — 
            اختر وجهتك وانطلق في مغامرة العمر.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl"
          >
            <div className="relative flex-1">
              <HiSearch className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن وجهة..."
                className="w-full h-14 pl-5 pr-12 rounded-xl bg-theme-card border border-theme text-theme placeholder:text-theme-muted focus:outline-none focus:border-theme-gold transition-all duration-200 font-cairo"
              />
            </div>
            <button className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-md bg-theme-gold hover:bg-theme-gold/80 text-[#0A0E17] font-bold transition-all duration-200 font-cairo">
              <HiAdjustments className="w-5 h-5" />
              تصفية
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            {regions.map((region) => (
              <button
                key={region.slug}
                onClick={() => setActiveRegion(region.slug)}
                className={`px-4 py-2 rounded-full text-sm font-cairo font-medium transition-all duration-200 ${
                  activeRegion === region.slug
                    ? 'bg-theme-gold text-[#0A0E17]'
                    : 'bg-theme-card border border-theme text-theme/70 hover:text-theme-gold hover:border-theme-gold/40'
                }`}
              >
                {region.name}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent z-10" />
      </section>

      <section className="py-24 bg-theme-bg">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-3 font-poppins">
                {filteredDestinations.length} وجهة متاحة
              </p>
              <h2 className="text-4xl md:text-5xl font-bold font-playfair text-theme">
                اختر <span className="text-theme-gold">وجهتك</span>
              </h2>
              <p className="text-theme-secondary mt-3 font-cairo max-w-xl">
                كل مدينة في مصر لها حكاية، اختر حكايتك وابدأ رحلتك.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((dest, idx) => (
              <motion.div
                key={dest.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <Link
                  href={`/destinations/${dest.slug}`}
                  className="group block relative h-80 rounded-xl overflow-hidden border border-theme-gold/20 bg-theme-card transition-all duration-350 ease-out-expo hover:-translate-y-1 hover:shadow-[0_12px_40px_var(--gold-glow),0_4px_16px_rgba(0,0,0,0.06)]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out-expo group-hover:scale-105"
                    style={{ backgroundImage: `url(${dest.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/95 via-dark-900/40 to-transparent" />

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-dark-900/70 text-theme-gold border border-theme-gold/30">
                      {dest.region}
                    </span>
                  </div>

                  <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-md bg-dark-900/70">
                    <HiStar className="w-3.5 h-3.5 text-accent-amber" />
                    <span className="text-accent-amber text-xs font-bold">{dest.rating}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-bold font-playfair text-white mb-1 group-hover:text-theme-gold transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-white/60 text-sm font-cairo mb-3">{dest.subtitle}</p>
                    <div className="flex items-center gap-3 text-xs text-white/50 font-cairo">
                      <span>{dest.experienceCount} تجربة</span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span>{dest.highlights.length} معالم</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-20">
              <p className="text-theme-secondary text-lg font-cairo">لا توجد وجهات تطابق بحثك</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveRegion('all'); }}
                className="mt-4 px-6 py-2.5 rounded-md bg-theme-gold hover:bg-theme-gold/80 text-[#0A0E17] font-bold transition-all duration-200 font-cairo"
              >
                إعادة ضبط
              </button>
            </div>
          )}
        </div>
      </section>

      <StatsBar />
      <Testimonials />
      <HowItWorks />
      <DownloadApp />
    </>
  );
}
