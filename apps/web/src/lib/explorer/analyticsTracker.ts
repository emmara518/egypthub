import type { AnalyticsEvent, ExplorerNodeType } from './types';

export type ExplorerEventName =
  | 'city_click' | 'experience_click' | 'story_open'
  | 'food_open' | 'ambassador_view' | 'trip_plan_request'
  | 'zainab_interaction' | 'favorite_added' | 'favorite_removed'
  | 'search_query' | 'filter_changed' | 'layer_changed'
  | 'map_pan' | 'map_zoom' | 'city_immersion';

const STORAGE_KEY = 'egypthub-analytics';

function readStorage(): AnalyticsEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStorage(events: AnalyticsEvent[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-500)));
  } catch {
  }
}

const eventNodeTypeMap: Record<ExplorerEventName, ExplorerNodeType | undefined> = {
  city_click: 'city',
  experience_click: 'experience',
  story_open: 'story',
  food_open: 'food',
  ambassador_view: 'ambassador',
  trip_plan_request: undefined,
  zainab_interaction: undefined,
  favorite_added: undefined,
  favorite_removed: undefined,
  search_query: undefined,
  filter_changed: undefined,
  layer_changed: undefined,
  map_pan: undefined,
  map_zoom: undefined,
  city_immersion: 'city',
};

export function trackEvent(event: ExplorerEventName, metadata?: Record<string, string>): void {
  const events = readStorage();
  events.push({
    event,
    nodeType: eventNodeTypeMap[event],
    timestamp: Date.now(),
    metadata,
  });
  writeStorage(events);
}

export function getAnalytics(): AnalyticsEvent[] {
  return readStorage();
}

export function getEventCount(event: ExplorerEventName): number {
  return readStorage().filter(e => e.event === event).length;
}

export function clearAnalytics(): void {
  writeStorage([]);
}
