import { h, pick, flash } from '../dom';
import { sfx } from '../audio';
import { t } from '../i18n';
import { onKeys, timeBar } from '../widgets';
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

    if (Math.max(absX, absY) > 20) {
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

const AXIS: Record<Direction, Direction[]> = { up: ['left', 'right'], down: ['left', 'right'], left: ['up', 'down'], right: ['up', 'down'] };
const OPPOSITE: Record<Direction, Direction> = { up: 'down', down: 'up', left: 'right', right: 'left' };
const HORIZONTAL = (d: Direction) => d === 'left' || d === 'right';

/**
 * Coordination pattern by level, easiest first (Swinnen, 2002): mirror-symmetric movements, which use the same muscles
 * on both sides and are the most stable; then parallel ones; then independent directions on different axes.
 */
function patternFor(level: number, left: Direction): Direction {
  if (level <= 3) return HORIZONTAL(left) ? OPPOSITE[left] : left; // mirror: ← →, ↑ ↑
  if (level <= 6) return HORIZONTAL(left) ? left : OPPOSITE[left]; // parallel: → →, ↑ ↓
  return pick(AXIS[left]); // independent: ↑ →
}

/** Time allowed for both gestures, and how far apart they may be: they must really happen together. */
const limitFor = (level: number) => Math.round(3000 * Math.pow(0.9, level - 1));
const gapFor = (level: number) => Math.max(150, Math.round(700 * Math.pow(0.86, level - 1)));

export const swipePattern: Exercise = {
  id: 'swipePattern',
  icon: '👋',
  domain: 'coordination',
  name: 'ex.swipePattern.name',
  desc: 'ex.swipePattern.desc',
  how: 'ex.swipePattern.how',
  why: 'ex.swipePattern.why',
  example: 'ex.swipePattern.example',
  minutes: [1, 2],
  levels: { min: 1, max: 10, start: 2 },
  levelLabel: (l) => `${l <= 3 ? '← →' : l <= 6 ? '→ →' : '↑ →'} · ${gapFor(l)} ms`,

  async run(ctx) {
    const trials = ctx.count(12, 8, 3);
    const st = ctx.stair(trials, 1, 10);

    const hint = h('div', { class: 'bilateral-hint' }, t('ex.swipePattern.hint'));
    const container = h('div', { class: 'swipe-container' });

    // Left Column (SX)
    const leftZone = h('div', { class: 'swipe-zone left-zone' });
    let onLeftDir: ((dir: Direction) => void) | null = null;

    const btnLUp = h('button', { class: 'btn swipe-dbtn', onPointerdown: () => onLeftDir?.('up') }, '↑', h('span', { class: 'k-hint' }, 'W'));
    const btnLLeft = h('button', { class: 'btn swipe-dbtn', onPointerdown: () => onLeftDir?.('left') }, '←', h('span', { class: 'k-hint' }, 'A'));
    const btnLRight = h('button', { class: 'btn swipe-dbtn', onPointerdown: () => onLeftDir?.('right') }, '→', h('span', { class: 'k-hint' }, 'D'));
    const btnLDown = h('button', { class: 'btn swipe-dbtn', onPointerdown: () => onLeftDir?.('down') }, '↓', h('span', { class: 'k-hint' }, 'S'));
    const leftDpad = h(
      'div',
      { class: 'swipe-dpad' },
      btnLUp,
      h('div', { class: 'swipe-dpad-row' }, btnLLeft, btnLRight),
      btnLDown,
    );
    const leftCol = h('div', { class: 'swipe-col left-col' }, leftZone, leftDpad);

    // Right Column (DX)
    const rightZone = h('div', { class: 'swipe-zone right-zone' });
    let onRightDir: ((dir: Direction) => void) | null = null;

    const btnRUp = h('button', { class: 'btn swipe-dbtn', onPointerdown: () => onRightDir?.('up') }, '↑', h('span', { class: 'k-hint' }, '▲'));
    const btnRLeft = h('button', { class: 'btn swipe-dbtn', onPointerdown: () => onRightDir?.('left') }, '←', h('span', { class: 'k-hint' }, '◀'));
    const btnRRight = h('button', { class: 'btn swipe-dbtn', onPointerdown: () => onRightDir?.('right') }, '→', h('span', { class: 'k-hint' }, '▶'));
    const btnRDown = h('button', { class: 'btn swipe-dbtn', onPointerdown: () => onRightDir?.('down') }, '↓', h('span', { class: 'k-hint' }, '▼'));
    const rightDpad = h(
      'div',
      { class: 'swipe-dpad' },
      btnRUp,
      h('div', { class: 'swipe-dpad-row' }, btnRLeft, btnRRight),
      btnRDown,
    );
    const rightCol = h('div', { class: 'swipe-col right-col' }, rightZone, rightDpad);

    container.append(leftCol, rightCol);
    const bar = timeBar();
    bar.el.classList.toggle('off', ctx.practice);
    ctx.stage.append(hint, bar.el, container);
    // A mouse can only do one gesture at a time, so with a mouse only the time limit counts.
    let usedMouse = false;
    container.addEventListener(
      'pointerdown',
      (e) => {
        if (e.pointerType === 'mouse') usedMouse = true;
      },
      true,
    );

    // Keyboard support for PC
    onKeys(ctx, {
      w: () => onLeftDir?.('up'),
      W: () => onLeftDir?.('up'),
      s: () => onLeftDir?.('down'),
      S: () => onLeftDir?.('down'),
      a: () => onLeftDir?.('left'),
      A: () => onLeftDir?.('left'),
      d: () => onLeftDir?.('right'),
      D: () => onLeftDir?.('right'),

      ArrowUp: () => onRightDir?.('up'),
      ArrowDown: () => onRightDir?.('down'),
      ArrowLeft: () => onRightDir?.('left'),
      ArrowRight: () => onRightDir?.('right'),
    });

    let correct = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);

      const leftDir = pick(DIRS);
      const rightId = patternFor(st.int, leftDir.id);
      const rightDir = DIRS.find((d) => d.id === rightId)!;

      leftZone.replaceChildren(
        h('span', { class: 'swipe-arrow' }, leftDir.arrow),
        h('span', { class: 'swipe-label' }, t('ex.dots.left')),
      );
      rightZone.replaceChildren(
        h('span', { class: 'swipe-arrow' }, rightDir.arrow),
        h('span', { class: 'swipe-label' }, t('ex.dots.right')),
      );
      flash(container, 'pop', 200);

      let leftSwiped: Direction | null = null;
      let rightSwiped: Direction | null = null;
      let leftAt = 0;
      let rightAt = 0;
      usedMouse = false;

      const limit = ctx.practice ? 60_000 : limitFor(st.level) * ctx.pace;
      bar.start(limit);
      await ctx.timed<void>(limit, undefined, (done) => {
        const checkBoth = () => {
          if (leftSwiped !== null && rightSwiped !== null) {
            done();
          }
        };

        const handleLeft = (dir: Direction) => {
          if (leftSwiped === null) {
            leftSwiped = dir;
            leftAt = performance.now();
            sfx.whoosh();
            flash(leftZone, dir === leftDir.id ? 'good' : 'bad', 200);
            checkBoth();
          }
        };

        const handleRight = (dir: Direction) => {
          if (rightSwiped === null) {
            rightSwiped = dir;
            rightAt = performance.now();
            sfx.whoosh();
            flash(rightZone, dir === rightDir.id ? 'good' : 'bad', 200);
            checkBoth();
          }
        };

        onLeftDir = handleLeft;
        onRightDir = handleRight;

        const cleanL = setupSwipe(leftZone, handleLeft);
        const cleanR = setupSwipe(rightZone, handleRight);

        return () => {
          cleanL();
          cleanR();
          onLeftDir = null;
          onRightDir = null;
        };
      });

      const rightMoves = leftSwiped === leftDir.id && rightSwiped === rightDir.id;
      bar.stop();
      const together = ctx.practice || usedMouse || Math.abs(leftAt - rightAt) <= gapFor(st.level) * ctx.pace;
      const finished = leftSwiped !== null && rightSwiped !== null;
      const isMatch = rightMoves && together;
      const ok = ctx.track(st, isMatch, {
        note: !finished ? t('common.timeout') : rightMoves ? t('ex.swipePattern.together') : undefined,
        was: finished && !rightMoves ? `${leftDir.arrow} | ${rightDir.arrow}` : undefined,
      });

      if (isMatch) {
        correct++;
        sfx.sparkle();
        flash(container, 'good', 250);
      } else {
        flash(container, 'bad', 400);
      }
      await ctx.wait(ok ? 300 : 700);
    }

    ctx.progress(1);

    const { score, timeBonus } = ctx.withTimeBonus(st.score(), 2.2);
    return {
      score,
      detail: t('ex.swipePattern.detail', { ok: correct, n: trials }),
      level: st.next(),
      timeBonus,
    };
  },
};
