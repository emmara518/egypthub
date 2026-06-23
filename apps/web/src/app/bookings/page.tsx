'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiCalendar, HiClock, HiChevronLeft, HiChevronRight, HiCreditCard, HiCheck, HiMap, HiDownload, HiEye, HiUser } from 'react-icons/hi';

/* ───── Mock Data ───── */
const bookingHistory = [
  { id: 'EH-4521', title: 'مغامرة الغوص في البحر الأحمر', date: '15 يناير 2025', duration: 'يوم كامل', price: 5900, guests: '2 بالغين + 1 طفل', status: 'مؤكد', image: '/egypthub/images/activities/diving.svg', tickets: true },
  { id: 'EH-4520', title: 'جولة في معبد الأقصر', date: '18 يناير 2025', duration: 'نصف يوم', price: 2200, guests: '2 بالغين', status: 'قادم', image: '/egypthub/images/destinations/sharm-el-sheikh.svg', tickets: false },
  { id: 'EH-4519', title: 'رحلة نيلية أسوان - الأقصر', date: '25 يناير 2025', duration: '5 أيام / 4 ليالٍ', price: 8500, guests: '2 بالغين', status: 'مؤكد', image: '/egypthub/images/luxury/four-seasons.svg', tickets: true },
  { id: 'EH-4518', title: 'رحلة سفاري في الصحراء', date: '02 فبراير 2025', duration: 'يوم كامل', price: 4100, guests: '2 بالغين', status: 'قيد المراجعة', image: '/egypthub/images/activities/desert-safari.svg', tickets: false },
  { id: 'EH-4517', title: 'رحلة غوص في الغردقة', date: '10 فبراير 2025', duration: 'نصف يوم', price: 3500, guests: '3 بالغين', status: 'مؤكد', image: '/egypthub/images/activities/diving.svg', tickets: true },
];

export default function BookingHistoryPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredBookings = activeTab === 'all' ? bookingHistory : bookingHistory.filter(b => b.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مؤكد': return 'bg-green-500/15 text-green-400';
      case 'قادم': return 'bg-theme-gold/15 text-theme-gold';
      case 'قيد المراجعة': return 'bg-blue-500/15 text-blue-400';
      default: return 'bg-theme-elevated text-theme-muted';
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg pt-24" dir="rtl">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8">
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
                  {[{ val: '8', label: 'رحلة' }, { val: '14', label: 'تقييم' }, { val: '5', label: 'مفضلة' }].map(s => (
                    <div key={s.label} className="bg-theme-surface rounded-xl p-2 text-center">
                      <p className="text-lg font-bold text-theme-gold font-english">{s.val}</p>
                      <p className="text-[9px] text-theme-muted font-cairo">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-4 space-y-0.5">
                {[
                  { id: 'all', label: 'جميع الحجوزات' },
                  { id: 'مؤكد', label: 'المؤكدة' },
                  { id: 'قادم', label: 'القادمة' },
                  { id: 'قيد المراجعة', label: 'قيد المراجعة' },
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
                { id: 'all', label: 'جميع' },
                { id: 'مؤكد', label: 'المؤكدة' },
                { id: 'قادم', label: 'القادمة' },
                { id: 'قيد المراجعة', label: 'قيد المراجعة' },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-cairo whitespace-nowrap transition-all ${
                    activeTab === tab.id ? 'bg-theme-gold/10 text-theme-gold border border-theme-gold/20' : 'bg-theme-card text-theme-secondary border border-theme-border'
                  }`}>
                  {tab.label}
                </button>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-end justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold font-playfair text-theme">حجزاتي</h1>
                <p className="text-sm text-theme-secondary font-cairo mt-1">جميع رحلاتك في مكان واحد</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-xl border border-theme-border text-theme-secondary text-sm font-cairo hover:bg-theme-elevated transition-all">
                  تصدير PDF
                </button>
                <button className="px-4 py-2 rounded-xl bg-theme-gold hover:bg-theme-gold/80 text-dark-900 text-sm font-cairo font-bold transition-all">
                  حجز جديد
                </button>
              </div>
            </motion.div>

            <div className="space-y-4">
              {filteredBookings.map((booking, idx) => (
                <motion.div key={booking.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                  whileHover={{ x: -3 }} className="rounded-2xl border border-theme-gold/20 bg-theme-card overflow-hidden hover:shadow-[0_12px_40px_var(--gold-glow)] transition-all">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-48 h-48 md:h-auto overflow-hidden">
                      <img src={booking.image} alt={booking.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${getStatusColor(booking.status)}`}>{booking.status}</span>
                      </div>
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-theme text-lg font-cairo mb-1">{booking.title}</h3>
                        </div>
                        <Link href="#" className="text-theme-gold text-sm font-cairo hover:underline">
                          عرض التفاصيل
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-theme-muted font-cairo mb-0.5">التاريخ</p>
                          <p className="text-sm text-theme font-cairo">{booking.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-theme-muted font-cairo mb-0.5">المدة</p>
                          <p className="text-sm text-theme font-cairo">{booking.duration}</p>
                        </div>
                        <div>
                          <p className="text-xs text-theme-muted font-cairo mb-0.5">المسافرون</p>
                          <p className="text-sm text-theme font-cairo">{booking.guests}</p>
                        </div>
                        <div>
                          <p className="text-xs text-theme-muted font-cairo mb-0.5">السعر</p>
                          <p className="text-sm font-bold text-theme-gold font-english">EGP {booking.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {booking.tickets && (
                          <button className="px-3 py-1.5 rounded-lg border border-theme-gold/30 text-theme-gold text-xs font-cairo hover:bg-theme-gold/5 transition-all flex items-center gap-1">
                            <HiDownload className="text-xs" /> تنزيل التذكرة
                          </button>
                        )}
                        <button className="px-3 py-1.5 rounded-lg border border-theme-border text-theme-secondary text-xs font-cairo hover:bg-theme-elevated transition-all flex items-center gap-1">
                          <HiEye className="text-xs" /> عرض الفاتورة
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredBookings.length === 0 && (
              <div className="text-center py-20">
                <p className="text-theme-secondary text-lg font-cairo mb-2">لا توجد حجوزات تطابق بحثك</p>
                <p className="text-theme-muted text-sm font-cairo mb-6">ابدأ رحلتك القادمة اليوم!</p>
                <Link href="/booking" className="inline-block px-6 py-3 rounded-xl bg-theme-gold hover:bg-theme-gold/80 text-dark-900 font-bold text-sm font-cairo transition-all">
                  احجز الآن
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
