import { h, shuffle, flash, pick } from '../dom';
import { sfx } from '../audio';
import { t, num, words, anagramWords, graphemes, wordNear } from '../i18n';
import { getRecentHistory, saveRecentHistory } from '../storage';
import { timeBar } from '../widgets';
import { canon, isPlayable, scramble, solutionsOf } from './anagramRules';
import type { Exercise } from './types';

const MAX_LEVEL = 5;
const RECENT_KEY = 'synapse_anagrams_recent_words';
const MAX_RECENT_MEMORY = 40;

/**
 * Word length for a level. Each language spreads over the levels the lengths it has enough words for: 4 to 8 letters in
 * most languages, shorter elsewhere (Arabic 3–6, Japanese 2–5, Chinese and Hindi 2–4, where some levels share a length).
 */
function lenFor(level: number): number {
  const lengths = [...new Set(words().map((w) => graphemes(w).length))].filter((n) => n >= 2 && n <= 8).sort((a, b) => a - b);
  const counted = lengths.filter((n) => words().filter((w) => graphemes(w).length === n).length >= 5);
  const usable = counted.length ? counted : lengths;
  const i = Math.round(((Math.round(level) - 1) / (MAX_LEVEL - 1)) * (usable.length - 1));
  return usable[i];
}

/**
 * Time limit per trial in milliseconds, calibrated to word length.
 * Shorter words give ~16–19s; longer words (7–8 letters) give 28–30s to allow mental
 * manipulation and hypothesis testing before reaching an impasse.
 */
function limitFor(level: number): number {
  const len = lenFor(level);
  return (8 + Math.round(len * 2.8)) * 1000;
}

export const anagrams: Exercise = {
  id: 'anagrams',
  icon: '🔤',
  domain: 'language',
  name: 'ex.anagrams.name',
  desc: 'ex.anagrams.desc',
  how: 'ex.anagrams.how',
  why: 'ex.anagrams.why',
  example: 'ex.anagrams.example',
  minutes: [1.5, 2.5],
  levels: { min: 1, max: MAX_LEVEL, start: 2 },
  levelLabel: (l) => `${lenFor(l)} ${t('ex.anagrams.letters')} • ${num(limitFor(l) / 1000, 0)} s`,

  async run(ctx) {
    const trials = ctx.count(8, 6, 2);
    const st = ctx.stair(trials, 1, MAX_LEVEL);

    const status = h('div', { class: 'anagram-status' });
    const bar = timeBar('anagram-timer');
    bar.el.classList.toggle('off', ctx.practice);
    const slotContainer = h('div', { class: 'anagram-slots' });
    const tileContainer = h('div', { class: 'anagram-tiles' });
    const actions = h('div', { class: 'anagram-actions' });

    ctx.stage.append(status, bar.el, slotContainer, tileContainer, actions);

    const solutions = solutionsOf(words(), anagramWords());
    const puzzles = words().filter((w) => isPlayable(w, solutions, graphemes));
    const usedInSession = new Set<string>();
    let correct = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      const targetLen = lenFor(st.level);
      const recentWords = new Set(getRecentHistory(RECENT_KEY));

      // Find words matching desired length, prioritizing unplayed words across recent sessions
      const dist = (w: string) => Math.abs(graphemes(w).length - targetLen);
      const bestDist = Math.min(...puzzles.map(dist));
      const pool = puzzles.filter((w) => dist(w) === bestDist);

      let candidates = pool.filter((w) => !usedInSession.has(w.toUpperCase()) && !recentWords.has(w.toUpperCase()));
      if (!candidates.length) {
        // If all words of this length were recently played, recycle within session constraints
        candidates = pool.filter((w) => !usedInSession.has(w.toUpperCase()));
      }
      const chosen = candidates.length ? pick(candidates) : (pool.length ? pick(pool) : wordNear(puzzles, targetLen));
      const targetWord = chosen.toUpperCase();
      usedInSession.add(targetWord);
      saveRecentHistory(RECENT_KEY, targetWord, MAX_RECENT_MEMORY);

      const letters = graphemes(targetWord);
      const scrambled = scramble(targetWord, solutions, graphemes, shuffle);

      status.textContent = t('ex.anagrams.hint');

      const selectedIndices: number[] = [];
      let isChecking = false;
      let checkTimer: ReturnType<typeof setTimeout> | null = null;

      const clearBtn = h('button', { class: 'btn' }, 'C');
      const delBtn = h('button', { class: 'btn' }, '⌫');
      const scrambleBtn = h('button', { class: 'btn anagram-scramble-btn', title: t('ex.anagrams.scramble') }, '🔀');
      actions.replaceChildren(clearBtn, delBtn, scrambleBtn);

      const limit = (ctx.practice ? 60_000 : limitFor(st.level)) * ctx.pace;
      bar.start(limit);

      const typedWord = await ctx.timed<string | null>(limit, null, (done) => {
        const render = () => {
          // Render slots
          slotContainer.replaceChildren();
          for (let s = 0; s < letters.length; s++) {
            const char = selectedIndices[s] !== undefined ? scrambled[selectedIndices[s]] : '';
            const slot = h('div', { class: `anagram-slot ${char ? 'filled' : ''}` }, char);
            slotContainer.append(slot);
          }

          // Render tiles
          tileContainer.replaceChildren();
          scrambled.forEach((char, idx) => {
            const isUsed = selectedIndices.includes(idx);
            const btn = h(
              'button',
              {
                class: `btn anagram-tile ${isUsed ? 'used' : ''}`,
                disabled: isUsed || isChecking,
                onClick: () => {
                  if (!isUsed && !isChecking) handleTile(idx);
                },
              },
              char,
            );
            tileContainer.append(btn);
          });
        };

        const handleTile = (idx: number) => {
          selectedIndices.push(idx);
          sfx.note(selectedIndices.length);
          render();

          if (selectedIndices.length === letters.length) {
            const candidate = selectedIndices.map((k) => scrambled[k]).join('');
            if (solutions.has(canon(candidate))) {
              done(candidate);
            } else {
              // Hypothesis testing: an invalid attempt does not instantly abort the trial.
              // It provides tactile feedback and resets letters so player can keep searching within time.
              isChecking = true;
              flash(slotContainer, 'bad', 400);
              sfx.bad();
              checkTimer = setTimeout(() => {
                selectedIndices.length = 0;
                isChecking = false;
                render();
              }, 400);
            }
          }
        };

        clearBtn.onclick = () => {
          if (isChecking || selectedIndices.length === 0) return;
          selectedIndices.length = 0;
          sfx.tick();
          render();
        };

        delBtn.onclick = () => {
          if (isChecking || selectedIndices.length === 0) return;
          selectedIndices.pop();
          sfx.tick();
          render();
        };

        // `shuffle` returns a new array, so the tiles are replaced in place; the new order is never a right answer
        // and, when the letters allow it, never the order already on screen.
        const reshuffle = () => {
          selectedIndices.length = 0;
          sfx.whoosh();
          const before = scrambled.join('');
          let next = scramble(targetWord, solutions, graphemes, shuffle);
          for (let tries = 0; next.join('') === before && tries < 8; tries++) next = scramble(targetWord, solutions, graphemes, shuffle);
          scrambled.splice(0, scrambled.length, ...next);
          flash(tileContainer, 'pop', 200);
          render();
        };

        scrambleBtn.onclick = () => {
          if (isChecking) return;
          reshuffle();
        };

        const handleKey = (e: KeyboardEvent) => {
          if (isChecking) return;
          if (e.key === 'Backspace') {
            e.preventDefault();
            if (selectedIndices.length > 0) {
              selectedIndices.pop();
              sfx.tick();
              render();
            }
          } else if (e.key === 'Escape' || e.key === 'Delete') {
            e.preventDefault();
            if (selectedIndices.length > 0) {
              selectedIndices.length = 0;
              sfx.tick();
              render();
            }
          } else if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            reshuffle();
          } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const pressed = canon(e.key);
            const tileIdx = scrambled.findIndex(
              (char, idx) => !selectedIndices.includes(idx) && canon(char) === pressed,
            );
            if (tileIdx !== -1) {
              e.preventDefault();
              handleTile(tileIdx);
            }
          }
        };

        window.addEventListener('keydown', handleKey);
        render();

        return () => {
          if (checkTimer) clearTimeout(checkTimer);
          window.removeEventListener('keydown', handleKey);
          clearBtn.onclick = null;
          delBtn.onclick = null;
          scrambleBtn.onclick = null;
        };
      });

      bar.stop();

      const isSolved = typedWord !== null && solutions.has(canon(typedWord));
      const ok = ctx.track(st, isSolved, {
        was: targetWord,
        note: typedWord === null ? t('common.timeout') : undefined,
      });

      if (ok) {
        correct++;
        sfx.sparkle();
        flash(slotContainer, 'good', 350);
      } else {
        flash(slotContainer, 'bad', 500);
        slotContainer.replaceChildren(
          ...graphemes(targetWord).map((ch) => h('div', { class: 'anagram-slot filled revealed' }, ch)),
        );
      }
      await ctx.wait(ok ? 400 : 1300);
    }
    ctx.progress(1);

    const { score, timeBonus } = ctx.withTimeBonus(st.score(), 1 + lenFor(st.threshold()));
    return {
      score,
      detail: t('ex.anagrams.detail', { ok: correct, n: trials }),
      level: st.next(),
      timeBonus,
    };
  },
};
