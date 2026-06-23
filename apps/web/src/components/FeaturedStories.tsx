'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const stories = [
  {
    title: 'ليلة في الصحراء البيضاء',
    slug: 'white-desert',
    image: '/egypthub/images/stories/sunset-over-the-pyramids.svg',
    author: 'أحمد سمير',
    readTime: '5 دقائق',
    excerpt: 'التخييم تحت النجوم في منظر الصحراء البيضاء الساحر في مصر.',
  },
  {
    title: 'مقاهي القاهرة القديمة المخفية',
    slug: 'hidden-cafes-cairo',
    image: '/egypthub/images/stories/diving-red-sea-magic.svg',
    author: 'ليلى حسن',
    readTime: '4 دقائق',
    excerpt: 'اكتشاف مقاهٍ عمرها قرون في قلب القاهرة الإسلامية.',
  },
  {
    title: 'الغوص في البلوهول',
    slug: 'blue-hole-dahab',
    image: '/egypthub/images/activities/diving.svg',
    author: 'كريم نور',
    readTime: '6 دقائق',
    excerpt: 'كل ما تحتاج معرفته عن الغوص في البلوهول الشهير في دهب.',
  },
  {
    title: 'ليالي رمضان في الإسكندرية',
    slug: 'ramadan-alexandria',
    image: '/egypthub/images/destinations/alexandria.svg',
    author: 'نادية فوزي',
    readTime: '3 دقائق',
    excerpt: 'المدينة الساحلية تنبض بالحياة خلال الشهر الكريم بالفوانيس والنكهات.',
  },
];

export default function FeaturedStories() {
  return (
    <section className="py-24 bg-theme-surface">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-theme-gold text-xs font-semibold tracking-widest uppercase mb-3 font-poppins">قصص</p>
            <h2 className="text-4xl md:text-5xl font-bold font-playfair text-theme">
              قصص <span className="text-theme-gold">مميزة</span>
            </h2>
            <p className="text-theme-secondary mt-3 font-cairo max-w-xl">
              حكايات من مصر يرويها من يعرفونها جيداً.
            </p>
          </div>
          <Link
            href="/stories"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-md border border-theme-gold/40 text-theme-gold hover:bg-theme-gold/10 transition-all duration-200 font-cairo text-sm"
          >
            كل القصص
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story, idx) => (
            <motion.div
              key={story.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                href={`/stories/${story.slug}`}
                className="group block rounded-xl overflow-hidden border border-theme bg-theme-card h-full transition-all duration-350 ease-out-expo hover:-translate-y-1 hover:shadow-[0_12px_40px_var(--gold-glow),0_4px_16px_rgba(0,0,0,0.06)]"
              >
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-out-expo group-hover:scale-105"
                    style={{ backgroundImage: `url(${story.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)]/80 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-theme-secondary text-xs mb-3 font-cairo">
                    <span>{story.author}</span>
                    <span className="w-1 h-1 rounded-full bg-theme-secondary" />
                    <span>{story.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold font-playfair text-theme mb-2 leading-snug group-hover:text-theme-gold transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-theme-secondary text-sm font-cairo leading-relaxed line-clamp-2">
                    {story.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
