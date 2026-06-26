# SUPERPUPER Design System — Build Notes

Figma file: `iGoofMynDCJVuGePDeIhK2`  
React project: `/course/superpuper/`

---

## Step 1: Prepare ✅ — 2026-06-23

### 1.1 Figma connection verified
- Connected via Claude MCP Figma connector
- File: "design-system-SUPERPUPER", page: "Design" (node 198:64)
- Sections found: `ds-atoms`, `ds-molecules`, `ds-organisms`, `design`, `styles`

### 1.2 Figma cleanup — component set renames (typos & naming conventions)

| Before | After | Reason |
|---|---|---|
| `card metric` | `card_metric_graph` | space → underscore; differentiated from count variant |
| `Cards metrica` | `card_metric_count` | capitalization, typo, differentiated (shows numeric KPIs) |
| `attemt` | `attempt` | typo |
| `card top` | `card_top` | space → underscore |
| `switch group` | `switch_group` | space → underscore |
| `second-row` | `second_row` | hyphen → underscore |
| `canban` | `kanban` | typo |

### 1.3 Figma cleanup — property name renames (removed `Property 1`)

All `Property 1` instances replaced with descriptive semantic names:

| Component | Old property | New property | Notes |
|---|---|---|---|
| `bar` | `Property 1` | `size` | values: `Default` → `small`, `big` stays |
| `avatar` | `Property 1` | `variant` | values: katya / dog / petya (person avatars) |
| `status` | `Property 1` | `type` | values: purple / green / red / stopped |
| `icons` | `Property 1` | `icon` | values: play / user / more / arrow-down / close |
| `flag` | `Property 1` | `active` | values: yes / no |
| `tag` | `Property 1` | `type` | values: control / static |
| `error` | `Property 1` | `type` | |
| `avatars` | `Property 1` | `type` | |
| `list` | `Property 1` | `type` | |
| `text_area` | `Property 1` | `type` | |
| `input` | `Property 1` | `type` | |
| `dropdown` | `Property 1` | `theme` | values: On color / default |
| `graph` | `Property 1` | `type` | |
| `switch_group` | `Property 1` | `type` | |
| `btn` | `CTA?` | `cta` | removed `?` from property name |
| `profile` | `Property 1` | `size` | values: long / short / short-outlined |
| `node` | `Property 1` | `type` | |
| `campaign_preview` | `Property 1` | `type` | |
| `project_preview` | `Property 1` | `type` | |
| `experience_preview` | `Property 1` | `type` | |
| `team` | `Property 1` | `type` | |
| `card_metric_graph` | `Property 1` | `type` | |
| `card_metric_count` | `Property 1` | `type` | |
| `attempt` | `Property 1` | `type` | values: `Default` → `first`, `Variant2` → `next` |
| `topmenu` | `Property 1` | `filter` | values: all / templates / off |
| `task` | `Property 1` | `state` | values: `Default` → `pending`, `Variant2` → `done` |
| `card_top` | `Property 1` | `type` | values: `Default` → `default`, `Variant2` → `visual` |

### 1.4 Figma cleanup — variant value typo fixes

| Component | Before | After |
|---|---|---|
| `second_row` | `type=builider` | `type=builder` |

### 1.5 Figma component inventory (post-cleanup)

**ds-atoms** (16 components)
- `bar` — progress bar · `size`: small / big · `length`: 75% / 20%
- `avatar` — single avatar · `variant`: katya / dog / petya
- `status` — status badge · `type`: purple / green / red / stopped
- `icons` — icon · `icon`: play / user / more / arrow-down / close
- `switch` — toggle · `switch`: on / off · `size`: big / small
- `flag` — flag checkbox · `active`: yes / no
- `tag` — tag label · `type`: control / static
- `error` — error state
- `avatars` — avatar group
- `list` — list item
- `text_area` — textarea input
- `input` — text input
- `dropdown` — dropdown · `theme`: On color / default · `filled`: on / off
- `graph` — chart/graph
- `switch_group` — group of switches
- `btn` — button · `cta`: yes / no · `type`: secondary / On color / small / big / node

**ds-molecules** (10 components)
- `profile` — user profile · `size`: long / short / short-outlined
- `node` — node element
- `campaign_preview` — campaign card preview
- `project_preview` — project card preview
- `experience_preview` — experience card preview
- `team` — team row
- `card_metric_graph` — metric card with chart (e.g. Health)
- `card_metric_count` — metric card with number (e.g. Applications: 142)
- `attempt` — onboarding attempt row · `type`: first / next
- `notify` — notification · `type`: Default

**ds-organisms** (8 components)
- `second_row` — secondary row · `type`: Default / builder
- `topmenu` — top navigation tabs · `filter`: all / templates / off
- `header` — page header · `type`: default
- `kanban` — kanban board (standalone component)
- `task` — task row · `state`: pending / done
- `card_top` — top card · `type`: default / visual
- `menu_switch` — menu toggle · `menu`: on / off

---

## Step 2: Styles ✅ — 2026-06-23

### Project bootstrapped
- Vite + React + TypeScript scaffolded at `/course/superpuper/`
- React Router installed; routes: `/` (home) · `/styles`
- Dev server: port 5175

### Tokens extracted from Figma (`styles` section, node 2001:19512)
- Source: `tokens` variable collection, mode `ds`

**Fonts (3 families)**
| Token | Family | Fallback | Status |
|---|---|---|---|
| `--font-antiqa` | Instrument Serif | Georgia, serif | ✅ Google Fonts |
| `--font-grotesk` | Akkurat LL Cyr TT | system-ui, sans-serif | ⚠ commercial license needed |
| `--font-pixel` | Pixform | monospace | ⚠ load locally once licensed |

**Typography (9 styles)**
| Token | Font | Size | LH | Weight |
|---|---|---|---|---|
| H1 | Antiqa | 84px | 76px | 400 |
| H2 | Antiqa | 40px | 36px | 400 |
| Description | Pixel | 30px | 27px | 400 |
| H3 | Grotesk | 20px | 18px | 600 |
| H4 | Grotesk | 15px | 14px | 600 |
| text-pixel | Pixel | 10px | 9px | 400 |
| text-grotesk | Grotesk | 11px | 10px | 400 |
| text-bold | Grotesk | 11px | 10px | 700 |
| caps | Grotesk | 8px | 7px | 400 |

**Colors (29 variables across 7 groups)**
- Base: black `#000000`, gray `#cbcbcb`, lines `#eaeaea`, superYellow `#ffe900`, bgBase `#f2f2f2`
- Text & Icons: primary / secondary / on-color / brown / green / yellow-dark
- Controls: secondary-default / on-color-white / on-color-brown / on-color-yellow-dark
- Card backgrounds: white / red / green / yellow / pink / violet
- On-card backgrounds: red / green / yellow-dark / yellow / pink / violet
- Tech/status: purple `#9747ff` / green `#00867b` / red `#cc0000` / gray `#cbcbcb`
- Bar: filled `#b8c6c3` / empty `#ffffff`

**Indents (10 steps):** -1, -xs, xxxs(2), xxs(4), xs(8), s(14), m(20), l(24), x(30), xxl(90)

**Border radius (4 steps):** s(4), m(8), l(12), over(999/pill)

**Other:** `--size-base-width: 830px`

### Files created
- `src/tokens/tokens.css` — CSS custom properties (single source of truth)
- `src/tokens/tokens.ts` — TypeScript mirror with typed objects
- `src/pages/Styles.tsx` — `/styles` reference page (colors · typography · spacing · radius)
- `src/App.tsx` — BrowserRouter with black nav bar, yellow active indicator
- `src/index.css` — global reset
- `index.html` — Instrument Serif loaded via Google Fonts

---

## Step 3: Atoms ⬜

Implement `ds-atoms` as React components  
→ `src/components/atoms/`  
→ All variants covered, interactive where applicable

---

## Step 4: Molecules ⬜

Implement `ds-molecules` as React components  
→ `src/components/molecules/`  
→ Composed from atoms

---

## Step 5: Organisms ⬜

Implement `ds-organisms` as React components  
→ `src/components/organisms/`  
→ Composed from atoms + molecules
