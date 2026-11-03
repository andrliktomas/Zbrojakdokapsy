"use client";

import { useEffect } from "react";

const RETRY_MS = 15_000;

/**
 * Jakmile je server znovu dostupný, načte znovu aktuální adresu (tu, kterou uživatel chtěl otevřít).
 * Událost „online“ přichází dřív, než síť opravdu funguje, proto se server nejdřív ověří požadavkem HEAD
 * (service worker ho nezachytává) a při neúspěchu se to zkouší znovu.
 */
export function OnlineReload() {
  useEffect(() => {
    let timer: number | undefined;
    let stopped = false;

    const schedule = (ms: number) => {
      window.clearTimeout(timer);
      if (!stopped) timer = window.setTimeout(probe, ms);
    };
    const probe = async () => {
      try {
        const res = await fetch("/offline", { method: "HEAD", cache: "no-store" });
        if (res.status < 500) {
          window.location.reload();
          return;
        }
      } catch {
        // pořád offline
      }
      schedule(RETRY_MS);
    };
    const onOnline = () => schedule(500);

    window.addEventListener("online", onOnline);
    schedule(RETRY_MS);
    return () => {
      stopped = true;
      window.clearTimeout(timer);
      window.removeEventListener("online", onOnline);
    };
  }, []);
  return null;
}
