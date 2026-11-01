import { h, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

const bpmFor = (level: number) => 60 + level * 7;

export const rhythm: Exercise = {
  id: 'rhythm',
  icon: '🎵',
  domain: 'coordination',
  name: 'ex.rhythm.name',
  desc: 'ex.rhythm.desc',
  why: 'ex.rhythm.why',
  example: 'ex.rhythm.example',
  minutes: 2,
  levels: { min: 1, max: 10, start: 2 },
  levelLabel: (l) => `${bpmFor(l)} BPM`,

  async run(ctx) {
    const trials = ctx.count(24, 16, 6);
    const st = new Staircase(ctx.level, 1, 10);

    const hint = h('div', { class: 'bilateral-hint' }, t('ex.rhythm.hint'));
    const track = h('div', { class: 'rhythm-track' });
    const indicator = h('div', { class: 'rhythm-beat-indicator' });
    track.append(indicator);

    let onTap: ((side: 'L' | 'R') => void) | null = null;
    const btnLeft = h('button', { class: 'btn rhythm-pad left-pad', onPointerdown: () => onTap?.('L') }, 'L 🥁');
    const btnRight = h('button', { class: 'btn rhythm-pad right-pad', onPointerdown: () => onTap?.('R') }, '🥁 R');
    const pads = h('div', { class: 'rhythm-pads' }, btnLeft, btnRight);

    ctx.stage.append(hint, track, pads);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') onTap?.('L');
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') onTap?.('R');
    };
    window.addEventListener('keydown', onKey);

    let correct = 0;
    const errors: number[] = [];

    const bpm = bpmFor(st.level);
    const beatIntervalMs = (60 / bpm) * 1000;

    // Countdown / sync beats
    for (let c = 3; c > 0; c--) {
      indicator.textContent = String(c);
      flash(indicator, 'pop', 150);
      await ctx.wait(beatIntervalMs);
    }
    indicator.textContent = 'GO!';

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);

      // Alternate beats between Left and Right, or sync
      const targetSide: 'L' | 'R' = i % 2 === 0 ? 'L' : 'R';
      indicator.className = `rhythm-beat-indicator side-${targetSide}`;
      indicator.textContent = targetSide;

      const beatTargetTime = performance.now() + beatIntervalMs;

      let tappedTime: number | null = null;
      let tappedSide: 'L' | 'R' | null = null;

      onTap = (side) => {
        if (tappedTime === null) {
          tappedTime = performance.now();
          tappedSide = side;
          flash(side === 'L' ? btnLeft : btnRight, 'pop', 100);
        }
      };

      await ctx.wait(beatIntervalMs);

      let delta = 999;
      if (tappedTime !== null && tappedSide === targetSide) {
        delta = Math.abs(tappedTime - beatTargetTime);
      }

      const isHit = tappedSide === targetSide && delta < 220 * ctx.pace;
      ctx.track(st, isHit, {
        subtle: true,
        was: `${targetSide}`,
      });

      if (isHit) {
        correct++;
        errors.push(delta);
        indicator.classList.add('good-flash');
      } else {
        indicator.classList.add('bad-flash');
      }

      onTap = null;
    }

    window.removeEventListener('keydown', onKey);
    ctx.progress(1);

    const avgError = errors.length ? Math.round(errors.reduce((a, b) => a + b, 0) / errors.length) : 0;
    return {
      score: st.score(),
      detail: t('ex.rhythm.detail', { ok: correct, n: trials, ms: avgError }),
      level: st.next(),
    };
  },
};
