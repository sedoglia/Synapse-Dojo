import { h, pick, flash } from '../dom';
import { sfx } from '../audio';
import { t } from '../i18n';
import type { Exercise } from './types';

const CAPS = [3, 2, 1];
const COLORS: Record<string, string> = { R: 'var(--c-red)', G: 'var(--c-green)', B: 'var(--c-blue)' };
const MAX_LEVEL = 7;
const movesFor = (level: number) => level + 1;

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
function puzzle(moves: number): { start: State; goal: State; min: number } {
  for (let want = moves; want > 0; want--) {
    for (let tries = 0; tries < 20; tries++) {
      const goal = pick(ALL_STATES);
      const starts = [...distances(goal)].filter(([, d]) => d === want).map(([s]) => s);
      if (starts.length) return { start: pick(starts), goal, min: want };
    }
  }
  return { start: 'RGB||', goal: 'RG|B|', min: 1 };
}

export function renderBoard(state: State, small: boolean, selected = -1, onPeg?: (i: number) => void): HTMLElement {
  return h(
    'div',
    { class: `tower-board ${small ? 'small' : ''}` },
    ...state.split('|').map((balls, i) =>
      h(
        small ? 'div' : 'button',
        { class: `peg cap${CAPS[i]} ${selected === i ? 'selected' : ''}`, onPointerdown: onPeg ? () => onPeg(i) : null },
        ...[...balls].map((b, k) => h('span', { class: `ball ${selected === i && k === balls.length - 1 ? 'up' : ''}`, style: { background: COLORS[b] } })),
      ),
    ),
  );
}

export const towers: Exercise = {
  id: 'towers',
  icon: '🗼',
  domain: 'reasoning',
  name: 'ex.towers.name',
  desc: 'ex.towers.desc',
  why: 'ex.towers.why',
  example: 'ex.towers.example',
  minutes: 3,
  levels: { min: 1, max: MAX_LEVEL, start: 2 },
  levelLabel: (l) => `${movesFor(l)} ↔`,

  async run(ctx) {
    const puzzles = ctx.count(8, 6, 2);
    const st = ctx.stair(puzzles, 1, MAX_LEVEL, { target: 0.7 });
    let perfect = 0;

    for (let p = 0; p < puzzles; p++) {
      ctx.progress(p / puzzles, `${p + 1}/${puzzles}`);
      const { start, goal, min } = puzzle(movesFor(st.int));
      let state = start;
      let moves = 0;
      let selected = -1;

      const goalBox = h('div', { class: 'tower-goal' }, h('span', { class: 'muted' }, t('ex.towers.goal')), renderBoard(goal, true));
      const counter = h('div', { class: 'grid-status' });
      const playArea = h('div');
      ctx.stage.replaceChildren(goalBox, counter, playArea);

      const solved = await ctx.input<boolean>((done) => {
        const redraw = () => {
          counter.textContent = t('ex.towers.moves', { m: moves, min });
          playArea.replaceChildren(renderBoard(state, false, selected, onPeg));
        };
        const onPeg = (i: number) => {
          const pegs = state.split('|');
          if (selected === -1) {
            if (pegs[i]) selected = i;
          } else if (selected === i) {
            selected = -1;
          } else if (pegs[i].length < CAPS[i]) {
            pegs[i] += pegs[selected].slice(-1);
            pegs[selected] = pegs[selected].slice(0, -1);
            state = pegs.join('|');
            selected = -1;
            moves++;
            sfx.tick();
          } else {
            flash(playArea, 'bad');
            return;
          }
          redraw();
          if (state === goal) done(true);
          else if (moves >= min) done(false); // `min` is the shortest solution, so it is also the most moves allowed
        };
        redraw();
      });

      const ok = ctx.track(st, solved, { was: t('fb.minMoves', { n: min }) });
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
