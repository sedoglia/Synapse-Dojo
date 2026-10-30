import { h } from './dom';
import { t } from './i18n';
import { store } from './storage';

/** Reflects language and accessibility settings on the document. */
export function applySettings() {
  const root = document.documentElement;
  root.lang = store.data.settings.lang;
  root.classList.toggle('big-text', store.data.settings.bigText);
}

const app = () => document.getElementById('app')!;

export function render(view: HTMLElement) {
  app().replaceChildren(view);
  window.scrollTo(0, 0);
}

/** Standard page: a top bar with a back button and a title, then content. */
export function page(title: string, onBack: (() => void) | null, ...content: HTMLElement[]): HTMLElement {
  return h(
    'div',
    { class: 'page' },
    h(
      'header',
      { class: 'topbar' },
      onBack ? h('button', { class: 'icon-btn', 'aria-label': t('common.back'), onClick: onBack }, '←') : h('span'),
      h('h1', {}, title),
      h('span'),
    ),
    h('main', { class: 'content' }, ...content),
  );
}

export function rankIndex(score: number): 0 | 1 | 2 | 3 | 4 {
  if (score < 300) return 0;
  if (score < 500) return 1;
  if (score < 700) return 2;
  if (score < 850) return 3;
  return 4;
}

export const rankName = (score: number) => t(`rank.${rankIndex(score)}`);

/** Animates a number counting up inside `el`. */
export function countUp(el: HTMLElement, to: number, ms = 900) {
  const start = performance.now();
  const step = (now: number) => {
    const k = Math.min(1, (now - start) / ms);
    el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  // rAF pauses in background tabs; make sure the final value always lands.
  setTimeout(() => (el.textContent = String(to)), ms + 100);
}
