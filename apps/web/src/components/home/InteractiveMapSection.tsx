'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';

const cities = [
  { name: 'Alexandria', rating: '4.6', x: '42%', y: '14%', img: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=200&q=80' },
  { name: 'Cairo', rating: '4.8', x: '52%', y: '25%', img: 'https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=200&q=80' },
  { name: 'Siwa', rating: '4.7', x: '28%', y: '26%', img: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=200&q=80' },
  { name: 'Luxor', rating: '4.9', x: '48%', y: '52%', img: 'https://images.unsplash.com/photo-1568322503122-d214271f3be4?w=200&q=80' },
  { name: 'Aswan', rating: '4.9', x: '45%', y: '72%', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=200&q=80' },
  { name: 'Dahab', rating: '4.8', x: '66%', y: '55%', img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&q=80' },
];

export default function InteractiveMapSection() {
  const [selectedCity, setSelectedCity] = useState<typeof cities[0] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section dir="ltr" className="relative bg-[#080C18] text-left overflow-hidden pt-16 md:pt-24">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <p className="text-[10px] font-bold font-english tracking-[0.2em] text-theme-gold mb-1">EXPLORE EGYPT</p>
          <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold font-display leading-[1.1]">Interactive Map</h2>
        </div>

        {/* Map container - fixed height mobile */}
        <div className="relative w-full h-[320px] md:h-[420px] rounded-xl overflow-hidden bg-[#0a1020] border border-white/[0.06]">
          <Image
            src="/assets/egypt-map.png"
            alt="Egypt map"
            fill
            sizes="100vw"
            className="object-contain"
          />

          {/* City markers - compact for mobile */}
          {cities.map((city) => (
            <motion.button
              key={city.name}
              onClick={() => setSelectedCity(selectedCity?.name === city.name ? null : city)}
              className="absolute group z-10 touch-target"
              style={{ left: city.x, top: city.y, transform: 'translate(-50%, -50%)' }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-theme-gold/60 shadow-[0_0_10px_rgba(212,162,76,0.3)]">
                  <Image src={city.img} alt={city.name} fill sizes="40px" className="object-cover" unoptimized />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* City card - swipeable horizontal */}
        <div ref={scrollRef} className="snap-carousel mt-4 -mx-5 md:mx-0 md:mt-6">
          {cities.map((city) => (
            <motion.button
              key={city.name}
              onClick={() => setSelectedCity(city)}
              whileTap={{ scale: 0.95 }}
              className={`snap-start shrink-0 w-[200px] md:w-[240px] rounded-xl overflow-hidden border transition-all duration-300 ${
                selectedCity?.name === city.name
                  ? 'border-theme-gold/40 bg-[#0F1525]'
                  : 'border-white/[0.06] bg-[#0F1525]/80'
              }`}
            >
              <div className="flex gap-3 p-3">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden relative shrink-0">
                  <Image src={city.img} alt={city.name} fill sizes="64px" className="object-cover" unoptimized />
                </div>
                <div className="text-left min-w-0">
                  <h4 className="text-sm font-bold font-english text-white truncate">{city.name}</h4>
                  <p className="text-[11px] text-white/50 font-english truncate">Explore {city.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <HiStar className="w-3 h-3 text-theme-gold fill-theme-gold" />
                    <span className="text-[11px] font-bold text-theme-gold font-english">{city.rating}</span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
