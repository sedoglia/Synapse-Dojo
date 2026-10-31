import { h, todayKey, pick } from '../dom';
import { Ctx, Aborted, type Mode } from '../ctx';
import { sfx, haptic } from '../audio';
import { store } from '../storage';
import { t } from '../i18n';
import { render, page, countUp, rankName, sparkline, xpBar } from '../ui';
import { DAILY_CHECK, type Exercise, type ExerciseResult } from '../exercises';
import { dailyPlan } from '../stats';
import { exampleCard } from '../examples';
import { XP, addXp, playerLevel, checkBadges, type Badge } from '../rewards';
import { showHome } from './home';
import { showTraining } from './training';

const pace = () => (store.data.settings.relaxed ? 1.4 : 1);
export const levelText = (ex: Exercise, level: number) => ex.levelLabel?.(Math.round(level)) ?? String(Math.round(level));
const DETRAIN_DAYS = 14;

export function whyBox(ex: Exercise): HTMLElement {
  return h('details', { class: 'why' }, h('summary', {}, `🔬 ${t('common.why')}`), h('p', {}, t(ex.why)));
}

/** Starting level: the saved one, a step lower after a long break (skills fade without practice). */
function startLevel(ex: Exercise): number {
  if (!ex.levels) return 1;
  const saved = store.level(ex.id, ex.levels.start);
  const last = store.lastPlayed(ex.id);
  if (!last) return saved;
  const days = (Date.now() - new Date(last).getTime()) / 86_400_000;
  return days > DETRAIN_DAYS ? Math.max(ex.levels.min, saved - 1) : saved;
}

type IntroChoice = 'start' | 'practice' | null;

/** Intro card with an illustrated example. First-timers are steered to a guided practice round. */
function intro(ex: Exercise, step: string | null): Promise<IntroChoice> {
  return new Promise((resolve) => {
    const level = ex.levels && store.hasLevel(ex.id) ? store.level(ex.id, ex.levels.start) : null;
    const canPractice = ex.practice !== false;
    const firstTime = canPractice && !store.data.practiced.includes(ex.id);
    const startBtn = h('button', { class: `btn big ${firstTime ? '' : 'primary'}`, onClick: () => resolve('start') }, t('common.start'));
    const practiceBtn = canPractice
      ? h('button', { class: `btn big ${firstTime ? 'primary' : 'ghost'}`, onClick: () => resolve('practice') }, `🎓 ${t('intro.practice')}`)
      : null;
    render(
      page(
        step ?? t(ex.name),
        () => resolve(null),
        h(
          'div',
          { class: 'card intro' },
          h('div', { class: 'intro-icon' }, ex.icon),
          h('h2', {}, t(ex.name)),
          h('span', { class: `chip domain-${ex.domain}` }, t(`domain.${ex.domain}`)),
          h('p', {}, t(ex.desc)),
          exampleCard(ex.id, t(ex.example)),
          level !== null ? h('div', { class: 'muted' }, `${t('common.level')}: ${levelText(ex, level)}`) : null,
          ex.levels ? h('p', { class: 'tip' }, `💡 ${t('intro.tip')}`) : null,
          firstTime ? h('p', { class: 'muted small' }, t('intro.practiceFirst')) : null,
          h('div', { class: 'row' }, ...(firstTime ? [practiceBtn, startBtn] : [startBtn, practiceBtn])),
          whyBox(ex),
        ),
      ),
    );
  });
}

/** Runs a single exercise in the play view. Returns null if the player quit. */
async function runExercise(ex: Exercise, mode: Mode, level: number): Promise<{ res: ExerciseResult; ctx: Ctx } | null> {
  const bar = h('div', { class: 'progress-fill' });
  const label = h('span', { class: 'progress-label' });
  const combo = h('span', { class: 'combo' });
  const toasts = h('div', { class: 'toasts' });
  const stage = h('div', { class: `stage stage-${ex.id}` });

  const toast = (text: string, kind: 'up' | 'down' | 'hint') => {
    const el = h('div', { class: `toast ${kind}` }, kind === 'up' ? `⬆ ${t('common.level')}` : kind === 'down' ? `⬇ ${t('common.level')}` : text);
    toasts.append(el);
    if (kind === 'up') sfx.levelUp();
    setTimeout(() => el.remove(), kind === 'hint' ? 4500 : 1400);
  };

  const ctx = new Ctx(stage, mode, level, pace(), {
    progress: (fraction, text) => {
      bar.style.width = `${Math.round(fraction * 100)}%`;
      label.textContent = text;
    },
    combo: (n) => {
      combo.textContent = n >= 3 ? `🔥 ×${n}` : '';
      combo.classList.toggle('on', n >= 3);
      if (n >= 3) {
        combo.classList.remove('bump');
        void combo.offsetWidth;
        combo.classList.add('bump');
      }
    },
    toast,
    answer: (ok, streak) => {
      if (ok) {
        sfx.ok(streak);
        haptic.ok();
      } else {
        sfx.bad();
        haptic.bad();
        if (mode === 'practice') toast(t(ex.example), 'hint');
      }
    },
  });

  render(
    h(
      'div',
      { class: `play ${mode === 'practice' ? 'practice' : ''}` },
      h(
        'header',
        { class: 'play-bar' },
        h('button', { class: 'icon-btn', 'aria-label': t('common.quit'), onClick: () => ctx.abort() }, '✕'),
        mode === 'practice' ? h('span', { class: 'practice-tag' }, `🎓 ${t('practice.tag')}`) : null,
        h('div', { class: 'progress' }, bar),
        combo,
        label,
      ),
      toasts,
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
    return { res: await ex.run(ctx), ctx };
  } catch (e) {
    if (e instanceof Aborted) return null;
    throw e;
  } finally {
    ctx.abort(); // releases any listener an exercise might still hold
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  }
}

/** "Practice done" interstitial; resolves true to start the real round. */
function practiceDone(ex: Exercise): Promise<boolean> {
  return new Promise((resolve) => {
    sfx.fanfare();
    render(
      page(
        t(ex.name),
        () => resolve(false),
        h(
          'div',
          { class: 'card result' },
          h('div', { class: 'intro-icon' }, '🎓'),
          h('h2', {}, t('practice.done')),
          h('p', { class: 'muted' }, t('practice.doneSub')),
          h('button', { class: 'btn primary big', onClick: () => resolve(true) }, t('common.start')),
        ),
      ),
    );
  });
}

function badgeList(badges: Badge[]): HTMLElement | null {
  if (!badges.length) return null;
  haptic.celebrate();
  return h(
    'div',
    { class: 'new-badges' },
    h('b', {}, `🏅 ${t('result.newBadge')}`),
    ...badges.map((b) => h('div', { class: 'badge-pill' }, h('span', {}, b.icon), h('span', {}, t(b.name)))),
  );
}

function xpLine(gained: number, levelUp: boolean): HTMLElement {
  const p = playerLevel();
  return h(
    'div',
    { class: 'xp-gain' },
    h('span', { class: 'xp-chip' }, `+${gained} XP`),
    levelUp ? h('b', { class: 'level-up' }, `🎉 ${t('level.up', { n: p.level })}`) : null,
    xpBar(p.level, store.data.xp, p.from, p.to),
  );
}

type After = 'retry' | 'next' | 'menu' | 'quit';

/** Intro → (optional practice) → exercise → saved result. `step` is set inside the daily plan. */
async function practiceRound(ex: Exercise, step: { i: number; n: number } | null): Promise<After> {
  const choice = await intro(ex, step ? t('plan.step', step) : null);
  if (!choice) return 'quit';

  if (!store.data.practiced.includes(ex.id)) {
    store.data.practiced.push(ex.id);
    store.save();
  }
  if (choice === 'practice') {
    const practice = await runExercise(ex, 'practice', ex.levels?.start ?? 1);
    if (!practice) return 'quit';
    addXp(XP.practice);
    if (!(await practiceDone(ex))) return 'quit';
  }

  const before = startLevel(ex);
  const run = await runExercise(ex, 'train', before);
  if (!run) return 'quit';
  const { res, ctx } = run;

  const prevBest = store.best(ex.id);
  const score = Math.round(res.score);
  store.addRun({ ex: ex.id, date: todayKey(), score, detail: res.detail });
  if (res.level !== undefined) store.setLevel(ex.id, res.level);
  store.data.bestStreak = Math.max(store.data.bestStreak, ctx.bestStreak);
  store.bump('levelUps', ctx.levelUps);
  const isBest = prevBest === null || score > prevBest;
  // Level-ups are capped so one lucky session can't outweigh steady daily practice.
  const xp = addXp(XP.exercise + (isBest && prevBest !== null ? XP.best : 0) + Math.min(ctx.levelUps, 4) * XP.levelUp);
  const badges = checkBadges();
  if (isBest || badges.length) sfx.fanfare();

  const history = (store.data.history[ex.id] ?? []).map((p) => p.level);
  const first = history[0];
  const now = history[history.length - 1];
  const change = res.level === undefined ? 0 : Math.round(res.level) - Math.round(before);
  const message = change > 0 ? t('result.msgUp') : change < 0 ? t('result.msgDown') : t('result.msgSame');

  const num = h('div', { class: 'big-score' }, '0');
  return new Promise<After>((resolve) => {
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
          ctx.bestStreak >= 3 ? h('div', { class: 'muted' }, `🔥 ${t('result.combo', { n: ctx.bestStreak })}`) : null,
          isBest
            ? h('div', { class: 'badge-best' }, `🏆 ${t('common.newBest')}`)
            : h('div', { class: 'muted' }, `${t('common.best')}: ${prevBest}`),
          ex.levels && res.level !== undefined
            ? h(
                'div',
                { class: 'level-box' },
                h(
                  'div',
                  { class: `level-change ${change > 0 ? 'up' : change < 0 ? 'down' : ''}` },
                  change === 0
                    ? `${t('common.level')}: ${levelText(ex, res.level)}`
                    : t('common.levelChange', { from: levelText(ex, before), to: levelText(ex, res.level) }),
                ),
                h('p', { class: 'muted small' }, message),
                history.length >= 2
                  ? h(
                      'div',
                      { class: 'history' },
                      h('small', { class: 'muted' }, t('result.history')),
                      sparkline(history.slice(-20)),
                      now !== first
                        ? h('small', { class: 'muted' }, t('result.sinceFirst', { pct: `${now > first ? '+' : ''}${Math.round(((now - first) / Math.max(1, first)) * 100)}%` }))
                        : null,
                    )
                  : null,
              )
            : null,
          xpLine(xp.gained, xp.levelUp),
          badgeList(badges),
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

const CHEERS = ['🎉', '💪', '🌟', '🚀', '🧠'];

export async function playPlan() {
  const plan = dailyPlan();
  const wasDone = plan.every((e) => store.playedToday(e.id));
  for (let i = 0; i < plan.length; i++) {
    if (store.playedToday(plan[i].id)) continue;
    const after = await practiceRound(plan[i], { i: i + 1, n: plan.length });
    if (after === 'quit' || after === 'menu') return showHome();
  }

  let reward: HTMLElement | null = null;
  let badges: Badge[] = [];
  if (!wasDone) {
    store.bump('plans');
    const xp = addXp(XP.plan);
    badges = checkBadges();
    reward = xpLine(xp.gained, xp.levelUp);
  }
  sfx.fanfare();
  render(
    page(
      t('plan.title'),
      showHome,
      h(
        'div',
        { class: 'card result' },
        h('div', { class: 'intro-icon' }, pick(CHEERS)),
        h('h2', {}, t('plan.done')),
        h('p', { class: 'muted' }, t('plan.doneSub')),
        reward,
        badgeList(badges),
        h('button', { class: 'btn primary', onClick: showHome }, t('common.menu')),
      ),
    ),
  );
}

export async function playDailyCheck() {
  const done = store.todayCheck();
  if (done) return showCheckResult(done.score, true, null);

  const parts: Record<string, number> = {};
  for (let i = 0; i < DAILY_CHECK.length; i++) {
    const ex = DAILY_CHECK[i];
    const choice = await intro(ex, t('common.step', { i: i + 1, n: DAILY_CHECK.length }));
    if (!choice) return showHome();
    if (choice === 'practice') {
      if (!(await runExercise(ex, 'practice', ex.levels?.start ?? 1))) return showHome();
      if (!(await practiceDone(ex))) return showHome();
    }
    const run = await runExercise(ex, 'check', ex.levels?.start ?? 1);
    if (!run) return showHome();
    parts[ex.id] = Math.round(run.res.score);
  }

  const values = Object.values(parts);
  const score = Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10);
  store.addCheck({ date: todayKey(), score, parts });
  const xp = addXp(XP.check);
  sfx.fanfare();
  showCheckResult(score, false, xpLine(xp.gained, xp.levelUp), badgeList(checkBadges()));
}

function showCheckResult(score: number, alreadyDone: boolean, reward: HTMLElement | null, badges: HTMLElement | null = null) {
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
        reward,
        badges,
        h('button', { class: 'btn primary', onClick: showHome }, t('common.menu')),
      ),
    ),
  );
  countUp(num, score, 1400);
}
