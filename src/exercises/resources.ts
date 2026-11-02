import { h, rand, flash } from '../dom';
import { t, type I18nKey } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

interface Project {
  id: number;
  name: string;
  cost: number;
  value: number;
}

export const resources: Exercise = {
  id: 'resources',
  icon: '⚖️',
  domain: 'reasoning',
  name: 'ex.resources.name',
  desc: 'ex.resources.desc',
  why: 'ex.resources.why',
  example: 'ex.resources.example',
  minutes: 2.5,
  levels: { min: 1, max: 8, start: 2 },
  levelLabel: (l) => `⚡ ${50 + l * 10}`,

  async run(ctx) {
    const trials = ctx.count(6, 4, 2);
    const st = new Staircase(ctx.level, 1, 8, { target: 0.75 });

    let correct = 0;

    for (let trial = 0; trial < trials; trial++) {
      ctx.progress(trial / trials, `${trial + 1}/${trials}`);

      const itemCount = Math.min(7, 4 + Math.floor(st.int / 2));
      const budget = 50 + st.int * 10;

      // Generate items
      const items: Project[] = [];
      for (let j = 0; j < itemCount; j++) {
        const cost = rand(15, 35);
        const value = Math.round(cost * (0.8 + Math.random() * 0.7));
        items.push({
          id: j,
          name: t(`ex.resources.task${(j % 8) + 1}` as I18nKey),
          cost,
          value,
        });
      }

      // Compute optimal maximum value within budget
      let maxValue = 0;
      const totalCombos = 1 << itemCount;
      for (let mask = 0; mask < totalCombos; mask++) {
        let currentCost = 0;
        let currentValue = 0;
        for (let bit = 0; bit < itemCount; bit++) {
          if ((mask & (1 << bit)) !== 0) {
            currentCost += items[bit].cost;
            currentValue += items[bit].value;
          }
        }
        if (currentCost <= budget && currentValue > maxValue) {
          maxValue = currentValue;
        }
      }

      // Required target is at least 90% of theoretical maximum
      const targetValue = Math.floor(maxValue * 0.9);

      const header = h('div', { class: 'resources-header' });
      const budgetMeter = h('div', { class: 'resources-meter' });
      const cardList = h('div', { class: 'resources-grid' });
      const submitBtn = h('button', { class: 'btn primary resources-submit' }, t('ex.resources.confirm'));

      ctx.stage.replaceChildren(header, budgetMeter, cardList, submitBtn);

      const selected = new Set<number>();

      const updateUI = () => {
        let currentCost = 0;
        let currentValue = 0;
        for (const idx of selected) {
          currentCost += items[idx].cost;
          currentValue += items[idx].value;
        }

        const isOver = currentCost > budget;
        header.replaceChildren(
          h('div', {}, t('ex.resources.budget', { cost: currentCost, budget })),
          h('div', {}, t('ex.resources.value', { val: currentValue, target: targetValue })),
        );
        header.classList.toggle('overbudget', isOver);
        submitBtn.disabled = isOver || selected.size === 0;

        cardList.replaceChildren();
        items.forEach((p, idx) => {
          const isSel = selected.has(idx);
          const card = h(
            'button',
            {
              class: `resource-card ${isSel ? 'selected' : ''}`,
              onClick: () => {
                if (selected.has(idx)) selected.delete(idx);
                else selected.add(idx);
                updateUI();
              },
            },
            h('b', {}, p.name),
            h('span', { class: 'cost' }, `⚡ ${p.cost}`),
            h('span', { class: 'value' }, `⭐ ${p.value}`),
          );
          cardList.append(card);
        });
      };

      updateUI();

      await ctx.input<void>((done) => {
        submitBtn.onclick = () => done();
      });

      let finalCost = 0;
      let finalValue = 0;
      for (const idx of selected) {
        finalCost += items[idx].cost;
        finalValue += items[idx].value;
      }

      const isSuccess = finalCost <= budget && finalValue >= targetValue;
      const ok = ctx.track(st, isSuccess, {
        was: `⭐ ${maxValue}`,
      });

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
