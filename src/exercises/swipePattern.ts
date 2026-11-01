import { h, pick, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

type Direction = 'up' | 'down' | 'left' | 'right';

const DIRS: { id: Direction; arrow: string }[] = [
  { id: 'up', arrow: '↑' },
  { id: 'down', arrow: '↓' },
  { id: 'left', arrow: '←' },
  { id: 'right', arrow: '→' },
];

function setupSwipe(
  el: HTMLElement,
  onDirection: (dir: Direction) => void,
): () => void {
  let startX = 0;
  let startY = 0;

  const onPointerDown = (e: PointerEvent) => {
    startX = e.clientX;
    startY = e.clientY;
  };

  const onPointerUp = (e: PointerEvent) => {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (Math.max(absX, absY) > 25) {
      if (absX > absY) {
        onDirection(dx > 0 ? 'right' : 'left');
      } else {
        onDirection(dy > 0 ? 'down' : 'up');
      }
    }
  };

  el.addEventListener('pointerdown', onPointerDown);
  el.addEventListener('pointerup', onPointerUp);

  return () => {
    el.removeEventListener('pointerdown', onPointerDown);
    el.removeEventListener('pointerup', onPointerUp);
  };
}

export const swipePattern: Exercise = {
  id: 'swipePattern',
  icon: '👋',
  domain: 'coordination',
  name: 'ex.swipePattern.name',
  desc: 'ex.swipePattern.desc',
  why: 'ex.swipePattern.why',
  example: 'ex.swipePattern.example',
  minutes: 2,
  levels: { min: 1, max: 10, start: 2 },
  levelLabel: (l) => `lvl ${l}`,

  async run(ctx) {
    const trials = ctx.count(12, 8, 3);
    const st = new Staircase(ctx.level, 1, 10);

    const hint = h('div', { class: 'bilateral-hint' }, t('ex.swipePattern.hint'));
    const container = h('div', { class: 'swipe-container' });

    const leftZone = h('div', { class: 'swipe-zone left-zone' });
    const rightZone = h('div', { class: 'swipe-zone right-zone' });
    container.append(leftZone, rightZone);

    ctx.stage.append(hint, container);

    let correct = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);

      // Choose directions based on level
      let leftDir = pick(DIRS);
      let rightDir = pick(DIRS);

      if (st.int <= 3) {
        // Congruent
        rightDir = leftDir;
      } else if (st.int <= 6) {
        // Mirror or opposite
        if (leftDir.id === 'up') rightDir = DIRS.find((d) => d.id === 'down')!;
        else if (leftDir.id === 'down') rightDir = DIRS.find((d) => d.id === 'up')!;
        else if (leftDir.id === 'left') rightDir = DIRS.find((d) => d.id === 'right')!;
        else rightDir = DIRS.find((d) => d.id === 'left')!;
      }

      leftZone.innerHTML = `<span class="swipe-arrow">${leftDir.arrow}</span><span class="swipe-label">SX / Left</span>`;
      rightZone.innerHTML = `<span class="swipe-arrow">${rightDir.arrow}</span><span class="swipe-label">DX / Right</span>`;
      flash(container, 'pop', 200);

      let leftSwiped: Direction | null = null;
      let rightSwiped: Direction | null = null;

      await ctx.input<void>((done) => {
        const checkBoth = () => {
          if (leftSwiped !== null && rightSwiped !== null) done();
        };

        const cleanL = setupSwipe(leftZone, (dir) => {
          leftSwiped = dir;
          flash(leftZone, dir === leftDir.id ? 'good' : 'bad', 200);
          checkBoth();
        });

        const cleanR = setupSwipe(rightZone, (dir) => {
          rightSwiped = dir;
          flash(rightZone, dir === rightDir.id ? 'good' : 'bad', 200);
          checkBoth();
        });

        // Also add direct directional tap buttons for accessibility & keyboard
        const kb = (e: KeyboardEvent) => {
          if (e.key === 'w' || e.key === 'W') { leftSwiped = 'up'; checkBoth(); }
          if (e.key === 's' || e.key === 'S') { leftSwiped = 'down'; checkBoth(); }
          if (e.key === 'a' || e.key === 'A') { leftSwiped = 'left'; checkBoth(); }
          if (e.key === 'd' || e.key === 'D') { leftSwiped = 'right'; checkBoth(); }

          if (e.key === 'ArrowUp') { rightSwiped = 'up'; checkBoth(); }
          if (e.key === 'ArrowDown') { rightSwiped = 'down'; checkBoth(); }
          if (e.key === 'ArrowLeft') { rightSwiped = 'left'; checkBoth(); }
          if (e.key === 'ArrowRight') { rightSwiped = 'right'; checkBoth(); }
        };
        window.addEventListener('keydown', kb);

        return () => {
          cleanL();
          cleanR();
          window.removeEventListener('keydown', kb);
        };
      });

      const isMatch = leftSwiped === leftDir.id && rightSwiped === rightDir.id;
      const ok = ctx.track(st, isMatch, {
        was: `${leftDir.arrow} | ${rightDir.arrow}`,
      });

      if (isMatch) {
        correct++;
        flash(container, 'good', 250);
      } else {
        flash(container, 'bad', 400);
      }
      await ctx.wait(ok ? 300 : 700);
    }
    ctx.progress(1);

    return {
      score: st.score(),
      detail: t('ex.swipePattern.detail', { ok: correct, n: trials }),
      level: st.next(),
    };
  },
};
