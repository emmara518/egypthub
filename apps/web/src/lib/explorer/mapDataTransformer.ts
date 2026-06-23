import type { ExplorerNode, ExplorerNodeType, ExplorerGraph } from './types';

export interface MapMarker {
  id: string;
  x: number;
  y: number;
  node: ExplorerNode;
  type: ExplorerNodeType;
  size: number;
  priority: number;
}

const EGYPT_BOUNDS = { minLat: 22, maxLat: 32, minLng: 25, maxLng: 37 };
const SVG_WIDTH = 800;
const SVG_HEIGHT = 700;

export function projectToMap(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng - EGYPT_BOUNDS.minLng) / (EGYPT_BOUNDS.maxLng - EGYPT_BOUNDS.minLng)) * SVG_WIDTH;
  const y = SVG_HEIGHT - ((lat - EGYPT_BOUNDS.minLat) / (EGYPT_BOUNDS.maxLat - EGYPT_BOUNDS.minLat)) * SVG_HEIGHT;
  return { x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 };
}

function getMarkerSize(type: ExplorerNodeType): number {
  switch (type) {
    case 'city': return 14;
    case 'experience': return 10;
    case 'story': return 8;
    case 'food': return 8;
    case 'ambassador': return 8;
  }
}

export function nodesToMarkers(nodes: ExplorerNode[]): MapMarker[] {
  return nodes.map(node => {
    const { x, y } = projectToMap(node.coordinates.lat, node.coordinates.lng);
    return {
      id: node.id,
      x,
      y,
      node,
      type: node.type,
      size: getMarkerSize(node.type),
      priority: node.priority,
    };
  });
}

export function getMarkersForLayer(graph: ExplorerGraph, layer: ExplorerNodeType | 'all'): MapMarker[] {
  if (layer === 'all') {
    const allNodes = [
      ...graph.cityNodes,
      ...graph.experienceNodes,
      ...graph.storyNodes,
      ...graph.foodNodes,
      ...graph.ambassadorNodes,
    ];
    return nodesToMarkers(allNodes);
  }
  switch (layer) {
    case 'city': return nodesToMarkers(graph.cityNodes);
    case 'experience': return nodesToMarkers(graph.experienceNodes);
    case 'story': return nodesToMarkers(graph.storyNodes);
    case 'food': return nodesToMarkers(graph.foodNodes);
    case 'ambassador': return nodesToMarkers(graph.ambassadorNodes);
  }
}

export function clusterMarkers(markers: MapMarker[], zoom: number): MapMarker[] {
  if (zoom >= 10 || markers.length === 0) return markers;

  const clusterRadius = zoom < 5 ? 60 : zoom < 8 ? 40 : 20;
  const clustered: MapMarker[] = [];
  const used = new Set<string>();

  for (let i = 0; i < markers.length; i++) {
    if (used.has(markers[i].id)) continue;
    const cluster: MapMarker[] = [markers[i]];
    used.add(markers[i].id);

    for (let j = i + 1; j < markers.length; j++) {
      if (used.has(markers[j].id)) continue;
      const dx = markers[i].x - markers[j].x;
      const dy = markers[i].y - markers[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < clusterRadius) {
        cluster.push(markers[j]);
        used.add(markers[j].id);
      }
    }

    if (cluster.length === 1) {
      clustered.push(cluster[0]);
    } else {
      const avgX = cluster.reduce((s, m) => s + m.x, 0) / cluster.length;
      const avgY = cluster.reduce((s, m) => s + m.y, 0) / cluster.length;
      const highestPriority = cluster.reduce((best, m) => m.priority < best.priority ? m : best, cluster[0]);
      clustered.push({
        id: `cluster-${cluster[0].id}`,
        x: Math.round(avgX * 100) / 100,
        y: Math.round(avgY * 100) / 100,
        node: highestPriority.node,
        type: highestPriority.type,
        size: Math.min(14 + cluster.length, 24),
        priority: -1,
      });
    }
  }

  return clustered;
}
