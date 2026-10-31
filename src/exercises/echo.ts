import { h, rand, flash, clamp } from '../dom';
import { sfx } from '../audio';
import { store } from '../storage';
import { t } from '../i18n';
import { onKeys } from '../widgets';
import type { Exercise } from './types';

const MAX_LEVEL = 12;
const LETTERS = ['C', 'H', 'K', 'L', 'Q', 'R', 'S', 'T'];
const BLOCKS = 2;
const TARGET_RATE = 0.3;

/** Level 1 = 1-back position; each level alternates adding the letter stream and raising N. */
const nFor = (level: number) => 1 + Math.floor((level - 1) / 2);
const dualFor = (level: number) => (level - 1) % 2 === 1;
const labelFor = (level: number) => `${nFor(level)}-back${dualFor(level) ? ' ×2' : ''}`;

/** A stream where roughly TARGET_RATE of items repeat the one N steps back. */
function stream<T>(len: number, n: number, values: readonly T[]): T[] {
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

function speak(letter: string): boolean {
  if (!store.data.settings.sound || !('speechSynthesis' in window)) return false;
  const u = new SpeechSynthesisUtterance(letter);
  u.lang = store.data.settings.lang === 'it' ? 'it-IT' : 'en-US';
  u.rate = 1.1;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
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
  minutes: 3,
  levels: { min: 1, max: MAX_LEVEL, start: 1 },
  levelLabel: labelFor,

  async run(ctx) {
    const rule = h('div', { class: 'echo-rule' });
    const cells = Array.from({ length: 9 }, () => h('div', { class: 'echo-cell' }));
    const board = h('div', { class: 'echo-grid' }, ...cells);
    let pressPos: (() => void) | null = null;
    let pressLetter: (() => void) | null = null;
    const posBtn = h('button', { class: 'btn big', onPointerdown: () => pressPos?.() }, `${t('ex.echo.pos')} (A)`);
    const letBtn = h('button', { class: 'btn big', onPointerdown: () => pressLetter?.() }, `${t('ex.echo.letter')} (L)`);
    // During practice a strip under the grid shows the last N+1 items and highlights the one to compare with.
    const strip = h('div', { class: 'echo-strip' });
    ctx.stage.append(rule, board, ...(ctx.practice ? [strip] : []), h('div', { class: 'echo-actions' }, posBtn, letBtn));
    onKeys(ctx, { a: () => pressPos?.(), A: () => pressPos?.(), l: () => pressLetter?.(), L: () => pressLetter?.() });

    let level = Math.round(ctx.level);
    const blocks = ctx.practice ? 1 : BLOCKS;
    const blockScores: number[] = [];
    for (let b = 0; b < blocks; b++) {
      const n = nFor(level);
      const dual = dualFor(level);
      const len = (ctx.practice ? 8 : 20) + n;
      const positions = stream(len, n, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
      const letters = stream(len, n, LETTERS);
      rule.textContent = n === 1 ? t('ex.echo.rule1') : t('ex.echo.rule', { n });
      letBtn.classList.toggle('hidden', !dual);

      // The first time the letter stream appears, stop and explain it.
      if (dual && ctx.mode === 'train' && !store.data.practiced.includes('echo-dual')) {
        store.data.practiced.push('echo-dual');
        store.save();
        const go = h('button', { class: 'btn primary' }, t('common.continue'));
        const note = h(
          'div',
          { class: 'card interlude' },
          h('h3', {}, `🔊 ${t('ex.echo.dualTitle')}`),
          h('p', {}, t('ex.echo.dualText', { back: n === 1 ? t('ex.echo.back1') : t('ex.echo.backN', { n }) })),
          go,
        );
        ctx.stage.append(note);
        await ctx.input<void>((done) => {
          go.onclick = () => done();
        });
        note.remove();
      }

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
        ctx.progress((b + i / len) / blocks, `${labelFor(level)}`);
        const posTarget = i >= n && positions[i] === positions[i - n];
        const letTarget = i >= n && letters[i] === letters[i - n];
        let posPressed = false;
        let letPressed = false;
        // Immediate feedback on each press helps players learn the rule.
        pressPos = () => {
          if (posPressed) return;
          posPressed = true;
          flash(posBtn, posTarget ? 'good' : 'bad');
        };
        pressLetter = dual
          ? () => {
              if (letPressed) return;
              letPressed = true;
              flash(letBtn, letTarget ? 'good' : 'bad');
            }
          : null;

        const cell = cells[positions[i]];
        cell.classList.add('lit');
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
            h('p', { class: 'echo-strip-hint' }, i < n ? t('ex.echo.stripWait') : t(dual ? 'ex.echo.stripCompareDual' : 'ex.echo.stripCompare')),
          );
        }
        if (dual && !speak(letters[i])) cell.textContent = letters[i]; // no audio: show it instead
        await ctx.wait(600);
        cell.classList.remove('lit');
        cell.textContent = '';
        await ctx.wait(2200 * ctx.pace);

        if (i >= n) {
          count(tally.pos, posTarget, posPressed);
          if (dual) count(tally.let, letTarget, letPressed);
          if (posTarget && !posPressed) flash(posBtn, 'bad');
          if (dual && letTarget && !letPressed) flash(letBtn, 'bad');
          // Only trials with something to react to count for the streak; quiet correct rejections don't.
          const posOk = posPressed === posTarget;
          const letOk = !dual || letPressed === letTarget;
          if (posTarget || posPressed || (dual && (letTarget || letPressed))) ctx.feedback(posOk && letOk);
        }
      }
      pressPos = pressLetter = null;

      // Hit rate minus false-alarm rate per modality: pressing nothing (or everything) scores 0,
      // unlike plain percent-correct, where staying silent already gives ~70%.
      const sens = (m: typeof tally.pos) => (m.targets ? m.hit / m.targets : 1) - (m.other ? m.fa / m.other : 0);
      const acc = clamp(dual ? (sens(tally.pos) + sens(tally.let)) / 2 : sens(tally.pos), 0, 1);
      blockScores.push(((level - 1 + acc) / MAX_LEVEL) * 100);
      const before = level;
      // ≥ 0.8 (e.g. 90% hits with 10% false alarms) moves up, < 0.5 moves down.
      if (acc >= 0.8) level = Math.min(MAX_LEVEL, level + 1);
      else if (acc < 0.5) level = Math.max(1, level - 1);
      if (acc >= 0.8) sfx.fanfare();

      if (b < blocks - 1) {
        const go = h('button', { class: 'btn primary' }, t('common.continue'));
        const note = h(
          'div',
          { class: 'card interlude' },
          h('h3', {}, t('ex.echo.block', { i: b + 1, acc: Math.round(acc * 100) })),
          h('p', {}, t('common.levelChange', { from: labelFor(before), to: labelFor(level) })),
          go,
        );
        ctx.stage.append(note);
        await ctx.input<void>((done) => {
          go.onclick = () => done();
        });
        note.remove();
      }
    }
    ctx.progress(1);

    const score = clamp(blockScores.reduce((a, b) => a + b, 0) / blockScores.length, 0, 100);
    return { score, detail: `${t('common.level')}: ${labelFor(level)}`, level };
  },
};
