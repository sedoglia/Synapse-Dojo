import { h } from '../dom';
import { store } from '../storage';
import { t } from '../i18n';
import { APP_NAME } from '../config';
import { render } from '../ui';
import { showHome } from './home';
import { showPrivacy } from './privacy';

export function showOnboarding() {
  const input = h('input', { class: 'input', placeholder: t('onboard.placeholder'), maxlength: 24, autofocus: true });
  const submit = (e: Event) => {
    e.preventDefault();
    const name = input.value.trim();
    if (!name) return input.focus();
    store.data.name = name;
    store.save();
    showHome();
  };

  render(
    h(
      'div',
      { class: 'page onboard' },
      h(
        'form',
        { class: 'card intro', onSubmit: submit },
        h('img', { class: 'onboard-logo', src: './icon.svg', alt: '' }),
        h('h1', {}, APP_NAME),
        h('p', { class: 'muted' }, t('app.tagline')),
        h('h2', {}, t('onboard.title')),
        h('label', {}, t('onboard.ask'), input),
        h('button', { class: 'btn primary big', type: 'submit' }, t('onboard.go')),
      ),
      h('p', { class: 'center small' }, h('button', { class: 'link-btn', type: 'button', onClick: () => showPrivacy(showOnboarding) }, t('privacy.title'))),
    ),
  );
  input.focus();
}
