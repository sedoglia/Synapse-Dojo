import { h, shuffle, flash } from '../dom';
import { t, stories as allStories } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

export const stories: Exercise = {
  id: 'stories',
  icon: '📜',
  domain: 'memory',
  name: 'ex.stories.name',
  desc: 'ex.stories.desc',
  why: 'ex.stories.why',
  example: 'ex.stories.example',
  minutes: 2.5,
  levels: { min: 1, max: 6, start: 2 },
  levelLabel: (l) => `${l >= 4 ? 3 : 2} ❓`,

  async run(ctx) {
    const trials = ctx.count(4, 4, 1);
    const st = new Staircase(ctx.level, 1, 6, { target: 0.75 });
    const pool = shuffle([...allStories()]);

    let correct = 0;
    let totalQuestions = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      const scen = pool[i % pool.length];

      // Form story paragraph using localized template
      const text = t('ex.stories.text', {
        name: scen.name,
        item: scen.item,
        place: scen.place,
        time: scen.time,
      });

      const title = h('div', { class: 'story-title' }, t('ex.stories.title', { n: i + 1 }));
      const body = h('div', { class: 'story-card' }, text);
      const readyBtn = h('button', { class: 'btn primary' }, t('ex.stories.ready'));

      ctx.stage.replaceChildren(title, body, readyBtn);

      await ctx.input<void>((done) => {
        readyBtn.onclick = () => done();
      });

      // Brief distraction / delay
      ctx.stage.replaceChildren(h('div', { class: 'grid-status' }, '...'));
      await ctx.wait(600);

      // Questions to ask
      const qList = [
        {
          q: t('ex.stories.qItem', { name: scen.name }),
          correct: scen.item,
          options: shuffle([scen.item, ...scen.itemDistractors]),
        },
        {
          q: t('ex.stories.qPlace', { name: scen.name }),
          correct: scen.place,
          options: shuffle([scen.place, ...scen.placeDistractors]),
        },
        {
          q: t('ex.stories.qTime', { name: scen.name }),
          correct: scen.time,
          options: shuffle([scen.time, ...scen.timeDistractors]),
        },
      ];

      // Number of questions depends on level
      const count = Math.min(qList.length, st.int >= 4 ? 3 : 2);
      const chosenQ = shuffle(qList).slice(0, count);

      for (const item of chosenQ) {
        totalQuestions++;
        const qTitle = h('div', { class: 'story-q' }, item.q);
        let onPick: ((ans: string) => void) | null = null;
        const optButtons = item.options.map((opt) =>
          h('button', { class: 'btn story-opt', onClick: () => onPick?.(opt) }, opt),
        );
        ctx.stage.replaceChildren(qTitle, h('div', { class: 'story-opts' }, ...optButtons));

        const chosen = await ctx.input<string>((done) => {
          onPick = done;
          return () => (onPick = null);
        });

        const ok = ctx.track(st, chosen === item.correct, { was: item.correct });
        const targetBtn = optButtons.find((b) => b.textContent === item.correct);
        if (ok) {
          correct++;
          if (targetBtn) flash(targetBtn, 'good');
        } else {
          if (targetBtn) targetBtn.classList.add('correct-hint');
          const chosenBtn = optButtons.find((b) => b.textContent === chosen);
          if (chosenBtn) flash(chosenBtn, 'bad');
        }
        await ctx.wait(ok ? 400 : 1200);
      }
    }
    ctx.progress(1);

    const { score, timeBonus } = ctx.withTimeBonus(st.score(), 3.0);
    return {
      score,
      detail: t('ex.stories.detail', { ok: correct, n: totalQuestions }),
      level: st.next(),
      timeBonus,
    };
  },
};
