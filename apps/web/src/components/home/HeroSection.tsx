'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Sparkles, Location, Calendar, User,
  Play, ArrowRight, Spa, Mountain, Landmark, Food,
  Laptop, SocialBrand,
} from '@/components/Icons';
import TravelDnaModal from '@/components/TravelDnaModal';


const sidebarItems = [
  { num: '01', label: 'Home', href: '#hero' },
  { num: '02', label: 'Map', href: '#map' },
  { num: '03', label: 'Stories', href: '#experiences-stories' },
  { num: '04', label: 'Experiences', href: '#experiences' },
  { num: '05', label: 'Concierge', href: '#ai-concierge' },
];

const categoryChips = [
  { icon: Spa, label: 'Relaxation' },
  { icon: Mountain, label: 'Adventure' },
  { icon: Landmark, label: 'Culture & History' },
  { icon: Food, label: 'Food & Flavors' },
  { icon: Sparkles, label: 'Luxury Escape' },
  { icon: Laptop, label: 'Digital Nomad' },
];

const socialLinks = [
  { name: 'instagram', href: 'https://instagram.com/egypthub' },
  { name: 'facebook', href: 'https://facebook.com/egypthub' },
  { name: 'twitter', href: 'https://twitter.com/egypthub' },
];

export default function HeroSection() {
  const [activeChip, setActiveChip] = useState(0);
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });
  const [dnaModalOpen, setDnaModalOpen] = useState(false);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleMagnet = (e: React.MouseEvent) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMagnetPos({ x: x * 0.2, y: y * 0.2 });
  };

  const resetMagnet = () => setMagnetPos({ x: 0, y: 0 });

  return (
    <section className="relative w-full min-h-[100dvh] overflow-x-hidden bg-theme-bg">
      {/* Background — simplified, no parallax */}
      <div className="absolute inset-0">
        <Image src="/assets/back_ground.webp" alt="" fill sizes="100vw" className="object-cover object-center" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-theme-bg/70 via-theme-bg/30 to-theme-bg egypt-pattern" />
      <div className="absolute inset-0 bg-gradient-to-r from-theme-bg/80 via-theme-bg/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[60%] h-[70%] opacity-[0.04] pointer-events-none" />
      <div className="lg:hidden absolute bottom-0 left-0 right-0 h-[35vh] z-10 pointer-events-none bg-gradient-to-t from-theme-bg via-theme-bg/60 to-transparent" />

      {/* Fog Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <motion.div 
          animate={{ x: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[20%] -left-[10%] w-[120%] h-[60%] opacity-[0.08]"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, #D4A24C 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-[10%] -right-[10%] w-[80%] h-[50%] opacity-[0.05]"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, #E8C97A 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>


      {/* LEFT SIDEBAR */}
      <motion.nav initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
        className="hidden xl:flex fixed left-6 top-36 z-40 flex-col items-center">
        <div className="flex flex-col items-center relative">
          <div className="absolute top-1 bottom-1 w-px bg-gradient-to-b from-theme-gold/30 via-white/8 to-transparent" />
          {sidebarItems.map((item) => (
            <a key={item.num} href={item.href} className="flex flex-col items-center py-2 relative z-10 opacity-25 hover:opacity-50 transition-opacity touch-target">
              <span className="text-[9px] font-english font-bold tracking-wide text-white/50">{item.num}</span>
              <div className="w-px mt-1 bg-white/10 h-3" />
              <span className="text-[8px] font-english mt-1 tracking-wider text-white/30">{item.label}</span>
            </a>
          ))}
        </div>
        <div className="mt-5 flex flex-col items-center gap-0.5">
          <div className="w-4 h-4 rounded-full border border-white/15 flex items-center justify-center">
            <span className="text-[7px] text-white/40">↓</span>
          </div>
          <span className="text-[6px] text-white/20 font-english tracking-wider">SCROLL</span>
        </div>
      </motion.nav>

      {/* SOCIAL ICONS */}
      <div className="hidden xl:flex fixed left-6 top-[360px] z-40 flex-col gap-2.5">
        {socialLinks.map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}
            className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/20 transition-all backdrop-blur-sm touch-target">
            <SocialBrand name={social.name} size={14} />
          </a>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 h-full flex flex-col lg:flex-row lg:items-end lg:justify-between px-3 md:px-8 lg:pl-20 xl:pl-28 pt-24 md:pt-28 pb-8 lg:pb-0 max-w-[1440px] mx-auto">
        <div className="max-w-[520px] lg:max-w-[500px] xl:max-w-[580px]">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-headline mb-8 md:mb-12 lg:mb-16">
            <span className="text-white">Egypt is not just a destination.</span><br />
            <span className="gold-shimmer italic">It&apos;s a story waiting to be yours.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="hero-subheadline max-w-md mb-8 md:mb-12 lg:mb-16">
            Egypt awaits. Your journey begins here.
          </motion.p>

          <motion.button
            ref={ctaRef}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.03 }}
            onMouseMove={handleMagnet}
            onMouseLeave={resetMagnet}
            onClick={() => router.push('/stories')}
            className="flex items-center gap-3 group mb-8 md:mb-12 lg:mb-16 ripple"
           
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-theme-gold to-theme-gold flex items-center justify-center shadow-elevation-gold-glow group-hover:shadow-elevation-gold-2 transition-all duration-300">
              <Play size={18} className="text-theme-bg" />
            </div>
            <span className="text-sm font-semibold text-theme-gold font-english">Watch Egypt Come Alive</span>
          </motion.button>

          {/* AI CONCIERGE  search-widget-glass */}
          <motion.div id="ai-concierge" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
            <div className="search-widget-glass p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-theme-gold to-theme-gold flex items-center justify-center">
                  <Sparkles size={14} className="text-theme-bg" />
                </div>
                <div>
                  <span className="text-[8px] font-bold text-theme-gold font-english tracking-[0.15em]">AI TRAVEL CONCIERGE</span>
                  <p className="text-[7px] text-white/25 font-english">We&apos;ll craft your perfect journey</p>
                </div>
              </div>

              <h3 className="text-base md:text-lg font-bold font-display mb-0.5 text-white">What brings you to Egypt?</h3>
              <p className="text-[12px] text-white/40 mb-3">We&apos;ll craft your perfect journey</p>

              <div className="flex gap-1.5 md:gap-2 mb-4 overflow-x-auto scrollbar-hide snap-x -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
                {categoryChips.map((chip, i) => (
                  <button key={chip.label} onClick={() => setActiveChip(i)}
                    className={`shrink-0 snap-start flex items-center gap-1 px-2 md:px-3 py-1.5 rounded-full border transition-all text-[10px] md:text-[11px] font-english touch-target ${
                      activeChip === i
                        ? 'border-theme-gold/50 bg-theme-gold/15 text-theme-gold shadow-elevation-gold-glow'
                        : 'border-white/[0.06] bg-white/[0.03] text-white/60 hover:border-theme-gold/15 hover:text-theme-gold/70'
                    }`}>
                    <chip.icon size={12} />
                    <span>{chip.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-theme-gold/[0.08] hover:border-theme-gold/20 flex-1 min-w-0 transition-all glass-card touch-target">
                  <Location size={16} />
                  <span className="text-[12px] text-white/50 font-english truncate">Any Destination</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-theme-gold/[0.08] hover:border-theme-gold/20 flex-1 min-w-0 transition-all glass-card touch-target">
                  <Calendar size={16} />
                  <span className="text-[12px] text-white/50 font-english truncate">Any Time</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-theme-gold/[0.08] hover:border-theme-gold/20 flex-1 min-w-0 transition-all glass-card touch-target">
                  <User size={16} />
                  <span className="text-[12px] text-white/50 font-english truncate">2 Travelers</span>
                </div>
                <button aria-label="Search destinations" className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-theme-gold to-theme-gold flex items-center justify-center shrink-0 shadow-elevation-gold-1 touch-target ripple">
                  <ArrowRight size={16} className="text-theme-bg" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Avatar — emerges from bottom-right of hero scene */}
        <div className="hidden lg:block absolute right-0 bottom-0 z-10 pointer-events-none">
          <div
            className="relative w-full h-full pointer-events-auto cursor-pointer"
           
            onClick={() => setDnaModalOpen(true)}
          >
            <div
              className="absolute inset-0"
             
            />
            <Image src="/assets/avatar.png" alt="AI Concierge" fill sizes="440px" className="object-contain object-bottom" priority />
          </div>
        </div>
        {/* Avatar — mobile: emerges below search widget */}
        <div className="lg:hidden relative z-10 mt-8 mb-0">
          <div
            className="relative cursor-pointer mx-auto"
           
            onClick={() => setDnaModalOpen(true)}
          >
            <div
              className="absolute inset-0"
             
            />
            <Image src="/assets/avatar.png" alt="AI Concierge" fill sizes="300px" className="object-contain object-bottom" priority />
          </div>
        </div>
      </div>

      <TravelDnaModal isOpen={dnaModalOpen} onClose={() => setDnaModalOpen(false)} />
    </section>
  );
}
