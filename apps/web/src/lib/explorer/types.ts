export type ExplorerNodeType = 'city' | 'experience' | 'story' | 'food' | 'ambassador';

export interface ExplorerNode<T = any> {
  id: string;
  type: ExplorerNodeType;
  label: string;
  labelEn: string;
  subtitle: string;
  description: string;
  city: string;
  citySlug: string;
  coordinates: { lat: number; lng: number };
  tags: string[];
  category: string;
  image: string;
  priority: number;
  relations: string[];
  data: T;
}

export interface PremiumCardData {
  image: string;
  title: string;
  titleEn: string;
  subtitle: string;
  rating: number;
  reviewCount: number;
  category: string;
  categoryLabel: string;
  location: string;
  distance?: string;
  price?: string;
  currency?: string;
  available?: boolean;
  verified?: boolean;
  trending?: boolean;
  recommended?: boolean;
  languages?: string[];
  phone?: string;
  whatsapp?: string;
  slug?: string;
}

export interface ExplorerGraph {
  nodes: Map<string, ExplorerNode>;
  cityNodes: ExplorerNode[];
  experienceNodes: ExplorerNode[];
  storyNodes: ExplorerNode[];
  foodNodes: ExplorerNode[];
  ambassadorNodes: ExplorerNode[];
  relations: Map<string, string[]>;
}

export interface ExplorerFilter {
  types: ExplorerNodeType[];
  categories: string[];
  cities: string[];
  intents: string[];
  search: string;
  priceRange: string[];
  difficulty: string[];
  verifiedOnly: boolean;
  openNow: boolean;
  trending: boolean;
  recommended: boolean;
  minRating: number;
  sortBy: 'recommended' | 'rating' | 'price_low' | 'price_high' | 'newest';
}

export interface CityStats {
  totalExperiences: number;
  totalStories: number;
  totalFood: number;
  totalAmbassadors: number;
  categories: string[];
  avgDuration: string;
  popularTags: string[];
}

export interface ExplorerState {
  view: 'map' | 'feed' | 'city';
  activeLayer: ExplorerNodeType | 'all';
  activeCity: string | null;
  activeNode: string | null;
  zoom: number;
  center: { lat: number; lng: number };
  filter: ExplorerFilter;
  searchQuery: string;
}

export interface AnalyticsEvent {
  event: string;
  nodeType?: ExplorerNodeType;
  nodeId?: string;
  citySlug?: string;
  timestamp: number;
  metadata?: Record<string, string>;
}

export interface DeepLinkParams {
  city?: string;
  layer?: ExplorerNodeType | 'all';
  intent?: string;
  search?: string;
  node?: string;
  view?: 'map' | 'feed' | 'city';
}

export type SortOption = 'recommended' | 'rating' | 'price_low' | 'price_high' | 'newest';

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'recommended', label: 'الموصى بها' },
  { value: 'rating', label: 'التقييم' },
  { value: 'price_low', label: 'السعر: من الأقل' },
  { value: 'price_high', label: 'السعر: من الأعلى' },
  { value: 'newest', label: 'الأحدث' },
];

export const INITIAL_FILTER: ExplorerFilter = {
  types: [],
  categories: [],
  cities: [],
  intents: [],
  search: '',
  priceRange: [],
  difficulty: [],
  verifiedOnly: false,
  openNow: false,
  trending: false,
  recommended: false,
  minRating: 0,
  sortBy: 'recommended',
};
