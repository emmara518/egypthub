'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCalendar, HiClock, HiChevronLeft, HiCreditCard, HiCheck, HiChevronRight, HiCurrencyDollar, HiUser, HiHeart, HiBookmark, HiStar, HiQrcode, HiLocationMarker, HiChevronDown } from 'react-icons/hi';

/* ───── Mock Data ───── */
const bookingDetails = {
  bookingId: 'EH-4521',
  title: 'مغامرة الغوص في البحر الأحمر',
  subtitle: 'Explore the Coral Reefs',
  image: '/egypthub/images/activities/diving.svg',
  dates: ['15 يناير 2025', '16 يناير 2025'],
  time: '09:00 صباحاً',
  duration: 'يوم كامل',
  location: 'شرم الشيخ',
  status: 'مؤكد',
  statusColor: 'bg-green-500/15 text-green-400',
  travelers: [
    { name: 'أحمد محمد', age: 30, type: 'بالغ' },
    { name: 'سارة أحمد', age: 28, type: 'بالغة' },
    { name: 'ليلى حسن', age: 8, type: 'طفل' },
  ],
  price: 5900,
  currency: 'EGP',
  paymentMethod: 'بطاقة ائتمان (تمت)',
};

export default function BookingDetailsPage() {
  const [activeTab, setActiveTab] = useState('details');

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
              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
                <span className="text-[10px] font-bold text-theme-gold block mb-2 font-english">المرحلة 7</span>
                <h1 className="text-lg font-bold font-playfair text-theme mb-1">تفاصيل الحجز</h1>
                <p className="text-theme-secondary text-xs font-cairo mb-3">عرض وتعديل تفاصيل الحجز</p>
                <div className="flex gap-2 flex-wrap">
                  {['الرحلة', 'المسافرون', 'الدفع', 'التذاكرة', 'الإلغاء'].map(f => (
                    <span key={f} className="flex items-center gap-1 text-[9px] text-theme-muted">
                      <div className="w-1 h-1 rounded-full bg-theme-gold" />{f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-4 space-y-0.5">
                {[
                  { id: 'details', label: 'التفاصيل' },
                  { id: 'itinerary', label: 'جدول الرحلة' },
                  { id: 'travelers', label: 'بيانات المسافرين' },
                  { id: 'payment', label: 'المدفوعات' },
                  { id: 'tickets', label: 'التذاكر الرقمية' },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-right px-3 py-2 rounded-lg text-sm transition-all ${
                      activeTab === tab.id ? 'bg-theme-gold/10 text-theme-gold font-medium' : 'text-theme-secondary hover:text-theme hover:bg-theme-elevated'
                    }`}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === 'details' && (
                <motion.div key="details" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold font-playfair text-theme mb-2">تفاصيل الحجز</h2>
                      <p className="text-sm text-theme-secondary font-cairo">EH-4521 • {bookingDetails.title}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${bookingDetails.statusColor}`}>{bookingDetails.status}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-xs text-theme-muted font-cairo mb-2">تفاصيل الرحلة</p>
                      <div className="bg-theme-surface rounded-xl p-4 border border-theme-border space-y-3">
                        <div className="flex items-center gap-3">
                          <HiCalendar className="text-theme-gold" />
                          <div>
                            <p className="text-xs text-theme-muted font-cairo">التواريخ</p>
                            <p className="text-sm text-theme font-cairo font-medium">{bookingDetails.dates.join(' → ')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <HiClock className="text-theme-gold" />
                          <div>
                            <p className="text-xs text-theme-muted font-cairo">الوقت</p>
                            <p className="text-sm text-theme font-cairo font-medium">{bookingDetails.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <HiLocationMarker className="text-theme-gold" />
                          <div>
                            <p className="text-xs text-theme-muted font-cairo">الموقع</p>
                            <p className="text-sm text-theme font-cairo font-medium">{bookingDetails.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <HiClock className="text-theme-gold" />
                          <div>
                            <p className="text-xs text-theme-muted font-cairo">المدة</p>
                            <p className="text-sm text-theme font-cairo font-medium">{bookingDetails.duration}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-theme-muted font-cairo mb-2">بيانات المسافرين</p>
                      <div className="bg-theme-surface rounded-xl p-4 border border-theme-border space-y-3">
                        {bookingDetails.travelers.map((t, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-theme-gold/15 flex items-center justify-center">
                              <HiUser className="text-theme-gold text-sm" />
                            </div>
                            <div>
                              <p className="text-sm text-theme font-cairo font-medium">{t.name}</p>
                              <p className="text-xs text-theme-muted font-cairo">{t.age} سنة • {t.type}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-theme-gold/5 rounded-xl p-4 border border-theme-gold/15 mb-6">
                    <p className="text-xs text-theme-muted font-cairo mb-1">المبلغ المدفوع</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xl font-bold text-theme font-cairo">{bookingDetails.title}</p>
                        <p className="text-xs text-theme-muted font-cairo mt-1">EGP {bookingDetails.price.toLocaleString()} × {bookingDetails.travelers.length} شخص</p>
                      </div>
                      <p className="text-2xl font-bold text-theme-gold font-english">EGP {bookingDetails.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 rounded-xl border border-theme-gold/30 text-theme-gold font-cairo font-medium hover:bg-theme-gold/5 transition-all">
                      تعديل الحجز
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold font-cairo hover:opacity-90 transition-all">
                      تأكيد والدفع
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'itinerary' && (
                <motion.div key="itinerary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 lg:p-8">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">02</span>
                  <h2 className="text-xl font-bold font-playfair text-theme mb-6">جدول الرحلة</h2>
                  <div className="relative pr-5">
                    {[0, 1, 2, 3].map((step, i) => (
                      <div key={i} className="flex gap-4 relative pb-8 last:pb-0">
                        <div className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full z-10 ${i === 0 ? 'bg-theme-gold animate-pulse' : 'bg-theme-elevated border border-theme-border'}`} />
                          {i < 3 && (<div className={`w-0.5 flex-1 mt-1 ${i === 0 ? 'bg-theme-gold/30' : 'bg-theme-border'}`} />)}
                        </div>
                        <div className="pb-2">
                          <span className="text-[10px] text-theme-muted font-english">{['09:00', '14:00', '19:00', '23:00'][i]}</span>
                          <p className={`text-sm font-cairo ${i === 0 ? 'text-theme-gold font-bold' : 'text-theme-secondary'}`}>{['الوصول إلى شرم الشيخ', 'الغوص الأول', 'الغذاء والاسترخاء', 'العودة'][i]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'travelers' && (
                <motion.div key="travelers" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 lg:p-8">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">03</span>
                  <h2 className="text-xl font-bold font-playfair text-theme mb-6">بيانات المسافرين</h2>
                  <div className="space-y-3">
                    {bookingDetails.travelers.map((t, i) => (
                      <motion.div key={i} whileHover={{ x: -3 }} className="flex items-center justify-between p-4 rounded-xl bg-theme-surface border border-theme hover:border-theme-gold/20 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-theme-gold to-accent-amber flex items-center justify-center">
                            <HiUser className="text-dark-900 text-lg" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-theme font-cairo">{t.name}</p>
                            <p className="text-xs text-theme-muted font-cairo">{t.age} سنة • {t.type}</p>
                          </div>
                        </div>
                        <button className="text-xs text-theme-gold font-cairo hover:underline">تعديل</button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'payment' && (
                <motion.div key="payment" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 lg:p-8">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">04</span>
                  <h2 className="text-xl font-bold font-playfair text-theme mb-6">المدفوعات</h2>
                  <div className="space-y-4">
                    {[
                      { type: 'بطاقة ائتمان', icon: '💳', number: '**** **** **** 4521', expiry: '12/28', holder: 'أحمد محمد', status: 'مؤكد' },
                      { type: 'محفظة إلكترونية', icon: '📱', number: '0123 4567 8910', expiry: '', holder: 'أحمد محمد', status: 'أساسي' },
                    ].map((p, i) => (
                      <motion.div key={i} whileHover={{ x: -3 }} className="flex items-center justify-between p-4 rounded-xl bg-theme-surface border border-theme hover:border-theme-gold/20 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-theme-surface border border-theme flex items-center justify-center text-theme-gold text-lg">
                            {p.icon}
                          </div>
                          <div>
                            <p className="font-bold text-theme text-sm font-cairo">{p.type}</p>
                            <p className="text-xs text-theme-muted font-english">{p.number}</p>
                            {p.holder && (<p className="text-xs text-theme-muted font-cairo mt-0.5">{p.holder}</p>)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${p.status === 'مؤكد' ? 'bg-green-500/15 text-green-400' : 'bg-theme-gold/15 text-theme-gold'}`}>{p.status}</span>
                          <button className="text-theme-muted hover:text-theme-gold transition-colors">
                            <HiChevronDown className="text-xs" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'tickets' && (
                <motion.div key="tickets" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 lg:p-8">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">05</span>
                  <h2 className="text-xl font-bold font-playfair text-theme mb-6">التذاكر الرقمية</h2>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="relative">
                      <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                        className="w-16 h-16 rounded bg-gradient-to-br from-theme-gold to-accent-amber flex items-center justify-center">
                        <span className="text-dark-900 font-bold text-lg">م</span>
                      </motion.div>
                    </div>
                    <div>
                      <p className="font-bold text-theme text-lg font-cairo">EH-4521-SAFARI</p>
                      <p className="text-sm text-theme-muted font-english">QR Code</p>
                    </div>
                  </div>
                  <div className="bg-theme-surface rounded-xl p-4 border border-theme-border text-center mb-6">
                    <p className="text-[10px] text-theme-muted font-cairo mb-2">امسح الكود عند نقطة الدخول</p>
                    <div className="w-28 h-28 mx-auto bg-white rounded-xl p-2">
                      <div className="w-full h-full grid grid-cols-7 gap-0.5">
                        {Array.from({ length: 49 }).map((_, i) => (
                          <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-[#0A0E17]' : 'bg-white'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold font-cairo hover:opacity-90 transition-all">
                    تحميل التذكرة (PDF)
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
