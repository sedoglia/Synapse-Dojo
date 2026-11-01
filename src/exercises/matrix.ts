import { h, shuffle, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

const TOKENS = ['🔷', '🔶', '🔺', '🟢', '⭐', '🟣'];

function rotateCoord(r: number, c: number, size: number, angle: number): { r: number; c: number } {
  if (angle === 90) return { r: c, c: size - 1 - r };
  if (angle === 180) return { r: size - 1 - r, c: size - 1 - c };
  return { r, c };
}

export const matrix: Exercise = {
  id: 'matrix',
  icon: '📐',
  domain: 'spatial',
  name: 'ex.matrix.name',
  desc: 'ex.matrix.desc',
  why: 'ex.matrix.why',
  example: 'ex.matrix.example',
  minutes: 2.5,
  levels: { min: 1, max: 9, start: 2 },
  levelLabel: (l) => `${3 + Math.floor(l / 2)} items`,

  async run(ctx) {
    const trials = ctx.count(8, 6, 2);
    const st = new Staircase(ctx.level, 1, 9, { target: 0.75 });

    const status = h('div', { class: 'matrix-status' });
    const gridEl = h('div', { class: 'matrix-grid' });
    const confirmBtn = h('button', { class: 'btn primary matrix-confirm' }, t('common.start'));

    ctx.stage.append(status, gridEl, confirmBtn);

    let correct = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      confirmBtn.classList.add('hidden');

      const size = 3;
      const count = Math.min(6, 3 + Math.floor(st.int / 3));
      const angle = st.int <= 2 ? 0 : st.int <= 5 ? 90 : 180;

      // Pick unique cells
      const allCells: number[] = [];
      for (let idx = 0; idx < size * size; idx++) allCells.push(idx);
      const chosenCells = shuffle(allCells).slice(0, count);

      const pattern: Record<number, string> = {};
      chosenCells.forEach((cellIdx, k) => {
        pattern[cellIdx] = TOKENS[k % TOKENS.length];
      });

      status.textContent = t('ex.matrix.memorize');

      // Render study grid
      gridEl.className = `matrix-grid size-${size}`;
      gridEl.replaceChildren();
      for (let idx = 0; idx < size * size; idx++) {
        const cell = h('div', { class: 'matrix-cell' }, pattern[idx] ?? '');
        gridEl.append(cell);
      }
      flash(gridEl, 'pop', 200);

      // Study phase: 2000ms * pace
      await ctx.wait(2000 * ctx.pace);

      // Transformation notice
      const transformText =
        angle === 90
          ? t('ex.matrix.rot90')
          : angle === 180
            ? t('ex.matrix.rot180')
            : t('ex.matrix.same');
      status.textContent = transformText;

      // Clear grid for user placement
      const placed: Record<number, string> = {};
      const targetRotatedPattern: Record<number, string> = {};

      chosenCells.forEach((cellIdx) => {
        const r = Math.floor(cellIdx / size);
        const c = cellIdx % size;
        const rot = rotateCoord(r, c, size, angle);
        const newIdx = rot.r * size + rot.c;
        targetRotatedPattern[newIdx] = pattern[cellIdx];
      });

      const renderInteractive = () => {
        gridEl.replaceChildren();
        for (let idx = 0; idx < size * size; idx++) {
          const val = placed[idx] ?? '';
          const cell = h(
            'button',
            {
              class: `matrix-cell btn-cell ${val ? 'active' : ''}`,
              onClick: () => {
                if (placed[idx]) {
                  delete placed[idx];
                } else {
                  // Cycle or place next available token
                  const usedTokens = Object.values(placed);
                  const available = TOKENS.slice(0, count).find((tok) => !usedTokens.includes(tok));
                  if (available) placed[idx] = available;
                }
                renderInteractive();
              },
            },
            val,
          );
          gridEl.append(cell);
        }
        confirmBtn.disabled = Object.keys(placed).length !== count;
      };

      confirmBtn.classList.remove('hidden');
      renderInteractive();

      await ctx.input<void>((done) => {
        confirmBtn.onclick = () => done();
      });

      // Verify answers
      let allMatch = true;
      for (let idx = 0; idx < size * size; idx++) {
        if ((placed[idx] ?? '') !== (targetRotatedPattern[idx] ?? '')) {
          allMatch = false;
          break;
        }
      }

      const ok = ctx.track(st, allMatch);
      if (ok) {
        correct++;
        flash(gridEl, 'good', 300);
      } else {
        flash(gridEl, 'bad', 400);
        // Show correct rotated positions
        gridEl.replaceChildren();
        for (let idx = 0; idx < size * size; idx++) {
          const cell = h('div', { class: 'matrix-cell correct-hint' }, targetRotatedPattern[idx] ?? '');
          gridEl.append(cell);
        }
      }
      await ctx.wait(ok ? 400 : 1200);
    }
    ctx.progress(1);

    return {
      score: st.score(),
      detail: t('ex.matrix.detail', { ok: correct, n: trials }),
      level: st.next(),
    };
  },
};
