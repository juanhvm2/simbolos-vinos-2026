importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA-1VBoP1hTjzbLSsMvqXYealszIu0y66g",
  authDomain: "simbolos-vinos-2026.firebaseapp.com",
  projectId: "simbolos-vinos-2026",
  storageBucket: "simbolos-vinos-2026.firebasestorage.app",
  messagingSenderId: "1055775891853",
  appId: "1:1055775891853:web:ba134c84b0c33905aa5dc4"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const n = payload.notification || {};
  self.registration.showNotification(n.title || '🜂 Símbolos & Vinos', {
    body: n.body || '',
    icon: 'icon.svg',
    badge: 'icon.svg'
  });
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
      for (const c of cs) { if ('focus' in c) return c.focus(); }
      return clients.openWindow('./');
    })
  );
});
