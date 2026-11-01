import { h, flash, pick } from '../dom';
import { t, words } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

const limitFor = (level: number) => Math.max(550, Math.round(1800 * Math.pow(0.9, level - 1)));

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
    const matchBtn = h('button', { class: 'btn big good-btn', onClick: () => onAnswer?.(true) }, `✓ ${targetLetter}...`);
    const skipBtn = h('button', { class: 'btn big', onClick: () => onAnswer?.(false) }, `✗ ≠ ${targetLetter}`);
    const controls = h('div', { class: 'fluency-controls' }, skipBtn, matchBtn);

    ctx.stage.append(header, card, controls);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') onAnswer?.(true);
      if (e.key === 'ArrowLeft') onAnswer?.(false);
    };
    window.addEventListener('keydown', onKey);

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

      const limit = limitFor(st.level) * ctx.pace;

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
      await ctx.wait(ok ? 200 : 600);
    }

    window.removeEventListener('keydown', onKey);
    ctx.progress(1);

    return {
      score: st.score(),
      detail: t('ex.fluency.detail', { ok: correct, n: total }),
      level: st.next(),
    };
  },
};
