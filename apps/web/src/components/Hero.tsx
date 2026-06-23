'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CompassIcon } from './EgyptianIcons';
import SandWave from './SandWave';

const heroImages = [
  { url: '/egypthub/images/destinations/sharm-el-sheikh.svg', alt: 'شرم الشيخ' },
  { url: '/egypthub/images/destinations/luxor.svg', alt: 'الأقصر' },
  { url: '/egypthub/images/destinations/aswan.svg', alt: 'أسوان' },
  { url: '/egypthub/images/destinations/alexandria.svg', alt: 'الإسكندرية' },
  { url: '/egypthub/images/destinations/dahab.svg', alt: 'الغردقة' },
  { url: '/egypthub/images/destinations/cairo.svg', alt: 'القاهرة' },
  { url: '/egypthub/images/destinations/hurghada.svg', alt: 'سيوة' },
];

const typewriterWords = ['مزاجك', 'طريقتك', 'ذوقك'];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typeIdx, setTypeIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Ken Burns slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Typewriter engine
  useEffect(() => {
    const word = typewriterWords[typeIdx];
    const speed = deleting ? 40 : 100;

    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIdx < word.length) {
          setCharIdx((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIdx > 0) {
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setTypeIdx((i) => (i + 1) % typewriterWords.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, typeIdx]);

  const scrollToContent = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

  return (
    <section className="relative h-screen min-h-[750px] max-h-[920px] overflow-hidden">
      {/* Ken Burns Slideshow */}
      <div className="absolute inset-0">
        {heroImages.map((img, i) => (
          <div
            key={img.url}
            className="absolute inset-0 bg-cover bg-center transition-all duration-[1400ms] ease-out"
            style={{
              backgroundImage: `url(${img.url})`,
              opacity: i === currentSlide ? 1 : 0,
              transform: i === currentSlide ? 'scale(1)' : 'scale(1.1)',
            }}
          />
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-theme-bg/90 via-theme-bg/80 to-theme-bg/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-transparent to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8">
        {/* Left Panel */}
        <div className="flex-1 lg:max-w-xl text-center lg:text-right">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
          >
            <CompassIcon className="w-4 h-4 text-theme-gold" />
            <span className="text-xs font-semibold text-white/90">بوابتك لأصالة مصر</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-theme-gold leading-tight mb-4 font-cairo"
          >
            مصر هب
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-cairo"
          >
            عيشها على{' '}
            <span className="text-theme-gold inline-flex">
              {typewriterWords[typeIdx].substring(0, charIdx)}
              <span className="w-[2px] bg-theme-gold animate-pulse mr-0.5">&nbsp;</span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-xl font-amiri leading-relaxed mx-auto lg:mx-0"
          >
            من الأهرامات إلى البحر الأحمر، اختبر مصر بعيون أهلها. رحلتك تبدأ من هنا.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 bg-accent-orange hover:bg-accent-orange/80 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              ابدأ رحلتك
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Right Panel - Oval Shapes */}
        <div className="hidden lg:block flex-1 relative h-[500px]">
          <div className="absolute left-[5%] top-[10%] w-48 h-72 rounded-full border-4 border-white/20 opacity-60" />
          <div className="absolute left-[20%] top-[5%] w-64 h-96 rounded-full border-4 border-theme-gold shadow-[0_0_40px_rgba(212,162,76,0.3)]" />
          <div className="absolute right-[5%] top-[15%] w-48 h-72 rounded-full border-4 border-white/20 opacity-40" />
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-300 rounded-full ${
              i === currentSlide
                ? 'w-8 h-2 bg-theme-gold'
                : 'w-2 h-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/50 hover:text-white/80 transition-colors animate-bounce"
        aria-label="اسفل"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </button>

      {/* SandWave Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10 text-[#FAEDCD]">
        <SandWave />
      </div>
    </section>
  );
}
