import { h } from '../dom';
import { t } from '../i18n';
import { render, page } from '../ui';

/** License and terms content, shared by the in-app screen and the static license.html page. */
export function licenseContent(): HTMLElement[] {
  return [
    h(
      'section',
      { class: 'card legal' },
      h('h3', {}, t('license.authorH')),
      h('p', {}, t('license.authorP')),
    ),
    h(
      'section',
      { class: 'card legal' },
      h('h3', {}, t('license.polyformH')),
      h('p', {}, t('license.polyformP')),
    ),
    h(
      'section',
      { class: 'card legal' },
      h('h3', {}, `✅ ${t('license.permittedH')}`),
      h('p', {}, t('license.permittedP')),
    ),
    h(
      'section',
      { class: 'card legal' },
      h('h3', {}, `🚫 ${t('license.restrictedH')}`),
      h('p', {}, t('license.restrictedP')),
    ),
    h(
      'section',
      { class: 'card legal' },
      h('h3', {}, t('license.fontsH')),
      h('p', {}, t('license.fontsP')),
    ),
    h(
      'section',
      { class: 'card legal' },
      h('h3', {}, `🔗 ${t('license.linksH')}`),
      h(
        'p',
        {},
        h(
          'a',
          {
            href: 'https://polyformproject.org/licenses/noncommercial/1.0.0/',
            target: '_blank',
            rel: 'noopener noreferrer',
            class: 'link-btn',
            style: 'text-decoration: underline;',
          },
          `↗️ ${t('license.officialLink')}`,
        ),
      ),
      h(
        'p',
        { style: 'margin-top: 0.5rem;' },
        h(
          'a',
          {
            href: 'https://github.com/sedoglia/Synapse-Dojo/blob/main/LICENSE',
            target: '_blank',
            rel: 'noopener noreferrer',
            class: 'link-btn',
            style: 'text-decoration: underline;',
          },
          `↗️ ${t('license.repoLink')}`,
        ),
      ),
    ),
  ];
}

export function showLicense(onBack: () => void) {
  render(page(t('license.title'), onBack, ...licenseContent()));
}
