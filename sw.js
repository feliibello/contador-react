const CACHE_ELEMENTS = [
    "./",
    "https://unpkg.com/react@18/umd/react.production.min.js",
    "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "/02-React-Proyecto_Contador/02-style.css",
    "/02-React-Proyecto_Contador/02-contador.js"
]

const CACHE_NAME = "v3_cache_contador_react" //se le nombra con las versiones del cache

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            cache
                .addAll(CACHE_ELEMENTS)
                .then(() => {
                    self.skipWaiting();
                })
                .catch(console.log);
        })
    );
});

self.addEventListener("activate", (e) => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(cacheNames.map(cacheName =>{
                return cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName)
            }))
        })
        .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            if (res) {
                return res; // Si está en la cache, lo devuelve
            }
            return fetch(e.request); // Si no está en la cache, realiza la petición
        })
    );
});
