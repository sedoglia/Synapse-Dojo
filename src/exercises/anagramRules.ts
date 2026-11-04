/**
 * What counts as a solution in Anagrams, and which words can be used as a puzzle. Kept free of the page and of
 * the saved settings so that `npm run check:anagrams` can run the same rules on every language.
 */

type Split = (word: string) => string[];

/** The form words are compared in. NFC because some Hindi letters can be written in two equivalent ways. */
export const canon = (word: string) => word.toUpperCase().normalize('NFC');

/**
 * Every accepted answer: the game's words plus the other valid words that use the same letters.
 * The tiles already guarantee the letters, so being in this set is enough to make an answer right.
 */
export const solutionsOf = (words: readonly string[], anagramWords: readonly string[]) =>
  new Set([...words, ...anagramWords].map(canon));

/**
 * A word works as a puzzle if it is made of letters only (a blank or hyphen tile gives it away) and its letters can
 * be laid out in an order that is not itself a right answer. That rules out one-letter words, words like "みみ"
 * that read the same in any order, and two-letter words whose reverse is a word too, such as "すな" and "なす".
 */
export function isPlayable(word: string, solutions: ReadonlySet<string>, split: Split): boolean {
  const upper = canon(word);
  if (!/^[\p{L}\p{M}]+$/u.test(upper)) return false;
  const letters = split(upper);
  return letters.some((_, i) => !solutions.has(canon([...letters.slice(i), ...letters.slice(0, i)].join(''))));
}

/** The letters of a playable word in an order that is not a right answer, so no puzzle starts out already solved. */
export function scramble(word: string, solutions: ReadonlySet<string>, split: Split, shuffle: <T>(items: T[]) => T[]): string[] {
  const letters = split(word);
  let order = shuffle([...letters]);
  while (solutions.has(canon(order.join('')))) order = shuffle([...letters]);
  return order;
}
