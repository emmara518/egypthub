'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MOCK_USER, MOCK_BOOKINGS, MOCK_NOTIFICATIONS, MOCK_REVIEWS, MOCK_TRANSACTIONS, MOCK_REWARDS
} from '@/lib/mock-data';

const tabs = [
  { id: 'bookings', label: 'الحجوزات' },
  { id: 'favorites', label: 'المفضلة' },
  { id: 'notifications', label: 'الإشعارات' },
  { id: 'reviews', label: 'التقييمات' },
  { id: 'wallet', label: 'المحفظة' },
  { id: 'settings', label: 'الإعدادات' },
];

const user = MOCK_USER;
const reservations = MOCK_BOOKINGS.map(b => ({
  title: b.title, date: b.date,
  status: b.status === 'مؤكد' ? 'مؤكد' : b.status === 'قادم' ? 'قادم' : b.status === 'قيد المراجعة' ? 'قيد المراجعة' : b.status,
  statusColor: b.status === 'مؤكد' ? 'bg-green-500/15 text-green-400' : b.status === 'قادم' ? 'bg-theme-gold/15 text-theme-gold' : b.status === 'قيد المراجعة' ? 'bg-blue-500/15 text-blue-400' : 'bg-red-500/15 text-red-400',
  img: b.image,
}));
const favorites = [
  { title: 'أهرامات الجيزة', img: '/egypthub/images/destinations/cairo.svg', rating: 4.9 },
  { title: 'البحر الأحمر', img: '/egypthub/images/activities/diving.svg', rating: 4.8 },
  { title: 'القاهرة القديمة', img: '/egypthub/images/destinations/cairo.svg', rating: 4.7 },
  { title: 'معبد الأقصر', img: '/egypthub/images/destinations/sharm-el-sheikh.svg', rating: 4.9 },
  { title: 'سيوة', img: '/egypthub/images/destinations/siwa.svg', rating: 4.7 },
  { title: 'شرم الشيخ', img: '/egypthub/images/destinations/hurghada.svg', rating: 4.8 },
];
const notificationsData = MOCK_NOTIFICATIONS;
const reviews = MOCK_REVIEWS;
const transactions = MOCK_TRANSACTIONS.map(t => ({
  title: t.title, amount: `${t.amount > 0 ? '+' : ''}${t.amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, date: t.date,
}));

const settingsSections = [
  {
    title: 'معلومات الحساب',
    items: [
      { label: 'الاسم', value: 'أحمد محمد', hasToggle: false },
      { label: 'البريد الإلكتروني', value: 'ahmed@email.com', hasToggle: false },
      { label: 'رقم الهاتف', value: '+20 123 456 7890', hasToggle: false },
    ],
  },
  {
    title: 'الإشعارات',
    items: [
      { label: 'إشعارات الحجوزات', hasToggle: true, enabled: true },
      { label: 'العروض الترويجية', hasToggle: true, enabled: true },
      { label: 'تحديثات الرحلة', hasToggle: true, enabled: false },
      { label: 'تنبيهات الطقس', hasToggle: true, enabled: false },
    ],
  },
  {
    title: 'الأمان',
    items: [
      { label: 'المصادقة الثنائية', hasToggle: true, enabled: true },
      { label: 'تغيير كلمة المرور', hasToggle: false },
    ],
  },
  {
    title: 'تفضيلات السفر',
    items: [
      { label: 'اللغة', value: 'العربية', hasToggle: false },
      { label: 'العملة', value: 'ج.م', hasToggle: false },
      { label: 'الإشعارات الصوتية', hasToggle: true, enabled: true },
    ],
  },
];

const StatIcon = ({ type }: { type: string }) => {
  if (type === 'trips') return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
  if (type === 'destinations') return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
  if (type === 'experiences') return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      <path d="M12 15v3" />
      <path d="M8 18h8" />
    </svg>
  );
};

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-theme-gold' : 'bg-[#1A2035]'}`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${
          enabled ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </button>
  );
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    'إشعارات الحجوزات': true,
    'العروض الترويجية': true,
    'تحديثات الرحلة': false,
    'تنبيهات الطقس': false,
    'المصادقة الثنائية': true,
    'الإشعارات الصوتية': true,
  });

  const handleToggle = (label: string) => {
    setToggleStates((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="min-h-screen bg-theme-bg">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8">
        <div className="flex gap-6">
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-64 shrink-0 hidden lg:block"
          >
            <div className="sticky top-28 space-y-4">
              {/* Profile Header */}
              <div className="rounded-2xl border border-theme-gold/[0.08] bg-theme-surface p-5 text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-theme-gold to-theme-gold p-[2px]">
                    <div className="w-full h-full rounded-full bg-theme-surface flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                  </div>
                  <button className="absolute -bottom-1 -left-1 w-7 h-7 rounded-full bg-theme-gold flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>
                <h2 className="font-bold text-lg text-white">{user.name}</h2>
                <p className="text-xs text-white/60 mb-1">عضو منذ {user.memberSince}</p>
                <p className="text-[10px] text-white/40 mb-4">{user.title}</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: String(user.stats.trips), label: 'رحلة', icon: 'trips' },
                    { val: String(user.stats.destinations), label: 'وجهة', icon: 'destinations' },
                    { val: String(user.stats.reviews), label: 'تجربة', icon: 'experiences' },
                  ].map((s) => (
                    <div key={s.label} className="bg-theme-bg rounded-xl p-2 text-center">
                      <p className="text-[10px] text-theme-gold mb-1 flex justify-center">
                        <StatIcon type={s.icon} />
                      </p>
                      <p className="text-sm font-bold text-white">{s.val}</p>
                      <p className="text-[9px] text-white/40">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Tabs */}
              <div className="rounded-2xl border border-theme-gold/[0.08] bg-theme-surface p-4 space-y-0.5">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-right px-3 py-2.5 rounded-lg text-sm transition-all ${
                      activeTab === tab.id
                        ? 'bg-theme-gold/10 text-theme-gold font-medium'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
                <div className="border-t border-white/[0.08] my-2" />
                <button className="w-full text-right px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/5 transition-all flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </motion.aside>

          <div className="flex-1 min-w-0">
            <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-theme-gold/10 text-theme-gold border border-theme-gold/20'
                      : 'bg-theme-surface text-white/60 border border-white/[0.08]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Bookings */}
              {activeTab === 'bookings' && (
                <motion.div key="bookings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <h2 className="text-xl font-bold text-white mb-2">الحجوزات</h2>
                    <p className="text-sm text-white/60 mb-4">جميع حجوزاتك في مكان واحد</p>
                  </div>
                  {reservations.map((r, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -3 }} className="rounded-2xl border border-theme-gold/[0.08] bg-theme-surface overflow-hidden group cursor-pointer">
                      <div className="relative h-36 overflow-hidden">
                        <Image src={r.img} alt={r.title} fill className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-theme-surface to-transparent" />
                        <div className="absolute bottom-3 right-3">
                          <p className="font-bold text-white">{r.title}</p>
                        </div>
                        <span className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-[10px] font-bold ${r.statusColor}`}>{r.status}</span>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          <span className="text-xs text-white/60">{r.date}</span>
                        </div>
                        <Link href="/booking/confirmation" className="text-xs text-theme-gold hover:underline">عرض التفاصيل</Link>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Favorites */}
              {activeTab === 'favorites' && (
                <motion.div key="favorites" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-xl font-bold text-white mb-2">المفضلة</h2>
                  <p className="text-sm text-white/60 mb-4">الأماكن والتجارب التي أعجبتك</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {favorites.map((f, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -3 }} className="rounded-2xl border border-theme-gold/[0.08] bg-theme-surface overflow-hidden group cursor-pointer">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image src={f.img} alt={f.title} fill className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                        </div>
                        <div className="p-3">
                          <p className="font-bold text-sm text-white">{f.title}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--gold)" stroke="var(--gold)" strokeWidth="1">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            <span className="text-xs text-white/60">{f.rating}</span>
                          </div>
                        </div>
                        <button className="absolute top-2 left-2">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#EF4444" stroke="#EF4444" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                          </svg>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Notifications */}
              {activeTab === 'notifications' && (
                <motion.div key="notifications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-xl font-bold text-white mb-2">الإشعارات</h2>
                  <p className="text-sm text-white/60 mb-4">آخر التحديثات والتنبيهات</p>
                  <div className="space-y-3">
                    {notificationsData.map((n, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-theme-gold/[0.08] bg-theme-surface p-4 flex items-start gap-3">
                        <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${n.type === 'success' ? 'bg-green-400' : n.type === 'offer' ? 'bg-theme-gold' : 'bg-blue-400'}`} />
                        <div className="flex-1">
                          <p className="text-sm text-white">{n.text}</p>
                          <p className="text-xs text-white/60 mt-1">{n.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Reviews */}
              {activeTab === 'reviews' && (
                <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-xl font-bold text-white mb-2">التقييمات</h2>
                  <p className="text-sm text-white/60 mb-4">تقييماتك وتجاربك</p>
                  <div className="space-y-3">
                    {reviews.map((r, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-theme-gold/[0.08] bg-theme-surface p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-bold text-white text-sm">{r.title}</p>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, s) => (
                              <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s < r.stars ? '#D4A24C' : 'none'} stroke={s < r.stars ? '#D4A24C' : '#1A2035'} strokeWidth="2">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-white/60">{r.text}</p>
                        <p className="text-xs text-white/40 mt-2">{r.date}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Wallet */}
              {activeTab === 'wallet' && (
                <motion.div key="wallet" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-xl font-bold text-white mb-2">المحفظة</h2>
                  <p className="text-sm text-white/60 mb-4">رصيدك وأحدث المعاملات</p>
                  <div className="rounded-2xl bg-gradient-to-l from-theme-gold/10 to-theme-gold/5 border border-theme-gold/[0.08] p-6 mb-6">
                    <p className="text-sm text-white/60 mb-1">الرصيد الحالي</p>
                    <p className="text-3xl font-bold text-theme-gold">ج.م 2,750.00</p>
                  </div>
                  <div className="space-y-2">
                    {transactions.map((t, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-theme-surface border border-theme-gold/[0.08]">
                        <div>
                          <p className="text-sm font-bold text-white">{t.title}</p>
                          <p className="text-xs text-white/40">{t.date}</p>
                        </div>
                        <span className={`text-sm font-bold ${t.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{t.amount}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Settings */}
              {activeTab === 'settings' && (
                <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-xl font-bold text-white mb-2">الإعدادات</h2>
                  <p className="text-sm text-white/60 mb-4">إعدادات الحساب والتفضيلات</p>
                  <div className="space-y-4">
                    {settingsSections.map((section, si) => (
                      <motion.div
                        key={si}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: si * 0.08 }}
                        className="rounded-2xl border border-theme-gold/[0.08] bg-theme-surface p-5"
                      >
                        <h3 className="font-bold text-white text-sm mb-3">{section.title}</h3>
                        <div className="space-y-2">
                          {section.items.map((item, ii) => (
                            <div key={ii} className="flex items-center justify-between p-3 rounded-xl bg-theme-bg border border-white/[0.05]">
                              <span className="text-sm text-white/80">{item.label}</span>
                              {item.hasToggle ? (
                                <Toggle
                                  enabled={toggleStates[item.label] ?? false}
                                  onToggle={() => handleToggle(item.label)}
                                />
                              ) : (
                                <div className="flex items-center gap-2">
                                  {'value' in item && item.value && (
                                    <span className="text-xs text-white/40">{item.value}</span>
                                  )}
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" opacity="0.3">
                                    <polyline points="9 18 15 12 9 6" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
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
