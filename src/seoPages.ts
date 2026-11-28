/**
 * Addresses of the standalone game pages (one per exercise, in every language), built after `vite build` by
 * scripts/build-seo-pages.mjs. This file has no imports so that the Node script can load it directly.
 *
 * English pages live at /games/<slug>, the other languages at /<lang>/games/<slug> ("zh-TW" → "zh-tw").
 * Each slug is what people type into a search engine for that kind of task (the research behind the choice is in
 * docs/piano-marketing.md §1.1), not the exercise's name in the app. Changing a slug breaks links: add, never rename.
 */
export const SEO_SLUGS: Record<string, string> = {
  glance: 'useful-field-of-view-test',
  reflex: 'choice-reaction-time-test',
  path: 'trail-making-test',
  reaction: 'reaction-time-test',
  pilot: 'multitasking-game',
  radar: 'multiple-object-tracking',
  flanker: 'flanker-test',
  gonogo: 'go-no-go-test',
  msit: 'multi-source-interference-task',
  binding: 'color-and-shape-game',
  clash: 'stroop-test',
  switch: 'task-switching-game',
  sorting: 'card-sorting-test',
  echo: 'dual-n-back',
  grid: 'corsi-block-test',
  digits: 'running-memory-game',
  span: 'digit-span-test',
  vault: 'word-memory-test',
  pairs: 'paired-associates-game',
  stories: 'story-memory-test',
  memoria: 'memory-match-game',
  rotate: 'mental-rotation-test',
  matrix: 'spatial-matrix-game',
  nonogram: 'nonogram',
  tangram: 'tangram',
  towers: 'tower-of-london',
  odd: 'odd-one-out',
  resources: 'budget-puzzle',
  game2048: '2048',
  crackTheCode: 'crack-the-code',
  math: 'mental-math-game',
  reading: 'speed-reading-test',
  dots: 'dot-estimation-game',
  anagrams: 'anagrams',
  fluency: 'word-sprint',
  tapSeq: 'bilateral-tapping-game',
  swipePattern: 'bilateral-swipe-game',
  rhythm: 'rhythm-game',
  crossMove: 'cross-movements-game',
  dualTask: 'dual-task-game',
};

/** The path of a language's game pages: "/games/" for English, "/it/games/", "/zh-tw/games/". */
export function gamesPath(lang: string): string {
  return lang === 'en' ? '/games/' : `/${lang.toLowerCase()}/games/`;
}

/** The public page of the daily challenge: "/daily" in English, "/it/daily" in Italian. */
export function dailyPath(lang: string): string {
  return lang === 'en' ? '/daily' : `/${lang.toLowerCase()}/daily`;
}

/** The page of one exercise in a language, or null for an exercise without a page. */
export function gamePath(lang: string, id: string): string | null {
  const slug = SEO_SLUGS[id];
  return slug ? `${gamesPath(lang)}${slug}` : null;
}
