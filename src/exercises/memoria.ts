/**
 * Memoria / Memory Match (Pelmanism / Concentration)
 *
 * Neuroscientific foundations:
 * 1. "What-Where" Conjunctive Binding (Ungerleider & Mishkin, 1982; Pertzov et al., 2012):
 *    Requires dynamic integration between the ventral visual processing stream ("what" - card identity)
 *    and the dorsal visual processing stream ("where" - spatial coordinates in the grid), mediated
 *    by the hippocampus and medial temporal lobe relational memory network.
 * 2. Visual Working Memory & Episodic Relational Encoding (Baddeley, 2000; Eichenbaum, 2004):
 *    The player encodes, maintains, and continuously updates mental representations of multiple face-down cards
 *    across intervening trials, retrieving precise spatial locations when complementary stimuli appear.
 * 3. Prefrontal Executive Control & Proactive Interference Resolution (Postle et al., 2004; Jonides & Nee, 2006):
 *    Recruits dorsolateral (DLPFC) and ventrolateral (VLPFC) prefrontal cortex to resolve proactive interference
 *    from previously visited locations, suppressing impulsive blind guessing in favor of goal-directed retrieval.
 * 4. Dopaminergic Reward Prediction Error (RPE) & Eureka Flow (Schultz, 1998, 2015; Berridge & Robinson, 1998):
 *    Successful pair identification triggers sudden positive prediction errors, releasing dopamine
 *    in the nucleus accumbens. Cascading match combos and escalating pentatonic chimes reinforce sustained engagement.
 * 5. Dynamic Difficulty Adjustment & 85% Rule (Kaernbach, 1991; Wilson et al., 2019):
 *    Scales grid size and relational load smoothly from 3 pairs (6 cards) to 18 pairs (36 cards) across 10 levels,
 *    targeting an optimal balance between challenge and self-efficacy.
 */

import { h, clamp, shuffle, pick } from '../dom';
import { sfx } from '../audio';
import { t } from '../i18n';
import type { Ctx } from '../ctx';
import type { Exercise } from './types';
import { burstConfetti } from '../screens/play';

export interface LevelSpec {
  pairs: number;
  cols: number;
  rows: number;
}

export const LEVELS: Record<number, LevelSpec> = {
  1: { pairs: 3, cols: 3, rows: 2 },   // 6 cards (3x2)
  2: { pairs: 4, cols: 4, rows: 2 },   // 8 cards (4x2)
  3: { pairs: 5, cols: 5, rows: 2 },   // 10 cards (5x2)
  4: { pairs: 6, cols: 4, rows: 3 },   // 12 cards (4x3)
  5: { pairs: 8, cols: 4, rows: 4 },   // 16 cards (4x4)
  6: { pairs: 10, cols: 5, rows: 4 },  // 20 cards (5x4)
  7: { pairs: 12, cols: 6, rows: 4 },  // 24 cards (6x4)
  8: { pairs: 14, cols: 7, rows: 4 },  // 28 cards (7x4)
  9: { pairs: 15, cols: 6, rows: 5 },  // 30 cards (6x5)
  10: { pairs: 18, cols: 6, rows: 6 }, // 36 cards (6x6)
};

export const MAX_LEVEL = 10;
export const pairsFor = (lvl: number) => LEVELS[lvl]?.pairs ?? 6;

/** Thematic visual card decks with high contrast and distinct categorical identities */
export const DECKS: { name: string; items: string[] }[] = [
  {
    name: 'animals',
    items: ['🦁', '🐬', '🦅', '🦊', '🐼', '🦉', '🦋', '🐢', '🐘', '🦒', '🐺', '🐝', '🦚', '🦭', '🦄', '🐙', '🦘', '🦩'],
  },
  {
    name: 'space',
    items: ['🚀', '🪐', '🛸', '🌌', '☄️', '🌕', '🛰️', '☀️', '👾', '🔭', '🧑‍🚀', '🌠', '🌍', '⚡', '🌟', '🌑', '🔮', '✨'],
  },
  {
    name: 'food',
    items: ['🍓', '🥑', '🍕', '🍦', '🍉', '🍒', '🍍', '🍩', '🍔', '🥐', '🍇', '🌮', '🍣', '🧁', '🍪', '🥨', '🍎', '🥞'],
  },
  {
    name: 'adventure',
    items: ['⛵', '🏕️', '🏔️', '🌋', '🏝️', '🏰', '🚂', '✈️', '🗺️', '🎈', '🗼', '🗿', '⚓', '🗽', '🏹', '🧭', '🏎️', '🛵'],
  },
  {
    name: 'symbols',
    items: ['💎', '🔮', '🧿', '🔷', '🔶', '🔺', '🟢', '🟣', '💠', '🪩', '🔯', '🔆', '☸️', '🌀', '⭐', '❤️', '🍀', '🔔'],
  },
  {
    name: 'art',
    items: ['🎸', '🎹', '🎷', '🎺', '🎻', '🥁', '🎨', '🎭', '🎬', '🎧', '🎤', '🎪', '🪄', '🎯', '🎲', '🧩', '🪗', '🪕'],
  },
];

interface CardState {
  id: number;
  symbol: string;
  matched: boolean;
  flipped: boolean;
}

interface RoundResult {
  acc: number;
  turns: number;
  pairs: number;
  streakMax: number;
}

/**
 * Runs one interactive round of Memoria card matching.
 */
function round(
  ctx: Ctx,
  level: number,
  roundIdx: number,
  totalRounds: number,
): Promise<RoundResult> {
  const config = LEVELS[level] ?? LEVELS[4];
  const numPairs = config.pairs;

  // Select a theme deck and extract the required pairs
  const deck = pick(DECKS);
  const selectedSymbols = shuffle([...deck.items]).slice(0, numPairs);

  // Create card items (2 for each symbol)
  const cardData: { id: number; symbol: string }[] = [];
  selectedSymbols.forEach((sym, sIdx) => {
    cardData.push({ id: sIdx * 2, symbol: sym });
    cardData.push({ id: sIdx * 2 + 1, symbol: sym });
  });

  const shuffledCards = shuffle(cardData);
  const cards: CardState[] = shuffledCards.map((c, i) => ({
    id: i,
    symbol: c.symbol,
    matched: false,
    flipped: false,
  }));

  // Build HUD elements
  const pairsBadge = h(
    'div',
    { class: 'memoria-stat-pill' },
    h('span', { class: 'memoria-stat-icon' }, '🃏'),
    h('span', { class: 'memoria-stat-val' }, t('ex.memoria.pairsLeft', { k: 0, n: numPairs })),
  );

  const turnsBadge = h(
    'div',
    { class: 'memoria-stat-pill' },
    h('span', { class: 'memoria-stat-icon' }, '🎯'),
    h('span', { class: 'memoria-stat-val' }, t('ex.memoria.moves', { n: 0 })),
  );

  const comboTag = h('div', { class: 'memoria-combo-tag', style: { display: 'none' } });

  const header = h('div', { class: 'memoria-header' }, pairsBadge, turnsBadge, comboTag);

  // Floating feedback layer for dopamine toasts directly over matched cards
  const floatLayer = h('div', { class: 'memoria-float-layer' });

  // Grid container
  const grid = h('div', {
    class: `memoria-grid cols-${config.cols}`,
    style: { gridTemplateColumns: `repeat(${config.cols}, 1fr)` },
  });

  const tipText = ctx.practice
    ? h('p', { class: 'memoria-tip' }, `💡 ${t('ex.memoria.tip')}`)
    : null;

  ctx.stage.replaceChildren(header, tipText ?? '', grid, floatLayer);

  let pairsFound = 0;
  let turns = 0;
  let currentStreak = 0;
  let maxStreak = 0;
  let firstPick: { index: number; symbol: string; el: HTMLElement } | null = null;
  let pendingMismatchTimer: ReturnType<typeof setTimeout> | null = null;
  let pendingMismatchCards: [HTMLElement, HTMLElement, number, number] | null = null;
  let finishTimer: ReturnType<typeof setTimeout> | null = null;

  function updateHUD() {
    const pVal = pairsBadge.querySelector('.memoria-stat-val');
    if (pVal) pVal.textContent = t('ex.memoria.pairsLeft', { k: pairsFound, n: numPairs });

    const tVal = turnsBadge.querySelector('.memoria-stat-val');
    if (tVal) tVal.textContent = t('ex.memoria.moves', { n: turns });

    if (currentStreak >= 2) {
      comboTag.style.display = 'inline-flex';
      comboTag.textContent = t('ex.memoria.combo', { n: currentStreak });
      comboTag.classList.remove('pulse');
      void comboTag.offsetWidth;
      comboTag.classList.add('pulse');
    } else {
      comboTag.style.display = 'none';
    }
  }

  function triggerFloatingToast(el1: HTMLElement, el2: HTMLElement, streak: number) {
    const r1 = el1.getBoundingClientRect();
    const r2 = el2.getBoundingClientRect();
    const stageRect = ctx.stage.getBoundingClientRect();

    const cx = (r1.left + r2.left) / 2 + r1.width / 2 - stageRect.left;
    const cy = (r1.top + r2.top) / 2 + r1.height / 2 - stageRect.top;

    let text = `✨ ${t('ex.memoria.match')}`;
    if (streak >= 4) {
      text = `🌟 ${t('ex.memoria.combo', { n: streak })}`;
    } else if (streak >= 2) {
      text = `🔥 ${t('ex.memoria.combo', { n: streak })}`;
    }

    const floater = h(
      'div',
      {
        class: 'memoria-floating-msg',
        style: { left: `${cx}px`, top: `${cy}px` },
      },
      text,
    );

    floatLayer.append(floater);
    setTimeout(() => floater.remove(), 850);
  }

  function resolvePendingMismatch() {
    if (pendingMismatchTimer !== null) {
      clearTimeout(pendingMismatchTimer);
      pendingMismatchTimer = null;
    }
    if (pendingMismatchCards) {
      const [elA, elB, idxA, idxB] = pendingMismatchCards;
      elA.classList.remove('flipped', 'mismatch');
      elB.classList.remove('flipped', 'mismatch');
      cards[idxA].flipped = false;
      cards[idxB].flipped = false;
      pendingMismatchCards = null;
    }
  }

  return ctx.input<RoundResult>((done) => {
    let settled = false;

    function finish() {
      if (settled) return;
      settled = true;
      resolvePendingMismatch();

      const minTurns = numPairs;
      const extraTurns = Math.max(0, turns - minTurns);
      const acc = clamp(1 - extraTurns / (numPairs * 1.5), 0.2, 1.0);

      done({
        acc,
        turns,
        pairs: numPairs,
        streakMax: maxStreak,
      });
    }

    cards.forEach((card, index) => {
      const inner = h(
        'div',
        { class: 'memoria-card-inner' },
        h(
          'div',
          { class: 'memoria-card-face memoria-card-front' },
          h('span', { class: 'memoria-card-seal' }, '🎴'),
        ),
        h(
          'div',
          { class: 'memoria-card-face memoria-card-back' },
          h('span', { class: 'memoria-card-sym' }, card.symbol),
        ),
      );

      const btn = h('button', {
        class: 'memoria-card',
        type: 'button',
        'aria-label': `Card ${index + 1}`,
        onClick: () => {
          if (settled || card.matched) return;

          // If clicking the currently open first card, do nothing
          if (firstPick && firstPick.index === index) return;

          // If there is an unresolved mismatch in view, dismiss it immediately for fast snappy play
          if (pendingMismatchCards) {
            resolvePendingMismatch();
          }

          // Flip this card
          card.flipped = true;
          btn.classList.add('flipped');
          sfx.whoosh();

          if (!firstPick) {
            // First card flipped
            firstPick = { index, symbol: card.symbol, el: btn };
          } else {
            // Second card flipped
            turns++;
            const match = firstPick.symbol === card.symbol;
            const cardA = firstPick.el;
            const cardB = btn;
            const idxA = firstPick.index;
            const idxB = index;
            firstPick = null;

            if (match) {
              // --- MATCH FOUND ---
              pairsFound++;
              currentStreak++;
              maxStreak = Math.max(maxStreak, currentStreak);
              cards[idxA].matched = true;
              cards[idxB].matched = true;

              cardA.classList.add('matched');
              cardB.classList.add('matched');

              ctx.feedback(true, { subtle: true });
              sfx.ok(currentStreak);

              if (currentStreak >= 2) {
                sfx.sparkle();
              }

              triggerFloatingToast(cardA, cardB, currentStreak);
              updateHUD();

              const overallProgress = (roundIdx + pairsFound / numPairs) / totalRounds;
              ctx.progress(overallProgress, `${pairsFound}/${numPairs}`);

              if (pairsFound === numPairs) {
                // Whole board cleared!
                sfx.fanfare();
                burstConfetti(ctx.stage);
                finishTimer = setTimeout(finish, 900);
              }
            } else {
              // --- MISMATCH ---
              currentStreak = 0;
              ctx.feedback(false, { subtle: true });
              sfx.bad();

              cardA.classList.add('mismatch');
              cardB.classList.add('mismatch');
              updateHUD();

              pendingMismatchCards = [cardA, cardB, idxA, idxB];
              pendingMismatchTimer = setTimeout(() => {
                resolvePendingMismatch();
              }, 750);
            }
          }
        },
      }, inner);

      grid.append(btn);
    });

    updateHUD();
    ctx.progress(roundIdx / totalRounds, `0/${numPairs}`);

    return () => {
      resolvePendingMismatch();
      if (finishTimer) clearTimeout(finishTimer);
    };
  });
}

export const memoria: Exercise = {
  id: 'memoria',
  icon: '🎴',
  domain: 'memory',
  name: 'ex.memoria.name',
  desc: 'ex.memoria.desc',
  why: 'ex.memoria.why',
  example: 'ex.memoria.example',
  minutes: [1, 3],
  levels: { min: 1, max: MAX_LEVEL, start: 3 },
  levelLabel: (l) => `${pairsFor(l)} 🎴`,

  async run(ctx) {
    if (ctx.quick) {
      // Daily check: 1 fixed benchmark round (Level 4: 6 pairs = 12 cards)
      const res = await round(ctx, 4, 0, 1);
      ctx.progress(1);
      const score = Math.round(res.acc * 100);
      return {
        score,
        detail: t('ex.memoria.detail', {
          pairs: 6,
          turns: res.turns,
          eff: Math.round(res.acc * 100),
        }),
      };
    }

    let level = Math.round(ctx.level);
    const rounds = ctx.practice ? 1 : 2;
    const scores: number[] = [];
    let lastResult = { pairs: 3, turns: 3, acc: 1 };
    let totalPairsSum = 0;

    for (let r = 0; r < rounds; r++) {
      const lvlToRun = ctx.practice ? 1 : level;
      const res = await round(ctx, lvlToRun, r, rounds);
      scores.push(((lvlToRun - 1 + res.acc) / MAX_LEVEL) * 100);
      lastResult = res;
      totalPairsSum += res.pairs;

      // Adaptive step between rounds (Kaernbach 85% rule)
      if (res.acc >= 0.75) {
        level = Math.min(MAX_LEVEL, level + 1);
      } else if (res.acc < 0.45) {
        level = Math.max(1, level - 1);
      }
    }

    ctx.progress(1);
    const base = scores.reduce((a, b) => a + b, 0) / scores.length;
    const avgPairs = totalPairsSum / rounds;
    const { score, timeBonus } = ctx.withTimeBonus(base, 1.8 * avgPairs);

    const detail = t('ex.memoria.detail', {
      pairs: lastResult.pairs,
      turns: lastResult.turns,
      eff: Math.round(lastResult.acc * 100),
    });

    return {
      score,
      detail,
      level,
      timeBonus,
    };
  },
};
