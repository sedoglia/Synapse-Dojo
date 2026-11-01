import { h } from '../dom';
import { store } from '../storage';
import { t } from '../i18n';
import { render, page } from '../ui';
import { EXERCISES, DOMAINS } from '../exercises';
import { playPractice, levelText } from './play';
import { showHome } from './home';

export function showTraining() {
  render(
    page(
      t('training.title'),
      showHome,
      ...DOMAINS.map((d) =>
        h(
          'section',
          { class: 'domain-group' },
          h('h3', { class: `domain-title domain-${d}` }, t(`domain.${d}`)),
          h(
            'div',
            { class: 'ex-grid' },
            ...EXERCISES.filter((ex) => ex.domain === d).map((ex) => {
              const best = store.best(ex.id);
              const level = ex.levels && store.hasLevel(ex.id) ? levelText(ex, store.level(ex.id, ex.levels.start)) : null;
              return h(
                'button',
                { class: 'ex-card', onClick: () => playPractice(ex) },
                store.playedToday(ex.id) ? h('span', { class: 'stamp', title: t('training.today') }, '✓') : null,
                h('span', { class: 'ex-icon' }, ex.icon),
                h('b', {}, t(ex.name)),
                h('small', { class: 'muted' }, level ? `${t('common.level')}: ${level}` : `${t('common.best')}: ${best ?? t('progress.none')}`),
              );
            }),
          ),
        ),
      ),
    ),
  );
}
