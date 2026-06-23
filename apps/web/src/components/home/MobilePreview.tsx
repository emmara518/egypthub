'use client';

import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';

const popularDestinations = [
  { name: 'Cairo', rating: '4.8', img: 'https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=400&q=80' },
  { name: 'Luxor', rating: '4.9', img: 'https://images.unsplash.com/photo-1568322503122-d214271f3be4?w=400&q=80' },
  { name: 'Dahab', rating: '4.8', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80' },
];

const topExperiences = [
  { name: 'Diving in the Red Sea', price: 'From $60', rating: '4.9', reviews: '920', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80' },
];

export default function MobilePreview() {
  return (
    <section className="py-24 bg-[#080C18] relative overflow-hidden">
      <div className="absolute bottom-0 right-1/3 w-96 h-96 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, #D4A24C 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <span className="text-[10px] font-bold text-theme-gold font-english tracking-[0.2em] mb-4 block">MOBILE EXPERIENCE</span>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 leading-[1.1]">
                Your Journey,<br />Your Way
              </h2>
              <p className="text-white/50 text-sm mb-10 max-w-md leading-relaxed">
                Download the EgyptHub app and explore Egypt with your personal AI concierge, anywhere, anytime.
              </p>
            </motion.div>

            {/* Popular Destinations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold font-english">Popular Destinations</h3>
                <a href="#" className="text-xs text-theme-gold font-english hover:underline">See All</a>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {popularDestinations.map((dest, i) => (
                  <motion.div
                    key={dest.name}
                    whileHover={{ y: -4 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl overflow-hidden bg-[#0F1525] border border-white/[0.06] group cursor-pointer hover:border-theme-gold/20 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                  >
                    <div className="relative h-28 overflow-hidden">
                      <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1525] to-transparent" />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{dest.name}</span>
                        <div className="flex items-center gap-0.5">
                          <HiStar className="w-3 h-3 text-theme-gold fill-theme-gold" />
                          <span className="text-[10px] font-english text-theme-gold">{dest.rating}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Top Experiences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold font-english">Top Experiences</h3>
                <a href="#" className="text-xs text-theme-gold font-english hover:underline">See All</a>
              </div>
              {topExperiences.map((exp) => (
                <motion.div
                  key={exp.name}
                  whileHover={{ x: 4 }}
                  className="flex gap-4 p-4 rounded-xl bg-[#0F1525] border border-white/[0.06] group cursor-pointer hover:border-theme-gold/20 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <img src={exp.img} alt={exp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold mb-1">{exp.name}</h4>
                    <p className="text-[11px] text-theme-gold font-english mb-1">{exp.price}</p>
                    <div className="flex items-center gap-1">
                      <HiStar className="w-3.5 h-3.5 text-theme-gold fill-theme-gold" />
                      <span className="text-xs font-english">{exp.rating}</span>
                      <span className="text-[10px] text-white/40 font-english">({exp.reviews} reviews)</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="relative shrink-0"
          >
            <div className="absolute -inset-8 rounded-[60px] opacity-[0.08] pointer-events-none"
              style={{ background: 'radial-gradient(circle, #D4A24C 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div className="w-[280px] h-[580px] rounded-[42px] bg-gradient-to-b from-[#1A2235] to-[#0F1525] p-[3px] shadow-[0_20px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(212,162,76,0.05)]">
              <div className="w-full h-full rounded-[39px] bg-[#080C18] overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-[#080C18] rounded-b-2xl z-20" />

                <div className="h-full bg-gradient-to-b from-[#080C18] to-[#0a1020] p-5 pt-9 overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-theme-gold to-[#C89A3D] flex items-center justify-center">
                        <span className="text-[#080C18] font-bold text-[10px]">م</span>
                      </div>
                      <span className="text-xs font-bold font-english">EGYPTHUB</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center">
                      <span className="text-xs">🔔</span>
                    </div>
                  </div>

                  <div className="mb-5">
                    <p className="text-[10px] text-white/50 font-english">Hello, Ahmed <span className="inline-block">👋</span></p>
                    <p className="text-sm font-bold mt-1">Where do you want to explore today?</p>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-5">
                    <svg className="w-3.5 h-3.5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-[9px] text-white/30 font-english">Search destinations...</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {['Relaxation', 'Adventure', 'Culture', 'Food', 'Luxury'].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full bg-white/[0.04] text-[7px] text-white/50 font-english border border-white/[0.04]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold">Popular</span>
                      <span className="text-[7px] text-theme-gold font-english">See All</span>
                    </div>
                    <div className="flex gap-2">
                      {popularDestinations.map((dest) => (
                        <div key={dest.name} className="flex-1 rounded-lg overflow-hidden bg-[#0F1525] border border-white/[0.04]">
                          <div className="h-12 overflow-hidden">
                            <img src={dest.img} alt={dest.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-1.5">
                            <span className="text-[7px] font-bold">{dest.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold">Top Experiences</span>
                      <span className="text-[7px] text-theme-gold font-english">See All</span>
                    </div>
                    <div className="flex gap-3 p-2.5 rounded-xl bg-[#0F1525] border border-white/[0.04]">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&q=80" alt="Diving" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[8px] font-bold truncate">Diving in the Red Sea</p>
                        <p className="text-[7px] text-theme-gold font-english">From $60</p>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          <HiStar className="w-2 h-2 text-theme-gold fill-theme-gold" />
                          <span className="text-[7px] font-english">4.9</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-14 bg-[#0F1525]/90 backdrop-blur-lg border-t border-white/[0.06] flex items-center justify-around px-6">
                  {[
                    { icon: '🏠', active: true },
                    { icon: '🔍' },
                    { icon: '❤️' },
                    { icon: '👤' },
                  ].map((item, i) => (
                    <div key={i} className={`flex flex-col items-center gap-0.5 ${item.active ? 'text-theme-gold' : 'text-white/30'}`}>
                      <span className="text-sm">{item.icon}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
