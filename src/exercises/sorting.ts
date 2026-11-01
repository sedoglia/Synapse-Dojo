import { h, pick, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
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

    const hint = h('div', { class: 'sorting-hint' }, t('ex.sorting.hint'));
    const refContainer = h('div', { class: 'sorting-refs' });
    const testContainer = h('div', { class: 'sorting-test' });

    let onSelect: ((refIndex: number) => void) | null = null;
    const refButtons = REF_CARDS.map((card, idx) => {
      const btn = h(
        'button',
        {
          class: 'btn sorting-ref-btn',
          onPointerdown: () => onSelect?.(idx),
        },
        renderCard(card, true),
      );
      return btn;
    });
    refContainer.append(...refButtons);

    ctx.stage.append(hint, refContainer, testContainer);

    let activeRule: Dimension = pick(['color', 'shape', 'count']);
    let consecutiveCorrect = 0;
    let correct = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);

      // Rule switch condition: after 4 consecutive correct answers, change rule secretly
      if (consecutiveCorrect >= 4) {
        const otherRules = (['color', 'shape', 'count'] as Dimension[]).filter((r) => r !== activeRule);
        activeRule = pick(otherRules);
        consecutiveCorrect = 0;
      }

      // Generate a test card that has exactly 1 match for each dimension across the 4 ref cards
      const testCard: CardDef = {
        color: pick(['red', 'green', 'yellow', 'blue']),
        shape: pick(['triangle', 'star', 'circle', 'square']),
        count: pick([1, 2, 3, 4]),
      };

      testContainer.replaceChildren(renderCard(testCard, false));
      flash(testContainer, 'pop', 150);

      const chosenRefIdx = await ctx.input<number>((done) => {
        onSelect = done;
        return () => (onSelect = null);
      });

      const chosenCard = REF_CARDS[chosenRefIdx];
      const isCorrect =
        (activeRule === 'color' && chosenCard.color === testCard.color) ||
        (activeRule === 'shape' && chosenCard.shape === testCard.shape) ||
        (activeRule === 'count' && chosenCard.count === testCard.count);

      const ok = ctx.track(st, isCorrect);

      if (isCorrect) {
        correct++;
        consecutiveCorrect++;
        flash(refButtons[chosenRefIdx], 'good', 300);
      } else {
        consecutiveCorrect = 0;
        flash(refButtons[chosenRefIdx], 'bad', 400);
      }
      await ctx.wait(ok ? 250 : 650);
    }
    ctx.progress(1);

    return {
      score: st.score(),
      detail: t('ex.sorting.detail', { ok: correct, n: trials }),
      level: st.next(),
    };
  },
};
