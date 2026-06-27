'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const months = ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

const mockRevenue = [450000, 520000, 480000, 610000, 720000, 890000, 950000, 870000, 780000, 920000, 1050000, 1200000];
const mockUsers = [1200, 1450, 1320, 1680, 2100, 2450, 2800, 2600, 2350, 3100, 3600, 4200];
const mockBookings30 = [45, 52, 38, 65, 71, 58, 82, 77, 63, 55, 48, 92, 88, 74, 69, 81, 95, 102, 87, 76, 64, 58, 73, 85, 91, 78, 66, 59, 84, 97];

const topExperiences = [
  { name: 'رحلة نيلية بالقاهرة', bookings: 342, revenue: 684000, rating: 4.8, city: 'القاهرة' },
  { name: 'غطس في البحر الأحمر', bookings: 287, revenue: 574000, rating: 4.9, city: 'الغردقة' },
  { name: 'جولة في الأهرامات', bookings: 256, revenue: 512000, rating: 4.7, city: 'الجيزة' },
  { name: 'سفاري صحراء مرسى علم', bookings: 198, revenue: 396000, rating: 4.6, city: 'مرسى علم' },
  { name: 'زيارة معبد الكرنك', bookings: 175, revenue: 350000, rating: 4.8, city: 'الأقصر' },
  { name: 'رحلة بالمنطاد فوق الأقصر', bookings: 143, revenue: 429000, rating: 4.9, city: 'الأقصر' },
  { name: 'جولة سياحية بالإسكندرية', bookings: 128, revenue: 192000, rating: 4.5, city: 'الإسكندرية' },
  { name: 'تسلق جبل موسى', bookings: 112, revenue: 224000, rating: 4.7, city: 'دهب' },
];

const categoryPerformance = [
  { category: 'فنادق', bookings: 1250, revenue: 2500000, growth: 12 },
  { category: 'رحلات', bookings: 980, revenue: 1960000, growth: 18 },
  { category: 'مطاعم', bookings: 720, revenue: 720000, growth: -3 },
  { category: 'أنشطة', bookings: 540, revenue: 1080000, growth: 25 },
  { category: 'نقل', bookings: 310, revenue: 465000, growth: 7 },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const totalRevenue = mockRevenue.reduce((a, b) => a + b, 0);
  const totalBookings = mockBookings30.reduce((a, b) => a + b, 0);
  const totalUsersMock = mockUsers[mockUsers.length - 1];
  const totalExperiences = 156;
  const conversionRate = 3.42;

  const maxRevenue = Math.max(...mockRevenue);
  const maxBookings = Math.max(...mockBookings30);
  const maxUsers = Math.max(...mockUsers);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={itemVariants} className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-1">التحليلات</h1>
          <p className="text-sm text-theme-muted font-cairo">إحصائيات وأداء المنصة</p>
        </div>
        <div className="flex items-center gap-2">
          {(['7d', '30d', '90d', '1y'] as const).map(r => (
            <button key={r} onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-cairo transition-all ${
                range === r ? 'bg-theme-gold text-dark-900' : 'border border-theme-gold/20 text-theme-gold hover:bg-theme-gold/10'
              }`}>
              {r === '7d' ? 'أسبوع' : r === '30d' ? 'شهر' : r === '90d' ? '٣ أشهر' : 'سنة'}
            </button>
          ))}
          <button className="px-3 py-1.5 rounded-lg border border-theme-gold/20 text-theme-gold text-xs font-bold font-cairo hover:bg-theme-gold/10 transition-all">
            تصدير
          </button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'الإيرادات', value: `${totalRevenue.toLocaleString('ar-EG')} ج.م`, icon: '💰', color: 'from-emerald-500 to-emerald-600' },
          { label: 'الحجوزات', value: totalBookings.toLocaleString('ar-EG'), icon: '📋', color: 'from-blue-500 to-blue-600' },
          { label: 'المستخدمين', value: totalUsersMock.toLocaleString('ar-EG'), icon: '👥', color: 'from-purple-500 to-purple-600' },
          { label: 'التجارب', value: totalExperiences.toLocaleString('ar-EG'), icon: '🎯', color: 'from-amber-500 to-amber-600' },
          { label: 'معدل التحويل', value: `${conversionRate}%`, icon: '📈', color: 'from-rose-500 to-rose-600' },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-4 hover:border-theme-gold/25 transition-all">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <span className="text-white text-lg">{s.icon}</span>
            </div>
            <p className="text-lg md:text-2xl font-bold font-playfair text-theme mb-0.5">{s.value}</p>
            <p className="text-xs text-theme-muted font-cairo">{s.label}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <h2 className="text-sm font-bold font-cairo text-theme mb-4">الإيرادات الشهرية</h2>
          <div className="flex items-end gap-1.5 h-40">
            {mockRevenue.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div initial={{ height: 0 }} animate={{ height: `${(v / maxRevenue) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.03 }}
                  className="w-full rounded-t-md bg-gradient-to-t from-theme-gold/40 to-theme-gold/80 hover:opacity-80 cursor-pointer" />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {months.map((m, i) => (
              <span key={i} className="text-[8px] text-theme-muted font-cairo -rotate-45 origin-left">{i % 2 === 0 ? m : ''}</span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <h2 className="text-sm font-bold font-cairo text-theme mb-4">الحجوزات (آخر 30 يوم)</h2>
          <div className="flex items-end gap-0.5 h-40">
            {mockBookings30.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <motion.div initial={{ height: 0 }} animate={{ height: `${(v / maxBookings) * 100}%` }}
                  transition={{ duration: 0.4, delay: i * 0.01 }}
                  className="w-full rounded-sm bg-gradient-to-t from-blue-500/40 to-blue-500/80 hover:opacity-80 cursor-pointer" />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[8px] text-theme-muted font-cairo">اليوم 1</span>
            <span className="text-[8px] text-theme-muted font-cairo">اليوم 15</span>
            <span className="text-[8px] text-theme-muted font-cairo">اليوم 30</span>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
        <h2 className="text-sm font-bold font-cairo text-theme mb-4">نمو المستخدمين</h2>
        <div className="flex items-end gap-1.5 h-32">
          {mockUsers.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[8px] text-theme-muted font-english">{v}</span>
              <motion.div initial={{ height: 0 }} animate={{ height: `${(v / maxUsers) * 100}%` }}
                transition={{ duration: 0.5, delay: i * 0.03 }}
                className="w-full rounded-t-md bg-gradient-to-t from-purple-500/40 to-purple-500/80" />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {months.map((m, i) => (
            <span key={i} className="text-[8px] text-theme-muted font-cairo">{m}</span>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold font-cairo text-theme">أفضل التجارب أداءً</h2>
            <span className="text-[10px] text-theme-muted font-cairo">{topExperiences.length} تجربة</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-theme-gold/10 text-theme-muted text-[11px] font-cairo">
                  <th className="pb-3 px-2 font-medium">#</th>
                  <th className="pb-3 px-2 font-medium">التجربة</th>
                  <th className="pb-3 px-2 font-medium">المدينة</th>
                  <th className="pb-3 px-2 font-medium">الحجوزات</th>
                  <th className="pb-3 px-2 font-medium">الإيرادات</th>
                  <th className="pb-3 px-2 font-medium">التقييم</th>
                </tr>
              </thead>
              <tbody>
                {topExperiences.map((exp, i) => (
                  <tr key={i} className="border-b border-theme-gold/5 hover:bg-theme-gold/5 transition-colors">
                    <td className="py-3 px-2 text-xs text-theme-muted font-english">{i + 1}</td>
                    <td className="py-3 px-2 text-sm text-theme font-cairo">{exp.name}</td>
                    <td className="py-3 px-2 text-xs text-theme-secondary font-cairo">{exp.city}</td>
                    <td className="py-3 px-2 text-xs text-theme font-english">{exp.bookings}</td>
                    <td className="py-3 px-2 text-xs text-theme font-english">{exp.revenue.toLocaleString('ar-EG')} ج.م</td>
                    <td className="py-3 px-2">
                      <span className="flex items-center gap-1 text-xs text-amber-400">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        {exp.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
          <h2 className="text-sm font-bold font-cairo text-theme mb-4">أداء التصنيفات</h2>
          <div className="space-y-3">
            {categoryPerformance.map((cat, i) => {
              const maxRev = Math.max(...categoryPerformance.map(c => c.revenue));
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-theme font-cairo">{cat.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-theme-muted font-english">{cat.bookings} حجز</span>
                      <span className={`text-[10px] font-english ${cat.growth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {cat.growth >= 0 ? '+' : ''}{cat.growth}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-theme-surface overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(cat.revenue / maxRev) * 100}%` }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                      className="h-full rounded-full bg-gradient-to-l from-theme-gold/80 to-theme-gold/40" />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="rounded-2xl border border-theme-gold/10 bg-theme-card p-5">
        <h2 className="text-sm font-bold font-cairo text-theme mb-4">ملخص الأداء الشهري</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'متوسط الإيرادات الشهري', value: `${(totalRevenue / 12).toLocaleString('ar-EG')} ج.م`, icon: '📊', color: 'from-blue-500 to-blue-600', sub: '+١٥٪ عن الشهر الماضي' },
            { label: 'متوسط الحجوزات الشهري', value: Math.round(totalBookings / 12).toLocaleString('ar-EG'), icon: '📋', color: 'from-emerald-500 to-emerald-600', sub: '+٨٪ عن الشهر الماضي' },
            { label: 'أفضل شهر', value: 'يوليو', icon: '🏆', color: 'from-amber-500 to-amber-600', sub: `${mockRevenue[6].toLocaleString('ar-EG')} ج.م` },
            { label: 'نسبة نمو المستخدمين', value: '+٢٥٠٪', icon: '📈', color: 'from-purple-500 to-purple-600', sub: 'مقارنة بنفس الفترة من العام الماضي' },
          ].map((s, i) => (
            <div key={i} className="rounded-xl bg-theme-surface border border-theme-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                  <span className="text-white text-sm">{s.icon}</span>
                </div>
              </div>
              <p className="text-lg font-bold font-playfair text-theme mb-0.5">{s.value}</p>
              <p className="text-[10px] text-theme-muted font-cairo">{s.label}</p>
              <p className="text-[9px] text-emerald-400 font-cairo mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
