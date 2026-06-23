# EgyptHub — Implementation Sprint 1

> **Phase:** A (Design Tokens) + B (Core Primitives — subset)
> **Target:** `packages/design-tokens` + `packages/ui`
> **Components:** Button, Input, Textarea, Card, Badge, Avatar, Modal, Drawer, Tooltip, Toast, Skeleton, Spinner
> **Duration:** 10 working days
> **Dependencies:** None (Phase A has no deps; Phase B depends on Phase A)

---

## Sprint Scope

### What is included

- Complete design token system (CSS variables, Tailwind v4 @theme, fonts, base styles)
- Supporting utilities (cn, Portal, icons, hooks)
- 12 core UI components at production quality
- Dark mode only (light mode is NOT included per visual boards)
- RTL support (Arabic-first layout)

### What is NOT included

- No pages, screens, or layouts
- No business logic
- No data fetching
- No animations beyond component hover/focus states
- No light mode support
- No form submission logic
- No navigation components (Header, Sidebar, BottomNav)
- No composite components (StatCard, Table, Tabs, Pagination)

---

## Day 1-2: Phase A — Design Tokens

### Task A1: CSS Custom Properties

**Exact files:**
- `packages/design-tokens/src/tokens/colors.ts`
- `packages/design-tokens/src/tokens/typography.ts`
- `packages/design-tokens/src/tokens/spacing.ts`
- `packages/design-tokens/src/tokens/radius.ts`
- `packages/design-tokens/src/tokens/shadows.ts`
- `packages/design-tokens/src/tokens/breakpoints.ts`
- `packages/design-tokens/src/tokens/z-index.ts`
- `packages/design-tokens/src/tokens/motion.ts`
- `packages/design-tokens/src/tokens/gradients.ts`
- `packages/design-tokens/src/css/variables.css`
- `packages/design-tokens/src/index.ts`
- `packages/design-tokens/src/index.css`
- `packages/design-tokens/package.json`
- `packages/design-tokens/tsconfig.json`

**Dependencies:** None

**Acceptance criteria:**
1. All CSS custom properties are defined in `variables.css`
2. Each token file exports a typed JS/TS object
3. `index.ts` aggregates all token exports
4. `index.css` re-exports `variables.css`
5. Package builds with `tsup` producing ESM + CJS + CSS

**Variable categories (minimum coverage):**
- `--bg-primary`, `--bg-secondary` (backgrounds)
- `--surface`, `--surface-elevated`, `--surface-hover` (surface levels)
- `--gold`, `--gold-light`, `--gold-dark`, `--gold-glow`, `--gold-subtle`, `--gold-border` (gold system)
- `--text-primary`, `--text-secondary`, `--text-muted` (text colors)
- `--border`, `--border-light` (borders)
- `--success`, `--warning`, `--error`, `--info` (semantic)
- `--font-cairo`, `--font-poppins`, `--font-playfair` (font families)
- `--font-size-*` (0.75rem through 4rem)
- `--space-*` (0px through 128px on 4px grid)
- `--radius-*` (4px through 24px + full)
- `--shadow-*` (sm, md, lg, xl + gold-glow)
- `--z-*` (dropdown, modal, toast, etc.)
- `--transition-*` (fast, base, slow)
- `--gradient-gold`

**Definition of done:**
- `npm run build` in `packages/design-tokens` produces `dist/` with `index.js`, `index.d.ts`, `index.css`
- All 200+ CSS variables are exported
- JS/TS exports are typed
- Running `pnpm build --filter=@egypthub/design-tokens` passes

**Test requirements:**
- Unit test verifying all JS exports match expected values
- Unit test verifying all CSS variable names use kebab-case convention
- Snapshot test of `variables.css` content

---

### Task A2: Tailwind v4 @theme Block

**Exact files:**
- `packages/ui/tailwind.css` (shared Tailwind preset)
- `packages/ui/package.json` (add `tailwindcss` dependency)

**Dependencies:** A1 (CSS custom properties)

**Acceptance criteria:**
1. `@theme` block maps ALL CSS variables to Tailwind utility classes
2. Color utilities: `bg-gold`, `text-gold`, `border-gold`, `bg-surface`, `text-primary`, etc.
3. Font utilities: `font-cairo`, `font-poppins`, `font-playfair`
4. Radius utilities: `rounded-sm` through `rounded-3xl`
5. Shadow utilities: `shadow-sm` through `shadow-gold`
6. Animation utilities: `animate-fade-in`, `animate-slide-up`, `animate-glow-pulse`
7. Preset is consumable by all apps via `@import "./tailwind.css"`

**Definition of done:**
- A test app imports the preset and all utility classes resolve in dev tools
- Both `bg-gold` and `text-gold` render the correct hex value
- `className="bg-surface text-gold rounded-xl shadow-gold"` produces styled output

**Test requirements:**
- Snapshot test of generated CSS output
- Visual regression test: 12 key utility classes render expected colors

---

### Task A3: Font Configuration

**Exact files:**
- `packages/design-tokens/src/css/variables.css` (add font-family variables)
- `packages/design-tokens/src/tokens/typography.ts` (font family exports)

**Dependencies:** None

**Acceptance criteria:**
1. Three fonts configured: Cairo (Arabic), Poppins (English), Playfair Display (display)
2. Font weights: Cairo 300-900, Poppins 300-700, Playfair Display 400-700
3. Font is loaded via `next/font` in each app's root layout (not in the package)
4. CSS variables `--font-cairo`, `--font-poppins`, `--font-playfair` are set
5. `font-arabic` utility resolves to Cairo, `font-english` to Poppins

**Definition of done:**
- A test page renders Arabic text in Cairo and English text in Poppins
- Google Fonts or local font files load correctly
- Font swap behavior (FOUT mitigation) is configured

**Test requirements:**
- Visual test: Arabic text renders with Cairo, English with Poppins
- No layout shift when fonts load

---

### Task A4: Shadcn UI Installation

**Exact files:**
- `packages/ui/package.json` (add Shadcn deps: `@radix-ui/*`, `lucide-react`, `class-variance-authority`)
- `packages/ui/src/primitives/button.tsx`
- `packages/ui/src/primitives/card.tsx`
- `packages/ui/src/primitives/dialog.tsx`
- `packages/ui/src/primitives/dropdown-menu.tsx`
- `packages/ui/src/primitives/input.tsx`
- `packages/ui/src/primitives/label.tsx`
- `packages/ui/src/primitives/select.tsx`
- `packages/ui/src/primitives/separator.tsx`
- `packages/ui/src/primitives/sheet.tsx`
- `packages/ui/src/primitives/toast.tsx`
- `packages/ui/src/primitives/toaster.tsx`
- `packages/ui/src/primitives/tooltip.tsx`
- `packages/ui/src/primitives/avatar.tsx`
- `packages/ui/src/primitives/badge.tsx`
- `packages/ui/src/primitives/skeleton.tsx`
- `packages/ui/src/primitives/switch.tsx`
- `packages/ui/src/primitives/checkbox.tsx`
- `packages/ui/src/primitives/radio-group.tsx`
- `packages/ui/src/primitives/progress.tsx`
- `packages/ui/src/primitives/tabs.tsx`
- `packages/ui/src/primitives/pagination.tsx`
- `packages/ui/src/primitives/breadcrumb.tsx`
- `packages/ui/src/primitives/command.tsx`
- `packages/ui/src/primitives/form.tsx`
- `packages/ui/src/primitives/popover.tsx`

**Dependencies:** A2 (Tailwind theme)

**Acceptance criteria:**
1. 24 Shadcn component primitives are installed into `packages/ui/src/primitives/`
2. Each primitive uses `cn()` for class merging
3. All primitives reference CSS variables from the design tokens (not hardcoded colors)
4. Primitives are **internal** — they are not exported publicly; they are building blocks for `@egypthub/ui` components

**Definition of done:**
- All 24 `.tsx` files exist in `primitives/`
- Each file compiles without TypeScript errors
- All primitives use Tailwind classes that resolve from the token system

**Test requirements:**
- TypeScript compilation passes for all 24 primitives
- No type errors

---

### Task A5: Shadcn Theme Override

**Exact files:**
- `packages/ui/src/primitives/button.tsx` (modify default variants)
- `packages/ui/src/primitives/card.tsx` (modify default styling)
- `packages/ui/src/primitives/dialog.tsx` (modify overlay + content styling)
- `packages/ui/src/primitives/sheet.tsx` (modify side panel styling)
- `packages/ui/src/primitives/toast.tsx` (modify color scheme)
- `packages/ui/src/primitives/tooltip.tsx` (modify dark bg)
- `packages/ui/src/primitives/avatar.tsx` (modify fallback styling)
- `packages/ui/src/primitives/badge.tsx` (modify color variants)
- `packages/ui/src/primitives/skeleton.tsx` (modify bg color)
- `packages/ui/src/primitives/input.tsx` (modify dark bg, gold focus)

**Dependencies:** A1, A4

**Acceptance criteria:**
1. All Shadcn primitives use EgyptHub CSS variables instead of default Tailwind colors
2. Primary color references use `--gold` or `--surface` instead of Tailwind defaults
3. Dark theme is the default (no light mode overrides)
4. All overrides are done inline in the primitive files (not in a separate theme file)

**Definition of done:**
- Button renders with gold gradient background
- Card renders with surface background and rounded-xl
- Dialog renders with dark overlay and surface-elevated content
- Input renders with dark background and gold focus ring
- All components match the DESIGN_SYSTEM.md token values

**Test requirements:**
- Visual inspection of each primitive renders with correct colors
- All primitives use CSS variables (no hardcoded hex values in JSX)

---

### Task A6: Global Base Styles

**Exact files:**
- `packages/design-tokens/src/css/variables.css`
- `packages/ui/src/globals.css` (base CSS file consumed by all apps)

**Dependencies:** A1, A3

**Acceptance criteria:**
1. CSS reset: `box-sizing: border-box`, margin/padding zero on `*`
2. `html { scroll-behavior: smooth }`, `body { background: var(--bg-primary); color: var(--text-primary); direction: rtl }`
3. Scrollbar styling: 6px width, gold thumb, dark track
4. Gold glow utility class (`.glow-gold`)
5. Selection color: gold background on text selection

**Definition of done:**
- Importing `globals.css` into any Next.js app applies the base styles
- Scrollbar renders with gold thumb on dark background
- Gold glow class applies visible gold radial gradient

**Test requirements:**
- Visual test: base styles apply to test page
- CSS validation: no invalid properties

---

### Task A7: RTL Base Styles

**Exact files:**
- `packages/design-tokens/src/css/variables.css`

**Dependencies:** A1, A6

**Acceptance criteria:**
1. HTML tag attributes `lang="ar"` and `dir="rtl"` are configured at the root layout level (not in CSS)
2. CSS uses logical properties (`margin-inline-start`, `padding-inline-end`, `inset-inline-end`) instead of directional (`margin-left`, `padding-right`, `right`)
3. All components must use logical properties to automatically flip in RTL
4. Text alignment defaults to `right` for RTL, `left` for LTR

**Definition of done:**
- A component with `padding-inline-end: 16px` renders padding on the left in RTL mode
- No hardcoded `left` or `right` CSS values exist in the component library

**Test requirements:**
- No directional properties (`left`, `right`, `margin-left`, etc.) in any component CSS
- All spacing uses `margin-inline` / `padding-inline` variants

---

### Task A8: `cn` Utility

**Exact files:**
- `packages/ui/src/utils/cn.ts`
- `packages/ui/src/utils/cn.test.ts`

**Dependencies:** A2

**Acceptance criteria:**
1. Merges Tailwind classes correctly (last class wins for conflicts)
2. Handles conditional classes (string, object, array, falsy values)
3. Handles Tailwind class conflicts (e.g., `px-4 px-6` → `px-6`)
4. Importable as `import { cn } from '@egypthub/ui'`

**Definition of done:**
- `cn('px-4', 'px-6')` returns `'px-6'`
- `cn('text-red', false && 'text-blue')` returns `'text-red'`
- `cn(['p-4', 'm-2'])` returns `'p-4 m-2'`

**Test requirements:**
- Unit tests covering: string args, object args, array args, falsy filtering, conflict resolution (tailwind-merge), empty args

---

### Task A9-A14: Supporting Setup Tasks

**Exact files:**
- `packages/design-tokens/src/css/variables.css` (reduced motion)
- `packages/ui/src/hooks/useBreakpoint.ts`
- `packages/ui/src/hooks/useMediaQuery.ts`
- `packages/ui/src/hooks/useReducedMotion.ts`
- `packages/ui/src/utils/portal.ts`
- `packages/ui/src/utils/format-currency.ts`
- `packages/ui/src/utils/format-date.ts`
- `packages/ui/src/components/Icon/`
- `packages/ui/src/components/EgyptianIcons/`

**Dependencies:** A2, A8

**Acceptance criteria:**
1. **A9 Reduced Motion:** `prefers-reduced-motion: reduce` disables all animations
2. **A10 Breakpoints:** JS constants export `breakpoints` object matching Tailwind v4 breakpoints
3. **A11 Z-Index:** JS constants export `zIndex` object with named z-index values
4. **A12 Portal:** Wraps `createPortal` with SSR-safe rendering
5. **A13 Icons:** 7 Egyptian SVG icons (Pyramid, Compass, Star, Sun, Wave, Palm, Lotus) + `Icon` component wrapping `lucide-react`
6. **A14 Keyframes:** CSS `@keyframes` for glow-pulse, float, fade-in, slide-up, scale-in
7. **A15 Dark Mode:** `data-theme="dark"` attribute set on `<html>`, no light mode support

**Definition of done:**
- All hooks compile with TypeScript strict mode
- All icons render correctly at multiple sizes
- Portal renders children into `document.body` on the client
- `prefers-reduced-motion` disables all animations
- Dark mode is the sole theme with no light mode code path

---

## Day 3-4: Supporting Infrastructure

### Task S1: Package Configuration

**Exact files:**
- `packages/ui/package.json`
- `packages/ui/tsconfig.json`
- `packages/ui/vitest.config.ts`
- `packages/ui/tailwind.css`

**Dependencies:** Phase A

**Acceptance criteria:**
1. `package.json` defines `@egypthub/ui` with proper exports (main, module, types, style)
2. `tsconfig.json` extends the base and sets JSX to preserve
3. `vitest.config.ts` configures React testing library + jsdom
4. `tailwind.css` imports globals and defines the @theme preset
5. Package builds with `tsup` — ESM + CJS + CSS outputs
6. All dependencies declared: react, react-dom, clsx, tailwind-merge, framer-motion, lucide-react, @radix-ui/*

**Exports map (package.json):**
```json
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./globals.css": "./dist/globals.css",
    "./tailwind.css": "./dist/tailwind.css"
  }
}
```

**Definition of done:**
- `pnpm build --filter=@egypthub/ui` produces `dist/` with all exports
- A test app can `import { Button } from '@egypthub/ui'` with no errors

---

### Task S2: Shared Hooks

**Exact files:**
- `packages/ui/src/hooks/useClickOutside.ts`
- `packages/ui/src/hooks/useLockedBody.ts`
- `packages/ui/src/hooks/useBreakpoint.ts`
- `packages/ui/src/hooks/useMediaQuery.ts`
- `packages/ui/src/hooks/useDebounce.ts`
- `packages/ui/src/hooks/useScrollPosition.ts`
- `packages/ui/src/hooks/useReducedMotion.ts`

**Dependencies:** None

**Acceptance criteria:**
1. `useClickOutside(ref, handler)` — calls handler when click is outside ref element
2. `useLockedBody(locked)` — prevents body scroll when `locked` is true
3. `useBreakpoint()` — returns current breakpoint name (xs, sm, md, lg, xl, 2xl)
4. `useMediaQuery(query)` — returns boolean for CSS media query match
5. `useDebounce(value, delay)` — returns debounced value
6. `useScrollPosition()` — returns `{ x, y }` current scroll position
7. `useReducedMotion()` — returns boolean for prefers-reduced-motion

**Definition of done:**
- All hooks are exported from `packages/ui/src/index.ts`
- All hooks are typed with TypeScript generics where applicable
- All hooks handle SSR gracefully (no `window` access during server render)

**Test requirements:**
- `useDebounce` — value updates after delay, not before
- `useClickOutside` — callback fires on outside click, not on inside click
- `useReducedMotion` — returns correct boolean based on media query
- `useLockedBody` — body overflow is hidden when locked, restored when unlocked

---

### Task S3: Portal Utility

**Exact files:**
- `packages/ui/src/utils/portal.ts`

**Dependencies:** None

**Acceptance criteria:**
1. `Portal({ children, container? })` — renders children into `document.body` (or custom container) via `createPortal`
2. SSR-safe — returns null during server rendering
3. Supports custom container element via `container` prop
4. Used by Modal, Drawer, Tooltip, Toast

**Definition of done:**
- In browser, children render in `document.body`
- During SSR, nothing renders (no errors)
- Custom container targets the specified element

**Test requirements:**
- DOM test: children appear in `document.body`
- SSR test: no errors during server render

---

### Task S4: Icon System

**Exact files:**
- `packages/ui/src/components/Icon/Icon.tsx`
- `packages/ui/src/components/Icon/Icon.types.ts`
- `packages/ui/src/components/Icon/index.ts`
- `packages/ui/src/components/EgyptianIcons/EgyptianIcons.tsx`
- `packages/ui/src/components/EgyptianIcons/index.ts`

**Dependencies:** None

**Acceptance criteria:**
1. `Icon` component wraps `lucide-react` with size variants (xs-2xl) and color variants (default, gold, success, error, muted)
2. `Icon` accepts `name` prop for any `lucide-react` icon name
3. Egyptian icons exported individually: `PyramidIcon`, `CompassIcon`, `StarIcon`, `SunIcon`, `WaveIcon`, `PalmIcon`, `LotusIcon`
4. All icons accept `size`, `className`, and standard SVG props
5. All icons use `currentColor` for inheritance

**Definition of done:**
- `<Icon name="Search" />` renders a search icon at default size
- `<PyramidIcon size="lg" className="text-gold" />` renders a gold pyramid
- All 7 Egyptian icons render correctly

**Test requirements:**
- Snapshot test for each Egyptian icon
- `Icon` renders with correct size prop
- `Icon` applies color from parent CSS class
- All icons accept spread props

---

## Day 5-6: Core Components — Part 1

### Task C1: Button

**Exact files:**
- `packages/ui/src/components/Button/Button.tsx`
- `packages/ui/src/components/Button/Button.types.ts`
- `packages/ui/src/components/Button/Button.test.tsx`
- `packages/ui/src/components/Button/index.ts`

**Dependencies:** A8 (cn), A5 (Shadcn button primitive), B16 (Icon)

**Acceptance criteria:**

**Variants:**
1. `primary` — gold gradient background (`#D4A24C` → `#E8C97A`), dark text (`#0A0E17`), gold glow shadow on hover
2. `secondary` — transparent background, gold border (1px solid `#D4A24C`), gold text, gold-subtle bg on hover
3. `ghost` — transparent, muted text, surface-hover bg on hover
4. `danger` — red background (`#EF4444`), white text, darker red on hover
5. `icon` — square, rounded-full, surface bg, gold icon on hover

**Sizes:**
1. `sm` — 32px height, 12px/16px padding, 14px font
2. `md` — 40px height, 12px/24px padding, 16px font
3. `lg` — 48px height, 16px/32px padding, 18px font

**States:**
1. `default` — as designed per variant
2. `hover` — scale 1.02, shadow change (gold glow for primary), bg change for secondary/ghost
3. `active` — slight scale down (0.98), darker variant
4. `disabled` — opacity 0.5, cursor not-allowed, no hover effects
5. `loading` — spinner replaces children text, disabled state, no hover

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}
```

**Accessibility:**
1. Proper `role="button"` when not using `<button>` element
2. `aria-disabled` when disabled
3. `aria-busy` when loading
4. Minimum 44px touch target on mobile (already satisfied by all sizes)
5. Focus visible ring (gold, 2px offset)

**Definition of done:**
- All 5 variants render correctly with distinct visual styles
- All 3 sizes render at correct dimensions
- All states (default, hover, active, disabled, loading) work
- Loading state shows spinner and disables interaction
- TypeScript strict compilation passes
- All tests pass

**Test requirements:**
- Renders with correct variant class
- Renders with correct size class
- Loading state renders spinner, disables button
- Disabled state prevents click
- Icon variants render with icon only
- `onClick` fires on click
- `onClick` does NOT fire when disabled or loading
- Accessible labels are present
- RTL: icon positions are mirrored (leftIcon appears on right in RTL)

---

### Task C2: Input

**Exact files:**
- `packages/ui/src/components/Input/Input.tsx`
- `packages/ui/src/components/Input/Input.types.ts`
- `packages/ui/src/components/Input/Input.test.tsx`
- `packages/ui/src/components/Input/index.ts`

**Dependencies:** A8 (cn), A5 (Shadcn input primitive), B16 (Icon)

**Acceptance criteria:**

**Variants:**
1. `default` — dark background (`--surface`), gold focus ring (2px solid `--gold`), muted placeholder
2. `with-icon` — icon on the left (right in RTL), padded input text
3. `with-suffix` — text/element suffix on the right (left in RTL), e.g., currency, unit
4. `error` — red border (`--error`), red focus ring, error text below

**Sizes:**
1. `sm` — 32px height, 12px/12px padding, 14px font
2. `md` — 40px height, 12px/16px padding, 16px font
3. `lg` — 48px height, 16px/20px padding, 18px font

**States:**
1. `default` — border `--border`, bg `--surface`, text `--text-primary`
2. `focus` — border `--gold`, ring 2px `--gold` with 30% opacity, bg unchanged
3. `hover` — border `--border-light`
4. `disabled` — opacity 0.5, cursor not-allowed, bg `--bg-primary`
5. `error` — border `--error`, ring 2px `--error` with 30% opacity
6. `filled` — same as default but with content

**Props:**
```typescript
interface InputProps {
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  suffix?: string;
  isError?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
```

**Accessibility:**
1. Label is associated with input via `htmlFor`/`id`
2. Error message uses `aria-describedby`
3. Required inputs have `aria-required`
4. Focus visible ring is present and high contrast

**Definition of done:**
- All 3 sizes render correctly
- All states (default, focus, hover, disabled, error) work
- Icon variants render icon inside input
- Error state shows red border + error message below
- TypeScript strict compilation passes
- All tests pass

**Test requirements:**
- Renders with correct size class
- Renders with correct variant class
- Error state renders error message below input
- Disabled state prevents input
- Left/right icon renders in correct position
- onChange fires on value change
- RTL: icon positions are mirrored

---

### Task C3: Textarea

**Exact files:**
- `packages/ui/src/components/Textarea/Textarea.tsx`
- `packages/ui/src/components/Textarea/Textarea.types.ts`
- `packages/ui/src/components/Textarea/Textarea.test.tsx`
- `packages/ui/src/components/Textarea/index.ts`

**Dependencies:** A8 (cn), A5 (Shadcn input primitive extended)

**Acceptance criteria:**

**Features:**
1. Dark background (`--surface`), gold focus ring, same visual style as Input
2. Auto-resize (grows with content up to maxRows)
3. Character count display (optional, via `maxLength` prop)
4. Error state with red border + error message
5. Resize handle in bottom-right corner (visible on hover)

**Sizes:**
1. `sm` — 3 rows default
2. `md` — 4 rows default
3. `lg` — 6 rows default

**States:** Same as Input (default, focus, hover, disabled, error, filled)

**Props:**
```typescript
interface TextareaProps {
  size?: 'sm' | 'md' | 'lg';
  rows?: number;
  maxRows?: number;
  maxLength?: number;
  showCount?: boolean;
  isError?: boolean;
  errorMessage?: string;
  label?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
```

**Definition of done:**
- Textarea renders with correct styling matching Input component
- Auto-resize grows up to maxRows then scrolls
- Character count displays `{current}/{maxLength}` when showCount is true
- Error state shows red border + message
- All tests pass

**Test requirements:**
- Renders with correct size
- Auto-resize expands with content
- Character count displays correctly
- Error state renders error message
- onChange fires on value change
- maxRows limits growth and shows scrollbar

---

### Task C4: Card

**Exact files:**
- `packages/ui/src/components/Card/Card.tsx`
- `packages/ui/src/components/Card/CardHeader.tsx`
- `packages/ui/src/components/Card/CardContent.tsx`
- `packages/ui/src/components/Card/CardFooter.tsx`
- `packages/ui/src/components/Card/Card.types.ts`
- `packages/ui/src/components/Card/Card.test.tsx`
- `packages/ui/src/components/Card/index.ts`

**Dependencies:** A8 (cn), A5 (Shadcn card primitive)

**Acceptance criteria:**

**Variants:**
1. `default` — surface bg (`--surface`), 1px border `--border`, rounded-xl (16px), shadow-sm
2. `hover` — same as default + on hover: translateY(-4px), gold border (1px `--gold-border`), shadow-gold, transition 250ms ease-out
3. `featured` — surface-elevated bg (`--surface-elevated`), 1px border `--gold`, rounded-2xl (20px), shadow-gold-lg
4. `glass` — semi-transparent bg (`rgba(15,20,32,0.8)`), backdrop-blur, border `rgba(255,255,255,0.08)`

**Sub-components:**
1. `CardHeader` — padding 24px, bottom border, title + subtitle + action slot
2. `CardContent` — padding 24px, flex-1 for vertical fill
3. `CardFooter` — padding 24px, top border, flex row with justify-end

**Props:**
```typescript
interface CardProps {
  variant?: 'default' | 'featured' | 'glass';
  isHoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  onClick?: () => void;
}
```

**Definition of done:**
- All 4 variants render with distinct visual styles
- Hoverable variant animates on hover (translate + shadow)
- CardHeader, CardContent, CardFooter render correctly as children
- Sub-components have proper spacing and borders
- All tests pass

**Test requirements:**
- Renders with correct variant class
- Hoverable variant shows hover styles (test with CSS class presence)
- CardHeader renders title
- CardContent renders children
- CardFooter renders children with right alignment
- onClick works when provided
- Card is keyboard accessible (tabIndex + Enter key) when onClick is set

---

### Task C5: Badge

**Exact files:**
- `packages/ui/src/components/Badge/Badge.tsx`
- `packages/ui/src/components/Badge/Badge.types.ts`
- `packages/ui/src/components/Badge/Badge.test.tsx`
- `packages/ui/src/components/Badge/index.ts`

**Dependencies:** A8 (cn), A5 (Shadcn badge primitive)

**Acceptance criteria:**

**Colors:**
1. `gold` — bg `--gold`, text `--text-inverse`
2. `success` — bg `--success` (10B981), text white
3. `error` — bg `--error` (EF4444), text white
4. `warning` — bg `--warning` (F59E0B), text white
5. `info` — bg `--info` (3B82F6), text white
6. `neutral` — bg `--surface`, text `--text-secondary`, border `--border`

**Variants:**
1. `default` — rounded-full, medium weight text, 8px/12px padding
2. `dot` — 8px circle, no text, colored by variant
3. `outline` — transparent bg, 1px border in variant color, text in variant color
4. `count` — larger pill shape for notification counts, gold bg

**Sizes:**
1. `sm` — 18px height, 10px font
2. `md` — 22px height, 12px font
3. `lg` — 26px height, 14px font

**Props:**
```typescript
interface BadgeProps {
  variant?: 'default' | 'dot' | 'outline' | 'count';
  color?: 'gold' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}
```

**Definition of done:**
- All 6 color variants render with correct colors
- All 4 variant types (default, dot, outline, count) render correctly
- All 3 sizes render at correct dimensions
- Dot variant shows only a colored circle
- All tests pass

**Test requirements:**
- Renders with correct color class
- Renders with correct variant class
- Dot variant has no children, only a circle
- Count variant has larger pill shape
- Outline variant has border + transparent bg

---

### Task C6: Avatar

**Exact files:**
- `packages/ui/src/components/Avatar/Avatar.tsx`
- `packages/ui/src/components/Avatar/Avatar.types.ts`
- `packages/ui/src/components/Avatar/Avatar.test.tsx`
- `packages/ui/src/components/Avatar/AvatarGroup.tsx`
- `packages/ui/src/components/Avatar/index.ts`

**Dependencies:** A8 (cn), A5 (Shadcn avatar primitive)

**Acceptance criteria:**

**Sizes:**
1. `xs` — 24px
2. `sm` — 32px
3. `md` — 40px
4. `lg` — 56px
5. `xl` — 80px
6. `2xl` — 120px

**Features:**
1. Image display with fallback to initials (first character of name)
2. Status indicator dot (positioned bottom-right of avatar)
3. Status colors: `online` (`--success`), `offline` (`--text-muted`), `away` (`--warning`)
4. Gold ring variant for premium users (`ring` prop)
5. Clickable variant when `onClick` provided

**Initials fallback logic:**
- If `name` prop is provided and no `src`, render first character of name
- If `name` is Arabic, render first Arabic letter
- Background color: surface-elevated
- Text color: gold (for the initial)

**Props:**
```typescript
interface AvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  src?: string;
  name?: string;          // For initials fallback
  alt?: string;           // Image alt text
  status?: 'online' | 'offline' | 'away';
  isPremium?: boolean;    // Gold ring
  onClick?: () => void;
}
```

**Accessibility:**
1. `alt` text on image
2. Status indicator has `aria-label` ("Online", "Offline", "Away")
3. Clickable avatar has `role="button"` and keyboard support

**Definition of done:**
- All 6 sizes render at correct pixel dimensions
- Image renders when `src` is provided
- Initials render when `src` is not provided
- Status dot renders in correct color and position
- Gold ring renders when `isPremium` is true
- AvatarGroup renders overlapping avatars with overflow count
- All tests pass

**Test requirements:**
- Renders with correct size class
- Image renders with correct src and alt
- Initial fallback renders when no src
- Status dot renders with correct color
- Gold ring renders when isPremium is true
- AvatarGroup renders overlapping avatars
- AvatarGroup shows +N overflow count

---

## Day 7-8: Core Components — Part 2

### Task C7: Modal

**Exact files:**
- `packages/ui/src/components/Modal/Modal.tsx`
- `packages/ui/src/components/Modal/Modal.types.ts`
- `packages/ui/src/components/Modal/Modal.test.tsx`
- `packages/ui/src/components/Modal/index.ts`

**Dependencies:** A8 (cn), A5 (Shadcn dialog primitive), S3 (Portal), S2 (useLockedBody), B16 (Icon)

**Acceptance criteria:**

**Sizes:**
1. `sm` — max-width 400px
2. `md` — max-width 560px
3. `lg` — max-width 720px
4. `full` — max-width 90vw, max-height 90vh, rounded-2xl
5. `fullscreen` — 100vw × 100vh, no rounded corners, no margin

**Features:**
1. Dark backdrop (`rgba(0,0,0,0.7)`) with backdrop-blur-sm
2. Surface-elevated bg (`--surface-elevated`), rounded-2xl, shadow-xl
3. Close button (gold X icon) in top-right corner
4. Title + optional description in header
5. Scrollable body content
6. Footer with action buttons (slot)
7. Focus trap — Tab/Shift+Tab cycles within modal
8. Escape key closes modal
9. Click outside backdrop closes modal (configurable via `dismissable` prop)
10. Body scroll lock when open
11. Enter/exit animation: backdrop fades, modal scales (0.95 → 1)

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'full' | 'fullscreen';
  title?: string;
  description?: string;
  isDismissable?: boolean;
  showCloseButton?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}
```

**Accessibility:**
1. `role="dialog"` with `aria-modal="true"`
2. `aria-labelledby` pointing to title
3. `aria-describedby` pointing to description
4. Focus trap — Tab stays within modal
5. Escape key closes
6. Focus returns to trigger element on close

**Definition of done:**
- All 5 sizes render with correct dimensions
- Backdrop covers full viewport
- Close button triggers onClose
- Escape key triggers onClose
- Click outside triggers onClose (when dismissable)
- Body scroll is locked when open
- Focus is trapped inside modal
- Animation plays on open/close
- All tests pass

**Test requirements:**
- Renders when isOpen is true
- Does not render when isOpen is false
- onClose fires on close button click
- onClose fires on Escape key
- onClose fires on backdrop click (when dismissable)
- Body overflow is hidden when open
- Focus is trapped (Tab cycles within modal)
- Focus returns to trigger on close

---

### Task C8: Drawer

**Exact files:**
- `packages/ui/src/components/Drawer/Drawer.tsx`
- `packages/ui/src/components/Drawer/Drawer.types.ts`
- `packages/ui/src/components/Drawer/Drawer.test.tsx`
- `packages/ui/src/components/Drawer/index.ts`

**Dependencies:** A8 (cn), A5 (Shadcn sheet primitive), S3 (Portal), S2 (useLockedBody), B16 (Icon)

**Acceptance criteria:**

**Positions:**
1. `right` — slides in from right (default, for RTL consistency)
2. `left` — slides in from left
3. `bottom` — bottom sheet (mobile preferred)

**Sizes:**
1. `sm` — max-width 320px (right/left) or max-height 30vh (bottom)
2. `md` — max-width 400px or max-height 50vh
3. `lg` — max-width 560px or max-height 75vh
4. `full` — full width/height

**Features:**
1. Dark backdrop (`rgba(0,0,0,0.5)`)
2. Surface-elevated bg, shadow-xl
3. Close button in header
4. Title + description in header
5. Scrollable body
6. Bottom sheet has drag handle (8px wide rounded bar at top)
7. Bottom sheet supports drag to dismiss (drag down)
8. Escape key closes
9. Click outside backdrop closes (configurable)
10. Body scroll lock when open
11. Slide animation on enter/exit (300ms ease-out)

**Props:**
```typescript
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'right' | 'left' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'full';
  title?: string;
  description?: string;
  isDismissable?: boolean;
  showCloseButton?: boolean;
  children?: React.ReactNode;
}
```

**Accessibility:** Same as Modal (role="dialog", aria-modal, focus trap, escape)

**Definition of done:**
- All 3 positions render with slide-in animation from correct direction
- All 4 sizes render with correct dimensions
- Close button, escape key, backdrop click all trigger onClose
- Bottom sheet has drag handle and supports drag dismiss
- Body scroll is locked
- Focus is trapped
- All tests pass

**Test requirements:**
- Renders when isOpen is true
- Position determines slide direction
- onClose fires on close button, escape, backdrop click
- Drag handle is present for bottom position
- Drag to dismiss works (simulated drag)
- Body overflow is hidden when open
- Focus trap works

---

### Task C9: Tooltip

**Exact files:**
- `packages/ui/src/components/Tooltip/Tooltip.tsx`
- `packages/ui/src/components/Tooltip/Tooltip.types.ts`
- `packages/ui/src/components/Tooltip/Tooltip.test.tsx`
- `packages/ui/src/components/Tooltip/index.ts`

**Dependencies:** A8 (cn), A5 (Shadcn tooltip primitive), S3 (Portal)

**Acceptance criteria:**

**Positions:**
1. `top` (default) — above the trigger, centered
2. `bottom` — below the trigger, centered
3. `left` — left of the trigger, centered vertically
4. `right` — right of the trigger, centered vertically

**Variants:**
1. `default` — dark bg (`--bg-primary`), white text, small rounded-md
2. `rich` — with title, description, optional icon

**Features:**
1. Shows on hover (300ms delay) or focus
2. Hides on mouse leave or blur (100ms delay)
3. Arrow pointing to trigger element
4. Max-width: 280px
5. 8px gap from trigger element
6. Smart positioning — flips if tooltip would overflow viewport

**Props:**
```typescript
interface TooltipProps {
  content: React.ReactNode;     // Tooltip content
  position?: 'top' | 'bottom' | 'left' | 'right';
  variant?: 'default' | 'rich';
  delay?: number;               // Show delay (default: 300ms)
  children: React.ReactNode;    // Trigger element
  maxWidth?: number;
}
```

**Accessibility:**
1. Tooltip content is associated via `aria-describedby`
2. Tooltip is reachable via keyboard focus on trigger
3. Tooltip can be dismissed with Escape key

**Definition of done:**
- All 4 positions render correctly positioned relative to trigger
- Tooltip shows on hover after delay
- Tooltip hides on mouse leave
- Arrow points toward trigger
- Smart positioning prevents overflow
- Rich variant shows title + description
- All tests pass

**Test requirements:**
- Tooltip is hidden by default
- Tooltip shows on hover after delay
- Tooltip hides on mouse leave
- Tooltip renders at correct position relative to trigger
- Arrow is present and points toward trigger
- Rich variant renders with icon + title + description

---

### Task C10: Toast

**Exact files:**
- `packages/ui/src/components/Toast/Toast.tsx`
- `packages/ui/src/components/Toast/Toast.types.ts`
- `packages/ui/src/components/Toast/ToastProvider.tsx`
- `packages/ui/src/components/Toast/useToast.ts`
- `packages/ui/src/components/Toast/Toast.test.tsx`
- `packages/ui/src/components/Toast/index.ts`

**Dependencies:** A8 (cn), A5 (Shadcn toast + toaster primitives), S3 (Portal), B16 (Icon), S2 (useReducedMotion)

**Acceptance criteria:**

**Types:**
1. `success` — green left border, checkmark icon
2. `error` — red left border, X icon
3. `warning` — yellow left border, warning icon
4. `info` — blue left border, info icon

**Features:**
1. Auto-dismiss (configurable duration, default: 5000ms for error, 3000ms for others)
2. Manual dismiss via close button
3. Multiple toasts stack vertically
4. Progress bar showing remaining time before auto-dismiss
5. Action button (optional, e.g., "Undo")
6. Title + description (description optional)
7. Position: top-right (desktop), top-center (mobile)
8. Max visible: 5 toasts, older toasts pushed off-screen
9. Enter animation: slide in from right (desktop) or top (mobile)
10. Exit animation: slide out to right + fade

**Toast API:**
```typescript
interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;           // Auto-dismiss ms, null = persistent
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

**Hook API:**
```typescript
function useToast() {
  return {
    toast: (data: Omit<Toast, 'id'>) => string;   // Returns toast id
    dismiss: (id: string) => void;
    dismissAll: () => void;
    update: (id: string, data: Partial<Toast>) => void;
  };
}
```

**Accessibility:**
1. `role="alert"` on each toast
2. `aria-live="polite"` on toast container
3. Announcements read by screen readers on toast appearance
4. Close button has `aria-label="Close notification"`
5. Action button is focusable and reachable via keyboard

**Definition of done:**
- All 4 types render with correct icon + colors
- Toast appears with slide-in animation
- Toast auto-dismisses after duration
- Toast can be manually dismissed via close button
- Multiple toasts stack with spacing
- Progress bar animates during auto-dismiss
- Action button renders and triggers callback
- Hook API works (toast, dismiss, dismissAll, update)
- All tests pass

**Test requirements:**
- Toast appears with correct type styling
- Toast auto-dismisses after duration
- Close button dismisses toast
- Multiple toasts stack vertically
- Action button fires onClick
- Hook returns working toast/dismiss/dismissAll functions
- With reduced motion, no animation plays

---

## Day 9: Core Components — Part 3

### Task C11: Skeleton

**Exact files:**
- `packages/ui/src/components/Skeleton/Skeleton.tsx`
- `packages/ui/src/components/Skeleton/Skeleton.types.ts`
- `packages/ui/src/components/Skeleton/Skeleton.test.tsx`
- `packages/ui/src/components/Skeleton/index.ts`

**Dependencies:** A8 (cn), A5 (Shadcn skeleton primitive), S2 (useReducedMotion)

**Acceptance criteria:**

**Variants:**
1. `text` — horizontal bar, configurable width (default 100%), height 16px
2. `text-sm` — 12px height, for captions / small text
3. `heading` — 28px height, 60% width, for h1-h3 placeholders
4. `circle` — perfect circle, configurable size (default 40px)
5. `card` — full card shape with rounded corners, 200px height
6. `image` — 4:3 aspect ratio placeholder
7. `table` — table-like: header row + 5 body rows with 4 columns
8. `button` — 120px × 40px button shape

**Features:**
1. Pulse animation (opacity 0.3 → 0.6 → 0.3, 1.5s duration)
2. Surface-elevated bg (`--surface-elevated`)
3. Rounded corners matching the element being skeletonized
4. No animation when `prefers-reduced-motion` is enabled (static opacity)
5. Composable — multiple skeletons can be stacked for complex layouts

**Props:**
```typescript
interface SkeletonProps {
  variant?: 'text' | 'text-sm' | 'heading' | 'circle' | 'card' | 'image' | 'table' | 'button';
  width?: string | number;       // For text variants
  height?: string | number;      // For custom sizing
  className?: string;
}
```

**Composition helper:**
```typescript
// Example: Text block skeleton
<Skeleton variant="text" width="100%" />
<Skeleton variant="text" width="80%" />
<Skeleton variant="text" width="60%" />
```

**Definition of done:**
- All 8 variants render with correct shape and dimensions
- Pulse animation plays
- Animation is disabled when prefers-reduced-motion is active
- Skeleton can be composed into complex placeholder layouts
- All tests pass

**Test requirements:**
- Renders with correct variant class
- Text variant has correct height
- Circle variant is a perfect circle (equal width/height + rounded-full)
- Card variant has rounded-xl corners
- Image variant has 4:3 aspect ratio
- Animation class is present by default
- Animation class is absent when reduced motion is active
- Skeleton is not focusable (no tabIndex)

---

### Task C12: Spinner

**Exact files:**
- `packages/ui/src/components/Spinner/Spinner.tsx`
- `packages/ui/src/components/Spinner/Spinner.types.ts`
- `packages/ui/src/components/Spinner/Spinner.test.tsx`
- `packages/ui/src/components/Spinner/index.ts`

**Dependencies:** A8 (cn), A14 (animation keyframes)

**Acceptance criteria:**

**Sizes:**
1. `xs` — 16px, 2px stroke width
2. `sm` — 20px, 2px stroke
3. `md` — 24px, 2.5px stroke
4. `lg` — 32px, 3px stroke
5. `xl` — 48px, 3.5px stroke

**Colors:**
1. `gold` (default) — border `--gold`, border-top `transparent`
2. `white` — border `rgba(255,255,255,0.3)`, border-top `white`
3. `muted` — border `--text-muted`, border-top `--text-secondary`

**Features:**
1. CSS-only spinning border animation (no JS animation)
2. 600ms rotation duration, linear easing, infinite
3. Sits inline (no margins), suitable for buttons and containers
4. Centered variant with `isCentered` prop (block display, auto margins)

**Props:**
```typescript
interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'gold' | 'white' | 'muted';
  isCentered?: boolean;
  label?: string;       // Accessibility label (default: "Loading")
}
```

**Accessibility:**
1. `aria-busy="true"`
2. `role="status"`
3. Visually hidden text "Loading..." for screen readers (customizable via `label` prop)

**Definition of done:**
- All 5 sizes render at correct pixel dimensions
- All 3 color variants render with correct colors
- Spinner rotates continuously via CSS animation
- Centered variant centers horizontally
- All tests pass

**Test requirements:**
- Renders with correct size class
- Renders with correct color class
- Animation class is present
- isCentered adds centering class
- aria-busy and role="status" are present
- Visually hidden text is present in DOM

---

## Day 10: Integration & Quality Gate

### Task Q1: Package Integration Test

**Exact files:**
- `packages/ui/src/index.ts` (barrel export — verify all 12 components exported)
- `packages/ui/package.json` (verify exports map)

**Acceptance criteria:**
1. All 12 components are exported from `@egypthub/ui`:
   - `Button`, `Input`, `Textarea`, `Card`, `Badge`, `Avatar`, `Modal`, `Drawer`, `Tooltip`, `Toast`, `Skeleton`, `Spinner`
2. All supporting utilities and hooks are exported:
   - `cn`, `Portal`, `Icon`, `PyramidIcon`, `CompassIcon`, `StarIcon`, `SunIcon`, `WaveIcon`, `PalmIcon`, `LotusIcon`
   - `useClickOutside`, `useLockedBody`, `useBreakpoint`, `useMediaQuery`, `useDebounce`, `useScrollPosition`, `useReducedMotion`
3. All type definitions are exported

**Definition of done:**
- `import { Button, Input, Card, Modal, cn } from '@egypthub/ui'` compiles
- Tree-shaking works: importing only Button does not include Input in the bundle

---

### Task Q2: Visual Regression Tests

**Exact files:**
- `packages/ui/src/components/Button/__snapshots__/`
- `packages/ui/src/components/Card/__snapshots__/`
- (snapshots auto-generated by vitest)

**Acceptance criteria:**
1. Snapshot tests exist for all 12 components
2. Each component variant + state combination is snapshot-tested
3. Visual changes in future sprints will fail snapshots intentionally

**Snapshot coverage per component:**

| Component | Snapshots |
|-----------|-----------|
| Button | primary, secondary, ghost, danger, icon × sm/md/lg × enabled/disabled/loading = 45 snapshots |
| Input | default, with-icon, error × sm/md/lg × default/disabled/focus = 27 snapshots |
| Textarea | default, error, with-count × sm/md/lg = 12 snapshots |
| Card | default, featured, glass, hoverable = 4 snapshots |
| Badge | gold/success/error/warning/info/neutral × default/dot/outline = 18 snapshots |
| Avatar | xs-xl × with-image/initials/status/premium = 30 snapshots |
| Modal | sm/md/lg/full = 4 snapshots |
| Drawer | right/left/bottom = 3 snapshots |
| Tooltip | top/bottom/left/right = 4 snapshots |
| Toast | success/error/warning/info = 4 snapshots |
| Skeleton | text/text-sm/heading/circle/card/image/table/button = 8 snapshots |
| Spinner | sm/md/lg × gold/white/muted = 9 snapshots |

---

### Task Q3: Accessibility Audit

**Acceptance criteria:**
1. All 12 components pass axe-core automated accessibility tests
2. No violations for: color contrast, ARIA attributes, keyboard navigation, focus management
3. All interactive elements are reachable via keyboard (Tab navigation)
4. All focusable elements have visible focus indicators (gold ring)
5. Screen reader announcements work (aria-live regions, role attributes)

**Test requirements:**
- Automated a11y test per component (vitest + axe-core)
- Manual keyboard navigation test for Modal, Drawer, Toast (focus trap, escape)

---

### Task Q4: RTL Verification

**Acceptance criteria:**
1. All 12 components render correctly in RTL mode (`dir="rtl"`)
2. Icon positions are mirrored in Button, Input (leftIcon appears on right)
3. Drawer opens from right by default in RTL mode
4. Toast appears on left side in RTL mode (top-left instead of top-right)
5. Text alignment is right-aligned by default
6. All margins/paddings use logical CSS properties

**Test requirements:**
- Render each component with `dir="rtl"` on a wrapper div
- Verify visual symmetry: component looks correct in both LTR and RTL
- Verify no hardcoded directional CSS (left, right, margin-left, padding-right)

---

## Definition of Done (Sprint 1)

The sprint is complete when ALL of the following are true:

### Code Complete
- [ ] `packages/design-tokens` builds and exports all tokens
- [ ] `packages/ui` builds and exports all 12 components
- [ ] All TypeScript files compile with strict mode — zero type errors
- [ ] All 12 components have complete prop interfaces

### Quality
- [ ] Test suite passes: 100% of unit tests pass
- [ ] Test coverage ≥ 80% for all 12 components
- [ ] All components pass axe-core accessibility audit (zero violations)
- [ ] All components render correctly in RTL mode
- [ ] All components handle reduced motion correctly

### Integration
- [ ] A test app imports `@egypthub/ui` and renders all 12 components
- [ ] Components work in both Next.js (SSR) and plain React (CSR)
- [ ] All CSS variables resolve to correct values in browser
- [ ] Fonts load correctly (Cairo for Arabic, Poppins for English)

### Documentation
- [ ] Each component folder has an `index.ts` barrel export
- [ ] Variants, sizes, and states are documented in component files
- [ ] Example usage is documented in component JSDoc comments

---

## Dependency Graph for Sprint 1

```
Day 1-2 (Phase A)
  A1 → A2 → A4 → A5
  A1 → A6 → A7 → A9 → A14
  A3 → A6
  A10 → A11

Day 3-4 (Infrastructure)
  A2 → A8
  A8 → S1 (package config)
  S1 → S2, S3, S4 (hooks, portal, icons)

Day 5-6 (Part 1)
  A8 + S1 → C1 (Button)
  A8 + S1 → C2 (Input)
  A8 + S1 → C3 (Textarea)
  A8 + S1 → C4 (Card)
  A8 + S1 → C5 (Badge)
  A8 + S1 → C6 (Avatar)

Day 7-8 (Part 2)
  A8 + S1 + S2 + S3 → C7 (Modal)
  A8 + S1 + S2 + S3 → C8 (Drawer)
  A8 + S1 + S3 → C9 (Tooltip)
  A8 + S1 + S3 + S2 → C10 (Toast)

Day 9 (Part 3)
  A8 + S1 + S2 → C11 (Skeleton)
  A8 + S1 + A14 → C12 (Spinner)

Day 10 (Integration)
  All → Q1, Q2, Q3, Q4
```

---

## Sprint Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Tailwind v4 CSS-first config causes migration issues | Blocks all styling | Medium | Prototype @theme block before Sprint 1 |
| Shadcn primitives have conflicting dependencies | Delays install | Low | Pin Shadcn versions, test install in isolation |
| RTL logical properties not fully supported | Components need refactoring | Medium | Use CSS `logical` property checker in lint |
| Reduced motion requirements missed | A11y failures at QA | Low | Add to component checklist, test early |
| Modal focus trap not working across all browsers | Accessibility gap | Low | Use tested focus-trap library |
| SSR hydration mismatches (Portal, useLockedBody) | Runtime errors | Medium | Ensure all hooks check `typeof window` |
