// Service Worker actualizado - Forzar siempre la versión más reciente

const CACHE_NAME = "bullying-app-cache-v2"; // puedes cambiar el número si haces un cambio grande

// Archivos que se pueden guardar en caché (opcional)
const urlsToCache = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.json"
];

// Instalar y guardar archivos
self.addEventListener("install", (event) => {
  console.log("Service Worker: Instalando nueva versión...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Archivos almacenados en caché");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // activa inmediatamente el nuevo SW
});

// Activar y borrar versiones viejas del caché
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activado");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Eliminando caché viejo:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim(); // aplica el nuevo SW sin recargar manualmente
});

// Manejar las peticiones de red
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la respuesta es válida, la guarda
        if (!response || response.status !== 200) {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      })
      .catch(() => {
        // Si falla la red, intenta servir desde caché
        return caches.match(event.request);
      })
  );
});
