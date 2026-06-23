'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiCalendar, HiUsers, HiCog, HiEye, HiUser, HiCreditCard,
  HiCheckCircle, HiChevronLeft, HiChevronRight, HiClock,
  HiLocationMarker, HiStar, HiShieldCheck, HiPlus, HiMinus,
  HiBadgeCheck, HiGift,
} from 'react-icons/hi';

const steps = [
  { num: '01', title: 'التاريخ والوقت', icon: HiCalendar },
  { num: '02', title: 'المسافرين', icon: HiUsers },
  { num: '03', title: 'الإضافات', icon: HiCog },
  { num: '04', title: 'المراجعة', icon: HiEye },
  { num: '05', title: 'الدفع', icon: HiCreditCard },
];

const dayNames = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];
const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

const addOns = [
  { label: 'تصوير احترافي', price: 200, icon: '📸' },
  { label: 'وجبة غداء فاخرة', price: 150, icon: '🍽️' },
  { label: 'نقل خاص VIP', price: 300, icon: '🚐' },
  { label: 'مرشد سياحي خاص', price: 400, icon: '🎙️' },
  { label: 'جولة تصوير جوي', price: 500, icon: '📷' },
];

const paymentMethods = [
  { name: 'بطاقة ائتمان', icon: '💳' },
  { name: 'تحويل بنكي', icon: '🏦' },
  { name: 'محفظة إلكترونية', icon: '📱' },
];

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(15);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([0, 2]);
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const toggleAddOn = (idx: number) => {
    setSelectedAddOns(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const totalBase = 1800;
  const addOnTotal = selectedAddOns.reduce((sum, i) => sum + addOns[i].price, 0);
  const total = totalBase + addOnTotal;

  if (confirmed) {
    return (
      <div className="min-h-screen bg-theme-bg pt-24">
        <div className="max-w-[600px] mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-theme-gold/20 bg-theme-card p-8 text-center">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 mx-auto rounded-full bg-green-500/15 flex items-center justify-center mb-4">
              <HiCheckCircle className="text-4xl text-green-400" />
            </motion.div>
            <h1 className="text-2xl font-bold font-playfair text-theme mb-2">تم تأكيد حجزك بنجاح!</h1>
            <p className="text-theme-secondary font-cairo text-sm mb-2">رقم الحجز: <span className="text-theme-gold font-bold font-english">EH-{Math.floor(1000 + Math.random() * 9000)}</span></p>
            <div className="bg-theme-surface rounded-xl p-4 border border-theme-border text-right mb-6">
              <p className="font-bold text-theme font-cairo mb-1">مغامرة الغوص في البحر الأحمر</p>
              <p className="text-theme-muted text-sm font-cairo flex items-center gap-1">
                <HiCalendar className="text-theme-gold" />
                {selectedDate} يناير 2025 • 09:00 صباحاً
              </p>
              <p className="text-theme-muted text-sm font-cairo flex items-center gap-1">
                <HiUsers className="text-theme-gold" />
                {adults} بالغين{children > 0 ? ` + ${children} أطفال` : ''}
              </p>
              <p className="text-xl font-bold text-theme-gold font-english mt-2">EGP {total.toLocaleString()}</p>
            </div>
            <div className="flex gap-3">
              <Link href="/booking/confirmation" className="flex-1 py-3 rounded-xl border border-theme-gold/30 text-theme-gold text-sm font-cairo font-bold text-center hover:bg-theme-gold/5 transition-all">
                عرض التذكرة
              </Link>
              <Link href="/" className="flex-1 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 text-sm font-cairo font-bold text-center hover:opacity-90 transition-all">
                العودة للرئيسية
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

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
                <span className="text-[10px] font-bold text-theme-gold block mb-1 font-english">المرحلة 8</span>
                <h2 className="text-lg font-bold font-playfair text-theme mb-1">حجز وتجربة سلسة</h2>
                <p className="text-theme-secondary text-xs font-cairo mb-3">Booking & Checkout Flow</p>
                <p className="text-theme-muted text-xs leading-relaxed font-cairo">
                  رحلة حجز سهلة وبسيطة — من اختيار التجربة حتى تأكيد الحجز والدفع.
                </p>
              </div>
              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-4 space-y-0.5">
                {steps.map((s, i) => (
                  <button key={i} onClick={() => setStep(i)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-right transition-all ${
                      step === i ? 'bg-theme-gold/10 text-theme-gold font-medium' : 'text-theme-secondary hover:text-theme hover:bg-theme-elevated'
                    }`}>
                    <span className={`w-6 h-6 rounded text-[9px] font-bold flex items-center justify-center font-english ${
                      step === i ? 'bg-theme-gold text-dark-900' : i < step ? 'bg-green-500/20 text-green-400' : 'bg-theme-elevated text-theme-muted'
                    }`}>{i < step ? '✓' : s.num}</span>
                    <span className="text-xs truncate font-cairo">{s.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          <div className="flex-1 min-w-0">
            <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-6 lg:p-8">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">01</span>
                    <h2 className="text-xl font-bold font-playfair text-theme mb-6">اختيار التاريخ والوقت</h2>
                    <div className="flex items-center justify-between mb-4">
                      <button className="text-theme-gold text-sm flex items-center gap-1 font-cairo"><HiChevronRight /> الأسبوع السابق</button>
                      <span className="text-sm font-bold font-cairo text-theme">يناير 2025</span>
                      <button className="text-theme-gold text-sm flex items-center gap-1 font-cairo">الأسبوع التالي <HiChevronLeft /></button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-6">
                      {dayNames.map(d => (
                        <span key={d} className="text-xs text-theme-muted text-center py-2 font-cairo">{d}</span>
                      ))}
                      {[0, 0, 0].map((_, i) => <div key={`e${i}`} />)}
                      {calendarDays.map(d => (
                        <button key={d} onClick={() => setSelectedDate(d)}
                          className={`text-sm py-3 rounded-xl transition-all font-cairo ${
                            d === selectedDate ? 'bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold' :
                            d > 10 && d < 25 ? 'text-theme hover:bg-theme-elevated' : 'text-theme-muted'
                          }`}>{d}</button>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {['09:00 صباحاً', '12:00 ظهراً', '15:00 عصراً'].map((t, i) => (
                        <button key={t} className={`flex items-center justify-center gap-2 p-3 rounded-xl border font-cairo text-sm transition-all ${
                          i === 0 ? 'border-theme-gold bg-theme-gold/10 text-theme-gold' : 'border-theme-border bg-theme-surface text-theme-secondary hover:border-theme-gold/30'
                        }`}>
                          <HiClock className="text-sm" />{t}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-theme-muted text-sm font-cairo">التاريخ المختار: <span className="text-theme font-bold">{selectedDate} يناير 2025</span></p>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(1)}
                        className="px-8 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold text-sm font-cairo">
                        التالي
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">02</span>
                    <h2 className="text-xl font-bold font-playfair text-theme mb-6">تحديد المسافرين</h2>
                    <div className="space-y-4 mb-6">
                      {[
                        { label: 'بالغين', desc: '13 سنة فأكثر', val: adults, set: setAdults, min: 1 },
                        { label: 'أطفال', desc: '2 - 12 سنة', val: children, set: setChildren, min: 0 },
                      ].map(p => (
                        <div key={p.label} className="flex items-center justify-between p-4 rounded-xl bg-theme-surface border border-theme-border">
                          <div>
                            <p className="font-bold text-theme font-cairo">{p.label}</p>
                            <p className="text-xs text-theme-muted font-cairo">{p.desc}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <motion.button whileTap={{ scale: 0.9 }}
                              onClick={() => p.set(Math.max(p.min, p.val - 1))}
                              className="w-9 h-9 rounded-lg bg-theme-elevated text-theme-secondary hover:bg-theme-hover transition-colors flex items-center justify-center">
                              <HiMinus className="text-sm" />
                            </motion.button>
                            <span className="text-lg font-bold text-theme font-english w-6 text-center">{p.val}</span>
                            <motion.button whileTap={{ scale: 0.9 }}
                              onClick={() => p.set(p.val + 1)}
                              className="w-9 h-9 rounded-lg bg-theme-gold/15 text-theme-gold hover:bg-theme-gold/25 transition-colors flex items-center justify-center">
                              <HiPlus className="text-sm" />
                            </motion.button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="bg-theme-gold/5 rounded-xl p-3 border border-theme-gold/15">
                        <p className="text-xs text-theme-muted font-cairo">إجمالي المسافرين</p>
                        <p className="text-lg font-bold text-theme-gold font-english">{adults + children} مسافر</p>
                      </div>
                      <div className="flex gap-3">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          onClick={() => setStep(0)}
                          className="px-6 py-3 rounded-xl border border-theme-border text-theme-secondary font-cairo text-sm hover:bg-theme-elevated transition-all">
                          السابق
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          onClick={() => setStep(2)}
                          className="px-8 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold text-sm font-cairo">
                          التالي
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">03</span>
                    <h2 className="text-xl font-bold font-playfair text-theme mb-6">تخصيص التجربة</h2>
                    <div className="space-y-3 mb-6">
                      {addOns.map((a, i) => (
                        <motion.div key={i} whileHover={{ x: -3 }}
                          onClick={() => toggleAddOn(i)}
                          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                            selectedAddOns.includes(i) ? 'border-theme-gold/30 bg-theme-gold/5' : 'border-theme-border bg-theme-surface hover:border-theme-gold/20'
                          }`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                              selectedAddOns.includes(i) ? 'bg-theme-gold border-theme-gold' : 'border-theme-border'
                            }`}>
                              {selectedAddOns.includes(i) && <HiBadgeCheck className="text-dark-900 text-sm" />}
                            </div>
                            <span className="text-2xl">{a.icon}</span>
                            <div>
                              <p className="font-bold text-theme text-sm font-cairo">{a.label}</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-theme-gold font-english">+EGP {a.price}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="bg-theme-gold/5 rounded-xl p-3 border border-theme-gold/15">
                        <p className="text-xs text-theme-muted font-cairo">المبلغ الإضافي</p>
                        <p className="text-lg font-bold text-theme-gold font-english">EGP {addOnTotal.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-3">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          onClick={() => setStep(1)}
                          className="px-6 py-3 rounded-xl border border-theme-border text-theme-secondary font-cairo text-sm hover:bg-theme-elevated transition-all">
                          السابق
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          onClick={() => setStep(3)}
                          className="px-8 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold text-sm font-cairo">
                          التالي
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">04</span>
                    <h2 className="text-xl font-bold font-playfair text-theme mb-6">مراجعة الحجز</h2>
                    <div className="relative rounded-xl overflow-hidden h-40 mb-6">
                      <img src="/egypthub/images/activities/diving.svg" alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-theme-bg to-transparent" />
                      <div className="absolute bottom-3 right-3">
                        <p className="text-lg font-bold text-theme font-cairo">مغامرة الغوص في البحر الأحمر</p>
                        <div className="flex items-center gap-1">
                          <HiStar className="text-theme-gold text-sm" />
                          <span className="text-sm text-theme-secondary font-english">4.8</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {[
                        { label: 'التاريخ', val: `${selectedDate} يناير 2025` },
                        { label: 'الوقت', val: '09:00 صباحاً' },
                        { label: 'المسافرون', val: `${adults} بالغين${children > 0 ? ` + ${children} أطفال` : ''}` },
                        { label: 'المدة', val: 'يوم كامل' },
                      ].map(r => (
                        <div key={r.label} className="flex justify-between p-3 rounded-xl bg-theme-surface border border-theme-border">
                          <span className="text-xs text-theme-muted font-cairo">{r.label}</span>
                          <span className="text-sm text-theme font-cairo font-medium">{r.val}</span>
                        </div>
                      ))}
                    </div>
                    {selectedAddOns.length > 0 && (
                      <div className="mb-6">
                        <p className="text-sm font-bold text-theme mb-3 font-cairo">الإضافات المختارة</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedAddOns.map(i => (
                            <span key={i} className="px-3 py-1.5 rounded-lg bg-theme-gold/10 text-theme-gold text-xs font-cairo border border-theme-gold/20">
                              {addOns[i].label}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="bg-gradient-to-l from-theme-gold/10 to-accent-amber/5 rounded-xl p-4 border border-theme-gold/20 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-theme font-cairo">الإجمالي النهائي</span>
                        <span className="text-2xl font-bold text-theme-gold font-english">EGP {total.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(2)}
                        className="px-6 py-3 rounded-xl border border-theme-border text-theme-secondary font-cairo text-sm hover:bg-theme-elevated transition-all">
                        السابق
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(4)}
                        className="px-8 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold text-sm font-cairo">
                        متابعة للدفع
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">05</span>
                    <h2 className="text-xl font-bold font-playfair text-theme mb-6">الدفع الآمن</h2>
                    <div className="flex items-center gap-2 mb-6">
                      <HiShieldCheck className="text-green-400" />
                      <span className="text-xs text-green-400 font-cairo">اتصال آمن ومشفر</span>
                    </div>
                    <div className="space-y-3 mb-6">
                      {paymentMethods.map((m, i) => (
                        <div key={m.name} onClick={() => setPaymentMethod(i)}
                          className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                            paymentMethod === i ? 'border-theme-gold/30 bg-theme-gold/5' : 'border-theme-border bg-theme-surface hover:border-theme-gold/20'
                          }`}>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === i ? 'border-theme-gold' : 'border-theme-border'}`}>
                            {paymentMethod === i && <div className="w-2.5 h-2.5 rounded-full bg-theme-gold" />}
                          </div>
                          <span className="text-2xl">{m.icon}</span>
                          <span className="text-sm font-bold text-theme font-cairo">{m.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3 mb-6">
                      <div>
                        <p className="text-xs text-theme-muted mb-1 font-cairo">رقم البطاقة</p>
                        <input placeholder="1234 5678 9012 3456"
                          className="w-full bg-theme-surface rounded-xl px-4 py-3 text-sm border border-theme-border focus:border-theme-gold/40 outline-none font-english placeholder:text-theme-muted text-theme" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-theme-muted mb-1 font-cairo">تاريخ الانتهاء</p>
                          <input placeholder="MM/YY"
                            className="w-full bg-theme-surface rounded-xl px-4 py-3 text-sm border border-theme-border focus:border-theme-gold/40 outline-none font-english placeholder:text-theme-muted text-theme" />
                        </div>
                        <div>
                          <p className="text-xs text-theme-muted mb-1 font-cairo">CVV</p>
                          <input placeholder="•••"
                            className="w-full bg-theme-surface rounded-xl px-4 py-3 text-sm border border-theme-border focus:border-theme-gold/40 outline-none font-english placeholder:text-theme-muted text-theme" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-l from-theme-gold/10 to-accent-amber/5 rounded-xl p-4 border border-theme-gold/20 mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-theme-muted font-cairo">المبلغ المستحق</p>
                          <p className="text-xs text-green-400 font-cairo">قابل للاسترداد خلال 24 ساعة</p>
                        </div>
                        <span className="text-2xl font-bold text-theme-gold font-english">EGP {total.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(3)}
                        className="px-6 py-3 rounded-xl border border-theme-border text-theme-secondary font-cairo text-sm hover:bg-theme-elevated transition-all">
                        السابق
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setConfirmed(true)}
                        className="px-8 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold text-sm font-cairo">
                        ادفع الآن
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              {[0, 1, 2, 3, 4].map(i => (
                <button key={i} onClick={() => setStep(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    step === i ? 'bg-theme-gold w-8' : 'bg-theme-border hover:bg-theme-muted'
                  }`} />
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-theme-border bg-theme-card p-4 mt-6 flex items-center justify-center gap-6">
              {['VISA', 'mastercard', 'Meeza', 'فوري', 'Apple Pay'].map(m => (
                <span key={m} className="text-xs text-theme-muted font-english font-bold opacity-50 hover:opacity-100 transition-opacity cursor-pointer">{m}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
