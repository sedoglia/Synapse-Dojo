import { h, rand, flash } from '../dom';
import { t } from '../i18n';
import { onKeys } from '../widgets';
import type { Exercise } from './types';

const limitFor = (level: number) => Math.max(330, Math.round(850 * Math.pow(0.93, level - 1)));

export const gonogo: Exercise = {
  id: 'gonogo',
  icon: '🚦',
  domain: 'attention',
  name: 'ex.gonogo.name',
  desc: 'ex.gonogo.desc',
  why: 'ex.gonogo.why',
  example: 'ex.gonogo.example',
  minutes: 2,
  levels: { min: 1, max: 14, start: 1 },
  levelLabel: (l) => `${limitFor(l)} ms`,

  async run(ctx) {
    const total = ctx.count(35, 18, 6);
    const st = ctx.stair(total, 1, 14);

    const hint = h('div', { class: 'gonogo-hint' }, t('ex.gonogo.hint'));
    const arena = h('div', { class: 'gonogo-arena' });
    const target = h('div', { class: 'gonogo-target' });
    arena.append(target);

    let onTap: (() => void) | null = null;
    arena.onpointerdown = (e: PointerEvent) => {
      e.preventDefault();
      onTap?.();
    };

    onKeys(ctx, { ' ': () => onTap?.(), Enter: () => onTap?.() });

    ctx.stage.append(hint, arena);

    let correct = 0;
    const rts: number[] = [];

    for (let i = 0; i < total; i++) {
      ctx.progress(i / total, `${i + 1}/${total}`);
      target.className = 'gonogo-target empty';
      target.textContent = '+';
      // Rare no-go trials at a quick pace: what actually builds up the urge to respond (Wessel, 2018).
      await ctx.wait(rand(300, 900));

      const isNoGo = Math.random() < 0.2;
      target.className = `gonogo-target ${isNoGo ? 'nogo' : 'go'}`;
      target.textContent = isNoGo ? '✕' : '●';
      flash(target, 'pop', 150);

      const shown = performance.now();
      const limit = limitFor(st.level) * ctx.pace;

      const tapped = await ctx.timed<boolean>(limit, false, (done) => {
        onTap = () => done(true);
        return () => (onTap = null);
      });
      const rt = performance.now() - shown;

      let ok = false;
      if (isNoGo) {
        ok = !tapped;
      } else {
        ok = tapped;
        if (tapped) rts.push(rt);
      }

      ctx.track(st, ok, {
        rt: !isNoGo && tapped ? rt : undefined,
        was: isNoGo ? t('fb.noGo') : t('fb.tooSlow'),
      });

      if (ok) {
        correct++;
        target.classList.add('good-flash');
      } else {
        target.classList.add('bad-flash');
      }

      await ctx.wait(180);
      target.className = 'gonogo-target empty';
      target.textContent = '';
      await ctx.wait(100);
    }

    ctx.progress(1);

    const avg = rts.length ? Math.round(rts.reduce((a, b) => a + b, 0) / rts.length) : 0;
    return {
      score: st.score(),
      detail: t('ex.gonogo.detail', { ok: correct, n: total, ms: avg }),
      level: st.next(),
    };
  },
};
