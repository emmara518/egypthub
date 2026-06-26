'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Search, Menu, Close, Location, Calendar, User,
  Play, ArrowRight, Sun, Moon, Spa, Mountain, Landmark, Food,
  Laptop, Globe, SocialBrand,
} from '@/components/Icons';
import TravelDnaModal from '@/components/TravelDnaModal';

const sidebarItems = [
  { num: '01', label: 'Home', href: '#hero' },
  { num: '02', label: 'Map', href: '#map' },
  { num: '03', label: 'Stories', href: '#stories' },
  { num: '04', label: 'Experiences', href: '#experiences' },
  { num: '05', label: 'Concierge', href: '#hero' },
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
  { name: 'instagram' },
  { name: 'facebook' },
  { name: 'twitter' },
];

const navLinks = [
  { label: 'Explore', href: '/explore' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Stories', href: '/stories' },
  { label: 'Luxury Collection', href: '/collections' },
  { label: 'For Partners', href: '/partners' },
];

export default function HeroSection() {
  const [mobileNav, setMobileNav] = useState(false);
  const [activeChip, setActiveChip] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [parallaxY, setParallaxY] = useState(0);
  const [dnaModalOpen, setDnaModalOpen] = useState(false);
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });
  const ctaRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      setParallaxY(window.scrollY * 0.2);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const handleMagnet = (e: React.MouseEvent) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMagnetPos({ x: x * 0.2, y: y * 0.2 });
  };

  const resetMagnet = () => setMagnetPos({ x: 0, y: 0 });

  return (
    <section className="relative w-full min-h-[100vh] overflow-hidden bg-[#080C18]">
      {/* Background — simplified, no parallax */}
      <div className="absolute inset-0">
        <Image src="/assets/back_ground.webp" alt="" fill sizes="100vw" className="object-cover object-center" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#080C18]/70 via-[#080C18]/30 to-[#080C18] egypt-pattern" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080C18]/80 via-[#080C18]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[60%] h-[70%] opacity-[0.04] pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom left, #D4A24C 0%, transparent 70%)' }} />
      <div className="lg:hidden absolute bottom-0 left-0 right-0 h-[35vh] z-10 pointer-events-none bg-gradient-to-t from-[#080C18] via-[#080C18]/60 to-transparent" />

      {/* Fog Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
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

      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#080C18]/90 backdrop-blur-xl shadow-[0_1px_0_rgba(212,162,76,0.08)]' : 'bg-transparent'}`}>
        <div className={`w-full max-w-[1440px] mx-auto px-5 md:px-8 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-12 md:h-14' : 'h-14 md:h-16'}`}>
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-theme-gold to-[#C89A3D] flex items-center justify-center">
              <svg width="14" height="14" className="md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 22h20L12 2z" fill="#D4A24C" />
                <path d="M12 8L6 22h12L12 8z" fill="#080C18" />
              </svg>
            </div>
            <div>
              <span className="text-sm md:text-[15px] font-bold font-english text-white tracking-wide">EGYPTHUB</span>
              <p className="text-[6px] md:text-[7px] text-theme-gold/70 font-english tracking-[0.18em] -mt-0.5">YOUR STORY IN EGYPT</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((item) => (
              <Link key={item.label} href={item.href} className="text-[13px] font-medium text-white/60 hover:text-white transition-colors font-english">{item.label}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <div className={`overflow-hidden transition-all duration-300 ${searchOpen ? 'w-[160px] md:w-[200px]' : 'w-0'}`}>
              <input type="text" placeholder="Search destinations..." className="w-full bg-white/[0.06] border border-theme-gold/20 rounded-lg px-3 py-1.5 text-xs text-white/70 font-english placeholder:text-white/30 outline-none" aria-label="Search" />
            </div>
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-lg hover:bg-white/5 transition-colors touch-target" aria-label="Toggle search"><Search size={18} /></button>
            <button onClick={() => setDark(!dark)} className="hidden md:flex p-2 rounded-lg hover:bg-white/5 transition-colors touch-target" aria-label={dark ? 'Light mode' : 'Dark mode'}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="hidden md:flex items-center gap-1 text-white/60 text-xs font-english">
              <Globe size={14} />
              <span>EN</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 overflow-hidden hidden md:block">
              <div className="w-full h-full bg-gradient-to-br from-theme-gold/30 to-white/10" />
            </div>
            <Link href="/ai-concierge" className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-theme-gold/10 border border-theme-gold/30 text-theme-gold text-xs font-english hover:bg-theme-gold/20 hover:shadow-[0_0_15px_rgba(212,162,76,0.15)] transition-all">
              AI Concierge <Sparkles size={12} />
            </Link>
            <button onClick={() => setMobileNav(!mobileNav)} className="lg:hidden p-2 text-white touch-target" aria-label="Menu">
              {mobileNav ? <Close size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileNav && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-[#0F1525]/95 backdrop-blur-xl border-t border-white/[0.06] lg:hidden">
              <div className="px-5 py-4 space-y-1">
                {navLinks.map((item) => (
                  <Link key={item.label} href={item.href} onClick={() => setMobileNav(false)}
                    className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg font-english">{item.label}</Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

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
          <a key={social.name} href="#" aria-label={social.name}
            className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/20 transition-all backdrop-blur-sm touch-target">
            <SocialBrand name={social.name} size={14} />
          </a>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-center px-5 md:px-8 lg:pl-20 xl:pl-28 pt-24 md:pt-28 pb-20 lg:pb-0 max-w-[1440px] mx-auto">
        <div className="max-w-[520px] lg:max-w-[580px]">
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
            style={{ transform: `translate(${magnetPos.x}px, ${magnetPos.y}px)` }}
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-theme-gold to-[#C89A3D] flex items-center justify-center shadow-[0_0_20px_rgba(212,162,76,0.25)] group-hover:shadow-[0_0_35px_rgba(212,162,76,0.45)] transition-all duration-300">
              <Play size={18} className="text-[#080C18]" />
            </div>
            <span className="text-sm font-semibold text-theme-gold font-english">Watch Egypt Come Alive</span>
          </motion.button>

          {/* AI CONCIERGE — search-widget-glass */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
            <div className="search-widget-glass p-5 md:p-6 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-theme-gold to-[#C89A3D] flex items-center justify-center">
                  <Sparkles size={14} className="text-[#080C18]" />
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
                        ? 'border-theme-gold/50 bg-theme-gold/15 text-theme-gold shadow-[0_0_12px_rgba(212,162,76,0.15)]'
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
                <button aria-label="Search destinations" className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-theme-gold to-[#C89A3D] flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(212,162,76,0.2)] touch-target ripple">
                  <ArrowRight size={16} className="text-[#080C18]" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* AVATAR — Desktop */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-0 right-[5%] z-20 hidden lg:block" style={{ height: 'clamp(400px, 40vw, 500px)' }}>
        {/* Brand Watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
          <span className="text-[8rem] md:text-[10rem] font-bold text-white/5 font-display tracking-[0.2em]" style={{ transform: 'rotate(-5deg) translateY(-15%)' }}>
            EGYPTHUB
          </span>
        </div>
        {/* AI Travel Concierge label — floating above avatar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          className="absolute top-[2%] left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-theme-gold/10 border border-theme-gold/20 backdrop-blur-sm">
            <Sparkles size={10} />
            <span className="text-[10px] font-english text-theme-gold font-semibold tracking-wide">AI Travel Concierge</span>
          </div>
        </motion.div>
        {/* Avatar with 3D rings at same base level */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[clamp(260px, 30vw, 450px)]" style={{ height: 'clamp(340px, 35vw, 500px)' }}>
          {/* 3D Orbital Platform — at avatar's base */}
          <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 orbit-shell" style={{ width: 'clamp(260px, 30vw, 450px)', height: 'clamp(78px, 8.5vw, 120px)' }}>
            <div className="orbit-energy-base" />
            <div className="orbit-glow-ring" style={{ inset: -4 }} />
            <div className="orbit-ring-a">
              <div className="orbit-particle-a" />
              <div className="orbit-particle-a-2" />
              <div className="orbit-ring-b">
                <div className="orbit-particle-b" />
                <div className="orbit-particle-b-2" />
                <div className="orbit-ring-c">
                  <div className="orbit-particle-c" />
                  <div className="orbit-particle-c-2" />
                </div>
              </div>
            </div>
            <div className="energy-p1" /><div className="energy-p2" /><div className="energy-p3" /><div className="energy-p4" /><div className="energy-p5" />
          </div>
          <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[clamp(220px,24vw,380px)] h-[clamp(220px,24vw,380px)] rounded-full opacity-[0.12]" style={{ background: 'radial-gradient(circle, #D4A24C 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[clamp(144px,18vw,240px)] h-[clamp(14px,2vw,24px)] rounded-full opacity-[0.15]" style={{ background: 'radial-gradient(ellipse, #D4A24C 0%, transparent 70%)' }} />
          <div className="relative w-full h-full overflow-hidden cursor-pointer" onClick={() => setDnaModalOpen(true)}>
            <Image src="/assets/avatar.webp" alt="AI Concierge" fill sizes="450px" className="object-contain object-bottom" priority />
          </div>
        </div>
      </motion.div>

      {/* AVATAR — Mobile */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 flex justify-center" style={{ height: 'clamp(400px, 85vw, 560px)', zIndex: 15 }}>
        <div className="relative w-full h-full flex items-end justify-center">
          {/* Brand Watermark */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
            <span className="text-[6rem] font-bold text-white/5 font-display tracking-[0.2em]" style={{ transform: 'rotate(-5deg) translateY(-15%)' }}>
              EGYPTHUB
            </span>
          </div>
          {/* AI Travel Concierge label — floating above avatar */}
          <div className="absolute top-[2%] left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-theme-gold/10 border border-theme-gold/20 backdrop-blur-sm">
              <Sparkles size={8} />
              <span className="text-[8px] font-english text-theme-gold font-semibold tracking-wide whitespace-nowrap">AI Travel Concierge</span>
            </div>
          </div>
          {/* Avatar at bottom + rings directly at its base */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[clamp(320px, 78vw, 420px)]" style={{ height: 'clamp(380px, 95vw, 500px)' }}>
            <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 orbit-shell" style={{ width: 'clamp(320px, 78vw, 420px)', height: 'clamp(80px, 20vw, 130px)' }}>
              <div className="orbit-energy-base" />
              <div className="orbit-glow-ring" style={{ inset: -5 }} />
              <div className="orbit-ring-a">
                <div className="orbit-particle-a" />
                <div className="orbit-particle-a-2" />
                <div className="orbit-ring-b">
                  <div className="orbit-particle-b" />
                  <div className="orbit-particle-b-2" />
                  <div className="orbit-ring-c">
                    <div className="orbit-particle-c" />
                    <div className="orbit-particle-c-2" />
                  </div>
                </div>
              </div>
              <div className="energy-p1" /><div className="energy-p2" /><div className="energy-p3" /><div className="energy-p4" /><div className="energy-p5" />
            </div>
            <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[clamp(280px, 70vw, 380px)] h-[clamp(280px, 70vw, 380px)] rounded-full opacity-[0.1]" style={{ background: 'radial-gradient(circle, #D4A24C 0%, transparent 70%)' }} />
            <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[clamp(180px, 45vw, 260px)] h-[clamp(16px, 4vw, 28px)] rounded-full opacity-[0.15]" style={{ background: 'radial-gradient(ellipse, #D4A24C 0%, transparent 70%)' }} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="relative w-full h-full overflow-hidden cursor-pointer" onClick={() => setDnaModalOpen(true)}>
              <Image src="/assets/avatar.webp" alt="AI Concierge" fill sizes="420px" className="object-contain object-bottom" priority />
            </motion.div>
          </div>
        </div>
        {/* Gradient fade to blend with next section */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#080C18] via-[#080C18]/60 to-transparent pointer-events-none" />
      </div>

      <TravelDnaModal isOpen={dnaModalOpen} onClose={() => setDnaModalOpen(false)} />
    </section>
  );
}
