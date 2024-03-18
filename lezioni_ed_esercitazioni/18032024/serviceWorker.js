self.addEventListener("fetch", function(event) {
    event.respondWith(
        fetch(event.request)
            .catch(function(error) {
                return new Response("Scusa, sei offline!");
            })
    );
})