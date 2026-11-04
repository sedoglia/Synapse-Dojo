import { h, shuffle, flash, rand } from '../dom';
import { t, stories as allStories } from '../i18n';
import type { Ctx } from '../ctx';
import type { Exercise } from './types';

/**
 * What each level asks: scenes to keep apart, questions per scene, seconds of busy pause before the questions.
 * Episodic memory is about binding details to the right event after a delay: a single scene asked about straight
 * away would still be in working memory, so more scenes and a longer filled pause are what make it harder.
 */
const LEVELS = [
  { scenes: 1, questions: 2, delay: 3 },
  { scenes: 1, questions: 3, delay: 6 },
  { scenes: 2, questions: 2, delay: 6 },
  { scenes: 2, questions: 3, delay: 10 },
  { scenes: 3, questions: 2, delay: 10 },
  { scenes: 3, questions: 3, delay: 15 },
];
const configFor = (level: number) => LEVELS[Math.round(level) - 1];
const MIN_NUMBER_MS = 1000; // a number of the pause never appears with less time than this left

/**
 * Fills the pause with even/odd judgements, so the scenes can't simply be repeated in the mind. Not scored, and at the
 * player's own pace: a number stays until it's answered, and a bar shows how much of the pause is left.
 */
function busyPause(ctx: Ctx, seconds: number): Promise<void> {
  const ms = seconds * 1000 * ctx.pace;
  const end = performance.now() + ms;
  const number = h('div', { class: 'digits-display' });
  const fill = h('div');
  let value = 0;
  let locked = false;
  let nextId: ReturnType<typeof setTimeout> | undefined;
  const show = () => {
    let n = rand(1, 9);
    while (n === value) n = rand(1, 9);
    value = n;
    number.textContent = String(n);
    locked = false;
  };
  const answer = (even: boolean, btn: HTMLElement) => {
    if (locked) return;
    locked = true;
    flash(btn, even === (value % 2 === 0) ? 'good' : 'bad', 250);
    number.textContent = '';
    // Near the end of the pause no new number: it would only flash by, with no time to answer.
    nextId = setTimeout(() => {
      if (end - performance.now() > MIN_NUMBER_MS) show();
    }, 250);
  };
  const evenBtn: HTMLElement = h('button', { class: 'btn big', onPointerdown: () => answer(true, evenBtn) }, t('ex.dualTask.even'));
  const oddBtn: HTMLElement = h('button', { class: 'btn big', onPointerdown: () => answer(false, oddBtn) }, t('ex.dualTask.odd'));
  ctx.stage.replaceChildren(
    h('div', { class: 'grid-status' }, t('ex.stories.filler')),
    h('div', { class: 'rotate-timer' }, fill),
    number,
    h('div', { class: 'vault-actions' }, evenBtn, oddBtn),
  );
  fill.style.width = '100%';
  void fill.offsetWidth;
  fill.style.transition = `width ${ms}ms linear`;
  fill.style.width = '0%';
  show();
  return ctx.timed<void>(ms, undefined, () => {
    const keys = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') answer(true, evenBtn);
      else if (e.key === 'ArrowRight') answer(false, oddBtn);
    };
    window.addEventListener('keydown', keys);
    return () => {
      window.removeEventListener('keydown', keys);
      clearTimeout(nextId);
    };
  });
}

export const stories: Exercise = {
  id: 'stories',
  icon: '📜',
  domain: 'memory',
  name: 'ex.stories.name',
  desc: 'ex.stories.desc',
  why: 'ex.stories.why',
  example: 'ex.stories.example',
  minutes: 3,
  levels: { min: 1, max: 6, start: 2 },
  levelLabel: (l) => {
    const c = configFor(l);
    return `${c.scenes} 📜 · ${c.questions} ❓ · ${c.delay} s`;
  },

  async run(ctx) {
    const rounds = ctx.count(3, 2, 1);
    const st = ctx.stair(8, 1, 6, { target: 0.75 });
    const pool = shuffle([...allStories()]);
    let next = 0;

    let correct = 0;
    let totalQuestions = 0;

    for (let r = 0; r < rounds; r++) {
      ctx.progress(r / rounds, `${r + 1}/${rounds}`);
      const config = ctx.practice ? LEVELS[0] : configFor(st.level);

      // Scenes in a round have different people, so a question can only belong to one of them.
      const scenes: typeof pool = [];
      while (scenes.length < config.scenes) {
        const scene = pool[next++ % pool.length];
        if (scenes.every((s) => s.name !== scene.name) || next > pool.length * 2) scenes.push(scene);
      }

      for (let s = 0; s < scenes.length; s++) {
        const scen = scenes[s];
        const text = t('ex.stories.text', { name: scen.name, item: scen.item, place: scen.place, time: scen.time });
        const readyBtn = h('button', { class: 'btn primary' }, t('ex.stories.ready'));
        ctx.stage.replaceChildren(h('div', { class: 'story-title' }, t('ex.stories.title', { n: s + 1 })), h('div', { class: 'story-card' }, text), readyBtn);
        await ctx.input<void>((done) => {
          readyBtn.onclick = () => done();
        });
      }

      await busyPause(ctx, config.delay);

      // A detail from another scene of the round is the hardest wrong answer: it was seen, just not there.
      const lure = (scen: (typeof pool)[number], key: 'item' | 'place' | 'time', fallback: readonly string[]) => {
        const other = scenes.find((o) => o !== scen && o[key] !== scen[key]);
        return other ? [other[key], ...shuffle([...fallback]).slice(0, 1)] : [...fallback];
      };
      const questions = shuffle(
        scenes.flatMap((scen) =>
          shuffle([
            { q: t('ex.stories.qItem', { name: scen.name }), correct: scen.item, wrong: lure(scen, 'item', scen.itemDistractors) },
            { q: t('ex.stories.qPlace', { name: scen.name }), correct: scen.place, wrong: lure(scen, 'place', scen.placeDistractors) },
            { q: t('ex.stories.qTimeOf', { name: scen.name }), correct: scen.time, wrong: lure(scen, 'time', scen.timeDistractors) },
          ]).slice(0, config.questions),
        ),
      );

      for (const item of questions) {
        totalQuestions++;
        const options = shuffle([item.correct, ...item.wrong]);
        let onPick: ((ans: string) => void) | null = null;
        const optButtons = options.map((opt) => h('button', { class: 'btn story-opt', onClick: () => onPick?.(opt) }, opt));
        ctx.stage.replaceChildren(h('div', { class: 'story-q' }, item.q), h('div', { class: 'story-opts' }, ...optButtons));

        const chosen = await ctx.input<string>((done) => {
          onPick = done;
          return () => (onPick = null);
        });

        const ok = ctx.track(st, chosen === item.correct, { was: item.correct });
        const targetBtn = optButtons.find((b) => b.textContent === item.correct);
        if (ok) {
          correct++;
          if (targetBtn) flash(targetBtn, 'good');
        } else {
          if (targetBtn) targetBtn.classList.add('correct-hint');
          const chosenBtn = optButtons.find((b) => b.textContent === chosen);
          if (chosenBtn) flash(chosenBtn, 'bad');
        }
        await ctx.wait(ok ? 400 : 1200);
      }
    }
    ctx.progress(1);

    const { score, timeBonus } = ctx.withTimeBonus(st.score(), 3.0);
    return {
      score,
      detail: t('ex.stories.detail', { ok: correct, n: totalQuestions }),
      level: st.next(),
      timeBonus,
    };
  },
};
