import { h, rand, flash, clamp } from '../dom';
import { sfx } from '../audio';
import { store } from '../storage';
import { t, meta } from '../i18n';
import { onKeys } from '../widgets';
import type { Exercise } from './types';

const MAX_LEVEL = 12;
/**
 * Letters whose spoken names are easy to tell apart in each language
 * (no "ci"/"ti" or "acca"/"cappa" in Italian, no "bee"/"dee"/"tee" in English).
 */
const BLOCKS = 2;
const TARGET_RATE = 0.3;

/** Level 1 = 1-back position; each level alternates adding the letter stream and raising N. */
const nFor = (level: number) => 1 + Math.floor((level - 1) / 2);
const dualFor = (level: number) => (level - 1) % 2 === 1;
const labelFor = (level: number) => `${nFor(level)}-back${dualFor(level) ? ' ×2' : ''}`;

/** A stream where about TARGET_RATE of items repeat the one N steps back, never fewer than 20% (min 2). */
function stream<T>(len: number, n: number, values: readonly T[]): T[] {
  const minTargets = Math.max(2, Math.ceil((len - n) * 0.2));
  for (;;) {
    const out = rawStream(len, n, values);
    if (out.filter((v, i) => i >= n && v === out[i - n]).length >= minTargets) return out;
  }
}

function rawStream<T>(len: number, n: number, values: readonly T[]): T[] {
  const out: T[] = [];
  for (let i = 0; i < len; i++) {
    if (i >= n && Math.random() < TARGET_RATE) out.push(out[i - n]);
    else {
      let v: T;
      do v = values[rand(0, values.length - 1)];
      while (i >= n && v === out[i - n]);
      out.push(v);
    }
  }
  return out;
}

/** Small 3×3 picture of one item (lit square, plus its letter in dual mode) for the practice strip. */
function mini(pos: number, letter: string): HTMLElement {
  return h('div', { class: 'echo-mini' }, ...Array.from({ length: 9 }, (_, i) => h('span', { class: i === pos ? 'on' : '' }, i === pos ? letter : '')));
}

/** Speaks a letter with a voice for the current language. Returns false when sound is off or unsupported. */
function speak(letter: string): boolean {
  if (!store.data.settings.sound || !('speechSynthesis' in window)) return false;
  const lang = meta().speech;
  const u = new SpeechSynthesisUtterance(letter.toLowerCase());
  u.lang = lang;
  u.rate = 0.95;
  u.voice = speechSynthesis.getVoices().find((v) => v.lang.replace('_', '-').startsWith(lang.slice(0, 2))) ?? null;
  // Speaking right after cancel() is sometimes dropped by Chrome, so only cancel when needed and speak a tick later.
  if (speechSynthesis.speaking || speechSynthesis.pending) speechSynthesis.cancel();
  setTimeout(() => speechSynthesis.speak(u), 30);
  return true;
}

export const echo: Exercise = {
  id: 'echo',
  icon: '🔁',
  domain: 'wm',
  name: 'ex.echo.name',
  desc: 'ex.echo.desc',
  why: 'ex.echo.why',
  example: 'ex.echo.example',
  minutes: [2, 4],
  levels: { min: 1, max: MAX_LEVEL, start: 1 },
  levelLabel: labelFor,

  async run(ctx) {
    const series = h('div', { class: 'echo-series' });
    const rule = h('div', { class: 'echo-rule' });
    const turn = h('div', { class: 'echo-turn' });
    const cells = Array.from({ length: 9 }, () => h('div', { class: 'echo-cell' }));
    const board = h('div', { class: 'echo-grid' }, ...cells);
    const timer = h('div', { class: 'echo-timer' }, h('div'));
    let pressPos: (() => void) | null = null;
    let pressLetter: (() => void) | null = null;
    const posBtn = h('button', { class: 'btn big', onPointerdown: () => pressPos?.() }, `${t('ex.echo.pos')} (A)`);
    const letBtn = h('button', { class: 'btn big', onPointerdown: () => pressLetter?.() }, `${t('ex.echo.letter')} (L)`);
    // During practice a strip under the grid shows the last N+1 items and highlights the one to compare with.
    const strip = h('div', { class: 'echo-strip' });
    const actions = h('div', { class: 'echo-actions' }, posBtn, letBtn);
    ctx.stage.append(series, rule, turn, board, timer, ...(ctx.practice ? [strip] : []), actions);
    onKeys(ctx, { a: () => pressPos?.(), A: () => pressPos?.(), l: () => pressLetter?.(), L: () => pressLetter?.() });

    /** Shows a card over the stage and waits for its button. */
    const card = async (...content: (HTMLElement | null)[]) => {
      const go = h('button', { class: 'btn primary' }, t('common.continue'));
      const note = h('div', { class: 'card interlude' }, ...content.filter((c): c is HTMLElement => !!c), go);
      ctx.stage.append(note);
      await ctx.input<void>((done) => {
        go.onclick = () => done();
      });
      note.remove();
    };

    // Practice runs at the player's own level, so the dual version can be practised with the memory strip too.
    // The daily check starts at 2-back and uses single streams only, so it can measure 1-back to 3-back in two series.
    let level = ctx.quick ? 3 : Math.round(ctx.practice ? store.level('echo', 1) : ctx.level);
    const blocks = ctx.practice ? 1 : BLOCKS;
    const blockScores: number[] = [];
    let checkScore = 0;
    for (let b = 0; b < blocks; b++) {
      const n = nFor(level);
      const dual = dualFor(level);
      const len = (ctx.practice ? 8 : 20) + n;
      const back = n === 1 ? t('ex.echo.back1') : t('ex.echo.backN', { n });
      const positions = stream(len, n, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
      const letters = stream(len, n, meta().letters);
      series.textContent = t('ex.echo.series', { i: b + 1, n: blocks });
      rule.textContent = dual
        ? t('ex.echo.ruleDual', { n, back })
        : n === 1
          ? t('ex.echo.rule1')
          : t('ex.echo.rule', { n });
      letBtn.classList.toggle('hidden', !dual);
      actions.classList.toggle('single', !dual);
      turn.textContent = '';

      // Every series opens with a card: which one it is, the rule, and how long it lasts.
      // The first time the letter stream appears, the same card explains it.
      const firstDual = dual && ctx.mode === 'train' && !store.data.practiced.includes('echo-dual');
      if (firstDual) {
        store.data.practiced.push('echo-dual');
        store.save();
      }
      await card(
        h('h3', {}, `${firstDual ? '🔊 ' : ''}${t('ex.echo.series', { i: b + 1, n: blocks })} · ${labelFor(level)}`),
        firstDual ? h('p', {}, t('ex.echo.dualText', { back })) : null,
        h('p', {}, n === 1 ? t('ex.echo.seriesStart1', { len }) : t('ex.echo.seriesStartN', { len, k: n })),
      );

      // Per modality: hits on targets and false alarms on non-targets.
      const tally = { pos: { hit: 0, targets: 0, fa: 0, other: 0 }, let: { hit: 0, targets: 0, fa: 0, other: 0 } };
      const count = (m: typeof tally.pos, isTarget: boolean, pressed: boolean) => {
        if (isTarget) {
          m.targets++;
          if (pressed) m.hit++;
        } else {
          m.other++;
          if (pressed) m.fa++;
        }
      };

      for (let i = 0; i < len; i++) {
        ctx.progress((b + i / len) / blocks, `${b + 1}/${blocks} · ${i + 1}/${len}`);
        const warmup = i < n; // nothing to compare with yet
        const posTarget = !warmup && positions[i] === positions[i - n];
        const letTarget = !warmup && letters[i] === letters[i - n];
        let posPressed = false;
        let letPressed = false;
        turn.textContent = warmup
          ? t('ex.echo.turnWait', { i: i + 1, len })
          : t(dual ? 'ex.echo.turnAskDual' : 'ex.echo.turnAsk', { i: i + 1, len, back });
        turn.classList.toggle('wait', warmup);
        turn.classList.remove('good-cr');
        posBtn.classList.toggle('off', warmup);
        letBtn.classList.toggle('off', warmup);

        // A press is judged immediately, so the ✓/✗ clearly belongs to the square on screen.
        pressPos = warmup
          ? null
          : () => {
              if (posPressed) return;
              posPressed = true;
              flash(posBtn, posTarget ? 'good' : 'bad');
              ctx.feedback(posTarget, { was: dual ? `${t('ex.echo.pos').toUpperCase()}: ${t('fb.echoNotSame')}` : t('fb.echoNotSame') });
            };
        pressLetter =
          warmup || !dual
            ? null
            : () => {
                if (letPressed) return;
                letPressed = true;
                flash(letBtn, letTarget ? 'good' : 'bad');
                ctx.feedback(letTarget, { was: `${t('ex.echo.letter').toUpperCase()}: ${t('fb.echoNotSameLetter')}` });
              };

        if (ctx.practice) {
          const from = Math.max(0, i - n);
          strip.replaceChildren(
            h(
              'div',
              { class: 'echo-strip-items' },
              ...Array.from({ length: i - from + 1 }, (_, k) => {
                const j = from + k;
                const tag = j === i ? t('ex.echo.now') : j === i - n ? t('ex.echo.ago', { n }) : '';
                return h(
                  'div',
                  { class: `echo-strip-item ${j === i ? 'now' : ''} ${j === i - n ? 'compare' : ''}` },
                  mini(positions[j], dual ? letters[j] : ''),
                  h('small', {}, tag || ' '),
                );
              }),
            ),
            h('p', { class: 'echo-strip-hint' }, warmup ? t('ex.echo.stripWait') : t(dual ? 'ex.echo.stripCompareDual' : 'ex.echo.stripCompare')),
          );
        }

        // The turn: the square lights up with a tick, and a bar shows the time left to answer.
        const windowMs = 600 + 2200 * ctx.pace;
        const bar = timer.firstElementChild as HTMLElement;
        bar.style.transition = 'none';
        bar.style.width = '100%';
        void bar.offsetWidth;
        bar.style.transition = `width ${windowMs}ms linear`;
        bar.style.width = '0%';
        board.classList.remove('between');
        sfx.tick();
        const cell = cells[positions[i]];
        cell.classList.add('lit');
        // The letter is spoken and also written in the square, so it can always be double-checked.
        if (dual) {
          speak(letters[i]);
          cell.textContent = letters[i];
        }
        await ctx.wait(600);
        cell.classList.remove('lit');
        cell.textContent = '';
        await ctx.wait(windowMs - 600);

        // End of the turn: a missed match is reported now, before the next square appears.
        pressPos = pressLetter = null;
        let pause = 450;
        if (!warmup) {
          count(tally.pos, posTarget, posPressed);
          if (dual) count(tally.let, letTarget, letPressed);
          const missed = [posTarget && !posPressed ? t('ex.echo.pos') : '', dual && letTarget && !letPressed ? t('ex.echo.letter') : '']
            .filter(Boolean)
            .join(' + ');
          if (missed) {
            if (posTarget && !posPressed) flash(posBtn, 'bad');
            if (dual && letTarget && !letPressed) flash(letBtn, 'bad');
            ctx.feedback(false, { was: t('fb.echoMissed', { btn: missed.toUpperCase() }) });
            pause = 1200; // leave time to read the message before the next square
          } else {
            const nothingToPress = !posTarget && (!dual || !letTarget);
            const nothingPressed = !posPressed && (!dual || !letPressed);
            if (nothingToPress && nothingPressed) {
              flash(timer, 'echo-timer-good', 450);
              flash(board, 'echo-grid-zen', 450);
              flash(posBtn, 'echo-btn-zen', 500);
              if (dual) flash(letBtn, 'echo-btn-zen', 500);
              turn.textContent = t('ex.echo.cr');
              turn.classList.add('good-cr');
              if (ctx.practice) {
                const hint = strip.querySelector('.echo-strip-hint');
                if (hint) {
                  hint.textContent = t('ex.echo.crPractice');
                  hint.classList.add('good');
                }
              }
              ctx.feedback(true, { note: t('ex.echo.crNote') });
              pause = 700;
            } else if (dual) {
              if (!posTarget && !posPressed) flash(posBtn, 'echo-btn-zen', 400);
              if (!letTarget && !letPressed) flash(letBtn, 'echo-btn-zen', 400);
            }
          }
        }
        board.classList.add('between');
        await ctx.wait(pause);
      }
      pressPos = pressLetter = null;
      turn.textContent = '';
      posBtn.classList.remove('off');
      letBtn.classList.remove('off');

      // Hit rate minus false-alarm rate per modality: pressing nothing (or everything) scores 0,
      // unlike plain percent-correct, where staying silent already gives ~70%.
      const sens = (m: typeof tally.pos) => (m.targets ? m.hit / m.targets : 1) - (m.other ? m.fa / m.other : 0);
      const acc = clamp(dual ? (sens(tally.pos) + sens(tally.let)) / 2 : sens(tally.pos), 0, 1);
      blockScores.push(((level - 1 + acc) / MAX_LEVEL) * 100);
      checkScore = ((n - 1 + acc) / 3) * 100;
      const before = level;
      // ≥ 0.8 (e.g. 90% hits with 10% false alarms) moves up, < 0.5 moves down.
      if (ctx.quick) level = acc >= 0.8 ? 5 : acc < 0.5 ? 1 : 3;
      else if (acc >= 0.8) level = Math.min(MAX_LEVEL, level + 1);
      else if (acc < 0.5) level = Math.max(1, level - 1);
      if (acc >= 0.8) sfx.fanfare();

      // Every series ends with its own summary, so the boundary between series is unmistakable.
      await card(
        h('h3', {}, `🏁 ${t('ex.echo.seriesEnd', { i: b + 1, n: blocks })}`),
        h('p', {}, t('ex.echo.seriesScore', { acc: Math.round(acc * 100), hit: tally.pos.hit + tally.let.hit, targets: tally.pos.targets + tally.let.targets, fa: tally.pos.fa + tally.let.fa })),
        ctx.practice ? null : h('p', {}, t('common.levelChange', { from: labelFor(before), to: labelFor(level) })),
      );
    }
    ctx.progress(1);

    const base = clamp(blockScores.reduce((a, b) => a + b, 0) / blockScores.length, 0, 100);
    // No speed bonus: the pace of the stream is fixed, so it would only reward pressing hastily.
    return { score: ctx.quick ? checkScore : base, detail: `${t('common.level')}: ${labelFor(level)}`, level };
  },
};
