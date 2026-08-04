# Site Structure — GP Investment Group Limited Website

> Information architecture, routing, navigation, SEO, and structured data.
> Companion to `1-master-generation-prompt.md` (prompt), `2-design-system.md` (visual), and `pages/*.md` (content).

---

## 1. Sitemap & Routing

Three locales: **zh-Hant** (Traditional Chinese, default), **zh-Hans** (Simplified Chinese), **en** (English).
Routing scheme: `zh-Hant` at root; `zh-Hans` and `en` locale-prefixed.

| Page | zh-Hant (root) | zh-Hans | en | Page file |
|---|---|---|---|---|
| Home 首頁 / 首页 / Home | `/` | `/zh-hans/` | `/en/` | `pages/01-home.md` |
| About 關於我們 / 关于我们 | `/about/` | `/zh-hans/about/` | `/en/about/` | `pages/02-about.md` |
| Products & Solutions 產品與解決方案 | `/solutions/` | `/zh-hans/solutions/` | `/en/solutions/` | `pages/03-solutions.md` |
| Patents & Technology 專利與技術 | `/patents/` | `/zh-hans/patents/` | `/en/patents/` | `pages/04-patents.md` |
| Market Opportunities 市場機遇 | `/opportunities/` | `/zh-hans/opportunities/` | `/en/opportunities/` | `pages/05-market-opportunities.md` |
| Contact 聯絡我們 / 联系我们 | `/contact/` | `/zh-hans/contact/` | `/en/contact/` | `pages/06-contact.md` |

> Note: all-slug-prefixed variants (`/zh-hant/…`, `/zh-hans/…`, `/en/…`) are also acceptable if a uniform scheme is preferred; root `/` then 301-redirects to `/zh-hant/`. Pick one scheme, apply it consistently, and mirror it in `sitemap.xml` + hreflang.

---

## 2. Navigation

### 2.1 Main nav (desktop & mobile)

| zh-Hant | zh-Hans | en | href |
|---|---|---|---|
| 首頁 | 首页 | Home | `/` |
| 關於我們 | 关于我们 | About Us | `/about/` |
| 產品與解決方案 | 产品与解决方案 | Products & Solutions | `/solutions/` |
| 專利與技術 | 专利与技术 | Patents & Technology | `/patents/` |
| 市場機遇 | 市场机遇 | Market Opportunities | `/opportunities/` |
| 聯絡我們 | 联系我们 | Contact Us | `/contact/` |

Header CTA: 「探索AI方案」/「探索AI方案」/ "Explore AI Solutions" → `/solutions/`.
Active page: `aria-current="page"`.

### 2.2 Footer nav

Same six links + brand block + contact + language switcher + placeholders:
「私隱政策」/「隐私政策」/ "Privacy Policy" · 「使用條款」/「使用条款」/ "Terms of Use" (TBD pages — link to `#` with `<!-- TBD -->`).

---

## 3. Page Meta (title / description per locale)

> Also emitted as `<title>` + meta description + Open Graph `og:title` / `og:description`. Source of truth = `pages/*.md` front matter; table below is the compiled index.

| Page | Locale | Meta Title | Meta Description |
|---|---|---|---|
| Home | zh-Hant | GP Investment Group Limited — AI研發 · 教育及中小企業數碼化賦能 | GP Investment Group Limited 是一家專注於AI研發與企業數碼化解決方案的科技公司。聚焦香港學界與中小企業市場，提供AI算力本地部署、RAG知識庫建立及AI教學/行政/商業應用方案，已申請12項核心技術專利。 |
| Home | zh-Hans | GP Investment Group Limited — AI研发 · 教育及中小企业数字化赋能 | GP Investment Group Limited 是一家专注于AI研发与企业数字化解决方案的科技公司。聚焦香港学界与中小企业市场，提供AI算力本地部署、RAG知识库建立及AI教学/行政/商业应用方案，已申请12项核心技术专利。 |
| Home | en | GP Investment Group Limited — AI R&D · Digital Empowerment for Education & SMEs | GP Investment Group Limited is a technology company focused on AI R&D and enterprise digital solutions. Targeting Hong Kong's education and SME sectors, we provide AI on-premise deployment, RAG knowledge base construction, and AI-powered teaching/administrative/business application solutions, with 12 core technology patents filed. |
| About | zh-Hant | 關於我們 \| GP Investment Group Limited — AI研發與企業數碼化 | — |
| About | zh-Hans | 关于我们 \| GP Investment Group Limited — AI研发与企业数字化 | — |
| About | en | About Us \| GP Investment Group Limited — AI R&D & Enterprise Digitalization | — |
| Solutions | zh-Hant | 產品與解決方案 \| GP Investment Group Limited — AI教育 · AI企業 · 技術產品 | — |
| Solutions | zh-Hans | 产品与解决方案 \| GP Investment Group Limited — AI教育 · AI企业 · 技术产品 | — |
| Solutions | en | Products & Solutions \| GP Investment Group Limited — AI Education · AI Enterprise · Technology Products | — |
| Patents | zh-Hant | 專利與技術 \| GP Investment Group Limited — 12項核心技術專利 | — |
| Patents | zh-Hans | 专利与技术 \| GP Investment Group Limited — 12项核心技术专利 | — |
| Patents | en | Patents & Technology \| GP Investment Group Limited — 12 Core Technology Patents | — |
| Market | zh-Hant | 市場機遇 \| GP Investment Group Limited — 優質教育基金20億 · 全民AI | — |
| Market | zh-Hans | 市场机遇 \| GP Investment Group Limited — 优质教育基金20亿 · 全民AI | — |
| Market | en | Market Opportunities \| GP Investment Group Limited — QEF HK$2B · 全民AI | — |
| Contact | zh-Hant | 聯絡我們 \| GP Investment Group Limited | — |
| Contact | zh-Hans | 联系我们 \| GP Investment Group Limited | — |
| Contact | en | Contact Us \| GP Investment Group Limited | — |

> Rule: for pages without a full description in the source content, compose the meta description from the page's lead paragraph (per locale, ≤ 155–160 chars) — never reuse the Home description.

---

## 4. Structured Data (JSON-LD)

Inject on every page (sitewide `Organization`), plus `WebSite` on Home and `BreadcrumbList` on inner pages.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GP Investment Group Limited",
  "url": "https://www.gpinvestment.com/",            // TBD: confirm production domain
  "description": "AI R&D and enterprise digitalization solutions for Hong Kong education and SMEs.",
  "foundingDate": "2022",
  "parentOrganization": { "@type": "Organization", "name": "OrchardTech Greenova Group" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Unit 1906-07, 19/F, Shui On Centre, 6-8 Harbour Road",
    "addressLocality": "Wan Chai, Hong Kong",
    "addressCountry": "HK"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+852-3628-3499",
    "contactType": "customer service",
    "email": "info@gpinvestment.com",
    "availableLanguage": ["zh-Hant", "zh-Hans", "en"]
  }
}
```

Add per-locale `url` alternates via hreflang (`link rel="alternate" hreflang="zh-Hant"` etc.) on every page.

---

## 5. SEO & Social Assets

- `sitemap.xml` — all 18 URLs (6 pages × 3 locales) with `xhtml:link` hreflang alternates; `lastmod` updated at build.
- `robots.txt` — allow all; reference sitemap.
- `404.html` — trilingual message + link home.
- `favicon.ico` / `favicon-32x32.png` / `apple-touch-icon.png` — GP monogram (§7 of design system).
- OG images: `og-{locale}.png` 1200×630 per locale (template with monogram + page title + locale label).
- Canonical per locale: `https://www.gpinvestment.com{path}`.

---

## 6. Content Notes & Verification (TBD list)

Items intentionally left open; the generator must render them as styled placeholders and flag them in code comments:

| Item | Status |
|---|---|
| 專利領域數量 (patent counts per area) — `pages/04-patents.md` | TBD — client to supply names/numbers |
| 具體專利名稱/編號 (patent names/numbers) | TBD — optional detail |
| 更多合作夥伴 logos (partner strip) | TBD — placeholder tiles provided |
| 私隱政策 / 使用條款 pages | TBD — links stubbed |
| Production domain & HTTPS | TBD — confirm before launch |
| Official programme names/figures (QEF「『智』啟學教」計劃, 數碼轉型支援先導計劃 HK$300M, 全民AI HK$50M, coverage counts) | Verify against official sources before launch |
| Contact form endpoint | TBD — `FORM_ENDPOINT` constant |

---

## 7. File Tree (target output)

```
gp-website/ (source)
├── 1-master-generation-prompt.md
├── 2-design-system.md
├── 3-site-structure.md
├── site-config.json
├── pages/
│   ├── 01-home.md
│   ├── 02-about.md
│   ├── 03-solutions.md
│   ├── 04-patents.md
│   ├── 05-market-opportunities.md
│   └── 06-contact.md
└── README.md

generated site (deliverable of the prompt)
├── index.html … (per-locale routes)
├── assets/ (css, js, fonts, img, og)
├── sitemap.xml · robots.txt · 404.html
└── favicon.*
```
