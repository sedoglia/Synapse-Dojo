import { h } from '../dom';
import { store } from '../storage';
import { t } from '../i18n';
import { APP_NAME } from '../config';
import { render, rankName, xpBar, langPicker } from '../ui';
import { currentPlan, planMinutes } from '../stats';
import { playerLevel, nextBadge } from '../rewards';
import { playDailyCheck, playPlan } from './play';
import { showTraining } from './training';
import { showProgress } from './progress';
import { showSettings } from './settings';
import { showGuide } from './guide';

function menuCard(icon: string, title: string, sub: string | HTMLElement, onClick: () => void, cls = '') {
  return h(
    'button',
    { class: `menu-card ${cls}`, onClick },
    h('span', { class: 'menu-icon' }, icon),
    h('span', { class: 'menu-text' }, h('b', {}, title), typeof sub === 'string' ? h('small', {}, sub) : sub),
    h('span', { class: 'chev' }, '›'),
  );
}

export function showHome() {
  const { name } = store.data;
  const streak = store.streak();
  const check = store.todayCheck();
  const plan = currentPlan();
  const planDone = plan.done.size;
  const planTitle = plan.round > 1 ? t('plan.titleN', { n: plan.round }) : t('plan.title');
  const week = store.daysThisWeek();
  const lvl = playerLevel();
  const goal = nextBadge();
  const streakText =streak === 0 ? t('home.streak0') : streak === 1 ? t('home.streak1') : t('home.streak', { n: streak });

  const planSub = h(
    'small',
    { class: 'plan-sub' },
    h(
      'span',
      {},
      plan.complete
        ? t('plan.againSub')
        : `${t('plan.sub', { n: plan.exercises.length, min: planMinutes(plan.exercises) })} · ${t('plan.progress', { done: planDone, n: plan.exercises.length })}`,
    ),
    h(
      'span',
      { class: 'plan-icons' },
      ...plan.exercises.map((e) => h('span', { class: plan.done.has(e.id) ? 'done' : '', title: t(e.name) }, e.icon)),
    ),
  );

  render(
    h(
      'div',
      { class: 'page home' },
      h(
        'header',
        { class: 'hero' },
        h(
          'div',
          { class: 'hero-topbar' },
          langPicker(showHome),
          h(
            'div',
            { class: 'hero-actions' },
            h('button', { class: 'icon-btn guide-btn', 'aria-label': t('guide.title'), title: t('guide.title'), onClick: () => showGuide(showHome) }, '📖'),
            h('button', { class: 'icon-btn settings-btn', 'aria-label': t('home.settings'), title: t('home.settings'), onClick: showSettings }, '⚙'),
          ),
        ),

        h('div', { class: 'logo' }, h('img', { src: './icon.svg', alt: '' }), h('span', {}, APP_NAME)),
        h('h1', {}, t('home.hello', { name })),
        h('p', { class: 'muted' }, t('home.how')),
        h(
          'div',
          { class: 'hero-chips' },
          h('div', { class: `streak ${streak ? 'on' : ''}` }, `🔥 ${streakText}`),
          h('div', { class: `streak ${week >= 4 ? 'on' : ''}` }, `🎯 ${t('home.week', { n: Math.min(4, week) })}`),
        ),
        xpBar(lvl.level, store.data.xp, lvl.from, lvl.to),
      ),
      h(
        'main',
        { class: 'content menu' },
        menuCard(
          plan.complete ? '✅' : '🏋️',
          plan.complete ? `${planTitle} ✓ · ${t('plan.again')}` : planTitle,
          planSub,
          playPlan,
          plan.complete ? 'done' : 'featured',
        ),
        menuCard(
          '📏',
          t('home.check'),
          check ? `${t('home.checkDone', { score: check.score })} · ${rankName(check.score)}` : t('home.checkSub'),
          playDailyCheck,
          check ? 'done' : '',
        ),
        menuCard('🧩', t('home.training'), t('home.trainingSub'), showTraining),
        menuCard('📈', t('home.progress'), t('home.progressSub'), showProgress),
        goal
          ? h(
              'button',
              { class: 'next-goal', onClick: showProgress },
              h('span', { class: 'goal-icon' }, goal.icon),
              h(
                'span',
                { class: 'menu-text' },
                h('small', {}, t('home.next')),
                h('b', {}, t(goal.name)),
                h('small', { class: 'muted' }, t(goal.desc)),
              ),
              h('div', { class: 'goal-bar' }, h('div', { style: { width: `${Math.round(goal.progress() * 100)}%` } })),
            )
          : null,
      ),
    ),
  );
}
