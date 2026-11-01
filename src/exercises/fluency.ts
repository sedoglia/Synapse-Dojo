import { h, flash, pick } from '../dom';
import { t, words } from '../i18n';
import { Staircase } from '../adaptive';
import { onKeys } from '../widgets';
import type { Exercise } from './types';

const limitFor = (level: number) => Math.max(650, Math.round(2200 * Math.pow(0.9, level - 1)));

export const fluency: Exercise = {
  id: 'fluency',
  icon: '💡',
  domain: 'language',
  name: 'ex.fluency.name',
  desc: 'ex.fluency.desc',
  why: 'ex.fluency.why',
  example: 'ex.fluency.example',
  minutes: 2,
  levels: { min: 1, max: 12, start: 2 },
  levelLabel: (l) => `${limitFor(l)} ms`,

  async run(ctx) {
    const total = ctx.count(25, 15, 5);
    const st = new Staircase(ctx.level, 1, 12);

    const allWords = words().map((w) => w.toUpperCase());
    // Pick target initial letters present in word list
    const availableLetters = Array.from(new Set(allWords.map((w) => w[0]))).filter(Boolean);
    const targetLetter = pick(availableLetters);

    const header = h(
      'div',
      { class: 'fluency-header' },
      h('span', {}, t('ex.fluency.targetLetter')),
      h('span', { class: 'fluency-letter' }, targetLetter),
    );
    const card = h('div', { class: 'fluency-card' });

    let onAnswer: ((matches: boolean) => void) | null = null;
    const skipBtn = h('button', { class: 'btn big fluency-btn', onClick: () => onAnswer?.(false) }, `✗ ≠ ${targetLetter}`);
    const matchBtn = h('button', { class: 'btn big good-btn fluency-btn', onClick: () => onAnswer?.(true) }, `✓ ${targetLetter}...`);
    const controls = h('div', { class: 'fluency-controls' }, skipBtn, matchBtn);

    ctx.stage.append(header, card, controls);

    onKeys(ctx, {
      ArrowRight: () => onAnswer?.(true),
      ' ': () => onAnswer?.(true),
      ArrowLeft: () => onAnswer?.(false),
    });

    let correct = 0;

    for (let i = 0; i < total; i++) {
      ctx.progress(i / total, `${i + 1}/${total}`);

      const shouldMatch = Math.random() < 0.45;
      const matchingPool = allWords.filter((w) => w.startsWith(targetLetter));
      const nonMatchingPool = allWords.filter((w) => !w.startsWith(targetLetter));

      const wordToTest = shouldMatch
        ? (matchingPool.length ? pick(matchingPool) : pick(allWords))
        : (nonMatchingPool.length ? pick(nonMatchingPool) : pick(allWords));

      const isActualMatch = wordToTest.startsWith(targetLetter);

      card.textContent = wordToTest;
      flash(card, 'pop', 150);

      const limit = (ctx.mode === 'practice' ? 60_000 : limitFor(st.level)) * ctx.pace;

      const choice = await ctx.timed<boolean | null>(limit, null, (done) => {
        onAnswer = done;
        return () => (onAnswer = null);
      });

      const ok = ctx.track(st, choice === isActualMatch, {
        was: isActualMatch ? `✓ ${targetLetter}` : `✗ ≠ ${targetLetter}`,
      });

      if (ok) {
        correct++;
        flash(choice ? matchBtn : skipBtn, 'good', 250);
      } else {
        if (choice !== null) flash(choice ? matchBtn : skipBtn, 'bad', 400);
        await ctx.wait(300);
      }
      card.textContent = choice !== null ? '' : `⏱ ${t('common.timeout')}`;
      await ctx.wait(ok ? 250 : 650);
    }

    ctx.progress(1);

    return {
      score: st.score(),
      detail: t('ex.fluency.detail', { ok: correct, n: total }),
      level: st.next(),
    };
  },
};
