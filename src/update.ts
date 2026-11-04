const KEY = 'synapse-dojo/reloaded-at';

/**
 * Each deploy replaces every hashed file, so a page opened before it can't load the files it still asks for
 * (a language, for instance). Reloading picks up the new version. Returns false when it won't reload:
 * offline (the file is simply unreachable) or right after a reload, so a real failure can't loop.
 * Called by `loadLang` when a language file is gone, and by the check below when Home is on screen.
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

/** How often a window that stays open asks whether a new version is out. */
const CHECK_GAP = 10 * 60_000;
let lastCheck = 0;
let newVersion = false;

/** The hashed script of a page tells its version: any change to the game gives it a new name. */
const scriptIn = (html: string) => /assets\/main-[^"']+\.js/.exec(html)?.[0];

async function check() {
  if (newVersion) return homeShown();
  if (!navigator.onLine || Date.now() - lastCheck < CHECK_GAP) return;
  lastCheck = Date.now();
  const running = document.querySelector<HTMLScriptElement>('script[src*="assets/main-"]')?.src;
  try {
    const res = await fetch('./', { cache: 'no-cache' });
    const latest = res.ok ? scriptIn(await res.text()) : undefined;
    if (running && latest && !running.endsWith(latest)) newVersion = true;
  } catch {
    return; // offline or unreachable: ask again next time
  }
  homeShown();
}

/**
 * An installed app or a tab can stay open for days on an old version, so it checks when it comes back to the front.
 * The reload waits for Home: never during an exercise, nor while something is being typed on another screen.
 */
export function watchForUpdates() {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void check();
  });
  window.addEventListener('focus', () => void check());
}

/** Called each time Home is drawn: applies a new version already found, or looks for one. */
export function homeShown() {
  if (!import.meta.env.PROD) return;
  if (!newVersion) void check();
  else if (document.querySelector('.page.home')) reloadForNewVersion();
}
