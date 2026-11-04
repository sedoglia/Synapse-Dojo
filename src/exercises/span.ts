import { h, rand, flash } from '../dom';
import { t } from '../i18n';
import { keypad, keypadKeyboard } from '../widgets';
import type { Exercise } from './types';

const MIN_SPAN = 3;
const MAX_SPAN = 9;

export const span: Exercise = {
  id: 'span',
  icon: '🔢',
  domain: 'wm',
  name: 'ex.span.name',
  desc: 'ex.span.desc',
  why: 'ex.span.why',
  example: 'ex.span.example',
  minutes: 2.5,
  levels: { min: MIN_SPAN, max: MAX_SPAN, start: 4 },
  levelLabel: (l) => `${l} 🔢`,

  async run(ctx) {
    const trials = ctx.count(10, 10, 3);
    const st = ctx.stair(trials, MIN_SPAN, MAX_SPAN, { target: 0.75 });
    const status = h('div', { class: 'grid-status' });
    const modeTag = h('div', { class: 'span-mode' });
    const display = h('div', { class: 'digits-display' });
    const slots = h('div', { class: 'digits-slots' });
    let onKey: ((k: string) => void) | null = null;
    const pad = keypad((k) => onKey?.(k));
    ctx.stage.append(status, modeTag, display, slots, pad);

    let correct = 0;
    let best = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      // Forward recall for levels 3–6 to build phonological loop baseline.
      // Backward recall is reserved for advanced levels (7+) as an executive challenge,
      // running two items shorter than forward span to match working memory capacity norms.
      const backward = !ctx.practice && st.int >= 7 && i % 2 === 1;
      const len = backward ? Math.max(MIN_SPAN, st.int - 2) : st.int;

      modeTag.textContent = backward ? t('ex.span.backward') : t('ex.span.forward');
      modeTag.className = `span-mode ${backward ? 'alt' : ''}`;
      status.textContent = t('ex.span.watch', { n: len });
      slots.textContent = '';
      pad.classList.add('hidden');

      // Generate random non-repeating consecutive digits
      const digits: number[] = [];
      for (let j = 0; j < len; j++) {
        let d = rand(0, 9);
        while (digits.length && digits[digits.length - 1] === d) d = rand(0, 9);
        digits.push(d);
      }

      await ctx.wait(600);

      // Present digits one by one
      for (const d of digits) {
        display.textContent = String(d);
        flash(display, 'pop', 200);
        await ctx.wait(650 * ctx.pace);
        display.textContent = '';
        await ctx.wait(250);
      }

      status.textContent = backward ? t('ex.span.recallBack') : t('ex.span.recallFor');
      pad.classList.remove('hidden');

      let typed = '';
      const render = () => (slots.textContent = Array.from({ length: len }, (_, k) => typed[k] ?? '_').join(' '));
      render();

      const answer = await ctx.input<string>((done) => {
        onKey = (k) => {
          if (k === 'del') typed = typed.slice(0, -1);
          else if (k === 'clr') typed = '';
          else if (typed.length < len && /^[0-9]$/.test(k)) typed += k;
          render();
          if (typed.length === len) done(typed);
        };
        const off = keypadKeyboard((k) => onKey?.(k));
        return () => {
          off();
          onKey = null;
        };
      });

      const expected = (backward ? [...digits].reverse() : digits).join('');
      const ok = ctx.track(st, answer === expected, { was: expected.split('').join(' ') });
      if (ok) {
        correct++;
        best = Math.max(best, len);
        flash(slots, 'good');
      } else {
        slots.textContent = expected.split('').join(' ');
        flash(slots, 'bad', 600);
      }
      await ctx.wait(ok ? 500 : 1200);
    }
    ctx.progress(1);

    const { score, timeBonus } = ctx.withTimeBonus(st.score(), 0.8 + 0.6 * st.threshold());
    return {
      score,
      detail: t('ex.span.detail', { ok: correct, n: trials, span: best }),
      level: st.next(),
      timeBonus,
    };
  },
};
