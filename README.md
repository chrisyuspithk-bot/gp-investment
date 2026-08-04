# GP Investment Group Limited — Corporate Website

Production-ready, static-first, fully trilingual (繁體中文 / 简体中文 / English) marketing website for **GP Investment Group Limited** — a Hong Kong-headquartered AI R&D and enterprise digitalization company focused on Hong Kong's education sector and SMEs.

Plain HTML/CSS/JS. No runtime server, no framework, no build dependencies.

## Quick start

```bash
# Regenerate all pages (after editing content.js)
node build.js          # or: npm run build

# Preview locally
python3 -m http.server 8000    # or: npm run serve
# → http://localhost:8000/
```

Deploy by serving the repo root with any static host (GitHub Pages, Cloudflare Pages, nginx, …).

## Repository layout

```
├── build.js               # zero-dependency Node static generator
├── content.js             # ALL copy: every page × 3 locales (single source of truth)
├── assets/
│   ├── css/main.css       # design system (tokens on :root, see docs/2-design-system.md)
│   ├── js/main.js         # nav, lang persistence, reveals, counters, form — vanilla JS
│   └── img/               # logo.svg, favicon.svg/png, apple-touch-icon, og-{locale}.png
├── index.html             # zh-Hant home (generated — do not edit by hand)
├── about/ solutions/ patents/ opportunities/ contact/   # zh-Hant pages (generated)
├── zh-hans/ …             # Simplified Chinese pages (generated)
├── en/ …                  # English pages (generated)
├── 404.html               # trilingual 404 (generated)
├── sitemap.xml robots.txt # generated
├── scripts/
│   ├── fetch-fonts.sh     # downloads OFL fonts for asset generation
│   └── make-images.py     # regenerates OG images + PNG favicons (needs Pillow)
└── docs/                  # source specifications the site was built from
```

**Workflow:** edit `content.js` (copy) or `assets/css/main.css` (styling) → run `node build.js` → commit the generated HTML together with the sources. Generated files are committed so the repo root can be served directly.

## Internationalisation

| Locale | Code | Route | CJK face |
|---|---|---|---|
| Traditional Chinese (default) | `zh-Hant` | `/`, `/about/`, … | Noto Sans TC |
| Simplified Chinese | `zh-Hans` | `/zh-hans/…` | Noto Sans SC |
| English | `en` | `/en/…` | — (Inter/Sora) |

Every page ships per-locale `<html lang>`, `<title>`, meta description, canonical, `hreflang` alternates (+ `x-default`), Open Graph (`og:locale` + per-locale OG image) and Twitter cards. The 繁/简/EN switcher keeps the visitor on the same page and persists the choice (`localStorage`); returning to the bare root later redirects to the stored locale's home. Only the active locale's CJK font is loaded — tiny `text=`-subset fonts cover the switcher glyphs (繁/简) and the 全民AI mentions on EN pages.

## Contact form

Front-end validation (name / email / phone / message) with localized error messages and a success state. The submit endpoint is a single constant at the top of `assets/js/main.js`:

```js
var FORM_ENDPOINT = 'FORM_ENDPOINT_PLACEHOLDER'; // TBD: configure before launch
```

While it remains the placeholder, the form validates and shows the success state locally without sending data anywhere. Point it at any JSON-accepting endpoint (Formspree, a serverless function, the company API) to go live — the payload is `{ name, company, email, phone, interest, message, locale }`.

## Regenerating images (OG images, PNG favicons)

```bash
pip install pillow
bash scripts/fetch-fonts.sh      # one-time: downloads OFL fonts (gitignored, ~36 MB)
python3 scripts/make-images.py   # writes assets/img/og-*.png, favicon-32x32.png, apple-touch-icon.png
```

## Known TBD placeholders (rendered on purpose — see `docs/3-site-structure.md` §6)

- Patent counts per area → dashed `待補充 · TBD` pills in the patents table
- Specific patent names/numbers
- Additional partner logos → dashed "預留位置" tile on Home
- Privacy Policy / Terms of Use pages → footer links stubbed to `#`
- Production domain (`https://www.gpinvestment.com` used for canonical/OG/sitemap — confirm before launch)
- Contact form endpoint (see above)
- Official programme names/figures (QEF 「『智』啟學教」, DTS HK$300M, 全民AI HK$50M) — verify against official sources before launch

## QA checklist

**i18n**
- [x] 6 pages × 3 locales render with complete, per-locale content (no English fallback gaps)
- [x] Language switcher on every page (header + footer + mobile menu), keeps the same page, persists selection via `localStorage`, root redirects to stored locale
- [x] Correct `<html lang>` (`zh-Hant` / `zh-Hans` / `en`), per-locale title/description/OG, `hreflang` ×3 + `x-default` on every page
- [x] CJK rules: Noto Sans TC/SC per locale, no letter-spacing/uppercase on Chinese, CJK line-heights ≥1.7 body / ≥1.25 display

**Content fidelity**
- [x] Every section from `pages/*.md` present in all 3 languages; facts/figures (12 patents / 2 granted, HK$2B, HK$500M, HK$500,000, 1,000+ schools, HK$300M, HK$50M, 340,000+ SMEs, 50+ schools target) reproduced verbatim
- [x] No invented facts, names, quotes or contact details; TBD items rendered as styled placeholders with `<!-- TBD -->` comments
- [x] Contact form select contains exactly the 7 options from `06-contact.md`, per locale

**Design**
- [x] Tokens match `2-design-system.md`: navy ink `#071126/#0B1E3A`, blue `#1D5BFF`, cyan `#22D3EE`, emerald `#10B981`, gold `#F0B429` (sparingly), slate neutrals
- [x] Sora/Space Grotesk display, Inter body, JetBrains Mono numerals (`tabular-nums`), Noto Sans TC/SC for CJK
- [x] Signature sections: sticky translucent header (inverts on scroll), dark gradient+grid hero, 4-stat metrics band with count-up, numbered 01/02/03 pillar cards, partner strip with TBD tile, timeline, bento solution grids, patent table, market data cards, CTA bands, dark 4-column footer with gold-accent monogram
- [x] Motion: fade-up reveals via IntersectionObserver (staggered, once), 240–480 ms `cubic-bezier(0.22,1,0.36,1)`, count-up 800 ms

**Responsive** (verified via headless Chromium screenshots)
- [x] 375px: single column, hamburger menu (slide-in, ESC closes, `aria-expanded`), tables in horizontal scroll wrappers
- [x] 768px: 2-col grids, hero visual appears
- [x] 1024/1440px: 3-col pillars, 4-col metrics with dividers, max-width 1200px (hero 1440px)

**Accessibility (WCAG 2.1 AA)**
- [x] Skip-to-content link; `header/nav/main/footer` landmarks; one `h1` per page
- [x] Visible focus rings (blue on light, white on dark); `aria-current="page"` on active nav; `aria-label`s on icon-only controls; tables have `<caption>`
- [x] Contrast per design-system §2.4 (ink on white 16.8:1, blue 4.9:1, white on blue 4.9:1); touch targets ≥44px
- [x] `prefers-reduced-motion: reduce` disables all animation; form errors linked with `aria-describedby`, `aria-invalid`, focus moves to first invalid field, success uses `role="status"`

**SEO**
- [x] `sitemap.xml` — all 18 URLs with `xhtml:link` hreflang alternates + `lastmod`
- [x] `robots.txt` allows all + references sitemap
- [x] JSON-LD on every page: `Organization` (address, contactPoint, parentOrganization) + `WebSite` on home + `BreadcrumbList` on inner pages
- [x] Per-locale 1200×630 OG images, Twitter `summary_large_image`, canonical per locale, favicon SVG/PNG + apple-touch-icon
- [x] Trilingual `404.html`

**Performance**
- [x] Static HTML, zero JS frameworks; ~14 KB JS, ~20 KB CSS (uncompressed)
- [x] `font-display: swap`; only the active CJK face loaded; glyph subsets for cross-locale stray characters
- [x] No images above the fold except inline SVG (zero layout shift); hero art is pure CSS
- [x] Form is front-end only; no external API calls anywhere
