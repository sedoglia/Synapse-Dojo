import { h } from '../dom';
import { store } from '../storage';
import { t } from '../i18n';
import { APP_NAME } from '../config';
import { render, rankName } from '../ui';
import { playDailyCheck } from './play';
import { showTraining } from './training';
import { showProgress } from './progress';
import { showSettings } from './settings';

function menuCard(icon: string, title: string, sub: string, onClick: () => void, cls = '') {
  return h(
    'button',
    { class: `menu-card ${cls}`, onClick },
    h('span', { class: 'menu-icon' }, icon),
    h('span', { class: 'menu-text' }, h('b', {}, title), h('small', {}, sub)),
    h('span', { class: 'chev' }, '›'),
  );
}

export function showHome() {
  const { name } = store.data;
  const streak = store.streak();
  const check = store.todayCheck();
  const streakText = streak === 0 ? t('home.streak0') : streak === 1 ? t('home.streak1') : t('home.streak', { n: streak });

  render(
    h(
      'div',
      { class: 'page home' },
      h(
        'header',
        { class: 'hero' },
        h('button', { class: 'icon-btn settings-btn', 'aria-label': t('home.settings'), onClick: showSettings }, '⚙'),
        h('div', { class: 'logo' }, h('img', { src: './icon.svg', alt: '' }), h('span', {}, APP_NAME)),
        h('h1', {}, t('home.hello', { name })),
        h('p', { class: 'muted' }, t('app.tagline')),
        h('div', { class: `streak ${streak ? 'on' : ''}` }, `🔥 ${streakText}`),
      ),
      h(
        'main',
        { class: 'content menu' },
        menuCard(
          '🧠',
          t('home.check'),
          check ? `${t('home.checkDone', { score: check.score })} · ${rankName(check.score)}` : t('home.checkSub'),
          playDailyCheck,
          check ? 'done' : 'featured',
        ),
        menuCard('🏋️', t('home.training'), t('home.trainingSub'), showTraining),
        menuCard('📈', t('home.progress'), t('home.progressSub'), showProgress),
      ),
    ),
  );
}
