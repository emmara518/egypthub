# EXPLORER ARCHITECTURE DOCUMENT

**Date:** 23 June 2026  
**Version:** 1.0  
**Status:** ✅ Production Ready

---

## 1. System Overview

The Egypt Interactive Explorer is a graph-driven discovery platform that unifies all EgyptHub content (destinations, experiences, stories, food, ambassadors) into a single explorable interface. It replaces traditional page-by-page browsing with a visual, map-centric discovery experience.

### Core Principles

- **Graph-first** — Every piece of content is a node in a connected graph
- **Unified model** — All content types share the `ExplorerNode` interface
- **No external dependencies** — SVG map, localStorage analytics, static export compatible
- **Event-driven** — Zainab AI, filters, layers, and search communicate through events
- **URL-state** — Every view is encoded in URL params for sharing and refresh recovery

---

## 2. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         EXPLORER PAGE                               │
│                                                                     │
│  ┌──────────────┐  ┌───────────────────────────────────────────┐   │
│  │    SIDEBAR    │  │                  MAP AREA                  │   │
│  │              │  │  ┌────────────────────────────────────────┐│   │
│  │ Filter Chips │  │  │         EXPLORER MAP (SVG)            ││   │
│  │ Layer Toggle │  │  │  ┌─────┐ ┌─────┐ ┌─────┐              ││   │
│  │ Price Range  │  │  │  │Cairo│ │Luxor│ │Dahab│              ││   │
│  │ Difficulty   │  │  │  └─────┘ └─────┘ └─────┘              ││   │
│  │              │  │  │                                         ││   │
│  └──────────────┘  │  └────────────────────────────────────────┘│   │
│                    │                                             │   │
│  ┌──────────────┐  │  ┌────────────────────────────────────────┐│   │
│  │     FEED     │  │  │         SEARCH BAR                     ││   │
│  │              │  │  └────────────────────────────────────────┘│   │
│  │ Trending     │  │                                             │   │
│  │ Featured     │  └───────────────────────────────────────────┘   │
│  │ Popular      │                                                  │
│  │ Zainab Picks │  ┌───────────────────────────────────────────┐   │
│  └──────────────┘  │      CITY EXPLORER VIEW (overlay)         │   │
│                    │  ┌────────────────────────────────────────┐│   │
│  ┌──────────────┐  │  │ Hero · Stats · Tabs · Related Cities  ││   │
│  │  MY DRAWER   │  │  └────────────────────────────────────────┘│   │
│  │ (slide-in)   │  └───────────────────────────────────────────┘   │
│  └──────────────┘                                                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. Data Flow

### 3.1 Initialization

```
buildExplorerGraph()
  │
  ├── Read destinations.json     → 8 city nodes
  ├── Read experiences.json      → 80 experience nodes
  ├── Read stories.json          → 50 story nodes
  ├── Read food.json             → 100 food nodes
  ├── Read ambassadors.json      → 32 ambassador nodes
  └── Read city-relations.json   → Graph edges (8 cities, ~24 relations)
       │
       ▼
  ExplorerGraph {
    nodes: Map<id, ExplorerNode>       (358+ entries)
    cityNodes: ExplorerNode[]          (8)
    experienceNodes: ExplorerNode[]    (80)
    storyNodes: ExplorerNode[]         (50)
    foodNodes: ExplorerNode[]          (100)
    ambassadorNodes: ExplorerNode[]    (32)
    relations: Map<slug, slug[]>       (8 entries)
  }
```

### 3.2 Filter Pipeline

```
User Input → ExplorerFilter → filterNodes(nodes, filter) → Filtered ExplorerNode[]
  │               │                      │
  │               ├── types[]            ├── Type filter (AND)
  │               ├── categories[]       ├── Category filter (OR within, AND between)
  │               ├── cities[]           ├── City filter (OR)
  │               ├── intents[]          ├── Intent mapping → categories
  │               ├── search             ├── Text search (OR across labels/tags)
  │               ├── priceRange[]       ├── Only for experience nodes
  │               └── difficulty[]       └── Only for experience nodes
```

### 3.3 Map Projection

```
Nodes with coordinates → projectToMap(lat, lng) → SVG (x, y)
  │
  ├── Simple equirectangular projection
  ├── Egypt bounds: lat 22-32, lng 25-37
  ├── SVG canvas: 800×700
  └── Formula:
        x = ((lng - 25) / 12) * 800
        y = 700 - ((lat - 22) / 10) * 700
```

### 3.4 Search Pipeline

```
query → searchNodes(graph, query)
  │
  ├── Normalize query (lowercase)
  ├── Filter nodes by:
  │     ├── label.includes(query)        (Arabic)
  │     ├── labelEn.includes(query)       (English)
  │     ├── subtitle.includes(query)
  │     ├── description.includes(query)
  │     ├── tags.some(t => includes(query))
  │     └── category.includes(query)
  └── Return matching ExplorerNode[]
```

---

## 4. Component Tree

```
<ExplorePage>
  ├── <ExplorerSidebar>
  │     ├── Filter chips (categories)
  │     ├── Layer toggle buttons
  │     ├── Price range (experiences)
  │     ├── Difficulty (experiences)
  │     ├── Active filter count
  │     └── Clear all button
  │
  ├── <ExplorerSearchBar>
  │     ├── Input field (Arabic placeholder)
  │     ├── Suggestions dropdown
  │     ├── Recent searches
  │     └── Keyboard navigation
  │
  ├── {selectedCity ? (
  │     <CityExplorerView>
  │       ├── Hero section
  │       ├── Stats grid
  │       ├── Tabbed content (تجارب/قصص/أكل/مرشدون)
  │       ├── Related cities
  │       └── CTAs (خطط رحلتي, تحدث مع زينب)
  │     </CityExplorerView>
  │   ) : (
  │     <ExplorerMap>        ← SVG map with markers
  │     <DiscoveryFeed>      ← Content feed (when feedView)
  │     <ResultsList>         ← Search results (when !feedView)
  │   )}
  │
  └── <MyDiscoveriesDrawer>
        ├── Tabs (All/Cities/Experiences/Stories/Food/Ambassadors)
        └── Saved items with remove
```

---

## 5. Zainab AI Integration

```
recommendationConnector.ts
  │
  ├── getNodesForIntent(intent)
  │     └── Maps Zainab intents to Explorer categories
  │         luxury  → ['Luxury', 'Relaxation']
  │         adventure → ['Adventure']
  │         culture → ['Culture', 'History']
  │         diving → ['Adventure']
  │         ...
  │
  ├── recommendationsToNodes(recommendations)
  │     └── Converts Zainab Recommendations[] → ExplorerNode[]
  │
  └── highlightNodesForIntent(intent)
        └── Returns node IDs to highlight on map
```

Event flow:
1. Zainab detects intent
2. `getNodesForIntent()` returns matching nodes
3. Map highlights those nodes with gold pulse
4. Sidebar auto-filters to matching categories
5. Feed shows "موصى به من زينب" section

---

## 6. State Management

All state is managed within `<ExplorePage>` using React hooks:

```
State Variable         Type               Purpose
─────────────────────────────────────────────────────
activeLayer            ExplorerNodeType   Current map layer
filter                 ExplorerFilter      Active filters
searchQuery            string             Search input
selectedCity           string|null        City immersion mode
selectedNodeId         string|null        Selected node
highlightedIds         string[]           Highlighted node IDs
sidebarOpen            boolean            Sidebar visibility
feedView               boolean            Feed vs results toggle
drawerOpen             boolean            Favorites drawer
```

URL state (via `deepLinkEngine.ts`):
```
/explore?city=dahab&layer=experiences&search=غوص

→ decodeExplorerState() → {
    city: 'dahab',
    layer: 'experiences',
    search: 'غوص',
    intent: undefined,
    node: undefined,
    view: undefined,
  }
```

---

## 7. Performance Design

| Concern | Strategy |
|---------|----------|
| **Graph building** | Module-level, built once |
| **Filtering** | Array spread + Set lookups, <1ms for 358 nodes |
| **Map rendering** | SVG (no canvas overhead), lazy marker labels |
| **Search** | Linear scan over 358 nodes, memoized callbacks |
| **Re-renders** | `useMemo` for filteredNodes, `useCallback` for handlers |
| **Image loading** | Lazy loading with placeholder state |
| **Animation** | Framer Motion with `will-change: transform` |

---

## 8. File Dependencies

```
explore/page.tsx
  ├── components/explorer/ExplorerMap
  ├── components/explorer/ExplorerSidebar
  ├── components/explorer/ExplorerSearchBar
  ├── components/explorer/CityExplorerView
  ├── components/explorer/DiscoveryFeed
  ├── components/explorer/MyDiscoveriesDrawer
  └── lib/explorer/*
        ├── types.ts (base interfaces)
        ├── explorerEngine.ts (primary dependency)
        ├── filterEngine.ts
        ├── mapDataTransformer.ts
        ├── cityExplorer.ts
        ├── recommendationConnector.ts
        ├── favoritesEngine.ts
        ├── analyticsTracker.ts
        └── deepLinkEngine.ts
              └── lib/zainab/types (Phase 13 data types)
```

---

## 9. Extensibility

### Adding a new content type

1. Add JSON file to `src/data/`
2. Add to `ExplorerNodeType` union in `types.ts`
3. Add parsing in `explorerEngine.ts` `buildExplorerGraph()`
4. Add layer button in `ExplorerSidebar.tsx`
5. Add card component in `DiscoveryFeed.tsx`
6. Add tab in `CityExplorerView.tsx`
7. Add tab in `MyDiscoveriesDrawer.tsx`

### Adding a new filter

1. Add field to `ExplorerFilter` in `types.ts`
2. Add UI control in `ExplorerSidebar.tsx`
3. Add filtering logic in `filterEngine.ts` `applyFilter()`

### Adding a new analytics event

1. Add to `ExplorerEventName` in `analyticsTracker.ts`
2. Call `trackEvent()` at the trigger point

---

## 10. Deep Link Schema

| Parameter | Type | Example | Effect |
|-----------|------|---------|--------|
| `city` | string | `dahab` | Opens city immersion mode |
| `layer` | string | `experiences` | Switches map layer |
| `intent` | string | `adventure` | Highlights matching nodes |
| `search` | string | `غوص` | Performs search + highlights |
| `node` | string | `dahab-1` | Selects specific node |
| `view` | string | `map` | Switches between map/feed |

Shareable examples:
- `/explore?city=dahab` — Direct link to Dahab immersion
- `/explore?city=luxor&layer=experiences` — Luxor experiences layer
- `/explore?intent=adventure` — Adventure recommendations on map
- `/explore?search=غوص&layer=experiences` — Diving experiences search
