'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiCalendar, HiUsers, HiCog, HiEye, HiUser, HiCreditCard,
  HiCheckCircle, HiQrcode, HiLocationMarker, HiStar, HiGift,
  HiChevronLeft, HiChevronRight, HiClock, HiShieldCheck, HiHeart,
} from 'react-icons/hi';
import Image from 'next/image';

/* ───── Step data ───── */
const steps = [
  { num: '01', title: 'اختيار التاريخ والوقت', icon: HiCalendar },
  { num: '02', title: 'تحديد المسافرين', icon: HiUsers },
  { num: '03', title: 'تخصيص التجربة', icon: HiCog },
  { num: '04', title: 'مراجعة الحجز', icon: HiEye },
  { num: '05', title: 'بيانات المسافر', icon: HiUser },
  { num: '06', title: 'الدفع الآمن', icon: HiCreditCard },
  { num: '07', title: 'تأكيد الحجز', icon: HiCheckCircle },
  { num: '08', title: 'التذاكر الرقمية', icon: HiQrcode },
  { num: '09', title: 'تتبع الرحلة', icon: HiLocationMarker },
  { num: '10', title: 'التقييم والمراجعة', icon: HiStar },
  { num: '11', title: 'العروض والولاء', icon: HiGift },
];

/* ───── Calendar helper ───── */
const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
const dayNames = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];

/* ───── Phone Frame ───── */
const PhoneFrame = ({ children, active = false }: { children: React.ReactNode; active?: boolean }) => (
  <div className={`w-[220px] rounded-[24px] overflow-hidden border-2 transition-all duration-500 shrink-0 ${
    active ? 'border-theme-gold/50 shadow-[0_0_30px_rgba(212,162,76,0.15)]' : 'border-[#1E2A3D]'
  } bg-[#0A0E17]`}>
    <div className="h-6 bg-[#0F1420] flex items-center justify-between px-4 relative">
      <span className="text-[7px] text-[#5A6478] font-english">9:41</span>
      <div className="absolute left-1/2 -translate-x-1/2 top-1 w-14 h-3 bg-[#0A0E17] rounded-full" />
      <div className="flex gap-1"><div className="w-2.5 h-1.5 rounded-sm border border-[#5A6478]" /></div>
    </div>
    <div className="min-h-[380px] max-h-[380px] overflow-hidden">{children}</div>
  </div>
);

/* ───── Main ───── */
export default function Screen7_BookingCheckout() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(15);
  const [adults, setAdults] = useState(2);
  const [children_, setChildren] = useState(1);
  const [rating, setRating] = useState(0);

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white font-arabic" dir="ltr">
      <div className="max-w-[1500px] mx-auto px-6 py-8 flex gap-6">
        {/* ─── Sidebar ─── */}
        <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="w-64 shrink-0">
          <div className="sticky top-8 space-y-4">
            <div className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <span className="text-[10px] font-english text-theme-gold font-bold block mb-2">المرحلة 8</span>
              <h1 className="text-xl font-bold mb-1">حجز وتجربة سلسة</h1>
              <p className="text-theme-gold text-sm font-english font-semibold mb-3">Booking & Checkout Flow</p>
              <p className="text-[#8B95A5] text-xs leading-relaxed mb-3">
                رحلة حجز سهلة وبسيطة — من اختيار التجربة حتى تأكيد الحجز والدفع.
              </p>
              <div className="flex gap-2 flex-wrap">
                {['اختيار التاريخ', 'تحديد المسافرين', 'تخصيص التجربة', 'مراجعة الحجز', 'تذاكر وبطاقات رقمية'].map(f => (
                  <span key={f} className="flex items-center gap-1 text-[9px] text-[#8B95A5]">
                    <div className="w-1 h-1 rounded-full bg-theme-gold" />{f}
                  </span>
                ))}
              </div>
            </div>

            {/* Step navigator */}
            <div className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-4 space-y-0.5">
              {steps.map((step, i) => (
                <button key={i} onClick={() => setActiveStep(i)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-right transition-all ${
                    activeStep === i ? 'bg-theme-gold/10 text-theme-gold font-medium' : 'text-[#8B95A5] hover:text-white hover:bg-[#1A2235]'
                  }`}>
                  <span className={`w-5 h-5 rounded text-[8px] font-bold flex items-center justify-center font-english ${
                    activeStep === i ? 'bg-theme-gold text-[#0A0E17]' : i < activeStep ? 'bg-green-500/20 text-green-400' : 'bg-[#1A2235] text-[#5A6478]'
                  }`}>{i < activeStep ? '✓' : step.num}</span>
                  <span className="text-[11px] truncate">{step.title}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* ─── Main ─── */}
        <div className="flex-1 min-w-0">
          {/* Top row - Steps 1-5 */}
          <div className="mb-8">
            <h2 className="text-sm font-bold text-theme-gold mb-4">خطوات الحجز</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">

              {/* Step 01 - Date/Time */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
                <p className="text-[10px] text-[#5A6478] mb-2">01. اختيار التاريخ</p>
                <PhoneFrame active={activeStep === 0}>
                  <div className="px-3 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <HiChevronRight className="text-[#5A6478] text-xs" />
                      <span className="text-[9px] font-bold font-english">يناير 2025</span>
                      <HiChevronLeft className="text-[#5A6478] text-xs" />
                    </div>
                    <div className="grid grid-cols-7 gap-0.5 mb-3">
                      {dayNames.map(d => (
                        <span key={d} className="text-[7px] text-[#5A6478] text-center py-1">{d}</span>
                      ))}
                      {/* offset */}
                      {[0, 0, 0].map((_, i) => <div key={`e${i}`} />)}
                      {calendarDays.map(d => (
                        <button key={d} onClick={() => setSelectedDate(d)}
                          className={`text-[8px] py-1 rounded transition-all ${
                            d === selectedDate ? 'bg-theme-gold text-[#0A0E17] font-bold' :
                            d > 13 && d < 20 ? 'text-white hover:bg-[#1A2235]' : 'text-[#5A6478]'
                          }`}>{d}</button>
                      ))}
                    </div>
                    <div className="bg-[#141B2D] rounded-xl p-2 border border-[#1E2A3D] mb-2">
                      <p className="text-[7px] text-[#5A6478]">الوقت المختار</p>
                      <p className="text-[9px] font-english">09:00 صباحاً</p>
                    </div>
                    <button className="w-full py-2 rounded-xl bg-gradient-to-l from-theme-gold to-accent-orange text-[#0A0E17] font-bold text-[9px]">التالي</button>
                  </div>
                </PhoneFrame>
              </motion.div>

              {/* Step 02 - Travelers */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex flex-col items-center">
                <p className="text-[10px] text-[#5A6478] mb-2">02. تحديد المسافرين</p>
                <PhoneFrame active={activeStep === 1}>
                  <div className="px-3 py-3">
                    <div className="relative rounded-xl overflow-hidden h-20 mb-3">
                      <Image src="/images/activities/desert-safari.svg" alt="" fill className="object-cover" />
                      <div className="absolute inset-0 bg-[#0A0E17]/50" />
                      <div className="absolute bottom-2 right-2"><p className="text-[8px] font-bold">رحلة سفاري في الصحراء</p></div>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#141B2D] border border-[#1E2A3D]">
                        <span className="text-[9px]">بالغين</span>
                        <div className="flex items-center gap-3">
                          <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-6 h-6 rounded-lg bg-[#1A2235] text-[#8B95A5] text-xs flex items-center justify-center">−</button>
                          <span className="text-sm font-bold font-english w-4 text-center">{adults}</span>
                          <button onClick={() => setAdults(adults + 1)} className="w-6 h-6 rounded-lg bg-theme-gold/15 text-theme-gold text-xs flex items-center justify-center">+</button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#141B2D] border border-[#1E2A3D]">
                        <span className="text-[9px]">أطفال</span>
                        <div className="flex items-center gap-3">
                          <button onClick={() => setChildren(Math.max(0, children_ - 1))} className="w-6 h-6 rounded-lg bg-[#1A2235] text-[#8B95A5] text-xs flex items-center justify-center">−</button>
                          <span className="text-sm font-bold font-english w-4 text-center">{children_}</span>
                          <button onClick={() => setChildren(children_ + 1)} className="w-6 h-6 rounded-lg bg-theme-gold/15 text-theme-gold text-xs flex items-center justify-center">+</button>
                        </div>
                      </div>
                    </div>
                    <div className="bg-theme-gold/5 rounded-xl p-2.5 border border-theme-gold/15 mb-3">
                      <div className="flex justify-between"><span className="text-[8px] text-[#8B95A5]">الإجمالي</span><span className="text-sm font-bold text-theme-gold font-english">EGP 3,600</span></div>
                    </div>
                    <button className="w-full py-2 rounded-xl bg-gradient-to-l from-theme-gold to-accent-orange text-[#0A0E17] font-bold text-[9px]">التالي</button>
                  </div>
                </PhoneFrame>
              </motion.div>

              {/* Step 03 - Customize */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col items-center">
                <p className="text-[10px] text-[#5A6478] mb-2">03. تخصيص التجربة</p>
                <PhoneFrame active={activeStep === 2}>
                  <div className="px-3 py-3">
                    <p className="text-[9px] font-bold mb-3">اختر الإضافات</p>
                    {[{ label: 'تصوير احترافي', price: '+EGP 200', checked: true },
                      { label: 'وجبة غداء فاخرة', price: '+EGP 150', checked: false },
                      { label: 'نقل خاص VIP', price: '+EGP 300', checked: true },
                      { label: 'مرشد سياحي خاص', price: '+EGP 400', checked: false }].map((opt, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-[#141B2D] border border-[#1E2A3D] mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${opt.checked ? 'bg-theme-gold border-theme-gold' : 'border-[#1E2A3D]'}`}>
                            {opt.checked && <span className="text-[#0A0E17] text-[7px]">✓</span>}
                          </div>
                          <span className="text-[8px]">{opt.label}</span>
                        </div>
                        <span className="text-[7px] text-theme-gold font-english">{opt.price}</span>
                      </div>
                    ))}
                    <div className="bg-theme-gold/5 rounded-xl p-2.5 border border-theme-gold/15 mt-3 mb-3">
                      <div className="flex justify-between"><span className="text-[8px] text-[#8B95A5]">الإجمالي</span><span className="text-sm font-bold text-theme-gold font-english">EGP 4,100</span></div>
                    </div>
                    <button className="w-full py-2 rounded-xl bg-gradient-to-l from-theme-gold to-accent-orange text-[#0A0E17] font-bold text-[9px]">التالي</button>
                  </div>
                </PhoneFrame>
              </motion.div>

              {/* Step 04 - Review */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex flex-col items-center">
                <p className="text-[10px] text-[#5A6478] mb-2">04. مراجعة الحجز</p>
                <PhoneFrame active={activeStep === 3}>
                  <div className="px-3 py-3">
                    <div className="relative rounded-xl overflow-hidden h-24 mb-3">
                      <Image src="/images/activities/desert-safari.svg" alt="" fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] to-transparent" />
                      <div className="absolute bottom-2 right-2"><p className="text-[9px] font-bold">رحلة سفاري في الصحراء</p></div>
                    </div>
                    <div className="space-y-1.5">
                      {[{ label: 'التاريخ', val: '15 يناير 2025' }, { label: 'الوقت', val: '09:00 صباحاً' }, { label: 'المسافرون', val: '2 بالغين + 1 طفل' }, { label: 'الإضافات', val: 'تصوير + نقل VIP' }].map(r => (
                        <div key={r.label} className="flex justify-between p-2 rounded-lg bg-[#141B2D]">
                          <span className="text-[7px] text-[#5A6478]">{r.label}</span>
                          <span className="text-[8px]">{r.val}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-theme-gold/5 rounded-xl p-2.5 border border-theme-gold/15 mt-3 mb-3">
                      <div className="flex justify-between"><span className="text-[8px]">الإجمالي</span><span className="text-lg font-bold text-theme-gold font-english">EGP 5,900</span></div>
                    </div>
                    <button className="w-full py-2 rounded-xl bg-gradient-to-l from-theme-gold to-accent-orange text-[#0A0E17] font-bold text-[9px]">تأكيد والدفع</button>
                  </div>
                </PhoneFrame>
              </motion.div>

              {/* Step 05 - Traveler Info */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col items-center">
                <p className="text-[10px] text-[#5A6478] mb-2">05. بيانات المسافر</p>
                <PhoneFrame active={activeStep === 4}>
                  <div className="px-3 py-3">
                    <p className="text-[9px] font-bold mb-3">بيانات المسافر الأول</p>
                    <div className="space-y-2">
                      {['الاسم الكامل', 'البريد الإلكتروني', 'رقم الهاتف', 'الجنسية', 'رقم جواز السفر'].map(f => (
                        <div key={f}>
                          <p className="text-[7px] text-[#5A6478] mb-0.5">{f}</p>
                          <input className="w-full bg-[#141B2D] rounded-lg px-2.5 py-2 text-[8px] border border-[#1E2A3D] outline-none focus:border-theme-gold/30 placeholder:text-[#5A6478]" />
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-3 py-2 rounded-xl bg-gradient-to-l from-theme-gold to-accent-orange text-[#0A0E17] font-bold text-[9px]">التالي</button>
                  </div>
                </PhoneFrame>
              </motion.div>

            </div>
          </div>

          {/* Bottom row - Steps 6-11 */}
          <div className="mb-8">
            <h2 className="text-sm font-bold text-theme-gold mb-4">الدفع والتأكيد</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">

              {/* Step 06 - Payment */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex flex-col items-center">
                <p className="text-[10px] text-[#5A6478] mb-2">06. الدفع</p>
                <PhoneFrame active={activeStep === 5}>
                  <div className="px-3 py-3">
                    <p className="text-[9px] font-bold mb-2">الدفع الآمن</p>
                    <div className="flex items-center gap-1 mb-3">
                      <HiShieldCheck className="text-green-400 text-xs" />
                      <span className="text-[7px] text-green-400">اتصال آمن ومشفر</span>
                    </div>
                    <div className="space-y-1.5 mb-3">
                      {['بطاقة ائتمان', 'تحويل بنكي', 'محفظة إلكترونية'].map((m, i) => (
                        <div key={m} className={`flex items-center gap-2 p-2.5 rounded-xl border ${i === 0 ? 'bg-theme-gold/5 border-theme-gold/25' : 'bg-[#141B2D] border-[#1E2A3D]'}`}>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${i === 0 ? 'border-theme-gold' : 'border-[#1E2A3D]'}`}>
                            {i === 0 && <div className="w-2 h-2 rounded-full bg-theme-gold" />}
                          </div>
                          <span className="text-[8px]">{m}</span>
                        </div>
                      ))}
                    </div>
                    <input placeholder="رقم البطاقة" className="w-full bg-[#141B2D] rounded-lg px-2.5 py-2 text-[8px] border border-[#1E2A3D] outline-none mb-1.5 font-english placeholder:text-[#5A6478]" />
                    <div className="flex gap-1.5 mb-3">
                      <input placeholder="MM/YY" className="flex-1 bg-[#141B2D] rounded-lg px-2.5 py-2 text-[8px] border border-[#1E2A3D] outline-none font-english placeholder:text-[#5A6478]" />
                      <input placeholder="CVV" className="w-16 bg-[#141B2D] rounded-lg px-2.5 py-2 text-[8px] border border-[#1E2A3D] outline-none font-english placeholder:text-[#5A6478]" />
                    </div>
                    <div className="bg-theme-gold/5 rounded-xl p-2 border border-theme-gold/15 mb-2">
                      <div className="flex justify-between"><span className="text-[8px]">الإجمالي</span><span className="text-sm font-bold text-theme-gold font-english">EGP 5,900</span></div>
                    </div>
                    <button className="w-full py-2 rounded-xl bg-gradient-to-l from-theme-gold to-accent-orange text-[#0A0E17] font-bold text-[9px]">ادفع الآن</button>
                  </div>
                </PhoneFrame>
              </motion.div>

              {/* Step 07 - Confirmation */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col items-center">
                <p className="text-[10px] text-[#5A6478] mb-2">07. تأكيد</p>
                <PhoneFrame active={activeStep === 6}>
                  <div className="px-3 py-4 text-center">
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 mx-auto rounded-full bg-green-500/15 flex items-center justify-center mb-3">
                      <HiCheckCircle className="text-3xl text-green-400" />
                    </motion.div>
                    <p className="text-sm font-bold mb-1">تم تأكيد حجزك بنجاح!</p>
                    <p className="text-[8px] text-[#8B95A5] mb-3">رقم الحجز: EH-4521</p>
                    <div className="bg-[#141B2D] rounded-xl p-3 border border-[#1E2A3D] text-right mb-3">
                      <p className="text-[8px] font-bold mb-1">رحلة سفاري في الصحراء</p>
                      <p className="text-[7px] text-[#5A6478]">15 يناير 2025 • 09:00 صباحاً</p>
                      <p className="text-[7px] text-[#5A6478]">3 مسافرين</p>
                      <p className="text-xs font-bold text-theme-gold font-english mt-1">EGP 5,900</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-1.5 rounded-lg border border-theme-gold/30 text-theme-gold text-[8px]">مشاركة</button>
                      <button className="flex-1 py-1.5 rounded-lg bg-theme-gold text-[#0A0E17] text-[8px] font-bold">التذكرة</button>
                    </div>
                  </div>
                </PhoneFrame>
              </motion.div>

              {/* Step 08 - Digital Ticket / QR */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="flex flex-col items-center">
                <p className="text-[10px] text-[#5A6478] mb-2">08. التذكرة الرقمية</p>
                <PhoneFrame active={activeStep === 7}>
                  <div className="px-3 py-3 text-center">
                    <div className="bg-[#141B2D] rounded-2xl border border-theme-gold/20 p-4 mb-3">
                      <div className="flex items-center gap-2 justify-center mb-3">
                        <div className="w-6 h-6 rounded bg-gradient-to-br from-theme-gold to-accent-orange flex items-center justify-center">
                          <span className="text-[8px] text-[#0A0E17] font-bold">م</span>
                        </div>
                        <span className="text-[8px] font-english font-bold">EGYPTHUB</span>
                      </div>
                      <p className="text-[9px] font-bold mb-1">رحلة سفاري في الصحراء</p>
                      <p className="text-[7px] text-[#5A6478] mb-3">15 يناير 2025 | 09:00 صباحاً</p>
                      {/* QR placeholder */}
                      <div className="w-28 h-28 mx-auto bg-white rounded-xl p-2 mb-3">
                        <div className="w-full h-full grid grid-cols-7 gap-0.5">
                          {Array.from({ length: 49 }).map((_, i) => (
                            <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-[#0A0E17]' : 'bg-white'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-[8px] text-[#5A6478] font-english">EH-4521-SAFARI</p>
                    </div>
                    <p className="text-[7px] text-[#5A6478]">امسح الكود عند نقطة الدخول</p>
                  </div>
                </PhoneFrame>
              </motion.div>

              {/* Step 09 - Trip Tracking */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col items-center">
                <p className="text-[10px] text-[#5A6478] mb-2">09. تتبع الرحلة</p>
                <PhoneFrame active={activeStep === 8}>
                  <div className="px-3 py-3">
                    <p className="text-[9px] font-bold mb-2">تتبع رحلتك</p>
                    <div className="relative pr-4 space-y-3">
                      {[{ time: '09:00', label: 'نقطة الانطلاق', status: 'done' },
                        { time: '10:30', label: 'ركوب الجمال', status: 'current' },
                        { time: '12:00', label: 'وقفة تصوير', status: 'upcoming' },
                        { time: '14:00', label: 'عشاء بدوي', status: 'upcoming' },
                        { time: '17:00', label: 'مراقبة الغروب', status: 'upcoming' }].map((s, i) => (
                        <div key={i} className="flex gap-3 relative">
                          <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full z-10 ${
                              s.status === 'done' ? 'bg-green-400' : s.status === 'current' ? 'bg-theme-gold animate-pulse' : 'bg-[#1A2235] border border-[#1E2A3D]'
                            }`} />
                            {i < 4 && <div className={`w-0.5 flex-1 mt-1 ${s.status === 'done' ? 'bg-green-400/30' : 'bg-[#1E2A3D]'}`} />}
                          </div>
                          <div className="pb-2">
                            <span className="text-[7px] text-[#5A6478] font-english">{s.time}</span>
                            <p className={`text-[8px] ${s.status === 'current' ? 'text-theme-gold font-bold' : 'text-[#8B95A5]'}`}>{s.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </PhoneFrame>
              </motion.div>

              {/* Step 10 - Rating */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="flex flex-col items-center">
                <p className="text-[10px] text-[#5A6478] mb-2">10. التقييم</p>
                <PhoneFrame active={activeStep === 9}>
                  <div className="px-3 py-4 text-center">
                    <p className="text-[9px] font-bold mb-1">كيف كانت تجربتك؟</p>
                    <p className="text-[7px] text-[#5A6478] mb-4">نحب نسمع رأيك</p>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map(s => (
                        <button key={s} onClick={() => setRating(s)}>
                          <HiStar className={`text-2xl ${s <= rating ? 'text-theme-gold' : 'text-[#1A2235]'}`} />
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <textarea placeholder="اكتب تعليقك..." rows={3}
                          className="w-full bg-[#141B2D] rounded-xl px-3 py-2 text-[8px] border border-[#1E2A3D] outline-none resize-none placeholder:text-[#5A6478] mb-3" />
                        <button className="w-full py-2 rounded-xl bg-gradient-to-l from-theme-gold to-accent-orange text-[#0A0E17] font-bold text-[9px]">إرسال التقييم</button>
                      </motion.div>
                    )}
                  </div>
                </PhoneFrame>
              </motion.div>

              {/* Step 11 - Loyalty */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col items-center">
                <p className="text-[10px] text-[#5A6478] mb-2">11. العروض والولاء</p>
                <PhoneFrame active={activeStep === 10}>
                  <div className="px-3 py-3 text-center">
                    <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                      className="w-12 h-12 mx-auto rounded-full bg-theme-gold/15 flex items-center justify-center mb-3">
                      <HiGift className="text-2xl text-theme-gold" />
                    </motion.div>
                    <p className="text-[9px] font-bold mb-1">نقاط الولاء</p>
                    <p className="text-xl font-bold text-theme-gold font-english mb-1">2,450</p>
                    <p className="text-[7px] text-[#5A6478] mb-3">نقطة مكتسبة</p>
                    <div className="space-y-1.5">
                      {[{ offer: 'خصم 15% على الحجز القادم', pts: '500 نقطة' },
                        { offer: 'ترقية VIP مجانية', pts: '1000 نقطة' },
                        { offer: 'تجربة مجانية', pts: '2000 نقطة' }].map(o => (
                        <div key={o.offer} className="flex items-center justify-between p-2 rounded-lg bg-[#141B2D] border border-[#1E2A3D]">
                          <span className="text-[7px]">{o.offer}</span>
                          <span className="text-[6px] text-theme-gold font-english">{o.pts}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </PhoneFrame>
              </motion.div>

            </div>
          </div>

          {/* Payment Methods Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-4 flex items-center justify-center gap-6">
            {['VISA', 'mastercard', 'Meeza', 'فوري', 'Apple Pay'].map(m => (
              <span key={m} className="text-xs text-[#5A6478] font-english font-bold opacity-50 hover:opacity-100 transition-opacity cursor-pointer">{m}</span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
