import { h, shuffle, scale, flash } from '../dom';
import { sfx } from '../audio';
import { t } from '../i18n';
import type { Ctx } from '../ctx';
import type { Exercise } from './types';

const SIZE = 16; // 4×4
const MIN_SPAN = 2;
const MAX_SPAN = 9;

/**
 * Shows a sequence and asks for it back (reversed if `backward`). Resolves to success.
 * `judge` reports the result as soon as the last tile is tapped, before the correct order is shown.
 */
async function round(
  ctx: Ctx,
  tiles: HTMLElement[],
  board: HTMLElement,
  status: HTMLElement,
  span: number,
  backward: boolean,
  judge: (ok: boolean) => void,
) {
  // As in the Corsi test, each block is lit at most once per sequence.
  const seq = shuffle(Array.from({ length: SIZE }, (_, i) => i)).slice(0, span);

  status.textContent = t('ex.grid.watch');
  status.classList.remove('alt');
  await ctx.wait(500);
  for (const i of seq) {
    tiles[i].classList.add('lit');
    sfx.note(i);
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
      sfx.note(i);
      flash(tiles[i], 'tap', 220);
      if (i !== expected[pos]) return done(false);
      if (++pos === expected.length) done(true);
    };
    return () => (onTap = null);
  });

  board.classList.add('locked');
  if (ok) sfx.sparkle();
  judge(ok);
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
  how: 'ex.grid.how',
  why: 'ex.grid.why',
  example: 'ex.grid.example',
  minutes: [1, 3],
  levels: { min: MIN_SPAN, max: MAX_SPAN, start: 3 },
  levelLabel: (l) => `${l} 💡`,

  async run(ctx) {
    const status = h('div', { class: 'grid-status' });
    const tiles = Array.from({ length: SIZE }, () => h('button', { class: 'tile' }));
    const board = h('div', { class: 'tile-grid locked' }, ...tiles);
    ctx.stage.append(status, board);

    if (ctx.quick) {
      // Daily check: forward only, growing from 3. As in the standard Corsi procedure each length gets
      // two attempts, and the test stops when both fail (a single slip doesn't end it).
      let span = 3;
      let best = 0;
      while (span <= MAX_SPAN) {
        ctx.progress((span - 3) / (MAX_SPAN - 2), `${span}`);
        let passed = false;
        for (let attempt = 0; attempt < 2 && !passed; attempt++) {
          passed = await round(ctx, tiles, board, status, span, false, (ok) => ctx.feedback(ok, { was: t('fb.gridOrder') }));
        }
        if (!passed) break;
        best = span++;
      }
      ctx.progress(1);
      return { score: scale(best, MAX_SPAN, MIN_SPAN), detail: t('ex.grid.span', { n: best }) };
    }

    // Gym: forward recall for levels 2–5 to build visuo-spatial capacity, then backward rounds as well.
    // Unlike digit span, backward Corsi is no harder than forward (Kessels et al., 2008), so its length stays the same.
    const rounds = ctx.count(10, 10, 3);
    const st = ctx.stair(rounds, MIN_SPAN, MAX_SPAN, { target: 0.7 });
    let bestF = 0;
    let bestB = 0;
    for (let r = 0; r < rounds; r++) {
      ctx.progress(r / rounds, `${r + 1}/${rounds}`);
      const backward = !ctx.practice && st.int >= 6 && r % 2 === 1;
      const span = st.int;
      const ok = await round(ctx, tiles, board, status, span, backward, (res) => ctx.track(st, res, { was: t('fb.gridOrder') }));
      if (ok && backward) bestB = Math.max(bestB, span);
      if (ok && !backward) bestF = Math.max(bestF, span);
    }
    ctx.progress(1);
    const detail = bestB > 0 ? t('ex.grid.detail', { f: bestF, b: bestB }) : t('ex.grid.span', { n: bestF });
    const { score, timeBonus } = ctx.withTimeBonus(st.score(), 0.8 + 0.6 * st.threshold());
    return { score, detail, level: st.next(), timeBonus };
  },
};
