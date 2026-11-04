import { h, rand, flash, pick } from '../dom';
import { t } from '../i18n';
import { onKeys } from '../widgets';
import type { Exercise } from './types';

const limitFor = (level: number) => Math.max(560, Math.round(1800 * Math.pow(0.914, level - 1)));

export const msit: Exercise = {
  id: 'msit',
  icon: '🔠',
  domain: 'attention',
  name: 'ex.msit.name',
  desc: 'ex.msit.desc',
  why: 'ex.msit.why',
  example: 'ex.msit.example',
  minutes: 2,
  levels: { min: 1, max: 14, start: 1 },
  levelLabel: (l) => `${limitFor(l)} ms`,

  async run(ctx) {
    const total = ctx.count(28, 14, 4);
    const st = ctx.stair(total, 1, 14);

    const hint = h('div', { class: 'msit-hint' }, t('ex.msit.hint'));
    const display = h('div', { class: 'msit-display' });

    let onPick: ((digit: number) => void) | null = null;
    const buttons = [1, 2, 3].map((num) =>
      h('button', { class: 'btn msit-btn', onPointerdown: () => onPick?.(num) }, String(num)),
    );
    const controls = h('div', { class: 'msit-controls' }, ...buttons);

    ctx.stage.append(hint, display, controls);

    onKeys(ctx, { '1': () => onPick?.(1), '2': () => onPick?.(2), '3': () => onPick?.(3) });

    let correct = 0;
    const rts: number[] = [];

    for (let i = 0; i < total; i++) {
      ctx.progress(i / total, `${i + 1}/${total}`);
      await ctx.wait(rand(350, 750));

      // As in the original MSIT (Bush & Shin, 2006): control trials show the target at the position
      // matching its value among 0s ("1 0 0"); interference trials put it elsewhere among other digits
      // that are valid answers ("2 1 1"), so both the flankers and the position pull the wrong way.
      const targetDigit = pick([1, 2, 3]);
      const interference = Math.random() < 0.5;
      const targetPos = interference ? pick([0, 1, 2].filter((p) => p !== targetDigit - 1)) : targetDigit - 1;
      const distractor = interference ? pick([1, 2, 3].filter((d) => d !== targetDigit)) : 0;

      const triplet = [distractor, distractor, distractor];
      triplet[targetPos] = targetDigit;

      display.textContent = triplet.join('  ');
      flash(display, 'pop', 150);

      const shown = performance.now();
      const limit = limitFor(st.level) * ctx.pace;

      const choice = await ctx.timed<number | null>(limit, null, (done) => {
        onPick = done;
        return () => (onPick = null);
      });
      const rt = performance.now() - shown;

      display.textContent = choice !== null ? '' : `⏱ ${t('common.timeout')}`;

      const ok = ctx.track(st, choice === targetDigit, { rt, was: String(targetDigit) });
      const targetBtn = buttons[targetDigit - 1];

      if (ok) {
        correct++;
        rts.push(rt);
        flash(targetBtn, 'good', 250);
      } else {
        targetBtn.classList.add('correct-hint');
        if (choice !== null) flash(buttons[choice - 1], 'bad', 400);
        await ctx.wait(350);
      }
      await ctx.wait(ok ? 250 : 700);
      targetBtn.classList.remove('correct-hint');
    }

    ctx.progress(1);

    const avg = rts.length ? Math.round(rts.reduce((a, b) => a + b, 0) / rts.length) : 0;
    return {
      score: st.score(),
      detail: t('ex.msit.detail', { ok: correct, n: total, ms: avg }),
      level: st.next(),
    };
  },
};
