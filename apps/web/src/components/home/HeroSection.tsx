'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlay, HiSearch, HiGlobe, HiUser, HiSparkles, HiLocationMarker, HiStar } from 'react-icons/hi';

const sidebarItems = [
  { num: '01', label: 'Home' },
  { num: '02', label: 'Map' },
  { num: '03', label: 'Stories' },
  { num: '04', label: 'Experiences' },
  { num: '05', label: 'Concierge' },
];

const categoryChips = [
  { label: 'All', icon: '🔥', active: true },
  { label: 'Beaches', icon: '🏖️' },
  { label: 'History', icon: '🏛️' },
  { label: 'Adventure', icon: '⛰️' },
  { label: 'Cities', icon: '🏙️' },
  { label: 'Desert', icon: '🏜️' },
  { label: 'Oasis', icon: '🌴' },
  { label: 'Islands', icon: '🏝️' },
];

const cities = [
  { name: 'Cairo', rating: '4.8', x: '62%', y: '28%', size: 'lg' as const, img: 'https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=400&q=80', desc: 'Ancient wonders and vibrant culture in Egypt\'s legendary capital.' },
  { name: 'Alexandria', rating: '4.6', x: '45%', y: '12%', size: 'md' as const, img: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400&q=80', desc: 'Mediterranean charm meets ancient history along the Corniche.' },
  { name: 'Siwa', rating: '4.7', x: '28%', y: '30%', size: 'md' as const, img: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=400&q=80', desc: 'A mystical oasis paradise in the Sahara Desert.' },
  { name: 'Luxor', rating: '4.9', x: '52%', y: '52%', size: 'lg' as const, img: 'https://images.unsplash.com/photo-1568322503122-d214271f3be4?w=400&q=80', desc: 'The world\'s greatest open-air museum.' },
  { name: 'Aswan', rating: '4.9', x: '55%', y: '70%', size: 'md' as const, img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80', desc: 'Serene Nile beauty and Nubian culture.' },
  { name: 'Dahab', rating: '4.8', x: '75%', y: '55%', size: 'md' as const, img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80', desc: 'A peaceful town for diving, adventure and soul seekers.' },
];

const travelTypes = [
  { icon: '✨', label: 'Luxury Escape' },
  { icon: '🍽️', label: 'Food & Flavors' },
  { icon: '🧘', label: 'Relaxation' },
  { icon: '⛰️', label: 'Adventure' },
  { icon: '🏛️', label: 'Culture & History' },
  { icon: '💻', label: 'Digital Nomad' },
];

const pulseDelays = [0.3, 0.8, 1.2, 0.5, 1.0, 0.7];
const markerDelays = [0.5, 0.7, 0.9, 0.6, 0.8, 0.55];

export default function HeroSection() {
  const [activeSidebar, setActiveSidebar] = useState(0);
  const [activeChip, setActiveChip] = useState(0);
  const [selectedCity, setSelectedCity] = useState<typeof cities[0] | null>(cities[0]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[20s] hover:scale-110"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=1920&q=85)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C18]/95 via-[#080C18]/70 to-[#080C18]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C18] via-[#080C18]/40 to-[#080C18]/20" />
        <div className="absolute inset-0 opacity-[0.06]" style={{ background: 'radial-gradient(ellipse at 75% 60%, #D4A24C, transparent 50%)' }} />
      </div>

      {/* ═══ HEADER ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-theme-gold to-[#C89A3D] flex items-center justify-center shadow-[0_0_20px_rgba(212,162,76,0.2)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 22h20L12 2z" fill="#D4A24C" /><path d="M12 8L6 22h12L12 8z" fill="#080C18" /></svg>
            </div>
            <div>
              <span className="text-lg font-bold font-english text-white tracking-wide">EGYPTHUB</span>
              <p className="text-[8px] text-white/40 font-english tracking-[0.2em]">YOUR STORY IN EGYPT</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {['For Partners', 'Luxury Collection', 'Stories', 'Experiences'].map((item, i) => (
              <motion.a key={item} href="#" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
                className="relative text-sm font-medium text-white/70 hover:text-white transition-colors font-english group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-theme-gold transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.05 }} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
              <HiSearch className="w-5 h-5 text-white/60" />
            </motion.button>
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
              <HiGlobe className="w-4 h-4 text-white/60" />
              <span className="text-sm text-white/60 font-english">EN</span>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border border-theme-gold/40 bg-theme-gold/5 hover:bg-theme-gold/15 transition-all shadow-[0_0_12px_rgba(212,162,76,0.1)]">
              <HiSparkles className="w-4 h-4 text-theme-gold" />
              <span className="text-sm font-medium text-theme-gold font-english">AI Concierge</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* ═══ SIDEBAR — LEFT ═══ */}
      <motion.nav initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed left-6 top-28 z-40 hidden lg:flex flex-col items-center">
        <div className="flex flex-col items-center relative">
          <div className="absolute top-2 bottom-2 w-px bg-gradient-to-b from-theme-gold/40 via-white/10 to-transparent" />
          {sidebarItems.map((item, i) => (
            <div key={item.num} className="flex flex-col items-center relative z-10">
              <button onClick={() => setActiveSidebar(i)}
                className={`group flex items-center gap-3 transition-all duration-500 ${activeSidebar === i ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}>
                <div className="flex flex-col items-center py-1">
                  <span className={`text-[10px] font-english font-bold transition-colors duration-500 ${activeSidebar === i ? 'text-theme-gold' : 'text-white/60'}`}>{item.num}</span>
                  <div className={`w-0.5 h-4 mt-1 rounded-full transition-all duration-500 ${activeSidebar === i ? 'bg-theme-gold h-6 shadow-[0_0_8px_rgba(212,162,76,0.5)]' : 'bg-white/10'}`} />
                  <span className={`text-[9px] font-english mt-1 transition-colors duration-500 ${activeSidebar === i ? 'text-theme-gold' : 'text-white/40'}`}>{item.label}</span>
                </div>
              </button>
            </div>
          ))}
        </div>
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="mt-6 flex flex-col items-center gap-1">
          <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
            <span className="text-[8px] text-white/50">↓</span>
          </div>
          <span className="text-[7px] text-white/30 font-english tracking-wider">SCROLL</span>
        </motion.div>
      </motion.nav>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="relative z-10 min-h-screen flex items-center pt-20">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-8 relative">

          {/* ═══ MAP PANEL — LEFT SIDE ═══ */}
          <div className="absolute left-6 lg:left-8 top-24 bottom-8 z-10" style={{ width: 'min(55%, 780px)' }}>
            <div className="relative h-full bg-[#0a1020]/90 backdrop-blur-sm rounded-2xl border border-white/[0.06] overflow-hidden shadow-[0_8px_60px_rgba(0,0,0,0.5)]">

              {/* Category chips — top-right of map panel */}
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute top-3 right-3 z-30 flex flex-col gap-1">
                {categoryChips.map((chip, i) => (
                  <button key={chip.label} onClick={() => setActiveChip(i)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-english transition-all duration-300 ${
                      activeChip === i
                        ? 'bg-theme-gold text-[#080C18] font-medium shadow-[0_0_10px_rgba(212,162,76,0.25)]'
                        : 'bg-white/[0.06] text-white/50 hover:bg-white/10 backdrop-blur-sm'}`}>
                    <span className="text-[10px]">{chip.icon}</span>
                    <span>{chip.label}</span>
                  </button>
                ))}
              </motion.div>

              {/* SVG Map */}
              <div className="absolute inset-0">
                <svg width="100%" height="100%" viewBox="0 0 700 600" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <radialGradient id="mapGlowCenter" cx="50%" cy="50%" r="60%">
                      <stop offset="0%" stopColor="#D4A24C" stopOpacity="0.06" />
                      <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="nileGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#41BEDC" stopOpacity="0.08" />
                      <stop offset="50%" stopColor="#41BEDC" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#41BEDC" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="routeGlow" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#D4A24C" stopOpacity="0" />
                      <stop offset="50%" stopColor="#D4A24C" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#D4A24C" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <rect width="700" height="600" fill="url(#mapGlowCenter)" />
                  {/* Egypt outline */}
                  <path d="M220,40 L300,30 L380,35 L440,50 L490,80 L520,130 L535,200 L540,280 L525,360 L500,420 L470,470 L430,510 L380,535 L330,525 L290,490 L260,430 L240,350 L225,260 L215,180 L210,110 L215,60 Z"
                    fill="#0c1428" stroke="#D4A24C" strokeOpacity="0.06" strokeWidth="0.5" />
                  {/* Nile River */}
                  <path d="M370,45 Q375,90 380,140 Q385,190 380,240 Q375,290 365,340 Q355,390 345,440 Q340,480 335,520"
                    fill="none" stroke="url(#nileGlow)" strokeWidth="3.5" />
                  <path d="M370,45 Q375,90 380,140 Q385,190 380,240 Q375,290 365,340 Q355,390 345,440 Q340,480 335,520"
                    fill="none" stroke="#41BEDC" strokeOpacity="0.08" strokeWidth="1" />
                  {/* Route lines */}
                  <path d="M380,140 Q410,170 440,190 Q470,210 490,240" fill="none" stroke="url(#routeGlow)" strokeWidth="1.2" />
                  <path d="M380,190 Q350,240 320,270 Q300,300 280,330" fill="none" stroke="url(#routeGlow)" strokeWidth="1.2" />
                  <path d="M380,240 Q400,280 420,320 Q440,360 460,390" fill="none" stroke="url(#routeGlow)" strokeWidth="1.2" />
                </svg>
              </div>

              {/* City Markers */}
              {cities.map((city, idx) => (
                <motion.button key={city.name} onClick={() => setSelectedCity(city)} className="absolute group z-10"
                  style={{ left: city.x, top: city.y, transform: 'translate(-50%, -50%)' }}
                  initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: markerDelays[idx] }}>
                  <div className="relative flex flex-col items-center">
                    <motion.div animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: pulseDelays[idx] }}
                      className="rounded-full bg-theme-gold/30 absolute"
                      style={{ width: city.size === 'lg' ? '68px' : '56px', height: city.size === 'lg' ? '68px' : '56px' }} />
                    <div className={`rounded-full overflow-hidden border-2 border-theme-gold/50 shadow-[0_0_14px_rgba(212,162,76,0.35)] group-hover:shadow-[0_0_22px_rgba(212,162,76,0.55)] group-hover:border-theme-gold transition-all duration-300 ${
                      city.size === 'lg' ? 'w-[68px] h-[68px]' : 'w-[56px] h-[56px]'}`}>
                      <img src={city.img} alt={city.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-0.5 whitespace-nowrap bg-[#080C18]/85 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
                      <HiStar className="w-2 h-2 text-theme-gold fill-theme-gold" />
                      <span className="text-[9px] font-bold text-theme-gold font-english">{city.rating}</span>
                    </div>
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-white/70 font-english whitespace-nowrap tracking-wider font-medium">
                      {city.name}
                    </span>
                  </div>
                </motion.button>
              ))}

              {/* Floating City Card */}
              {selectedCity && (
                <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }} key={selectedCity.name}
                  className="absolute z-20 bg-[#0F1525]/90 backdrop-blur-2xl rounded-xl border border-white/[0.08] p-3 w-[240px] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                  style={{ left: selectedCity.x, top: `calc(${selectedCity.y} + 44px)`, transform: 'translateX(-50%)' }}>
                  <div className="flex gap-2.5">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                      <img src={selectedCity.img} alt={selectedCity.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-white">{selectedCity.name}</h4>
                      <p className="text-[9px] text-white/40">Egypt</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <HiStar className="w-2.5 h-2.5 text-theme-gold fill-theme-gold" />
                        <span className="text-[10px] font-bold text-theme-gold font-english">{selectedCity.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/40 mt-1.5 leading-relaxed line-clamp-2">{selectedCity.desc}</p>
                  <motion.button whileHover={{ x: 3 }} className="flex items-center gap-1 text-[10px] text-theme-gold font-english mt-1.5 hover:text-theme-gold/80 transition-colors">
                    Explore {selectedCity.name} →
                  </motion.button>
                </motion.div>
              )}

              {/* ═══ LIVE IN EGYPT NOW — Bottom of map ═══ */}
              <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#080C18]/85 backdrop-blur-xl border-t border-white/[0.06] px-4 py-3">
                <p className="text-[9px] text-theme-gold font-english tracking-[0.2em] mb-2 font-medium">LIVE IN EGYPT NOW</p>
                <div className="flex gap-3">
                  {[
                    { label: 'New Simbel', sub: 'Sound & Light Show', icon: '🏛️' },
                    { label: '124', sub: 'Travelers exploring Luxor', icon: '👥' },
                    { label: 'Dahab', sub: 'Perfect diving conditions', icon: '🌊' },
                    { label: 'Cairo', sub: '34° Sunny', icon: '☀️' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5 flex-1 min-w-0">
                      <span className="text-sm shrink-0">{item.icon}</span>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-white font-english block truncate">{item.label}</span>
                        <p className="text-[8px] text-white/35 font-english truncate">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ═══ RIGHT CONTENT — Headline + Booking + Avatar ═══ */}
          <div className="ml-auto flex flex-col justify-center min-h-[80vh] py-12" style={{ width: 'min(42%, 600px)' }}>

            {/* Headline */}
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-[56px] font-bold font-display leading-[1.08] mb-5">
              <span className="text-white">Egypt is not just</span><br />
              <span className="text-white">a destination.</span><br />
              <span className="text-theme-gold italic drop-shadow-[0_0_20px_rgba(212,162,76,0.3)]">It&apos;s a story</span><br />
              <span className="text-theme-gold italic drop-shadow-[0_0_20px_rgba(212,162,76,0.3)]">waiting to be yours.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
              className="text-white/45 text-sm max-w-sm mb-6 leading-relaxed">
              Discover Egypt through authentic experiences and local connections.
            </motion.p>

            {/* Watch Video */}
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-3 group mb-8">
              <div className="relative">
                <div className="w-11 h-11 rounded-full border-2 border-white/25 flex items-center justify-center group-hover:border-theme-gold/50 transition-all duration-300">
                  <HiPlay className="w-5 h-5 text-white ml-0.5 group-hover:text-theme-gold transition-colors duration-300" />
                </div>
                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-1 rounded-full border border-theme-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-xs font-semibold text-white font-english">Watch Egypt Come Alive</span>
            </motion.button>

            {/* ═══ BOOKING SEARCH ═══ */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
              <div className="bg-[#0F1525]/60 backdrop-blur-2xl rounded-2xl border border-white/[0.06] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="relative">
                    <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity }}
                      className="w-7 h-7 rounded-full bg-gradient-to-br from-theme-gold to-[#C89A3D] flex items-center justify-center shadow-[0_0_14px_rgba(212,162,76,0.3)]">
                      <HiSparkles className="w-3.5 h-3.5 text-[#080C18]" />
                    </motion.div>
                  </div>
                  <div>
                    <span className="text-[8px] font-bold text-theme-gold font-english tracking-[0.15em]">AI TRAVEL CONCIERGE</span>
                    <p className="text-[7px] text-white/30 font-english">We&apos;ll craft your perfect journey</p>
                  </div>
                </div>
                <h3 className="text-base font-bold font-display mb-0.5 text-white">What brings you to Egypt?</h3>
                <p className="text-xs text-white/45 mb-3">We&apos;ll craft your perfect journey</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {travelTypes.map((type, i) => (
                    <motion.button key={type.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.04 }} whileHover={{ scale: 1.05, borderColor: 'rgba(212,162,76,0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.06] hover:bg-theme-gold/5 transition-all duration-300 text-white/70">
                      <span className="text-sm">{type.icon}</span>
                      <span className="font-english text-[10px]">{type.label}</span>
                    </motion.button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all cursor-pointer flex-1">
                    <HiLocationMarker className="w-3.5 h-3.5 text-theme-gold" />
                    <span className="text-xs text-white/50 font-english">Any Destination</span>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all cursor-pointer flex-1">
                    <span className="text-xs text-white/50 font-english">📅 Any Time</span>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all cursor-pointer flex-1">
                    <HiUser className="w-3.5 h-3.5 text-white/40" />
                    <span className="text-xs text-white/50 font-english">2 Travelers</span>
                  </motion.div>
                  <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(212,162,76,0.3)' }} whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-xl bg-gradient-to-br from-theme-gold to-[#C89A3D] flex items-center justify-center shadow-[0_4px_12px_rgba(212,162,76,0.2)] shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#080C18" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ═══ ZAINAB AVATAR — Overlapping map right edge ═══ */}
        <div className="absolute z-30 pointer-events-none hidden lg:block"
          style={{ left: 'min(55%, 780px)', bottom: '0', transform: 'translateX(-50%)', width: '380px', height: '680px' }}>

          {/* Central beam */}
          <motion.div animate={{ opacity: [0.15, 0.4, 0.15] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/2 -translate-x-1/2 z-35"
            style={{
              bottom: '70px', width: '60px', height: '350px',
              background: 'linear-gradient(to top, #0A3A4A 0%, #41BEDC 20%, rgba(65,190,220,0.25) 60%, rgba(65,190,220,0) 100%)',
              clipPath: 'polygon(38% 100%, 62% 100%, 55% 0%, 45% 0%)',
              filter: 'blur(5px)',
              mixBlendMode: 'screen'
            }} />

          {/* Base glow */}
          <div className="absolute left-1/2 -translate-x-1/2 z-36"
            style={{
              bottom: '55px', width: '160px', height: '24px',
              background: 'radial-gradient(ellipse, rgba(65,190,220,0.5) 0%, rgba(65,190,220,0.15) 40%, transparent 70%)',
              filter: 'blur(8px)',
              borderRadius: '50%'
            }} />

          {/* Pedestal */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40"
            style={{ width: '220px', height: '38px' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2"
              style={{
                width: '200px', height: '30px',
                background: 'linear-gradient(135deg, #1a2a3a 0%, #0d1a2a 50%, #1a2a3a 100%)',
                borderRadius: '50%',
                border: '1px solid rgba(65,190,220,0.2)',
                boxShadow: '0 0 25px rgba(65,190,220,0.12), inset 0 0 15px rgba(65,190,220,0.04), 0 3px 15px rgba(0,0,0,0.5)'
              }} />
            <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-1 left-1/2 -translate-x-1/2">
              <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                <path d="M12 0L0 26h6l6-12 6 12h6L12 0z" fill="#41BEDC" />
                <path d="M12 6L4 24h4l4-8 4 8h4L12 6z" fill="#41BEDC" opacity="0.4" />
              </svg>
            </motion.div>
          </div>

          {/* Hieroglyphs */}
          {['𓀀', '𓁿', '𓂀', '𓃭', '𓄿', '𓅃', '𓆣', '𓇋'].map((glyph, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 110 + (i % 3) * 25;
            return (
              <motion.span key={i}
                animate={{ rotate: [0, 360], opacity: [0.12, 0.4, 0.12], y: [0, -5, 0] }}
                transition={{
                  rotate: { duration: 22 + i * 3, repeat: Infinity, ease: 'linear' },
                  opacity: { duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' },
                  y: { duration: 2.5 + i * 0.25, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="absolute select-none"
                style={{
                  left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                  bottom: `${100 + Math.sin(angle) * 80 + i * 20}px`,
                  fontSize: `${16 + (i % 3) * 3}px`,
                  color: '#41BEDC',
                  textShadow: '0 0 12px rgba(65,190,220,0.6)',
                  mixBlendMode: 'screen' as const
                }}>
                {glyph}
              </motion.span>
            );
          })}

          {/* Avatar Image */}
          <img src="/assets/avatar.png" alt="Zainab - AI Travel Concierge"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[520px] w-auto object-contain object-bottom z-50"
            style={{ filter: 'drop-shadow(0 0 40px rgba(65,190,220,0.1)) drop-shadow(0 12px 30px rgba(0,0,0,0.5))', maxWidth: '440px' }} />
        </div>
      </div>

      {/* ═══ SOCIAL ICONS — LEFT ═══ */}
      <div className="fixed left-6 top-[420px] z-40 hidden lg:flex flex-col gap-3">
        {['📷', '📘', '🐦'].map((icon, i) => (
          <a key={i} href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white/70 hover:border-white/20 transition-all text-xs backdrop-blur-sm">
            {icon}
          </a>
        ))}
      </div>
    </section>
  );
}
