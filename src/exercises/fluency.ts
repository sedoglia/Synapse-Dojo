import { h, flash, pick } from '../dom';
import { sfx } from '../audio';
import { t, words } from '../i18n';
import { onKeys } from '../widgets';
import type { Exercise } from './types';

const MIN_WORDS = 6;
const limitFor = (level: number) => Math.max(800, Math.round(2200 * Math.pow(0.912, level - 1)));

export const fluency: Exercise = {
  id: 'fluency',
  icon: '💬',
  domain: 'language',
  name: 'ex.fluency.name',
  desc: 'ex.fluency.desc',
  why: 'ex.fluency.why',
  example: 'ex.fluency.example',
  minutes: [1, 2],
  levels: { min: 1, max: 12, start: 1 },
  levelLabel: (l) => `${limitFor(l)} ms`,

  async run(ctx) {
    const total = ctx.count(25, 15, 5);
    const st = ctx.stair(total, 1, 12);

    const allWords = words().map((w) => w.toUpperCase());
    // Only initials with enough words, or the same one or two words would keep coming back and be learnt by heart.
    const counts = new Map<string, number>();
    for (const w of allWords) if (w[0]) counts.set(w[0], (counts.get(w[0]) ?? 0) + 1);
    const byCount = [...counts].sort((a, b) => b[1] - a[1]);
    const rich = byCount.filter(([, n]) => n >= MIN_WORDS).map(([c]) => c);
    const targetLetter = pick(rich.length ? rich : byCount.slice(0, 5).map(([c]) => c));

    const header = h(
      'div',
      { class: 'fluency-header' },
      h('span', {}, t('ex.fluency.targetLetter')),
      h('span', { class: 'fluency-letter' }, targetLetter),
    );
    const card = h('div', { class: 'fluency-card' });

    let onAnswer: ((matches: boolean) => void) | null = null;
    const skipBtn = h('button', { class: 'btn big fluency-btn', onPointerdown: () => onAnswer?.(false) }, `✗ ≠ ${targetLetter}`);
    const matchBtn = h('button', { class: 'btn big good-btn fluency-btn', onPointerdown: () => onAnswer?.(true) }, `✓ ${targetLetter}...`);
    const controls = h('div', { class: 'fluency-controls' }, skipBtn, matchBtn);

    let startX = 0;
    let startY = 0;
    card.addEventListener('pointerdown', (e: PointerEvent) => {
      startX = e.clientX;
      startY = e.clientY;
    });
    card.addEventListener('pointerup', (e: PointerEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) {
        sfx.whoosh();
        if (dx > 0) {
          card.classList.add('swipe-right');
          onAnswer?.(true);
        } else {
          card.classList.add('swipe-left');
          onAnswer?.(false);
        }
      }
    });

    ctx.stage.append(header, card, controls);

    onKeys(ctx, {
      ArrowRight: () => onAnswer?.(true),
      ' ': () => onAnswer?.(true),
      ArrowLeft: () => onAnswer?.(false),
    });

    let correct = 0;
    let lastWord = '';

    for (let i = 0; i < total; i++) {
      ctx.progress(i / total, `${i + 1}/${total}`);

      const shouldMatch = Math.random() < 0.45;
      const matchingPool = allWords.filter((w) => w.startsWith(targetLetter));
      const nonMatchingPool = allWords.filter((w) => !w.startsWith(targetLetter));

      let wordToTest = shouldMatch
        ? (matchingPool.length ? pick(matchingPool) : pick(allWords))
        : (nonMatchingPool.length ? pick(nonMatchingPool) : pick(allWords));

      // Never the same word twice in a row.
      for (let tries = 0; wordToTest === lastWord && tries < 5; tries++) wordToTest = pick(shouldMatch && matchingPool.length ? matchingPool : nonMatchingPool.length ? nonMatchingPool : allWords);
      lastWord = wordToTest;

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
      card.classList.remove('swipe-right', 'swipe-left');
      card.textContent = choice !== null ? '' : `⏱ ${t('common.timeout')}`;
      await ctx.wait(ok ? 250 : 650);
    }

    ctx.progress(1);

    const { score, timeBonus } = ctx.withTimeBonus(st.score(), 2.2);
    return {
      score,
      detail: t('ex.fluency.detail', { ok: correct, n: total }),
      level: st.next(),
      timeBonus,
    };
  },
};
