'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiSearch, HiStar, HiBadgeCheck, HiLocationMarker, HiUserGroup, HiChevronLeft } from 'react-icons/hi';
import { getAllAmbassadors, searchAmbassadors, getAmbassadorStats } from '@/lib/network/ambassadorEngine';
import type { NetworkAmbassador } from '@/lib/network/types';

const ambassadors = getAllAmbassadors();
const stats = getAmbassadorStats();
const cities = Object.keys(stats.byCity);
const roles = [...new Set(ambassadors.map((a) => a.role))];

const cityLabels: Record<string, string> = {
  cairo: 'القاهرة',
  alexandria: 'الإسكندرية',
  luxor: 'الأقصر',
  aswan: 'أسوان',
  'sharm-el-sheikh': 'شرم الشيخ',
};

export default function AmbassadorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = ambassadors;
    if (selectedCity) {
      result = result.filter((a) => a.city === selectedCity);
    }
    if (selectedRole) {
      result = result.filter((a) => a.role === selectedRole);
    }
    if (searchQuery.trim()) {
      result = searchAmbassadors(searchQuery.trim());
      if (selectedCity) result = result.filter((a) => a.city === selectedCity);
      if (selectedRole) result = result.filter((a) => a.role === selectedRole);
    }
    return result;
  }, [selectedCity, selectedRole, searchQuery]);

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 opacity-[0.03]">
          <svg viewBox="0 0 1440 800" className="w-full h-full">
            <path d="M0 400 Q 200 200 400 400 T 800 400 T 1200 400 T 1440 400" stroke="var(--gold)" strokeWidth="1" fill="none" />
            <path d="M0 500 Q 200 300 400 500 T 800 500 T 1200 500 T 1440 500" stroke="var(--gold)" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>
        <div className="relative z-10 w-full container-mobile pt-20 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-theme-gold/30 text-theme-gold text-xs font-semibold mb-6">
              <HiUserGroup className="w-4 h-4" />
              {ambassadors.length} مرشد
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-playfair text-theme leading-tight mb-6">
            مرشدونا <span className="text-theme-gold">الخبراء</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-theme/70 mb-10 max-w-2xl font-cairo">
            نخبة من المرشدين المحليين والخبراء في جميع أنحاء مصر لمرافقتك في رحلتك.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl">
            <div className="relative flex-1">
              <HiSearch className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن مرشد..."
                className="w-full h-14 pl-5 pr-12 rounded-xl bg-theme-card border border-theme text-theme placeholder:text-theme-muted focus:outline-none focus:border-theme-gold transition-all duration-200 font-cairo" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-wrap gap-3 mt-8">
            <button onClick={() => setSelectedCity(null)}
              className={`px-4 py-2 rounded-full text-sm font-cairo font-medium transition-all duration-200 ${
                !selectedCity ? 'bg-theme-gold text-dark-900' : 'bg-theme-card border border-theme text-theme/70 hover:text-theme-gold hover:border-theme-gold/40'
              }`}>الكل</button>
            {cities.map((city) => (
              <button key={city} onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-full text-sm font-cairo font-medium transition-all duration-200 ${
                  selectedCity === city ? 'bg-theme-gold text-dark-900' : 'bg-theme-card border border-theme text-theme/70 hover:text-theme-gold hover:border-theme-gold/40'
                }`}>{cityLabels[city] || city}</button>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-wrap gap-3 mt-4">
            {roles.map((role) => (
              <button key={role} onClick={() => setSelectedRole(role)}
                className={`px-3 py-1.5 rounded-lg text-xs font-cairo font-medium transition-all duration-200 ${
                  selectedRole === role ? 'bg-theme-gold/20 text-theme-gold border border-theme-gold/30' : 'bg-theme-surface text-theme-muted border border-theme hover:text-theme-gold hover:border-theme-gold/20'
                }`}>{role}</button>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent z-10" />
      </section>

      <section className="py-24 bg-theme-bg">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-3 font-poppins">{filtered.length} مرشد</p>
              <h2 className="text-4xl md:text-5xl font-bold font-playfair text-theme">اختر <span className="text-theme-gold">مرشدك</span></h2>
              <p className="text-theme-secondary mt-3 font-cairo max-w-xl">تعرف على خبراء مصر المحليين واختر من يرافقك.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((amb, idx) => (
              <motion.div key={amb.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.05 }}>
                <Link href={`/ambassadors/${amb.id}`}
                  className="group block rounded-2xl overflow-hidden border border-theme-gold/20 bg-theme-card transition-all duration-350 ease-out-expo hover:-translate-y-1 hover:shadow-[0_12px_40px_var(--gold-glow)]">
                  <div className="relative p-6 pb-4">
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-theme-gold to-accent-amber p-[2px]">
                          <div className="w-full h-full rounded-full bg-theme-surface flex items-center justify-center overflow-hidden">
                            <span className="text-2xl font-bold text-theme-gold font-playfair">{amb.name.charAt(0)}</span>
                          </div>
                        </div>
                        {amb.verified && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-theme-gold flex items-center justify-center">
                            <HiBadgeCheck className="w-3 h-3 text-dark-900" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold font-playfair text-theme group-hover:text-theme-gold transition-colors truncate">{amb.name}</h3>
                        <p className="text-xs text-theme-gold font-cairo mt-0.5">{amb.role}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <HiLocationMarker className="w-3.5 h-3.5 text-theme-muted" />
                          <span className="text-xs text-theme-muted font-cairo">{cityLabels[amb.city] || amb.city}</span>
                          <div className="flex items-center gap-1 mr-auto">
                            <HiStar className="w-3.5 h-3.5 text-accent-amber" />
                            <span className="text-xs text-accent-amber font-bold font-english">{amb.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {amb.specialties.slice(0, 3).map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-md text-[10px] bg-theme-gold/10 text-theme-gold font-cairo">{s}</span>
                      ))}
                      {amb.specialties.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] bg-theme-surface text-theme-muted font-cairo">+{amb.specialties.length - 3}</span>
                      )}
                    </div>
                  </div>
                  <div className="px-6 pb-4 flex items-center justify-between border-t border-theme-gold/10 pt-3">
                    <div className="flex items-center gap-2 text-xs text-theme-muted font-cairo">
                      <span>{amb.languages.slice(0, 2).join(' - ')}{amb.languages.length > 2 ? ' +' + (amb.languages.length - 2) : ''}</span>
                    </div>
                    <span className="text-xs text-theme-gold font-cairo group-hover:underline">عرض الملف الشخصي</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-theme-secondary text-lg font-cairo">لا يوجد مرشدون يطابقون بحثك</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCity(null); setSelectedRole(null); }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-theme-gold hover:bg-theme-gold/80 text-dark-900 font-bold transition-all duration-200 font-cairo">
                إعادة ضبط
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
