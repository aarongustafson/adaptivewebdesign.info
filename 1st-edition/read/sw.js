"use strict";

/* A version number is useful when updating the worker logic,
   allowing you to remove outdated cache entries during the update.
*/
var version = 'v2::';

/* These resources will be downloaded and cached by the service worker
   during the installation process. If any resource fails to be downloaded,
   then the service worker won't be installed either.
*/
var awd1e_assets = [
  '/1st-edition/read/',
	'/1st-edition/read/index.html',
	'/1st-edition/read/foreword.html',
	'/1st-edition/read/chapter-1.html',
	'/1st-edition/read/chapter-2.html',
	'/1st-edition/read/chapter-3.html',
	'/1st-edition/read/chapter-4.html',
	'/1st-edition/read/chapter-5.html',
	'/1st-edition/read/chapter-6.html',
	'/1st-edition/read/back.html',
	'/1st-edition/read/checklist.pdf',
	'/1st-edition/read/FanwoodText-Italic.otf',
	'/1st-edition/read/FanwoodText.otf',
	'/1st-edition/read/Inconsolata.otf',
	'/1st-edition/read/League-Gothic.otf',
	'/1st-edition/read/OstrichSans-Black.otf',
	'/1st-edition/read/OstrichSans-Medium.otf',
	'/1st-edition/read/template.css',
	'/1st-edition/read/images/Aaron-Gustafson.jpg',
	'/1st-edition/read/images/Ch1-1.jpg',
	'/1st-edition/read/images/Ch1-2.jpg',
	'/1st-edition/read/images/Ch1-3.jpg',
	'/1st-edition/read/images/Ch1-4.jpg',
	'/1st-edition/read/images/Ch2-1.jpg',
	'/1st-edition/read/images/Ch2-2.jpg',
	'/1st-edition/read/images/Ch2-3.jpg',
	'/1st-edition/read/images/Ch2-4.jpg',
	'/1st-edition/read/images/Ch3-1.jpg',
	'/1st-edition/read/images/Ch3-2.jpg',
	'/1st-edition/read/images/Ch3-3.jpg',
	'/1st-edition/read/images/Ch3-4.jpg',
	'/1st-edition/read/images/Ch3-5.jpg',
	'/1st-edition/read/images/Ch3-6.jpg',
	'/1st-edition/read/images/Ch3-7a.jpg',
	'/1st-edition/read/images/Ch3-7b.jpg',
	'/1st-edition/read/images/Ch4-1.jpg',
	'/1st-edition/read/images/Ch4-2.jpg',
	'/1st-edition/read/images/Ch4-3.jpg',
	'/1st-edition/read/images/Ch4-4.jpg',
	'/1st-edition/read/images/Ch4-5.jpg',
	'/1st-edition/read/images/Ch4-6.jpg',
	'/1st-edition/read/images/Ch5-1.jpg',
	'/1st-edition/read/images/Ch5-2.jpg',
	'/1st-edition/read/images/back-cover.jpg',
	'/1st-edition/read/images/cover.jpg',
	'/1st-edition/read/images/easy-readers.png',
	'/1st-edition/read/videos/Ch4-5.m4v',
	'/1st-edition/read/videos/Ch4-5.ogv',
	'/1st-edition/read/videos/Ch4-5.webm',
	'/1st-edition/read/videos/Ch4-6.m4v',
	'/1st-edition/read/videos/Ch4-6.ogv',
	'/1st-edition/read/videos/Ch4-6.webm',
	'/1st-edition/read/videos/Ch5-1.m4v',
	'/1st-edition/read/videos/Ch5-1.ogv',
	'/1st-edition/read/videos/Ch5-1.webm'
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches
      .open(version + 'awd1e')
      .then(function(cache) {
        return cache.addAll(awd1e_assets);
      })
      .then(
        function() {
          console.log('Adaptive Web Design, 1st Edition saved for offline reading :-)');
        },
        function() {
          console.log('Adaptive Web Design, 1st Edition COULD NOT BE saved for offline reading :-{');
        }
      )
  );
});

self.addEventListener("fetch", function(event) {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then(function(cached) {
        var networked = fetch(event.request)
          .then(fetchedFromNetwork, unableToResolve)
          .catch(unableToResolve);

        return cached || networked;

        function fetchedFromNetwork(response) {
          var cacheCopy = response.clone();
          caches
            .open(version + 'pages')
            .then(function add(cache) {
              cache.put(event.request, cacheCopy);
            });
          return response;
        }

        function unableToResolve () {
          return new Response('/1st-edition/read/<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: '/1st-edition/read/Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          });
        }
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (key) {
              return !key.startsWith(version);
            })
            .map(function (key) {
              return caches.delete(key);
            })
        );
      })
  );
});