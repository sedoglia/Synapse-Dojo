import { h } from '../dom';
import { t } from '../i18n';
import { render, page } from '../ui';
import { AGE_BANDS, boardErrorText, joinBoard, type AgeBand } from '../board';

export function ageSelect(value: string | null, onChange: (band: AgeBand | null) => unknown): HTMLSelectElement {
  const select = h(
    'select',
    { class: 'input', onChange: () => onChange((select.value || null) as AgeBand | null) },
    h('option', { value: '', selected: value === null }, t('settings.boardNoAge')),
    ...AGE_BANDS.map((b) => h('option', { value: b, selected: b === value }, t(`board.band.${b}`))),
  );
  return select;
}

/**
 * The opt-in card: what is sent and that it is optional, an age group, and the join button (the Turnstile
 * check appears inside the card while it runs). `intro` replaces the heading line, e.g. for a group invite.
 */
export function joinCard(onJoined: () => void | Promise<void>, intro: HTMLElement | null = null): HTMLElement {
  let band: AgeBand | null = null;
  const check = h('div', { class: 'turnstile-box' });
  const error = h('p', { class: 'small board-error', role: 'alert' });
  const label = `🏆 ${t('settings.boardJoin')}`;
  const join = h('button', { class: 'btn primary' }, label);
  join.addEventListener('click', async () => {
    join.disabled = true;
    join.textContent = t('settings.boardJoining');
    error.textContent = '';
    try {
      await joinBoard(band, check);
      await onJoined();
    } catch (e) {
      error.textContent = boardErrorText(e);
      join.disabled = false;
      join.textContent = label;
    }
  });
  return h(
    'section',
    { class: 'card form' },
    intro ?? h('h3', {}, `🏆 ${t('settings.board')}`),
    h('p', { class: 'muted small' }, t('settings.boardHint')),
    h('label', {}, t('settings.boardAge'), ageSelect(null, (b) => (band = b))),
    h('div', { class: 'row left' }, join),
    check,
    error,
  );
}

/** A screen of its own for joining, opened from the home-screen suggestion or a group invite. */
export function showBoardJoin(onBack: () => void, onJoined: () => void | Promise<void>, intro: HTMLElement | null = null) {
  render(page(t('board.title'), onBack, joinCard(onJoined, intro)));
}
