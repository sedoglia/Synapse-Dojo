import { h, rand, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import { keypad, keypadKeyboard } from '../widgets';
import type { Exercise } from './types';

const MIN_SPAN = 2;
const MAX_SPAN = 9;

export const digits: Exercise = {
  id: 'digits',
  icon: '🔟',
  domain: 'wm',
  name: 'ex.digits.name',
  desc: 'ex.digits.desc',
  why: 'ex.digits.why',
  example: 'ex.digits.example',
  minutes: 2.5,
  levels: { min: MIN_SPAN, max: MAX_SPAN, start: 3 },
  levelLabel: (l) => `span ${l}`,

  async run(ctx) {
    const trials = ctx.count(10, 10, 3);
    const st = new Staircase(ctx.level, MIN_SPAN, MAX_SPAN, { target: 0.7 });
    const status = h('div', { class: 'grid-status' });
    const display = h('div', { class: 'digits-display' });
    const slots = h('div', { class: 'digits-slots' });
    let onKey: ((k: string) => void) | null = null;
    const pad = keypad((k) => onKey?.(k));
    ctx.stage.append(status, display, slots, pad);

    let correct = 0;
    let best = 0;
    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      const n = st.int;
      // Unpredictable length forces continuous updating instead of memorizing from the start.
      const seq = Array.from({ length: n + rand(0, 4) }, () => rand(0, 9));
      status.textContent = t('ex.digits.watch', { n });
      slots.textContent = '';
      pad.classList.add('hidden');
      await ctx.wait(700);
      for (const d of seq) {
        display.textContent = String(d);
        flash(display, 'pop', 200);
        await ctx.wait(700 * ctx.pace);
        display.textContent = '';
        await ctx.wait(250);
      }

      status.textContent = t('ex.digits.recall', { n });
      pad.classList.remove('hidden');
      let typed = '';
      const render = () => (slots.textContent = Array.from({ length: n }, (_, k) => typed[k] ?? '_').join(' '));
      render();
      const answer = await ctx.input<string>((done) => {
        onKey = (k) => {
          if (k === 'del') typed = typed.slice(0, -1);
          else if (k === 'clr') typed = '';
          else typed += k;
          render();
          if (typed.length === n) done(typed);
        };
        const off = keypadKeyboard((k) => onKey?.(k));
        return () => {
          off();
          onKey = null;
        };
      });

      const expected = seq.slice(-n).join('');
      const ok = ctx.track(st, answer === expected);
      if (ok) {
        correct++;
        best = Math.max(best, n);
        flash(slots, 'good');
      } else {
        slots.textContent = expected.split('').join(' ');
        flash(slots, 'bad', 600);
      }
      await ctx.wait(ok ? 500 : 1300);
    }
    ctx.progress(1);
    return { score: st.score(), detail: t('ex.digits.detail', { ok: correct, n: trials, span: best }), level: st.next() };
  },
};
