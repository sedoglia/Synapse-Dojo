// First: takes the Android app's age signal out of the address before anything else can read it.
import { isMinor } from './ageSignal';
import './style.css';
import { store } from './storage';
import { APP_NAME } from './config';
import { deviceLang, loadLang, startLang } from './i18n';
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

document.title = APP_NAME;
takeInviteFromUrl();
// A minor in the Android app is not offered the leaderboard: a pending invite is dropped, and an existing
// membership is left, which deletes its data on the server (retried at the next start if offline).
if (isMinor()) {
  clearInvite();
  if (store.data.board) leaveBoard().catch(() => {});
}
const incomingTransfer = takeTransferFromUrl();
// The saved language (on a first visit the device's, if supported) is loaded before the first screen is drawn.
loadLang(startLang()).then((lang) => {
  store.data.settings.lang = lang;
  // A first visit already starts in the device's language: nothing to offer later.
  if (store.fresh) store.data.langOffer = deviceLang();
  applySettings();
  if (store.data.name) showHome();
  else showOnboarding();
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
