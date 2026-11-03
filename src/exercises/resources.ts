import { h, rand, flash, shuffle } from '../dom';
import { t, type I18nKey } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

interface Product {
  icon: string;
  name: string;
  cost: number;
  gain: number;
}

const ICONS = ['🍎', '🧀', '🍯', '🥖', '🍅', '🥚', '🐟', '🌻'];
const productCount = (level: number) => Math.min(7, 4 + Math.floor(level / 2));

/** A selection of products on sale; never one where everything fits in the budget, which would need no choice. */
function stock(count: number, budget: number): Product[] {
  for (;;) {
    const picked = shuffle(ICONS.map((icon, i) => ({ icon, i }))).slice(0, count);
    const products = picked.map(({ icon, i }) => {
      const cost = rand(15, 35);
      return { icon, name: t(`ex.resources.task${i + 1}` as I18nKey), cost, gain: Math.round(cost * (0.8 + Math.random() * 0.7)) };
    });
    if (products.reduce((sum, p) => sum + p.cost, 0) > budget) return products;
  }
}

/** The highest total gain within the budget, trying every combination. */
function bestGain(products: Product[], budget: number): number {
  let best = 0;
  for (let mask = 0; mask < 1 << products.length; mask++) {
    let cost = 0;
    let gain = 0;
    products.forEach((p, i) => {
      if (mask & (1 << i)) {
        cost += p.cost;
        gain += p.gain;
      }
    });
    if (cost <= budget && gain > best) best = gain;
  }
  return best;
}

const bar = (fraction: number, cls: string) =>
  h('div', { class: `resources-bar ${cls}` }, h('div', { style: { width: `${Math.min(100, Math.round(fraction * 100))}%` } }));

/**
 * The knapsack problem (Murawski & Bossaerts, 2016) set at a market stall: money to spend, money to earn.
 * Costs and gains are spelled out in words and in coins, so the task is clear from the first look, in any country.
 */
export const resources: Exercise = {
  id: 'resources',
  icon: '🧺',
  domain: 'reasoning',
  name: 'ex.resources.name',
  desc: 'ex.resources.desc',
  why: 'ex.resources.why',
  example: 'ex.resources.example',
  minutes: 2.5,
  levels: { min: 1, max: 8, start: 2 },
  levelLabel: (l) => `${productCount(l)} 🧺`,

  async run(ctx) {
    const trials = ctx.count(6, 4, 2);
    const st = new Staircase(ctx.level, 1, 8, { target: 0.75 });

    let correct = 0;

    for (let trial = 0; trial < trials; trial++) {
      ctx.progress(trial / trials, `${trial + 1}/${trials}`);

      const budget = 50 + st.int * 10;
      const products = stock(productCount(st.int), budget);
      const maxGain = bestGain(products, budget);
      // Good enough is 90% of the best possible: a close second choice still counts.
      const target = Math.floor(maxGain * 0.9);

      const header = h('div', { class: 'resources-header' });
      const cardList = h('div', { class: 'resources-grid' });
      const submitBtn = h('button', { class: 'btn primary resources-submit' }, t('ex.resources.confirm'));
      ctx.stage.replaceChildren(header, cardList, submitBtn);

      const selected = new Set<number>();
      const total = (key: 'cost' | 'gain') => [...selected].reduce((sum, i) => sum + products[i][key], 0);

      const updateUI = () => {
        const spent = total('cost');
        const gained = total('gain');
        const over = spent > budget;
        header.replaceChildren(
          h('div', {}, over ? t('ex.resources.over', { cost: spent, budget }) : t('ex.resources.money', { cost: spent, budget, left: budget - spent })),
          bar(spent / budget, 'spent'),
          h('div', {}, t('ex.resources.total', { val: gained, target })),
          bar(gained / target, 'gained'),
        );
        header.classList.toggle('overbudget', over);
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

      await ctx.input<void>((done) => {
        submitBtn.onclick = () => done();
      });

      const isSuccess = total('cost') <= budget && total('gain') >= target;
      const ok = ctx.track(st, isSuccess, { was: t('ex.resources.was', { n: maxGain }) });

      if (isSuccess) {
        correct++;
        flash(header, 'good', 400);
      } else {
        flash(header, 'bad', 500);
      }
      await ctx.wait(ok ? 500 : 1200);
    }
    ctx.progress(1);

    const { score, timeBonus } = ctx.withTimeBonus(st.score(), 5.0);
    return {
      score,
      detail: t('ex.resources.detail', { ok: correct, n: trials }),
      level: st.next(),
      timeBonus,
    };
  },
};
