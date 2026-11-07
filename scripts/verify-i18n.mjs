// Comprehensive i18n and localization verification script for Synapse Dojo
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');
const LOCALES_DIR = join(ROOT, 'src', 'locales');

const LANGS = ['en', 'es', 'zh', 'hi', 'ar', 'pt', 'fr', 'ru', 'de', 'ja', 'id', 'it'];

async function run() {
  console.log('=== VERIFYING LOCALIZATION FOR 12 LANGUAGES ===\n');

  // 1. Load all locales
  const locales = {};
  for (const lang of LANGS) {
    try {
      const mod = await import(`../src/locales/${lang}.ts`);
      locales[lang] = mod.default;
    } catch (err) {
      console.error(`Failed to load locale ${lang}:`, err);
    }
  }

  const enUi = locales.en.ui;
  const enKeys = Object.keys(enUi);
  console.log(`English locale has ${enKeys.length} UI keys.\n`);

  // 2. Check UI Keys Presence in All Locales
  console.log('--- 1. UI Keys Completeness & Extra Keys ---');
  let missingKeyCount = 0;
  let extraKeyCount = 0;

  for (const lang of LANGS) {
    if (lang === 'en') continue;
    const ui = locales[lang].ui;
    const langKeys = new Set(Object.keys(ui));
    const missing = enKeys.filter(k => !langKeys.has(k) || ui[k] === undefined || ui[k] === null || ui[k] === '');
    const extra = Object.keys(ui).filter(k => !(k in enUi));

    if (missing.length > 0) {
      console.log(`[!] ${lang} is MISSING ${missing.length} keys:`);
      for (const k of missing) {
        console.log(`    - ${k} (en: "${enUi[k]}")`);
      }
      missingKeyCount += missing.length;
    } else {
      console.log(`[✓] ${lang}: All ${enKeys.length} keys present.`);
    }

    if (extra.length > 0) {
      console.log(`[?] ${lang} has ${extra.length} EXTRA keys not in en:`);
      for (const k of extra) {
        console.log(`    + ${k}: "${ui[k]}"`);
      }
      extraKeyCount += extra.length;
    }
  }

  // 3. Parameter / Placeholder consistency
  console.log('\n--- 2. Parameter / Placeholder Consistency ---');
  const paramRegex = /\{(\w+)\}/g;
  let paramMismatches = 0;

  for (const key of enKeys) {
    const enVal = enUi[key];
    const enParams = new Set([...enVal.matchAll(paramRegex)].map(m => m[1]));

    for (const lang of LANGS) {
      if (lang === 'en') continue;
      const langVal = locales[lang].ui[key];
      if (!langVal) continue;
      const langParams = new Set([...langVal.matchAll(paramRegex)].map(m => m[1]));

      // Check if sets match
      const missingParams = [...enParams].filter(p => !langParams.has(p));
      const extraParams = [...langParams].filter(p => !enParams.has(p));

      if (missingParams.length > 0 || extraParams.length > 0) {
        console.log(`[!] Param mismatch in ${lang} for key "${key}":`);
        console.log(`    EN: "${enVal}" (params: ${[...enParams].join(', ')})`);
        console.log(`    ${lang.toUpperCase()}: "${langVal}" (params: ${[...langParams].join(', ')})`);
        if (missingParams.length > 0) console.log(`    Missing in ${lang}: ${missingParams.join(', ')}`);
        if (extraParams.length > 0) console.log(`    Extra in ${lang}: ${extraParams.join(', ')}`);
        paramMismatches++;
      }
    }
  }
  if (paramMismatches === 0) {
    console.log('[✓] All placeholders ({name}, {score}, etc.) match perfectly across all languages.');
  }

  // 4. Nicknames verification
  console.log('\n--- 3. Nicknames Verification ---');
  for (const lang of LANGS) {
    const n = locales[lang].nicknames;
    if (!n) {
      console.log(`[!] ${lang}: nicknames object is MISSING!`);
      continue;
    }
    const adjLen = n.adjectives ? n.adjectives.length : 0;
    const animLen = n.animals ? n.animals.length : 0;
    if (adjLen !== 32 || animLen !== 32) {
      console.log(`[!] ${lang}: nicknames count mismatch! Adjectives: ${adjLen} (expected 32), Animals: ${animLen} (expected 32)`);
    } else {
      // Check for duplicates or empty
      const adjDupes = n.adjectives.filter((item, index) => n.adjectives.indexOf(item) !== index);
      const animDupes = n.animals.filter((item, index) => n.animals.indexOf(item) !== index);
      if (adjDupes.length > 0) console.log(`[!] ${lang}: duplicate adjectives: ${adjDupes.join(', ')}`);
      if (animDupes.length > 0) console.log(`[!] ${lang}: duplicate animals: ${animDupes.join(', ')}`);
      if (adjDupes.length === 0 && animDupes.length === 0) {
        console.log(`[✓] ${lang}: 32 adjectives, 32 animals (no duplicates).`);
      }
    }
  }

  // 5. Stories verification
  console.log('\n--- 4. Stories Verification ---');
  const enStoryCount = locales.en.stories ? locales.en.stories.length : 0;
  console.log(`English has ${enStoryCount} stories.`);
  for (const lang of LANGS) {
    const stories = locales[lang].stories;
    if (!stories) {
      console.log(`[!] ${lang}: stories array is MISSING!`);
      continue;
    }
    let storyErr = 0;
    stories.forEach((s, idx) => {
      if (!s.name || !s.item || !s.place || !s.time) {
        console.log(`[!] ${lang} story #${idx} missing main fields`);
        storyErr++;
      }
      if (!Array.isArray(s.itemDistractors) || s.itemDistractors.length !== 2) {
        console.log(`[!] ${lang} story #${idx} itemDistractors length !== 2`);
        storyErr++;
      }
      if (!Array.isArray(s.placeDistractors) || s.placeDistractors.length !== 2) {
        console.log(`[!] ${lang} story #${idx} placeDistractors length !== 2`);
        storyErr++;
      }
      if (!Array.isArray(s.timeDistractors) || s.timeDistractors.length !== 2) {
        console.log(`[!] ${lang} story #${idx} timeDistractors length !== 2`);
        storyErr++;
      }
    });
    if (storyErr === 0) {
      console.log(`[✓] ${lang}: all ${stories.length} stories have valid structure.`);
    }
  }

  // 6. Passages verification
  console.log('\n--- 5. Passages (Speed Reading) Verification ---');
  const enPassageCount = locales.en.passages ? locales.en.passages.length : 0;
  console.log(`English has ${enPassageCount} passages.`);
  for (const lang of LANGS) {
    const passages = locales[lang].passages;
    if (!passages) {
      console.log(`[!] ${lang}: passages array is MISSING!`);
      continue;
    }
    let passageErr = 0;
    passages.forEach((p, idx) => {
      if (!p.text || typeof p.text !== 'string' || p.text.trim() === '') {
        console.log(`[!] ${lang} passage #${idx} missing text`);
        passageErr++;
      }
      if (!p.question || typeof p.question !== 'string' || p.question.trim() === '') {
        console.log(`[!] ${lang} passage #${idx} missing question`);
        passageErr++;
      }
      if (!Array.isArray(p.answers) || p.answers.length !== 3) {
        console.log(`[!] ${lang} passage #${idx} answers length !== 3`);
        passageErr++;
      } else {
        for (const a of p.answers) {
          if (!a || typeof a !== 'string' || a.trim() === '') {
            console.log(`[!] ${lang} passage #${idx} has empty answer`);
            passageErr++;
          }
        }
      }
    });
    if (passageErr === 0) {
      console.log(`[✓] ${lang}: all ${passages.length} passages have valid structure.`);
    }
  }

  // 7. Words verification
  console.log('\n--- 6. Words (Anagrams/Vocab) Verification ---');
  for (const lang of LANGS) {
    const words = locales[lang].words;
    if (!words || !Array.isArray(words)) {
      console.log(`[!] ${lang}: words array is MISSING!`);
      continue;
    }
    const dupes = words.filter((item, index) => words.indexOf(item) !== index);
    if (dupes.length > 0) {
      console.log(`[!] ${lang}: ${dupes.length} duplicate words: ${dupes.slice(0, 5).join(', ')}...`);
    } else {
      console.log(`[✓] ${lang}: ${words.length} words (no duplicates).`);
    }
  }

  // 8. Code Usages vs en.ts
  console.log('\n--- 7. Code Usages vs en.ts ---');
  const srcFiles = [];
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'locales' && entry.name !== 'node_modules') walk(full);
      } else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts')) {
        srcFiles.push(full);
      }
    }
  }
  walk(join(ROOT, 'src'));

  const codeKeys = new Set();
  const tCallRegex = /\bt\(\s*['"]([a-zA-Z0-9_.-]+)['"]/g;
  const missingInEn = new Set();

  for (const file of srcFiles) {
    const content = readFileSync(file, 'utf8');
    for (const match of content.matchAll(tCallRegex)) {
      const key = match[1];
      codeKeys.add(key);
      if (!(key in enUi)) {
        missingInEn.add(`${key} (in ${file})`);
      }
    }
  }

  console.log(`Found ${codeKeys.size} distinct t('...') calls in code.`);
  if (missingInEn.size > 0) {
    console.log(`[!] Keys called in code but MISSING from en.ts (${missingInEn.size}):`);
    for (const k of missingInEn) console.log(`    - ${k}`);
  } else {
    console.log(`[✓] All static t('...') keys called in code exist in en.ts.`);
  }

  // Check dynamic template literals like t(`domain.${domain}`)
  const dynamicTRegex = /\bt\(\s*`([^`]+)`/g;
  const dynamicCalls = new Set();
  for (const file of srcFiles) {
    const content = readFileSync(file, 'utf8');
    for (const match of content.matchAll(dynamicTRegex)) {
      dynamicCalls.add(match[1]);
    }
  }
  console.log(`[i] Dynamic t(...) templates found in code: ${[...dynamicCalls].join(', ')}`);

  console.log('\nVerification complete.');
}

run().catch(console.error);
