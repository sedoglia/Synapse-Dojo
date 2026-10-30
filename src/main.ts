import './style.css';
import { store } from './storage';
import { APP_NAME } from './config';
import { applySettings } from './ui';
import { showHome } from './screens/home';
import { showOnboarding } from './screens/onboarding';

document.title = APP_NAME;
applySettings();

if (store.data.name) showHome();
else showOnboarding();

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {
    /* offline support is optional */
  });
}
