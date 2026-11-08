import { h, shuffle, flash, pick } from '../dom';
import { sfx } from '../audio';
import { t, words, anagramWords, graphemes, wordNear } from '../i18n';
import { getRecentHistory, saveRecentHistory } from '../storage';
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

export const anagrams: Exercise = {
  id: 'anagrams',
  icon: '🔤',
  domain: 'language',
  name: 'ex.anagrams.name',
  desc: 'ex.anagrams.desc',
  why: 'ex.anagrams.why',
  example: 'ex.anagrams.example',
  minutes: [2, 3],
  levels: { min: 1, max: MAX_LEVEL, start: 2 },
  levelLabel: (l) => `${lenFor(l)} ${t('ex.anagrams.letters')}`,

  async run(ctx) {
    const trials = ctx.count(10, 6, 2);
    const st = ctx.stair(trials, 1, MAX_LEVEL);

    const status = h('div', { class: 'anagram-status' });
    const slotContainer = h('div', { class: 'anagram-slots' });
    const tileContainer = h('div', { class: 'anagram-tiles' });
    const actions = h('div', { class: 'anagram-actions' });

    ctx.stage.append(status, slotContainer, tileContainer, actions);

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

      const render = (onTileClick?: (idx: number) => void) => {
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
              onClick: () => {
                if (!isUsed && onTileClick) onTileClick(idx);
              },
            },
            char,
          );
          tileContainer.append(btn);
        });
      };

      const clearBtn = h('button', { class: 'btn' }, 'C');
      const delBtn = h('button', { class: 'btn' }, '⌫');
      const scrambleBtn = h('button', { class: 'btn anagram-scramble-btn', title: t('ex.anagrams.scramble') }, '🔀');
      actions.replaceChildren(clearBtn, delBtn, scrambleBtn);

      const typedWord = await ctx.input<string>((done) => {
        const handleTile = (idx: number) => {
          selectedIndices.push(idx);
          sfx.note(selectedIndices.length);
          render(handleTile);
          if (selectedIndices.length === letters.length) {
            const result = selectedIndices.map((k) => scrambled[k]).join('');
            done(result);
          }
        };

        clearBtn.onclick = () => {
          selectedIndices.length = 0;
          sfx.tick();
          render(handleTile);
        };

        delBtn.onclick = () => {
          selectedIndices.pop();
          sfx.tick();
          render(handleTile);
        };

        scrambleBtn.onclick = () => {
          selectedIndices.length = 0;
          sfx.whoosh();
          shuffle(scrambled);
          render(handleTile);
        };

        render(handleTile);

        return () => {
          clearBtn.onclick = null;
          delBtn.onclick = null;
          scrambleBtn.onclick = null;
        };
      });

      const ok = ctx.track(st, solutions.has(canon(typedWord)), { was: targetWord });

      if (ok) {
        correct++;
        sfx.sparkle();
        flash(slotContainer, 'good', 300);
      } else {
        flash(slotContainer, 'bad', 500);
        slotContainer.textContent = targetWord;
      }
      await ctx.wait(ok ? 400 : 1200);
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
