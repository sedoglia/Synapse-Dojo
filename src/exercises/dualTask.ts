import { h, flash } from '../dom';
import { t } from '../i18n';
import { Staircase } from '../adaptive';
import { onKeys } from '../widgets';
import type { Exercise } from './types';

const limitFor = (level: number) => Math.max(1600, Math.round(4000 * Math.pow(0.91, level - 1)));

export const dualTask: Exercise = {
  id: 'dualTask',
  icon: '🤹',
  domain: 'coordination',
  name: 'ex.dualTask.name',
  desc: 'ex.dualTask.desc',
  why: 'ex.dualTask.why',
  example: 'ex.dualTask.example',
  minutes: 2,
  levels: { min: 1, max: 10, start: 1 },
  levelLabel: (l) => `${(limitFor(l) / 1000).toFixed(1)}s`,

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
      h('span', { class: 'pad-key-hint' }, '[A / Spazio / Tap]'),
    );
    const holdMeter = h('div', { class: 'dualtask-meter' }, h('div', { class: 'meter-bar' }));
    leftPanel.append(h('b', { class: 'dualtask-side-label' }, '👈 SX (Left)'), holdBtn, holdMeter);

    // Right panel: Cognitive task (Even vs Odd)
    const rightPanel = h('div', { class: 'dualtask-panel right-panel' });
    const cogCard = h('div', { class: 'dualtask-card' });

    let onCognitiveAnswer: ((ans: 'even' | 'odd') => void) | null = null;
    const btnEven = h(
      'button',
      { class: 'btn dualtask-btn', onPointerdown: () => onCognitiveAnswer?.('even') },
      h('span', {}, t('ex.dualTask.even')),
      h('span', { class: 'pad-key-hint' }, '[1 / J / ←]'),
    );
    const btnOdd = h(
      'button',
      { class: 'btn dualtask-btn', onPointerdown: () => onCognitiveAnswer?.('odd') },
      h('span', {}, t('ex.dualTask.odd')),
      h('span', { class: 'pad-key-hint' }, '[2 / K / →]'),
    );
    const cogButtons = h('div', { class: 'dualtask-buttons' }, btnEven, btnOdd);
    rightPanel.append(h('b', { class: 'dualtask-side-label' }, 'DX (Right) 👉'), cogCard, cogButtons);

    container.append(leftPanel, rightPanel);
    ctx.stage.append(hint, container);

    let isHolding = false;
    let lastHoldingTimestamp = 0;
    let activePointerId: number | null = null;

    const setHolding = (state: boolean) => {
      if (isHolding === state) return;
      isHolding = state;
      if (!state) {
        lastHoldingTimestamp = performance.now();
      }
      holdBtn.classList.toggle('holding', state);
      holdMeter.classList.toggle('holding', state);
      const mainSpan = holdBtn.querySelector('.hold-main');
      if (mainSpan) {
        mainSpan.textContent = state ? '🟢 BLOCCATO (OK)' : `🔒 ${t('ex.dualTask.hold')}`;
      }
    };

    const isHoldValid = () => {
      return isHolding || (performance.now() - lastHoldingTimestamp < 450);
    };

    // Pointer events: pointer capture for touch prevents lost pointer on thumb rolls; toggle for mouse
    holdBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (e.pointerType === 'mouse') {
        setHolding(!isHolding);
      } else {
        try {
          holdBtn.setPointerCapture(e.pointerId);
        } catch {}
        activePointerId = e.pointerId;
        setHolding(true);
      }
    });

    const releasePointerHold = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && activePointerId === e.pointerId) {
        try {
          holdBtn.releasePointerCapture(e.pointerId);
        } catch {}
        activePointerId = null;
        setHolding(false);
      }
    };
    holdBtn.addEventListener('pointerup', releasePointerHold);
    holdBtn.addEventListener('pointercancel', releasePointerHold);

    // Keyboard Space / KeyA / KeyS / ShiftLeft hold for PC
    const onKeyDown = (e: KeyboardEvent) => {
      if (['Space', 'KeyA', 'KeyS', 'ShiftLeft'].includes(e.code) || e.key === ' ') {
        e.preventDefault();
        setHolding(true);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (['Space', 'KeyA', 'KeyS', 'ShiftLeft'].includes(e.code) || e.key === ' ') {
        e.preventDefault();
        setHolding(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Answer shortcuts for right hand
    onKeys(ctx, {
      '1': () => onCognitiveAnswer?.('even'),
      '2': () => onCognitiveAnswer?.('odd'),
      j: () => onCognitiveAnswer?.('even'),
      J: () => onCognitiveAnswer?.('even'),
      k: () => onCognitiveAnswer?.('odd'),
      K: () => onCognitiveAnswer?.('odd'),
      ArrowLeft: () => onCognitiveAnswer?.('even'),
      ArrowRight: () => onCognitiveAnswer?.('odd'),
    });

    let correct = 0;

    for (let i = 0; i < trials; i++) {
      ctx.progress(i / trials, `${i + 1}/${trials}`);
      await ctx.wait(400);

      const num = Math.floor(Math.random() * 9) + 1;
      const isEven = num % 2 === 0;
      const expectedAnswer: 'even' | 'odd' = isEven ? 'even' : 'odd';

      cogCard.textContent = String(num);
      flash(cogCard, 'pop', 150);

      const limit = (ctx.mode === 'practice' ? 60_000 : limitFor(st.level)) * ctx.pace;

      const choice = await ctx.timed<'even' | 'odd' | null>(limit, null, (done) => {
        onCognitiveAnswer = done;
        return () => (onCognitiveAnswer = null);
      });

      const held = isHoldValid();
      const parityOk = choice === expectedAnswer;
      const ok = parityOk && held;

      ctx.track(st, ok, {
        was: !held ? t('ex.dualTask.notHolding') : isEven ? t('ex.dualTask.even') : t('ex.dualTask.odd'),
      });

      if (ok) {
        correct++;
        flash(choice === 'even' ? btnEven : btnOdd, 'good', 250);
        flash(holdBtn, 'good', 250);
      } else {
        if (!held) flash(holdBtn, 'bad', 400);
        if (choice !== null && !parityOk) {
          flash(choice === 'even' ? btnEven : btnOdd, 'bad', 400);
        }
        await ctx.wait(350);
      }
      cogCard.textContent = choice ? '' : `⏱ ${t('common.timeout')}`;
      await ctx.wait(ok ? 250 : 700);
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
