'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  HiStar, HiLocationMarker, HiSearch, HiHeart, HiClock,
  HiCamera, HiMap, HiCalendar, HiSun, HiCloud,
  HiUser, HiCog, HiHome, HiBell, HiBookmark,
  HiChat, HiGlobe, HiShoppingBag, HiTruck, HiCash,
} from 'react-icons/hi';

/* ───── Section wrapper ───── */
const Section = ({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) => (
  <div id={id} className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-6 scroll-mt-24">
    <div className="flex items-center gap-3 mb-5">
      <span className="text-[10px] font-english font-bold px-2 py-1 rounded-md bg-theme-gold/10 text-theme-gold">{num}</span>
      <h3 className="font-bold text-white">{title}</h3>
    </div>
    {children}
  </div>
);

/* ───── Color Swatch ───── */
const ColorSwatch = ({ color, label, hex }: { color: string; label: string; hex: string }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="text-center group cursor-pointer">
    <div className="w-full aspect-square rounded-xl border border-[#1E2A3D] group-hover:border-theme-gold/30 transition-all shadow-lg mb-2" style={{ backgroundColor: color }} />
    <p className="text-xs text-[#8B95A5] font-medium">{label}</p>
    <p className="text-[10px] text-[#5A6478] font-english font-mono">{hex}</p>
  </motion.div>
);

/* ───── Data ───── */
const sidebarItems = [
  'الألوان', 'الخطوط', 'المسافات', 'نظام الأركان',
  'الظلال والتأثيرات', 'الأزرار', 'البطاقات', 'شريط التنقل',
  'الأيقونات', 'قواعد الصور', 'نظام الاستجابة', 'صياغة وتقليب',
  'نظام الشبكة', 'حالات الاستخدام',
];

const spacingScale = [4, 8, 12, 16, 24, 32, 48, 64, 128];
const radiusValues = ['0', '4', '8', '12', '16', '24', '999'];

const iconCategories = {
  Categories: [HiHome, HiShoppingBag, HiCamera, HiMap, HiGlobe, HiTruck],
  Actions: [HiSearch, HiHeart, HiBookmark, HiStar, HiChat, HiCash],
  'UI Elements': [HiUser, HiCog, HiBell, HiCalendar, HiClock, HiLocationMarker],
  'Weather & Map': [HiSun, HiCloud, HiMap, HiGlobe, HiLocationMarker, HiSearch],
};

/* ───── Main Component ───── */
export default function Screen2_DesignSystem() {
  const [activeSection, setActiveSection] = useState(0);
  const [btnHover, setBtnHover] = useState<string | null>(null);
  const [toggles, setToggles] = useState({ t1: false, t2: true, t3: false });
  const mainRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (idx: number) => {
    setActiveSection(idx);
    const sectionIds = ['colors','typography','spacing','radius','shadows','buttons','cards','navigation','icons','imagery','responsive','imagery2','grid','states'];
    const el = document.getElementById(sectionIds[idx]);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] text-white font-arabic" dir="rtl">
      <div className="max-w-[1500px] mx-auto px-6 py-8 flex gap-6">
        {/* ─── Sidebar ─── */}
        <motion.aside
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-64 shrink-0"
        >
          <div className="sticky top-8 space-y-4">
            {/* Header */}
            <div className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-5">
              <span className="text-[10px] font-english text-theme-gold font-bold block mb-1">المرحلة 1</span>
              <h1 className="text-xl font-bold mb-1">نظام التصميم</h1>
              <p className="text-theme-gold text-sm font-english font-semibold mb-3">Design System</p>
              <p className="text-[#8B95A5] text-xs leading-relaxed">
                بناء النظام البصري والهوية التصميمية والألوان والخطوط لمنصة السياحة المصرية.
              </p>
            </div>

            {/* Nav */}
            <div className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-4">
              <h3 className="text-xs font-bold text-theme-gold mb-3">مكونات المنصة</h3>
              <div className="space-y-0.5">
                {sidebarItems.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSection(i)}
                    className={`w-full text-right px-3 py-2 rounded-lg text-sm transition-all ${
                      activeSection === i
                        ? 'bg-theme-gold/10 text-theme-gold font-medium'
                        : 'text-[#8B95A5] hover:text-white hover:bg-[#1A2235]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Logo */}
            <div className="bg-[#141B2D] rounded-2xl border border-[#1E2A3D] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-theme-gold to-accent-orange flex items-center justify-center">
                <span className="text-[#0A0E17] font-bold text-lg">م</span>
              </div>
              <div>
                <p className="font-bold text-sm">EGYPTHUB</p>
                <p className="text-[10px] text-[#5A6478]">القيم المصرية</p>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* ─── Main Grid ─── */}
        <div ref={mainRef} className="flex-1 min-w-0 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

            {/* 01 - Colors */}
            <Section id="colors" num="01" title="الألوان (Colors)">
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-[#5A6478] mb-2 font-english">Primary</p>
                  <div className="grid grid-cols-5 gap-2">
                    <ColorSwatch color="#0D3B66" label="500" hex="#0D3B66" />
                    <ColorSwatch color="#0A2F52" label="600" hex="#0A2F52" />
                    <ColorSwatch color="#07233E" label="700" hex="#07233E" />
                    <ColorSwatch color="#05182A" label="800" hex="#05182A" />
                    <ColorSwatch color="#030D16" label="900" hex="#030D16" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-[#5A6478] mb-2 font-english">Secondary</p>
                  <div className="grid grid-cols-4 gap-2">
                    <ColorSwatch color="#E9C46A" label="400" hex="#E9C46A" />
                    <ColorSwatch color="#D4A843" label="500" hex="#D4A843" />
                    <ColorSwatch color="#B88D2F" label="600" hex="#B88D2F" />
                    <ColorSwatch color="#9C7420" label="700" hex="#9C7420" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-[#5A6478] mb-2 font-english">Accent</p>
                  <div className="grid grid-cols-4 gap-2">
                    <ColorSwatch color="#F4A261" label="400" hex="#F4A261" />
                    <ColorSwatch color="#E2843F" label="500" hex="#E2843F" />
                    <ColorSwatch color="#C6692E" label="600" hex="#C6692E" />
                    <ColorSwatch color="#A95022" label="700" hex="#A95022" />
                  </div>
                </div>
              </div>
            </Section>

            {/* 02 - Typography */}
            <Section id="typography" num="02" title="الخطوط (Typography)">
              <div className="space-y-5">
                <div className="border-b border-[#1E2A3D] pb-4">
                  <p className="text-[10px] text-[#5A6478] font-english mb-1">العناوين الرئيسية</p>
                  <p className="text-4xl font-display font-bold text-white">Aa</p>
                  <p className="text-[10px] text-[#5A6478] font-english mt-1">Playfair Display</p>
                </div>
                <div className="border-b border-[#1E2A3D] pb-4">
                  <p className="text-[10px] text-[#5A6478] mb-1">المحتوى العربي</p>
                  <p className="text-3xl font-arabic font-bold text-theme-gold">Aa</p>
                  <p className="text-[10px] text-[#5A6478] font-english mt-1">Cairo</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#5A6478] font-english mb-1">English Content</p>
                  <p className="text-2xl font-english font-semibold text-white">Aa</p>
                  <p className="text-[10px] text-[#5A6478] font-english mt-1">Poppins</p>
                </div>
                <div className="pt-2 space-y-2">
                  <p className="text-xs text-[#5A6478]">أحجام الخطوط المعتمدة</p>
                  <div className="flex flex-wrap gap-2">
                    {['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].map(s => (
                      <span key={s} className="px-2 py-1 rounded bg-[#0F1420] text-[10px] text-[#8B95A5] font-english">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* 03 - Spacing */}
            <Section id="spacing" num="03" title="سلالات المسافات (Spacing)">
              <div className="space-y-3">
                {spacingScale.map(val => (
                  <div key={val} className="flex items-center gap-3">
                    <span className="text-[10px] text-[#5A6478] font-english w-8 text-left">{val}</span>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: Math.min(val * 2, 256) }}
                      transition={{ duration: 0.6, delay: val * 0.02 }}
                      className="h-5 rounded bg-gradient-to-l from-theme-gold to-theme-gold/40"
                    />
                  </div>
                ))}
              </div>
            </Section>

            {/* 04 - Border Radius */}
            <Section id="radius" num="04" title="نظام الأركان (Border Radius)">
              <div className="grid grid-cols-4 gap-3">
                {radiusValues.map(r => (
                  <motion.div key={r} whileHover={{ scale: 1.1 }} className="text-center">
                    <div
                      className="w-full aspect-square bg-[#1A2235] border border-theme-gold/20 mb-2"
                      style={{ borderRadius: r === '999' ? '999px' : `${r}px` }}
                    />
                    <span className="text-[10px] text-[#5A6478] font-english">{r}px</span>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* 05 - Shadows & Effects */}
            <Section id="shadows" num="05" title="الظلال والتأثيرات">
              <div className="space-y-4">
                <p className="text-[10px] text-[#5A6478] font-english">Shadows</p>
                <div className="grid grid-cols-5 gap-3">
                  {[0, 1, 2, 3, 4].map(i => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -3 }}
                      className="aspect-square rounded-xl bg-[#1A2235]"
                      style={{
                        boxShadow: i === 0 ? 'none' :
                          `0 ${i * 4}px ${i * 8}px rgba(0,0,0,${0.1 + i * 0.1})`
                      }}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-[#5A6478] font-english mt-4">Glow</p>
                <div className="grid grid-cols-5 gap-3">
                  {[0, 1, 2, 3, 4].map(i => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      className="aspect-square rounded-full bg-[#1A2235]"
                      style={{
                        boxShadow: i === 0 ? 'none' :
                          `0 0 ${i * 10}px rgba(212,162,76,${i * 0.1})`
                      }}
                    />
                  ))}
                </div>
              </div>
            </Section>

            {/* 06 - Buttons */}
            <Section id="buttons" num="06" title="الأزرار (Buttons)">
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-[#5A6478] mb-2 font-english">Primary</p>
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(212,162,76,0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    onHoverStart={() => setBtnHover('primary')}
                    onHoverEnd={() => setBtnHover(null)}
                    className="w-full py-3 rounded-xl bg-gradient-to-l from-theme-gold to-accent-orange text-[#0A0E17] font-bold text-sm transition-all"
                  >
                    استكشف المزيد
                  </motion.button>
                </div>
                <div>
                  <p className="text-[10px] text-[#5A6478] mb-2 font-english">Secondary</p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 rounded-xl border border-theme-gold/40 text-theme-gold font-bold text-sm hover:bg-theme-gold/10 transition-all"
                  >
                    عرض التفاصيل
                  </motion.button>
                </div>
                <div>
                  <p className="text-[10px] text-[#5A6478] mb-2 font-english">Ghost</p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 rounded-xl text-[#8B95A5] font-medium text-sm hover:text-white hover:bg-[#1A2235] transition-all"
                  >
                    المزيد
                  </motion.button>
                </div>
              </div>
            </Section>

            {/* 07 - Cards (spans 2 cols) */}
            <div className="lg:col-span-2">
              <Section id="cards" num="07" title="البطاقات (Cards)">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card Large */}
                  <motion.div whileHover={{ y: -6 }} className="col-span-1">
                    <p className="text-[10px] text-[#5A6478] font-english mb-2">Card / Large</p>
                    <div className="rounded-2xl overflow-hidden border border-[#1E2A3D] bg-[#0F1420] group cursor-pointer hover:border-theme-gold/30 transition-all">
                      <div className="h-36 overflow-hidden">
                        <img src="/egypthub/images/destinations/cairo.svg" alt="أهرامات" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="p-3">
                        <h4 className="font-bold text-sm mb-1">أهرامات الجيزة</h4>
                        <p className="text-[10px] text-[#5A6478] mb-2">عجائب الدنيا السبع</p>
                        <div className="flex items-center gap-1">
                          <HiStar className="text-theme-gold text-xs" />
                          <span className="text-[10px] text-[#8B95A5] font-english">4.9</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card Medium */}
                  <motion.div whileHover={{ y: -6 }} className="col-span-1">
                    <p className="text-[10px] text-[#5A6478] font-english mb-2">Card / Medium</p>
                    <div className="rounded-2xl overflow-hidden border border-[#1E2A3D] bg-[#0F1420] group cursor-pointer hover:border-theme-gold/30 transition-all">
                      <div className="h-28 overflow-hidden">
                        <img src="/egypthub/images/destinations/cairo.svg" alt="القاهرة" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="p-3">
                        <h4 className="font-bold text-xs">Hidden Cairo</h4>
                        <p className="text-[10px] text-[#5A6478]">شوارع القاهرة القديمة</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card Small */}
                  <motion.div whileHover={{ y: -6 }} className="col-span-1">
                    <p className="text-[10px] text-[#5A6478] font-english mb-2">Card / Small</p>
                    <div className="rounded-xl overflow-hidden border border-[#1E2A3D] bg-[#0F1420] p-3 group cursor-pointer hover:border-theme-gold/30 transition-all flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <img src="/egypthub/images/destinations/luxor.svg" alt="النيل" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs">Nile Cruise</h4>
                        <p className="text-[10px] text-[#5A6478]">رحلة نيلية</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Glass Card */}
                  <motion.div whileHover={{ y: -6 }} className="col-span-1">
                    <p className="text-[10px] text-[#5A6478] font-english mb-2">Glass Card</p>
                    <div className="rounded-2xl overflow-hidden border border-theme-gold/15 bg-theme-gold/5 backdrop-blur-xl p-4 group cursor-pointer hover:border-theme-gold/30 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-theme-gold/10 flex items-center justify-center">
                          <HiStar className="text-theme-gold" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs">مميز</h4>
                          <p className="text-[10px] text-[#5A6478]">Details</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-[#8B95A5]">بطاقة شفافة بتأثير الزجاج</p>
                    </div>
                  </motion.div>
                </div>
              </Section>
            </div>

            {/* 08 - Navigation */}
            <Section id="navigation" num="08" title="شريط التنقل (Navigation)">
              <div className="space-y-4">
                {/* Desktop Nav */}
                <div className="bg-[#0F1420] rounded-xl p-3 border border-[#1E2A3D]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-gradient-to-br from-theme-gold to-accent-orange flex items-center justify-center">
                        <span className="text-[#0A0E17] font-bold text-[8px]">م</span>
                      </div>
                      <span className="text-[10px] font-bold font-english">EGYPTHUB</span>
                    </div>
                    <div className="flex gap-3">
                      {['الرئيسية', 'الوجهات', 'التجارب', 'المجتمع'].map(l => (
                        <span key={l} className="text-[8px] text-[#8B95A5] hover:text-theme-gold cursor-pointer transition-colors">{l}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Mobile Bottom Nav */}
                <p className="text-[10px] text-[#5A6478] font-english">Mobile Bottom Nav</p>
                <div className="bg-[#0F1420] rounded-xl p-3 border border-[#1E2A3D] flex items-center justify-around">
                  {[HiHome, HiSearch, HiHeart, HiUser, HiCog].map((Icon, i) => (
                    <motion.button key={i} whileHover={{ scale: 1.2 }} className={`p-2 rounded-lg transition-colors ${i === 0 ? 'text-theme-gold' : 'text-[#5A6478] hover:text-theme-gold'}`}>
                      <Icon className="text-lg" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </Section>

            {/* 09 - Icons */}
            <Section id="icons" num="09" title="الأيقونات (Icons)">
              <div className="space-y-4">
                {Object.entries(iconCategories).map(([cat, icons]) => (
                  <div key={cat}>
                    <p className="text-[10px] text-[#5A6478] font-english mb-2">{cat}</p>
                    <div className="grid grid-cols-6 gap-2">
                      {icons.map((Icon, i) => (
                        <motion.div key={i} whileHover={{ scale: 1.2, color: '#E9C46A' }} className="aspect-square rounded-lg bg-[#0F1420] flex items-center justify-center text-[#8B95A5] hover:text-theme-gold cursor-pointer transition-colors">
                          <Icon className="text-base" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* 10 - Imagery Rules */}
            <Section id="imagery" num="10" title="قواعد الصور (Imagery)">
              <div className="space-y-3">
                {[
                  { label: 'Hero / 16:9', img: '/egypthub/images/destinations/cairo.svg', ratio: 'aspect-video' },
                  { label: 'Card / 4:3', img: '/egypthub/images/destinations/luxor.svg', ratio: 'aspect-[4/3]' },
                  { label: 'Gallery / 1:1', img: '/egypthub/images/destinations/sharm-el-sheikh.svg', ratio: 'aspect-square' },
                ].map(item => (
                  <div key={item.label}>
                    <p className="text-[10px] text-[#5A6478] font-english mb-1">{item.label}</p>
                    <div className={`${item.ratio} rounded-xl overflow-hidden border border-[#1E2A3D]`}>
                      <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* 11 - Responsive */}
            <Section id="responsive" num="11" title="نظام الاستجابة (Responsive)">
              <div className="space-y-4">
                {[
                  { label: 'Desktop', w: '100%', bp: '1280px+', icon: '🖥️' },
                  { label: 'Tablet', w: '75%', bp: '768px', icon: '📱' },
                  { label: 'Mobile', w: '40%', bp: '375px', icon: '📱' },
                ].map(d => (
                  <div key={d.label} className="flex items-center gap-3">
                    <span className="text-lg">{d.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[#8B95A5] font-english">{d.label}</span>
                        <span className="text-[10px] text-[#5A6478] font-english">{d.bp}</span>
                      </div>
                      <div className="h-3 bg-[#0F1420] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: d.w }}
                          transition={{ duration: 0.8 }}
                          className="h-full bg-gradient-to-l from-theme-gold to-accent-orange rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-3 p-3 rounded-lg bg-[#0F1420]">
                  <p className="text-[10px] text-[#5A6478] font-english mb-1">Container Width</p>
                  <p className="text-xs text-[#8B95A5] font-english">Max: 1440px | Padding: 16-24px</p>
                </div>
              </div>
            </Section>

            {/* 12 - Image Styles */}
            <Section id="imagery2" num="12" title="صياغة وتقليب (Imagery)">
              <div className="space-y-3">
                <p className="text-[10px] text-[#5A6478] font-english mb-2">Style</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { img: '/egypthub/images/activities/desert-safari.svg', label: 'معالجة دافئة' },
                    { img: '/egypthub/images/destinations/cairo.svg', label: 'تباين عالي' },
                    { img: '/egypthub/images/activities/diving.svg', label: 'حيوية' },
                    { img: '/egypthub/images/destinations/sharm-el-sheikh.svg', label: 'درامي' },
                  ].map(item => (
                    <motion.div key={item.label} whileHover={{ scale: 1.03 }} className="cursor-pointer">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#1E2A3D] mb-1">
                        <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[10px] text-[#8B95A5] text-center">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section>

            {/* 13 - Grid System */}
            <Section id="grid" num="13" title="نظام الشبكة (Grid System)">
              <div className="space-y-4">
                {[12, 6, 4, 3, 2, 1].map(cols => (
                  <div key={cols}>
                    <p className="text-[10px] text-[#5A6478] font-english mb-1">{12 / cols} col</p>
                    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                      {Array.from({ length: cols }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="h-6 rounded bg-theme-gold/15 border border-theme-gold/10"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* 14 - States */}
            <Section id="states" num="14" title="حالات الاستخدام (States)">
              <div className="space-y-4">
                {/* Button States */}
                <div>
                  <p className="text-[10px] text-[#5A6478] font-english mb-2">Button States</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Default', cls: 'bg-theme-gold text-[#0A0E17]' },
                      { label: 'Hover', cls: 'bg-[#D4A843] text-[#0A0E17] shadow-golden' },
                      { label: 'Active', cls: 'bg-[#B88D2F] text-[#0A0E17] scale-95' },
                      { label: 'Disabled', cls: 'bg-[#1A2235] text-[#5A6478] cursor-not-allowed' },
                      { label: 'Focus', cls: 'bg-theme-gold text-[#0A0E17] ring-2 ring-[#E9C46A]/50 ring-offset-2 ring-offset-[#141B2D]' },
                      { label: 'Error', cls: 'bg-red-500/20 text-red-400 border border-red-500/30' },
                    ].map(s => (
                      <div key={s.label} className="text-center">
                        <div className={`py-2 px-3 rounded-lg text-[10px] font-bold ${s.cls}`}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div>
                  <p className="text-[10px] text-[#5A6478] font-english mb-2">Toggles</p>
                  <div className="space-y-2">
                    {Object.entries(toggles).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-xs text-[#8B95A5]">{key === 't1' ? 'إشعارات' : key === 't2' ? 'الوضع الداكن' : 'الصوت'}</span>
                        <button
                          onClick={() => setToggles(p => ({ ...p, [key]: !p[key as keyof typeof p] }))}
                          className={`w-10 h-5 rounded-full transition-colors duration-300 relative ${val ? 'bg-theme-gold' : 'bg-[#1A2235]'}`}
                        >
                          <motion.div
                            animate={{ x: val ? -18 : 0 }}
                            className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checkboxes */}
                <div>
                  <p className="text-[10px] text-[#5A6478] font-english mb-2">Checkbox / Radio</p>
                  <div className="flex gap-4">
                    <div className="w-5 h-5 rounded border-2 border-theme-gold bg-theme-gold flex items-center justify-center">
                      <span className="text-[#0A0E17] text-xs">✓</span>
                    </div>
                    <div className="w-5 h-5 rounded border-2 border-[#1E2A3D]" />
                    <div className="w-5 h-5 rounded-full border-2 border-theme-gold flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-theme-gold" />
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-[#1E2A3D]" />
                  </div>
                </div>
              </div>
            </Section>

          </div>
        </div>
      </div>
    </div>
  );
}
