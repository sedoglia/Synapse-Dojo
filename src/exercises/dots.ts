import { h, rand, flash, shuffle } from '../dom';
import { t } from '../i18n';
import { onKeys } from '../widgets';
import type { Exercise } from './types';

// Ratio of dots: gentler start, ramping smoothly with level
const ratioFor = (level: number) => Math.min(0.88, 0.40 + (level - 1) * 0.044);

function renderDotCloud(count: number): HTMLElement {
  const box = h('div', { class: 'dot-cloud' });
  const gridSize = 6;
  const totalSlots = gridSize * gridSize;
  const slotIndices = Array.from({ length: totalSlots }, (_, i) => i);
  const chosenSlots = shuffle(slotIndices).slice(0, count);

  for (const slot of chosenSlots) {
    const row = Math.floor(slot / gridSize);
    const col = slot % gridSize;
    const cellW = 100 / gridSize;
    const cellH = 100 / gridSize;
    const top = row * cellH + rand(3, Math.max(4, cellH - 14));
    const left = col * cellW + rand(3, Math.max(4, cellW - 14));
    const size = rand(10, 14);
    const dot = h('div', {
      class: 'dot-item',
      style: {
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
      },
    });
    box.append(dot);
  }
  return box;
}

export const dots: Exercise = {
  id: 'dots',
  icon: '🔴',
  domain: 'language',
  name: 'ex.dots.name',
  desc: 'ex.dots.desc',
  how: 'ex.dots.how',
  why: 'ex.dots.why',
  example: 'ex.dots.example',
  minutes: [1, 2],
  levels: { min: 1, max: 12, start: 2 },
  levelLabel: (l) => `${(ratioFor(l) * 100).toFixed(0)}%`,

  async run(ctx) {
    const trials = ctx.count(20, 14, 4);
    const st = ctx.stair(trials, 1, 12);

    const hint = h('div', { class: 'dots-hint' }, t('ex.dots.hint'));
    const container = h('div', { class: 'dots-container' });
    const leftBox = h('div', { class: 'dots-side left' });
    const rightBox = h('div', { class: 'dots-side right' });
    container.append(leftBox, rightBox);

    let onSelect: ((side: 'left' | 'right') => void) | null = null;
    const btnLeft = h('button', { class: 'btn dots-btn', onPointerdown: () => onSelect?.('left') }, `👈 ${t('ex.dots.left')}`);
    const btnRight = h('button', { class: 'btn dots-btn', onPointerdown: () => onSelect?.('right') }, `${t('ex.dots.right')} 👉`);
    const controls = h('div', { class: 'dots-controls' }, btnLeft, btnRight);

    ctx.stage.append(hint, container, controls);

    onKeys(ctx, {
      ArrowLeft: () => onSelect?.('left'),
      ArrowRight: () => onSelect?.('right'),
    });

    let correct = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);

      leftBox.replaceChildren();
      rightBox.replaceChildren();
      controls.classList.add('hidden');
      hint.textContent = t('ex.dots.hint');

      await ctx.wait(rand(400, 700));

      const ratio = ratioFor(st.level);
      const base = rand(20, 30);
      const fewer = Math.max(6, Math.round(base * ratio));

      const moreSide: 'left' | 'right' = Math.random() < 0.5 ? 'left' : 'right';
      const leftCount = moreSide === 'left' ? base : fewer;
      const rightCount = moreSide === 'right' ? base : fewer;

      leftBox.append(renderDotCloud(leftCount));
      rightBox.append(renderDotCloud(rightCount));
      flash(container, 'pop', 150);

      // Comfortable display time: 1500ms at start, 2200ms in practice
      const displayMs = (ctx.mode === 'practice' ? 2200 : Math.max(800, Math.round(1500 - (st.level - 1) * 70))) * ctx.pace;
      await ctx.wait(displayMs);

      // Mask dots and prompt response
      leftBox.replaceChildren(h('div', { class: 'dot-mask' }, '?'));
      rightBox.replaceChildren(h('div', { class: 'dot-mask' }, '?'));
      controls.classList.remove('hidden');

      const chosen = await ctx.input<'left' | 'right'>((done) => {
        onSelect = done;
        return () => (onSelect = null);
      });

      const ok = ctx.track(st, chosen === moreSide, {
        was: `${leftCount} vs ${rightCount}`,
      });

      if (ok) {
        correct++;
        flash(chosen === 'left' ? btnLeft : btnRight, 'good', 250);
      } else {
        flash(chosen === 'left' ? btnLeft : btnRight, 'bad', 400);
      }

      leftBox.textContent = String(leftCount);
      rightBox.textContent = String(rightCount);
      await ctx.wait(ok ? 350 : 800);
    }
    ctx.progress(1);

    const { score, timeBonus } = ctx.withTimeBonus(st.score(), 1.8);
    return {
      score,
      detail: t('ex.dots.detail', { ok: correct, n: trials }),
      level: st.next(),
      timeBonus,
    };
  },
};
