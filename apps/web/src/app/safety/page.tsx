'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const SECTIONS = [
  {
    id: 'health',
    label: 'الصحة',
    icon: '🏥',
    status: 'yellow' as const,
    items: [
      { title: 'مياه الشرب', desc: 'اشرب ميه معدنية أو مغلية. متشربش مية حنفية.', tip: 'خلي معاك زجاجة مية دايمًا' },
      { title: 'التطعيمات', desc: 'ينصح بأخذ تطعيمات التهاب الكبد A والتيفود قبل السفر.', tip: 'استشر طبيبك قبل السفر بأسبوعين' },
      { title: 'الحرارة', desc: 'مصر حارة في الصيف (قد تصل لـ 40°م). اشرب مية كتير.', tip: 'استخدم واقي شمس وقبعة' },
      { title: 'أكل الشارع', desc: 'الأكل من العربيات ممكن يكون لذيذ لكن تأكد إنه طازة.', tip: 'اكل في الأماكن المزدحمة — ده دليل على الجودة' },
    ],
  },
  {
    id: 'safety',
    label: 'نصائح الأمان',
    icon: '🛡️',
    status: 'green' as const,
    items: [
      { title: 'الأماكن السياحية', desc: 'مصر آمنة جداً للسياح في المناطق السياحية. التزم بالمناطق المألوفة.', tip: 'خلي صور جواز السفر في تليفونك' },
      { title: 'التنقل ليلاً', desc: 'يفضل استخدام أوبر أو كريم بدل التاكسي العادي ليلاً.', tip: 'شارك موقعك مع حد تثق فيه' },
      { title: 'الأشياء الثمينة', desc: 'خلي فلوسك وجواز سفرك في خزينة الفندق.', tip: 'متحطش كل فلوسك في مكان واحد' },
      { title: 'النصب', desc: 'في بعض الباعة بيزودوا السعر للسياح. تفاوض دايماً!', tip: 'اسأل المصريين عن السعر الحقيقي' },
    ],
  },
  {
    id: 'emergency',
    label: 'أرقام الطوارئ',
    icon: '🆘',
    status: 'red' as const,
    items: [
      { title: 'الشرطة', desc: '122 — للطوارئ والمساعدة الفورية', tip: 'احفظ الرقم في تليفونك' },
      { title: 'الإسعاف', desc: '123 — حالات الطوارئ الطبية', tip: 'في الفنادق الكبيرة في عيادات خاصة' },
      { title: 'الإطفاء', desc: '180 — حالات الحرائق', tip: 'اعرف مخارج الطوارئ في فندقك' },
    ],
  },
  {
    id: 'embassy',
    label: 'السفارات',
    icon: '🏛️',
    status: 'green' as const,
    items: [
      { title: 'السفارة المصرية', desc: 'القاهرة — لتقديم المساعدة للسياح', tip: 'سجل نفسك في موقع السفارة قبل السفر' },
      { title: 'القنصلية الأمريكية', desc: '📍 القاهرة — EL Cairo', tip: ' +20-2-2797-3300' },
      { title: 'السفارة البريطانية', desc: '📍 القاهرة — 7 Ahmed Ragheb St.', tip: ' +20-2-2791-6000' },
      { title: 'السفارة الفرنسية', desc: '📍 القاهرة — Giza', tip: ' +20-2-3567-3200' },
      { title: 'السفارة الألمانية', desc: '📍 القاهرة — 57 Hassan Hosny St.', tip: ' +20-2-2728-2000' },
    ],
  },
];

const STATUS_COLORS = {
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', dot: 'bg-green-400', text: 'text-green-400' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', dot: 'bg-yellow-400', text: 'text-yellow-400' },
  red: { bg: 'bg-red-500/10', border: 'border-red-500/30', dot: 'bg-red-400', text: 'text-red-400' },
};

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-theme-bg pt-28 pb-16">
      <div className="max-w-[1000px] mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl font-bold font-playfair text-theme mb-3">
            السفر الآمن <span className="text-theme-gold">في مصر</span>
          </h1>
          <p className="text-theme-secondary font-cairo max-w-xl mx-auto">معلومات مهمة للسفر الآمن والمريح في مصر — نصائح صحية وأمان وأرقام طوارئ</p>
        </motion.div>

        <div className="space-y-8">
          {SECTIONS.map((section, si) => {
            const colors = STATUS_COLORS[section.status];
            return (
              <motion.div key={section.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.1 }}
                className={`rounded-2xl border ${colors.border} ${colors.bg} overflow-hidden shadow-gold-border`}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{section.icon}</span>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold font-playfair text-theme">{section.label}</h2>
                      <span className={`w-2.5 h-2.5 rounded-full ${colors.dot} animate-glow-pulse`} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {section.items.map((item, ii) => (
                      <motion.div key={ii} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: si * 0.1 + ii * 0.05 }}
                        className="rounded-xl bg-theme-card/80 border border-theme-gold/10 p-4 hover:border-theme-gold/30 transition-all">
                        <h3 className="text-sm font-bold font-cairo text-theme mb-1">{item.title}</h3>
                        <p className="text-xs text-theme-secondary font-cairo mb-2 leading-relaxed">{item.desc}</p>
                        <div className="flex items-start gap-1.5">
                          <span className="text-theme-gold text-xs mt-0.5">💡</span>
                          <p className="text-[11px] text-theme-gold/80 font-cairo">{item.tip}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="mt-10 rounded-2xl border border-theme-gold/20 bg-gradient-to-l from-theme-gold/5 to-transparent p-6 text-center shadow-gold-border">
          <span className="text-4xl block mb-3">🇪🇬</span>
          <h3 className="text-lg font-bold font-cairo text-theme mb-2">مصر في انتظارك!</h3>
          <p className="text-sm text-theme-secondary font-cairo max-w-lg mx-auto mb-4">
            مصر بلد آمن وودود. ملايين السياح بيزوروها كل سنة وبيستمتعوا بأوقاتهم. اتبع النصائح دي ورحلتك هتبقى تجربة لا تنسى.
          </p>
          <Link href="/zainab"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-theme-gold text-dark-900 font-bold font-cairo text-sm hover:bg-theme-gold/80 transition-all">
            اسأل زينب عن الأمان
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
