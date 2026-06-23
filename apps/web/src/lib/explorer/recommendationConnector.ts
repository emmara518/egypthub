import type { ExplorerGraph, ExplorerNode } from './types';
import type { Intent, Recommendations } from '@/lib/zainab/types';

const intentCategoryMap: Record<string, string[]> = {
  relaxation: ['Relaxation', 'Café'],
  adventure: ['Adventure'],
  culture: ['Culture', 'Local Life'],
  food: ['Food', 'Street Food', 'Seafood', 'Egyptian', 'Nubian', 'Bedouin', 'Café'],
  luxury: ['Relaxation', 'Seafood'],
  family: ['Relaxation', 'History', 'Culture'],
  honeymoon: ['Relaxation', 'Culture'],
  diving: ['Adventure'],
  photography: ['Culture', 'History', 'Adventure'],
  'digital-nomad': ['Culture', 'Café', 'Relaxation'],
  history: ['History'],
};

export function intentToCategories(intent: Intent): string[] {
  return intentCategoryMap[intent] ?? ['Culture', 'History'];
}

export function recommendationsToNodes(graph: ExplorerGraph, recs: Recommendations): ExplorerNode[] {
  const nodes: ExplorerNode[] = [];

  for (const dest of recs.destinations) {
    const node = graph.nodes.get(dest.slug);
    if (node) nodes.push(node);
  }

  for (const exp of recs.experiences) {
    const node = graph.nodes.get(exp.id);
    if (node) nodes.push(node);
  }

  for (const food of recs.food) {
    const node = graph.nodes.get(food.id);
    if (node) nodes.push(node);
  }

  for (const story of recs.stories) {
    const node = graph.nodes.get(story.id);
    if (node) nodes.push(node);
  }

  return nodes;
}

export function getNodesForIntent(graph: ExplorerGraph, intent: Intent): ExplorerNode[] {
  const categories = intentToCategories(intent);
  const allNodes = Array.from(graph.nodes.values());

  const matched = allNodes.filter(node => categories.includes(node.category));

  if (matched.length === 0) {
    return allNodes.filter(node => node.type !== 'city').slice(0, 20);
  }

  return matched;
}

export function highlightNodesForIntent(graph: ExplorerGraph, intent: Intent): string[] {
  const categories = intentToCategories(intent);
  const allNodes = Array.from(graph.nodes.values());

  return allNodes
    .filter(node => categories.includes(node.category))
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 15)
    .map(node => node.id);
}
