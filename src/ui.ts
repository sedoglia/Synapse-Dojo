import { h } from './dom';
import { t, LANGS, loadLang, meta, type Lang } from './i18n';
import { store } from './storage';

/** Reflects language and accessibility settings on the document. */
export function applySettings() {
  const root = document.documentElement;
  root.lang = store.data.settings.lang;
  root.dir = meta().rtl ? 'rtl' : 'ltr';
  root.classList.toggle('big-text', store.data.settings.bigText);
}

/** Switches language (downloading its texts if needed), saves the choice and applies it. */
export async function setLang(lang: unknown) {
  store.data.settings.lang = await loadLang(lang);
  store.save();
  applySettings();
}

/** Language menu; `onChange` redraws the current screen once the new texts are ready. */
export function langSelect(onChange: (lang: Lang) => void, cls = 'input'): HTMLSelectElement {
  const current = store.data.settings.lang;
  const select = h(
    'select',
    {
      class: cls,
      'aria-label': t('settings.lang'),
      onChange: async () => {
        await setLang(select.value);
        onChange(store.data.settings.lang);
      },
    },
    ...(Object.keys(LANGS) as Lang[]).map((l) => h('option', { value: l, selected: l === current, lang: l }, LANGS[l].name)),
  );
  return select;
}

/** Compact language menu for the top of a screen. */
export const langPicker = (onChange: (lang: Lang) => void) =>
  h('label', { class: 'lang-picker' }, h('span', { 'aria-hidden': 'true' }, '🌐'), langSelect(onChange, ''));

const app = () => document.getElementById('app')!;

export function render(view: HTMLElement) {
  app().replaceChildren(view);
  window.scrollTo(0, 0);
}

/** Standard page: a top bar with a back button and a title, then content. */
export function page(title: string, onBack: (() => void) | null, ...content: HTMLElement[]): HTMLElement {
  return h(
    'div',
    { class: 'page' },
    h(
      'header',
      { class: 'topbar' },
      onBack ? h('button', { class: 'icon-btn', 'aria-label': t('common.back'), onClick: onBack }, '←') : h('span'),
      h('h1', {}, title),
      h('span'),
    ),
    h('main', { class: 'content' }, ...content),
  );
}

export function rankIndex(score: number): 0 | 1 | 2 | 3 | 4 {
  if (score < 300) return 0;
  if (score < 500) return 1;
  if (score < 700) return 2;
  if (score < 850) return 3;
  return 4;
}

export const rankName = (score: number) => t(`rank.${rankIndex(score)}`);

/** Tiny line chart of a series (e.g. an exercise's level over time). */
export function sparkline(values: number[], w = 220, hgt = 48): HTMLElement {
  const box = h('div', { class: 'spark' });
  if (values.length < 2) return box;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * (w - 8) + 4, hgt - 4 - ((v - min) / span) * (hgt - 8)]);
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', `0 0 ${w} ${hgt}`);
  const line = document.createElementNS(ns, 'polyline');
  line.setAttribute('points', pts.map((p) => p.join(',')).join(' '));
  const dot = document.createElementNS(ns, 'circle');
  const [lx, ly] = pts[pts.length - 1];
  dot.setAttribute('cx', String(lx));
  dot.setAttribute('cy', String(ly));
  dot.setAttribute('r', '3.5');
  svg.append(line, dot);
  box.append(svg);
  return box;
}

/** XP bar for the player level. */
export function xpBar(level: number, xp: number, from: number, to: number): HTMLElement {
  const pct = Math.round(((xp - from) / (to - from)) * 100);
  return h(
    'div',
    { class: 'xp' },
    h('span', { class: 'xp-level' }, t('level.player', { n: level })),
    h('div', { class: 'xp-bar' }, h('div', { style: { width: `${pct}%` } })),
    h('span', { class: 'xp-num' }, `${xp - from}/${to - from} XP`),
  );
}

/** Animates a number counting up inside `el`. */
export function countUp(el: HTMLElement, to: number, ms = 900) {
  const start = performance.now();
  const step = (now: number) => {
    const k = Math.min(1, (now - start) / ms);
    el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  // rAF pauses in background tabs; make sure the final value always lands.
  setTimeout(() => (el.textContent = String(to)), ms + 100);
}
