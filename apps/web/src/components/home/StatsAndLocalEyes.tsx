'use client';

import { motion } from 'framer-motion';
import { HiHeart, HiLocationMarker, HiUsers, HiStar, HiSupport, HiPlay } from 'react-icons/hi';

const stats = [
  { icon: HiHeart, value: '500+', label: 'Unique Experiences' },
  { icon: HiLocationMarker, value: '80+', label: 'Destinations' },
  { icon: HiUsers, value: '15K+', label: 'Happy Travelers' },
  { icon: HiStar, value: '4.9', label: 'Average Rating' },
  { icon: HiSupport, value: '24/7', label: 'Concierge Support' },
];

const locals = [
  { name: 'Omar', city: 'Cairo', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Nour', city: 'Alexandria', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  { name: 'Youssef', city: 'Luxor', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
  { name: 'Mai', city: 'Dahab', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
];

export default function StatsAndLocalEyes() {
  return (
    <section className="py-12 md:py-16 bg-[#080C18] relative">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left: Stats Row */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="text-center group"
                >
                  <div className="w-9 h-9 md:w-11 md:h-11 rounded-full border-2 border-theme-gold/30 flex items-center justify-center mx-auto mb-2 group-hover:border-theme-gold/50 transition-all duration-300">
                    <stat.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-theme-gold" />
                  </div>
                  <p className="text-lg md:text-xl font-bold font-english mb-0.5">{stat.value}</p>
                  <p className="text-[9px] md:text-[10px] text-white/50 font-english leading-tight">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Local Eyes */}
          <div className="w-full lg:w-[420px] shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="mb-4 md:mb-6"
            >
              <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold font-display mb-1 md:mb-2 leading-[1.1]">
                Egypt Through<br />Local Eyes
              </h2>
              <p className="text-white/50 text-[11px] md:text-xs">See Egypt like never before</p>
            </motion.div>

            <div className="flex items-center gap-3 md:gap-5 overflow-x-auto scrollbar-hide pb-2">
              {locals.map((local, i) => (
                <motion.div
                  key={local.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center gap-2 group cursor-pointer shrink-0"
                >
                  <div className="relative">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-theme-gold/30 group-hover:border-theme-gold/60 transition-all duration-300 shadow-[0_0_15px_rgba(212,162,76,0.1)]">
                      <img src={local.img} alt={local.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-400 border-2 border-[#080C18]" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] md:text-[11px] font-bold">{local.name}</p>
                    <p className="text-[7px] md:text-[8px] text-white/40 font-english">{local.city}</p>
                  </div>
                </motion.div>
              ))}

              <div className="flex items-center gap-2 pl-2 md:pl-3 border-l border-white/[0.06] shrink-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-theme-gold/40 transition-all duration-300 touch-target"
                >
                  <HiPlay className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/60 ml-0.5" />
                </motion.button>
                <div>
                  <span className="text-[8px] md:text-[9px] text-white/40 font-english">Watch film</span>
                  <p className="text-[7px] md:text-[8px] text-white/30 font-english">2:45</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
