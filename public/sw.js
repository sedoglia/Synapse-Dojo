// Network-first service worker: always fresh online, still playable offline.
// Only this site's own files are cached; requests to other origins (e.g. analytics) pass through untouched.
const CACHE = 'synapse-dojo-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) =>
  e.waitUntil(
    (async () => {
      for (const key of await caches.keys()) if (key !== CACHE) await caches.delete(key);
      await self.clients.claim();
    })(),
  ),
);

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      try {
        const res = await fetch(e.request);
        if (res.ok) cache.put(e.request, res.clone());
        return res;
      } catch {
        const hit = await cache.match(e.request);
        if (hit) return hit;
        throw new Error('offline and not cached');
      }
    })(),
  );
});
