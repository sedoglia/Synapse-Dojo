import { h, shuffle, scale, flash, clamp } from '../dom';
import { t, passages as allPassages, meta } from '../i18n';
import { getRecentHistory, saveRecentHistory } from '../storage';
import { timeBar } from '../widgets';
import type { Exercise } from './types';

const ROUNDS = 2;
const RECENT_KEY = 'synapse_reading_recent_passages';
const MAX_RECENT_MEMORY = 20;
const MAX_LEVEL = 10;
/** Above this pace a passage can't have been read aloud: speed earns nothing and the level can't rise. */
const MAX_ALOUD_WPM = 400;

/**
 * Target reading-aloud pace: 90 words per minute at level 1 (a slow, careful reader) up to 180 at level 10,
 * the top of clear reading aloud (about 150–200 wpm). In Learning Therapy the point is reading regularly and
 * fluently, not ever harder texts, so the level raises the pace to keep up with, never the text's difficulty.
 */
const wpmFor = (level: number) => 90 + 10 * (Math.round(level) - 1);

/** Words in a passage; scripts written without spaces (Chinese, Japanese) count characters instead. */
function wordCount(text: string): number {
  const per = meta().charsPerWord;
  return per ? text.replace(/[\s\p{P}]/gu, '').length / per : text.split(/\s+/).length;
}

export const reading: Exercise = {
  id: 'reading',
  icon: '📖',
  domain: 'language',
  name: 'ex.reading.name',
  desc: 'ex.reading.desc',
  how: 'ex.reading.how',
  why: 'ex.reading.why',
  example: 'ex.reading.example',
  minutes: [1, 2],
  practice: false,
  levels: { min: 1, max: MAX_LEVEL, start: 3 },
  levelLabel: (l) => t('ex.reading.wpm', { n: wpmFor(l) }),

  async run(ctx) {
    const all = allPassages();
    const recentIds = new Set(getRecentHistory(RECENT_KEY));
    const unread = shuffle(all.filter((p) => !recentIds.has(p.question)));
    let passages: typeof all;
    if (unread.length >= ROUNDS) {
      passages = unread.slice(0, ROUNDS);
    } else {
      const recentList = getRecentHistory(RECENT_KEY);
      const readPool = all.filter((p) => recentIds.has(p.question));
      readPool.sort((a, b) => recentList.indexOf(a.question) - recentList.indexOf(b.question));
      passages = [...unread, ...readPool].slice(0, ROUNDS);
    }
    if (!passages.length) {
      passages = shuffle(all).slice(0, ROUNDS);
    }

    // The daily check reads at the player's own pace with no target, so the measure stays the same for everyone.
    const adaptive = ctx.mode === 'train';
    let level = Math.round(ctx.level);
    const scores: number[] = [];
    let understood = 0;
    let wpmSum = 0;
    let beaten = 0;

    for (let r = 0; r < passages.length; r++) {
      const p = passages[r];
      saveRecentHistory(RECENT_KEY, p.question, MAX_RECENT_MEMORY);
      ctx.progress(r / ROUNDS, `${r + 1}/${ROUNDS}`);
      const words = wordCount(p.text);
      const target = wpmFor(level);
      const doneBtn = h('button', { class: 'btn primary big' }, t('ex.reading.done'));
      // The pacer: a bar that empties at the target pace, a visible "hare" to beat while reading aloud.
      const pacer = timeBar();
      pacer.el.classList.add('reading-pacer');
      ctx.stage.replaceChildren(
        h('div', { class: 'reading-tag' }, t('ex.reading.aloud')),
        ...(adaptive ? [h('div', { class: 'reading-goal muted small' }, `🐇 ${t('ex.reading.pace', { n: target })}`), pacer.el] : []),
        h('p', { class: 'reading-text' }, p.text),
        doneBtn,
      );
      const goalMs = ((words / target) * 60000) / ctx.pace;
      if (adaptive) pacer.start(goalMs);
      const start = performance.now();
      await ctx.input<void>((done) => {
        doneBtn.onclick = () => done();
      });
      pacer.stop();
      const minutes = (performance.now() - start) / 60000;
      const wpm = Math.round(words / minutes);
      const paceWpm = wpm * ctx.pace; // relaxed mode gives 40% more time to reach the same target
      wpmSum += wpm;

      // A comprehension question keeps the reading honest.
      const options = shuffle([0, 1, 2]);
      let onPick: ((i: number) => void) | null = null;
      const btns = options.map((i) => h('button', { class: 'btn', onClick: () => onPick?.(i) }, p.answers[i]));
      ctx.stage.replaceChildren(h('div', { class: 'grid-status' }, p.question), h('div', { class: 'pairs-options single' }, ...btns));
      const said = await ctx.input<number>((done) => {
        onPick = done;
        return () => (onPick = null);
      });
      const ok = said === 0;
      const plausible = wpm <= MAX_ALOUD_WPM;
      const fastEnough = plausible && paceWpm >= target;
      const note = !plausible ? t('ex.reading.tooFast') : ok && adaptive ? t(fastEnough ? 'ex.reading.beat' : 'ex.reading.slow', { n: wpm }) : undefined;
      if (ctx.feedback(ok, { was: p.answers[0], note })) understood++;
      flash(btns[options.indexOf(said)], ok ? 'good' : 'bad');
      btns[options.indexOf(0)].classList.add('good-btn');

      if (adaptive) {
        // Comprehension first: a wrong answer lowers the level whatever the speed, so skimming never pays.
        const perf = ok ? clamp(paceWpm / target, 0.5, 1) * (plausible ? 1 : 0.5) : 0;
        scores.push(((level - 1 + perf) / MAX_LEVEL) * 100);
        if (ok && fastEnough) {
          beaten++;
          level = Math.min(MAX_LEVEL, level + 1);
        } else if (!ok) level = Math.max(1, level - 1);
      } else {
        // Reading aloud clearly runs at about 150–200 words per minute.
        const speed = plausible ? scale(wpm, 190, 60) : 0;
        scores.push(ok ? 40 + 0.6 * speed : 0.4 * speed);
      }
      await ctx.wait(1100);
    }
    ctx.progress(1);
    const avgWpm = Math.round(wpmSum / passages.length);
    const allCorrect = understood === passages.length;
    const baseScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    // Fluent reading aloud with full comprehension earns the speed bonus, never in the daily check.
    const timeBonus =
      !ctx.quick && allCorrect && avgWpm >= 140 && avgWpm <= MAX_ALOUD_WPM
        ? Math.min(10, Math.max(0, Math.round(((avgWpm - 130) / 70) * 10)))
        : 0;
    const score = Math.min(100, Math.round(baseScore + timeBonus));

    return {
      score,
      detail: t('ex.reading.detail', { wpm: avgWpm, ok: understood, n: passages.length }) + (adaptive ? ` · 🐇 ${beaten}/${passages.length}` : ''),
      level: adaptive ? level : undefined,
      timeBonus: timeBonus > 0 ? timeBonus : undefined,
      speedBonus: timeBonus >= 3,
    };
  },
};
