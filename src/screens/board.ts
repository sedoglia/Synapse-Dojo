import { h } from '../dom';
import { store } from '../storage';
import { t, num } from '../i18n';
import { render, page } from '../ui';
import { EXERCISES } from '../exercises';
import { AGE_BANDS, boardErrorText, fetchBoard, nickname, type AgeBand, type BoardResult, type BoardRow, type Metric } from '../board';

const METRICS: Metric[] = ['days', 'improvement', 'best'];
const MEDALS = ['🥇', '🥈', '🥉'];

// The last view stays selected while the app is open.
let metric: Metric = 'days';
let ex = '';
let band: AgeBand | '' = '';

/** Default exercise for "best level": the one played most recently. */
const lastExercise = () => store.data.runs[store.data.runs.length - 1]?.ex ?? EXERCISES[0].id;

function valueText(m: Metric, v: number): string {
  if (m === 'days') return t('board.value.days', { n: v });
  if (m === 'improvement') return t('board.value.improvement', { v: `${v > 0 ? '+' : ''}${num(v)}` });
  return String(Math.round(v));
}

function row(r: BoardRow): HTMLElement {
  return h(
    'li',
    { class: `board-row${r.me ? ' me' : ''}` },
    h('span', { class: 'board-rank' }, MEDALS[r.rank - 1] ?? `#${r.rank}`),
    h('span', { class: 'board-name' }, nickname(r.nameCode), r.me ? h('small', { class: 'board-you' }, t('board.you')) : null),
    h('b', { class: 'board-value' }, valueText(metric, r.value)),
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
    h('p', { class: 'muted small center' }, t('board.players', { n: res.total })),
  );
}

export function showBoard(onBack: () => void) {
  if (metric === 'best' && !ex) ex = lastExercise();
  const box = h('div', { class: 'card', 'aria-live': 'polite' });
  let request = 0;

  const load = async () => {
    const mine = ++request;
    box.replaceChildren(h('p', { class: 'muted center' }, t('board.loading')));
    try {
      const res = await fetchBoard({ metric, ex: metric === 'days' ? undefined : ex || undefined, band: band || undefined });
      if (mine === request) box.replaceChildren(list(res));
    } catch (e) {
      if (mine === request) box.replaceChildren(h('p', { class: 'muted center' }, boardErrorText(e)));
    }
  };

  const exSelect = h(
    'select',
    { class: 'input', 'aria-label': t('board.exercise'), onChange: () => ((ex = exSelect.value), void load()) },
    metric === 'best' ? null : h('option', { value: '', selected: !ex }, t('board.allExercises')),
    ...EXERCISES.map((e) => h('option', { value: e.id, selected: e.id === ex }, `${e.icon} ${t(e.name)}`)),
  );
  const bandSelect = h(
    'select',
    { class: 'input', 'aria-label': t('board.ageBand'), onChange: () => ((band = bandSelect.value as AgeBand | ''), void load()) },
    h('option', { value: '', selected: !band }, t('board.band.all')),
    ...AGE_BANDS.map((b) => h('option', { value: b, selected: b === band }, t(`board.band.${b}`))),
  );

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
      h('div', { class: 'board-filters' }, metric === 'days' ? null : exSelect, bandSelect),
      box,
      h('p', { class: 'muted small center' }, `🔄 ${t('board.reset')}`),
    ),
  );
  void load();
}
