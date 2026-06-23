'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiStar, HiLocationMarker, HiChevronLeft, HiChevronRight, HiHeart, HiBookmark, HiClock, HiCurrencyDollar, HiUser } from 'react-icons/hi';
import { destinations, experiences } from '@/lib/mock-data';

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState('destinations');

  const favoriteDestinations = destinations.filter(d => d.slug === 'sharm-el-sheikh' || d.slug === 'cairo' || d.slug === 'luxor');
  const favoriteExperiences = experiences.filter(e => e.slug === 'pyramids-private-tour' || e.slug === 'red-sea-diving-adventure' || e.slug === 'luxor-temple-tour');

  return (
    <div className="min-h-screen bg-theme-bg pt-24" dir="rtl">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <HiChevronRight className="w-4 h-4" />
          العودة للرئيسية
        </Link>

        <div className="flex gap-6">
          <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5 text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-theme-gold to-accent-amber p-[2px]">
                    <div className="w-full h-full rounded-full bg-theme-surface flex items-center justify-center">
                      <HiUser className="text-3xl text-theme-gold" />
                    </div>
                  </div>
                </div>
                <h2 className="font-bold text-lg font-playfair text-theme">أحمد محمد</h2>
                <p className="text-xs text-theme-muted font-cairo mb-4">مستكشف مصر</p>
                <div className="grid grid-cols-3 gap-2">
                  {[{ val: '24', label: 'رحلة' }, { val: '14', label: 'تقييم' }, { val: '8', label: 'مفضلة' }].map(s => (
                    <div key={s.label} className="bg-theme-surface rounded-xl p-2 text-center">
                      <p className="text-lg font-bold text-theme-gold font-english">{s.val}</p>
                      <p className="text-[9px] text-theme-muted font-cairo">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-4 space-y-0.5">
                {[
                  { id: 'destinations', label: 'الوجهات المفضلة' },
                  { id: 'experiences', label: 'التجارب المفضلة' },
                  { id: 'history', label: 'سجل المشاهدة' },
                  { id: 'lists', label: 'قوائمي' },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-right px-3 py-2.5 rounded-lg text-sm transition-all ${
                      activeTab === tab.id ? 'bg-theme-gold/10 text-theme-gold font-medium' : 'text-theme-secondary hover:text-theme hover:bg-theme-elevated'
                    }`}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          <div className="flex-1 min-w-0">
            <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
              {[
                { id: 'destinations', label: 'الوجهات' },
                { id: 'experiences', label: 'التجارب' },
                { id: 'history', label: 'السجل' },
                { id: 'lists', label: 'القوائم' },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-cairo whitespace-nowrap transition-all ${
                    activeTab === tab.id ? 'bg-theme-gold/10 text-theme-gold border border-theme-gold/20' : 'bg-theme-card text-theme-secondary border border-theme-border'
                  }`}>
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'destinations' && (
                <motion.div key="destinations" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteDestinations.map((dest, idx) => (
                    <motion.div key={dest.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                      className="rounded-2xl border border-theme-gold/10 bg-theme-card overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all">
                      <div className="relative h-40 overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                          style={{ backgroundImage: `url(${dest.image})` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                        <button className="absolute top-2 left-2">
                          <HiHeart className="text-red-400 text-lg" />
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-1 mb-2">
                          <HiLocationMarker className="text-theme-gold text-xs" />
                          <span className="text-xs text-theme-muted font-cairo">{dest.region}</span>
                        </div>
                        <h3 className="font-bold text-theme font-cairo mb-1 group-hover:text-theme-gold transition-colors">{dest.name}</h3>
                        <p className="text-xs text-theme-muted font-cairo line-clamp-2 mb-3">{dest.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <HiStar className="text-theme-gold text-xs" />
                            <span className="text-xs text-theme-secondary font-english">{dest.rating}</span>
                          </div>
                          <Link href={`/destinations/${dest.slug}`}
                            className="text-xs text-theme-gold font-cairo hover:underline">
                            استكشف
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'experiences' && (
                <motion.div key="experiences" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteExperiences.map((exp, idx) => (
                    <motion.div key={exp.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                      className="rounded-2xl border border-theme-gold/10 bg-theme-card overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all">
                      <div className="relative h-36 overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                          style={{ backgroundImage: `url(${exp.image})` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                        <button className="absolute top-2 left-2">
                          <HiBookmark className="text-theme-gold text-lg" />
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-1 mb-2">
                          <HiLocationMarker className="text-theme-gold text-xs" />
                          <span className="text-xs text-theme-muted font-cairo">{exp.location}</span>
                        </div>
                        <h3 className="font-bold text-theme text-sm font-cairo mb-1 group-hover:text-theme-gold transition-colors">{exp.name}</h3>
                        <p className="text-[10px] text-theme-muted font-cairo line-clamp-2 mb-3">{exp.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-theme-gold text-xs font-bold font-english">EGP {exp.price.toLocaleString()}</span>
                          <span className="text-[10px] text-theme-muted font-cairo flex items-center gap-1">
                            <HiClock />{exp.duration}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'history' && (
                <motion.div key="history" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="space-y-4">
                  {[
                    { title: 'رحلة سفاري في الصحراء', date: 'منذ يومين', price: 5900, status: 'مؤكد', image: '/egypthub/images/activities/desert-safari.svg' },
                    { title: 'جولة في معبد الأقصر', date: 'منذ أسبوع', price: 2200, status: 'قادم', image: '/egypthub/images/destinations/luxor.svg' },
                    { title: 'رحلة غوص في البحر الأحمر', date: 'منذ أسبوعين', price: 1800, status: 'مؤكد', image: '/egypthub/images/activities/diving.svg' },
                  ].map((booking, i) => (
                    <motion.div key={i} whileHover={{ x: -3 }} className="flex items-center gap-4 p-4 rounded-xl bg-theme-card border border-theme-gold/10 hover:border-theme-gold/30 transition-all cursor-pointer">
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <img src={booking.image} alt={booking.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-theme text-sm font-cairo">{booking.title}</p>
                        <p className="text-xs text-theme-muted font-cairo mt-0.5">{booking.date}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${booking.status === 'مؤكد' ? 'bg-green-500/15 text-green-400' : 'bg-theme-gold/15 text-theme-gold'}`}>{booking.status}</span>
                          <span className="text-xs text-theme-secondary font-english">EGP {booking.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <Link href="#" className="text-theme-gold text-sm font-cairo hover:underline">
                        عرض التفاصيل
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'lists' && (
                <motion.div key="lists" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="space-y-4">
                  {[
                    { title: 'وجهات البحر الأحمر', count: 3, icon: '🏖️' },
                    { title: 'معابد صعيد مصر', count: 2, icon: '🏛️' },
                    { title: 'الوجهات الثقافية', count: 5, icon: '📚' },
                  ].map((list, i) => (
                    <motion.div key={i} whileHover={{ x: -3 }} className="flex items-center gap-4 p-4 rounded-xl bg-theme-card border border-theme-gold/10 hover:border-theme-gold/30 transition-all cursor-pointer">
                      <div className="w-10 h-10 rounded-lg bg-theme-gold/15 flex items-center justify-center text-lg">
                        {list.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-theme text-sm font-cairo">{list.title}</p>
                        <p className="text-xs text-theme-muted font-cairo">{list.count} عناصر</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
