type Child = Node | string | number | null | undefined | false;
type Attrs = Record<string, unknown>;

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Attrs = {},
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k.startsWith('on') && typeof v === 'function') {
      el.addEventListener(k.slice(2).toLowerCase(), v as EventListener);
    } else if (k === 'class') {
      el.className = String(v);
    } else if (k === 'style' && typeof v === 'object') {
      Object.assign(el.style, v);
    } else {
      el.setAttribute(k, v === true ? '' : String(v));
    }
  }
  for (const c of children) {
    if (c != null && c !== false) el.append(typeof c === 'number' ? String(c) : c);
  }
  return el;
}

/**
 * Cryptographically secure pseudo-random float in [0, 1) using Web Crypto API (`crypto.getRandomValues`).
 * CWE-338 compliant.
 */
export function secureRandom(): number {
  if (seeded) return seeded();
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] / (0xffffffff + 1);
}

let seeded: (() => number) | null = null;

/**
 * Runs `fn` with a repeatable sequence of numbers in place of secure random ones, so that the same seed builds the
 * same puzzle on every device (the daily challenge: one lock for everyone). Only for game content, never for codes or
 * anything secret; `fn` must be synchronous, so nothing else can draw from the sequence meanwhile.
 */
export function withSeed<T>(seed: string, fn: () => T): T {
  // FNV-1a hash of the seed, then mulberry32: small, fast and the same in every JavaScript engine.
  let a = 2166136261;
  for (let i = 0; i < seed.length; i++) a = Math.imul(a ^ seed.charCodeAt(i), 16777619);
  const prev = seeded;
  seeded = () => {
    a = (a + 0x6d2b79f5) | 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
  try {
    return fn();
  } finally {
    seeded = prev;
  }
}

export const rand = (min: number, max: number) => Math.floor(secureRandom() * (max - min + 1)) + min;
export const pick = <T>(arr: readonly T[]): T => arr[Math.floor(secureRandom() * arr.length)];
export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(secureRandom() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Maps a measurement to 0–100: `best` gives 100, `worst` gives 0. Works in either direction. */
export function scale(value: number, best: number, worst: number): number {
  return clamp((worst - value) / (worst - best), 0, 1) * 100;
}

export function flash(el: HTMLElement, cls: string, ms = 350) {
  el.classList.remove(cls);
  void el.offsetWidth; // restart the animation
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), ms);
}

export function todayKey(d = new Date()): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}
