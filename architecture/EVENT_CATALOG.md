# EVENT CATALOG — EgyptHub

**Source:** `apps/web/` codebase audit. Only events verified in source code are listed.

---

## Events (CONFIRMED in code)

### 1. `layer_changed`
- **Publisher**: `src/app/explore/page.tsx:60`
- **Consumers**: `src/lib/explorer/analyticsTracker.ts` (localStorage write)
- **Payload**: `{ layer: string }`
- **Example**: `trackEvent('layer_changed', { layer: 'experience' })`

### 2. `filter_changed`
- **Publisher**: `src/app/explore/page.tsx:66`
- **Consumers**: `src/lib/explorer/analyticsTracker.ts` (localStorage write)
- **Payload**: `{ categories: string }` (comma-joined)
- **Example**: `trackEvent('filter_changed', { categories: 'Adventure,History' })`

### 3. `search_query`
- **Publisher**: `src/app/explore/page.tsx:74`
- **Consumers**: `src/lib/explorer/analyticsTracker.ts` (localStorage write)
- **Payload**: `{ query: string, results: string }`
- **Example**: `trackEvent('search_query', { query: 'pyramid', results: '12' })`

### 4. `city_click`
- **Publisher**: `src/app/explore/page.tsx:90`
- **Consumers**: `src/lib/explorer/analyticsTracker.ts` (localStorage write)
- **Payload**: `{ citySlug: string }`
- **Example**: `trackEvent('city_click', { citySlug: 'luxor' })`

### 5. `trip_plan_request`
- **Publisher**: `src/app/explore/page.tsx:100`
- **Consumers**: `src/lib/explorer/analyticsTracker.ts` (localStorage write)
- **Payload**: `{ citySlug: string }`
- **Example**: `trackEvent('trip_plan_request', { citySlug: 'cairo' })`

### 6. `zainab_interaction`
- **Publisher**: `src/app/explore/page.tsx:105`
- **Consumers**: `src/lib/explorer/analyticsTracker.ts` (localStorage write)
- **Payload**: `{ citySlug: string }`
- **Example**: `trackEvent('zainab_interaction', { citySlug: 'sharm-el-sheikh' })`

### 7. `experience_click`
- **Publisher**: `src/app/explore/page.tsx:111`
- **Consumers**: `src/lib/explorer/analyticsTracker.ts` (localStorage write)
- **Payload**: `{ nodeId: string }`
- **Example**: `trackEvent('experience_click', { nodeId: 'exp-cairo-1' })`

---

## Events (DEFINED in types but NOT FOUND in any component)

Defined in `src/lib/explorer/analyticsTracker.ts:3-8` and `types.ts:62-69` but never called:

| Event Name | Declared At | Used In Code? |
|---|---|---|
| `story_open` | `analyticsTracker.ts:5` | NOT VERIFIED |
| `food_open` | `analyticsTracker.ts:5` | NOT VERIFIED |
| `ambassador_view` | `analyticsTracker.ts:5` | NOT VERIFIED |
| `favorite_added` | `analyticsTracker.ts:6` | NOT VERIFIED |
| `favorite_removed` | `analyticsTracker.ts:6` | NOT VERIFIED |
| `map_pan` | `analyticsTracker.ts:7` | NOT VERIFIED |
| `map_zoom` | `analyticsTracker.ts:7` | NOT VERIFIED |
| `city_immersion` | `analyticsTracker.ts:8` | NOT VERIFIED |

These are reserved for future implementation.

---

## Event Storage

All confirmed events flow to a single storage mechanism:

- **Storage Key**: `egypthub-analytics` (defined `src/lib/explorer/analyticsTracker.ts:10`)
- **Storage Type**: `localStorage`
- **Format**: Array of `AnalyticsEvent` objects (defined `src/lib/explorer/types.ts:62-69`)
- **Retention**: Last 500 events (`analyticsTracker.ts:25` — `slice(-500)`)
- **Flush**: Never flushed to any server (no API calls exist)

```typescript
interface AnalyticsEvent {
  event: string;                         // ExplorerEventName
  nodeType?: ExplorerNodeType;           // city | experience | story | food | ambassador
  nodeId?: string;
  citySlug?: string;
  timestamp: number;                     // Date.now()
  metadata?: Record<string, string>;
}
```

---

## localStorage Keys (ALL instances)

| Key | Source File | Purpose |
|---|---|---|
| `egypthub-analytics` | `src/lib/explorer/analyticsTracker.ts:10` | UI analytics events |
| `egypthub-favorites` | `src/lib/explorer/favoritesEngine.ts:9` | Saved discovery favorites |
| `egypthub_favorites` | `src/components/explorer/MyDiscoveriesDrawer.tsx:36` | Duplicate favorites key (note `-` vs `_`) |
| `egypthub-theme` | `src/components/ThemeProvider.tsx:26` | Dark/light theme preference |
| `egypthub_explorer_recent` | `src/components/explorer/ExplorerSearchBar.tsx:25` | Recent search queries |

> **Note:** `egypthub-favorites` and `egypthub_favorites` are separate entries. The `favoritesEngine.ts` treats them independently from `MyDiscoveriesDrawer.tsx`.

---

## Event Flow Diagram

```
User Interaction
  │
  ▼
page.tsx (handle* callbacks)
  │
  ▼
trackEvent(eventName, metadata)
  │
  ▼
analyticsTracker.ts
  ├─ readStorage()      → localStorage.getItem('egypthub-analytics')
  ├─ push(event)        → append to array
  └─ writeStorage()     → localStorage.setItem('egypthub-analytics', ...)
                          │
                          ▼
                    localStorage (browser, max 500 events)
                          │
                          ▼
                    NEVER FLUSHED (no API endpoint)
```

---

## Confidence Level

**HIGH** — every event in the "CONFIRMED" section was traced from publisher to storage. "NOT VERIFIED" events are marked explicitly.
