import { h } from '../dom';
import { store } from '../storage';
import { t } from '../i18n';
import { render, page } from '../ui';
import { EXERCISES } from '../exercises';
import { playPractice } from './play';
import { showHome } from './home';

export function showTraining() {
  render(
    page(
      t('training.title'),
      showHome,
      h(
        'div',
        { class: 'ex-grid' },
        ...EXERCISES.map((ex) => {
          const best = store.best(ex.id);
          return h(
            'button',
            { class: 'ex-card', onClick: () => playPractice(ex) },
            store.playedToday(ex.id) ? h('span', { class: 'stamp', title: t('training.today') }, '✓') : null,
            h('span', { class: 'ex-icon' }, ex.icon),
            h('b', {}, t(ex.name)),
            h('span', { class: `chip skill-${ex.skill}` }, t(`skill.${ex.skill}`)),
            h('small', { class: 'muted' }, `${t('common.best')}: ${best ?? t('progress.none')}`),
          );
        }),
      ),
    ),
  );
}
