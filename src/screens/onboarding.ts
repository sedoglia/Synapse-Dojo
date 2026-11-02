import { h } from '../dom';
import { store } from '../storage';
import { t, type I18nKey } from '../i18n';
import { APP_NAME, GITHUB_REPO } from '../config';
import { render, langPicker } from '../ui';
import { DOMAINS } from '../exercises';
import { showHome } from './home';
import { showPrivacy } from './privacy';
import { showGuide } from './guide';
import { showLicense } from './license';

export function showOnboarding() {
  const input = h('input', {
    class: 'input',
    placeholder: t('onboard.placeholder'),
    maxlength: 24,
    autofocus: true,
  });

  const startWithName = (rawName: string) => {
    const name = rawName.trim();
    if (!name) return input.focus();
    store.data.name = name;
    store.save();
    showHome();
  };

  const submit = (e: Event) => {
    e.preventDefault();
    startWithName(input.value);
  };

  render(
    h(
      'div',
      { class: 'page onboard' },
      // Top Navigation Bar
      h(
        'header',
        { class: 'onboard-topbar' },
        langPicker(showOnboarding),
        h(
          'button',
          {
            class: 'btn subtle small',
            type: 'button',
            onClick: () => showGuide(showOnboarding),
          },
          t('landing.guideBtn'),
        ),
      ),

      // Main Hero Presentation
      h(
        'header',
        { class: 'hero onboard-hero' },
        h(
          'div',
          { class: 'logo' },
          h('img', { class: 'onboard-logo-img', src: './icon.svg', alt: 'Synapse Dojo Logo' }),
          h('span', {}, APP_NAME),
        ),
        h('h1', { class: 'landing-title' }, t('landing.heroTitle')),
        h('p', { class: 'landing-sub' }, t('landing.heroSub')),
        h(
          'div',
          { class: 'trust-chips' },
          h('span', { class: 'trust-chip' }, `✨ ${t('landing.badgeFree')}`),
          h('span', { class: 'trust-chip' }, `🔒 ${t('landing.badgePrivacy')}`),
        ),
      ),

      // Primary Start / Join Card
      h(
        'main',
        { class: 'content onboard-content' },
        h(
          'form',
          { class: 'card landing-start-card', onSubmit: submit },
          h('h2', {}, t('landing.startCardTitle')),
          h('p', { class: 'muted small' }, t('landing.startCardDesc')),
          h(
            'div',
            { class: 'start-input-group' },
            h('label', { class: 'visually-hidden' }, t('onboard.ask'), input),
            h('button', { class: 'btn primary big', type: 'submit' }, `🚀 ${t('onboard.go')}`),
          ),
        ),

        // How it works / 3 Pillars
        h(
          'section',
          { class: 'landing-section' },
          h('h2', { class: 'landing-section-title' }, t('landing.howItWorks')),
          h(
            'div',
            { class: 'pillars-grid' },
            h(
              'div',
              { class: 'card pillar-card' },
              h('div', { class: 'pillar-icon' }, '🏋️'),
              h('h3', {}, t('landing.pillar1Title')),
              h('p', { class: 'muted small' }, t('landing.pillar1Desc')),
            ),
            h(
              'div',
              { class: 'card pillar-card' },
              h('div', { class: 'pillar-icon' }, '📏'),
              h('h3', {}, t('landing.pillar2Title')),
              h('p', { class: 'muted small' }, t('landing.pillar2Desc')),
            ),
            h(
              'div',
              { class: 'card pillar-card' },
              h('div', { class: 'pillar-icon' }, '🧩'),
              h('h3', {}, t('landing.pillar3Title')),
              h('p', { class: 'muted small' }, t('landing.pillar3Desc')),
            ),
          ),
        ),

        // 8 Cognitive Domains
        h(
          'section',
          { class: 'landing-section' },
          h('h2', { class: 'landing-section-title' }, t('landing.domainsTitle')),
          h(
            'div',
            { class: 'domains-grid' },
            ...DOMAINS.map((domain) =>
              h(
                'div',
                { class: `domain-pill chip domain-${domain}` },
                t(`domain.${domain}` as I18nKey),
              ),
            ),
          ),
        ),

        // Guide CTA Card
        h(
          'section',
          { class: 'card guide-cta-card' },
          h('h3', {}, t('landing.guideCtaTitle')),
          h('p', { class: 'muted small' }, t('landing.guideCtaDesc')),
          h(
            'button',
            {
              class: 'btn secondary',
              type: 'button',
              onClick: () => showGuide(showOnboarding),
            },
            t('landing.guideCtaBtn'),
          ),
        ),

        // Footer links
        h(
          'footer',
          { class: 'landing-footer center small' },
          h(
            'p',
            {},
            h(
              'button',
              { class: 'link-btn', type: 'button', onClick: () => showPrivacy(showOnboarding) },
              t('privacy.title'),
            ),
            h('span', {}, ' · '),
            h(
              'button',
              { class: 'link-btn', type: 'button', onClick: () => showGuide(showOnboarding) },
              t('guide.title'),
            ),
            h('span', {}, ' · '),
            h(
              'button',
              { class: 'link-btn', type: 'button', onClick: () => showLicense(showOnboarding) },
              t('license.title'),
            ),
            h('span', {}, ' · '),
            h(
              'a',
              {
                class: 'link-btn',
                href: GITHUB_REPO,
                target: '_blank',
                rel: 'noopener noreferrer',
              },
              'GitHub',
            ),
          ),
          h('p', { class: 'muted' }, t('landing.footerTagline')),
        ),
      ),
    ),
  );

  // If on desktop or tablet, focus input for quick typing
  if (window.innerWidth > 600) {
    input.focus();
  }
}
