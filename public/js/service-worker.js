// Namen van de twee caches die in deze versie van de sw worden gebruikt.
// Wijzigen naar v2, enz. Als u een van de lokale bronnen bijwerkt, welke zal
// op zijn beurt weer de installatie-gebeurtenis aanzetten.
var CACHE = 'precache-v3';
var RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
var CACHE_ITEMS = [
    '/offline/index.html',
    './css/main.css',
    './images/wifi.svg',
    './js/bundle.js',
    'https://fonts.googleapis.com/css?family=Slabo+27px|Source+Sans+Pro',
    'https://fonts.gstatic.com/s/inconsolata/v15/BjAYBlHtW3CJxDcjzrnZCIgp9Q8gbYrhqGlRav_IXfk.woff2',
    'https://fonts.googleapis.com/css?family=Inconsolata|Source+Sans+Pro'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', function (event) {
    event.waitUntil(caches.open(CACHE).then(function (cache) {
        return cache.addAll(CACHE_ITEMS);
    }).then(self.skipWaiting()));
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', function (event) {
    var currentCaches = [CACHE, RUNTIME];
    event.waitUntil(caches.keys().then(function (cacheNames) {
        return cacheNames.filter(function (cacheName) {
            return !currentCaches.includes(cacheName);
        });
    }).then(function (cachesToDelete) {
        return Promise.all(cachesToDelete.map(function (cacheToDelete) {
            return caches.delete(cacheToDelete);
        }));
    }).then(function () {
        return self.clients.claim();
    }));
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', function (event) {
    // Skip cross-origin requests, like those for Google Analytics.
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(caches.match(event.request).then(function (cachedResponse) {
            if (cachedResponse) {
                return cachedResponse;
            }

            return caches.open(RUNTIME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    // Put a copy of the response in the runtime cache.
                    return cache.put(event.request, response.clone()).then(function () {
                        return response;
                    });
                });
            });
        }));
    }
});