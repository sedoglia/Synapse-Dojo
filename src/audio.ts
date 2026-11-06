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

// Warm pentatonic scale: C5, D5, E5, G5, A5, C6, D6, E6, G6, A6, C7, D7, E7...
const PENTATONIC = [
  523.25, 587.33, 659.25, 783.99, 880.00,
  1046.50, 1174.66, 1318.51, 1567.98, 1760.00,
  2093.00, 2349.32, 2637.02, 3135.96
];

export const sfx = {
  /** Rises through a harmonious pentatonic scale with every answer in a streak, with a sparkling overtone. */
  ok: (streak = 0) => {
    haptic(streak >= 3 ? 'combo' : 'good');
    const idx = Math.min(streak, PENTATONIC.length - 1);
    const f = PENTATONIC[idx];
    tone(f, 0.16, 'sine', 0.08);
    tone(f * 2, 0.12, 'triangle', 0.03, 0.01);
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

