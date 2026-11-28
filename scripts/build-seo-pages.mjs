// Writes the standalone game pages after `vite build`: one page per exercise in every language
// (/games/<slug>, /<lang>/games/<slug>) and one index of all the games per language (/games/, /<lang>/games/).
//
// The pages are plain HTML, readable without JavaScript and by search engines: name, rules, the study behind the
// exercise and a "Play" button that opens it in the game (/?play=<id>&lang=<lang>, read by src/main.ts). Every text
// comes from the app's own locales, so a page says exactly what the game says. The script and style come from the
// game.html template that Vite has just built; the built template itself is then deleted. The pages are added to
// dist/sitemap.xml.
//
//   node scripts/build-seo-pages.mjs      (run by `npm run build`, after vite build)
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO_SLUGS, gamePath, gamesPath } from '../src/seoPages.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://synapsedojo.com';
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.synapsedojo.app';
const DOMAINS = ['speed', 'attention', 'executive', 'wm', 'memory', 'spatial', 'reasoning', 'language', 'coordination'];

const fail = (msg) => {
  console.error(`build-seo-pages: ${msg}`);
  process.exit(1);
};
const read = (path) => readFileSync(join(ROOT, path), 'utf8');

// ---------- the exercises, in the game's order, read from their source files ----------

/** EXERCISES in src/exercises/index.ts lists variables; each comes from a file that defines the exercise object. */
function loadExercises() {
  const index = read('src/exercises/index.ts');
  const files = new Map([...index.matchAll(/import \{ (\w+) \} from '\.\/(\w+)';/g)].map((m) => [m[1], m[2]]));
  const list = /export const EXERCISES: Exercise\[\] = \[([\s\S]*?)\];/.exec(index)?.[1];
  if (!list) fail('EXERCISES not found in src/exercises/index.ts');
  const vars = list.replace(/\/\/.*$/gm, '').split(',').map((s) => s.trim()).filter(Boolean);
  return vars.map((v) => {
    const file = files.get(v);
    if (!file) fail(`no import for ${v}`);
    const src = read(`src/exercises/${file}.ts`);
    const m = /\bid: '(\w+)',\s*icon: '([^']+)',\s*domain: '(\w+)',[\s\S]*?minutes: \[([\d.]+), ([\d.]+)\]/.exec(src);
    if (!m) fail(`exercise definition not found in src/exercises/${file}.ts`);
    const [, id, icon, domain, lo, hi] = m;
    if (!DOMAINS.includes(domain)) fail(`unknown domain ${domain} for ${id}`);
    if (!SEO_SLUGS[id]) fail(`no slug for ${id}: add it to SEO_SLUGS in src/seoPages.ts`);
    return { id, icon, domain, minutes: [Number(lo), Number(hi)] };
  });
}

// ---------- languages and texts ----------

/** LANGS in src/i18n.ts, in the language menu's order. */
function loadLangs() {
  const src = /export const LANGS = \{([\s\S]*?)\n\} satisfies/.exec(read('src/i18n.ts'))?.[1];
  if (!src) fail('LANGS not found in src/i18n.ts');
  return [...src.matchAll(/^\s+'?([\w-]+)'?: \{ name: '([^']+)', speech: '([^']+)'(.*)$/gm)].map((m) => ({
    code: m[1],
    name: m[2],
    speech: m[3],
    rtl: m[4].includes('rtl: true'),
  }));
}

/** The language tag in hreflang and <html lang>: the two Chinese scripts get their region. */
const tag = (code) => (code === 'zh' ? 'zh-CN' : code);

const EXERCISES = loadExercises();
const LANGS = loadLangs();
if (EXERCISES.length < 40) fail(`only ${EXERCISES.length} exercises found`);
if (LANGS.length < 25) fail(`only ${LANGS.length} languages found`);

const locales = {};
for (const { code } of LANGS) locales[code] = (await import(`../src/locales/${code}.ts`)).default;
const en = locales.en.ui;

function t(lang, key) {
  const s = locales[lang].ui[key] ?? en[key];
  if (s === undefined) fail(`missing text ${key}`);
  return s;
}
/** A label without its trailing colon ("What it’s based on:" → "What it’s based on"). */
const label = (lang, key) => t(lang, key).replace(/\s*[:：]\s*$/, '');

/**
 * What people search for, where it differs from the name in the app ("Simple Reaction" → "Reaction Time Test").
 * Used as the page's heading and title; the app's name stays under it. Only where the search terms are known.
 */
const SEARCH_NAMES = {
  en: {
    reaction: 'Reaction Time Test',
    reflex: 'Choice Reaction Time Test',
    clash: 'Stroop Test',
    echo: 'Dual N-Back',
    grid: 'Corsi Block-Tapping Test',
    towers: 'Tower of London Test',
    gonogo: 'Go/No-Go Test',
    sorting: 'Card Sorting Test',
    span: 'Digit Span Test',
    path: 'Trail Making Test',
    glance: 'Useful Field of View Test',
    radar: 'Multiple Object Tracking',
    rotate: 'Mental Rotation Test',
    memoria: 'Memory Match Game',
    msit: 'Multi-Source Interference Task',
    vault: 'Word Memory Test',
    stories: 'Story Memory Test',
    reading: 'Speed Reading Test',
    math: 'Mental Math Game',
  },
  it: {
    reaction: 'Test dei riflessi',
    clash: 'Test di Stroop',
    echo: 'Dual N-Back',
    grid: 'Test di Corsi',
    towers: 'Torre di Londra',
    memoria: 'Gioco di memoria',
    gonogo: 'Test Go/No-Go',
    span: 'Test dello span di cifre',
    rotate: 'Test di rotazione mentale',
    math: 'Calcolo mentale',
    vault: 'Test di memoria delle parole',
    reading: 'Test di lettura veloce',
  },
};
const exName = (lang, ex) => t(lang, `ex.${ex.id}.name`);
const heading = (lang, ex) => SEARCH_NAMES[lang]?.[ex.id] ?? exName(lang, ex);

// ---------- HTML helpers ----------

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const jsonLd = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
const abs = (path) => `${SITE}${path}`;
/** "1.5–2.5 min" with the language's decimal separator and Latin digits, as in the game. */
const minutes = (lang, [lo, hi]) => {
  const f = new Intl.NumberFormat(`${LANGS.find((l) => l.code === lang).speech}-u-nu-latn`, { maximumFractionDigits: 1 });
  return `${f.format(lo)}–${f.format(hi)} min`;
};

/** The built template: its <head> has the hashed script and style, made absolute for pages in sub-folders. */
const template = readFileSync(join(DIST, 'game.html'), 'utf8')
  .replace(/<!--[\s\S]*?Template of the standalone game pages[\s\S]*?-->\s*/, '')
  .replace(/(href|src)="\.\//g, '$1="/');
if (!template.includes('<!--seo-head-->') || !template.includes('<!--seo-body-->')) fail('placeholders missing in dist/game.html');

function pageHtml({ lang, title, description, path, alternates, ld, body }) {
  const { rtl } = LANGS.find((l) => l.code === lang);
  const head = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${abs(path)}" />`,
    ...LANGS.map((l) => `<link rel="alternate" hreflang="${tag(l.code)}" href="${abs(alternates(l.code))}" />`),
    `<link rel="alternate" hreflang="x-default" href="${abs(alternates('en'))}" />`,
    `<meta property="og:site_name" content="Synapse Dojo" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${abs(path)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:image" content="${SITE}/icon-512.png" />`,
    `<meta name="twitter:card" content="summary" />`,
    jsonLd(ld),
  ].join('\n    ');
  return template
    .replace('<html lang="en"', `<html lang="${tag(lang)}" dir="${rtl ? 'rtl' : 'ltr'}"`)
    .replace('<!--seo-head-->', head)
    .replace('<!--seo-body-->', body);
}

/** Parts shared by every page: top bar, other languages, medical note, footer. */
function topbar(lang, back) {
  return `<header class="topbar">
        <a class="icon-btn" href="${back}" aria-label="${esc(t(lang, 'common.back'))}">${LANGS.find((l) => l.code === lang).rtl ? '→' : '←'}</a>
        <a class="seo-brand" href="/">🧠 Synapse Dojo</a>
        <span></span>
      </header>`;
}

function langLinks(lang, pathOf) {
  const items = LANGS.map((l) =>
    l.code === lang
      ? `<li><b lang="${tag(l.code)}">${esc(l.name)}</b></li>`
      : `<li><a href="${pathOf(l.code)}" hreflang="${tag(l.code)}" lang="${tag(l.code)}">${esc(l.name)}</a></li>`,
  );
  return `<nav class="seo-langs" aria-label="${esc(t(lang, 'settings.lang'))}"><ul>${items.join('')}</ul></nav>`;
}

function footer(lang) {
  const q = `?lang=${lang}`;
  return `<aside class="seo-note">
          <h2>${esc(t(lang, 'privacy.medicalH'))}</h2>
          <p>${esc(t(lang, 'privacy.medical'))}</p>
        </aside>
        <footer class="landing-footer center small">
          <p><a class="link-btn" href="/guide${q}">${esc(t(lang, 'guide.title'))}</a> · <a class="link-btn" href="/privacy${q}">${esc(t(lang, 'privacy.title'))}</a> · <a class="link-btn" href="/license${q}">${esc(t(lang, 'license.title'))}</a></p>
        </footer>`;
}

const playHref = (lang, ex) => `/?play=${ex.id}&amp;lang=${lang}`;
const storeHref = (lang) => `${PLAY_STORE}&amp;hl=${lang}`;
const app = (lang) => ({
  '@type': 'WebApplication',
  name: 'Synapse Dojo',
  url: `${SITE}/`,
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web, Android',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  inLanguage: tag(lang),
});

// ---------- one page per exercise ----------

function gamePage(lang, ex) {
  const name = exName(lang, ex);
  const h1 = heading(lang, ex);
  const path = gamePath(lang, ex.id);
  const steps = t(lang, `ex.${ex.id}.how`).split('\n').filter((s) => s.trim());
  const related = EXERCISES.filter((o) => o.domain === ex.domain && o.id !== ex.id);
  const desc = t(lang, `ex.${ex.id}.desc`);
  const body = `<div id="app"><div class="page seo-page">
      ${topbar(lang, gamesPath(lang))}
      <main class="content">
        <nav class="seo-crumbs small muted"><a href="/">Synapse Dojo</a> › <a href="${gamesPath(lang)}">${esc(t(lang, 'seo.all'))}</a></nav>
        <article class="card seo-game">
          <div class="intro-icon" aria-hidden="true">${ex.icon}</div>
          <h1>${esc(h1)}</h1>
          ${h1 !== name ? `<p class="seo-alias muted">${ex.icon} ${esc(name)} · Synapse Dojo</p>` : ''}
          <p class="seo-meta"><span class="chip domain-${ex.domain}">${esc(t(lang, `domain.${ex.domain}`))}</span> <span class="muted small">⏱️ ${minutes(lang, ex.minutes)}</span></p>
          <p class="seo-lead">${esc(desc)}</p>
          <a class="btn primary big seo-play" href="${playHref(lang, ex)}">▶ ${esc(t(lang, 'seo.play'))}</a>
          <section class="how-box">
            <h2>📋 ${esc(t(lang, 'intro.how'))}</h2>
            <ol class="how-steps">${steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
          </section>
          <p class="guide-example">💡 ${esc(t(lang, `ex.${ex.id}.example`))}</p>
          <section class="seo-why">
            <h2>🔬 ${esc(label(lang, 'guide.gameWhy'))}</h2>
            <p>${esc(t(lang, `ex.${ex.id}.why`))}</p>
          </section>
          <p class="seo-part muted">${esc(t(lang, 'seo.part'))}</p>
          <p class="seo-store" data-store-link><a class="btn" href="${storeHref(lang)}" rel="noopener">▶ ${esc(t(lang, 'seo.android'))}</a></p>
        </article>
        <section class="seo-related">
          <h2>${esc(t(lang, 'seo.related'))}</h2>
          <ul class="seo-list">${related.map((o) => listItem(lang, o)).join('')}</ul>
          <p class="center"><a class="btn" href="${gamesPath(lang)}">${esc(t(lang, 'seo.all'))}</a></p>
        </section>
        ${langLinks(lang, (l) => gamePath(l, ex.id))}
        ${footer(lang)}
      </main>
    </div></div>`;
  return pageHtml({
    lang,
    title: `${h1} – ${t(lang, 'seo.tail')} | Synapse Dojo`,
    description: `${desc} · ${t(lang, 'seo.tail')}`,
    path,
    alternates: (l) => gamePath(l, ex.id),
    ld: {
      '@context': 'https://schema.org',
      '@graph': [
        { ...app(lang), '@type': ['WebApplication', 'Game'], name: h1, url: abs(path), description: desc, isPartOf: { '@type': 'WebSite', name: 'Synapse Dojo', url: `${SITE}/` } },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Synapse Dojo', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: t(lang, 'seo.all'), item: abs(gamesPath(lang)) },
            { '@type': 'ListItem', position: 3, name: h1, item: abs(path) },
          ],
        },
      ],
    },
    body,
  });
}

function listItem(lang, ex) {
  return `<li><a class="seo-item" href="${gamePath(lang, ex.id)}"><span class="seo-item-icon" aria-hidden="true">${ex.icon}</span><span><b>${esc(heading(lang, ex))}</b><small class="muted">${esc(t(lang, `ex.${ex.id}.desc`))}</small></span></a></li>`;
}

// ---------- the index of all the games in a language ----------

function hubPage(lang) {
  const path = gamesPath(lang);
  const sections = DOMAINS.map((d) => {
    const list = EXERCISES.filter((e) => e.domain === d);
    return `<section class="seo-domain">
          <h2><span class="chip domain-${d}">${esc(t(lang, `domain.${d}`))}</span></h2>
          <ul class="seo-list">${list.map((e) => listItem(lang, e)).join('')}</ul>
        </section>`;
  });
  const body = `<div id="app"><div class="page seo-page">
      ${topbar(lang, '/')}
      <main class="content">
        <header class="card seo-game seo-hub">
          <div class="intro-icon" aria-hidden="true">🧠</div>
          <h1>${esc(t(lang, 'seo.hubTitle'))}</h1>
          <p class="seo-lead">${esc(t(lang, 'seo.hubLead'))}</p>
          <a class="btn primary big seo-play" href="/?lang=${lang}">🚀 ${esc(t(lang, 'guide.ctaBtn'))}</a>
          <p class="seo-store" data-store-link><a class="btn" href="${storeHref(lang)}" rel="noopener">▶ ${esc(t(lang, 'seo.android'))}</a></p>
        </header>
        ${sections.join('\n        ')}
        ${langLinks(lang, gamesPath)}
        ${footer(lang)}
      </main>
    </div></div>`;
  return pageHtml({
    lang,
    title: `${t(lang, 'seo.hubTitle')} | Synapse Dojo`,
    description: t(lang, 'seo.hubLead'),
    path,
    alternates: gamesPath,
    ld: {
      '@context': 'https://schema.org',
      '@graph': [
        app(lang),
        {
          '@type': 'ItemList',
          name: t(lang, 'seo.hubTitle'),
          itemListElement: EXERCISES.map((e, i) => ({ '@type': 'ListItem', position: i + 1, name: heading(lang, e), url: abs(gamePath(lang, e.id)) })),
        },
      ],
    },
    body,
  });
}

// ---------- write the pages and the sitemap ----------

/** URL path → file in dist: "/it/games/" → it/games/index.html, "/games/stroop-test" → games/stroop-test.html. */
const fileFor = (path) => join(DIST, path.endsWith('/') ? `${path}index.html` : `${path}.html`);
function write(path, html) {
  const file = fileFor(path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

const urls = [];
for (const { code } of LANGS) {
  write(gamesPath(code), hubPage(code));
  urls.push(gamesPath(code));
  for (const ex of EXERCISES) {
    write(gamePath(code, ex.id), gamePage(code, ex));
    urls.push(gamePath(code, ex.id));
  }
}
rmSync(join(DIST, 'game.html'));

/** The last change to what the pages are made of, as the sitemap's date (today if git is not available). */
let lastmod = new Date().toISOString().slice(0, 10);
try {
  const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', 'src/locales', 'src/exercises', 'src/seoPages.ts', 'scripts/build-seo-pages.mjs', 'game.html'], { cwd: ROOT, encoding: 'utf8' }).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(out)) lastmod = out;
} catch {
  /* not a git checkout */
}
const sitemapFile = join(DIST, 'sitemap.xml');
const sitemap = readFileSync(sitemapFile, 'utf8');
const entries = urls
  .map((u) => `  <url>\n    <loc>${abs(u)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${u.endsWith('/') ? '0.8' : '0.7'}</priority>\n  </url>`)
  .join('\n');
if (!sitemap.includes('</urlset>')) fail('dist/sitemap.xml has no </urlset>');
writeFileSync(sitemapFile, sitemap.replace('</urlset>', `${entries}\n</urlset>`));

console.log(`build-seo-pages: ${urls.length} pages (${EXERCISES.length} games × ${LANGS.length} languages + indexes), sitemap updated.`);
