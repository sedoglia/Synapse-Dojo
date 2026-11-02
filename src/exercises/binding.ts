import { h, pick, shuffle, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

const SHAPES = [
  { id: 'circle', symbol: '●' },
  { id: 'square', symbol: '■' },
  { id: 'triangle', symbol: '▲' },
  { id: 'diamond', symbol: '◆' },
] as const;

const COLORS = [
  { id: 'red', css: 'var(--c-red)' },
  { id: 'blue', css: 'var(--c-blue)' },
  { id: 'green', css: 'var(--c-green)' },
  { id: 'yellow', css: 'var(--c-yellow)' },
] as const;

export const binding: Exercise = {
  id: 'binding',
  icon: '💠',
  domain: 'attention',
  name: 'ex.binding.name',
  desc: 'ex.binding.desc',
  why: 'ex.binding.why',
  example: 'ex.binding.example',
  minutes: 2,
  levels: { min: 1, max: 10, start: 2 },
  levelLabel: (l) => `${4 + l * 2} items`,

  async run(ctx) {
    const total = ctx.count(16, 10, 3);
    const st = new Staircase(ctx.level, 1, 10);

    const goalBar = h('div', { class: 'binding-goal' });
    const grid = h('div', { class: 'binding-grid' });
    ctx.stage.append(goalBar, grid);

    let correct = 0;

    for (let i = 0; i < total; i++) {
      ctx.progress(i / total, `${i + 1}/${total}`);
      const itemCount = Math.min(16, 4 + st.int * 2);

      const targetShape = pick(SHAPES);
      const targetColor = pick(COLORS);

      // Target representation
      goalBar.innerHTML = `${t('ex.binding.find')}: <span style="color: ${targetColor.css}; font-size: 1.5rem; vertical-align: middle;">${targetShape.symbol}</span> (${t(`shape.${targetShape.id}`)} ${t(`color.${targetColor.id}`)})`;
      flash(goalBar, 'pop', 200);

      // Create distractors sharing either shape or color
      const items: { shape: (typeof SHAPES)[number]; color: (typeof COLORS)[number]; isTarget: boolean }[] = [];
      items.push({ shape: targetShape, color: targetColor, isTarget: true });

      for (let j = 1; j < itemCount; j++) {
        const share = Math.random() < 0.5 ? 'shape' : 'color';
        let s = targetShape;
        let c = targetColor;
        if (share === 'shape') {
          s = targetShape;
          c = pick(COLORS.filter((x) => x.id !== targetColor.id));
        } else {
          s = pick(SHAPES.filter((x) => x.id !== targetShape.id));
          c = targetColor;
        }
        items.push({ shape: s, color: c, isTarget: false });
      }

      const shuffled = shuffle(items);
      grid.replaceChildren();

      let onSelect: ((isTarget: boolean, el: HTMLElement) => void) | null = null;
      const elements = shuffled.map((it) => {
        const btn = h(
          'button',
          {
            class: 'binding-tile',
            style: { color: it.color.css },
            onPointerdown: () => onSelect?.(it.isTarget, btn),
          },
          it.shape.symbol,
        );
        return btn;
      });
      grid.append(...elements);

      const chosen = await ctx.input<{ isTarget: boolean; el: HTMLElement }>((done) => {
        onSelect = (isTarget, el) => done({ isTarget, el });
        return () => (onSelect = null);
      });

      const ok = ctx.track(st, chosen.isTarget, {
        was: `${targetShape.symbol} ${t(`color.${targetColor.id}`)}`,
      });

      if (ok) {
        correct++;
        flash(chosen.el, 'good', 300);
      } else {
        flash(chosen.el, 'bad', 400);
        // Highlight correct element
        const targetEl = elements[shuffled.findIndex((it) => it.isTarget)];
        if (targetEl) targetEl.classList.add('correct-hint');
        await ctx.wait(400);
      }
      await ctx.wait(ok ? 300 : 700);
    }
    ctx.progress(1);

    const { score, timeBonus } = ctx.withTimeBonus(st.score(), 2.5);
    return {
      score,
      detail: t('ex.binding.detail', { ok: correct, n: total }),
      level: st.next(),
      timeBonus,
    };
  },
};
