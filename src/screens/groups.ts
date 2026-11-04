import { h } from '../dom';
import { store } from '../storage';
import { t } from '../i18n';
import { render, page } from '../ui';
import {
  boardErrorText,
  createGroup,
  inviteLink,
  joinGroup,
  leaveGroup,
  listGroups,
  listMembers,
  nickname,
  removeMember,
  renewGroupCode,
  unbanMember,
  type BannedPlayer,
  type Group,
  type GroupMember,
} from '../board';
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

/**
 * The code alone, to paste wherever the player likes (the Invite button sends a whole message with the link).
 * The group's creator can also replace it: a ban follows an anonymous identity, a new code shuts out whoever knew the old one.
 */
function codeRow(g: Group, message = ''): HTMLElement {
  const status = h('small', { class: 'board-saved', role: 'status' }, message);
  const show = (text: string, failed = false) => {
    status.classList.toggle('failed', failed);
    status.textContent = text;
  };
  const copy = h('button', { class: 'btn small-btn', type: 'button' }, `📋 ${t('groups.copyCode')}`);
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(g.code);
      show(`✓ ${t('groups.codeCopied')}`);
    } catch {
      show(t('groups.copyFailed'), true);
    }
  });
  const row = h('div', { class: 'group-code-row' }, h('span', { class: 'muted small group-code' }, t('groups.code', { code: g.code })), copy);
  if (g.mine) {
    const renew = h('button', { class: 'btn small-btn', type: 'button' }, `🔄 ${t('groups.newCode')}`);
    renew.addEventListener('click', async () => {
      if (!confirm(t('groups.newCodeConfirm', { group: g.name }))) return;
      renew.disabled = true;
      try {
        g.code = await renewGroupCode(g.id);
        row.replaceWith(codeRow(g, `✓ ${t('groups.newCodeDone')}`));
      } catch (e) {
        show(boardErrorText(e), true);
        renew.disabled = false;
      }
    });
    row.append(renew);
  }
  row.append(status);
  return row;
}

/** Runs a change to the group's members, then redraws them; shows the error if it fails. */
async function memberAction(button: HTMLButtonElement, work: () => Promise<void>, onChange: () => void, error: HTMLElement) {
  button.disabled = true;
  error.textContent = '';
  try {
    await work();
    onChange();
  } catch (e) {
    error.textContent = boardErrorText(e);
    button.disabled = false;
  }
}

/** One line per member: nickname, this week's consistency and, for the group's creator, how to remove or ban them. */
function memberRow(g: Group, m: GroupMember, canRemove: boolean, onChange: () => void, error: HTMLElement): HTMLElement {
  const name = nickname(m.nameCode);
  const remove = h('button', { class: 'icon-btn member-remove', 'aria-label': t('groups.remove'), title: t('groups.remove') }, '✕');
  remove.addEventListener('click', () => {
    if (confirm(t('groups.removeConfirm', { name, group: g.name }))) void memberAction(remove, () => removeMember(g.id, m.key), onChange, error);
  });
  const ban = h('button', { class: 'icon-btn member-remove', 'aria-label': t('groups.ban'), title: t('groups.ban') }, '🚫');
  ban.addEventListener('click', () => {
    if (confirm(t('groups.banConfirm', { name, group: g.name }))) void memberAction(ban, () => removeMember(g.id, m.key, true), onChange, error);
  });
  return h(
    'li',
    { class: `member-row${m.me ? ' me' : ''}` },
    h(
      'span',
      { class: 'board-name' },
      name,
      m.me ? h('small', { class: 'board-you' }, t('board.you')) : null,
      m.owner ? h('small', { class: 'member-owner' }, `👑 ${t('groups.creator')}`) : null,
    ),
    h(
      'span',
      { class: 'board-value' },
      m.days ? h('b', {}, t('board.value.points', { n: m.points })) : null,
      h('small', {}, m.days ? t('board.detail.days', { days: m.days, n: m.activities }) : t('groups.idle')),
    ),
    canRemove && !m.me ? h('span', { class: 'member-actions' }, remove, ban) : null,
  );
}

/** A banned player, for the group's creator: a ban can be a mistake, so it can be undone. */
function bannedRow(g: Group, b: BannedPlayer, onChange: () => void, error: HTMLElement): HTMLElement {
  const unban = h('button', { class: 'btn small-btn', type: 'button' }, t('groups.unban'));
  unban.addEventListener('click', () => void memberAction(unban, () => unbanMember(g.id, b.key), onChange, error));
  return h('li', { class: 'member-row' }, h('span', { class: 'board-name' }, nickname(b.nameCode)), unban);
}

/** The group's members, open from the start: seeing who is in a group is the point of it. */
function memberList(g: Group): HTMLElement {
  const summary = h('summary', {}, `👥 ${membersText(g.members)}`);
  const list = h('ol', { class: 'member-list' });
  const hint = h('p', { class: 'muted small member-hint' });
  const bannedBox = h('div', {});
  const error = h('p', { class: 'small board-error', role: 'alert' });
  const load = () =>
    listMembers(g.id)
      .then(({ members, banned }) => {
        summary.textContent = `👥 ${membersText(members.length)}`;
        const canRemove = members.some((m) => m.me && m.owner);
        list.replaceChildren(...members.map((m) => memberRow(g, m, canRemove, load, error)));
        hint.textContent = canRemove && members.length > 1 ? t('groups.actionsHint') : '';
        bannedBox.replaceChildren(
          ...(banned.length
            ? [
                h('p', { class: 'small group-banned-title' }, `🚫 ${t('groups.bannedTitle', { n: banned.length })}`),
                h('ul', { class: 'member-list' }, ...banned.map((b) => bannedRow(g, b, load, error))),
              ]
            : []),
        );
      })
      .catch((e: unknown) => {
        error.textContent = boardErrorText(e);
      });
  void load();
  return h('details', { class: 'group-members', open: true }, summary, list, hint, bannedBox, error);
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
    codeRow(g),
    memberList(g),
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
