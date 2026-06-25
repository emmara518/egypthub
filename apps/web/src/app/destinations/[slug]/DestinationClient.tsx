'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiStar, HiLocationMarker, HiChevronLeft, HiHeart, HiShare } from 'react-icons/hi';
import { destinations, experiences } from '@/lib/mock-data';
import { CompassIcon } from '@/components/EgyptianIcons';
import Testimonials from '@/components/Testimonials';

export default function DestinationClient({ slug }: { slug: string }) {
  const dest = destinations.find((d) => d.slug === slug);

  if (!dest) {
    return (
      <div className="min-h-screen bg-theme-bg pt-24 flex items-center justify-center" dir="ltr">
        <div className="text-center">
          <CompassIcon className="text-6xl text-theme-gold mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-theme mb-2 font-playfair">الوجهة غير موجودة</h1>
          <p className="text-theme-secondary mb-6 font-cairo">عذراً، لم نتمكن من العثور على الوجهة المطلوبة.</p>
          <Link href="/destinations" className="px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo">
            العودة للوجهات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg pt-24" dir="ltr">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/destinations" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <HiChevronLeft className="w-4 h-4" />
          العودة للوجهات
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden mb-4 h-[400px]">
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold font-playfair text-theme mb-2">{dest.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <HiLocationMarker className="text-theme-gold" />
              <span className="text-sm text-theme-secondary font-cairo">{dest.region}</span>
              <HiStar className="text-theme-gold mr-3" />
              <span className="text-sm text-theme-secondary font-english">{dest.rating}</span>
            </div>
            <p className="text-theme-secondary font-cairo mb-6 leading-relaxed">{dest.description}</p>

            <div className="flex gap-2 mb-6">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold font-cairo">
                احجز الآن
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl border border-theme-border flex items-center justify-center text-theme-secondary hover:text-theme-gold hover:border-theme-gold/30 transition-all">
                <HiHeart />
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl border border-theme-border flex items-center justify-center text-theme-secondary hover:text-theme-gold hover:border-theme-gold/30 transition-all">
                <HiShare />
              </motion.button>
            </div>

            <div className="rounded-2xl border border-theme-border bg-theme-card p-5 mb-6">
              <h3 className="font-bold text-theme mb-3 font-cairo">معلومات سريعة</h3>
              <div className="space-y-2 text-sm text-theme-secondary font-cairo">
                {[
                  { label: 'اللغة', value: 'العربية' },
                  { label: 'العملة', value: 'الجنيه المصري' },
                  { label: 'عدد التجارب', value: `${dest.experienceCount}+` },
                ].map((info, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{info.label}</span>
                    <span className="text-theme font-medium">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold font-playfair text-theme mb-6">تجارب مميزة في {dest.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.filter(exp => exp.region === dest.region).slice(0, 6).map((exp, i) => (
              <motion.div key={exp.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-theme-gold/10 bg-theme-card overflow-hidden group hover:border-theme-gold/30 transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img src={exp.image} alt={exp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-theme font-cairo mb-1">{exp.name}</h3>
                  <p className="text-xs text-theme-muted font-cairo mb-3">{exp.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-theme-gold font-english">EGP {exp.price.toLocaleString()}</span>
                    <button className="px-4 py-1.5 rounded-lg bg-theme-gold/10 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/20 transition-all">
                      احجز
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Testimonials />
      </div>
    </div>
  );
}
