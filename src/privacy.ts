// Entry of the standalone privacy.html page, linkable from outside the game.
import './style.css';
import { h } from './dom';
import { store } from './storage';
import { t, type Lang } from './i18n';
import { APP_NAME } from './config';
import { render, page, applySettings } from './ui';
import { privacyContent } from './screens/privacy';

const asked = new URLSearchParams(location.search).get('lang');
// Only for this view: the saved language is left as it is.
if (asked === 'it' || asked === 'en') store.data.settings.lang = asked as Lang;
applySettings();
document.title = `${t('privacy.title')} · ${APP_NAME}`;

const other: Lang = store.data.settings.lang === 'it' ? 'en' : 'it';
render(
  page(
    t('privacy.title'),
    null,
    ...privacyContent(),
    h(
      'p',
      { class: 'center legal-links' },
      h('a', { href: './' }, t('privacy.open')),
      ' · ',
      h('a', { href: `?lang=${other}`, hreflang: other }, other === 'it' ? 'Italiano' : 'English'),
    ),
  ),
);
