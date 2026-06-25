import Image from 'next/image';
import { motion } from 'framer-motion';
import { PyramidIcon } from './EgyptianIcons';
import SandWave from './SandWave';

const collageImages = [
  '/images/destinations/sharm-el-sheikh.svg', // Sharm
  '/images/destinations/cairo.svg', // Cairo
  '/images/destinations/luxor.svg', // Luxor
];

export default function AboutSection() {
  return (
    <section className="relative py-24 bg-theme-elevated overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Image Collage */}
          <div className="flex-1 w-full relative min-h-[500px]">
            {/* Main large image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute right-0 top-10 w-[60%] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20"
            >
              <Image src={collageImages[0]} alt="Sharm" fill sizes="(max-width: 1024px) 60vw, 30vw" className="object-cover" />
            </motion.div>

            {/* Top left smaller image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute left-[10%] top-0 w-[45%] aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white z-10"
            >
              <Image src={collageImages[1]} alt="Cairo" fill sizes="(max-width: 1024px) 45vw, 22vw" className="object-cover" />
            </motion.div>

            {/* Bottom left smaller image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute left-0 bottom-10 w-[50%] aspect-video rounded-3xl overflow-hidden shadow-xl border-4 border-white z-30"
            >
              <Image src={collageImages[2]} alt="Luxor" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 lg:pr-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 bg-theme-gold/20 px-4 py-2 rounded-full border border-theme-gold/30"
            >
              <PyramidIcon className="w-4 h-4 text-theme-gold" />
              <span className="text-sm font-bold text-theme-gold">عن المنصة</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold text-theme-text mb-6 font-cairo"
            >
              حكاية مصر هب
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-theme-secondary leading-relaxed mb-8 quote-amiri"
            >
              إحنا مش مجرد منصة حجز. إحنا بوابة تعيشك مصر بعيون أهلها. من شرم الشيخ للقاهرة، بنوصلك بالأصالة والجودة. هدفنا نخليك تكتشف سحر مصر الحقيقي، من الأكلات الشعبية اللذيذة لرحلات الغوص الخيالية، كل ده مع مرشدين وشركاء محليين بيعشقوا البلد.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a href="#about-more" className="inline-flex items-center gap-2 bg-theme-gold hover:bg-theme-gold/80 text-[#0A0E17] px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                اعرف أكتر
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Bottom curved divider bridging to white background */}
      <div className="absolute bottom-0 left-0 right-0 text-white translate-y-[1px]">
        <SandWave />
      </div>
    </section>
  );
}
