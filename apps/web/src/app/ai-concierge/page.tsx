'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiChat, HiMicrophone, HiSearch, HiStar, HiLocationMarker,
  HiClock, HiCalendar, HiHeart, HiPhotograph, HiLightningBolt,
  HiPaperAirplane, HiBell, HiUser, HiTrash, HiChevronLeft,
  HiCheck, HiMenu, HiX,
} from 'react-icons/hi';

const chatMessages = [
  { sender: 'zainab', text: 'أهلاً! أنا زينب، مساعدتك الذكية 👋 كيف أقدر أساعدك في رحلتك في مصر؟', time: '10:30 ص' },
  { sender: 'user', text: 'عايز أخطط رحلة 5 أيام في الأقصر وأسوان', time: '10:31 ص' },
  { sender: 'zainab', text: 'اختيار ممتاز! الأقصر وأسوان من أجمل الوجهات 🏛️ هخطط لك رحلة رائعة. تفضل الفنادق الفاخرة ولا المتوسطة؟', time: '10:31 ص' },
  { sender: 'user', text: 'فنادق فاخرة على النيل لو ممكن', time: '10:32 ص' },
  { sender: 'zainab', text: 'تمام! عندي خيارات مميزة جداً 🌟 هبدأ أجهز المخطط ده دلوقتي...', time: '10:32 ص' },
];

const itinerary = [
  { day: 'اليوم 1 - وصول ودقة', items: ['وصول مطار الأقصر', 'تسجيل في الفندق', 'جولة معبد الكرنك', 'عشاء نيلي'], img: '/egypthub/images/destinations/sharm-el-sheikh.svg' },
  { day: 'اليوم 2 - المعابد الغربية', items: ['وادي الملوك', 'معبد حتشبسوت', 'تمثالي ممنون', 'سهرة في الأقصر'], img: '/egypthub/images/destinations/cairo.svg' },
  { day: 'اليوم 3 - رحلة نيلية', items: ['إبحار إلى إدفو', 'معبد حورس', 'استكمال الإبحار', 'عشاء على السفينة'], img: '/egypthub/images/destinations/luxor.svg' },
];

const recommendations = [
  { title: 'معبد أبو سمبل', rating: 4.9, img: '/egypthub/images/destinations/sharm-el-sheikh.svg', cat: 'معالم أثرية' },
  { title: 'رحلة نيلية فاخرة', rating: 4.8, img: '/egypthub/images/destinations/luxor.svg', cat: 'رحلات' },
  { title: 'سفاري الصحراء', rating: 4.7, img: '/egypthub/images/activities/desert-safari.svg', cat: 'مغامرات' },
  { title: 'الغوص في الغردقة', rating: 4.9, img: '/egypthub/images/activities/diving.svg', cat: 'رياضات مائية' },
];

const smartActions = [
  { icon: HiCalendar, label: 'حجز فندق' },
  { icon: HiLocationMarker, label: 'أقرب مطعم' },
  { icon: HiPhotograph, label: 'أماكن تصوير' },
  { icon: HiLightningBolt, label: 'عروض اليوم' },
  { icon: HiSearch, label: 'بحث متقدم' },
  { icon: HiHeart, label: 'المفضلة' },
];

const chatHistory = [
  { title: 'رحلة شرم الشيخ', date: 'منذ 3 أيام', msgs: 24 },
  { title: 'حجز فندق القاهرة', date: 'منذ أسبوع', msgs: 12 },
  { title: 'رحلة سفاري واحة سيوة', date: 'منذ أسبوعين', msgs: 38 },
];

const suggestions = [
  'أفضل وقت لزيارة الأهرامات؟',
  'مطاعم قريبة من الفندق',
  'أسعار الدخول للمعابد',
  'نصائح السفر في الشتاء',
];

export default function AIConciergePage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [typingVisible, setTypingVisible] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');

  useEffect(() => {
    const t = setInterval(() => setTypingVisible(v => !v), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-theme-bg pt-24">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="inline-flex items-center gap-1 text-theme-gold hover:text-theme-gold/80 transition-colors text-sm font-cairo">
            <HiChevronLeft className="w-4 h-4" />
            العودة للرئيسية
          </Link>
          <button className="lg:hidden text-theme p-2" onClick={() => setMobileSidebar(!mobileSidebar)}>
            {mobileSidebar ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex gap-6">
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className={`w-64 shrink-0 ${mobileSidebar ? 'fixed inset-0 z-50 bg-theme-bg p-4' : 'hidden lg:block'}`}
          >
            {mobileSidebar && (
              <div className="flex justify-between items-center mb-4">
                <span className="text-theme-gold font-bold font-cairo">القائمة</span>
                <button onClick={() => setMobileSidebar(false)} className="text-theme p-1">
                  <HiX className="w-5 h-5" />
                </button>
              </div>
            )}
            <div className="sticky top-28 space-y-4">
              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-theme-gold to-accent-amber p-[2px]">
                    <div className="w-full h-full rounded-full overflow-hidden bg-theme-card">
                      <img src="/egypthub/images/destinations/cairo.svg" alt="زينب" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-theme-gold flex items-center justify-center"
                  >
                    <HiChat className="text-dark-900 text-xs" />
                  </motion.div>
                </div>
                <h2 className="text-center text-xl font-bold font-playfair text-theme mb-1">زينب</h2>
                <p className="text-center text-theme-gold text-sm font-cairo mb-4">مساعدتك الذكية</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[{ val: '500K+', label: 'محادثة' }, { val: '4.5', label: 'تقييم' }, { val: '24/7', label: 'متاحة' }].map(s => (
                    <div key={s.label} className="bg-theme-bg rounded-xl p-2 text-center">
                      <p className="text-sm font-bold text-theme-gold">{s.val}</p>
                      <p className="text-[9px] text-theme-secondary font-cairo">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5">
                  {['محادثة ذكية', 'مخطط رحلات', 'توصيات مخصصة', 'اقتراحات فورية', 'مساعد صوتي'].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-theme-secondary font-cairo">
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-gold" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-theme-gold/20 bg-theme-card p-4">
                <p className="text-xs font-bold text-theme-gold mb-3 font-cairo">تبديل بين الأقسام</p>
                <div className="space-y-1">
                  {[
                    { id: 'chat', label: 'المحادثة' },
                    { id: 'planner', label: 'مخطط الرحلات' },
                    { id: 'recommend', label: 'التوصيات' },
                    { id: 'voice', label: 'المساعد الصوتي' },
                    { id: 'history', label: 'سجل المحادثات' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setMobileSidebar(false); }}
                      className={`w-full text-right px-3 py-2 rounded-lg text-sm font-cairo transition-all ${
                        activeTab === tab.id ? 'bg-theme-gold/10 text-theme-gold font-medium' : 'text-theme-secondary hover:text-theme hover:bg-theme-card'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-theme-gold/20 bg-theme-card overflow-hidden flex flex-col xl:row-span-2"
              >
                <div className="p-4 border-b border-theme-gold/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-theme-gold to-accent-amber overflow-hidden">
                    <img src="/egypthub/images/destinations/cairo.svg" alt="زينب" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-theme font-cairo">محادثة ذكية</h3>
                    <p className="text-[10px] text-green-400 font-cairo">متصلة الآن</p>
                  </div>
                </div>

                <div className="flex-1 p-4 space-y-3 min-h-[350px] max-h-[500px] overflow-y-auto">
                  {chatMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                        msg.sender === 'zainab'
                          ? 'bg-theme-gold/10 border border-theme-gold/20 rounded-tl-sm'
                          : 'bg-theme-elevated rounded-tr-sm'
                      }`}>
                        <p className="text-sm leading-relaxed text-theme font-cairo">{msg.text}</p>
                        <p className="text-[9px] text-theme-muted mt-1 text-left">{msg.time}</p>
                      </div>
                    </motion.div>
                  ))}
                  <AnimatePresence>
                    {typingVisible && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-end">
                        <div className="bg-theme-gold/10 border border-theme-gold/20 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                          {[0, 1, 2].map(d => (
                            <motion.div
                              key={d}
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, delay: d * 0.15, repeat: Infinity }}
                              className="w-1.5 h-1.5 rounded-full bg-theme-gold"
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-3 border-t border-theme-gold/10">
                  <div className="flex gap-2">
                    <input
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      placeholder="اكتب رسالتك..."
                      className="flex-1 bg-theme-bg rounded-xl px-4 py-2.5 text-sm border border-theme focus:border-theme-gold/40 outline-none transition-colors placeholder:text-theme-muted text-theme font-cairo"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-theme-gold to-accent-amber flex items-center justify-center"
                    >
                      <HiPaperAirplane className="text-dark-900 rotate-180" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold">02</span>
                  <h3 className="font-bold text-sm text-theme font-cairo">مخطط الرحلة</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-theme-bg rounded-xl p-3 border border-theme">
                    <p className="text-[10px] text-theme-muted mb-1 font-cairo">الوجهة</p>
                    <div className="flex items-center gap-2">
                      <HiLocationMarker className="text-theme-gold" />
                      <span className="text-sm text-theme font-cairo">الأقصر — أسوان</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-theme-bg rounded-xl p-3 border border-theme">
                      <p className="text-[10px] text-theme-muted mb-1 font-cairo">تاريخ البداية</p>
                      <div className="flex items-center gap-1">
                        <HiCalendar className="text-theme-gold text-sm" />
                        <span className="text-xs text-theme">15 يناير</span>
                      </div>
                    </div>
                    <div className="bg-theme-bg rounded-xl p-3 border border-theme">
                      <p className="text-[10px] text-theme-muted mb-1 font-cairo">المدة</p>
                      <div className="flex items-center gap-1">
                        <HiClock className="text-theme-gold text-sm" />
                        <span className="text-xs text-theme font-cairo">5 أيام</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-theme-bg rounded-xl p-3 border border-theme">
                    <p className="text-[10px] text-theme-muted mb-1 font-cairo">نوع الرحلة</p>
                    <div className="flex gap-2">
                      {['ثقافية', 'مغامرة', 'استرخاء'].map((t, i) => (
                        <span key={t} className={`px-3 py-1 rounded-lg text-[10px] font-bold font-cairo ${
                          i === 0 ? 'bg-theme-gold/15 text-theme-gold border border-theme-gold/25' : 'bg-theme-elevated text-theme-secondary'
                        }`}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 rounded-xl bg-theme-gold hover:bg-theme-gold/80 text-dark-900 font-bold text-sm font-cairo transition-all"
                  >
                    خطط رحلتي
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold">03</span>
                  <h3 className="font-bold text-sm text-theme font-cairo">تفاصيل المخطط</h3>
                </div>
                <div className="space-y-3">
                  {itinerary.map((day, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: -3 }}
                      className="bg-theme-bg rounded-xl p-3 border border-theme hover:border-theme-gold/20 transition-colors cursor-pointer"
                    >
                      <div className="flex gap-3">
                        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                          <img src={day.img} alt={day.day} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-theme-gold mb-1 font-cairo">{day.day}</p>
                          {day.items.slice(0, 2).map((item, j) => (
                            <p key={j} className="text-[10px] text-theme-secondary font-cairo">• {item}</p>
                          ))}
                          {day.items.length > 2 && (
                            <p className="text-[10px] text-theme-muted font-cairo">+{day.items.length - 2} أنشطة أخرى</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold">04</span>
                  <h3 className="font-bold text-sm text-theme font-cairo">التوصيات الذكية</h3>
                </div>
                <div className="space-y-2">
                  {recommendations.map((rec, i) => (
                    <motion.div key={i} whileHover={{ x: -3 }} className="flex items-center gap-3 p-2 rounded-xl hover:bg-theme-bg transition-colors cursor-pointer">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <img src={rec.img} alt={rec.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-theme font-cairo">{rec.title}</p>
                        <p className="text-[10px] text-theme-muted font-cairo">{rec.cat}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <HiStar className="text-theme-gold text-xs" />
                        <span className="text-[10px] text-theme-secondary">{rec.rating}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold">05</span>
                  <h3 className="font-bold text-sm text-theme font-cairo">البحث الذكي</h3>
                </div>
                <div className="relative mb-4">
                  <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted" />
                  <input
                    placeholder="ابحث عن أماكن، تجارب..."
                    className="w-full bg-theme-bg rounded-xl pr-10 pl-4 py-2.5 text-sm border border-theme focus:border-theme-gold/40 outline-none placeholder:text-theme-muted text-theme font-cairo"
                  />
                </div>
                <div className="space-y-2">
                  {[
                    { title: 'أفضل مطاعم القاهرة', img: '/egypthub/images/destinations/cairo.svg' },
                    { title: 'رحلات البحر الأحمر', img: '/egypthub/images/activities/diving.svg' },
                  ].map((r, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: -3 }}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-theme-bg border border-theme cursor-pointer hover:border-theme-gold/20 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                        <img src={r.img} alt={r.title} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs text-theme font-cairo">{r.title}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold">06</span>
                  <h3 className="font-bold text-sm text-theme font-cairo">الإجراءات السريعة</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {smartActions.map((a, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-theme-bg border border-theme hover:border-theme-gold/30 transition-all"
                    >
                      <a.icon className="text-xl text-theme-gold" />
                      <span className="text-[10px] text-theme-secondary font-cairo">{a.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5 flex flex-col items-center justify-center min-h-[280px]"
              >
                <div className="flex items-center gap-2 self-start mb-6">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold">07</span>
                  <h3 className="font-bold text-sm text-theme font-cairo">المساعد الصوتي</h3>
                </div>
                <div className="relative">
                  <motion.div
                    animate={isListening ? { scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 -m-6 rounded-full border-2 border-theme-gold/20"
                  />
                  <motion.div
                    animate={isListening ? { scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    className="absolute inset-0 -m-10 rounded-full border border-theme-gold/10"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsListening(!isListening)}
                    className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isListening
                        ? 'bg-gradient-to-br from-theme-gold to-accent-amber shadow-[0_0_40px_rgba(233,196,106,0.4)]'
                        : 'bg-theme-elevated border-2 border-theme-gold/30 hover:border-theme-gold/60'
                    }`}
                  >
                    <HiMicrophone className={`text-3xl ${isListening ? 'text-dark-900' : 'text-theme-gold'}`} />
                  </motion.button>
                </div>
                <motion.p
                  animate={isListening ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
                  transition={{ duration: 1.5, repeat: isListening ? Infinity : 0 }}
                  className="mt-6 text-sm text-theme-secondary font-cairo"
                >
                  {isListening ? 'أنا أسمعك...' : 'اضغط للتحدث'}
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold">08</span>
                  <h3 className="font-bold text-sm text-theme font-cairo">اقتراحات فورية</h3>
                </div>
                <div className="space-y-2">
                  {suggestions.map((s, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ x: -3 }}
                      className="w-full text-right p-3 rounded-xl bg-theme-bg border border-theme text-xs text-theme-secondary hover:text-theme-gold hover:border-theme-gold/20 transition-all font-cairo flex items-center justify-between"
                    >
                      <span>{s}</span>
                      <HiChevronLeft className="text-theme-muted" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold">09</span>
                  <h3 className="font-bold text-sm text-theme font-cairo">سجل المحادثات</h3>
                </div>
                <div className="space-y-2">
                  {chatHistory.map((ch, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: -3 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-theme-bg border border-theme hover:border-theme-gold/20 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <HiChat className="text-theme-gold" />
                        <div>
                          <p className="text-xs font-medium text-theme font-cairo">{ch.title}</p>
                          <p className="text-[10px] text-theme-muted font-cairo">{ch.date} • {ch.msgs} رسالة</p>
                        </div>
                      </div>
                      <HiTrash className="text-theme-muted hover:text-red-400 transition-colors" />
                    </motion.div>
                  ))}
                  <button className="w-full py-2.5 text-center text-[10px] text-theme-gold bg-theme-gold/5 rounded-xl hover:bg-theme-gold/10 transition-colors font-cairo">
                    عرض الكل
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold">10</span>
                  <h3 className="font-bold text-sm text-theme font-cairo">تقييم زينب</h3>
                </div>
                <div className="text-center">
                  <p className="text-sm text-theme-secondary mb-4 font-cairo">كيف كانت تجربتك مع زينب؟</p>
                  <div className="flex items-center justify-center gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map(star => (
                      <motion.button
                        key={star}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                      >
                        <HiStar className={`text-3xl transition-colors ${
                          star <= (hoverRating || rating) ? 'text-theme-gold' : 'text-theme-elevated'
                        }`} />
                      </motion.button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <textarea
                        placeholder="اكتب تعليقك..."
                        rows={3}
                        className="w-full bg-theme-bg rounded-xl px-4 py-3 text-sm border border-theme focus:border-theme-gold/40 outline-none resize-none placeholder:text-theme-muted text-theme font-cairo mb-3"
                      />
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-l from-theme-gold to-accent-amber text-dark-900 font-bold text-sm font-cairo"
                      >
                        إرسال التقييم
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="rounded-2xl border border-theme-gold/20 bg-theme-card p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-theme-gold/10 text-theme-gold">11</span>
                  <h3 className="font-bold text-sm text-theme font-cairo">الإشعارات</h3>
                </div>
                <div className="space-y-2">
                  {['إشعارات مخصصة', 'تحديثات الرحلة', 'عروض جديدة', 'تنبيهات الطقس'].map((n, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-theme-bg border border-theme">
                      <div className="flex items-center gap-2">
                        <HiBell className="text-theme-gold text-sm" />
                        <span className="text-xs text-theme font-cairo">{n}</span>
                      </div>
                      <div className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${i < 2 ? 'bg-theme-gold' : 'bg-theme-elevated'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all ${i < 2 ? 'right-0.5' : 'left-0.5'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
