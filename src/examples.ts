import { h } from './dom';
import { t, words, stories, graphemes, wordNear, type I18nKey } from './i18n';
import { chiralShape, render as renderShape } from './exercises/rotate';
import { renderBoard } from './exercises/towers';
import { glyph, type Item } from './exercises/odd';

/**
 * Small static scenes that show one round of each exercise with its answer marked.
 * They reuse the real game styles, so what players see here matches what they'll play.
 */
type Scene = () => HTMLElement;

const arrow = () => h('span', { class: 'ex-arrow' }, '→');
const answer = (text: string) => h('span', { class: 'ex-answer' }, text);
const row = (...kids: (HTMLElement | string)[]) => h('div', { class: 'ex-row' }, ...kids);
const tag = (text: string, cls = '') => h('span', { class: `ex-chip ${cls}` }, text);

function miniGrid(size: number, lit: Record<number, string>, cls = 'ex-mini'): HTMLElement {
  return h(
    'div',
    { class: cls, style: { gridTemplateColumns: `repeat(${Math.sqrt(size)}, 1fr)` } },
    ...Array.from({ length: size }, (_, i) => h('span', { class: i in lit ? 'on' : '' }, lit[i] ?? '')),
  );
}

/** A word of the current language with about `n` letters, for the scenes that show real words. */
const wordOf = (n: number) => words().find((w) => graphemes(w).length === n) ?? wordNear(words(), n);
/** The letters of a word moved one step to the left: always different from the word, still readable as a puzzle. */
const scramble = (w: string) => {
  const c = graphemes(w.toUpperCase());
  return [...c.slice(1), c[0]].join(' ');
};

const SCENES: Record<string, Scene> = {
  glance: () => {
    const field = h('div', { class: 'ex-glance' }, h('span', { class: 'c' }, '🚗'), h('span', { class: 's' }, '★'));
    return row(field, arrow(), answer('🚗'), answer('↗ ★'));
  },
  reflex: () =>
    row(
      h('div', { class: 'ex-pads' }, h('span', { class: 'go' }, '👆'), h('span'), h('span'), h('span')),
      answer('✓'),
      h('div', { class: 'ex-pads' }, h('span'), h('span', { class: 'nogo' }, '✋'), h('span'), h('span')),
      answer('✗'),
    ),
  path: () => row(...['1', 'A', '2', 'B', '3'].flatMap((v, i) => [...(i ? [arrow()] : []), h('span', { class: 'ex-node' }, v)])),
  pilot: () => row(tag('🟢', 'big'), arrow(), answer('!'), tag('🔺', 'big'), tag('🟦', 'big'), arrow(), answer('—')),
  radar: () =>
    row(
      h('div', { class: 'ex-balls' }, h('i', { class: 'on' }), h('i'), h('i', { class: 'on' }), h('i')),
      arrow(),
      h('div', { class: 'ex-balls' }, h('i'), h('i', { class: 'pick' }), h('i'), h('i', { class: 'pick' })),
    ),
  clash: () => {
    const word = h('span', { class: 'ex-word' }, t('color.red'));
    word.style.color = 'var(--c-blue)';
    return row(word, arrow(), tag('🎨'), answer(t('color.blue')), tag('📖'), answer(t('color.red')));
  },
  switch: () =>
    row(
      h('span', { class: 'ex-num parity' }, '7'),
      arrow(),
      answer(t('ex.switch.odd')),
      h('span', { class: 'ex-num size' }, '7'),
      arrow(),
      answer('> 5'),
    ),
  echo: () => {
    // A looping 1-back walkthrough: the previous square, the current one, and what to do.
    const steps: { pos: number; press: boolean | null; text: I18nKey }[] = [
      { pos: 0, press: null, text: 'ex.echo.demo1' },
      { pos: 4, press: false, text: 'ex.echo.demo2' },
      { pos: 4, press: true, text: 'ex.echo.demo3' },
      { pos: 8, press: false, text: 'ex.echo.demo4' },
    ];
    const prevBox = h('div', { class: 'echo-demo-cell' });
    const nowBox = h('div', { class: 'echo-demo-cell' });
    const verdict = h('span', { class: 'echo-demo-verdict' });
    const caption = h('p', { class: 'echo-demo-text' });
    const box = h(
      'div',
      { class: 'echo-demo' },
      row(
        h('div', { class: 'echo-demo-col' }, h('small', {}, t('ex.echo.before')), prevBox),
        arrow(),
        h('div', { class: 'echo-demo-col' }, h('small', {}, t('ex.echo.now')), nowBox),
        verdict,
      ),
      caption,
    );
    let k = 0;
    const show = () => {
      const s = steps[k];
      prevBox.replaceChildren(k > 0 ? miniGrid(9, { [steps[k - 1].pos]: '' }) : h('span', { class: 'muted' }, '—'));
      nowBox.replaceChildren(miniGrid(9, { [s.pos]: '' }));
      verdict.replaceChildren(s.press === null ? '' : s.press ? answer(`👆 ${t('ex.echo.pos')}`) : h('span', { class: 'ex-chip zen' }, '✓ ✋'));
      caption.textContent = `${k + 1}/${steps.length} · ${t(s.text)}`;
      k = (k + 1) % steps.length;
    };
    show();
    const timer = setInterval(() => (box.isConnected ? show() : clearInterval(timer)), 2200);
    return box;
  },
  grid: () => row(miniGrid(16, { 1: '1', 6: '2', 11: '3' }), arrow(), answer('1 2 3'), tag('↩'), answer('3 2 1')),
  digits: () => row(h('span', { class: 'ex-seq' }, '4 8 1 ', h('b', {}, '7 2 9')), arrow(), answer('7 2 9')),
  vault: () => row(tag(t('ex.vault.seen')), answer('✓'), tag(t('ex.vault.new')), answer('✗')),
  pairs: () => row(h('span', { class: 'ex-big' }, '🍎'), h('span', {}, '–'), tag('?'), arrow(), answer('🍎 = …')),
  memoria: () =>
    row(
      h(
        'div',
        { class: 'ex-card-pair' },
        h('span', { class: 'ex-mini-card face' }, '🦁'),
        h('span', { class: 'ex-mini-card back' }, '🎴'),
        h('span', { class: 'ex-mini-card face' }, '🦁'),
        h('span', { class: 'ex-mini-card back' }, '🎴'),
      ),
      arrow(),
      answer('🦁 = 🦁 ✓'),
    ),
  rotate: () => {
    const shape = chiralShape(5);
    const box = (angle: number, flip: boolean) => {
      const el = renderShape(shape, angle, flip);
      el.classList.add('ex-shape');
      return el;
    };
    return row(box(0, false), box(90, false), arrow(), answer(t('ex.rotate.same')), box(0, false), box(90, true), arrow(), answer(t('ex.rotate.mirror')));
  },
  towers: () => row(renderBoard('GB|R|', true), arrow(), renderBoard('GR|B|', true)),
  odd: () => {
    const base: Item = { shape: 0, color: 0, fill: 0, count: 0 };
    const items = [base, base, { ...base, color: 1 }, base].map((it, i) => {
      const cell = h('span', { class: `ex-odd ${i === 2 ? 'right' : ''}` });
      cell.append(glyph(it));
      return cell;
    });
    return row(...items);
  },
  math: () => row(h('span', { class: 'ex-big' }, '7 + 8 ='), answer('15')),
  reading: () => row(tag('🗣️'), arrow(), tag(t('ex.reading.done')), arrow(), tag('?')),
  span: () => row(h('span', { class: 'ex-seq' }, '3 8 2 9'), arrow(), answer('3 8 2 9')),
  stories: () => {
    const s = stories()[0];
    return row(tag(`📖 ${s.name}`), arrow(), answer(s.place));
  },
  flanker: () =>
    row(
      h('span', { class: 'ex-seq' }, '← ← ', h('b', { style: { color: 'var(--accent)', fontSize: '1.3rem' } }, '→'), ' ← ←'),
      arrow(),
      answer('→'),
    ),
  gonogo: () => row(tag('●', 'good'), arrow(), answer('👆'), tag('✕', 'bad'), arrow(), answer('✋')),
  msit: () => row(h('span', { class: 'ex-seq' }, '1 ', h('b', { style: { color: 'var(--accent)' } }, '2'), ' 1'), arrow(), answer('2')),
  binding: () => row(h('span', { style: { color: 'var(--c-blue)', fontSize: '1.4rem' } }, '●'), arrow(), answer(`● ${t('color.blue')}`)),
  sorting: () => row(tag('🃏 2 ★'), arrow(), tag(`★ ${t('ex.sorting.dimShape')}`), arrow(), answer('✓')),
  resources: () => row(tag(`🍎 ${t('ex.resources.cost', { n: 20 })}`), tag(t('ex.resources.gain', { n: 25 })), arrow(), answer('✓')),
  reaction: () => row(tag(t('ex.reaction.wait'), 'bad'), arrow(), tag(t('ex.reaction.tapNow'), 'good'), arrow(), answer('210 ms')),
  dots: () => row(tag('●●●●'), tag('vs'), tag('●●●●●●●'), arrow(), answer(t('ex.dots.right'))),
  anagrams: () => {
    const w = wordOf(5);
    return row(h('span', { class: 'ex-seq' }, scramble(w)), arrow(), answer(w.toUpperCase()));
  },
  fluency: () => {
    const yes = wordOf(4).toUpperCase();
    const first = [...yes][0];
    const no = (words().find((w) => !w.toUpperCase().startsWith(first)) ?? '').toUpperCase();
    return row(tag(`${t('ex.fluency.targetLetter')} ${first}`), arrow(), tag(yes), answer('✓'), tag(no), answer('✗'));
  },
  matrix: () => row(miniGrid(9, { 0: '🔷' }), arrow(), tag('↻ 90°'), arrow(), miniGrid(9, { 2: '🔷' })),
  nonogram: () => {
    const topClues = h('div', { class: 'ex-nono-cols' },
      h('span', {}, '2'), h('span', {}, '4'), h('span', {}, '3'), h('span', {}, '3'),
    );
    const row1 = h('div', { class: 'ex-nono-row' }, h('span', { class: 'clue' }, '1 1'), h('span'), h('span', { class: 'on' }), h('span'), h('span', { class: 'on' }));
    const row2 = h('div', { class: 'ex-nono-row' }, h('span', { class: 'clue' }, '4'), h('span', { class: 'on' }), h('span', { class: 'on' }), h('span', { class: 'on' }), h('span', { class: 'on' }));
    const row3 = h('div', { class: 'ex-nono-row' }, h('span', { class: 'clue' }, '4'), h('span', { class: 'on' }), h('span', { class: 'on' }), h('span', { class: 'on' }), h('span', { class: 'on' }));
    const row4 = h('div', { class: 'ex-nono-row' }, h('span', { class: 'clue' }, '2'), h('span'), h('span', { class: 'on' }), h('span', { class: 'on' }), h('span'));
    const mini = h('div', { class: 'ex-nono-wrap' }, topClues, row1, row2, row3, row4);
    return row(mini, arrow(), answer('❤️'));
  },
  tangram: () => row(tag('📐 🧩'), arrow(), tag('↻ 45°'), arrow(), answer('🦢 ✨')),
  game2048: () => row(tag('2'), tag('+'), tag('2'), arrow(), answer('4 🧱')),
  crackTheCode: () =>
    row(
      tag('6 8 2'),
      answer('1 ✓'),
      tag('7 3 8'),
      answer('0 ✗'),
      arrow(),
      tag('0 4 2', 'good'),
      answer('🔓'),
    ),
  tapSeq: () => row(tag('◀ ▶ ◀ ▶'), arrow(), answer('👈'), answer('👉')),
  swipePattern: () => row(tag(`${t('ex.dots.left')}: ↑`), tag(`${t('ex.dots.right')}: ↓`), arrow(), answer('✓')),
  rhythm: () => row(tag('🥁'), h('span', {}, '♪'), tag('🥁'), arrow(), answer('✓ ♪')),
  crossMove: () => row(tag(`⚡ ${t('ex.dots.left')}`), tag(t('ex.crossMove.cross')), arrow(), answer(`${t('ex.dots.right')} 👉`)),
  dualTask: () => row(tag(`🔒 ${t('ex.dualTask.hold')}`), tag('8'), arrow(), answer(`${t('ex.dualTask.even')} ✓`)),
};

/** The illustrated example for an exercise: a little scene plus its caption. */
export function exampleCard(id: string, caption: string): HTMLElement {
  const scene = SCENES[id]?.();
  return h('div', { class: 'example' }, scene ?? null, h('p', {}, caption));
}
