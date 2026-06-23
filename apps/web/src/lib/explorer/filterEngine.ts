import type { ExplorerNode, ExplorerFilter, ExplorerGraph } from './types';

const memoCache = new WeakMap<ExplorerFilter, ExplorerNode[]>();

export function createEmptyFilter(): ExplorerFilter {
  return {
    types: [],
    categories: [],
    cities: [],
    intents: [],
    search: '',
    priceRange: [],
    difficulty: [],
  };
}

export function applyFilter(nodes: ExplorerNode[], filter: ExplorerFilter): ExplorerNode[] {
  const cacheKey = { ...filter, _count: nodes.length };
  if (memoCache.has(cacheKey as unknown as ExplorerFilter)) {
    const cached = memoCache.get(cacheKey as unknown as ExplorerFilter);
    if (cached && cached.length === nodes.length) return cached;
  }

  if (isFilterEmpty(filter)) return nodes;

  const result = nodes.filter(node => {
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

  memoCache.set(cacheKey as unknown as ExplorerFilter, result);
  return result;
}

function isFilterEmpty(filter: ExplorerFilter): boolean {
  return (
    filter.types.length === 0 &&
    filter.categories.length === 0 &&
    filter.cities.length === 0 &&
    filter.intents.length === 0 &&
    !filter.search &&
    filter.priceRange.length === 0 &&
    filter.difficulty.length === 0
  );
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
  return params.toString();
}

export function urlParamsToFilter(params: URLSearchParams): ExplorerFilter {
  return {
    types: (params.get('types')?.split(',').filter(Boolean) ?? []) as ExplorerFilter['types'],
    categories: params.get('categories')?.split(',').filter(Boolean) ?? [],
    cities: params.get('cities')?.split(',').filter(Boolean) ?? [],
    intents: params.get('intents')?.split(',').filter(Boolean) ?? [],
    search: params.get('q') ?? '',
    priceRange: params.get('price')?.split(',').filter(Boolean) ?? [],
    difficulty: params.get('difficulty')?.split(',').filter(Boolean) ?? [],
  };
}
