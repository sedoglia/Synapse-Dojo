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
    ctx.stage.append(rule, board, h('div', { class: 'echo-actions' }, posBtn, letBtn));
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
      rule.textContent = t('ex.echo.rule', { n });
      letBtn.classList.toggle('hidden', !dual);

      let right = 0;
      let scored = 0;
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
        if (dual && !speak(letters[i])) cell.textContent = letters[i]; // no audio: show it instead
        await ctx.wait(600);
        cell.classList.remove('lit');
        cell.textContent = '';
        await ctx.wait(2200 * ctx.pace);

        if (i >= n) {
          scored++;
          if (posPressed === posTarget) right++;
          if (dual) {
            scored++;
            if (letPressed === letTarget) right++;
          }
          if (posTarget && !posPressed) flash(posBtn, 'bad');
          if (dual && letTarget && !letPressed) flash(letBtn, 'bad');
          // Only trials with something to react to count for the streak; quiet correct rejections don't.
          const posOk = posPressed === posTarget;
          const letOk = !dual || letPressed === letTarget;
          if (posTarget || posPressed || (dual && (letTarget || letPressed))) ctx.feedback(posOk && letOk);
        }
      }
      pressPos = pressLetter = null;

      // Classic n-back rule: ≥85% correct moves up, <65% moves down.
      const acc = scored ? right / scored : 0;
      blockScores.push(((level - 1 + acc) / MAX_LEVEL) * 100);
      const before = level;
      if (acc >= 0.85) level = Math.min(MAX_LEVEL, level + 1);
      else if (acc < 0.65) level = Math.max(1, level - 1);
      if (acc >= 0.85) sfx.fanfare();

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
