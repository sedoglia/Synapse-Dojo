import { h, flash, clamp, pick } from '../dom';
import { sfx, haptic } from '../audio';
import { t } from '../i18n';
import type { Exercise } from './types';

const GRID_SIZE = 4;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
const MAX_LEVEL = 10;

export type Direction = 'up' | 'down' | 'left' | 'right';

/** Target tile for each difficulty level */
export const targetFor = (level: number): number => {
  const targets = [32, 64, 128, 256, 512, 1024, 2048, 2048, 4096, 4096];
  return targets[clamp(Math.round(level) - 1, 0, targets.length - 1)];
};

/** Move budget per milestone based on level */
const movesFor = (level: number, pace: number): number => {
  const baseMoves = [24, 22, 22, 24, 24, 26, 26, 28, 28, 26];
  const b = baseMoves[clamp(Math.round(level) - 1, 0, baseMoves.length - 1)];
  return Math.round(b * (pace > 1 ? 1.25 : 1));
};

/** Whether this level includes a stone obstacle */
const hasObstacle = (level: number): boolean => Math.round(level) === 8 || Math.round(level) === 10;

/** Pure slide and merge logic for a 4x4 grid */
export function slideGrid(
  grid: number[],
  dir: Direction,
): { nextGrid: number[]; changed: boolean; scoreGained: number; maxMerged: number } {
  const next = [...grid];
  let changed = false;
  let scoreGained = 0;
  let maxMerged = 0;
  const merged = new Array(TOTAL_CELLS).fill(false);

  const getIdx = (r: number, c: number) => r * GRID_SIZE + c;

  const rowStep = dir === 'up' ? 1 : dir === 'down' ? -1 : 0;
  const colStep = dir === 'left' ? 1 : dir === 'right' ? -1 : 0;

  const startR = dir === 'down' ? GRID_SIZE - 2 : dir === 'up' ? 1 : 0;
  const endR = dir === 'down' ? -1 : dir === 'up' ? GRID_SIZE : GRID_SIZE;
  const dR = dir === 'down' ? -1 : 1;

  const startC = dir === 'right' ? GRID_SIZE - 2 : dir === 'left' ? 1 : 0;
  const endC = dir === 'right' ? -1 : dir === 'left' ? GRID_SIZE : GRID_SIZE;
  const dC = dir === 'right' ? -1 : 1;

  for (let r = startR; r !== endR; r += dR) {
    for (let c = startC; c !== endC; c += dC) {
      const curIdx = getIdx(r, c);
      const val = next[curIdx];
      if (val <= 0) continue; // empty or obstacle

      let currR = r;
      let currC = c;
      let nextR = currR - rowStep;
      let nextC = currC - colStep;

      // Slide as far as possible
      while (nextR >= 0 && nextR < GRID_SIZE && nextC >= 0 && nextC < GRID_SIZE) {
        const targetIdx = getIdx(nextR, nextC);
        const targetVal = next[targetIdx];

        if (targetVal === 0) {
          // Slide into empty cell
          next[targetIdx] = next[getIdx(currR, currC)];
          next[getIdx(currR, currC)] = 0;
          currR = nextR;
          currC = nextC;
          nextR = currR - rowStep;
          nextC = currC - colStep;
          changed = true;
        } else if (targetVal === val && !merged[targetIdx] && targetVal > 0) {
          // Merge identical tiles!
          const doubleVal = val * 2;
          next[targetIdx] = doubleVal;
          next[getIdx(currR, currC)] = 0;
          merged[targetIdx] = true;
          scoreGained += doubleVal;
          maxMerged = Math.max(maxMerged, doubleVal);
          changed = true;
          break;
        } else {
          // Blocked by different tile or obstacle
          break;
        }
      }
    }
  }

  return { nextGrid: next, changed, scoreGained, maxMerged };
}

/** Check if any valid moves exist in any direction */
export function canMove(grid: number[]): boolean {
  for (let i = 0; i < TOTAL_CELLS; i++) {
    if (grid[i] === 0) return true;
    const r = Math.floor(i / GRID_SIZE);
    const c = i % GRID_SIZE;
    const val = grid[i];
    if (val <= 0) continue;

    // Check right neighbor
    if (c < GRID_SIZE - 1) {
      const right = grid[i + 1];
      if (right === val || right === 0) return true;
    }
    // Check bottom neighbor
    if (r < GRID_SIZE - 1) {
      const down = grid[i + GRID_SIZE];
      if (down === val || down === 0) return true;
    }
  }
  return false;
}

/** Spawns a new tile (90% chance of 2, 10% chance of 4) in a random empty cell */
function spawnTile(grid: number[], target: number): { grid: number[]; spawnedIdx: number } {
  const empties: number[] = [];
  for (let i = 0; i < TOTAL_CELLS; i++) {
    if (grid[i] === 0) empties.push(i);
  }
  if (!empties.length) return { grid, spawnedIdx: -1 };

  const idx = pick(empties);
  const fourChance = target >= 512 ? 0.15 : 0.10;
  const val = Math.random() < fourChance ? 4 : 2;
  const next = [...grid];
  next[idx] = val;
  return { grid: next, spawnedIdx: idx };
}

/**
 * Creates an intelligent starting board tailored for the target tile level.
 * Seeds a clean, structured set of tiles in a natural monotonic corner arrangement,
 * leaving ample space (10-12 empty cells) for strategic building.
 */
function seedBoard(level: number): number[] {
  const grid = new Array(TOTAL_CELLS).fill(0);
  const lvl = clamp(Math.round(level), 1, MAX_LEVEL);

  // Position seeds starting from bottom-right / corner
  if (lvl === 1) {
    grid[15] = 4;
    grid[14] = 4;
    grid[11] = 2;
    grid[10] = 2;
  } else if (lvl === 2) {
    grid[15] = 16;
    grid[14] = 8;
    grid[13] = 8;
    grid[11] = 4;
    grid[10] = 2;
  } else if (lvl === 3) {
    grid[15] = 32;
    grid[14] = 16;
    grid[13] = 16;
    grid[11] = 8;
    grid[10] = 4;
  } else if (lvl === 4) {
    grid[15] = 64;
    grid[14] = 32;
    grid[13] = 32;
    grid[11] = 16;
    grid[10] = 8;
  } else if (lvl === 5) {
    grid[15] = 128;
    grid[14] = 64;
    grid[13] = 64;
    grid[11] = 32;
    grid[10] = 16;
  } else if (lvl === 6) {
    grid[15] = 256;
    grid[14] = 128;
    grid[13] = 128;
    grid[11] = 64;
    grid[10] = 32;
  } else if (lvl === 7) {
    grid[15] = 512;
    grid[14] = 256;
    grid[13] = 256;
    grid[11] = 128;
    grid[10] = 64;
  } else if (lvl === 8) {
    // Target 2048 with obstacle
    grid[15] = 512;
    grid[14] = 256;
    grid[13] = 256;
    grid[11] = 128;
    grid[10] = 64;
    grid[5] = -1; // Stone block in inner cell
  } else if (lvl === 9) {
    grid[15] = 1024;
    grid[14] = 512;
    grid[13] = 512;
    grid[11] = 256;
    grid[10] = 128;
  } else {
    // Master: Target 4096 with obstacle
    grid[15] = 1024;
    grid[14] = 512;
    grid[13] = 512;
    grid[11] = 256;
    grid[10] = 128;
    grid[5] = -1;
  }

  return grid;
}

/** Cleans lowest 2s when board gets crowded upon milestone clear */
function cleanupLowTiles(grid: number[]): number[] {
  const occupied = grid.filter((v) => v > 0).length;
  if (occupied <= 11) return grid;
  let cleared = 0;
  return grid.map((v) => {
    if (v === 2 && cleared < 2) {
      cleared++;
      return 0;
    }
    return v;
  });
}

export const game2048: Exercise = {
  id: 'game2048',
  icon: '🧱',
  domain: 'reasoning',
  name: 'ex.game2048.name',
  desc: 'ex.game2048.desc',
  why: 'ex.game2048.why',
  example: 'ex.game2048.example',
  minutes: [1, 2],
  levels: { min: 1, max: MAX_LEVEL, start: 2 },
  levelLabel: (l) => `${targetFor(l)} 🎯`,

  async run(ctx) {
    const milestones = ctx.count(3, 2, 1);
    const st = ctx.stair(milestones, 1, MAX_LEVEL, { target: 0.75 });

    let currentGrid = seedBoard(st.int);
    let totalScore = 0;
    let completedMilestones = 0;
    let highestTileAchieved = Math.max(...currentGrid.filter((v) => v > 0));
    let moveRts: number[] = [];

    for (let m = 0; m < milestones; m++) {
      ctx.progress(m / milestones, `${m + 1}/${milestones}`);

      const targetTile = targetFor(st.int);
      let movesLeft = movesFor(st.int, ctx.pace);
      let undosLeft = 2;

      // If grid has no path to target or lacks high tiles after defeat, re-seed
      const maxCurrent = Math.max(...currentGrid.filter((v) => v > 0), 0);
      if (maxCurrent < targetTile / 4 || !canMove(currentGrid)) {
        currentGrid = seedBoard(st.int);
      } else if (hasObstacle(st.int) && !currentGrid.includes(-1)) {
        // Ensure obstacle cell is present at levels 8 and 10
        const centerIndices = [5, 6, 9, 10].filter((idx) => currentGrid[idx] === 0);
        if (centerIndices.length) currentGrid[centerIndices[0]] = -1;
      }

      // UI Construction
      ctx.stage.replaceChildren();
      ctx.stage.className = 'stage stage-game2048';

      const targetValEl = h('span', { class: 'pill-val' }, String(targetTile));
      const targetBadge = h(
        'div',
        { class: 'game2048-pill target-pill' },
        h('span', { class: 'pill-label' }, t('ex.game2048.target')),
        targetValEl,
      );

      const movesLabel = t('ex.game2048.moves', { m: '' }).replace(/:\s*$/, '').trim();
      const movesValEl = h('span', { class: 'pill-val' }, String(movesLeft));
      const movesCounter = h(
        'div',
        { class: 'game2048-pill moves-pill' },
        h('span', { class: 'pill-label' }, movesLabel),
        movesValEl,
      );

      const scoreLabel = t('ex.game2048.score', { s: '' }).replace(/:\s*$/, '').trim();
      const scoreValEl = h('span', { class: 'pill-val' }, String(totalScore));
      const scoreCounter = h(
        'div',
        { class: 'game2048-pill score-pill' },
        h('span', { class: 'pill-label' }, scoreLabel),
        scoreValEl,
      );

      const undoBtn = h(
        'button',
        {
          class: 'game2048-undo-btn',
          title: t('ex.game2048.undo'),
          disabled: undosLeft <= 0,
        },
        `↩ ${undosLeft}`,
      );

      const headerRow = h('div', { class: 'game2048-hud' }, targetBadge, movesCounter, scoreCounter, undoBtn);

      const gridEl = h('div', { class: 'game2048-grid' });
      const boardWrap = h('div', { class: 'game2048-wrap' }, headerRow, gridEl);

      // On-screen tactile controls (D-Pad for elderly accessibility and touch devices)
      const btnUp = h('button', { class: 'game2048-dbtn d-up', 'aria-label': 'Up' }, '▲');
      const btnLeft = h('button', { class: 'game2048-dbtn d-left', 'aria-label': 'Left' }, '◀');
      const btnDown = h('button', { class: 'game2048-dbtn d-down', 'aria-label': 'Down' }, '▼');
      const btnRight = h('button', { class: 'game2048-dbtn d-right', 'aria-label': 'Right' }, '▶');

      const dpad = h(
        'div',
        { class: 'game2048-dpad' },
        h('div', { class: 'dpad-row center' }, btnUp),
        h('div', { class: 'dpad-row sides' }, btnLeft, btnDown, btnRight),
      );

      ctx.stage.append(boardWrap, dpad);

      // Pre-allocate persistent cell elements in the 4x4 grid (avoids layout thrashing)
      const cellEls: HTMLElement[] = [];
      gridEl.replaceChildren();
      for (let i = 0; i < TOTAL_CELLS; i++) {
        const cell = h('div', { class: 'game2048-cell' });
        cellEls.push(cell);
        gridEl.append(cell);
      }

      const renderCells = (spawnIdx = -1, mergedVal = 0) => {
        for (let i = 0; i < TOTAL_CELLS; i++) {
          const val = currentGrid[i];
          const cell = cellEls[i];

          if (val > 0) {
            const isSpawned = i === spawnIdx;
            const isMerged = val === mergedVal;
            const textClass = val >= 1024 ? 'xsmall-text' : val >= 128 ? 'small-text' : '';
            cell.replaceChildren(
              h(
                'div',
                {
                  class: `game2048-tile val-${val} ${textClass} ${isSpawned ? 'tile-spawn' : ''} ${isMerged ? 'tile-merge' : ''}`,
                },
                String(val),
              ),
            );
          } else if (val === -1) {
            cell.replaceChildren(h('div', { class: 'game2048-tile val-obstacle' }, '🪨'));
          } else {
            cell.replaceChildren();
          }
        }
      };

      renderCells();

      // Run this milestone trial
      const result = await ctx.input<{ solved: boolean; reason?: 'moves' | 'locked' }>((done) => {
        const history: { grid: number[]; score: number; moves: number }[] = [];
        let animating = false;
        let lastMoveTimestamp = performance.now();

        const updateHud = () => {
          movesValEl.textContent = String(movesLeft);
          if (movesLeft <= 5) movesCounter.classList.add('danger');
          else movesCounter.classList.remove('danger');
          scoreValEl.textContent = String(totalScore);
          undoBtn.textContent = `↩ ${undosLeft}`;
          undoBtn.disabled = undosLeft <= 0 || history.length === 0;
        };

        const executeMove = (dir: Direction) => {
          if (animating || movesLeft <= 0) return;

          const now = performance.now();
          const moveRt = now - lastMoveTimestamp;
          lastMoveTimestamp = now;
          if (moveRt > 100 && moveRt < 10000) moveRts.push(moveRt);

          const { nextGrid, changed, scoreGained, maxMerged } = slideGrid(currentGrid, dir);
          if (!changed) {
            // Cannot slide in this direction: gentle audio cue
            sfx.tick();
            return;
          }

          history.push({ grid: [...currentGrid], score: totalScore, moves: movesLeft });
          currentGrid = nextGrid;
          movesLeft--;
          totalScore += scoreGained;

          highestTileAchieved = Math.max(highestTileAchieved, ...currentGrid.filter((v) => v > 0));

          // Audio & Haptic orchestration
          if (maxMerged >= 1024) {
            sfx.fanfare();
            haptic('combo');
          } else if (maxMerged >= 256) {
            sfx.coins();
            haptic('combo');
          } else if (maxMerged >= 16) {
            const pitchTier = Math.min(8, Math.floor(Math.log2(maxMerged)) - 3);
            sfx.note(pitchTier);
            haptic('good');
          } else {
            sfx.whoosh();
            haptic('tap');
          }

          // Check milestone success
          if (maxMerged >= targetTile || currentGrid.some((v) => v >= targetTile)) {
            animating = true;
            renderCells(-1, maxMerged);
            updateHud();
            sfx.sparkle();
            sfx.levelUp();
            haptic('combo');
            flash(gridEl, 'good', 500);
            done({ solved: true });
            return;
          }

          // Spawn new tile
          const { grid: withSpawn, spawnedIdx } = spawnTile(currentGrid, targetTile);
          currentGrid = withSpawn;

          renderCells(spawnedIdx, maxMerged);
          updateHud();

          // Check defeat conditions
          if (!canMove(currentGrid)) {
            animating = true;
            flash(gridEl, 'bad', 600);
            sfx.bad();
            done({ solved: false, reason: 'locked' });
          } else if (movesLeft <= 0) {
            animating = true;
            flash(gridEl, 'bad', 600);
            sfx.bad();
            done({ solved: false, reason: 'moves' });
          }
        };

        // Undo action
        undoBtn.onclick = () => {
          if (animating || history.length === 0 || undosLeft <= 0) return;
          const prev = history.pop()!;
          currentGrid = prev.grid;
          totalScore = prev.score;
          movesLeft = prev.moves;
          undosLeft--;
          sfx.clack();
          renderCells();
          updateHud();
        };

        // Ultra-responsive touch & mouse swipe handlers
        let touchStartX = 0;
        let touchStartY = 0;
        let isPointerDown = false;
        let swipeFired = false;

        const onPointerDown = (e: PointerEvent) => {
          if (!e.isPrimary) return;
          if ((e.target as HTMLElement)?.closest?.('button')) return;
          isPointerDown = true;
          swipeFired = false;
          touchStartX = e.clientX;
          touchStartY = e.clientY;
        };

        const onPointerMove = (e: PointerEvent) => {
          if (!isPointerDown || swipeFired) return;
          const dx = e.clientX - touchStartX;
          const dy = e.clientY - touchStartY;
          const absDx = Math.abs(dx);
          const absDy = Math.abs(dy);

          // Fast swipe threshold: triggers immediately as soon as finger moves 16px!
          if (Math.max(absDx, absDy) >= 16) {
            swipeFired = true;
            if (absDx > absDy) {
              executeMove(dx > 0 ? 'right' : 'left');
            } else {
              executeMove(dy > 0 ? 'down' : 'up');
            }
          }
        };

        const onPointerUp = (e: PointerEvent) => {
          if (isPointerDown && !swipeFired) {
            // Micro-flick fallback on release
            const dx = e.clientX - touchStartX;
            const dy = e.clientY - touchStartY;
            const absDx = Math.abs(dx);
            const absDy = Math.abs(dy);
            if (Math.max(absDx, absDy) >= 10) {
              swipeFired = true;
              if (absDx > absDy) {
                executeMove(dx > 0 ? 'right' : 'left');
              } else {
                executeMove(dy > 0 ? 'down' : 'up');
              }
            }
          }
          isPointerDown = false;
          swipeFired = false;
        };

        const onPointerCancel = () => {
          isPointerDown = false;
          swipeFired = false;
        };

        boardWrap.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerCancel);

        // Tactile D-Pad Click Handlers (instant on touch down)
        const bindDbtn = (btn: HTMLElement, dir: Direction) => {
          btn.onpointerdown = (e) => {
            e.preventDefault();
            e.stopPropagation();
            executeMove(dir);
          };
        };
        bindDbtn(btnUp, 'up');
        bindDbtn(btnDown, 'down');
        bindDbtn(btnLeft, 'left');
        bindDbtn(btnRight, 'right');

        // Direct Keyboard Controls
        const onKeyDown = (e: KeyboardEvent) => {
          switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
              e.preventDefault();
              executeMove('up');
              break;
            case 'ArrowDown':
            case 's':
            case 'S':
              e.preventDefault();
              executeMove('down');
              break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
              e.preventDefault();
              executeMove('left');
              break;
            case 'ArrowRight':
            case 'd':
            case 'D':
              e.preventDefault();
              executeMove('right');
              break;
            case 'z':
            case 'Z':
            case 'Backspace':
              e.preventDefault();
              undoBtn.click();
              break;
          }
        };
        window.addEventListener('keydown', onKeyDown);

        return () => {
          undoBtn.onclick = null;
          boardWrap.removeEventListener('pointerdown', onPointerDown);
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('pointerup', onPointerUp);
          window.removeEventListener('pointercancel', onPointerCancel);
          window.removeEventListener('keydown', onKeyDown);
          btnUp.onpointerdown = null;
          btnDown.onpointerdown = null;
          btnLeft.onpointerdown = null;
          btnRight.onpointerdown = null;
        };
      });

      const noteText = result.solved
        ? t('ex.game2048.milestoneReached', { val: targetTile })
        : result.reason === 'locked'
          ? t('ex.game2048.boardLocked')
          : t('ex.game2048.outOfMoves');

      const ok = ctx.track(st, result.solved, {
        note: noteText,
        sound: result.solved ? 'ok' : 'none',
      });

      if (ok) {
        completedMilestones++;
        currentGrid = cleanupLowTiles(currentGrid);
        await ctx.wait(600);
      } else {
        await ctx.wait(1000);
      }
    }

    ctx.progress(1);

    // Scoring & Time Bonus Calculation
    const baseScore = st.score();
    const { score, timeBonus } = ctx.withTimeBonus(baseScore, 1.4);

    return {
      score: ctx.quick ? Math.round((completedMilestones / milestones) * 100) : score,
      detail: t('ex.game2048.detail', {
        ok: completedMilestones,
        n: milestones,
        max: highestTileAchieved,
        pts: totalScore,
      }),
      level: st.next(),
      timeBonus,
    };
  },
};
