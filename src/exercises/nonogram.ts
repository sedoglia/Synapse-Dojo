import { h, flash, pick } from '../dom';
import { t } from '../i18n';
import { sfx } from '../audio';
import type { Exercise } from './types';
import { NONOGRAM_PUZZLES, parsePuzzleGrid, type NonogramPuzzle } from './nonogramPuzzles';

type CellState = 0 | 1 | 2; // 0 = empty, 1 = filled, 2 = crossed
type InputMode = 'fill' | 'cross';

interface HistoryStep {
  board: CellState[][];
}

const gridSizeFor = (level: number): number => {
  if (level <= 1) return 4;
  if (level <= 4) return 5;
  if (level <= 6) return 6;
  return 7;
};

export const nonogram: Exercise = {
  id: 'nonogram',
  icon: '🖼️',
  domain: 'spatial',
  name: 'ex.nonogram.name',
  desc: 'ex.nonogram.desc',
  why: 'ex.nonogram.why',
  example: 'ex.nonogram.example',
  minutes: [1, 2],
  levels: { min: 1, max: 8, start: 2 },
  levelLabel: (l) => `${gridSizeFor(l)}×${gridSizeFor(l)}`,

  async run(ctx) {
    const trials = ctx.count(2, 1, 1);
    const st = ctx.stair(trials, 1, 8, { target: 0.75 });
    const usedPuzzleIds = new Set<string>();
    let correct = 0;

    for (let trial = 0; trial < trials; trial++) {
      ctx.progress(trial / trials, `${trial + 1}/${trials}`);

      // Pick a puzzle matching current level
      const currentLevel = ctx.practice ? 1 : st.int;
      const candidates = NONOGRAM_PUZZLES.filter(
        (p) => p.level === currentLevel && !usedPuzzleIds.has(p.id),
      );
      const puzzle: NonogramPuzzle = candidates.length
        ? pick(candidates)
        : pick(NONOGRAM_PUZZLES.filter((p) => p.level === currentLevel));
      usedPuzzleIds.add(puzzle.id);

      const { binary: target, rows: rowClues, cols: colClues, size } = parsePuzzleGrid(puzzle.grid);

      // Initialize player board: 0 = empty, 1 = filled, 2 = crossed
      let board: CellState[][] = Array.from({ length: size }, () => new Array(size).fill(0));
      const history: HistoryStep[] = [];
      let hintsUsed = 0;
      let mode: InputMode = 'fill';
      let solved = false;

      // Container elements
      const stage = ctx.stage;
      stage.replaceChildren();

      // UI: Top status / action bar
      const infoBadge = h('div', { class: 'nonogram-badge' }, `${size}×${size} · ${puzzle.icon}`);
      const undoBtn = h('button', { class: 'btn ghost small nonogram-tool-btn', disabled: true, title: t('ex.nonogram.undo') }, '↩');
      const resetBtn = h('button', { class: 'btn ghost small nonogram-tool-btn', title: t('ex.nonogram.clear') }, '↺');
      const hintBtn = h('button', { class: 'btn ghost small nonogram-tool-btn', title: t('ex.nonogram.hint') }, '💡');
      const checkBtn = h('button', { class: 'btn primary small nonogram-tool-btn' }, t('ex.nonogram.check'));

      const actionsRow = h('div', { class: 'nonogram-actions' }, undoBtn, resetBtn, hintBtn, checkBtn);
      const headerBar = h('div', { class: 'nonogram-header' }, infoBadge, actionsRow);

      // UI: Mode toggle pill (Fill vs Cross)
      const fillModeBtn = h('button', { class: 'btn small nonogram-toggle-btn active' }, `■ ${t('ex.nonogram.fill')}`);
      const crossModeBtn = h('button', { class: 'btn small nonogram-toggle-btn' }, `✕ ${t('ex.nonogram.cross')}`);
      const modePill = h('div', { class: 'nonogram-mode-pill' }, fillModeBtn, crossModeBtn);

      fillModeBtn.onclick = () => {
        mode = 'fill';
        fillModeBtn.classList.add('active');
        crossModeBtn.classList.remove('active');
      };
      crossModeBtn.onclick = () => {
        mode = 'cross';
        crossModeBtn.classList.add('active');
        fillModeBtn.classList.remove('active');
      };

      // Board Grid Elements
      const boardEl = h('div', { class: `nonogram-board size-${size}` });
      const revealBanner = h('div', { class: 'nonogram-reveal-banner hidden' });

      stage.append(headerBar, modePill, boardEl, revealBanner);

      const rowClueEls: HTMLElement[] = [];
      const colClueEls: HTMLElement[] = [];
      const cellEls: HTMLElement[][] = Array.from({ length: size }, () => []);

      // Top row: spacer corner + column clues
      const corner = h('div', { class: 'nonogram-corner' });
      const colHeadersRow = h('div', { class: 'nonogram-cols-header' });

      for (let c = 0; c < size; c++) {
        const colEl = h(
          'div',
          { class: 'nonogram-col-clue' },
          ...colClues[c].map((n) => h('span', { class: 'clue-num' }, String(n))),
        );
        colClueEls.push(colEl);
        colHeadersRow.append(colEl);
      }

      const gridTopRow = h('div', { class: 'nonogram-grid-top' }, corner, colHeadersRow);
      const gridBody = h('div', { class: 'nonogram-grid-body' });

      boardEl.append(gridTopRow, gridBody);

      // Construct rows and cells
      for (let r = 0; r < size; r++) {
        const rowEl = h('div', { class: 'nonogram-grid-row' });
        const rowClueEl = h(
          'div',
          { class: 'nonogram-row-clue' },
          ...rowClues[r].map((n) => h('span', { class: 'clue-num' }, String(n))),
        );
        rowClueEls.push(rowClueEl);
        rowEl.append(rowClueEl);

        for (let c = 0; c < size; c++) {
          const cell = h('button', {
            class: 'nonogram-cell',
            type: 'button',
            'data-r': String(r),
            'data-c': String(c),
            'aria-label': `R${r + 1} C${c + 1}`,
          });
          cellEls[r].push(cell);
          rowEl.append(cell);
        }
        gridBody.append(rowEl);
      }

      // Check whether a line's filled runs match its clue
      const checkLineSatisfied = (line: number[], clue: number[]): boolean => {
        const currentRuns: number[] = [];
        let run = 0;
        for (const cell of line) {
          if (cell === 1) {
            run++;
          } else if (run > 0) {
            currentRuns.push(run);
            run = 0;
          }
        }
        if (run > 0) currentRuns.push(run);
        return (
          (currentRuns.length === 0 && clue.length === 1 && clue[0] === 0) ||
          (currentRuns.length === clue.length && currentRuns.every((v, i) => v === clue[i]))
        );
      };

      // Check clue satisfaction for styling feedback
      const updateClueIndicators = () => {
        for (let r = 0; r < size; r++) {
          rowClueEls[r].classList.toggle('satisfied', checkLineSatisfied(board[r], rowClues[r]));
        }
        for (let c = 0; c < size; c++) {
          const col: number[] = [];
          for (let r = 0; r < size; r++) col.push(board[r][c]);
          colClueEls[c].classList.toggle('satisfied', checkLineSatisfied(col, colClues[c]));
        }
      };

      const renderBoardState = () => {
        for (let r = 0; r < size; r++) {
          for (let c = 0; c < size; c++) {
            const val = board[r][c];
            const el = cellEls[r][c];
            el.className = 'nonogram-cell';
            if (val === 1) {
              el.classList.add('filled');
              el.textContent = '';
            } else if (val === 2) {
              el.classList.add('crossed');
              el.textContent = '✕';
            } else {
              el.textContent = '';
            }
          }
        }
        undoBtn.disabled = history.length === 0;
        updateClueIndicators();
      };

      const pushHistory = () => {
        history.push({
          board: board.map((row) => [...row]),
        });
        if (history.length > 50) history.shift();
        undoBtn.disabled = false;
      };

      const areAllCluesSatisfied = (): boolean => {
        for (let r = 0; r < size; r++) {
          if (!checkLineSatisfied(board[r], rowClues[r])) return false;
        }
        for (let c = 0; c < size; c++) {
          const col: number[] = [];
          for (let r = 0; r < size; r++) col.push(board[r][c]);
          if (!checkLineSatisfied(col, colClues[c])) return false;
        }
        return true;
      };

      const isTargetMatch = (): boolean => {
        for (let r = 0; r < size; r++) {
          for (let c = 0; c < size; c++) {
            const isFilled = board[r][c] === 1;
            const shouldBeFilled = target[r][c] === 1;
            if (isFilled !== shouldBeFilled) return false;
          }
        }
        return true;
      };

      const isCompletedCorrectly = (): boolean => isTargetMatch() || areAllCluesSatisfied();

      // Main interaction loop
      const result = await ctx.input<boolean>((done) => {
        let isPointerDown = false;
        let dragAction: CellState = 0;
        let lastTouchedCell = '';

        const applyToCell = (r: number, c: number) => {
          const key = `${r},${c}`;
          if (lastTouchedCell === key) return;
          lastTouchedCell = key;

          if (board[r][c] !== dragAction) {
            board[r][c] = dragAction;
            if (dragAction === 1) sfx.clack();
            else if (dragAction === 2) sfx.whoosh();
            else sfx.tick();
            renderBoardState();

            if (isCompletedCorrectly()) {
              triggerVictory();
            }
          }
        };

        const handlePointerDown = (r: number, c: number, button: number) => {
          if (solved) return;
          pushHistory();
          isPointerDown = true;
          lastTouchedCell = '';

          // Right click = toggle cross; Left click = uses active mode
          if (button === 2) {
            dragAction = board[r][c] === 2 ? 0 : 2;
          } else {
            if (mode === 'fill') {
              dragAction = board[r][c] === 1 ? 0 : 1;
            } else {
              dragAction = board[r][c] === 2 ? 0 : 2;
            }
          }

          applyToCell(r, c);
        };

        const handlePointerEnter = (r: number, c: number) => {
          if (!isPointerDown || solved) return;
          applyToCell(r, c);
        };

        const handleGlobalPointerMove = (e: PointerEvent) => {
          if (!isPointerDown || solved) return;
          if (e.pointerType === 'touch') {
            const targetEl = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
            if (targetEl && targetEl.classList.contains('nonogram-cell')) {
              const r = Number(targetEl.dataset.r);
              const c = Number(targetEl.dataset.c);
              if (!Number.isNaN(r) && !Number.isNaN(c)) {
                applyToCell(r, c);
              }
            }
          }
        };

        const handlePointerEnd = () => {
          if (!isPointerDown) return;
          isPointerDown = false;
          lastTouchedCell = '';

          if (isCompletedCorrectly()) {
            triggerVictory();
          }
        };

        const triggerVictory = async () => {
          if (solved) return;
          solved = true;

          // Play triumph sounds
          sfx.sparkle();
          setTimeout(() => sfx.fanfare(), 250);

          // Animate board into clean revealed picture
          boardEl.classList.add('solved');
          for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
              const el = cellEls[r][c];
              if (board[r][c] === 1) {
                el.classList.add('revealed-block');
              } else {
                el.classList.add('revealed-empty');
                el.textContent = '';
              }
            }
          }

          revealBanner.classList.remove('hidden');
          revealBanner.replaceChildren(
            h('div', { class: 'reveal-icon' }, puzzle.icon),
            h('div', { class: 'reveal-title' }, t('ex.nonogram.solved', { name: puzzle.name })),
          );
          flash(revealBanner, 'pop', 500);

          await ctx.wait(1400);
          done(true);
        };

        // Wire cell event handlers
        for (let r = 0; r < size; r++) {
          for (let c = 0; c < size; c++) {
            const cell = cellEls[r][c];
            cell.onpointerdown = (e) => {
              e.preventDefault();
              handlePointerDown(r, c, e.button);
            };
            cell.onpointerenter = () => {
              handlePointerEnter(r, c);
            };
            cell.oncontextmenu = (e) => {
              e.preventDefault();
            };
          }
        }

        window.addEventListener('pointermove', handleGlobalPointerMove);
        window.addEventListener('pointerup', handlePointerEnd);
        window.addEventListener('pointercancel', handlePointerEnd);

        // Tool buttons
        undoBtn.onclick = () => {
          if (history.length === 0 || solved) return;
          const step = history.pop()!;
          board = step.board;
          sfx.clack();
          renderBoardState();
        };

        resetBtn.onclick = () => {
          if (solved) return;
          pushHistory();
          board = Array.from({ length: size }, () => new Array(size).fill(0));
          sfx.whoosh();
          renderBoardState();
        };

        hintBtn.onclick = () => {
          if (solved || hintsUsed >= 2) return;
          // Find first cell that differs from target
          let targetR = -1;
          let targetC = -1;
          for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
              const isFilled = board[r][c] === 1;
              const shouldBeFilled = target[r][c] === 1;
              if (isFilled !== shouldBeFilled) {
                targetR = r;
                targetC = c;
                break;
              }
            }
            if (targetR !== -1) break;
          }

          if (targetR !== -1) {
            pushHistory();
            hintsUsed++;
            board[targetR][targetC] = target[targetR][targetC] === 1 ? 1 : 2;
            sfx.zen();
            flash(cellEls[targetR][targetC], 'hint-pop', 600);
            renderBoardState();
            ctx.hint(t('ex.nonogram.hint'));

            if (isCompletedCorrectly()) {
              triggerVictory();
            }
          }
        };

        checkBtn.onclick = () => {
          if (solved) return;
          if (isCompletedCorrectly()) {
            triggerVictory();
          } else {
            // Check if there are cells filled where target is empty
            let wrongFills = 0;
            for (let r = 0; r < size; r++) {
              for (let c = 0; c < size; c++) {
                if (board[r][c] === 1 && target[r][c] === 0) {
                  wrongFills++;
                  flash(cellEls[r][c], 'bad', 400);
                }
              }
            }

            if (wrongFills > 0) {
              sfx.bad();
              for (let r = 0; r < size; r++) {
                let rowMistake = false;
                for (let c = 0; c < size; c++) {
                  if (board[r][c] === 1 && target[r][c] === 0) rowMistake = true;
                }
                if (rowMistake) flash(rowClueEls[r], 'bad', 400);
              }
              for (let c = 0; c < size; c++) {
                let colMistake = false;
                for (let r = 0; r < size; r++) {
                  if (board[r][c] === 1 && target[r][c] === 0) colMistake = true;
                }
                if (colMistake) flash(colClueEls[c], 'bad', 400);
              }
              ctx.hint(t('ex.nonogram.mistakes', { n: wrongFills }));
            } else {
              // Work so far has 0 wrong filled cells!
              sfx.tick();
              ctx.hint(t('ex.nonogram.okSoFar'));
            }
          }
        };

        renderBoardState();

        return () => {
          window.removeEventListener('pointermove', handleGlobalPointerMove);
          window.removeEventListener('pointerup', handlePointerEnd);
          window.removeEventListener('pointercancel', handlePointerEnd);
        };
      });

      const passed = ctx.track(st, result);
      if (passed) correct++;
      await ctx.wait(300);
    }

    ctx.progress(1);
    const benchmarkSecs = 18 + st.threshold() * 6;
    const { score, timeBonus } = ctx.withTimeBonus(st.score(), benchmarkSecs);

    return {
      score,
      detail: t('ex.nonogram.detail', { ok: correct, n: trials }),
      level: st.next(),
      timeBonus,
    };
  },
};
