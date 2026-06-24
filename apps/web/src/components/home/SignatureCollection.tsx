'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { HiArrowRight, HiStar, HiSun, HiOfficeBuilding, HiUsers, HiMusicNote } from 'react-icons/hi';

const liveItems = [
  { icon: HiSun, label: 'Cairo', value: '34° Sunny', sub: 'Clear skies, perfect for sightseeing', color: 'text-yellow-400' },
  { icon: HiOfficeBuilding, label: 'Dahab', value: 'Perfect diving conditions', sub: 'Visibility: 25m, Water: 24°C', color: 'text-blue-400' },
  { icon: HiUsers, label: '124 Travelers', value: 'Exploring Luxor right now', sub: 'Temples, tombs & culture', color: 'text-theme-gold' },
  { icon: HiMusicNote, label: 'Abu Simbel', value: 'Sound & Light Show Tonight', sub: '8:00 PM — 2 shows remaining', color: 'text-purple-400' },
];

const partners = [
  { name: 'FOUR SEASONS', style: 'text-[11px] tracking-[0.2em] font-light' },
  { name: 'AMAN', style: 'text-[14px] tracking-[0.3em] font-light' },
  { name: 'KEMPINSKI', style: 'text-[10px] tracking-[0.15em] font-medium' },
  { name: 'STEIGENBERGER', style: 'text-[9px] tracking-[0.1em] font-medium' },
  { name: 'Jaz', style: 'text-[16px] tracking-[0.08em] font-light italic' },
];

const popularDestinations = [
  { name: 'Cairo', rating: '4.8', img: 'https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=400&q=80' },
  { name: 'Luxor', rating: '4.9', img: 'https://images.unsplash.com/photo-1568322503122-d214271f3be4?w=400&q=80' },
  { name: 'Dahab', rating: '4.8', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80' },
];

const topExperiences = [
  { name: 'Diving in the Red Sea', price: 'From $60', rating: '4.9', reviews: '920', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80' },
];

export default function SignatureCollection() {
  return (
    <section className="bg-[#080C18] relative">
      {/* Live in Egypt Strip */}
      <div className="py-6 md:py-8 border-b border-white/[0.04]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 mb-4 md:mb-5">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-green-400"
            />
            <span className="text-[9px] md:text-[10px] font-bold text-theme-gold font-english tracking-[0.2em]">LIVE IN EGYPT NOW</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {liveItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 group cursor-default"
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/[0.04] border border-white/[0.04] flex items-center justify-center ${item.color} group-hover:bg-white/[0.06] transition-all shrink-0`}>
                  <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] md:text-xs font-bold font-english">{item.label}</p>
                  <p className="text-[10px] md:text-[11px] text-white/60 truncate">{item.value}</p>
                  <p className="text-[8px] md:text-[9px] text-white/30 font-english mt-0.5 truncate">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Signature Collection + Mobile Overlay */}
      <div className="py-10 md:py-16 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 items-start">
            {/* Left: Signature Collection Card */}
            <div className="flex-1 min-w-0 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                className="relative rounded-2xl overflow-hidden border border-white/[0.06] group hover:border-theme-gold/20 transition-all duration-500"
              >
                <div className="relative min-h-[250px] md:min-h-[380px]">
                  <Image
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=85"
                    alt="Luxury resort in Egypt"
                    fill
                    sizes="(max-width: 1280px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080C18] via-[#080C18]/60 to-[#080C18]/20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#080C18]/80 to-transparent" />

                  <div className="relative z-10 flex flex-col justify-end min-h-[250px] md:min-h-[380px] p-6 md:p-10">
                    <span className="text-[9px] md:text-[10px] font-bold text-theme-gold font-english tracking-[0.2em] mb-2 md:mb-3 block">CURATED LUXURY</span>
                    <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold font-display mb-2 md:mb-3 leading-[1.1]">
                      Egypt Signature Collection
                    </h2>
                    <p className="text-white/70 text-[clamp(0.8rem,1vw,0.9rem)] mb-4 md:mb-6 leading-relaxed max-w-md">
                      Handpicked luxury experiences crafted for unforgettable moments.
                    </p>
                    <motion.a
                      href="#"
                      whileHover={{ x: 4 }}
                      className="inline-flex items-center gap-2 text-[12px] md:text-sm font-semibold text-theme-gold font-english group/btn w-fit"
                    >
                      View Collection
                      <HiArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.a>
                  </div>
                </div>

                {/* Partner logos row */}
                <div className="bg-[#0a0e1a]/90 backdrop-blur-sm border-t border-white/[0.04] px-4 md:px-8 py-3 md:py-5">
                  <div className="flex items-center justify-between overflow-x-auto scrollbar-hide gap-4 md:gap-0">
                    {partners.map((partner, i) => (
                      <motion.div
                        key={partner.name}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ y: -2 }}
                        className={`font-english text-white/30 hover:text-white/50 transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${partner.style}`}
                      >
                        {partner.name}
                      </motion.div>
                    ))}
                    <motion.button
                      whileHover={{ x: 4 }}
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-theme-gold/30 transition-all shrink-0 ml-4 touch-target"
                    >
                      <HiArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/40" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Mobile Phone Overlay - stacks below on smaller screens */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="w-full xl:w-auto shrink-0 flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-6 md:-inset-8 rounded-[60px] opacity-[0.08] pointer-events-none"
                  style={{ background: 'radial-gradient(circle, #D4A24C 0%, transparent 70%)', filter: 'blur(40px)' }} />
                <div className="w-[220px] md:w-[260px] h-[460px] md:h-[540px] rounded-[32px] md:rounded-[40px] bg-gradient-to-b from-[#1A2235] to-[#0F1525] p-[3px] shadow-[0_20px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(212,162,76,0.05)]">
                  <div className="w-full h-full rounded-[29px] md:rounded-[37px] bg-[#080C18] overflow-hidden relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 md:w-32 h-5 md:h-6 bg-[#080C18] rounded-b-2xl z-20" />

                    <div className="h-full bg-gradient-to-b from-[#080C18] to-[#0a1020] p-3 md:p-4 pt-7 md:pt-8 overflow-y-auto">
                      <div className="flex items-center justify-between mb-4 md:mb-5">
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-gradient-to-br from-theme-gold to-[#C89A3D] flex items-center justify-center">
                            <span className="text-[#080C18] font-bold text-[8px] md:text-[9px]">م</span>
                          </div>
                          <span className="text-[10px] md:text-[11px] font-bold font-english">EGYPTHUB</span>
                        </div>
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/[0.06] flex items-center justify-center">
                          <span className="text-[9px] md:text-[10px]">🔔</span>
                        </div>
                      </div>

                      <div className="mb-3 md:mb-4">
                        <p className="text-[8px] md:text-[9px] text-white/50 font-english">Hello, Ahmed 👋</p>
                        <p className="text-[11px] md:text-[13px] font-bold mt-1 leading-snug">Where do you want to explore today?</p>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3 md:mb-4">
                        {['Relaxation', 'Adventure', 'Culture', 'Food', 'Luxury'].map((tag) => (
                          <span key={tag} className="px-1.5 md:px-2 py-0.5 rounded-full bg-white/[0.04] text-[6px] md:text-[7px] text-white/50 font-english border border-white/[0.04]">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mb-3 md:mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[8px] md:text-[9px] font-bold">Popular Destinations</span>
                          <span className="text-[6px] md:text-[7px] text-theme-gold font-english">See All</span>
                        </div>
                        <div className="flex gap-1.5 md:gap-2">
                          {popularDestinations.map((dest) => (
                            <div key={dest.name} className="flex-1 rounded-lg overflow-hidden bg-[#0F1525] border border-white/[0.04]">
                              <div className="h-10 md:h-14 overflow-hidden relative">
                                <Image src={dest.img} alt={dest.name} fill sizes="70px" className="object-cover" unoptimized />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1525]/60 to-transparent" />
                              </div>
                              <div className="p-1 md:p-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-[6px] md:text-[7px] font-bold">{dest.name}</span>
                                  <div className="flex items-center gap-0.5">
                                    <HiStar className="w-1.5 h-1.5 md:w-2 md:h-2 text-theme-gold fill-theme-gold" />
                                    <span className="text-[5px] md:text-[6px] font-english text-theme-gold">{dest.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[8px] md:text-[9px] font-bold">Top Experiences</span>
                          <span className="text-[6px] md:text-[7px] text-theme-gold font-english">See All</span>
                        </div>
                        {topExperiences.map((exp) => (
                          <div key={exp.name} className="flex gap-2 md:gap-3 p-1.5 md:p-2 rounded-xl bg-[#0F1525] border border-white/[0.04]">
                          <div className="w-9 h-9 md:w-11 md:h-11 rounded-lg overflow-hidden shrink-0 relative">
                            <Image src={exp.img} alt={exp.name} fill sizes="44px" className="object-cover" unoptimized />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[7px] md:text-[8px] font-bold truncate">{exp.name}</p>
                              <p className="text-[6px] md:text-[7px] text-theme-gold font-english">{exp.price}</p>
                              <div className="flex items-center gap-0.5 mt-0.5">
                                <HiStar className="w-1.5 h-1.5 md:w-2 md:h-2 text-theme-gold fill-theme-gold" />
                                <span className="text-[5px] md:text-[6px] font-english">{exp.rating}</span>
                                <span className="text-[5px] md:text-[6px] text-white/30 font-english">({exp.reviews})</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-10 md:h-12 bg-[#0F1525]/90 backdrop-blur-lg border-t border-white/[0.06] flex items-center justify-around px-4 md:px-5">
                      {['🏠', '🔍', '❤️', '👤'].map((icon, i) => (
                        <div key={i} className={`flex flex-col items-center ${i === 0 ? 'text-theme-gold' : 'text-white/30'}`}>
                          <span className="text-[10px] md:text-xs">{icon}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
