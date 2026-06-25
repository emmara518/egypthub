import { motion } from 'framer-motion';
import { PalmIcon } from './EgyptianIcons';

const destinations = [
  // Top 2 (Large)
  {
    name: 'شرم الشيخ',
    desc: 'غوص عالمي، سفاري، وحياة ليلية نابضة',
    image: '/images/destinations/sharm-el-sheikh.svg',
    span: 'col-span-1 md:col-span-6',
  },
  {
    name: 'القاهرة',
    desc: 'متحف مفتوح، أهرامات، تاريخ ٧٠٠٠ سنة',
    image: '/images/destinations/cairo.svg',
    span: 'col-span-1 md:col-span-6',
  },
  // Bottom 3 (Small)
  {
    name: 'الأقصر',
    desc: 'معابد فرعونية، وادي الملوك',
    image: '/images/destinations/luxor.svg',
    span: 'col-span-1 md:col-span-4',
  },
  {
    name: 'الغردقة',
    desc: 'شواطئ ذهبية ورياضات مائية',
    image: '/images/destinations/dahab.svg',
    span: 'col-span-1 md:col-span-4',
  },
  {
    name: 'الساحل الشمالي',
    desc: 'ريزورتات فاخرة، جو رايق',
    image: '/images/destinations/hurghada.svg',
    span: 'col-span-1 md:col-span-4',
  },
];

export default function DestinationIntro() {
  return (
    <section className="py-20 bg-theme-bg relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex flex-col items-center"
          >
            <PalmIcon className="w-8 h-8 text-theme-gold mb-3" />
            <h2 className="text-4xl lg:text-5xl font-bold text-theme font-cairo">
              اختار وجهتك
            </h2>
            <p className="mt-4 text-theme-secondary max-w-2xl text-lg">
              كل مدينة في مصر ليها حكاية، اختار حكايتك وابدأ رحلتك
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative rounded-3xl overflow-hidden ${dest.span} aspect-[4/3] md:aspect-auto md:min-h-[300px] cursor-pointer`}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{dest.name}</h3>
                  <p className="text-white/80 font-medium">{dest.desc}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-theme-gold group-hover:text-[#0A0E17] transition-colors duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
