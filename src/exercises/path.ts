import { h, rand, scale, flash } from '../dom';
import { sfx } from '../audio';
import { t } from '../i18n';
import type { Exercise } from './types';

const NODE = 52; // px, keep in sync with .path-node in CSS

function placeNodes(n: number, w: number, hgt: number): { x: number; y: number }[] {
  const minDist = NODE * 1.25;
  for (let attempt = 0; attempt < 60; attempt++) {
    const pts: { x: number; y: number }[] = [];
    for (let tries = 0; pts.length < n && tries < 4000; tries++) {
      const p = { x: rand(0, w - NODE), y: rand(0, hgt - NODE) };
      if (pts.every((q) => Math.hypot(p.x - q.x, p.y - q.y) >= minDist)) pts.push(p);
    }
    if (pts.length === n) return pts;
  }
  // Fallback for very small screens: a plain grid, shuffled so the order isn't readable.
  const cols = Math.ceil(Math.sqrt(n));
  const rows = Math.ceil(n / cols);
  const cw = (w - NODE) / Math.max(1, cols - 1);
  const ch = (hgt - NODE) / Math.max(1, rows - 1);
  const cells = Array.from({ length: cols * rows }, (_, i) => ({ x: (i % cols) * cw, y: Math.floor(i / cols) * ch }));
  return cells.sort(() => Math.random() - 0.5).slice(0, n);
}

export const path: Exercise = {
  id: 'path',
  icon: '🔢',
  skill: 'speed',
  name: 'ex.path.name',
  desc: 'ex.path.desc',

  async run(ctx) {
    // Quick: 1…12. Gym: 1 A 2 B … (alternating, harder set-shifting).
    const labels = ctx.quick
      ? Array.from({ length: 12 }, (_, i) => String(i + 1))
      : Array.from({ length: 18 }, (_, i) => (i % 2 === 0 ? String(i / 2 + 1) : 'ABCDEFGHI'[(i - 1) / 2]));

    // Hint text is set before measuring so the board's final size is known.
    const hint = h('div', { class: 'path-hint' }, t('ex.path.next', { v: labels[0] }));
    const board = h('div', { class: 'path-board' });
    ctx.stage.append(hint, board);
    // Place on the measured board (or a sane default if it can't be measured yet),
    // then store positions as fractions so they survive resizes and rotation.
    const rect = board.getBoundingClientRect();
    const w = rect.width >= NODE * 4 ? rect.width : 340;
    const hgt = rect.height >= NODE * 4 ? rect.height : 420;
    const pts = placeNodes(labels.length, w, hgt);
    const pos = (v: number, size: number) => `calc((100% - ${NODE}px) * ${(v / (size - NODE)).toFixed(4)})`;

    let onTap: ((i: number) => void) | null = null;
    const nodes = labels.map((text, i) =>
      h(
        'button',
        {
          class: 'path-node',
          style: { left: pos(pts[i].x, w), top: pos(pts[i].y, hgt) },
          onPointerdown: () => onTap?.(i),
        },
        text,
      ),
    );
    board.append(...nodes);

    let next = 0;
    let errors = 0;
    const start = performance.now();
    await ctx.input<void>((done) => {
      onTap = (i) => {
        if (i === next) {
          sfx.tick();
          nodes[i].classList.add('done');
          next++;
          ctx.progress(next / labels.length, `${next}/${labels.length}`);
          if (next === labels.length) return done();
          hint.textContent = t('ex.path.next', { v: labels[next] });
        } else if (i > next) {
          errors++;
          sfx.bad();
          flash(nodes[i], 'shake', 400);
        }
      };
      ctx.progress(0, `0/${labels.length}`);
      return () => (onTap = null);
    });

    const secs = (performance.now() - start) / 1000;
    const per = secs / labels.length;
    const score = scale(per, ctx.quick ? 0.6 : 0.8, 3) * Math.max(0, 1 - errors * 0.06);
    return { score, detail: `${secs.toFixed(1)} s · ${errors} ✗` };
  },
};
