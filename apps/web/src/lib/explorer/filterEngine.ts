import type { ExplorerNode, ExplorerFilter, ExplorerGraph } from './types';
import { INITIAL_FILTER } from './types';

export function createEmptyFilter(): ExplorerFilter {
  return { ...INITIAL_FILTER };
}

export function applyFilter(nodes: ExplorerNode[], filter: ExplorerFilter): ExplorerNode[] {
  if (isFilterEmpty(filter)) return nodes;

  return nodes.filter(node => {
    if (filter.types.length > 0 && !filter.types.includes(node.type)) return false;
    if (filter.categories.length > 0 && !filter.categories.includes(node.category)) return false;
    if (filter.cities.length > 0 && !filter.cities.includes(node.citySlug)) return false;
    if (filter.priceRange.length > 0) {
      const priceTag = node.tags.find(t => ['منخفض', 'متوسط', 'مرتفع'].includes(t));
      if (!priceTag || !filter.priceRange.includes(priceTag)) return false;
    }
    if (filter.difficulty.length > 0) {
      const diffTag = node.tags.find(t => ['Easy', 'Moderate', 'Challenging'].includes(t));
      if (!diffTag || !filter.difficulty.includes(diffTag)) return false;
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      const matchLabel = node.label.toLowerCase().includes(q);
      const matchLabelEn = node.labelEn.toLowerCase().includes(q);
      const matchSub = node.subtitle.toLowerCase().includes(q);
      const matchDesc = node.description.toLowerCase().includes(q);
      const matchTags = node.tags.some(t => t.toLowerCase().includes(q));
      if (!matchLabel && !matchLabelEn && !matchSub && !matchDesc && !matchTags) return false;
    }
    return true;
  });
}

function isFilterEmpty(filter: ExplorerFilter): boolean {
  return (
    filter.types.length === 0 &&
    filter.categories.length === 0 &&
    filter.cities.length === 0 &&
    filter.intents.length === 0 &&
    !filter.search &&
    filter.priceRange.length === 0 &&
    filter.difficulty.length === 0 &&
    !filter.verifiedOnly &&
    !filter.openNow &&
    !filter.trending &&
    !filter.recommended &&
    filter.minRating === 0
  );
}

export function sortNodes(nodes: ExplorerNode[], sortBy: ExplorerFilter['sortBy']): ExplorerNode[] {
  const arr = [...nodes];
  switch (sortBy) {
    case 'rating':
      return arr.sort((a, b) => (b.data?.rating || 0) - (a.data?.rating || 0));
    case 'price_low':
      return arr.sort((a, b) => (a.data?.price || 0) - (b.data?.price || 0));
    case 'price_high':
      return arr.sort((a, b) => (b.data?.price || 0) - (a.data?.price || 0));
    case 'newest':
      return arr.sort((a, b) => b.priority - a.priority);
    case 'recommended':
    default:
      return arr.sort((a, b) => (b.data?.rating || 0) * b.priority - (a.data?.rating || 0) * a.priority);
  }
}

export function getAvailableCategories(graph: ExplorerGraph): string[] {
  const cats = new Set<string>();
  for (const node of graph.nodes.values()) {
    if (node.category) cats.add(node.category);
  }
  return [...cats].sort();
}

export function getActiveFilterCount(filter: ExplorerFilter): number {
  let count = 0;
  if (filter.types.length > 0) count += filter.types.length;
  if (filter.categories.length > 0) count += filter.categories.length;
  if (filter.cities.length > 0) count += filter.cities.length;
  if (filter.intents.length > 0) count += filter.intents.length;
  if (filter.search) count += 1;
  if (filter.priceRange.length > 0) count += filter.priceRange.length;
  if (filter.difficulty.length > 0) count += filter.difficulty.length;
  if (filter.verifiedOnly) count += 1;
  if (filter.openNow) count += 1;
  if (filter.trending) count += 1;
  if (filter.recommended) count += 1;
  if (filter.minRating > 0) count += 1;
  return count;
}

export function filterToUrlParams(filter: ExplorerFilter): string {
  const params = new URLSearchParams();
  if (filter.types.length > 0) params.set('types', filter.types.join(','));
  if (filter.categories.length > 0) params.set('categories', filter.categories.join(','));
  if (filter.cities.length > 0) params.set('cities', filter.cities.join(','));
  if (filter.intents.length > 0) params.set('intents', filter.intents.join(','));
  if (filter.search) params.set('q', filter.search);
  if (filter.priceRange.length > 0) params.set('price', filter.priceRange.join(','));
  if (filter.difficulty.length > 0) params.set('difficulty', filter.difficulty.join(','));
  if (filter.verifiedOnly) params.set('verified', '1');
  if (filter.openNow) params.set('open', '1');
  if (filter.trending) params.set('trending', '1');
  if (filter.recommended) params.set('recommended', '1');
  if (filter.minRating > 0) params.set('minRating', String(filter.minRating));
  if (filter.sortBy !== 'recommended') params.set('sort', filter.sortBy);
  return params.toString();
}

export function urlParamsToFilter(params: URLSearchParams): ExplorerFilter {
  return {
    ...INITIAL_FILTER,
    types: (params.get('types')?.split(',').filter(Boolean) ?? []) as ExplorerFilter['types'],
    categories: params.get('categories')?.split(',').filter(Boolean) ?? [],
    cities: params.get('cities')?.split(',').filter(Boolean) ?? [],
    intents: params.get('intents')?.split(',').filter(Boolean) ?? [],
    search: params.get('q') ?? '',
    priceRange: params.get('price')?.split(',').filter(Boolean) ?? [],
    difficulty: params.get('difficulty')?.split(',').filter(Boolean) ?? [],
    verifiedOnly: params.get('verified') === '1',
    openNow: params.get('open') === '1',
    trending: params.get('trending') === '1',
    recommended: params.get('recommended') === '1',
    minRating: Number(params.get('minRating')) || 0,
    sortBy: (params.get('sort') as ExplorerFilter['sortBy']) || 'recommended',
  };
}
