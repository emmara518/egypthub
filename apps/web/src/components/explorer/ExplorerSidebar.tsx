'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ExplorerFilter, ExplorerNodeType } from '@/lib/explorer/types';
import { getActiveFilterCount } from '@/lib/explorer/filterEngine';

interface ExplorerSidebarProps {
  onFilterChange: (filter: ExplorerFilter) => void;
  onLayerChange: (layer: ExplorerNodeType | 'all') => void;
  activeLayer: ExplorerNodeType | 'all';
  activeFilter: ExplorerFilter;
  availableCategories: string[];
  resultsCount: number;
  isOpen: boolean;
  onToggle: () => void;
}

const LAYER_CONFIG: { key: ExplorerNodeType | 'all'; label: string; icon: string; color: string }[] = [
  { key: 'all', label: 'الكل', icon: '✦', color: 'text-theme-gold' },
  { key: 'city', label: 'مدن', icon: '🏙️', color: 'text-amber-400' },
  { key: 'experience', label: 'تجارب', icon: '✨', color: 'text-blue-400' },
  { key: 'story', label: 'قصص', icon: '📖', color: 'text-purple-400' },
  { key: 'food', label: 'مطاعم', icon: '🍽️', color: 'text-orange-400' },
  { key: 'ambassador', label: 'مرشدون', icon: '🧕', color: 'text-emerald-400' },
];

const TOGGLE_FILTERS: { key: 'verifiedOnly' | 'openNow' | 'trending' | 'recommended'; label: string; icon: string }[] = [
  { key: 'verifiedOnly', label: 'موثق فقط', icon: '✓' },
  { key: 'openNow', label: 'مفتوح الآن', icon: '🕐' },
  { key: 'trending', label: 'رائج', icon: '🔥' },
  { key: 'recommended', label: 'موصى به', icon: '⭐' },
];

function ChevronDown({ open }: { open: boolean }) {
  return (
    <motion.svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <path d="M6 9l6 6 6-6" />
    </motion.svg>
  );
}

export default function ExplorerSidebar({
  onFilterChange, onLayerChange, activeLayer, activeFilter, availableCategories, resultsCount, isOpen, onToggle,
}: ExplorerSidebarProps) {
  const [section, setSection] = useState<'layers' | 'categories' | 'price' | 'sort' | null>('layers');
  const [ratingHover, setRatingHover] = useState(0);

  const filterCount = getActiveFilterCount(activeFilter);

  const toggleFilter = (key: 'verifiedOnly' | 'openNow' | 'trending' | 'recommended') => {
    onFilterChange({ ...activeFilter, [key]: !activeFilter[key] });
  };

  const toggleCategory = (cat: string) => {
    const next = activeFilter.categories.includes(cat)
      ? activeFilter.categories.filter(c => c !== cat)
      : [...activeFilter.categories, cat];
    onFilterChange({ ...activeFilter, categories: next });
  };

  const setRating = (val: number) => {
    onFilterChange({ ...activeFilter, minRating: activeFilter.minRating === val ? 0 : val });
  };

  const setSort = (sort: ExplorerFilter['sortBy']) => {
    onFilterChange({ ...activeFilter, sortBy: sort });
  };

  const clearAll = () => {
    onFilterChange({
      ...activeFilter,
      types: [], categories: [], cities: [], intents: [],
      priceRange: [], difficulty: [], verifiedOnly: false, openNow: false,
      trending: false, recommended: false, minRating: 0, sortBy: 'recommended',
    });
  };

  const sidebarContent = (
    <div className="h-full overflow-y-auto p-5 space-y-6" style={{ scrollbarWidth: 'thin' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-theme font-cairo">التصفية</h3>
          {filterCount > 0 && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="px-1.5 py-0.5 rounded-full bg-theme-gold text-[10px] font-bold text-theme-bg min-w-[18px] text-center">
              {filterCount}
            </motion.span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {filterCount > 0 && (
            <button onClick={clearAll} className="text-[10px] text-theme-gold hover:underline font-cairo">مسح الكل</button>
          )}
          <button onClick={onToggle} className="lg:hidden text-theme-secondary hover:text-theme p-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      <div className="text-xs text-theme-secondary font-cairo flex items-center gap-1.5">
        <span>{resultsCount} نتيجة</span>
      </div>

      <div>
        <button
          onClick={() => setSection(section === 'layers' ? null : 'layers')}
          className="flex items-center justify-between w-full text-xs font-semibold text-theme mb-3 font-cairo"
        >
          الطبقات
          <ChevronDown open={section === 'layers'} />
        </button>
        <AnimatePresence>
          {section === 'layers' && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-1">
              {LAYER_CONFIG.map(l => (
                <button
                  key={l.key}
                  onClick={() => onLayerChange(l.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-cairo text-right transition-all duration-200 ${
                    activeLayer === l.key
                      ? 'bg-theme-gold/10 text-theme-gold border border-theme-gold/20'
                      : 'text-theme-secondary hover:bg-theme-border/30 hover:text-theme border border-transparent'
                  }`}
                >
                  <span className="text-sm">{l.icon}</span>
                  <span className="flex-1">{l.label}</span>
                  {activeLayer === l.key && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1.5 h-1.5 rounded-full bg-theme-gold" />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5">
          {TOGGLE_FILTERS.map(tf => (
            <button
              key={tf.key}
              onClick={() => toggleFilter(tf.key)}
              className={`px-2.5 py-1.5 rounded-full text-[10px] font-cairo border transition-all duration-200 flex items-center gap-1 ${
                activeFilter[tf.key]
                  ? 'bg-theme-gold/10 border-theme-gold text-theme-gold'
                  : 'border-theme-border text-theme-secondary hover:border-theme-gold/40 hover:text-theme'
              }`}
            >
              {tf.icon} {tf.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <button
          onClick={() => setSection(section === 'categories' ? null : 'categories')}
          className="flex items-center justify-between w-full text-xs font-semibold text-theme mb-3 font-cairo"
        >
          التصنيفات
          <ChevronDown open={section === 'categories'} />
        </button>
        <AnimatePresence>
          {section === 'categories' && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="flex flex-wrap gap-1.5 pt-1">
                {availableCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-cairo border transition-all ${
                      activeFilter.categories.includes(cat)
                        ? 'bg-theme-gold/10 border-theme-gold text-theme-gold'
                        : 'border-theme-border text-theme-secondary hover:border-theme-gold/40 hover:text-theme'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <button
          onClick={() => setSection(section === 'price' ? null : 'price')}
          className="flex items-center justify-between w-full text-xs font-semibold text-theme mb-3 font-cairo"
        >
          التقييم
          <ChevronDown open={section === 'price'} />
        </button>
        <AnimatePresence>
          {section === 'price' && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="flex gap-1 pt-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setRatingHover(n)}
                    onMouseLeave={() => setRatingHover(0)}
                    className={`w-9 h-9 rounded-lg text-sm border transition-all ${
                      activeFilter.minRating >= n
                        ? 'bg-theme-gold/15 border-theme-gold text-theme-gold'
                        : 'border-theme-border text-theme-secondary/50 hover:border-theme-gold/30 hover:text-theme'
                    } ${ratingHover >= n ? 'scale-110' : ''}`}
                    aria-label={`${n} نجوم فأكثر`}
                  >
                    {n === 1 ? '😞' : n === 2 ? '😐' : n === 3 ? '🙂' : n === 4 ? '😊' : '🤩'}
                  </button>
                ))}
              </div>
              {activeFilter.minRating > 0 && (
                <p className="text-[10px] text-theme-gold mt-1.5 font-cairo">{activeFilter.minRating}+ نجوم</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <button
          onClick={() => setSection(section === 'sort' ? null : 'sort')}
          className="flex items-center justify-between w-full text-xs font-semibold text-theme mb-3 font-cairo"
        >
          الترتيب
          <ChevronDown open={section === 'sort'} />
        </button>
        <AnimatePresence>
          {section === 'sort' && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-1 pt-1">
              {([
                { value: 'recommended', label: 'الموصى بها' },
                { value: 'rating', label: 'التقييم' },
                { value: 'price_low', label: 'السعر: من الأقل' },
                { value: 'price_high', label: 'السعر: من الأعلى' },
                { value: 'newest', label: 'الأحدث' },
              ] as const).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSort(opt.value)}
                  className={`w-full text-right px-3 py-2 rounded-xl text-xs font-cairo transition-all ${
                    activeFilter.sortBy === opt.value
                      ? 'bg-theme-gold/10 text-theme-gold'
                      : 'text-theme-secondary hover:bg-theme-border/30 hover:text-theme'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {filterCount > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={clearAll}
          className="w-full py-2 rounded-xl border border-theme-gold/20 text-theme-gold text-xs font-cairo hover:bg-theme-gold/5 transition-all"
        >
          إزالة جميع الفلاتر ({filterCount})
        </motion.button>
      )}
    </div>
  );

  return (
    <>
      <button
        onClick={onToggle}
        className="lg:hidden fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full bg-theme-gold text-theme-bg flex items-center justify-center shadow-lg shadow-theme-gold/20"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
        </svg>
        {filterCount > 0 && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
            {filterCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed lg:sticky top-0 right-0 z-40 w-72 h-full overflow-y-auto bg-theme-bg lg:bg-transparent border-l border-theme-border"
            style={{ scrollbarWidth: 'thin' }}
          >
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
