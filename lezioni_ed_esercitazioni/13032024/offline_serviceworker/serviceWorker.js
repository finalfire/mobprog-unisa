console.log("Ciao, sono il service worker!");

self.addEventListener("fetch", function(event) {
    console.log("Richiesta fetch per:", event.request.url);
});  