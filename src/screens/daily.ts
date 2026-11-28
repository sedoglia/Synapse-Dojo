import { h, todayKey } from '../dom';
import { sfx } from '../audio';
import { store } from '../storage';
import { t } from '../i18n';
import { APP_NAME } from '../config';
import { render, page, howBox } from '../ui';
import { crackTheCode, attemptsFor } from '../exercises/crackTheCode';
import { XP, addXp } from '../rewards';
import { dailyLevel, dailyNumber, dailySeed, dailyShareText, dailySquares, clock, untilNext } from '../daily';
import { burstConfetti, runExercise } from './play';

/** Today's result, if the challenge was already played today. */
export const dailyDoneToday = () => (store.data.daily?.date === todayKey() ? store.data.daily : null);

/** The daily challenge: its intro, or today's result if it was already played. `onBack` leaves the screen. */
export function showDaily(onBack: () => void) {
  const done = dailyDoneToday();
  if (done) return showDailyResult(onBack, false);

  const n = dailyNumber();
  const level = dailyLevel();
  render(
    page(
      t('daily.number', { n }),
      onBack,
      h(
        'div',
        { class: 'card intro daily-intro' },
        h('div', { class: 'intro-icon' }, '🔓'),
        h('h2', {}, t('daily.number', { n })),
        h('p', {}, t('daily.lead')),
        h('p', { class: 'daily-squares', 'aria-hidden': 'true' }, '⬜'.repeat(attemptsFor(level))),
        howBox(crackTheCode.how),
        h('button', { class: 'btn primary big', onClick: () => play(onBack) }, `▶ ${t('daily.play')}`),
      ),
    ),
  );
}

async function play(onBack: () => void) {
  const date = todayKey();
  const level = dailyLevel(date);
  const run = await runExercise(crackTheCode, 'check', level, { seed: dailySeed(date), level });
  const a = run?.res.attempts;
  // Quitting before the end saves nothing: the lock is still waiting.
  if (!a) return showDaily(onBack);
  // Played past midnight: the result belongs to the day the lock was drawn for.
  store.data.daily = { date, used: a.used, max: a.max, solved: a.solved, secs: a.secs, code: a.code };
  store.save();
  const xp = addXp(XP.exercise);
  showDailyResult(onBack, true, xp.gained);
}

function showDailyResult(onBack: () => void, fresh: boolean, gainedXp = 0) {
  const r = store.data.daily!;
  const title = t('daily.number', { n: dailyNumber(r.date) });
  const status = h('p', { class: 'muted small', role: 'status', hidden: true });
  const share = async () => {
    const text = dailyShareText(r, `${APP_NAME} · ${title}`, store.data.settings.lang);
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
      await navigator.clipboard.writeText(text);
      status.textContent = t('settings.linkCopied');
      status.hidden = false;
    } catch {
      // Cancelled, or neither sharing nor the clipboard is available.
    }
  };
  const card = h(
    'div',
    { class: 'card result daily-result' },
    h('div', { class: 'intro-icon' }, r.solved ? '🔓' : '🔒'),
    h('h2', {}, title),
    h('p', { class: 'daily-squares big' }, dailySquares(r)),
    h('p', { class: 'daily-line' }, `${r.solved ? r.used : 'X'}/${r.max} · ⏱️ ${clock(r.secs)}`),
    h('p', {}, r.solved ? t('daily.solved', { time: clock(r.secs) }) : t('daily.failed', { code: r.code.split('').join(' ') })),
    gainedXp ? h('div', { class: 'xp-gain' }, h('span', { class: 'xp-chip' }, `+${gainedXp} XP`)) : null,
    h('button', { class: 'btn primary big', onClick: share }, `📤 ${t('daily.share')}`),
    status,
    h('p', { class: 'muted small' }, t('daily.next', { time: untilNext() })),
    h('button', { class: 'btn', onClick: onBack }, t('common.menu')),
  );
  render(page(title, onBack, card));
  if (fresh) {
    if (r.solved) {
      sfx.fanfare();
      setTimeout(() => burstConfetti(card), 200);
    } else sfx.bad();
  }
}
