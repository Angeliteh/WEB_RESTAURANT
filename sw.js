/*
SERVICE WORKER - RESTAURANTE TASTY PWA
Maneja caché, offline, notificaciones y actualizaciones automáticas
*/

const CACHE_NAME = 'restaurante-tasty-v1.2';
const STATIC_CACHE = 'static-v1.2';
const DYNAMIC_CACHE = 'dynamic-v1.2';

// Recursos críticos que se cachean inmediatamente
const STATIC_ASSETS = [
  './',
  './index.html',
  './menu.html',
  './gallery.html',
  './reservation.html',
  './contact.html',
  './manifest.json',

  // CSS
  './css/animate.css',
  './css/bootstrap.css',
  './css/flexslider.css',
  './css/icomoon.css',
  './css/style.css',
  './css/reservation-premium.css',
  './css/gallery-premium.css',

  // JavaScript
  './js/jquery.min.js',
  './js/bootstrap.min.js',
  './js/jquery.waypoints.min.js',
  './js/jquery.stellar.min.js',
  './js/jquery.flexslider-min.js',
  './js/main.js',
  './js/translations.js',
  './js/language-manager.js',
  './js/seo-manager.js',
  './js/reservation-system.js',
  './js/gallery-premium.js',

  // Imágenes críticas
  './images/gallery_1.jpeg',
  './images/gallery_2.jpeg',
  './images/gallery_8.jpeg',
  './images/hero_1.jpeg',

  // Iconos PWA
  './images/icons/icon-192x192.png',
  './images/icons/icon-512x512.png',
  
  // Fuentes
  'https://fonts.googleapis.com/css?family=Cormorant+Garamond:300,300i,400,400i,500,600i,700',
  'https://fonts.googleapis.com/css?family=Satisfy'
];

// Recursos que se cachean dinámicamente
const DYNAMIC_ASSETS = [
  './images/gallery_3.jpeg',
  './images/gallery_4.jpeg',
  './images/gallery_5.jpeg',
  './images/gallery_6.jpeg',
  './images/gallery_7.jpeg',
  './images/gallery_9.jpeg'
];

// Instalar Service Worker
self.addEventListener('install', event => {
  console.log('🔧 Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cachear recursos estáticos
      caches.open(STATIC_CACHE).then(cache => {
        console.log('📦 Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Cachear recursos dinámicos
      caches.open(DYNAMIC_CACHE).then(cache => {
        console.log('🖼️ Caching dynamic assets...');
        return cache.addAll(DYNAMIC_ASSETS);
      })
    ]).then(() => {
      console.log('✅ Service Worker: Installation complete');
      // Forzar activación inmediata
      return self.skipWaiting();
    }).catch(error => {
      console.error('❌ Service Worker: Installation failed', error);
    })
  );
});

// Activar Service Worker
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker: Activating...');
  
  event.waitUntil(
    // Limpiar cachés antiguos
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker: Activation complete');
      // Tomar control inmediato de todas las páginas
      return self.clients.claim();
    })
  );
});

// Interceptar requests (estrategia Cache First con Network Fallback)
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Solo manejar requests HTTP/HTTPS
  if (!request.url.startsWith('http')) return;
  
  // Estrategia específica por tipo de recurso
  if (isStaticAsset(request.url)) {
    // Recursos estáticos: Cache First
    event.respondWith(cacheFirst(request));
  } else if (isImageRequest(request)) {
    // Imágenes: Cache First con fallback
    event.respondWith(cacheFirstWithFallback(request));
  } else if (isPageRequest(request)) {
    // Páginas HTML: Network First con Cache Fallback
    event.respondWith(networkFirstWithCache(request));
  } else {
    // Otros recursos: Network First
    event.respondWith(networkFirst(request));
  }
});

// Estrategia Cache First
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    // Cachear la respuesta si es exitosa
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache First failed:', error);
    return new Response('Offline - Content not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Estrategia Cache First con Fallback
async function cacheFirstWithFallback(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback para imágenes
    const fallbackImage = await caches.match('/images/gallery_1.jpeg');
    return fallbackImage || new Response('Image not available offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Estrategia Network First con Cache
async function networkFirstWithCache(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', request.url);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback para páginas
    return getOfflinePage();
  }
}

// Estrategia Network First
async function networkFirst(request) {
  try {
    return await fetch(request);
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Resource not available offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Página offline personalizada
async function getOfflinePage() {
  const offlineHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Offline - Restaurante Tasty</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
          color: white;
          margin: 0;
          padding: 20px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .offline-container {
          max-width: 500px;
          padding: 40px;
          background: rgba(255,255,255,0.1);
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(234, 39, 45, 0.3);
        }
        h1 { color: #ea272d; font-size: 2.5em; margin-bottom: 20px; }
        p { font-size: 1.2em; line-height: 1.6; margin-bottom: 30px; }
        .retry-btn {
          background: #ea272d;
          color: white;
          padding: 15px 30px;
          border: none;
          border-radius: 25px;
          font-size: 1.1em;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .retry-btn:hover {
          background: #c21e24;
          transform: translateY(-2px);
        }
        .offline-icon {
          font-size: 4em;
          margin-bottom: 20px;
          opacity: 0.7;
        }
      </style>
    </head>
    <body>
      <div class="offline-container">
        <div class="offline-icon">📶</div>
        <h1>Sin Conexión</h1>
        <p>No hay conexión a internet en este momento. Algunas funciones pueden estar limitadas, pero puedes seguir navegando por el contenido que ya has visitado.</p>
        <button class="retry-btn" onclick="window.location.reload()">
          Reintentar Conexión
        </button>
        <p style="margin-top: 30px; font-size: 0.9em; opacity: 0.8;">
          <strong>Restaurante Tasty</strong><br>
          +52 55 5555-0123
        </p>
      </div>
    </body>
    </html>
  `;
  
  return new Response(offlineHTML, {
    headers: { 'Content-Type': 'text/html' }
  });
}

// Utilidades para clasificar requests
function isStaticAsset(url) {
  return url.includes('.css') || 
         url.includes('.js') || 
         url.includes('fonts.googleapis.com') ||
         url.includes('/js/') ||
         url.includes('/css/');
}

function isImageRequest(request) {
  return request.destination === 'image' || 
         request.url.includes('.jpg') || 
         request.url.includes('.jpeg') || 
         request.url.includes('.png') || 
         request.url.includes('.gif') || 
         request.url.includes('.webp');
}

function isPageRequest(request) {
  return request.mode === 'navigate' || 
         request.destination === 'document' ||
         request.url.includes('.html');
}

// Manejar notificaciones push
self.addEventListener('push', event => {
  console.log('📬 Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'Nueva promoción disponible en Restaurante Tasty',
    icon: '/images/icons/icon-192x192.png',
    badge: '/images/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/'
    },
    actions: [
      {
        action: 'view',
        title: 'Ver Promoción',
        icon: '/images/icons/icon-72x72.png'
      },
      {
        action: 'close',
        title: 'Cerrar'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Restaurante Tasty', options)
  );
});

// Manejar clicks en notificaciones
self.addEventListener('notificationclick', event => {
  console.log('🔔 Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  }
});

// Sincronización en background
self.addEventListener('sync', event => {
  console.log('🔄 Background sync triggered');
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Aquí puedes sincronizar datos cuando se recupere la conexión
  console.log('🔄 Performing background sync...');
}

console.log('🚀 Service Worker loaded successfully');
