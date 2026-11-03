"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * PWA v klientovi: registrace service workeru /sw.js (jen v produkčním buildu), nabídka „Nová verze – Načíst“,
 * tlačítko „Přidat na plochu“ (beforeinstallprompt) a nápověda pro iOS Safari.
 * Navíc říká SW, které stránky si zapamatovat pro offline (klientská navigace Next.js nestahuje HTML)
 * a po odhlášení mu řekne, ať uložené stránky smaže.
 *
 * Vložte jednou do root layoutu: <PwaRegister signedIn={!!user} />
 */

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type SwMessage = { type: "SKIP_WAITING" } | { type: "CLEAR_PAGES" } | { type: "CACHE_PAGE"; url: string };

const ENABLED = process.env.NODE_ENV === "production";
const SW_URL = "/sw.js";
/** Id kořenového prvku stránky /offline (src/app/offline/page.tsx). */
const OFFLINE_PAGE_ID = "zk-offline-page";
const INSTALL_DISMISSED_KEY = "zk-pwa-install-dismissed";
const UPDATE_CHECK_MS = 30 * 60 * 1000;

const hasSw = () => typeof navigator !== "undefined" && "serviceWorker" in navigator;
const isOfflineFallback = () => document.getElementById(OFFLINE_PAGE_ID) !== null;

function postToSw(message: SwMessage) {
  navigator.serviceWorker.ready.then((reg) => reg.active?.postMessage(message)).catch(() => {});
}

function readDismissed() {
  try {
    return localStorage.getItem(INSTALL_DISMISSED_KEY) === "1";
  } catch {
    return false;
  }
}

function writeDismissed() {
  try {
    localStorage.setItem(INSTALL_DISMISSED_KEY, "1");
  } catch {
    // soukromý režim / zablokované úložiště – nápověda se příště ukáže znovu
  }
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIosSafari() {
  const ua = navigator.userAgent;
  const ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return ios && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS|GSA|FBAN|FBAV|Instagram/.test(ua);
}

export function PwaRegister({ signedIn }: { signedIn: boolean }) {
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null);
  const [iosHint, setIosHint] = useState(false);
  const reloadOnChange = useRef(false);

  // Registrace SW a sledování čekající nové verze.
  useEffect(() => {
    if (!hasSw()) return;
    const sw = navigator.serviceWorker;
    if (!ENABLED) {
      // Ve vývoji SW nechceme; odregistruje případný zbytek z produkčního buildu na stejném localhostu.
      sw.getRegistrations().then((regs) => regs.forEach((r) => r.unregister())).catch(() => {});
      return;
    }

    let active = true;
    let registration: ServiceWorkerRegistration | null = null;
    let lastCheck = Date.now();

    const onControllerChange = () => {
      if (!reloadOnChange.current) return; // první instalace (clients.claim) stránku znovu nenačítá
      reloadOnChange.current = false;
      window.location.reload();
    };
    const onVisible = () => {
      if (document.visibilityState !== "visible" || !registration || Date.now() - lastCheck < UPDATE_CHECK_MS) return;
      lastCheck = Date.now();
      registration.update().catch(() => {});
    };

    sw.addEventListener("controllerchange", onControllerChange);
    document.addEventListener("visibilitychange", onVisible);
    sw.register(SW_URL, { scope: "/", updateViaCache: "none" })
      .then((reg) => {
        if (!active) return;
        registration = reg;
        if (reg.waiting && sw.controller) setWaiting(reg.waiting);
        reg.addEventListener("updatefound", () => {
          const next = reg.installing;
          next?.addEventListener("statechange", () => {
            if (active && next.state === "installed" && sw.controller) setWaiting(next);
          });
        });
      })
      .catch((err) => console.warn("Service worker se nepodařilo zaregistrovat:", err));

    return () => {
      active = false;
      sw.removeEventListener("controllerchange", onControllerChange);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  // Po odhlášení (nebo vypršení přihlášení) smazat uložené stránky – obsahují jméno a pokrok uživatele.
  // Náhradní stránka /offline je vždy „odhlášená“, na ní nic nemažeme.
  useEffect(() => {
    if (ENABLED && hasSw() && !signedIn && !isOfflineFallback()) postToSw({ type: "CLEAR_PAGES" });
  }, [signedIn]);

  // Instalace: Chrome/Edge/Android přes beforeinstallprompt, iOS Safari jen nápovědou.
  useEffect(() => {
    if (isStandalone()) return;
    const onPrompt = (e: Event) => {
      e.preventDefault(); // místo mini-infobaru prohlížeče ukážeme vlastní nenápadné tlačítko
      if (!readDismissed()) setInstallEvent(e as InstallPromptEvent);
    };
    const onInstalled = () => {
      setInstallEvent(null);
      setIosHint(false);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    if (isIosSafari() && !readDismissed()) setIosHint(true);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const applyUpdate = () => {
    if (!waiting) return;
    reloadOnChange.current = true;
    waiting.postMessage({ type: "SKIP_WAITING" } satisfies SwMessage);
  };

  const install = async () => {
    const e = installEvent;
    if (!e) return;
    setInstallEvent(null); // prompt() jde zavolat jen jednou
    await e.prompt();
    if ((await e.userChoice).outcome === "dismissed") writeDismissed();
  };

  const dismissInstall = () => {
    writeDismissed();
    setInstallEvent(null);
    setIosHint(false);
  };

  const showInstall = signedIn && (installEvent !== null || iosHint);

  return (
    <>
      <Suspense fallback={null}>
        <RememberPage active={signedIn} />
      </Suspense>
      {(waiting || showInstall) && (
        <div className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex flex-col gap-2 sm:right-auto sm:w-96">
          {waiting && (
            <div role="status" className="card flex items-center gap-3 p-3 text-sm shadow-lg">
              <span className="flex-1 font-semibold">Nová verze je připravená</span>
              <button type="button" className="btn-primary py-1.5" onClick={applyUpdate}>
                Načíst
              </button>
            </div>
          )}
          {showInstall && (
            <div className="card flex items-center gap-3 p-3 text-sm shadow-lg">
              {installEvent ? (
                <>
                  <span className="flex-1">Mějte Zbroják po ruce jako aplikaci.</span>
                  <button type="button" className="btn-secondary py-1.5" onClick={install}>
                    Přidat na plochu
                  </button>
                </>
              ) : (
                <span className="flex-1">
                  Přidejte si Zbroják na plochu: klepněte na <strong>Sdílet</strong> <ShareIcon /> →{" "}
                  <strong>Přidat na plochu</strong>.
                </span>
              )}
              <button
                type="button"
                className="rounded-lg px-2 py-1 text-lg leading-none text-stone-500 hover:bg-stone-100"
                onClick={dismissInstall}
                aria-label="Zavřít"
              >
                ×
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

/** Řekne SW, ať si právě zobrazenou stránku uloží pro offline (SW ji stáhne jen, když nemá čerstvou kopii). */
function RememberPage({ active }: { active: boolean }) {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  useEffect(() => {
    if (!active || !ENABLED || !hasSw() || !navigator.onLine || isOfflineFallback()) return;
    postToSw({ type: "CACHE_PAGE", url: search ? `${pathname}?${search}` : pathname });
  }, [active, pathname, search]);
  return null;
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" className="inline h-4 w-4 align-[-2px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 15V3m0 0L8 7m4-4 4 4M7 10H5v11h14V10h-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
