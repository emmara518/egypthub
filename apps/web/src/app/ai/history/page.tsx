'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChat, HiCalendar, HiClock, HiTrash, HiLocationMarker } from 'react-icons/hi';

const initialTrips = [
  { title: 'رحلة شرم الشيخ', date: '١٥ مارس ٢٠٢٦', days: 5, status: 'مخطط لها', city: 'شرم الشيخ', msgs: 24 },
  { title: 'رحلة الأقصر وأسوان', date: '٢٨ يناير ٢٠٢٦', days: 7, status: 'مكتملة', city: 'الأقصر', msgs: 38 },
  { title: 'عطلة الغردقة', date: '١٠ ديسمبر ٢٠٢٥', days: 4, status: 'مكتملة', city: 'الغردقة', msgs: 15 },
  { title: 'سفاري سيوة', date: '٥ نوفمبر ٢٠٢٥', days: 3, status: 'مكتملة', city: 'سيوة', msgs: 42 },
];

const savedPlans = [
  { title: 'جولة القاهرة التاريخية', city: 'القاهرة', days: 3, saved: 'منذ أسبوع' },
  { title: 'رحلة دهب للغوص', city: 'دهب', days: 5, saved: 'منذ أسبوعين' },
];

export default function AIHistoryPage() {
  const [trips] = useState(initialTrips);
  const [activeTab, setActiveTab] = useState<'trips' | 'plans'>('trips');

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[900px] mx-auto px-4 lg:px-6 py-8">
        <Link href="/ai" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo mb-6">
          <HiChevronLeft className="w-4 h-4" />
          العودة
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-theme mb-2">رحلاتي</h1>
          <p className="text-sm text-theme-muted font-cairo">الرحلات السابقة والخطط المحفوظة والحجوزات</p>
        </motion.div>

        <div className="flex gap-2 mb-6">
          {([{ key: 'trips', label: 'الرحلات' }, { key: 'plans', label: 'الخطط المحفوظة' }] as const).map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold font-cairo transition-all ${
                activeTab === tab.key ? 'bg-theme-gold text-dark-900 shadow-gold-glow' : 'bg-theme-surface border border-theme-gold/10 text-theme-secondary hover:text-theme'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'trips' ? (
          <div className="space-y-3">
            {trips.map((trip, i) => (
              <motion.div key={trip.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-theme-gold/10 bg-theme-card p-4 hover:border-theme-gold/20 hover:shadow-gold-border transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-theme font-cairo">{trip.title}</h3>
                    <p className="text-xs text-theme-muted font-cairo mt-1">{trip.city} · {trip.days} أيام</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-cairo ${
                    trip.status === 'مخطط لها' ? 'bg-theme-gold/10 text-theme-gold' : 'bg-emerald-500/10 text-emerald-400'
                  }`}>{trip.status}</span>
                </div>
                <div className="flex items-center gap-4 mt-3 text-[10px] text-theme-muted font-cairo">
                  <span className="flex items-center gap-1"><HiCalendar className="w-3 h-3" />{trip.date}</span>
                  <span className="flex items-center gap-1"><HiChat className="w-3 h-3" />{trip.msgs} رسالة</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Link href="/ai/chat" className="px-4 py-1.5 rounded-lg bg-theme-gold/10 text-theme-gold border border-theme-gold/20 text-[10px] font-bold font-cairo hover:bg-theme-gold/20 transition-all">
                    استئناف المحادثة
                  </Link>
                  <button className="px-4 py-1.5 rounded-lg bg-theme-surface border border-theme-gold/10 text-theme-muted text-[10px] font-cairo hover:text-red-400 transition-all">
                    حذف
                  </button>
                </div>
              </motion.div>
            ))}
            {trips.length === 0 && (
              <div className="text-center py-16">
                <p className="text-theme-muted font-cairo mb-4">لا توجد رحلات بعد</p>
                <Link href="/ai/planner" className="px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm">
                  ابدأ رحلة جديدة
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {savedPlans.map((plan, i) => (
              <motion.div key={plan.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-theme-gold/10 bg-theme-card p-4 hover:border-theme-gold/20 hover:shadow-gold-border transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-theme font-cairo">{plan.title}</h3>
                    <p className="text-xs text-theme-muted font-cairo mt-1">{plan.city} · {plan.days} أيام</p>
                  </div>
                  <span className="text-[10px] text-theme-muted font-cairo">{plan.saved}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Link href="/ai/planner" className="px-4 py-1.5 rounded-lg bg-theme-gold/10 text-theme-gold border border-theme-gold/20 text-[10px] font-bold font-cairo hover:bg-theme-gold/20 transition-all">
                    تعديل الخطة
                  </Link>
                  <Link href="/ai/chat" className="px-4 py-1.5 rounded-lg bg-theme-surface border border-theme-gold/10 text-theme-muted text-[10px] font-cairo hover:text-theme transition-all">
                    اسأل زينب
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
