import type { Destination, Experience, Story, FoodItem, Recommendations } from './types';

import destinationsData from '@/data/destinations.json';
import experiencesData from '@/data/experiences.json';
import storiesData from '@/data/stories.json';
import foodData from '@/data/food.json';
import cityRelationsData from '@/data/city-relations.json';
import searchIndexData from '@/data/search-index.json';

const destinations: Destination[] = destinationsData as Destination[];
const experiences: Experience[] = experiencesData as Experience[];
const stories: Story[] = storiesData as Story[];
const foodItems: FoodItem[] = foodData as FoodItem[];
const relations = (cityRelationsData as { relations: Record<string, string[]> }).relations;
const searchIndex = (searchIndexData as { keywords: Record<string, { destinations: string[]; experiences: string[]; stories: string[]; food: string[] }> }).keywords;

export interface CitySuggestions {
  cityName: string;
  citySlug: string;
  experiences: Experience[];
  stories: Story[];
  food: FoodItem[];
  relatedDestinations: Destination[];
  relatedCitySlugs: string[];
  nearbyCities: string[];
}

export function getSuggestionsForCity(citySlug: string): CitySuggestions {
  const city = destinations.find(d => d.slug === citySlug);
  const relatedSlugs = relations[citySlug] || [];

  return {
    cityName: city?.nameAr || citySlug,
    citySlug,
    experiences: experiences.filter(e => e.citySlug === citySlug).slice(0, 5),
    stories: stories.filter(s => s.citySlug === citySlug).slice(0, 3),
    food: foodItems.filter(f => f.citySlug === citySlug).slice(0, 4),
    relatedDestinations: relatedSlugs
      .map(slug => destinations.find(d => d.slug === slug))
      .filter(Boolean) as Destination[],
    relatedCitySlugs: relatedSlugs,
    nearbyCities: relatedSlugs,
  };
}

export function searchByKeyword(keyword: string): Recommendations {
  const normalized = keyword.toLowerCase().trim();
  const exactMatch = searchIndex[normalized] || searchIndex[keyword];

  if (exactMatch) {
    return {
      destinations: exactMatch.destinations
        .map(slug => destinations.find(d => d.slug === slug))
        .filter(Boolean) as Destination[],
      experiences: exactMatch.experiences
        .map(id => experiences.find(e => e.id === id))
        .filter(Boolean) as Experience[],
      food: exactMatch.food
        .map(id => foodItems.find(f => f.id === id))
        .filter(Boolean) as FoodItem[],
      stories: exactMatch.stories
        .map(id => stories.find(s => s.id === id))
        .filter(Boolean) as Story[],
    };
  }

  const fuzzyResults: Recommendations = { destinations: [], experiences: [], food: [], stories: [] };

  const cityMatch = destinations.find(d =>
    d.slug.includes(normalized) ||
    d.nameAr.includes(keyword) ||
    d.nameEn.toLowerCase().includes(normalized),
  );

  if (cityMatch) {
    fuzzyResults.destinations.push(cityMatch);
    fuzzyResults.experiences.push(
      ...experiences.filter(e => e.citySlug === cityMatch.slug).slice(0, 3),
    );
    fuzzyResults.food.push(
      ...foodItems.filter(f => f.citySlug === cityMatch.slug).slice(0, 2),
    );
    fuzzyResults.stories.push(
      ...stories.filter(s => s.citySlug === cityMatch.slug).slice(0, 2),
    );
  }

  const categoryMatch = experiences.filter(e =>
    e.category.toLowerCase() === normalized ||
    e.name.includes(keyword),
  ).slice(0, 3);

  if (categoryMatch.length > 0) {
    fuzzyResults.experiences.push(...categoryMatch);
  }

  return fuzzyResults;
}

export function getQuickSuggestions(): { label: string; intent: string; icon: string }[] {
  return [
    { label: '🌴 استرخاء', intent: 'relaxation', icon: '🌴' },
    { label: '🏔️ مغامرة', intent: 'adventure', icon: '🏔️' },
    { label: '🏛️ تاريخ وثقافة', intent: 'culture', icon: '🏛️' },
    { label: '🍽️ أكل محلي', intent: 'food', icon: '🍽️' },
    { label: '⭐ فخامة', intent: 'luxury', icon: '⭐' },
    { label: '💻 عمل عن بعد', intent: 'digital-nomad', icon: '💻' },
    { label: '🤿 غوص', intent: 'diving', icon: '🤿' },
    { label: '📸 تصوير', intent: 'photography', icon: '📸' },
    { label: '👨‍👩‍👧‍👦 عائلات', intent: 'family', icon: '👨‍👩‍👧‍👦' },
    { label: '❤️ شهر عسل', intent: 'honeymoon', icon: '❤️' },
  ];
}

export function getRelatedExperiencesForCategory(category: string): Experience[] {
  const cat = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  return experiences.filter(e => e.category === cat).slice(0, 6);
}
