// sw.js - service worker AurionFlow (taruh di root repo aurionflow)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data.json(); } catch (_) { d = { title: 'AurionFlow', body: e.data ? e.data.text() : '' }; }
  const o = { body: d.body || '', icon: d.icon || 'icon.png', badge: d.icon || 'icon.png' };
  if (d.tag) { o.tag = d.tag; o.renotify = true; }
  e.waitUntil(self.registration.showNotification(d.title || 'AurionFlow', o));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(l => {
    for (const c of l) { if (c.url.indexOf('/aurionflow/') !== -1 && 'focus' in c) return c.focus(); }
    return self.clients.openWindow('./');
  }));
});
