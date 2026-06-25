'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ImageLightbox from './ImageLightbox';

const experiences = [
  {
    title: 'Nile Sunset Cruise',
    location: 'Aswan',
    rating: 4.9,
    reviews: 2140,
    price: '$180',
    image: '/assets/home/nile-sunset.jpg?w=400&q=80',
    tag: 'POPULAR',
    desc: 'Private felucca sailing with sunset dinner on the Nile',
  },
  {
    title: 'Pyramids Guided Tour',
    location: 'Giza',
    rating: 4.8,
    reviews: 3200,
    price: '$120',
    image: '/assets/home/pyramids.jpg?w=400&q=80',
    tag: 'BESTSELLER',
    desc: 'Expert-guided tour of the Great Pyramids and Sphinx',
  },
  {
    title: 'Luxor Valley of Kings',
    location: 'Luxor',
    rating: 4.9,
    reviews: 1850,
    price: '$150',
    image: '/assets/home/luxor-temple.jpg?w=400&q=80',
    tag: 'HISTORY',
    desc: 'Explore ancient tombs and temples with Egyptologist guide',
  },
  {
    title: 'Red Sea Diving',
    location: 'Sharm El Sheikh',
    rating: 5.0,
    reviews: 960,
    price: '$200',
    image: '/assets/home/red-sea.jpg?w=400&q=80',
    tag: 'ADVENTURE',
    desc: 'World-class diving at Ras Mohammed National Park',
  },
  {
    title: 'Desert Safari Adventure',
    location: 'Sinai',
    rating: 4.7,
    reviews: 1250,
    price: '$95',
    image: '/assets/home/desert-dahab.jpg?w=400&q=80',
    tag: 'ADVENTURE',
    desc: 'Quad biking and Bedouin dinner under the stars',
  },
];

export default function ExperiencesSection() {
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);

  return (
    <section className="bg-[#080C18] py-8 md:py-14">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-8">
        <div className="flex items-end justify-between mb-6 md:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-0.5 h-3 bg-[#D4A24C] rounded-full shrink-0" />
              <p className="text-[10px] md:text-[11px] font-bold font-english tracking-[0.2em] text-[#D4A24C]">EXPERIENCES</p>
            </div>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold font-display leading-[1.1] text-white">
              Top Experiences in Egypt
            </h2>
          </div>
          <Link href="/experiences" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4A24C] to-[#C89A3D] text-[#080C18] text-sm font-bold font-english shrink-0 shadow-[0_4px_15px_rgba(212,162,76,0.25)] hover:shadow-[0_8px_30px_rgba(212,162,76,0.4)] transition-all">
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-5 md:gap-4">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="shrink-0 w-[240px] md:w-auto group cursor-pointer hover:shadow-[0_0_30px_rgba(212,162,76,0.12)] transition-all duration-500"
            >
              <div className="relative rounded-2xl overflow-hidden mb-3 border border-white/[0.08] group-hover:border-[#D4A24C]/30 transition-all duration-500 bg-[#0F1525]">
                <div className="relative aspect-[4/5]">
                  <button onClick={() => setLightbox({ src: exp.image.replace('?w=400&q=80', '?w=1200&q=90'), title: exp.title })} className="absolute inset-0 z-10 w-full h-full" aria-label={`View ${exp.title} image`} />
                  <Image src={exp.image} alt={exp.title} fill sizes="(max-width: 768px) 240px, 20vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080C18]/90 via-[#080C18]/30 to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className={`text-[8px] md:text-[9px] font-bold font-english tracking-[0.1em] text-[#D4A24C] bg-[#080C18]/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#D4A24C]/20`}>{exp.tag}</span>
                  </div>
                  <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#080C18]/60 backdrop-blur-sm flex items-center justify-center touch-target z-20" onClick={(e) => { e.stopPropagation(); }} aria-label="Save">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60 hover:text-red-400 transition-colors"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex items-center gap-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4A24C"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>
                      <span className="text-[11px] font-bold text-[#D4A24C] font-english">{exp.rating}</span>
                    </div>
                    <span className="text-[9px] text-white/30 font-english">({exp.reviews.toLocaleString()})</span>
                  </div>
                  <h3 className="text-sm font-bold font-english text-white leading-tight mb-1">{exp.title}</h3>
                  <p className="text-[10px] text-white/40 font-english mb-2">{exp.location}</p>
                  <p className="text-[9px] text-white/35 font-english line-clamp-1 mb-3">{exp.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold font-display text-[#D4A24C]">{exp.price}</span>
                      <span className="text-[9px] text-white/30 font-english">/person</span>
                    </div>
                    <Link href="/booking" className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#D4A24C] to-[#C89A3D] text-[#080C18] text-[10px] font-bold font-english hover:shadow-[0_4px_12px_rgba(212,162,76,0.3)] transition-all">
                      احجز الآن
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden mt-5">
          <Link href="/experiences" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4A24C] to-[#C89A3D] text-[#080C18] text-sm font-bold font-english shadow-[0_4px_12px_rgba(212,162,76,0.2)]">
            View All Experiences
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>

      {lightbox && (
        <ImageLightbox src={lightbox.src} alt={lightbox.title} open={!!lightbox} onClose={() => setLightbox(null)} />
      )}
    </section>
  );
}
