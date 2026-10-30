import { h } from '../dom';
import { store, type Settings } from '../storage';
import { t, type Lang } from '../i18n';
import { APP_NAME } from '../config';
import { render, page, applySettings } from '../ui';
import { showHome } from './home';
import { showOnboarding } from './onboarding';

function toggle(key: 'sound' | 'relaxed' | 'bigText', label: string): HTMLElement {
  const box = h('input', {
    type: 'checkbox',
    checked: store.data.settings[key],
    onChange: (e: Event) => {
      (store.data.settings as Settings)[key] = (e.target as HTMLInputElement).checked;
      store.save();
      applySettings();
    },
  });
  return h('label', { class: 'inline' }, box, label);
}

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
        applySettings();
        showSettings();
      },
    },
    h('option', { value: 'it', selected: store.data.settings.lang === 'it' }, 'Italiano'),
    h('option', { value: 'en', selected: store.data.settings.lang === 'en' }, 'English'),
  );

  render(
    page(
      t('settings.title'),
      showHome,
      h(
        'section',
        { class: 'card form' },
        h('label', {}, t('settings.name'), nameInput),
        h('label', {}, t('settings.lang'), langSelect),
        toggle('sound', t('settings.sound')),
        toggle('relaxed', t('settings.relaxed')),
        toggle('bigText', t('settings.bigText')),
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
                applySettings();
                showOnboarding();
              }
            },
          },
          t('settings.reset'),
        ),
      ),
      h('p', { class: 'muted small center' }, `${APP_NAME} v0.2.0 · ${t('settings.about')}`),
    ),
  );
}
