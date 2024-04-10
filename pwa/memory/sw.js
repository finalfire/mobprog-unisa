const CACHE_NAME = `memory-v1`;

self.addEventListener("install", event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll([
            '/',
            '/memory.js',
            '/memory.css'
        ]);
    })());
});

self.addEventListener("fetch", event => {
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
            return cachedResponse;
        } else {
            try {
                // Se la risorsa non è nella cache, proviamo ad accederla in rete
                const fetchResponse = await fetch(event.request);

                // La salviamo nella cache e la restituiamo.
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            } catch (e) {
                // La rete non è disponibile o abbiamo un errore nel recuperare la risorsa
            }
        }
    })());
});