import { h } from '../dom';
import { t, type I18nKey } from '../i18n';
import { CONTACT } from '../config';
import { render, page } from '../ui';

const SECTIONS = ['data', 'cookies', 'hosting', 'stats', 'medical'] as const;

/** Privacy and legal text, shared by the in-app screen and the static privacy.html page. */
export function privacyContent(): HTMLElement[] {
  return [
    ...SECTIONS.map((s) =>
      h('section', { class: 'card legal' }, h('h3', {}, t(`privacy.${s}H` as I18nKey)), h('p', {}, t(`privacy.${s}` as I18nKey))),
    ),
    h(
      'section',
      { class: 'card legal' },
      h('h3', {}, t('license.title')),
      h(
        'p',
        {},
        t('license.polyformP'),
        ' ',
        h(
          'a',
          { href: './license.html', class: 'link-btn', style: 'text-decoration: underline;' },
          `👉 ${t('license.title')}`,
        ),
      ),
    ),
    h('section', { class: 'card legal' }, h('h3', {}, t('privacy.contactH')), h('p', {}, t('privacy.contact', { contact: CONTACT }))),
    h('p', { class: 'muted small center' }, t('privacy.updated')),
  ];
}

export function showPrivacy(onBack: () => void) {
  render(page(t('privacy.title'), onBack, ...privacyContent()));
}
