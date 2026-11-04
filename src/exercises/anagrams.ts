import { h, shuffle, flash } from '../dom';
import { t, words, anagramWords, graphemes, wordNear } from '../i18n';
import { Staircase } from '../adaptive';
import { canon, isPlayable, scramble, solutionsOf } from './anagramRules';
import type { Exercise } from './types';

const lenFor = (level: number) => Math.min(8, 3 + Math.floor(level * 0.6));

export const anagrams: Exercise = {
  id: 'anagrams',
  icon: '🔤',
  domain: 'language',
  name: 'ex.anagrams.name',
  desc: 'ex.anagrams.desc',
  why: 'ex.anagrams.why',
  example: 'ex.anagrams.example',
  minutes: 2.5,
  levels: { min: 1, max: 8, start: 2 },
  levelLabel: (l) => `${lenFor(l)} ${t('ex.anagrams.letters')}`,

  async run(ctx) {
    const trials = ctx.count(8, 6, 2);
    const st = new Staircase(ctx.level, 1, 8);

    const status = h('div', { class: 'anagram-status' });
    const slotContainer = h('div', { class: 'anagram-slots' });
    const tileContainer = h('div', { class: 'anagram-tiles' });
    const actions = h('div', { class: 'anagram-actions' });

    ctx.stage.append(status, slotContainer, tileContainer, actions);

    const solutions = solutionsOf(words(), anagramWords());
    const puzzles = words().filter((w) => isPlayable(w, solutions, graphemes));
    let correct = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      const targetLen = lenFor(st.level);

      // Find words matching desired length
      // Lengths are counted in letters as readers see them (see `graphemes`); languages with short words,
      // such as Chinese, get the closest length available.
      const targetWord = wordNear(puzzles, targetLen).toUpperCase();

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
      actions.replaceChildren(clearBtn, delBtn);

      const typedWord = await ctx.input<string>((done) => {
        const handleTile = (idx: number) => {
          selectedIndices.push(idx);
          render(handleTile);
          if (selectedIndices.length === letters.length) {
            const result = selectedIndices.map((k) => scrambled[k]).join('');
            done(result);
          }
        };

        clearBtn.onclick = () => {
          selectedIndices.length = 0;
          render(handleTile);
        };

        delBtn.onclick = () => {
          selectedIndices.pop();
          render(handleTile);
        };

        render(handleTile);

        return () => {
          clearBtn.onclick = null;
          delBtn.onclick = null;
        };
      });

      const ok = ctx.track(st, solutions.has(canon(typedWord)), { was: targetWord });

      if (ok) {
        correct++;
        flash(slotContainer, 'good', 300);
      } else {
        flash(slotContainer, 'bad', 500);
        slotContainer.textContent = targetWord;
      }
      await ctx.wait(ok ? 400 : 1200);
    }
    ctx.progress(1);

    const { score, timeBonus } = ctx.withTimeBonus(st.score(), 4.0);
    return {
      score,
      detail: t('ex.anagrams.detail', { ok: correct, n: trials }),
      level: st.next(),
      timeBonus,
    };
  },
};
