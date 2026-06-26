// Service Worker - Stale While Revalidate Strategy
// Assets are served from cache instantly, then updated in background.
// Next page load always has the latest version.
const CACHE_NAME = 'crypto-aggregator-v10';

// NOTE: paths must match the real files on disk. CSS lives in /css and JS in /js.
// (The old list pointed to root-level files that no longer exist, which made
// cache.addAll() reject and silently broke every SW update.)
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/all-platforms.html',
  '/css/main.css',
  '/js/script.js',
  '/js/performance.js',
  '/js/premium-elements.js',
  '/js/scroll-unblock.js',
  '/js/mouse-fix-force.js'
];

// Install: pre-cache assets and activate immediately.
// Use allSettled + individual add() so one missing asset can never abort the
// whole install (which would leave the previous SW serving stale content).
self.addEventListener('install', (event) => {
  console.log('[SW] Installing', CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => Promise.allSettled(
        PRECACHE_ASSETS.map((asset) => cache.add(asset))
      ))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches and take control immediately
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating', CACHE_NAME);
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: Stale-While-Revalidate for assets, Network-First for HTML
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // HTML pages: Network First (always try to get latest)
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // All other assets (JS, CSS, images): Stale While Revalidate
  event.respondWith(staleWhileRevalidate(request));
});

// Network First: try network, fall back to cache (for HTML)
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

// Stale While Revalidate: serve cache immediately, update in background
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  // Fetch fresh version in background (don't await if we have cache)
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => null);

  // Return cached version immediately, or wait for network if no cache
  return cached || fetchPromise;
}
