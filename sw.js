// CryptoHub Service Worker - Enhanced Auto-Update Version
// Advanced service worker with intelligent caching and auto-update support

const CACHE_VERSION = '1.0.10';
const CACHE_NAME = `cryptohub-v${CACHE_VERSION_TIMESTAMP}`;

// Dynamic cache name with timestamp to force updates
const timestamp = new Date().getTime();
const RUNTIME_CACHE = `cryptohub-runtime-${timestamp}`;

const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/version.json'
];

// Install event - cache resources and skip waiting
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching files');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                // Força o SW a se tornar ativo imediatamente
                return self.skipWaiting();
            })
    );
});

// Fetch event - Network first, then cache
self.addEventListener('fetch', (event) => {
    // Ignora requisições que não são HTTP/HTTPS
    if (!event.request.url.startsWith('http')) {
        return;
    }

    // Para version.json, SEMPRE busca da rede (nunca do cache)
    if (event.request.url.includes('version.json')) {
        event.respondWith(
            fetch(event.request, {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache'
                }
            }).catch(() => {
                // Se falhar, retorna versão vazia
                return new Response(JSON.stringify({
                    version: "0.0.0",
                    buildDate: new Date().toISOString(),
                    hash: "unknown",
                    forceUpdate: false
                }), {
                    headers: { 'Content-Type': 'application/json' }
                });
            })
        );
        return;
    }

    // Para outros recursos, usa estratégia normal
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Força o Service Worker a assumir controle imediatamente
    self.clients.claim();
});

// Escuta mensagem de SKIP_WAITING do auto-updater
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
