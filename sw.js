const STATIC_CACHE_NAME = "static-cache-v1.1";
const INMUTABLE_CACHE_NAME = "promiseCacheInmutable-v1.1";
const DYNAMIC_CACHE_NAME = "dynamic-cache-v1.1";



self.addEventListener('install', (event) => {
    const promiseCache = caches.open(STATIC_CACHE_NAME).then(cache => {
        //añade a la shell
        return cache.addAll(
            [
                '/',
                '/index.html',
                '/js/app.js'
            ]
        )
    });

    const promiseCacheInmutable = caches.open(INMUTABLE_CACHE_NAME)
        .then(cache => {
            return cache.addAll(
                ['https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
                 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js',
                 'https://m.media-amazon.com/images/I/61euvgevheL.jpg',
                 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
                ])
        });

    event.waitUntil(Promise.all(
        [promiseCacheInmutable,
            promiseCache]
    ));
});


self.addEventListener('fetch', (event) => {
    const respCache = caches.match(event.request)
    event.respondWith(respCache)
})

