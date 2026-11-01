import { h, rand, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

const limitFor = (level: number) => Math.max(350, Math.round(1400 * Math.pow(0.89, level - 1)));

export const flanker: Exercise = {
  id: 'flanker',
  icon: '🎯',
  domain: 'attention',
  name: 'ex.flanker.name',
  desc: 'ex.flanker.desc',
  why: 'ex.flanker.why',
  example: 'ex.flanker.example',
  minutes: 2,
  levels: { min: 1, max: 14, start: 1 },
  levelLabel: (l) => `${limitFor(l)} ms`,

  async run(ctx) {
    const total = ctx.count(32, 16, 6);
    const st = new Staircase(ctx.level, 1, 14);

    const hint = h('div', { class: 'flanker-hint' }, t('ex.flanker.instruction'));
    const display = h('div', { class: 'flanker-display' });

    let onChoose: ((dir: 'left' | 'right') => void) | null = null;
    const btnLeft = h('button', { class: 'btn flanker-btn', onPointerdown: () => onChoose?.('left') }, '←');
    const btnRight = h('button', { class: 'btn flanker-btn', onPointerdown: () => onChoose?.('right') }, '→');
    const controls = h('div', { class: 'flanker-controls' }, btnLeft, btnRight);

    ctx.stage.append(hint, display, controls);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onChoose?.('left');
      if (e.key === 'ArrowRight') onChoose?.('right');
    };
    window.addEventListener('keydown', onKey);

    let correct = 0;
    const rts: number[] = [];

    for (let i = 0; i < total; i++) {
      ctx.progress(i / total, `${i + 1}/${total}`);
      await ctx.wait(rand(400, 900));

      const centerDir: 'left' | 'right' = Math.random() < 0.5 ? 'left' : 'right';
      // Congruency: incongruent trials test cognitive conflict / selective attention
      const incongruent = Math.random() < (ctx.practice ? 0.35 : Math.min(0.65, 0.3 + st.int * 0.03));
      const flankDir = incongruent ? (centerDir === 'left' ? 'right' : 'left') : centerDir;

      const arrowChar = (dir: 'left' | 'right') => (dir === 'left' ? '←' : '→');
      const flankChar = arrowChar(flankDir);
      const centerChar = arrowChar(centerDir);

      display.innerHTML = `<span>${flankChar}</span><span>${flankChar}</span><span class="center-arrow">${centerChar}</span><span>${flankChar}</span><span>${flankChar}</span>`;
      flash(display, 'pop', 150);

      const shown = performance.now();
      const limit = limitFor(st.level) * ctx.pace;

      const choice = await ctx.timed<'left' | 'right' | null>(limit, null, (done) => {
        onChoose = done;
        return () => (onChoose = null);
      });
      const rt = performance.now() - shown;

      display.innerHTML = choice ? '' : `⏱ ${t('common.timeout')}`;

      const ok = ctx.track(st, choice === centerDir, {
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

    window.removeEventListener('keydown', onKey);
    ctx.progress(1);

    const avg = rts.length ? Math.round(rts.reduce((a, b) => a + b, 0) / rts.length) : 0;
    return {
      score: st.score(),
      detail: t('ex.flanker.detail', { ok: correct, n: total, ms: avg }),
      level: st.next(),
    };
  },
};
