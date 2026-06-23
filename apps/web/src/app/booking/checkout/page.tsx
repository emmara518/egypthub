'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCalendar, HiCreditCard, HiChevronLeft, HiChevronRight, HiCheck, HiChevronDown, HiUser, HiPlus, HiMinus, HiTrash, HiHeart } from 'react-icons/hi';

/* ───── Mock Data ───── */
const checkoutData = {
  items: [
    { id: '1', title: 'مغامرة الغوص في البحر الأحمر', image: '/egypthub/images/destinations/dahab.svg', date: '15 يناير 2025', time: '09:00 صباحاً', duration: 'يوم كامل', guests: '2 بالغين + 1 طفل', price: 5900, quantity: 1 },
    { id: '2', title: 'الإقامة في منتجع سيوة', image: '/egypthub/images/destinations/hurghada.svg', date: '16 يناير 2025', time: '11:00 صباحاً', duration: 'نصف يوم', guests: '2 بالغين', price: 2500, quantity: 1 },
  ],
  subtotal: 8400,
  tax: 670,
  total: 9070,
};

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const applyCoupon = () => {
    if (couponCode === 'SAVE20') {
      setAppliedCoupon(couponCode);
    }
  };

  const calculateTotal = () => {
    let total = checkoutData.subtotal + checkoutData.tax;
    if (appliedCoupon) total *= 0.8;
    return total;
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-theme-bg pt-24">
        <div className="max-w-[600px] mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-theme-gold/20 bg-theme-card p-8 text-center">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 mx-auto rounded-full bg-green-500/15 flex items-center justify-center mb-4">
              <HiCheck className="text-4xl text-green-400" />
            </motion.div>
            <h1 className="text-2xl font-bold font-playfair text-theme mb-2">تم تأكيد حجزك بنجاح!</h1>
            <p className="text-theme-secondary font-cairo text-sm mb-2">رقم الحجز: EH-4521</p>
            <div className="bg-theme-surface rounded-xl p-4 border border-theme-border text-right mb-6">
              <p className="font-bold text-theme font-cairo mb-1">مغامرة الغوص في البحر الأحمر</p>
              <p className="text-[10px] text-theme-muted font-cairo">15 يناير 2025 • 09:00 صباحاً</p>
              <p className="text-xs text-theme-muted font-cairo">EGP 5,900</p>
              <p className="text-xl font-bold text-theme-gold font-english mt-1">EGP 9,070</p>
            </div>
            <div className="flex gap-3">
              <Link href="/booking/confirmation" className="flex-1 py-3 rounded-xl border border-theme-gold/30 text-theme-gold text-sm font-cairo font-bold text-center hover:bg-theme-gold/5 transition-all">
                عرض التذكرة
              </Link>
              <Link href="/bookings" className="flex-1 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 text-sm font-cairo font-bold text-center hover:opacity-90 transition-all">
                الذهاب للرحلات
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
                <span className="text-[10px] font-bold text-theme-gold block mb-2 font-english">المرحلة 8</span>
                <h1 className="text-lg font-bold font-playfair text-theme mb-1">حجز وتجربة سلسة</h1>
                <p className="text-theme-secondary text-xs font-cairo mb-3">Booking & Checkout Flow</p>
                <div className="flex gap-2 flex-wrap">
                  {['اختيار التاريخ', 'تحديد المسافرين', 'تخصيص التجربة', 'مراجعة الحجز', 'الدفع'].map(f => (
                    <span key={f} className="flex items-center gap-1 text-[9px] text-theme-muted">
                      <div className="w-1 h-1 rounded-full bg-theme-gold" />{f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-4 space-y-0.5">
                {[
                  { num: '01', title: 'التاريخ والوقت' },
                  { num: '02', title: 'المسافرين' },
                  { num: '03', title: 'الإضافات' },
                  { num: '04', title: 'المراجعة' },
                  { num: '05', title: 'الدفع' },
                ].map((s, i) => (
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
                    <div className="space-y-4">
                      {checkoutData.items.map((item, i) => (
                        <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-theme-surface border border-theme hover:border-theme-gold/20 transition-all">
                          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-theme text-sm font-cairo">{item.title}</p>
                            <p className="text-xs text-theme-muted font-cairo mt-1">{item.date} • {item.time}</p>
                            <p className="text-xs text-theme-muted font-cairo">{item.duration} • {item.guests}</p>
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-theme-gold text-sm font-english">EGP {item.price.toLocaleString()}</p>
                            <p className="text-xs text-theme-muted font-cairo">الكمية: {item.quantity}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-6">
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(4)}
                        className="px-8 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold text-sm font-cairo">
                        متابعة للدفع
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">02</span>
                    <h2 className="text-xl font-bold font-playfair text-theme mb-6">اختيار الإضافات</h2>
                    <div className="space-y-3 mb-6">
                      {['تصوير احترافي (+200)', 'وجبة غداء فاخرة (+150)', 'نقل خاص VIP (+300)', 'مرشد سياحي خاص (+400)'].map((add, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-theme-surface border border-theme hover:border-theme-gold/20 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded border-2 border-theme-gold flex items-center justify-center">
                              <HiCheck className="text-dark-900 text-sm" />
                            </div>
                            <span className="text-sm text-theme font-cairo">{add}</span>
                          </div>
                          <span className="text-sm text-theme-secondary font-cairo">+200 EGP</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between">
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
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">03</span>
                    <h2 className="text-xl font-bold font-playfair text-theme mb-6">تخصيص التجربة</h2>
                    <div className="space-y-4 mb-6">
                      {[
                        { label: 'جولة بحرية خاصة', price: 800, selected: true },
                        { label: 'استقبال VIP', price: 200, selected: false },
                        { label: 'وجبة غداء نيلية', price: 150, selected: false },
                        { label: 'تصوير احترافي خاص', price: 300, selected: true },
                      ].map((add, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-theme-surface border border-theme hover:border-theme-gold/20 transition-all cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${add.selected ? 'bg-theme-gold border-theme-gold' : 'border-theme-border'}`}>
                              {add.selected && <HiCheck className="text-dark-900 text-sm" />}
                            </div>
                            <div>
                              <p className="font-bold text-theme text-sm font-cairo">{add.label}</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-theme-gold font-english">+EGP {add.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between">
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
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold font-english mb-3 inline-block">04</span>
                    <h2 className="text-xl font-bold font-playfair text-theme mb-6">مراجعة الحجز</h2>
                    <div className="space-y-4 mb-6">
                      {checkoutData.items.map((item, i) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-theme-surface border border-theme">
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-theme text-sm font-cairo">{item.title}</p>
                            <p className="text-xs text-theme-muted font-cairo mt-1">{item.date} • {item.time}</p>
                            <p className="text-xs text-theme-muted font-cairo">{item.guests}</p>
                          </div>
                          <span className="font-bold text-theme-gold font-english">EGP {item.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-theme-surface rounded-xl p-4 border border-theme-border mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-theme font-cairo">المجموع الأساسي</span>
                        <span className="text-sm font-bold text-theme font-english">EGP {checkoutData.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-theme font-cairo">الضريبة</span>
                        <span className="text-sm font-bold text-theme font-english">EGP {checkoutData.tax.toLocaleString()}</span>
                      </div>
                      {appliedCoupon && (
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-green-400 font-cairo">خصم كوبون ({appliedCoupon})</span>
                          <span className="text-sm font-bold text-green-400 font-english">-EGP {(checkoutData.subtotal * 0.2).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="border-t border-theme-border pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-theme font-cairo font-bold">المجموع النهائي</span>
                          <span className="text-lg font-bold text-theme-gold font-english">EGP {calculateTotal().toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-xs font-medium text-theme mb-2 font-cairo">كود الكوبون</label>
                      <div className="flex gap-2">
                        <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="مثال: SAVE20"
                          className="flex-1 bg-theme-surface rounded-xl px-4 py-3 text-sm border border-theme-border focus:border-theme-gold/40 outline-none font-cairo placeholder:text-theme-muted text-theme" />
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          onClick={applyCoupon}
                          className="px-6 py-3 rounded-xl bg-theme-surface border border-theme-gold/30 text-theme-gold font-cairo text-sm hover:bg-theme-gold/5 transition-all">
                          تطبيق
                        </motion.button>
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
                    <h2 className="text-xl font-bold font-playfair text-theme mb-6">اختيار طريقة الدفع</h2>
                    <div className="space-y-3 mb-6">
                      {[
                        { name: 'بطاقة ائتمان', icon: '💳', number: '**** **** **** 4521', holder: 'أحمد محمد', selected: true },
                        { name: 'محفظة إلكترونية', icon: '📱', number: '0123 4567 8910', holder: 'أحمد محمد', selected: false },
                        { name: 'تحويل بنكي', icon: '🏦', number: 'EGP 9,999', holder: 'حساب التوفير', selected: false },
                      ].map((p, i) => (
                        <div key={i} onClick={() => setPaymentMethod(i)}
                          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                            paymentMethod === i ? 'border-theme-gold/30 bg-theme-gold/5' : 'border-theme bg-theme-surface hover:border-theme-gold/20'
                          }`}>
                          <div className="w-10 h-10 rounded-lg bg-theme-surface border border-theme flex items-center justify-center text-theme-gold text-lg">
                            {p.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-theme text-sm font-cairo">{p.name}</p>
                            <p className="text-xs text-theme-muted font-english">{p.number}</p>
                            {p.holder && (<p className="text-xs text-theme-muted font-cairo">{p.holder}</p>)}
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === i ? 'border-theme-gold' : 'border-theme-border'}`}>
                            {paymentMethod === i && <div className="w-2.5 h-2.5 rounded-full bg-theme-gold" />}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-theme-surface rounded-xl p-4 border border-theme-border mb-6">
                      <p className="text-xs text-theme-muted font-cairo mb-2">سيتم خصم المبلغ من بطاقتك المسجلة باسم أحمد محمد.</p>
                      <p className="text-sm text-theme font-cairo">سيتم تأكيد الحجز خلال 2-3 ثوانٍ.</p>
                    </div>
                    <div className="flex justify-between">
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(3)}
                        className="px-6 py-3 rounded-xl border border-theme-border text-theme-secondary font-cairo text-sm hover:bg-theme-elevated transition-all">
                        السابق
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(2)}
                        className="px-8 py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold text-sm font-cairo">
                        ادفع الآن
                      </motion.button>
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
