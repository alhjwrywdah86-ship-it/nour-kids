var C="nour-v2";
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(["./","index.html","manifest.json"])}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}));self.clients.claim()});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;
if(r.mode==="navigate"){e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)});return res}).catch(function(){return caches.match(r).then(function(m){return m||caches.match("index.html")})}));return}
e.respondWith(caches.match(r).then(function(m){return m||fetch(r).then(function(res){if(res.ok&&new URL(r.url).origin===location.origin){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)})}return res})}))});
