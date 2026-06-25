'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiCheckCircle, HiLocationMarker, HiCalendar, HiClock,
  HiUser, HiQrcode, HiShare, HiDownload, HiChevronRight,
  HiStar,
} from 'react-icons/hi';

const mockBooking = {
  id: 'EH-4521',
  title: 'مغامرة الغوص في البحر الأحمر',
  subtitle: 'Explore the Coral Reefs',
  date: '15 يناير 2025',
  time: '09:00 صباحاً',
  location: 'شرم الشيخ',
  travelers: '2 بالغين + 1 طفل',
  duration: 'يوم كامل',
  price: 5900,
  image: '/egypthub/images/activities/diving.svg',
  status: 'مؤكد',
  qrCode: 'EH-4521-SAFARI',
  timeline: [
    { time: '09:00', label: 'نقطة الانطلاق', status: 'done' as const },
    { time: '10:30', label: 'ركوب الجمال', status: 'done' as const },
    { time: '12:00', label: 'وقفة تصوير', status: 'current' as const },
    { time: '14:00', label: 'عشاء بدوي', status: 'upcoming' as const },
    { time: '17:00', label: 'مراقبة الغروب', status: 'upcoming' as const },
  ],
  loyalty: {
    points: 2450,
    offers: [
      { label: 'خصم 15% على الحجز القادم', pts: '500' },
      { label: 'ترقية VIP مجانية', pts: '1000' },
      { label: 'تجربة مجانية', pts: '2000' },
    ],
  },
};

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-screen bg-theme-bg pt-24" dir="ltr">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/booking" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <HiChevronRight className="w-4 h-4" />
          العودة للحجز
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 lg:p-8 text-center">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 mx-auto rounded-full bg-green-500/15 flex items-center justify-center mb-4">
                <HiCheckCircle className="text-4xl text-green-400" />
              </motion.div>
              <h1 className="text-2xl font-bold font-playfair text-theme mb-2">تم تأكيد حجزك بنجاح!</h1>
              <p className="text-theme-secondary font-cairo text-sm mb-1">رقم الحجز</p>
              <p className="text-3xl font-bold text-theme-gold font-english mb-6">{mockBooking.id}</p>

              <div className="relative rounded-xl overflow-hidden h-48 mb-6">
                <img src={mockBooking.image} alt={mockBooking.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/40 to-transparent" />
                <div className="absolute bottom-3 right-3 text-right">
                  <p className="text-xl font-bold text-theme font-cairo">{mockBooking.title}</p>
                  <p className="text-sm text-theme-gold font-english">{mockBooking.subtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {[
                  { icon: HiCalendar, label: 'التاريخ', val: mockBooking.date },
                  { icon: HiClock, label: 'الوقت', val: mockBooking.time },
                  { icon: HiUser, label: 'المسافرون', val: mockBooking.travelers },
                  { icon: HiLocationMarker, label: 'الموقع', val: mockBooking.location },
                ].map((item, i) => (
                  <div key={i} className="bg-theme-surface rounded-xl p-3 border border-theme-border">
                    <item.icon className="text-theme-gold text-lg mb-1 mx-auto" />
                    <p className="text-xs text-theme-muted font-cairo">{item.label}</p>
                    <p className="text-sm font-bold text-theme font-cairo">{item.val}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-l from-theme-gold/10 to-accent-amber/5 rounded-xl p-4 border border-theme-gold/20 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-theme font-cairo">إجمالي المبلغ</span>
                  <span className="text-2xl font-bold text-theme-gold font-english">EGP {mockBooking.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex-1 py-3 rounded-xl border border-theme-gold/30 text-theme-gold text-sm font-cairo font-bold flex items-center justify-center gap-2 hover:bg-theme-gold/5 transition-all">
                  <HiShare /> مشاركة
                </motion.button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex-1 py-3 rounded-xl border border-theme-gold/30 text-theme-gold text-sm font-cairo font-bold flex items-center justify-center gap-2 hover:bg-theme-gold/5 transition-all">
                  <HiDownload /> تحميل PDF
                </motion.button>
              </div>
            </div>

            <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
              <h2 className="text-lg font-bold font-playfair text-theme mb-4">تتبع الرحلة</h2>
              <div className="relative pr-5">
                {mockBooking.timeline.map((s, i) => (
                  <div key={i} className="flex gap-4 relative pb-6 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full z-10 ${
                        s.status === 'done' ? 'bg-green-400' : s.status === 'current' ? 'bg-theme-gold animate-pulse' : 'bg-theme-elevated border border-theme-border'
                      }`} />
                      {i < mockBooking.timeline.length - 1 && (
                        <div className={`w-0.5 flex-1 mt-1 ${s.status === 'done' ? 'bg-green-400/30' : 'bg-theme-border'}`} />
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-theme-muted font-english">{s.time}</p>
                      <p className={`text-sm font-cairo ${s.status === 'current' ? 'text-theme-gold font-bold' : 'text-theme-secondary'}`}>{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="space-y-6">
            <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 text-center">
              <div className="flex items-center gap-2 justify-center mb-4">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-theme-gold to-accent-amber flex items-center justify-center">
                  <span className="text-xs text-dark-900 font-bold">م</span>
                </div>
                <span className="text-sm font-bold font-english text-theme">EGYPTHUB</span>
              </div>
              <h3 className="font-bold text-theme text-sm font-cairo mb-1">{mockBooking.title}</h3>
              <p className="text-xs text-theme-muted font-cairo mb-4">{mockBooking.date} | {mockBooking.time}</p>
              <div className="w-36 h-36 mx-auto bg-white rounded-xl p-3 mb-4">
                <div className="w-full h-full grid grid-cols-7 gap-0.5">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-[#0A0E17]' : 'bg-white'}`} />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <HiQrcode className="text-theme-gold" />
                <p className="text-xs text-theme-muted font-english font-bold">{mockBooking.qrCode}</p>
              </div>
              <p className="text-[10px] text-theme-muted font-cairo">امسح الكود عند نقطة الدخول</p>
            </div>

            <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 text-center">
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                className="w-14 h-14 mx-auto rounded-full bg-theme-gold/15 flex items-center justify-center mb-3">
                <HiStar className="text-2xl text-theme-gold" />
              </motion.div>
              <h3 className="font-bold text-theme text-sm font-cairo mb-2">نقاط الولاء</h3>
              <p className="text-3xl font-bold text-theme-gold font-english mb-1">{mockBooking.loyalty.points.toLocaleString()}</p>
              <p className="text-xs text-theme-muted font-cairo mb-4">نقطة مكتسبة</p>
              <div className="space-y-2">
                {mockBooking.loyalty.offers.map((offer, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-theme-surface border border-theme-border">
                    <span className="text-xs text-theme font-cairo">{offer.label}</span>
                    <span className="text-[10px] text-theme-gold font-english font-bold">{offer.pts} نقطة</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6">
              <h3 className="font-bold text-theme text-sm font-cairo mb-3">تحتاج مساعدة؟</h3>
              <p className="text-xs text-theme-muted font-cairo mb-4">تواصل مع فريق الدعم الفني على مدار الساعة</p>
              <Link href="/ai-concierge"
                className="w-full py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold text-sm font-cairo text-center block hover:opacity-90 transition-all">
                تحدث مع زينب
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
