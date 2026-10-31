import { store } from './storage';

let ac: AudioContext | null = null;

function tone(freq: number, dur: number, type: OscillatorType = 'sine', gain = 0.08, delay = 0) {
  if (!store.data.settings.sound) return;
  ac ??= new AudioContext();
  if (ac.state === 'suspended') void ac.resume(); // mobile browsers start audio suspended
  const t = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(ac.destination);
  osc.start(t);
  osc.stop(t + dur);
}

function vibrate(pattern: number | number[]) {
  // Browsers refuse vibration until the user has interacted with the page.
  const active = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation?.hasBeenActive ?? true;
  if (store.data.settings.vibration && active && 'vibrate' in navigator) navigator.vibrate(pattern);
}

export const sfx = {
  /** Rises a semitone with every answer in a streak (up to an octave), so a good run sounds like one. */
  ok: (streak = 0) => tone(880 * Math.pow(2, Math.min(streak, 12) / 12), 0.12, 'triangle'),
  bad: () => tone(180, 0.22, 'sawtooth', 0.05),
  tick: () => tone(520, 0.08, 'sine', 0.05),
  go: () => tone(1040, 0.18, 'triangle'),
  levelUp: () => [660, 990].forEach((f, i) => tone(f, 0.16, 'triangle', 0.07, i * 0.09)),
  fanfare: () => [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.22, 'triangle', 0.07, i * 0.11)),
};

export const haptic = {
  ok: () => vibrate(12),
  bad: () => vibrate([30, 40, 30]),
  celebrate: () => vibrate([20, 30, 20, 30, 60]),
};
