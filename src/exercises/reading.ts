import { h, shuffle, scale, flash } from '../dom';
import { store } from '../storage';
import { t, PASSAGES } from '../i18n';
import type { Exercise } from './types';

const ROUNDS = 2;

export const reading: Exercise = {
  id: 'reading',
  icon: '📖',
  domain: 'language',
  name: 'ex.reading.name',
  desc: 'ex.reading.desc',
  why: 'ex.reading.why',
  example: 'ex.reading.example',
  minutes: 2,
  practice: false,

  async run(ctx) {
    const passages = shuffle(PASSAGES[store.data.settings.lang]).slice(0, ROUNDS);
    const scores: number[] = [];
    let understood = 0;
    let wpmSum = 0;

    for (let r = 0; r < passages.length; r++) {
      const p = passages[r];
      ctx.progress(r / ROUNDS, `${r + 1}/${ROUNDS}`);
      const doneBtn = h('button', { class: 'btn primary big' }, t('ex.reading.done'));
      ctx.stage.replaceChildren(
        h('div', { class: 'reading-tag' }, t('ex.reading.aloud')),
        h('p', { class: 'reading-text' }, p.text),
        doneBtn,
      );
      const start = performance.now();
      await ctx.input<void>((done) => {
        doneBtn.onclick = () => done();
      });
      const minutes = (performance.now() - start) / 60000;
      const wpm = Math.round(p.text.split(/\s+/).length / minutes);
      wpmSum += wpm;

      // A comprehension question keeps the reading honest.
      const options = shuffle([0, 1, 2]);
      let onPick: ((i: number) => void) | null = null;
      const btns = options.map((i) => h('button', { class: 'btn', onClick: () => onPick?.(i) }, p.answers[i]));
      ctx.stage.replaceChildren(h('div', { class: 'grid-status' }, p.question), h('div', { class: 'pairs-options single' }, ...btns));
      const said = await ctx.input<number>((done) => {
        onPick = done;
        return () => (onPick = null);
      });
      const ok = said === 0;
      if (ctx.feedback(ok, { was: p.answers[0] })) understood++;
      flash(btns[options.indexOf(said)], ok ? 'good' : 'bad');
      btns[options.indexOf(0)].classList.add('good-btn');
      // Reading aloud clearly runs at about 150–200 words per minute.
      scores.push(scale(wpm, 190, 60) * (ok ? 1 : 0.4));
      await ctx.wait(900);
    }
    ctx.progress(1);
    return {
      score: scores.reduce((a, b) => a + b, 0) / scores.length,
      detail: t('ex.reading.detail', { wpm: Math.round(wpmSum / passages.length), ok: understood, n: passages.length }),
    };
  },
};
