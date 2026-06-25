export interface Destination {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  shortDescription: string;
  longDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  famousFor: string[];
  bestTimeToVisit: string;
  coordinates: { lat: number; lng: number };
  highlights: string[];
}

export interface Experience {
  id: string;
  citySlug: string;
  name: string;
  category: string;
  description: string;
  highlights: string[];
  duration: string;
  difficulty: string;
  priceRange: string;
}

export interface Story {
  id: string;
  citySlug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  content: string;
}

export interface FoodItem {
  id: string;
  citySlug: string;
  name: string;
  cuisine: string;
  description: string;
  priceRange: string;
}

export interface Ambassador {
  id: string;
  name: string;
  citySlug: string;
  role: string;
  bio: string;
  languages: string[];
  specialties: string[];
  isVerified: boolean;
}

export interface SEOData {
  citySlug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
}

export interface ImageManifest {
  citySlug: string;
  heroImage: string;
  gallery: string[];
}

export interface KnowledgeIntent {
  title: string;
  description: string;
  recommendedCities: string[];
  recommendedExperiences: string[];
  advice: string;
}

export interface CityRelations {
  relations: Record<string, string[]>;
  routes: TravelRoute[];
}

export interface TravelRoute {
  id: string;
  name: string;
  description: string;
  cities: string[];
  duration: string;
  bestFor: string[];
}

export interface SearchIndexEntry {
  destinations: string[];
  experiences: string[];
  stories: string[];
  food: string[];
}

export interface Recommendations {
  destinations: Destination[];
  experiences: Experience[];
  food: FoodItem[];
  stories: Story[];
}

export interface TripPlanDay {
  day: number;
  title: string;
  experiences: Experience[];
  description: string;
}

export interface TripPlan {
  city: Destination;
  days: TripPlanDay[];
  totalDuration: string;
  budget?: string;
  travelerType?: string;
  timeEstimates?: {
    betweenDays?: string;
    travelToCity?: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'zainab';
  content: string;
  recommendations?: Recommendations;
  tripPlan?: TripPlan;
  timestamp: number;
}

export interface SessionMemory {
  preferredCity?: string;
  preferredActivities: string[];
  preferredStyle?: string;
  knownIntents: string[];
  mentionedCities: string[];
}

export type Intent =
  | 'relaxation' | 'adventure' | 'culture' | 'food'
  | 'luxury' | 'family' | 'honeymoon' | 'diving'
  | 'photography' | 'digital-nomad' | 'history'
  | 'general' | 'destination' | 'trip-planning' | 'greeting';

export type Difficulty = 'Easy' | 'Moderate' | 'Challenging';
export type PriceRange = 'منخفض' | 'متوسط' | 'مرتفع';
export type Category = 'Adventure' | 'Culture' | 'History' | 'Food' | 'Relaxation';
