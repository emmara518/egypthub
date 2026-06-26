'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const CITIES = [
  { name: 'القاهرة', lat: 30.0444, lng: 31.2357 },
  { name: 'الإسكندرية', lat: 31.2001, lng: 29.9187 },
  { name: 'الأقصر', lat: 25.6872, lng: 32.6396 },
  { name: 'أسوان', lat: 24.0889, lng: 32.8998 },
  { name: 'شرم الشيخ', lat: 27.9158, lng: 34.33 },
  { name: 'الغردقة', lat: 27.2579, lng: 33.8116 },
  { name: 'دهب', lat: 28.5015, lng: 34.5154 },
  { name: 'سيوة', lat: 29.2032, lng: 25.5117 },
];

const SEASONAL: Record<string, { spring: string; summer: string; fall: string; winter: string }> = {
  'القاهرة': { spring: '22-30°C — معتدل ومشمس', summer: '28-38°C — حار وجاف', fall: '22-32°C — لطيف', winter: '10-20°C — بارد نسبياً' },
  'الإسكندرية': { spring: '18-26°C — معتدل', summer: '25-32°C — حار ورطب', fall: '18-28°C — لطيف', winter: '10-18°C — بارد وممطر' },
  'الأقصر': { spring: '22-35°C — حار', summer: '30-42°C — شديد الحرارة', fall: '22-36°C — حار', winter: '10-22°C — معتدل' },
  'أسوان': { spring: '24-36°C — حار', summer: '32-44°C — شديد الحرارة', fall: '24-38°C — حار', winter: '10-24°C — معتدل' },
  'شرم الشيخ': { spring: '22-30°C — مثالي للغوص', summer: '28-38°C — حار', fall: '22-32°C — لطيف', winter: '14-24°C — معتدل' },
  'الغردقة': { spring: '22-30°C — مثالي', summer: '28-36°C — حار', fall: '22-32°C — لطيف', winter: '14-24°C — معتدل' },
  'دهب': { spring: '20-28°C — مثالي', summer: '26-36°C — حار', fall: '20-30°C — لطيف', winter: '12-22°C — معتدل' },
  'سيوة': { spring: '20-32°C — دافئ', summer: '28-42°C — حار جداً', fall: '20-34°C — دافئ', winter: '8-20°C — بارد' },
};

const PACKING: Record<string, string[]> = {
  'القاهرة': ['ملابس صيفية خفيفة', 'سترة خفيفة للمساء', 'أحذية مريحة للمشي', 'نظارة شمسية', 'قبعة'],
  'الإسكندرية': ['ملابس صيفية', 'جاكيت خفيف', 'مظلة (في الشتاء)', 'نظارة شمسية'],
  'الأقصر': ['ملابس قطنية', 'قبعة واسعة', 'واقي شمس قوي', 'نظارة شمسية', 'مياه كافية'],
  'أسوان': ['ملابس قطنية خفيفة', 'قبعة', 'واقي شمس', 'نظارة شمسية'],
  'شرم الشيخ': ['ملابس شاطئ', 'معدات غوص', 'واقي شمس', 'سترة خفيفة للمساء'],
  'الغردقة': ['ملابس شاطئ', 'معدات غطس', 'واقي شمس', 'شبشب'],
  'دهب': ['ملابس رياضية', 'معدات غوص', 'جاكيت خفيف', 'واقي شمس'],
  'سيوة': ['ملابس قطنية', 'جاكيت ثقيل للمساء', 'وشاح للرمل', 'مصباح يدوي'],
};

function getTodayWeather(city: string) {
  const month = new Date().getMonth();
  const season = month >= 3 && month <= 5 ? 'spring' : month >= 6 && month <= 8 ? 'summer' : month >= 9 && month <= 11 ? 'fall' : 'winter';
  const base = SEASONAL[city]?.[season] || '22°C — معتدل';
  const temp = parseInt(base);
  const conditions = ['مشمس', 'صافي', 'غائم جزئياً', 'جاف'];
  const icons = ['M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41'];
  return {
    temp: temp + Math.round(Math.random() * 4),
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    icon: icons[Math.floor(Math.random() * icons.length)],
    humidity: Math.round(40 + Math.random() * 40),
    wind: Math.round(5 + Math.random() * 20),
  };
}

function getForecast() {
  const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const today = new Date().getDay();
  return Array.from({ length: 7 }, (_, i) => ({
    day: days[(today + i) % 7],
    temp: Math.round(22 + Math.random() * 12),
    condition: ['مشمس', 'غائم', 'جاف', 'معتدل', 'صافي'][Math.floor(Math.random() * 5)],
    icon: 'M12 2v2',
  }));
}

export default function WeatherPage() {
  const [city, setCity] = useState('القاهرة');

  const today = useMemo(() => getTodayWeather(city), [city]);
  const forecast = useMemo(() => getForecast(), []);
  const bestTime = useMemo(() => {
    const info: Record<string, string> = {
      'القاهرة': 'أكتوبر إلى أبريل — أفضل وقت لزيارة القاهرة', 'الإسكندرية': 'مارس إلى نوفمبر — أجواء البحر المتوسط',
      'الأقصر': 'أكتوبر إلى أبريل — لتجنب الحر الشديد', 'أسوان': 'أكتوبر إلى مارس — درجات حرارة معتدلة',
      'شرم الشيخ': 'أكتوبر إلى مايو — مثالي للغوص', 'الغردقة': 'على مدار السنة (الأفضل أكتوبر-يونيو)',
      'دهب': 'أكتوبر إلى مايو — الطقس المثالي', 'سيوة': 'أكتوبر إلى أبريل — أجواء الصحراء المعتدلة',
    };
    return info[city] || '';
  }, [city]);

  const cardClass = "bg-[#0F1525] border border-theme-gold/20 rounded-2xl p-5";

  return (
    <div className="min-h-screen bg-[#080C18] pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white font-cairo mb-2">الطقس في مصر</h1>
          <p className="text-sm text-white/60 font-cairo">تعرف على أحوال الطقس قبل رحلتك</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-[#0F1525] border border-theme-gold/20 rounded-xl px-4 py-3 text-sm text-white font-cairo outline-none focus:border-theme-gold/40">
            {CITIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`${cardClass} mb-4`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/50 font-cairo">{city} — اليوم</p>
              <p className="text-4xl font-bold text-white font-english mt-1">{today.temp}°C</p>
              <p className="text-sm text-white/70 font-cairo mt-1">{today.condition}</p>
              <div className="flex gap-4 mt-2">
                <span className="text-[10px] text-white/40 font-cairo">الرطوبة: {today.humidity}%</span>
                <span className="text-[10px] text-white/40 font-cairo">الرياح: {today.wind} كم/س</span>
              </div>
            </div>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={today.icon} /></svg>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`${cardClass} mb-4`}>
          <h2 className="text-sm font-bold text-theme-gold font-cairo mb-3">توقعات 7 أيام</h2>
          <div className="grid grid-cols-7 gap-2">
            {forecast.map((d, i) => (
              <div key={i} className="text-center px-1 py-2 rounded-xl bg-white/5">
                <p className="text-[10px] text-white/50 font-cairo mb-1">{d.day}</p>
                <p className="text-sm text-white font-english font-bold">{d.temp}°</p>
                <p className="text-[8px] text-white/40 font-cairo mt-1">{d.condition}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={cardClass}>
            <h2 className="text-sm font-bold text-theme-gold font-cairo mb-3">أفضل وقت للزيارة</h2>
            <p className="text-sm text-white/80 font-cairo">{bestTime}</p>
            <div className="mt-3 space-y-2">
              {Object.entries(SEASONAL[city] || {}).map(([season, desc]) => (
                <div key={season} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5">
                  <span className="text-xs text-white/70 font-cairo">{season === 'spring' ? 'ربيع' : season === 'summer' ? 'صيف' : season === 'fall' ? 'خريف' : 'شتاء'}</span>
                  <span className="text-[10px] text-white/50 font-cairo">{desc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className={cardClass}>
            <h2 className="text-sm font-bold text-theme-gold font-cairo mb-3">اقتراحات الأمتعة</h2>
            <div className="space-y-2">
              {(PACKING[city] || []).map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A24C" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                  <span className="text-sm text-white font-cairo">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
