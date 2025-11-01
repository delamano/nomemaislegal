// Define a unique cache name for this version of the app
const CACHE_NAME = 'nomemaislegal-cache-v2'; // Incremented version
// List of files to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/index.js',
  '/App.js',
  '/types.js',
  '/constants.js',
  '/services/geminiService.js',
  '/components/Header.js',
  '/components/Hero.js',
  '/components/PopularPolls.js',
  '/components/PollItem.js',
  '/components/SearchOrCreate.js',
  '/components/CreatePollModal.js',
  '/components/Footer.js',
  '/public/icons/icon-192x192.png',
  '/public/icons/icon-512x512.png'
];

// Install event: opens the cache and adds the core files to it.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serves assets from the cache first, falling back to the network.
self.addEventListener('fetch', event => {
  // We only want to cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response from the cache
        if (response) {
          return response;
        }

        // Not in cache - fetch from network, and cache the new response for later
        return fetch(event.request).then(
          networkResponse => {
            // Check if we received a valid response
            if (!networkResponse || networkResponse.status !== 200) {
                // Don't cache non-200 responses, especially for external scripts
                return networkResponse;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                // We only cache internal resources, not CDN scripts
                if (urlsToCache.includes(new URL(event.request.url).pathname)) {
                    cache.put(event.request, responseToCache);
                }
              });

            return networkResponse;
          }
        );
      })
      .catch(error => {
        // This catch handles exceptions generated from the fetch,
        // such as when the user is offline.
        console.error('Fetching failed:', error);
        // You could return a custom offline page here if you had one cached.
        // For example: return caches.match('/offline.html');
      })
  );
});

// Activate event: cleans up old caches.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
