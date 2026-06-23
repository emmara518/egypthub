'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiHome, HiSearch, HiHeart, HiUser, HiStar, HiLocationMarker,
  HiCalendar, HiClock, HiBell, HiChat, HiMap, HiCamera,
  HiBookmark, HiCog, HiChevronLeft, HiMenu, HiShoppingBag,
} from 'react-icons/hi';

/* ───── Phone Frame Wrapper ───── */
const PhoneFrame = ({ title, num, children, active = false }: { title: string; num: string; children: React.ReactNode; active?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -6 }}
    className="flex flex-col items-center group"
  >
    <p className="text-[10px] text-[#5A6478] mb-2 font-english">{num}. {title}</p>
    <div className={`w-[200px] rounded-[24px] overflow-hidden border-2 transition-all duration-500 ${
      active ? 'border-theme-gold/50 shadow-[0_0_30px_rgba(212,162,76,0.15)]' : 'border-[#1E2A3D] group-hover:border-theme-gold/30'
    } bg-[#0A0E17]`}>
      {/* Notch */}
      <div className="h-6 bg-[#0F1420] flex items-center justify-between px-4 relative">
        <span className="text-[7px] text-[#5A6478] font-english">9:41</span>
        <div className="absolute left-1/2 -translate-x-1/2 top-1 w-14 h-3 bg-[#0A0E17] rounded-full" />
        <div className="flex gap-0.5">
          <div className="w-2.5 h-1.5 rounded-sm border border-[#5A6478]"><div className="w-1.5 h-full bg-[#5A6478] rounded-sm" /></div>
        </div>
      </div>
      {/* Content */}
      <div className="min-h-[340px] max-h-[340px] overflow-hidden">
        {children}
      </div>
    </div>
  </motion.div>
);

/* ───── Bottom Nav ───── */
const BottomNav = ({ active = 0 }: { active?: number }) => {
  const items = [HiHome, HiSearch, HiHeart, HiUser, HiMenu];
  return (
    <div className="flex items-center justify-around py-2 bg-[#0F1420] border-t border-[#1E2A3D]">
      {items.map((Icon, i) => (
        <div key={i} className={`p-1.5 rounded-lg ${i === active ? 'text-theme-gold' : 'text-[#5A6478]'}`}>
          <Icon className="text-sm" />
        </div>
      ))}
    </div>
  );
};

/* ───── Screen Header ───── */
const ScreenHeader = ({ title, showBack = false }: { title: string; showBack?: boolean }) => (
  <div className="flex items-center justify-between px-3 py-2 bg-[#0F1420]/80 backdrop-blur-sm">
    <div className="flex items-center gap-2">
      {showBack && <HiChevronLeft className="text-theme-gold text-sm rtl:rotate-180" />}
      <span className="text-[10px] font-bold">{title}</span>
    </div>
    <HiBell className="text-sm text-[#5A6478]" />
  </div>
);

/* ───── Main Component ───── */
export default function Screen6_MobileExperience() {
  const [activeScreen, setActiveScreen] = useState(0);

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white font-arabic" dir="rtl">
      <div className="max-w-[1500px] mx-auto px-6 py-8 flex gap-6">
        {/* ─── Sidebar ─── */}
        <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="w-64 shrink-0">
          <div className="sticky top-8 space-y-4">
            <div className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <span className="text-[10px] font-english text-theme-gold font-bold block mb-2">المرحلة 7</span>
              <h1 className="text-xl font-bold mb-1">تجربة الموبايل</h1>
              <p className="text-theme-gold text-sm font-english font-semibold mb-3">Mobile Experience</p>
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-theme-gold/20 to-accent-orange/10 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">📱</span>
              </div>
              <p className="text-[#8B95A5] text-xs leading-relaxed text-center mb-3">
                تطبيق EgyptHub بتصميم iOS ومتجاوب. كل الشاشات والتجارب في تنسيق الهاتف المحمول.
              </p>
            </div>
            <div className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-4 space-y-1">
              {['الشاشة الرئيسية', 'استكشاف الوجهات', 'تفاصيل الوجهة', 'تفاصيل التجربة', 'مساعد AI', 'حجز سريع', 'الحجوزات', 'المفضلة', 'الخريطة التفاعلية', 'الإشعارات', 'الملف الشخصي', 'شاشة التسجيل', 'شاشة البداية'].map((s, i) => (
                <button key={i} onClick={() => setActiveScreen(i)}
                  className={`w-full text-right px-3 py-1.5 rounded-lg text-[11px] transition-all ${
                    activeScreen === i ? 'bg-theme-gold/10 text-theme-gold font-medium' : 'text-[#8B95A5] hover:text-white hover:bg-[#1A2235]'
                  }`}>
                  {i + 1}. {s}
                </button>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* ─── Screens Grid ─── */}
        <div className="flex-1 min-w-0">
          {/* Row 1 - Main screens */}
          <div className="mb-8">
            <h2 className="text-sm font-bold text-theme-gold mb-4">الشاشات الرئيسية</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">

              {/* 01 - Home Screen */}
              <PhoneFrame title="الشاشة الرئيسية" num="01" active={activeScreen === 0}>
                <ScreenHeader title="مصر هب" />
                <div className="px-3 py-2">
                  <div className="bg-[#1A2235] rounded-xl px-3 py-2 flex items-center gap-2 mb-3">
                    <HiSearch className="text-[#5A6478] text-xs" />
                    <span className="text-[8px] text-[#5A6478]">ابحث عن وجهة...</span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden h-28 mb-3">
                    <img src="/egypthub/images/destinations/cairo.svg" alt="hero" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17]/80 to-transparent" />
                    <div className="absolute bottom-2 right-2">
                      <p className="text-[8px] font-bold">اكتشف مصر</p>
                      <p className="text-[6px] text-[#8B95A5]">وجهات سياحية رائعة</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 mb-3">
                    {[{ icon: '🏛️', label: 'معالم' }, { icon: '🏖️', label: 'شواطئ' }, { icon: '🐪', label: 'سفاري' }, { icon: '🤿', label: 'غوص' }].map(c => (
                      <div key={c.label} className="bg-[#141B2D] rounded-lg p-1.5 text-center">
                        <span className="text-sm">{c.icon}</span>
                        <p className="text-[6px] text-[#8B95A5] mt-0.5">{c.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[8px] font-bold mb-1.5">وجهات مميزة</p>
                  <div className="flex gap-2">
                    {['/egypthub/images/destinations/luxor.svg', '/egypthub/images/destinations/sharm-el-sheikh.svg'].map((img, i) => (
                      <div key={i} className="flex-1 rounded-lg overflow-hidden h-16">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <BottomNav active={0} />
              </PhoneFrame>

              {/* 02 - Explore */}
              <PhoneFrame title="استكشاف الوجهات" num="02" active={activeScreen === 1}>
                <ScreenHeader title="استكشاف" />
                <div className="px-3 py-2">
                  <div className="flex gap-1.5 mb-3 overflow-x-hidden">
                    {['الكل', 'معالم', 'شواطئ', 'صحراء'].map((t, i) => (
                      <span key={t} className={`px-2 py-1 rounded-lg text-[7px] whitespace-nowrap ${i === 0 ? 'bg-theme-gold text-[#0A0E17] font-bold' : 'bg-[#1A2235] text-[#8B95A5]'}`}>{t}</span>
                    ))}
                  </div>
                  {['/egypthub/images/destinations/cairo.svg', '/egypthub/images/destinations/cairo.svg', '/egypthub/images/activities/desert-safari.svg'].map((img, i) => (
                    <div key={i} className="relative rounded-xl overflow-hidden h-[72px] mb-2">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17]/80 to-transparent" />
                      <div className="absolute bottom-1.5 right-2 flex items-center gap-1">
                        <HiLocationMarker className="text-theme-gold text-[8px]" />
                        <span className="text-[7px]">{['أهرامات الجيزة', 'القاهرة القديمة', 'صحراء سيناء'][i]}</span>
                      </div>
                      <div className="absolute top-1.5 left-1.5 flex items-center gap-0.5 bg-[#0A0E17]/60 px-1 py-0.5 rounded">
                        <HiStar className="text-theme-gold text-[7px]" />
                        <span className="text-[6px] font-english">{['4.9', '4.7', '4.8'][i]}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <BottomNav active={1} />
              </PhoneFrame>

              {/* 03 - Destination Detail */}
              <PhoneFrame title="تفاصيل الوجهة" num="03" active={activeScreen === 2}>
                <div className="relative h-36">
                  <img src="/egypthub/images/destinations/sharm-el-sheikh.svg" alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-transparent to-transparent" />
                  <div className="absolute top-2 right-2 left-2 flex justify-between">
                    <div className="w-6 h-6 rounded-full bg-[#0A0E17]/50 flex items-center justify-center"><HiChevronLeft className="text-white text-xs rtl:rotate-180" /></div>
                    <div className="w-6 h-6 rounded-full bg-[#0A0E17]/50 flex items-center justify-center"><HiHeart className="text-white text-xs" /></div>
                  </div>
                  <div className="absolute bottom-2 right-3">
                    <p className="text-xs font-bold">معبد الأقصر</p>
                    <div className="flex items-center gap-1"><HiLocationMarker className="text-theme-gold text-[8px]" /><span className="text-[7px] text-[#8B95A5]">الأقصر، مصر</span></div>
                  </div>
                </div>
                <div className="px-3 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5"><HiStar className="text-theme-gold text-[8px]" /><span className="text-[7px] font-english">4.9</span></div>
                    <span className="text-[7px] text-[#5A6478]">• 2,340 تقييم</span>
                  </div>
                  <p className="text-[7px] text-[#8B95A5] leading-relaxed mb-3">معبد الأقصر من أعظم المعابد المصرية القديمة. يقع على الضفة الشرقية لنهر النيل...</p>
                  <div className="grid grid-cols-3 gap-1.5 mb-3">
                    {[{ icon: HiClock, label: '3 ساعات' }, { icon: HiCalendar, label: 'يومياً' }, { icon: HiCamera, label: 'تصوير' }].map(i => (
                      <div key={i.label} className="bg-[#141B2D] rounded-lg p-1.5 text-center">
                        <i.icon className="text-theme-gold text-xs mx-auto" />
                        <p className="text-[6px] text-[#8B95A5] mt-0.5">{i.label}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-2 rounded-xl bg-gradient-to-l from-theme-gold to-accent-orange text-[#0A0E17] font-bold text-[9px]">احجز الآن</button>
                </div>
              </PhoneFrame>

              {/* 04 - Experience Detail */}
              <PhoneFrame title="تفاصيل التجربة" num="04" active={activeScreen === 3}>
                <div className="relative h-32">
                  <img src="/egypthub/images/activities/desert-safari.svg" alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] to-transparent" />
                  <div className="absolute bottom-2 right-3">
                    <p className="text-xs font-bold">رحلة سفاري في الصحراء</p>
                  </div>
                </div>
                <div className="px-3 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-theme-gold font-english">EGP 1,200</span>
                    <div className="flex items-center gap-0.5"><HiStar className="text-theme-gold text-[8px]" /><span className="text-[7px] font-english">4.8</span></div>
                  </div>
                  <p className="text-[7px] text-[#8B95A5] mb-3 leading-relaxed">تجربة سفاري مذهلة في صحراء مصر. تشمل ركوب الجمال والعشاء البدوي تحت النجوم...</p>
                  <div className="space-y-1.5 mb-3">
                    {['ركوب الجمال', 'عشاء بدوي', 'مراقبة النجوم'].map(f => (
                      <div key={f} className="flex items-center gap-1.5 text-[7px] text-[#8B95A5]">
                        <div className="w-1 h-1 rounded-full bg-theme-gold" />{f}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-1.5 rounded-lg border border-theme-gold/30 text-theme-gold text-[8px] font-bold">المفضلة</button>
                    <button className="flex-1 py-1.5 rounded-lg bg-gradient-to-l from-theme-gold to-accent-orange text-[#0A0E17] text-[8px] font-bold">احجز</button>
                  </div>
                </div>
              </PhoneFrame>

              {/* 05 - AI Assistant */}
              <PhoneFrame title="مساعد AI" num="05" active={activeScreen === 4}>
                <ScreenHeader title="زينب — المساعدة الذكية" showBack />
                <div className="px-3 py-2 flex-1">
                  <div className="flex justify-end mb-2">
                    <div className="max-w-[80%] bg-theme-gold/10 border border-theme-gold/20 rounded-xl rounded-tl-sm px-2.5 py-1.5">
                      <p className="text-[7px]">أهلاً! أنا زينب 👋 كيف أقدر أساعدك؟</p>
                    </div>
                  </div>
                  <div className="flex justify-start mb-2">
                    <div className="max-w-[80%] bg-[#1A2235] rounded-xl rounded-tr-sm px-2.5 py-1.5">
                      <p className="text-[7px]">عايز أزور الأهرامات</p>
                    </div>
                  </div>
                  <div className="flex justify-end mb-2">
                    <div className="max-w-[80%] bg-theme-gold/10 border border-theme-gold/20 rounded-xl rounded-tl-sm px-2.5 py-1.5">
                      <p className="text-[7px]">اختيار رائع! 🏛️ الأهرامات من أعظم عجائب الدنيا. عندي خيارات مميزة...</p>
                    </div>
                  </div>
                  {/* Quick suggestions */}
                  <div className="flex flex-wrap gap-1 mt-2 mb-3">
                    {['أفضل وقت؟', 'أسعار الدخول', 'مطاعم قريبة'].map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-full bg-theme-gold/10 border border-theme-gold/20 text-[6px] text-theme-gold">{s}</span>
                    ))}
                  </div>
                  {/* Recommendation card */}
                  <div className="rounded-xl overflow-hidden border border-[#1E2A3D] bg-[#141B2D]">
                    <div className="h-14"><img src="/egypthub/images/destinations/cairo.svg" alt="" className="w-full h-full object-cover" /></div>
                    <div className="p-2">
                      <p className="text-[7px] font-bold">جولة الأهرامات الكاملة</p>
                      <p className="text-[6px] text-theme-gold font-english">EGP 450</p>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-2 border-t border-[#1E2A3D] flex gap-1.5">
                  <input placeholder="اكتب رسالتك..." className="flex-1 bg-[#141B2D] rounded-lg px-2 py-1.5 text-[7px] border border-[#1E2A3D] outline-none placeholder:text-[#5A6478]" />
                  <div className="w-7 h-7 rounded-lg bg-theme-gold flex items-center justify-center"><HiChat className="text-[#0A0E17] text-xs" /></div>
                </div>
              </PhoneFrame>

            </div>
          </div>

          {/* Row 2 - Secondary screens */}
          <div className="mb-8">
            <h2 className="text-sm font-bold text-theme-gold mb-4">شاشات ثانوية</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">

              {/* 06 - Quick Booking */}
              <PhoneFrame title="حجز سريع" num="06" active={activeScreen === 5}>
                <ScreenHeader title="حجز سريع" showBack />
                <div className="px-3 py-2">
                  <div className="relative rounded-xl overflow-hidden h-20 mb-3">
                    <img src="/egypthub/images/destinations/luxor.svg" alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#0A0E17]/40" />
                    <div className="absolute bottom-1.5 right-2"><p className="text-[8px] font-bold">رحلة نيلية</p></div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-[#141B2D] rounded-xl p-2 border border-[#1E2A3D]">
                      <p className="text-[6px] text-[#5A6478] mb-0.5">التاريخ</p>
                      <p className="text-[8px] font-english">15 يناير 2025</p>
                    </div>
                    <div className="bg-[#141B2D] rounded-xl p-2 border border-[#1E2A3D]">
                      <p className="text-[6px] text-[#5A6478] mb-0.5">عدد الأشخاص</p>
                      <p className="text-[8px]">2 بالغين</p>
                    </div>
                    <div className="bg-theme-gold/5 rounded-xl p-2 border border-theme-gold/15">
                      <p className="text-[6px] text-[#5A6478] mb-0.5">الإجمالي</p>
                      <p className="text-sm font-bold text-theme-gold font-english">EGP 2,400</p>
                    </div>
                  </div>
                  <button className="w-full mt-3 py-2 rounded-xl bg-gradient-to-l from-theme-gold to-accent-orange text-[#0A0E17] font-bold text-[9px]">تأكيد الحجز</button>
                </div>
              </PhoneFrame>

              {/* 07 - Reservations */}
              <PhoneFrame title="الحجوزات" num="07" active={activeScreen === 6}>
                <ScreenHeader title="حجوزاتي" />
                <div className="px-3 py-2 space-y-2">
                  {[{ title: 'رحلة سفاري', date: '15 يناير', status: 'مؤكد', img: '/egypthub/images/activities/desert-safari.svg' },
                    { title: 'جولة المعبد', date: '18 يناير', status: 'قادم', img: '/egypthub/images/destinations/sharm-el-sheikh.svg' },
                    { title: 'غوص البحر الأحمر', date: '20 يناير', status: 'مؤكد', img: '/egypthub/images/activities/diving.svg' }].map((r, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-[#141B2D] border border-[#1E2A3D]">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                        <img src={r.img} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[8px] font-bold truncate">{r.title}</p>
                        <p className="text-[6px] text-[#5A6478]">{r.date}</p>
                      </div>
                      <span className={`px-1.5 py-0.5 rounded text-[6px] font-bold ${r.status === 'مؤكد' ? 'bg-green-500/15 text-green-400' : 'bg-theme-gold/15 text-theme-gold'}`}>{r.status}</span>
                    </div>
                  ))}
                </div>
                <BottomNav active={0} />
              </PhoneFrame>

              {/* 08 - Favorites */}
              <PhoneFrame title="المفضلة" num="08" active={activeScreen === 7}>
                <ScreenHeader title="المفضلة" />
                <div className="px-3 py-2">
                  <div className="grid grid-cols-2 gap-1.5">
                    {['/egypthub/images/destinations/cairo.svg', '/egypthub/images/destinations/luxor.svg', '/egypthub/images/activities/desert-safari.svg', '/egypthub/images/destinations/cairo.svg', '/egypthub/images/destinations/sharm-el-sheikh.svg', '/egypthub/images/activities/diving.svg'].map((img, i) => (
                      <div key={i} className="relative rounded-lg overflow-hidden aspect-square">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <div className="absolute top-1 left-1"><HiHeart className="text-red-400 text-[10px]" /></div>
                      </div>
                    ))}
                  </div>
                </div>
                <BottomNav active={2} />
              </PhoneFrame>

              {/* 09 - Interactive Map */}
              <PhoneFrame title="الخريطة التفاعلية" num="09" active={activeScreen === 8}>
                <ScreenHeader title="خريطة مصر" />
                <div className="relative flex-1 bg-[#0F1420] h-full min-h-[260px]">
                  {/* Simulated map */}
                  <div className="absolute inset-0 bg-[#141B2D]">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #1E2A3D 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
                    {/* Map pins */}
                    {[{ top: '20%', right: '30%', label: 'القاهرة' }, { top: '45%', right: '50%', label: 'الأقصر' }, { top: '30%', right: '70%', label: 'شرم الشيخ' }].map((pin, i) => (
                      <div key={i} className="absolute flex flex-col items-center" style={{ top: pin.top, right: pin.right }}>
                        <div className="w-4 h-4 rounded-full bg-theme-gold flex items-center justify-center animate-pulse">
                          <HiLocationMarker className="text-[#0A0E17] text-[8px]" />
                        </div>
                        <span className="text-[6px] text-white bg-[#0A0E17]/80 px-1 rounded mt-0.5">{pin.label}</span>
                      </div>
                    ))}
                  </div>
                  {/* Bottom search */}
                  <div className="absolute bottom-2 inset-x-2">
                    <div className="bg-[#0F1420] rounded-xl p-2 border border-[#1E2A3D] flex items-center gap-1.5">
                      <HiSearch className="text-[#5A6478] text-xs" />
                      <span className="text-[7px] text-[#5A6478]">ابحث على الخريطة...</span>
                    </div>
                  </div>
                </div>
              </PhoneFrame>

              {/* 10 - Notifications */}
              <PhoneFrame title="الإشعارات" num="10" active={activeScreen === 9}>
                <ScreenHeader title="الإشعارات" />
                <div className="px-3 py-2 space-y-1.5">
                  {[{ text: 'تم تأكيد حجزك', time: '5 دقائق', dot: 'bg-green-400' },
                    { text: 'خصم 20% على رحلات النيل', time: 'ساعة', dot: 'bg-theme-gold' },
                    { text: 'تذكير: رحلتك بعد 3 أيام', time: '3 ساعات', dot: 'bg-blue-400' },
                    { text: 'مراجعة جديدة على تجربتك', time: 'أمس', dot: 'bg-purple-400' },
                    { text: 'عرض محدود: سفاري مجاني', time: 'يومين', dot: 'bg-red-400' }].map((n, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-[#141B2D] border border-[#1E2A3D]">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${n.dot}`} />
                      <div>
                        <p className="text-[7px]">{n.text}</p>
                        <p className="text-[6px] text-[#5A6478]">منذ {n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <BottomNav active={0} />
              </PhoneFrame>

            </div>
          </div>

          {/* Row 3 - Auth & Splash */}
          <div className="mb-8">
            <h2 className="text-sm font-bold text-theme-gold mb-4">شاشات المصادقة</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">

              {/* 11 - Profile */}
              <PhoneFrame title="الملف الشخصي" num="11" active={activeScreen === 10}>
                <ScreenHeader title="حسابي" />
                <div className="px-3 py-2 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#1A2235] border-2 border-theme-gold/30 flex items-center justify-center mb-2">
                    <HiUser className="text-xl text-theme-gold" />
                  </div>
                  <p className="text-[9px] font-bold">أحمد محمد</p>
                  <p className="text-[6px] text-[#5A6478] mb-3">ahmed@email.com</p>
                  <div className="space-y-1">
                    {['حجوزاتي', 'المفضلة', 'المحفظة', 'الإعدادات', 'المساعدة', 'تسجيل خروج'].map((item, i) => (
                      <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#141B2D] border border-[#1E2A3D]">
                        <span className="text-[7px]">{item}</span>
                        <HiChevronLeft className="text-[#5A6478] text-[8px] rtl:rotate-180" />
                      </div>
                    ))}
                  </div>
                </div>
                <BottomNav active={3} />
              </PhoneFrame>

              {/* 12 - Login */}
              <PhoneFrame title="شاشة التسجيل" num="12" active={activeScreen === 11}>
                <div className="px-3 py-4 flex flex-col items-center justify-center min-h-[300px]">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-gold to-accent-orange flex items-center justify-center mb-3">
                    <span className="text-[#0A0E17] font-bold text-lg">م</span>
                  </div>
                  <p className="text-sm font-bold mb-0.5">مرحباً بك</p>
                  <p className="text-[7px] text-[#5A6478] mb-4">سجل دخولك لمتابعة رحلتك</p>
                  <input placeholder="البريد الإلكتروني" className="w-full bg-[#141B2D] rounded-lg px-3 py-2 text-[8px] border border-[#1E2A3D] mb-2 outline-none placeholder:text-[#5A6478]" />
                  <input placeholder="كلمة المرور" type="password" className="w-full bg-[#141B2D] rounded-lg px-3 py-2 text-[8px] border border-[#1E2A3D] mb-3 outline-none placeholder:text-[#5A6478]" />
                  <button className="w-full py-2 rounded-lg bg-gradient-to-l from-theme-gold to-accent-orange text-[#0A0E17] font-bold text-[9px] mb-2">تسجيل الدخول</button>
                  <p className="text-[7px] text-[#5A6478]">ليس لديك حساب؟ <span className="text-theme-gold">سجل الآن</span></p>
                </div>
              </PhoneFrame>

              {/* 13 - Splash */}
              <PhoneFrame title="شاشة البداية" num="13" active={activeScreen === 12}>
                <div className="flex flex-col items-center justify-center min-h-[340px] bg-gradient-to-b from-[#0A0E17] via-[#141B2D] to-[#0A0E17] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30">
                    <img src="/egypthub/images/destinations/cairo.svg" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-[#0A0E17]/70" />
                  <div className="relative z-10 text-center">
                    <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}
                      className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-theme-gold to-accent-orange flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(212,162,76,0.3)]">
                      <span className="text-[#0A0E17] font-bold text-2xl">م</span>
                    </motion.div>
                    <p className="text-lg font-bold">EGYPT<span className="text-theme-gold">HUB</span></p>
                    <p className="text-[8px] text-[#8B95A5] mt-1 font-english">Discover Egypt Your Way</p>
                  </div>
                </div>
              </PhoneFrame>

            </div>
          </div>

          {/* Design System Mobile */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <h3 className="text-sm font-bold text-theme-gold mb-4 font-english">Design System — Mobile</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-[10px] text-[#5A6478] font-english mb-2">Colors</p>
                <div className="flex gap-1.5">
                  {['#0A0E17', '#141B2D', '#1A2235', '#E9C46A', '#F4A261', '#FFFFFF', '#8B95A5'].map(c => (
                    <div key={c} className="w-6 h-6 rounded-md border border-[#1E2A3D]" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-[#5A6478] font-english mb-2">Bottom Navigation</p>
                <div className="bg-[#0F1420] rounded-lg p-2 border border-[#1E2A3D] flex items-center justify-around">
                  {[HiHome, HiSearch, HiHeart, HiUser].map((Icon, i) => (
                    <Icon key={i} className={`text-sm ${i === 0 ? 'text-theme-gold' : 'text-[#5A6478]'}`} />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-[#5A6478] font-english mb-2">Typography</p>
                <div className="space-y-1">
                  {['Medium', 'Semibold', 'Bold'].map(w => (
                    <p key={w} className="text-[10px] text-[#8B95A5]"><span className="text-[#5A6478] font-english">{w}</span> — Cairo</p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-[#5A6478] font-english mb-2">Spacing</p>
                <div className="flex gap-1 items-end">
                  {[4, 8, 12, 16, 24].map(s => (
                    <div key={s} className="bg-theme-gold/20 rounded" style={{ width: 12, height: s }} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
