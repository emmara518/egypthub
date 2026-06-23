import type { DeepLinkParams, ExplorerNodeType } from './types';

export function encodeExplorerState(params: DeepLinkParams): string {
  const parts: string[] = [];

  if (params.view) parts.push(`v=${params.view}`);
  if (params.city) parts.push(`city=${encodeURIComponent(params.city)}`);
  if (params.layer) parts.push(`layer=${params.layer}`);
  if (params.intent) parts.push(`intent=${encodeURIComponent(params.intent)}`);
  if (params.search) parts.push(`q=${encodeURIComponent(params.search)}`);
  if (params.node) parts.push(`node=${encodeURIComponent(params.node)}`);

  return parts.join('&');
}

export function decodeExplorerState(search: string): DeepLinkParams {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);

  const result: DeepLinkParams = {};

  const view = params.get('v');
  if (view === 'map' || view === 'feed' || view === 'city') {
    result.view = view;
  }

  const city = params.get('city');
  if (city) result.city = city;

  const layer = params.get('layer');
  if (layer === 'all' || layer === 'city' || layer === 'experience' || layer === 'story' || layer === 'food' || layer === 'ambassador') {
    result.layer = layer;
  }

  const intent = params.get('intent');
  if (intent) result.intent = intent;

  const searchQ = params.get('q');
  if (searchQ) result.search = searchQ;

  const node = params.get('node');
  if (node) result.node = node;

  return result;
}

export function createDeepLink(params: DeepLinkParams): string {
  const encoded = encodeExplorerState(params);
  return `/explore${encoded ? `?${encoded}` : ''}`;
}
