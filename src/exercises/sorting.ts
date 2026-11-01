import { h, pick, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import { onKeys } from '../widgets';
import type { Exercise } from './types';

type Dimension = 'color' | 'shape' | 'count';

interface CardDef {
  color: 'red' | 'green' | 'yellow' | 'blue';
  shape: 'triangle' | 'star' | 'circle' | 'square';
  count: number;
}

const SHAPE_CHARS: Record<CardDef['shape'], string> = {
  triangle: '▲',
  star: '★',
  circle: '●',
  square: '■',
};

const COLOR_CSS: Record<CardDef['color'], string> = {
  red: 'var(--c-red)',
  green: 'var(--c-green)',
  yellow: 'var(--c-yellow)',
  blue: 'var(--c-blue)',
};

// 4 classic reference cards
const REF_CARDS: CardDef[] = [
  { count: 1, color: 'red', shape: 'triangle' },
  { count: 2, color: 'green', shape: 'star' },
  { count: 3, color: 'yellow', shape: 'circle' },
  { count: 4, color: 'blue', shape: 'square' },
];

function renderCard(card: CardDef, isRef = false): HTMLElement {
  const symbol = SHAPE_CHARS[card.shape];
  const color = COLOR_CSS[card.color];
  const symbols = Array.from({ length: card.count }, () => symbol).join(' ');
  return h(
    'div',
    {
      class: `sorting-card ${isRef ? 'ref-card' : 'test-card'}`,
      style: { color },
    },
    symbols,
  );
}

/**
 * Generates a stimulus card that has EXACTLY ONE distinct match for each dimension
 * across 3 different reference cards (and 0 matches on the 4th).
 * This eliminates ambiguity and adheres strictly to the Wisconsin Card Sorting Test design.
 */
function generateStimulus(): {
  card: CardDef;
  colorIdx: number;
  shapeIdx: number;
  countIdx: number;
} {
  const indices = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  const colorIdx = indices[0];
  const shapeIdx = indices[1];
  const countIdx = indices[2];

  return {
    card: {
      color: REF_CARDS[colorIdx].color,
      shape: REF_CARDS[shapeIdx].shape,
      count: REF_CARDS[countIdx].count,
    },
    colorIdx,
    shapeIdx,
    countIdx,
  };
}

export const sorting: Exercise = {
  id: 'sorting',
  icon: '🃏',
  domain: 'executive',
  name: 'ex.sorting.name',
  desc: 'ex.sorting.desc',
  why: 'ex.sorting.why',
  example: 'ex.sorting.example',
  minutes: 2.5,
  levels: { min: 1, max: 10, start: 2 },
  levelLabel: (l) => `lvl ${l}`,

  async run(ctx) {
    const trials = ctx.count(24, 16, 5);
    const st = new Staircase(ctx.level, 1, 10);

    // Header with instructions and dimension pills
    const title = h('div', { class: 'sorting-title' }, t('ex.sorting.secretRule'));
    const dims = h(
      'div',
      { class: 'sorting-dims' },
      h('span', { class: 'sorting-dim-pill' }, `🎨 ${t('ex.sorting.dimColor')}`),
      h('span', { class: 'sorting-dim-pill' }, `🔺 ${t('ex.sorting.dimShape')}`),
      h('span', { class: 'sorting-dim-pill' }, `🔢 ${t('ex.sorting.dimCount')}`),
    );
    const header = h('div', { class: 'sorting-header' }, title, dims);

    // Reference cards section
    const refLabel = h('div', { class: 'sorting-section-label' }, t('ex.sorting.refLabel'));
    const refContainer = h('div', { class: 'sorting-refs' });

    let onSelect: ((refIndex: number) => void) | null = null;
    const refButtons = REF_CARDS.map((card, idx) => {
      const numBadge = h('span', { class: 'sorting-ref-num' }, String(idx + 1));
      const btn = h(
        'button',
        {
          class: 'btn sorting-ref-btn',
          onPointerdown: () => onSelect?.(idx),
        },
        numBadge,
        renderCard(card, true),
      );
      return btn;
    });
    refContainer.append(...refButtons);
    const refsWrapper = h('div', { class: 'sorting-refs-wrapper' }, refLabel, refContainer);

    // Dynamic feedback banner
    const feedback = h('div', { class: 'sorting-feedback' }, t('ex.sorting.feedbackStart'));

    // Test card section
    const testLabel = h('div', { class: 'sorting-section-label' }, t('ex.sorting.targetLabel'));
    const testSlot = h('div', { class: 'sorting-test' });
    const testWrapper = h('div', { class: 'sorting-test-wrapper' }, testLabel, testSlot);

    ctx.stage.append(header, refsWrapper, feedback, testWrapper);

    onKeys(ctx, {
      '1': () => onSelect?.(0),
      '2': () => onSelect?.(1),
      '3': () => onSelect?.(2),
      '4': () => onSelect?.(3),
    });

    let activeRule: Dimension = pick(['color', 'shape', 'count']);
    let consecutiveCorrect = 0;
    let correct = 0;
    let ruleJustShifted = false;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);

      // Rule switch condition: after 4 consecutive correct answers, change rule secretly
      if (consecutiveCorrect >= 4) {
        const otherRules = (['color', 'shape', 'count'] as Dimension[]).filter((r) => r !== activeRule);
        activeRule = pick(otherRules);
        consecutiveCorrect = 0;
        ruleJustShifted = true;
      }

      const { card, colorIdx, shapeIdx, countIdx } = generateStimulus();

      testSlot.replaceChildren(renderCard(card, false));
      flash(testSlot, 'pop', 150);

      const chosenRefIdx = await ctx.input<number>((done) => {
        onSelect = done;
        return () => (onSelect = null);
      });

      const chosenDimension: Dimension | 'none' =
        chosenRefIdx === colorIdx ? 'color' :
        chosenRefIdx === shapeIdx ? 'shape' :
        chosenRefIdx === countIdx ? 'count' : 'none';

      const isCorrect = chosenDimension === activeRule;
      const ok = ctx.track(st, isCorrect);

      feedback.className = 'sorting-feedback';

      if (isCorrect) {
        correct++;
        consecutiveCorrect++;
        flash(refButtons[chosenRefIdx], 'good', 300);
        feedback.classList.add('good');
        feedback.textContent = `✓ ${t('ex.sorting.correct')} (${consecutiveCorrect}/4)`;
        ruleJustShifted = false;
      } else {
        consecutiveCorrect = 0;
        flash(refButtons[chosenRefIdx], 'bad', 400);

        if (ruleJustShifted) {
          feedback.classList.add('switch');
          feedback.textContent = `⚡ ${t('ex.sorting.ruleShifted')}`;
          ruleJustShifted = false;
        } else {
          feedback.classList.add('bad');
          feedback.textContent = `✗ ${t('ex.sorting.wrong')}`;
        }
      }

      await ctx.wait(ok ? 350 : 750);
    }
    ctx.progress(1);

    return {
      score: st.score(),
      detail: t('ex.sorting.detail', { ok: correct, n: trials }),
      level: st.next(),
    };
  },
};
