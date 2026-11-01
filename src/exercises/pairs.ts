import { h, shuffle, flash } from '../dom';
import { t, words as allWords } from '../i18n';
import type { Ctx } from '../ctx';
import type { Exercise } from './types';

const SYMBOLS = ['🍎', '🚗', '🌙', '⚽', '🎸', '🐱', '🌵', '🔑', '⏰', '🎈', '📚', '🦋', '🍕', '🚀', '🌈', '🐘', '🍄', '⛵', '🎁', '🎩', '🦉', '🔔', '🐢', '🍩'];
const MAX_LEVEL = 10;
const pairsFor = (level: number) => level + 2;

/** One study + test round; returns the fraction of pairs recalled. */
async function round(ctx: Ctx, n: number, from: number, of: number): Promise<{ acc: number; ok: number }> {
  const symbols = shuffle(SYMBOLS).slice(0, n);
  const pool = shuffle(allWords());
  const words = pool.slice(0, n);
  const spare = pool.slice(n, n + 3);

  // Study
  const studySecs = Math.round(n * 3 * ctx.pace);
  const timer = h('div', { class: 'pairs-timer' });
  const doneBtn = h('button', { class: 'btn primary' }, t('ex.vault.done'));
  // Each pair is drawn as one linked card (symbol 🔗 word) so it reads as a couple, not a list.
  ctx.stage.replaceChildren(
    h('div', { class: 'vault-title' }, t('ex.pairs.study')),
    h('p', { class: 'pairs-tip' }, t('ex.pairs.tip', { sym: symbols[0], word: words[0] })),
    timer,
    h(
      'div',
      { class: 'pairs-list' },
      ...symbols.map((s, i) =>
        h('div', { class: 'pair' }, h('span', { class: 'pair-sym' }, s), h('span', { class: 'pair-link' }, '🔗'), h('span', { class: 'pair-word' }, words[i])),
      ),
    ),
    doneBtn,
  );
  await ctx.input<void>((done) => {
    let left = studySecs;
    const tick = () => {
      timer.textContent = t('ex.pairs.timer', { s: left });
      ctx.progress((from + 0.5 * (1 - left / studySecs)) / of, `${left}s`);
    };
    tick();
    const id = setInterval(() => {
      left--;
      tick();
      if (left <= 0) done();
    }, 1000);
    doneBtn.onclick = () => done();
    return () => clearInterval(id);
  });

  // Test: each symbol with four word options drawn from the studied set.
  const card = h('div', { class: 'vault-probe pair-sym' });
  const options = h('div', { class: 'pairs-options' });
  ctx.stage.replaceChildren(h('div', { class: 'grid-status' }, t('ex.pairs.ask')), card, options);
  let ok = 0;
  const order = shuffle(symbols.map((_, i) => i));
  for (let q = 0; q < order.length; q++) {
    ctx.progress((from + 0.5 + (0.5 * q) / order.length) / of, `${q + 1}/${n}`);
    const i = order[q];
    card.textContent = symbols[i];
    const choices = shuffle([words[i], ...shuffle([...words.filter((_, k) => k !== i), ...spare]).slice(0, 3)]);
    let onPick: ((w: string) => void) | null = null;
    const btns = choices.map((w) => h('button', { class: 'btn', onClick: () => onPick?.(w) }, w));
    options.replaceChildren(...btns);
    const said = await ctx.input<string>((done) => {
      onPick = done;
      return () => (onPick = null);
    });
    const right = said === words[i];
    if (ctx.feedback(right, { was: words[i] })) ok++;
    flash(btns[choices.indexOf(said)], right ? 'good' : 'bad');
    btns[choices.indexOf(words[i])].classList.add('good-btn');
    await ctx.wait(right ? 350 : 900);
  }
  return { acc: ok / n, ok };
}

export const pairs: Exercise = {
  id: 'pairs',
  icon: '🔗',
  domain: 'memory',
  name: 'ex.pairs.name',
  desc: 'ex.pairs.desc',
  why: 'ex.pairs.why',
  example: 'ex.pairs.example',
  minutes: 3,
  levels: { min: 1, max: MAX_LEVEL, start: 2 },
  levelLabel: (l) => `${pairsFor(l)} 🔗`,

  async run(ctx) {
    let level = Math.round(ctx.level);
    const scores: number[] = [];
    let last = { ok: 0, n: 0 };
    const rounds = ctx.practice ? 1 : 2;
    for (let r = 0; r < rounds; r++) {
      const n = ctx.practice ? 3 : pairsFor(level);
      const res = await round(ctx, n, r, rounds);
      scores.push(((level - 1 + res.acc) / MAX_LEVEL) * 100);
      last = { ok: res.ok, n };
      if (res.acc >= 0.8) level = Math.min(MAX_LEVEL, level + 1);
      else if (res.acc < 0.5) level = Math.max(1, level - 1);
    }
    ctx.progress(1);
    return { score: scores.reduce((a, b) => a + b, 0) / scores.length, detail: t('ex.pairs.detail', last), level };
  },
};
