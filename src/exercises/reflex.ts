import { h, rand, scale } from '../dom';
import { sfx } from '../audio';
import { t } from '../i18n';
import type { Exercise } from './types';

const FALSE_START_PENALTY = 150; // ms added to the average per false start

type Tap = { early: true } | { early: false; rt: number };

export const reflex: Exercise = {
  id: 'reflex',
  icon: '⚡',
  skill: 'speed',
  name: 'ex.reflex.name',
  desc: 'ex.reflex.desc',

  async run(ctx) {
    const trials = ctx.quick ? 4 : 6;
    const pad = h('button', { class: 'reflex-pad' });
    const last = h('div', { class: 'reflex-last' });
    ctx.stage.append(pad, last);

    const times: number[] = [];
    let falseStarts = 0;
    while (times.length < trials) {
      ctx.progress(times.length / trials, `${times.length + 1}/${trials}`);
      pad.className = 'reflex-pad waiting';
      pad.textContent = t('ex.reflex.wait');

      const res = await ctx.input<Tap>((done) => {
        let goAt = 0;
        const id = setTimeout(() => {
          pad.className = 'reflex-pad go';
          pad.textContent = t('ex.reflex.tap');
          sfx.go();
          goAt = performance.now();
        }, rand(1200, 3800));
        const tap = (e: Event) => {
          e.preventDefault();
          done(goAt ? { early: false, rt: performance.now() - goAt } : { early: true });
        };
        const kb = (e: KeyboardEvent) => {
          if (e.key === ' ') tap(e);
        };
        pad.addEventListener('pointerdown', tap);
        window.addEventListener('keydown', kb);
        return () => {
          clearTimeout(id);
          pad.removeEventListener('pointerdown', tap);
          window.removeEventListener('keydown', kb);
        };
      });

      if (res.early) {
        falseStarts++;
        sfx.bad();
        pad.className = 'reflex-pad early';
        pad.textContent = t('ex.reflex.early');
      } else {
        times.push(res.rt);
        pad.className = 'reflex-pad result';
        pad.textContent = `${Math.round(res.rt)} ms`;
      }
      last.textContent = times.map((x) => Math.round(x)).join(' · ');
      await ctx.wait(900);
    }
    ctx.progress(1);

    const avg = times.reduce((a, b) => a + b, 0) / trials + falseStarts * FALSE_START_PENALTY;
    return { score: scale(avg, 230, 650), detail: t('ex.reflex.avg', { ms: Math.round(avg) }) };
  },
};
