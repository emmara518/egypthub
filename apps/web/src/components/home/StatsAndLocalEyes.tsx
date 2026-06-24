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
    <section className="py-16 bg-[#080C18] relative">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: Stats Row */}
          <div className="flex-1">
            <div className="grid grid-cols-5 gap-4">
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
                  <div className="w-11 h-11 rounded-full border-2 border-theme-gold/30 flex items-center justify-center mx-auto mb-2 group-hover:border-theme-gold/50 transition-all duration-300">
                    <stat.icon className="w-4 h-4 text-theme-gold" />
                  </div>
                  <p className="text-xl font-bold font-english mb-0.5">{stat.value}</p>
                  <p className="text-[10px] text-white/50 font-english leading-tight">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Local Eyes */}
          <div className="lg:w-[420px] shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold font-display mb-2 leading-[1.1]">
                Egypt Through<br />Local Eyes
              </h2>
              <p className="text-white/50 text-xs">See Egypt like never before</p>
            </motion.div>

            <div className="flex items-center gap-5">
              {locals.map((local, i) => (
                <motion.div
                  key={local.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-theme-gold/30 group-hover:border-theme-gold/60 transition-all duration-300 shadow-[0_0_15px_rgba(212,162,76,0.1)]">
                      <img src={local.img} alt={local.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#080C18]" />
                  </div>
                  <div className="text-center">
                    <p className="text-[11px] font-bold">{local.name}</p>
                    <p className="text-[8px] text-white/40 font-english">{local.city}</p>
                  </div>
                </motion.div>
              ))}

              <div className="flex items-center gap-2 pl-3 border-l border-white/[0.06]">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-theme-gold/40 transition-all duration-300"
                >
                  <HiPlay className="w-4 h-4 text-white/60 ml-0.5" />
                </motion.button>
                <div>
                  <span className="text-[9px] text-white/40 font-english">Watch film</span>
                  <p className="text-[8px] text-white/30 font-english">2:45</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
