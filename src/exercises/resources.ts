import { h, rand, flash, shuffle } from '../dom';
import { t, type I18nKey } from '../i18n';
import { timeBar } from '../widgets';
import type { Exercise } from './types';

interface Product {
  icon: string;
  name: string;
  cost: number;
  gain: number;
}

const ICONS = ['🍎', '🧀', '🍯', '🥖', '🍅', '🥚', '🐟', '🌻'];
const productCount = (level: number) => Math.min(8, 4 + Math.floor(level / 2));
/**
 * Seconds to choose. The goal is on screen, so with no limit anyone could try combinations until the bar fills up and
 * never get one wrong; the time is generous, grows with the products, and a bar shows how much is left.
 */
const secondsFor = (level: number) => 15 + 6 * productCount(level);
/** Share of the best possible earnings that is good enough: from a close second choice up to the exact optimum. */
const toleranceFor = (level: number) => (level <= 2 ? 0.9 : level <= 4 ? 0.95 : 1);

function randomStock(count: number): Product[] {
  return shuffle(ICONS.map((icon, i) => ({ icon, i }))).slice(0, count).map(({ icon, i }) => {
    const cost = rand(15, 35);
    return { icon, name: t(`ex.resources.task${i + 1}` as I18nKey), cost, gain: Math.round(cost * (0.8 + Math.random() * 0.7)) };
  });
}

/** What the obvious shortcut earns: buying the best earnings per coin first. */
function greedyGain(products: Product[], budget: number): number {
  let spent = 0;
  let gain = 0;
  for (const p of [...products].sort((a, b) => b.gain / b.cost - a.gain / a.cost)) {
    if (spent + p.cost <= budget) {
      spent += p.cost;
      gain += p.gain;
    }
  }
  return gain;
}

/**
 * The budget is about half of what everything costs, where knapsack instances are hardest (Yadav et al.; Franco et al.,
 * 2021). From level 3 the shortcut must fall short, otherwise more products would only make the task easier.
 */
function stock(level: number): { products: Product[]; budget: number; maxGain: number; target: number } {
  for (let tries = 0; ; tries++) {
    const products = randomStock(productCount(level));
    const budget = Math.round(products.reduce((sum, p) => sum + p.cost, 0) * 0.5);
    const maxGain = bestGain(products, budget);
    const target = Math.floor(maxGain * toleranceFor(level));
    if (level < 3 || tries > 300 || greedyGain(products, budget) < target) return { products, budget, maxGain, target };
  }
}

/** The highest total gain within the budget, trying every combination. */
function bestGain(products: Product[], budget: number): number {
  return bestChoice(products, budget).gain;
}

/** The best combination within the budget, as a bit per product. */
function bestChoice(products: Product[], budget: number): { gain: number; mask: number } {
  let best = 0;
  let bestMask = 0;
  for (let mask = 0; mask < 1 << products.length; mask++) {
    let cost = 0;
    let gain = 0;
    products.forEach((p, i) => {
      if (mask & (1 << i)) {
        cost += p.cost;
        gain += p.gain;
      }
    });
    if (cost <= budget && gain > best) {
      best = gain;
      bestMask = mask;
    }
  }
  return { gain: best, mask: bestMask };
}

const bar = (fraction: number, cls: string) =>
  h('div', { class: `resources-bar ${cls}` }, h('div', { style: { width: `${Math.min(100, Math.round(fraction * 100))}%` } }));

/**
 * The knapsack problem (Murawski & Bossaerts, 2016) set at a market stall: money to spend, money to earn.
 * Costs and gains are spelled out in words and in coins, so the task is clear from the first look, in any country.
 * The goal is shown, as in the decision version of the problem (Franco et al., 2021): reach at least this much.
 */
export const resources: Exercise = {
  id: 'resources',
  icon: '🧺',
  domain: 'reasoning',
  name: 'ex.resources.name',
  desc: 'ex.resources.desc',
  why: 'ex.resources.why',
  example: 'ex.resources.example',
  minutes: [3, 5],
  levels: { min: 1, max: 8, start: 2 },
  levelLabel: (l) => `${productCount(l)} 🧺 · ${secondsFor(l)} s`,

  async run(ctx) {
    const trials = ctx.count(8, 6, 2);
    const st = ctx.stair(trials, 1, 8, { target: 0.75 });

    let correct = 0;

    for (let trial = 0; trial < trials; trial++) {
      ctx.progress(trial / trials, `${trial + 1}/${trials}`);

      const { products, budget, maxGain, target } = stock(st.int);

      const header = h('div', { class: 'resources-header' });
      const cardList = h('div', { class: 'resources-grid' });
      const submitBtn = h('button', { class: 'btn primary resources-submit' }, t('ex.resources.confirm'));
      const clock = timeBar();
      clock.el.classList.toggle('off', ctx.practice);
      ctx.stage.replaceChildren(header, clock.el, cardList, submitBtn);

      const selected = new Set<number>();
      const total = (key: 'cost' | 'gain') => [...selected].reduce((sum, i) => sum + products[i][key], 0);

      const updateUI = () => {
        const spent = total('cost');
        const gained = total('gain');
        const over = spent > budget;
        // A full bar looks much like a nearly full one, so the goal changes its colour: only a basket that wins counts.
        const reached = !over && gained >= target;
        header.replaceChildren(
          h('div', {}, over ? t('ex.resources.over', { cost: spent, budget }) : t('ex.resources.money', { cost: spent, budget, left: budget - spent })),
          bar(spent / budget, 'spent'),
          h('div', { class: 'resources-goal' }, `${reached ? '✓ ' : ''}${t('ex.resources.total', { val: gained, target })}`),
          bar(gained / target, 'gained'),
        );
        header.classList.toggle('overbudget', over);
        header.classList.toggle('reached', reached);
        submitBtn.disabled = over || selected.size === 0;

        cardList.replaceChildren(
          ...products.map((p, i) =>
            h(
              'button',
              {
                class: `resource-card ${selected.has(i) ? 'selected' : ''}`,
                'aria-pressed': String(selected.has(i)),
                onClick: () => {
                  if (selected.has(i)) selected.delete(i);
                  else selected.add(i);
                  updateUI();
                },
              },
              h('b', {}, `${p.icon} ${p.name}`),
              h('span', { class: 'cost' }, t('ex.resources.cost', { n: p.cost })),
              h('span', { class: 'value' }, t('ex.resources.gain', { n: p.gain })),
            ),
          ),
        );
      };

      updateUI();

      // When time runs out the basket is judged as it stands.
      const limit = (ctx.practice ? 600 : secondsFor(st.int)) * 1000 * ctx.pace;
      clock.start(limit);
      const inTime = await ctx.timed<boolean>(limit, false, (done) => {
        submitBtn.onclick = () => done(true);
      });
      clock.stop();

      const isSuccess = total('cost') <= budget && total('gain') >= target;
      // The real reason, with its numbers: reaching the goal always wins, so a mistake is never about "could do better".
      const spent = total('cost');
      const reason = spent > budget ? t('ex.resources.over', { cost: spent, budget }) : t('ex.resources.below', { val: total('gain'), target, n: maxGain });
      const why = inTime ? reason : `${t('common.timeout')}. ${reason}`;
      const ok = ctx.track(st, isSuccess, { note: why });

      if (isSuccess) {
        correct++;
        flash(header, 'good', 400);
      } else {
        flash(header, 'bad', 500);
        // Shows the best purchase and waits for the player: a mistake should teach something, at their own pace.
        const { mask } = bestChoice(products, budget);
        [...cardList.children].forEach((card, i) => {
          card.classList.toggle('correct-hint', ((mask >> i) & 1) === 1);
          (card as HTMLButtonElement).disabled = true;
        });
        header.append(h('b', {}, why));
        submitBtn.disabled = false;
        submitBtn.textContent = t('common.continue');
        await ctx.input<void>((done) => {
          submitBtn.onclick = () => done();
        }, false);
      }
      if (ok) await ctx.wait(500);
    }
    ctx.progress(1);

    return {
      score: st.score(),
      detail: t('ex.resources.detail', { ok: correct, n: trials }),
      level: st.next(),
    };
  },
};
