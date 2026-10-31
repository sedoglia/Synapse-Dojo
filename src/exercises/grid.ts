import { h, rand, scale, flash } from '../dom';
import { sfx } from '../audio';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import type { Ctx } from '../ctx';
import type { Exercise } from './types';

const SIZE = 16; // 4×4
const MIN_SPAN = 2;
const MAX_SPAN = 9;

/** Shows a sequence and asks for it back (reversed if `backward`). Resolves to success. */
async function round(ctx: Ctx, tiles: HTMLElement[], board: HTMLElement, status: HTMLElement, span: number, backward: boolean) {
  const seq: number[] = [];
  while (seq.length < span) {
    const n = rand(0, SIZE - 1);
    if (n !== seq[seq.length - 1]) seq.push(n);
  }

  status.textContent = t('ex.grid.watch');
  status.classList.remove('alt');
  await ctx.wait(500);
  for (const i of seq) {
    tiles[i].classList.add('lit');
    sfx.tick();
    await ctx.wait(550 * Math.min(ctx.pace, 1.2));
    tiles[i].classList.remove('lit');
    await ctx.wait(200);
  }

  const expected = backward ? [...seq].reverse() : seq;
  status.textContent = backward ? t('ex.grid.back', { n: span }) : t('ex.grid.yours', { n: span });
  status.classList.toggle('alt', backward);
  board.classList.remove('locked');
  let onTap: ((i: number) => void) | null = null;
  tiles.forEach((tile, i) => (tile.onpointerdown = () => onTap?.(i)));
  const ok = await ctx.input<boolean>((done) => {
    let pos = 0;
    onTap = (i) => {
      flash(tiles[i], 'tap', 220);
      if (i !== expected[pos]) return done(false);
      if (++pos === expected.length) done(true);
    };
    return () => (onTap = null);
  });

  board.classList.add('locked');
  flash(board, ok ? 'good' : 'bad', 450);
  if (!ok) {
    // Show the order that was expected, numbered on the tiles.
    expected.forEach((i, k) => {
      tiles[i].textContent = tiles[i].textContent ? `${tiles[i].textContent}·${k + 1}` : String(k + 1);
      tiles[i].classList.add('answer');
    });
    await ctx.wait(1800);
    tiles.forEach((tile) => {
      tile.textContent = '';
      tile.classList.remove('answer');
    });
  } else await ctx.wait(650);
  return ok;
}

export const grid: Exercise = {
  id: 'grid',
  icon: '💡',
  domain: 'wm',
  name: 'ex.grid.name',
  desc: 'ex.grid.desc',
  why: 'ex.grid.why',
  example: 'ex.grid.example',
  minutes: 2.5,
  levels: { min: MIN_SPAN, max: MAX_SPAN, start: 3 },
  levelLabel: (l) => `span ${l}`,

  async run(ctx) {
    const status = h('div', { class: 'grid-status' });
    const tiles = Array.from({ length: SIZE }, () => h('button', { class: 'tile' }));
    const board = h('div', { class: 'tile-grid locked' }, ...tiles);
    ctx.stage.append(status, board);

    if (ctx.quick) {
      // Daily check: forward only, growing from 3 until the first mistake.
      let span = 3;
      let best = 0;
      while (span <= MAX_SPAN) {
        ctx.progress((span - 3) / (MAX_SPAN - 2), `${span}`);
        if (!ctx.feedback(await round(ctx, tiles, board, status, span, false))) break;
        best = span++;
      }
      ctx.progress(1);
      return { score: scale(best, MAX_SPAN, MIN_SPAN), detail: t('ex.grid.span', { n: best }) };
    }

    // Gym: alternating forward/backward rounds on a 1-up/1-down staircase.
    // Backward recall is harder, so it runs one item shorter than the forward span.
    const st = new Staircase(ctx.level, MIN_SPAN, MAX_SPAN, { target: 0.7 });
    const rounds = ctx.count(10, 10, 3);
    let bestF = 0;
    let bestB = 0;
    for (let r = 0; r < rounds; r++) {
      ctx.progress(r / rounds, `${r + 1}/${rounds}`);
      const backward = r % 2 === 1;
      const span = backward ? Math.max(MIN_SPAN, st.int - 1) : st.int;
      const ok = ctx.track(st, await round(ctx, tiles, board, status, span, backward));
      if (ok && backward) bestB = Math.max(bestB, span);
      if (ok && !backward) bestF = Math.max(bestF, span);
    }
    ctx.progress(1);
    return { score: st.score(), detail: t('ex.grid.detail', { f: bestF, b: bestB }), level: st.next() };
  },
};
