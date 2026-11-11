import { store } from './storage';
import { pick } from './dom';
import { reloadForNewVersion } from './update';
import en, { ui as enUi } from './locales/en';

/**
 * Languages: English is bundled as the default and fallback, the others are loaded on demand.
 * `letters` are the Echo letters (easy to tell apart when spoken), `speech` the voice used to say them,
 * `charsPerWord` converts characters to words for Speed reading in scripts without spaces.
 */
interface LangMeta {
  name: string;
  speech: string;
  letters: string[];
  charsPerWord?: number;
  rtl?: boolean;
}

export const LANGS = {
  en: { name: 'English', speech: 'en-US', letters: ['H', 'K', 'L', 'O', 'Q', 'R', 'Y'] },
  es: { name: 'Español', speech: 'es-ES', letters: ['A', 'O', 'U', 'H', 'J', 'K', 'Z'] },
  zh: { name: '中文', speech: 'zh-CN', letters: ['一', '三', '五', '七', '八', '十', '千'], charsPerWord: 1.5 },
  hi: { name: 'हिन्दी', speech: 'hi-IN', letters: ['क', 'ग', 'प', 'म', 'र', 'ल', 'स'] },
  ar: { name: 'العربية', speech: 'ar-SA', letters: ['ب', 'د', 'س', 'ك', 'ل', 'م', 'ن'], rtl: true },
  pt: { name: 'Português', speech: 'pt-BR', letters: ['A', 'O', 'U', 'J', 'K', 'R', 'Z'] },
  fr: { name: 'Français', speech: 'fr-FR', letters: ['A', 'O', 'U', 'H', 'K', 'R', 'W'] },
  ru: { name: 'Русский', speech: 'ru-RU', letters: ['А', 'О', 'У', 'Б', 'К', 'Р', 'Ш'] },
  de: { name: 'Deutsch', speech: 'de-DE', letters: ['A', 'O', 'U', 'K', 'R', 'Y', 'Z'] },
  ja: { name: '日本語', speech: 'ja-JP', letters: ['カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ'], charsPerWord: 2 },
  id: { name: 'Bahasa Indonesia', speech: 'id-ID', letters: ['A', 'O', 'U', 'K', 'R', 'W', 'Y'] },
  it: { name: 'Italiano', speech: 'it-IT', letters: ['A', 'E', 'I', 'O', 'U', 'H', 'Z'] },
} satisfies Record<string, LangMeta>;

export type Lang = keyof typeof LANGS;
type Key = keyof typeof enUi;

export interface Passage {
  text: string;
  question: string;
  answers: [string, string, string]; // first one is correct
}

export interface StoryScenario {
  name: string;
  item: string;
  itemDistractors: [string, string];
  place: string;
  placeDistractors: [string, string];
  time: string;
  timeDistractors: [string, string];
}

export interface Locale {
  ui: Partial<Record<Key, string>>;
  words: string[];
  /** Other valid words that use the same letters as a word in `words`: right answers in Anagrams, never asked. */
  anagramWords?: string[];
  passages: Passage[];
  stories?: StoryScenario[];
  /**
   * Leaderboard nicknames ("Swift Otter 42"), combined by `board.nick`. Keep both lists 32 long in every language.
   * In languages where adjectives agree in gender, all animals share one gender so every pair is grammatical.
   */
  nicknames?: { adjectives: string[]; animals: string[] };
}

const loaders = import.meta.glob<{ default: Locale }>(['./locales/*.ts', '!./locales/en.ts']);
const loaded: Partial<Record<Lang, Locale>> = { en };

export const isLang = (v: unknown): v is Lang => typeof v === 'string' && Object.prototype.hasOwnProperty.call(LANGS, v);
export const meta = (): LangMeta => LANGS[store.data.settings.lang] ?? LANGS.en;
const locale = (): Locale => loaded[store.data.settings.lang] ?? en;

/**
 * The device's preferred language among the supported ones ("it-IT" → "it"), English if none is supported.
 * Starting in the device's language matters: an English app on an Italian phone gets auto-translated by the
 * browser, which translates the interface but not the letter tiles, so games like Anagrams look broken.
 */
export function deviceLang(): Lang {
  const prefs = typeof navigator === 'undefined' ? [] : navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of prefs) {
    const base = tag?.split('-')[0]?.toLowerCase();
    if (isLang(base)) return base;
  }
  return 'en';
}

/** The language to start in: the saved one, or the device's on a first visit. */
export const startLang = (): Lang => (store.fresh ? deviceLang() : store.data.settings.lang);

/**
 * Loads a language's texts if needed. Unknown languages, or a failed download (offline), fall back to English.
 * If the file is gone because a new version was published, the choice is saved and the page reloads into it.
 */
export async function loadLang(lang: unknown): Promise<Lang> {
  if (!isLang(lang)) return 'en';
  if (!loaded[lang]) {
    try {
      loaded[lang] = (await loaders[`./locales/${lang}.ts`]()).default;
    } catch {
      store.data.settings.lang = lang;
      store.save();
      if (reloadForNewVersion()) await new Promise<never>(() => {}); // the page is going away
      return 'en';
    }
  }
  return lang;
}

export function t(key: Key, params: Record<string, string | number> = {}): string {
  const s = locale().ui[key] ?? en.ui[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, p) => String(params[p] ?? `{${p}}`));
}

/** Locale for numbers and dates, always with Latin digits like every other number in the app. */
const intl = () => `${meta().speech}-u-nu-latn`;
/** A number with a fixed count of decimals and the language's decimal separator ("1,5" in Italian). */
export const num = (v: number, digits = 1) => v.toLocaleString(intl(), { minimumFractionDigits: digits, maximumFractionDigits: digits });
/** A YYYY-MM-DD date written the way the language writes dates ("3 nov 2026", "2026年11月3日"). */
export const dateText = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString(intl(), { day: 'numeric', month: 'short', year: 'numeric' });

/**
 * The letters of a word as a reader sees them (grapheme clusters): in Hindi a consonant and its vowel sign
 * are one letter, so "ति" stays together instead of splitting into "त" + "ि".
 */
export function graphemes(word: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    return [...new Intl.Segmenter(meta().speech, { granularity: 'grapheme' }).segment(word)].map((s) => s.segment);
  }
  return Array.from(word);
}

/** The word in the list whose length (in letters) is closest to `n`, preferring an exact match; never a one-letter word if avoidable. */
export function wordNear(list: readonly string[], n: number): string {
  const usable = list.filter((w) => graphemes(w).length >= 2);
  const pool = usable.length ? usable : list;
  const dist = (w: string) => Math.abs(graphemes(w).length - n);
  const best = Math.min(...pool.map(dist));
  const near = pool.filter((w) => dist(w) === best);
  return pick(near);
}

export const words = () => locale().words;
export const anagramWords = () => locale().anagramWords ?? [];
export const passages = () => locale().passages;
export const stories = () => locale().stories ?? en.stories ?? [];
export const nicknames = () => locale().nicknames ?? en.nicknames;

export type { Key as I18nKey };
