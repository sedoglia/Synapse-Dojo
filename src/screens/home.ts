import { h, todayKey } from '../dom';
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
import { showBoard } from './board';
import { showBoardJoin } from './boardJoin';
import { homeShown } from '../update';
import { boardAvailable, boardErrorText, BoardError, clearInvite, fetchBoard, joinGroup, previewGroup } from '../board';

/** The suggestion to join appears from the very first visit and comes back a week after "Not now". */
const PROMPT_SNOOZE_DAYS = 7;

function snoozeDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + PROMPT_SNOOZE_DAYS);
  return todayKey(d);
}

/**
 * A gentle, dismissible reminder that the leaderboard exists, for players who never joined: it says plainly that
 * it is optional, and "Don't ask again" really means never.
 */
function promptCard(): HTMLElement | null {
  const p = store.data.boardPrompt;
  if (store.data.board || store.data.boardInvite || !boardAvailable() || p.never) return null;
  if (p.snoozed && p.snoozed > todayKey()) return null;
  const hide = (prompt: typeof p) => {
    store.data.boardPrompt = prompt;
    store.save();
    showHome();
  };
  return h(
    'section',
    { class: 'card board-prompt' },
    h('h3', {}, `🏆 ${t('prompt.title')}`),
    h('p', { class: 'small' }, t('prompt.text')),
    h(
      'div',
      { class: 'row left' },
      h('button', { class: 'btn primary', onClick: () => showBoardJoin(showHome, () => showBoard(showHome)) }, t('prompt.join')),
      h('button', { class: 'btn', onClick: () => hide({ snoozed: snoozeDate() }) }, t('prompt.later')),
      h('button', { class: 'btn ghost', onClick: () => hide({ never: true }) }, t('prompt.never')),
    ),
  );
}

/** A group invite link was opened: say which group it is and offer to join (through the opt-in if needed). */
function inviteCard(): HTMLElement | null {
  const code = store.data.boardInvite;
  if (!code || !boardAvailable()) return null;
  const title = h('h3', {}, `👥 ${t('invite.title', { name: '…' })}`);
  const text = h('p', { class: 'small' }, store.data.board ? t('invite.textMember') : t('invite.text'));
  const error = h('p', { class: 'small board-error', role: 'alert' });
  const join = h('button', { class: 'btn primary', disabled: true }, t('invite.join'));
  const card = h(
    'section',
    { class: 'card board-prompt' },
    title,
    text,
    h('div', { class: 'row left' }, join, h('button', { class: 'btn ghost', onClick: () => (clearInvite(), showHome()) }, t('invite.dismiss'))),
    error,
  );
  const enter = async () => {
    const g = await joinGroup(code);
    clearInvite();
    showBoard(showHome, g.id);
  };
  previewGroup(code)
    .then(({ name, members }) => {
      title.textContent = `👥 ${t('invite.title', { name })}`;
      const size = members === 1 ? t('groups.members1') : t('groups.members', { n: members });
      if (!store.data.board) text.textContent = `${size} · ${t('invite.text')}`;
      join.disabled = false;
      join.addEventListener('click', async () => {
        if (!store.data.board) return showBoardJoin(showHome, enter, h('h3', {}, title.textContent));
        join.disabled = true;
        try {
          await enter();
        } catch (e) {
          error.textContent = boardErrorText(e);
          join.disabled = false;
        }
      });
    })
    .catch((e: unknown) => {
      // A code that no longer exists is simply forgotten; offline, the invite waits for the next visit.
      if (e instanceof BoardError && e.code === 'not_found') {
        clearInvite();
        card.remove();
      } else error.textContent = boardErrorText(e);
    });
  return card;
}

/**
 * Leaderboard shortcut, only for players who joined; the line fills in when the server answers.
 * It is seen at every visit, so it must inform rather than judge: the rank is shown in the top half,
 * otherwise how many points would move the player up (a reachable next step, never "18th of 18").
 */
function boardCard(): HTMLElement | null {
  if (!store.data.board) return null;
  const sub = h('small', {}, t('home.boardSub'));
  fetchBoard({ metric: 'days' })
    .then((res) => {
      const me = res.me;
      if (!me) return;
      if (me.rank <= Math.ceil(res.total / 2)) {
        sub.textContent = t('home.boardRank', { rank: me.rank, n: res.total });
        return;
      }
      // The nearest player with more points: reaching their score means sharing their (higher) rank.
      const ahead = [...res.above].reverse().find((r) => r.value > me.value);
      if (!ahead) return;
      const gap = Math.round(ahead.value - me.value);
      sub.textContent = gap === 1 ? t('home.boardGap1') : t('home.boardGap', { n: gap });
    })
    .catch(() => {
      /* offline: keep the generic line */
    });
  return menuCard('🏆', t('home.board'), sub, () => showBoard(showHome));
}

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
        inviteCard(),
        promptCard(),
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
        boardCard(),
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
  homeShown();
}
