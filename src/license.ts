// Entry of the standalone license.html page, linkable from outside the game.
import './style.css';
import { h } from './dom';
import { store } from './storage';
import { t, loadLang, startLang } from './i18n';
import { APP_NAME } from './config';
import { render, page, applySettings, langPicker } from './ui';
import { licenseContent } from './screens/license';

// ?lang=xx shows the page in that language just for this view; otherwise the saved language.
const asked = new URLSearchParams(location.search).get('lang');
loadLang(asked ?? startLang()).then((lang) => {
  store.data.settings.lang = lang;
  applySettings();
  document.title = `${t('license.title')} · ${APP_NAME}`;
  render(
    page(
      t('license.title'),
      null,
      ...licenseContent(),
      h(
        'p',
        { class: 'center legal-links' },
        h('a', { class: 'btn primary', href: './' }, `🏠 ${APP_NAME}`),
        langPicker((l) => (location.search = `?lang=${l}`)),
      ),
    ),
  );
});
