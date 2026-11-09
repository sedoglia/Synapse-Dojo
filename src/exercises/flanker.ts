import { h, rand, flash } from '../dom';
import { t } from '../i18n';
import { onKeys } from '../widgets';
import type { Exercise } from './types';

const limitFor = (level: number) => Math.max(480, Math.round(1400 * Math.pow(0.92, level - 1)));

export const flanker: Exercise = {
  id: 'flanker',
  icon: '🎯',
  domain: 'attention',
  name: 'ex.flanker.name',
  desc: 'ex.flanker.desc',
  how: 'ex.flanker.how',
  why: 'ex.flanker.why',
  example: 'ex.flanker.example',
  minutes: [1, 2],
  levels: { min: 1, max: 14, start: 1 },
  levelLabel: (l) => `${limitFor(l)} ms`,

  async run(ctx) {
    const total = ctx.count(32, 16, 6);
    const st = ctx.stair(total, 1, 14);

    const hint = h('div', { class: 'flanker-hint' }, t('ex.flanker.instruction'));
    const display = h('div', { class: 'flanker-display' });

    let onChoose: ((dir: 'left' | 'right') => void) | null = null;
    const btnLeft = h('button', { class: 'btn flanker-btn', onPointerdown: () => onChoose?.('left') }, '←');
    const btnRight = h('button', { class: 'btn flanker-btn', onPointerdown: () => onChoose?.('right') }, '→');
    const controls = h('div', { class: 'flanker-controls' }, btnLeft, btnRight);

    ctx.stage.append(hint, display, controls);

    onKeys(ctx, { ArrowLeft: () => onChoose?.('left'), ArrowRight: () => onChoose?.('right') });

    let correct = 0;
    const rts: number[] = [];

    for (let i = 0; i < total; i++) {
      ctx.progress(i / total, `${i + 1}/${total}`);
      await ctx.wait(rand(400, 900));

      const centerDir: 'left' | 'right' = Math.random() < 0.5 ? 'left' : 'right';
      // Half the trials conflict at every level: more incongruent trials would shrink the conflict effect itself,
      // because people adapt to frequent conflict (proportion congruency effect; Bugg & Crump, 2012).
      const incongruent = Math.random() < (ctx.practice ? 0.35 : 0.5);
      const flankDir = incongruent ? (centerDir === 'left' ? 'right' : 'left') : centerDir;

      const arrowChar = (dir: 'left' | 'right') => (dir === 'left' ? '←' : '→');
      const flankChar = arrowChar(flankDir);
      const centerChar = arrowChar(centerDir);

      display.replaceChildren(
        ...[flankChar, flankChar, centerChar, flankChar, flankChar].map((c, k) => h('span', { class: k === 2 ? 'center-arrow' : null }, c)),
      );
      flash(display, 'pop', 150);

      const shown = performance.now();
      const limit = limitFor(st.level) * ctx.pace;

      const choice = await ctx.timed<'left' | 'right' | null>(limit, null, (done) => {
        onChoose = done;
        return () => (onChoose = null);
      });
      const rt = performance.now() - shown;

      display.textContent = choice ? '' : `⏱ ${t('common.timeout')}`;

      const ok = ctx.track(st, choice === centerDir, {
        rt,
        was: arrowChar(centerDir),
      });

      if (ok) {
        correct++;
        rts.push(rt);
        flash(choice === 'left' ? btnLeft : btnRight, 'good', 250);
      } else {
        if (choice) flash(choice === 'left' ? btnLeft : btnRight, 'bad', 400);
        await ctx.wait(350);
      }
      await ctx.wait(ok ? 250 : 700);
    }

    ctx.progress(1);

    const avg = rts.length ? Math.round(rts.reduce((a, b) => a + b, 0) / rts.length) : 0;
    return {
      score: st.score(),
      detail: t('ex.flanker.detail', { ok: correct, n: total, ms: avg }),
      level: st.next(),
    };
  },
};
