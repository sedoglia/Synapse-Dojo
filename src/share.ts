import { h } from './dom';
import { store } from './storage';
import { t, meta } from './i18n';
import { APP_NAME, SITE_URL } from './config';
import type { Badge } from './rewards';

/**
 * Only consistency and exploration can be shared: anyone can earn these at their own level. Skill badges, the Neuro
 * Score and leaderboard positions stay private on purpose: the Neuro Score isn't validated, and a public feed of high
 * scores would bring back the absolute comparison the leaderboard avoids (docs/basi-scientifiche.md, §2.7).
 */
const SHAREABLE = new Set(['first', 'plan', 'plans10', 'week4', 'streak3', 'streak7', 'streak30', 'explorer', 'balanced']);

export const canShareBadge = (b: Badge) => SHAREABLE.has(b.id);

export type Milestone = { kind: 'badge'; badge: Badge } | { kind: 'week'; days: number };

const SIZE = 1080;
const CENTER = SIZE / 2;
const FONT = 'Nunito, system-ui, -apple-system, "Segoe UI", sans-serif';

const shareText = (m: Milestone) =>
  m.kind === 'badge' ? t('share.textBadge', { name: t(m.badge.name), url: SITE_URL }) : t('share.textWeek', { n: m.days, url: SITE_URL });

/** Chinese and Japanese can break between any two characters; the other languages break at spaces. */
function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const unspaced = store.data.settings.lang === 'zh' || store.data.settings.lang === 'ja';
  const tokens = unspaced ? [...text] : text.split(/\s+/);
  const glue = unspaced ? '' : ' ';
  const lines: string[] = [];
  let line = '';
  for (const token of tokens) {
    const next = line ? line + glue + token : token;
    if (line && ctx.measureText(next).width > maxWidth) {
      lines.push(line);
      line = token;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

/** Writes centred text, shrinking it until it fits the width and the number of lines. Returns the y below it. */
function write(ctx: CanvasRenderingContext2D, text: string, y: number, o: { size: number; weight: number; color: string; maxWidth: number; maxLines: number }): number {
  let size = o.size;
  let lines: string[] = [];
  for (; size >= 20; size -= 2) {
    ctx.font = `${o.weight} ${size}px ${FONT}`;
    lines = wrap(ctx, text, o.maxWidth);
    if (lines.length <= o.maxLines && lines.every((l) => ctx.measureText(l).width <= o.maxWidth)) break;
  }
  ctx.fillStyle = o.color;
  const height = size * 1.25;
  lines.forEach((l, i) => ctx.fillText(l, CENTER, y + i * height));
  return y + lines.length * height;
}

/** The same network mark as public/icon.svg, drawn here so that the card needs no download. */
function drawMark(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const k = size / 512;
  const at = (px: number, py: number): [number, number] => [x + px * k, y + py * k];
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.beginPath();
  ctx.roundRect(x, y, size, size, 112 * k);
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 22 * k;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(...at(150, 300));
  ctx.lineTo(...at(230, 210));
  ctx.lineTo(...at(300, 290));
  ctx.lineTo(...at(370, 180));
  ctx.moveTo(...at(230, 210));
  ctx.lineTo(...at(240, 360));
  ctx.stroke();
  ctx.fillStyle = '#fff';
  for (const [px, py, r] of [[150, 300, 34], [230, 210, 40], [300, 290, 30], [370, 180, 38], [240, 360, 26]]) {
    ctx.beginPath();
    ctx.arc(...at(px, py), r * k, 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Draws the card. It holds no name, date, score or age: only the milestone and what the game is. */
async function drawCard(canvas: HTMLCanvasElement, m: Milestone) {
  const label = m.kind === 'badge' ? t('share.badgeLabel') : t('share.weekLabel');
  const title = m.kind === 'badge' ? t(m.badge.name) : '';
  const detail = m.kind === 'badge' ? t(m.badge.desc) : '';
  try {
    // A canvas doesn't wait for web fonts by itself.
    await Promise.all([800, 700, 900].map((w) => document.fonts.load(`${w} 60px Nunito`, `${label}${title}${detail}`)));
  } catch {
    /* falls back to the system font */
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.direction = meta().rtl ? 'rtl' : 'ltr';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  const bg = ctx.createLinearGradient(0, 0, SIZE, SIZE);
  bg.addColorStop(0, '#4646d8');
  bg.addColorStop(1, '#0f766e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Header
  ctx.font = `900 56px ${FONT}`;
  const nameWidth = ctx.measureText(APP_NAME).width;
  const markSize = 84;
  const startX = CENTER - (markSize + 24 + nameWidth) / 2;
  drawMark(ctx, startX, 56, markSize);
  ctx.textAlign = 'left';
  ctx.direction = 'ltr';
  ctx.fillStyle = '#fff';
  ctx.fillText(APP_NAME, startX + markSize + 24, 68);
  ctx.textAlign = 'center';
  ctx.direction = meta().rtl ? 'rtl' : 'ltr';

  // Milestone panel
  const panelX = 72;
  const panelY = 176;
  const panelH = 610;
  const inner = SIZE - 2 * panelX - 96;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.roundRect(panelX, panelY, SIZE - 2 * panelX, panelH, 56);
  ctx.fill();

  const accent = '#4646d8';
  const dark = '#1b1d2a';
  const muted = '#555970';
  if (m.kind === 'badge') {
    let y = write(ctx, label, panelY + 48, { size: 42, weight: 800, color: accent, maxWidth: inner, maxLines: 2 });
    ctx.font = `170px ${FONT}`;
    ctx.fillStyle = dark;
    ctx.fillText(m.badge.icon, CENTER, y + 18);
    y += 228;
    y = write(ctx, title, y, { size: 76, weight: 900, color: dark, maxWidth: inner, maxLines: 2 });
    write(ctx, detail, y + 14, { size: 42, weight: 700, color: muted, maxWidth: inner, maxLines: 3 });
  } else {
    ctx.font = `900 300px ${FONT}`;
    ctx.fillStyle = accent;
    ctx.fillText(String(m.days), CENTER, panelY + 56);
    write(ctx, label, panelY + 400, { size: 60, weight: 800, color: dark, maxWidth: inner, maxLines: 3 });
  }

  // What the game is
  const footWidth = SIZE - 2 * panelX;
  write(ctx, t('share.free'), 816, { size: 40, weight: 800, color: '#fff', maxWidth: footWidth, maxLines: 1 });
  ctx.direction = 'ltr';
  write(ctx, SITE_URL.replace(/^https:\/\//, ''), 882, { size: 56, weight: 900, color: '#fff', maxWidth: footWidth, maxLines: 1 });
  ctx.direction = meta().rtl ? 'rtl' : 'ltr';
  write(ctx, t('share.foot'), 972, { size: 30, weight: 700, color: 'rgba(255,255,255,0.88)', maxWidth: footWidth, maxLines: 2 });
}

/** Opens the preview. Nothing leaves the device unless the player picks where to send it. */
export function openShare(m: Milestone) {
  const text = shareText(m);
  const canvas = h('canvas', { width: SIZE, height: SIZE, class: 'share-card', role: 'img', 'aria-label': text });
  const status = h('p', { class: 'small center share-status', role: 'status' });
  const saveFile = () => {
    if (!file) return;
    const a = h('a', { href: URL.createObjectURL(file), download: file.name });
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  let file: File | null = null;

  const shareBtn = navigator.share
    ? h(
        'button',
        {
          class: 'btn primary',
          type: 'button',
          disabled: true,
          onClick: async () => {
            try {
              const withImage = file && navigator.canShare?.({ files: [file], text });
              await navigator.share(withImage && file ? { files: [file], text } : { text });
            } catch {
              // Cancelled, or the system refused: the buttons below still work.
            }
          },
        },
        `📤 ${t('share.action')}`,
      )
    : null;
  const saveBtn = h('button', { class: shareBtn ? 'btn' : 'btn primary', type: 'button', disabled: true, onClick: saveFile }, `🖼️ ${t('share.save')}`);
  const copyBtn = h(
    'button',
    {
      class: 'btn',
      type: 'button',
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(text);
          status.textContent = `✓ ${t('share.copied')}`;
        } catch {
          status.textContent = t('share.copyFailed');
        }
      },
    },
    `📋 ${t('share.copy')}`,
  );

  const dialog = h(
    'dialog',
    { class: 'share-dialog', 'aria-label': t('share.title'), onClose: () => dialog.remove() },
    h(
      'div',
      { class: 'share-head' },
      h('h2', {}, t('share.title')),
      h('button', { class: 'icon-btn', type: 'button', 'aria-label': t('share.close'), onClick: () => (dialog.close(), dialog.remove()) }, '✕'),
    ),
    canvas,
    h('p', { class: 'muted small share-text' }, text),
    h('div', { class: 'share-actions' }, shareBtn, saveBtn, copyBtn),
    status,
    h('p', { class: 'muted small center' }, `🔒 ${t('share.note')}`),
  );
  document.body.append(dialog);
  dialog.showModal();

  void drawCard(canvas, m).then(() =>
    canvas.toBlob((blob) => {
      if (!blob) return;
      // Prepared in advance: browsers only allow sharing right after a tap, with no waiting in between.
      file = new File([blob], 'synapse-dojo.png', { type: 'image/png' });
      if (shareBtn) shareBtn.disabled = false;
      saveBtn.disabled = false;
    }, 'image/png'),
  );
}

/**
 * A quiet offer below a newly earned badge. It appears once for each badge, because a badge is earned once, and gives
 * no reward: sharing must stay the player's own wish, not one more way to collect XP.
 */
export function shareOffer(fresh: Badge[]): HTMLElement | null {
  if (!store.data.settings.shareOffer) return null;
  const badge = fresh.filter(canShareBadge).pop();
  if (!badge) return null;
  const row = h(
    'div',
    { class: 'share-offer' },
    h('button', { class: 'btn small-btn', type: 'button', onClick: () => openShare({ kind: 'badge', badge }) }, `📤 ${t('share.offer')}`),
    h(
      'button',
      {
        class: 'link-btn small',
        type: 'button',
        onClick: () => {
          store.data.settings.shareOffer = false;
          store.save();
          row.remove();
        },
      },
      t('share.never'),
    ),
  );
  return row;
}
