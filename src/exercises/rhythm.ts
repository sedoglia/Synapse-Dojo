import { h, flash } from '../dom';
import { t } from '../i18n';
import { sfx } from '../audio';
import { Staircase } from '../adaptive';
import { onKeys } from '../widgets';
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
    const btnLeft = h(
      'button',
      { class: 'btn rhythm-pad left-pad', onPointerdown: () => onTap?.('L') },
      h('span', {}, '◀ 🥁'),
      h('span', { class: 'pad-key-hint' }, '[A / ←]'),
    );
    const btnRight = h(
      'button',
      { class: 'btn rhythm-pad right-pad', onPointerdown: () => onTap?.('R') },
      h('span', {}, '🥁 ▶'),
      h('span', { class: 'pad-key-hint' }, '[D / →]'),
    );
    const pads = h('div', { class: 'rhythm-pads' }, btnLeft, btnRight);

    ctx.stage.append(hint, track, pads);

    onKeys(ctx, {
      ArrowLeft: () => onTap?.('L'),
      ArrowRight: () => onTap?.('R'),
      a: () => onTap?.('L'),
      A: () => onTap?.('L'),
      d: () => onTap?.('R'),
      D: () => onTap?.('R'),
    });

    let correct = 0;
    const errors: number[] = [];

    const bpm = bpmFor(st.level);
    const interval = (60 / bpm) * 1000;
    // Hit window around each beat: ±250 ms at slow tempos, narrower when beats get close.
    const tolerance = Math.min(Math.min(250, interval * 0.3) * ctx.pace, interval / 2 - 20);

    // Taps are kept with their time and judged against the nearest beat, so a tap slightly after the
    // beat counts as well as one slightly before (people synchronising usually tap a little early).
    const taps: { at: number; side: 'L' | 'R' }[] = [];
    onTap = (side) => {
      taps.push({ at: performance.now(), side });
      flash(side === 'L' ? btnLeft : btnRight, 'pop', 100);
    };
    const until = (at: number) => ctx.wait(Math.max(0, at - performance.now()));
    const pulse = () => {
      sfx.tick();
      flash(indicator, 'beat', 160);
    };

    // Count-in: three metronome beats, then the first beat to tap on.
    const t0 = performance.now() + 4 * interval;
    for (let c = 3; c > 0; c--) {
      await until(t0 - c * interval);
      indicator.className = 'rhythm-beat-indicator';
      indicator.textContent = String(c);
      pulse();
    }

    for (let i = 0; i < trials; i++) {
      const beat = t0 + i * interval;
      // The next hand is shown half a beat ahead, then the beat itself pulses with a tick.
      await until(beat - interval / 2);
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      const targetSide: 'L' | 'R' = i % 2 === 0 ? 'L' : 'R';
      indicator.className = `rhythm-beat-indicator side-${targetSide}`;
      indicator.textContent = targetSide === 'L' ? '◀' : '▶';
      await until(beat);
      pulse();
      await until(beat + interval / 2);

      const tap = taps.find((x) => x.at >= beat - interval / 2 && x.at < beat + interval / 2);
      const delta = tap ? Math.abs(tap.at - beat) : Infinity;
      const isHit = tap?.side === targetSide && delta <= tolerance;
      // Judged silently: a feedback sound between beats would disturb the metronome.
      st.record(isHit);
      if (isHit) {
        correct++;
        errors.push(delta);
      }
      indicator.classList.add(isHit ? 'good-flash' : 'bad-flash');
    }
    onTap = null;

    ctx.progress(1);

    const avgError = errors.length ? Math.round(errors.reduce((a, b) => a + b, 0) / errors.length) : 0;
    return {
      score: st.score(),
      detail: t('ex.rhythm.detail', { ok: correct, n: trials, ms: avgError }),
      level: st.next(),
    };
  },
};
