const CACHE_NAME = 'egypthub-v2';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
];
const API_CACHE = '/api-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
  caches.keys().then((names) => 
    Promise.all(names.map((n) => { 
    if (n !== CACHE_NAME && n !== API_CACHE) return caches.delete(n); 
    }))
  ),
  self.clients.claim(),
])
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.pathname.startsWith('/api/')) {
  return;
  }

  if (request.destination === 'style' || request.destination === 'script' || request.destination === 'font' || request.destination === 'image') {
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then((response) => {
    const clone = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
    return response;
    }))
  );
  return;
  }

  event.respondWith(
  fetch(request)
    .then((response) => {
    const clone = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
    return response;
    })
    .catch(() => 
    caches.match(request).then((cached) => cached || caches.match('/offline'))
    )
  );
});

self.addEventListener('push', (event) => {
  const data = event.data?.json() || { title: 'EgyptHub', body: 'New update available' };
  const options = {
  body: data.body,
  icon: '/assets/icon-192.png',
  badge: '/assets/icon-192.png',
  data: { url: data.url || '/' },
  };
  event.waitUntil(
  self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
  clients.matchAll({ type: 'window' }).then((windowClients) => {
    const client = windowClients.find((c) => c.url === url && 'focus' in c);
    if (client) return client.focus();
    return clients.openWindow(url);
  })
  );
});
