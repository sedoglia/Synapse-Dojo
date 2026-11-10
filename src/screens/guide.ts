import { h } from '../dom';
import { t, type I18nKey } from '../i18n';
import { render, page, langPicker, howBox } from '../ui';
import { sfx, haptic } from '../audio';
import { EXERCISES, DOMAINS, type Domain } from '../exercises';
import type { Exercise } from '../exercises/types';
import { burstConfetti, playPractice } from './play';

/** A study behind a guide card: shown as a chip that opens the paper through its DOI. */
interface Source {
  label: string;
  doi: string;
}

/**
 * The scientific principles the app is built on. Author, journal and year are not translated;
 * the texts live in the locales as guide.sci{n}Tag / H / P / App.
 */
const SCIENCE: { icon: string; color: string; sources: Source[] }[] = [
  { icon: '🌱', color: '#16a34a', sources: [{ label: 'Draganski et al. · Nature 2004', doi: '10.1038/427311a' }] },
  { icon: '🎯', color: '#5b5bf0', sources: [{ label: 'Wilson et al. · Nat Commun 2019', doi: '10.1038/s41467-019-12552-4' }] },
  { icon: '📅', color: '#0e7490', sources: [{ label: 'Cepeda et al. · Psychol Bull 2006', doi: '10.1037/0033-2909.132.3.354' }] },
  { icon: '⚡', color: '#d97706', sources: [{ label: 'Schultz, Dayan & Montague · Science 1997', doi: '10.1126/science.275.5306.1593' }] },
  { icon: '😴', color: '#7c3aed', sources: [{ label: 'Diekelmann & Born · Nat Rev Neurosci 2010', doi: '10.1038/nrn2762' }] },
  {
    icon: '🏃',
    color: '#be185d',
    sources: [
      { label: 'Livingston et al. · Lancet 2024', doi: '10.1016/S0140-6736(24)01296-0' },
      { label: 'Ngandu et al. (FINGER) · Lancet 2015', doi: '10.1016/S0140-6736(15)60461-5' },
    ],
  },
];

const REALITY_SOURCES: Source[] = [
  { label: 'Simons et al. · Psychol Sci Public Interest 2016', doi: '10.1177/1529100616661983' },
  { label: 'Sala et al. · Collabra 2019', doi: '10.1525/collabra.203' },
];

const TABS = [
  { id: 'start', icon: '🚀', label: 'guide.tabStart' },
  { id: 'science', icon: '🧪', label: 'guide.tabScience' },
  { id: 'games', icon: '🎮', label: 'guide.tabGames' },
  { id: 'app', icon: '📱', label: 'guide.tabApp' },
  { id: 'faq', icon: '💬', label: 'guide.tabFaq' },
] as const satisfies readonly { id: string; icon: string; label: I18nKey }[];

type TabId = (typeof TABS)[number]['id'];

/** Kept for the session, so coming back from a practice round reopens the same tab with the meter intact. */
const visited = new Set<TabId>();
let lastTab: TabId = 'start';

export interface GuideOptions {
  /** Final call to action: a callback inside the app, a link on the standalone page. */
  start: (() => void) | string;
  /** Opens a practice round of an exercise (only inside the app). */
  onPlay?: (ex: Exercise) => void;
}

const sourceChip = (s: Source) =>
  h('a', { class: 'guide-source', href: `https://doi.org/${s.doi}`, target: '_blank', rel: 'noopener noreferrer' }, `📚 ${s.label}`);

/** Expandable card: the summary stays short, the details open on tap (native, keyboard accessible). */
function fold(cls: string, summary: (Node | string)[], ...body: (Node | null)[]): HTMLElement {
  return h(
    'details',
    { class: `guide-fold ${cls}` },
    h('summary', {}, ...summary, h('span', { class: 'guide-chevron', 'aria-hidden': 'true' }, '›')),
    h('div', { class: 'guide-fold-body' }, ...body),
  );
}

function hero(): HTMLElement {
  const stat = (value: string | number, label: string) =>
    h('div', { class: 'guide-stat' }, h('b', {}, value), h('span', {}, label));
  return h(
    'section',
    { class: 'guide-hero' },
    h('div', { class: 'guide-hero-emoji', 'aria-hidden': 'true' }, '🧠'),
    h('h2', {}, t('guide.heroH')),
    h('p', {}, t('guide.heroP')),
    h(
      'div',
      { class: 'guide-stats' },
      stat(EXERCISES.length, t('guide.statGames')),
      stat(DOMAINS.length, t('guide.statSkills')),
      stat(10, t('guide.statMinutes')),
    ),
  );
}

function startPanel(): HTMLElement[] {
  const steps: [string, I18nKey, I18nKey][] = [
    ['🏋️', 'guide.step1H', 'guide.step1P'],
    ['📏', 'guide.step2H', 'guide.step2P'],
    ['🔥', 'guide.step3H', 'guide.step3P'],
  ];
  return [
    h(
      'ol',
      { class: 'guide-steps' },
      ...steps.map(([icon, title, text], i) =>
        h(
          'li',
          { class: 'guide-step' },
          h('span', { class: 'guide-step-num' }, i + 1),
          h('div', {}, h('h3', {}, `${icon} ${t(title)}`), h('p', {}, t(text))),
        ),
      ),
    ),
    h('p', { class: 'guide-golden' }, `✨ ${t('guide.goldenRule')}`),
  ];
}

function sciencePanel(): HTMLElement[] {
  return [
    h('p', { class: 'guide-lead' }, t('guide.sciIntro')),
    ...SCIENCE.map((s, i) => {
      const n = i + 1;
      const key = (part: string) => `guide.sci${n}${part}` as I18nKey;
      const card = fold(
        'guide-sci',
        [
          h('span', { class: 'guide-sci-icon', 'aria-hidden': 'true' }, s.icon),
          h('span', { class: 'guide-sum-text' }, h('small', { class: 'guide-sci-tag' }, t(key('Tag'))), h('b', {}, t(key('H')))),
        ],
        h('p', {}, t(key('P'))),
        h('p', { class: 'guide-in-app' }, h('b', {}, `🎮 ${t('guide.sciInApp')}: `), t(key('App'))),
        h('div', { class: 'guide-sources' }, ...s.sources.map(sourceChip)),
      );
      card.style.setProperty('--sc', s.color);
      return card;
    }),
    h(
      'section',
      { class: 'guide-reality' },
      h('h3', {}, `🔬 ${t('guide.realityH')}`),
      h(
        'ul',
        {},
        h('li', {}, h('span', { 'aria-hidden': 'true' }, '✅'), t('guide.reality1')),
        h('li', {}, h('span', { 'aria-hidden': 'true' }, '🟡'), t('guide.reality2')),
        h('li', {}, h('span', { 'aria-hidden': 'true' }, '❔'), t('guide.reality3')),
      ),
      h('div', { class: 'guide-sources' }, ...REALITY_SOURCES.map(sourceChip)),
    ),
  ];
}

function gamesPanel(onPlay?: (ex: Exercise) => void): HTMLElement[] {
  const byDomain = (d: Domain) => EXERCISES.filter((e) => e.domain === d);
  const sections = DOMAINS.filter((d) => byDomain(d).length).map((domain) =>
    h(
      'div',
      { class: 'guide-domain', 'data-domain': domain },
      h('h3', { class: `chip domain-${domain}` }, t(`domain.${domain}` as I18nKey)),
      ...byDomain(domain).map((ex) =>
        fold(
          `guide-game domain-${domain}`,
          [
            h('span', { class: 'guide-game-icon', 'aria-hidden': 'true' }, ex.icon),
            h('span', { class: 'guide-sum-text' }, h('b', {}, t(ex.name)), h('small', { class: 'muted' }, `⏱️ ${ex.minutes[0]}–${ex.minutes[1]} min`)),
          ],
          h('p', {}, h('b', { class: 'guide-label' }, t('guide.gameWhy')), ' ', t(ex.why)),
          h('p', {}, h('b', { class: 'guide-label' }, t('guide.gameHow')), ' ', t(ex.desc)),
          howBox(ex.how),
          ex.example ? h('p', { class: 'guide-example' }, `💡 ${t(ex.example)}`) : null,
          onPlay ? h('button', { class: 'btn primary guide-play', onClick: () => onPlay(ex) }, `▶ ${t('guide.playBtn')}`) : null,
        ),
      ),
    ),
  );

  const chips: HTMLButtonElement[] = [];
  const filter = (domain: Domain | null, chip: HTMLButtonElement) => {
    haptic('tap');
    for (const c of chips) c.setAttribute('aria-pressed', String(c === chip));
    for (const s of sections) s.hidden = domain != null && s.dataset.domain !== domain;
  };
  const chip = (label: string, count: number, domain: Domain | null) => {
    const b = h(
      'button',
      { class: `guide-filter ${domain ? `domain-${domain}` : ''}`, 'aria-pressed': String(domain == null) },
      label,
      h('span', { class: 'guide-filter-count' }, count),
    );
    b.addEventListener('click', () => filter(domain, b));
    chips.push(b);
    return b;
  };

  return [
    h(
      'div',
      { class: 'guide-filters', role: 'toolbar' },
      chip(t('guide.filterAll'), EXERCISES.length, null),
      ...DOMAINS.filter((d) => byDomain(d).length).map((d) => chip(t(`domain.${d}` as I18nKey), byDomain(d).length, d)),
    ),
    ...sections,
  ];
}

function appPanel(): HTMLElement[] {
  const parts: [I18nKey, I18nKey, I18nKey][] = [
    ['guide.planH', 'guide.planT', 'guide.planP'],
    ['guide.checkH', 'guide.checkT', 'guide.checkP'],
    ['guide.trainingH', 'guide.trainingT', 'guide.trainingP'],
    ['guide.progressH', 'guide.progressT', 'guide.progressP'],
    ['guide.boardH', 'guide.boardT', 'guide.boardP'],
    ['guide.settingsH', 'guide.settingsT', 'guide.settingsP'],
  ];
  return parts.map(([title, teaser, text]) =>
    fold(
      'guide-app',
      [h('span', { class: 'guide-sum-text' }, h('b', {}, t(title)), h('small', { class: 'muted' }, t(teaser, { n: EXERCISES.length })))],
      h('p', {}, t(text)),
    ),
  );
}

function faqPanel(): HTMLElement[] {
  return ([1, 2, 3, 4, 5] as const).map((n) =>
    fold('guide-faq', [h('b', { class: 'guide-sum-text' }, t(`guide.faq${n}Q`))], h('p', {}, t(`guide.faq${n}A`))),
  );
}

/**
 * The guide, reused by the in-app screen and the standalone guide.html page.
 * Five tabs keep it short: one panel at a time, details folded until tapped,
 * and a small exploration meter that celebrates when every tab has been seen.
 */
export function guideContent(opts: GuideOptions): HTMLElement[] {
  const panels: Record<TabId, HTMLElement[]> = {
    start: startPanel(),
    science: sciencePanel(),
    games: gamesPanel(opts.onPlay),
    app: appPanel(),
    faq: faqPanel(),
  };

  const meterFill = h('span', { class: 'guide-meter-fill' });
  const meterText = h('span', {});
  const meter = h('div', { class: 'guide-meter', role: 'status' }, h('span', { class: 'guide-meter-bar' }, meterFill), meterText);

  const tabButtons = new Map<TabId, HTMLButtonElement>();
  const panelEls = new Map<TabId, HTMLElement>();

  const tabbar = h(
    'nav',
    { class: 'guide-tabs', role: 'tablist' },
    ...TABS.map((tab) => {
      const b = h(
        'button',
        { class: 'guide-tab', role: 'tab', id: `guide-tab-${tab.id}`, 'aria-controls': `guide-panel-${tab.id}` },
        h('span', { class: 'guide-tab-icon', 'aria-hidden': 'true' }, tab.icon),
        h('span', {}, t(tab.label)),
      );
      b.addEventListener('click', () => select(tab.id, true));
      tabButtons.set(tab.id, b);
      return b;
    }),
  );

  const body = h(
    'div',
    { class: 'guide-panels' },
    ...TABS.map((tab) => {
      const p = h(
        'section',
        { class: 'guide-panel', role: 'tabpanel', id: `guide-panel-${tab.id}`, 'aria-labelledby': `guide-tab-${tab.id}` },
        ...panels[tab.id],
      );
      panelEls.set(tab.id, p);
      return p;
    }),
  );

  function updateMeter() {
    const n = visited.size;
    meterFill.style.width = `${(n / TABS.length) * 100}%`;
    meterText.textContent = n === TABS.length ? t('guide.allExplored') : `🔎 ${t('guide.explored', { n, total: TABS.length })}`;
    meter.classList.toggle('done', n === TABS.length);
  }

  function select(id: TabId, byUser: boolean) {
    for (const tab of TABS) {
      const on = tab.id === id;
      tabButtons.get(tab.id)!.setAttribute('aria-selected', String(on));
      panelEls.get(tab.id)!.hidden = !on;
    }
    lastTab = id;
    const isNew = !visited.has(id);
    visited.add(id);
    tabButtons.get(id)!.classList.add('seen');
    updateMeter();
    if (!byUser) return;
    if (isNew) {
      sfx.ok(visited.size);
      if (visited.size === TABS.length) {
        meter.classList.add('pop');
        burstConfetti(meter);
      }
    } else haptic('tap');
    // Keep the newly opened panel in view: the tab bar is sticky, so scroll back up to it if we are below.
    const top = body.getBoundingClientRect().top + window.scrollY - tabbar.offsetHeight - 8;
    if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
  }

  for (const id of visited) tabButtons.get(id)!.classList.add('seen');
  select(lastTab, false);

  const cta =
    typeof opts.start === 'string'
      ? h('a', { class: 'btn primary', href: opts.start }, `🚀 ${t('guide.ctaBtn')}`)
      : h('button', { class: 'btn primary', onClick: opts.start }, `🚀 ${t('guide.ctaBtn')}`);

  return [
    hero(),
    h('div', { class: 'guide-sticky' }, tabbar, meter),
    body,
    h('section', { class: 'guide-cta' }, h('h3', {}, t('guide.ctaH')), cta),
  ];
}

/** Shows the Guide page inside the single page application. */
export function showGuide(onBack: () => void) {
  const again = () => showGuide(onBack);
  render(
    page(
      t('guide.title'),
      onBack,
      h(
        'div',
        { class: 'guide-screen-wrapper' },
        h('div', { class: 'guide-lang' }, langPicker(again)),
        ...guideContent({ start: onBack, onPlay: (ex) => playPractice(ex, again) }),
      ),
    ),
  );
}
