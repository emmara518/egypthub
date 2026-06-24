'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

const liveItems = [
  { icon: '☀️', label: 'Cairo', value: '34° Sunny', sub: 'Clear skies' },
  { icon: '🌊', label: 'Dahab', value: 'Perfect diving', sub: 'Viz: 25m' },
  { icon: '👥', label: 'Luxor', value: '124 exploring now', sub: 'Temples & tombs' },
  { icon: '🎵', label: 'Abu Simbel', value: 'Sound Show Tonight', sub: '8:00 PM' },
];

const partners = [
  { name: 'FOUR SEASONS', style: 'text-xs tracking-[0.2em] font-light' },
  { name: 'AMAN', style: 'text-sm tracking-[0.3em] font-light' },
  { name: 'KEMPINSKI', style: 'text-[11px] tracking-[0.15em] font-medium' },
  { name: 'STEIGENBERGER', style: 'text-[10px] tracking-[0.1em] font-medium' },
  { name: 'Jaz', style: 'text-base tracking-[0.08em] font-light italic' },
];

export default function SignatureCollection() {
  const liveScrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="section-mobile bg-[#080C18] relative">
      {/* Live Strip — horizontal swipe */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 mb-6 md:mb-8">
        <div className="flex items-center gap-2 mb-4">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-green-400"
          />
          <span className="text-[10px] font-bold text-theme-gold font-english tracking-[0.2em]">LIVE IN EGYPT</span>
        </div>
        <div ref={liveScrollRef} className="snap-carousel -mx-5">
          {liveItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="snap-start shrink-0 w-[200px] rounded-xl bg-white/[0.04] border border-white/[0.06] p-4"
            >
              <span className="text-xl mb-2 block">{item.icon}</span>
              <p className="text-sm font-bold font-english">{item.label}</p>
              <p className="text-[13px] text-white/60">{item.value}</p>
              <p className="text-[11px] text-white/30 font-english mt-1">{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Signature Card — full width */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="relative rounded-2xl overflow-hidden border border-white/[0.06] min-h-[320px] md:min-h-[420px] flex flex-col justify-end"
        >
          <Image
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=85"
            alt="Luxury resort"
            fill
            sizes="100vw"
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080C18] via-[#080C18]/50 to-transparent" />

          <div className="relative z-10 p-6 md:p-10">
            <p className="text-[10px] font-bold text-theme-gold font-english tracking-[0.2em] mb-2">CURATED LUXURY</p>
            <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold font-display leading-[1.1] mb-2">
              Egypt Signature Collection
            </h2>
            <p className="text-white/70 text-sm md:text-base max-w-md mb-5">
              Handpicked luxury experiences crafted for unforgettable moments.
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-theme-gold text-[#080C18] font-bold font-english text-sm touch-target"
            >
              View Collection
              <HiArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Partner logos — auto scroll carousel */}
      <div className="max-w-[1440px] mx-auto mt-6 md:mt-8 overflow-hidden">
        <div className="snap-carousel">
          {[...partners, ...partners].map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className={`snap-start shrink-0 font-english text-white/30 whitespace-nowrap ${partner.style}`}
            >
              {partner.name}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile App Mockup — 80% width, centered, floating */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 mt-10 md:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-col md:flex-row items-center gap-6 md:gap-12"
        >
          {/* Phone */}
          <div className="relative shrink-0">
            <div className="absolute -inset-4 rounded-[40px] opacity-[0.08] pointer-events-none"
              style={{ background: 'radial-gradient(circle, #D4A24C 0%, transparent 70%)', filter: 'blur(30px)' }} />
            <div className="w-[240px] md:w-[280px] h-[500px] md:h-[580px] rounded-[36px] md:rounded-[42px] bg-gradient-to-b from-[#1A2235] to-[#0F1525] p-[3px] shadow-[0_20px_80px_rgba(0,0,0,0.6)] mx-auto">
              <div className="w-full h-full rounded-[33px] md:rounded-[39px] bg-[#080C18] overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 md:w-32 md:h-6 bg-[#080C18] rounded-b-2xl z-20" />
                <div className="h-full p-4 pt-8 md:pt-9 overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-theme-gold to-[#C89A3D] flex items-center justify-center">
                        <span className="text-[#080C18] font-bold text-[9px]">م</span>
                      </div>
                      <span className="text-[11px] font-bold font-english">EGYPTHUB</span>
                    </div>
                    <span className="text-sm">🔔</span>
                  </div>
                  <p className="text-[9px] text-white/50 font-english mb-1">Hello, Ahmed 👋</p>
                  <p className="text-sm font-bold mb-4">Where to explore today?</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {['Relaxation', 'Adventure', 'Culture', 'Luxury'].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full bg-white/[0.04] text-[8px] text-white/50 font-english border border-white/[0.04]">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold">Popular</span>
                    <span className="text-[8px] text-theme-gold font-english">See All</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#0F1525]/90 backdrop-blur-lg border-t border-white/[0.06] flex items-center justify-around px-5">
                  {['🏠', '🔍', '❤️', '👤'].map((icon, i) => (
                    <span key={i} className={`${i === 0 ? 'text-theme-gold' : 'text-white/30'} text-sm`}>{icon}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center md:text-left">
            <p className="text-[10px] font-bold text-theme-gold font-english tracking-[0.2em] mb-2">MOBILE APP</p>
            <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold font-display leading-[1.1] mb-3">
              Your Journey, Your Way
            </h2>
            <p className="text-white/50 text-sm md:text-base max-w-sm mb-6">
              Download the EgyptHub app and explore Egypt with your personal AI concierge.
            </p>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <button className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm font-english touch-target">App Store</button>
              <button className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm font-english touch-target">Google Play</button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
