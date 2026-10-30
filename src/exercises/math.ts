import { h, rand, pick, scale, flash } from '../dom';
import { sfx } from '../audio';
import type { Exercise } from './types';

interface Problem {
  text: string;
  answer: number;
}

function makeProblem(quick: boolean): Problem {
  const op = pick(['+', '−', '×', '÷'] as const);
  const big = quick ? 20 : 50;
  switch (op) {
    case '+': {
      const a = rand(2, big), b = rand(2, big);
      return { text: `${a} + ${b}`, answer: a + b };
    }
    case '−': {
      const a = rand(10, big * 2), b = rand(1, a);
      return { text: `${a} − ${b}`, answer: a - b };
    }
    case '×': {
      const a = rand(2, 9), b = rand(2, quick ? 9 : 12);
      return { text: `${a} × ${b}`, answer: a * b };
    }
    case '÷': {
      const b = rand(2, 9), q = rand(2, 9);
      return { text: `${b * q} ÷ ${b}`, answer: q };
    }
  }
}

function keypad(onKey: (k: string) => void): HTMLElement {
  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', 'del', '0', 'clr'];
  return h(
    'div',
    { class: 'keypad' },
    ...keys.map((k) =>
      h(
        'button',
        {
          class: `key ${k.length > 1 ? 'key-fn' : ''}`,
          onPointerdown: (e: PointerEvent) => {
            e.preventDefault();
            onKey(k);
          },
        },
        k === 'del' ? '⌫' : k === 'clr' ? 'C' : k,
      ),
    ),
  );
}

export const math: Exercise = {
  id: 'math',
  icon: '➗',
  skill: 'calc',
  name: 'ex.math.name',
  desc: 'ex.math.desc',

  async run(ctx) {
    const total = ctx.quick ? 12 : 20;
    const question = h('div', { class: 'math-q' });
    const answer = h('div', { class: 'math-a' });
    let onKey: ((k: string) => void) | null = null;
    ctx.stage.append(
      h('div', { class: 'math-board' }, question, answer),
      keypad((k) => onKey?.(k)),
    );

    let correct = 0;
    const start = performance.now();
    for (let i = 0; i < total; i++) {
      ctx.progress(i / total, `${i + 1}/${total}`);
      const p = makeProblem(ctx.quick);
      const needed = String(p.answer).length;
      question.textContent = `${p.text} =`;
      answer.textContent = '?';
      let typed = '';

      const ok = await ctx.input<boolean>((done) => {
        onKey = (k) => {
          if (k === 'del') typed = typed.slice(0, -1);
          else if (k === 'clr') typed = '';
          else typed += k;
          answer.textContent = typed || '?';
          if (typed.length >= needed) done(Number(typed) === p.answer);
        };
        const kb = (e: KeyboardEvent) => {
          if (/^[0-9]$/.test(e.key)) onKey?.(e.key);
          else if (e.key === 'Backspace') onKey?.('del');
        };
        window.addEventListener('keydown', kb);
        return () => {
          window.removeEventListener('keydown', kb);
          onKey = null;
        };
      });

      if (ok) {
        correct++;
        sfx.ok();
        flash(answer, 'good');
      } else {
        sfx.bad();
        answer.textContent = `${typed} → ${p.answer}`;
        flash(answer, 'bad', 600);
      }
      await ctx.wait(ok ? 180 : 700);
    }
    ctx.progress(1);

    const secs = (performance.now() - start) / 1000;
    const accuracy = correct / total;
    const score = accuracy * scale(secs / total, 1.6, 7);
    return { score, detail: `${correct}/${total} · ${secs.toFixed(1)} s` };
  },
};
