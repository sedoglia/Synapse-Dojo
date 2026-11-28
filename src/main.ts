// First: takes the Android app's age signal out of the address before anything else can read it.
import { isMinor } from './ageSignal';
import './style.css';
import { store } from './storage';
import { APP_NAME } from './config';
import { deviceLang, isLang, loadLang, startLang } from './i18n';
import { byId, type Exercise } from './exercises';
import { playPractice } from './screens/play';
import { showDaily } from './screens/daily';
import { applySettings } from './ui';
import { showHome } from './screens/home';
import { showOnboarding } from './screens/onboarding';
import { clearInvite, leaveBoard, resumeBoardSync, takeInviteFromUrl } from './board';
import { watchForUpdates } from './update';
import { showTransferImportDialog } from './transfer';
import { startBackNavigation } from './nav';

function takeTransferFromUrl(): string | null {
  const url = new URL(location.href);
  const code = url.searchParams.get('transfer')?.trim();
  if (!code) return null;
  url.searchParams.delete('transfer');
  history.replaceState(null, '', url.toString());
  return code;
}

/**
 * `?play=<exercise id>&lang=<language>`: the "Play" button of a standalone game page (/games/<slug>) opens that
 * exercise straight away; `?daily` (from /daily) opens the daily challenge. The page's language is used only on a first visit; afterwards the saved one wins.
 */
function takePlayFromUrl(): { ex: Exercise | null; daily: boolean; lang: string | null } {
  const url = new URL(location.href);
  const id = url.searchParams.get('play');
  const daily = url.searchParams.has('daily');
  const lang = url.searchParams.get('lang');
  if (id === null && !daily && lang === null) return { ex: null, daily: false, lang: null };
  for (const k of ['play', 'daily', 'lang']) url.searchParams.delete(k);
  history.replaceState(history.state, '', url.toString());
  return { ex: (id && byId(id)) || null, daily, lang };
}

document.title = APP_NAME;
const incomingPlay = takePlayFromUrl();
takeInviteFromUrl();
// A minor in the Android app is not offered the leaderboard: a pending invite is dropped, and an existing
// membership is left, which deletes its data on the server (retried at the next start if offline).
if (isMinor()) {
  clearInvite();
  if (store.data.board) leaveBoard().catch(() => {});
}
const incomingTransfer = takeTransferFromUrl();
// The saved language (on a first visit the device's, if supported) is loaded before the first screen is drawn.
loadLang(store.fresh && isLang(incomingPlay.lang) ? incomingPlay.lang : startLang()).then((lang) => {
  store.data.settings.lang = lang;
  // A first visit already starts in the device's language: nothing to offer later.
  if (store.fresh) store.data.langOffer = deviceLang();
  applySettings();
  const firstScreen = () => (store.data.name ? showHome() : showOnboarding());
  // From a game page: that exercise first, then the usual first screen (where a newcomer picks a name).
  if (incomingPlay.ex && !incomingTransfer) playPractice(incomingPlay.ex, firstScreen);
  else if (incomingPlay.daily && !incomingTransfer) showDaily(firstScreen);
  else firstScreen();
  startBackNavigation();
  resumeBoardSync();
  if (incomingTransfer) {
    showTransferImportDialog(incomingTransfer, () => {
      if (store.data.name) showHome();
      else showOnboarding();
    });
  }
});

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {
    /* offline support is optional */
  });
}
if (import.meta.env.PROD) watchForUpdates();
