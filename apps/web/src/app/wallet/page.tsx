'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_USER, MOCK_TRANSACTIONS, MOCK_REWARDS } from '@/lib/mock-data';

const walletBalance = MOCK_USER.wallet.balance;
const loyaltyPoints = MOCK_USER.wallet.points;
const transactions = MOCK_TRANSACTIONS;
const rewards = MOCK_REWARDS;

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState('balance');

  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const tabs = [
    { id: 'balance', label: 'الرصيد الحالي' },
    { id: 'transactions', label: 'المعاملات' },
    { id: 'rewards', label: 'المكافآت' },
    { id: 'offers', label: 'العروض' },
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
                <div className="grid grid-cols-2 gap-2">
                  {[{ val: String(MOCK_USER.stats.trips), label: 'رحلة' }, { val: String(MOCK_USER.stats.reviews), label: 'تقييم' }, { val: String(MOCK_USER.stats.favorites), label: 'مفضلة' }, { val: '3', label: 'كوبون' }].map(s => (
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

            <AnimatePresence mode="wait">
              {activeTab === 'balance' && (
                <motion.div key="balance" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <h2 className="text-xl font-bold font-playfair text-white mb-6">الرصيد والمحفظة</h2>

                  {/* Balance Card */}
                  <div className="rounded-2xl border border-[#D4A24C]/20 bg-gradient-to-l from-[#D4A24C]/10 to-[#C89A3D]/5 p-6 mb-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-[#D4A24C]/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="relative">
                      <p className="text-xs text-white/40 font-cairo mb-1">الرصيد الحالي</p>
                      <p className="text-4xl font-bold text-[#D4A24C] font-english mb-1">EGP {walletBalance.toLocaleString()}</p>
                      <p className="text-xs text-white/30 font-cairo">صالح للاستخدام</p>
                      <div className="flex gap-3 mt-5">
                        <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4A24C] to-[#C89A3D] text-[#080C18] text-xs font-bold font-cairo hover:shadow-[0_4px_15px_rgba(212,162,76,0.3)] transition-all">
                          إيداع
                        </button>
                        <button className="px-5 py-2.5 rounded-xl border border-[#D4A24C]/30 text-[#D4A24C] text-xs font-bold font-cairo hover:bg-[#D4A24C]/5 transition-all">
                          سحب
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="rounded-2xl border border-white/[0.06] bg-[#0F1525] p-5">
                      <p className="text-xs text-white/30 font-cairo mb-3">نقاط الولاء</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-[#D4A24C] font-english">{loyaltyPoints.toLocaleString()} نقطة</p>
                        <div className="w-12 h-12 rounded-xl bg-[#D4A24C]/10 flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4A24C"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>
                        </div>
                      </div>
                      <p className="text-[10px] text-white/30 font-cairo mt-2">المستوى: <span className="text-[#D4A24C] font-medium">الذهب</span></p>
                    </div>
                    <div className="rounded-2xl border border-white/[0.06] bg-[#0F1525] p-5">
                      <p className="text-xs text-white/30 font-cairo mb-3">إجمالي الدخل</p>
                      <p className="text-xl font-bold text-emerald-400 font-english">+EGP {totalIncome.toLocaleString()}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-[#141B2D]">
                          <div className="h-1.5 rounded-full bg-emerald-400" style={{ width: `${(totalIncome / (totalIncome + totalExpense)) * 100}%` }} />
                        </div>
                        <span className="text-[10px] text-white/30 font-english">{Math.round((totalIncome / (totalIncome + totalExpense)) * 100)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Transactions */}
                  <div className="rounded-2xl border border-white/[0.06] bg-[#0F1525] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-bold text-white mb-0 font-cairo">آخر المعاملات</p>
                      <button onClick={() => setActiveTab('transactions')} className="text-[#D4A24C] text-xs font-cairo hover:underline">عرض الكل</button>
                    </div>
                    <div className="space-y-3">
                      {transactions.slice(0, 3).map((t, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#141B2D]/50 border border-white/[0.04]">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${t.amount > 0 ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                              {t.amount > 0 ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                              ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-white text-sm font-cairo">{t.title}</p>
                              <p className="text-[10px] text-white/30 font-cairo">{t.date}</p>
                            </div>
                          </div>
                          <span className={`font-bold text-sm font-english ${t.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>{t.amount > 0 ? '+' : ''}EGP {Math.abs(t.amount).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'transactions' && (
                <motion.div key="transactions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <h2 className="text-xl font-bold font-playfair text-white mb-6">المعاملات</h2>

                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-white/50 font-cairo">إجمالي الدخل</p>
                    <p className="text-lg font-bold text-emerald-400 font-english">EGP {totalIncome.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-white/50 font-cairo">إجمالي المصروفات</p>
                    <p className="text-lg font-bold text-red-400 font-english">EGP {totalExpense.toLocaleString()}</p>
                  </div>

                  <div className="space-y-3">
                    {transactions.map((t, i) => (
                      <motion.div key={t.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-[#0F1525] border border-white/[0.06] hover:border-[#D4A24C]/15 transition-all">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${t.amount > 0 ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                            {t.amount > 0 ? (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                            ) : (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm font-cairo">{t.title}</p>
                            <p className="text-xs text-white/30 font-cairo">{t.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`font-bold text-sm font-english ${t.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>{t.amount > 0 ? '+' : ''}EGP {Math.abs(t.amount).toLocaleString()}</span>
                          <p className="text-[10px] text-white/30 font-cairo">{t.category}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'rewards' && (
                <motion.div key="rewards" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <h2 className="text-xl font-bold font-playfair text-white mb-6">المكافآت والنقاط</h2>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-white mb-3 font-cairo">الرصيد الحالي: {loyaltyPoints.toLocaleString()} نقطة</p>
                    <div className="bg-[#D4A24C]/5 rounded-xl p-4 border border-[#D4A24C]/10">
                      <div className="flex justify-between mb-1">
                        <span className="text-[10px] text-white/30 font-cairo">0 نقطة</span>
                        <span className="text-[10px] text-white/30 font-cairo">2000 نقطة</span>
                      </div>
                      <div className="w-full bg-[#141B2D] rounded-full h-2">
                        <div className="bg-[#D4A24C] h-2 rounded-full" style={{ width: '62%' }} />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-playfair text-white mb-4">المكافآت المتاحة</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rewards.map((r, i) => (
                      <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="rounded-2xl border border-white/[0.06] bg-[#0F1525] p-4 hover:border-[#D4A24C]/20 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#D4A24C]/10 flex items-center justify-center text-2xl">
                            {r.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-white text-sm font-cairo">{r.title}</p>
                            <p className="text-xs text-white/30 font-cairo mt-0.5">مستحق بحلول: {r.expiry}</p>
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-bold text-[#D4A24C] font-english">{r.points} نقطة</p>
                            <button className="text-xs text-[#D4A24C] font-cairo hover:underline">استبدل الآن</button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'offers' && (
                <motion.div key="offers" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  <h2 className="text-xl font-bold font-playfair text-white mb-6">العروض والخصومات</h2>
                  <div className="space-y-4">
                    {[
                      { title: 'خصم 20% على جميع رحلات النيل', discount: '20%', expiry: '31 يناير', icon: '🎫' },
                      { title: 'ترقية مجانية إلى VIP', discount: 'مجاناً', expiry: '28 فبراير', icon: '👑' },
                      { title: 'تجربة مجانية', discount: 'EGP 2,000', expiry: '15 مارس', icon: '🎁' },
                      { title: 'خصم 15% على الغوص', discount: '15%', expiry: '31 مارس', icon: '🤿' },
                    ].map((offer, i) => (
                      <motion.div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[#0F1525] border border-white/[0.06] hover:border-[#D4A24C]/15 transition-all cursor-pointer">
                        <div className="w-12 h-12 rounded-xl bg-[#D4A24C]/10 flex items-center justify-center text-2xl shrink-0">
                          {offer.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-white text-sm font-cairo">{offer.title}</p>
                          <p className="text-sm text-[#D4A24C] font-english font-bold mt-1">{offer.discount} صالح حتى {offer.expiry}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                          <span className="text-[10px] text-white/30 font-cairo">طلب 45 مرة</span>
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
