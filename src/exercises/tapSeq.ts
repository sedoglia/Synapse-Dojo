import { h, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

const lenFor = (level: number) => Math.min(12, 3 + level);

export const tapSeq: Exercise = {
  id: 'tapSeq',
  icon: '👆',
  domain: 'coordination',
  name: 'ex.tapSeq.name',
  desc: 'ex.tapSeq.desc',
  why: 'ex.tapSeq.why',
  example: 'ex.tapSeq.example',
  minutes: 2,
  levels: { min: 1, max: 10, start: 2 },
  levelLabel: (l) => `${lenFor(l)} taps`,

  async run(ctx) {
    const trials = ctx.count(10, 8, 3);
    const st = new Staircase(ctx.level, 1, 10);

    const hint = h('div', { class: 'bilateral-hint' }, t('ex.tapSeq.hint'));
    const seqDisplay = h('div', { class: 'bilateral-seq' });

    let onTap: ((side: 'L' | 'R') => void) | null = null;
    const btnLeft = h('button', { class: 'btn bilateral-pad left-pad', onPointerdown: () => onTap?.('L') }, '👈 L');
    const btnRight = h('button', { class: 'btn bilateral-pad right-pad', onPointerdown: () => onTap?.('R') }, 'R 👉');
    const controls = h('div', { class: 'bilateral-controls' }, btnLeft, btnRight);

    ctx.stage.append(hint, seqDisplay, controls);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') onTap?.('L');
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') onTap?.('R');
    };
    window.addEventListener('keydown', onKey);

    let correct = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      const len = lenFor(st.level);

      // Generate sequence of 'L' and 'R'
      const pattern: ('L' | 'R')[] = [];
      for (let j = 0; j < len; j++) {
        pattern.push(Math.random() < 0.5 ? 'L' : 'R');
      }

      let currentStep = 0;
      let hasError = false;

      const renderSeq = () => {
        seqDisplay.replaceChildren();
        pattern.forEach((step, idx) => {
          const item = h(
            'span',
            {
              class: `seq-node ${idx < currentStep ? 'done' : idx === currentStep ? 'current' : ''}`,
            },
            step,
          );
          seqDisplay.append(item);
        });
      };

      renderSeq();

      await ctx.input<void>((done) => {
        onTap = (side) => {
          if (side === pattern[currentStep]) {
            flash(side === 'L' ? btnLeft : btnRight, 'good', 150);
            currentStep++;
            renderSeq();
            if (currentStep >= len) done();
          } else {
            hasError = true;
            flash(side === 'L' ? btnLeft : btnRight, 'bad', 250);
          }
        };
        return () => {
          onTap = null;
        };
      });

      const ok = ctx.track(st, !hasError, {
        was: `${pattern.join(' ')}`,
      });

      if (ok) {
        correct++;
        flash(seqDisplay, 'good', 300);
      } else {
        flash(seqDisplay, 'bad', 400);
      }
      await ctx.wait(ok ? 300 : 700);
    }

    window.removeEventListener('keydown', onKey);
    ctx.progress(1);

    return {
      score: st.score(),
      detail: t('ex.tapSeq.detail', { ok: correct, n: trials }),
      level: st.next(),
    };
  },
};
