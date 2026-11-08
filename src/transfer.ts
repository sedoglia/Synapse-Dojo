import { h } from './dom';
import { store, parseSave, type SaveData } from './storage';
import { syncBoard, nickname } from './board';
import { setLang } from './ui';
import { t, dateText } from './i18n';
import { SITE_URL } from './config';

export class TransferError extends Error {
  constructor(readonly code: 'offline' | 'bad_code' | 'not_found' | 'expired' | 'invalid_data' | 'server') {
    super(code);
  }
}

export function transferErrorText(e: unknown): string {
  if (e instanceof TransferError) {
    return t(`transfer.err.${e.code}`);
  }
  return t('transfer.err.server');
}

/**
 * Uploads current save data to temporary online storage and returns the 8-character transfer code (XXXX-XXXX).
 */
export async function uploadTransferSave(): Promise<string> {
  const payload = store.exportJson();
  let res: Response;
  try {
    res = await fetch('api/transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload }),
    });
  } catch {
    throw new TransferError('offline');
  }

  if (!res.ok) {
    throw new TransferError('server');
  }

  const data = (await res.json().catch(() => ({}))) as { code?: string };
  if (!data.code) throw new TransferError('server');
  return data.code;
}

/**
 * Downloads and parses temporary save data by transfer code without deleting it yet.
 */
export async function downloadTransferSave(code: string): Promise<SaveData> {
  let res: Response;
  try {
    res = await fetch(`api/transfer?code=${encodeURIComponent(code)}`);
  } catch {
    throw new TransferError('offline');
  }

  if (res.status === 404) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    if (err.error === 'expired') throw new TransferError('expired');
    throw new TransferError('not_found');
  }
  if (res.status === 400) throw new TransferError('bad_code');
  if (!res.ok) throw new TransferError('server');

  const json = (await res.json().catch(() => ({}))) as { payload?: string };
  if (!json.payload) throw new TransferError('invalid_data');

  let parsed: unknown;
  try {
    parsed = JSON.parse(json.payload);
  } catch {
    throw new TransferError('invalid_data');
  }

  const save = parseSave(parsed);
  if (!save) throw new TransferError('invalid_data');
  return save;
}

/**
 * Deletes the temporary transfer record from the database.
 */
export async function deleteTransfer(code: string): Promise<void> {
  try {
    await fetch(`api/transfer?code=${encodeURIComponent(code)}`, { method: 'DELETE' });
  } catch {
    // Ignore network error on deletion: nightly cron cleanup cleans up after 24 hours anyway
  }
}

/**
 * Completes the transfer: replaces local data, applies settings, syncs board,
 * and deletes temporary record from database for privacy.
 */
export async function completeTransfer(code: string, data: SaveData): Promise<void> {
  store.replace(data);
  await setLang(store.data.settings.lang);
  if (store.data.board) syncBoard();
  await deleteTransfer(code);
}

/** The link that opens the game with the transfer code ready to import. */
export const transferLink = (code: string) => {
  const origin = location.origin || SITE_URL;
  const path = location.pathname.replace(/[^/]*$/, '');
  return `${origin}${path}?transfer=${encodeURIComponent(code)}`;
};

/**
 * Dialog to generate and show an online transfer code with copy and share buttons.
 */
export function showTransferExportDialog(): void {
  const dialog = h('dialog', { class: 'share-dialog transfer-dialog' }) as HTMLDialogElement;

  const close = () => {
    dialog.close();
    dialog.remove();
  };

  const head = h(
    'div',
    { class: 'share-head' },
    h('h2', {}, `☁️ ${t('transfer.exportTitle')}`),
    h('button', { class: 'icon-btn', type: 'button', 'aria-label': t('share.close'), onClick: close }, '✕'),
  );

  const body = h('div', { class: 'transfer-body' }, h('p', { class: 'muted center' }, `⏳ ${t('transfer.generating')}`));

  dialog.append(head, body);
  document.body.append(dialog);
  if (dialog.showModal) dialog.showModal();
  else {
    dialog.classList.add('no-modal');
    dialog.setAttribute('open', '');
  }

  uploadTransferSave()
    .then((code) => {
      body.replaceChildren();

      const hint = h('p', { class: 'transfer-hint' }, t('transfer.exportHint'));
      const codeBox = h(
        'div',
        { class: 'transfer-code-box' },
        h('span', { class: 'transfer-code-value' }, code),
      );

      const copyBtn = h('button', { class: 'btn primary', type: 'button' }, `📋 ${t('transfer.copyCode')}`);
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code);
          copyBtn.textContent = `✓ ${t('transfer.copied')}`;
          setTimeout(() => (copyBtn.textContent = `📋 ${t('transfer.copyCode')}`), 2000);
        } catch {
          // Fallback if clipboard API restricted
          const input = h('input', { value: code, readonly: true });
          document.body.append(input);
          input.select();
          document.execCommand('copy');
          input.remove();
          copyBtn.textContent = `✓ ${t('transfer.copied')}`;
          setTimeout(() => (copyBtn.textContent = `📋 ${t('transfer.copyCode')}`), 2000);
        }
      });

      const link = transferLink(code);
      const copyLinkBtn = h('button', { class: 'btn', type: 'button' }, `🔗 ${t('transfer.copyLink')}`);
      copyLinkBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(link);
          copyLinkBtn.textContent = `✓ ${t('transfer.linkCopied')}`;
          setTimeout(() => (copyLinkBtn.textContent = `🔗 ${t('transfer.copyLink')}`), 2000);
        } catch {
          /* ignore */
        }
      });

      const shareBtn = h('button', { class: 'btn', type: 'button' }, `📤 ${t('transfer.share')}`);
      shareBtn.addEventListener('click', async () => {
        const shareData = {
          title: 'Synapse Dojo',
          text: t('transfer.shareText', { code }),
          url: link,
        };
        if (navigator.share) {
          try {
            await navigator.share(shareData);
          } catch {
            /* cancelled or unsupported */
          }
        } else {
          // Fallback to copying share text
          try {
            await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
            shareBtn.textContent = `✓ ${t('transfer.copied')}`;
            setTimeout(() => (shareBtn.textContent = `📤 ${t('transfer.share')}`), 2000);
          } catch {
            /* ignore */
          }
        }
      });

      const actions = h('div', { class: 'transfer-actions' }, copyBtn, copyLinkBtn, shareBtn);
      const privacy = h('p', { class: 'muted small transfer-privacy' }, `🔒 ${t('transfer.privacyNote')}`);
      const closeBtn = h('button', { class: 'btn ghost block', type: 'button', onClick: close }, t('share.close'));

      body.append(hint, codeBox, actions, privacy, closeBtn);
    })
    .catch((err) => {
      body.replaceChildren(
        h('p', { class: 'board-error center' }, `❌ ${transferErrorText(err)}`),
        h(
          'div',
          { class: 'row center' },
          h('button', { class: 'btn primary', onClick: () => { close(); showTransferExportDialog(); } }, t('common.retry')),
          h('button', { class: 'btn ghost', onClick: close }, t('share.close')),
        ),
      );
    });
}

/**
 * Dialog to input a transfer code, inspect the save details, and confirm import.
 */
export function showTransferImportDialog(initialCode = '', onComplete?: () => void): void {
  const dialog = h('dialog', { class: 'share-dialog transfer-dialog' }) as HTMLDialogElement;

  const close = () => {
    dialog.close();
    dialog.remove();
  };

  const head = h(
    'div',
    { class: 'share-head' },
    h('h2', {}, `📥 ${t('transfer.importTitle')}`),
    h('button', { class: 'icon-btn', type: 'button', 'aria-label': t('share.close'), onClick: close }, '✕'),
  );

  const input = h('input', {
    class: 'input transfer-code-input',
    type: 'text',
    placeholder: t('transfer.inputPlaceholder'),
    value: initialCode.toUpperCase(),
    maxlength: 12,
    autocapitalize: 'characters',
    autocorrect: 'off',
    spellcheck: false,
  }) as HTMLInputElement;

  input.addEventListener('input', () => {
    // Keep uppercase
    const cursor = input.selectionStart;
    input.value = input.value.toUpperCase();
    if (cursor !== null) input.setSelectionRange(cursor, cursor);
  });

  const errorMsg = h('p', { class: 'board-error small', style: { display: 'none' } });
  const previewBox = h('div', { class: 'transfer-preview-box', style: { display: 'none' } });

  const verifyBtn = h('button', { class: 'btn primary', type: 'button' }, `🔍 ${t('transfer.verifyBtn')}`);

  const runVerification = async () => {
    errorMsg.style.display = 'none';
    previewBox.style.display = 'none';
    previewBox.replaceChildren();

    const rawCode = input.value.trim();
    if (!rawCode) {
      errorMsg.textContent = t('transfer.err.bad_code');
      errorMsg.style.display = 'block';
      return;
    }

    verifyBtn.disabled = true;
    verifyBtn.textContent = `⏳ ${t('transfer.loading')}`;

    try {
      const data = await downloadTransferSave(rawCode);
      verifyBtn.textContent = `🔍 ${t('transfer.verifyBtn')}`;
      verifyBtn.disabled = false;

      // Calculate details for preview
      const last = [...data.runs.map((r) => r.date), ...data.checks.map((c) => c.date)].sort().pop() ?? data.created;
      const nick = data.board ? nickname(data.board.nameCode) : null;
      const playerName = data.name || '—';

      const detailsList = h(
        'div',
        { class: 'transfer-details' },
        h('div', { class: 'transfer-detail-row' }, h('span', { class: 'muted' }, `${t('transfer.foundPlayer')}:`), h('b', {}, playerName)),
        nick
          ? h('div', { class: 'transfer-detail-row' }, h('span', { class: 'muted' }, `${t('transfer.foundNick')}:`), h('b', {}, nick))
          : null,
        h('div', { class: 'transfer-detail-row' }, h('span', { class: 'muted' }, `${t('transfer.foundRuns')}:`), h('b', {}, String(data.runs.length))),
        h('div', { class: 'transfer-detail-row' }, h('span', { class: 'muted' }, `${t('transfer.foundLast')}:`), h('b', {}, dateText(last))),
        h('div', { class: 'transfer-detail-row' }, h('span', { class: 'muted' }, `${t('transfer.foundLevels')}:`), h('b', {}, String(Object.keys(data.levels).length))),
      );

      const warning = h('p', { class: 'transfer-warning small' }, `⚠️ ${t('transfer.importWarning')}`);

      const confirmBtn = h('button', { class: 'btn primary block', type: 'button' }, `✅ ${t('transfer.confirmImport')}`);
      confirmBtn.addEventListener('click', async () => {
        confirmBtn.disabled = true;
        confirmBtn.textContent = `⏳ ${t('transfer.loading')}`;
        try {
          await completeTransfer(rawCode, data);
          close();
          alert(t('transfer.importSuccess'));
          onComplete?.();
        } catch (e) {
          confirmBtn.disabled = false;
          confirmBtn.textContent = `✅ ${t('transfer.confirmImport')}`;
          errorMsg.textContent = transferErrorText(e);
          errorMsg.style.display = 'block';
        }
      });

      previewBox.append(
        h('h3', { class: 'transfer-preview-title' }, `✨ ${t('transfer.foundProfile')}`),
        detailsList,
        warning,
        confirmBtn,
      );
      previewBox.style.display = 'block';
    } catch (err) {
      verifyBtn.textContent = `🔍 ${t('transfer.verifyBtn')}`;
      verifyBtn.disabled = false;
      errorMsg.textContent = transferErrorText(err);
      errorMsg.style.display = 'block';
    }
  };

  verifyBtn.addEventListener('click', runVerification);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      void runVerification();
    }
  });

  const formRow = h('div', { class: 'transfer-input-row' }, input, verifyBtn);

  const body = h(
    'div',
    { class: 'transfer-body' },
    h('p', { class: 'transfer-hint' }, t('transfer.importHint')),
    formRow,
    errorMsg,
    previewBox,
  );

  dialog.append(head, body);
  document.body.append(dialog);
  if (dialog.showModal) dialog.showModal();
  else {
    dialog.classList.add('no-modal');
    dialog.setAttribute('open', '');
  }

  // If initial code was passed and appears complete, auto-verify
  if (initialCode && initialCode.replace(/[^A-Z0-9]/gi, '').length === 8) {
    void runVerification();
  } else {
    setTimeout(() => input.focus(), 50);
  }
}
