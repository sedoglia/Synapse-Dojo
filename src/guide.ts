// Standalone guide.html entry point for external links, bookmarks, and search engine crawlers.
import './style.css';
import { h } from './dom';
import { store } from './storage';
import { t, loadLang } from './i18n';
import { APP_NAME } from './config';
import { render, page, applySettings, langPicker } from './ui';
import { guideContent } from './screens/guide';

const asked = new URLSearchParams(location.search).get('lang');
loadLang(asked ?? store.data.settings.lang).then((lang) => {
  store.data.settings.lang = lang;
  applySettings();
  document.title = `${t('guide.title')} · ${APP_NAME}`;
  render(
    page(
      t('guide.title'),
      null,
      h(
        'div',
        { class: 'guide-screen-wrapper' },
        h('div', { class: 'guide-lang' }, langPicker((l) => (location.search = `?lang=${l}`))),
        ...guideContent({ start: './' }),
      ),
    ),
  );
});
