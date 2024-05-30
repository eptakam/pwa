/*
  Note:
      1: il est important de garder a l'esprit que le systeme avec les service workers ne prend en compte que les seconds changements cad lorsqu'on rafraichit la page.
      2: lorsqu'on rafraichi la page, cela ne laisse pas le temps au service worker de s'eteindre et de se redemarrer.
      3: donc si on veut que le nouveau service worker prenne effet immediatement, il faut faire des ajouts dans le code du service worker pour qu'il s'auto-kill et se redemarre.
      4: on remarque aussi que le nouveau service worker est installe et active il ne prend immediatement le controle de la page. Mais il est possible de le faire prendre immediatement le controle de la page en utilisant clients.claim() dans le activate event lorsque le service worker est actif.

  Attention:
      lorsque je dois retourner une reponse qui est une promesse, je dois toujours attendre. pour ce faire, je dois utiliser await.

  Le mode hors ligne:
      1: pour pouvoir afficher la page hors ligne, on utilise le cache API.
*/

const PREFIX = "V2";

// Mettre en cache les fichiers statiques (css, js, images, etc) pour pouvoir les afficher hors ligne.
// il est possible de mettre en cache tout ce qui est .css. mais il est preferable de mettre en cache uniquement les fichiers qui sont necessaires pour afficher la page hors ligne. pour que la page soit plus rapide a charger.
const CACHED_FILES = [
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
  "assets/static/style.css",
]


// Install and Activate Event
self.addEventListener("install", (event) => {
  self.skipWaiting(); // permet de forcer le nouveau service worker a s'installer et a s'activer en desactivant l'ancien.

  // event.waitUntil(): permet de mettre en attente l'installation du service worker jusqu'a ce que le code soit execute. donc c'est quand cette promesse sera executee qu'il considera l'installation comme terminee.
  // Attention: c'est une promesse directement et non une fonction qui retourne une promesse.
  event.waitUntil(
  (async () => {
    try {
      const cache = await caches.open(PREFIX); // ouverture du cache
      // await cache.add(new Request("offline.html")); // ajout de la page offline.html dans le cache
      await Promise.all(
        [...CACHED_FILES, "offline.html"].map((path) => {
          return cache.add(new Request(path)); // ajout des fichiers statiques dans le cache
        })
      );
    } catch (error) {
      console.error("Failed to open cache or add offline.html to cache: ", error);
    }
  })()
); 
  console.log(`${PREFIX} Install`);   
});

self.addEventListener("activate", (event) => {
  clients.claim(); // permet de forcer le nouveau service worker a prendre immediatement le controle de la page.

  // lorsqu'une nouvelle version du service worker est active, on supprime les anciennes versions du cache.
  // mais il faut attendre qu'elles soient toutes supprimees avant de continuer. d'ou le await.

  // Methode #1
  event.waitUntil(
    (async () => {
      const keys = await caches.keys(); // recuperation des cles des caches
      keys.forEach(async (key) => {
        if (key !== PREFIX) {
          await caches.delete(key); // suppression des caches qui ne sont pas de la version actuelle.
        }
      });
    })()
  );

  // Methode #2
  // event.waitUntil(
  //   (async () => {
  //     const keys = await caches.keys(); // recuperation des cles des caches
  //     await Promise.all(
  //       keys.map(async (key) => {
  //         if (key !== PREFIX) {
  //           await caches.delete(key); // suppression des caches qui ne sont pas de la version actuelle.
  //         }
  //       })
  //     );
  //   })()
  // );
  console.log(`${PREFIX} Active`);  
});

// Fetch Events
self.addEventListener("fetch", (event) => {
  console.log(
    `${PREFIX} Fectching : ${event.request.url}, Mode : ${event.request.mode}`
  );

  if (event.request.mode === "navigate") {
    event.respondWith(
    (async () => {
      try {
        const preloadResponse = await event.preloadResponse;

        if (preloadResponse) {
          return preloadResponse;
        }

        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (e) {
        const cache = await caches.open(PREFIX);

        // retourne la page offline.html si la requete echoue.cad si on est hors ligne.
        return await cache.match("offline.html"); 
      }      
    })()
    );
  } else if (CACHED_FILES.includes(event.request.url)) {
    // l'url de la requete est dans la liste des fichiers statiques a mettre en cache.
    event.respondWith(
      caches.match(event.request) // retourne la version mise en cahe du fichier
      // ceci arrivera lorsque l'utilisateur demandera une ressource qui est mise en cache.
    );
  }
});



