'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Recommendations, Destination, Experience, Story, FoodItem } from '@/lib/zainab/types';

interface ZainabRecommendationsProps {
  recommendations: Recommendations;
  title?: string;
}

function DestinationCard({ dest }: { dest: Destination }) {
  return (
    <Link href={`/destinations/${dest.slug}`}>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        className="rounded-xl border border-theme-gold/15 bg-theme-card overflow-hidden cursor-pointer group"
      >
        <div className="h-28 bg-gradient-to-br from-theme-gold/20 to-theme-card flex items-center justify-center">
          <span className="text-4xl">{dest.slug === 'cairo' ? '🏛️' : dest.slug === 'alexandria' ? '🏛️' : dest.slug === 'luxor' ? '🏛️' : dest.slug === 'aswan' ? '🌴' : dest.slug === 'sharm-el-sheikh' ? '🌊' : dest.slug === 'hurghada' ? '🌊' : dest.slug === 'dahab' ? '🏖️' : '🏜️'}</span>
        </div>
        <div className="p-3">
          <h4 className="text-sm font-bold text-theme font-cairo group-hover:text-theme-gold transition-colors">{dest.nameAr}</h4>
          <p className="text-[10px] text-theme-secondary font-cairo mt-1 line-clamp-2">{dest.shortDescription}</p>
        </div>
      </motion.div>
    </Link>
  );
}

function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <motion.div
      whileHover={{ x: -3 }}
      className="flex items-center gap-3 p-2.5 rounded-xl bg-theme-bg border border-theme hover:border-theme-gold/20 transition-all cursor-pointer"
    >
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-theme-gold/20 to-theme-card flex items-center justify-center shrink-0">
        <span className="text-lg">{exp.category === 'Adventure' ? '🏔️' : exp.category === 'Culture' ? '🎭' : exp.category === 'History' ? '🏛️' : exp.category === 'Food' ? '🍽️' : '🌴'}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-theme font-cairo">{exp.name}</p>
        <p className="text-[10px] text-theme-muted font-cairo">{exp.duration} · {exp.difficulty}</p>
      </div>
    </motion.div>
  );
}

function FoodCard({ item }: { item: FoodItem }) {
  return (
    <div className="p-2.5 rounded-xl bg-theme-bg border border-theme">
      <div className="flex items-center gap-2">
        <span className="text-lg">🍽️</span>
        <div>
          <p className="text-xs font-bold text-theme font-cairo">{item.name}</p>
          <p className="text-[10px] text-theme-muted font-cairo">{item.description.slice(0, 40)}...</p>
        </div>
      </div>
    </div>
  );
}

function StoryCard({ story }: { story: Story }) {
  return (
    <Link href={`/stories/${story.id.replace('story-', '')}`}>
      <motion.div
        whileHover={{ x: -3 }}
        className="p-3 rounded-xl bg-theme-bg border border-theme hover:border-theme-gold/20 transition-all cursor-pointer"
      >
        <p className="text-xs font-bold text-theme font-cairo mb-1">{story.title}</p>
        <p className="text-[10px] text-theme-muted font-cairo line-clamp-2">{story.excerpt}</p>
      </motion.div>
    </Link>
  );
}

export default function ZainabRecommendations({ recommendations, title }: ZainabRecommendationsProps) {
  const { destinations: dests, experiences, food, stories } = recommendations;
  const hasAny = dests.length > 0 || experiences.length > 0 || food.length > 0 || stories.length > 0;

  if (!hasAny) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {title && (
        <p className="text-sm font-bold text-theme-gold font-cairo">{title}</p>
      )}

      {dests.length > 0 && (
        <div>
          <p className="text-xs text-theme-secondary mb-2 font-cairo">📍 وجهات مقترحة</p>
          <div className="grid grid-cols-2 gap-2">
            {dests.map(dest => (
              <DestinationCard key={dest.slug} dest={dest} />
            ))}
          </div>
        </div>
      )}

      {experiences.length > 0 && (
        <div>
          <p className="text-xs text-theme-secondary mb-2 font-cairo">✨ تجارب مقترحة</p>
          <div className="space-y-1.5">
            {experiences.map(exp => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
        </div>
      )}

      {food.length > 0 && (
        <div>
          <p className="text-xs text-theme-secondary mb-2 font-cairo">🍽️ أكلات مقترحة</p>
          <div className="space-y-1.5">
            {food.map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {stories.length > 0 && (
        <div>
          <p className="text-xs text-theme-secondary mb-2 font-cairo">📖 قصص مقترحة</p>
          <div className="space-y-1.5">
            {stories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      )}

      <Link
        href="/ai-concierge"
        className="inline-flex items-center gap-1 text-[10px] text-theme-gold hover:text-theme-gold/80 transition-colors font-cairo"
      >
        المزيد من التوصيات ←
      </Link>
    </motion.div>
  );
}
