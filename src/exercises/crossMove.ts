import { h, rand, flash } from '../dom';
import { sfx } from '../audio';
import { t } from '../i18n';
import { onKeys } from '../widgets';
import type { Exercise } from './types';

const limitFor = (level: number) => Math.max(520, Math.round(1500 * Math.pow(0.908, level - 1)));

export const crossMove: Exercise = {
  id: 'crossMove',
  icon: '🔄',
  domain: 'coordination',
  name: 'ex.crossMove.name',
  desc: 'ex.crossMove.desc',
  why: 'ex.crossMove.why',
  example: 'ex.crossMove.example',
  minutes: [1, 2],
  levels: { min: 1, max: 12, start: 1 },
  levelLabel: (l) => `${limitFor(l)} ms`,

  async run(ctx) {
    const trials = ctx.count(26, 16, 5);
    const st = ctx.stair(trials, 1, 12);

    const ruleLabel = h('div', { class: 'cross-rule' });
    const arena = h('div', { class: 'cross-arena' });
    const leftHalf = h('div', { class: 'cross-half left-half' });
    const rightHalf = h('div', { class: 'cross-half right-half' });
    arena.append(leftHalf, rightHalf);

    let onTap: ((side: 'left' | 'right') => void) | null = null;
    const btnLeft = h(
      'button',
      { class: 'btn cross-btn left-btn', onPointerdown: () => onTap?.('left') },
      h('span', {}, `👈 ${t('ex.dots.left')}`),
      h('span', { class: 'pad-key-hint' }, '[A / ←]'),
    );
    const btnRight = h(
      'button',
      { class: 'btn cross-btn right-btn', onPointerdown: () => onTap?.('right') },
      h('span', {}, `${t('ex.dots.right')} 👉`),
      h('span', { class: 'pad-key-hint' }, '[D / →]'),
    );
    const controls = h('div', { class: 'cross-controls' }, btnLeft, btnRight);

    ctx.stage.append(ruleLabel, arena, controls);

    onKeys(ctx, {
      ArrowLeft: () => onTap?.('left'),
      ArrowRight: () => onTap?.('right'),
      a: () => onTap?.('left'),
      A: () => onTap?.('left'),
      d: () => onTap?.('right'),
      D: () => onTap?.('right'),
    });

    let correct = 0;
    const rts: number[] = [];

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);

      leftHalf.replaceChildren();
      rightHalf.replaceChildren();
      await ctx.wait(rand(400, 900));

      const isCross = Math.random() < (ctx.practice ? 0.35 : 0.5);
      ruleLabel.textContent = isCross ? t('ex.crossMove.cross') : t('ex.crossMove.same');
      ruleLabel.className = `cross-rule ${isCross ? 'cross-mode' : 'same-mode'}`;
      arena.className = `cross-arena ${isCross ? 'is-crossing' : 'is-same'}`;

      const stimulusSide: 'left' | 'right' = Math.random() < 0.5 ? 'left' : 'right';
      const targetSide: 'left' | 'right' = isCross
        ? (stimulusSide === 'left' ? 'right' : 'left')
        : stimulusSide;

      const orb = h('div', { class: 'cross-orb' }, '⚡');
      if (stimulusSide === 'left') leftHalf.append(orb);
      else rightHalf.append(orb);
      flash(orb, 'pop', 150);

      const shown = performance.now();
      const limit = limitFor(st.level) * ctx.pace;

      const choice = await ctx.timed<'left' | 'right' | null>(limit, null, (done) => {
        onTap = (side) => {
          sfx.drum(side);
          done(side);
        };
        return () => (onTap = null);
      });
      const rt = performance.now() - shown;

      const ok = ctx.track(st, choice === targetSide, {
        rt,
        was: targetSide === 'left' ? t('ex.dots.left') : t('ex.dots.right'),
      });

      if (ok) {
        correct++;
        rts.push(rt);
        flash(choice === 'left' ? btnLeft : btnRight, 'good', 250);
      } else {
        if (choice) flash(choice === 'left' ? btnLeft : btnRight, 'bad', 400);
        await ctx.wait(350);
      }
      await ctx.wait(ok ? 200 : 600);
    }

    ctx.progress(1);

    const avg = rts.length ? Math.round(rts.reduce((a, b) => a + b, 0) / rts.length) : 0;
    return {
      score: st.score(),
      detail: t('ex.crossMove.detail', { ok: correct, n: trials, ms: avg }),
      level: st.next(),
    };
  },
};
