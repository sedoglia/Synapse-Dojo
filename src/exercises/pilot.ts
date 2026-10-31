import { h, pick, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import { fitCanvas, cssVar } from '../widgets';
import type { Exercise } from './types';

const DURATION = 75; // seconds
const SIGN_REACH = 20; // px above the top edge at which a sign is already partly visible (radius 15 + outline)
const PASS_MARGIN = 40; // px below the car after which a sign is judged
const MAX_LEVEL = 12;
const speedFor = (l: number) => 150 + l * 18; // px/s of road scrolling
const curveFor = (l: number) => 0.15 + l * 0.025; // bend amplitude, fraction of half-width
const gapFor = (l: number) => Math.max(1.3, 2.6 - l * 0.1); // seconds between signs

type Shape = 'circle' | 'square' | 'triangle' | 'diamond';
interface Kind {
  shape: Shape;
  color: string;
}
const GREEN = '#16a34a';
const TARGET: Kind = { shape: 'circle', color: GREEN };
const EASY: Kind[] = [
  { shape: 'triangle', color: '#e5484d' },
  { shape: 'square', color: '#3b82f6' },
  { shape: 'diamond', color: '#eab308' },
];
// From level 5 distractors share the target's color or shape.
const SIMILAR: Kind[] = [
  { shape: 'square', color: GREEN },
  { shape: 'circle', color: '#3b82f6' },
  { shape: 'triangle', color: GREEN },
];

interface Sign {
  wy: number; // world position along the road
  side: number; // -1 left, 1 right
  kind: Kind;
  target: boolean;
  pressed: boolean;
}

function drawShape(g: CanvasRenderingContext2D, k: Kind, x: number, y: number, s: number) {
  g.fillStyle = k.color;
  g.beginPath();
  if (k.shape === 'circle') g.arc(x, y, s, 0, Math.PI * 2);
  else if (k.shape === 'square') g.rect(x - s, y - s, s * 2, s * 2);
  else if (k.shape === 'triangle') {
    g.moveTo(x, y - s);
    g.lineTo(x + s, y + s);
    g.lineTo(x - s, y + s);
  } else {
    g.moveTo(x, y - s * 1.2);
    g.lineTo(x + s * 1.2, y);
    g.lineTo(x, y + s * 1.2);
    g.lineTo(x - s * 1.2, y);
  }
  g.closePath();
  g.fill();
  g.lineWidth = 2;
  g.strokeStyle = '#fff';
  g.stroke();
}

export const pilot: Exercise = {
  id: 'pilot',
  icon: '🏎️',
  domain: 'attention',
  name: 'ex.pilot.name',
  desc: 'ex.pilot.desc',
  why: 'ex.pilot.why',
  example: 'ex.pilot.example',
  minutes: 1.5,
  levels: { min: 1, max: MAX_LEVEL, start: 1 },
  levelLabel: (l) => `${speedFor(l)} px/s${l >= 5 ? ' · ≈' : ''}`,

  async run(ctx) {
    const st = new Staircase(ctx.level, 1, MAX_LEVEL);
    const duration = ctx.practice ? 25 : DURATION;
    const status = h('div', { class: 'pilot-status' }, ' ');
    const canvas = h('canvas', { class: 'pilot-canvas' });
    let press: (() => void) | null = null;
    const btn = h(
      'button',
      {
        class: 'btn big primary pilot-btn',
        onPointerdown: (e: PointerEvent) => {
          e.preventDefault();
          press?.();
        },
      },
      `${t('ex.pilot.press')} (␣)`,
    );
    ctx.stage.append(status, canvas, btn);
    const { ctx2d: g, resize } = fitCanvas(canvas);
    let size = resize();
    const accent = cssVar('--accent') || '#5b5bf0';

    let dist = 0;
    let amp = curveFor(st.level);
    let carX = size.w / 2;
    let targetX = carX;
    let keyDir = 0;
    const signs: Sign[] = [];
    let nextSign = 1.5;
    let onRoadTime = 0;
    let windowTime = 0;
    let totalOnRoad = 0;
    let totalTime = 0;
    let evaluated = 0;
    let right = 0;

    const carY = () => size.h * 0.78;
    const laneHalf = () => Math.max(46, size.w * 0.16);
    const centerAt = (wy: number) =>
      size.w / 2 + amp * (size.w / 2 - laneHalf()) * (0.6 * Math.sin(wy / 300) + 0.4 * Math.sin(wy / 137 + 1.3));
    const toScreen = (wy: number) => carY() - (wy - dist);

    const showStatus = (ok: boolean, text = '') => {
      status.textContent = ok ? '✓' : `✗ ${text}`;
      status.className = `pilot-status ${ok ? 'ok' : 'ko'}`;
    };

    // Responses are judged when you press (right/wrong sign) and when a sign passes the car
    // (missed green circle, or leaving the road while it was coming).
    const evaluate = (s: Sign) => {
      const roadOk = windowTime === 0 || onRoadTime / windowTime >= 0.75;
      onRoadTime = windowTime = 0;
      evaluated++;
      const responseOk = s.pressed === s.target;
      const ok = responseOk && roadOk;
      if (ok) right++;
      if (!roadOk) {
        ctx.track(st, false, { was: t('fb.pilotRoad') });
        showStatus(false, '🛣️');
      } else if (s.target && !s.pressed) {
        ctx.track(st, false, { was: t('fb.pilotMissed') });
        showStatus(false);
      } else if (s.pressed) {
        st.record(ok); // the press already got its ✓/✗
      } else {
        st.record(true); // correctly ignored: no fanfare for doing nothing
      }
    };

    press = () => {
      // A press goes to the green circle on screen if there is one, otherwise to the nearest sign.
      // Anything drawn on screen counts, including a sign just peeking in at the top edge.
      const active = signs.filter((s) => !s.pressed && toScreen(s.wy) > -SIGN_REACH && toScreen(s.wy) < carY() + PASS_MARGIN);
      const byDistance = active.sort((a, b) => a.wy - b.wy);
      const s = byDistance.find((x) => x.target) ?? byDistance[0];
      if (!s) {
        // Pressing with no sign in view is its own mistake; it doesn't spoil the next sign.
        flash(btn, 'bad');
        ctx.track(st, false, { was: t('fb.pilotStray') });
        showStatus(false);
        return;
      }
      s.pressed = true;
      flash(btn, s.target ? 'good' : 'bad');
      ctx.feedback(s.target, { was: t('fb.pilotNotTarget') });
      showStatus(s.target);
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' || e.buttons) targetX = e.clientX - canvas.getBoundingClientRect().left;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') keyDir = -1;
      else if (e.key === 'ArrowRight') keyDir = 1;
      else if (e.key === ' ') press?.();
      else return;
      e.preventDefault();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if ((e.key === 'ArrowLeft' && keyDir < 0) || (e.key === 'ArrowRight' && keyDir > 0)) keyDir = 0;
    };
    const onResize = () => (size = resize());

    const draw = () => {
      g.fillStyle = '#2f7d4f';
      g.fillRect(0, 0, size.w, size.h);
      const lh = laneHalf();
      g.fillStyle = '#4b5563';
      g.beginPath();
      for (let sy = -10; sy <= size.h + 10; sy += 8) g.lineTo(centerAt(dist + carY() - sy) - lh, sy);
      for (let sy = size.h + 10; sy >= -10; sy -= 8) g.lineTo(centerAt(dist + carY() - sy) + lh, sy);
      g.closePath();
      g.fill();
      g.fillStyle = '#f8fafc';
      for (let sy = 0; sy <= size.h; sy += 6) {
        const wy = dist + carY() - sy;
        if (((wy % 60) + 60) % 60 < 30) g.fillRect(centerAt(wy) - 2, sy, 4, 6);
      }
      for (const s of signs) {
        const sy = toScreen(s.wy);
        const sx = centerAt(s.wy) + s.side * (lh + 28);
        g.fillStyle = '#e5e7eb';
        g.fillRect(sx - 2, sy, 4, 26);
        drawShape(g, s.kind, sx, sy, 15);
      }
      const onRoad = Math.abs(carX - centerAt(dist)) < lh - 12;
      g.fillStyle = onRoad ? accent : '#e5484d';
      g.beginPath();
      g.roundRect(carX - 15, carY() - 24, 30, 48, 8);
      g.fill();
      g.fillStyle = 'rgba(255,255,255,0.75)';
      g.fillRect(carX - 10, carY() - 14, 20, 10);
    };

    canvas.addEventListener('pointerdown', onPointer);
    canvas.addEventListener('pointermove', onPointer);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('resize', onResize);

    try {
      await ctx.input<void>((done) => {
        let last = 0;
        let elapsed = 0;
        let id = 0;
        const step = (now: number) => {
          const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
          last = now;
          elapsed += dt;
          const level = st.level;
          dist += (speedFor(level) / ctx.pace) * dt;
          amp += (curveFor(level) - amp) * Math.min(1, dt); // ease into new curviness

          if (keyDir) targetX = carX + keyDir * 60;
          const maxMove = 700 * dt;
          carX += Math.max(-maxMove, Math.min(maxMove, targetX - carX));
          carX = Math.max(15, Math.min(size.w - 15, carX));

          const onRoad = Math.abs(carX - centerAt(dist)) < laneHalf() - 12;
          windowTime += dt;
          totalTime += dt;
          if (onRoad) {
            onRoadTime += dt;
            totalOnRoad += dt;
          }

          nextSign -= dt;
          if (nextSign <= 0 && elapsed < duration - 3) {
            const target = Math.random() < 0.35;
            const pool = level >= 5 ? [...EASY, ...SIMILAR] : EASY;
            signs.push({
              wy: dist + carY() + 40,
              side: Math.random() < 0.5 ? -1 : 1,
              kind: target ? TARGET : pick(pool),
              target,
              pressed: false,
            });
            nextSign = gapFor(level) * ctx.pace * (0.8 + Math.random() * 0.4);
          }
          while (signs.length && toScreen(signs[0].wy) > carY() + PASS_MARGIN) evaluate(signs.shift()!);

          draw();
          ctx.progress(elapsed / duration, `${Math.ceil(duration - elapsed)}s`);
          if (elapsed >= duration) return done();
          id = requestAnimationFrame(step);
        };
        id = requestAnimationFrame(step);
        return () => cancelAnimationFrame(id);
      });
    } finally {
      canvas.removeEventListener('pointerdown', onPointer);
      canvas.removeEventListener('pointermove', onPointer);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', onResize);
      press = null;
    }

    const road = totalTime ? Math.round((totalOnRoad / totalTime) * 100) : 0;
    return { score: st.score(), detail: t('ex.pilot.detail', { ok: right, n: evaluated, road }), level: st.next() };
  },
};
