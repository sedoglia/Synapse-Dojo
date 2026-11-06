import { h, todayKey, pick } from '../dom';
import { Ctx, Aborted, type Mode } from '../ctx';
import { sfx } from '../audio';
import { store, NEURO_SCALE } from '../storage';
import { t } from '../i18n';
import { render, page, countUp, rankName, sparkline, xpBar } from '../ui';
import { dailyCheckBattery, byId, type Exercise, type ExerciseResult } from '../exercises';
import { nextPlan, markPlanDone } from '../stats';
import { exampleCard } from '../examples';
import { XP, addXp, playerLevel, checkBadges, type Badge } from '../rewards';
import { shareOffer } from '../share';
import { syncBoard } from '../board';
import { DETRAIN_DAYS } from '../adaptive';
import { showHome } from './home';
import { showTraining } from './training';

const pace = () => (store.data.settings.relaxed ? 1.4 : 1);
export const levelText = (ex: Exercise, level: number) => ex.levelLabel?.(Math.round(level)) ?? String(Math.round(level));

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

export function burstConfetti(container: HTMLElement) {
  const colors = ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6', '#ef4444'];
  const n = 28;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < n; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-particle';
    const angle = (i / n) * 2 * Math.PI + (Math.random() - 0.5) * 0.4;
    const distance = 70 + Math.random() * 110;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - 40;
    const color = colors[i % colors.length];
    p.style.setProperty('--dx', `${dx}px`);
    p.style.setProperty('--dy', `${dy}px`);
    p.style.setProperty('--rot', `${(Math.random() - 0.5) * 720}deg`);
    p.style.backgroundColor = color;
    p.style.left = '50%';
    p.style.top = '30%';
    frag.append(p);
  }
  container.style.position = 'relative';
  container.append(frag);
  setTimeout(() => {
    container.querySelectorAll('.confetti-particle').forEach((el) => el.remove());
  }, 1200);
}

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
    if (kind === 'hint') toasts.replaceChildren();
    const el = h('div', { class: `toast ${kind}` }, kind === 'up' ? `⬆ ${t('common.level')}` : kind === 'down' ? `⬇ ${t('common.level')}` : text);
    toasts.append(el);
    if (kind === 'up') sfx.levelUp();
    setTimeout(() => el.remove(), kind === 'hint' ? 3200 : 1400);
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
    answer: (ok, streak, opts) => {
      if (ok) {
        sfx.ok(streak);
      } else {
        sfx.bad();
        if (mode === 'practice') toast(t(ex.example), 'hint');
      }
      if (opts.subtle) return;
      // Big ✓/✗ in the middle plus a coloured glow around the screen: impossible to miss.
      verdict.className = `verdict ${ok ? 'ok' : 'bad'}`;
      verdict.replaceChildren(
        h('span', { class: 'verdict-icon' }, ok ? '✓' : '✗'),
        h('span', { class: 'verdict-text' }, ok ? t('fb.right') : t('fb.wrong')),
      );
      if (!ok && opts.was) verdict.append(h('span', { class: 'verdict-was' }, t('fb.was', { v: opts.was })));
      if (!ok && opts.note) verdict.append(h('span', { class: 'verdict-was' }, opts.note));
      void verdict.offsetWidth; // restart the animation
      verdict.classList.add('show');
      clearTimeout(hideVerdict); // also hides it when animations are reduced
      hideVerdict = setTimeout(() => verdict.classList.remove('show'), ok ? 600 : 1200);
      playView.classList.remove('glow-ok', 'glow-bad');
      void playView.offsetWidth;
      playView.classList.add(ok ? 'glow-ok' : 'glow-bad');
    },
  });
  ctx.fresh = mode === 'train' && !store.hasLevel(ex.id);
  const verdict = h('div', { class: 'verdict' });
  let hideVerdict: ReturnType<typeof setTimeout> | undefined;

  const playView = h(
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
    verdict,
    stage,
  );
  render(playView);

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
  return h(
    'div',
    { class: 'new-badges' },
    h('b', {}, `🏅 ${t('result.newBadge')}`),
    ...badges.map((b) => h('div', { class: 'badge-pill' }, h('span', {}, b.icon), h('span', {}, t(b.name)))),
    shareOffer(badges),
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
  syncBoard();
  store.data.bestStreak = Math.max(store.data.bestStreak, ctx.bestStreak);
  store.bump('levelUps', ctx.levelUps);
  const isBest = prevBest === null || score > prevBest;
  const speedBonusEarned = res.speedBonus ?? (res.timeBonus !== undefined ? res.timeBonus >= 3 : ctx.isSpeedBonus);
  // Level-ups are capped so one lucky session can't outweigh steady daily practice.
  const xp = addXp(
    XP.exercise +
      (isBest && prevBest !== null ? XP.best : 0) +
      Math.min(ctx.levelUps, 4) * XP.levelUp +
      (speedBonusEarned ? XP.speed : 0),
  );
  const badges = checkBadges();
  if (isBest || badges.length) sfx.fanfare();

  const history = (store.data.history[ex.id] ?? []).map((p) => p.level);
  const first = history[0];
  const now = history[history.length - 1];
  const change = res.level === undefined ? 0 : Math.round(res.level) - Math.round(before);
  const message = change > 0 ? t('result.msgUp') : change < 0 ? t('result.msgDown') : t('result.msgSame');

  const num = h('div', { class: 'big-score' }, '0');
  return new Promise<After>((resolve) => {
    const resultCard = h(
      'div',
      { class: 'card result' },
      h('div', { class: 'intro-icon' }, ex.icon),
      h('h2', {}, t(ex.name)),
      num,
      h('div', { class: 'muted' }, `/ 100 · ${res.detail}${res.timeBonus ? ` · ⚡ +${res.timeBonus} ${t('result.timeBonusPts')}` : ''}`),
      ctx.bestStreak >= 3 ? h('div', { class: 'muted' }, `🔥 ${t('result.combo', { n: ctx.bestStreak })}`) : null,
      speedBonusEarned ? h('div', { class: 'badge-speed' }, `⚡ ${t('result.speedBonus')}`) : null,
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
    );
    render(page(t('result.title'), () => resolve('menu'), resultCard));
    countUp(num, score);
    if (isBest || badges.length || score >= 85) {
      setTimeout(() => burstConfetti(resultCard), 200);
    }
  });
}

export async function playPractice(ex: Exercise) {
  while ((await practiceRound(ex, null)) === 'retry');
  showTraining();
}

const CHEERS = ['🎉', '💪', '🌟', '🚀', '🧠'];

/** Plays the current workout; if it's already complete, starts another one with different exercises. */
export async function playPlan() {
  const plan = nextPlan();
  const n = plan.exercises.length;
  for (let i = 0; i < n; i++) {
    const ex = plan.exercises[i];
    if (plan.done.has(ex.id)) continue;
    const after = await practiceRound(ex, { i: i + 1, n });
    if (after === 'quit') return showHome();
    markPlanDone(ex.id); // the result is saved once the round ends, even if the player then goes to the menu
    if (after === 'menu') return showHome();
  }

  store.bump('plans');
  const xp = addXp(XP.plan);
  const badges = checkBadges();
  const reward = xpLine(xp.gained, xp.levelUp);
  sfx.fanfare();
  render(
    page(
      plan.round > 1 ? t('plan.titleN', { n: plan.round }) : t('plan.title'),
      showHome,
      h(
        'div',
        { class: 'card result' },
        h('div', { class: 'intro-icon' }, pick(CHEERS)),
        h('h2', {}, t('plan.done')),
        h('p', { class: 'muted' }, t('plan.doneSub')),
        reward,
        badgeList(badges),
        h(
          'div',
          { class: 'row' },
          h('button', { class: 'btn', onClick: showHome }, t('common.menu')),
          h('button', { class: 'btn primary', onClick: playPlan }, `🏋️ ${t('plan.again')}`),
        ),
      ),
    ),
  );
}

export async function playDailyCheck() {
  const done = store.todayCheck();
  if (done) return showCheckResult(done.score, true, null);

  const battery = dailyCheckBattery();
  const parts: Record<string, number> = {};
  for (let i = 0; i < battery.length; i++) {
    const ex = battery[i];
    const choice = await intro(ex, t('common.step', { i: i + 1, n: battery.length }));
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
  store.addCheck({ date: todayKey(), score, parts, v: NEURO_SCALE });
  syncBoard();
  const xp = addXp(XP.check);
  sfx.fanfare();
  showCheckResult(score, false, xpLine(xp.gained, xp.levelUp), badgeList(checkBadges()));
}

function showCheckResult(score: number, alreadyDone: boolean, reward: HTMLElement | null, badges: HTMLElement | null = null) {
  // Results from before the scale was recalibrated can't be compared with today's.
  const checks = store.data.checks.filter((c) => c.v === NEURO_SCALE);
  const prev = checks.length >= 2 ? checks[checks.length - 2] : null;
  const rescaled = checks.length < store.data.checks.length;
  const todays = store.todayCheck();
  const num = h('div', { class: 'big-score neuro' }, '0');

  let note: string;
  if (alreadyDone) note = t('check.doneToday');
  else if (!prev) note = rescaled ? t('check.rescaled') : t('check.first');
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
              ...Object.entries(todays.parts).map(([id, partScore]) => {
                const ex = byId(id);
                const icon = ex?.icon ?? '🧩';
                const domainLabel = ex ? t(`domain.${ex.domain}`) : id;
                const exName = ex ? t(ex.name) : id;
                return h(
                  'div',
                  { class: 'part', title: exName },
                  h('span', { class: 'part-label' }, `${icon} ${domainLabel}`),
                  h('div', { class: 'part-bar' }, h('div', { style: { width: `${partScore}%` } })),
                  h('b', {}, String(partScore)),
                );
              }),
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
