import { h, rand, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import { onKeys } from '../widgets';
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
    const holdBtn = h(
      'button',
      { class: 'btn dualtask-hold-btn' },
      h('span', { class: 'hold-main' }, `🔒 ${t('ex.dualTask.hold')}`),
      h('span', { class: 'pad-key-hint' }, '[Spazio / Space]'),
    );
    const holdMeter = h('div', { class: 'dualtask-meter' }, h('div', { class: 'meter-bar' }));
    leftPanel.append(h('b', { class: 'dualtask-side-label' }, '👈 SX (Left)'), holdBtn, holdMeter);

    // Right panel: Cognitive task (Even vs Odd)
    const rightPanel = h('div', { class: 'dualtask-panel right-panel' });
    const cogCard = h('div', { class: 'dualtask-card' });

    let onCognitiveAnswer: ((ans: 'even' | 'odd') => void) | null = null;
    const btnEven = h(
      'button',
      { class: 'btn', onPointerdown: () => onCognitiveAnswer?.('even') },
      h('span', {}, t('ex.dualTask.even')),
      h('span', { class: 'pad-key-hint' }, '[1 / ←]'),
    );
    const btnOdd = h(
      'button',
      { class: 'btn', onPointerdown: () => onCognitiveAnswer?.('odd') },
      h('span', {}, t('ex.dualTask.odd')),
      h('span', { class: 'pad-key-hint' }, '[2 / →]'),
    );
    const cogButtons = h('div', { class: 'dualtask-buttons' }, btnEven, btnOdd);
    rightPanel.append(h('b', { class: 'dualtask-side-label' }, 'DX (Right) 👉'), cogCard, cogButtons);

    container.append(leftPanel, rightPanel);
    ctx.stage.append(hint, container);

    let isHolding = false;

    const setHolding = (state: boolean) => {
      isHolding = state;
      holdBtn.classList.toggle('holding', state);
      holdMeter.classList.toggle('holding', state);
      const mainSpan = holdBtn.querySelector('.hold-main');
      if (mainSpan) {
        mainSpan.textContent = state ? '🟢 BLOCCATO (OK)' : `🔒 ${t('ex.dualTask.hold')}`;
      }
    };

    // Pointer events for touch screen thumb hold and mouse hold
    holdBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      // If pointer is mouse and was already holding, allow toggle
      if (e.pointerType === 'mouse' && isHolding) {
        setHolding(false);
      } else {
        setHolding(true);
      }
    });

    const releasePointerHold = (e: PointerEvent) => {
      // For touch, release immediately on pointer up/cancel
      if (e.pointerType === 'touch') {
        setHolding(false);
      }
    };
    holdBtn.addEventListener('pointerup', releasePointerHold);
    holdBtn.addEventListener('pointercancel', releasePointerHold);

    // Keyboard Space / KeyA / ShiftLeft hold for PC
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ' || e.code === 'KeyA' || e.code === 'ShiftLeft') {
        e.preventDefault();
        setHolding(true);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === ' ' || e.code === 'KeyA' || e.code === 'ShiftLeft') {
        e.preventDefault();
        setHolding(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Answer shortcuts for right hand
    onKeys(ctx, {
      '1': () => onCognitiveAnswer?.('even'),
      ArrowLeft: () => onCognitiveAnswer?.('even'),
      '2': () => onCognitiveAnswer?.('odd'),
      ArrowRight: () => onCognitiveAnswer?.('odd'),
    });

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
        onCognitiveAnswer = done;
        return () => (onCognitiveAnswer = null);
      });

      // To succeed, player must choose correctly AND maintain the stabilizer hold!
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

    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    ctx.progress(1);

    return {
      score: st.score(),
      detail: t('ex.dualTask.detail', { ok: correct, n: trials }),
      level: st.next(),
    };
  },
};
