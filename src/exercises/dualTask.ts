import { h, flash, rand } from '../dom';
import { sfx } from '../audio';
import { t, num } from '../i18n';
import { onKeys, timeBar } from '../widgets';
import type { Exercise } from './types';

const limitFor = (level: number) => Math.max(800, Math.round(4000 * Math.pow(0.835, level - 1)));

export const dualTask: Exercise = {
  id: 'dualTask',
  icon: '🤹',
  domain: 'coordination',
  name: 'ex.dualTask.name',
  desc: 'ex.dualTask.desc',
  how: 'ex.dualTask.how',
  why: 'ex.dualTask.why',
  example: 'ex.dualTask.example',
  minutes: [1, 2],
  levels: { min: 1, max: 10, start: 1 },
  levelLabel: (l) => `${num(limitFor(l) / 1000)} s`,

  async run(ctx) {
    const trials = ctx.count(18, 12, 4);
    const st = ctx.stair(trials, 1, 10);

    const hint = h('div', { class: 'bilateral-hint' }, t('ex.dualTask.hint'));
    const container = h('div', { class: 'dualtask-container' });

    // Left panel: Motor hold / stabilizer
    const leftPanel = h('div', { class: 'dualtask-panel left-panel' });
    const holdBtn = h(
      'button',
      { class: 'btn dualtask-hold-btn' },
      h('span', { class: 'hold-main' }, `🔒 ${t('ex.dualTask.hold')}`),
      h('span', { class: 'pad-key-hint' }, '[A / ␣]'),
    );
    const holdMeter = h('div', { class: 'dualtask-meter' }, h('div', { class: 'meter-bar' }));
    leftPanel.append(h('b', { class: 'dualtask-side-label' }, `👈 ${t('ex.dots.left')}`), holdBtn, holdMeter);

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
    rightPanel.append(h('b', { class: 'dualtask-side-label' }, `${t('ex.dots.right')} 👉`), cogCard, cogButtons);

    container.append(leftPanel, rightPanel);
    const bar = timeBar();
    bar.el.classList.toggle('off', ctx.practice);
    ctx.stage.append(hint, bar.el, container);

    let isHolding = false;
    let lastHoldingTimestamp = 0;
    let activePointerId: number | null = null;
    // The hold must last the whole trial: letting go for longer than the grace period breaks it.
    const GRACE_MS = 450;
    let trialActive = false;
    let holdBroken = false;
    let breakTimer: ReturnType<typeof setTimeout> | undefined;

    const setHolding = (state: boolean) => {
      if (isHolding === state) return;
      isHolding = state;
      clearTimeout(breakTimer);
      if (state) sfx.tick();
      if (!state) {
        lastHoldingTimestamp = performance.now();
        if (trialActive) breakTimer = setTimeout(() => (holdBroken = trialActive && !isHolding), GRACE_MS);
      }
      holdBtn.classList.toggle('holding', state);
      holdMeter.classList.toggle('holding', state);
      const mainSpan = holdBtn.querySelector('.hold-main');
      if (mainSpan) {
        mainSpan.textContent = state ? `⚡ ${t('ex.dualTask.hold')} ✓` : `🔒 ${t('ex.dualTask.hold')}`;
      }
    };

    const isHoldValid = () => {
      return !holdBroken && (isHolding || performance.now() - lastHoldingTimestamp < GRACE_MS);
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
    // Removed when the exercise ends or the player quits.
    void ctx
      .input<never>(() => () => {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
        clearTimeout(breakTimer);
      })
      .catch(() => {});

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

      const num = rand(1, 9);
      const isEven = num % 2 === 0;
      const expectedAnswer: 'even' | 'odd' = isEven ? 'even' : 'odd';

      cogCard.textContent = String(num);
      flash(cogCard, 'pop', 150);
      trialActive = true;

      const limit = (ctx.mode === 'practice' ? 60_000 : limitFor(st.level)) * ctx.pace;

      bar.start(limit);
      const choice = await ctx.timed<'even' | 'odd' | null>(limit, null, (done) => {
        onCognitiveAnswer = done;
        return () => (onCognitiveAnswer = null);
      });

      bar.stop();
      trialActive = false;
      const held = isHoldValid();
      holdBroken = false;
      const parityOk = choice === expectedAnswer;
      const ok = parityOk && held;

      ctx.track(st, ok, {
        note: !held ? t('ex.dualTask.notHolding') : choice === null ? t('common.timeout') : undefined,
        was: held && choice !== null ? (isEven ? t('ex.dualTask.even') : t('ex.dualTask.odd')) : undefined,
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

    ctx.progress(1);

    const { score, timeBonus } = ctx.withTimeBonus(st.score(), 2.5);
    return {
      score,
      detail: t('ex.dualTask.detail', { ok: correct, n: trials }),
      level: st.next(),
      timeBonus,
    };
  },
};
