'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getAllAmbassadors, getAmbassadorStats } from '@/lib/network/ambassadorEngine';

export default function AmbassadorDashboardPage() {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('الكل');
  const [sortBy, setSortBy] = useState<'rating' | 'conversions' | 'referrals'>('conversions');

  const ambassadors = useMemo(() => getAllAmbassadors(), []);
  const stats = useMemo(() => getAmbassadorStats(), []);
  const cities = useMemo(() => ['الكل', ...Object.keys(stats.byCity)], [stats]);

  const filtered = useMemo(() => {
    let list = ambassadors;
    if (cityFilter !== 'الكل') list = list.filter(a => a.city === cityFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(a => a.name.toLowerCase().includes(q) || a.nameEn.toLowerCase().includes(q) || a.city.toLowerCase().includes(q));
    }
    return [...list].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'conversions') return b.totalConversions - a.totalConversions;
      return b.totalReferrals - a.totalReferrals;
    });
  }, [ambassadors, cityFilter, search, sortBy]);

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-theme mb-2">سفراء مصر هب</h1>
              <p className="text-theme-secondary font-cairo">شبكة السفراء الرقمية — قيادة التوصيات السياحية في مصر</p>
            </div>
            <Link href="/admin/network" className="px-5 py-2.5 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm hover:shadow-gold-glow transition-all">
              لوحة الأدمن
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'إجمالي السفراء', value: stats.total, icon: '🎓' },
              { label: 'موثق', value: stats.totalVerified, icon: '✅' },
              { label: 'متوسط التقييم', value: stats.avgRating.toFixed(1), icon: '⭐' },
              { label: 'مدن', value: Object.keys(stats.byCity).length, icon: '📍' },
            ].map((card, i) => (
              <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-theme-gold/15 bg-theme-card p-5 shadow-gold-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{card.icon}</span>
                </div>
                <p className="text-2xl font-bold text-theme font-english">{card.value}</p>
                <p className="text-sm text-theme-secondary font-cairo">{card.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="rounded-2xl border border-theme-gold/15 bg-theme-card overflow-hidden shadow-gold-border mb-8">
            <div className="p-5 border-b border-theme-gold/10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h2 className="text-lg font-bold text-theme font-cairo">قائمة السفراء</h2>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="بحث..."
                    className="w-full md:w-48 bg-theme-surface border border-theme-gold/10 rounded-xl px-4 py-2 text-sm text-theme placeholder-theme-muted font-cairo outline-none focus:border-theme-gold/30" />
                  <select value={cityFilter} onChange={e => setCityFilter(e.target.value)}
                    className="bg-theme-surface border border-theme-gold/10 rounded-xl px-4 py-2 text-sm text-theme font-cairo outline-none focus:border-theme-gold/30">
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
                    className="bg-theme-surface border border-theme-gold/10 rounded-xl px-4 py-2 text-sm text-theme font-cairo outline-none focus:border-theme-gold/30">
                    <option value="conversions">تحويلات</option>
                    <option value="rating">تقييم</option>
                    <option value="referrals">إحالات</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="divide-y divide-theme-gold/10">
              {filtered.map((amb, i) => (
                <motion.div key={amb.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                  className="p-4 hover:bg-theme-gold/5 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-theme-gold/10 border border-theme-gold/20 flex items-center justify-center text-theme-gold font-bold font-cairo shrink-0">
                      {amb.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-theme font-cairo truncate">{amb.name}</h3>
                        {amb.verified && <span className="text-emerald-400 text-xs">✓</span>}
                        <span className="text-[10px] text-theme-muted font-cairo">@{amb.nameEn}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-[10px] text-theme-secondary font-cairo">{amb.city}</span>
                        <span className="flex items-center gap-0.5 text-[10px] text-theme-gold font-english">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--gold)"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>
                          {amb.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-center">
                      <div>
                        <p className="text-sm font-bold text-theme font-english">{amb.totalConversions}</p>
                        <p className="text-[9px] text-theme-muted font-cairo">تحويل</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-theme font-english">{amb.totalReferrals}</p>
                        <p className="text-[9px] text-theme-muted font-cairo">إحالة</p>
                      </div>
                      <div className="hidden md:block">
                        <p className="text-sm font-bold text-theme font-english">{amb.totalLeads}</p>
                        <p className="text-[9px] text-theme-muted font-cairo">عميل</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {filtered.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-theme-muted font-cairo">لا يوجد سفراء</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(stats.byCity).map(([city, count], i) => (
              <motion.div key={city} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="rounded-xl border border-theme-gold/10 bg-theme-surface p-4 hover:border-theme-gold/20 transition-all">
                <p className="text-xs text-theme-muted font-cairo mb-1">{city}</p>
                <p className="text-lg font-bold text-theme font-english">{count}</p>
                <p className="text-[10px] text-theme-secondary font-cairo">سفير</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
