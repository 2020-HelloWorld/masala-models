---
name: Price Shield Dashboard — Frontend UI/UX Development Skill
description: Comprehensive UI/UX guidelines for building the frontend of the National Price Shock Protection and Stabilization System. Covers layout, design system, component architecture, data visualization, and page-by-page specifications tailored to the project's design.md and requirements.md.
---

# Price Shield Dashboard — Frontend UI/UX Development Skill

You are a senior UI/UX developer building the frontend for the **National Price Shock Protection and Stabilization System** — a decision-support AI and early-warning risk intelligence layer designed to prevent harmful price shocks of essential goods in India. This is NOT a generic analytics dashboard. It is a **harm-prevention system** for small sellers and consumers. Every design decision must serve clarity, speed-of-comprehension, and actionability.

---

## 1. Product Context & User Personas

Understand who you are building for before writing a single line of code.

| Persona | Role | Primary Need |
|---|---|---|
| **Government Official** | Operator / Administrator | See national risk overview at a glance. Identify critical regions. Approve interventions. |
| **District Analyst** | Analyst | Deep-dive into a specific commodity-region pair. Understand signal breakdown. Track deviation trends. |
| **Wholesaler / Small Seller** | Viewer | Check risk for their commodities and regions. Receive early warnings. |
| **System Operator** | Operator | Monitor data quality, ingestion health, and system performance. |

**Key Insight:** Most users are NOT data scientists. The UI must use **non-technical language**, clear color-coding, and prominent lead-time estimates so users can act quickly.

---

## 2. Information Architecture & Navigation

### 2.1 Layout Structure
- **Persistent Left Sidebar** (240px expanded, 72px collapsed) + **Main Content Area**.
- The sidebar is the single source of navigation. No top nav bar for primary routes.
- On mobile (< 768px), the sidebar collapses into a bottom tab bar with the 5 most important routes and a "More" menu.

### 2.2 Sidebar Menu Items (Top to Bottom)

| Icon | Label | Route | Description |
|---|---|---|---|
| 🏠 | **Overview** | `/` | National risk heatmap grid (commodity × region). The "home" screen. |
| 🗺️ | **Map View** | `/map` | Geographic risk distribution on an India map (Req 10.7). |
| 📊 | **Signals** | `/signals` | Individual signal trends and raw data explorer (Req 10.3). |
| 🔔 | **Alerts** | `/alerts` | Alert feed with filters by commodity, region, severity, and date (Req 9). |
| 🛡️ | **Interventions** | `/interventions` | Record new interventions and view effectiveness metrics (Req 11). |
| 📋 | **Audit Log** | `/audit` | Complete history of risk score changes, signal ingestion events, alerts (Req 14). |
| ⚙️ | **Settings** | `/settings` | User preferences: commodities, regions, alert thresholds, delivery channels (Req 9.6, 15). |

**Sidebar Footer:** Collapsed user avatar, role badge, and a logout button.

### 2.3 Routing
- Use `react-router-dom` with nested routes.
- The `Layout` component wraps all routes, providing the sidebar and a `<main>` content outlet.
- Each route should support URL query parameters for filters (e.g., `/alerts?commodity=onion&region=MH&level=critical`) to allow deep-linking and browser bookmarks.

---

## 3. Design System & Tokens

Establish all design tokens as CSS Custom Properties in `src/index.css` **before building any components**.

### 3.1 Color Palette

```css
:root {
  /* --- Core Background & Surface --- */
  --color-bg-primary: #0A0E1A;       /* Deep navy-black (main background) */
  --color-bg-secondary: #111827;     /* Slightly lighter (card backgrounds) */
  --color-bg-tertiary: #1F2937;      /* Subtle lifts (hover states, input fields) */
  --color-surface-glass: rgba(255, 255, 255, 0.04); /* Glassmorphism panels */

  /* --- Text --- */
  --color-text-primary: #F9FAFB;     /* Crisp white for headings */
  --color-text-secondary: #9CA3AF;   /* Muted gray for body/captions */
  --color-text-tertiary: #6B7280;    /* Subdued for hints and timestamps */

  /* --- Risk Level Semantic Colors (THE most important palette) --- */
  --color-risk-low: #10B981;         /* Emerald green */
  --color-risk-low-bg: rgba(16, 185, 129, 0.12);
  --color-risk-moderate: #F59E0B;    /* Amber */
  --color-risk-moderate-bg: rgba(245, 158, 11, 0.12);
  --color-risk-high: #F97316;        /* Orange */
  --color-risk-high-bg: rgba(249, 115, 22, 0.12);
  --color-risk-critical: #EF4444;    /* Red */
  --color-risk-critical-bg: rgba(239, 68, 68, 0.12);

  /* --- Accent & Interactive --- */
  --color-accent: #6366F1;          /* Indigo for primary actions */
  --color-accent-hover: #818CF8;
  --color-link: #60A5FA;            /* Light blue for links */

  /* --- Borders & Dividers --- */
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-hover: rgba(255, 255, 255, 0.16);
}
```

### 3.2 Typography

Use **Inter** from Google Fonts. Define scale:

```css
:root {
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-xs: 0.75rem;   /* 12px — timestamps, badges */
  --font-size-sm: 0.875rem;  /* 14px — body, captions */
  --font-size-base: 1rem;    /* 16px — standard text */
  --font-size-lg: 1.25rem;   /* 20px — section headers */
  --font-size-xl: 1.5rem;    /* 24px — page titles */
  --font-size-2xl: 2rem;     /* 32px — hero numbers (risk scores) */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

### 3.3 Spacing, Radius, Shadows

```css
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
  --shadow-glow-critical: 0 0 20px rgba(239, 68, 68, 0.3);
  --shadow-glow-high: 0 0 16px rgba(249, 115, 22, 0.2);
}
```

### 3.4 Motion & Transitions

```css
:root {
  --transition-fast: 150ms ease-in-out;
  --transition-base: 250ms ease-in-out;
  --transition-slow: 400ms ease-in-out;
}
```

- All interactive elements (buttons, cards, links, nav items) use `transition: all var(--transition-fast);`.
- Page transitions: fade-in with `framer-motion` (`opacity 0→1`, `y: 8→0`, duration: 300ms).
- Risk score gauges: animate number count-up on mount.
- Charts: draw-in with a 600ms staggered animation.

---

## 4. Component Architecture

Build these reusable components **before** assembling any page. Each component gets its own folder: `src/components/<ComponentName>/<ComponentName>.jsx` + `<ComponentName>.css`.

### 4.1 Core Layout Components

| Component | Description |
|---|---|
| `Layout` | Flex container with `<Sidebar>` and `<main>{children}</main>`. |
| `Sidebar` | Persistent left nav. Expand/collapse toggle. Active route highlight. User avatar at bottom. |
| `NavItem` | Icon + label. Active state: left accent border + background highlight. Hover: subtle lift. |
| `PageHeader` | Page title + breadcrumb + optional filter bar. |

### 4.2 Data Display Components

| Component | Description | Used In |
|---|---|---|
| `RiskScoreCard` | Hero card showing a single commodity-region risk score (0–100) with ring gauge, risk level badge, trend arrow, and "View Details" CTA. | Overview |
| `RiskBadge` | Small pill badge with risk level text + color. Uses `--color-risk-*` tokens. | Everywhere |
| `TrendIndicator` | Small up/down/stable arrow with label ("Rising", "Stable", "Falling"). | RiskScoreCard, Alerts |
| `SignalContributionBar` | Horizontal stacked bar showing signal contribution percentages (market, logistics, climate, behavioral, event). | Explainability Panel |
| `ExplainabilityPanel` | Full panel rendering the Explainability Report: summary sentence, ranked contributing factors (each with signal type icon, description, contribution %, baseline vs. observed sparkline), structural assessment badge, and recommended actions list. | Detail View |
| `MetricWidget` | Small card with a label, large number, unit, and optional trend sparkline (e.g., "Lead Time: 3.2 days ↑"). | Overview, Interventions |
| `AlertCard` | Card displaying an alert: commodity, region, risk badge, lead time, timestamp, truncated summary, and "View Report" link. Left border colored by severity. | Alerts |
| `InterventionRow` | Table row / card for a recorded intervention with type, commodity, region, timestamp, linked alert, and effectiveness metrics. | Interventions |
| `HeatmapCell` | A single cell in the commodity × region risk heatmap. Background color interpolated from risk score. Hover shows tooltip with score + trend. | Overview |
| `SignalChart` | Time-series line chart for a signal. Renders baseline band (shaded expected range) with the observed signal line overlaid. Deviation zones highlighted. Uses D3.js or Recharts. | Signals, Detail View |
| `RiskTrendChart` | Time-series area chart for risk score history. Color gradient from green (low) to red (critical). | Detail View, Overview |
| `MapView` | India choropleth map with regions colored by combined risk score. Click a region to filter. Uses Leaflet or Mapbox. | Map View |

### 4.3 Input & Filter Components

| Component | Description |
|---|---|
| `FilterBar` | Horizontal bar with commodity dropdown, region dropdown, date range picker, and risk level multi-select. Emits filter state to parent. |
| `SearchInput` | Styled search input with icon and debounced onChange. |
| `DropdownSelect` | Custom styled select with search, multi-select, and clear functionality. |
| `DateRangePicker` | Dual calendar popup for selecting date ranges. |

### 4.4 Feedback & State Components

| Component | Description |
|---|---|
| `SkeletonLoader` | Pulsing placeholder matching the shape of cards, charts, and table rows. |
| `EmptyState` | Illustration + message when no data matches filters. |
| `ErrorBanner` | Dismissible banner for API/network errors. |
| `ToastNotification` | Slide-in notification for new alerts or successful actions (e.g., intervention recorded). |
| `ConfirmDialog` | Modal for confirming destructive or significant actions. |

---

## 5. Page-by-Page Specifications

### 5.1 Overview Page (`/`)

**Purpose:** National risk snapshot. Users see the most critical commodity-region pairs at a glance.

**Layout:**
1. **Top row:** 4 `MetricWidget` cards:
   - Total Critical Alerts (with glow shadow)
   - Total High-Risk Pairs
   - Average Lead Time
   - Interventions This Week
2. **Main area:** Interactive `HeatmapGrid` — Commodities on Y-axis, Regions on X-axis. Each cell is a `HeatmapCell` colored by combined risk score. Click a cell to navigate to its detail page.
3. **Right sidebar panel (optional, collapsible):** "Recent Alerts" feed showing the 5 most recent `AlertCard` items.

### 5.2 Commodity-Region Detail Page (`/risk/:commodity/:region`)

**Purpose:** Deep-dive into a single commodity-region pair.

**Layout:**
1. **Header:** Commodity name, Region name, current risk score (large number + ring gauge), risk level badge, trend indicator.
2. **Dual Risk Scores:** Side-by-side `MetricWidget` for Supply Stress Score and Price Shock Risk Score.
3. **Explainability Panel:** Full `ExplainabilityPanel` component rendering the latest report.
4. **Signal Trends:** Tabbed section with a `SignalChart` for each signal type (Market, Logistics, Climate, Behavioral, Event). Each chart shows baseline band + observed line.
5. **Risk Score History:** `RiskTrendChart` for the past 30/90/180 days.
6. **Alert History:** Table of past alerts for this pair.
7. **Intervention History:** Table of past interventions for this pair.

### 5.3 Map View (`/map`)

**Purpose:** Geographic risk distribution.

**Layout:**
1. **Full-width India map** (choropleth) colored by combined risk score per region.
2. **Commodity selector** at top to switch the map's underlying data.
3. **Click a region** → sidebar panel slides in showing that region's top 5 riskiest commodities as `RiskScoreCard` items.

### 5.4 Signals Page (`/signals`)

**Purpose:** Explore raw signal data and trends.

**Layout:**
1. `FilterBar` at top (commodity, region, signal type, date range).
2. Grid of `SignalChart` components, one per signal type for the selected commodity-region.
3. Table of recent raw signals with sortable columns (timestamp, type, value, confidence, deviation score).

### 5.5 Alerts Page (`/alerts`)

**Purpose:** Alert management feed.

**Layout:**
1. `FilterBar` at top (commodity, region, risk level, date range).
2. Scrollable feed of `AlertCard` components, ordered by recency.
3. Click an alert → expand inline or navigate to the detail page of the associated commodity-region pair.
4. Badge counter on the Sidebar `NavItem` for unread/new alerts.

### 5.6 Interventions Page (`/interventions`)

**Purpose:** Record interventions and track their effectiveness.

**Layout:**
1. **"Record New Intervention" Button** → opens a modal/form with fields: intervention type, commodity, region, description, linked alert (dropdown).
2. **Interventions Table:** `InterventionRow` components showing all recorded interventions with effectiveness metrics (lead time, risk reduction, price stabilization, harm prevented).
3. **Effectiveness Summary:** Top-row `MetricWidget` cards showing aggregated stats (avg risk reduction, avg lead time, total interventions this month).

### 5.7 Audit Log Page (`/audit`)

**Purpose:** Full operational transparency.

**Layout:**
1. `FilterBar` (event type: ingestion, risk computation, alert, intervention; date range; commodity; region).
2. Paginated table with columns: timestamp, event type, commodity, region, summary, user (if applicable).

### 5.8 Settings Page (`/settings`)

**Purpose:** User preferences and access management.

**Layout:**
1. **Profile Section:** Username, role, organization.
2. **Alert Preferences:** Multi-select for monitored commodities and regions. Configurable thresholds for moderate/high/critical alerts. Delivery channel toggles (email, SMS, dashboard).
3. **Admin Section (if role = administrator):** User management table, role assignment, access revocation.

---

## 6. Data Visualization Guidelines

### 6.1 Risk Score Gauge
- Use a **ring/donut gauge** (270° arc) with color interpolated from green (0) to red (100).
- Center number animates on mount (count-up from 0 to value, 800ms, ease-out).
- Below the gauge: risk level text badge.

### 6.2 Heatmap
- Use CSS Grid. Cell background color interpolated across the risk palette: `low → moderate → high → critical`.
- Hover: cell lifts slightly (scale 1.05), tooltip shows exact score, trend, and commodity-region name.
- Click: navigates to detail view.

### 6.3 Time-Series Charts
- Library: **Recharts** (simple, React-native) or **D3.js** (for complex custom charts).
- Always show the **baseline expected range** as a shaded band behind the observed line.
- Highlight deviation zones (where observed exceeds baseline band) with a semi-transparent red/orange fill.
- Provide time range toggles: 7d, 30d, 90d, 180d, 1y.
- Tooltip on hover: date, observed value, baseline value, deviation score.

### 6.4 Contribution Bar
- Horizontal stacked bar chart for signal contributions.
- Each segment is labeled with signal type and percentage.
- Color-coded by signal type (use a distinct palette separate from risk colors):
  - Market: `#6366F1` (Indigo)
  - Logistics: `#F59E0B` (Amber)
  - Climate: `#06B6D4` (Cyan)
  - Behavioral: `#8B5CF6` (Violet)
  - Event: `#EC4899` (Pink)

### 6.5 India Map
- Use **Leaflet** with a GeoJSON layer for Indian states/districts.
- Choropleth fill based on risk score.
- Popup on click: region name, combined risk score, top contributing signal.

---

## 7. Real-Time & Data Fetching

### 7.1 API Integration
- All API calls go through a central `src/services/api.js` module.
- Base URL configurable via environment variable `VITE_API_BASE_URL`.
- Endpoints map directly to the design document's API:
  - `GET /risk-scores`, `GET /risk-scores/history`
  - `GET /signals`
  - `GET /explainability/{commodity}/{region}`
  - `GET /alerts`
  - `POST /interventions`, `GET /interventions`

### 7.2 WebSocket for Live Updates
- Connect to a WebSocket endpoint for real-time risk score updates.
- On new data: animate the affected `HeatmapCell` and `RiskScoreCard` with a brief pulse effect.
- Show a `ToastNotification` for new critical/high alerts.

### 7.3 Loading & Error States
- **Every data-fetching component** must handle three states: Loading (skeleton), Loaded (data), Error (error banner with retry).
- Use `React.Suspense` boundaries where appropriate.

---

## 8. Responsiveness Breakpoints

```css
/* Mobile */
@media (max-width: 767px) { /* Sidebar → bottom tab bar, single-column layout, cards stack vertically */ }

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) { /* Sidebar collapsed (icons only), 2-column grid */ }

/* Desktop */
@media (min-width: 1024px) { /* Full sidebar, multi-column grid, side panels */ }

/* Large Desktop */
@media (min-width: 1440px) { /* Wider heatmap, more columns, denser data */ }
```

---

## 9. Accessibility & Performance

- All interactive elements must have `aria-labels` and be keyboard-navigable.
- Color is NEVER the only indicator. Always pair risk colors with text labels and/or icons.
- Lazy-load chart libraries and map tiles.
- Virtualize long lists (alerts, audit logs) with `react-window` or similar.
- Target Lighthouse scores: Performance > 90, Accessibility > 95.

---

## 10. Implementation Workflow

Follow this order strictly when building the frontend:

1. **Design System First:** Create `src/index.css` with all tokens from Section 3. Import Inter font.
2. **Layout Shell:** Build `Layout`, `Sidebar`, `NavItem`, `PageHeader`. Set up `react-router-dom` routing.
3. **Reusable Components:** Build all components from Section 4, starting with `RiskBadge`, `TrendIndicator`, `MetricWidget`, then progressing to `RiskScoreCard`, `HeatmapCell`, `SignalChart`, `ExplainabilityPanel`.
4. **Overview Page:** Assemble the `/` page using `MetricWidget` + `HeatmapGrid`. Use mock data initially.
5. **Detail Page:** Build `/risk/:commodity/:region` with the full signal breakdown.
6. **Map View:** Integrate Leaflet with India GeoJSON.
7. **Alerts & Interventions Pages.**
8. **Audit Log & Settings.**
9. **API Integration:** Replace mock data with real API calls.
10. **WebSocket & Real-Time:** Add live update layer.
11. **Polish:** Micro-animations, skeleton loaders, error states, responsiveness audit, accessibility audit.

---

## 11. Mock Data Strategy

Until the backend API is ready, use realistic mock data stored in `src/mocks/`:

- `mockRiskScores.js` — Array of 50 commodities × 10 regions with risk scores, levels, trends.
- `mockSignals.js` — Sample signal data for each type.
- `mockAlerts.js` — 20 sample alerts with varying severities.
- `mockExplainability.js` — 5 sample explainability reports.
- `mockInterventions.js` — 10 sample interventions with effectiveness metrics.

Use Indian commodity names (Onion, Tomato, Rice, Wheat, Potato, Dal, Sugar, Mustard Oil, Milk, Green Chilli) and Indian regions (Maharashtra, Karnataka, Tamil Nadu, UP, MP, Rajasthan, Gujarat, Punjab, West Bengal, Bihar) for realism.

---

## 12. File Structure

```
frontend/
├── public/
│   └── india-states.geojson
├── src/
│   ├── index.css                  # Design tokens & global styles
│   ├── main.jsx                   # Entrypoint
│   ├── App.jsx                    # Router setup
│   ├── components/
│   │   ├── Layout/
│   │   ├── Sidebar/
│   │   ├── NavItem/
│   │   ├── PageHeader/
│   │   ├── RiskScoreCard/
│   │   ├── RiskBadge/
│   │   ├── TrendIndicator/
│   │   ├── MetricWidget/
│   │   ├── HeatmapCell/
│   │   ├── SignalContributionBar/
│   │   ├── ExplainabilityPanel/
│   │   ├── AlertCard/
│   │   ├── InterventionRow/
│   │   ├── SignalChart/
│   │   ├── RiskTrendChart/
│   │   ├── MapView/
│   │   ├── FilterBar/
│   │   ├── SkeletonLoader/
│   │   ├── EmptyState/
│   │   ├── ErrorBanner/
│   │   └── ToastNotification/
│   ├── pages/
│   │   ├── OverviewPage/
│   │   ├── DetailPage/
│   │   ├── MapPage/
│   │   ├── SignalsPage/
│   │   ├── AlertsPage/
│   │   ├── InterventionsPage/
│   │   ├── AuditPage/
│   │   └── SettingsPage/
│   ├── services/
│   │   ├── api.js                 # Centralized API client
│   │   └── websocket.js           # WebSocket connection manager
│   ├── mocks/
│   │   ├── mockRiskScores.js
│   │   ├── mockSignals.js
│   │   ├── mockAlerts.js
│   │   ├── mockExplainability.js
│   │   └── mockInterventions.js
│   ├── hooks/
│   │   ├── useRiskScores.js
│   │   ├── useSignals.js
│   │   ├── useAlerts.js
│   │   └── useWebSocket.js
│   └── utils/
│       ├── riskLevels.js          # Score→level mapping, color lookup
│       ├── formatters.js          # Date, number, percentage formatters
│       └── constants.js           # Commodity/region lists, thresholds
```
