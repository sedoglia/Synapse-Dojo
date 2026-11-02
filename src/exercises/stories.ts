import { h, shuffle, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

interface StoryScenario {
  name: string;
  item: string;
  itemDistractors: [string, string];
  place: string;
  placeDistractors: [string, string];
  time: string;
  timeDistractors: [string, string];
}

const SCENARIOS: StoryScenario[] = [
  {
    name: 'Elena',
    item: 'una borsa blu',
    itemDistractors: ['uno zaino rosso', 'una valigia verde'],
    place: 'sotto la panchina del parco',
    placeDistractors: ['davanti al bar', 'sul treno'],
    time: 'alle 15:30',
    timeDistractors: ['alle 18:00', 'alle 12:15'],
  },
  {
    name: 'Marco',
    item: 'un taccuino di cuoio',
    itemDistractors: ['un libro illustrato', 'un tablet nero'],
    place: 'sul tavolo della biblioteca',
    placeDistractors: ['in terrazza', 'nella sala d’attesa'],
    time: 'giovedì mattina',
    timeDistractors: ['venerdì pomeriggio', 'martedì sera'],
  },
  {
    name: 'Sara',
    item: 'una bicicletta gialla',
    itemDistractors: ['un monopattino argento', 'una vespa bianca'],
    place: 'accanto alla fontana centrale',
    placeDistractors: ['davanti al comune', 'dietro al chiosco'],
    time: 'alle 9:00',
    timeDistractors: ['alle 11:30', 'alle 14:00'],
  },
  {
    name: 'Davide',
    item: 'una sciarpa di lana rossa',
    itemDistractors: ['un berretto blu', 'una giacca marrone'],
    place: 'sulla sedia del caffè',
    placeDistractors: ['sul muretto del porto', 'nel corridoio dell’ufficio'],
    time: 'sabato sera',
    timeDistractors: ['domenica mattina', 'mercoledì alle 16:00'],
  },
  {
    name: 'Giulia',
    item: 'un vaso di ceramica bianca',
    itemDistractors: ['una lampada dorata', 'un quadro di legno'],
    place: 'sul davanzale della cucina',
    placeDistractors: ['sul bancone dell’ingresso', 'sulla mensola della sala'],
    time: 'alle 17:45',
    timeDistractors: ['alle 20:00', 'alle 10:15'],
  },
  {
    name: 'Luca',
    item: 'un binocolo da marinaio',
    itemDistractors: ['una bussola d’ottone', 'una mappa antica'],
    place: 'sopra la roccia del faro',
    placeDistractors: ['sulla prua della barca', 'nella cabina del molo'],
    time: 'alle prime luci dell’alba',
    timeDistractors: ['al tramonto', 'a mezzogiorno in punto'],
  },
];

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
  levelLabel: (l) => `lvl ${l}`,

  async run(ctx) {
    const trials = ctx.count(4, 4, 1);
    const st = new Staircase(ctx.level, 1, 6, { target: 0.75 });
    const pool = shuffle([...SCENARIOS]);

    let correct = 0;
    let totalQuestions = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      const scen = pool[i % pool.length];

      // Form story paragraph
      const text = `${scen.name} aveva con sé ${scen.item}. Si trovava ${scen.place} ${scen.time}, dove ha concluso la sua commissione.`;

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
