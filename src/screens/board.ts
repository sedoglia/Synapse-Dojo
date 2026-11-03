import { h } from '../dom';
import { store } from '../storage';
import { t, num } from '../i18n';
import { render, page } from '../ui';
import { EXERCISES } from '../exercises';
import {
  AGE_BANDS,
  boardErrorText,
  fetchBoard,
  listGroups,
  nickname,
  type AgeBand,
  type BoardResult,
  type BoardRow,
  type Group,
  type Metric,
} from '../board';
import { showGroups } from './groups';

const METRICS: Metric[] = ['days', 'improvement', 'best'];
const MEDALS = ['🥇', '🥈', '🥉'];

// The last view stays selected while the app is open.
let metric: Metric = 'days';
let ex = '';
let band: AgeBand | '' = '';
/**
 * "Best level" ranks ability, which depends on age (above all in speed tasks): it opens on the player's own age
 * group so nobody is measured against people decades younger, until they pick another filter themselves.
 */
let bestBand: AgeBand | '' | null = null;
let group = '';
/** The player's groups, kept between visits so the selector appears at once. */
let groups: Group[] = [];

const currentBand = (): AgeBand | '' => (metric === 'best' ? (bestBand ?? ((store.data.board?.ageBand ?? '') as AgeBand | '')) : band);

/** Default exercise for "best level": the one played most recently. */
const lastExercise = () => store.data.runs[store.data.runs.length - 1]?.ex ?? EXERCISES[0].id;

function valueText(m: Metric, v: number): string {
  if (m === 'days') return t('board.value.points', { n: v });
  if (m === 'improvement') return t('board.value.improvement', { v: `${v > 0 ? '+' : ''}${num(v)}` });
  return String(Math.round(v));
}

function row(r: BoardRow): HTMLElement {
  return h(
    'li',
    { class: `board-row${r.me ? ' me' : ''}` },
    h('span', { class: 'board-rank' }, MEDALS[r.rank - 1] ?? `#${r.rank}`),
    h('span', { class: 'board-name' }, nickname(r.nameCode), r.me ? h('small', { class: 'board-you' }, t('board.you')) : null),
    h(
      'span',
      { class: 'board-value' },
      h('b', {}, valueText(metric, r.value)),
      metric === 'days' && r.days !== undefined ? h('small', {}, t('board.detail.days', { days: r.days, n: r.activities ?? 0 })) : null,
    ),
  );
}

/** Top 3, then (after a gap if needed) the player with their neighbours: a race close enough to win. */
function list(res: BoardResult): HTMLElement {
  if (!res.total) return h('p', { class: 'muted center' }, t('board.empty'));
  const rows = [...res.top];
  const near = res.me ? [...res.above, res.me, ...res.below].filter((r) => r.pos > res.top.length) : [];
  const gap = near.length > 0 && near[0].pos > res.top.length + 1;
  return h(
    'div',
    {},
    h('ol', { class: 'board-list' }, ...rows.map(row), gap ? h('li', { class: 'board-gap', 'aria-hidden': 'true' }, '⋯') : null, ...near.map(row)),
    !res.me && store.data.board ? h('p', { class: 'muted small center' }, t('board.notYet')) : null,
    h('p', { class: 'muted small center' }, res.total === 1 ? t('board.players1') : t('board.players', { n: res.total })),
  );
}

/** The leaderboard; `groupId` opens it on that group (from the groups screen). */
export function showBoard(onBack: () => void, groupId?: string) {
  if (groupId !== undefined) group = groupId;
  if (metric === 'best' && !ex) ex = lastExercise();
  const box = h('div', { class: 'card', 'aria-live': 'polite' });
  let request = 0;

  const load = async () => {
    const mine = ++request;
    box.replaceChildren(h('p', { class: 'muted center' }, t('board.loading')));
    try {
      const res = await fetchBoard({
        metric,
        ex: metric === 'days' ? undefined : ex || undefined,
        band: currentBand() || undefined,
        group: group || undefined,
      });
      if (mine === request) box.replaceChildren(list(res));
    } catch (e) {
      if (mine !== request) return;
      // Removed from a group meanwhile (or it no longer exists): fall back to everyone.
      if (group && e instanceof Error && e.message === 'not_member') {
        group = '';
        return showBoard(onBack);
      }
      box.replaceChildren(h('p', { class: 'muted center' }, boardErrorText(e)));
    }
  };

  const scopeSelect = h(
    'select',
    { class: 'input', 'aria-label': t('board.scope'), onChange: () => ((group = scopeSelect.value), void load()) },
    h('option', { value: '' }, `🌍 ${t('board.scope.all')}`),
  );
  const fillScopes = () => {
    scopeSelect.replaceChildren(
      h('option', { value: '', selected: !group }, `🌍 ${t('board.scope.all')}`),
      ...groups.map((g) => h('option', { value: g.id, selected: g.id === group }, `👥 ${g.name}`)),
    );
  };
  fillScopes();
  const scopeRow = h(
    'div',
    { class: 'board-filters' },
    scopeSelect,
    h('button', { class: 'btn', onClick: () => showGroups(() => showBoard(onBack)) }, `👥 ${t('board.groups')}`),
  );

  const exSelect = h(
    'select',
    { class: 'input', 'aria-label': t('board.exercise'), onChange: () => ((ex = exSelect.value), void load()) },
    metric === 'best' ? null : h('option', { value: '', selected: !ex }, t('board.allExercises')),
    ...EXERCISES.map((e) => h('option', { value: e.id, selected: e.id === ex }, `${e.icon} ${t(e.name)}`)),
  );
  const bandSelect = h(
    'select',
    {
      class: 'input',
      'aria-label': t('board.ageBand'),
      onChange: () => {
        const value = bandSelect.value as AgeBand | '';
        if (metric === 'best') bestBand = value;
        else band = value;
        void load();
      },
    },
    h('option', { value: '', selected: !currentBand() }, t('board.band.all')),
    ...AGE_BANDS.map((b) => h('option', { value: b, selected: b === currentBand() }, t(`board.band.${b}`))),
  );
  // Without an age group, "best level" compares everyone: say how to compare with people of the same age.
  const bandHint = metric === 'best' && store.data.board && !store.data.board.ageBand ? h('p', { class: 'muted small' }, `ℹ️ ${t('board.bandHint')}`) : null;

  render(
    page(
      t('board.title'),
      onBack,
      h(
        'div',
        { class: 'seg', role: 'group' },
        ...METRICS.map((m) =>
          h(
            'button',
            {
              class: m === metric ? 'on' : '',
              'aria-pressed': String(m === metric),
              onClick: () => {
                if (m === metric) return;
                metric = m;
                if (m === 'best' && !ex) ex = lastExercise();
                showBoard(onBack);
              },
            },
            t(`board.tab.${m}`),
          ),
        ),
      ),
      h('p', { class: 'muted small' }, t(`board.explain.${metric}`), metric === 'best' && store.data.settings.relaxed ? ` ${t('board.explain.relaxed')}` : ''),
      store.data.board ? scopeRow : null,
      h('div', { class: 'board-filters' }, metric === 'days' ? null : exSelect, bandSelect),
      bandHint,
      box,
      h('p', { class: 'muted small center' }, `🔄 ${t('board.reset')}`),
    ),
  );
  void load();
  // Refresh the group list in the background; a group left elsewhere disappears from the selector.
  listGroups()
    .then((fresh) => {
      groups = fresh;
      if (group && !groups.some((g) => g.id === group)) {
        group = '';
        void load();
      }
      fillScopes();
    })
    .catch(() => {
      /* offline: keep the last known list */
    });
}
