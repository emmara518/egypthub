'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiChartBar, HiUsers, HiCash, HiEye, HiCog, HiDocumentText,
  HiClipboardList, HiChat, HiCreditCard, HiCalendar, HiPencil,
  HiTrash, HiPlus, HiSearch, HiFilter, HiTrendingUp, HiStar,
  HiLocationMarker, HiPhotograph, HiClock, HiCheckCircle, HiUser,
  HiChevronLeft,
} from 'react-icons/hi';

/* ───── Data ───── */
const kpis = [
  { label: 'الحجوزات', value: '8,847', change: '+12%', icon: HiClipboardList },
  { label: 'الإيرادات', value: 'EGP 24.5M', change: '+8%', icon: HiCash },
  { label: 'الشركاء', value: '532', change: '+5%', icon: HiUsers },
  { label: 'المشاهدات', value: '24,850', change: '+18%', icon: HiEye },
];

const partnersData = [
  { name: 'فندق النيل ريتز', type: 'فنادق', status: 'نشط', revenue: 'EGP 450K', img: '/egypthub/images/destinations/luxor.svg' },
  { name: 'سفاري مصر', type: 'مغامرات', status: 'نشط', revenue: 'EGP 280K', img: '/egypthub/images/activities/desert-safari.svg' },
  { name: 'رحلات الأقصر', type: 'جولات', status: 'معلق', revenue: 'EGP 180K', img: '/egypthub/images/destinations/sharm-el-sheikh.svg' },
];

const offersData = [
  { title: 'رحلة سفاري في الصحراء', price: 'EGP 1,200', bookings: 145, rating: 4.8, img: '/egypthub/images/activities/desert-safari.svg' },
  { title: 'جولة معبد الكرنك', price: 'EGP 450', bookings: 230, rating: 4.9, img: '/egypthub/images/destinations/sharm-el-sheikh.svg' },
  { title: 'غوص البحر الأحمر', price: 'EGP 800', bookings: 98, rating: 4.7, img: '/egypthub/images/activities/diving.svg' },
];

const bookingsTable = [
  { id: '#EH-4521', guest: 'أحمد محمد', offer: 'رحلة سفاري', date: '15 يناير', amount: 'EGP 1,200', status: 'مؤكد' },
  { id: '#EH-4520', guest: 'سارة علي', offer: 'جولة المعبد', date: '14 يناير', amount: 'EGP 450', status: 'قادم' },
  { id: '#EH-4519', guest: 'محمد حسن', offer: 'غوص', date: '13 يناير', amount: 'EGP 800', status: 'مكتمل' },
];

const teamMembers = [
  { name: 'أحمد محمد', role: 'مدير العمليات', status: 'متصل', email: 'ahmed@egypthub.com' },
  { name: 'سارة علي', role: 'مدير التسويق', status: 'متصل', email: 'sara@egypthub.com' },
  { name: 'محمد حسن', role: 'خدمة العملاء', status: 'غير متصل', email: 'mohamed@egypthub.com' },
];

const activityLog = [
  { action: 'حجز جديد #EH-4521', user: 'أحمد محمد', time: '08:30-2024-01-15' },
  { action: 'تحديث عرض سفاري', user: 'سارة علي', time: '09:15-2024-01-15' },
  { action: 'رد على مراجعة', user: 'محمد حسن', time: '10:00-2024-01-15' },
];

const sidebarItems = [
  { icon: HiChartBar, label: 'لوحة التحكم' },
  { icon: HiUsers, label: 'إدارة الشركاء' },
  { icon: HiClipboardList, label: 'العروض والتجارب' },
  { icon: HiCalendar, label: 'الحجوزات' },
  { icon: HiTrendingUp, label: 'التحليلات' },
  { icon: HiDocumentText, label: 'المحتوى' },
  { icon: HiChat, label: 'الرسائل' },
  { icon: HiCreditCard, label: 'المدفوعات' },
  { icon: HiCog, label: 'الإعدادات' },
];

/* ───── Component ───── */
export default function Screen5_PartnerAdmin() {
  const [activeSidebar, setActiveSidebar] = useState(0);

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white font-arabic" dir="rtl">
      <div className="flex">
        {/* ─── Sidebar ─── */}
        <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          className="w-56 shrink-0 min-h-screen bg-[#0F1420] border-l border-[#1E2A3D] p-4">
          <div className="mb-6">
            <span className="text-[10px] font-english text-theme-gold font-bold block mb-1">المرحلة 6</span>
            <h2 className="text-lg font-bold mb-0.5">شركاء والإدارة</h2>
            <p className="text-[10px] text-[#5A6478] font-english">Partner & Admin Portal</p>
          </div>

          {/* Admin Avatar */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#141B2D] border border-[#1E2A3D] mb-4">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-theme-gold to-accent-orange flex items-center justify-center">
              <span className="text-[#0A0E17] font-bold text-sm">م</span>
            </div>
            <div>
              <p className="text-xs font-bold font-english">EGYPTHUB</p>
              <p className="text-[9px] text-[#5A6478]">مدير النظام</p>
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
            <p className="text-[10px] text-theme-gold font-bold mb-1">Partner Dashboard</p>
            <p className="text-[9px] text-[#5A6478]">إدارة العروض والحجوزات</p>
          </div>

          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="w-full mt-3 py-2 rounded-xl bg-gradient-to-l from-theme-gold to-accent-orange text-[#0A0E17] font-bold text-xs flex items-center justify-center gap-2">
            <HiPlus className="text-sm" /> Create New Offer
          </motion.button>
        </motion.aside>

        {/* ─── Main Content ─── */}
        <div className="flex-1 min-w-0 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">

            {/* 01 - KPIs (full width) */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="xl:col-span-3 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">01</span>
                <h3 className="font-bold text-sm">لوحة التحكم الرئيسية (Admin Dashboard)</h3>
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
              {/* Mini Chart */}
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

            {/* 02 - Partners Management */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5 xl:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">02</span>
                  <h3 className="font-bold text-sm">إدارة الشركاء (Partners Management)</h3>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <HiSearch className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5A6478] text-sm" />
                    <input placeholder="بحث..." className="bg-[#0F1420] rounded-lg pr-8 pl-3 py-1.5 text-[10px] border border-[#1E2A3D] w-32 outline-none focus:border-theme-gold/30 placeholder:text-[#5A6478]" />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#1E2A3D]">
                      <th className="text-right py-2 text-[#5A6478] font-medium">الشريك</th>
                      <th className="text-right py-2 text-[#5A6478] font-medium">النوع</th>
                      <th className="text-right py-2 text-[#5A6478] font-medium">الحالة</th>
                      <th className="text-right py-2 text-[#5A6478] font-medium">الإيرادات</th>
                      <th className="text-right py-2 text-[#5A6478] font-medium">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partnersData.map((p, i) => (
                      <tr key={i} className="border-b border-[#1E2A3D]/50 hover:bg-[#1A2235]/50 transition-colors">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                              <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="font-medium">{p.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-[#8B95A5]">{p.type}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${p.status === 'نشط' ? 'bg-green-500/15 text-green-400' : 'bg-yellow-500/15 text-yellow-400'}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 font-english text-theme-gold">{p.revenue}</td>
                        <td className="py-3">
                          <div className="flex gap-1">
                            <button className="p-1.5 rounded-lg hover:bg-[#1A2235] transition-colors"><HiPencil className="text-[#8B95A5] text-sm" /></button>
                            <button className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"><HiTrash className="text-red-400/50 text-sm" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* 03 - Offers */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">03</span>
                <h3 className="font-bold text-sm">إدارة العروض والتجارب</h3>
              </div>
              <div className="space-y-2">
                {offersData.map((o, i) => (
                  <motion.div key={i} whileHover={{ x: -3 }} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0F1420] border border-[#1E2A3D] hover:border-theme-gold/20 transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <img src={o.img} alt={o.title} className="w-full h-full object-cover" />
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

            {/* 04 - Offer Detail */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] overflow-hidden xl:col-span-2">
              <div className="flex items-center gap-2 p-5 pb-0 mb-3">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">04</span>
                <h3 className="font-bold text-sm">تفاصيل عرض (Offer Details)</h3>
              </div>
              <div className="relative h-40">
                <img src="/egypthub/images/activities/desert-safari.svg" alt="رحلة سفاري" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141B2D] to-transparent" />
                <div className="absolute bottom-3 right-5">
                  <p className="text-lg font-bold">رحلة سفاري في الصحراء</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-theme-gold font-english">EGP 1,200</span>
                    <span className="text-[9px] text-[#5A6478]">• 145 حجز</span>
                    <span className="flex items-center gap-0.5 text-[9px] text-[#8B95A5]"><HiStar className="text-theme-gold" />4.8</span>
                  </div>
                </div>
              </div>
              <div className="p-5 pt-3 grid grid-cols-3 gap-3">
                {[{ label: 'المشاهدات', val: 'EGP 480,200' }, { label: 'الحجوزات', val: '3,400' }, { label: 'التقييم', val: '4.8' }].map(s => (
                  <div key={s.label} className="bg-[#0F1420] rounded-xl p-3 text-center">
                    <p className="text-sm font-bold text-theme-gold font-english">{s.val}</p>
                    <p className="text-[9px] text-[#5A6478]">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 05 - Bookings */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">05</span>
                <h3 className="font-bold text-sm">الحجوزات (Bookings)</h3>
              </div>
              <div className="space-y-2">
                {bookingsTable.map((b, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-[#0F1420] border border-[#1E2A3D]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-[#5A6478] font-english">{b.id}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                        b.status === 'مؤكد' ? 'bg-green-500/15 text-green-400' :
                        b.status === 'مكتمل' ? 'bg-blue-500/15 text-blue-400' :
                        'bg-theme-gold/15 text-theme-gold'
                      }`}>{b.status}</span>
                    </div>
                    <p className="text-xs font-medium">{b.guest} — {b.offer}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[9px] text-[#5A6478]">{b.date}</span>
                      <span className="text-xs text-theme-gold font-english">{b.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 06 - Analytics */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5 xl:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">06</span>
                <h3 className="font-bold text-sm">التحليلات والتقارير (Analytics & Reports)</h3>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[{ label: 'الإيرادات', val: 'EGP 8.45M' }, { label: 'الحجوزات', val: '3,245' }, { label: 'العملاء', val: 'EGP 2,603' }].map(s => (
                  <div key={s.label} className="bg-[#0F1420] rounded-xl p-3 text-center">
                    <p className="text-sm font-bold text-theme-gold font-english">{s.val}</p>
                    <p className="text-[9px] text-[#5A6478]">{s.label}</p>
                  </div>
                ))}
              </div>
              {/* Donut Chart Placeholder */}
              <div className="flex items-center gap-6">
                <div className="w-28 h-28 rounded-full border-[12px] border-theme-gold border-t-[#F4A261] border-l-[#0D3B66] border-b-[#1A2235] relative shrink-0">
                  <div className="absolute inset-3 rounded-full bg-[#141B2D] flex items-center justify-center">
                    <span className="text-xs font-bold font-english text-theme-gold">1,248</span>
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  {[{ label: 'رحلات', color: '#E9C46A', pct: '45%' }, { label: 'فنادق', color: '#F4A261', pct: '30%' }, { label: 'أنشطة', color: '#0D3B66', pct: '15%' }, { label: 'أخرى', color: '#1A2235', pct: '10%' }].map(c => (
                    <div key={c.label} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c.color }} />
                      <span className="text-[10px] text-[#8B95A5] flex-1">{c.label}</span>
                      <span className="text-[10px] text-[#5A6478] font-english">{c.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Line Chart */}
              <div className="mt-4 pt-4 border-t border-[#1E2A3D]">
                <p className="text-[10px] text-[#5A6478] mb-2">اتجاه الحجوزات الشهري</p>
                <svg viewBox="0 0 300 60" className="w-full h-16">
                  <polyline fill="none" stroke="#E9C46A" strokeWidth="2" points="0,50 40,40 80,45 120,25 160,30 200,15 240,20 280,10 300,12" />
                  <polyline fill="url(#goldGrad)" stroke="none" points="0,60 0,50 40,40 80,45 120,25 160,30 200,15 240,20 280,10 300,12 300,60" opacity="0.1" />
                  <defs><linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E9C46A" /><stop offset="100%" stopColor="transparent" /></linearGradient></defs>
                </svg>
              </div>
            </motion.div>

            {/* 07 - CMS */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">07</span>
                <h3 className="font-bold text-sm">إدارة المحتوى (CMS)</h3>
              </div>
              <div className="space-y-2">
                {[{ title: 'مقال: أفضل 10 أماكن', status: 'منشور', views: '2,603' }, { title: 'دليل: نصائح السفر', status: 'مسودة', views: '—' }, { title: 'حملة: عروض الشتاء', status: 'مجدول', views: '—' }].map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-[#0F1420] border border-[#1E2A3D]">
                    <div>
                      <p className="text-xs font-medium">{c.title}</p>
                      <p className="text-[9px] text-[#5A6478]">مشاهدات: {c.views}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                      c.status === 'منشور' ? 'bg-green-500/15 text-green-400' :
                      c.status === 'مسودة' ? 'bg-[#1A2235] text-[#5A6478]' :
                      'bg-blue-500/15 text-blue-400'
                    }`}>{c.status}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 08 - Team */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">08</span>
                <h3 className="font-bold text-sm">إدارة المستخدمين (Team)</h3>
              </div>
              <div className="space-y-2">
                {teamMembers.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0F1420] border border-[#1E2A3D]">
                    <div className="w-9 h-9 rounded-full bg-[#1A2235] flex items-center justify-center">
                      <HiUser className="text-[#8B95A5]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold">{m.name}</p>
                      <p className="text-[9px] text-[#5A6478]">{m.role}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${m.status === 'متصل' ? 'bg-green-400' : 'bg-[#5A6478]'}`} />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 09 - Messages */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">09</span>
                <h3 className="font-bold text-sm">الرسائل والإشعارات</h3>
              </div>
              <div className="space-y-2">
                {[{ from: 'أحمد محمد', msg: 'استفسار عن حجز رحلة سفاري...', time: 'منذ 5 دقائق', unread: true },
                  { from: 'سارة علي', msg: 'تم تحديث العرض الجديد', time: 'منذ ساعة', unread: false },
                  { from: 'محمد حسن', msg: 'مراجعة جديدة على رحلة النيل', time: 'منذ 3 ساعات', unread: false }].map((m, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl border transition-colors cursor-pointer ${m.unread ? 'bg-theme-gold/5 border-theme-gold/15' : 'bg-[#0F1420] border-[#1E2A3D]'}`}>
                    <div className="w-8 h-8 rounded-full bg-[#1A2235] flex items-center justify-center shrink-0">
                      <HiUser className="text-sm text-[#8B95A5]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold">{m.from}</p>
                      <p className="text-[10px] text-[#5A6478] truncate">{m.msg}</p>
                    </div>
                    <span className="text-[9px] text-[#5A6478] shrink-0">{m.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 10 - Payments */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">10</span>
                <h3 className="font-bold text-sm">المدفوعات (Payments)</h3>
              </div>
              <div className="space-y-2">
                {[{ method: 'تحويل بنكي', amount: 'EGP 15,400', status: 'مكتمل' },
                  { method: 'بطاقة ائتمان', amount: 'EGP 8,200', status: 'قيد المعالجة' },
                  { method: 'محفظة إلكترونية', amount: 'EGP 3,600', status: 'مكتمل' }].map((p, i) => (
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

            {/* 11 - System Settings */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">11</span>
                <h3 className="font-bold text-sm">إعدادات النظام (System Settings)</h3>
              </div>
              <div className="space-y-2">
                {['اللغة والمنطقة', 'الإشعارات', 'الأمان', 'النسخ الاحتياطي'].map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#0F1420] border border-[#1E2A3D]">
                    <div className="flex items-center gap-2">
                      <HiCog className="text-sm text-[#8B95A5]" />
                      <span className="text-xs">{s}</span>
                    </div>
                    <HiChevronLeft className="text-[#5A6478] rtl:rotate-180" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 12 - Activity Log */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">12</span>
                <h3 className="font-bold text-sm">سجل النشاط (Activity Log)</h3>
              </div>
              <div className="space-y-2">
                {activityLog.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-[#0F1420] border border-[#1E2A3D]">
                    <div className="w-1.5 h-1.5 rounded-full bg-theme-gold mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs">{a.action}</p>
                      <p className="text-[9px] text-[#5A6478]">{a.user} • {a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
