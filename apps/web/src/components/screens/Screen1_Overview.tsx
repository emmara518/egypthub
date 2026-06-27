'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCube, HiColorSwatch, HiTemplate, HiChat, HiGlobe, HiEye, HiCode, HiAdjustments, HiPhotograph, HiDeviceMobile } from 'react-icons/hi';

/* ───────── data ───────── */
const stages = [
  {
    id: 1,
    title: 'نظام التصميم',
    titleEn: 'Design System',
    desc: 'بناء النظام البصري والألوان والخطوط والمكونات الأساسية للمنصة المصرية.',
    icon: HiColorSwatch,
    screens: [
      { name: 'الألوان', img: '/egypthub/images/destinations/cairo.svg' },
      { name: 'الخطوط', img: '/egypthub/images/destinations/luxor.svg' },
      { name: 'المكونات', img: '/egypthub/images/destinations/sharm-el-sheikh.svg' },
      { name: 'الأزرار', img: '/egypthub/images/activities/desert-safari.svg' },
    ],
  },
  {
    id: 2,
    title: 'الصفحة الرئيسية',
    titleEn: 'Homepage',
    desc: 'الرئيسية بالكامل — البطل، التصنيفات، العروض، الشهادات.',
    icon: HiTemplate,
    screens: [
      { name: 'البطل', img: '/egypthub/images/destinations/cairo.svg' },
      { name: 'التصنيفات', img: '/egypthub/images/destinations/cairo.svg' },
      { name: 'العروض', img: '/egypthub/images/activities/desert-safari.svg' },
      { name: 'AI Concierge', img: '/egypthub/images/destinations/luxor.svg' },
      { name: 'الشهادات', img: '/egypthub/images/destinations/sharm-el-sheikh.svg' },
    ],
  },
  {
    id: 3,
    title: 'الصفحات الأساسية',
    titleEn: 'Core Screens',
    desc: 'صفحات التفاصيل والتصنيفات والبحث والحجز الأساسية.',
    icon: HiCode,
    screens: [
      { name: 'تفاصيل العرض', img: '/egypthub/images/destinations/sharm-el-sheikh.svg' },
      { name: 'التصنيفات', img: '/egypthub/images/destinations/cairo.svg' },
      { name: 'صفحة الحجز', img: '/egypthub/images/activities/diving.svg' },
      { name: 'البحث', img: '/egypthub/images/activities/desert-safari.svg' },
    ],
  },
  {
    id: 4,
    title: 'AI Concierge',
    titleEn: 'AI Concierge',
    desc: 'مساعد الذكاء الاصطناعي — زينب — محادثة ذكية وتخطيط رحلات.',
    icon: HiChat,
    screens: [
      { name: 'محادثة ذكية', img: '/egypthub/images/destinations/cairo.svg' },
      { name: 'مخطط الرحلة', img: '/egypthub/images/destinations/cairo.svg' },
      { name: 'المساعد الصوتي', img: '/egypthub/images/destinations/luxor.svg' },
      { name: 'التوصيات', img: '/egypthub/images/activities/desert-safari.svg' },
      { name: 'الملف الشخصي', img: '/egypthub/images/destinations/sharm-el-sheikh.svg' },
    ],
  },
  {
    id: 5,
    title: 'المنصة الكاملة',
    titleEn: 'Full Platform',
    desc: 'منصة المستخدم والشركاء والإدارة والحجز والدفع.',
    icon: HiGlobe,
    screens: [
      { name: 'منصة المستخدم', img: '/egypthub/images/destinations/cairo.svg' },
      { name: 'الشركاء', img: '/egypthub/images/destinations/cairo.svg' },
      { name: 'الموبايل', img: '/egypthub/images/activities/diving.svg' },
      { name: 'الحجز', img: '/egypthub/images/activities/desert-safari.svg' },
      { name: 'لوحة التحكم', img: '/egypthub/images/destinations/sharm-el-sheikh.svg' },
    ],
  },
];

const toolbarItems = [
  { label: 'المرحلة', icon: HiCube },
  { label: 'تحليل الألوان', icon: HiColorSwatch },
  { label: 'الشفافية', icon: HiEye },
  { label: 'الخطوط', icon: HiAdjustments },
  { label: 'الأيقونات', icon: HiPhotograph },
  { label: 'المكونات الرئيسية', icon: HiTemplate },
  { label: 'الاستجابة', icon: HiDeviceMobile },
];

const colorCircles = [
  { color: '#0D3B66', label: 'Primary' },
  { color: '#E9C46A', label: 'Secondary' },
  { color: '#F4A261', label: 'Accent' },
  { color: '#8B95A5', label: 'Neutral' },
];

/* ───────── component ───────── */
export default function Screen1_Overview() {
  const [activeStage, setActiveStage] = useState(0);
  const [activeToolbar, setActiveToolbar] = useState(0);

  return (
    <div className="min-h-screen bg-theme-bg text-white font-arabic">
      {/* ─── Top Toolbar ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-theme-surface/90 backdrop-blur-xl border-b border-theme-border"
      >
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {toolbarItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                onClick={() => setActiveToolbar(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeToolbar === i
                    ? 'bg-theme-gold/15 text-theme-gold border border-theme-gold/30'
                    : 'text-theme-secondary hover:text-white hover:bg-theme-elevated'
                }`}
              >
                <Icon className="text-base" />
                {item.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 py-8 flex gap-8">
        {/* ─── Right Panel — Project Info ─── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-72 shrink-0"
        >
          <div className="sticky top-24 space-y-6">
            {/* Header */}
            <div className="bg-theme-card rounded-2xl border border-theme-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-theme-gold to-accent-orange flex items-center justify-center">
                  <HiCube className="text-2xl text-dark-900" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">ملف تحليل شامل</h2>
                  <p className="text-theme-secondary text-xs">التحليل الكامل</p>
                </div>
              </div>
              <p className="text-theme-secondary text-sm leading-relaxed mb-4">
                تحليل المرجع ومكونات التصميم وعناصره الأساسية لمنصة مصر هب السياحية.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-lg bg-theme-gold/10 text-theme-gold text-xs font-semibold">تصميم</span>
                <span className="px-3 py-1 rounded-lg bg-accent-orange/10 text-accent-orange text-xs font-semibold">تحليل</span>
              </div>
            </div>

            {/* Color Analysis */}
            <div className="bg-theme-card rounded-2xl border border-theme-border p-5">
              <h3 className="text-sm font-bold mb-4 text-theme-gold">تحليل الألوان</h3>
              <div className="flex items-center justify-center gap-3 mb-4">
                {colorCircles.map((c, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    className="text-center"
                  >
                    <div
                      className="w-10 h-10 rounded-full border-2 border-theme-border shadow-lg mx-auto mb-1"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="text-[10px] text-theme-muted font-english">{c.label}</span>
                  </motion.div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 rounded-lg bg-theme-surface">
                  <span className="text-[10px] text-theme-muted font-english block">Playfair Display</span>
                </div>
                <div className="text-center p-2 rounded-lg bg-theme-surface">
                  <span className="text-[10px] text-theme-muted font-english block">Poppins</span>
                </div>
              </div>
            </div>

            {/* Stage Navigator */}
            <div className="bg-theme-card rounded-2xl border border-theme-border p-5">
              <h3 className="text-sm font-bold mb-3 text-theme-gold">المراحل</h3>
              <div className="space-y-1">
                {stages.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveStage(i)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-right text-sm transition-all duration-300 ${
                      activeStage === i
                        ? 'bg-theme-gold/10 text-theme-gold border border-theme-gold/25'
                        : 'text-theme-secondary hover:text-white hover:bg-theme-elevated'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center font-english ${
                      activeStage === i ? 'bg-theme-gold text-dark-900' : 'bg-theme-elevated text-theme-muted'
                    }`}>
                      {s.id}
                    </span>
                    <span className="truncate">{s.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Main Content — Stages ─── */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {stages.map((stage, idx) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="mb-6"
              >
                {/* Stage Row */}
                <motion.div
                  onClick={() => setActiveStage(idx)}
                  whileHover={{ scale: 1.005 }}
                  className={`rounded-2xl border p-5 cursor-pointer transition-all duration-500 ${
                    activeStage === idx
                      ? 'bg-theme-card border-theme-gold/30 shadow-[0_0_30px_rgba(212,162,76,0.08)]'
                      : 'bg-theme-surface border-theme-border hover:border-theme-border/80'
                  }`}
                >
                  {/* Stage Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      activeStage === idx
                        ? 'bg-gradient-to-br from-theme-gold to-accent-orange'
                        : 'bg-theme-elevated'
                    }`}>
                      <stage.icon className={`text-xl ${activeStage === idx ? 'text-dark-900' : 'text-theme-muted'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-english font-bold px-2 py-0.5 rounded-md ${
                          activeStage === idx
                            ? 'bg-theme-gold/15 text-theme-gold'
                            : 'bg-theme-elevated text-theme-muted'
                        }`}>
                          المرحلة {stage.id}
                        </span>
                        <h3 className={`font-bold transition-colors ${
                          activeStage === idx ? 'text-white' : 'text-theme-secondary'
                        }`}>
                          {stage.title}
                        </h3>
                        <span className="text-theme-muted text-xs font-english">{stage.titleEn}</span>
                      </div>
                      <p className={`text-xs mt-1 transition-colors ${
                        activeStage === idx ? 'text-theme-secondary' : 'text-theme-muted'
                      }`}>
                        {stage.desc}
                      </p>
                    </div>
                    <div className={`text-xs font-english px-3 py-1 rounded-lg ${
                      activeStage === idx ? 'bg-theme-gold/10 text-theme-gold' : 'bg-theme-elevated text-theme-muted'
                    }`}>
                      {stage.screens.length} شاشات
                    </div>
                  </div>

                  {/* Screen Thumbnails */}
                  <AnimatePresence>
                    {activeStage === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-3 overflow-x-auto pb-2 pt-2 scrollbar-hide">
                          {stage.screens.map((screen, si) => (
                            <motion.div
                              key={si}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: si * 0.08 }}
                              whileHover={{ y: -4 }}
                              className="shrink-0 group"
                            >
                              {/* Phone Frame */}
                              <div className="w-[120px] rounded-2xl overflow-hidden border border-theme-border group-hover:border-theme-gold/40 transition-all duration-300 bg-theme-bg">
                                {/* Status bar */}
                                <div className="h-4 bg-theme-surface flex items-center justify-between px-2">
                                  <div className="flex gap-0.5">
                                    <div className="w-1 h-1 rounded-full bg-theme-muted" />
                                    <div className="w-1 h-1 rounded-full bg-theme-muted" />
                                    <div className="w-1 h-1 rounded-full bg-theme-muted" />
                                  </div>
                                  <div className="w-4 h-1 rounded-full bg-theme-muted" />
                                </div>
                                {/* Screen content */}
                                <div className="relative h-[180px] overflow-hidden">
                                  <img
                                    src={screen.img}
                                    alt={screen.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-transparent to-transparent" />
                                  {/* Gold accent line at bottom */}
                                  <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#E9C46A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                {/* Label */}
                                <div className="p-2 bg-theme-surface">
                                  <p className="text-[10px] text-center text-theme-secondary group-hover:text-theme-gold transition-colors truncate">
                                    {screen.name}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Timeline Connector */}
                {idx < stages.length - 1 && (
                  <div className="flex justify-start pr-[72px]">
                    <div className={`w-0.5 h-6 transition-colors duration-500 ${
                      activeStage > idx ? 'bg-theme-gold/40' : 'bg-theme-border'
                    }`} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
