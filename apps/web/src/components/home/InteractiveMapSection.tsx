'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';

const categoryFilters = [
  { icon: '⊙', label: 'All' },
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
  { name: 'Alexandria', rating: '4.6', x: '42%', y: '14%', desc: 'Mediterranean gem', img: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400&q=80' },
  { name: 'Cairo', rating: '4.8', x: '52%', y: '25%', desc: 'City of a thousand minarets', img: 'https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=400&q=80' },
  { name: 'Siwa', rating: '4.7', x: '28%', y: '26%', desc: 'Hidden oasis paradise', img: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=400&q=80' },
  { name: 'Luxor', rating: '4.9', x: '48%', y: '52%', desc: 'Open-air museum of temples', img: 'https://images.unsplash.com/photo-1568322503122-d214271f3be4?w=400&q=80' },
  { name: 'Aswan', rating: '4.9', x: '45%', y: '72%', desc: 'Nubian heritage & tranquil Nile', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80' },
  { name: 'Dahab', rating: '4.8', x: '66%', y: '55%', desc: 'Red Sea diving haven', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80' },
];

const legendItems = [
  { color: '#D4A24C', label: 'Popular' },
  { color: '#41BEDC', label: 'Beach' },
  { color: '#10B981', label: 'Adventure' },
  { color: '#A78BFA', label: 'History' },
  { color: '#6B7280', label: 'City' },
];

export default function InteractiveMapSection() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [selectedCity, setSelectedCity] = useState<typeof cities[0] | null>(cities[2]);

  return (
    <section dir="ltr" className="relative bg-[#080C18] text-left overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-16">

        {/* ═══ RESPONSIVE MAP LAYOUT ═══ */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 min-h-[400px] md:min-h-[600px] lg:min-h-[700px]">

          {/* ═══ LEFT PANEL ═══ */}
          <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0 flex flex-col justify-between order-2 lg:order-1">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[10px] md:text-[11px] font-bold font-english tracking-[0.2em] text-theme-gold mb-2 md:mb-3"
              >
                EXPLORE EGYPT
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[clamp(1.5rem,3vw,2.625rem)] font-bold font-display leading-[1.1] mb-2 md:mb-3"
              >
                Interactive Map
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white/45 text-[clamp(0.75rem,1vw,0.875rem)] mb-4 md:mb-8 leading-relaxed"
              >
                Hover, explore and discover the real Egypt
              </motion.p>

              {/* Features - hidden on mobile */}
              <div className="hidden md:flex flex-col gap-3 xl:gap-5">
                {features.map((feat, i) => (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 xl:w-10 xl:h-10 rounded-full border border-theme-gold/20 flex items-center justify-center shrink-0">
                      <span className="text-sm xl:text-base">{feat.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-[12px] xl:text-[13px] font-bold font-english text-white">{feat.title}</h4>
                      <p className="text-[10px] xl:text-[11px] text-white/40 font-english">{feat.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* City Card — responsive */}
            {selectedCity && (
              <motion.div
                key={selectedCity.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0F1525]/85 backdrop-blur-xl rounded-xl border border-white/[0.06] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] mt-4 md:mt-6"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-[140px] xl:w-[180px] h-[120px] sm:h-[140px] xl:h-[180px] overflow-hidden relative shrink-0">
                    <img src={selectedCity.img} alt={selectedCity.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 md:p-4 flex flex-col justify-center">
                    <h4 className="text-base md:text-lg font-bold text-white font-display">{selectedCity.name}</h4>
                    <p className="text-[10px] md:text-[11px] text-white/40 font-english">{selectedCity.desc}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <HiStar className="w-3 h-3 md:w-3.5 md:h-3.5 text-theme-gold fill-theme-gold" />
                      <span className="text-[12px] md:text-sm font-bold text-theme-gold font-english">{selectedCity.rating}</span>
                      <span className="text-[8px] md:text-[10px] text-white/30 font-english">(1.2K reviews)</span>
                    </div>
                    <motion.button
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-1.5 text-[11px] md:text-[12px] text-theme-gold font-english font-semibold mt-1 md:mt-2 hover:text-theme-gold/80 transition-colors touch-target"
                    >
                      Explore {selectedCity.name} <span>→</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* ═══ MAP ═══ */}
          <div className="relative flex-1 min-h-[300px] md:min-h-[400px] lg:min-h-0 order-1 lg:order-2">
            <div className="relative w-full h-full min-h-[300px] md:min-h-[450px] bg-[#0a1020]/60 rounded-xl md:rounded-2xl border border-white/[0.04] overflow-hidden">

              {/* Egypt Night-Lights Map Image */}
              <img
                src="/assets/egypt-map.png"
                alt="Egypt interactive map"
                className="absolute inset-0 w-full h-full object-contain"
                style={{ objectPosition: 'center center' }}
              />

              {/* City Markers - responsive size */}
              {cities.map((city) => (
                <motion.button
                  key={city.name}
                  onClick={() => setSelectedCity(city)}
                  className="absolute group z-10 cursor-pointer touch-target"
                  style={{ left: city.x, top: city.y, transform: 'translate(-50%, -50%)' }}
                  whileHover={{ scale: 1.08 }}
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-[clamp(32px,4vw,56px)] h-[clamp(32px,4vw,56px)] rounded-full overflow-hidden border-2 border-theme-gold/50 shadow-[0_0_14px_rgba(212,162,76,0.35)] group-hover:shadow-[0_0_22px_rgba(212,162,76,0.55)] group-hover:border-theme-gold transition-all duration-300">
                      <img src={city.img} alt={city.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 mt-1 sm:mt-1.5 bg-[#080C18]/70 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 rounded-full">
                      <span className="text-[9px] sm:text-[11px] font-bold text-white font-english whitespace-nowrap">{city.name}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-0.5 mt-0.5">
                      <HiStar className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-theme-gold fill-theme-gold" />
                      <span className="text-[8px] sm:text-[10px] font-bold text-theme-gold font-english">{city.rating}</span>
                    </div>
                  </div>
                </motion.button>
              ))}

              {/* ═══ CATEGORY FILTER — horizontal scroll on mobile, vertical on desktop ═══ */}
              <div className="absolute top-2 md:top-4 right-2 md:right-4 z-20 left-2 md:left-auto">
                <div className="flex md:flex-col gap-1 overflow-x-auto scrollbar-hide bg-[#0a1020]/80 backdrop-blur-sm rounded-xl border border-white/[0.06] p-1.5">
                  {categoryFilters.map((filter, i) => (
                    <button
                      key={filter.label}
                      onClick={() => setActiveFilter(i)}
                      className={`flex items-center gap-1.5 md:gap-2.5 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-[10px] md:text-[11px] font-english transition-all duration-300 whitespace-nowrap shrink-0 touch-target ${
                        activeFilter === i
                          ? 'bg-theme-gold/10 border border-theme-gold/25 text-theme-gold'
                          : 'text-white/50 hover:bg-white/[0.06] border border-transparent'
                      }`}
                    >
                      <span className="text-[11px] md:text-sm w-4 md:w-5 text-center">{filter.icon}</span>
                      <span className="hidden sm:inline">{filter.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ═══ BOTTOM BAR ═══ */}
              <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#080C18]/85 backdrop-blur-xl border-t border-white/[0.06] px-3 md:px-5 py-2 md:py-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  {/* Hover hint - hidden on very small */}
                  <div className="hidden sm:flex items-center gap-2 md:gap-2.5">
                    <span className="text-base md:text-lg">👆</span>
                    <div>
                      <p className="text-[9px] md:text-[10px] font-bold text-white font-english">Hover on a destination</p>
                      <p className="text-[8px] md:text-[9px] text-white/40 font-english">to explore more</p>
                    </div>
                  </div>

                  {/* Legend - wraps on mobile */}
                  <div className="flex items-center gap-2 md:gap-5 flex-wrap">
                    {legendItems.map((item) => (
                      <div key={item.label} className="flex items-center gap-1 md:gap-1.5">
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full border-[1.5px]" style={{ borderColor: item.color }} />
                        <span className="text-[8px] md:text-[10px] text-white/50 font-english">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Controls - touch-friendly */}
                  <div className="flex items-center gap-1 md:gap-1.5">
                    <button className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/50 hover:bg-white/[0.08] transition-all touch-target">
                      <span className="text-sm md:text-base">−</span>
                    </button>
                    <button className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/50 hover:bg-white/[0.08] transition-all touch-target">
                      <span className="text-sm md:text-base">+</span>
                    </button>
                    <button className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/50 hover:bg-white/[0.08] transition-all touch-target">
                      <svg width="10" height="10" className="md:w-[12px] md:h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M12 2l-4 4M12 2l4 4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
