'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiLocationMarker } from 'react-icons/hi';

const categoryFilters = [
  { icon: '⊙', label: 'All', active: true },
  { icon: '🏖️', label: 'Beaches' },
  { icon: '🏛️', label: 'History' },
  { icon: '⛰️', label: 'Adventure' },
  { icon: '🏙️', label: 'Cities' },
  { icon: '🏜️', label: 'Desert' },
  { icon: '🌴', label: 'Oasis' },
  { icon: '🏝️', label: 'Islands' },
];

const features = [
  { icon: '📍', title: 'Real Locations', desc: 'Explore top destinations' },
  { icon: '⭐', title: 'Live Ratings', desc: 'See real traveler reviews' },
  { icon: '🏛️', title: 'Rich Categories', desc: 'Filter what interests you' },
  { icon: '🗺️', title: 'Plan Your Journey', desc: 'Start your adventure' },
];

const cities = [
  { name: 'Alexandria', rating: '4.6', x: '52%', y: '14%', size: 'md' as const, img: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400&q=80' },
  { name: 'Cairo', rating: '4.8', x: '58%', y: '26%', size: 'lg' as const, img: 'https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=400&q=80' },
  { name: 'Siwa', rating: '4.7', x: '32%', y: '30%', size: 'md' as const, img: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=400&q=80' },
  { name: 'Luxor', rating: '4.9', x: '50%', y: '52%', size: 'lg' as const, img: 'https://images.unsplash.com/photo-1568322503122-d214271f3be4?w=400&q=80' },
  { name: 'Aswan', rating: '4.9', x: '48%', y: '72%', size: 'md' as const, img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80' },
  { name: 'Dahab', rating: '4.8', x: '68%', y: '60%', size: 'md' as const, img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80' },
];

const legendItems = [
  { color: '#D4A24C', label: 'Popular Destination' },
  { color: '#41BEDC', label: 'Beach Destination' },
  { color: '#10B981', label: 'Adventure Spot' },
  { color: '#A78BFA', label: 'Historical Site' },
  { color: '#6B7280', label: 'City' },
];

export default function InteractiveMapSection() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [selectedCity, setSelectedCity] = useState<typeof cities[0] | null>(cities[0]);

  return (
    <section dir="ltr" className="relative py-20 bg-[#080C18] text-left">
      <div className="w-full max-w-[1440px] mx-auto px-8">

        {/* ═══ TOP LABEL ═══ */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-bold font-english tracking-[0.2em] text-theme-gold mb-3"
        >
          EXPLORE EGYPT
        </motion.p>

        <div className="flex gap-10 items-start">

          {/* ═══ LEFT PANEL — Features + Card ═══ */}
          <div className="w-[340px] shrink-0">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold font-display leading-[1.1] mb-3"
            >
              Interactive Map
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/45 text-sm mb-8 leading-relaxed"
            >
              Hover, explore and discover<br />the real Egypt
            </motion.p>

            {/* Features */}
            <div className="flex flex-col gap-5 mb-8">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-full border border-theme-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-base">{feat.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-english text-white">{feat.title}</h4>
                    <p className="text-[12px] text-white/40 font-english">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* City Card */}
            {selectedCity && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0F1525]/80 backdrop-blur-xl rounded-xl border border-white/[0.06] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <div className="h-[140px] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1525] via-transparent to-transparent z-10" />
                  <img src={selectedCity.img} alt={selectedCity.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-base text-white font-display">{selectedCity.name}</h4>
                  <p className="text-[11px] text-white/40 font-english">South Sinai</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <HiStar className="w-3.5 h-3.5 text-theme-gold fill-theme-gold" />
                    <span className="text-sm font-bold text-theme-gold font-english">{selectedCity.rating}</span>
                    <span className="text-[10px] text-white/30 font-english">(1.2K reviews)</span>
                  </div>
                  <p className="text-[11px] text-white/40 mt-2 leading-relaxed">
                    A peaceful town for diving, adventure and soul seekers.
                  </p>
                  <motion.button
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-1.5 text-xs text-theme-gold font-english font-semibold mt-3 hover:text-theme-gold/80 transition-colors"
                  >
                    Explore {selectedCity.name} <span>→</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>

          {/* ═══ MAP AREA ═══ */}
          <div className="flex-1 relative">
            <div className="relative bg-[#0a1020]/80 rounded-2xl border border-white/[0.05] overflow-hidden" style={{ height: '600px' }}>

              {/* Map SVG */}
              <div className="absolute inset-0">
                <svg width="100%" height="100%" viewBox="0 0 900 600" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <radialGradient id="mapBg" cx="50%" cy="50%" r="65%">
                      <stop offset="0%" stopColor="#D4A24C" stopOpacity="0.03" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="nileMapGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4A24C" stopOpacity="0.06" />
                      <stop offset="50%" stopColor="#D4A24C" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#D4A24C" stopOpacity="0.03" />
                    </linearGradient>
                  </defs>
                  <rect width="900" height="600" fill="url(#mapBg)" />
                  {/* Egypt outline */}
                  <path d="M280,30 L380,18 L470,22 L540,40 L600,75 L640,130 L660,210 L665,300 L645,385 L610,450 L565,500 L510,535 L450,555 L390,545 L340,510 L300,450 L275,370 L258,280 L248,190 L242,110 L250,55 Z"
                    fill="#0c1428" stroke="#D4A24C" strokeOpacity="0.08" strokeWidth="0.8" />
                  {/* Nile River */}
                  <path d="M460,35 Q468,90 475,155 Q480,210 475,270 Q468,330 455,390 Q445,445 435,500 Q430,535 425,560"
                    fill="none" stroke="url(#nileMapGlow)" strokeWidth="3" />
                  <path d="M460,35 Q468,90 475,155 Q480,210 475,270 Q468,330 455,390 Q445,445 435,500 Q430,535 425,560"
                    fill="none" stroke="#D4A24C" strokeOpacity="0.06" strokeWidth="0.8" />
                  {/* Mediterranean Sea label */}
                  <text x="440" y="18" fill="#41BEDC" fillOpacity="0.25" fontSize="10" fontFamily="Poppins, sans-serif" textAnchor="middle">Mediterranean Sea</text>
                  {/* Red Sea label */}
                  <text x="680" y="490" fill="#41BEDC" fillOpacity="0.2" fontSize="9" fontFamily="Poppins, sans-serif" textAnchor="middle">Red Sea</text>
                </svg>
              </div>

              {/* City Markers */}
              {cities.map((city) => (
                <motion.button
                  key={city.name}
                  onClick={() => setSelectedCity(city)}
                  className="absolute group z-10"
                  style={{ left: city.x, top: city.y, transform: 'translate(-50%, -50%)' }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="relative flex items-center gap-2">
                    <div className={`rounded-full overflow-hidden border-2 border-theme-gold/50 shadow-[0_0_12px_rgba(212,162,76,0.3)] group-hover:shadow-[0_0_20px_rgba(212,162,76,0.5)] group-hover:border-theme-gold transition-all duration-300 ${
                      city.size === 'lg' ? 'w-[60px] h-[60px]' : 'w-[48px] h-[48px]'
                    }`}>
                      <img src={city.img} alt={city.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-white font-english whitespace-nowrap">{city.name}</span>
                      <div className="flex items-center gap-1">
                        <HiStar className="w-2.5 h-2.5 text-theme-gold fill-theme-gold" />
                        <span className="text-[10px] font-bold text-theme-gold font-english">{city.rating}</span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}

              {/* Category Filter — Right Side */}
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5">
                {categoryFilters.map((filter, i) => (
                  <button
                    key={filter.label}
                    onClick={() => setActiveFilter(i)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-english transition-all duration-300 ${
                      activeFilter === i
                        ? 'bg-theme-gold/15 border border-theme-gold/30 text-theme-gold shadow-[0_0_10px_rgba(212,162,76,0.1)]'
                        : 'bg-white/[0.04] border border-white/[0.06] text-white/50 hover:bg-white/[0.08]'
                    }`}
                  >
                    <span className="text-sm">{filter.icon}</span>
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>

              {/* Hover hint */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2.5 bg-[#0F1525]/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/[0.06]">
                <span className="text-lg">👆</span>
                <div>
                  <p className="text-[10px] font-bold text-white font-english">Hover on a destination</p>
                  <p className="text-[9px] text-white/40 font-english">to explore more</p>
                </div>
              </div>
            </div>

            {/* ═══ BOTTOM BAR ═══ */}
            <div className="flex items-center justify-between mt-4">
              {/* Legend */}
              <div className="flex items-center gap-5">
                {legendItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: item.color }} />
                    <span className="text-[11px] text-white/50 font-english">{item.label}</span>
                  </div>
                ))}
              </div>
              {/* Controls */}
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/50 hover:bg-white/[0.08] transition-all">
                  <span className="text-lg">−</span>
                </button>
                <button className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/50 hover:bg-white/[0.08] transition-all">
                  <span className="text-lg">+</span>
                </button>
                <button className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/50 hover:bg-white/[0.08] transition-all ml-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 2L12 22M12 2L8 6M12 2L16 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
