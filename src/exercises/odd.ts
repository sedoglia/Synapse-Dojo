import { h, rand, shuffle } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

type Feature = 'shape' | 'color' | 'fill' | 'count';
export type Item = Record<Feature, number>;
const FEATURES: Feature[] = ['shape', 'color', 'fill', 'count'];
const VALUES: Record<Feature, number> = { shape: 4, color: 4, fill: 2, count: 3 };
const COLORS = ['var(--c-red)', 'var(--c-blue)', 'var(--c-green)', 'var(--c-yellow)'];
const MAX_LEVEL = 10;

const itemsFor = (level: number) => Math.min(9, 4 + Math.floor(level / 2));
/** How many irrelevant features vary between items, hiding the common rule. */
const variedFor = (level: number) => Math.min(3, 1 + Math.floor((level - 1) / 3));

/** All items share the `key` feature except one; other features never single out a different item. */
function puzzle(level: number): { items: Item[]; odd: number } {
  const n = itemsFor(level);
  for (;;) {
    const [key, ...rest] = shuffle(FEATURES);
    const vary = rest.slice(0, variedFor(level));
    const fixed: Partial<Item> = {};
    for (const f of rest.slice(vary.length)) fixed[f] = rand(0, VALUES[f] - 1);
    const keyVal = rand(0, VALUES[key] - 1);
    const items = Array.from({ length: n }, () => {
      const it = { ...fixed, [key]: keyVal } as Item;
      for (const f of vary) it[f] = rand(0, VALUES[f] - 1);
      return it;
    });
    const odd = rand(0, n - 1);
    items[odd][key] = (keyVal + rand(1, VALUES[key] - 1)) % VALUES[key];

    const ambiguous = vary.some((f) => {
      for (let v = 0; v < VALUES[f]; v++) {
        const others = items.map((it, i) => (it[f] !== v ? i : -1)).filter((i) => i >= 0);
        if (others.length === 1 && others[0] !== odd) return true;
      }
      return false;
    });
    if (!ambiguous) return { items, odd };
  }
}

export function glyph(it: Item): SVGElement {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  const count = it.count + 1; // feature values are 0-based
  svg.setAttribute('viewBox', `0 0 ${count * 30} 30`);
  const color = COLORS[it.color];
  for (let i = 0; i < count; i++) {
    const cx = 15 + i * 30;
    let el: SVGElement;
    if (it.shape === 0) {
      el = document.createElementNS(ns, 'circle');
      el.setAttribute('cx', String(cx));
      el.setAttribute('cy', '15');
      el.setAttribute('r', '10');
    } else if (it.shape === 1) {
      el = document.createElementNS(ns, 'rect');
      el.setAttribute('x', String(cx - 9));
      el.setAttribute('y', '6');
      el.setAttribute('width', '18');
      el.setAttribute('height', '18');
    } else {
      el = document.createElementNS(ns, 'polygon');
      const pts = it.shape === 2 ? [[cx, 4], [cx + 11, 25], [cx - 11, 25]] : [[cx, 3], [cx + 12, 15], [cx, 27], [cx - 12, 15]];
      el.setAttribute('points', pts.map((p) => p.join(',')).join(' '));
    }
    el.setAttribute('fill', it.fill === 0 ? color : 'none');
    el.setAttribute('stroke', color);
    el.setAttribute('stroke-width', '3');
    svg.append(el);
  }
  return svg;
}

export const odd: Exercise = {
  id: 'odd',
  icon: '🧩',
  domain: 'reasoning',
  name: 'ex.odd.name',
  desc: 'ex.odd.desc',
  why: 'ex.odd.why',
  example: 'ex.odd.example',
  minutes: 2,
  levels: { min: 1, max: MAX_LEVEL, start: 1 },
  levelLabel: (l) => `${itemsFor(l)} · ${variedFor(l)}×`,

  async run(ctx) {
    const trials = ctx.count(14, 14, 3);
    const st = new Staircase(ctx.level, 1, MAX_LEVEL);
    const grid = h('div', { class: 'odd-grid' });
    ctx.stage.append(h('div', { class: 'grid-status' }, t('ex.odd.ask')), grid);

    let correct = 0;
    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      const { items, odd: answer } = puzzle(st.int);
      let onPick: ((k: number) => void) | null = null;
      const cells = items.map((it, k) => {
        const b = h('button', { class: 'odd-item', onPointerdown: () => onPick?.(k) });
        b.append(glyph(it));
        return b;
      });
      grid.dataset.n = String(items.length);
      grid.replaceChildren(...cells);

      const said = await ctx.input<number>((done) => {
        onPick = done;
        return () => (onPick = null);
      });
      const ok = ctx.track(st, said === answer, { was: t('fb.oddHere') });
      cells[answer].classList.add('right');
      if (ok) correct++;
      else cells[said].classList.add('wrong');
      await ctx.wait(ok ? 400 : 1100);
    }
    ctx.progress(1);
    return { score: st.score(), detail: t('common.correct', { ok: correct, n: trials }), level: st.next() };
  },
};
