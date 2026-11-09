import { h, rand, scale, flash, clamp, shuffle } from '../dom';
import { sfx } from '../audio';
import { t, num } from '../i18n';
import { levelScore } from '../adaptive';
import type { Ctx } from '../ctx';
import type { Exercise } from './types';

const NODE = 52; // px, keep in sync with .path-node in CSS
const MAX_LEVEL = 8;

const countFor = (level: number) => 8 + level * 2;
const alternating = (level: number) => level >= 4;

function labelsFor(n: number, alt: boolean): string[] {
  if (!alt) return Array.from({ length: n }, (_, i) => String(i + 1));
  return Array.from({ length: n }, (_, i) => (i % 2 === 0 ? String(i / 2 + 1) : 'ABCDEFGHIJKLM'[(i - 1) / 2]));
}

function placeNodes(n: number, w: number, hgt: number): { x: number; y: number }[] {
  const minDist = NODE * 1.2;
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
  return shuffle(cells).slice(0, n);
}

/** Plays one board; returns seconds taken and wrong taps. */
async function board(ctx: Ctx, labels: string[], from: number, of: number) {
  ctx.stage.replaceChildren();
  // Hint text is set before measuring so the board's final size is known.
  const hint = h('div', { class: 'path-hint' }, t('ex.path.next', { v: labels[0] }));
  const area = h('div', { class: 'path-board' });
  ctx.stage.append(hint, area);

  // Place on the measured board (or a sane default if it can't be measured yet),
  // then store positions as fractions so they survive resizes and rotation.
  const rect = area.getBoundingClientRect();
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

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'path-svg');
  area.append(svg, ...nodes);

  let next = 0;
  let errors = 0;
  const start = performance.now();
  await ctx.input<void>((done) => {
    onTap = (i) => {
      if (i === next) {
        ctx.feedback(true, { subtle: true });
        flash(nodes[i], 'pop', 200);
        nodes[i].classList.add('done');
        if (next > 0) {
          const p1 = nodes[next - 1];
          const p2 = nodes[i];
          const x1 = p1.offsetLeft + p1.offsetWidth / 2;
          const y1 = p1.offsetTop + p1.offsetHeight / 2;
          const x2 = p2.offsetLeft + p2.offsetWidth / 2;
          const y2 = p2.offsetTop + p2.offsetHeight / 2;
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', String(x1));
          line.setAttribute('y1', String(y1));
          line.setAttribute('x2', String(x2));
          line.setAttribute('y2', String(y2));
          line.setAttribute('class', 'path-laser-line');
          svg.append(line);
        }
        next++;
        ctx.progress((from + next / labels.length) / of, `${next}/${labels.length}`);
        if (next === labels.length) {
          sfx.sparkle();
          return done();
        }
        hint.textContent = t('ex.path.next', { v: labels[next] });
      } else if (i > next) {
        errors++;
        ctx.feedback(false, { was: labels[next] });
        flash(nodes[i], 'shake', 400);
      }
    };
    ctx.progress(from / of, `0/${labels.length}`);
    return () => (onTap = null);
  });
  return { secs: (performance.now() - start) / 1000, errors };
}

export const path: Exercise = {
  id: 'path',
  icon: '🔢',
  domain: 'speed',
  name: 'ex.path.name',
  desc: 'ex.path.desc',
  how: 'ex.path.how',
  why: 'ex.path.why',
  example: 'ex.path.example',
  minutes: [1, 2],
  levels: { min: 1, max: MAX_LEVEL, start: 2 },
  levelLabel: (l) => (alternating(l) ? `1-A-2-B · ${countFor(l)}` : `1→${countFor(l)}`),

  async run(ctx) {
    if (ctx.practice) {
      await board(ctx, labelsFor(6, false), 0, 2);
      await board(ctx, labelsFor(6, true), 1, 2);
      return { score: 0, detail: '' };
    }
    if (ctx.quick) {
      const r = await board(ctx, labelsFor(12, false), 0, 1);
      // 0.6 s per number scores 100, 4 s scores 0 (older adults often need 1.5–2.5 s on a touch screen).
      const score = scale(r.secs / 12 / ctx.pace, 0.6, 4) * Math.max(0, 1 - r.errors * 0.06);
      return { score, detail: t('ex.path.detail', { secs: num(r.secs), err: r.errors }) };
    }

    // Two boards; the level moves after each one depending on speed and accuracy.
    let level = Math.round(ctx.level);
    const perf: number[] = [];
    let last = { secs: 0, errors: 0 };
    for (let b = 0; b < 2; b++) {
      const n = countFor(level);
      last = await board(ctx, labelsFor(n, alternating(level)), b, 2);
      const per = last.secs / n / ctx.pace;
      // Alternating numbers and letters takes about twice as long per item as numbers alone (TMT-B against TMT-A).
      const target = alternating(level) ? 1.9 : 0.9;
      perf.push(levelScore(level, 1, MAX_LEVEL) * clamp(target / per, 0.5, 1));
      if (per <= target && last.errors <= 1) level = Math.min(MAX_LEVEL, level + 1);
      else if (per > target * 2 || last.errors > 3) level = Math.max(1, level - 1);
      await ctx.wait(500);
    }
    ctx.progress(1);
    return {
      score: (perf[0] + perf[1]) / 2,
      detail: t('ex.path.detail', { secs: num(last.secs), err: last.errors }),
      level,
    };
  },
};
