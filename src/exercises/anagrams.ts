import { h, shuffle, flash } from '../dom';
import { t, words } from '../i18n';
import { Staircase } from '../adaptive';
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
  levelLabel: (l) => `${lenFor(l)} lettere`,

  async run(ctx) {
    const trials = ctx.count(8, 6, 2);
    const st = new Staircase(ctx.level, 1, 8);

    const status = h('div', { class: 'anagram-status' });
    const slotContainer = h('div', { class: 'anagram-slots' });
    const tileContainer = h('div', { class: 'anagram-tiles' });
    const actions = h('div', { class: 'anagram-actions' });

    ctx.stage.append(status, slotContainer, tileContainer, actions);

    const allWords = words();
    let correct = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      const targetLen = lenFor(st.level);

      // Find words matching desired length
      const candidates = allWords.filter((w) => w.length === targetLen);
      const targetWord = (candidates.length ? shuffle(candidates)[0] : shuffle(allWords)[0]).toUpperCase();

      const letters = targetWord.split('');
      let scrambled = shuffle([...letters]);
      while (scrambled.join('') === targetWord && scrambled.length > 2) {
        scrambled = shuffle([...letters]);
      }

      status.textContent = t('ex.anagrams.hint');

      const selectedIndices: number[] = [];

      const render = (onTileClick?: (idx: number) => void) => {
        // Render slots
        slotContainer.replaceChildren();
        for (let s = 0; s < targetWord.length; s++) {
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
          if (selectedIndices.length === targetWord.length) {
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

      const isMatch = typedWord === targetWord || allWords.map((w) => w.toUpperCase()).includes(typedWord);
      const ok = ctx.track(st, isMatch, { was: targetWord });

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

    return {
      score: st.score(),
      detail: t('ex.anagrams.detail', { ok: correct, n: trials }),
      level: st.next(),
    };
  },
};
