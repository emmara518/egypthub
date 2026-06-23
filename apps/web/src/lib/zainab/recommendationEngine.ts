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

export function getRecommendationsByIntent(intent: Intent, memory?: SessionMemory): Recommendations {
  const key = intentToKnowledgeKey(intent);
  const intentData = knowledge[key];

  if (!intentData) {
    return getDefaultRecommendations();
  }

  const result: Recommendations = {
    destinations: [],
    experiences: [],
    food: [],
    stories: [],
  };

  const citySlugs = intentData.recommendedCities;
  result.destinations = citySlugs
    .map(slug => getDestinationBySlug(slug))
    .filter(Boolean) as Destination[];

  const expIds = intentData.recommendedExperiences;
  result.experiences = expIds
    .map(id => getExperienceById(id))
    .filter(Boolean) as Experience[];

  if (result.experiences.length < 3) {
    const more = citySlugs.flatMap(slug => getExperiencesByCity(slug));
    const existingIds = new Set(result.experiences.map(e => e.id));
    for (const exp of more) {
      if (!existingIds.has(exp.id) && result.experiences.length < 5) {
        result.experiences.push(exp);
        existingIds.add(exp.id);
      }
    }
  }

  for (const slug of citySlugs) {
    const cityStories = getStoriesByCity(slug);
    result.stories.push(...cityStories);
    const cityFood = getFoodByCity(slug);
    result.food.push(...cityFood);
  }

  result.stories = result.stories.slice(0, 3);
  result.food = result.food.slice(0, 3);

  return result;
}

export function getRecommendationsByCity(citySlug: string): Recommendations {
  const destination = getDestinationBySlug(citySlug);
  return {
    destinations: destination ? [destination] : [],
    experiences: getExperiencesByCity(citySlug).slice(0, 5),
    food: getFoodByCity(citySlug),
    stories: getStoriesByCity(citySlug),
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

export function getDefaultRecommendations(): Recommendations {
  const shuffled = shuffleArray(destinations).slice(0, 4);
  return {
    destinations: shuffled,
    experiences: shuffleArray(experiences).slice(0, 5),
    food: shuffleArray(foodItems).slice(0, 3),
    stories: shuffleArray(stories).slice(0, 3),
  };
}

export function getAdviceForIntent(intent: Intent): string {
  const key = intentToKnowledgeKey(intent);
  return knowledge[key]?.advice || 'مصر بلد الجمال والتاريخ، كل مدينة فيها حكاية. أخبرني إيه اللي عاوز تعمله عشان أساعدك تختار الوجهة المناسبة!';
}

export function combineRecommendationsWithMemory(
  intent: Intent,
  memory: SessionMemory,
): Recommendations {
  const base = getRecommendationsByIntent(intent, memory);

  if (memory.preferredCity) {
    const cityRecs = getRecommendationsByCity(memory.preferredCity);
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

  base.experiences = base.experiences.slice(0, 6);
  base.destinations = base.destinations.slice(0, 4);

  return base;
}
