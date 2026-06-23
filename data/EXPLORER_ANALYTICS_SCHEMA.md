# EXPLORER ANALYTICS SCHEMA

**Date:** 23 June 2026  
**Storage:** localStorage (key: `egypthub-analytics`)  
**Format:** JSON array of `AnalyticsEvent` objects

---

## Event Types

| # | Event Name | Trigger | Payload |
|---|-----------|---------|---------|
| 1 | `city_click` | User clicks a city marker or city card | `{ citySlug }` |
| 2 | `experience_click` | User clicks an experience card | `{ nodeId }` |
| 3 | `story_open` | User opens a story | `{ nodeId }` |
| 4 | `food_open` | User clicks a food item | `{ nodeId }` |
| 5 | `ambassador_view` | User views an ambassador profile | `{ nodeId }` |
| 6 | `trip_plan_request` | User clicks "خطط رحلتي" | `{ citySlug }` |
| 7 | `zainab_interaction` | User clicks "تحدث مع زينب" | `{ citySlug }` |
| 8 | `favorite_added` | User saves a discovery | `{ nodeId, nodeType }` |
| 9 | `favorite_removed` | User removes a saved discovery | `{ nodeId, nodeType }` |
| 10 | `search_query` | User performs a search | `{ query, results }` |
| 11 | `filter_changed` | User modifies filters | `{ categories }` |
| 12 | `layer_changed` | User switches map layer | `{ layer }` |
| 13 | `map_pan` | User pans the map | `{ x, y }` |
| 14 | `map_zoom` | User zooms the map | `{ scale }` |
| 15 | `city_immersion` | User enters city immersion mode | `{ citySlug }` |

---

## Schema

```typescript
interface AnalyticsEvent {
  event: ExplorerEventName;    // Event type identifier
  nodeType?: ExplorerNodeType;  // 'city' | 'experience' | 'story' | 'food' | 'ambassador'
  nodeId?: string;              // Explorer node ID
  citySlug?: string;            // City identifier
  timestamp: number;            // Unix milliseconds
  metadata?: Record<string, string>;  // Additional context
}

type ExplorerEventName =
  | 'city_click' | 'experience_click' | 'story_open'
  | 'food_open' | 'ambassador_view' | 'trip_plan_request'
  | 'zainab_interaction' | 'favorite_added' | 'favorite_removed'
  | 'search_query' | 'filter_changed' | 'layer_changed'
  | 'map_pan' | 'map_zoom' | 'city_immersion';
```

---

## Example Event

```json
{
  "event": "city_click",
  "nodeType": "city",
  "nodeId": "cairo",
  "citySlug": "cairo",
  "timestamp": 1750730400000,
  "metadata": {
    "source": "map",
    "layer": "all"
  }
}
```

---

## API Functions

```typescript
// Track an event
trackEvent(event: ExplorerEventName, metadata?: Record<string, string>): void

// Get all stored analytics
getAnalytics(): AnalyticsEvent[]

// Count occurrences of a specific event type
getEventCount(event: ExplorerEventName): number

// Clear all analytics data
clearAnalytics(): void
```

---

## Future Integration

When user accounts are implemented, the analytics data can be migrated:

```typescript
// Pending implementation for Phase N:
// POST /api/analytics/batch
// Body: { userId: string, events: AnalyticsEvent[] }
// Clears localStorage after successful upload
```

---

## Privacy

- All analytics are stored **locally** in the browser
- No data is sent to any external server
- Users can clear their analytics at any time
- Data is migrated to the server only when user accounts are active and opted in
