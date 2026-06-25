import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'اختر وجهتك',
    desc: 'تصفح مئات الوجهات والتجارب والأنشطة في جميع أنحاء مصر.',
    icon: '📍',
  },
  {
    number: '02',
    title: 'خطط بالذكاء الاصطناعي',
    desc: 'دع مساعدنا الذكي يساعدك في بناء خط سير مثالي يناسب تفضيلاتك.',
    icon: '🤖',
  },
  {
    number: '03',
    title: 'احجز واستمتع',
    desc: 'حجز آمن، تأكيد فوري، ودعم على مدار الساعة طوال رحلتك.',
    icon: '✨',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-theme-surface">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-3 font-poppins">كيف يعمل</p>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-theme">
            ثلاث خطوات <span className="text-theme-gold">بسيطة</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="text-center relative"
            >
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-theme-gold/50 to-transparent" />
              )}
              <div className="w-24 h-24 rounded-2xl bg-theme-card border border-theme flex items-center justify-center text-3xl mx-auto mb-6">
                {step.icon}
              </div>
              <span className="text-theme-gold text-xs font-bold tracking-widest font-poppins">{step.number}</span>
              <h3 className="text-xl font-bold font-playfair text-theme mt-2 mb-3">{step.title}</h3>
              <p className="text-theme-secondary font-cairo leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
