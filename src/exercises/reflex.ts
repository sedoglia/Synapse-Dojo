import { h, rand } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

const windowFor = (level: number) => Math.max(250, Math.round(1100 * Math.pow(0.9, level - 1)));
const noGoFor = (level: number) => (level >= 3 ? 0.25 : 0);

export const reflex: Exercise = {
  id: 'reflex',
  icon: '⚡',
  domain: 'speed',
  name: 'ex.reflex.name',
  desc: 'ex.reflex.desc',
  why: 'ex.reflex.why',
  example: 'ex.reflex.example',
  minutes: 1.5,
  levels: { min: 1, max: 14, start: 1 },
  levelLabel: (l) => `${windowFor(l)} ms${noGoFor(l) ? ' · go/no-go' : ''}`,

  async run(ctx) {
    const trials = ctx.count(30, 30, 6);
    const st = new Staircase(ctx.level, 1, 14);
    let onTap: ((i: number) => void) | null = null;
    const pads = Array.from({ length: 4 }, (_, i) =>
      h('button', {
        class: 'reflex-pad',
        onPointerdown: (e: PointerEvent) => {
          e.preventDefault();
          onTap?.(i);
        },
      }),
    );
    ctx.stage.append(h('div', { class: 'reflex-hint' }, t('ex.reflex.hint')), h('div', { class: 'reflex-grid' }, ...pads));

    let correct = 0;
    const rts: number[] = [];
    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      await ctx.wait(rand(500, 1300));

      const k = rand(0, 3);
      const noGo = Math.random() < (ctx.practice ? 0.3 : noGoFor(st.int));
      pads[k].classList.add(noGo ? 'nogo' : 'go');
      const shown = performance.now();
      const tapped = await ctx.timed<number | null>(windowFor(st.level) * ctx.pace, null, (done) => {
        onTap = done;
        return () => (onTap = null);
      });
      const rt = performance.now() - shown;
      pads[k].classList.remove('go', 'nogo');

      const ok = ctx.track(st, noGo ? tapped === null : tapped === k);
      if (ok) {
        correct++;
        if (!noGo) rts.push(rt);
      } else {
        const wrong = tapped ?? k;
        pads[wrong].classList.add('wrong');
        await ctx.wait(350);
        pads[wrong].classList.remove('wrong');
      }
    }
    ctx.progress(1);

    const avg = rts.length ? Math.round(rts.reduce((a, b) => a + b, 0) / rts.length) : 0;
    return { score: st.score(), detail: t('ex.reflex.detail', { ms: avg, ok: correct, n: trials }), level: st.next() };
  },
};
