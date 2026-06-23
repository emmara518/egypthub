'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiStar, HiCurrencyDollar, HiCheck, HiArrowUp, HiDownload, HiTrendingUp, HiHeart, HiChevronRight, HiUser } from 'react-icons/hi';

/* ───── Mock Data ───── */
const walletBalance = 2750;
const loyaltyPoints = 1250;
const monthlySpending = 8400;

const transactions = [
  { id: 1, title: 'حجز رحلة سفاري', amount: -450, date: '14 يناير', type: 'expense', category: 'مغامرات' },
  { id: 2, title: 'استرداد مبلغ', amount: +200, date: '12 يناير', type: 'income', category: 'استرد' },
  { id: 3, title: 'حجز فندق النيل', amount: -1200, date: '10 يناير', type: 'expense', category: 'فنادق' },
  { id: 4, title: 'حجز غوص', amount: -850, date: '8 يناير', type: 'expense', category: 'رياضات مائية' },
  { id: 5, title: 'استرداد مبلغ', amount: +500, date: '5 يناير', type: 'income', category: 'استرد' },
];
const rewards = [
  { id: 1, title: 'خصم 15% على الحجز القادم', points: 500, expiry: '31 يناير', icon: '🎫' },
  { id: 2, title: 'ترقية VIP مجانية', points: 1000, expiry: '28 فبراير', icon: '👑' },
  { id: 3, title: 'تجربة مجانية', points: 2000, expiry: '15 مارس', icon: '🎁' },
  { id: 4, title: 'نقاطئ أجور', points: 50, expiry: '90 يوم', icon: '⭐' },
];
export default function WalletPage() {
  const [activeTab, setActiveTab] = useState('balance');

  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);

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
              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5 text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-theme-gold to-accent-amber p-[2px]">
                    <div className="w-full h-full rounded-full bg-theme-surface flex items-center justify-center">
                      <HiUser className="text-3xl text-theme-gold" />
                    </div>
                  </div>
                </div>
                <h2 className="font-bold text-lg font-playfair text-theme">أحمد محمد</h2>
                <p className="text-xs text-theme-muted font-cairo mb-4">مستكشف مصر</p>
                <div className="grid grid-cols-2 gap-2">
                  {[{ val: '24', label: 'رحلة' }, { val: '14', label: 'تقييم' }, { val: '8', label: 'مفضلة' }, { val: '3', label: 'كوبون' }].map(s => (
                    <div key={s.label} className="bg-theme-surface rounded-xl p-2 text-center">
                      <p className="text-lg font-bold text-theme-gold font-english">{s.val}</p>
                      <p className="text-[9px] text-theme-muted font-cairo">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-4 space-y-0.5">
                {[
                  { id: 'balance', label: 'الرصيد الحالي' },
                  { id: 'transactions', label: 'المعاملات' },
                  { id: 'rewards', label: 'المكافآت' },
                  { id: 'offers', label: 'العروض' },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-right px-3 py-2.5 rounded-lg text-sm transition-all ${
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
              {activeTab === 'balance' && (
                <motion.div key="balance" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <h2 className="text-xl font-bold font-playfair text-theme mb-6">الرصيد والمحفظة</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-l from-theme-gold/10 to-accent-amber/5 rounded-xl p-6 border border-theme-gold/20">
                      <p className="text-xs text-theme-muted font-cairo mb-1">الرصيد الحالي</p>
                      <p className="text-3xl font-bold text-theme-gold font-english">EGP {walletBalance.toLocaleString()}</p>
                      <p className="text-xs text-theme-muted font-cairo mt-2">صالح للاستخدام</p>
                    </div>
                    <div className="bg-theme-surface rounded-xl p-5 border border-theme-border">
                      <p className="text-xs text-theme-muted font-cairo mb-3">نقاط الولاء</p>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xl font-bold text-theme-gold font-english">{loyaltyPoints.toLocaleString()}</p>
                        <div className="w-16 h-16 rounded-full bg-theme-gold/10 flex items-center justify-center">
                          <HiStar className="text-3xl text-theme-gold" />
                        </div>
                      </div>
                      <p className="text-xs text-theme-muted font-cairo">المستوى: <span className="text-theme-gold font-medium">الذهب</span></p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 mb-6">
                    <p className="text-sm font-bold text-theme mb-4 font-cairo">نقطة الولاء الشهرية</p>
                    <div className="space-y-3">
                      {transactions.filter(t => t.type === 'income').slice(0, 3).map((t, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-theme-bg border border-theme">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center">
                              <HiCheck className="text-green-400 text-sm" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-theme font-cairo">{t.title}</p>
                              <p className="text-[10px] text-theme-muted font-cairo">{t.date}</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-green-400 font-english">+EGP {t.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'transactions' && (
                <motion.div key="transactions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <h2 className="text-xl font-bold font-playfair text-theme mb-6">المعاملات</h2>

                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-theme font-cairo">إجمالي الدخل</p>
                    <p className="text-lg font-bold text-green-400 font-english">EGP {totalIncome.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-theme font-cairo">إجمالي المصروفات</p>
                    <p className="text-lg font-bold text-red-400 font-english">EGP {totalExpense.toLocaleString()}</p>
                  </div>

                  <div className="space-y-3">
                    {transactions.map((t, i) => (
                      <motion.div key={t.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                        whileHover={{ x: -3 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-theme-card border border-theme-gold/10 hover:border-theme-gold/30 transition-all">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${t.amount > 0 ? 'bg-green-500/15' : 'bg-red-500/15'}`}>
                            {t.amount > 0 ? <HiCheck className="text-green-400 text-sm" /> : <HiArrowUp className="text-red-400 text-sm" />}
                          </div>
                          <div>
                            <p className="font-bold text-theme text-sm font-cairo">{t.title}</p>
                            <p className="text-xs text-theme-muted font-cairo">{t.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`font-bold text-sm font-english ${t.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>{t.amount > 0 ? '+' : ''}EGP {Math.abs(t.amount).toLocaleString()}</span>
                          <p className="text-[10px] text-theme-muted font-cairo">{t.category}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'rewards' && (
                <motion.div key="rewards" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <h2 className="text-xl font-bold font-playfair text-theme mb-6">المكافآت والنقاط</h2>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-theme mb-3 font-cairo">الرصيد الحالي: {loyaltyPoints.toLocaleString()} نقطة</p>
                    <div className="bg-theme-gold/5 rounded-xl p-4 border border-theme-gold/15">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-full">
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-theme-muted font-cairo">0 نقطة</span>
                            <span className="text-xs text-theme-muted font-cairo">2000 نقطة</span>
                          </div>
                          <div className="w-full bg-theme-elevated rounded-full h-2">
                            <div className="bg-theme-gold h-2 rounded-full" style={{ width: '62%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-playfair text-theme mb-4">المكافآت المتاحة</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rewards.map((r, i) => (
                      <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        whileHover={{ x: -3 }}
                        className="rounded-2xl border border-theme-gold/20 bg-theme-card p-4 hover:border-theme-gold/30 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-theme-gold/10 flex items-center justify-center text-2xl">
                            {r.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-theme text-sm font-cairo">{r.title}</p>
                            <p className="text-xs text-theme-muted font-cairo mt-0.5">مستحق بحلول: {r.expiry}</p>
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-bold text-theme-gold font-english">{r.points} نقطة</p>
                            <button className="text-xs text-theme-gold font-cairo hover:underline">استبدل الآن</button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'offers' && (
                <motion.div key="offers" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <h2 className="text-xl font-bold font-playfair text-theme mb-6">العروض والخصومات</h2>
                  <div className="space-y-4">
                    {[
                      { title: 'خصم 20% على جميع رحلات النيل', discount: '20%', expiry: '31 يناير', icon: '🎫' },
                      { title: 'ترقية مجانية إلى VIP', discount: 'مجاناً', expiry: '28 فبراير', icon: '👑' },
                      { title: 'تجربة مجانية', discount: 'EGP 2,000', expiry: '15 مارس', icon: '🎁' },
                      { title: 'خصم 15% على الغوص', discount: '15%', expiry: '31 مارس', icon: '🤿' },
                    ].map((offer, i) => (
                      <motion.div key={i} whileHover={{ x: -3 }} className="flex items-center gap-4 p-4 rounded-xl bg-theme-card border border-theme-gold/10 hover:border-theme-gold/30 transition-all cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-theme-gold/10 flex items-center justify-center text-2xl">
                          {offer.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-theme text-sm font-cairo">{offer.title}</p>
                          <p className="text-sm text-theme-gold font-english font-bold mt-1">{offer.discount} صالح حتى {offer.expiry}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <HiTrendingUp className="text-theme-gold" />
                          <span className="text-xs text-theme-muted font-cairo">طلب 45 مرة</span>
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
