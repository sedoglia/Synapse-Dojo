import { h, rand, flash, pick } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

const limitFor = (level: number) => Math.max(450, Math.round(1800 * Math.pow(0.88, level - 1)));

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
    const st = new Staircase(ctx.level, 1, 14);

    const hint = h('div', { class: 'msit-hint' }, t('ex.msit.hint'));
    const display = h('div', { class: 'msit-display' });

    let onPick: ((digit: number) => void) | null = null;
    const buttons = [1, 2, 3].map((num) =>
      h('button', { class: 'btn msit-btn', onPointerdown: () => onPick?.(num) }, String(num)),
    );
    const controls = h('div', { class: 'msit-controls' }, ...buttons);

    ctx.stage.append(hint, display, controls);

    const onKey = (e: KeyboardEvent) => {
      if (['1', '2', '3'].includes(e.key)) onPick?.(Number(e.key));
    };
    window.addEventListener('keydown', onKey);

    let correct = 0;
    const rts: number[] = [];

    for (let i = 0; i < total; i++) {
      ctx.progress(i / total, `${i + 1}/${total}`);
      await ctx.wait(rand(350, 750));

      // Choose unique target digit (1, 2, or 3)
      const targetDigit = pick([1, 2, 3]);
      // Distractor digit (1, 2, or 3 other than target)
      const distractor = pick([1, 2, 3].filter((d) => d !== targetDigit));

      // Level influences incongruency probability (spatial position mismatch)
      const targetPos = rand(0, 2); // 0, 1, or 2 (which correspond to digits 1, 2, 3)

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

      const ok = ctx.track(st, choice === targetDigit, { was: String(targetDigit) });
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

    window.removeEventListener('keydown', onKey);
    ctx.progress(1);

    const avg = rts.length ? Math.round(rts.reduce((a, b) => a + b, 0) / rts.length) : 0;
    return {
      score: st.score(),
      detail: t('ex.msit.detail', { ok: correct, n: total, ms: avg }),
      level: st.next(),
    };
  },
};
