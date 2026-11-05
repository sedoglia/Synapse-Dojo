import { h, pick, flash, clamp, scale } from '../dom';
import { t, num } from '../i18n';
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

const limitFor = (level: number) => Math.max(1500, Math.round(5500 * Math.pow(0.87, level - 1)));

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
  minutes: [1, 2],
  levels: { min: 1, max: 10, start: 2 },
  levelLabel: (l) => `${num(limitFor(l) / 1000)} s`,

  async run(ctx) {
    const trials = ctx.count(24, 16, 5);
    const st = ctx.stair(trials, 1, 10);

    const title = h('div', { class: 'sorting-title' }, t('ex.sorting.secretRule'));
    const pillColor = h('span', { class: 'sorting-dim-pill' }, `🎨 ${t('ex.sorting.dimColor')}`);
    const pillShape = h('span', { class: 'sorting-dim-pill' }, `🔺 ${t('ex.sorting.dimShape')}`);
    const pillCount = h('span', { class: 'sorting-dim-pill' }, `🔢 ${t('ex.sorting.dimCount')}`);
    const dims = h('div', { class: 'sorting-dims' }, pillColor, pillShape, pillCount);
    const header = h('div', { class: 'sorting-header' }, title, dims);

    const dimPills: Record<Dimension, HTMLElement> = {
      color: pillColor,
      shape: pillShape,
      count: pillCount,
    };

    const dimName = (d: Dimension) => {
      if (d === 'color') return t('ex.sorting.dimColor');
      if (d === 'shape') return t('ex.sorting.dimShape');
      return t('ex.sorting.dimCount');
    };

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

    const feedback = h('div', { class: 'sorting-feedback' }, t('ex.sorting.feedbackStart'));

    const testLabel = h('div', { class: 'sorting-section-label' }, t('ex.sorting.targetLabel'));
    const testSlot = h('div', { class: 'sorting-test' });
    const timerFill = h('div', { class: 'sorting-timer-fill' });
    const timerBar = h('div', { class: 'sorting-timer-bar' }, timerFill);
    if (ctx.mode !== 'train') {
      timerBar.style.display = 'none';
    }
    const testWrapper = h('div', { class: 'sorting-test-wrapper' }, testLabel, testSlot, timerBar);

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
    let completedCategories = 0;
    let ruleDiscovered = false;
    const eliminated = new Set<Dimension>();
    const rts: number[] = [];

    const resetPills = () => {
      Object.values(dimPills).forEach((p) => {
        p.className = 'sorting-dim-pill';
      });
    };

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);

      // Rule switch after 4 consecutive correct answers
      if (consecutiveCorrect >= 4) {
        completedCategories++;
        const remaining = (['color', 'shape', 'count'] as Dimension[]).filter((r) => r !== activeRule);
        activeRule = pick(remaining);
        consecutiveCorrect = 0;
        ruleDiscovered = false;
        eliminated.clear();
        resetPills();
        // Announced at first, so as not to discourage; from level 6 the player has to notice it, as in the WCST.
        if (st.int < 6 || ctx.mode !== 'train') {
          feedback.className = 'sorting-feedback switch';
          feedback.textContent = `⚡ ${t('ex.sorting.ruleShifted')}`;
        }
      }

      const { card, colorIdx, shapeIdx, countIdx } = generateStimulus();

      testSlot.replaceChildren(renderCard(card, false));
      flash(testSlot, 'pop', 150);

      const limit = (ctx.mode !== 'train' ? 60_000 : limitFor(st.level)) * ctx.pace;

      if (ctx.mode === 'train') {
        timerFill.style.transition = 'none';
        timerFill.style.width = '100%';
        timerFill.style.backgroundColor = 'var(--accent)';
        requestAnimationFrame(() => {
          timerFill.style.transition = `width ${limit}ms linear`;
          timerFill.style.width = '0%';
        });
      }

      const shown = performance.now();
      const chosenRefIdx = await ctx.timed<number | null>(limit, null, (done) => {
        onSelect = done;
        return () => (onSelect = null);
      });
      const rt = performance.now() - shown;

      if (ctx.mode === 'train') {
        timerFill.style.transition = 'none';
      }

      if (chosenRefIdx === null) {
        // Timeout
        consecutiveCorrect = 0;
        ctx.track(st, false);
        timerFill.style.backgroundColor = 'var(--c-red)';
        flash(testSlot, 'bad', 400);
        feedback.className = 'sorting-feedback bad';
        feedback.textContent = `⏱ ${t('common.timeout')}`;
        await ctx.wait(800);
        continue;
      }

      rts.push(rt);

      const chosenDimension: Dimension | 'none' =
        chosenRefIdx === colorIdx ? 'color' :
        chosenRefIdx === shapeIdx ? 'shape' :
        chosenRefIdx === countIdx ? 'count' : 'none';

      const isMatch = chosenDimension === activeRule;

      if (isMatch) {
        // Correct response!
        correct++;
        consecutiveCorrect++;
        ruleDiscovered = true;
        // The rule stays in the player's head: it isn't highlighted on screen.
        resetPills();
        flash(refButtons[chosenRefIdx], 'good', 300);
        feedback.className = 'sorting-feedback good';
        feedback.textContent = `✓ ${t('ex.sorting.correct')} (${consecutiveCorrect}/4)`;
        ctx.track(st, true);
        await ctx.wait(300);
      } else {
        flash(refButtons[chosenRefIdx], 'bad', 400);

        if (ruleDiscovered) {
          // Failure to maintain set (player already knew the rule and made a lapse)
          consecutiveCorrect = 0;
          ctx.track(st, false);
          feedback.className = 'sorting-feedback bad';
          feedback.textContent = `✗ ${t('ex.sorting.lostRule')}`;
          await ctx.wait(750);
        } else if (chosenDimension !== 'none' && eliminated.has(chosenDimension)) {
          // Perseveration: player re-tested an already eliminated dimension
          ctx.track(st, false);
          feedback.className = 'sorting-feedback bad';
          feedback.textContent = `⚠️ ${t('ex.sorting.perseveration')}`;
          await ctx.wait(750);
        } else if (chosenDimension === 'none') {
          // Clicked the 4th card that matches nothing
          ctx.track(st, false);
          feedback.className = 'sorting-feedback bad';
          feedback.textContent = `✗ ${t('ex.sorting.wrong')}`;
          await ctx.wait(750);
        } else {
          // Valid scientific induction step: eliminate this hypothesis
          // No penalty on staircase, counted as a valid deductive trial
          correct++;
          eliminated.add(chosenDimension);
          dimPills[chosenDimension].classList.add('eliminated');
          feedback.className = 'sorting-feedback switch';

          if (eliminated.size >= 2) {
            const lastRemaining = (['color', 'shape', 'count'] as Dimension[]).find((d) => !eliminated.has(d))!;
            feedback.textContent = `💡 ${t('ex.sorting.eliminated', { dim: dimName(chosenDimension) })} → ${dimName(lastRemaining)}!`;
          } else {
            feedback.textContent = `✗ ${t('ex.sorting.eliminated', { dim: dimName(chosenDimension) })}`;
          }
          await ctx.wait(650);
        }
      }
    }
    ctx.progress(1);

    const avgRt = rts.length ? Math.round(rts.reduce((a, b) => a + b, 0) / rts.length) : 3000;
    const baseScore = st.score();
    const speedScore = scale(avgRt / ctx.pace, 900, 3500);
    // 80% staircase mastery, 20% speed bonus
    const score = Math.round(clamp(baseScore * 0.8 + speedScore * 0.2, 0, 100));
    const sec = num(avgRt / 1000);
    const detail = `${t('ex.sorting.detail', { ok: correct, n: trials, cats: completedCategories })} · ${sec} s`;

    return {
      score: ctx.quick ? Math.round((correct / trials) * scale(avgRt / ctx.pace, 800, 4000)) : score,
      detail,
      level: st.next(),
    };
  },
};
