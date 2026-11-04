import { h, pick, scale, flash } from '../dom';
import { t } from '../i18n';
import { onKeys } from '../widgets';
import type { Exercise } from './types';

type Rule = 'parity' | 'size';
const NUMBERS = [1, 2, 3, 4, 6, 7, 8, 9];
const limitFor = (level: number) => Math.round(3200 * Math.pow(0.9, level - 1));
const switchRateFor = (level: number) => Math.min(0.5, 0.2 + level * 0.03);

/** Left answer = even / lower than 5, right answer = odd / higher than 5. */
const answerFor = (n: number, rule: Rule) => (rule === 'parity' ? (n % 2 === 0 ? 0 : 1) : n < 5 ? 0 : 1);

export const ruleSwitch: Exercise = {
  id: 'switch',
  icon: '🔀',
  domain: 'executive',
  name: 'ex.switch.name',
  desc: 'ex.switch.desc',
  why: 'ex.switch.why',
  example: 'ex.switch.example',
  minutes: 2,
  levels: { min: 1, max: 14, start: 1 },
  levelLabel: (l) => `${limitFor(l)} ms`,

  async run(ctx) {
    const trials = ctx.count(32, 20, 6);
    const st = ctx.stair(trials, 1, 14);
    const cue = h('div', { class: 'switch-cue' });
    const num = h('div', { class: 'switch-num' });
    let onAnswer: ((side: number) => void) | null = null;
    const line = (a: string, b: string) => [h('span', { class: 'l-parity' }, a), h('span', { class: 'l-size' }, b)];
    const left = h('button', { class: 'btn switch-btn', onPointerdown: () => onAnswer?.(0) }, ...line(t('ex.switch.even'), '< 5'));
    const right = h('button', { class: 'btn switch-btn', onPointerdown: () => onAnswer?.(1) }, ...line(t('ex.switch.odd'), '> 5'));
    const pad = h('div', { class: 'switch-pad' }, left, right);
    ctx.stage.append(cue, num, pad);
    onKeys(ctx, { ArrowLeft: () => onAnswer?.(0), ArrowRight: () => onAnswer?.(1) });

    let rule: Rule = pick(['parity', 'size'] as const);
    let correct = 0;
    const rtSwitch: number[] = [];
    const rtRepeat: number[] = [];
    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      const switched = i > 0 && Math.random() < (ctx.quick ? 0.4 : switchRateFor(st.level));
      if (switched) rule = rule === 'parity' ? 'size' : 'parity';
      const n = pick(NUMBERS);

      cue.textContent = rule === 'parity' ? t('ex.switch.parity') : t('ex.switch.size');
      cue.dataset.rule = rule;
      num.dataset.rule = rule;
      pad.dataset.rule = rule;
      num.textContent = String(n);
      flash(num, 'pop', 200);

      const shown = performance.now();
      const limit = ctx.mode !== 'train' ? 60_000 : limitFor(st.level) * ctx.pace;
      const side = await ctx.timed<number | null>(limit, null, (done) => {
        onAnswer = done;
        return () => (onAnswer = null);
      });
      const rt = performance.now() - shown;
      const want = answerFor(n, rule);
      const wantLabel = rule === 'parity' ? (want === 0 ? t('ex.switch.even') : t('ex.switch.odd')) : want === 0 ? '< 5' : '> 5';
      const ok = ctx.track(st, side === want, { rt: side !== null ? rt : undefined, was: wantLabel });
      if (!ok) (want === 0 ? left : right).classList.add('correct-hint');
      if (ok) {
        correct++;
        (switched ? rtSwitch : rtRepeat).push(rt);
      }
      if (side !== null) flash(side === 0 ? left : right, ok ? 'good' : 'bad');
      num.textContent = side === null ? '⏱' : '';
      await ctx.wait(ok ? 300 : 1100);
      left.classList.remove('correct-hint');
      right.classList.remove('correct-hint');
    }
    ctx.progress(1);

    const mean = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
    // Switch cost: how much slower you are right after the rule changes.
    const cost = rtSwitch.length && rtRepeat.length ? Math.round(mean(rtSwitch) - mean(rtRepeat)) : 0;
    const detail = t('ex.switch.detail', { ok: correct, n: trials, cost });
    if (ctx.quick) {
      const avg = mean([...rtSwitch, ...rtRepeat]) || 3000;
      return { score: (correct / trials) * scale(avg / ctx.pace, 700, 3000), detail };
    }
    return { score: st.score(), detail, level: st.next() };
  },
};
