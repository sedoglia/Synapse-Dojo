import { h, pick, shuffle, flash } from '../dom';
import { t, num } from '../i18n';
import { timeBar } from '../widgets';
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

const itemsFor = (level: number) => Math.min(16, 4 + level * 2);
/** Accuracy alone can't limit a search with no time limit, so the time allowed shrinks with level. */
const limitFor = (level: number) => Math.max(1200, Math.round(6000 * Math.pow(0.84, level - 1)));

export const binding: Exercise = {
  id: 'binding',
  icon: '💠',
  domain: 'attention',
  name: 'ex.binding.name',
  desc: 'ex.binding.desc',
  why: 'ex.binding.why',
  example: 'ex.binding.example',
  minutes: [1, 2],
  levels: { min: 1, max: 10, start: 2 },
  levelLabel: (l) => `${itemsFor(l)} ◆ · ${num(limitFor(l) / 1000)} s`,

  async run(ctx) {
    const total = ctx.count(16, 10, 3);
    const st = ctx.stair(total, 1, 10);

    const goalBar = h('div', { class: 'binding-goal' });
    const grid = h('div', { class: 'binding-grid' });
    const bar = timeBar();
    bar.el.classList.toggle('off', ctx.practice);
    ctx.stage.append(goalBar, bar.el, grid);

    let correct = 0;

    for (let i = 0; i < total; i++) {
      ctx.progress(i / total, `${i + 1}/${total}`);
      const itemCount = itemsFor(st.int);

      const targetShape = pick(SHAPES);
      const targetColor = pick(COLORS);

      // Target representation
      goalBar.replaceChildren(
        `${t('ex.binding.find')}: `,
        h('span', { style: { color: targetColor.css, fontSize: '1.5rem', verticalAlign: 'middle' } }, targetShape.symbol),
        ` (${t(`shape.${targetShape.id}`)} ${t(`color.${targetColor.id}`)})`,
      );
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

      const limit = (ctx.practice ? 60_000 : limitFor(st.level)) * ctx.pace;
      bar.start(limit);
      const chosen = await ctx.timed<{ isTarget: boolean; el: HTMLElement } | null>(limit, null, (done) => {
        onSelect = (isTarget, el) => done({ isTarget, el });
        return () => (onSelect = null);
      });

      bar.stop();
      const ok = ctx.track(st, chosen?.isTarget === true, {
        was: chosen ? `${targetShape.symbol} ${t(`color.${targetColor.id}`)}` : t('common.timeout'),
      });

      if (ok) {
        correct++;
        if (chosen) flash(chosen.el, 'good', 300);
      } else {
        if (chosen) flash(chosen.el, 'bad', 400);
        // Highlight correct element
        const targetEl = elements[shuffled.findIndex((it) => it.isTarget)];
        if (targetEl) targetEl.classList.add('correct-hint');
        await ctx.wait(400);
      }
      await ctx.wait(ok ? 300 : 700);
    }
    ctx.progress(1);

    return {
      score: st.score(),
      detail: t('ex.binding.detail', { ok: correct, n: total }),
      level: st.next(),
    };
  },
};
