// questo è il file contenente il codice del Service Worker
const CACHE_NAME = 'temperature-converter-v1';

// STEP 1: aggiunge un eventListener per l'evento install
// l'evento install è il primo evento del Service Worker
// qui andiamo a scegliere quali file inserire nella cache
self.addEventListener("install", event => {
	event.waitUntil(
        // waitUntil prende una closure (quindi una funzione anonima)
        (async () => {
            // caches è l'API JavaScript per accedere alla cache
            // caches.open(X) accede alla cache con nome X
            // se non esiste, la crea
            const cache = await caches.open(CACHE_NAME);
            // cache.addAll(A) aggiunge alla cache tutti gli elementi
            // nell'array A; aggiungere un elemento significa accedere
            // alla risorsa e immagazzinarla nella cache
            cache.addAll([
                '/',
                '/convertitore.js',
                '/converter.css'
            ]);
        }
        )() // invoco la funzione data come parametro a waitUntil
    );
});

// STEP 2: per ogni evento fetch
// accedo alla cache e mi chiedo se la risorsa richiesta
// nell'evento fetch sia immagazzinata nella cache: se sì, la restituisco
// se non è nella cache, allora provo a richiederla al server
// e la aggiungo alla cache
self.addEventListener("fetch", event => {
	event.respondWith((async () => {
        // accede alla cache
		const cache = await caches.open(CACHE_NAME);
        // controlla se la cache ha questa risorsa
		const cachedResponse = await cache.match(event.request);
        // se sì, la restituisco
		if (cachedResponse) {
			return cachedResponse;
		} else {
			try {
                // se arrivo qui, nella cache non ho la risorsa
                console.log(event);
                // quindi provo a richiederla tramite la connessione
                const fetchResponse = await fetch(event.request);
                // se va tutto bene, allora la inserisco nella cache
                cache.put(event.request, fetchResponse.clone());
                // e poi vado a restituirla al browser
                return fetchResponse;
			} catch (e) {
                // entro dentro questo catch quando il fetch a riga 47
                // mi ha dato errore (esempio, non ho connessione internet)
				console.log("errore :(");
			}
		}
	})());
});