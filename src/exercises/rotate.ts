import { h, rand, pick } from '../dom';
import { t, num } from '../i18n';
import { onKeys } from '../widgets';
import type { Exercise } from './types';

type Cell = [number, number];
const MAX_LEVEL = 12;
const cellsFor = (level: number) => Math.min(9, 4 + Math.floor((level - 1) / 2));
const limitFor = (level: number) => Math.max(1800, 8000 - level * 520);

const key = (cells: Cell[]) => {
  const minX = Math.min(...cells.map((c) => c[0]));
  const minY = Math.min(...cells.map((c) => c[1]));
  return cells
    .map(([x, y]) => `${x - minX},${y - minY}`)
    .sort()
    .join(' ');
};
const rot90 = (cells: Cell[]): Cell[] => cells.map(([x, y]) => [y, -x]);
const mirror = (cells: Cell[]): Cell[] => cells.map(([x, y]) => [-x, y]);

/** A random polyomino whose mirror image can't be obtained by rotation (otherwise "mirror" is unanswerable). */
export function chiralShape(n: number): Cell[] {
  for (;;) {
    const cells: Cell[] = [[0, 0]];
    while (cells.length < n) {
      const [x, y] = pick(cells);
      const [dx, dy] = pick([[1, 0], [-1, 0], [0, 1], [0, -1]] as const);
      const c: Cell = [x + dx, y + dy];
      if (!cells.some((d) => d[0] === c[0] && d[1] === c[1])) cells.push(c);
    }
    const rotations = new Set<string>();
    let r = cells;
    for (let i = 0; i < 4; i++) {
      rotations.add(key(r));
      r = rot90(r);
    }
    if (!rotations.has(key(mirror(cells)))) return cells;
  }
}

export function render(cells: Cell[], angle: number, flipped: boolean): HTMLElement {
  const xs = cells.map((c) => c[0]);
  const ys = cells.map((c) => c[1]);
  const minX = Math.min(...xs), minY = Math.min(...ys);
  const w = Math.max(...xs) - minX + 1, hgt = Math.max(...ys) - minY + 1;
  const size = Math.max(w, hgt);
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `${-0.5 - (size - w) / 2} ${-0.5 - (size - hgt) / 2} ${size + 1} ${size + 1}`);
  for (const [x, y] of cells) {
    const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    r.setAttribute('x', String(x - minX + 0.04));
    r.setAttribute('y', String(y - minY + 0.04));
    r.setAttribute('width', '0.92');
    r.setAttribute('height', '0.92');
    r.setAttribute('rx', '0.15');
    svg.append(r);
  }
  const box = h('div', { class: 'rotate-shape' });
  box.append(svg);
  svg.style.transform = `rotate(${angle}deg) scaleX(${flipped ? -1 : 1})`;
  return box;
}

export const rotate: Exercise = {
  id: 'rotate',
  icon: '🧊',
  domain: 'spatial',
  name: 'ex.rotate.name',
  desc: 'ex.rotate.desc',
  why: 'ex.rotate.why',
  example: 'ex.rotate.example',
  minutes: [1, 2],
  levels: { min: 1, max: MAX_LEVEL, start: 1 },
  levelLabel: (l) => `${cellsFor(l)} ■ · ${num(limitFor(l) / 1000)} s`,

  async run(ctx) {
    const trials = ctx.count(20, 20, 4);
    const st = ctx.stair(trials, 1, MAX_LEVEL);
    const pair = h('div', { class: 'rotate-pair' });
    const timer = h('div', { class: 'rotate-timer' }, h('div'));
    let onAnswer: ((mirrored: boolean) => void) | null = null;
    const same = h('button', { class: 'btn big', onPointerdown: () => onAnswer?.(false) }, `← ${t('ex.rotate.same')}`);
    const mirr = h('button', { class: 'btn big', onPointerdown: () => onAnswer?.(true) }, `${t('ex.rotate.mirror')} →`);
    ctx.stage.append(pair, timer, h('div', { class: 'vault-actions' }, same, mirr));
    onKeys(ctx, { ArrowLeft: () => onAnswer?.(false), ArrowRight: () => onAnswer?.(true) });

    let correct = 0;
    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      const shape = chiralShape(cellsFor(st.int));
      const mirrored = Math.random() < 0.5;
      const a1 = rand(0, 11) * 30;
      const a2 = a1 + rand(1, 11) * 30;
      pair.replaceChildren(render(shape, a1, false), render(shape, a2, mirrored));

      const limit = ctx.practice ? 60_000 : limitFor(st.level) * ctx.pace;
      const bar = timer.firstElementChild as HTMLElement;
      bar.style.transition = 'none';
      bar.style.width = '100%';
      void bar.offsetWidth;
      bar.style.transition = `width ${limit}ms linear`;
      bar.style.width = '0%';

      const said = await ctx.timed<boolean | null>(limit, null, (done) => {
        onAnswer = done;
        return () => (onAnswer = null);
      });
      const ok = ctx.track(st, said === mirrored, { was: mirrored ? t('ex.rotate.mirror') : t('ex.rotate.same') });
      if (ok) correct++;
      pair.classList.add(ok ? 'good' : 'bad');
      await ctx.wait(ok ? 400 : 1300);
      pair.classList.remove('good', 'bad');
    }
    ctx.progress(1);
    return { score: st.score(), detail: t('common.correct', { ok: correct, n: trials }), level: st.next() };
  },
};
