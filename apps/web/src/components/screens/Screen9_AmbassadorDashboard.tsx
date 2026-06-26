'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiChartBar, HiUsers, HiCash, HiEye, HiStar, HiTrendingUp,
  HiCog, HiBell, HiPhotograph, HiGlobe, HiLocationMarker,
  HiCalendar, HiClock, HiUser, HiPencil, HiPlus, HiSearch,
  HiCreditCard, HiCheckCircle, HiChat, HiShare, HiBookmark,
} from 'react-icons/hi';
import Image from 'next/image';

/* ───── Data ───── */
const kpis = [
  { label: 'الإيرادات', value: 'EGP 2,450', change: '+28%', icon: HiCash },
  { label: 'الحجوزات', value: '1,248', change: '+12%', icon: HiCalendar },
  { label: 'العملاء', value: '864', change: '+8%', icon: HiUsers },
  { label: 'معدل التحويل', value: '4.6%', change: '+5%', icon: HiTrendingUp },
];

const performanceMetrics = [
  { label: 'الإيرادات الشهرية', value: '28.6%', icon: HiTrendingUp, color: 'text-green-400' },
  { label: 'متوسط وقت الاستجابة', value: '04:35', icon: HiClock, color: 'text-theme-gold' },
  { label: 'عدد المراجعات', value: '3.42', icon: HiStar, color: 'text-blue-400' },
  { label: 'نسبة الرضا', value: '62.4%', icon: HiCheckCircle, color: 'text-purple-400' },
];

const networkStats = [
  { label: 'إجمالي الإحالات', value: 'EGP 2,450,000', change: '+24%' },
  { label: 'العملاء النشطون', value: '1,248', change: '+18%' },
  { label: 'الإيرادات الشهرية', value: 'EGP 194', change: '+5%' },
];

const recentActivities = [
  { action: 'حجز جديد #EH-4521', user: 'أحمد محمد', time: '08:30' },
  { action: 'تحديث عرض سفاري', user: 'سارة علي', time: '09:15' },
  { action: 'رد على مراجعة', user: 'محمد حسن', time: '10:00' },
];

const referrals = [
  { name: 'سارة أحمد', status: 'نشط', earnings: 'EGP 450', img: '/images/destinations/cairo.svg' },
  { name: 'محمد علي', status: 'جديد', earnings: 'EGP 120', img: '/images/destinations/luxor.svg' },
  { name: 'فاطمة حسن', status: 'نشط', earnings: 'EGP 780', img: '/images/destinations/sharm-el-sheikh.svg' },
];

const notifications = [
  { text: 'عميل جديد أسند عبر رابطك', time: 'منذ 5 دقائق', type: 'success' },
  { text: 'عرض خاص: خصم 20% على رحلات النيل', time: 'منذ ساعة', type: 'offer' },
  { text: 'تذكير: رحلتك بعد 3 أيام', time: 'منذ 3 ساعات', type: 'reminder' },
];

const offers = [
  { title: 'رحلة سفاري في الصحراء', price: 'EGP 1,200', bookings: 145, rating: 4.8, img: '/images/activities/desert-safari.svg' },
  { title: 'جولة معبد الكرنك', price: 'EGP 450', bookings: 230, rating: 4.9, img: '/images/destinations/sharm-el-sheikh.svg' },
  { title: 'غوص البحر الأحمر', price: 'EGP 800', bookings: 98, rating: 4.7, img: '/images/activities/diving.svg' },
];

const testimonials = [
  { name: 'أحمد محمد', stars: 5, text: 'تجربة رائعة مع السفيرة! كانت جداً متعاونة ومحترفة', date: 'منذ يومين' },
  { name: 'سارة علي', stars: 4, text: 'نسّقت لنا رحلة مميزة في الأقصر. أنصح بالتعامل معها', date: 'منذ أسبوع' },
];

const socialAccounts = [
  { name: 'Google', connected: true },
  { name: 'Facebook', connected: true },
  { name: 'Instagram', connected: false },
];

const sidebarItems = [
  { icon: HiChartBar, label: 'لوحة التحكم' },
  { icon: HiUsers, label: 'الشبكة والإحالات' },
  { icon: HiCash, label: 'الإيرادات والمدفوعات' },
  { icon: HiStar, label: 'التقييمات والمراجعات' },
  { icon: HiTrendingUp, label: 'الأداء والتحليلات' },
  { icon: HiCog, label: 'الإعدادات' },
  { icon: HiBell, label: 'الإشعارات' },
];

/* ───── Component ───── */
export default function Screen9_AmbassadorDashboard() {
  const [activeSidebar, setActiveSidebar] = useState(0);
  const [rating, setRating] = useState(0);

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white font-arabic">
      <div className="flex">
        {/* ─── Sidebar ─── */}
        <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          className="w-56 shrink-0 min-h-screen bg-[#0F1420] border-l border-[#1E2A3D] p-4">
          <div className="mb-6">
            <span className="text-[10px] font-english text-theme-gold font-bold block mb-1">لوحة تحكم السفراء</span>
            <h2 className="text-lg font-bold mb-0.5">لوحة تحكم السفراء</h2>
            <p className="text-[10px] text-[#5A6478] font-english">Ambassador Dashboard</p>
          </div>

          {/* Ambassador Avatar */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#141B2D] border border-[#1E2A3D] mb-4">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-theme-gold to-accent-orange flex items-center justify-center">
              <span className="text-[#0A0E17] font-bold text-sm">س</span>
            </div>
            <div>
              <p className="text-xs font-bold font-english">EGYPTHUB</p>
              <p className="text-[9px] text-[#5A6478]">سفير نشط</p>
            </div>
          </div>

          <nav className="space-y-0.5">
            {sidebarItems.map((item, i) => (
              <button key={i} onClick={() => setActiveSidebar(i)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  activeSidebar === i ? 'bg-theme-gold/10 text-theme-gold font-medium' : 'text-[#8B95A5] hover:text-white hover:bg-[#1A2235]'
                }`}>
                <item.icon className="text-base" />
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-6 p-3 rounded-xl bg-theme-gold/5 border border-theme-gold/15">
            <p className="text-[10px] text-theme-gold font-bold mb-1">Ambassador Portal</p>
            <p className="text-[9px] text-[#5A6478]">إدارة الشبكة والإحالات</p>
          </div>
        </motion.aside>

        {/* ─── Main Content ─── */}
        <div className="flex-1 min-w-0 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">

            {/* 01 - KPIs (full width) */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="xl:col-span-3 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">01</span>
                <h3 className="font-bold text-sm">لوحة تحكم</h3>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((kpi, i) => (
                  <motion.div key={i} whileHover={{ y: -3 }}
                    className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-4 hover:border-theme-gold/20 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <kpi.icon className="text-xl text-theme-gold" />
                      <span className="text-[10px] text-green-400 font-english font-bold">{kpi.change}</span>
                    </div>
                    <p className="text-xl font-bold font-english">{kpi.value}</p>
                    <p className="text-[10px] text-[#5A6478]">{kpi.label}</p>
                  </motion.div>
                ))}
              </div>
              {/* Revenue Chart */}
              <div className="mt-4 bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-4">
                <p className="text-xs text-[#8B95A5] mb-3">الإيرادات — آخر 7 أيام</p>
                <div className="flex items-end gap-2 h-20">
                  {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-theme-gold to-theme-gold/40 hover:from-accent-orange transition-colors cursor-pointer" />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 02 - Performance Metrics */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="xl:col-span-2 bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">02</span>
                <h3 className="font-bold text-sm">أداء السفير</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {performanceMetrics.map((m, i) => (
                  <div key={i} className="bg-[#0F1420] rounded-xl p-3 border border-[#1E2A3D]">
                    <div className="flex items-center gap-2 mb-2">
                      <m.icon className={`text-sm ${m.color}`} />
                      <span className="text-[10px] text-[#5A6478]">{m.label}</span>
                    </div>
                    <p className="text-lg font-bold font-english">{m.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 03 - Network Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">03</span>
                <h3 className="font-bold text-sm">الشبكة</h3>
              </div>
              <div className="space-y-3">
                {networkStats.map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#0F1420] border border-[#1E2A3D]">
                    <div>
                      <p className="text-xs">{s.label}</p>
                      <p className="text-[9px] text-[#5A6478]">{s.change}</p>
                    </div>
                    <p className="text-sm font-bold text-theme-gold font-english">{s.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 04 - Statistics */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">04</span>
                <h3 className="font-bold text-sm">إحصائيات</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'إجمالي الإيرادات', val: 'EGP 2,450,000' },
                  { label: 'العملاء النشطون', val: '1,248' },
                  { label: 'الإيرادات الشهرية', val: 'EGP 194' },
                ].map((s, i) => (
                  <div key={i} className="bg-[#0F1420] rounded-xl p-3 border border-[#1E2A3D] text-center">
                    <p className="text-sm font-bold text-theme-gold font-english">{s.val}</p>
                    <p className="text-[9px] text-[#5A6478]">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 05 - Profile */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">05</span>
                <h3 className="font-bold text-sm">الملف الشخصي</h3>
              </div>
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-theme-gold to-accent-orange p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#1A2235] flex items-center justify-center">
                      <HiUser className="text-3xl text-theme-gold" />
                    </div>
                  </div>
                  <button className="absolute -bottom-1 -left-1 w-7 h-7 rounded-full bg-theme-gold flex items-center justify-center">
                    <HiPencil className="text-[#0A0E17] text-xs" />
                  </button>
                </div>
                <h4 className="font-bold text-lg">سارة أحمد</h4>
                <p className="text-[10px] text-[#5A6478] mb-3">سفير نشط منذ 2024</p>
                <div className="grid grid-cols-3 gap-2">
                  {[{ val: '24', label: 'رحلة' }, { val: '14', label: 'تقييم' }, { val: '8', label: 'مفضلة' }].map(s => (
                    <div key={s.label} className="bg-[#0F1420] rounded-xl p-2.5 text-center">
                      <p className="text-lg font-bold text-theme-gold font-english">{s.val}</p>
                      <p className="text-[9px] text-[#5A6478]">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 06 - Quick Actions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">06</span>
                <h3 className="font-bold text-sm">الإجراءات السريعة</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: HiPlus, label: 'إضافة إحالة' },
                  { icon: HiShare, label: 'مشاركة رابط' },
                  { icon: HiChat, label: 'التواصل' },
                  { icon: HiBookmark, label: 'العروض' },
                ].map((a, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#0F1420] border border-[#1E2A3D] hover:border-theme-gold/30 transition-all">
                    <a.icon className="text-xl text-theme-gold" />
                    <span className="text-[10px] text-[#8B95A5]">{a.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* 07 - Detailed Performance */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="xl:col-span-2 bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">07</span>
                <h3 className="font-bold text-sm">الأداء التفصيلي</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[{ label: 'الإيرادات', val: 'EGP 8.45M' }, { label: 'الحجوزات', val: '3,245' }, { label: 'العملاء', val: 'EGP 2,603' }].map(s => (
                  <div key={s.label} className="bg-[#0F1420] rounded-xl p-3 text-center">
                    <p className="text-sm font-bold text-theme-gold font-english">{s.val}</p>
                    <p className="text-[9px] text-[#5A6478]">{s.label}</p>
                  </div>
                ))}
              </div>
              {/* Line Chart */}
              <div className="pt-4 border-t border-[#1E2A3D]">
                <p className="text-[10px] text-[#5A6478] mb-2">اتجاه الأداء الشهري</p>
                <svg viewBox="0 0 300 60" className="w-full h-16">
                  <polyline fill="none" stroke="#E9C46A" strokeWidth="2" points="0,50 40,40 80,45 120,25 160,30 200,15 240,20 280,10 300,12" />
                  <polyline fill="url(#goldGrad2)" stroke="none" points="0,60 0,50 40,40 80,45 120,25 160,30 200,15 240,20 280,10 300,12 300,60" opacity="0.1" />
                  <defs><linearGradient id="goldGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E9C46A" /><stop offset="100%" stopColor="transparent" /></linearGradient></defs>
                </svg>
              </div>
            </motion.div>

            {/* 08 - Notifications */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">08</span>
                <h3 className="font-bold text-sm">الإشعارات</h3>
              </div>
              <div className="space-y-2">
                {notifications.map((n, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#0F1420] border border-[#1E2A3D]">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.type === 'success' ? 'bg-green-400' : n.type === 'offer' ? 'bg-theme-gold' : 'bg-blue-400'}`} />
                    <div>
                      <p className="text-xs">{n.text}</p>
                      <p className="text-[9px] text-[#5A6478] mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 09 - Offers & Experiences */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">09</span>
                <h3 className="font-bold text-sm">العروض والتجارب</h3>
              </div>
              <div className="space-y-2">
                {offers.map((o, i) => (
                  <motion.div key={i} whileHover={{ x: -3 }} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0F1420] border border-[#1E2A3D] hover:border-theme-gold/20 transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 relative">
                      <Image src={o.img} alt={o.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{o.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-theme-gold font-english">{o.price}</span>
                        <span className="text-[9px] text-[#5A6478]">• {o.bookings} حجز</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <HiStar className="text-theme-gold text-xs" />
                      <span className="text-[10px] text-[#8B95A5] font-english">{o.rating}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 10 - Testimonials */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">10</span>
                <h3 className="font-bold text-sm">الشهادات والتقييمات</h3>
              </div>
              <div className="space-y-3">
                {testimonials.map((t, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#0F1420] border border-[#1E2A3D]">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold">{t.name}</p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <HiStar key={s} className={`text-xs ${s < t.stars ? 'text-theme-gold' : 'text-[#1A2235]'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] text-[#8B95A5]">{t.text}</p>
                    <p className="text-[9px] text-[#5A6478] mt-1">{t.date}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 11 - Social Network */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">11</span>
                <h3 className="font-bold text-sm">الشبكة الاجتماعية</h3>
              </div>
              <div className="space-y-2">
                {socialAccounts.map((acc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#0F1420] border border-[#1E2A3D]">
                    <div className="flex items-center gap-3">
                      <HiGlobe className="text-theme-gold" />
                      <span className="text-xs font-english">{acc.name}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${acc.connected ? 'bg-green-500/15 text-green-400' : 'bg-[#1A2235] text-[#5A6478]'}`}>
                      {acc.connected ? 'متصل' : 'ربط'}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 12 - Referrals */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">12</span>
                <h3 className="font-bold text-sm">الإحالات</h3>
              </div>
              <div className="space-y-2">
                {referrals.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0F1420] border border-[#1E2A3D]">
                    <div className="w-9 h-9 rounded-full bg-[#1A2235] flex items-center justify-center overflow-hidden shrink-0 relative">
                      <Image src={r.img} alt={r.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold">{r.name}</p>
                      <p className="text-[9px] text-[#5A6478]">{r.status}</p>
                    </div>
                    <span className="text-xs text-theme-gold font-english">{r.earnings}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 13 - Payment Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">13</span>
                <h3 className="font-bold text-sm">معلومات الدفع</h3>
              </div>
              <div className="space-y-2">
                {[
                  { method: 'تحويل بنكي', amount: 'EGP 15,400', status: 'مكتمل' },
                  { method: 'بطاقة ائتمان', amount: 'EGP 8,200', status: 'قيد المعالجة' },
                  { method: 'محفظة إلكترونية', amount: 'EGP 3,600', status: 'مكتمل' },
                ].map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-[#0F1420] border border-[#1E2A3D]">
                    <div className="flex items-center gap-2">
                      <HiCreditCard className="text-theme-gold" />
                      <div>
                        <p className="text-xs">{p.method}</p>
                        <p className="text-[10px] text-theme-gold font-english">{p.amount}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${p.status === 'مكتمل' ? 'bg-green-500/15 text-green-400' : 'bg-yellow-500/15 text-yellow-400'}`}>{p.status}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 14 - Network Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
              className="xl:col-span-2 bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">14</span>
                <h3 className="font-bold text-sm">ملخص الشبكة</h3>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[{ label: 'إجمالي الإحالات', val: 'EGP 2,450,000' }, { label: 'العملاء النشطون', val: '1,248' }, { label: 'الإيرادات الشهرية', val: 'EGP 194' }].map(s => (
                  <div key={s.label} className="bg-[#0F1420] rounded-xl p-3 text-center">
                    <p className="text-sm font-bold text-theme-gold font-english">{s.val}</p>
                    <p className="text-[9px] text-[#5A6478]">{s.label}</p>
                  </div>
                ))}
              </div>
              {/* Performance Bar */}
              <div className="bg-[#0F1420] rounded-xl p-4 border border-[#1E2A3D]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#8B95A5]">نسبة الإنجاز الشهرية</span>
                  <span className="text-xs font-bold text-theme-gold font-english">87%</span>
                </div>
                <div className="h-2 bg-[#1A2235] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '87%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-l from-theme-gold to-accent-orange rounded-full" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
