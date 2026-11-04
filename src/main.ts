import './style.css';
import { store } from './storage';
import { APP_NAME } from './config';
import { loadLang } from './i18n';
import { applySettings } from './ui';
import { showHome } from './screens/home';
import { showOnboarding } from './screens/onboarding';
import { resumeBoardSync, takeInviteFromUrl } from './board';
import { watchForUpdates } from './update';

document.title = APP_NAME;
takeInviteFromUrl();
// The saved language (English on a first visit) is loaded before the first screen is drawn.
loadLang(store.data.settings.lang).then((lang) => {
  store.data.settings.lang = lang;
  applySettings();
  if (store.data.name) showHome();
  else showOnboarding();
  resumeBoardSync();
});

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {
    /* offline support is optional */
  });
}
if (import.meta.env.PROD) watchForUpdates();
