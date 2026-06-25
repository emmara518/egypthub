'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MOCK_BOOKINGS as bookingHistory, MOCK_USER } from '@/lib/mock-data';

export default function BookingHistoryPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredBookings = activeTab === 'all' ? bookingHistory : bookingHistory.filter(b => b.status === activeTab);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'مؤكد': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20';
      case 'قادم': return 'bg-amber-500/15 text-amber-400 border-amber-500/20';
      case 'قيد المراجعة': return 'bg-red-500/15 text-red-400 border-red-500/20';
      default: return 'bg-white/5 text-white/40 border-white/10';
    }
  };

  const tabs = [
    { id: 'all', label: 'جميع الحجوزات' },
    { id: 'مؤكد', label: 'المؤكدة' },
    { id: 'قادم', label: 'القادمة' },
    { id: 'قيد المراجعة', label: 'قيد المراجعة' },
  ];

  return (
    <div className="min-h-screen bg-[#080C18] pt-24" dir="ltr">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-[#D4A24C] hover:text-[#D4A24C]/80 transition-colors text-sm font-cairo mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          العودة للرئيسية
        </Link>

        <div className="flex gap-6">
          {/* Sidebar */}
          <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl border border-[#D4A24C]/10 bg-[#0F1525] p-5 text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4A24C] to-[#C89A3D] p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#0F1525] flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                  </div>
                </div>
                <h2 className="font-bold text-lg font-playfair text-white">{MOCK_USER.name}</h2>
                <p className="text-xs text-white/40 font-cairo mb-4">{MOCK_USER.title}</p>
                <div className="grid grid-cols-3 gap-2">
                  {[{ val: String(MOCK_USER.stats.trips), label: 'رحلة' }, { val: String(MOCK_USER.stats.reviews), label: 'تقييم' }, { val: String(MOCK_USER.stats.favorites), label: 'مفضلة' }].map(s => (
                    <div key={s.label} className="bg-[#141B2D] rounded-xl p-2 text-center">
                      <p className="text-lg font-bold text-[#D4A24C] font-english">{s.val}</p>
                      <p className="text-[9px] text-white/40 font-cairo">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-[#D4A24C]/10 bg-[#0F1525] p-4 space-y-0.5">
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-right px-3 py-2.5 rounded-lg text-sm transition-all ${
                      activeTab === tab.id ? 'bg-[#D4A24C]/10 text-[#D4A24C] font-medium' : 'text-white/50 hover:text-white hover:bg-[#141B2D]'
                    }`}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Tabs */}
            <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-cairo whitespace-nowrap transition-all ${
                    activeTab === tab.id ? 'bg-[#D4A24C]/10 text-[#D4A24C] border border-[#D4A24C]/20' : 'bg-[#0F1525] text-white/60 border border-white/[0.06]'
                  }`}>
                  {tab.label}
                </button>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-end justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold font-playfair text-white">حجزاتي</h1>
                <p className="text-sm text-white/50 font-cairo mt-1">جميع رحلاتك في مكان واحد</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-xl border border-white/10 text-white/50 text-sm font-cairo hover:bg-[#141B2D] transition-all">
                  تصدير PDF
                </button>
                <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4A24C] to-[#C89A3D] text-[#080C18] text-sm font-cairo font-bold transition-all hover:shadow-[0_4px_15px_rgba(212,162,76,0.3)]">
                  حجز جديد
                </button>
              </div>
            </motion.div>

            <div className="space-y-4">
              {filteredBookings.map((booking, idx) => (
                <motion.div key={booking.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                  className="rounded-2xl border border-white/[0.06] bg-[#0F1525] overflow-hidden hover:border-[#D4A24C]/15 transition-all">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-48 h-48 md:h-auto overflow-hidden">
                      <Image src={booking.image} alt={booking.title} fill className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080C18]/60 to-transparent md:bg-gradient-to-r" />
                      <div className="absolute top-3 right-3 md:top-auto md:bottom-3 md:right-3">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${getStatusBadge(booking.status)}`}>{booking.status}</span>
                      </div>
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-white text-lg font-cairo mb-1">{booking.title}</h3>
                          <p className="text-[10px] text-white/30 font-english">#{booking.id}</p>
                        </div>
                        <Link href="#" className="text-[#D4A24C] text-sm font-cairo hover:underline">
                          عرض التفاصيل
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-[10px] text-white/30 font-cairo mb-0.5">التاريخ</p>
                          <p className="text-sm text-white font-cairo">{booking.date}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-white/30 font-cairo mb-0.5">المدة</p>
                          <p className="text-sm text-white font-cairo">{booking.duration}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-white/30 font-cairo mb-0.5">المسافرون</p>
                          <p className="text-sm text-white font-cairo">{booking.guests}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-white/30 font-cairo mb-0.5">السعر</p>
                          <p className="text-sm font-bold text-[#D4A24C] font-english">EGP {booking.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {booking.tickets && (
                          <button className="px-3 py-1.5 rounded-lg border border-[#D4A24C]/30 text-[#D4A24C] text-xs font-cairo hover:bg-[#D4A24C]/5 transition-all flex items-center gap-1.5">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            تنزيل التذكرة
                          </button>
                        )}
                        <button className="px-3 py-1.5 rounded-lg border border-white/10 text-white/50 text-xs font-cairo hover:bg-[#141B2D] transition-all flex items-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          عرض الفاتورة
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredBookings.length === 0 && (
              <div className="text-center py-20">
                <svg className="w-16 h-16 mx-auto mb-4 text-white/15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <p className="text-white/50 text-lg font-cairo mb-2">لا توجد حجوزات تطابق بحثك</p>
                <p className="text-white/30 text-sm font-cairo mb-6">ابدأ رحلتك القادمة اليوم!</p>
                <Link href="/booking" className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4A24C] to-[#C89A3D] text-[#080C18] font-bold text-sm font-cairo transition-all hover:shadow-[0_4px_15px_rgba(212,162,76,0.3)]">
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
