 // service-worker.js

self.addEventListener('install', function(event) {
    console.log("ok");
    event.waitUntil(
        caches.open('cache').then(function(cache) {
            return cache.addAll(
                [
                    '/',
                    '/js/app.js',
                    '/js/chunk-vendors.js',
                    '/js/0.js',
                    '/js/1.js',
                    '/js/2.js',
                    '/js/3.js',
                    '/js/about.js',
                    '/manifest.json',
                    '/img/logo.82b9c7a5.png',
                    'http://localhost:3000/posts/',
                    '/favicon.ico',
                    '/icon-192x192.png',
                    '/media/',

                ]
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});


