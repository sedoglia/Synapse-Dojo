import { h, pick, flash } from '../dom';
import { sfx } from '../audio';
import { t } from '../i18n';
import { getRecentHistory, saveRecentHistory } from '../storage';
import type { Exercise } from './types';

const CAPS = [3, 2, 1];
const COLORS: Record<string, string> = { R: 'var(--c-red)', G: 'var(--c-green)', B: 'var(--c-blue)' };
const MAX_LEVEL = 7;
const movesFor = (level: number) => level + 1;

const RECENT_KEY = 'synapse_towers_recent_puzzles';
const MAX_RECENT_MEMORY = 30;

const getRecentPuzzleKeys = (): string[] => getRecentHistory(RECENT_KEY);
const saveRecentPuzzleKey = (key: string) => saveRecentHistory(RECENT_KEY, key, MAX_RECENT_MEMORY);

type State = string; // pegs bottom→top joined by '|', e.g. "RG|B|"

function neighbors(s: State): State[] {
  const pegs = s.split('|');
  const out: State[] = [];
  pegs.forEach((from, i) => {
    if (!from) return;
    pegs.forEach((to, j) => {
      if (i === j || to.length >= CAPS[j]) return;
      const next = [...pegs];
      next[i] = from.slice(0, -1);
      next[j] = to + from.slice(-1);
      out.push(next.join('|'));
    });
  });
  return out;
}

/** Breadth-first distances from `start` to every reachable state. */
function distances(start: State): Map<State, number> {
  const dist = new Map([[start, 0]]);
  const queue = [start];
  while (queue.length) {
    const s = queue.shift()!;
    for (const n of neighbors(s)) {
      if (!dist.has(n)) {
        dist.set(n, dist.get(s)! + 1);
        queue.push(n);
      }
    }
  }
  return dist;
}

const ALL_STATES = [...distances('RGB||').keys()];

/** A start/goal pair whose shortest solution is exactly `moves` (or the longest available below it). */
function puzzle(
  moves: number,
  usedInSession?: Set<string>,
  recentKeys?: Set<string>,
): { start: State; goal: State; min: number; key: string } {
  for (let want = moves; want > 0; want--) {
    const candidatePairs: { start: State; goal: State; key: string }[] = [];
    for (const goal of ALL_STATES) {
      const starts = [...distances(goal)].filter(([, d]) => d === want).map(([s]) => s);
      for (const start of starts) {
        candidatePairs.push({ start, goal, key: `${start}->${goal}` });
      }
    }
    if (candidatePairs.length) {
      let filtered = candidatePairs.filter(
        (p) => (!usedInSession || !usedInSession.has(p.key)) && (!recentKeys || !recentKeys.has(p.key)),
      );
      if (!filtered.length && usedInSession) {
        // If all pairs were recently played, recycle while avoiding in-session duplicates
        filtered = candidatePairs.filter((p) => !usedInSession.has(p.key));
      }
      const chosen = filtered.length ? pick(filtered) : pick(candidatePairs);
      return { ...chosen, min: want };
    }
  }
  return { start: 'RGB||', goal: 'RG|B|', min: 1, key: 'RGB||->RG|B|' };
}

export function renderBoard(state: State, small: boolean, selected = -1, onPeg?: (i: number) => void): HTMLElement {
  const board = h(
    'div',
    { class: `tower-board ${small ? 'small' : ''}` },
    ...state.split('|').map((balls, i) =>
      h(
        small ? 'div' : 'button',
        {
          class: `peg cap${CAPS[i]} ${selected === i ? 'selected' : ''}`,
          ...(small ? {} : { type: 'button' }),
          onpointerdown: onPeg ? () => onPeg(i) : null,
        },
        ...[...balls].map((b, k) =>
          h('span', {
            class: `ball ${selected === i && k === balls.length - 1 ? 'up' : ''}`,
            style: { background: COLORS[b] },
          }),
        ),
      ),
    ),
  );
  if (small) return board;
  return h('div', { class: 'tower-wrap' }, board, h('div', { class: 'tower-base' }));
}

interface InteractiveBoard {
  element: HTMLElement;
  update(state: State, selected: number): void;
  getPegElement(i: number): HTMLElement;
  animateMove(from: number, to: number, color: string, onDone: () => void): void;
}

function createInteractiveBoard(initialState: State, onPeg: (i: number) => void): InteractiveBoard {
  const pegElements: HTMLElement[] = [];

  const board = h(
    'div',
    { class: 'tower-board' },
    ...CAPS.map((cap, i) => {
      const peg = h('button', {
        class: `peg cap${cap}`,
        type: 'button',
        'aria-label': `Peg ${i + 1}`,
        onpointerdown: () => onPeg(i),
      });
      pegElements.push(peg);
      return peg;
    }),
  );

  const base = h('div', { class: 'tower-base' });
  const wrap = h('div', { class: 'tower-wrap' }, board, base);

  const update = (state: State, selected: number) => {
    const pegs = state.split('|');
    pegs.forEach((balls, i) => {
      const peg = pegElements[i];
      if (selected === i) {
        peg.classList.add('selected');
      } else {
        peg.classList.remove('selected');
      }
      peg.replaceChildren(
        ...[...balls].map((b, k) =>
          h('span', {
            class: `ball ${selected === i && k === balls.length - 1 ? 'up' : ''}`,
            style: { background: COLORS[b] },
          }),
        ),
      );
    });
  };

  update(initialState, -1);

  const animateMove = (from: number, to: number, color: string, onDone: () => void) => {
    const fromPeg = pegElements[from];
    const toPeg = pegElements[to];
    const fromBall = fromPeg.querySelector<HTMLElement>('.ball:last-child');
    if (!fromBall) {
      onDone();
      return;
    }

    const rFrom = fromBall.getBoundingClientRect();

    // Temporarily attach a ghost ball in toPeg to measure landing coordinate
    const ghost = h('span', { class: 'ball', style: { visibility: 'hidden' } });
    toPeg.appendChild(ghost);
    const rTo = ghost.getBoundingClientRect();
    ghost.remove();

    // Hide original ball while flyer clone animates
    fromBall.style.visibility = 'hidden';

    const flyer = h('div', {
      class: 'ball-flyer',
      style: {
        left: `${rFrom.left}px`,
        top: `${rFrom.top}px`,
        width: `${rFrom.width}px`,
        height: `${rFrom.height}px`,
        background: COLORS[color],
      },
    });
    document.body.appendChild(flyer);

    const dx = rTo.left - rFrom.left;
    const dy = rTo.top - rFrom.top;
    const peakY = Math.min(dy * 0.5 - 45, -55);

    const keyframes = [
      { transform: 'translate(0px, 0px) scale(1.05)', opacity: 1 },
      { transform: `translate(${dx * 0.5}px, ${peakY}px) scale(1.10)`, opacity: 1, offset: 0.5 },
      { transform: `translate(${dx}px, ${dy + 4}px) scale(0.96, 1.04)`, opacity: 1, offset: 0.88 },
      { transform: `translate(${dx}px, ${dy}px) scale(1)`, opacity: 1 },
    ];

    const anim = flyer.animate(keyframes, {
      duration: 250,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      fill: 'forwards',
    });

    anim.onfinish = () => {
      flyer.remove();
      onDone();
    };
  };

  return {
    element: wrap,
    update,
    getPegElement: (i: number) => pegElements[i],
    animateMove,
  };
}

export const towers: Exercise = {
  id: 'towers',
  icon: '🗼',
  domain: 'reasoning',
  name: 'ex.towers.name',
  desc: 'ex.towers.desc',
  why: 'ex.towers.why',
  example: 'ex.towers.example',
  minutes: [2, 5],
  levels: { min: 1, max: MAX_LEVEL, start: 2 },
  levelLabel: (l) => `${movesFor(l)} ↔`,

  async run(ctx) {
    const puzzles = ctx.count(8, 6, 2);
    const st = ctx.stair(puzzles, 1, MAX_LEVEL, { target: 0.7 });
    const usedPuzzleKeys = new Set<string>();
    const recentKeys = new Set(getRecentPuzzleKeys());
    let perfect = 0;

    for (let p = 0; p < puzzles; p++) {
      ctx.progress(p / puzzles, `${p + 1}/${puzzles}`);
      const puzzleObj = puzzle(movesFor(st.int), usedPuzzleKeys, recentKeys);
      usedPuzzleKeys.add(puzzleObj.key);
      saveRecentPuzzleKey(puzzleObj.key);
      const { start, goal, min } = puzzleObj;
      let state = start;
      let moves = 0;
      let selected = -1;

      const goalBox = h('div', { class: 'tower-goal' }, h('span', { class: 'muted' }, t('ex.towers.goal')), renderBoard(goal, true));
      const counter = h('div', { class: 'grid-status tower-counter' });
      const undoBtn = h('button', { class: 'btn ghost small tower-undo', disabled: true, title: t('ex.towers.undo') }, '↩');
      const counterRow = h('div', { class: 'row center tower-header-row' }, counter, undoBtn);
      const playArea = h('div');
      ctx.stage.replaceChildren(goalBox, counterRow, playArea);

      const solved = await ctx.input<boolean>((done) => {
        const history: { state: State; moves: number }[] = [];
        let animating = false;

        const board = createInteractiveBoard(state, (i) => onPeg(i));
        playArea.replaceChildren(board.element);

        const updateStatus = () => {
          counter.textContent = t('ex.towers.moves', { m: moves, min });
          undoBtn.disabled = history.length === 0;
        };
        updateStatus();

        undoBtn.onclick = () => {
          if (animating || history.length === 0) return;
          const prev = history.pop()!;
          state = prev.state;
          moves = prev.moves;
          selected = -1;
          sfx.clack();
          board.update(state, -1);
          updateStatus();
        };

        const onPeg = (i: number) => {
          if (animating) return;
          const pegs = state.split('|');

          if (selected === -1) {
            if (pegs[i]) {
              selected = i;
              sfx.whoosh();
              board.update(state, selected);
            }
          } else if (selected === i) {
            selected = -1;
            sfx.clack();
            board.update(state, -1);
          } else if (pegs[i].length < CAPS[i]) {
            animating = true;
            const fromIndex = selected;
            const movingColor = pegs[fromIndex].slice(-1);

            history.push({ state, moves });
            pegs[i] += movingColor;
            pegs[fromIndex] = pegs[fromIndex].slice(0, -1);
            state = pegs.join('|');
            selected = -1;
            moves++;
            updateStatus();

            board.animateMove(fromIndex, i, movingColor, () => {
              board.update(state, -1);
              sfx.clack();
              animating = false;

              if (state === goal) {
                sfx.sparkle();
                done(true);
              } else if (moves >= min) {
                done(false); // `min` is the shortest solution, so it is also the most moves allowed
              }
            });
          } else {
            flash(board.getPegElement(i), 'peg-shake', 360);
            sfx.bad();
          }
        };

        return () => {
          undoBtn.onclick = null;
        };
      });

      const ok = ctx.track(st, solved, { note: t('fb.minMoves', { n: min }) });
      if (ok) perfect++;
      counter.textContent = ok ? '✓' : t('ex.towers.too');
      flash(playArea, ok ? 'good' : 'bad', 500);
      await ctx.wait(ok ? 600 : 1200);
    }
    ctx.progress(1);
    const { score, timeBonus } = ctx.withTimeBonus(st.score(), 2 + 1.5 * movesFor(st.threshold()));
    return { score, detail: t('ex.towers.detail', { ok: perfect, n: puzzles }), level: st.next(), timeBonus };
  },
};
