import { h, flash } from '../dom';
import { t } from '../i18n';
import { onKeys } from '../widgets';
import type { Exercise } from './types';

const lenFor = (level: number) => 3 + level;
/** Time allowed per tap: the sequence stays on screen, so without a limit nothing but attention would be at stake. */
const perTapFor = (level: number) => Math.round(1000 * Math.pow(0.9, level - 1));
/** Arrows instead of letters: "L"/"R" are English, and in many languages left and right share an initial. */
const ARROW = { L: '◀', R: '▶' } as const;

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
  levelLabel: (l) => `${lenFor(l)} 👆 · ${(perTapFor(l) / 1000).toFixed(2)} s`,

  async run(ctx) {
    const trials = ctx.count(10, 8, 3);
    const st = ctx.stair(trials, 1, 10);

    const hint = h('div', { class: 'bilateral-hint' }, t('ex.tapSeq.hint'));
    const seqDisplay = h('div', { class: 'bilateral-seq' });

    let onTap: ((side: 'L' | 'R') => void) | null = null;
    const btnLeft = h(
      'button',
      { class: 'btn bilateral-pad left-pad', onPointerdown: () => onTap?.('L') },
      h('span', {}, '👈'),
      h('span', { class: 'pad-key-hint' }, '[A / ←]'),
    );
    const btnRight = h(
      'button',
      { class: 'btn bilateral-pad right-pad', onPointerdown: () => onTap?.('R') },
      h('span', {}, '👉'),
      h('span', { class: 'pad-key-hint' }, '[D / →]'),
    );
    const controls = h('div', { class: 'bilateral-controls' }, btnLeft, btnRight);

    ctx.stage.append(hint, seqDisplay, controls);

    onKeys(ctx, {
      ArrowLeft: () => onTap?.('L'),
      ArrowRight: () => onTap?.('R'),
      a: () => onTap?.('L'),
      A: () => onTap?.('L'),
      d: () => onTap?.('R'),
      D: () => onTap?.('R'),
    });

    let correct = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      const len = lenFor(st.int);

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
            ARROW[step],
          );
          seqDisplay.append(item);
        });
      };

      renderSeq();

      const limit = ctx.practice ? 60_000 : (len * perTapFor(st.level) + 400) * ctx.pace;
      const finished = await ctx.timed<boolean>(limit, false, (done) => {
        onTap = (side) => {
          if (side === pattern[currentStep]) {
            flash(side === 'L' ? btnLeft : btnRight, 'good', 150);
            currentStep++;
            renderSeq();
            if (currentStep >= len) done(true);
          } else {
            hasError = true;
            flash(side === 'L' ? btnLeft : btnRight, 'bad', 250);
          }
        };
        return () => {
          onTap = null;
        };
      });

      const ok = ctx.track(st, finished && !hasError, {
        was: pattern.map((s) => ARROW[s]).join(' '),
      });

      if (ok) {
        correct++;
        flash(seqDisplay, 'good', 300);
      } else {
        flash(seqDisplay, 'bad', 400);
      }
      await ctx.wait(ok ? 300 : 700);
    }

    ctx.progress(1);

    return {
      score: st.score(),
      detail: t('ex.tapSeq.detail', { ok: correct, n: trials }),
      level: st.next(),
    };
  },
};
