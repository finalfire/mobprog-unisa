// cattura tutti gli eventi di tipo "fetch"
self.addEventListener("fetch", function(event) {
    console.log("Richiesta fetch per:", event.request.url);

    // data una fetch, se nel suo URL appare la sottostringa style.css
    // (quindi, mi sto riferendo alla fetch del file style.css)
    if (event.request.url.includes("style.css")) {
        console.log("Ho intercettato la fetch per style.css");

        // invece di rispondere con lo stesso file
        // crea una nuova Response e invia questa al client invece del file style.css
        event.respondWith(
            // la nuova Response ha come contenuto una stringa CSS
            // e ha come header il tipo di contenuto della Response
            // che non è altro che un text/css (MIME Type)
            new Response(
                'h1 { color: yellow; font-size: 4em; }',
                { headers: { 'Content-Type': 'text/css' } }
            )
        )
    }
});  