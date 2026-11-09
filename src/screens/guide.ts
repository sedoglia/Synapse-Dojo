import { h } from '../dom';
import { t, type I18nKey } from '../i18n';
import { render, page, langPicker, howBox } from '../ui';
import { EXERCISES, DOMAINS, type Domain } from '../exercises';

/**
 * Generates the full guide content, reused both in the in-app guide screen
 * and in the standalone guide.html page for external indexing and sharing.
 */
export function guideContent(): HTMLElement[] {
  // Group exercises by domain
  const exercisesByDomain = DOMAINS.reduce((acc, domain) => {
    acc[domain] = EXERCISES.filter((e) => e.domain === domain);
    return acc;
  }, {} as Record<Domain, typeof EXERCISES>);

  return [
    // Hero / Intro
    h(
      'section',
      { class: 'card guide-intro-card' },
      h('h2', {}, t('guide.introH')),
      h('p', {}, t('guide.introP')),
    ),

    // App Sections
    h(
      'section',
      { class: 'guide-block' },
      h('h2', { class: 'guide-block-title' }, `📱 ${t('guide.navSections')}`),
      h(
        'div',
        { class: 'guide-grid' },
        h(
          'div',
          { class: 'card guide-card' },
          h('h3', {}, t('guide.planH')),
          h('p', {}, t('guide.planP')),
        ),
        h(
          'div',
          { class: 'card guide-card' },
          h('h3', {}, t('guide.checkH')),
          h('p', {}, t('guide.checkP')),
        ),
        h(
          'div',
          { class: 'card guide-card' },
          h('h3', {}, t('guide.trainingH')),
          h('p', {}, t('guide.trainingP')),
        ),
        h(
          'div',
          { class: 'card guide-card' },
          h('h3', {}, t('guide.progressH')),
          h('p', {}, t('guide.progressP')),
        ),
        h(
          'div',
          { class: 'card guide-card' },
          h('h3', {}, t('guide.boardH')),
          h('p', {}, t('guide.boardP')),
        ),
        h(
          'div',
          { class: 'card guide-card' },
          h('h3', {}, t('guide.settingsH')),
          h('p', {}, t('guide.settingsP')),
        ),
      ),
    ),

    // Detailed Exercises by Domain
    h(
      'section',
      { class: 'guide-block' },
      h('h2', { class: 'guide-block-title' }, `🧠 ${t('guide.gamesH')}`),
      ...DOMAINS.map((domain) => {
        const list = exercisesByDomain[domain] || [];
        if (!list.length) return h('div');
        return h(
          'div',
          { class: 'guide-domain-section' },
          h('div', { class: `domain-header chip domain-${domain}` }, t(`domain.${domain}` as I18nKey)),
          h(
            'div',
            { class: 'guide-exercises-list' },
            ...list.map((ex) =>
              h(
                'article',
                { class: 'card guide-exercise-card' },
                h(
                  'header',
                  { class: 'guide-ex-header' },
                  h('span', { class: 'guide-ex-icon' }, ex.icon),
                  h(
                    'div',
                    { class: 'guide-ex-meta' },
                    h('h3', { class: 'guide-ex-name' }, t(ex.name)),
                    h('span', { class: 'guide-ex-time muted small' }, `⏱️ ~${ex.minutes[0]}-${ex.minutes[1]} min`),
                  ),
                ),
                h(
                  'div',
                  { class: 'guide-ex-body' },
                  h(
                    'div',
                    { class: 'guide-ex-field' },
                    h('b', { class: 'guide-field-label' }, t('guide.gameWhy')),
                    h('p', { class: 'guide-field-text' }, t(ex.why)),
                  ),
                  h(
                    'div',
                    { class: 'guide-ex-field' },
                    h('b', { class: 'guide-field-label' }, t('guide.gameHow')),
                    h('p', { class: 'guide-field-text' }, t(ex.desc)),
                  ),
                  howBox(ex.how),
                  ex.example
                    ? h(
                        'div',
                        { class: 'guide-ex-example small muted' },
                        h('span', {}, '💡 '),
                        h('span', {}, t(ex.example)),
                      )
                    : null,
                ),
              ),
            ),
          ),
        );
      }),
    ),

    // FAQ Section
    h(
      'section',
      { class: 'guide-block' },
      h('h2', { class: 'guide-block-title' }, `💡 ${t('guide.faqH')}`),
      h(
        'div',
        { class: 'card guide-card' },
        h('h3', {}, t('guide.faq1Q')),
        h('p', {}, t('guide.faq1A')),
      ),
      h(
        'div',
        { class: 'card guide-card' },
        h('h3', {}, t('guide.faq2Q')),
        h('p', {}, t('guide.faq2A')),
      ),
      h(
        'div',
        { class: 'card guide-card' },
        h('h3', {}, t('guide.faq3Q')),
        h('p', {}, t('guide.faq3A')),
      ),
      h(
        'div',
        { class: 'card guide-card' },
        h('h3', {}, t('guide.faq4Q')),
        h('p', {}, t('guide.faq4A')),
      ),
      h(
        'div',
        { class: 'card guide-card' },
        h('h3', {}, t('guide.faq5Q')),
        h('p', {}, t('guide.faq5A')),
      ),
    ),
  ];
}

/** Shows the Guide page inside the single page application. */
export function showGuide(onBack: () => void) {
  render(
    page(
      t('guide.title'),
      onBack,
      h(
        'div',
        { class: 'guide-screen-wrapper' },
        h(
          'div',
          { class: 'guide-screen-header' },
          h('p', { class: 'muted center' }, t('guide.subtitle')),
          h('div', { class: 'center' }, langPicker(() => showGuide(onBack))),
        ),
        ...guideContent(),
        h(
          'p',
          { class: 'center' },
          h('button', { class: 'btn primary', onClick: onBack }, `‹ ${t('common.back')}`),
        ),
      ),
    ),
  );
}
