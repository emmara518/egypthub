'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Sparkles } from '@/components/Icons';
import { Home, Search, Heart, User } from '@/components/Icons';
import PartnerLogos from './PartnerLogos';

const destinations = [
  { name: 'Cairo', img: '/assets/home/pyramids.jpg?w=200&q=80' },
  { name: 'Luxor', img: '/assets/home/luxor-temple.jpg?w=200&q=80' },
  { name: 'Dahab', img: '/assets/home/desert-dahab.jpg?w=200&q=80' },
];

const experiences = [
  { name: 'Diving in the Red Sea', rating: 4.9, reviews: '2.4K', img: '/assets/home/red-sea.jpg?w=200&q=80' },
  { name: 'Nile Sunset Cruise', rating: 4.8, reviews: '1.8K', img: '/assets/home/nile-sunset.jpg?w=200&q=80' },
];

const bottomNav = [
  { icon: Home, label: 'Home', active: true },
  { icon: Search, label: 'Search', active: false },
  { icon: Heart, label: 'Saved', active: false },
  { icon: User, label: 'Profile', active: false },
];

export default function SignatureCollection() {
  return (
    <section className="bg-theme-bg overflow-hidden">
      <div className="py-12 md:py-20 lg:py-24 glass-card">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8">
          <div className="lg:flex lg:gap-8 xl:gap-12">
            {/* Left: Luxury Card */}
            <div className="lg:w-[55%] mb-8 lg:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-0.5 h-3 bg-theme-gold rounded-full shrink-0" />
                <p className="text-[10px] md:text-[11px] font-bold font-english tracking-[0.2em] text-theme-gold">SIGNATURE COLLECTION</p>
              </div>
              <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold font-display leading-[1.1] text-white mb-1 gold-underline">
                Egypt Signature Collection
              </h2>
              <p className="text-white/40 text-sm mb-4">Handcrafted luxury experiences crafted for unforgettable moments.</p>
              <Link href="/collections" className="inline-block px-4 py-2 rounded-full gold-btn text-sm mb-5 shadow-elevation-gold-1">
                View Collection
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-xl overflow-hidden aspect-[16/9] group cursor-pointer border border-theme-gold/[0.1] hover:border-theme-gold/30 transition-all duration-500 hover:shadow-elevation-gold-glow"
              >
                <Image src="/assets/home/luxor-temple.jpg?w=900&q=80" alt="Luxury Collection" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-bg/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] font-bold font-english tracking-[0.15em] text-theme-gold mb-1">FEATURED</p>
                  <h3 className="text-lg font-bold font-display text-white">Private Villa Retreat</h3>
                  <p className="text-[11px] text-white/50 font-english">Exclusive luxury in the heart of Luxor</p>
                </div>
              </motion.div>

              <div className="flex items-center gap-6 mt-5 opacity-40">
                {['HARD ROCK', 'AMAN', 'KEMPINSKI', 'STEIGENBERGER', 'JAZ'].map((brand) => (
                  <span key={brand} className="text-[9px] md:text-[10px] font-bold font-english tracking-[0.1em] text-white/50">{brand}</span>
                ))}
              </div>
            </div>

            {/* Right: Mobile App Mockup */}
            <div className="lg:w-[45%] flex items-center justify-center">
              <div className="relative w-full max-w-[300px]">
                <div className="relative rounded-[2.5rem] border-[3px] border-theme-gold/15 overflow-hidden shadow-elevation-4 shadow-[0_0_30px_-10px_rgba(212,162,76,0.1)] bg-theme-surface">
                  <div className="flex items-center justify-between px-6 pt-3 pb-1">
                    <span className="text-[10px] text-white/60 font-english">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5">
                        {[1,2,3,4].map(i => <div key={i} className="w-[3px] bg-white/40 rounded-full" style={{height: `${4+i*2}px`}} />)}
                      </div>
                      <div className="w-5 h-2.5 border border-white/30 rounded-sm relative ml-1">
                        <div className="absolute inset-[1px] right-[2px] bg-green-400 rounded-[1px]" />
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-theme-gold to-theme-gold flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L2 22h20L12 2z" fill="var(--gold)" />
                          <path d="M12 8L6 22h12L12 8z" fill="var(--bg)" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold font-english text-white">EGYPTHUB</span>
                    </div>

                    <p className="text-[11px] text-white/40 font-english mb-0.5">Hello, Ahmed 👋</p>
                    <h3 className="text-base font-bold font-display text-white mb-3">Where do you want to explore today?</h3>

                    <div className="flex gap-1.5 mb-4 overflow-x-auto scrollbar-hide">
                      {['Relaxation', 'Adventure', 'Culture', 'Food', 'Luxury'].map((c) => (
                        <span key={c} className="text-[9px] font-english text-white/50 px-2.5 py-1 rounded-full border border-white/[0.06] bg-white/[0.03] whitespace-nowrap shrink-0">{c}</span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[11px] font-bold font-english text-white">Popular Destinations</p>
                      <span className="text-[9px] text-theme-gold font-english">See All</span>
                    </div>
                    <div className="flex gap-2 mb-4">
                      {destinations.map((d) => (
                        <div key={d.name} className="flex-1 rounded-lg overflow-hidden relative aspect-[3/4] neon-gold">
                          <Image src={d.img} alt={d.name} fill sizes="80px" className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-theme-bg/70 to-transparent" />
                          <p className="absolute bottom-1.5 left-2 text-[9px] font-bold font-english text-white">{d.name}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[11px] font-bold font-english text-white">Top Experiences</p>
                      <span className="text-[9px] text-theme-gold font-english">See All</span>
                    </div>
                    {experiences.map((exp) => (
                      <div key={exp.name} className="flex items-center gap-2.5 mb-2">
                        <div className="w-10 h-10 rounded-lg overflow-hidden relative shrink-0">
                          <Image src={exp.img} alt={exp.name} fill sizes="40px" className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold font-english text-white truncate">{exp.name}</p>
                          <div className="flex items-center gap-1">
                            <Star size={10} />
                            <span className="text-[9px] font-bold text-theme-gold font-english">{exp.rating}</span>
                            <span className="text-[8px] text-white/30 font-english">({exp.reviews})</span>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.06]">
                      {bottomNav.map((nav) => (
                        <button key={nav.label} className={`flex flex-col items-center gap-0.5 touch-target ${nav.active ? 'text-theme-gold' : 'text-white/30'}`}>
                          <nav.icon size={16} />
                          <span className="text-[7px] font-english">{nav.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-theme-bg py-6 md:py-8 border-t border-white/[0.04]">
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8">
          <p className="text-center text-[9px] md:text-[10px] text-white/30 font-english tracking-[0.25em] mb-4">AS FEATURED IN</p>
          <PartnerLogos />
        </div>
      </div>
    </section>
  );
}
