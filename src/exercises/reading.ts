import { h, shuffle, scale, flash } from '../dom';
import { t, passages as allPassages, meta } from '../i18n';
import type { Exercise } from './types';

const ROUNDS = 2;

/** Words in a passage; scripts written without spaces (Chinese, Japanese) count characters instead. */
function wordCount(text: string): number {
  const per = meta().charsPerWord;
  return per ? text.replace(/[\s\p{P}]/gu, '').length / per : text.split(/\s+/).length;
}

export const reading: Exercise = {
  id: 'reading',
  icon: '📖',
  domain: 'language',
  name: 'ex.reading.name',
  desc: 'ex.reading.desc',
  why: 'ex.reading.why',
  example: 'ex.reading.example',
  minutes: [1, 2],
  practice: false,

  async run(ctx) {
    const passages = shuffle(allPassages()).slice(0, ROUNDS);
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
      const wpm = Math.round(wordCount(p.text) / minutes);
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
      // Reading aloud clearly runs at about 150–200 words per minute. Above ~400 wpm the passage can't have
      // been read aloud, so speed earns nothing and only comprehension counts.
      const speed = wpm > 400 ? 0 : scale(wpm, 190, 60);
      scores.push(ok ? 40 + 0.6 * speed : 0.4 * speed);
      await ctx.wait(900);
    }
    ctx.progress(1);
    return {
      score: scores.reduce((a, b) => a + b, 0) / scores.length,
      detail: t('ex.reading.detail', { wpm: Math.round(wpmSum / passages.length), ok: understood, n: passages.length }),
    };
  },
};
