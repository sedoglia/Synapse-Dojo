import { h } from './dom';
import type { Ctx } from './ctx';

/** Numeric keypad; also listens to the physical keyboard while `ctx.input` is pending. */
export function keypad(onKey: (k: string) => void): HTMLElement {
  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'del', '0', 'clr'];
  return h(
    'div',
    { class: 'keypad' },
    ...keys.map((k) =>
      h(
        'button',
        {
          class: `key ${k.length > 1 ? 'key-fn' : ''}`,
          onPointerdown: (e: PointerEvent) => {
            e.preventDefault();
            onKey(k);
          },
        },
        k === 'del' ? '⌫' : k === 'clr' ? 'C' : k,
      ),
    ),
  );
}

/** Forwards digit/backspace keys to `onKey` until the returned cleanup is called. */
export function keypadKeyboard(onKey: (k: string) => void): () => void {
  const kb = (e: KeyboardEvent) => {
    if (/^[0-9]$/.test(e.key)) onKey(e.key);
    else if (e.key === 'Backspace') onKey('del');
  };
  window.addEventListener('keydown', kb);
  return () => window.removeEventListener('keydown', kb);
}

/** Adds a key listener for the lifetime of the current exercise. */
export function onKeys(ctx: Ctx, map: Record<string, () => void>) {
  const kb = (e: KeyboardEvent) => {
    const fn = map[e.key];
    if (fn) {
      e.preventDefault();
      fn();
    }
  };
  window.addEventListener('keydown', kb);
  void ctx.input<never>(() => () => window.removeEventListener('keydown', kb)).catch(() => {});
}

/** A canvas that fills its parent at device resolution. Returns a resize function. */
export function fitCanvas(canvas: HTMLCanvasElement): { ctx2d: CanvasRenderingContext2D; resize: () => { w: number; h: number } } {
  const ctx2d = canvas.getContext('2d')!;
  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(200, rect.width);
    const hgt = Math.max(200, rect.height);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(hgt * dpr);
    ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { w, h: hgt };
  };
  return { ctx2d, resize };
}

export function cssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
