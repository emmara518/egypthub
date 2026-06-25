'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const stats = [
  { val: '7,000+', label: 'سنة تاريخ' },
  { val: '150+', label: 'معلم سياحي' },
  { val: '10M+', label: 'زائر سنوياً' },
  { val: '6', label: 'مناطق سياحية' },
];

const sections = [
  {
    id: 'history',
    title: 'التاريخ',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    desc: 'تمتد تاريخ مصر إلى أكثر من 7000 عام، making it one of the oldest civilizations in the world. From the Great Pyramids of Giza to the temples of Luxor and Karnak, Egypt is home to some of the most iconic ancient monuments ever built.',
    highlights: ['الأهرامات', 'معبد الكرنك', 'وادي الملوك', 'متحف القاهرة'],
    image: 'https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=600&h=400&fit=crop',
  },
  {
    id: 'culture',
    title: 'الثقافة',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    desc: 'تتميز مصر بتراث ثقافي غني يجمع بين العادات والتقاليد القديمة والحياة العصرية. من الموسيقى والرقص إلى الحرف اليدوية والأسواق التقليدية، تقدم مصر تجربة ثقافية فريدة.',
    highlights: ['الموسيقى الشرقية', 'الحرف اليدوية', 'الأسواق التقليدية', 'الأدب العربي'],
    image: 'https://images.unsplash.com/photo-1568322503122-d21b1d9c8e04?w=600&h=400&fit=crop',
  },
  {
    id: 'nature',
    title: 'الطبيعة',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    desc: 'تتنوع الطبيعة في مصر بين الصحراء الذهبية والبحر الأحمر الساحر والنهر الأخضر. تقدم مناطق الطبيعة في مصر فرصاً فريدة للمغامرات والاسترخاء.',
    highlights: ['البحر الأحمر', 'واحة سيوة', 'الصحراء البيضاء', 'نهر النيل'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
  },
  {
    id: 'food',
    title: 'الطعام',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.5 1.5 0 013 15.546M12 2v20M3 7h18" />
      </svg>
    ),
    desc: 'المطبخ المصري غني ومتنوع، يعكس تاريخه الثقافي الطويل. من الكشري والفول المدمس إلى الملوخية والحمام المحشي، تقدم المطاعم المصرية تجربة لا تُنسى.',
    highlights: ['الفول المدمس', 'الكشري', 'الملوخية', 'الحمام المحشي'],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
  },
];

const relatedExperiences = [
  { name: 'جولة الأهرامات', slug: 'pyramids-tour', image: 'https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=300&h=200&fit=crop', price: 'EGP 1,200' },
  { name: 'غوص البحر الأحمر', slug: 'red-sea-diving', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop', price: 'EGP 1,800' },
  { name: 'رحلة نيلية', slug: 'nile-cruise', image: 'https://images.unsplash.com/photo-1568322503122-d21b1d9c8e04?w=300&h=200&fit=crop', price: 'EGP 2,500' },
  { name: ' Safari الصحراء', slug: 'desert-safari', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=300&h=200&fit=crop', price: 'EGP 950' },
];

export default function AboutEgyptPage() {
  return (
    <div className="min-h-screen bg-[#080C18]" dir="rtl">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=1600&h=900&fit=crop)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C18] via-[#080C18]/50 to-transparent" />
        <div className="absolute inset-0 bg-[#080C18]/30" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-[#D4A24C] text-sm font-cairo font-bold tracking-wider mb-4 block">مصر — أم الدنيا</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-playfair mb-4 leading-tight">
              اكتشف سحر<br />
              <span className="text-[#D4A24C]">أقدم حضارة في العالم</span>
            </h1>
            <p className="text-lg text-white/70 font-cairo max-w-2xl mx-auto mb-8">
              من أهرامات الجيزة إلى شواطئ البحر الأحمر، مصر تقدم تجربة سياحية لا تُنسى
            </p>
            <Link href="/experiences"
              className="inline-flex px-8 py-3 rounded-xl bg-gradient-to-l from-[#D4A24C] to-[#C89A3D] text-[#080C18] font-cairo font-bold hover:shadow-lg hover:shadow-[#D4A24C]/30 transition-all">
              ابدأ رحلتك
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-16">
        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, idx) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl border border-[#D4A24C]/10 bg-[#141B2D]">
              <span className="text-3xl font-bold text-[#D4A24C] font-english block mb-1">{stat.val}</span>
              <span className="text-sm text-[#8B95A5] font-cairo">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Sections */}
        <div className="space-y-20">
          {sections.map((section, idx) => (
            <motion.div key={section.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
              <div className="flex-1">
                <div className="relative rounded-2xl overflow-hidden h-72 lg:h-96">
                  <div className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url(${section.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080C18]/60 to-transparent" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D4A24C]/10 border border-[#D4A24C]/20 flex items-center justify-center text-[#D4A24C]">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-white font-playfair">{section.title}</h2>
                </div>
                <p className="text-sm text-[#8B95A5] font-cairo leading-relaxed mb-6">{section.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {section.highlights.map(h => (
                    <span key={h} className="px-3 py-1.5 rounded-full bg-[#D4A24C]/10 text-[#D4A24C] text-xs font-cairo border border-[#D4A24C]/20">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Related Experiences */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white font-playfair mb-6 text-center">تجارب ذات صلة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedExperiences.map((exp, idx) => (
              <motion.div key={exp.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                className="rounded-2xl border border-[#D4A24C]/10 bg-[#141B2D] overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all">
                <div className="relative h-40 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${exp.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141B2D] to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white text-sm font-cairo mb-1 group-hover:text-[#D4A24C] transition-colors">{exp.name}</h3>
                  <span className="text-sm font-bold text-[#D4A24C] font-english">{exp.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="rounded-2xl border border-[#D4A24C]/20 bg-gradient-to-l from-[#D4A24C]/5 to-[#C89A3D]/5 p-8">
            <h2 className="text-xl font-bold text-white font-playfair mb-2">جاهز لاكتشاف مصر؟</h2>
            <p className="text-sm text-[#5A6478] font-cairo mb-6">ابدأ رحلتك مع EgyptHub واكتشف أجمل الوجهات</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/experiences"
                className="px-6 py-3 rounded-xl bg-gradient-to-l from-[#D4A24C] to-[#C89A3D] text-[#080C18] text-sm font-cairo font-bold">
                استكشف التجارب
              </Link>
              <Link href="/booking-history"
                className="px-6 py-3 rounded-xl border border-[#D4A24C]/30 text-[#D4A24C] text-sm font-cairo font-bold hover:bg-[#D4A24C]/5 transition-all">
                سجل الحجوزات
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
