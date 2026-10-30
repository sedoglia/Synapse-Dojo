import { h, todayKey } from '../dom';
import { store } from '../storage';
import { t } from '../i18n';
import { render, page } from '../ui';
import { EXERCISES } from '../exercises';
import { showHome } from './home';

const SVG = 'http://www.w3.org/2000/svg';

function svg(tag: string, attrs: Record<string, string | number>, text?: string): SVGElement {
  const el = document.createElementNS(SVG, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  if (text) el.textContent = text;
  return el;
}

function scoreChart(): HTMLElement {
  const checks = store.data.checks.slice(-30);
  if (!checks.length) return h('p', { class: 'muted' }, t('progress.empty'));

  const W = 320, H = 160, P = 24;
  const x = (i: number) => P + (checks.length === 1 ? (W - 2 * P) / 2 : (i * (W - 2 * P)) / (checks.length - 1));
  const y = (v: number) => H - P - (v / 1000) * (H - 2 * P);
  const root = svg('svg', { viewBox: `0 0 ${W} ${H}`, class: 'chart', role: 'img' });

  for (const v of [0, 500, 1000]) {
    root.append(svg('line', { x1: P, x2: W - P, y1: y(v), y2: y(v), class: 'grid-line' }));
    root.append(svg('text', { x: 2, y: y(v) + 4, class: 'axis' }, String(v)));
  }
  const d = checks.map((c, i) => `${i ? 'L' : 'M'}${x(i)},${y(c.score)}`).join(' ');
  root.append(svg('path', { d: `${d} L${x(checks.length - 1)},${y(0)} L${x(0)},${y(0)} Z`, class: 'area' }));
  root.append(svg('path', { d, class: 'line' }));
  checks.forEach((c, i) => {
    const dot = svg('circle', { cx: x(i), cy: y(c.score), r: 3.5, class: 'dot' });
    dot.append(svg('title', {}, `${c.date}: ${c.score}`));
    root.append(dot);
  });

  const wrap = h('div', { class: 'chart-wrap' });
  wrap.append(root);
  return wrap;
}

function calendar(): HTMLElement {
  const active = store.activeDays();
  const cells: HTMLElement[] = [];
  const d = new Date();
  d.setDate(d.getDate() - 27);
  for (let i = 0; i < 28; i++) {
    const key = todayKey(d);
    cells.push(
      h('div', { class: `cal-day ${active.has(key) ? 'on' : ''} ${key === todayKey() ? 'today' : ''}`, title: key }, String(d.getDate())),
    );
    d.setDate(d.getDate() + 1);
  }
  return h('div', { class: 'calendar' }, ...cells);
}

export function showProgress() {
  const { runs, checks } = store.data;
  render(
    page(
      t('progress.title'),
      showHome,
      h('section', { class: 'card' }, h('h3', {}, t('progress.chart')), scoreChart()),
      h(
        'section',
        { class: 'card' },
        h('h3', {}, t('progress.calendar')),
        calendar(),
        h('p', { class: 'muted small' }, t('progress.stats', { days: store.activeDays().size, runs: runs.length + checks.length })),
      ),
      h(
        'section',
        { class: 'card' },
        h('h3', {}, t('progress.bests')),
        ...EXERCISES.map((ex) => {
          const best = store.best(ex.id) ?? 0;
          return h(
            'div',
            { class: 'part' },
            h('span', {}, `${ex.icon} ${t(ex.name)}`),
            h('div', { class: 'part-bar' }, h('div', { style: { width: `${best}%` } })),
            h('b', {}, best ? String(best) : t('progress.none')),
          );
        }),
      ),
    ),
  );
}
