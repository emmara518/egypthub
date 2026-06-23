import type { ExplorerNode, ExplorerGraph, CityStats } from './types';
import type { Destination } from '@/lib/zainab/types';

export interface CityImmersionData {
  destination: Destination;
  stats: CityStats;
  experiences: ExplorerNode[];
  stories: ExplorerNode[];
  food: ExplorerNode[];
  ambassadors: ExplorerNode[];
  relatedCities: ExplorerNode[];
  allNodes: ExplorerNode[];
}

export function getCityImmersion(graph: ExplorerGraph, citySlug: string): CityImmersionData | null {
  const cityNode = graph.cityNodes.find(n => n.citySlug === citySlug);
  if (!cityNode) return null;

  const destination = cityNode.data as Destination;
  const allNodes = Array.from(graph.nodes.values());

  const experiences = allNodes.filter(n => n.citySlug === citySlug && n.type === 'experience');
  const stories = allNodes.filter(n => n.citySlug === citySlug && n.type === 'story');
  const food = allNodes.filter(n => n.citySlug === citySlug && n.type === 'food');
  const ambassadors = allNodes.filter(n => n.citySlug === citySlug && n.type === 'ambassador');

  const relatedCitySlugs = cityNode.relations.filter(r => graph.nodes.get(r)?.type === 'city');
  const relatedCities = relatedCitySlugs
    .map(slug => graph.nodes.get(slug))
    .filter((n): n is ExplorerNode => n !== undefined);

  const allCityNodes = [cityNode, ...relatedCities, ...experiences, ...stories, ...food, ...ambassadors];

  const stats: CityStats = {
    totalExperiences: experiences.length,
    totalStories: stories.length,
    totalFood: food.length,
    totalAmbassadors: ambassadors.length,
    categories: [...new Set(allCityNodes.map(n => n.category).filter(Boolean))],
    avgDuration: experiences.length > 0 ? experiences[0].subtitle : '',
    popularTags: getPopularTags(allCityNodes),
  };

  return {
    destination,
    stats,
    experiences,
    stories,
    food,
    ambassadors,
    relatedCities,
    allNodes: allCityNodes,
  };
}

function getPopularTags(nodes: ExplorerNode[], limit = 10): string[] {
  const counts = new Map<string, number>();
  for (const node of nodes) {
    for (const tag of node.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}

export function getCitiesByCategory(graph: ExplorerGraph, category: string): ExplorerNode[] {
  return graph.cityNodes.filter(node => {
    const dest = node.data as Destination;
    return (
      dest.famousFor.some(f => f.includes(category)) ||
      dest.highlights.some(h => h.includes(category)) ||
      node.tags.some(t => t.includes(category))
    );
  });
}
