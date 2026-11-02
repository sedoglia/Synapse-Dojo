const KEY = 'synapse-dojo/reloaded-at';

/**
 * Each deploy replaces every hashed file, so a page opened before it can't load the files it still asks for
 * (a language, for instance). Reloading picks up the new version. Returns false when it won't reload:
 * offline (the file is simply unreachable) or right after a reload, so a real failure can't loop.
 * The language files are the only ones loaded on demand, so `loadLang` is the one caller.
 */
export function reloadForNewVersion(): boolean {
  if (!navigator.onLine) return false;
  try {
    if (Date.now() - Number(sessionStorage.getItem(KEY) ?? 0) < 30_000) return false;
    sessionStorage.setItem(KEY, String(Date.now()));
  } catch {
    return false; // without storage there's no loop guard
  }
  location.reload();
  return true;
}
