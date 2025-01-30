// serviceWorker.js

const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/css/main.css', // بسته به مسیر فایل CSS شما
  '/static/js/bundle.js', // بسته به مسیر فایل JS شما
  // دیگر فایل‌هایی که می‌خواهید کش کنید
];

// هنگام نصب Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// هنگام fetch درخواست
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});