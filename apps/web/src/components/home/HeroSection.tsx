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
  { icon: '🧘', label: 'Relaxation' },
  { icon: '⛰️', label: 'Adventure' },
  { icon: '🏛️', label: 'Culture & History' },
  { icon: '🍽️', label: 'Food & Flavors' },
  { icon: '✨', label: 'Luxury Escape' },
  { icon: '💻', label: 'Digital Nomad' },
];

export default function HeroSection() {
  const [activeSidebar, setActiveSidebar] = useState(0);
  const [activeChip, setActiveChip] = useState(0);

  return (
    <section dir="ltr" className="relative min-h-screen overflow-hidden">
      {/* ═══ BACKGROUND ═══ */}
      <div className="absolute inset-0">
        <img
          src="/assets/back_ground.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C18]/95 via-[#080C18]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C18] via-transparent to-[#080C18]/30" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ background: 'radial-gradient(ellipse at 30% 50%, #D4A24C, transparent 60%)' }} />
      </div>

      {/* ═══ HEADER ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center bg-[#080C18]/40 backdrop-blur-sm">
        <div className="w-full max-w-[1440px] mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-theme-gold to-[#C89A3D] flex items-center justify-center shadow-[0_0_16px_rgba(212,162,76,0.15)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 22h20L12 2z" fill="#D4A24C" />
                <path d="M12 8L6 22h12L12 8z" fill="#080C18" />
              </svg>
            </div>
            <div>
              <span className="text-[15px] font-bold font-english text-white tracking-wide">EGYPTHUB</span>
              <p className="text-[7px] text-theme-gold/70 font-english tracking-[0.18em] -mt-0.5">YOUR STORY IN EGYPT</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {['Explore', 'Destinations', 'Experiences', 'Stories', 'Luxury Collection', 'For Partners'].map((item) => (
              <a key={item} href="#"
                className="text-[13px] font-medium text-white/60 hover:text-white transition-colors font-english">
                {item}
              </a>
            ))}
          </nav>

          {/* Search */}
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <HiSearch className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </header>

      {/* ═══ LEFT SIDEBAR — Numbered Nav ═══ */}
      <motion.nav
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed left-8 top-36 z-40 hidden lg:flex flex-col items-center"
      >
        <div className="flex flex-col items-center relative">
          <div className="absolute top-1 bottom-1 w-px bg-gradient-to-b from-theme-gold/30 via-white/8 to-transparent" />
          {sidebarItems.map((item, i) => (
            <button
              key={item.num}
              onClick={() => setActiveSidebar(i)}
              className={`flex flex-col items-center py-1.5 relative z-10 transition-all duration-500 ${
                activeSidebar === i ? 'opacity-100' : 'opacity-25 hover:opacity-50'
              }`}
            >
              <span className={`text-[9px] font-english font-bold tracking-wide ${
                activeSidebar === i ? 'text-theme-gold' : 'text-white/50'
              }`}>{item.num}</span>
              <div className={`w-px mt-1 rounded-full transition-all duration-500 ${
                activeSidebar === i
                  ? 'bg-theme-gold h-5 shadow-[0_0_6px_rgba(212,162,76,0.4)]'
                  : 'bg-white/10 h-3'
              }`} />
              <span className={`text-[8px] font-english mt-1 tracking-wider ${
                activeSidebar === i ? 'text-theme-gold' : 'text-white/30'
              }`}>{item.label}</span>
            </button>
          ))}
        </div>
        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-5 flex flex-col items-center gap-0.5"
        >
          <div className="w-4 h-4 rounded-full border border-white/15 flex items-center justify-center">
            <span className="text-[7px] text-white/40">↓</span>
          </div>
          <span className="text-[6px] text-white/20 font-english tracking-wider">SCROLL</span>
        </motion.div>
      </motion.nav>

      {/* ═══ SOCIAL ICONS — Left ═══ */}
      <div className="fixed left-8 top-[380px] z-40 hidden lg:flex flex-col gap-2.5">
        {['📷', '📘', '🐦'].map((icon, i) => (
          <a key={i} href="#"
            className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/20 transition-all text-[10px] backdrop-blur-sm">
            {icon}
          </a>
        ))}
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-[1440px] mx-auto px-8 flex items-center">

          {/* ═══ LEFT — Headline + Booking ═══ */}
          <div className="flex-1 max-w-[620px] pt-20 text-left">

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-[68px] font-bold font-display leading-[1.06] mb-5 text-left"
            >
              <span className="text-white">Egypt is</span><br />
              <span className="text-white">not just a</span><br />
              <span className="text-white">destination.</span><br />
              <span className="text-theme-gold italic">It&apos;s a story</span><br />
              <span className="text-theme-gold italic">waiting to be yours.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-white/45 text-[15px] max-w-[440px] mb-7 leading-relaxed text-left"
            >
              Discover Egypt through authentic experiences and local connections.
            </motion.p>

            {/* Watch Video */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3.5 group mb-8"
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-full border-[1.5px] border-white/25 flex items-center justify-center group-hover:border-theme-gold/50 transition-all duration-300">
                  <HiPlay className="w-[18px] h-[18px] text-white ml-0.5 group-hover:text-theme-gold transition-colors duration-300" />
                </div>
              </div>
              <span className="text-[13px] font-semibold text-white/90 font-english text-left">Watch Egypt Come Alive</span>
            </motion.button>

            {/* ═══ AI CONCIERGE BOOKING PANEL ═══ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="bg-[#0F1525]/65 backdrop-blur-2xl rounded-2xl border border-white/[0.07] p-5 shadow-[0_8px_40px_rgba(0,0,0,0.4)] max-w-[600px] text-left">
                {/* Label */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-7 h-7 rounded-full bg-gradient-to-br from-theme-gold to-[#C89A3D] flex items-center justify-center shadow-[0_0_12px_rgba(212,162,76,0.25)]"
                    >
                      <HiSparkles className="w-3.5 h-3.5 text-[#080C18]" />
                    </motion.div>
                  </div>
                  <div>
                    <span className="text-[8px] font-bold text-theme-gold font-english tracking-[0.15em]">AI TRAVEL CONCIERGE</span>
                    <p className="text-[7px] text-white/25 font-english">We&apos;ll craft your perfect journey</p>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold font-display mb-0.5 text-white text-left">What brings you to Egypt?</h3>
                <p className="text-[12px] text-white/40 mb-3.5 text-left">We&apos;ll craft your perfect journey</p>

                {/* Category Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {categoryChips.map((chip, i) => (
                    <motion.button
                      key={chip.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.04 }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setActiveChip(i)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 text-[11px] font-english ${
                        activeChip === i
                          ? 'border-theme-gold/40 bg-theme-gold/10 text-theme-gold'
                          : 'border-white/[0.06] bg-white/[0.03] text-white/60 hover:border-white/15 hover:bg-white/[0.06]'
                      }`}
                    >
                      <span className="text-xs">{chip.icon}</span>
                      <span>{chip.label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Search Fields */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-white/12 transition-all cursor-pointer flex-1">
                    <HiLocationMarker className="w-3.5 h-3.5 text-theme-gold/80" />
                    <span className="text-[12px] text-white/50 font-english">Any Destination</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-white/12 transition-all cursor-pointer flex-1">
                    <span className="text-[12px] text-white/50 font-english">📅 Any Time</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-white/12 transition-all cursor-pointer flex-1">
                    <HiUser className="w-3.5 h-3.5 text-white/35" />
                    <span className="text-[12px] text-white/50 font-english">2 Travelers</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.06, boxShadow: '0 0 20px rgba(212,162,76,0.3)' }}
                    whileTap={{ scale: 0.94 }}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-theme-gold to-[#C89A3D] flex items-center justify-center shadow-[0_4px_12px_rgba(212,162,76,0.2)] shrink-0"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#080C18" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ═══ RIGHT — Avatar Area ═══ */}
          <div className="flex-1 relative flex items-end justify-center h-[85vh]">

            {/* ═══ GLOWING RINGS ═══ */}
            {/* Outer ring - horizontal ellipse, rotating */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
              style={{
                width: '260px', height: '80px',
                border: '1.5px solid rgba(65,190,220,0.25)',
                borderRadius: '50%',
                boxShadow: '0 0 15px rgba(65,190,220,0.15), inset 0 0 15px rgba(65,190,220,0.05)',
                transform: 'translateX(-50%) perspective(400px) rotateX(65deg)',
              }}
            />
            {/* Middle ring */}
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
              style={{
                width: '210px', height: '65px',
                border: '1px solid rgba(65,190,220,0.18)',
                borderRadius: '50%',
                boxShadow: '0 0 10px rgba(65,190,220,0.1)',
                transform: 'translateX(-50%) perspective(400px) rotateX(65deg)',
              }}
            />
            {/* Inner ring */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
              style={{
                width: '160px', height: '50px',
                border: '1px solid rgba(65,190,220,0.22)',
                borderRadius: '50%',
                boxShadow: '0 0 12px rgba(65,190,220,0.12)',
                transform: 'translateX(-50%) perspective(400px) rotateX(65deg)',
              }}
            />
            {/* Ring glow dot 1 */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-8 left-1/2 z-21"
              style={{
                width: '260px', height: '80px',
                transform: 'translateX(-50%) perspective(400px) rotateX(65deg)',
                transformOrigin: 'center center',
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#41BEDC] shadow-[0_0_8px_#41BEDC,0_0_16px_#41BEDC]" />
            </motion.div>
            {/* Ring glow dot 2 */}
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-8 left-1/2 z-21"
              style={{
                width: '210px', height: '65px',
                transform: 'translateX(-50%) perspective(400px) rotateX(65deg)',
                transformOrigin: 'center center',
              }}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#D4A24C] shadow-[0_0_6px_#D4A24C,0_0_12px_#D4A24C]" />
            </motion.div>

            {/* Base glow */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-19"
              style={{
                width: '280px', height: '40px',
                background: 'radial-gradient(ellipse, rgba(65,190,220,0.4) 0%, rgba(65,190,220,0.1) 40%, transparent 70%)',
                filter: 'blur(12px)',
                borderRadius: '50%'
              }}
            />

            {/* Pedestal */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30" style={{ width: '200px', height: '32px' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2"
                style={{
                  width: '180px', height: '26px',
                  background: 'linear-gradient(135deg, #1a2a3a 0%, #0d1a2a 50%, #1a2a3a 100%)',
                  borderRadius: '50%',
                  border: '1px solid rgba(65,190,220,0.2)',
                  boxShadow: '0 0 20px rgba(65,190,220,0.1), inset 0 0 12px rgba(65,190,220,0.04), 0 3px 12px rgba(0,0,0,0.5)'
                }}
              />
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-1 left-1/2 -translate-x-1/2"
              >
                <svg width="22" height="26" viewBox="0 0 24 28" fill="none">
                  <path d="M12 0L0 26h6l6-12 6 12h6L12 0z" fill="#41BEDC" />
                  <path d="M12 6L4 24h4l4-8 4 8h4L12 6z" fill="#41BEDC" opacity="0.4" />
                </svg>
              </motion.div>
            </div>

            {/* Central beam */}
            <motion.div
              animate={{ opacity: [0.12, 0.35, 0.12] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-15"
              style={{
                width: '50px', height: '320px',
                background: 'linear-gradient(to top, rgba(10,58,74,0.6) 0%, rgba(65,190,220,0.15) 30%, rgba(65,190,220,0) 100%)',
                clipPath: 'polygon(38% 100%, 62% 100%, 55% 0%, 45% 0%)',
                filter: 'blur(4px)',
                mixBlendMode: 'screen'
              }}
            />

            {/* Hieroglyphs */}
            {['𓀀', '𓁿', '𓂀', '𓃭', '𓄿', '𓅃', '𓆣', '𓇋'].map((glyph, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const radius = 100 + (i % 3) * 20;
              return (
                <motion.span
                  key={i}
                  animate={{
                    rotate: [0, 360],
                    opacity: [0.1, 0.35, 0.1],
                    y: [0, -4, 0]
                  }}
                  transition={{
                    rotate: { duration: 20 + i * 3, repeat: Infinity, ease: 'linear' },
                    opacity: { duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' },
                    y: { duration: 2.5 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }
                  }}
                  className="absolute select-none z-25"
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                    bottom: `${80 + Math.sin(angle) * 70 + i * 18}px`,
                    fontSize: `${14 + (i % 3) * 3}px`,
                    color: '#41BEDC',
                    textShadow: '0 0 10px rgba(65,190,220,0.5)',
                    mixBlendMode: 'screen' as const
                  }}
                >
                  {glyph}
                </motion.span>
              );
            })}

            {/* Avatar Image */}
            <motion.img
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              src="/assets/avatar.png"
              alt="Zainab - AI Travel Concierge"
              className="relative z-30 h-[85%] max-h-[620px] w-auto object-contain object-bottom"
              style={{
                filter: 'drop-shadow(0 0 35px rgba(65,190,220,0.08)) drop-shadow(0 10px 25px rgba(0,0,0,0.5))',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
