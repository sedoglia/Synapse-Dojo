import { h, todayKey } from '../dom';
import { Ctx, Aborted } from '../ctx';
import { sfx } from '../audio';
import { store } from '../storage';
import { t } from '../i18n';
import { render, page, countUp, rankName } from '../ui';
import { DAILY_CHECK, type Exercise, type ExerciseResult } from '../exercises';
import { dailyPlan } from '../stats';
import { showHome } from './home';
import { showTraining } from './training';

const pace = () => (store.data.settings.relaxed ? 1.4 : 1);
const levelText = (ex: Exercise, level: number) => ex.levelLabel?.(level) ?? String(level);

export function whyBox(ex: Exercise): HTMLElement {
  return h('details', { class: 'why' }, h('summary', {}, `🔬 ${t('common.why')}`), h('p', {}, t(ex.why)));
}

/** Intro card; resolves true when the player presses start. */
function intro(ex: Exercise, step: string | null): Promise<boolean> {
  return new Promise((resolve) => {
    const level = ex.levels && store.hasLevel(ex.id) ? store.level(ex.id, ex.levels.start) : null;
    render(
      page(
        step ?? t(ex.name),
        () => resolve(false),
        h(
          'div',
          { class: 'card intro' },
          h('div', { class: 'intro-icon' }, ex.icon),
          h('h2', {}, t(ex.name)),
          h('span', { class: `chip domain-${ex.domain}` }, t(`domain.${ex.domain}`)),
          h('p', {}, t(ex.desc)),
          level !== null ? h('div', { class: 'muted' }, `${t('common.level')}: ${levelText(ex, level)}`) : null,
          whyBox(ex),
          h('button', { class: 'btn primary big', onClick: () => resolve(true) }, t('common.start')),
        ),
      ),
    );
  });
}

/** Runs a single exercise in the play view. Returns null if the player quit. */
async function runExercise(ex: Exercise, quick: boolean, level: number): Promise<ExerciseResult | null> {
  const bar = h('div', { class: 'progress-fill' });
  const label = h('span', { class: 'progress-label' });
  const stage = h('div', { class: `stage stage-${ex.id}` });
  const ctx = new Ctx(stage, quick, level, pace(), (fraction, text) => {
    bar.style.width = `${Math.round(fraction * 100)}%`;
    label.textContent = text;
  });

  render(
    h(
      'div',
      { class: 'play' },
      h(
        'header',
        { class: 'play-bar' },
        h('button', { class: 'icon-btn', 'aria-label': t('common.quit'), onClick: () => ctx.abort() }, '✕'),
        h('div', { class: 'progress' }, bar),
        label,
      ),
      stage,
    ),
  );

  try {
    for (const n of ['3', '2', '1']) {
      stage.replaceChildren(h('div', { class: 'countdown' }, n));
      sfx.tick();
      await ctx.wait(600);
    }
    stage.replaceChildren();
    sfx.go();
    return await ex.run(ctx);
  } catch (e) {
    if (e instanceof Aborted) return null;
    throw e;
  } finally {
    ctx.abort(); // releases any listener an exercise might still hold
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  }
}

type After = 'retry' | 'next' | 'menu' | 'quit';

/** Intro → exercise → saved result. `step` is set when running inside the daily plan. */
async function practiceRound(ex: Exercise, step: { i: number; n: number } | null): Promise<After> {
  if (!(await intro(ex, step ? t('plan.step', step) : null))) return 'quit';
  const before = ex.levels ? store.level(ex.id, ex.levels.start) : 1;
  const res = await runExercise(ex, false, before);
  if (!res) return 'quit';

  const prevBest = store.best(ex.id);
  const score = Math.round(res.score);
  store.addRun({ ex: ex.id, date: todayKey(), score, detail: res.detail });
  if (res.level !== undefined) store.setLevel(ex.id, res.level);
  const isBest = prevBest === null || score > prevBest;
  if (isBest) sfx.fanfare();

  const num = h('div', { class: 'big-score' }, '0');
  return new Promise<After>((resolve) => {
    const levelLine =
      ex.levels && res.level !== undefined
        ? h(
            'div',
            { class: `level-change ${res.level > before ? 'up' : res.level < before ? 'down' : ''}` },
            res.level === before
              ? `${t('common.level')}: ${levelText(ex, before)}`
              : t('common.levelChange', { from: levelText(ex, before), to: levelText(ex, res.level) }),
          )
        : null;
    render(
      page(
        t('result.title'),
        () => resolve('menu'),
        h(
          'div',
          { class: 'card result' },
          h('div', { class: 'intro-icon' }, ex.icon),
          h('h2', {}, t(ex.name)),
          num,
          h('div', { class: 'muted' }, `/ 100 · ${res.detail}`),
          levelLine,
          isBest
            ? h('div', { class: 'badge-best' }, `🏆 ${t('common.newBest')}`)
            : h('div', { class: 'muted' }, `${t('common.best')}: ${prevBest}`),
          h(
            'div',
            { class: 'row' },
            h('button', { class: 'btn', onClick: () => resolve('menu') }, t('common.menu')),
            step
              ? h('button', { class: 'btn primary', onClick: () => resolve('next') }, t('common.next'))
              : h('button', { class: 'btn primary', onClick: () => resolve('retry') }, t('common.retry')),
          ),
        ),
      ),
    );
    countUp(num, score);
  });
}

export async function playPractice(ex: Exercise) {
  while ((await practiceRound(ex, null)) === 'retry');
  showTraining();
}

export async function playPlan() {
  const plan = dailyPlan();
  for (let i = 0; i < plan.length; i++) {
    if (store.playedToday(plan[i].id)) continue;
    const after = await practiceRound(plan[i], { i: i + 1, n: plan.length });
    if (after === 'quit' || after === 'menu') return showHome();
  }
  sfx.fanfare();
  render(
    page(
      t('plan.title'),
      showHome,
      h(
        'div',
        { class: 'card result' },
        h('div', { class: 'intro-icon' }, '🎉'),
        h('h2', {}, t('plan.done')),
        h('p', { class: 'muted' }, t('plan.doneSub')),
        h('button', { class: 'btn primary', onClick: showHome }, t('common.menu')),
      ),
    ),
  );
}

export async function playDailyCheck() {
  const done = store.todayCheck();
  if (done) return showCheckResult(done.score, true);

  const parts: Record<string, number> = {};
  for (let i = 0; i < DAILY_CHECK.length; i++) {
    const ex = DAILY_CHECK[i];
    if (!(await intro(ex, t('common.step', { i: i + 1, n: DAILY_CHECK.length })))) return showHome();
    const res = await runExercise(ex, true, ex.levels?.start ?? 1);
    if (!res) return showHome();
    parts[ex.id] = Math.round(res.score);
  }

  const values = Object.values(parts);
  const score = Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10);
  store.addCheck({ date: todayKey(), score, parts });
  sfx.fanfare();
  showCheckResult(score, false);
}

function showCheckResult(score: number, alreadyDone: boolean) {
  const checks = store.data.checks;
  const prev = checks.length >= 2 ? checks[checks.length - 2] : null;
  const todays = store.todayCheck();
  const num = h('div', { class: 'big-score neuro' }, '0');

  let note: string;
  if (alreadyDone) note = t('check.doneToday');
  else if (!prev) note = t('check.first');
  else {
    const d = score - prev.score;
    note = t('check.delta', { d: d >= 0 ? `+${d}` : `${d}` });
  }

  render(
    page(
      t('check.title'),
      showHome,
      h(
        'div',
        { class: 'card result' },
        h('div', { class: 'ring' }, num, h('div', { class: 'ring-max' }, '/ 1000')),
        h('div', { class: 'rank' }, rankName(score)),
        h('p', { class: 'muted' }, note),
        todays
          ? h(
              'div',
              { class: 'parts' },
              ...DAILY_CHECK.map((ex) =>
                h(
                  'div',
                  { class: 'part' },
                  h('span', {}, `${ex.icon} ${t(`domain.${ex.domain}`)}`),
                  h('div', { class: 'part-bar' }, h('div', { style: { width: `${todays.parts[ex.id] ?? 0}%` } })),
                  h('b', {}, String(todays.parts[ex.id] ?? 0)),
                ),
              ),
            )
          : null,
        h('button', { class: 'btn primary', onClick: showHome }, t('common.menu')),
      ),
    ),
  );
  countUp(num, score, 1400);
}
