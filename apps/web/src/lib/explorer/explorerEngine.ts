import destinationsData from '@/data/destinations.json';
import experiencesData from '@/data/experiences.json';
import storiesData from '@/data/stories.json';
import foodData from '@/data/food.json';
import ambassadorsData from '@/data/ambassadors.json';
import cityRelationsData from '@/data/city-relations.json';
import type { ExplorerNode, ExplorerNodeType, ExplorerGraph, ExplorerFilter, CityStats, PremiumCardData } from './types';
import type { Destination, Experience, Story, FoodItem, Ambassador } from '@/lib/zainab/types';

const destinations = destinationsData as unknown as Destination[];
const experiences = experiencesData as unknown as Experience[];
const stories = storiesData as unknown as Story[];
const foodItems = foodData as unknown as FoodItem[];
const ambassadors = ambassadorsData as unknown as Ambassador[];

function normalizeSlug(citySlug: string): string {
  return citySlug.toLowerCase().replace(/\s+/g, '-');
}

function buildRelationsMap(): Map<string, string[]> {
  const rels = new Map<string, string[]>();
  const data = cityRelationsData as unknown as { relations: Record<string, string[]> };
  for (const [city, related] of Object.entries(data.relations)) {
    rels.set(city, related);
  }
  return rels;
}

function getCityName(dest: Destination): { label: string; labelEn: string } {
  return { label: dest.nameAr, labelEn: dest.nameEn };
}

function createCityNode(dest: Destination): ExplorerNode<PremiumCardData> {
  return {
    id: dest.slug,
    type: 'city',
    label: dest.nameAr,
    labelEn: dest.nameEn,
    subtitle: dest.shortDescription.slice(0, 80),
    description: dest.longDescription,
    city: dest.nameAr,
    citySlug: dest.slug,
    coordinates: dest.coordinates,
    tags: [...dest.famousFor, ...dest.highlights].slice(0, 10),
    category: 'city',
    image: '',
    priority: 0,
    relations: [],
    data: {
      image: '',
      title: dest.nameAr,
      titleEn: dest.nameEn,
      subtitle: dest.shortDescription.slice(0, 60),
      rating: 4.5,
      reviewCount: 128,
      category: 'city',
      categoryLabel: 'مدينة',
      location: dest.nameAr,
      available: true,
      verified: true,
      slug: dest.slug,
    },
  };
}

function createExperienceNode(exp: Experience): ExplorerNode<PremiumCardData> {
  const dest = destinations.find(d => d.slug === exp.citySlug);
  const priceMap: Record<string, string> = { low: 'منخفض', medium: 'متوسط', high: 'مرتفع' };
  return {
    id: exp.id,
    type: 'experience',
    label: exp.name,
    labelEn: exp.name,
    subtitle: exp.duration,
    description: exp.description,
    city: dest?.nameAr ?? exp.citySlug,
    citySlug: exp.citySlug,
    coordinates: dest?.coordinates ?? { lat: 0, lng: 0 },
    tags: [exp.category, exp.difficulty, exp.priceRange, ...exp.highlights.slice(0, 5)],
    category: exp.category,
    image: '',
    priority: 1,
    relations: [exp.citySlug],
    data: {
      image: '',
      title: exp.name,
      titleEn: exp.name,
      subtitle: exp.duration,
      rating: 4.2,
      reviewCount: 96,
      category: exp.category,
      categoryLabel: 'تجربة',
      location: dest?.nameAr ?? exp.citySlug,
      distance: '٣ كم',
      price: priceMap[exp.priceRange] || 'متوسط',
      currency: 'EGP',
      available: true,
      verified: true,
      trending: false,
      recommended: false,
      slug: exp.id,
    },
  };
}

function createStoryNode(story: Story): ExplorerNode<PremiumCardData> {
  const dest = destinations.find(d => d.slug === story.citySlug);
  return {
    id: story.id,
    type: 'story',
    label: story.title,
    labelEn: story.title,
    subtitle: story.readTime,
    description: story.excerpt,
    city: dest?.nameAr ?? story.citySlug,
    citySlug: story.citySlug,
    coordinates: dest?.coordinates ?? { lat: 0, lng: 0 },
    tags: [story.category],
    category: story.category,
    image: '',
    priority: 2,
    relations: [story.citySlug],
    data: {
      image: '',
      title: story.title,
      titleEn: story.title,
      subtitle: story.readTime,
      rating: 4.6,
      reviewCount: 42,
      category: story.category,
      categoryLabel: 'قصة',
      location: dest?.nameAr ?? story.citySlug,
      available: true,
      slug: story.id,
    },
  };
}

function createFoodNode(food: FoodItem): ExplorerNode<PremiumCardData> {
  const dest = destinations.find(d => d.slug === food.citySlug);
  return {
    id: food.id,
    type: 'food',
    label: food.name,
    labelEn: food.name,
    subtitle: food.cuisine,
    description: food.description,
    city: dest?.nameAr ?? food.citySlug,
    citySlug: food.citySlug,
    coordinates: dest?.coordinates ?? { lat: 0, lng: 0 },
    tags: [food.cuisine, food.priceRange],
    category: food.cuisine,
    image: '',
    priority: 3,
    relations: [food.citySlug],
    data: {
      image: '',
      title: food.name,
      titleEn: food.name,
      subtitle: food.cuisine,
      rating: 4.3,
      reviewCount: 64,
      category: food.cuisine,
      categoryLabel: 'مطعم',
      location: dest?.nameAr ?? food.citySlug,
      price: food.priceRange === 'low' ? 'منخفض' : food.priceRange === 'high' ? 'مرتفع' : 'متوسط',
      currency: 'EGP',
      available: true,
      verified: true,
      slug: food.id,
    },
  };
}

function createAmbassadorNode(amb: Ambassador): ExplorerNode<PremiumCardData> {
  const dest = destinations.find(d => d.slug === amb.citySlug);
  return {
    id: amb.id,
    type: 'ambassador',
    label: amb.name,
    labelEn: amb.name,
    subtitle: amb.role,
    description: amb.bio,
    city: dest?.nameAr ?? amb.citySlug,
    citySlug: amb.citySlug,
    coordinates: dest?.coordinates ?? { lat: 0, lng: 0 },
    tags: [amb.role, ...amb.languages, ...amb.specialties.slice(0, 5)],
    category: amb.role,
    image: '',
    priority: 4,
    relations: [amb.citySlug],
    data: {
      image: '',
      title: amb.name,
      titleEn: amb.name,
      subtitle: amb.role,
      rating: 4.8,
      reviewCount: 32,
      category: amb.role,
      categoryLabel: 'مرشد',
      location: dest?.nameAr ?? amb.citySlug,
      available: true,
      verified: amb.isVerified,
      languages: amb.languages,
      slug: amb.id,
    },
  };
}

export function buildExplorerGraph(): ExplorerGraph {
  const nodes = new Map<string, ExplorerNode>();
  const cityNodes: ExplorerNode[] = [];
  const experienceNodes: ExplorerNode[] = [];
  const storyNodes: ExplorerNode[] = [];
  const foodNodes: ExplorerNode[] = [];
  const ambassadorNodes: ExplorerNode[] = [];
  const cityRels = buildRelationsMap();

  for (const dest of destinations) {
    const node = createCityNode(dest);
    node.relations = cityRels.get(dest.slug) ?? [];
    nodes.set(node.id, node);
    cityNodes.push(node);
  }

  for (const exp of experiences) {
    const node = createExperienceNode(exp);
    nodes.set(node.id, node);
    experienceNodes.push(node);
  }

  for (const story of stories) {
    const node = createStoryNode(story);
    nodes.set(node.id, node);
    storyNodes.push(node);
  }

  for (const food of foodItems) {
    const node = createFoodNode(food);
    nodes.set(node.id, node);
    foodNodes.push(node);
  }

  for (const amb of ambassadors) {
    const node = createAmbassadorNode(amb);
    nodes.set(node.id, node);
    ambassadorNodes.push(node);
  }

  const relations = new Map<string, string[]>();

  for (const node of nodes.values()) {
    const nodeRels: string[] = [...node.relations];
    for (const otherNode of nodes.values()) {
      if (otherNode.id === node.id) continue;
      if (otherNode.citySlug === node.citySlug && otherNode.type !== node.type) {
        nodeRels.push(otherNode.id);
      }
    }
    const cityRelated = cityRels.get(node.citySlug) ?? [];
    for (const relCitySlug of cityRelated) {
      const cityNode = nodes.get(relCitySlug);
      if (cityNode) {
        nodeRels.push(cityNode.id);
      }
    }
    relations.set(node.id, [...new Set(nodeRels)]);
  }

  return {
    nodes,
    cityNodes,
    experienceNodes,
    storyNodes,
    foodNodes,
    ambassadorNodes,
    relations,
  };
}

export function getNodesByType(graph: ExplorerGraph, type: ExplorerNodeType | 'all'): ExplorerNode[] {
  if (type === 'all') {
    return Array.from(graph.nodes.values());
  }
  switch (type) {
    case 'city': return graph.cityNodes;
    case 'experience': return graph.experienceNodes;
    case 'story': return graph.storyNodes;
    case 'food': return graph.foodNodes;
    case 'ambassador': return graph.ambassadorNodes;
  }
}

export function getNodeById(graph: ExplorerGraph, id: string): ExplorerNode | undefined {
  return graph.nodes.get(id);
}

export function getRelatedNodes(graph: ExplorerGraph, node: ExplorerNode): ExplorerNode[] {
  const rels = graph.relations.get(node.id) ?? [];
  return rels.map(id => graph.nodes.get(id)).filter(Boolean) as ExplorerNode[];
}

export function filterNodes(nodes: ExplorerNode[], filter: ExplorerFilter): ExplorerNode[] {
  return nodes.filter(node => {
    if (filter.types.length > 0 && !filter.types.includes(node.type)) {
      return false;
    }
    if (filter.categories.length > 0 && !filter.categories.includes(node.category)) {
      return false;
    }
    if (filter.cities.length > 0 && !filter.cities.includes(node.citySlug)) {
      return false;
    }
    if (filter.priceRange.length > 0) {
      const priceTag = node.tags.find(t => ['منخفض', 'متوسط', 'مرتفع'].includes(t));
      if (!priceTag || !filter.priceRange.includes(priceTag)) {
        return false;
      }
    }
    if (filter.difficulty.length > 0) {
      const diffTag = node.tags.find(t => ['Easy', 'Moderate', 'Challenging'].includes(t));
      if (!diffTag || !filter.difficulty.includes(diffTag)) {
        return false;
      }
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      const matchLabel = node.label.toLowerCase().includes(q);
      const matchLabelEn = node.labelEn.toLowerCase().includes(q);
      const matchSub = node.subtitle.toLowerCase().includes(q);
      const matchDesc = node.description.toLowerCase().includes(q);
      const matchTags = node.tags.some(t => t.toLowerCase().includes(q));
      if (!matchLabel && !matchLabelEn && !matchSub && !matchDesc && !matchTags) {
        return false;
      }
    }
    return true;
  });
}

export function getCityStats(graph: ExplorerGraph, citySlug: string): CityStats {
  const allNodes = Array.from(graph.nodes.values());
  const cityNodesArr = allNodes.filter(n => n.citySlug === citySlug);

  const experiencesArr = cityNodesArr.filter(n => n.type === 'experience');
  const storiesArr = cityNodesArr.filter(n => n.type === 'story');
  const foodArr = cityNodesArr.filter(n => n.type === 'food');
  const ambassadorsArr = cityNodesArr.filter(n => n.type === 'ambassador');

  const categories = [...new Set(cityNodesArr.map(n => n.category).filter(Boolean))];

  const durationTags = cityNodesArr
    .filter(n => n.type === 'experience')
    .map(n => n.subtitle)
    .filter(Boolean);
  const avgDuration = durationTags.length > 0 ? durationTags[0] : '';

  const allTags = cityNodesArr.flatMap(n => n.tags);
  const tagCounts = new Map<string, number>();
  for (const tag of allTags) {
    tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
  }
  const popularTags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag);

  return {
    totalExperiences: experiencesArr.length,
    totalStories: storiesArr.length,
    totalFood: foodArr.length,
    totalAmbassadors: ambassadorsArr.length,
    categories,
    avgDuration,
    popularTags,
  };
}

export function searchNodes(graph: ExplorerGraph, query: string): ExplorerNode[] {
  if (!query.trim()) return Array.from(graph.nodes.values());
  const q = query.toLowerCase();
  return Array.from(graph.nodes.values()).filter(node => {
    return (
      node.label.toLowerCase().includes(q) ||
      node.labelEn.toLowerCase().includes(q) ||
      node.subtitle.toLowerCase().includes(q) ||
      node.description.toLowerCase().includes(q) ||
      node.tags.some(t => t.toLowerCase().includes(q)) ||
      node.category.toLowerCase().includes(q)
    );
  });
}
