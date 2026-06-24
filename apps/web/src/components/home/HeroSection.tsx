'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSparkles, HiMenu, HiX } from 'react-icons/hi';

export default function HeroSection() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <section dir="ltr" className="relative h-dvh min-h-[700px] overflow-hidden bg-[#080C18]">
      {/* Background */}
      <Image
        src="/assets/back_ground.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080C18]/80 via-[#080C18]/40 to-[#080C18]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080C18]/60 to-transparent" />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 h-14 flex items-center">
        <div className="w-full max-w-[1440px] mx-auto px-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-theme-gold to-[#C89A3D] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 22h20L12 2z" fill="#D4A24C" />
                <path d="M12 8L6 22h12L12 8z" fill="#080C18" />
              </svg>
            </div>
            <span className="text-sm font-bold text-white tracking-wide font-english">EGYPTHUB</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-white/70">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>
            <button onClick={() => setMobileNav(!mobileNav)} className="p-2 text-white touch-target">
              {mobileNav ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileNav && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-[#0F1525]/95 backdrop-blur-xl border-t border-white/[0.06]"
            >
              <div className="px-5 py-4 space-y-1">
                {['Explore', 'Destinations', 'Experiences', 'Stories', 'Luxury Collection'].map((item) => (
                  <a key={item} href="#"
                    onClick={() => setMobileNav(false)}
                    className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg font-english"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Content - centered for mobile */}
      <div className="absolute inset-0 flex flex-col justify-center px-5 pb-32">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[clamp(2.5rem,8vw,3rem)] font-bold font-display leading-[1.08] text-left md:text-center max-w-2xl"
        >
          <span className="text-white">Egypt is not just a destination.</span>
          <br />
          <span className="text-theme-gold italic">It&apos;s a story waiting to be yours.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-white/60 text-base md:text-lg max-w-md mt-4 text-left md:text-center leading-relaxed"
        >
          Discover Egypt through authentic experiences and local connections.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex items-center gap-4 mt-6 text-left md:justify-center"
        >
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-theme-gold text-[#080C18] font-bold font-english text-sm shadow-[0_4px_20px_rgba(212,162,76,0.3)] touch-target">
            <HiSparkles className="w-4 h-4" />
            Plan Your Journey
          </button>
          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-white/80 text-sm font-english touch-target">
            Watch Film
          </button>
        </motion.div>
      </div>

      {/* Avatar - overlaps into next section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 avatar-overlap"
        style={{ marginBottom: '-15vh' }}
      >
        <div className="relative mx-auto" style={{ width: 'clamp(180px, 55vw, 300px)', height: 'clamp(220px, 65vw, 380px)' }}>
          <Image
            src="/assets/avatar.png"
            alt="Zainab - AI Travel Concierge"
            fill
            sizes="(max-width: 768px) 55vw, 300px"
            className="object-contain object-bottom"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
