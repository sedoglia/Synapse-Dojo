import { store } from './storage';

let ac: AudioContext | null = null;

function tone(freq: number, dur: number, type: OscillatorType = 'sine', gain = 0.08, delay = 0) {
  if (!store.data.settings.sound) return;
  ac ??= new AudioContext();
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

export const sfx = {
  ok: () => tone(880, 0.12, 'triangle'),
  bad: () => tone(180, 0.22, 'sawtooth', 0.05),
  tick: () => tone(520, 0.08, 'sine', 0.05),
  go: () => tone(1040, 0.18, 'triangle'),
  fanfare: () => [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.22, 'triangle', 0.07, i * 0.11)),
};
