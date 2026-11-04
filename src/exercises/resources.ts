import { h, rand, flash, shuffle } from '../dom';
import { t, type I18nKey } from '../i18n';
import type { Exercise } from './types';

interface Product {
  icon: string;
  name: string;
  cost: number;
  gain: number;
}

const ICONS = ['🍎', '🧀', '🍯', '🥖', '🍅', '🥚', '🐟', '🌻'];
const productCount = (level: number) => Math.min(8, 4 + Math.floor(level / 2));
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
 * The goal isn't shown: knowing the best total while choosing would turn planning into trial and error.
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
  levelLabel: (l) => `${productCount(l)} 🧺 · ${Math.round(toleranceFor(l) * 100)}%`,

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
          h('div', {}, t('ex.resources.earned', { val: gained })),
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
