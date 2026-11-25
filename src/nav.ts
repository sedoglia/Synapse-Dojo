import { h } from './dom';
import { t } from './i18n';

/**
 * The phone's Back button (and the browser's back) goes to the previous screen instead of closing the app.
 *
 * The game is a single page that never adds entries to the history, so on Android Back always left it, from any
 * screen and even in the middle of an exercise. While a screen has a way back, one extra history entry (the
 * guard) sits on top: Back removes it, and the page answers by doing what the screen's own ← does, then puts it
 * back. On a screen with no way back (home, first visit) the installed app asks for a second press within a few
 * seconds before closing; in a browser tab Back simply leaves the site, as on any other site.
 */

let started = false;
let handler: (() => void) | null = null;
let guarded = false;
let ignorePop = false;
let exitTimer: ReturnType<typeof setTimeout> | undefined;
let note: HTMLElement | null = null;

const APP_FLAG = 'sd-android-app';

/** Opened as the Android app (Trusted Web Activity, WebView fallback) or installed as a PWA. */
export function inApp(): boolean {
  try {
    if (document.referrer.startsWith('android-app://')) sessionStorage.setItem(APP_FLAG, '1');
    if (sessionStorage.getItem(APP_FLAG)) return true;
  } catch {
    /* storage blocked: fall through */
  }
  return 'SynapseDojoAndroid' in window || matchMedia('(display-mode: standalone)').matches;
}

function sync() {
  const want = handler !== null || inApp();
  if (want && !guarded) {
    history.pushState({ synapseGuard: true }, '');
    guarded = true;
  } else if (!want && guarded) {
    ignorePop = true;
    guarded = false;
    history.back();
  }
}

function hideNote() {
  note?.remove();
  note = null;
}

function onPop() {
  if (ignorePop) {
    ignorePop = false;
    return;
  }
  guarded = false;
  hideNote();

  // A dialog open on top of the screen is closed first, as Esc does on a computer.
  const dialog = document.querySelector<HTMLDialogElement>('dialog[open]');
  if (dialog) {
    dialog.close();
    sync();
    return;
  }
  if (handler) {
    const back = handler;
    sync();
    back();
    return;
  }
  // No way back: the guard stays off for a moment, so a second Back closes the app.
  clearTimeout(exitTimer);
  note = h('div', { class: 'toast hint exit-note', role: 'status' }, t('nav.exitAgain'));
  document.body.append(note);
  exitTimer = setTimeout(() => {
    hideNote();
    sync();
  }, 2500);
}

/** Called by `render` with the Back action of the screen being shown (null when it has none). */
export function setBack(fn: (() => void) | null) {
  handler = fn;
  if (!started) return;
  clearTimeout(exitTimer);
  hideNote();
  sync();
}

/** Turns the handling on; only the game itself calls it, not the standalone guide, privacy or license pages. */
export function startBackNavigation() {
  if (started) return;
  started = true;
  addEventListener('popstate', onPop);
  sync();
}
