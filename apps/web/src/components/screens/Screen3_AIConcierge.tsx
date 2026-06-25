'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiChat, HiMicrophone, HiSearch, HiStar, HiLocationMarker,
  HiClock, HiCalendar, HiHeart, HiPhotograph, HiLightningBolt,
  HiPaperAirplane, HiBell, HiUser, HiTrash, HiChevronLeft,
} from 'react-icons/hi';
import Image from 'next/image';

/* ───── Chat data ───── */
const chatMessages = [
  { sender: 'zainab', text: 'أهلاً! أنا زينب، مساعدتك الذكية 👋 كيف أقدر أساعدك في رحلتك في مصر؟', time: '10:30 ص' },
  { sender: 'user', text: 'عايز أخطط رحلة 5 أيام في الأقصر وأسوان', time: '10:31 ص' },
  { sender: 'zainab', text: 'اختيار ممتاز! الأقصر وأسوان من أجمل الوجهات 🏛️ هخطط لك رحلة رائعة. تفضل الفنادق الفاخرة ولا المتوسطة؟', time: '10:31 ص' },
  { sender: 'user', text: 'فنادق فاخرة على النيل لو ممكن', time: '10:32 ص' },
  { sender: 'zainab', text: 'تمام! عندي خيارات مميزة جداً 🌟 هبدأ أجهز المخطط ده دلوقتي...', time: '10:32 ص' },
];

const itinerary = [
  { day: 'اليوم 1 - وصول والدقة', items: ['وصول مطار الأقصر', 'تسجيل في الفندق', 'جولة معبد الكرنك', 'عشاء نيلي'], img: '/images/destinations/sharm-el-sheikh.svg' },
  { day: 'اليوم 2 - المعابد الغربية', items: ['وادي الملوك', 'معبد حتشبسوت', 'تمثالي ممنون', 'سهرة في الأقصر'], img: '/images/destinations/cairo.svg' },
  { day: 'اليوم 3 - رحلة نيلية', items: ['إبحار إلى إدفو', 'معبد حورس', 'استكمال الإبحار', 'عشاء على السفينة'], img: '/images/destinations/luxor.svg' },
];

const recommendations = [
  { title: 'معبد أبو سمبل', rating: 4.9, img: '/images/destinations/sharm-el-sheikh.svg', cat: 'معالم أثرية' },
  { title: 'رحلة نيلية فاخرة', rating: 4.8, img: '/images/destinations/luxor.svg', cat: 'رحلات' },
  { title: 'سفاري الصحراء', rating: 4.7, img: '/images/activities/desert-safari.svg', cat: 'مغامرات' },
  { title: 'الغوص في الغردقة', rating: 4.9, img: '/images/activities/diving.svg', cat: 'رياضات مائية' },
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

/* ───── Main Component ───── */
export default function Screen3_AIConcierge() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [typingVisible, setTypingVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setTypingVisible(v => !v), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white font-arabic" dir="ltr">
      <div className="max-w-[1500px] mx-auto px-6 py-8 flex gap-6">
        {/* ─── Left Panel - Intro ─── */}
        <motion.aside initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="w-64 shrink-0">
          <div className="sticky top-8 space-y-4">
            <div className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <span className="text-[10px] font-english text-theme-gold font-bold block mb-2">المرحلة 4</span>
              <h1 className="text-2xl font-bold mb-1">AI Concierge</h1>
              <p className="text-theme-gold text-lg font-bold mb-3">(زينب)</p>

              {/* Avatar */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-theme-gold to-accent-orange p-[2px]">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image src="/images/destinations/cairo.svg" alt="زينب" fill className="object-cover" />
                  </div>
                </div>
                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-theme-gold flex items-center justify-center">
                  <HiChat className="text-[#0A0E17] text-sm" />
                </motion.div>
              </div>

              <p className="text-[#8B95A5] text-xs leading-relaxed text-center mb-4">
                تجربة الذكاء الاصطناعي الشخصية المتكاملة — مساعدتك الذكية في رحلتك في مصر
              </p>

              <div className="space-y-2">
                {['محادثة ذكية', 'مخططة رحلات', 'توصيات مخصصة', 'اقتراحات فورية', 'مساعد صوتي'].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#8B95A5]">
                    <div className="w-1.5 h-1.5 rounded-full bg-theme-gold" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>

        {/* ─── Main Grid ─── */}
        <div className="flex-1 min-w-0 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">

          {/* 01 - Smart Chat */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] overflow-hidden flex flex-col xl:row-span-2">
            <div className="p-4 border-b border-[#1E2A3D] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-theme-gold to-accent-orange overflow-hidden relative">
                <Image src="/images/destinations/cairo.svg" alt="زينب" fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-sm">محادثة ذكية</h3>
                <p className="text-[10px] text-green-400">متصلة الآن</p>
              </div>
            </div>

            <div className="flex-1 p-4 space-y-3 min-h-[350px] max-h-[500px] overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    msg.sender === 'zainab'
                      ? 'bg-theme-gold/10 border border-theme-gold/20 rounded-tl-sm'
                      : 'bg-[#1A2235] rounded-tr-sm'
                  }`}>
                    <p className="text-xs leading-relaxed">{msg.text}</p>
                    <p className="text-[9px] text-[#5A6478] mt-1 text-left font-english">{msg.time}</p>
                  </div>
                </motion.div>
              ))}
              {/* Typing indicator */}
              <AnimatePresence>
                {typingVisible && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-end">
                    <div className="bg-theme-gold/10 border border-theme-gold/20 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                      {[0, 1, 2].map(d => (
                        <motion.div key={d} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: d * 0.15, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full bg-theme-gold" />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-3 border-t border-[#1E2A3D]">
              <div className="flex gap-2">
                <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                  placeholder="اكتب رسالتك..."
                  className="flex-1 bg-[#0F1420] rounded-xl px-4 py-2.5 text-sm border border-[#1E2A3D] focus:border-theme-gold/40 outline-none transition-colors placeholder:text-[#5A6478]" />
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-theme-gold to-accent-orange flex items-center justify-center">
                  <HiPaperAirplane className="text-[#0A0E17] rotate-180" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* 02 - Planner */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">02</span>
              <h3 className="font-bold text-sm">مخطط الرحلة (Planner)</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-[#0F1420] rounded-xl p-3 border border-[#1E2A3D]">
                <p className="text-[10px] text-[#5A6478] mb-1">الوجهة</p>
                <div className="flex items-center gap-2">
                  <HiLocationMarker className="text-theme-gold" />
                  <span className="text-sm">الأقصر — أسوان</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0F1420] rounded-xl p-3 border border-[#1E2A3D]">
                  <p className="text-[10px] text-[#5A6478] mb-1">تاريخ البداية</p>
                  <div className="flex items-center gap-1">
                    <HiCalendar className="text-theme-gold text-sm" />
                    <span className="text-xs font-english">15 يناير</span>
                  </div>
                </div>
                <div className="bg-[#0F1420] rounded-xl p-3 border border-[#1E2A3D]">
                  <p className="text-[10px] text-[#5A6478] mb-1">المدة</p>
                  <div className="flex items-center gap-1">
                    <HiClock className="text-theme-gold text-sm" />
                    <span className="text-xs">5 أيام</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#0F1420] rounded-xl p-3 border border-[#1E2A3D]">
                <p className="text-[10px] text-[#5A6478] mb-1">نوع الرحلة</p>
                <div className="flex gap-2">
                  {['ثقافية', 'مغامرة', 'استرخاء'].map((t, i) => (
                    <span key={t} className={`px-3 py-1 rounded-lg text-[10px] font-bold ${i === 0 ? 'bg-theme-gold/15 text-theme-gold border border-theme-gold/25' : 'bg-[#1A2235] text-[#5A6478]'}`}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 03 - Itinerary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">03</span>
              <h3 className="font-bold text-sm">تفاصيل المخطط (Itinerary)</h3>
            </div>
            <div className="space-y-3">
              {itinerary.map((day, i) => (
                <motion.div key={i} whileHover={{ x: -3 }} className="bg-[#0F1420] rounded-xl p-3 border border-[#1E2A3D] hover:border-theme-gold/20 transition-colors cursor-pointer">
                  <div className="flex gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 relative">
                      <Image src={day.img} alt={day.day} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-theme-gold mb-1">{day.day}</p>
                      {day.items.slice(0, 2).map((item, j) => (
                        <p key={j} className="text-[10px] text-[#8B95A5]">• {item}</p>
                      ))}
                      {day.items.length > 2 && (
                        <p className="text-[10px] text-[#5A6478]">+{day.items.length - 2} أنشطة أخرى</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 04 - Recommendations */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">04</span>
              <h3 className="font-bold text-sm">التوصيات الذكية</h3>
            </div>
            <div className="space-y-2">
              {recommendations.map((rec, i) => (
                <motion.div key={i} whileHover={{ x: -3 }} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#0F1420] transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 relative">
                    <Image src={rec.img} alt={rec.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold">{rec.title}</p>
                    <p className="text-[10px] text-[#5A6478]">{rec.cat}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <HiStar className="text-theme-gold text-xs" />
                    <span className="text-[10px] text-[#8B95A5] font-english">{rec.rating}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 05 - Smart Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">05</span>
              <h3 className="font-bold text-sm">البحث الذكي</h3>
            </div>
            <div className="relative mb-4">
              <HiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6478]" />
              <input placeholder="ابحث عن أماكن، تجارب..." className="w-full bg-[#0F1420] rounded-xl pr-10 pl-4 py-2.5 text-sm border border-[#1E2A3D] focus:border-theme-gold/40 outline-none placeholder:text-[#5A6478]" />
            </div>
            <div className="space-y-2">
              {[{ title: 'أفضل مطاعم القاهرة', img: '/images/destinations/cairo.svg' }, { title: 'رحلات البحر الأحمر', img: '/images/activities/diving.svg' }].map((r, i) => (
                <motion.div key={i} whileHover={{ x: -3 }} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0F1420] border border-[#1E2A3D] cursor-pointer hover:border-theme-gold/20 transition-colors">
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 relative">
                    <Image src={r.img} alt={r.title} fill className="object-cover" />
                  </div>
                  <span className="text-xs">{r.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 06 - Smart Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">06</span>
              <h3 className="font-bold text-sm">الإجراءات السريعة (Smart Actions)</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {smartActions.map((a, i) => (
                <motion.button key={i} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#0F1420] border border-[#1E2A3D] hover:border-theme-gold/30 transition-all">
                  <a.icon className="text-xl text-theme-gold" />
                  <span className="text-[10px] text-[#8B95A5]">{a.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* 07 - Voice Assistant */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5 flex flex-col items-center justify-center min-h-[280px]">
            <div className="flex items-center gap-2 self-start mb-6">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">07</span>
              <h3 className="font-bold text-sm">المساعد الصوتي</h3>
            </div>
            <div className="relative">
              {/* Outer pulse rings */}
              <motion.div animate={isListening ? { scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 -m-6 rounded-full border-2 border-theme-gold/20" />
              <motion.div animate={isListening ? { scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                className="absolute inset-0 -m-10 rounded-full border border-theme-gold/10" />
              {/* Mic button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsListening(!isListening)}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isListening
                    ? 'bg-gradient-to-br from-theme-gold to-accent-orange shadow-[0_0_40px_rgba(212,162,76,0.4)]'
                    : 'bg-[#1A2235] border-2 border-theme-gold/30 hover:border-theme-gold/60'
                }`}
              >
                <HiMicrophone className={`text-3xl ${isListening ? 'text-[#0A0E17]' : 'text-theme-gold'}`} />
              </motion.button>
            </div>
            <motion.p animate={isListening ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
              transition={{ duration: 1.5, repeat: isListening ? Infinity : 0 }}
              className="mt-6 text-sm text-[#8B95A5]">
              {isListening ? 'أنا أسمعك...' : 'اضغط للتحدث'}
            </motion.p>
          </motion.div>

          {/* 08 - Instant Suggestions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">08</span>
              <h3 className="font-bold text-sm">اقتراحات فورية</h3>
            </div>
            <div className="space-y-2">
              {['أفضل وقت لزيارة الأهرامات؟', 'مطاعم قريبة من الفندق', 'أسعار الدخول للمعابد', 'نصائح السفر في الشتاء'].map((s, i) => (
                <motion.button key={i} whileHover={{ x: -3 }}
                  className="w-full text-right p-3 rounded-xl bg-[#0F1420] border border-[#1E2A3D] text-xs text-[#8B95A5] hover:text-theme-gold hover:border-theme-gold/20 transition-all flex items-center justify-between">
                  <span>{s}</span>
                  <HiChevronLeft className="text-[#5A6478]" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* 09 - Chat History */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">09</span>
              <h3 className="font-bold text-sm">سجل المحادثات</h3>
            </div>
            <div className="space-y-2">
              {chatHistory.map((ch, i) => (
                <motion.div key={i} whileHover={{ x: -3 }} className="flex items-center justify-between p-3 rounded-xl bg-[#0F1420] border border-[#1E2A3D] hover:border-theme-gold/20 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <HiChat className="text-theme-gold" />
                    <div>
                      <p className="text-xs font-medium">{ch.title}</p>
                      <p className="text-[10px] text-[#5A6478]">{ch.date} • {ch.msgs} رسالة</p>
                    </div>
                  </div>
                  <HiTrash className="text-[#5A6478] hover:text-red-400 transition-colors" />
                </motion.div>
              ))}
              <button className="w-full py-2.5 text-center text-[10px] text-theme-gold bg-theme-gold/5 rounded-xl hover:bg-theme-gold/10 transition-colors">
                عرض الكل
              </button>
            </div>
          </motion.div>

          {/* 10 - Zainab Profile */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">10</span>
              <h3 className="font-bold text-sm">الملف الشخصي لزينب</h3>
            </div>
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-theme-gold to-accent-orange p-[2px] animate-glow">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image src="/images/destinations/cairo.svg" alt="زينب" fill className="object-cover" />
                  </div>
                </div>
              </div>
              <h4 className="font-bold text-lg text-theme-gold">زينب</h4>
              <p className="text-[10px] text-[#5A6478] mb-4">مساعدتك الذكية</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[{ val: '500K+', label: 'محادثة' }, { val: '4.5', label: 'تقييم' }, { val: '24/7', label: 'متاحة' }].map(s => (
                  <div key={s.label} className="bg-[#0F1420] rounded-xl p-2.5">
                    <p className="text-sm font-bold text-theme-gold font-english">{s.val}</p>
                    <p className="text-[9px] text-[#5A6478]">{s.label}</p>
                  </div>
                ))}
              </div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-l from-theme-gold to-accent-orange text-[#0A0E17] font-bold text-sm">
                حفظ على الأمان
              </motion.button>
            </div>
          </motion.div>

          {/* 11 - Notifications */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">11</span>
              <h3 className="font-bold text-sm">إشعارات وتنبيهات</h3>
            </div>
            <div className="space-y-2">
              {['إشعارات مخصصة', 'تحديثات الرحلة', 'عروض جديدة', 'تنبيهات الطقس'].map((n, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#0F1420] border border-[#1E2A3D]">
                  <div className="flex items-center gap-2">
                    <HiBell className="text-theme-gold text-sm" />
                    <span className="text-xs">{n}</span>
                  </div>
                  <div className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${i < 2 ? 'bg-theme-gold' : 'bg-[#1A2235]'}`}>
                    <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all ${i < 2 ? 'right-0.5' : 'left-0.5'}`} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 12 - Rating */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-english text-theme-gold font-bold px-2 py-0.5 rounded-md bg-theme-gold/10">12</span>
              <h3 className="font-bold text-sm">تقييم تجربة زينب</h3>
            </div>
            <div className="text-center">
              <p className="text-sm text-[#8B95A5] mb-4">كيف كانت تجربتك مع زينب؟</p>
              <div className="flex items-center justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <motion.button key={star} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}>
                    <HiStar className={`text-3xl transition-colors ${
                      star <= (hoverRating || rating) ? 'text-theme-gold' : 'text-[#1A2235]'
                    }`} />
                  </motion.button>
                ))}
              </div>
              {rating > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <textarea placeholder="اكتب تعليقك..." rows={3}
                    className="w-full bg-[#0F1420] rounded-xl px-4 py-3 text-sm border border-[#1E2A3D] focus:border-theme-gold/40 outline-none resize-none placeholder:text-[#5A6478] mb-3" />
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-l from-theme-gold to-accent-orange text-[#0A0E17] font-bold text-sm">
                    إرسال التقييم
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
