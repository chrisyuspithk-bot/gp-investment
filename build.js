/**
 * GP Investment Group Limited — zero-dependency static site generator.
 * Usage: node build.js
 * Output: 18 pages (6 pages x 3 locales) + 404.html + sitemap.xml + robots.txt at repo root.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const C = require('./content.js');

const ROOT = __dirname;
const LOCALES = C.LOCALES.map((l) => l.code);
const LOCALE_PREFIX = { 'zh-Hant': '/', 'zh-Hans': '/zh-hans/', en: '/en/' };
const OG_FILE = { 'zh-Hant': 'og-zh-hant.png', 'zh-Hans': 'og-zh-hans.png', en: 'og-en.png' };

/* ---------------- helpers ---------------- */

function urlFor(locale, page) {
  return LOCALE_PREFIX[locale] + C.SLUGS[page];
}
/* Pages are emitted as root-relative absolute paths (urlFor) for canonical/OG/
   sitemap metadata, but every in-document link is RELATIVE so the same build
   works from a domain root (custom domain) and from a sub-path (GitHub Pages
   project site) without rebuilding. */
function depthOf(locale, page) {
  return (locale === 'zh-Hant' ? 0 : 1) + (page === 'home' ? 0 : 1);
}
function relFor(fromLocale, fromPage, toAbsPath) {
  const t = toAbsPath.replace(/^\//, '');
  return '../'.repeat(depthOf(fromLocale, fromPage)) + (t === '' ? './' : t);
}
function assetFor(fromLocale, fromPage, assetPath) {
  return '../'.repeat(depthOf(fromLocale, fromPage)) + assetPath.replace(/^\//, '');
}
function outPath(locale, page) {
  const p = urlFor(locale, page);
  return path.join(ROOT, p === '/' ? 'index.html' : p, p === '/' ? '' : 'index.html');
}
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
/* Animated counter span. The FINAL value is rendered statically so the figure
   is correct without JS; main.js animates 0 -> n once when scrolled into view. */
function countSpan(s) {
  const p = s.prefix || '', x = s.suffix || '';
  return `<span data-count="${s.n}"${p ? ` data-prefix="${p}"` : ''}${x ? ` data-suffix="${x}"` : ''}>${p}${s.n.toLocaleString('en-US')}${x}</span>`;
}
function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log('  wrote', path.relative(ROOT, file));
}

/* ---------------- inline SVG icons (24px stroke, Lucide-style) ---------------- */

const I = (inner) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;
const ICONS = {
  cap: I('<path d="M22 9.5 12 4 2 9.5l10 5.5 10-5.5Z"/><path d="M6 12.3V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.7"/><path d="M22 9.5V15"/>'),
  briefcase: I('<rect x="3" y="7.5" width="18" height="12.5" rx="2"/><path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5"/><path d="M3 12.5h18"/>'),
  flask: I('<path d="M9.5 3h5"/><path d="M10 3v5.2L4.6 17.4A2 2 0 0 0 6.4 20.5h11.2a2 2 0 0 0 1.8-3.1L14 8.2V3"/><path d="M7.5 14h9"/>'),
  server: I('<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>'),
  database: I('<ellipse cx="12" cy="5.5" rx="8" ry="2.8"/><path d="M4 5.5v13c0 1.6 3.6 2.8 8 2.8s8-1.2 8-2.8v-13"/><path d="M4 12c0 1.6 3.6 2.8 8 2.8s8-1.2 8-2.8"/>'),
  workflow: I('<rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="15" y="15" width="6" height="6" rx="1.5"/><path d="M9 6h6a3 3 0 0 1 3 3v6"/><path d="M6 9v3a3 3 0 0 0 3 3h3"/>'),
  apps: I('<rect x="3" y="3" width="7.5" height="7.5" rx="1.8"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.8"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.8"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.8"/>'),
  shield: I('<path d="M12 3 4.5 6v5.2c0 4.6 3.2 8 7.5 9.8 4.3-1.8 7.5-5.2 7.5-9.8V6L12 3Z"/><path d="m9 11.8 2.2 2.2 4-4.2"/>'),
  target: I('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.8"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>'),
  users: I('<circle cx="9" cy="8.5" r="3.5"/><path d="M2.8 20c.8-3.2 3.2-5 6.2-5s5.4 1.8 6.2 5"/><path d="M15.5 5.4a3.5 3.5 0 0 1 0 6.2"/><path d="M17.6 15.4c2 .6 3.3 2.1 3.8 4.1"/>'),
  pin: I('<path d="M12 21.2s7-6.1 7-11.2a7 7 0 1 0-14 0c0 5.1 7 11.2 7 11.2Z"/><circle cx="12" cy="10" r="2.6"/>'),
  phone: I('<path d="M5 3.8h3.4l1.7 4.4-2.2 1.7a13.4 13.4 0 0 0 6.2 6.2l1.7-2.2 4.4 1.7V19a2 2 0 0 1-2.2 2A17.2 17.2 0 0 1 3 6a2 2 0 0 1 2-2.2Z"/>'),
  fax: I('<path d="M7 8V3.5h10V8"/><rect x="3" y="8" width="18" height="9" rx="2"/><path d="M7 13.5h10v7H7z"/><path d="M17.5 11h.01"/>'),
  mail: I('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>'),
  arrow: I('<path d="M4.5 12h15"/><path d="m13.5 6 6 6-6 6"/>'),
  check: I('<path d="m4.5 12.5 5 5 10-11"/>'),
  globe: I('<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.5 2.3 3.8 5.2 3.8 8.5s-1.3 6.2-3.8 8.5c-2.5-2.3-3.8-5.2-3.8-8.5s1.3-6.2 3.8-8.5Z"/>'),
  building: I('<rect x="4.5" y="3.5" width="15" height="17" rx="1.5"/><path d="M9 7.5h2M13 7.5h2M9 11h2M13 11h2M9 14.5h2M13 14.5h2"/><path d="M10.5 20.5v-3h3v3"/>'),
  trend: I('<path d="m3.5 16.5 5.5-5.5 3.5 3.5 7.5-7.5"/><path d="M15.5 7H20v4.5"/>'),
  clock: I('<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.2l3.4 2"/>'),
  menu: I('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: I('<path d="m6 6 12 12M18 6 6 18"/>'),
};
function icon(name, cls) {
  return `<span class="icon${cls ? ' ' + cls : ''}">${ICONS[name] || ICONS.apps}</span>`;
}

/* ---------------- logo ---------------- */

function logoSvg(id, monoCls) {
  // GP monogram: rounded square, blue gradient -> cyan, white GP
  return `<svg class="logo-mark" viewBox="0 0 44 44" role="img" aria-hidden="true" focusable="false">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1D5BFF"/><stop offset="1" stop-color="#22D3EE"/>
    </linearGradient></defs>
    <rect width="44" height="44" rx="11" fill="url(#${id})"/>
    <text x="22" y="28.5" text-anchor="middle" font-family="Sora,'Space Grotesk',sans-serif" font-size="17" font-weight="800" fill="#fff" letter-spacing="0.5">GP</text>
  </svg>`;
}
function logo(locale, page, id) {
  return `<a class="logo" href="${relFor(locale, page, urlFor(locale, 'home'))}" aria-label="GP Investment Group Limited — ${C.ui[locale].nav.home}">
    ${logoSvg(id)}
    <span class="logo-word"><span class="logo-name">GP INVESTMENT</span><span class="logo-sub">GROUP LIMITED</span></span>
  </a>`;
}

/* ---------------- head / chrome ---------------- */

function fontsUrl(locale) {
  const fam = ['family=Sora:wght@600;700;800', 'family=Inter:wght@400;500;600;700', 'family=JetBrains+Mono:wght@500;600;700'];
  const loc = C.LOCALES.find((l) => l.code === locale);
  if (loc.cjkFont) fam.push(`family=${loc.cjkFont}`);
  return `https://fonts.googleapis.com/css2?${fam.join('&')}&display=swap`;
}

/* Glyphs needed from the *other* CJK face on each page: the language switcher
   shows 繁/简 everywhere, and EN content mentions 全民AI. Tiny text-subsets
   (a few KB) keep the "load only the active CJK face" rule intact. */
const EXTRA_FONT_LINKS = {
  'zh-Hant': ['family=Noto+Sans+SC:wght@600&text=%E7%AE%80'],
  'zh-Hans': ['family=Noto+Sans+TC:wght@600&text=%E7%B9%81'],
  en: ['family=Noto+Sans+TC:wght@400;600&text=%E7%B9%81%E5%85%A8%E6%B0%91', 'family=Noto+Sans+SC:wght@600&text=%E7%AE%80'],
};
function extraFontLinks(locale) {
  return EXTRA_FONT_LINKS[locale]
    .map((f) => `  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?${f}&display=swap">`)
    .join('\n');
}

function hreflangLinks(page) {
  return LOCALES.map((l) => `  <link rel="alternate" hreflang="${l}" href="${C.BASE_URL}${urlFor(l, page)}">`).join('\n') +
    `\n  <link rel="alternate" hreflang="x-default" href="${C.BASE_URL}${urlFor('zh-Hant', page)}">`;
}

function jsonLd(locale, page) {
  const org = {
    '@context': 'https://schema.org', '@type': 'Organization',
    name: 'GP Investment Group Limited', url: C.BASE_URL + '/',
    description: 'AI R&D and enterprise digitalization solutions for Hong Kong education and SMEs.',
    foundingDate: '2022',
    parentOrganization: { '@type': 'Organization', name: 'OrchardTech Greenova Group' },
    address: {
      '@type': 'PostalAddress', streetAddress: 'Unit 1906-07, 19/F, Shui On Centre, 6-8 Harbour Road',
      addressLocality: 'Wan Chai, Hong Kong', addressCountry: 'HK',
    },
    contactPoint: {
      '@type': 'ContactPoint', telephone: '+852-3628-3499', contactType: 'customer service',
      email: 'info@gpinvestment.com', availableLanguage: ['zh-Hant', 'zh-Hans', 'en'],
    },
  };
  const blocks = [org];
  if (page === 'home') {
    blocks.push({ '@context': 'https://schema.org', '@type': 'WebSite', name: 'GP Investment Group Limited', url: C.BASE_URL + '/', inLanguage: locale });
  } else {
    blocks.push({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: C.ui[locale].nav.home, item: C.BASE_URL + urlFor(locale, 'home') },
        { '@type': 'ListItem', position: 2, name: C.ui[locale].nav[page], item: C.BASE_URL + urlFor(locale, page) },
      ],
    });
  }
  return blocks.map((b) => `  <script type="application/ld+json">${JSON.stringify(b)}</script>`).join('\n');
}

function head(locale, page, meta) {
  const canonical = C.BASE_URL + urlFor(locale, page);
  const ogImage = `${C.BASE_URL}/assets/img/${OG_FILE[locale]}`;
  const loc = C.LOCALES.find((l) => l.code === locale);
  const others = LOCALES.filter((l) => l !== locale).map((l) => C.LOCALES.find((x) => x.code === l).ogLocale);
  const homeMap = LOCALES.map((l) => `'${l}':'${relFor(locale, page, urlFor(l, 'home'))}'`).join(',');
  const redirectScript = page === 'home'
    ? `  <script>(function(){try{var p=localStorage.getItem('gp-locale');var m={${homeMap}};if(p&&m[p]&&p!==document.documentElement.lang){location.replace(m[p]);}}catch(e){}})();</script>\n`
    : '';
  return `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(meta.title)}</title>
  <meta name="description" content="${esc(meta.description)}">
  <link rel="canonical" href="${canonical}">
${hreflangLinks(page)}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="GP Investment Group Limited">
  <meta property="og:title" content="${esc(meta.title)}">
  <meta property="og:description" content="${esc(meta.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="${loc.ogLocale}">
${others.map((o) => `  <meta property="og:locale:alternate" content="${o}">`).join('\n')}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(meta.title)}">
  <meta name="twitter:description" content="${esc(meta.description)}">
  <meta name="twitter:image" content="${ogImage}">
  <meta name="theme-color" content="#071126">
  <link rel="icon" href="${assetFor(locale, page, 'assets/img/favicon.svg')}" type="image/svg+xml">
  <link rel="icon" href="${assetFor(locale, page, 'assets/img/favicon-32x32.png')}" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="${assetFor(locale, page, 'assets/img/apple-touch-icon.png')}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="${fontsUrl(locale)}">
${extraFontLinks(locale)}
  <link rel="stylesheet" href="${assetFor(locale, page, 'assets/css/main.css')}">
${redirectScript}${jsonLd(locale, page)}
</head>`;
}

function langSwitcher(locale, page, idPrefix) {
  const u = C.ui[locale];
  const segs = C.LOCALES.map((l) => {
    const active = l.code === locale;
    return `      <a class="seg${active ? ' is-active' : ''}" href="${relFor(locale, page, urlFor(l.code, page))}" hreflang="${l.code}" lang="${l.code}"${active ? ' aria-current="true"' : ''} data-lang-switch="${l.code}">${l.short}</a>`;
  }).join('\n');
  return `    <div class="seg-ctrl" role="group" aria-label="${u.langSwitch}" id="${idPrefix}">
${segs}
    </div>`;
}

function header(locale, page) {
  const u = C.ui[locale];
  const links = C.PAGES.map((p) => {
    const active = p === page;
    return `        <li><a href="${relFor(locale, page, urlFor(locale, p))}"${active ? ' aria-current="page" class="is-active"' : ''}>${u.nav[p]}</a></li>`;
  }).join('\n');
  const mLinks = C.PAGES.map((p) => {
    const active = p === page;
    return `        <li><a href="${relFor(locale, page, urlFor(locale, p))}"${active ? ' aria-current="page" class="is-active"' : ''}>${u.nav[p]}</a></li>`;
  }).join('\n');
  return `  <a class="skip-link" href="#main">${u.skip}</a>
  <header class="site-header" id="site-header">
    <div class="header-inner">
      ${logo(locale, page, 'lg-h')}
      <nav class="main-nav" aria-label="${u.navAria}">
        <ul>
${links}
        </ul>
      </nav>
      <div class="header-actions">
        ${langSwitcher(locale, page, 'sw-header')}
        <a class="btn btn-primary btn-sm header-cta" href="${relFor(locale, page, urlFor(locale, 'solutions'))}">${u.cta}</a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="${u.menuOpen}" data-label-close="${u.menuClose}" data-menu-toggle>
          <span class="menu-toggle-open">${ICONS.menu}</span>
          <span class="menu-toggle-close">${ICONS.close}</span>
        </button>
      </div>
    </div>
  </header>
  <div class="mobile-menu" id="mobile-menu" hidden>
    <nav aria-label="${u.navAria}">
      <ul>
${mLinks}
      </ul>
    </nav>
    <div class="mobile-menu-foot">
      ${langSwitcher(locale, page, 'sw-mobile')}
      <a class="btn btn-primary" href="${relFor(locale, page, urlFor(locale, 'solutions'))}">${u.cta}</a>
    </div>
  </div>`;
}

function footer(locale, page) {
  const u = C.ui[locale];
  const ct = C.CONTACT;
  const cl = u.contactLabels;
  const navLinks = C.PAGES.map((p) => `            <li><a href="${relFor(locale, page, urlFor(locale, p))}">${u.nav[p]}</a></li>`).join('\n');
  return `  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">${logoSvg('lg-f')}<span class="logo-word"><span class="logo-name">GP INVESTMENT</span><span class="logo-sub">GROUP LIMITED</span></span></div>
        <p class="footer-tagline">${u.footerTagline}</p>
        <div class="footer-lang">
          <span class="footer-lang-label">${icon('globe')}${u.langLabel}</span>
          ${langSwitcher(locale, page, 'sw-footer')}
        </div>
      </div>
      <nav class="footer-col" aria-label="${u.footerNav}">
        <h2 class="footer-heading">${u.footerNav}</h2>
        <ul>
${navLinks}
        </ul>
      </nav>
      <div class="footer-col">
        <h2 class="footer-heading">${u.footerContact}</h2>
        <ul class="footer-contact">
          <li>${icon('pin')}<span>${ct.address[locale]}</span></li>
          <li>${icon('phone')}<a href="tel:${ct.telHref}">${ct.tel}</a></li>
          <li>${icon('fax')}<span>${ct.fax}</span></li>
          <li>${icon('mail')}<a href="mailto:${ct.email}">${ct.email}</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h2 class="footer-heading">${u.footerLegal}</h2>
        <ul>
          <!-- TBD: 私隱政策 / 隐私政策 / Privacy Policy page -->
          <li><a href="#">${u.privacy}</a></li>
          <!-- TBD: 使用條款 / 使用条款 / Terms of Use page -->
          <li><a href="#">${u.terms}</a></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>&copy; 2026 GP Investment Group Limited. All rights reserved.</p>
    </div>
  </footer>`;
}

/* ---------------- shared section blocks ---------------- */

function sectionHead(data, opts = {}) {
  return `      <div class="section-head${opts.center ? ' section-head-center' : ''}" data-reveal>
        <p class="overline">${data.overline}</p>
        <h2>${data.heading}</h2>
        ${data.lead ? `<p class="lead">${data.lead}</p>` : ''}
      </div>`;
}

function heroCompact(locale, h) {
  return `    <section class="hero hero-compact" id="s1-hero">
      <div class="container hero-inner">
        <h1 data-reveal>${h.h1}</h1>
        <p class="hero-sub" data-reveal>${h.sub}</p>
      </div>
    </section>`;
}

function ctaBand(locale, page, c) {
  return `    <section class="cta-band">
      <div class="container cta-inner" data-reveal>
        <h2>${c.heading}</h2>
        <a class="btn btn-primary btn-lg" href="${relFor(locale, page, urlFor(locale, 'contact'))}">${c.button} ${icon('arrow', 'icon-arrow')}</a>
      </div>
    </section>`;
}

function pageShell(locale, page, meta, main) {
  return `<!DOCTYPE html>
<html lang="${locale}">
${head(locale, page, meta)}
<body data-page="${page}">
${header(locale, page)}
  <main id="main">
${main}
  </main>
${footer(locale, page)}
  <script src="${assetFor(locale, page, 'assets/js/main.js')}" defer></script>
</body>
</html>
`;
}

/* ---------------- page renderers ---------------- */

function renderHome(locale) {
  const d = C.home;
  const u = C.ui[locale];
  const h = d.hero[locale];
  const m = d.metrics[locale];
  const p = d.pillars[locale];
  const pt = d.partners[locale];
  const stats = m.items.map((s) => `
          <div class="metric" data-reveal>
            <p class="metric-num num">${countSpan(s)}</p>
            <p class="metric-label">${s.label}</p>
            <p class="metric-sub">${s.sub}</p>
          </div>`).join('');
  const pillars = p.items.map((it) => `
          <article class="pillar accent-${it.accent}" data-reveal>
            <span class="pillar-num num" aria-hidden="true">${it.num}</span>
            <div class="pillar-icon">${icon(it.icon)}</div>
            <h3>${it.title}</h3>
            <p>${it.desc}</p>
            <a class="text-link" href="${relFor(locale, 'home', urlFor(locale, it.page))}${it.anchor ? '#' + it.anchor : ''}">${u.learnMore} ${icon('arrow', 'icon-arrow')}</a>
          </article>`).join('');
  const partners = pt.items.map((x) => `
          <div class="partner-tile" data-reveal>
            <span class="partner-name">${x.name}</span>
            <span class="partner-role">${x.role}</span>
          </div>`).join('');
  const main = `    <section class="hero hero-home" id="s1-hero">
      <div class="hero-frame container">
        <div class="hero-inner">
          <p class="overline overline-dark" data-reveal>${h.overline}</p>
          <h1 data-reveal>${h.h1[0]}<br><span class="hero-grad">${h.h1[1]}</span></h1>
          <p class="hero-sub" data-reveal>${h.sub}</p>
          <div class="hero-ctas" data-reveal>
            <a class="btn btn-primary btn-lg" href="${relFor(locale, 'home', urlFor(locale, 'solutions'))}">${h.ctaPrimary} ${icon('arrow', 'icon-arrow')}</a>
            <a class="btn btn-secondary btn-lg" href="${relFor(locale, 'home', urlFor(locale, 'opportunities'))}">${h.ctaSecondary}</a>
          </div>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <div class="hero-orb"></div>
          <div class="hero-chip-row"><span class="hero-chip">RAG</span><span class="hero-chip">AI</span><span class="hero-chip">LLM</span></div>
          <div class="hero-card num"><span class="hero-card-big">12</span><span class="hero-card-small">${m.items[0].label}</span></div>
        </div>
      </div>
    </section>
    <section class="section metrics-band" id="s2-metrics">
      <div class="container">
${sectionHead(m, { center: true })}
        <div class="metrics-grid">
${stats}
        </div>
      </div>
    </section>
    <section class="section section-tint" id="s3-pillars">
      <div class="container">
${sectionHead(p)}
        <div class="pillars-grid">
${pillars}
        </div>
      </div>
    </section>
    <section class="section" id="s4-partners">
      <div class="container">
        <p class="overline partners-overline" data-reveal>${pt.overline}</p>
        <div class="partners-row">
${partners}
        </div>
      </div>
    </section>
${ctaBand(locale, 'home', d.cta[locale])}`;
  return pageShell(locale, 'home', d.meta[locale], main);
}

function renderAbout(locale) {
  const d = C.about;
  const prof = d.profile[locale];
  const rd = d.rd[locale];
  const hist = d.history[locale];
  const rdStats = rd.stats.map((s) => `
            <div class="rd-stat">
              <p class="rd-stat-num num">${countSpan(s)}</p>
              <p class="rd-stat-label">${s.label}</p>
            </div>`).join('');
  const dirs = rd.directions.map((x, i) => `
            <div class="dir-card" data-reveal>
              <span class="dir-num num">${String(i + 1).padStart(2, '0')}</span>
              <p>${x}</p>
            </div>`).join('');
  const team = rd.team.map((t) => `              <li>${icon('check', 'icon-check')}${t}</li>`).join('\n');
  const timeline = hist.items.map((t) => `
          <li class="timeline-item" data-reveal>
            <span class="timeline-year num">${t.year}</span>
            <p class="timeline-text">${t.text}</p>
          </li>`).join('');
  const main = `${heroCompact(locale, d.hero[locale])}
    <section class="section" id="s2-profile">
      <div class="container">
        <div class="profile-grid">
          <div data-reveal>
            <p class="overline">${prof.overline}</p>
            <h2>${prof.heading}</h2>
            <p class="body-lg">${prof.body}</p>
          </div>
          <aside class="callout-gold" data-reveal>
            <h3>${prof.calloutTitle}</h3>
            <p>${prof.callout}</p>
          </aside>
        </div>
      </div>
    </section>
    <section class="section section-tint" id="s3-rd">
      <div class="container">
${sectionHead(rd)}
        <div class="rd-stats" data-reveal>
${rdStats}
          <p class="rd-note">${rd.statsNote}</p>
        </div>
        <h3 class="subhead">${rd.directionsTitle}</h3>
        <div class="dir-grid">
${dirs}
        </div>
        <div class="team-card" data-reveal>
          <div class="team-icon">${icon('users')}</div>
          <div>
            <h3>${rd.teamTitle}</h3>
            <ul class="check-list">
${team}
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="section" id="s4-history">
      <div class="container">
${sectionHead(hist)}
        <ol class="timeline">
${timeline}
        </ol>
      </div>
    </section>`;
  return pageShell(locale, 'about', d.meta[locale], main);
}

function solutionSection(locale, s, id, accent) {
  const cards = s.cards.map((c) => `
            <article class="sol-card" data-reveal>
              <div class="sol-icon accent-bg-${accent}">${icon(c.icon)}</div>
              <h3>${c.title}</h3>
              <p>${c.desc}</p>
            </article>`).join('');
  const wide = s.wideCard ? `
            <article class="sol-card sol-card-wide" data-reveal>
              <div class="sol-icon accent-bg-${accent}">${icon(s.wideCard.icon)}</div>
              <h3>${s.wideCard.title}</h3>
              <p>${s.wideCard.desc}</p>
              <div class="chip-grid">
${s.wideCard.chips.map((ch) => `                <div class="scenario-chip"><span class="chip-name">${ch.name}</span><span class="chip-detail">${ch.detail}</span></div>`).join('\n')}
              </div>
            </article>` : '';
  return `    <section class="section${accent === 'blue' ? ' section-tint' : ''}" id="${id}">
      <div class="container">
${sectionHead(s)}
        <div class="sol-meta" data-reveal>
          <p class="sol-target">${icon('users')}<strong>${s.targetLabel}：</strong>${s.target}</p>
          <div class="market-callout accent-border-${accent}">
            <p class="market-callout-label">${s.marketLabel}</p>
            <p>${s.market}</p>
          </div>
        </div>
        <h3 class="subhead">${s.coreLabel}</h3>
        <div class="sol-grid">
${cards}
${wide}
        </div>
      </div>
    </section>`;
}

function renderSolutions(locale) {
  const d = C.solutions;
  const pr = d.products[locale];
  const products = pr.items.map((p) => `
          <article class="product-card" data-reveal>
            <p class="product-code num">${p.code}</p>
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
          </article>`).join('');
  const main = `${heroCompact(locale, d.hero[locale])}
${solutionSection(locale, d.education[locale], 's2-education', 'green')}
${solutionSection(locale, d.enterprise[locale], 's3-enterprise', 'blue')}
    <section class="section" id="s4-products">
      <div class="container">
${sectionHead(pr)}
        <div class="product-grid">
${products}
        </div>
      </div>
    </section>`;
  return pageShell(locale, 'solutions', d.meta[locale], main);
}

function renderPatents(locale) {
  const d = C.patents;
  const h = d.hero[locale];
  const ov = d.overview[locale];
  const moat = d.moat[locale];
  const com = d.commitment[locale];
  const rows = ov.rows.map((r) => `
              <tr>
                <th scope="row">${r.area}</th>
                <td>—</td>
                <td><span class="chip chip-gold">${r.status}</span></td>
              </tr>`).join('');
  const moatCards = moat.items.map((m) => `
          <article class="moat-card" data-reveal>
            <div class="sol-icon accent-bg-gold">${icon(m.icon)}</div>
            <h3>${m.title}</h3>
            <p>${m.desc}</p>
          </article>`).join('');
  const road = com.items.map((x, i) => `
          <div class="roadmap-item" data-reveal>
            <span class="roadmap-num num">${String(i + 1).padStart(2, '0')}</span>
            <p>${x}</p>
          </div>`).join('');
  const main = `    <section class="hero hero-compact" id="s1-hero">
      <div class="container hero-inner hero-patents">
        <div>
          <h1 data-reveal>${h.h1}</h1>
          <p class="hero-sub" data-reveal>${h.sub}</p>
        </div>
        <div class="patent-hero-figure" data-reveal>
          <p class="patent-big num">12</p>
          <p class="patent-big-label">${h.chipLabel}</p>
          <p class="chip chip-gold">${h.chip}</p>
        </div>
      </div>
    </section>
    <section class="section" id="s2-overview">
      <div class="container">
${sectionHead(ov)}
        <p class="body-lg intro-para" data-reveal>${ov.intro}</p>
        <div class="table-wrap" data-reveal>
          <table class="data-table">
            <caption class="visually-hidden">${ov.caption}</caption>
            <thead>
              <tr><th scope="col">${ov.cols[0]}</th><th scope="col">${ov.cols[1]}</th><th scope="col">${ov.cols[2]}</th></tr>
            </thead>
            <tbody>
${rows}
            </tbody>
          </table>
        </div>

      </div>
    </section>
    <section class="section section-tint" id="s3-moat">
      <div class="container">
${sectionHead(moat)}
        <div class="moat-grid">
${moatCards}
        </div>
      </div>
    </section>
    <section class="section" id="s4-commitment">
      <div class="container">
${sectionHead(com)}
        <p class="body-lg intro-para" data-reveal>${com.intro}</p>
        <div class="roadmap-grid">
${road}
        </div>
      </div>
    </section>`;
  return pageShell(locale, 'patents', d.meta[locale], main);
}

function dataCards(items) {
  return items.map((d) => `
              <div class="data-card">
                <p class="data-num num">${countSpan(d)}</p>
                <p class="data-label">${d.label}</p>
              </div>`).join('');
}

function renderOpportunities(locale) {
  const d = C.opportunities;
  const intro = d.intro[locale];
  const qef = d.qef[locale];
  const sme = d.sme[locale];
  const sum = d.summary[locale];
  const sumRows = sum.rows.map((r) => `
              <tr>
                <th scope="row">${r[0]}</th>
                <td>${r[1]}</td>
                <td class="num">${r[2]}</td>
                <td>${r[3]}</td>
              </tr>`).join('');
  const main = `${heroCompact(locale, d.hero[locale])}
    <section class="section" id="s2-intro">
      <div class="container">
        <div class="intro-block" data-reveal>
          <p class="overline">${intro.overline}</p>
          <h2>${intro.heading}</h2>
          <p class="body-lg">${intro.body}</p>
        </div>
      </div>
    </section>
    <section class="section section-tint" id="s3-qef">
      <div class="container">
${sectionHead(qef)}
        <div class="opp-grid">
          <div data-reveal>
            <p class="body-lg">${qef.narrative}</p>
            <div class="gp-callout accent-border-green">
              <h3>${icon('target')}${qef.gpTitle}</h3>
              <p>${qef.gpBody}</p>
            </div>
            <div class="target-strip">
              <span class="target-label">${qef.targetLabel}</span>
              <span class="target-num num">${countSpan({ n: qef.targetN, suffix: qef.targetSuffix })}</span>
              <span class="target-text">${qef.targetText}</span>
            </div>
          </div>
          <div class="data-stack" data-reveal>
            <p class="data-stack-label">${qef.dataLabel}</p>
${dataCards(qef.data)}
          </div>
        </div>
      </div>
    </section>
    <section class="section" id="s4-sme">
      <div class="container">
${sectionHead(sme)}
        <div class="opp-grid">
          <div data-reveal>
            <p class="body-lg">${sme.narrative}</p>
            <div class="gp-callout accent-border-blue">
              <h3>${icon('target')}${sme.gpTitle}</h3>
              <p>${sme.gpBody}</p>
            </div>
          </div>
          <div class="data-stack" data-reveal>
            <p class="data-stack-label">${sme.dataLabel}</p>
${dataCards(sme.data)}
          </div>
        </div>
      </div>
    </section>
    <section class="section section-tint" id="s5-summary">
      <div class="container">
${sectionHead(sum)}
        <div class="table-wrap" data-reveal>
          <table class="data-table">
            <caption class="visually-hidden">${sum.caption}</caption>
            <thead>
              <tr>${sum.cols.map((c) => `<th scope="col">${c}</th>`).join('')}</tr>
            </thead>
            <tbody>
${sumRows}
            </tbody>
          </table>
        </div>
      </div>
    </section>
${ctaBand(locale, 'opportunities', d.cta[locale])}`;
  return pageShell(locale, 'opportunities', d.meta[locale], main);
}

function renderContact(locale) {
  const d = C.contact;
  const u = C.ui[locale];
  const f = u.form;
  const ct = C.CONTACT;
  const cl = u.contactLabels;
  const options = f.options.map((o) => `            <option value="${esc(o)}">${o}</option>`).join('\n');
  const main = `${heroCompact(locale, d.hero[locale])}
    <section class="section" id="s2-info">
      <div class="container">
        <p class="overline" data-reveal>${d.section[locale]}</p>
        <div class="contact-grid">
          <div class="contact-info" data-reveal>
            <h2>${d.infoTitle[locale]}</h2>
            <ul class="contact-list">
              <li>${icon('pin')}<div><span class="contact-label">${cl.address}</span><span>${ct.address[locale]}</span></div></li>
              <li>${icon('phone')}<div><span class="contact-label">${cl.tel}</span><a href="tel:${ct.telHref}">${ct.tel}</a></div></li>
              <li>${icon('fax')}<div><span class="contact-label">${cl.fax}</span><span>${ct.fax}</span></div></li>
              <li>${icon('mail')}<div><span class="contact-label">${cl.email}</span><a href="mailto:${ct.email}">${ct.email}</a></div></li>
            </ul>
            <div class="address-card">
              ${icon('pin', 'map-pin-icon')}
              <address>${ct.address[locale]}</address>
              <a href="https://maps.google.com/?q=Shui+On+Centre,+6-8+Harbour+Road,+Wan+Chai,+Hong+Kong" target="_blank" rel="noopener" class="map-link">${locale === 'en' ? 'View on Google Maps →' : locale === 'zh-Hans' ? '在 Google 地图查看 →' : '在 Google 地圖查看 →'}</a>
            </div>
          </div>
          <div class="contact-form-wrap" data-reveal>
            <h2>${f.title}</h2>
            <p class="form-lead">${f.lead}</p>
            <form id="enquiry-form" novalidate data-locale="${locale}" data-msg-required="${esc(f.errRequired)}" data-msg-email="${esc(f.errEmail)}" data-msg-phone="${esc(f.errPhone)}" data-msg-submit-error="${esc(f.errSubmit)}">
              <div class="form-row">
                <div class="form-field">
                  <label for="f-name">${f.name} <span class="req" aria-hidden="true">*</span><span class="visually-hidden">(${f.required})</span></label>
                  <input type="text" id="f-name" name="name" autocomplete="name" required aria-describedby="f-name-err">
                  <p class="form-error" id="f-name-err" hidden></p>
                </div>
                <div class="form-field">
                  <label for="f-company">${f.company} <span class="opt">(${f.optional})</span></label>
                  <input type="text" id="f-company" name="company" autocomplete="organization">
                </div>
              </div>
              <div class="form-row">
                <div class="form-field">
                  <label for="f-email">${f.email} <span class="req" aria-hidden="true">*</span><span class="visually-hidden">(${f.required})</span></label>
                  <input type="email" id="f-email" name="email" autocomplete="email" required aria-describedby="f-email-err">
                  <p class="form-error" id="f-email-err" hidden></p>
                </div>
                <div class="form-field">
                  <label for="f-phone">${f.phone} <span class="opt">(${f.optional})</span></label>
                  <input type="tel" id="f-phone" name="phone" autocomplete="tel" aria-describedby="f-phone-err">
                  <p class="form-error" id="f-phone-err" hidden></p>
                </div>
              </div>
              <div class="form-field">
                <label for="f-interest">${f.interest} <span class="opt">(${f.optional})</span></label>
                <select id="f-interest" name="interest">
                  <option value="">${f.selectPlaceholder}</option>
${options}
                </select>
              </div>
              <div class="form-field">
                <label for="f-message">${f.message} <span class="req" aria-hidden="true">*</span><span class="visually-hidden">(${f.required})</span></label>
                <textarea id="f-message" name="message" rows="5" required aria-describedby="f-message-err"></textarea>
                <p class="form-error" id="f-message-err" hidden></p>
              </div>
              <p class="form-error form-error-global" id="f-global-err" hidden></p>
              <button type="submit" class="btn btn-primary btn-lg form-submit">${f.submit} ${icon('arrow', 'icon-arrow')}</button>
            </form>
            <div class="form-success" id="form-success" hidden tabindex="-1" role="status">
              <div class="form-success-icon">${icon('check')}</div>
              <h3>${f.successTitle}</h3>
              <p>${f.successBody}</p>
            </div>
          </div>
        </div>
      </div>
    </section>`;
  return pageShell(locale, 'contact', d.meta[locale], main);
}

function render404() {
  const blocks = LOCALES.map((l) => {
    const u = C.ui[l];
    return `        <section class="nf-locale" lang="${l}">
          <h2>${u.notFound.title}</h2>
          <p>${u.notFound.body}</p>
          <a class="btn btn-secondary" href="${relFor('zh-Hant', 'home', urlFor(l, 'home'))}" hreflang="${l}">${u.notFound.back} ${icon('arrow', 'icon-arrow')}</a>
        </section>`;
  }).join('\n');
  /* 404 pages are served at the (arbitrary-depth) URL that was not found, so
     relative asset links can miss on deep paths. This minimal inline fallback
     keeps the message legible even when main.css fails to load. */
  const fallbackCss = `  <style>
    body{margin:0;background:#071126;color:#E8EEF7;font-family:Inter,'Noto Sans TC',system-ui,sans-serif}
    .nf-hero{min-height:70vh;display:flex;align-items:center;text-align:center}
    .nf-hero a{color:#7FB3FF}
    .nf-code{font-size:clamp(5rem,18vw,9rem);font-weight:800;color:#1D5BFF;margin:0}
    .nf-locale{margin:2rem auto;max-width:36rem}
  </style>
</head>`;
  const headBlock = head('zh-Hant', 'home', {
    title: '404 | GP Investment Group Limited',
    description: '404 — Page not found | 找不到頁面 | 找不到页面',
  }).replace(`<link rel="canonical" href="${C.BASE_URL}/">`, '<meta name="robots" content="noindex, follow">')
    .replace(/  <link rel="alternate"[^\n]*\n/g, '')
    .replace('</head>', fallbackCss);
  return `<!DOCTYPE html>
<html lang="zh-Hant">
${headBlock}
<body data-page="404">
${header('zh-Hant', 'home')}
  <main id="main">
    <section class="hero hero-compact nf-hero">
      <div class="container hero-inner">
        <p class="nf-code num">404</p>
${blocks}
      </div>
    </section>
  </main>
${footer('zh-Hant', 'home')}
  <script src="${assetFor('zh-Hant', 'home', 'assets/js/main.js')}" defer></script>
</body>
</html>
`;
}

/* ---------------- sitemap / robots ---------------- */

function renderSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [];
  for (const page of C.PAGES) {
    for (const l of LOCALES) {
      const alternates = LOCALES.map((a) => `      <xhtml:link rel="alternate" hreflang="${a}" href="${C.BASE_URL}${urlFor(a, page)}"/>`).join('\n');
      urls.push(`  <url>
    <loc>${C.BASE_URL}${urlFor(l, page)}</loc>
${alternates}
      <xhtml:link rel="alternate" hreflang="x-default" href="${C.BASE_URL}${urlFor('zh-Hant', page)}"/>
    <lastmod>${today}</lastmod>
  </url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
}

function renderRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${C.BASE_URL}/sitemap.xml
`;
}

/* ---------------- build ---------------- */

const RENDERERS = { home: renderHome, about: renderAbout, solutions: renderSolutions, patents: renderPatents, opportunities: renderOpportunities, contact: renderContact };

console.log('Building GP Investment site…');
for (const page of C.PAGES) {
  for (const locale of LOCALES) {
    write(outPath(locale, page), RENDERERS[page](locale));
  }
}
write(path.join(ROOT, '404.html'), render404());
write(path.join(ROOT, 'sitemap.xml'), renderSitemap());
write(path.join(ROOT, 'robots.txt'), renderRobots());
console.log('Done.');
