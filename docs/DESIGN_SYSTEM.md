# EgyptHub — Complete Design System

> **Version:** 2.0
> **Source of Truth:** Visual Boards (9 images)
> **Status:** NEW approved — ALL previous design tokens REJECTED

---

## 1. Color System

### 1.1 Core Palette

| Role | Token | HEX | RGB | Usage |
|------|-------|-----|-----|-------|
| **Background Primary** | `bg-primary` | `#0A0E17` | `10, 14, 23` | Main page background |
| **Background Secondary** | `bg-secondary` | `#0D1220` | `13, 18, 32` | Section backgrounds |
| **Surface** | `surface` | `#0F1420` | `15, 20, 32` | Cards, sidebar |
| **Surface Elevated** | `surface-elevated` | `#141B2D` | `20, 27, 45` | Modals, dropdowns |
| **Surface Hover** | `surface-hover` | `#1A2235` | `26, 34, 53` | Hover states |
| **Border** | `border` | `#1E2A3D` | `30, 42, 61` | Dividers, card borders |
| **Border Light** | `border-light` | `#2A3A52` | `42, 58, 82` | Active states |

### 1.2 Gold System (Primary Accent)

| Role | Token | HEX | RGB | Usage |
|------|-------|-----|-----|-------|
| **Gold Primary** | `gold` | `#D4A24C` | `212, 162, 76` | Primary accent, CTAs |
| **Gold Light** | `gold-light` | `#E8C97A` | `232, 201, 122` | Hover states, highlights |
| **Gold Dark** | `gold-dark` | `#B8862D` | `184, 134, 45` | Active states |
| **Gold Glow** | `gold-glow` | `rgba(212,162,76,0.3)` | — | Box shadows, glows |
| **Gold Subtle** | `gold-subtle` | `rgba(212,162,76,0.12)` | — | Background tints |
| **Gold Border** | `gold-border` | `rgba(212,162,76,0.25)` | — | Card hover borders |

### 1.3 Text Colors

| Role | Token | HEX | Usage |
|------|-------|-----|-------|
| **Text Primary** | `text-primary` | `#F5F7FA` | Headlines, body |
| **Text Secondary** | `text-secondary` | `#8B95A5` | Descriptions, labels |
| **Text Muted** | `text-muted` | `#5A6478` | Timestamps, hints |
| **Text Gold** | `text-gold` | `#D4A24C` | Links, highlights |
| **Text Inverse** | `text-inverse` | `#0A0E17` | On gold backgrounds |

### 1.4 Semantic Colors

| Role | Token | HEX | Usage |
|------|-------|-----|-------|
| **Success** | `success` | `#10B981` | Confirmations, online |
| **Warning** | `warning` | `#F59E0B` | Alerts, pending |
| **Error** | `error` | `#EF4444` | Errors, deletions |
| **Info** | `info` | `#3B82F6` | Information, links |

### 1.5 Gradient Definitions

| Name | Value | Usage |
|------|-------|-------|
| `gradient-gold` | `linear-gradient(135deg, #D4A24C 0%, #E8C97A 100%)` | Primary CTA buttons |
| `gradient-gold-reverse` | `linear-gradient(135deg, #E8C97A 0%, #D4A24C 100%)` | Hover states |
| `gradient-navy` | `linear-gradient(180deg, #0A0E17 0%, #0D1220 100%)` | Page backgrounds |
| `gradient-surface` | `linear-gradient(135deg, #141B2D 0%, #0F1420 100%)` | Card backgrounds |
| `gradient-overlay` | `linear-gradient(180deg, rgba(10,14,23,0) 0%, rgba(10,14,23,0.95) 100%)` | Image overlays |

---

## 2. Typography

### 2.1 Font Families

| Family | Font | Weights | Usage |
|--------|------|---------|-------|
| **Arabic** | Cairo | 300, 400, 500, 600, 700, 800, 900 | All Arabic text |
| **English** | Poppins | 300, 400, 500, 600, 700 | English text, numbers |
| **Display** | Playfair Display | 400, 500, 600, 700 | English headings, hero |
| **Accent** | Amiri | 400, 700 | Quotes, testimonials |

### 2.2 Type Scale

| Token | Size (px) | Size (rem) | Line Height | Letter Spacing | Weight | Usage |
|-------|-----------|------------|-------------|----------------|--------|-------|
| `display-lg` | 64px | 4rem | 1.1 | -0.02em | 700 | Hero headline |
| `display-md` | 48px | 3rem | 1.15 | -0.01em | 700 | Section hero |
| `display-sm` | 36px | 2.25rem | 1.2 | 0 | 600 | Page title |
| `heading-lg` | 30px | 1.875rem | 1.3 | 0 | 700 | Card title |
| `heading-md` | 24px | 1.5rem | 1.35 | 0 | 600 | Subsection |
| `heading-sm` | 20px | 1.25rem | 1.4 | 0 | 600 | Small heading |
| `body-lg` | 18px | 1.125rem | 1.6 | 0 | 400 | Large body |
| `body-md` | 16px | 1rem | 1.6 | 0 | 400 | Default body |
| `body-sm` | 14px | 0.875rem | 1.5 | 0 | 400 | Small body |
| `caption` | 12px | 0.75rem | 1.4 | 0.01em | 500 | Labels, captions |
| `overline` | 11px | 0.6875rem | 1.3 | 0.15em | 600 | Section labels, uppercase |
| `stat-lg` | 48px | 3rem | 1 | 0 | 700 | Dashboard stats |
| `stat-md` | 32px | 2rem | 1 | 0 | 700 | Card stats |
| `stat-sm` | 24px | 1.5rem | 1 | 0 | 600 | Inline stats |

### 2.3 Typography Rules

- **Arabic text**: Always Cairo, right-aligned, RTL
- **English text**: Poppins or Playfair Display
- **Numbers**: Poppins (consistent across languages)
- **Gold text**: Reserved for CTAs, links, highlights, stats
- **Maximum 3 font sizes per screen section**
- **No all-caps Arabic text**

---

## 3. Spacing System

### 3.1 Base Scale (4px grid)

| Token | Value | Usage |
|-------|-------|-------|
| `space-0` | 0px | — |
| `space-1` | 4px | Tight gaps, icon padding |
| `space-2` | 8px | Small gaps, inline spacing |
| `space-3` | 12px | Input padding, small cards |
| `space-4` | 16px | Standard gaps, card padding |
| `space-5` | 20px | Medium gaps |
| `space-6` | 24px | Section gaps, card padding |
| `space-8` | 32px | Large gaps, section padding |
| `space-10` | 40px | Section margins |
| `space-12` | 48px | Large section margins |
| `space-14` | 56px | — |
| `space-16` | 64px | Major section spacing |
| `space-20` | 80px | Hero section padding |
| `space-24` | 96px | — |
| `space-32` | 128px | Page-level spacing |

### 3.2 Component Spacing

| Component | Padding | Gap |
|-----------|---------|-----|
| **Card (small)** | 16px | 12px |
| **Card (medium)** | 24px | 16px |
| **Card (large)** | 32px | 24px |
| **Button (sm)** | 8px 16px | — |
| **Button (md)** | 12px 24px | — |
| **Button (lg)** | 16px 32px | — |
| **Input** | 12px 16px | — |
| **Section** | 64px 0 | 32px |
| **Modal** | 32px | 24px |
| **Sidebar** | 16px | 8px |
| **Table Cell** | 12px 16px | — |

---

## 4. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-none` | 0px | — |
| `radius-sm` | 4px | Badges, tags |
| `radius-md` | 8px | Inputs, small buttons |
| `radius-lg` | 12px | Cards, dropdowns |
| `radius-xl` | 16px | Large cards, modals |
| `radius-2xl` | 20px | Hero cards |
| `radius-3xl` | 24px | Featured cards, destination cards |
| `radius-full` | 9999px | Avatars, pills, circular buttons |

---

## 5. Shadows

### 5.1 Standard Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 3px rgba(0,0,0,0.3)` | Subtle elevation |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.4)` | Cards, dropdowns |
| `shadow-lg` | `0 8px 24px rgba(0,0,0,0.5)` | Modals, popovers |
| `shadow-xl` | `0 16px 48px rgba(0,0,0,0.6)` | Heavy elevation |

### 5.2 Gold Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-gold` | `0 4px 14px rgba(212,162,76,0.25)` | Gold button hover |
| `shadow-gold-lg` | `0 8px 32px rgba(212,162,76,0.3)` | Featured cards |
| `shadow-gold-glow` | `0 0 20px rgba(212,162,76,0.15)` | Glow effect |

### 5.3 Inset Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-inner` | `inset 0 2px 4px rgba(0,0,0,0.3)` | Input focus |
| `shadow-inner-gold` | `inset 0 0 0 2px rgba(212,162,76,0.3)` | Gold focus ring |

---

## 6. Motion & Animation

### 6.1 Transitions

| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `transition-fast` | 150ms | `ease-in-out` | Hover states, toggles |
| `transition-base` | 250ms | `ease-in-out` | Standard transitions |
| `transition-slow` | 400ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Card hover, reveals |
| `transition-spring` | 500ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful micro-interactions |

### 6.2 Hover Effects

| Element | Effect |
|---------|--------|
| **Card** | `translateY(-4px)` + gold shadow |
| **Card (featured)** | `translateY(-8px)` + gold glow |
| **Button** | `scale(1.02)` + shadow |
| **Icon** | `scale(1.1)` + color change |
| **Link** | `color: gold` + underline |
| **Table Row** | `background: surface-hover` |

### 6.3 Loading States

| Pattern | Implementation |
|---------|---------------|
| **Skeleton** | Pulsing gray placeholders (surface-elevated) |
| **Spinner** | Gold circle rotating (24px, 2px stroke) |
| **Progress Bar** | Gold gradient bar, animated width |
| **Image Load** | Fade in with slight scale (1.05 → 1) |

### 6.4 Micro-interactions

| Interaction | Animation |
|-------------|-----------|
| **Toggle switch** | 200ms slide + color change |
| **Checkbox** | 150ms scale bounce |
| **Star rating** | 200ms scale + color fill |
| **Add to favorites** | Heart scale 1 → 1.2 → 1 + color |
| **Tab switch** | 250ms underline slide |
| **Toast notification** | Slide in from right, auto-dismiss |
| **Modal open** | Fade backdrop + scale modal 0.95 → 1 |
| **Sidebar collapse** | 300ms width transition |

---

## 7. Grid System

### 7.1 Breakpoints

| Token | Width | Columns | Gutter | Margin |
|-------|-------|---------|--------|--------|
| `xs` | 0–479px | 4 | 16px | 16px |
| `sm` | 480–639px | 4 | 16px | 24px |
| `md` | 640–767px | 8 | 16px | 32px |
| `lg` | 768–1023px | 8 | 24px | 32px |
| `xl` | 1024–1279px | 12 | 24px | 48px |
| `2xl` | 1280–1535px | 12 | 32px | 64px |
| `3xl` | 1536px+ | 12 | 32px | auto (max-width: 1440px) |

### 7.2 Container Widths

| Breakpoint | Max Width |
|------------|-----------|
| `sm` | 100% |
| `md` | 100% |
| `lg` | 768px |
| `xl` | 1024px |
| `2xl` | 1280px |
| `3xl` | 1440px |

---

## 8. Z-Index Scale

| Layer | Value | Usage |
|-------|-------|-------|
| Behind | -1 | Decorative elements |
| Base | 0 | Default |
| Dropdown | 1000 | Dropdown menus |
| Sticky | 1020 | Sticky headers |
| Fixed | 1030 | Fixed navigation |
| Overlay | 1040 | Backdrop overlays |
| Modal | 1050 | Modals, dialogs |
| Popover | 1060 | Popovers, tooltips |
| Tooltip | 1070 | Tooltips |
| Toast | 1080 | Toast notifications |
| Max | 9999 | Emergency overlays |

---

## 9. Elevation System

| Level | Shadow | Background | Usage |
|-------|--------|------------|-------|
| **Level 0** | None | `bg-primary` | Page background |
| **Level 1** | `shadow-sm` | `surface` | Cards, sidebar |
| **Level 2** | `shadow-md` | `surface-elevated` | Dropdowns, popovers |
| **Level 3** | `shadow-lg` | `surface-elevated` | Modals |
| **Level 4** | `shadow-xl` | `surface-elevated` | Full-screen modals |

---

## 10. Component Tokens

### 10.1 Buttons

| Variant | BG | Text | Border | Hover BG |
|---------|-----|------|--------|----------|
| **Primary** | `gradient-gold` | `#0A0E17` | none | `gradient-gold-reverse` |
| **Secondary** | transparent | `#D4A24C` | `1px solid #D4A24C` | `gold-subtle` |
| **Tertiary** | transparent | `#8B95A5` | none | `text-primary` |
| **Danger** | `#EF4444` | `#FFFFFF` | none | `#DC2626` |
| **Ghost** | transparent | `#8B95A5` | none | `surface-hover` |

### 10.2 Inputs

| State | Border | BG | Text |
|-------|--------|-----|------|
| **Default** | `#1E2A3D` | `#0F1420` | `#F5F7FA` |
| **Focus** | `#D4A24C` | `#0F1420` | `#F5F7FA` |
| **Error** | `#EF4444` | `#0F1420` | `#F5F7FA` |
| **Disabled** | `#1E2A3D` | `#0A0E17` | `#5A6478` |

### 10.3 Cards

| Variant | BG | Border | Radius | Shadow |
|---------|-----|--------|--------|--------|
| **Default** | `surface` | `1px solid #1E2A3D` | `16px` | `shadow-sm` |
| **Hover** | `surface` | `1px solid gold-border` | `16px` | `shadow-gold` |
| **Featured** | `surface-elevated` | `1px solid #D4A24C` | `20px` | `shadow-gold-lg` |
| **Glass** | `rgba(15,20,32,0.8)` | `1px solid rgba(255,255,255,0.08)` | `16px` | `shadow-md` |

---

## 11. Icon System

### 11.1 Icon Sizes

| Token | Size | Usage |
|-------|------|-------|
| `icon-xs` | 12px | Badges, inline |
| `icon-sm` | 16px | Buttons, inputs |
| `icon-md` | 20px | Navigation, list items |
| `icon-lg` | 24px | Feature icons |
| `icon-xl` | 32px | Hero features |
| `icon-2xl` | 48px | Empty states |

### 11.2 Icon Colors

| Context | Color |
|---------|-------|
| Default | `#8B95A5` |
| Active/Selected | `#D4A24C` |
| On Gold BG | `#0A0E17` |
| Success | `#10B981` |
| Error | `#EF4444` |

---

## 12. Data Visualization Colors

| Series | Color | HEX |
|--------|-------|-----|
| Series 1 | Gold | `#D4A24C` |
| Series 2 | Teal | `#0E8F94` |
| Series 3 | Coral | `#F4A261` |
| Series 4 | Purple | `#8B5CF6` |
| Series 5 | Blue | `#3B82F6` |
| Series 6 | Green | `#10B981` |
| Series 7 | Pink | `#EC4899` |
| Series 8 | Orange | `#F97316` |
