console.log("Ciao, sono il service worker!");

// aggiungo un listener per l'evento fetch
// quando il browser fa una richiesta per una risorsa = evento fetch
self.addEventListener("fetch", function(event) {
    // sto controllando se la richiesta è per il file style.css
    if (event.request.url.includes("style.css")) {
      // il metodo respondWith di event mi permette di
      // rispondere alla richiesta, accetta un oggetto
      // di tipo Response
      event.respondWith(
        // il primo parametro di Response è il BODY della
        // risposta (quindi il contenuto);
        // il secondo parametro è un oggetto che contiene gli HEADER
        // della risposta
        new Response(
          'h1 { color: green; font-size: 8em; }',
          { headers: { 'Content-Type': 'text/css' } }
        )
      )
    }
  });  