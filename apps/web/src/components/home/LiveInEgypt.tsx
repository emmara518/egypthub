'use client';

import { motion } from 'framer-motion';
import { HiSun, HiOfficeBuilding, HiUsers, HiMusicNote } from 'react-icons/hi';

const liveItems = [
  { icon: HiSun, label: 'Cairo', value: '34° Sunny', sub: 'Clear skies, perfect for sightseeing', color: 'text-yellow-400' },
  { icon: HiOfficeBuilding, label: 'Dahab', value: 'Perfect diving conditions', sub: 'Visibility: 25m, Water: 24°C', color: 'text-blue-400' },
  { icon: HiUsers, label: '124 Travelers', value: 'Exploring Luxor right now', sub: 'Temples, tombs & culture', color: 'text-theme-gold' },
  { icon: HiMusicNote, label: 'Abu Simbel', value: 'Sound & Light Show Tonight', sub: '8:00 PM — 2 shows remaining', color: 'text-purple-400' },
];

export default function LiveInEgypt() {
  return (
    <section className="py-8 bg-gradient-to-r from-[#0F1525]/80 to-[#0F1525]/40 backdrop-blur-xl border-y border-white/[0.04]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-5">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-green-400"
          />
          <span className="text-[10px] font-bold text-theme-gold font-english tracking-[0.2em]">LIVE IN EGYPT NOW</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
              <div className={`w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.04] flex items-center justify-center ${item.color} group-hover:bg-white/[0.06] transition-all`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold font-english">{item.label}</p>
                <p className="text-[11px] text-white/60">{item.value}</p>
                <p className="text-[9px] text-white/30 font-english mt-0.5">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
