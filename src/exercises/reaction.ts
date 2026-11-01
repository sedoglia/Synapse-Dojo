import { h, rand, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

const targetMsFor = (level: number) => Math.max(190, Math.round(400 * Math.pow(0.92, level - 1)));

export const reaction: Exercise = {
  id: 'reaction',
  icon: '⏱️',
  domain: 'speed',
  name: 'ex.reaction.name',
  desc: 'ex.reaction.desc',
  why: 'ex.reaction.why',
  example: 'ex.reaction.example',
  minutes: 1.5,
  levels: { min: 1, max: 12, start: 1 },
  levelLabel: (l) => `< ${targetMsFor(l)} ms`,

  async run(ctx) {
    const trials = ctx.count(12, 10, 3);
    const st = new Staircase(ctx.level, 1, 12);

    const pad = h('div', { class: 'reaction-pad waiting' });
    const text = h('div', { class: 'reaction-text' }, t('ex.reaction.ready'));
    const subtext = h('div', { class: 'reaction-sub' }, t('ex.reaction.wait'));
    pad.append(text, subtext);
    ctx.stage.append(pad);

    const rts: number[] = [];
    let correct = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);

      pad.className = 'reaction-pad waiting';
      text.textContent = t('ex.reaction.wait');
      subtext.textContent = '...';

      let onEarlyTap: (() => void) | null = null;
      pad.onpointerdown = () => onEarlyTap?.();

      const delay = rand(1300, 3200);

      const delayPromise = ctx.wait(delay);
      const earlyPromise = ctx.input<boolean>((done) => {
        onEarlyTap = () => done(true);
        return () => (onEarlyTap = null);
      });

      // Race between delay passing and player tapping early
      const early = await Promise.race([
        delayPromise.then(() => false),
        earlyPromise,
      ]);

      if (early) {
        pad.className = 'reaction-pad false-start';
        text.textContent = t('ex.reaction.early');
        subtext.textContent = t('ex.reaction.penalty');
        ctx.track(st, false, { was: t('ex.reaction.early') });
        await ctx.wait(1200);
        continue;
      }

      // Ready: trigger GREEN signal
      pad.className = 'reaction-pad active';
      text.textContent = t('ex.reaction.tapNow');
      subtext.textContent = '⚡';
      flash(pad, 'pop', 100);

      const shown = performance.now();

      const rt = await ctx.input<number>((done) => {
        pad.onpointerdown = (e) => {
          e.preventDefault();
          done(performance.now() - shown);
        };
        return () => {
          pad.onpointerdown = null;
        };
      });

      rts.push(rt);
      const target = targetMsFor(st.level) * ctx.pace;
      const ok = rt <= target;
      ctx.track(st, ok, { was: `${Math.round(rt)} ms` });

      if (ok) {
        correct++;
        flash(pad, 'good', 300);
      } else {
        flash(pad, 'bad', 400);
      }

      pad.className = `reaction-pad ${ok ? 'success' : 'slow'}`;
      text.textContent = `${Math.round(rt)} ms`;
      subtext.textContent = ok ? '✓' : `Obiettivo: < ${Math.round(target)} ms`;
      await ctx.wait(800);
    }
    ctx.progress(1);

    const avg = rts.length ? Math.round(rts.reduce((a, b) => a + b, 0) / rts.length) : 0;
    const best = rts.length ? Math.round(Math.min(...rts)) : 0;

    return {
      score: st.score(),
      detail: t('ex.reaction.detail', { ms: avg, best, ok: correct, n: trials }),
      level: st.next(),
    };
  },
};
