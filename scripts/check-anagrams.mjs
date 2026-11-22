// Checks the word games in every language (Anagrams and Word Sprint), using the same rules as the games.
// Run with `npm run check:anagrams` after changing a word list; new words also need their valid anagrams in `anagramWords`.
// Pass language codes to check only those: `npm run check:anagrams -- tr ko`.
import { readdirSync } from 'node:fs';
import { randomInt } from 'node:crypto';
import { canon as canonIn, isPlayable, scramble, solutionsOf } from '../src/exercises/anagramRules.ts';
import { initialIn } from '../src/textRules.ts';

const LOCALES = new URL('../src/locales/', import.meta.url);
const SCRAMBLES_PER_WORD = 200;
const LEVEL_LENGTHS = [3, 4, 5, 6, 7, 8]; // what `lenFor` in anagrams.ts asks for, the lengths the levels can ask for
const SPRINT_MIN_WORDS = 6; // MIN_WORDS in fluency.ts: an initial needs this many words to be asked
const SPRINT_MIN_INITIALS = 4; // fewer initials than this and Word Sprint would keep asking the same letter

const shuffle = (items) => {
  for (let i = items.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
};

const errors = [];
const only = process.argv.slice(2);
const langs = readdirSync(LOCALES).map((f) => f.replace('.ts', '')).filter((l) => !only.length || only.includes(l));

for (const lang of langs) {
  const { default: locale } = await import(new URL(`${lang}.ts`, LOCALES));
  const segmenter = new Intl.Segmenter(lang, { granularity: 'grapheme' });
  const canon = (word) => canonIn(word, lang);
  const split = (word) => [...segmenter.segment(word)].map((s) => s.segment);
  const letterKey = (word) => split(canon(word)).sort().join('|');
  const fail = (message) => errors.push(`${lang}: ${message}`);

  const { words, anagramWords = [] } = locale;
  const solutions = solutionsOf(words, anagramWords, lang);
  const puzzles = words.filter((w) => isPlayable(w, solutions, split, lang));

  // Every extra answer must be reachable: same letters as a word the game can ask, and not a repeat of a listed word.
  const wordKeys = new Set(words.map(letterKey));
  const listed = new Set(words.map(canon));
  for (const w of anagramWords) {
    if (!wordKeys.has(letterKey(w))) fail(`"${w}" in anagramWords is not an anagram of any word`);
    if (listed.has(canon(w))) fail(`"${w}" in anagramWords is already in words`);
  }
  if (new Set(anagramWords.map(canon)).size !== anagramWords.length) fail('anagramWords has duplicates');

  // Every puzzle starts unsolved, keeps its letters, and accepts its own word and every other word with those letters.
  const byLetters = Map.groupBy(solutions, letterKey);
  for (const word of puzzles) {
    const target = canon(word);
    if (!solutions.has(target)) fail(`"${word}" is not accepted as its own answer`);
    const key = letterKey(word);
    for (const other of byLetters.get(key)) {
      if (!solutions.has(other)) fail(`"${other}" is not accepted for "${word}"`);
    }
    for (let i = 0; i < SCRAMBLES_PER_WORD; i++) {
      const order = scramble(target, solutions, split, shuffle, lang);
      if (solutions.has(canon(order.join('')))) fail(`"${word}" started already solved as "${order.join('')}"`);
      if ([...order].sort().join('|') !== split(target).sort().join('|')) fail(`"${word}" changed its letters`);
    }
  }

  // Words with a space, a hyphen, or nothing to rearrange never become puzzles.
  for (const word of puzzles) {
    if (/[^\p{L}\p{M}]/u.test(word)) fail(`"${word}" has a tile that is not a letter`);
    if (new Set(split(canon(word))).size < 2) fail(`"${word}" has nothing to rearrange`);
  }

  // Every level has words to ask, as close as the language's words allow.
  if (!puzzles.length) fail('no playable words');
  const lengths = new Set(puzzles.map((w) => split(canon(w)).length));
  const reachable = LEVEL_LENGTHS.filter((n) => lengths.has(n)).join(',');

  // No word is listed twice, even in another case.
  if (new Set(words.map(canon)).size !== words.length) fail('words has duplicates');

  // Word Sprint: enough initials with enough words each, and each initial a single letter the player can see.
  const initials = Map.groupBy(words, (w) => initialIn(lang, w));
  const rich = [...initials].filter(([, ws]) => ws.length >= SPRINT_MIN_WORDS).map(([c]) => c);
  if (rich.length < SPRINT_MIN_INITIALS) fail(`Word Sprint has only ${rich.length} initials with ${SPRINT_MIN_WORDS}+ words (${rich.join(' ')})`);
  for (const c of initials.keys()) if (!c || /[^\p{L}\p{M}]/u.test(c)) fail(`Word Sprint initial "${c}" is not a letter`);

  const ambiguous = [...byLetters.values()].filter((group) => group.length > 1).length;
  console.log(
    `${lang}: ${puzzles.length}/${words.length} playable, ${anagramWords.length} extra answers, ` +
      `${ambiguous} letter sets with several answers, exact lengths for levels: ${reachable || 'none'}, ` +
      `Word Sprint initials: ${rich.join(' ')}`,
  );
}

if (errors.length) {
  console.error(`\n${errors.length} problems:\n${errors.join('\n')}`);
  process.exit(1);
}
console.log(`\nOK: ${langs.length} languages checked.`);
