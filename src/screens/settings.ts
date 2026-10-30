import { h } from '../dom';
import { store } from '../storage';
import { t, type Lang } from '../i18n';
import { APP_NAME } from '../config';
import { render, page } from '../ui';
import { showHome } from './home';
import { showOnboarding } from './onboarding';

export function showSettings() {
  const nameInput = h('input', { class: 'input', value: store.data.name, maxlength: 24 });
  nameInput.addEventListener('change', () => {
    store.data.name = nameInput.value.trim() || store.data.name;
    store.save();
  });

  const langSelect = h(
    'select',
    {
      class: 'input',
      onChange: (e: Event) => {
        store.data.settings.lang = (e.target as HTMLSelectElement).value as Lang;
        store.save();
        document.documentElement.lang = store.data.settings.lang;
        showSettings();
      },
    },
    h('option', { value: 'it', selected: store.data.settings.lang === 'it' }, 'Italiano'),
    h('option', { value: 'en', selected: store.data.settings.lang === 'en' }, 'English'),
  );

  const sound = h('input', {
    type: 'checkbox',
    checked: store.data.settings.sound,
    onChange: (e: Event) => {
      store.data.settings.sound = (e.target as HTMLInputElement).checked;
      store.save();
    },
  });

  render(
    page(
      t('settings.title'),
      showHome,
      h(
        'section',
        { class: 'card form' },
        h('label', {}, t('settings.name'), nameInput),
        h('label', {}, t('settings.lang'), langSelect),
        h('label', { class: 'inline' }, sound, t('settings.sound')),
      ),
      h(
        'section',
        { class: 'card' },
        h(
          'button',
          {
            class: 'btn danger',
            onClick: () => {
              if (confirm(t('settings.resetConfirm'))) {
                store.reset();
                showOnboarding();
              }
            },
          },
          t('settings.reset'),
        ),
      ),
      h('p', { class: 'muted small center' }, `${APP_NAME} v0.1.0 · ${t('settings.about')}`),
    ),
  );
}
