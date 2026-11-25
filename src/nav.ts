import { h } from './dom';
import { t } from './i18n';

/**
 * The phone's Back button (and the browser's back) goes to the previous screen instead of closing the app.
 *
 * The game is a single page that never adds entries to the history, so on Android Back always left it, from any
 * screen and even in the middle of an exercise. Now extra history entries (guards) sit on top of the page's own:
 * Back removes one, and the page answers by doing what the screen's own ← does. On a screen with no way back
 * (home, first visit) the installed app asks for a second press before closing; in a browser tab Back simply
 * leaves the site, as on any other site.
 *
 * Chrome's Back skips a history entry if the page added the next one without a tap or key press in between (its
 * defence against pages that trap visitors). So guards are added only after the person touched the page since the
 * last ones were added: at once when a tap leads to another screen, otherwise at the next tap. Two are added at a
 * time, so two Backs in a row still stay in the app where Chrome allows it; if it skips the first, Back lands on
 * the page's own entry and the page simply knows it has none left. Back pressed before touching anything, or
 * after the guards ran out, closes the app: that is Android's normal behaviour and a web page cannot change it.
 */

const GUARDS = 2;

let started = false;
let handler: (() => void) | null = null;
let ignorePop = false;
let exitTimer: ReturnType<typeof setTimeout> | undefined;
let note: HTMLElement | null = null;
/** A tap or key press since arriving on the current history entry; browsers without Chrome's rule never wait. */
let touchedSincePush = !('userActivation' in navigator);

/** How many guards are above the page's own entry, read from the entry Back has just landed on. */
const depth = (): number => {
  const g = (history.state as { synapseGuard?: unknown } | null)?.synapseGuard;
  return typeof g === 'number' && g > 0 ? g : 0;
};

const APP_FLAG = 'synapse-dojo/android-app';

/**
 * Opened as the Android app (Trusted Web Activity, WebView fallback) or installed as a PWA.
 *
 * Chrome marks the app only on some launches, with an `android-app://` referrer: reopening the app can load the
 * page in a new tab without it. So the first sighting is remembered for good. Chrome shares this storage between
 * the app and its own tabs on the same phone, which then also ask for a second Back on the home screen: harmless.
 */
export function inApp(): boolean {
  try {
    if (document.referrer.startsWith('android-app://')) localStorage.setItem(APP_FLAG, '1');
    if (localStorage.getItem(APP_FLAG)) return true;
  } catch {
    /* storage blocked: fall through */
  }
  return 'SynapseDojoAndroid' in window || matchMedia('(display-mode: standalone)').matches;
}

/** Drops the guards still in place, so the next Back leaves the page. */
function dropGuards() {
  const n = depth();
  if (!n) return;
  ignorePop = true;
  history.go(-n);
}

function sync() {
  const want = handler !== null || inApp();
  if (want && !depth()) {
    if (!touchedSincePush) return; // added by onTouch at the next tap
    for (let i = 1; i <= GUARDS; i++) history.pushState({ synapseGuard: i }, '');
    touchedSincePush = !('userActivation' in navigator);
  } else if (!want) {
    dropGuards();
  }
}

function onTouch() {
  touchedSincePush = true;
  if (!depth()) sync();
}

function hideNote() {
  note?.remove();
  note = null;
}

function onPop() {
  // Chrome counts the taps made since the person arrived on this entry, not earlier ones.
  touchedSincePush = !('userActivation' in navigator);
  if (ignorePop) {
    ignorePop = false;
    return;
  }
  hideNote();

  // A dialog open on top of the screen is closed first, as Esc does on a computer.
  const dialog = document.querySelector<HTMLDialogElement>('dialog[open]');
  if (dialog) {
    dialog.close();
    sync();
    return;
  }
  if (handler) {
    handler();
    return;
  }
  // No way back: whatever guard is left goes, so a second Back closes the app.
  dropGuards();
  clearTimeout(exitTimer);
  note = h('div', { class: 'toast hint exit-note', role: 'status' }, t('nav.exitAgain'));
  document.body.append(note);
  exitTimer = setTimeout(hideNote, 2500);
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
  // Capture phase: the guards are in place before the tap's own handler shows another screen.
  addEventListener('click', onTouch, true);
  addEventListener('keydown', onTouch, true);
  sync();
}
