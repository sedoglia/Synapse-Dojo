import { h, rand, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import type { Exercise } from './types';

const limitFor = (level: number) => Math.max(700, Math.round(2200 * Math.pow(0.9, level - 1)));

export const dualTask: Exercise = {
  id: 'dualTask',
  icon: '🤹',
  domain: 'coordination',
  name: 'ex.dualTask.name',
  desc: 'ex.dualTask.desc',
  why: 'ex.dualTask.why',
  example: 'ex.dualTask.example',
  minutes: 2,
  levels: { min: 1, max: 10, start: 2 },
  levelLabel: (l) => `${limitFor(l)} ms`,

  async run(ctx) {
    const trials = ctx.count(18, 12, 4);
    const st = new Staircase(ctx.level, 1, 10);

    const hint = h('div', { class: 'bilateral-hint' }, t('ex.dualTask.hint'));
    const container = h('div', { class: 'dualtask-container' });

    // Left panel: Motor hold / stabilizer
    const leftPanel = h('div', { class: 'dualtask-panel left-panel' });
    const holdBtn = h('button', { class: 'btn dualtask-hold-btn' }, t('ex.dualTask.hold'));
    const holdMeter = h('div', { class: 'dualtask-meter' }, h('div', { class: 'meter-bar' }));
    leftPanel.append(h('b', {}, 'Mano Sinistra (SX)'), holdBtn, holdMeter);

    // Right panel: Cognitive task (Even vs Odd)
    const rightPanel = h('div', { class: 'dualtask-panel right-panel' });
    const cogCard = h('div', { class: 'dualtask-card' });

    let onCognitiveAnswer: ((ans: 'even' | 'odd') => void) | null = null;
    const btnEven = h('button', { class: 'btn', onPointerdown: () => onCognitiveAnswer?.('even') }, t('ex.dualTask.even'));
    const btnOdd = h('button', { class: 'btn', onPointerdown: () => onCognitiveAnswer?.('odd') }, t('ex.dualTask.odd'));
    const cogButtons = h('div', { class: 'dualtask-buttons' }, btnEven, btnOdd);
    rightPanel.append(h('b', {}, 'Mano Destra (DX)'), cogCard, cogButtons);

    container.append(leftPanel, rightPanel);
    ctx.stage.append(hint, container);

    let isHolding = false;
    holdBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      isHolding = true;
      holdBtn.classList.add('holding');
    });

    const releaseHold = () => {
      isHolding = false;
      holdBtn.classList.remove('holding');
    };
    holdBtn.addEventListener('pointerup', releaseHold);
    holdBtn.addEventListener('pointercancel', releaseHold);
    holdBtn.addEventListener('pointerleave', releaseHold);

    let correct = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      await ctx.wait(rand(300, 700));

      const num = rand(1, 9);
      const isEven = num % 2 === 0;
      const expectedAnswer: 'even' | 'odd' = isEven ? 'even' : 'odd';

      cogCard.textContent = String(num);
      flash(cogCard, 'pop', 150);

      const limit = limitFor(st.level) * ctx.pace;

      const choice = await ctx.timed<'even' | 'odd' | null>(limit, null, (done) => {
        onCognitiveAnswer = (ans) => {
          done(ans);
        };
        return () => (onCognitiveAnswer = null);
      });

      // To succeed, player must choose correctly AND hold the left stabilizer button!
      const ok = choice === expectedAnswer && isHolding;
      ctx.track(st, ok, {
        was: !isHolding ? t('ex.dualTask.notHolding') : isEven ? t('ex.dualTask.even') : t('ex.dualTask.odd'),
      });

      if (ok) {
        correct++;
        flash(choice === 'even' ? btnEven : btnOdd, 'good', 250);
      } else {
        if (!isHolding) flash(holdBtn, 'bad', 400);
        if (choice !== null && choice !== expectedAnswer) {
          flash(choice === 'even' ? btnEven : btnOdd, 'bad', 400);
        }
        await ctx.wait(350);
      }
      cogCard.textContent = choice ? '' : `⏱ ${t('common.timeout')}`;
      await ctx.wait(ok ? 200 : 600);
    }
    ctx.progress(1);

    return {
      score: st.score(),
      detail: t('ex.dualTask.detail', { ok: correct, n: trials }),
      level: st.next(),
    };
  },
};
