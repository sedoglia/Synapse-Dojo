import { h, flash } from '../dom';
import { t } from '../i18n';
import { sfx } from '../audio';
import { onKeys } from '../widgets';
import type { Exercise } from './types';

const bpmFor = (level: number) => 60 + level * 7;
/**
 * How close to the beat a tap must fall: the real difficulty of synchronising. Tempos from 67 to 130 BPM are well inside
 * the limits of synchronisation (about 100–1800 ms between beats; Repp, 2006), so what grows with level is precision,
 * from ±220 ms down to ±50 ms.
 */
const toleranceFor = (level: number) => Math.round(220 * Math.pow(0.848, level - 1));
/** First beats, not judged: they let the player settle and measure their usual offset from the beat. */
const SETTLING_BEATS = 3;

export const rhythm: Exercise = {
  id: 'rhythm',
  icon: '🎵',
  domain: 'coordination',
  name: 'ex.rhythm.name',
  desc: 'ex.rhythm.desc',
  why: 'ex.rhythm.why',
  example: 'ex.rhythm.example',
  minutes: [1, 2],
  levels: { min: 1, max: 10, start: 2 },
  levelLabel: (l) => `±${toleranceFor(l)} ms · ${bpmFor(l)} BPM`,

  async run(ctx) {
    const trials = ctx.count(24, 16, 6);
    const st = ctx.stair(trials, 1, 10);

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

    // Shows where each tap fell: the white line is the player's usual moment, the green zone what counts as on time.
    const zone = h('div', { class: 'rhythm-zone' });
    const dot = h('div', { class: 'rhythm-dot' });
    const meter = h('div', { class: 'rhythm-meter' }, zone, h('div', { class: 'rhythm-center' }), dot);
    ctx.stage.append(hint, track, meter, pads);

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

    // The tempo stays the same for the whole session, as synchronising needs; the staircase moves the tolerance.
    const bpm = bpmFor(st.level);
    const interval = (60 / bpm) * 1000;
    const toleranceNow = () => Math.min(toleranceFor(st.level) * ctx.pace, interval / 2 - 20);
    // People tap slightly ahead of the beat and screens answer a little late. Both are constant, so each tap is
    // judged around the player's own recent average: what counts is steadiness, not the device.
    const recent: number[] = [];
    const usualOffset = () => (recent.length ? recent.reduce((a, b) => a + b, 0) / recent.length : 0);

    // Taps are kept with their time and judged against the nearest beat, so a tap slightly after the
    // beat counts as well as one slightly before (people synchronising usually tap a little early).
    const taps: { at: number; side: 'L' | 'R' }[] = [];
    onTap = (side) => {
      taps.push({ at: performance.now(), side });
      sfx.drum(side === 'L' ? 'left' : 'right');
      flash(side === 'L' ? btnLeft : btnRight, 'pop', 100);
    };
    const until = (at: number) => ctx.wait(Math.max(0, at - performance.now()));
    const pulse = (accent = false) => {
      sfx.beat(accent);
      flash(indicator, 'beat', 160);
    };

    // Count-in: three metronome beats, then the first beat to tap on.
    const t0 = performance.now() + 4 * interval;
    for (let c = 3; c > 0; c--) {
      await until(t0 - c * interval);
      indicator.className = 'rhythm-beat-indicator';
      indicator.textContent = String(c);
      pulse(c === 1);
    }

    const showTap = (error: number | null, hit: boolean) => {
      zone.style.width = `${Math.min(100, ((2 * toleranceNow()) / interval) * 100)}%`;
      if (error !== null) dot.style.left = `${Math.max(3, Math.min(97, 50 + (error / interval) * 100))}%`;
      dot.className = `rhythm-dot ${error === null ? 'miss' : hit ? 'hit' : 'miss'}`;
    };
    dot.style.left = '50%';
    zone.style.width = `${Math.min(100, ((2 * toleranceNow()) / interval) * 100)}%`;
    const beats = trials + SETTLING_BEATS;
    for (let i = 0; i < beats; i++) {
      const beat = t0 + i * interval;
      // The next hand is shown half a beat ahead, then the beat itself pulses with a tick.
      await until(beat - interval / 2);
      ctx.progress(i / beats, `${i + 1}/${beats}`);
      const targetSide: 'L' | 'R' = i % 2 === 0 ? 'L' : 'R';
      indicator.className = `rhythm-beat-indicator side-${targetSide}`;
      indicator.textContent = targetSide === 'L' ? '◀' : '▶';
      await until(beat);
      pulse(i % 4 === 0);
      await until(beat + interval / 2);

      const tap = taps.find((x) => x.at >= beat - interval / 2 && x.at < beat + interval / 2);
      const asynchrony = tap && tap.side === targetSide ? tap.at - beat : null;
      const error = asynchrony === null ? null : asynchrony - usualOffset();
      const delta = error === null ? Infinity : Math.abs(error);
      const isHit = delta <= toleranceNow();
      if (asynchrony !== null) {
        recent.push(asynchrony);
        if (recent.length > 8) recent.shift();
      }
      if (i < SETTLING_BEATS) {
        showTap(error, error !== null);
        continue;
      }
      // Judged silently: a feedback sound between beats would disturb the metronome.
      st.record(isHit);
      showTap(error, isHit);
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
