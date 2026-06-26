'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  getAllPartners,
  getFeaturedPartners,
  getPartnersByCategory,
  searchPartners,
} from '@/lib/network';
import type { PartnerCategory } from '@/lib/network';

const categories: PartnerCategory[] = [
  'Hotel', 'Resort', 'Restaurant', 'Dive Center',
  'Tour Operator', 'Transportation', 'Shopping', 'Experience Provider',
];

const categoryLabels: Record<PartnerCategory, string> = {
  Hotel: 'فندق',
  Resort: 'منتجع',
  Restaurant: 'مطعم',
  'Dive Center': 'مركز غوص',
  'Tour Operator': 'منظم رحلات',
  Transportation: 'مواصلات',
  Shopping: 'تسوق',
  'Experience Provider': 'مقدم تجارب',
};

const cityLabels: Record<string, string> = {
  cairo: 'القاهرة',
  alexandria: 'الإسكندرية',
  luxor: 'الأقصر',
  aswan: 'أسوان',
  hurghada: 'الغردقة',
  'sharm-el-sheikh': 'شرم الشيخ',
  dahab: 'دهب',
  siwa: 'سيوة',
};

const starIcon = (filled: boolean) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? '#F2A00A' : 'none'} stroke={filled ? '#F2A00A' : '#555'} strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

function PartnerCard({ partner }: { partner: ReturnType<typeof getAllPartners>[number] }) {
  const slug = partner.nameEn.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/partners/${slug}`}
        className="group block rounded-2xl border border-theme-gold/15 bg-theme-card overflow-hidden hover:border-theme-gold/30 transition-all duration-300 h-full"
      >
        <div className="relative h-44 bg-gradient-to-br from-theme-gold/5 to-theme-card overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-theme-gold">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
          {partner.featured && (
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-theme-gold text-dark-900 font-cairo">
                مميز
              </span>
            </div>
          )}
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-dark-900/70 text-theme-gold border border-theme-gold/20 font-cairo">
              {categoryLabels[partner.category]}
            </span>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s}>{starIcon(s <= Math.round(partner.rating))}</span>
            ))}
            <span className="text-accent-amber text-xs font-semibold mr-1">{partner.rating}</span>
          </div>
          <h3 className="text-base font-bold font-playfair text-theme leading-tight">{partner.name}</h3>
          <p className="text-xs text-theme-muted font-cairo">{cityLabels[partner.city] || partner.city}</p>
          <p className="text-xs text-theme-secondary font-cairo line-clamp-2 leading-relaxed">{partner.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function PartnersPage() {
  const allPartners = useMemo(() => getAllPartners(), []);
  const featured = useMemo(() => getFeaturedPartners(), []);
  const [activeCategory, setActiveCategory] = useState<PartnerCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const displayed = useMemo(() => {
    let list = allPartners;
    if (activeCategory !== 'all') list = getPartnersByCategory(activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allPartners, activeCategory, searchQuery]);

  const cities = useMemo(() => {
    const set = new Set(allPartners.map((p) => p.city));
    return Array.from(set).sort();
  }, [allPartners]);

  const [selectedCity, setSelectedCity] = useState<string>('');

  const filtered = useMemo(() => {
    let list = displayed;
    if (selectedCity) list = list.filter((p) => p.city === selectedCity);
    return list;
  }, [displayed, selectedCity]);

  return (
    <div className="min-h-screen bg-theme-bg pb-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 text-theme-muted text-sm font-cairo mb-2">
            <Link href="/" className="hover:text-theme-gold transition-colors">الرئيسية</Link>
            <span>/</span>
            <span className="text-theme">شركاؤنا</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-theme mb-2">شركاؤنا</h1>
          <p className="text-theme-secondary font-cairo max-w-2xl">
            نخبة من أفضل مقدمي الخدمات السياحية في مصر
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن شريك..."
                className="w-full pr-12 pl-4 py-3 rounded-xl bg-theme-card border border-theme-gold/15 text-theme font-cairo text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-gold/40 transition-colors"
              />
            </div>
          </div>
          <div className="lg:w-48">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme-gold/15 text-theme font-cairo text-sm focus:outline-none focus:border-theme-gold/40 transition-colors"
            >
              <option value="">كل المدن</option>
              {cities.map((c) => (
                <option key={c} value={c}>{cityLabels[c] || c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-cairo font-semibold transition-all ${
              activeCategory === 'all'
                ? 'bg-theme-gold text-dark-900'
                : 'bg-theme-card border border-theme-gold/15 text-theme-secondary hover:border-theme-gold/30'
            }`}
          >
            الكل
          </motion.button>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-cairo font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-theme-gold text-dark-900'
                  : 'bg-theme-card border border-theme-gold/15 text-theme-secondary hover:border-theme-gold/30'
              }`}
            >
              {categoryLabels[cat]}
            </motion.button>
          ))}
        </div>

        {activeCategory === 'all' && !selectedCity && featured.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#F2A00A" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <h2 className="text-xl font-bold font-playfair text-theme">شركاء مميزون</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.slice(0, 4).map((p) => (
                <PartnerCard key={p.id} partner={p} />
              ))}
            </div>
          </motion.section>
        )}

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold font-playfair text-theme">
            {activeCategory === 'all' ? 'جميع الشركاء' : categoryLabels[activeCategory]}
          </h2>
          <span className="text-xs text-theme-muted font-cairo">{filtered.length} شريك</span>
        </div>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-theme-muted mb-4">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <p className="text-theme-secondary font-cairo">لا يوجد شركاء مطابقون</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory + selectedCity}
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((p) => (
                <PartnerCard key={p.id} partner={p} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="rounded-2xl border border-theme-gold/15 bg-gradient-to-br from-theme-gold/5 to-transparent p-10">
            <h2 className="text-2xl font-bold font-playfair text-theme mb-3">انضم إلى شركائنا</h2>
            <p className="text-theme-secondary font-cairo mb-6 max-w-lg mx-auto">
              كن جزءاً من شبكة EGYPTHUB ووسّع نطاق وصولك إلى المسافرين من جميع أنحاء العالم
            </p>
            <Link
              href="/partners/join"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo transition-all hover:bg-theme-gold/90 hover:shadow-lg hover:shadow-theme-gold/20"
            >
              انضم كشريك
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
