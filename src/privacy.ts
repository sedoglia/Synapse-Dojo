// Entry of the standalone privacy.html page, linkable from outside the game.
import './style.css';
import { h } from './dom';
import { store } from './storage';
import { t, loadLang } from './i18n';
import { APP_NAME } from './config';
import { render, page, applySettings, langPicker } from './ui';
import { privacyContent } from './screens/privacy';

// ?lang=xx shows the page in that language just for this view; otherwise the saved language (English by default).
const asked = new URLSearchParams(location.search).get('lang');
loadLang(asked ?? store.data.settings.lang).then((lang) => {
  store.data.settings.lang = lang;
  applySettings();
  document.title = `${t('privacy.title')} · ${APP_NAME}`;
  render(
    page(
      t('privacy.title'),
      null,
      ...privacyContent(),
      h(
        'p',
        { class: 'center legal-links' },
        h('a', { href: './' }, t('privacy.open')),
        langPicker((l) => (location.search = `?lang=${l}`)),
      ),
    ),
  );
});
