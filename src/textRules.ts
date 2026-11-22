/**
 * Letter rules that depend on the language but not on the page or the saved settings, so that the checks in
 * `scripts/` can run them on every language too.
 */

/**
 * A word in capitals the way the language writes them. Turkish needs its own rule: "i" becomes "İ" and "ı" becomes
 * "I", where the plain `toUpperCase` would turn both into "I" and show the wrong letter on the tiles.
 */
export const upperIn = (lang: string, word: string) => word.toLocaleUpperCase(lang);

/** Compatibility jamo for the 19 initial consonants of a Hangul syllable, in Unicode order. */
const CHOSEONG = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
/** Thai vowels written before the consonant they follow in speech: dictionaries sort by the consonant. */
const THAI_LEADING = /^[เแโใไ]/u;
/** Vietnamese tone marks (grave, acute, tilde, hook above, dot below): a tone is not a different letter. */
const VI_TONES = /[̣̀́̃̉]/gu;

/**
 * The letter a word starts with, as Word Sprint asks for it. In Korean it is the first syllable's initial consonant
 * ("사과" → "ㅅ"), since whole syllables would leave too few words per letter; in Thai the first consonant, skipping a
 * vowel written before it ("เรือ" → "ร"); in Vietnamese the first letter without its tone ("ống" → "Ô", "Đ" stays).
 * Every other language uses its first character, in capitals.
 */
export function initialIn(lang: string, word: string): string {
  const w = upperIn(lang, word);
  const base = lang.split('-')[0];
  if (base === 'ko') {
    const code = w.charCodeAt(0) - 0xac00;
    return code >= 0 && code < 11172 ? CHOSEONG[Math.floor(code / 588)] : [...w][0] ?? '';
  }
  if (base === 'th') return [...w.replace(THAI_LEADING, '')][0] ?? '';
  if (base === 'vi') {
    const [first = '', ...rest] = [...w.normalize('NFD')];
    let marks = '';
    for (const c of rest) {
      if (!/\p{M}/u.test(c)) break;
      marks += c;
    }
    return (first + marks.replace(VI_TONES, '')).normalize('NFC');
  }
  return [...w][0] ?? '';
}
