import { h, pick, flash, clamp } from '../dom';
import { t, num } from '../i18n';
import { store } from '../storage';
import { DETRAIN_DAYS } from '../adaptive';
import { fitCanvas, cssVar } from '../widgets';
import type { Exercise } from './types';

const DURATION = 75; // seconds
const SIGN_REACH = 20; // px above the top edge at which a sign is already partly visible (radius 15 + outline)
const MAX_LEVEL = 12;
const ROAD_WINDOW = 2; // seconds of driving judged at a time
const ROAD_OK = 0.8; // share of a window to spend on the road
const ROAD_KEY = 'pilot:road'; // the driving level, saved next to the exercise's own (signs) level

// As in NeuroRacer (Anguera et al., 2013) each task has its own level, so a player can be better at one than the other.
/** Driving: road speed and bends. Even at level 1 the road bends beyond the lane, so it can't be followed standing still. */
const speedFor = (l: number) => 150 + l * 18; // px/s of road scrolling
const curveFor = (l: number) => Math.min(1, 0.55 + l * 0.04); // bend amplitude, fraction of half-width
/** Signs: how often they come, how long there is to answer, and from level 5 distractors that look like the target. */
const gapFor = (l: number) => Math.max(1.3, 2.6 - l * 0.1); // seconds between signs
/**
 * ms to answer a sign, from when it comes into view. A ring around each sign shows the time left, so the player can
 * see when an answer counts. At the first levels it lasts about as long as the sign takes to go by.
 */
const answerFor = (l: number) => Math.max(700, Math.round(3500 * Math.pow(0.87, l - 1)));
const PLATE = 21; // px, radius of the white plate that makes every sign stand out from the grass
const RING = 25; // px, radius of the ring showing the time left
const SIGN_MARGIN = RING + 2; // px a sign keeps from the canvas edge
const BOTTOM_MARGIN = RING + 2; // px above the bottom edge at which a sign's time is up, while it can still be seen
const FULLY_IN_VIEW = 30; // px below the top edge from which a distractor can be pressed by mistake
const KEY_SPEED = 420; // px/s of the car with the arrow keys: a short tap is a small correction, not a lurch
const SAME_PRESS = 0.3; // seconds in which a second press is taken as a bounce or double click of the same one
const LATE_PRESS = 0.5; // seconds after a green circle's time in which a press is just late, not a wrong press
const STATUS_SECONDS = 1.2; // how long ✓/✗ stays up, so an old mark isn't read as a verdict on what's on screen now

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
  judged: boolean;
  missed: boolean; // a green circle whose time ran out
  born: number; // elapsed seconds when it appeared
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

/** The saved driving level, one step lower after a long break, like every other level. */
function roadStart(fallback: number): number {
  const saved = store.level(ROAD_KEY, fallback);
  const last = store.lastPlayed('pilot');
  const days = last ? (Date.now() - new Date(last).getTime()) / 86_400_000 : 0;
  return days > DETRAIN_DAYS ? Math.max(1, saved - 1) : saved;
}

export const pilot: Exercise = {
  id: 'pilot',
  icon: '🏎️',
  domain: 'attention',
  name: 'ex.pilot.name',
  desc: 'ex.pilot.desc',
  why: 'ex.pilot.why',
  example: 'ex.pilot.example',
  minutes: [1, 2],
  levels: { min: 1, max: MAX_LEVEL, start: 1 },
  levelLabel: (l) => `${num(answerFor(l) / 1000)} s${l >= 5 ? ' · ≈' : ''}`,

  async run(ctx) {
    // Only informative events move the signs level: hits, misses and false alarms. Correctly ignoring a distractor
    // doesn't, otherwise a player who never presses anything would already be right about 6 times out of 10.
    const st = ctx.stair(12, 1, MAX_LEVEL);
    const road = ctx.stair(36, 1, MAX_LEVEL, { start: ctx.mode === 'train' ? roadStart(ctx.level) : ctx.level });
    const duration = ctx.practice ? 25 : DURATION;
    const status = h('div', { class: 'pilot-status' }, ' ');
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
    let amp = curveFor(road.level);
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
    let elapsed = 0;
    let statusUntil = 0;
    let lastTarget = -LATE_PRESS; // when a green circle was last answered or missed
    let lastPress = -SAME_PRESS;
    let usedKeys = false;

    const carY = () => size.h * 0.78;
    const laneHalf = () => Math.max(38, size.w * 0.12);
    const centerAt = (wy: number) =>
      size.w / 2 + amp * (size.w / 2 - laneHalf()) * (0.6 * Math.sin(wy / 300) + 0.4 * Math.sin(wy / 137 + 1.3));
    const toScreen = (wy: number) => carY() - (wy - dist);

    const showStatus = (ok: boolean, text = '') => {
      status.textContent = ok ? '✓' : `✗ ${text}`;
      status.className = `pilot-status ${ok ? 'ok' : 'ko'}`;
      statusUntil = elapsed + STATUS_SECONDS;
    };

    /** The side of the road where a sign fits: with sharp bends the road runs close to one edge of the screen. */
    const sideFor = (wy: number) => {
      const side = Math.random() < 0.5 ? -1 : 1;
      const x = centerAt(wy) + side * (laneHalf() + RING + 6);
      return x < SIGN_MARGIN || x > size.w - SIGN_MARGIN ? -side : side;
    };

    // A sign is judged when its time to answer runs out or it passes the car, whichever comes first.
    const evaluate = (s: Sign) => {
      if (s.judged) return;
      s.judged = true;
      evaluated++;
      if (s.pressed === s.target) right++;
      if (s.target) lastTarget = elapsed;
      if (s.target && !s.pressed) {
        s.missed = true;
        ctx.track(st, false, { note: t('fb.pilotMissed') });
        showStatus(false);
      } else if (s.pressed) {
        st.record(s.target); // the press already got its ✓/✗
      }
    };

    press = () => {
      if (elapsed - lastPress < SAME_PRESS) return;
      lastPress = elapsed;
      // A press goes to the green circle on screen if there is one, otherwise to a distractor in full view.
      const visible = signs.filter((s) => toScreen(s.wy) > -SIGN_REACH && toScreen(s.wy) < size.h + SIGN_REACH);
      const active = visible.filter((s) => !s.judged && !s.pressed).sort((a, b) => a.wy - b.wy);
      const s = active.find((x) => x.target) ?? active.find((x) => toScreen(x.wy) >= FULLY_IN_VIEW);
      // A press meant for a green circle just gone isn't a wrong answer to whatever happens to be on screen.
      if (s && !s.target && elapsed - lastTarget < LATE_PRESS) return;
      if (!s) {
        // Only a press with really nothing to see counts as a mistake.
        if (visible.length || elapsed - lastTarget < LATE_PRESS) return;
        // Pressing with no sign in view is its own mistake; it doesn't spoil the next sign.
        flash(btn, 'bad');
        ctx.track(st, false, { note: t('fb.pilotStray') });
        showStatus(false);
        return;
      }
      s.pressed = true;
      if (s.target) lastTarget = elapsed;
      flash(btn, s.target ? 'good' : 'bad');
      ctx.feedback(s.target, { note: t('fb.pilotNotTarget') });
      showStatus(s.target);
    };

    const onPointer = (e: PointerEvent) => {
      // Once the arrow keys are in use the mouse is only there to press SIGNAL: moving it must not steer.
      if (usedKeys && e.pointerType === 'mouse' && !e.buttons) return;
      if (e.pointerType === 'mouse' || e.buttons) targetX = e.clientX - canvas.getBoundingClientRect().left;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') keyDir = -1;
      else if (e.key === 'ArrowRight') keyDir = 1;
      else if (e.key === ' ') {
        if (!e.repeat) press?.(); // holding the bar down is one press
      } else return;
      e.preventDefault();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if ((e.key === 'ArrowLeft' && keyDir < 0) || (e.key === 'ArrowRight' && keyDir > 0)) keyDir = 0;
    };
    const onResize = () => (size = resize());
    /** Seconds until a sign's time is up: the time to answer, or until it reaches the bottom of the screen if that's sooner. */
    const timeLeft = (s: Sign) =>
      Math.min(
        s.born + (answerFor(st.level) * ctx.pace) / 1000 - elapsed,
        (size.h - BOTTOM_MARGIN - toScreen(s.wy)) / (speedFor(road.level) / ctx.pace),
      );

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
        const sx = clamp(centerAt(s.wy) + s.side * (lh + RING + 6), SIGN_MARGIN, size.w - SIGN_MARGIN);
        // A sign whose time is up fades, so it's clear it no longer needs an answer.
        g.globalAlpha = s.judged && !s.pressed && !s.missed ? 0.35 : 1;
        g.fillStyle = '#e5e7eb';
        g.fillRect(sx - 2, sy + RING - 4, 4, 18);
        g.fillStyle = '#ffffff';
        g.beginPath();
        g.arc(sx, sy, PLATE, 0, Math.PI * 2);
        g.fill();
        // The ring: full when the sign appears, empty when its time is up. Green once answered, red if missed.
        g.lineWidth = 4;
        if (s.missed || s.pressed) {
          g.strokeStyle = s.missed || !s.target ? '#e5484d' : '#16a34a';
          g.beginPath();
          g.arc(sx, sy, RING, 0, Math.PI * 2);
          g.stroke();
        } else if (!s.judged) {
          const left = timeLeft(s);
          const part = left / Math.max(0.001, left + Math.max(0, elapsed - s.born));
          g.strokeStyle = '#111827';
          g.beginPath();
          g.arc(sx, sy, RING, -Math.PI / 2, -Math.PI / 2 + part * Math.PI * 2);
          g.stroke();
        }
        drawShape(g, s.kind, sx, sy, 13);
        g.globalAlpha = 1;
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
        let id = 0;
        const step = (now: number) => {
          const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
          last = now;
          elapsed += dt;
          dist += (speedFor(road.level) / ctx.pace) * dt;
          amp += (curveFor(road.level) - amp) * Math.min(1, dt); // ease into new curviness

          if (keyDir) {
            usedKeys = true;
            carX += (keyDir * KEY_SPEED * dt) / ctx.pace;
            targetX = carX; // the car stops as soon as the key is released
          } else {
            const maxMove = 700 * dt;
            carX += Math.max(-maxMove, Math.min(maxMove, targetX - carX));
          }
          carX = Math.max(15, Math.min(size.w - 15, carX));

          const onRoad = Math.abs(carX - centerAt(dist)) < laneHalf() - 12;
          windowTime += dt;
          totalTime += dt;
          if (onRoad) {
            onRoadTime += dt;
            totalOnRoad += dt;
          }
          if (windowTime >= ROAD_WINDOW) {
            if (onRoadTime / windowTime >= ROAD_OK) road.record(true);
            else {
              // Driving is judged all the time, with or without a sign: a small note, not the big ✗ used for signs.
              ctx.track(road, false, { subtle: true });
              showStatus(false, `🛣️ ${t('fb.pilotRoad')}`);
            }
            onRoadTime = windowTime = 0;
          }

          nextSign -= dt;
          if (nextSign <= 0 && elapsed < duration - 3) {
            const target = Math.random() < 0.4;
            const pool = st.level >= 5 ? [...EASY, ...SIMILAR] : EASY;
            const wy = dist + carY() + 40;
            signs.push({
              wy,
              side: sideFor(wy),
              kind: target ? TARGET : pick(pool),
              target,
              pressed: false,
              judged: false,
              missed: false,
              born: elapsed + 20 / (speedFor(road.level) / ctx.pace), // starts above the screen: the clock starts when it shows
            });
            nextSign = gapFor(st.level) * ctx.pace * (0.8 + Math.random() * 0.4);
          }
          for (const s of signs) {
            if (!s.judged && timeLeft(s) <= 0) evaluate(s);
          }
          while (signs.length && toScreen(signs[0].wy) > size.h + RING + SIGN_REACH) signs.shift();
          if (statusUntil && elapsed >= statusUntil) {
            statusUntil = 0;
            status.textContent = ' ';
            status.className = 'pilot-status';
          }

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

    if (ctx.mode === 'train') store.setLevel(ROAD_KEY, road.next());
    const onRoadPct = totalTime ? Math.round((totalOnRoad / totalTime) * 100) : 0;
    return {
      score: (st.score() + road.score()) / 2,
      detail: t('ex.pilot.detail', { ok: right, n: evaluated, road: onRoadPct }),
      level: st.next(),
    };
  },
};
