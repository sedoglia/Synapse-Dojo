import { store } from './storage';

let ac: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (!store.data.settings.sound) return null;
  ac ??= new AudioContext();
  if (ac.state === 'suspended') void ac.resume(); // mobile browsers start audio suspended
  return ac;
}

export function haptic(type: 'tap' | 'good' | 'bad' | 'combo' = 'tap') {
  if (typeof navigator === 'undefined' || !navigator.vibrate || !store.data.settings.sound) return;
  try {
    if (type === 'tap') navigator.vibrate(10);
    else if (type === 'good') navigator.vibrate([12, 40, 18]);
    else if (type === 'bad') navigator.vibrate([35, 30, 20]);
    else if (type === 'combo') navigator.vibrate([15, 30, 25, 30, 35]);
  } catch {}
}

function tone(freq: number, dur: number, type: OscillatorType = 'sine', gain = 0.08, delay = 0) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const t = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + dur);
}

function sweep(startFreq: number, endFreq: number, dur: number, type: OscillatorType = 'sine', gain = 0.08, delay = 0) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const t = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(startFreq, t);
  osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), t + dur);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(ctx.destination);
  osc.start(t);
  osc.stop(t + dur);
}

// Warm, golden pentatonic scale across 2 octaves (C5 to A6: 10 notes).
// Stays strictly in the comfortable auditory range (520 Hz - 1760 Hz) avoiding ear fatigue or shrillness.
const PENTATONIC = [
  523.25,  // 0: C5
  587.33,  // 1: D5
  659.25,  // 2: E5
  783.99,  // 3: G5
  880.00,  // 4: A5
  1046.50, // 5: C6
  1174.66, // 6: D6
  1318.51, // 7: E6
  1567.98, // 8: G6
  1760.00, // 9: A6
];

export const sfx = {
  /**
   * Ascending pentatonic chime that never runs out or gets stuck repeating a ceiling note.
   * Steps through pitches continually, cycling through scales with evolving harmonic depth (tiers)
   * on long streaks, and celebrating every 5th and 10th consecutive hit with resonant chords.
   */
  ok: (streak = 0) => {
    const s = Math.max(1, streak);
    haptic(s >= 3 ? 'combo' : 'good');

    const step = (s - 1) % PENTATONIC.length;
    const tier = Math.floor((s - 1) / PENTATONIC.length);
    const f = PENTATONIC[step];

    // Every 10th answer: grand major milestone chime (C-E-G-C)
    if (s % 10 === 0) {
      tone(523.25, 0.22, 'triangle', 0.055);
      tone(659.25, 0.22, 'sine', 0.045, 0.01);
      tone(783.99, 0.24, 'sine', 0.05, 0.02);
      tone(1046.50, 0.26, 'sine', 0.06, 0.03);
      if (tier >= 1) tone(1318.51, 0.20, 'triangle', 0.03, 0.04);
      return;
    }

    // Every 5th answer (5, 15, 25...): resonant fifth-power chord chime
    if (s % 5 === 0) {
      tone(f, 0.20, 'sine', 0.07);
      tone(f * 1.5, 0.18, 'triangle', 0.04, 0.01);
      tone(f * 2, 0.16, 'sine', 0.03, 0.02);
      return;
    }

    // Individual step notes evolve across tiers:
    if (tier === 0) {
      // Tier 0 (streak 1-9): Pure crystalline chime (fundamental + delicate overtone)
      tone(f, 0.16, 'sine', 0.08);
      tone(f * 2, 0.12, 'triangle', 0.025, 0.01);
    } else if (tier === 1) {
      // Tier 1 (streak 11-19): Harmonized carillon (fundamental + warm lower base + fifth)
      tone(f, 0.17, 'sine', 0.07);
      tone(f * 1.5, 0.14, 'triangle', 0.035, 0.01);
      tone(f * 0.5, 0.16, 'sine', 0.035);
    } else if (tier === 2) {
      // Tier 2 (streak 21-29): Shimmering triad chime
      tone(f, 0.18, 'sine', 0.065);
      tone(f * 1.25, 0.15, 'sine', 0.03, 0.01);
      tone(f * 1.5, 0.15, 'triangle', 0.03, 0.02);
      tone(f * 2, 0.14, 'triangle', 0.025, 0.03);
    } else {
      // Tier 3+ (streak 31+): Supreme cascade chime with full overtone resonance
      tone(f, 0.20, 'sine', 0.06);
      tone(f * 1.5, 0.18, 'triangle', 0.03, 0.01);
      tone(f * 2, 0.16, 'sine', 0.03, 0.02);
      tone(f * 0.5, 0.18, 'sine', 0.035);
    }
  },

  /**
   * Gentle, crystalline water-drop chime for successful response inhibition
   * (Correct Rejection / Zen filter). Evolves along the pentatonic scale.
   */
  zen: (streak = 0) => {
    const s = Math.max(1, streak);
    haptic('tap');
    const step = (s - 1) % PENTATONIC.length;
    const f = PENTATONIC[step];
    // Warm harmonic sine waves with delicate decay, like a smooth singing bowl or clear water droplet
    tone(f * 1.5, 0.18, 'sine', 0.045);
    tone(f * 0.75, 0.20, 'sine', 0.03, 0.015);
  },

  /** Gentle, low wooden thud rather than a harsh abrasive buzz. */
  bad: () => {
    haptic('bad');
    sweep(220, 110, 0.18, 'triangle', 0.06);
  },

  tick: () => {
    tone(540, 0.05, 'sine', 0.04);
  },

  go: () => {
    tone(1046.5, 0.18, 'triangle', 0.08);
    tone(1318.5, 0.18, 'sine', 0.04, 0.03);
  },

  levelUp: () => {
    haptic('combo');
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      tone(f, 0.18, 'triangle', 0.07, i * 0.07);
      tone(f * 1.5, 0.14, 'sine', 0.03, i * 0.07 + 0.01);
    });
  },

  fanfare: () => {
    haptic('combo');
    [523.25, 659.25, 783.99, 1046.5, 1318.51].forEach((f, i) => {
      tone(f, 0.24, 'triangle', 0.07, i * 0.08);
    });
  },

  coins: () => {
    haptic('good');
    [987.77, 1318.51, 1760.00, 2093.00].forEach((f, i) => {
      tone(f, 0.14, 'sine', 0.06, i * 0.06);
    });
  },

  /** Musical note for Corsi / Grid / melodic cues (0-8) */
  note: (index: number) => {
    haptic('tap');
    const f = PENTATONIC[index % PENTATONIC.length];
    tone(f, 0.22, 'sine', 0.08);
    tone(f * 2, 0.16, 'triangle', 0.025, 0.01);
  },

  /** Percussive drums for Bilateral Tap (left = low conga, right = high conga) */
  drum: (side: 'left' | 'right') => {
    haptic('tap');
    if (side === 'left') {
      sweep(210, 90, 0.11, 'triangle', 0.11);
    } else {
      sweep(340, 160, 0.09, 'triangle', 0.09);
    }
  },

  /** Groovy acoustic-like percussion beat for Rhythm task */
  beat: (accent = false) => {
    if (accent) {
      sweep(260, 75, 0.12, 'triangle', 0.10);
      tone(820, 0.03, 'sine', 0.04);
    } else {
      tone(440, 0.04, 'triangle', 0.05);
    }
  },

  /** Soft mechanical woody clack for Tower of London moves or drops */
  clack: () => {
    haptic('tap');
    sweep(480, 180, 0.06, 'triangle', 0.07);
  },

  /** Playful swoosh / scramble for letters or card swipe */
  whoosh: () => {
    haptic('tap');
    sweep(320, 720, 0.11, 'sine', 0.05);
  },

  /** Magic sparkle for completing a path or special combo */
  sparkle: () => {
    haptic('good');
    [1046.5, 1318.5, 1567.9, 2093].forEach((f, i) => {
      tone(f, 0.12, 'sine', 0.05, i * 0.04);
    });
  },
};

