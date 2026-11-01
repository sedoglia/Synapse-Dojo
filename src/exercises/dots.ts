import { h, rand, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

// Ratio of dots: closer ratio = higher difficulty
const ratioFor = (level: number) => Math.min(0.92, 0.5 + level * 0.04);

function renderDotCloud(count: number): HTMLElement {
  const box = h('div', { class: 'dot-cloud' });
  for (let i = 0; i < count; i++) {
    const top = rand(8, 88);
    const left = rand(8, 88);
    const size = rand(8, 14);
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
  why: 'ex.dots.why',
  example: 'ex.dots.example',
  minutes: 2,
  levels: { min: 1, max: 12, start: 2 },
  levelLabel: (l) => `ratio ${(ratioFor(l) * 100).toFixed(0)}%`,

  async run(ctx) {
    const trials = ctx.count(20, 14, 4);
    const st = new Staircase(ctx.level, 1, 12);

    const hint = h('div', { class: 'dots-hint' }, t('ex.dots.hint'));
    const container = h('div', { class: 'dots-container' });
    const leftBox = h('div', { class: 'dots-side left' });
    const rightBox = h('div', { class: 'dots-side right' });
    container.append(leftBox, rightBox);

    let onSelect: ((side: 'left' | 'right') => void) | null = null;
    const btnLeft = h('button', { class: 'btn dots-btn', onPointerdown: () => onSelect?.('left') }, t('ex.dots.left'));
    const btnRight = h('button', { class: 'btn dots-btn', onPointerdown: () => onSelect?.('right') }, t('ex.dots.right'));
    const controls = h('div', { class: 'dots-controls' }, btnLeft, btnRight);

    ctx.stage.append(hint, container, controls);

    let correct = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);

      leftBox.replaceChildren();
      rightBox.replaceChildren();
      controls.classList.add('hidden');

      await ctx.wait(rand(400, 800));

      const ratio = ratioFor(st.level);
      const base = rand(16, 32);
      const fewer = Math.round(base * ratio);

      const moreSide: 'left' | 'right' = Math.random() < 0.5 ? 'left' : 'right';
      const leftCount = moreSide === 'left' ? base : fewer;
      const rightCount = moreSide === 'right' ? base : fewer;

      leftBox.append(renderDotCloud(leftCount));
      rightBox.append(renderDotCloud(rightCount));
      flash(container, 'pop', 150);

      // Brief flash display (550ms * pace)
      await ctx.wait(550 * ctx.pace);

      // Mask dots
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

    return {
      score: st.score(),
      detail: t('ex.dots.detail', { ok: correct, n: trials }),
      level: st.next(),
    };
  },
};
