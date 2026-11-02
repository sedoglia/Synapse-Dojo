import { h, todayKey } from '../dom';
import { store } from '../storage';
import { t, dateText } from '../i18n';
import { render, page, sparkline } from '../ui';
import { EXERCISES, DOMAINS } from '../exercises';
import { capacity, domainScore } from '../stats';
import { BADGES, earned } from '../rewards';
import { levelText } from './play';
import { showHome } from './home';

const SVG = 'http://www.w3.org/2000/svg';

function svg(tag: string, attrs: Record<string, string | number>, text?: string): SVGElement {
  const el = document.createElementNS(SVG, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  if (text) el.textContent = text;
  return el;
}

function wrap(el: SVGElement, cls: string): HTMLElement {
  const box = h('div', { class: cls });
  box.append(el);
  return box;
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
    dot.append(svg('title', {}, `${dateText(c.date)}: ${c.score}`));
    root.append(dot);
  });
  return wrap(root, 'chart-wrap');
}

/** Spider chart of the nine skill domains. */
function domainRadar(): HTMLElement {
  const S = 300, C = S / 2, R = 92;
  const n = DOMAINS.length;
  const pt = (i: number, r: number) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [C + Math.cos(a) * r, C + Math.sin(a) * r];
  };
  const root = svg('svg', { viewBox: `0 0 ${S} ${S}`, class: 'radar', role: 'img' });
  for (const k of [0.25, 0.5, 0.75, 1]) {
    root.append(svg('polygon', { points: DOMAINS.map((_, i) => pt(i, R * k).join(',')).join(' '), class: 'radar-ring' }));
  }
  DOMAINS.forEach((d, i) => {
    const [x, y] = pt(i, R);
    root.append(svg('line', { x1: C, y1: C, x2: x, y2: y, class: 'radar-ring' }));
    const [lx, ly] = pt(i, R + 24);
    root.append(svg('text', { x: lx, y: ly + 4, class: 'radar-label', 'text-anchor': 'middle' }, t(`domain.${d}`)));
  });
  const values = DOMAINS.map((d) => domainScore(d) / 100);
  root.append(svg('polygon', { points: values.map((v, i) => pt(i, R * Math.max(0.03, v)).join(',')).join(' '), class: 'radar-area' }));
  return wrap(root, 'chart-wrap');
}

function calendar(): HTMLElement {
  const active = store.activeDays();
  const cells: HTMLElement[] = [];
  const d = new Date();
  d.setDate(d.getDate() - 27);
  for (let i = 0; i < 28; i++) {
    const key = todayKey(d);
    cells.push(
      h('div', { class: `cal-day ${active.has(key) ? 'on' : ''} ${key === todayKey() ? 'today' : ''}`, title: dateText(key) }, String(d.getDate())),
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
      h('section', { class: 'card' }, h('h3', {}, t('progress.domains')), domainRadar(), h('p', { class: 'muted small center' }, t('progress.domainsHint'))),
      h('section', { class: 'card' }, h('h3', {}, t('progress.chart')), scoreChart()),
      h(
        'section',
        { class: 'card' },
        h('h3', {}, t('progress.calendar')),
        calendar(),
        h('p', { class: 'muted small' }, t('progress.week', { n: store.daysThisWeek() })),
        h('p', { class: 'muted small' }, t('progress.stats', { days: store.activeDays().size, runs: runs.length + checks.length })),
      ),
      h(
        'section',
        { class: 'card' },
        h('h3', {}, t('progress.exercises')),
        ...EXERCISES.map((ex) => {
          const cap = capacity(ex);
          const level = ex.levels && store.hasLevel(ex.id) ? levelText(ex, store.level(ex.id, ex.levels.start)) : null;
          const best = store.best(ex.id);
          const history = (store.data.history[ex.id] ?? []).map((p) => p.level);
          return h(
            'div',
            { class: 'part ex-progress' },
            h('span', {}, `${ex.icon} ${t(ex.name)}`, level ? h('small', { class: 'muted level-tag' }, level) : null),
            history.length >= 2
              ? sparkline(history.slice(-20), 120, 28)
              : h('div', { class: 'part-bar' }, h('div', { style: { width: `${cap ?? 0}%` } })),
            h('b', {}, best !== null ? String(best) : t('progress.none')),
          );
        }),
      ),
      badgesSection(),
    ),
  );
}

function badgesSection(): HTMLElement {
  const got = BADGES.filter(earned).length;
  return h(
    'section',
    { class: 'card' },
    h('h3', {}, `🏅 ${t('badges.title')}`, h('small', { class: 'muted' }, ` · ${t('badges.count', { n: got, t: BADGES.length })}`)),
    h(
      'div',
      { class: 'badges' },
      ...BADGES.map((b) => {
        const done = earned(b);
        const pct = Math.round(b.progress() * 100);
        return h(
          'div',
          { class: `badge ${done ? 'earned' : ''}`, title: t(b.desc) },
          h('span', { class: 'badge-icon' }, b.icon),
          h('b', {}, t(b.name)),
          h('small', { class: 'muted' }, t(b.desc)),
          done ? h('small', { class: 'badge-date' }, `✓ ${dateText(store.data.badges[b.id])}`) : h('div', { class: 'goal-bar' }, h('div', { style: { width: `${pct}%` } })),
        );
      }),
    ),
  );
}
