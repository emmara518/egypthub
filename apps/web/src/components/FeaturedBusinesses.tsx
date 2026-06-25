import Link from 'next/link';
import { motion } from 'framer-motion';

const businesses = [
  { name: 'Four Seasons Nile', slug: 'four-seasons-nile', image: '/images/luxury/four-seasons.svg', rating: 4.9, type: 'Hotel', location: 'Cairo' },
  { name: 'Red Sea Diving Center', slug: 'red-sea-diving', image: '/images/activities/diving.svg', rating: 4.8, type: 'Activity', location: 'Hurghada' },
  { name: 'Sofitel Legend Old Cataract', slug: 'old-cataract', image: '/images/luxury/marriott.svg', rating: 4.9, type: 'Hotel', location: 'Aswan' },
  { name: 'Khan El Khalili Bazaar', slug: 'khan-el-khalili', image: '/images/food/street-food.svg', rating: 4.6, type: 'Shopping', location: 'Cairo' },
  { name: 'Siwa Oasis Retreat', slug: 'siwa-retreat', image: '/images/destinations/siwa.svg', rating: 4.7, type: 'Resort', location: 'Siwa' },
  { name: 'Abu Simbel Tours', slug: 'abu-simbel', image: '/images/destinations/luxor.svg', rating: 4.8, type: 'Tour', location: 'Aswan' },
];

export default function FeaturedBusinesses() {
  return (
    <section className="py-24 bg-dark-900">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-3 font-poppins">مميز</p>
            <h2 className="text-4xl md:text-5xl font-bold font-playfair text-theme">
              أفضل <span className="text-theme-gold">التجارب</span>
            </h2>
            <p className="text-theme-secondary mt-3 font-cairo max-w-xl">
              تجارب متميزة منتقاة بعناية بأعلى تقييمات المسافرين.
            </p>
          </div>
          <Link
            href="/experiences"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary-500/40 text-primary-500 hover:bg-primary-500/10 transition-all duration-200 font-cairo text-sm"
          >
            عرض الكل
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((biz, idx) => (
            <motion.div
              key={biz.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <Link href={`/business/${biz.slug}`} className="group block rounded-xl overflow-hidden border border-primary-500/20 bg-dark-800">
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out-expo group-hover:scale-105"
                    style={{ backgroundImage: `url(${biz.image})` }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-dark-900/80 text-primary-500 border border-primary-500/30">
                      {biz.type}
                    </span>
                  </div>
                  <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-dark-900/60 flex items-center justify-center text-neutral-100 hover:text-accent-amber transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#F2A00A" stroke="#F2A00A" strokeWidth="1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span className="text-accent-amber text-sm font-semibold">{biz.rating}</span>
                  </div>
                  <h3 className="text-lg font-bold font-playfair text-neutral-100 mb-1">{biz.name}</h3>
                  <p className="text-neutral-500 text-sm font-cairo">{biz.location}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
