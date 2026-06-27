'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const sharmLocations = [
  { name: 'Naama Bay', nameAr: 'نا باي', desc: 'ال心脏 النابض لشرم الشيخ — مطاعم، تسوق، حياة ليلية', icon: '🏖️', x: '52%', y: '38%', tag: 'BEACH', rating: '4.7', reviews: '4.2K' },
  { name: "Shark's Bay", nameAr: 'خليج القرش', desc: 'استوائي هادئ — فنادق فاخرة وشواطئ خاصة', icon: '🦈', x: '44%', y: '28%', tag: 'LUXURY', rating: '4.8', reviews: '2.1K' },
  { name: 'Ras Mohammed', nameAr: 'رأس محمد', desc: 'أحلى غوص في العالم — شعاب مرجانية وحياة بحرية', icon: '🤿', x: '38%', y: '58%', tag: 'DIVING', rating: '4.9', reviews: '3.8K' },
  { name: 'Tiran Island', nameAr: 'جزيرة تيران', desc: 'غوص أسطوري — تيار قوي وشعاب مرجانية ملونة', icon: '🐠', x: '62%', y: '22%', tag: 'DIVING', rating: '4.8', reviews: '1.9K' },
  { name: 'Old Market', nameAr: 'السوق القديم', desc: 'تجربة مصرية أصيلة — سouverirs، توابل، ياقوت', icon: '🛍️', x: '58%', y: '48%', tag: 'CULTURE', rating: '4.5', reviews: '2.8K' },
  { name: 'Pharaoh Island', nameAr: 'جزيرة فرعون', desc: 'قلعة صلاح الدين — تاريخ وماء فيردي صافي', icon: '🏰', x: '70%', y: '32%', tag: 'HISTORY', rating: '4.6', reviews: '1.5K' },
  { name: 'Jackson Reef', nameAr: 'شعاب جاكسون', desc: 'أفضل نقطة غوص — سلحفاة بحرية وقرش بابلو', icon: '🐢', x: '66%', y: '42%', tag: 'DIVING', rating: '4.9', reviews: '2.3K' },
  { name: 'Gardens', nameAr: 'حدائق', desc: 'غوص للمبتدئين — مياه هادئة وشعاب سهلة الوصول', icon: '🌿', x: '48%', y: '52%', tag: 'DIVING', rating: '4.6', reviews: '1.1K' },
  { name: 'SOHO Square', nameAr: 'سهو سكوير', desc: 'مركز ترفيهي عائلي — مطاعم، ألعاب، عروض حية', icon: '🎭', x: '42%', y: '42%', tag: 'ENTERTAINMENT', rating: '4.4', reviews: '1.7K' },
  { name: 'Hadaba', nameAr: 'حدابة', desc: 'منطقة هادئة — فيلات وشواطئ خاصة وبخاري', icon: '🌴', x: '35%', y: '48%', tag: 'RELAXATION', rating: '4.7', reviews: '980' },
  { name: 'White Island', nameAr: 'الجزيرة البيضاء', desc: 'رحلة قارب — رمال بيضاء ومياه فيردي في النص', icon: '🏝️', x: '55%', y: '62%', tag: 'ADVENTURE', rating: '4.8', reviews: '2.5K' },
  { name: 'Eel Garden', nameAr: 'حديقة الأeel', desc: 'غوص فريد — مئات الأeel تحت الماء', icon: '🌊', x: '46%', y: '68%', tag: 'DIVING', rating: '4.7', reviews: '870' },
];

const roadConnections = [
  { from: 'Naama Bay', to: "Shark's Bay" },
  { from: 'Naama Bay', to: 'Old Market' },
  { from: 'Naama Bay', to: 'Hadaba' },
  { from: "Shark's Bay", to: 'Tiran Island' },
  { from: 'Ras Mohammed', to: 'Gardens' },
  { from: 'Ras Mohammed', to: 'Eel Garden' },
  { from: 'Jackson Reef', to: 'Tiran Island' },
  { from: 'Old Market', to: 'SOHO Square' },
  { from: 'Hadaba', to: 'Ras Mohammed' },
  { from: 'White Island', to: 'Ras Mohammed' },
];

const categoryFilters = [
  { label: 'الكل', labelEn: 'All' },
  { label: 'غوص', labelEn: 'Diving' },
  { label: 'شواطئ', labelEn: 'Beaches' },
  { label: 'ثقافة', labelEn: 'Culture' },
  { label: 'مغامرات', labelEn: 'Adventure' },
  { label: 'ترفيه', labelEn: 'Fun' },
  { label: 'استرخاء', labelEn: 'Relax' },
];

const filterMappings: Record<number, string[]> = {
  1: ['Ras Mohammed', 'Tiran Island', 'Jackson Reef', 'Gardens', 'Eel Garden'],
  2: ['Naama Bay', "Shark's Bay", 'White Island'],
  3: ['Old Market', 'Pharaoh Island'],
  4: ['White Island', 'Ras Mohammed'],
  5: ['SOHO Square', 'Old Market'],
  6: ['Hadaba', "Shark's Bay"],
};

const getTagColor = (tag: string): string => {
  const map: Record<string, string> = {
    BEACH: '#41BEDC',
    LUXURY: '#E1BEE7',
    DIVING: '#10B981',
    CULTURE: '#A78BFA',
    HISTORY: '#F59E0B',
    ENTERTAINMENT: '#EC4899',
    RELAXATION: '#0E8F94',
    ADVENTURE: '#F97316',
  };
  return map[tag] || '#D4A24C';
};

export default function InteractiveMapSection() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState(0);
  const [liveCount, setLiveCount] = useState(247);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount((prev) => Math.max(200, prev + Math.floor(Math.random() * 5) - 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const activeNames = activeFilter === 0
    ? new Set(sharmLocations.map(d => d.name))
    : new Set(filterMappings[activeFilter] || []);

  const selected = sharmLocations.find(d => d.name === selectedLocation);

  const activeRoadNames = selectedLocation
    ? new Set(
        roadConnections
          .filter(c => c.from === selectedLocation || c.to === selectedLocation)
          .flatMap(c => [`${c.from}|${c.to}`, `${c.to}|${c.from}`])
      )
    : new Set();

  return (
    <section className="relative bg-theme-bg">
      {/* ─── Sticky Header ─── */}
      <div className="sticky top-0 z-40 bg-theme-bg/95 backdrop-blur-xl border-b border-theme-gold/[0.06]">
        <div className="w-full max-w-[1440px] mx-auto px-4 py-3 md:px-8 md:py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
                <p className="text-[9px] md:text-[10px] font-bold font-english tracking-[0.2em] text-theme-gold">SHARM EL SHEIKH</p>
              </div>
              <h2 className="text-lg md:text-xl font-bold font-display text-white">
                Choose Your <span className="text-theme-gold">Sharm</span> Journey
              </h2>
            </div>
            <div className="flex items-center gap-1.5">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-[10px] text-white/50 font-english">{liveCount} divers now</span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {categoryFilters.map((filter, i) => (
              <button key={i} onClick={() => setActiveFilter(activeFilter === i ? 0 : i)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-cairo transition-all touch-target ${
                  activeFilter === i
                    ? 'bg-theme-gold text-theme-bg font-bold shadow-[0_0_12px_rgba(212,162,76,0.3)]'
                    : 'bg-white/[0.06] text-white/50 hover:bg-white/[0.1] border border-white/[0.06]'
                }`}>
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Map Area ─── */}
      <div className="relative" style={{ minHeight: 'clamp(350px, 50vh, 550px)' }}>
        <div className="relative w-full h-full min-h-[350px] bg-theme-bg overflow-hidden"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.3s ease' }}>

          {/* Background Map Image */}
          <Image src="/assets/egypt-map.webp" alt="Sharm El Sheikh map" fill sizes="100vw" className="object-contain opacity-30 p-2 lg:p-4" />

          {/* SVG Road Connections */}
          <svg className="absolute inset-0 w-full h-full z-[1] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <filter id="roadGlow">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D4A24C" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#D4A24C" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#D4A24C" stopOpacity="0.08" />
              </linearGradient>
              <linearGradient id="roadGradActive" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D4A24C" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#E8C97A" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#D4A24C" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {roadConnections.map((conn) => {
              const from = sharmLocations.find(d => d.name === conn.from);
              const to = sharmLocations.find(d => d.name === conn.to);
              if (!from || !to) return null;
              const fromX = parseFloat(from.x);
              const fromY = parseFloat(from.y);
              const toX = parseFloat(to.x);
              const toY = parseFloat(to.y);
              const connKey = `${conn.from}|${conn.to}`;
              const isActive = activeRoadNames.has(connKey);
              return (
                <line key={connKey} x1={fromX} y1={fromY} x2={toX} y2={toY}
                  stroke={isActive ? 'url(#roadGradActive)' : 'url(#roadGrad)'}
                  strokeWidth={isActive ? '0.6' : '0.25'}
                  strokeLinecap="round"
                  filter={isActive ? 'url(#roadGlow)' : undefined} />
              );
            })}
          </svg>

          {/* ─── Location Markers (Gold Circles with Icons) ─── */}
          {sharmLocations.map((loc, index) => {
            const isDimmed = !activeNames.has(loc.name);
            const isSelected = selectedLocation === loc.name;
            const color = getTagColor(loc.tag);

            return (
              <motion.button
                key={loc.name}
                onClick={() => setSelectedLocation(isSelected ? null : loc.name)}
                className={`absolute z-10 touch-target ${isDimmed ? 'opacity-15 pointer-events-none' : ''}`}
                style={{ left: loc.x, top: loc.y, transform: 'translate(-50%, -50%)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04, type: 'spring', stiffness: 300 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Pulse ring */}
                <motion.div
                  animate={isSelected ? { scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] } : { scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: isSelected ? 1.5 : 2.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full"
                  style={{ border: `1.5px solid ${color}`, margin: '-4px' }}
                />

                {/* Main circle */}
                <div className={`relative w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isSelected ? 'shadow-[0_0_24px_rgba(212,162,76,0.6)]' : 'shadow-[0_0_8px_rgba(212,162,76,0.2)]'
                }`}
                  style={{ background: `radial-gradient(circle, ${color}30 0%, ${color}10 100%)`, border: `1.5px solid ${color}${isSelected ? '' : '60'}` }}
                >
                  <span className="text-sm md:text-base">{loc.icon}</span>
                </div>
              </motion.button>
            );
          })}

          {/* ─── Selected Location Card (Bottom) ─── */}
          <AnimatePresence>
            {selected && (
              <motion.div
                key={selected.name}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-[280px] z-30"
              >
                <div className="bg-theme-surface/95 backdrop-blur-xl rounded-2xl border border-theme-gold/20 overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
                  {/* Header */}
                  <div className="relative px-4 pt-4 pb-3" style={{ background: `linear-gradient(135deg, ${getTagColor(selected.tag)}15, transparent)` }}>
                    <button onClick={() => setSelectedLocation(null)}
                      className="absolute top-3 left-3 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all touch-target text-xs">
                      ✕
                    </button>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ background: `${getTagColor(selected.tag)}20`, border: `1.5px solid ${getTagColor(selected.tag)}40` }}>
                        <span className="text-2xl">{selected.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white font-display">{selected.nameAr}</h4>
                        <p className="text-[10px] text-white/40 font-english">{selected.name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <span className="text-theme-gold text-xs">★</span>
                        <span className="text-sm font-bold text-theme-gold">{selected.rating}</span>
                        <span className="text-[10px] text-white/30">({selected.reviews})</span>
                      </div>
                      <span className="text-[9px] font-bold font-english tracking-[0.1em] px-2 py-0.5 rounded-full"
                        style={{ color: getTagColor(selected.tag), background: `${getTagColor(selected.tag)}15`, border: `1px solid ${getTagColor(selected.tag)}30` }}>
                        {selected.tag}
                      </span>
                    </div>
                    <p className="text-xs text-white/50 mb-3 leading-relaxed">{selected.desc}</p>
                    <Link href="/destinations/sharm-el-sheikh" className="w-full py-2.5 rounded-xl gold-btn text-xs font-bold font-cairo shadow-[0_4px_12px_rgba(212,162,76,0.2)] block text-center">
                      استكشف {selected.nameAr} ←
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1.5 lg:flex">
            <button aria-label="Zoom in" onClick={() => setZoom(prev => Math.min(prev + 0.15, 1.8))}
              className="w-8 h-8 rounded-lg bg-theme-surface/80 backdrop-blur-sm border border-theme-gold/10 flex items-center justify-center text-white/50 hover:text-theme-gold transition-all touch-target text-sm">
              +
            </button>
            <button aria-label="Zoom out" onClick={() => setZoom(prev => Math.max(prev - 0.15, 0.6))}
              className="w-8 h-8 rounded-lg bg-theme-surface/80 backdrop-blur-sm border border-theme-gold/10 flex items-center justify-center text-white/50 hover:text-theme-gold transition-all touch-target text-sm">
              −
            </button>
          </div>
        </div>
      </div>

      {/* ─── Live Strip ─── */}
      <div className="bg-theme-surface/40 border-t border-theme-gold/[0.06] px-4 py-3">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {[
            { icon: '🤿', text: 'Ras Mohammed — perfect visibility' },
            { icon: '🌡️', text: 'Water 26°C' },
            { icon: '👥', text: `${liveCount} divers now` },
            { icon: '🌅', text: 'Sunset boat trip tonight' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 shrink-0">
              <span className="text-sm">{item.icon}</span>
              <span className="text-[10px] text-white/50 font-english whitespace-nowrap">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
