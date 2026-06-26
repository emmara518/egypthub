'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  confirmed: { label: 'مؤكد', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' },
  pending: { label: 'قيد الانتظار', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20' },
  completed: { label: 'مكتمل', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
  cancelled: { label: 'ملغي', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20' },
};

const mockBookings = [
  {
    id: 'EH-4821',
    name: 'غوص البحر الأحمر',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
    date: '15 فبراير 2025',
    time: '09:00 صباحاً',
    status: 'confirmed',
    price: 1800,
    guests: 2,
    location: 'شرم الشيخ',
  },
  {
    id: 'EH-4756',
    name: 'جولة الأهرامات الخاصة',
    image: 'https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=400&h=300&fit=crop',
    date: '22 فبراير 2025',
    time: '08:00 صباحاً',
    status: 'pending',
    price: 2400,
    guests: 4,
    location: 'الجيزة',
  },
  {
    id: 'EH-4690',
    name: 'رحلة نيلية في الأقصر',
    image: 'https://images.unsplash.com/photo-1568322503122-d21b1d9c8e04?w=400&h=300&fit=crop',
    date: '10 يناير 2025',
    time: '16:00 عصراً',
    status: 'completed',
    price: 1200,
    guests: 2,
    location: 'الأقصر',
  },
  {
    id: 'EH-4612',
    name: ' safari في وادي الريان',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&h=300&fit=crop',
    date: '5 يناير 2025',
    time: '07:00 صباحاً',
    status: 'cancelled',
    price: 950,
    guests: 3,
    location: 'الفيوم',
  },
  {
    id: 'EH-4588',
    name: 'تجربة طعام مصري تقليدي',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
    date: '28 ديسمبر 2024',
    time: '19:00 مساءً',
    status: 'completed',
    price: 650,
    guests: 2,
    location: 'القاهرة',
  },
];

const tabs = [
  { id: 'all', label: 'الكل' },
  { id: 'upcoming', label: 'قادمة' },
  { id: 'completed', label: 'مكتملة' },
  { id: 'cancelled', label: 'ملغاة' },
];

export default function BookingHistoryPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = mockBookings.filter(b => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return b.status === 'confirmed' || b.status === 'pending';
    if (activeTab === 'completed') return b.status === 'completed';
    if (activeTab === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#080C18] pt-24">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-[#D4A24C] hover:text-[#D4A24C]/80 transition-colors text-sm font-cairo mb-6">
          <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          العودة للرئيسية
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white font-playfair">سجل الحجوزات</h1>
          <p className="text-[#5A6478] font-cairo mt-1">تتبع جميع حجوزاتك ورحلاتك</p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-cairo whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#D4A24C]/10 text-[#D4A24C] border border-[#D4A24C]/20 font-medium'
                  : 'bg-[#141B2D] text-[#8B95A5] border border-[#1E2A3D] hover:text-white hover:border-[#D4A24C]/10'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="text-center py-20">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#D4A24C]/8 border border-[#D4A24C]/15 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#D4A24C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white font-cairo mb-2">لا توجد حجوزات</h3>
              <p className="text-sm text-[#5A6478] font-cairo mb-6">لم تقم بأي حجوزات بعد. ابدأ رحلتك الآن!</p>
              <Link href="/experiences"
                className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-l from-[#D4A24C] to-[#C89A3D] text-[#080C18] text-sm font-cairo font-bold">
                استكشف التجارب
              </Link>
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-4">
              {filtered.map((booking, idx) => {
                const st = statusConfig[booking.status];
                const isExpanded = expandedId === booking.id;
                return (
                  <motion.div key={booking.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                    className="rounded-2xl border border-[#D4A24C]/10 bg-[#141B2D] overflow-hidden hover:border-[#D4A24C]/20 transition-all">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-48 h-40 sm:h-auto shrink-0">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${booking.image})` }} />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#141B2D]/60 hidden sm:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141B2D] to-transparent sm:hidden" />
                      </div>
                      <div className="flex-1 p-4 sm:p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold text-[#D4A24C] font-english">{booking.id}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-cairo border ${st.bg} ${st.color}`}>
                                {st.label}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-white font-cairo">{booking.name}</h3>
                          </div>
                          <span className="text-lg font-bold text-[#D4A24C] font-english shrink-0">EGP {booking.price.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-[#8B95A5] font-cairo mb-3">
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-[#D4A24C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {booking.date} • {booking.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-[#D4A24C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {booking.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-[#D4A24C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            {booking.guests} أشخاص
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/booking/details`}
                            className="px-4 py-2 rounded-lg bg-[#D4A24C]/10 text-[#D4A24C] text-xs font-cairo font-medium hover:bg-[#D4A24C]/20 transition-all">
                            عرض التفاصيل
                          </Link>
                          <button onClick={() => setExpandedId(isExpanded ? null : booking.id)}
                            className="px-4 py-2 rounded-lg border border-[#1E2A3D] text-[#8B95A5] text-xs font-cairo hover:text-white hover:border-[#D4A24C]/20 transition-all">
                            {isExpanded ? 'إخفاء' : 'المزيد'}
                          </button>
                        </div>
                      </div>
                    </div>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="border-t border-[#1E2A3D] overflow-hidden">
                          <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                              { label: 'رقم الحجز', val: booking.id },
                              { label: 'عدد الأشخاص', val: `${booking.guests} أشخاص` },
                              { label: 'الموقع', val: booking.location },
                              { label: 'الحالة', val: st.label },
                            ].map(item => (
                              <div key={item.label} className="bg-[#0F1420] rounded-xl p-3 text-center">
                                <p className="text-[10px] text-[#5A6478] font-cairo mb-1">{item.label}</p>
                                <p className="text-sm font-bold text-white font-cairo">{item.val}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 text-center">
          <p className="text-xs text-[#5A6478] font-cairo">إجمالي الحجوزات: <span className="text-[#D4A24C] font-english font-bold">{filtered.length}</span></p>
        </div>
      </div>
    </div>
  );
}
