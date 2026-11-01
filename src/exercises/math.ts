import { h, rand, pick, scale, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import { keypad, keypadKeyboard } from '../widgets';
import type { Exercise } from './types';

type Op = '+' | '−' | '×' | '÷';

interface Config {
  big: number; // largest operand for + and −
  ops: Op[];
  mulMax: number;
}

// The daily check keeps the original fixed mix so scores stay comparable over time.
const QUICK: Config = { big: 20, ops: ['+', '−', '×', '÷'], mulMax: 9 };
const BIG = [10, 15, 20, 30, 40, 50, 60, 75, 90, 99];

function configFor(level: number): Config {
  return {
    big: BIG[level - 1],
    ops: level < 3 ? ['+', '−'] : level < 5 ? ['+', '−', '×'] : ['+', '−', '×', '÷'],
    mulMax: level < 6 ? 9 : 12,
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
      const a = rand(2, 9), b = rand(2, c.mulMax);
      return { text: `${a} × ${b}`, answer: a * b };
    }
    case '÷': {
      const b = rand(2, 9), q = rand(2, c.mulMax);
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
  why: 'ex.math.why',
  example: 'ex.math.example',
  minutes: 2,
  levels: { min: 1, max: 10, start: 2 },
  levelLabel: (l) => `${configFor(l).ops.join(' ')} · ≤${BIG[l - 1]}`,

  async run(ctx) {
    const total = ctx.count(20, 12, 4);
    const st = new Staircase(ctx.level, 1, 10);
    const fastEnough = 4000 * ctx.pace;
    const question = h('div', { class: 'math-q' });
    const answer = h('div', { class: 'math-a' });
    let onKey: ((k: string) => void) | null = null;
    ctx.stage.append(
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
      const ok = await ctx.input<boolean>((done) => {
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
      });
      const took = performance.now() - shown;
      solving += took;
      ctx.track(st, ok && took <= fastEnough, { heard: ok, was: String(p.answer) });

      if (ok) {
        correct++;
        flash(answer, 'good');
      } else {
        answer.textContent = `${typed} → ${p.answer}`;
        flash(answer, 'bad', 600);
      }
      await ctx.wait(ok ? 180 : 700);
    }
    ctx.progress(1);

    const secs = solving / 1000;
    const detail = t('ex.math.detail', { ok: correct, n: total, secs: secs.toFixed(1) });
    if (ctx.quick) {
      return { score: (correct / total) * scale(secs / total, 1.5, 6.5), detail };
    }
    return { score: st.score(), detail, level: st.next() };
  },
};
