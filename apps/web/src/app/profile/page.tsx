'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiUser, HiCalendar, HiHeart, HiBell, HiStar, HiCash,
  HiBadgeCheck, HiShieldCheck, HiGift, HiPencil, HiPhotograph,
  HiLocationMarker, HiClock, HiChevronLeft, HiBookmark, HiCog,
  HiLogout,
} from 'react-icons/hi';
import { FaGoogle, FaFacebook, FaApple, FaInstagram } from 'react-icons/fa';

const tabs = [
  { id: 'bookings', label: 'الحجوزات' },
  { id: 'favorites', label: 'المفضلة' },
  { id: 'notifications', label: 'الإشعارات' },
  { id: 'reviews', label: 'التقييمات' },
  { id: 'wallet', label: 'المحفظة' },
  { id: 'settings', label: 'الإعدادات' },
];

const reservations = [
  { title: 'رحلة سفاري في الصحراء', date: '15 يناير 2025', status: 'مؤكد', statusColor: 'bg-green-500/15 text-green-400', img: '/egypthub/images/activities/desert-safari.svg' },
  { title: 'جولة في معبد الأقصر', date: '18 يناير 2025', status: 'قادم', statusColor: 'bg-theme-gold/15 text-theme-gold', img: '/egypthub/images/destinations/sharm-el-sheikh.svg' },
  { title: 'رحلة نيلية فاخرة', date: '20 يناير 2025', status: 'مؤكد', statusColor: 'bg-green-500/15 text-green-400', img: '/egypthub/images/destinations/luxor.svg' },
  { title: 'غوص في الغردقة', date: '25 يناير 2025', status: 'قيد المراجعة', statusColor: 'bg-blue-500/15 text-blue-400', img: '/egypthub/images/activities/diving.svg' },
];

const favorites = [
  { title: 'أهرامات الجيزة', img: '/egypthub/images/destinations/cairo.svg', rating: 4.9 },
  { title: 'البحر الأحمر', img: '/egypthub/images/activities/diving.svg', rating: 4.8 },
  { title: 'القاهرة القديمة', img: '/egypthub/images/destinations/cairo.svg', rating: 4.7 },
  { title: 'معبد الأقصر', img: '/egypthub/images/destinations/sharm-el-sheikh.svg', rating: 4.9 },
  { title: 'سيوة', img: '/egypthub/images/destinations/siwa.svg', rating: 4.7 },
  { title: 'شرم الشيخ', img: '/egypthub/images/destinations/hurghada.svg', rating: 4.8 },
];

const notifications = [
  { text: 'تم تأكيد حجز رحلة الصحراء', time: 'منذ 5 دقائق', type: 'success' },
  { text: 'عرض خاص: خصم 20% على رحلات النيل', time: 'منذ ساعة', type: 'offer' },
  { text: 'تذكير: رحلتك بعد 3 أيام', time: 'منذ 3 ساعات', type: 'reminder' },
  { text: 'تم إضافة تقييم جديد على حسابك', time: 'منذ يوم', type: 'success' },
  { text: 'عرض العيد: احجز الآن واستمتع بخصم 30%', time: 'منذ يومين', type: 'offer' },
];

const reviews = [
  { title: 'رحلة سفاري رائعة', stars: 5, text: 'تجربة لا تنسى في صحراء مصر', date: 'يناير 2025' },
  { title: 'معبد الأقصر مذهل', stars: 4, text: 'جولة تاريخية ممتعة جداً', date: 'ديسمبر 2024' },
  { title: 'غوص ممتاز', stars: 5, text: 'أجمل تجربة غوص في حياتي', date: 'نوفمبر 2024' },
];

const transactions = [
  { title: 'حجز رحلة سفاري', amount: '-450.00', date: '14 يناير' },
  { title: 'استرداد مبلغ', amount: '+200.00', date: '12 يناير' },
  { title: 'حجز فندق النيل', amount: '-1,200.00', date: '10 يناير' },
  { title: 'حجز غوص', amount: '-850.00', date: '8 يناير' },
];

const socialAccounts = [
  { name: 'Google', icon: FaGoogle, color: '#EA4335', connected: true },
  { name: 'Facebook', icon: FaFacebook, color: '#1877F2', connected: true },
  { name: 'Apple', icon: FaApple, color: '#FFFFFF', connected: false },
  { name: 'Instagram', icon: FaInstagram, color: '#E4405F', connected: false },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <div className="min-h-screen bg-theme-bg pt-24" dir="rtl">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8">
        <div className="flex gap-6">
          <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            className="w-64 shrink-0 hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5 text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-theme-gold to-accent-amber p-[2px]">
                    <div className="w-full h-full rounded-full bg-theme-surface flex items-center justify-center">
                      <HiUser className="text-3xl text-theme-gold" />
                    </div>
                  </div>
                  <button className="absolute -bottom-1 -left-1 w-7 h-7 rounded-full bg-theme-gold flex items-center justify-center">
                    <HiPencil className="text-dark-900 text-xs" />
                  </button>
                </div>
                <h2 className="font-bold text-lg font-playfair text-theme">أحمد محمد</h2>
                <p className="text-xs text-theme-muted font-cairo mb-4">مستكشف مصري</p>
                <div className="grid grid-cols-3 gap-2">
                  {[{ val: '24', label: 'رحلة' }, { val: '14', label: 'تقييم' }, { val: '8', label: 'مفضلة' }].map(s => (
                    <div key={s.label} className="bg-theme-surface rounded-xl p-2 text-center">
                      <p className="text-lg font-bold text-theme-gold font-english">{s.val}</p>
                      <p className="text-[9px] text-theme-muted font-cairo">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-4 space-y-0.5">
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-right px-3 py-2.5 rounded-lg text-sm transition-all font-cairo ${
                      activeTab === tab.id ? 'bg-theme-gold/10 text-theme-gold font-medium' : 'text-theme-secondary hover:text-theme hover:bg-theme-elevated'
                    }`}>
                    {tab.label}
                  </button>
                ))}
                <div className="border-t border-theme-border my-2" />
                <button className="w-full text-right px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/5 transition-all font-cairo flex items-center gap-2">
                  <HiLogout /> تسجيل الخروج
                </button>
              </div>
            </div>
          </motion.aside>

          <div className="flex-1 min-w-0">
            <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-cairo whitespace-nowrap transition-all ${
                    activeTab === tab.id ? 'bg-theme-gold/10 text-theme-gold border border-theme-gold/20' : 'bg-theme-card text-theme-secondary border border-theme-border'
                  }`}>
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'bookings' && (
                <motion.div key="bookings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <h2 className="text-xl font-bold font-playfair text-theme mb-2">الحجوزات</h2>
                    <p className="text-sm text-theme-muted font-cairo mb-4">جميع حجوزاتك في مكان واحد</p>
                  </div>
                  {reservations.map((r, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -3 }}
                      className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden group cursor-pointer">
                      <div className="relative h-36 overflow-hidden">
                        <img src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-theme-card to-transparent" />
                        <div className="absolute bottom-3 right-3">
                          <p className="font-bold text-theme font-cairo">{r.title}</p>
                        </div>
                        <span className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-[10px] font-bold ${r.statusColor}`}>{r.status}</span>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <HiCalendar className="text-theme-gold text-sm" />
                          <span className="text-xs text-theme-secondary font-cairo">{r.date}</span>
                        </div>
                        <Link href="/booking/confirmation" className="text-xs text-theme-gold font-cairo hover:underline">عرض التفاصيل</Link>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'favorites' && (
                <motion.div key="favorites" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-xl font-bold font-playfair text-theme mb-2">المفضلة</h2>
                  <p className="text-sm text-theme-muted font-cairo mb-4">الأماكن والتجارب التي أعجبتك</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {favorites.map((f, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -3 }}
                        className="rounded-2xl border border-theme-border bg-theme-card overflow-hidden group cursor-pointer">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img src={f.img} alt={f.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="p-3">
                          <p className="font-bold text-sm text-theme font-cairo">{f.title}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <HiStar className="text-theme-gold text-xs" />
                            <span className="text-xs text-theme-secondary font-english">{f.rating}</span>
                          </div>
                        </div>
                        <button className="absolute top-2 left-2">
                          <HiHeart className="text-red-400 text-lg" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div key="notifications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-xl font-bold font-playfair text-theme mb-2">الإشعارات</h2>
                  <p className="text-sm text-theme-muted font-cairo mb-4">آخر التحديثات والتنبيهات</p>
                  <div className="space-y-3">
                    {notifications.map((n, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                        className="rounded-2xl border border-theme-border bg-theme-card p-4 flex items-start gap-3">
                        <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${
                          n.type === 'success' ? 'bg-green-400' : n.type === 'offer' ? 'bg-theme-gold' : 'bg-blue-400'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-theme font-cairo">{n.text}</p>
                          <p className="text-xs text-theme-muted mt-1 font-cairo">{n.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-xl font-bold font-playfair text-theme mb-2">التقييمات</h2>
                  <p className="text-sm text-theme-muted font-cairo mb-4">تقييماتك وتجاربك</p>
                  <div className="space-y-3">
                    {reviews.map((r, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="rounded-2xl border border-theme-border bg-theme-card p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-bold text-theme text-sm font-cairo">{r.title}</p>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, s) => (
                              <HiStar key={s} className={`text-sm ${s < r.stars ? 'text-theme-gold' : 'text-theme-elevated'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-theme-secondary font-cairo">{r.text}</p>
                        <p className="text-xs text-theme-muted mt-2 font-cairo">{r.date}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'wallet' && (
                <motion.div key="wallet" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-xl font-bold font-playfair text-theme mb-2">المحفظة</h2>
                  <p className="text-sm text-theme-muted font-cairo mb-4">رصيدك وأحدث المعاملات</p>
                  <div className="rounded-2xl bg-gradient-to-l from-theme-gold/10 to-accent-amber/5 border border-theme-gold/20 p-6 mb-6">
                    <p className="text-sm text-theme-muted font-cairo mb-1">الرصيد الحالي</p>
                    <p className="text-3xl font-bold text-theme-gold font-english">ج.م 2,750.00</p>
                  </div>
                  <div className="space-y-2">
                    {transactions.map((t, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-theme-card border border-theme-border">
                        <div>
                          <p className="text-sm font-bold text-theme font-cairo">{t.title}</p>
                          <p className="text-xs text-theme-muted font-cairo">{t.date}</p>
                        </div>
                        <span className={`text-sm font-bold font-english ${t.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{t.amount}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-xl font-bold font-playfair text-theme mb-2">الإعدادات</h2>
                  <p className="text-sm text-theme-muted font-cairo mb-4">إعدادات الحساب والتفضيلات</p>
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-theme-border bg-theme-card p-5">
                      <h3 className="font-bold text-theme text-sm font-cairo mb-3">ربط الحسابات</h3>
                      <div className="space-y-2">
                        {socialAccounts.map((acc, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-theme-surface border border-theme-border">
                            <div className="flex items-center gap-3">
                              <acc.icon className="text-lg" style={{ color: acc.color }} />
                              <span className="text-sm text-theme font-english">{acc.name}</span>
                            </div>
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                              acc.connected ? 'bg-green-500/15 text-green-400' : 'bg-theme-elevated text-theme-muted'
                            }`}>
                              {acc.connected ? 'متصل' : 'ربط'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-theme-border bg-theme-card p-5">
                      <h3 className="font-bold text-theme text-sm font-cairo mb-3">الإنجازات</h3>
                      <div className="text-center mb-4">
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}
                          className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-theme-gold/20 to-accent-amber/10 flex items-center justify-center">
                          <HiStar className="text-3xl text-theme-gold" />
                        </motion.div>
                        <h4 className="font-bold text-theme-gold font-cairo">مستكشف مصر</h4>
                        <p className="text-xs text-theme-muted font-cairo">المستوى الذهبي</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[{ icon: HiBadgeCheck, label: '10 رحلات' }, { icon: HiShieldCheck, label: 'مسافر VIP' }, { icon: HiGift, label: '5 مكافآت' }].map((b, i) => (
                          <div key={i} className="bg-theme-surface rounded-xl p-3 text-center">
                            <b.icon className="text-xl text-theme-gold mx-auto mb-1" />
                            <p className="text-xs text-theme-muted font-cairo">{b.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-theme-border bg-theme-card p-5">
                      <h3 className="font-bold text-theme text-sm font-cairo mb-3">تفضيلات الإشعارات</h3>
                      <div className="space-y-3">
                        {['إشعارات الحجوزات', 'العروض الترويجية', 'تحديثات الرحلة', 'تنبيهات الطقس'].map((n, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-theme-surface border border-theme-border">
                            <span className="text-sm text-theme font-cairo">{n}</span>
                            <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${i < 2 ? 'bg-theme-gold' : 'bg-theme-elevated'}`}>
                              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${i < 2 ? 'right-0.5' : 'left-0.5'}`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
