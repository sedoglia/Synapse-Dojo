import { h, rand, shuffle } from '../dom';
import { sfx } from '../audio';
import { t } from '../i18n';
import { fitCanvas, cssVar } from '../widgets';
import type { Exercise } from './types';

const MAX_LEVEL = 12;
const R = 17; // ball radius in px
/** About 4 targets is the usual tracking capacity (3 in older adults), so most levels work there and raise speed instead. */
const targetsFor = (level: number) => (level <= 2 ? 2 : level <= 4 ? 3 : level <= 9 ? 4 : level <= 11 ? 5 : 6);
const speedFor = (level: number) => 70 + level * 12; // px/s

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  target: boolean;
  picked: boolean;
}

export const radar: Exercise = {
  id: 'radar',
  icon: '🎯',
  domain: 'attention',
  name: 'ex.radar.name',
  desc: 'ex.radar.desc',
  why: 'ex.radar.why',
  example: 'ex.radar.example',
  minutes: 2.5,
  levels: { min: 1, max: MAX_LEVEL, start: 1 },
  levelLabel: (l) => `${targetsFor(l)} 🎯 · ${speedFor(l)} px/s`,

  async run(ctx) {
    const trials = ctx.count(10, 10, 2);
    const st = ctx.stair(trials, 1, MAX_LEVEL, { target: 0.7 });
    const status = h('div', { class: 'grid-status' });
    const canvas = h('canvas', { class: 'radar-canvas' });
    ctx.stage.append(status, canvas);
    const { ctx2d, resize } = fitCanvas(canvas);

    const accent = cssVar('--accent') || '#5b5bf0';
    const neutral = cssVar('--muted') || '#888';
    let balls: Ball[] = [];
    let reveal = false;
    let size = resize();

    const draw = () => {
      ctx2d.clearRect(0, 0, size.w, size.h);
      for (const b of balls) {
        ctx2d.beginPath();
        ctx2d.arc(b.x, b.y, R, 0, Math.PI * 2);
        const highlight = (b.target && phase === 'cue') || (reveal && b.target);
        ctx2d.fillStyle = highlight ? accent : neutral;
        ctx2d.globalAlpha = phase === 'cue' && !b.target ? 0.55 : 1;
        ctx2d.fill();
        ctx2d.globalAlpha = 1;
        if (b.picked) {
          ctx2d.lineWidth = 4;
          ctx2d.strokeStyle = reveal ? (b.target ? '#16a34a' : '#e5484d') : accent;
          ctx2d.stroke();
        }
      }
    };
    let phase: 'cue' | 'move' | 'pick' = 'cue';

    let wins = 0;
    let bestTracked = 0;
    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      size = resize();
      const nTargets = targetsFor(st.int);
      const total = nTargets * 2 + 2;
      const speed = speedFor(st.level) / ctx.pace;

      // Random non-overlapping start positions and directions.
      // The spacing rule is relaxed after many failed tries, so a small canvas can never hang the loop.
      balls = [];
      for (let tries = 0; balls.length < total; tries++) {
        const b = { x: rand(R, size.w - R), y: rand(R, size.h - R), vx: 0, vy: 0, target: false, picked: false };
        const gap = tries < 2000 ? R * 3 : tries < 4000 ? R * 2 : 0;
        if (balls.every((o) => Math.hypot(o.x - b.x, o.y - b.y) > gap)) {
          const a = Math.random() * Math.PI * 2;
          b.vx = Math.cos(a) * speed;
          b.vy = Math.sin(a) * speed;
          balls.push(b);
        }
      }
      shuffle(balls).slice(0, nTargets).forEach((b) => (b.target = true));

      reveal = false;
      phase = 'cue';
      status.textContent = t('ex.radar.watch');
      draw();
      await ctx.wait(2000);

      phase = 'move';
      status.textContent = t('ex.radar.track');
      await ctx.input<void>((done) => {
        let last = 0;
        let elapsed = 0;
        let id = 0;
        const step = (now: number) => {
          const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
          last = now;
          elapsed += dt;
          for (const b of balls) {
            b.x += b.vx * dt;
            b.y += b.vy * dt;
            if (b.x < R || b.x > size.w - R) b.vx *= -1;
            if (b.y < R || b.y > size.h - R) b.vy *= -1;
            b.x = Math.min(size.w - R, Math.max(R, b.x));
            b.y = Math.min(size.h - R, Math.max(R, b.y));
          }
          // Balls bounce off each other so they never merge (which would make tracking ambiguous).
          for (let a = 0; a < balls.length; a++)
            for (let c = a + 1; c < balls.length; c++) {
              const p = balls[a], q = balls[c];
              const d = Math.hypot(p.x - q.x, p.y - q.y);
              if (d < R * 2 && d > 0) {
                [p.vx, q.vx] = [q.vx, p.vx];
                [p.vy, q.vy] = [q.vy, p.vy];
                const push = (R * 2 - d) / 2;
                const nx = (p.x - q.x) / d, ny = (p.y - q.y) / d;
                p.x += nx * push;
                p.y += ny * push;
                q.x -= nx * push;
                q.y -= ny * push;
              }
            }
          draw();
          if (elapsed >= 6) return done();
          id = requestAnimationFrame(step);
        };
        id = requestAnimationFrame(step);
        return () => cancelAnimationFrame(id);
      });

      phase = 'pick';
      status.textContent = t('ex.radar.pick', { n: nTargets });
      draw();
      await ctx.input<void>((done) => {
        const onDown = (e: PointerEvent) => {
          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left, y = e.clientY - rect.top;
          const hit = balls.find((b) => Math.hypot(b.x - x, b.y - y) < R * 1.6);
          if (!hit) return;
          hit.picked = !hit.picked;
          sfx.tick();
          draw();
          if (balls.filter((b) => b.picked).length === nTargets) done();
        };
        canvas.addEventListener('pointerdown', onDown);
        return () => canvas.removeEventListener('pointerdown', onDown);
      });

      const ok = ctx.track(st, balls.every((b) => b.picked === b.target));
      if (ok) {
        wins++;
        bestTracked = Math.max(bestTracked, nTargets);
      }
      reveal = true;
      draw();
      await ctx.wait(1100);
    }
    ctx.progress(1);
    return { score: st.score(), detail: t('ex.radar.detail', { n: bestTracked, ok: wins, t: trials }), level: st.next() };
  },
};
