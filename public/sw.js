/*
 * Zbroják do kapsy – service worker (ručně psaný, bez závislostí).
 *
 * Při KAŽDÉ změně tohoto souboru nebo stránky /offline zvyšte VERSION – prohlížeč pak nainstaluje novou verzi,
 * PwaRegister nabídne „Nová verze je připravená – Načíst“ a precache se stáhne znovu.
 *
 * Strategie:
 *  - precache: /offline (bez cookies) + všechny její /_next/static soubory + ikony a manifest,
 *  - navigace: network-first → uložená kopie stránky → /offline,
 *  - /_next/static, fonty, ikony: stale-while-revalidate,
 *  - NIKDY se neukládá: jiné než GET požadavky (POST, server actions), RSC požadavky klientské navigace,
 *    /api/*, přihlášení/registrace, platby, účet, interaktivní stránky vyhodnocované serverem
 *    a odpovědi s přesměrováním, chybou nebo Set-Cookie.
 */

const VERSION = "2026-11-03.1";
const PREFIX = "zbrojak-";
const CACHES = {
  precache: `${PREFIX}precache-${VERSION}`,
  // Běhové cache mají vlastní verzi formátu, aby uložené stránky přežily běžnou aktualizaci SW.
  pages: `${PREFIX}pages-v1`,
  assets: `${PREFIX}assets-v1`,
  fonts: `${PREFIX}fonts-v1`,
};
const LIMITS = { pages: 60, assets: 250, fonts: 30 };
/** Kopie stránky mladší než tohle se při „zapamatování“ po klientské navigaci znovu nestahuje. */
const PAGE_FRESH_MS = 10 * 60 * 1000;

const OFFLINE_URL = "/offline";
const PRECACHE_URLS = [
  "/manifest.webmanifest",
  "/icons/icon-96.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-512.png",
  "/apple-touch-icon.png",
];
const FONT_ORIGINS = ["https://fonts.googleapis.com", "https://fonts.gstatic.com"];

/**
 * Stránky, které se nikdy neukládají (navigace na ně jdou jen na síť, offline dostanou /offline).
 * Přihlášení/registrace/odhlášení nastavují cookie jen v POST server actions, ty se neukládají nikdy;
 * prohlížeč navíc hlavičku Set-Cookie skriptům (ani SW) neukazuje, proto je hlavní pojistkou tento seznam.
 */
const NO_CACHE_PATHS = [
  "/api", // API a webhooky
  "/prihlaseni", // přihlášení
  "/registrace", // registrace
  "/platba", // návrat z platební brány
  "/ucet", // účet a nákupy
  // Interaktivní stránky – odpovědi vyhodnocuje a ukládá server, offline by po prvním kliknutí spadly.
  "/procvicovani",
  "/karticky",
  "/test",
  OFFLINE_URL, // má vlastní kopii v precache
];

const isNoCachePath = (pathname) => NO_CACHE_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));

const isStaticAsset = (url) =>
  url.pathname.startsWith("/_next/static/") ||
  url.pathname.startsWith("/icons/") ||
  /\.(?:woff2?|ttf|otf)$/.test(url.pathname) ||
  ["/apple-touch-icon.png", "/manifest.webmanifest", "/icon.svg", "/favicon.ico"].includes(url.pathname);

/** RSC payload klientské navigace Next.js – necháváme jen síti (offline Next sám přejde na plnou navigaci). */
const isRscRequest = (request, url) => request.headers.has("RSC") || url.searchParams.has("_rsc");

function isCacheablePage(response) {
  return (
    response.status === 200 &&
    response.type === "basic" &&
    !response.redirected &&
    (response.headers.get("Content-Type") || "").includes("text/html") &&
    !response.headers.has("Set-Cookie")
  );
}

async function putAndTrim(cacheName, key, response, limit) {
  try {
    const cache = await caches.open(cacheName);
    await cache.put(key, response);
    const keys = await cache.keys(); // v pořadí vložení → nejstarší první
    for (let i = 0; i < keys.length - limit; i++) await cache.delete(keys[i]);
  } catch {
    // Plná kvóta apod. – cache je jen bonus, chyba nesmí rozbít odpověď.
  }
}

/* ---------- instalace a aktivace ---------- */

async function precache() {
  const cache = await caches.open(CACHES.precache);
  // Bez cookies: náhradní stránka je pro všechny stejná a nenese údaje přihlášeného uživatele.
  const response = await fetch(new Request(OFFLINE_URL, { credentials: "omit", cache: "reload" }));
  if (!isCacheablePage(response)) throw new Error(`Stránku ${OFFLINE_URL} se nepodařilo uložit (${response.status}).`);
  const html = await response.clone().text();
  await cache.put(OFFLINE_URL, response);

  // CSS, JS a fonty, na které stránka odkazuje, aby se offline zobrazila se styly hned od první návštěvy.
  const urls = new Set(PRECACHE_URLS);
  for (const [, path] of html.matchAll(/["'(\s](?:\/_next\/)?(static\/(?:chunks|css|media)\/[^"'\s)\\<>?#]+)/g)) {
    urls.add(`/_next/${path}`);
  }
  await Promise.allSettled(
    [...urls].map(async (url) => {
      const res = await fetch(url, { credentials: "omit" });
      if (res.ok) await cache.put(url, res);
    }),
  );
}

self.addEventListener("install", (event) => {
  // skipWaiting až na pokyn z UI (zpráva SKIP_WAITING), aby se stránka nepřepnula uprostřed práce.
  event.waitUntil(precache());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set(Object.values(CACHES));
      for (const name of await caches.keys()) {
        if (name.startsWith(PREFIX) && !keep.has(name)) await caches.delete(name);
      }
      await self.clients.claim();
    })(),
  );
});

/* ---------- zprávy z PwaRegister ---------- */

/** Uloží stránku po klientské navigaci (ta stahuje jen RSC payload, ne HTML), aby fungovala offline. */
async function rememberPage(href) {
  const url = new URL(href, self.location.origin);
  url.hash = "";
  if (url.origin !== self.location.origin || isNoCachePath(url.pathname)) return;
  const cache = await caches.open(CACHES.pages);
  const cached = await cache.match(url.href, { ignoreVary: true });
  const age = cached ? Date.now() - Date.parse(cached.headers.get("Date") || "") : Infinity;
  if (age < PAGE_FRESH_MS) return;
  try {
    const response = await fetch(url.href, {
      credentials: "same-origin",
      redirect: "manual",
      headers: { Accept: "text/html" },
    });
    if (isCacheablePage(response)) await putAndTrim(CACHES.pages, url.href, response, LIMITS.pages);
  } catch {
    // offline – nic
  }
}

self.addEventListener("message", (event) => {
  if (event.origin && event.origin !== self.location.origin) return;
  const data = event.data || {};
  switch (data.type) {
    case "SKIP_WAITING":
      self.skipWaiting();
      break;
    case "CLEAR_PAGES": // odhlášení – uložené stránky obsahují údaje uživatele
      event.waitUntil(caches.delete(CACHES.pages));
      break;
    case "CACHE_PAGE":
      if (typeof data.url === "string") event.waitUntil(rememberPage(data.url));
      break;
  }
});

/* ---------- požadavky ---------- */

async function offlineFallback() {
  const cached = await caches.match(OFFLINE_URL, { cacheName: CACHES.precache });
  return (
    cached ||
    new Response("<!doctype html><meta charset=utf-8><title>Jste offline</title><p>Jste offline. Zkuste to prosím znovu.</p>", {
      status: 503,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    })
  );
}

async function networkFirstPage(event, url) {
  const { request } = event;
  const cacheable = !isNoCachePath(url.pathname);
  try {
    const response = await fetch(request);
    if (cacheable && isCacheablePage(response)) {
      event.waitUntil(putAndTrim(CACHES.pages, request.url, response.clone(), LIMITS.pages));
    }
    return response;
  } catch {
    if (cacheable) {
      const cached = await caches.match(request.url, { cacheName: CACHES.pages, ignoreVary: true });
      if (cached) return cached;
    }
    return offlineFallback();
  }
}

async function staleWhileRevalidate(event, cacheName, limit, allowOpaque) {
  const { request } = event;
  const cached = await caches.match(request); // hledá ve všech cache včetně precache
  const network = fetch(request).then((response) => {
    if (response.status === 200 || (allowOpaque && response.type === "opaque")) {
      event.waitUntil(putAndTrim(cacheName, request, response.clone(), limit));
    }
    return response;
  });
  if (cached) {
    event.waitUntil(network.catch(() => undefined));
    return cached;
  }
  return network;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  // POST, server actions (Next-Action) a vše ostatní kromě GET jde vždy rovnou na síť.
  if (request.method !== "GET" || request.headers.has("Next-Action")) return;
  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    if (FONT_ORIGINS.includes(url.origin)) {
      event.respondWith(staleWhileRevalidate(event, CACHES.fonts, LIMITS.fonts, true));
    }
    return;
  }
  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(event, url));
    return;
  }
  if (isRscRequest(request, url) || url.pathname.startsWith("/api/")) return;
  if (isStaticAsset(url)) {
    event.respondWith(staleWhileRevalidate(event, CACHES.assets, LIMITS.assets, false));
  }
});
