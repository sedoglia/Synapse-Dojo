import { h, shuffle, flash, pick } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

function rotateCoord(r: number, c: number, size: number, angle: number): { r: number; c: number } {
  if (angle === 90) return { r: c, c: size - 1 - r };
  if (angle === 180) return { r: size - 1 - r, c: size - 1 - c };
  if (angle === 270) return { r: size - 1 - c, c: r };
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
  levelLabel: (l) => `${l <= 2 ? 'no rot' : l <= 4 ? 'rot 90°' : 'rot 180°'} · ${2 + Math.floor((l + 1) / 3)} tiles`,

  async run(ctx) {
    const trials = ctx.count(8, 6, 2);
    const st = new Staircase(ctx.level, 1, 9, { target: 0.75 });

    const statusTitle = h('div', { class: 'matrix-status' });
    const badge = h('div', { class: 'matrix-badge' });
    const timerFill = h('div', { class: 'matrix-timer-fill' });
    const timerBar = h('div', { class: 'matrix-timer-bar' }, timerFill);
    const statusBox = h('div', { class: 'matrix-status-box' }, statusTitle, badge, timerBar);

    const gridEl = h('div', { class: 'matrix-grid size-3' });
    const confirmBtn = h('button', { class: 'btn primary matrix-confirm' });

    ctx.stage.append(statusBox, gridEl, confirmBtn);

    let correct = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      confirmBtn.classList.add('hidden');
      confirmBtn.disabled = true;

      const size = 3;
      // Progressive difficulty:
      // Level 1: 2 tiles, 0° (pure spatial memory, no rotation)
      // Level 2: 3 tiles, 0°
      // Level 3: 3 tiles, 90°
      // Level 4: 4 tiles, 90°
      // Level 5: 3 tiles, 180°
      // Level 6: 4 tiles, 180°
      // Level 7+: 4-5 tiles, 90° or 180° or 270°
      const count =
        st.int === 1 ? 2 :
        st.int <= 3 ? 3 :
        st.int <= 6 ? 4 : 5;

      const angle =
        st.int <= 2 ? 0 :
        st.int <= 4 ? 90 :
        st.int <= 6 ? 180 :
        pick([90, 180, 270]);

      // Pick unique cells
      const allCells = Array.from({ length: size * size }, (_, idx) => idx);
      const chosenCells = shuffle(allCells).slice(0, count);
      const studySet = new Set(chosenCells);

      // --- STUDY PHASE ---
      statusTitle.textContent = t('ex.matrix.memorize');
      badge.className = 'matrix-badge';
      badge.textContent = `🔷 ${count} ${t('ex.matrix.itemsToRemember')}`;
      timerBar.style.display = 'block';
      timerFill.style.transition = 'none';
      timerFill.style.width = '100%';

      gridEl.className = 'matrix-grid size-3';
      gridEl.replaceChildren();
      for (let idx = 0; idx < size * size; idx++) {
        const isFilled = studySet.has(idx);
        const cell = h(
          'div',
          { class: `matrix-cell ${isFilled ? 'filled' : ''}` },
          isFilled ? '🔷' : '',
        );
        gridEl.append(cell);
      }
      flash(gridEl, 'pop', 200);

      // Generous study duration: 4800ms at start, 6000ms in practice
      const studyMs = (ctx.mode === 'practice' ? 6000 : Math.max(3000, 4800 - (st.level - 1) * 200)) * ctx.pace;

      // Animate countdown bar
      requestAnimationFrame(() => {
        timerFill.style.transition = `width ${studyMs}ms linear`;
        timerFill.style.width = '0%';
      });

      await ctx.wait(studyMs);

      // --- RECALL PHASE ---
      timerBar.style.display = 'none';

      badge.className = 'matrix-badge rot';
      if (angle === 0) {
        statusTitle.textContent = t('ex.matrix.same');
        badge.textContent = `📍 ${t('ex.matrix.noRot')}`;
      } else if (angle === 90) {
        statusTitle.textContent = t('ex.matrix.rot90');
        badge.textContent = `↻ ${t('ex.matrix.rot90Badge')}`;
      } else if (angle === 180) {
        statusTitle.textContent = t('ex.matrix.rot180');
        badge.textContent = `🔄 ${t('ex.matrix.rot180Badge')}`;
      } else {
        statusTitle.textContent = t('ex.matrix.rot270');
        badge.textContent = `↺ ${t('ex.matrix.rot270Badge')}`;
      }

      // Compute target rotated positions
      const targetRotatedIndices = new Set<number>();
      chosenCells.forEach((cellIdx) => {
        const r = Math.floor(cellIdx / size);
        const c = cellIdx % size;
        const rot = rotateCoord(r, c, size, angle);
        targetRotatedIndices.add(rot.r * size + rot.c);
      });

      // User placement
      const selected = new Set<number>();

      const updateConfirm = () => {
        confirmBtn.textContent = t('ex.matrix.confirm', { sel: selected.size, n: count });
        confirmBtn.disabled = selected.size !== count;
      };

      const renderInteractive = () => {
        gridEl.replaceChildren();
        for (let idx = 0; idx < size * size; idx++) {
          const isSelected = selected.has(idx);
          const cell = h(
            'button',
            {
              class: `matrix-cell btn-cell ${isSelected ? 'active' : ''}`,
              onClick: () => {
                if (selected.has(idx)) {
                  selected.delete(idx);
                } else {
                  if (selected.size < count) {
                    selected.add(idx);
                  }
                }
                renderInteractive();
              },
            },
            isSelected ? '🔷' : '',
          );
          gridEl.append(cell);
        }
        updateConfirm();
      };

      confirmBtn.classList.remove('hidden');
      renderInteractive();

      await ctx.input<void>((done) => {
        confirmBtn.onclick = () => done();
      });

      // Check results
      let allMatch = selected.size === targetRotatedIndices.size;
      for (const idx of selected) {
        if (!targetRotatedIndices.has(idx)) {
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
        gridEl.replaceChildren();
        for (let idx = 0; idx < size * size; idx++) {
          const shouldHaveBeen = targetRotatedIndices.has(idx);
          const wasSelected = selected.has(idx);
          let cellClass = 'matrix-cell';
          let symbol = '';

          if (shouldHaveBeen) {
            cellClass += ' correct-hint';
            symbol = '🔷';
          } else if (wasSelected) {
            cellClass += ' wrong-hint';
            symbol = '✕';
          }

          const cell = h('div', { class: cellClass }, symbol);
          gridEl.append(cell);
        }
      }

      await ctx.wait(ok ? 400 : 1600);
    }

    ctx.progress(1);

    return {
      score: st.score(),
      detail: t('ex.matrix.detail', { ok: correct, n: trials }),
      level: st.next(),
    };
  },
};
