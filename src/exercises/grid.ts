import { h, rand, scale, flash } from '../dom';
import { sfx } from '../audio';
import { t } from '../i18n';
import type { Exercise } from './types';

const SIZE = 16; // 4×4
const MAX_SPAN = 10;

export const grid: Exercise = {
  id: 'grid',
  icon: '💡',
  skill: 'memory',
  name: 'ex.grid.name',
  desc: 'ex.grid.desc',

  async run(ctx) {
    const status = h('div', { class: 'grid-status' });
    let onTap: ((i: number) => void) | null = null;
    const tiles = Array.from({ length: SIZE }, (_, i) =>
      h('button', { class: 'tile', onPointerdown: () => onTap?.(i) }),
    );
    const board = h('div', { class: 'tile-grid locked' }, ...tiles);
    ctx.stage.append(status, board);

    let span = 3;
    let best = 0;
    let lives = ctx.quick ? 1 : 2;

    while (lives > 0 && span <= MAX_SPAN) {
      ctx.progress((span - 3) / (MAX_SPAN - 2), `${span}`);
      const seq: number[] = [];
      while (seq.length < span) {
        const n = rand(0, SIZE - 1);
        if (n !== seq[seq.length - 1]) seq.push(n);
      }

      status.textContent = t('ex.grid.watch');
      await ctx.wait(500);
      for (const i of seq) {
        tiles[i].classList.add('lit');
        sfx.tick();
        await ctx.wait(550);
        tiles[i].classList.remove('lit');
        await ctx.wait(200);
      }

      status.textContent = t('ex.grid.yours', { n: span });
      board.classList.remove('locked');
      const ok = await ctx.input<boolean>((done) => {
        let pos = 0;
        onTap = (i) => {
          flash(tiles[i], 'tap', 220);
          if (i !== seq[pos]) return done(false);
          if (++pos === seq.length) done(true);
        };
        return () => (onTap = null);
      });

      board.classList.add('locked');
      if (ok) {
        best = span;
        sfx.ok();
        flash(board, 'good', 450);
        span++;
      } else {
        lives--;
        sfx.bad();
        flash(board, 'bad', 450);
      }
      await ctx.wait(650);
    }
    ctx.progress(1);

    return { score: scale(best, 9, 2), detail: t('ex.grid.span', { n: best }) };
  },
};
