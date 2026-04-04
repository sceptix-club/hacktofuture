const CACHE_NAME = "htf4-cache-v2";

const STATIC_ASSETS = [
  "/manifest.json",
  "/logo_white.svg",
];

self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Caching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activating...");

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[SW] Removing old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  // Assets to cache: images, styles, scripts, fonts, and manifest
  const isAsset =
    request.destination === "image" ||
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "font" ||
    request.destination === "manifest";

  // We exclude documents (HTML) and API calls from caching to ensure they are always fresh.
  // This solves the issue where users see stale content like "Coming Soon" after updates.
  if (isAsset) {
    event.respondWith(cacheFirst(request));
  } else {
    // Network-only for documents and API calls
    event.respondWith(fetch(request));
  }
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) return cached;

  try {
    const response = await fetch(request);
    // Cache the asset for future use if the fetch was successful
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // If the network is down, the previously cached asset (if any) will be returned
    return cached;
  }
}