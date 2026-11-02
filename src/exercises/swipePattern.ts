import { h, pick, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import { onKeys } from '../widgets';
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
  levelLabel: (l) => (l <= 3 ? '↑ ↑' : l <= 6 ? '↑ ↓' : '↑ →'),

  async run(ctx) {
    const trials = ctx.count(12, 8, 3);
    const st = new Staircase(ctx.level, 1, 10);

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
    ctx.stage.append(hint, container);

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

      let leftDir = pick(DIRS);
      let rightDir = pick(DIRS);

      if (st.int <= 3) {
        // Congruent
        rightDir = leftDir;
      } else if (st.int <= 6) {
        // Opposite / mirror
        if (leftDir.id === 'up') rightDir = DIRS.find((d) => d.id === 'down')!;
        else if (leftDir.id === 'down') rightDir = DIRS.find((d) => d.id === 'up')!;
        else if (leftDir.id === 'left') rightDir = DIRS.find((d) => d.id === 'right')!;
        else rightDir = DIRS.find((d) => d.id === 'left')!;
      }

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

      await ctx.input<void>((done) => {
        const checkBoth = () => {
          if (leftSwiped !== null && rightSwiped !== null) {
            done();
          }
        };

        const handleLeft = (dir: Direction) => {
          if (leftSwiped === null) {
            leftSwiped = dir;
            flash(leftZone, dir === leftDir.id ? 'good' : 'bad', 200);
            checkBoth();
          }
        };

        const handleRight = (dir: Direction) => {
          if (rightSwiped === null) {
            rightSwiped = dir;
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

    const { score, timeBonus } = ctx.withTimeBonus(st.score(), 2.2);
    return {
      score,
      detail: t('ex.swipePattern.detail', { ok: correct, n: trials }),
      level: st.next(),
      timeBonus,
    };
  },
};
