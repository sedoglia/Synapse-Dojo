import { h, rand, pick, scale, flash } from '../dom';
import { t, num } from '../i18n';
import { keypad, keypadKeyboard, timeBar } from '../widgets';
import type { Exercise } from './types';

type Op = '+' | '−' | '×' | '÷';

interface Config {
  big: number; // largest operand for + and −
  ops: Op[];
  mulMax: number;
  mulA: number; // largest first factor and divisor
}

// The daily check keeps the original fixed mix so scores stay comparable over time.
const QUICK: Config = { big: 20, ops: ['+', '−', '×', '÷'], mulMax: 9, mulA: 9 };
const BIG = [10, 15, 20, 30, 40, 50, 60, 75, 90, 99];

/** A right answer within this time counts toward the next level (it still sounds right when slower). */
const FAST_MS = 4000;
/**
 * Time allowed per calculation in training, shown by a bar: twice the level-up time, and the point where the daily
 * check's speed scale reaches zero. Arithmetic fluency is practised and measured against the clock (as in the timed
 * fluency tests and in Kawashima's Learning Therapy), but time pressure also costs anxious solvers working memory
 * (Ashcraft & Kirk 2001), so the limit is generous: past it an answer is being worked out step by step, not recalled.
 * The difficulty itself stays adaptive (operations and number size); the limit does not shrink with the level.
 * No limit in the daily check, whose scale is calibrated untimed, nor in the practice round.
 */
const LIMIT_MS = 8000;

function configFor(level: number): Config {
  return {
    big: BIG[level - 1],
    ops: level < 3 ? ['+', '−'] : level < 5 ? ['+', '−', '×'] : ['+', '−', '×', '÷'],
    // Times and divisions grow too, or half of the hardest levels would still be easy tables.
    mulMax: level < 6 ? 9 : level < 8 ? 12 : 15,
    mulA: level < 8 ? 9 : 12,
  };
}

function makeProblem(c: Config): { text: string; answer: number } {
  switch (pick(c.ops)) {
    case '+': {
      const a = rand(2, c.big), b = rand(2, c.big);
      return { text: `${a} + ${b}`, answer: a + b };
    }
    case '−': {
      const a = rand(5, c.big * 2), b = rand(1, a);
      return { text: `${a} − ${b}`, answer: a - b };
    }
    case '×': {
      const a = rand(2, c.mulA), b = rand(2, c.mulMax);
      return { text: `${a} × ${b}`, answer: a * b };
    }
    case '÷': {
      const b = rand(2, c.mulA), q = rand(2, c.mulMax);
      return { text: `${b * q} ÷ ${b}`, answer: q };
    }
  }
}

export const math: Exercise = {
  id: 'math',
  icon: '➗',
  domain: 'language',
  name: 'ex.math.name',
  desc: 'ex.math.desc',
  how: 'ex.math.how',
  why: 'ex.math.why',
  example: 'ex.math.example',
  minutes: [1, 2],
  levels: { min: 1, max: 10, start: 2 },
  levelLabel: (l) => `${configFor(l).ops.join(' ')} · ≤${BIG[l - 1]}`,

  async run(ctx) {
    const total = ctx.count(20, 12, 4);
    const st = ctx.stair(total, 1, 10);
    const fastEnough = FAST_MS * ctx.pace;
    const timed = ctx.mode === 'train';
    const limit = LIMIT_MS * ctx.pace;
    const question = h('div', { class: 'math-q' });
    const answer = h('div', { class: 'math-a' });
    const bar = timeBar();
    bar.el.classList.toggle('off', !timed);
    let onKey: ((k: string) => void) | null = null;
    ctx.stage.append(
      bar.el,
      h('div', { class: 'math-board' }, question, answer),
      keypad((k) => onKey?.(k)),
    );

    let correct = 0;
    let solving = 0; // time spent answering, excluding the feedback pauses between problems
    for (let i = 0; i < total; i++) {
      ctx.progress(i / total, `${i + 1}/${total}`);
      const p = makeProblem(ctx.quick ? QUICK : configFor(st.int));
      const needed = String(p.answer).length;
      question.textContent = `${p.text} =`;
      answer.textContent = '?';
      let typed = '';

      const shown = performance.now();
      const listen = (done: (ok: boolean | null) => void) => {
        onKey = (k) => {
          if (k === 'del') typed = typed.slice(0, -1);
          else if (k === 'clr') typed = '';
          else typed += k;
          answer.textContent = typed || '?';
          if (typed.length >= needed) done(Number(typed) === p.answer);
        };
        const off = keypadKeyboard((k) => onKey?.(k));
        return () => {
          off();
          onKey = null;
        };
      };
      if (timed) bar.start(limit);
      // null: the time ran out.
      const said = timed ? await ctx.timed<boolean | null>(limit, null, listen) : await ctx.input<boolean | null>(listen);
      bar.stop();
      const ok = said === true;
      const took = said === null ? limit : performance.now() - shown;
      solving += took;
      ctx.track(st, ok && took <= fastEnough, {
        heard: ok,
        was: String(p.answer),
        note: said === null ? t('common.timeout') : undefined,
      });

      if (ok) {
        correct++;
        flash(answer, 'good');
      } else {
        answer.textContent = `${typed || (said === null ? '⏱' : '')} → ${p.answer}`;
        flash(answer, 'bad', 600);
      }
      await ctx.wait(ok ? 180 : 700);
    }
    ctx.progress(1);

    const secs = solving / 1000;
    const detail = t('ex.math.detail', { ok: correct, n: total, secs: num(secs) });
    if (ctx.quick) {
      return { score: (correct / total) * scale(secs / total / ctx.pace, 1.5, 8), detail };
    }
    const { score, timeBonus } = ctx.withTimeBonus(st.score(), 3.0);
    return { score, detail, level: st.next(), timeBonus };
  },
};
