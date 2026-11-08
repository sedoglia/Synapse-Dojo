import { h, todayKey } from '../dom';
import { store, NEURO_SCALE } from '../storage';
import { t, dateText } from '../i18n';
import { render, page, sparkline, xpBar, rankName } from '../ui';
import { EXERCISES, DOMAINS, type Domain } from '../exercises';
import { capacity, domainScore } from '../stats';
import { BADGES, earned, playerLevel, nearBadges, type Badge } from '../rewards';
import { canShareBadge, openShare } from '../share';
import { levelText, playPractice, playDailyCheck, playPlan } from './play';
import { showHome } from './home';

const SVG = 'http://www.w3.org/2000/svg';

function svg(tag: string, attrs: Record<string, string | number>, text?: string): SVGElement {
  const el = document.createElementNS(SVG, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  if (text) el.textContent = text;
  return el;
}

function wrap(el: SVGElement, cls: string): HTMLElement {
  const box = h('div', { class: cls });
  box.append(el);
  return box;
}

const DOMAIN_ICONS: Record<Domain, string> = {
  speed: '⚡',
  attention: '🎯',
  executive: '🎛️',
  wm: '🧠',
  memory: '🔐',
  spatial: '🧊',
  reasoning: '🧩',
  language: '➗',
  coordination: '👐',
};

export type ProgressTab = 'overview' | 'exercises' | 'habits' | 'badges';

let currentTab: ProgressTab = 'overview';
let selectedDomain: string = 'all';
let exerciseFilter: 'all' | 'played' | 'unplayed' = 'all';
let badgeFilter: 'all' | 'near' | 'earned' | 'locked' = 'all';

function scoreChart(): HTMLElement {
  const checks = store.data.checks.filter((c) => c.v === NEURO_SCALE).slice(-30);
  if (!checks.length) return h('p', { class: 'muted center small' }, t('progress.empty'));

  const W = 320, H = 160, P = 24;
  const x = (i: number) => P + (checks.length === 1 ? (W - 2 * P) / 2 : (i * (W - 2 * P)) / (checks.length - 1));
  const y = (v: number) => H - P - (v / 1000) * (H - 2 * P);
  const root = svg('svg', { viewBox: `0 0 ${W} ${H}`, class: 'chart', role: 'img' });

  for (const v of [0, 500, 1000]) {
    root.append(svg('line', { x1: P, x2: W - P, y1: y(v), y2: y(v), class: 'grid-line' }));
    root.append(svg('text', { x: 2, y: y(v) + 4, class: 'axis' }, String(v)));
  }
  const d = checks.map((c, i) => `${i ? 'L' : 'M'}${x(i)},${y(c.score)}`).join(' ');
  root.append(svg('path', { d: `${d} L${x(checks.length - 1)},${y(0)} L${x(0)},${y(0)} Z`, class: 'area' }));
  root.append(svg('path', { d, class: 'line' }));
  checks.forEach((c, i) => {
    const dot = svg('circle', { cx: x(i), cy: y(c.score), r: 3.5, class: 'dot' });
    dot.append(svg('title', {}, `${dateText(c.date)}: ${c.score}`));
    root.append(dot);
  });
  return wrap(root, 'chart-wrap');
}

/** Spider chart of the nine skill domains. */
function domainRadar(): HTMLElement {
  const S = 300, C = S / 2, R = 92;
  const n = DOMAINS.length;
  const pt = (i: number, r: number) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [C + Math.cos(a) * r, C + Math.sin(a) * r];
  };
  const root = svg('svg', { viewBox: `0 0 ${S} ${S}`, class: 'radar', role: 'img' });
  for (const k of [0.25, 0.5, 0.75, 1]) {
    root.append(svg('polygon', { points: DOMAINS.map((_, i) => pt(i, R * k).join(',')).join(' '), class: 'radar-ring' }));
  }
  DOMAINS.forEach((d, i) => {
    const [x, y] = pt(i, R);
    root.append(svg('line', { x1: C, y1: C, x2: x, y2: y, class: 'radar-ring' }));
    const [lx, ly] = pt(i, R + 24);
    root.append(svg('text', { x: lx, y: ly + 4, class: 'radar-label', 'text-anchor': 'middle' }, t(`domain.${d}`)));
  });
  const values = DOMAINS.map((d) => domainScore(d) / 100);
  root.append(svg('polygon', { points: values.map((v, i) => pt(i, R * Math.max(0.03, v)).join(',')).join(' '), class: 'radar-area' }));
  return wrap(root, 'chart-wrap');
}

function calendar(): HTMLElement {
  const active = store.activeDays();
  const cells: HTMLElement[] = [];
  const d = new Date();
  d.setDate(d.getDate() - 27);
  for (let i = 0; i < 28; i++) {
    const key = todayKey(d);
    cells.push(
      h('div', { class: `cal-day ${active.has(key) ? 'on' : ''} ${key === todayKey() ? 'today' : ''}`, title: dateText(key) }, String(d.getDate())),
    );
    d.setDate(d.getDate() + 1);
  }
  return h('div', { class: 'calendar' }, ...cells);
}

function renderTabBar(): HTMLElement {
  const tabs: { id: ProgressTab; icon: string; label: string }[] = [
    { id: 'overview', icon: '📊', label: t('progress.tab.overview') },
    { id: 'exercises', icon: '🧩', label: t('progress.tab.exercises') },
    { id: 'habits', icon: '📅', label: t('progress.tab.habits') },
    { id: 'badges', icon: '🏅', label: t('progress.tab.badges') },
  ];

  return h(
    'div',
    { class: 'seg progress-tabs', role: 'tablist' },
    ...tabs.map((tab) =>
      h(
        'button',
        {
          class: tab.id === currentTab ? 'on' : '',
          role: 'tab',
          'aria-selected': String(tab.id === currentTab),
          type: 'button',
          onClick: () => {
            currentTab = tab.id;
            showProgress();
          },
        },
        `${tab.icon} ${tab.label}`,
      ),
    ),
  );
}

/** Tab 1: Overview & Neuro Profile (Reward Prediction Error, Goal-Gradient, Executive Summary). */
function renderOverview(): (HTMLElement | null)[] {
  const { runs, checks } = store.data;
  const gotBadges = BADGES.filter(earned);
  const { level, from, to } = playerLevel();
  const todayCheck = store.todayCheck();
  const latestCheck = checks[checks.length - 1];

  // Domain strengths and growth opportunities
  const domainStats = DOMAINS.map((d) => ({ domain: d, score: domainScore(d) })).sort((a, b) => b.score - a.score);
  const strongest = domainStats[0];
  const growth = domainStats[domainStats.length - 1];

  // Near badges for Goal-Gradient acceleration (Hull 1932; Kivetz et al. 2006)
  const nearList = nearBadges(3);

  return [
    // 1. Executive Dopamine Stats Grid
    h(
      'div',
      { class: 'progress-stats-grid' },
      h(
        'div',
        { class: 'progress-stat-card' },
        h('span', { class: 'stat-icon' }, '🔥'),
        h('span', { class: 'stat-val' }, `${store.streak()}d`),
        h('span', { class: 'stat-lbl' }, t('progress.streakActive')),
      ),
      h(
        'div',
        { class: 'progress-stat-card' },
        h('span', { class: 'stat-icon' }, '⚡'),
        h('span', { class: 'stat-val' }, String(runs.length + checks.length)),
        h('span', { class: 'stat-lbl' }, t('progress.totalSessions')),
      ),
      h(
        'div',
        { class: 'progress-stat-card' },
        h('span', { class: 'stat-icon' }, '🏅'),
        h('span', { class: 'stat-val' }, `${gotBadges.length}/${BADGES.length}`),
        h('span', { class: 'stat-lbl' }, t('progress.badgesEarned')),
      ),
    ),

    // 2. XP & Rank Progress Bar
    h(
      'section',
      { class: 'card' },
      latestCheck ? h('p', { class: 'small muted center', style: { marginBottom: '8px' } }, `${t('progress.chart')}: ${latestCheck.score} · ${rankName(latestCheck.score)}`) : null,
      xpBar(level, store.data.xp, from, to),
    ),

    // 3. Today's Neuro Check status / Action banner
    todayCheck
      ? h(
          'div',
          { class: 'progress-banner' },
          h(
            'div',
            { class: 'progress-banner-text' },
            h('b', {}, `✓ ${t('home.checkDone', { score: todayCheck.score })}`),
            h('p', {}, `${rankName(todayCheck.score)} · ${t('home.checkSub')}`),
          ),
        )
      : h(
          'div',
          { class: 'progress-banner actionable' },
          h(
            'div',
            { class: 'progress-banner-text' },
            h('b', {}, `⚡ ${t('progress.playCheck')}`),
            h('p', {}, t('home.checkSub')),
          ),
          h('button', { class: 'btn primary small-btn', type: 'button', onClick: playDailyCheck }, t('common.start')),
        ),

    // 4. Prossimi Traguardi (Goal-Gradient Effect)
    nearList.length
      ? h(
          'section',
          { class: 'card' },
          h(
            'div',
            { class: 'row between' },
            h('h3', {}, `🎯 ${t('progress.nextGoals')}`),
            h(
              'button',
              {
                class: 'link-btn small',
                type: 'button',
                onClick: () => {
                  badgeFilter = 'near';
                  currentTab = 'badges';
                  showProgress();
                },
              },
              t('progress.allBadges'),
            ),
          ),
          h('p', { class: 'muted small' }, t('progress.nextGoalsHint')),
          h(
            'div',
            { class: 'near-goals-list' },
            ...nearList.map(({ badge, progress }) => {
              const pct = Math.round(progress * 100);
              return h(
                'div',
                {
                  class: 'near-goal-item',
                  role: 'button',
                  tabIndex: 0,
                  onClick: () => {
                    badgeFilter = 'all';
                    currentTab = 'badges';
                    showProgress();
                  },
                },
                h('span', { class: 'near-goal-icon' }, badge.icon),
                h(
                  'div',
                  { class: 'near-goal-info' },
                  h('b', {}, t(badge.name)),
                  h('small', {}, t(badge.desc)),
                  h('div', { class: 'goal-bar' }, h('div', { style: { width: `${pct}%` } })),
                ),
                h('span', { class: 'near-goal-pct' }, `${pct}%`),
              );
            }),
          ),
        )
      : null,

    // 5. Profilo Cognitivo (9 Domini - Radar Chart)
    h(
      'section',
      { class: 'card' },
      h('h3', {}, `🧠 ${t('progress.domains')}`),
      domainRadar(),
      h('p', { class: 'muted small center' }, t('progress.domainsHint')),
      h(
        'div',
        { class: 'domain-highlights' },
        h(
          'div',
          { class: 'domain-highlight-box strength' },
          h('span', { class: 'domain-highlight-label' }, `🌟 ${t('progress.strongestDomain')}`),
          h('span', { class: 'domain-highlight-title' }, `${DOMAIN_ICONS[strongest.domain]} ${t(`domain.${strongest.domain}`)}`),
          h('span', { class: 'domain-highlight-score' }, `${Math.round(strongest.score)}%`),
        ),
        h(
          'div',
          { class: 'domain-highlight-box growth' },
          h('span', { class: 'domain-highlight-label' }, `🎯 ${t('progress.focusDomain')}`),
          h('span', { class: 'domain-highlight-title' }, `${DOMAIN_ICONS[growth.domain]} ${t(`domain.${growth.domain}`)}`),
          h(
            'div',
            { class: 'row between', style: { marginTop: '4px' } },
            h('span', { class: 'domain-highlight-score' }, `${Math.round(growth.score)}%`),
            h(
              'button',
              {
                class: 'btn small-btn primary',
                style: { padding: '3px 8px', fontSize: '0.74rem' },
                type: 'button',
                onClick: () => {
                  selectedDomain = growth.domain;
                  currentTab = 'exercises';
                  showProgress();
                },
              },
              t('progress.boost'),
            ),
          ),
        ),
      ),
    ),

    // 6. Neuro Score History Chart
    h('section', { class: 'card' }, h('h3', {}, `📈 ${t('progress.chart')}`), scoreChart()),

    // 7. Actionable training CTA
    h(
      'div',
      { class: 'row center', style: { margin: '8px 0 16px' } },
      h('button', { class: 'btn primary', type: 'button', onClick: () => playPlan() }, `🚀 ${t('progress.trainNow')}`),
    ),
  ];
}

/** Tab 2: Exercises & Domain Drill-Down (Chunking, No Infinite Scroll, Direct Actionability). */
function renderExercises(): HTMLElement[] {
  // Filter by domain
  const domainChips = [
    h(
      'button',
      {
        class: `chip ${selectedDomain === 'all' ? 'on' : ''}`,
        type: 'button',
        onClick: () => {
          selectedDomain = 'all';
          showProgress();
        },
      },
      `🌐 ${t('progress.filterAll')} (${EXERCISES.length})`,
    ),
    ...DOMAINS.map((d) => {
      const count = EXERCISES.filter((e) => e.domain === d).length;
      return h(
        'button',
        {
          class: `chip ${selectedDomain === d ? 'on' : ''}`,
          type: 'button',
          onClick: () => {
            selectedDomain = d;
            showProgress();
          },
        },
        `${DOMAIN_ICONS[d]} ${t(`domain.${d}`)} (${count})`,
      );
    }),
  ];

  // Status Filter: All, Played, Unplayed
  const statusChips = (['all', 'played', 'unplayed'] as const).map((filter) =>
    h(
      'button',
      {
        class: `chip ${exerciseFilter === filter ? 'on' : ''}`,
        type: 'button',
        onClick: () => {
          exerciseFilter = filter;
          showProgress();
        },
      },
      filter === 'all' ? t('progress.filterAll') : filter === 'played' ? t('progress.filterPlayed') : t('progress.filterUnplayed'),
    ),
  );

  let list = EXERCISES;
  if (selectedDomain !== 'all') list = list.filter((e) => e.domain === selectedDomain);
  if (exerciseFilter === 'played') list = list.filter((e) => store.lastPlayed(e.id));
  else if (exerciseFilter === 'unplayed') list = list.filter((e) => !store.lastPlayed(e.id));

  return [
    h('div', { class: 'chip-bar', role: 'group', 'aria-label': 'Domain filter' }, ...domainChips),
    h('div', { class: 'chip-bar', style: { paddingTop: '0' }, role: 'group', 'aria-label': 'Status filter' }, ...statusChips),
    h(
      'section',
      { class: 'card' },
      h('div', { class: 'row between' }, h('h3', {}, t('progress.exercises')), h('small', { class: 'muted' }, `${list.length} / ${EXERCISES.length}`)),
      ...list.map((ex) => {
        const cap = capacity(ex);
        const level = ex.levels && store.hasLevel(ex.id) ? levelText(ex, store.level(ex.id, ex.levels.start)) : null;
        const best = store.best(ex.id);
        const history = (store.data.history[ex.id] ?? []).map((p) => p.level);

        return h(
          'div',
          { class: 'ex-progress-card' },
          h('span', { class: 'ex-progress-icon' }, ex.icon),
          h(
            'div',
            { class: 'ex-progress-main' },
            h(
              'div',
              { class: 'ex-progress-title-row' },
              h('span', { class: 'ex-progress-title' }, t(ex.name)),
              h('span', { class: 'ex-progress-domain-badge' }, `${DOMAIN_ICONS[ex.domain]} ${t(`domain.${ex.domain}`)}`),
              level ? h('small', { class: 'muted level-tag' }, level) : null,
            ),
            h(
              'div',
              { class: 'ex-progress-graph-row' },
              history.length >= 2 ? sparkline(history.slice(-20), 130, 26) : h('div', { class: 'part-bar' }, h('div', { style: { width: `${cap ?? 0}%` } })),
              h('b', { class: 'ex-progress-score' }, best !== null ? `${best}` : t('progress.none')),
            ),
          ),
          h(
            'button',
            {
              class: 'ex-progress-play-btn',
              type: 'button',
              title: `${t('progress.play')} ${t(ex.name)}`,
              onClick: () => playPractice(ex, () => showProgress('exercises')),
            },
            `▶ ${t('progress.play')}`,
          ),
        );
      }),
    ),
  ];
}

/** Tab 3: Consistency & Habits (Spacing Effect, 28-day Activity, Neuroscience of Practice). */
function renderHabits(): HTMLElement[] {
  const { runs, checks } = store.data;
  const activeDays = store.activeDays();
  const streak = store.streak();
  const bestStreak = store.data.bestStreak ?? streak;

  return [
    h(
      'section',
      { class: 'card' },
      h('h3', {}, `📅 ${t('progress.calendar')}`),
      calendar(),
      h(
        'div',
        { style: { marginTop: '12px' } },
        h('p', { class: 'muted small' }, t('progress.week', { n: store.daysThisWeek() })),
        h('div', { class: 'goal-bar', style: { margin: '6px 0 10px' } }, h('div', { style: { width: `${Math.min(100, Math.round((store.daysThisWeek() / 4) * 100))}%` } })),
      ),
      store.daysThisWeek() > 0
        ? h('button', { class: 'btn small-btn', type: 'button', onClick: () => openShare({ kind: 'week', days: store.daysThisWeek() }) }, `📤 ${t('share.weekBtn')}`)
        : null,
    ),

    h(
      'section',
      { class: 'card' },
      h('h3', {}, '🔥 ' + t('progress.tab.habits')),
      h(
        'div',
        { class: 'progress-stats-grid', style: { gridTemplateColumns: 'repeat(2, 1fr)', marginTop: '8px' } },
        h(
          'div',
          { class: 'progress-stat-card' },
          h('span', { class: 'stat-icon' }, '🔥'),
          h('span', { class: 'stat-val' }, `${streak}d`),
          h('span', { class: 'stat-lbl' }, t('progress.streakActive')),
        ),
        h(
          'div',
          { class: 'progress-stat-card' },
          h('span', { class: 'stat-icon' }, '🏆'),
          h('span', { class: 'stat-val' }, `${bestStreak}d`),
          h('span', { class: 'stat-lbl' }, t('progress.bestStreak', { n: bestStreak })),
        ),
        h(
          'div',
          { class: 'progress-stat-card' },
          h('span', { class: 'stat-icon' }, '📅'),
          h('span', { class: 'stat-val' }, String(activeDays.size)),
          h('span', { class: 'stat-lbl' }, `${activeDays.size} days active`),
        ),
        h(
          'div',
          { class: 'progress-stat-card' },
          h('span', { class: 'stat-icon' }, '⚡'),
          h('span', { class: 'stat-val' }, String(runs.length + checks.length)),
          h('span', { class: 'stat-lbl' }, t('progress.totalSessions')),
        ),
      ),
      // Scientific educational pill: Distributed practice and habit automaticity
      h(
        'div',
        { class: 'science-box' },
        h('div', { class: 'science-box-title' }, `🧠 ${t('progress.habitScienceTitle')}`),
        h('p', { class: 'science-box-body' }, t('progress.habitScienceBody')),
      ),
    ),
  ];
}

/** Tab 4: Trophies & Badges Showcase (Self-Determination Theory, Zeigarnik Effect). */
function renderBadges(): HTMLElement[] {
  const got = BADGES.filter(earned).length;
  const pct = Math.round((got / BADGES.length) * 100);

  const inProgressList = BADGES.filter((b) => !earned(b) && b.progress() > 0).sort((a, b) => b.progress() - a.progress());
  const earnedList = BADGES.filter(earned);
  const lockedList = BADGES.filter((b) => !earned(b) && b.progress() === 0);

  const filterChips = [
    h(
      'button',
      {
        class: `chip ${badgeFilter === 'all' ? 'on' : ''}`,
        type: 'button',
        onClick: () => {
          badgeFilter = 'all';
          showProgress();
        },
      },
      `🌐 ${t('progress.filterAll')} (${BADGES.length})`,
    ),
    h(
      'button',
      {
        class: `chip ${badgeFilter === 'near' ? 'on' : ''}`,
        type: 'button',
        onClick: () => {
          badgeFilter = 'near';
          showProgress();
        },
      },
      `🔥 ${t('progress.filterNear')} (${inProgressList.length})`,
    ),
    h(
      'button',
      {
        class: `chip ${badgeFilter === 'earned' ? 'on' : ''}`,
        type: 'button',
        onClick: () => {
          badgeFilter = 'earned';
          showProgress();
        },
      },
      `✓ ${t('progress.filterEarned')} (${earnedList.length})`,
    ),
    h(
      'button',
      {
        class: `chip ${badgeFilter === 'locked' ? 'on' : ''}`,
        type: 'button',
        onClick: () => {
          badgeFilter = 'locked';
          showProgress();
        },
      },
      `🔒 ${t('progress.filterLocked')} (${lockedList.length})`,
    ),
  ];

  let displayed: Badge[] = BADGES;
  if (badgeFilter === 'near') displayed = inProgressList;
  else if (badgeFilter === 'earned') displayed = earnedList;
  else if (badgeFilter === 'locked') displayed = lockedList;

  return [
    h(
      'section',
      { class: 'card' },
      h(
        'div',
        { class: 'badge-header-progress' },
        h(
          'div',
          { class: 'badge-header-stats' },
          h('span', {}, `🏅 ${t('badges.title')}`),
          h('span', { class: 'muted' }, t('badges.count', { n: got, t: BADGES.length })),
        ),
        h('div', { class: 'goal-bar' }, h('div', { style: { width: `${pct}%` } })),
      ),
      h('div', { class: 'chip-bar', role: 'group', 'aria-label': 'Badge status filter' }, ...filterChips),
      h(
        'div',
        { class: 'badges', style: { marginTop: '10px' } },
        ...displayed.map((b) => {
          const done = earned(b);
          const p = Math.round(b.progress() * 100);
          return h(
            'div',
            { class: `badge ${done ? 'earned' : ''}`, title: t(b.desc) },
            h('span', { class: 'badge-icon' }, b.icon),
            h('b', {}, t(b.name)),
            h('small', { class: 'muted' }, t(b.desc)),
            done
              ? h('small', { class: 'badge-date' }, `✓ ${dateText(store.data.badges[b.id])}`)
              : h('div', { class: 'goal-bar', style: { width: '100%', marginTop: '4px' } }, h('div', { style: { width: `${p}%` } })),
            !done && p > 0 ? h('small', { class: 'muted', style: { fontSize: '0.7rem', fontWeight: '700' } }, `${p}%`) : null,
            done && canShareBadge(b)
              ? h('button', { class: 'link-btn small badge-share', type: 'button', onClick: () => openShare({ kind: 'badge', badge: b }) }, `📤 ${t('share.action')}`)
              : null,
          );
        }),
      ),
    ),
  ];
}

export function showProgress(tab?: ProgressTab) {
  if (tab) currentTab = tab;

  let tabContent: (HTMLElement | null)[] = [];
  if (currentTab === 'overview') tabContent = renderOverview();
  else if (currentTab === 'exercises') tabContent = renderExercises();
  else if (currentTab === 'habits') tabContent = renderHabits();
  else if (currentTab === 'badges') tabContent = renderBadges();

  render(page(t('progress.title'), showHome, renderTabBar(), ...tabContent));
}
