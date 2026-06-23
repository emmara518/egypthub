import type { ExplorerGraph, ExplorerNode } from './types';

export interface SavedDiscovery {
  id: string;
  type: string;
  savedAt: number;
}

const STORAGE_KEY = 'egypthub-favorites';

function readStorage(): SavedDiscovery[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStorage(items: SavedDiscovery[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
  }
}

export function getFavorites(): SavedDiscovery[] {
  return readStorage();
}

export function addFavorite(id: string, type: string): void {
  const items = readStorage();
  if (items.some(item => item.id === id)) return;
  items.push({ id, type, savedAt: Date.now() });
  writeStorage(items);
}

export function removeFavorite(id: string): void {
  const items = readStorage().filter(item => item.id !== id);
  writeStorage(items);
}

export function isFavorite(id: string): boolean {
  return readStorage().some(item => item.id === id);
}

export function getFavoriteNodes(graph: ExplorerGraph): ExplorerNode[] {
  const saved = readStorage();
  return saved
    .map(item => graph.nodes.get(item.id))
    .filter((node): node is ExplorerNode => node !== undefined);
}
