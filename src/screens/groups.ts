import { h } from '../dom';
import { store } from '../storage';
import { t } from '../i18n';
import { render, page } from '../ui';
import { boardErrorText, createGroup, inviteLink, joinGroup, leaveGroup, listGroups, type Group } from '../board';
import { showBoard } from './board';

const membersText = (n: number) => (n === 1 ? t('groups.members1') : t('groups.members', { n }));

/** Shares the invite with the phone's share sheet when there is one, otherwise copies it. */
async function shareInvite(g: Group, status: HTMLElement) {
  const url = inviteLink(g.code);
  const text = t('groups.inviteText', { name: g.name, url });
  try {
    if (navigator.share) {
      await navigator.share({ text });
      return;
    }
    await navigator.clipboard.writeText(text);
    status.textContent = t('groups.copied');
  } catch {
    // Sharing cancelled or clipboard blocked: the code stays visible on the card to read out or copy by hand.
  }
}

function groupCard(g: Group, onBack: () => void): HTMLElement {
  const status = h('small', { class: 'muted', role: 'status' });
  const leave = h('button', { class: 'btn ghost' }, t('groups.leave'));
  const error = h('p', { class: 'small board-error', role: 'alert' });
  leave.addEventListener('click', async () => {
    if (!confirm(t('groups.leaveConfirm', { name: g.name }))) return;
    leave.disabled = true;
    try {
      await leaveGroup(g.id);
      showGroups(onBack);
    } catch (e) {
      error.textContent = boardErrorText(e);
      leave.disabled = false;
    }
  });
  return h(
    'section',
    { class: 'card group-card' },
    h('h3', {}, `👥 ${g.name}`),
    h('p', { class: 'muted small' }, `${membersText(g.members)} · `, h('span', { class: 'group-code' }, t('groups.code', { code: g.code }))),
    h(
      'div',
      { class: 'row left' },
      h('button', { class: 'btn primary', onClick: () => showBoard(() => showGroups(onBack), g.id) }, `🏆 ${t('groups.open')}`),
      h('button', { class: 'btn', onClick: () => void shareInvite(g, status) }, `📨 ${t('groups.invite')}`),
      leave,
    ),
    status,
    error,
  );
}

/** A small form with one text field and a button that runs `submit`. */
function inlineForm(title: string, placeholder: string, button: string, maxlength: number, submit: (value: string) => Promise<void>): HTMLElement {
  const input = h('input', { class: 'input', placeholder, maxlength, 'aria-label': placeholder });
  const go = h('button', { class: 'btn primary' }, button);
  const error = h('p', { class: 'small board-error', role: 'alert' });
  const run = async () => {
    const value = input.value.trim();
    if (!value) return input.focus();
    go.disabled = true;
    error.textContent = '';
    try {
      await submit(value);
    } catch (e) {
      error.textContent = boardErrorText(e);
      go.disabled = false;
    }
  };
  go.addEventListener('click', () => void run());
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') void run();
  });
  return h('section', { class: 'card form' }, h('h3', {}, title), h('div', { class: 'group-form' }, input, go), error);
}

/** Groups with friends: each has its own private leaderboard, joined with a link or a code. */
export function showGroups(onBack: () => void) {
  const list = h('div', { class: 'content' }, h('p', { class: 'muted center' }, t('board.loading')));
  render(
    page(
      t('groups.title'),
      onBack,
      h('p', { class: 'muted small' }, t('groups.hint')),
      list,
      inlineForm(`➕ ${t('groups.create')}`, t('groups.namePlaceholder'), t('groups.createBtn'), 30, async (name) => {
        const g = await createGroup(name);
        showBoard(() => showGroups(onBack), g.id);
      }),
      inlineForm(`🔑 ${t('groups.join')}`, t('groups.codePlaceholder'), t('groups.joinBtn'), 16, async (code) => {
        const g = await joinGroup(code);
        showBoard(() => showGroups(onBack), g.id);
      }),
    ),
  );
  listGroups()
    .then((groups) => {
      if (!store.data.board) return onBack();
      list.replaceChildren(...(groups.length ? groups.map((g) => groupCard(g, onBack)) : [h('p', { class: 'muted center' }, t('groups.empty'))]));
    })
    .catch((e: unknown) => list.replaceChildren(h('p', { class: 'muted center' }, boardErrorText(e))));
}
