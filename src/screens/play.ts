import { h, todayKey } from '../dom';
import { Ctx, Aborted } from '../ctx';
import { sfx } from '../audio';
import { store } from '../storage';
import { t } from '../i18n';
import { render, page, countUp, rankName } from '../ui';
import { DAILY_CHECK, type Exercise, type ExerciseResult } from '../exercises';
import { showHome } from './home';
import { showTraining } from './training';

/** Intro card; resolves true when the player presses start. */
function intro(ex: Exercise, step: string | null, onBack: () => void): Promise<boolean> {
  return new Promise((resolve) => {
    render(
      page(
        step ?? t(ex.name),
        () => {
          onBack();
          resolve(false);
        },
        h(
          'div',
          { class: 'card intro' },
          h('div', { class: 'intro-icon' }, ex.icon),
          h('h2', {}, t(ex.name)),
          h('span', { class: `chip skill-${ex.skill}` }, t(`skill.${ex.skill}`)),
          h('p', {}, t(ex.desc)),
          h('button', { class: 'btn primary big', onClick: () => resolve(true) }, t('common.start')),
        ),
      ),
    );
  });
}

/** Runs a single exercise in the play view. Returns null if the player quit. */
async function runExercise(ex: Exercise, quick: boolean): Promise<ExerciseResult | null> {
  const bar = h('div', { class: 'progress-fill' });
  const label = h('span', { class: 'progress-label' });
  const stage = h('div', { class: 'stage' });
  const ctx = new Ctx(stage, quick, (fraction, text) => {
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
  }
}

export async function playPractice(ex: Exercise) {
  if (!(await intro(ex, null, showTraining))) return;
  const res = await runExercise(ex, false);
  if (!res) return showTraining();

  const prevBest = store.best(ex.id);
  const score = Math.round(res.score);
  store.addRun({ ex: ex.id, date: todayKey(), score, detail: res.detail });
  const isBest = prevBest === null || score > prevBest;
  if (isBest) sfx.fanfare();

  const num = h('div', { class: 'big-score' }, '0');
  render(
    page(
      t('result.title'),
      showTraining,
      h(
        'div',
        { class: 'card result' },
        h('div', { class: 'intro-icon' }, ex.icon),
        h('h2', {}, t(ex.name)),
        num,
        h('div', { class: 'muted' }, `/ 100 · ${res.detail}`),
        isBest
          ? h('div', { class: 'badge-best' }, `🏆 ${t('common.newBest')}`)
          : h('div', { class: 'muted' }, `${t('common.best')}: ${prevBest}`),
        h(
          'div',
          { class: 'row' },
          h('button', { class: 'btn', onClick: showTraining }, t('common.menu')),
          h('button', { class: 'btn primary', onClick: () => playPractice(ex) }, t('common.retry')),
        ),
      ),
    ),
  );
  countUp(num, score);
}

export async function playDailyCheck() {
  const done = store.todayCheck();
  if (done) return showCheckResult(done.score, true);

  const parts: Record<string, number> = {};
  for (let i = 0; i < DAILY_CHECK.length; i++) {
    const ex = DAILY_CHECK[i];
    const step = t('common.step', { i: i + 1, n: DAILY_CHECK.length });
    if (!(await intro(ex, step, showHome))) return;
    const res = await runExercise(ex, true);
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
                  h('span', {}, `${ex.icon} ${t(ex.name)}`),
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
