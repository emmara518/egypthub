'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiStar, HiHeart, HiLocationMarker, HiCalendar, HiClock,
  HiCash, HiUser, HiBell, HiBookmark, HiPhotograph,
  HiShieldCheck, HiBadgeCheck, HiGift,
  HiPencil, HiPlus, HiChevronLeft,
} from 'react-icons/hi';
import { FaGoogle, FaFacebook, FaApple, FaInstagram } from 'react-icons/fa';

/* ───── Data ───── */
const reservations = [
  { title: 'رحلة سفاري في الصحراء', date: '15 يناير 2025', status: 'مؤكد', statusColor: 'bg-green-500/15 text-green-400', img: '/egypthub/images/activities/desert-safari.svg' },
  { title: 'جولة في معبد الأقصر', date: '18 يناير 2025', status: 'قادم', statusColor: 'bg-theme-gold/15 text-theme-gold', img: '/egypthub/images/destinations/sharm-el-sheikh.svg' },
  { title: 'رحلة نيلية فاخرة', date: '20 يناير 2025', status: 'مؤكد', statusColor: 'bg-green-500/15 text-green-400', img: '/egypthub/images/destinations/luxor.svg' },
];

const favorites = [
  { title: 'أهرامات الجيزة', img: '/egypthub/images/destinations/cairo.svg' },
  { title: 'البحر الأحمر', img: '/egypthub/images/activities/diving.svg' },
  { title: 'القاهرة القديمة', img: '/egypthub/images/destinations/cairo.svg' },
  { title: 'معبد الأقصر', img: '/egypthub/images/destinations/sharm-el-sheikh.svg' },
];

const notifications = [
  { text: 'تم تأكيد حجز رحلة الصحراء', time: 'منذ 5 دقائق', type: 'success' },
  { text: 'عرض خاص: خصم 20% على رحلات النيل', time: 'منذ ساعة', type: 'offer' },
  { text: 'تذكير: رحلتك بعد 3 أيام', time: 'منذ 3 ساعات', type: 'reminder' },
];

const transactions = [
  { title: 'حجز رحلة سفاري', amount: '-450.00', date: '14 يناير' },
  { title: 'استرداد مبلغ', amount: '+200.00', date: '12 يناير' },
  { title: 'حجز فندق النيل', amount: '-1,200.00', date: '10 يناير' },
];

const socialAccounts = [
  { name: 'Google', icon: FaGoogle, color: '#EA4335', connected: true },
  { name: 'Facebook', icon: FaFacebook, color: '#1877F2', connected: true },
  { name: 'Apple', icon: FaApple, color: '#FFFFFF', connected: false },
  { name: 'Instagram', icon: FaInstagram, color: '#E4405F', connected: false },
];

const partners = [
  { name: 'Anwar Resorts', initial: 'A' },
  { name: 'Four Seasons', initial: 'FS' },
  { name: 'jaz', initial: 'J' },
];

/* ───── Component ───── */
export default function Screen4_TravelerPortal() {
  const [activeTab, setActiveTab] = useState('bookings');

  const sidebarLinks = [
    { id: 'bookings', label: 'حجوزي وبياناتي' },
    { id: 'favorites', label: 'المفضلة والإلهام' },
    { id: 'reviews', label: 'المراجعات والتقييمات' },
    { id: 'wallet', label: 'المحفظة والأداء' },
    { id: 'badges', label: 'الإنجازات والجوائز' },
    { id: 'community', label: 'المجتمع' },
    { id: 'offers', label: 'العروض والخصومات' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white font-arabic" dir="rtl">
      <div className="max-w-[1500px] mx-auto px-6 py-8 flex gap-6">
        {/* ─── Sidebar ─── */}
        <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="w-64 shrink-0">
          <div className="sticky top-8 space-y-4">
            <div className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <span className="text-[10px] font-english text-theme-gold font-bold block mb-2">المرحلة 5</span>
              <h1 className="text-xl font-bold mb-1">منصة المستخدم</h1>
              <p className="text-theme-gold text-sm font-english font-semibold mb-3">Traveler Portal</p>
              {/* Compass icon */}
              <div className="w-20 h-20 mx-auto mb-3 relative">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-theme-gold/20" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-theme-gold/20 to-accent-orange/10 flex items-center justify-center">
                  <span className="text-2xl">🧭</span>
                </div>
              </div>
              <p className="text-[#8B95A5] text-xs leading-relaxed text-center">
                بوابة شخصية متكاملة — نظم كل رحلاتك وحجوزاتك واستكشافاتك في مكان واحد.
              </p>
            </div>

            <div className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-4">
              <div className="space-y-0.5">
                {sidebarLinks.map(link => (
                  <button key={link.id} onClick={() => setActiveTab(link.id)}
                    className={`w-full text-right px-3 py-2 rounded-lg text-sm transition-all ${
                      activeTab === link.id ? 'bg-theme-gold/10 text-theme-gold font-medium' : 'text-[#8B95A5] hover:text-white hover:bg-[#1A2235]'
                    }`}>
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>

        {/* ─── Main Grid ─── */}
        <div className="flex-1 min-w-0 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">

          {/* 01 - Profile */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">01</span>
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
              <h4 className="font-bold text-lg">أحمد محمد</h4>
              <p className="text-[10px] text-[#5A6478] mb-4">مستكشف مصري</p>
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

          {/* 02 - Reservations */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">02</span>
              <h3 className="font-bold text-sm">الحجوزات</h3>
            </div>
            <div className="space-y-2">
              {reservations.map((r, i) => (
                <motion.div key={i} whileHover={{ x: -3 }} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0F1420] border border-[#1E2A3D] hover:border-theme-gold/20 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <img src={r.img} alt={r.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{r.title}</p>
                    <p className="text-[10px] text-[#5A6478] flex items-center gap-1">
                      <HiCalendar className="text-[9px]" />{r.date}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${r.statusColor}`}>{r.status}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 03 - Favorites */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">03</span>
              <h3 className="font-bold text-sm">المفضلة</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {favorites.map((f, i) => (
                <motion.div key={i} whileHover={{ scale: 1.03 }} className="relative rounded-xl overflow-hidden cursor-pointer group">
                  <div className="aspect-[4/3]">
                    <img src={f.img} alt={f.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17]/90 to-transparent" />
                  <div className="absolute bottom-2 right-2">
                    <p className="text-[10px] font-bold">{f.title}</p>
                  </div>
                  <button className="absolute top-2 left-2">
                    <HiHeart className="text-red-400 text-sm" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 04 - Notifications */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">04</span>
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

          {/* 05 - Wishlist / Upcoming Trip */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-[#141B2D] rounded-2xl border border-theme-gold/25 p-5 xl:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">05</span>
              <h3 className="font-bold text-sm">رحلات القائمة</h3>
            </div>
            <div className="relative rounded-xl overflow-hidden mb-4">
              <img src="/egypthub/images/activities/desert-safari.svg" alt="رحلة سفاري" className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] to-transparent" />
              <div className="absolute bottom-3 right-3">
                <p className="text-sm font-bold">رحلة سفاري في الصحراء</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[{ val: '02', label: 'يوم' }, { val: '14', label: 'ساعة' }, { val: '45', label: 'دقيقة' }].map(t => (
                <div key={t.label} className="bg-[#0F1420] rounded-xl p-3 text-center border border-theme-gold/15">
                  <p className="text-xl font-bold text-theme-gold font-english">{t.val}</p>
                  <p className="text-[9px] text-[#5A6478]">{t.label}</p>
                </div>
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-l from-theme-gold to-accent-orange text-[#0A0E17] font-bold text-sm">
              تسجيل الحضور
            </motion.button>
          </motion.div>

          {/* 06 - Reviews */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">06</span>
              <h3 className="font-bold text-sm">المراجعات والتقييمات</h3>
            </div>
            <div className="space-y-3">
              {[{ title: 'رحلة سفاري رائعة', stars: 5, text: 'تجربة لا تنسى في صحراء مصر' }, { title: 'معبد الأقصر مذهل', stars: 4, text: 'جولة تاريخية ممتعة جداً' }].map((r, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#0F1420] border border-[#1E2A3D]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold">{r.title}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <HiStar key={s} className={`text-xs ${s < r.stars ? 'text-theme-gold' : 'text-[#1A2235]'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] text-[#8B95A5]">{r.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 07 - Wallet */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">07</span>
              <h3 className="font-bold text-sm">المحفظة والأداءات</h3>
            </div>
            <div className="bg-gradient-to-l from-theme-gold/10 to-accent-orange/5 rounded-xl p-4 border border-theme-gold/15 mb-4">
              <p className="text-[10px] text-[#8B95A5] mb-1">الرصيد الحالي</p>
              <p className="text-2xl font-bold text-theme-gold font-english">ج.م 2,750.00</p>
            </div>
            <div className="space-y-2">
              {transactions.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-[#0F1420]">
                  <div>
                    <p className="text-xs">{t.title}</p>
                    <p className="text-[9px] text-[#5A6478]">{t.date}</p>
                  </div>
                  <span className={`text-sm font-bold font-english ${t.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{t.amount}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 08 - Linked Accounts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">08</span>
              <h3 className="font-bold text-sm">ربط الحسابات</h3>
            </div>
            <div className="space-y-2">
              {socialAccounts.map((acc, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#0F1420] border border-[#1E2A3D]">
                  <div className="flex items-center gap-3">
                    <acc.icon className="text-lg" style={{ color: acc.color }} />
                    <span className="text-xs font-english">{acc.name}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${acc.connected ? 'bg-green-500/15 text-green-400' : 'bg-[#1A2235] text-[#5A6478]'}`}>
                    {acc.connected ? 'متصل' : 'ربط'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 09 - Badges */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">09</span>
              <h3 className="font-bold text-sm">الإنجازات والجوائز</h3>
            </div>
            <div className="text-center mb-4">
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}
                className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-theme-gold/20 to-accent-orange/10 flex items-center justify-center">
                <HiStar className="text-3xl text-theme-gold" />
              </motion.div>
              <h4 className="font-bold text-theme-gold">مستكشف مصر</h4>
              <p className="text-[10px] text-[#5A6478]">المستوى الذهبي</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[{ icon: HiBadgeCheck, label: '10 رحلات' }, { icon: HiShieldCheck, label: 'مسافر VIP' }, { icon: HiGift, label: '5 مكافآت' }].map((b, i) => (
                <div key={i} className="bg-[#0F1420] rounded-xl p-2.5 text-center">
                  <b.icon className="text-xl text-theme-gold mx-auto mb-1" />
                  <p className="text-[9px] text-[#8B95A5]">{b.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 10 - Community Photos */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">10</span>
              <h3 className="font-bold text-sm">صور بين المستخدمين</h3>
            </div>
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {['/egypthub/images/destinations/cairo.svg', '/egypthub/images/destinations/luxor.svg', '/egypthub/images/activities/desert-safari.svg', '/egypthub/images/destinations/sharm-el-sheikh.svg', '/egypthub/images/activities/diving.svg', '/egypthub/images/destinations/cairo.svg'].map((img, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} className="aspect-square rounded-lg overflow-hidden cursor-pointer">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 text-center">
              <div>
                <p className="text-sm font-bold text-theme-gold font-english">500+</p>
                <p className="text-[9px] text-[#5A6478]">صورة</p>
              </div>
              <div className="w-px h-6 bg-[#1E2A3D]" />
              <div>
                <p className="text-sm font-bold text-theme-gold font-english">15K+</p>
                <p className="text-[9px] text-[#5A6478]">إعجاب</p>
              </div>
            </div>
          </motion.div>

          {/* 11 - Partners */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">11</span>
              <h3 className="font-bold text-sm">الشركاء المميزين</h3>
            </div>
            <div className="flex items-center justify-around">
              {partners.map((p, i) => (
                <motion.div key={i} whileHover={{ scale: 1.1 }} className="text-center cursor-pointer">
                  <div className="w-14 h-14 rounded-xl bg-[#0F1420] border border-[#1E2A3D] flex items-center justify-center mb-1">
                    <span className="text-lg font-english font-bold text-theme-gold">{p.initial}</span>
                  </div>
                  <p className="text-[9px] text-[#8B95A5]">{p.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 12 - Offers */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">12</span>
              <h3 className="font-bold text-sm">العروض والخصومات</h3>
            </div>
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden group cursor-pointer">
                <img src="/egypthub/images/destinations/luxor.svg" alt="عرض" className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] to-transparent" />
                <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-red-500 text-[10px] font-bold">20%</div>
                <div className="absolute bottom-2 right-2">
                  <p className="text-xs font-bold">عروض الصيف</p>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden group cursor-pointer">
                <img src="/egypthub/images/activities/desert-safari.svg" alt="عرض" className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] to-transparent" />
                <div className="absolute bottom-2 right-2">
                  <p className="text-xs font-bold">عروض الشتاء</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer - spans full width */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="xl:col-span-3 lg:col-span-2 bg-[#0F1420] rounded-2xl border border-[#1E2A3D] p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-theme-gold to-accent-orange flex items-center justify-center">
                  <span className="text-[#0A0E17] font-bold text-lg">م</span>
                </div>
                <div>
                  <p className="font-bold font-english">EGYPTHUB</p>
                  <p className="text-[10px] text-[#5A6478]">منصة السياحة المصرية</p>
                </div>
              </div>
              <div className="flex gap-4">
                {['الرئيسية', 'الوجهات', 'التجارب', 'المجتمع', 'الدعم'].map(l => (
                  <span key={l} className="text-xs text-[#8B95A5] hover:text-theme-gold cursor-pointer transition-colors">{l}</span>
                ))}
              </div>
              <p className="text-[10px] text-[#5A6478]">© 2025 EgyptHub</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
