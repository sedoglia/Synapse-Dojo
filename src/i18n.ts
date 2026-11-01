import { store } from './storage';
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

export interface Locale {
  ui: Partial<Record<Key, string>>;
  words: string[];
  passages: Passage[];
}

const loaders = import.meta.glob<{ default: Locale }>(['./locales/*.ts', '!./locales/en.ts']);
const loaded: Partial<Record<Lang, Locale>> = { en };

export const isLang = (v: unknown): v is Lang => typeof v === 'string' && Object.prototype.hasOwnProperty.call(LANGS, v);
export const meta = (): LangMeta => LANGS[store.data.settings.lang] ?? LANGS.en;
const locale = (): Locale => loaded[store.data.settings.lang] ?? en;

/** Loads a language's texts if needed. Unknown languages, or a failed download (offline), fall back to English. */
export async function loadLang(lang: unknown): Promise<Lang> {
  if (!isLang(lang)) return 'en';
  if (!loaded[lang]) {
    try {
      loaded[lang] = (await loaders[`./locales/${lang}.ts`]()).default;
    } catch {
      return 'en';
    }
  }
  return lang;
}

export function t(key: Key, params: Record<string, string | number> = {}): string {
  const s = locale().ui[key] ?? en.ui[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, p) => String(params[p] ?? `{${p}}`));
}

export const words = () => locale().words;
export const passages = () => locale().passages;

export type { Key as I18nKey };
