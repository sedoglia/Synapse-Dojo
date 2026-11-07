/**
 * Crack the Code (Deductive Safe / Padlock)
 *
 * Neuroscientific foundations:
 * 1. Deductive Reasoning & Relational Integration (Prado, Chadha, & Booth, 2011):
 *    Recruits the left-lateralized frontoparietal network (dlPFC, inferior/superior parietal lobules,
 *    and frontopolar cortex BA 10) along with the basal ganglia to systematically coordinate multiple
 *    conditional constraints and rule out impossible hypotheses.
 * 2. Working Memory & Executive Updating (Baddeley, 2000; Miyake et al., 2000):
 *    Requires dynamic maintenance and updating of candidate digit sets across multiple clues,
 *    suppressing impulsive guesses in favor of analytical deduction.
 * 3. Dopaminergic Insight / "Aha!" Moment (Tik et al., 2018; Kounios & Beeman, 2014):
 *    Sudden cognitive breakthroughs during multi-constraint problem solving trigger an acute
 *    burst in the dopaminergic reward pathway (ventral tegmental area and nucleus accumbens),
 *    yielding high intrinsic satisfaction and sustained engagement.
 * 4. Dynamic Difficulty Adjustment (Kaernbach, 1991; Wilson et al., 2019):
 *    Maintains the challenge within the optimal ~80% accuracy zone, preventing both boredom and frustration.
 */

import { h, flash } from '../dom';
import { sfx } from '../audio';
import { t } from '../i18n';
import type { Exercise } from './types';
import { burstConfetti } from '../screens/play';

/** Cryptographically secure random float in [0, 1) using crypto.getRandomValues (CWE-338 compliant) */
function secureRandom(): number {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] / (0xffffffff + 1);
}

function secureShuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(secureRandom() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function securePick<T>(arr: readonly T[]): T {
  return arr[Math.floor(secureRandom() * arr.length)];
}

export type ClueType = 'well' | 'wrong' | 'none';

export interface Clue {
  guess: number[];
  type: ClueType;
  count: number;
}

export interface Puzzle {
  solution: number[];
  clues: Clue[];
  length: number;
}

const MAX_LEVEL = 8;

export function codeLengthFor(level: number): number {
  return level >= 6 ? 4 : 3;
}

export function cluesCountFor(level: number): number {
  if (level <= 3) return 5;
  if (level <= 5) return 4;
  if (level <= 7) return 5;
  return 4;
}

/** Adaptive attempt budget based on difficulty level */
export function attemptsFor(level: number): number {
  if (level === 1) return 6;
  if (level <= 3 || level === 6) return 5;
  return 4;
}

/** Evaluates how many digits are well placed and how many are misplaced */
export function evaluateClue(solution: number[], guess: number[]): { well: number; wrong: number } {
  let well = 0;
  let wrong = 0;
  for (let i = 0; i < guess.length; i++) {
    if (solution[i] === guess[i]) {
      well++;
    } else if (solution.includes(guess[i])) {
      wrong++;
    }
  }
  return { well, wrong };
}

/** Solves the clues and returns all possible solutions (stops at 2 for fast uniqueness check) */
export function solve(clues: Clue[], length: number, maxSolutions = 2): number[][] {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const solutions: number[][] = [];

  function search(current: number[]) {
    if (solutions.length >= maxSolutions) return;
    if (current.length === length) {
      for (const clue of clues) {
        const res = evaluateClue(current, clue.guess);
        if (clue.type === 'well' && (res.well !== clue.count || res.wrong !== 0)) return;
        if (clue.type === 'wrong' && (res.well !== 0 || res.wrong !== clue.count)) return;
        if (clue.type === 'none' && (res.well !== 0 || res.wrong !== 0)) return;
      }
      solutions.push(current);
      return;
    }
    for (const d of digits) {
      if (!current.includes(d)) {
        search([...current, d]);
      }
    }
  }

  search([]);
  return solutions;
}

/** Pre-verified fallback puzzles to ensure zero latency and 100% guarantee */
const FALLBACK_PUZZLES: Record<number, Puzzle[]> = {
  1: [
    {
      solution: [5, 6, 4],
      length: 3,
      clues: [
        { guess: [1, 0, 3], type: 'none', count: 0 },
        { guess: [7, 9, 8], type: 'none', count: 0 },
        { guess: [3, 6, 4], type: 'well', count: 2 },
        { guess: [6, 3, 5], type: 'wrong', count: 2 },
        { guess: [5, 2, 8], type: 'well', count: 1 },
      ],
    },
    {
      solution: [7, 3, 9],
      length: 3,
      clues: [
        { guess: [5, 6, 8], type: 'none', count: 0 },
        { guess: [4, 2, 1], type: 'none', count: 0 },
        { guess: [2, 3, 9], type: 'well', count: 2 },
        { guess: [3, 4, 7], type: 'wrong', count: 2 },
        { guess: [7, 8, 0], type: 'well', count: 1 },
      ],
    },
  ],
  3: [
    {
      solution: [0, 4, 2],
      length: 3,
      clues: [
        { guess: [6, 8, 2], type: 'well', count: 1 },
        { guess: [6, 1, 4], type: 'wrong', count: 1 },
        { guess: [2, 0, 6], type: 'wrong', count: 2 },
        { guess: [7, 3, 8], type: 'none', count: 0 },
        { guess: [7, 8, 0], type: 'wrong', count: 1 },
      ],
    },
    {
      solution: [3, 7, 9],
      length: 3,
      clues: [
        { guess: [3, 1, 4], type: 'well', count: 1 },
        { guess: [8, 7, 2], type: 'well', count: 1 },
        { guess: [9, 5, 6], type: 'wrong', count: 1 },
        { guess: [2, 4, 8], type: 'none', count: 0 },
        { guess: [7, 9, 0], type: 'wrong', count: 2 },
      ],
    },
    {
      solution: [1, 8, 5],
      length: 3,
      clues: [
        { guess: [1, 4, 9], type: 'well', count: 1 },
        { guess: [8, 5, 2], type: 'wrong', count: 2 },
        { guess: [7, 3, 6], type: 'none', count: 0 },
        { guess: [5, 1, 8], type: 'wrong', count: 3 },
      ],
    },
  ],
  6: [
    {
      solution: [4, 1, 7, 2],
      length: 4,
      clues: [
        { guess: [4, 8, 3, 9], type: 'well', count: 1 },
        { guess: [5, 1, 6, 0], type: 'well', count: 1 },
        { guess: [7, 2, 4, 1], type: 'wrong', count: 4 },
        { guess: [9, 3, 5, 8], type: 'none', count: 0 },
        { guess: [2, 7, 0, 6], type: 'wrong', count: 2 },
      ],
    },
  ],
};

/** Generates a uniquely solvable puzzle for the specified difficulty level */
export function generatePuzzle(level: number): Puzzle {
  const length = codeLengthFor(level);
  const targetClues = cluesCountFor(level);
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Try generating dynamically
  for (let attempt = 0; attempt < 80; attempt++) {
    const solution = secureShuffle(digits).slice(0, length);
    const nonSolution = digits.filter((d) => !solution.includes(d));
    const clues: Clue[] = [];

    // Elimination clues ('none')
    const noneCount = level === 1 ? 2 : level <= 4 || level === 6 || level === 7 ? 1 : secureRandom() < 0.4 ? 1 : 0;
    let nonPool = secureShuffle(nonSolution);
    for (let nc = 0; nc < noneCount; nc++) {
      if (nonPool.length >= length) {
        clues.push({ guess: nonPool.slice(0, length), type: 'none', count: 0 });
        nonPool = nonPool.slice(length);
      }
    }

    // Generate candidate clues from combinations of solution and non-solution digits
    for (let c = 0; c < 30; c++) {
      const numSolution = secureRandom() < 0.65 ? 1 : Math.min(2, length - 1);
      const chosenSolution = secureShuffle(solution).slice(0, numSolution);
      const chosenNon = secureShuffle(nonSolution).slice(0, length - numSolution);
      const combined = secureShuffle([...chosenSolution, ...chosenNon]);

      const evalRes = evaluateClue(solution, combined);
      if (evalRes.well > 0 && evalRes.wrong === 0) {
        clues.push({ guess: combined, type: 'well', count: evalRes.well });
      } else if (evalRes.wrong > 0 && evalRes.well === 0) {
        clues.push({ guess: combined, type: 'wrong', count: evalRes.wrong });
      }

      // Check if unique solution is achieved
      const sols = solve(clues, length, 2);
      if (sols.length === 1 && sols[0].every((d, i) => d === solution[i])) {
        // Prune redundant clues while keeping uniqueness down to targetClues
        let pruned = [...clues];
        for (let i = pruned.length - 1; i >= 0; i--) {
          if (pruned.length <= targetClues) break;
          const candidatePruned = pruned.filter((_, idx) => idx !== i);
          if (solve(candidatePruned, length, 2).length === 1) {
            pruned = candidatePruned;
          }
        }
        return { solution, clues: secureShuffle(pruned), length };
      }
    }
  }

  // Fallback if random generation timed out
  const fallbackKey = level >= 6 ? 6 : level >= 3 ? 3 : 1;
  const list = FALLBACK_PUZZLES[fallbackKey] || FALLBACK_PUZZLES[1];
  const picked = securePick(list);
  return {
    solution: [...picked.solution],
    length: picked.length,
    clues: picked.clues.map((c) => ({ guess: [...c.guess], type: c.type, count: c.count })),
  };
}

export const crackTheCode: Exercise = {
  id: 'crackTheCode',
  icon: '🔓',
  domain: 'reasoning',
  name: 'ex.crackTheCode.name',
  desc: 'ex.crackTheCode.desc',
  why: 'ex.crackTheCode.why',
  example: 'ex.crackTheCode.example',
  minutes: [1, 2],
  levels: { min: 1, max: MAX_LEVEL, start: 1 },
  levelLabel: (l) => `${codeLengthFor(l)} 🔢 · ${attemptsFor(l)} 🛡️ · ${cluesCountFor(l)} 💡`,

  async run(ctx) {
    const trials = ctx.count(1, 1, 1);
    const st = ctx.stair(trials, 1, MAX_LEVEL, { target: 0.8 });
    let solvedCount = 0;

    for (let trial = 0; trial < trials; trial++) {
      ctx.progress(trial / trials, `${trial + 1}/${trials}`);
      ctx.stage.replaceChildren();

      const lvl = ctx.practice ? 1 : st.int;
      const puzzle = generatePuzzle(lvl);
      const codeLen = puzzle.length;

      // Scratchpad state for digits 0-9: 0 = neutral, 1 = eliminated, 2 = confirmed
      const digitState: number[] = new Array(10).fill(0);
      // Dimmed state for clues (user can mark completed clues)
      const clueDimmed: boolean[] = new Array(puzzle.clues.length).fill(false);

      // Current dial values for player's guess
      const dialValues: number[] = new Array(codeLen).fill(0);
      let focusedDial = 0;
      let triesLeft = ctx.practice ? 99 : attemptsFor(lvl);

      // Build Safe / Padlock UI
      ctx.stage.className = 'stage stage-crack-the-code';

      // 1. Padlock Header & Shackle
      const shackle = h('div', { class: 'ctc-shackle' });
      const lockBody = h('div', { class: 'ctc-lock-body' });
      const lockWrap = h('div', { class: 'ctc-lock-wrap' }, shackle, lockBody);

      // Dial elements
      const dialDisplays: HTMLElement[] = [];
      const dialColumns: HTMLElement[] = [];

      for (let i = 0; i < codeLen; i++) {
        const valEl = h('div', { class: 'ctc-dial-val' }, String(dialValues[i]));
        dialDisplays.push(valEl);

        const btnUp = h(
          'button',
          {
            type: 'button',
            class: 'ctc-dial-btn up',
            'aria-label': 'Increase digit',
            onclick: (e: MouseEvent) => {
              e.stopPropagation();
              setDial(i, (dialValues[i] + 1) % 10);
            },
          },
          '▲',
        );

        const btnDown = h(
          'button',
          {
            type: 'button',
            class: 'ctc-dial-btn down',
            'aria-label': 'Decrease digit',
            onclick: (e: MouseEvent) => {
              e.stopPropagation();
              setDial(i, (dialValues[i] + 9) % 10);
            },
          },
          '▼',
        );

        const dialCol = h(
          'div',
          {
            class: `ctc-dial-col ${i === focusedDial ? 'focused' : ''}`,
            tabIndex: 0,
            onclick: () => {
              setFocused(i);
              setDial(i, (dialValues[i] + 1) % 10);
            },
          },
          btnUp,
          valEl,
          btnDown,
        );
        dialColumns.push(dialCol);
      }

      const dialsRow = h('div', { class: 'ctc-dials-row' }, ...dialColumns);

      // Tries indicator
      const triesEl = h('div', { class: 'ctc-tries-badge' }, t('ex.crackTheCode.attempts', { n: triesLeft }));

      // Unlock button
      let onUnlockAttempt: (() => void) | null = null;
      const unlockBtn = h(
        'button',
        {
          type: 'button',
          class: 'btn primary big ctc-unlock-btn',
          onclick: () => onUnlockAttempt?.(),
        },
        `🔓 ${t('ex.crackTheCode.unlock')}`,
      );

      lockBody.append(dialsRow, triesEl, unlockBtn);

      // 2. Clues List
      const clueRows: HTMLElement[] = [];
      const clueDigitEls: HTMLElement[][] = [];

      puzzle.clues.forEach((clue, clueIdx) => {
        const digitsEl = h('div', { class: 'ctc-clue-digits' });
        const digitRowEls: HTMLElement[] = [];

        clue.guess.forEach((d) => {
          const dSpan = h(
            'span',
            {
              class: 'ctc-clue-digit',
              title: t('ex.crackTheCode.scratchpadHint'),
              onclick: (e: MouseEvent) => {
                e.stopPropagation();
                toggleDigit(d);
              },
            },
            String(d),
          );
          digitRowEls.push(dSpan);
          digitsEl.append(dSpan);
        });
        clueDigitEls.push(digitRowEls);

        // Clue badge description text
        let clueText = '';
        let badgeKind = '';
        if (clue.type === 'none') {
          clueText = t('ex.crackTheCode.clueNone');
          badgeKind = 'badge-none';
        } else if (clue.type === 'well') {
          clueText = clue.count === 1 ? t('ex.crackTheCode.clueWellOne') : t('ex.crackTheCode.clueWellMulti', { n: clue.count });
          badgeKind = 'badge-well';
        } else {
          clueText = clue.count === 1 ? t('ex.crackTheCode.clueWrongOne') : t('ex.crackTheCode.clueWrongMulti', { n: clue.count });
          badgeKind = 'badge-wrong';
        }

        const badge = h('span', { class: `ctc-clue-badge ${badgeKind}` }, clueText);
        const checkIcon = h('span', { class: 'ctc-clue-check' }, '✓');

        const clueRow = h(
          'div',
          {
            class: 'ctc-clue-card',
            onclick: () => {
              clueDimmed[clueIdx] = !clueDimmed[clueIdx];
              sfx.tick();
              updateClueViews();
            },
          },
          digitsEl,
          badge,
          checkIcon,
        );
        clueRows.push(clueRow);
      });

      const cluesList = h('div', { class: 'ctc-clues-list' }, ...clueRows);

      // 3. Scratchpad Bar (0 to 9)
      const scratchChips: HTMLElement[] = [];
      for (let d = 0; d <= 9; d++) {
        const chip = h(
          'button',
          {
            type: 'button',
            class: 'ctc-scratch-chip',
            title: t('ex.crackTheCode.scratchpadHint'),
            onclick: () => toggleDigit(d),
          },
          String(d),
        );
        scratchChips.push(chip);
      }

      const scratchBar = h(
        'div',
        { class: 'ctc-scratch-wrap' },
        h(
          'div',
          { class: 'ctc-scratch-header' },
          h('span', { class: 'ctc-scratch-label' }, `📝 ${t('ex.crackTheCode.scratchpad')}`),
          h('span', { class: 'ctc-scratch-hint' }, `· ${t('ex.crackTheCode.scratchpadHint')}`),
        ),
        h('div', { class: 'ctc-scratch-bar' }, ...scratchChips),
      );

      const ruleBanner = h('div', { class: 'ctc-rule-banner' }, `💡 ${t('ex.crackTheCode.rule')}`);

      // Append all sections into the stage
      ctx.stage.append(lockWrap, ruleBanner, cluesList, scratchBar);

      // Helper UI functions
      function setDial(index: number, val: number) {
        dialValues[index] = val;
        dialDisplays[index].textContent = String(val);
        flash(dialDisplays[index], 'pop', 120);
        sfx.tick();
      }

      function setFocused(index: number) {
        focusedDial = index;
        dialColumns.forEach((col, i) => col.classList.toggle('focused', i === index));
      }

      function toggleDigit(d: number) {
        // Cycle: 0 (neutral) -> 1 (eliminated) -> 2 (confirmed) -> 0
        digitState[d] = (digitState[d] + 1) % 3;
        if (digitState[d] === 1) sfx.bad();
        else if (digitState[d] === 2) sfx.ok(1);
        else sfx.tick();
        updateScratchpadViews();
        updateClueViews();
      }

      function updateScratchpadViews() {
        scratchChips.forEach((chip, d) => {
          chip.classList.toggle('eliminated', digitState[d] === 1);
          chip.classList.toggle('confirmed', digitState[d] === 2);
        });
      }

      function updateClueViews() {
        clueRows.forEach((row, idx) => {
          row.classList.toggle('dimmed', clueDimmed[idx]);
        });
        clueDigitEls.forEach((rowEls, clueIdx) => {
          const guess = puzzle.clues[clueIdx].guess;
          rowEls.forEach((el, i) => {
            const d = guess[i];
            el.classList.toggle('eliminated', digitState[d] === 1);
            el.classList.toggle('confirmed', digitState[d] === 2);
          });
        });
      }

      // Initial view refresh
      updateScratchpadViews();
      updateClueViews();

      if (ctx.practice) {
        ctx.hint(t('ex.crackTheCode.scratchpadHint'));
      }

      // Wait for player to crack the code or run out of attempts
      const solved = await ctx.input<boolean>((done) => {
        let isDone = false;

        onUnlockAttempt = () => {
          if (isDone) return;

          // Check if current dials match solution
          const isCorrect = dialValues.every((v, i) => v === puzzle.solution[i]);

          if (isCorrect) {
            isDone = true;
            shackle.classList.add('unlocked');
            unlockBtn.textContent = `🔓 ${t('ex.crackTheCode.unlocked')}`;
            burstConfetti(ctx.stage);
            sfx.clack();
            setTimeout(() => sfx.sparkle(), 180);
            done(true);
          } else {
            triesLeft--;
            triesEl.textContent = t('ex.crackTheCode.attempts', { n: triesLeft });
            unlockBtn.textContent = `❌ ${t('ex.crackTheCode.wrongCode')}`;
            flash(lockBody, 'bad', 400);
            sfx.bad();

            if (triesLeft <= 0) {
              isDone = true;
              // Reveal the correct code in dials
              puzzle.solution.forEach((v, i) => setDial(i, v));
              done(false);
            } else {
              setTimeout(() => {
                if (!isDone) {
                  unlockBtn.textContent = `🔓 ${t('ex.crackTheCode.unlock')}`;
                }
              }, 700);
            }
          }
        };

        // Keyboard navigation
        const onKeyDown = (e: KeyboardEvent) => {
          if (isDone) return;
          if (e.key >= '0' && e.key <= '9') {
            setDial(focusedDial, Number(e.key));
            setFocused((focusedDial + 1) % codeLen);
          } else if (e.key === 'ArrowLeft') {
            setFocused((focusedDial + codeLen - 1) % codeLen);
          } else if (e.key === 'ArrowRight') {
            setFocused((focusedDial + 1) % codeLen);
          } else if (e.key === 'ArrowUp') {
            setDial(focusedDial, (dialValues[focusedDial] + 1) % 10);
          } else if (e.key === 'ArrowDown') {
            setDial(focusedDial, (dialValues[focusedDial] + 9) % 10);
          } else if (e.key === 'Enter') {
            onUnlockAttempt?.();
          } else if (e.key === 'Backspace') {
            setDial(focusedDial, 0);
            setFocused((focusedDial + codeLen - 1) % codeLen);
          }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
          onUnlockAttempt = null;
          window.removeEventListener('keydown', onKeyDown);
        };
      });

      const ok = ctx.track(st, solved, {
        was: solved ? undefined : puzzle.solution.join(' '),
      });

      if (ok) {
        solvedCount++;
        flash(lockBody, 'good', 500);
        await ctx.wait(800);
      } else {
        flash(lockBody, 'bad', 500);
        await ctx.wait(1200);
      }
    }

    ctx.progress(1);
    const { score, timeBonus } = ctx.withTimeBonus(st.score(), 25);
    const detail = t('ex.crackTheCode.detail', { ok: solvedCount, n: trials, lvl: st.int });

    return {
      score,
      detail,
      level: st.next(),
      timeBonus,
    };
  },
};
