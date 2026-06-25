import type {
  Destination, Experience, Story, FoodItem,
  Recommendations, KnowledgeIntent, Intent, SessionMemory,
} from './types';
import { intentToKnowledgeKey } from './intentResolver';

import destinationsData from '@/data/destinations.json';
import experiencesData from '@/data/experiences.json';
import storiesData from '@/data/stories.json';
import foodData from '@/data/food.json';
import zainabKnowledgeData from '@/data/zainab-knowledge.json';
import cityRelationsData from '@/data/city-relations.json';

const destinations: Destination[] = destinationsData as Destination[];
const experiences: Experience[] = experiencesData as Experience[];
const stories: Story[] = storiesData as Story[];
const foodItems: FoodItem[] = foodData as FoodItem[];
const knowledge = (zainabKnowledgeData as { intents: Record<string, KnowledgeIntent> }).intents;
const relations = (cityRelationsData as { relations: Record<string, string[]> }).relations;

export interface RecOptions {
  budget?: string;
  travelerType?: string;
  interests?: string[];
  pastPreferences?: Record<string, any>;
  season?: string;
}

const SEASON_MONTHS: Record<string, number[]> = {
  spring: [3, 4, 5],
  summer: [6, 7, 8],
  autumn: [9, 10, 11],
  winter: [12, 1, 2],
};

const SEASONAL_TAGS: Record<string, string[]> = {
  winter: ['الشتاء', 'مشروبات ساخنة', 'أجواء شتوية'],
  summer: ['الصيف', 'شواطئ', 'مكيف', 'مثلجات'],
  spring: ['الربيع', 'زهور', 'طقس معتدل'],
  autumn: ['الخريف', 'أجواء معتدلة'],
};

const CITY_SEASONAL_BEST: Record<string, string> = {
  'cairo': 'spring',
  'alexandria': 'summer',
  'luxor': 'winter',
  'aswan': 'winter',
  'sharm-el-sheikh': 'spring',
  'hurghada': 'spring',
  'dahab': 'spring',
  'siwa': 'autumn',
};

function detectCurrentSeason(): string {
  const month = new Date().getMonth() + 1;
  for (const [season, months] of Object.entries(SEASON_MONTHS)) {
    if (months.includes(month)) return season;
  }
  return 'spring';
}

function computeRelevanceScore(
  item: Destination | Experience | FoodItem | Story,
  options?: RecOptions,
): number {
  let score = 50;
  if (!options) return score;

  const { budget, travelerType, interests, pastPreferences, season } = options;

  if (budget && 'priceRange' in item) {
    if (budget === 'budget' && (item as any).priceRange === 'منخفض') score += 20;
    else if (budget === 'luxury' && (item as any).priceRange === 'مرتفع') score += 20;
    else if (budget === 'mid-range' && (item as any).priceRange === 'متوسط') score += 15;
  }

  if (travelerType && 'category' in item) {
    const cat = (item as any).category || '';
    if (travelerType === 'family' && ['Relaxation', 'Easy'].includes(cat)) score += 15;
    if (travelerType === 'couple' && ['Romantic', 'Culture', 'Luxury'].includes(cat)) score += 15;
    if (travelerType === 'solo' && ['Adventure', 'Culture'].includes(cat)) score += 10;
  }

  if (interests && 'highlights' in item) {
    const highlights: string[] = (item as any).highlights || [];
    const matched = interests.filter(i =>
      highlights.some((h: string) => h.toLowerCase().includes(i.toLowerCase())),
    ).length;
    score += matched * 10;
  }

  if (pastPreferences?.intent && 'category' in item) {
    const intentMap: Record<string, string[]> = {
      relaxation: ['Relaxation', 'Easy'],
      adventure: ['Adventure', 'Challenging'],
      culture: ['Culture', 'History'],
      food: ['Food'],
      luxury: ['Luxury'],
      diving: ['Adventure'],
    };
    const cats = intentMap[pastPreferences.intent] || [];
    const itemCat = (item as any).category || '';
    if (cats.includes(itemCat)) score += 15;
  }

  if (season) {
    const isDestination = 'bestTimeToVisit' in item;
    if (isDestination && (item as any).bestTimeToVisit) {
      const bestTime = (item as any).bestTimeToVisit.toLowerCase();
      const seasonNames: Record<string, string> = {
        spring: 'ربيع',
        summer: 'صيف',
        autumn: 'خريف',
        winter: 'شتاء',
      };
      if (bestTime.includes(seasonNames[season] || season)) score += 20;
    }
  }

  return score;
}

function rankByScore<T>(items: T[], options?: RecOptions, scoreFn?: (item: T) => number): T[] {
  const scored = items.map(item => ({
    item,
    score: scoreFn ? scoreFn(item) : (item as any).__score || 50,
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.item);
}

function getExperienceById(id: string): Experience | undefined {
  return experiences.find(e => e.id === id);
}

function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find(d => d.slug === slug);
}

function getStoriesByCity(citySlug: string): Story[] {
  return stories.filter(s => s.citySlug === citySlug).slice(0, 3);
}

function getFoodByCity(citySlug: string): FoodItem[] {
  return foodItems.filter(f => f.citySlug === citySlug).slice(0, 3);
}

function getExperiencesByCity(citySlug: string): Experience[] {
  return experiences.filter(e => e.citySlug === citySlug);
}

function getExperiencesByCategory(category: string): Experience[] {
  const cat = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  return experiences.filter(e => e.category === cat);
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRecommendationsByIntent(intent: Intent, memory?: SessionMemory, options?: RecOptions): Recommendations {
  const key = intentToKnowledgeKey(intent);
  const intentData = knowledge[key];
  const season = options?.season || detectCurrentSeason();

  if (!intentData) {
    return getDefaultRecommendations(options);
  }

  const result: Recommendations = {
    destinations: [],
    experiences: [],
    food: [],
    stories: [],
  };

  const citySlugs = intentData.recommendedCities;
  let dests = citySlugs
    .map(slug => getDestinationBySlug(slug))
    .filter(Boolean) as Destination[];

  dests = rankByScore(dests, { ...options, season }, d => {
    let s = 50;
    if (CITY_SEASONAL_BEST[d.slug] === season) s += 25;
    if (options?.interests) {
      const matched = options.interests.filter(i =>
        d.famousFor?.some(f => f.toLowerCase().includes(i.toLowerCase())),
      ).length;
      s += matched * 10;
    }
    return s;
  });

  result.destinations = dests.slice(0, 4);

  const expIds = intentData.recommendedExperiences;
  let exps = expIds
    .map(id => getExperienceById(id))
    .filter(Boolean) as Experience[];

  if (exps.length < 3) {
    const more = citySlugs.flatMap(slug => getExperiencesByCity(slug));
    const existingIds = new Set(exps.map(e => e.id));
    for (const exp of more) {
      if (!existingIds.has(exp.id) && exps.length < 5) {
        exps.push(exp);
        existingIds.add(exp.id);
      }
    }
  }

  exps = rankByScore(exps, { ...options, season }, e => computeRelevanceScore(e as any, { ...options, season }));
  result.experiences = exps.slice(0, 6);

  for (const slug of citySlugs) {
    const cityStories = getStoriesByCity(slug);
    result.stories.push(...cityStories);
    const cityFood = getFoodByCity(slug);
    result.food.push(...cityFood);
  }

  result.stories = rankByScore(
    result.stories.slice(0, 6),
    options,
    s => {
      let score = 50;
      if (options?.interests) {
        const matched = options.interests.filter(i =>
          s.title.toLowerCase().includes(i.toLowerCase()) || s.excerpt.toLowerCase().includes(i.toLowerCase()),
        ).length;
        score += matched * 10;
      }
      return score;
    },
  ).slice(0, 3);

  result.food = rankByScore(
    result.food.slice(0, 6),
    options,
    f => computeRelevanceScore(f as any, options),
  ).slice(0, 3);

  return result;
}

export function getRecommendationsByCity(citySlug: string, options?: RecOptions): Recommendations {
  const destination = getDestinationBySlug(citySlug);
  const season = options?.season || detectCurrentSeason();

  let exps = getExperiencesByCity(citySlug);
  exps = rankByScore(exps, { ...options, season }, e => computeRelevanceScore(e as any, { ...options, season }));

  let food = getFoodByCity(citySlug);
  food = rankByScore(food, options, f => computeRelevanceScore(f as any, options));

  let stories = getStoriesByCity(citySlug);
  stories = rankByScore(stories, options);

  return {
    destinations: destination ? [destination] : [],
    experiences: exps.slice(0, 5),
    food: food.slice(0, 3),
    stories: stories.slice(0, 3),
  };
}

export function getRecommendationsByCategory(category: string): Recommendations {
  const matchedExperiences = getExperiencesByCategory(category);
  const citySlugs = [...new Set(matchedExperiences.map(e => e.citySlug))];

  return {
    destinations: citySlugs
      .map(slug => getDestinationBySlug(slug))
      .filter(Boolean) as Destination[],
    experiences: matchedExperiences.slice(0, 5),
    food: citySlugs.flatMap(slug => getFoodByCity(slug)).slice(0, 3),
    stories: citySlugs.flatMap(slug => getStoriesByCity(slug)).slice(0, 3),
  };
}

export function getRecommendationsForDestinationPage(citySlug: string): Recommendations {
  const destination = getDestinationBySlug(citySlug);
  const relatedSlugs = relations[citySlug] || [];
  const shuffledRelated = shuffleArray(relatedSlugs).slice(0, 3);

  return {
    destinations: [
      ...(destination ? [destination] : []),
      ...shuffledRelated.map(slug => getDestinationBySlug(slug)).filter(Boolean) as Destination[],
    ],
    experiences: getExperiencesByCity(citySlug).slice(0, 4),
    food: getFoodByCity(citySlug),
    stories: getStoriesByCity(citySlug),
  };
}

export function getDefaultRecommendations(options?: RecOptions): Recommendations {
  const season = options?.season || detectCurrentSeason();

  let dests = [...destinations];
  dests = rankByScore(dests, { ...options, season }, d => {
    let score = 50;
    if (CITY_SEASONAL_BEST[d.slug] === season) score += 15;
    return score;
  });

  let exps = [...experiences];
  exps = rankByScore(exps, { ...options, season }, e => computeRelevanceScore(e as any, { ...options, season }));

  let food = [...foodItems];
  food = rankByScore(food, options, f => computeRelevanceScore(f as any, options));

  let storyResults = [...stories];
  storyResults = rankByScore(storyResults, options);

  return {
    destinations: dests.slice(0, 4),
    experiences: exps.slice(0, 5),
    food: food.slice(0, 3),
    stories: storyResults.slice(0, 3),
  };
}

export function getAdviceForIntent(intent: Intent): string {
  const key = intentToKnowledgeKey(intent);
  return knowledge[key]?.advice || 'مصر بلد الجمال والتاريخ، كل مدينة فيها حكاية. أخبرني إيه اللي عاوز تعمله عشان أساعدك تختار الوجهة المناسبة!';
}

export function combineRecommendationsWithMemory(
  intent: Intent,
  memory: SessionMemory,
  options?: RecOptions,
): Recommendations {
  const base = getRecommendationsByIntent(intent, memory, options);

  if (memory.preferredCity) {
    const cityRecs = getRecommendationsByCity(memory.preferredCity, options);
    for (const exp of cityRecs.experiences) {
      if (!base.experiences.find(e => e.id === exp.id)) {
        base.experiences.push(exp);
      }
    }
    for (const dest of cityRecs.destinations) {
      if (!base.destinations.find(d => d.slug === dest.slug)) {
        base.destinations.unshift(dest);
      }
    }
  }

  base.experiences = rankByScore(base.experiences, options, e => computeRelevanceScore(e as any, options));
  base.destinations = rankByScore(base.destinations, options);
  base.experiences = base.experiences.slice(0, 6);
  base.destinations = base.destinations.slice(0, 4);

  return base;
}
