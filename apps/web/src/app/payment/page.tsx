'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCalendar, HiUser, HiChevronLeft, HiChevronRight, HiHeart, HiStar, HiCreditCard, HiCheck, HiCheckCircle, HiLocationMarker, HiClock, HiCurrencyDollar, HiEye, HiEyeOff } from 'react-icons/hi';

/* ───── Mock Data ───── */
const paymentMethods = [
  { id: 1, type: 'بطاقة ائتمان', icon: '💳', number: '**** **** **** 4521', holder: 'أحمد محمد', expiry: '12/28', isDefault: true },
  { id: 2, type: 'محفظة إلكترونية', icon: '📱', number: '0123 4567 8910', holder: 'أحمد محمد', expiry: '', isDefault: false },
  { id: 3, type: 'تحويل بنكي', icon: '🏦', number: 'EGP 9,999', holder: 'حساب التوفير', expiry: '', isDefault: false },
];

export default function PaymentSelectionPage() {
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

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
                <span className="text-[10px] font-bold text-theme-gold block mb-2 font-english">المرحلة 6</span>
                <h1 className="text-lg font-bold font-playfair text-theme mb-1">اختيار الدفع</h1>
                <p className="text-theme-secondary text-xs font-cairo mb-3">اختر طريقة الدفع المفضلة</p>
                <div className="flex gap-2 flex-wrap">
                  {['بطاقة', 'محفظة', 'تحويل'].map(f => (
                    <span key={f} className="flex items-center gap-1 text-[9px] text-theme-muted">
                      <div className="w-1 h-1 rounded-full bg-theme-gold" />{f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-4 space-y-0.5">
                {[
                  { num: '06', title: 'بيانات المسافر' },
                  { num: '07', title: 'الدفع الآمن' },
                  { num: '08', title: 'تأكيد الحجز' },
                  { num: '09', title: 'تذاكر الرقمية' },
                ].map((s, i) => (
                  <button key={i} onClick={() => setSelectedMethod(i)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-right transition-all ${
                      selectedMethod === i ? 'bg-theme-gold/10 text-theme-gold font-medium' : 'text-theme-secondary hover:text-theme hover:bg-theme-elevated'
                    }`}>
                    <span className={`w-6 h-6 rounded text-[9px] font-bold flex items-center justify-center font-english ${
                      selectedMethod === i ? 'bg-theme-gold text-dark-900' : 'bg-theme-elevated text-theme-muted'
                    }`}>{selectedMethod === i ? '✓' : s.num}</span>
                    <span className="text-xs truncate font-cairo">{s.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          <div className="flex-1 min-w-0">
            <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 lg:p-8">
              <AnimatePresence mode="wait">
                {selectedMethod === 0 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">06</span>
                    <h2 className="text-xl font-bold font-playfair text-theme mb-6">بيانات بطاقة الائتمان</h2>
                    <div className="space-y-4 mb-6">
                      {[
                        { label: 'رقم البطاقة', value: cardNumber, setter: setCardNumber, placeholder: '**** **** **** 4521', maxLength: 16 },
                        { label: 'تاريخ الانتهاء', value: expiry, setter: setExpiry, placeholder: 'MM/YY', maxLength: 5 },
                        { label: 'CVV', value: cvv, setter: setCvv, placeholder: '•••', maxLength: 3 },
                        { label: 'اسم حامل البطاقة', value: cardHolder, setter: setCardHolder, placeholder: 'أحمد محمد', maxLength: 50 },
                      ].map((field, i) => (
                        <div key={i}>
                          <label className="block text-sm font-medium text-theme mb-1.5 font-cairo">{field.label}</label>
                          <div className="relative">
                            <input
                              type={field.label.includes('CVV') ? 'password' : 'text'}
                              value={field.value}
                              onChange={(e) => field.setter(e.target.value)}
                              placeholder={field.placeholder}
                              maxLength={field.maxLength}
                              className="w-full bg-theme-surface border rounded-xl px-4 py-3 outline-none transition-all duration-200 focus:border-theme-gold/40 text-theme placeholder-theme-muted font-cairo ${field.label.includes('CVV') ? 'font-english' : ''}"
                              dir="ltr"
                            />
                            {field.label.includes('CVV') && (
                              <button className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-gold transition-colors">
                                <HiEyeOff className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-theme-surface rounded-xl p-4 border border-theme-border mb-6">
                      <p className="text-xs text-theme-muted font-cairo mb-2">سيتم خصم المبلغ من بطاقتك المسجلة باسم أحمد محمد.</p>
                      <p className="text-sm text-theme font-cairo">جميع البطاقات آمنة ومشفرة.</p>
                    </div>
                    <div className="flex justify-between">
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedMethod(1)}
                        className="px-8 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold text-sm font-cairo">
                        التالي
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {selectedMethod === 1 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">07</span>
                    <h2 className="text-xl font-bold font-playfair text-theme mb-6">تأكيد الدفع الآمن</h2>
                    <div className="bg-theme-surface rounded-xl p-6 border border-theme-border mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-theme-card border border-theme-gold/30 flex items-center justify-center">
                          <HiCreditCard className="text-theme-gold text-xl" />
                        </div>
                        <div>
                          <p className="font-bold text-theme text-sm font-cairo">بطاقة ائتمان</p>
                          <p className="text-xs text-theme-muted font-english">**** **** **** 4521</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {['اتصال آمن ومشفر', 'حماية ضد الاحتيال', 'إشعار مرئي'].map((t, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <HiCheck className="text-green-400" />
                            <span className="text-sm text-theme font-cairo">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-theme-gold/5 rounded-xl p-4 border border-theme-gold/15 mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-theme font-cairo font-medium">المبلغ الإجمالي</p>
                          <p className="text-xs text-theme-muted font-cairo">قابل للاسترداد خلال 24 ساعة</p>
                        </div>
                        <span className="text-2xl font-bold text-theme-gold font-english">EGP 9,070</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedMethod(0)}
                        className="px-6 py-3 rounded-xl border border-theme-border text-theme-secondary font-cairo text-sm hover:bg-theme-elevated transition-all">
                        السابق
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedMethod(2)}
                        className="px-8 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold text-sm font-cairo">
                        تأكيد الدفع
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {selectedMethod === 2 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center py-12">
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 mx-auto rounded-full bg-green-500/15 flex items-center justify-center mb-6">
                      <HiCheckCircle className="text-4xl text-green-400" />
                    </motion.div>
                    <h2 className="text-2xl font-bold font-playfair text-theme mb-4">تم تأكيد الحجز بنجاح!</h2>
                    <p className="text-theme-secondary font-cairo mb-2">رقم الحجز: EH-4521</p>
                    <p className="text-theme-muted text-sm mb-8">تم إرسال تأكيد الحجز إلى بريدك الإلكتروني.</p>
                    <div className="flex gap-3 justify-center">
                      <Link href="/booking/confirmation"
                        className="px-6 py-3 rounded-xl border border-theme-gold/30 text-theme-gold font-cairo font-medium hover:bg-theme-gold/5 transition-all">
                        عرض التذكرة
                      </Link>
                      <Link href="/bookings"
                        className="px-6 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold font-cairo hover:opacity-90 transition-all">
                        الذهاب للرحلات
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
