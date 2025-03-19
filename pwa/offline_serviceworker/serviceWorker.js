// cattura tutti gli eventi di tipo "fetch"
self.addEventListener("fetch", function(event) {
    console.log("Richiesta fetch per:", event.request.url);
    // event è un oggetto che ha dentro la Promise che racchiude
    // la fetch, e altre info
    event.respondWith(
        // mi chiedo se la fetch è fallita (per un qualsiasi errore)
        // se sì, catturo il tutto tramite il catch
        fetch(event.request).catch(function() {
          // il service worker fabbrica una nuova Response
          // con il testo "Sei offline"
          return new Response("Sei offline!")
        })
      );
    
});  