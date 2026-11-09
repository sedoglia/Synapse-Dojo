import { h, pick, flash, scale, shuffle } from '../dom';
import { t, num } from '../i18n';
import { sfx, haptic } from '../audio';
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

// 4 classic reference cards (matching Grant & Berg, 1948 WCST)
const REF_CARDS: CardDef[] = [
  { count: 1, color: 'red', shape: 'triangle' },
  { count: 2, color: 'green', shape: 'star' },
  { count: 3, color: 'yellow', shape: 'circle' },
  { count: 4, color: 'blue', shape: 'square' },
];

/** Smooth, humane timing curve: from 5.5s down to 2.2s at max level */
const limitFor = (level: number) => Math.max(2200, Math.round(5500 * Math.pow(0.90, level - 1)));

/**
 * Renders a crisp card with structured pip layouts (1 pip, 2 pips, 3 pips, or 2x2 cluster)
 * giving real tangibility and visual elegance to the game.
 */
function renderCard(card: CardDef, isRef = false): HTMLElement {
  const symbol = SHAPE_CHARS[card.shape];
  const color = COLOR_CSS[card.color];
  const pips = Array.from({ length: card.count }, () =>
    h('span', { class: 'sorting-pip' }, symbol),
  );
  const pipsContainer = h(
    'div',
    { class: `sorting-pips count-${card.count}` },
    ...pips,
  );
  return h(
    'div',
    {
      class: `sorting-card ${isRef ? 'ref-card' : 'test-card'}`,
      style: { color },
    },
    pipsContainer,
  );
}

function generateStimulus(): {
  card: CardDef;
  colorIdx: number;
  shapeIdx: number;
  countIdx: number;
} {
  const indices = shuffle([0, 1, 2, 3]);
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
  how: 'ex.sorting.how',
  why: 'ex.sorting.why',
  example: 'ex.sorting.example',
  minutes: [1, 2],
  levels: { min: 1, max: 10, start: 2 },
  levelLabel: (l) => `${num(limitFor(l) / 1000)} s`,

  async run(ctx) {
    const trials = ctx.count(24, 16, 5);
    const st = ctx.stair(trials, 1, 10);

    // Header & Criteria HUD
    const title = h('div', { class: 'sorting-title' }, `🃏 ${t('ex.sorting.secretRule')}`);
    const pillColor = h('span', { class: 'sorting-dim-pill' }, `🎨 ${t('ex.sorting.dimColor')}`);
    const pillShape = h('span', { class: 'sorting-dim-pill' }, `🔺 ${t('ex.sorting.dimShape')}`);
    const pillCount = h('span', { class: 'sorting-dim-pill' }, `🔢 ${t('ex.sorting.dimCount')}`);
    const dims = h('div', { class: 'sorting-dims' }, pillColor, pillShape, pillCount);

    // Combo Dots: visual progression towards cracking the current code [ ● ● ● ○ ]
    const dots = [0, 1, 2, 3].map(() => h('span', { class: 'sorting-dot' }));
    const dotsRow = h('div', { class: 'sorting-dots' }, ...dots);
    const dotsLabel = h('div', { class: 'sorting-dots-label' }, t('ex.sorting.comboDots'));
    const dotsContainer = h('div', { class: 'sorting-dots-container' }, dotsLabel, dotsRow);

    const header = h('div', { class: 'sorting-header' }, title, dims, dotsContainer);

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

    const updateDots = (count: number, solved = false) => {
      dots.forEach((dot, idx) => {
        dot.className = 'sorting-dot';
        if (solved) {
          dot.classList.add('solved');
        } else if (idx < count) {
          dot.classList.add('filled');
        }
      });
    };

    const resetPills = () => {
      Object.values(dimPills).forEach((p) => {
        p.className = 'sorting-dim-pill';
      });
    };

    // Reference matching terminals (1, 2, 3, 4)
    const refLabel = h('div', { class: 'sorting-section-label' }, t('ex.sorting.refLabel'));
    const refContainer = h('div', { class: 'sorting-refs' });

    let onSelect: ((refIndex: number) => void) | null = null;
    const refButtons = REF_CARDS.map((card, idx) => {
      const numBadge = h('span', { class: 'sorting-ref-num' }, String(idx + 1));
      const btn = h(
        'button',
        {
          class: 'btn sorting-ref-btn',
          onPointerdown: (e: PointerEvent) => {
            e.preventDefault();
            onSelect?.(idx);
          },
        },
        numBadge,
        renderCard(card, true),
      );
      return btn;
    });
    refContainer.append(...refButtons);
    const refsWrapper = h('div', { class: 'sorting-refs-wrapper' }, refLabel, refContainer);

    const feedback = h('div', { class: 'sorting-feedback' }, t('ex.sorting.feedbackStart'));

    // Test card area
    const testLabel = h('div', { class: 'sorting-section-label' }, t('ex.sorting.targetLabel'));
    const testSlot = h('div', { class: 'sorting-test' });
    const timerFill = h('div', { class: 'sorting-timer-fill' });
    const timerBar = h('div', { class: 'sorting-timer-bar' }, timerFill);
    if (ctx.mode !== 'train') {
      timerBar.style.display = 'none';
    }
    const testWrapper = h('div', { class: 'sorting-test-wrapper' }, testLabel, testSlot, timerBar);

    ctx.stage.append(header, refsWrapper, feedback, testWrapper);

    // Keyboard support: 1-4 and Numpad 1-4
    onKeys(ctx, {
      '1': () => onSelect?.(0),
      '2': () => onSelect?.(1),
      '3': () => onSelect?.(2),
      '4': () => onSelect?.(3),
      'Numpad1': () => onSelect?.(0),
      'Numpad2': () => onSelect?.(1),
      'Numpad3': () => onSelect?.(2),
      'Numpad4': () => onSelect?.(3),
    });

    let activeRule: Dimension = pick(['color', 'shape', 'count']);
    let consecutiveCorrect = 0;
    let correct = 0;
    let completedCategories = 0;
    let ruleDiscovered = false;
    let firstTrialInRule = true;
    const eliminated = new Set<Dimension>();
    const rts: number[] = [];

    updateDots(0);

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);

      const { card, colorIdx, shapeIdx, countIdx } = generateStimulus();

      testSlot.replaceChildren(renderCard(card, false));
      sfx.whoosh();

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
        updateDots(0);
        ctx.track(st, false, { subtle: true });
        sfx.bad();
        haptic('bad');
        timerFill.style.backgroundColor = 'var(--c-red)';
        flash(testSlot, 'bad', 400);
        feedback.className = 'sorting-feedback bad';
        feedback.textContent = `⏱ ${t('common.timeout')}`;
        await ctx.wait(800);
        continue;
      }

      sfx.clack();
      haptic('tap');
      rts.push(rt);

      const chosenDimension: Dimension | 'none' =
        chosenRefIdx === colorIdx ? 'color' :
        chosenRefIdx === shapeIdx ? 'shape' :
        chosenRefIdx === countIdx ? 'count' : 'none';

      const isMatch = chosenDimension === activeRule;

      if (isMatch) {
        // === SUCCESS: CORRECT MATCH ===
        correct++;
        consecutiveCorrect++;
        ruleDiscovered = true;

        // Visual feedback on HUD: ignite the active rule pill and eliminate others
        dimPills[activeRule].className = 'sorting-dim-pill active-rule';
        (['color', 'shape', 'count'] as Dimension[])
          .filter((d) => d !== activeRule)
          .forEach((d) => {
            dimPills[d].className = 'sorting-dim-pill eliminated';
          });

        updateDots(consecutiveCorrect);
        flash(refButtons[chosenRefIdx], 'good', 350);

        if (firstTrialInRule) {
          // Bullseye on the very first try!
          sfx.coins();
          haptic('combo');
          feedback.className = 'sorting-feedback switch';
          feedback.textContent = `🎯 ${t('ex.sorting.firstTryGenius')} (${consecutiveCorrect}/4)`;
        } else {
          // Pentatonic chime ascending with streak
          sfx.ok(consecutiveCorrect);
          haptic('good');
          feedback.className = 'sorting-feedback good';
          feedback.textContent = `✓ ${t('ex.sorting.correct')} (${consecutiveCorrect}/4)`;
        }
        firstTrialInRule = false;

        ctx.track(st, true, { subtle: true, rt });

        // Category cleared after 4 consecutive correct answers!
        if (consecutiveCorrect >= 4) {
          completedCategories++;
          updateDots(4, true);
          sfx.sparkle();
          haptic('combo');
          feedback.className = 'sorting-feedback cracked';
          feedback.textContent = t('ex.sorting.categoryCracked', { xp: 150 });
          flash(feedback, 'pop', 500);

          await ctx.wait(850);

          // === SHIFT TO NEW SECRET RULE ===
          const remaining = (['color', 'shape', 'count'] as Dimension[]).filter((r) => r !== activeRule);
          activeRule = pick(remaining);
          consecutiveCorrect = 0;
          ruleDiscovered = false;
          firstTrialInRule = true;
          eliminated.clear();
          resetPills();
          updateDots(0, false);

          sfx.whoosh();
          feedback.className = 'sorting-feedback switch';
          feedback.textContent = t('ex.sorting.ruleShifted');
          flash(header, 'pop', 350);
          await ctx.wait(650);
        } else {
          await ctx.wait(300);
        }
      } else {
        // === MISMATCH / DEDUCTIVE INDUCTION ===
        firstTrialInRule = false;

        if (ruleDiscovered) {
          // Failure to maintain set (player already knew the rule and made a lapse)
          consecutiveCorrect = 0;
          updateDots(0);
          ctx.track(st, false, { subtle: true, rt });
          sfx.bad();
          haptic('bad');
          flash(refButtons[chosenRefIdx], 'bad', 400);
          feedback.className = 'sorting-feedback bad';
          feedback.textContent = t('ex.sorting.lostRule', { dim: dimName(activeRule) });
          await ctx.wait(750);
        } else if (chosenDimension !== 'none' && eliminated.has(chosenDimension)) {
          // True Perseverative Error: player re-tested an already ruled-out frequency!
          consecutiveCorrect = 0;
          updateDots(0);
          ctx.track(st, false, { subtle: true, rt });
          sfx.bad();
          haptic('bad');
          flash(refButtons[chosenRefIdx], 'bad', 400);
          flash(dimPills[chosenDimension], 'bad', 400);
          feedback.className = 'sorting-feedback bad';
          feedback.textContent = t('ex.sorting.perseveration', { dim: dimName(chosenDimension) });
          await ctx.wait(750);
        } else if (chosenDimension === 'none') {
          // Clicked the 4th card that matches nothing at all
          consecutiveCorrect = 0;
          updateDots(0);
          ctx.track(st, false, { subtle: true, rt });
          sfx.bad();
          haptic('bad');
          flash(refButtons[chosenRefIdx], 'bad', 400);
          feedback.className = 'sorting-feedback bad';
          feedback.textContent = `✗ ${t('ex.sorting.wrong')}`;
          await ctx.wait(750);
        } else {
          // === SCIENTIFIC HYPOTHESIS TESTING (Inductive Elimination) ===
          // A valid exploratory test! No staircase penalty: this is rewarded as clever deduction.
          correct++;
          eliminated.add(chosenDimension);
          dimPills[chosenDimension].className = 'sorting-dim-pill eliminated';
          flash(refButtons[chosenRefIdx], 'bad', 300);

          if (eliminated.size >= 2) {
            // Exactly one dimension remains: the code is fully deduced!
            const lastRemaining = (['color', 'shape', 'count'] as Dimension[]).find((d) => !eliminated.has(d))!;
            dimPills[lastRemaining].className = 'sorting-dim-pill hint-deduced';
            sfx.coins();
            haptic('combo');

            const [d1, d2] = [...eliminated];
            feedback.className = 'sorting-feedback switch';
            feedback.textContent = t('ex.sorting.deduced', {
              dim1: dimName(d1),
              dim2: dimName(d2),
              target: dimName(lastRemaining),
            });
          } else {
            // Informative clue chime
            sfx.note(1);
            haptic('tap');
            feedback.className = 'sorting-feedback clue';
            feedback.textContent = t('ex.sorting.eliminated', { dim: dimName(chosenDimension) });
          }
          await ctx.wait(650);
        }
      }
    }
    ctx.progress(1);

    const avgRt = rts.length ? Math.round(rts.reduce((a, b) => a + b, 0) / rts.length) : 3000;
    const baseScore = st.score();
    const { score, timeBonus } = ctx.withTimeBonus(baseScore, 3.2);
    const sec = num(avgRt / 1000);
    const detail = `${t('ex.sorting.detail', { ok: correct, n: trials, cats: completedCategories })} · ${sec} s`;

    return {
      score: ctx.quick ? Math.round((correct / trials) * scale(avgRt / ctx.pace, 800, 4000)) : score,
      detail,
      level: st.next(),
      timeBonus,
    };
  },
};
