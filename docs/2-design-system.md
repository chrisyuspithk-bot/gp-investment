# Design System — GP Investment Group Limited Website

> Purpose: single reference for **styling, design language, and layout**.
> All generated pages must follow this document. Values are given as CSS custom properties so a static generator or framework can consume them directly.

---

## 1. Design Principles

1. **Trustworthy & precise** — clean geometry, restrained color, data-forward. The client is a patents-driven AI company serving schools and SMEs; the design must feel institutional-grade, not playful.
2. **Tech-forward but human** — dark navy "compute" hero + bright content areas; subtle grid/gradient motifs (circuit lines, data particles) never decorative noise.
3. **Clarity over decoration** — one idea per section, generous whitespace, unambiguous hierarchy.
4. **Localized by default** — typography and layout tuned for Chinese + English (see §4 CJK rules). No locale may look like an afterthought.
5. **Accessible & fast** — WCAG 2.1 AA, static-first, no layout shift.

---

## 2. Color System

### 2.1 Brand palette

| Token | Value | Usage |
|---|---|---|
| `--gp-ink-950` | `#071126` | Deepest navy — hero bg, footer bg |
| `--gp-ink-900` | `#0B1E3A` | Navy — dark surfaces, headings on dark |
| `--gp-ink-800` | `#12294E` | Navy — dark cards, hover states on dark |
| `--gp-blue-600` | `#1D5BFF` | **Primary** — CTAs, links, active states |
| `--gp-blue-500` | `#2E6BFF` | Primary hover |
| `--gp-cyan-400` | `#22D3EE` | Accent — gradients, highlights, data viz |
| `--gp-green-500` | `#10B981` | Education/growth accent — pillar 01, metrics |
| `--gp-gold-400` | `#F0B429` | Investment accent — sparingly: badges, 12-patent highlight, footer monogram |
| `--gp-slate-50` | `#F6F8FB` | Page background |
| `--gp-slate-100` | `#EDF1F7` | Card background, hover |
| `--gp-slate-300` | `#C9D2E0` | Borders, dividers |
| `--gp-slate-500` | `#5B6B85` | Secondary text |
| `--gp-slate-700` | `#31415E` | Body text |
| `--gp-slate-900` | `#0F1B2E` | Headings on light |

### 2.2 Gradients (hero & highlights)

- **Hero background:** `linear-gradient(135deg, #071126 0%, #0B1E3A 55%, #12294E 100%)` + optional faint grid overlay (1px lines, `rgba(255,255,255,0.04)`) + soft radial cyan glow `radial-gradient(600px 400px at 85% 20%, rgba(34,211,238,0.14), transparent)`.
- **Primary CTA:** `linear-gradient(135deg, #1D5BFF, #2563EB)`; hover lifts 2px + shadow.
- **Section accents:** emerald for education content, blue/cyan for enterprise content, gold for patent/IP content — keep one accent per section, never mixed randomly.

### 2.3 Usage ratios

Roughly: 60% light neutrals · 25% ink navy · 10% primary blue · 5% accent (cyan/emerald/gold). Gold ≤ 2–3% of any viewport (it is an investment accent, not a brand color).

### 2.4 Contrast (AA checks)

- Ink navy `#071126` on white: 16.8:1 ✓ · white on ink navy: 16.8:1 ✓
- `--gp-blue-600 #1D5BFF` on white: ~4.9:1 ✓ (use for text ≥ 14px bold or 16px+)
- `--gp-slate-500 #5B6B85` on white: 4.6:1 ✓ (body-secondary only; never on colored bg)
- `--gp-cyan-400` / `--gp-gold-400`: **never** for body text on light backgrounds; dark text (`#0B1E3A`) on gold/cyan chips passes.
- White text on `--gp-blue-600` buttons: ✓ (4.9:1)

---

## 3. Typography

### 3.1 Font stacks

```css
--font-display: "Sora", "Space Grotesk", "Noto Sans TC", "Noto Sans SC", "PingFang HK", "Microsoft JhengHei", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
--font-body:    "Inter", "Noto Sans TC", "Noto Sans SC", "PingFang HK", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
--font-mono:    "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;
```

- **Latin display:** Sora (or Space Grotesk) — headings, hero, big numbers.
- **Latin body:** Inter.
- **CJK:** `Noto Sans TC` (zh-Hant) / `Noto Sans SC` (zh-Hans) — load **only the face for the active locale** to save bandwidth; `font-family` falls back gracefully.
- **Mono:** JetBrains Mono — patent counts, "12", year figures, code-ish labels like `RAG` / `AI-01`.

### 3.2 Type scale (fluid via `clamp`)

| Role | Size (desktop) | Line-height | Weight |
|---|---|---|---|
| Display / hero H1 | `clamp(2.5rem, 5vw, 4.5rem)` (40–72px) | 1.1 (Latin) / 1.25 (CJK) | 700–800 |
| H2 section title | `clamp(1.75rem, 3vw, 2.5rem)` (28–40px) | 1.15 / 1.3 | 700 |
| H3 card title | `clamp(1.25rem, 1.8vw, 1.5rem)` (20–24px) | 1.25 / 1.35 | 600–700 |
| Body | 16–18px | 1.6 (Latin) / 1.8 (CJK) | 400 |
| Lead / sub-headline | 18–22px | 1.55 / 1.75 | 400–500 |
| Small / caption | 13–14px | 1.5 / 1.6 | 400–500 |
| Overline / kicker | 12–13px, uppercase (Latin) / 13px (CJK) | 1.4 | 600, letter-spacing 0.08em (Latin only — **do not letter-space CJK**) |

### 3.3 CJK-specific rules

- CJK line-height ≥ 1.7 for body, ≥ 1.25 for display.
- Never use `letter-spacing` or `text-transform: uppercase` on Chinese text.
- Punctuation: use full-width forms in zh (`，。：；「」（）`), half-width in EN.
- Chinese numerals style: use 二十億港元 / 20億港元 exactly as written in content; align numerals with `font-variant-numeric: tabular-nums` in data displays.
- Avoid orphan single characters at line ends (CJK-aware `text-wrap: balance` for headings).

---

## 4. Spacing & Layout

### 4.1 Grid & container

- 12-column grid; gutters 24px desktop / 16px mobile.
- Content container: max-width **1200px**; hero inner container 1440px; padding-inline 24px (mobile) / 48px (desktop).
- Base spacing unit **8px**; scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 120.

### 4.2 Section rhythm

- Section vertical padding: **96–120px** desktop, **64px** mobile.
- Section header pattern: overline (kicker) → H2 → lead paragraph (max-width 720px, centered or left-aligned per layout recipe).

### 4.3 Breakpoints

| Breakpoint | Width | Behavior |
|---|---|---|
| `--bp-sm` | 375px | Single column, hamburger nav, tables → stacked cards |
| `--bp-md` | 768px | 2-col grids begin, stats 2×2 |
| `--bp-lg` | 1024px | 3-col pillars, 4-col stats, desktop nav |
| `--bp-xl` | 1440px | Max width applies |

---

## 5. Layout Patterns (page recipes)

### 5.1 Global chrome

- **Header:** sticky, translucent blur (`backdrop-filter: blur(12px)`), ink-navy on hero pages / white with border on light pages (or invert on scroll). Left: logo (GP monogram + wordmark). Center/right: nav links, language switcher, primary CTA button.
- **Language switcher:** segmented control `繁 | 简 | EN` — current locale highlighted with `aria-current`; links preserve current page path.
- **Footer:** dark ink navy. 4 columns: brand + tagline; sitemap links; contact block (address, tel, fax, email); policy/legal placeholders + copyright `© 2026 GP Investment Group Limited. All rights reserved.` Language switcher repeated; monogram with gold accent.

### 5.2 Home page sections

1. **Hero (dark):** left-aligned headline + sub-headline + dual CTAs; right/below: animated stats card or abstract compute motif. Background: §2.2 gradient + grid.
2. **Metrics band:** 4 stat blocks (12 patents · 2 target markets · 4 solution lines · HK$2B+HK$300M opportunity) — big tabular numerals, thin dividers, counters animate once on view.
3. **Three pillars:** numbered cards 01/02/03 (education / SME / R&D&patents), each with icon, description, link to relevant page.
4. **Partner strip:** "合作夥伴 / Partners" overline + logo row (text-based logos OK, grayscale, hover to full color). Placeholder tiles for future partners (`<!-- TBD -->`).
5. **CTA band:** navy panel, H2 + button to contact.

### 5.3 About page

1. Hero (dark, compact): H1 + lead.
2. Company profile: two-column (text + "core positioning" callout card with left gold border).
3. R&D capabilities: stat row (12 patents / 2 granted) + 4-direction grid (研发方向) + team notes card.
4. **Timeline** (development history 2022→2026): vertical line, year chips (mono font), milestone text; alternating sides on desktop, single column mobile.

### 5.4 Products & Solutions page

1. Hero (dark, compact).
2. **Solution 1 — Education AI:** market-background callout (QEF HK$2B, HK$500M scheme, HK$500,000 grant) + 4-card grid (部署 / RAG / 教學 / 行政自動化).
3. **Solution 2 — Enterprise AI:** market-background callout (HK$300M DTS) + 4-card grid (部署 / RAG / 內部AI應用 / — note "內部AI應用" card can be a wide bento card with the four scenario chips: 營銷、運營、客服、數據分析).
4. **Technology products:** 3 bento cards (AI算力伺服器 / RAG知識庫平台 / AI應用中間件) with "spec-sheet" styling (mono labels, bullet lists).

### 5.5 Patents & Technology page

1. Hero (dark, compact) with big "12" numeral + "2 granted" chip (gold).
2. Patent overview table (領域 / 數量 / 狀態) — responsive: table on desktop, stacked cards on mobile; TBD cells rendered as `待補充 · TBD` placeholders.
3. Technology moat: 3 cards (自主研發 / 場景化深耕 / 產學研融合).
4. R&D commitment: 4-item roadmap grid (mono-numbered 01–04).

### 5.6 Market Opportunities page

1. Hero (dark): "香港AI市場：歷史性機遇" + lead.
2. **Opportunity 1 — QEF HK$2B:** left narrative + right data-card stack (20億 / 5億 / 50萬×1,000+ schools). Include the "GP的機遇" callout + 12-month target stat (50+ schools).
3. **Opportunity 2 — 全民AI HK$300M:** same pattern (3億 / 5,000萬 / 34萬+ SMEs).
4. Market outlook summary table (領域 / 政策驅動 / 市場規模 / GP定位) → responsive data grid.
5. CTA band.

### 5.7 Contact page

1. Hero (dark, compact).
2. Two-column: left = contact card (address / tel / fax / email with icons + map placeholder), right = **enquiry form**:
   - Fields: 姓名 Name*, 公司 Company, 電郵 Email*, 電話 Phone, 感興趣的產品/服務 (select — exact options from `pages/06-contact.md`), 留言 Message*, submit button.
   - Validation + success state; posts to `FORM_ENDPOINT` constant.

---

## 6. Components

### 6.1 Buttons
- **Primary:** blue gradient, 8px radius, 14–16px semibold, padding 12px 24px, hover lift 2px + `rgba(29,91,255,0.35)` shadow; focus ring 2px blue offset 2px.
- **Secondary (on dark):** 1px `rgba(255,255,255,0.25)` border, white text; hover bg `rgba(255,255,255,0.08)`.
- **Ghost (on light):** 1px slate-300 border, ink text.
- Arrows: `→` included in content — keep the character per locale (→ works in all three).

### 6.2 Cards
- Radius 12–16px; light cards: bg `#FFFFFF` or slate-50, 1px slate-100 border, `box-shadow: 0 1px 2px rgba(15,27,46,0.04), 0 8px 24px rgba(15,27,46,0.06)`; hover: translateY(-4px), stronger shadow.
- Dark cards: bg ink-800, 1px `rgba(255,255,255,0.08)` border.
- Numbered pillar cards: large ghost numeral (01/02/03) in mono, 40–56px, low-opacity accent color.

### 6.3 Badges & chips
- Radius 999px; 12px semibold; gold chip (dark text on gold) for "12項專利 / 2 granted"; green chip for education; blue chip for enterprise; cyan chip for tech.

### 6.4 Tables / data grids
- Header row: slate-100 bg, semibold; row dividers slate-100; mono numerals; hover row tint slate-50; mobile: horizontal scroll wrapper or stacked-card transform.

### 6.5 Timeline
- Left vertical line (slate-300, 2px), year chips (mono, blue-600), milestone text; dot markers alternate sides desktop.

### 6.6 Form controls
- Inputs: 1px slate-300 border, 8px radius, 48px height, 16px text; focus: 2px blue border + ring; labels 14px semibold; error text 13px red (`#DC2626`), `aria-describedby`.

### 6.7 Language switcher
- Segmented control, 32px height; active segment white bg (on dark: ink-900 bg) + shadow; `aria-pressed`/`aria-current`.

---

## 7. Imagery & Iconography

- **Icons:** 24px stroke icons (Lucide-style, 1.5–2px stroke), semantic per section; gold/blue/cyan/emerald tints only as accents.
- **Photos:** none required — use abstract SVG gradients + grid motifs so the site is launch-ready without assets. Marked slots for client-supplied photos (`<!-- IMG:TBD -->`).
- **Logo:** GP monogram in a rounded square (blue gradient → cyan), wordmark "GP INVESTMENT" + "GROUP LIMITED" (letterspaced, slate-900 on light / white on dark). Favicon: 32/180px versions of the monogram.
- **OG image:** 1200×630 template per locale — ink navy bg, monogram, page title + locale label, subtle grid.

---

## 8. Motion

- Durations 240–480ms; easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- Reveal: fade-up 16px + opacity via IntersectionObserver, stagger 60–100ms, `once: true`.
- Numbers: count-up 800ms with tabular-nums.
- Nav: smooth scroll for same-page anchors; mobile menu slide-in 240ms.
- **`prefers-reduced-motion: reduce`** → disable all animation/transitions.

---

## 9. Accessibility

- Skip-to-content link; landmarks: `header`, `nav`, `main`, `footer`; one `h1` per page.
- Visible focus `outline: 2px solid #1D5BFF; outline-offset: 2px` (on dark: white).
- All icon buttons have aria-labels; tables have `<caption>` or `aria-label`; form errors linked via `aria-describedby`.
- Language switch updates `document.documentElement.lang`.
- Contrast per §2.4; target size ≥ 44×44px for touch.

---

## 10. Performance & Delivery Notes

- Preload fonts (`font-display: swap`); load CJK face only for active locale.
- Lazy-load below-fold images; inline critical hero CSS; static export.
- All design tokens exposed as CSS custom properties on `:root` for easy theming.
