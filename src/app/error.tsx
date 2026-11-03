"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** Chyba při vykreslení nebo serverové akci – typicky výpadek připojení v nainstalované aplikaci. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    setOffline(typeof navigator !== "undefined" && !navigator.onLine);
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl space-y-4 py-10">
      <p className="eyebrow">{offline ? "Bez připojení" : "Něco se pokazilo"}</p>
      <h1 className="text-3xl font-black tracking-tight text-ink">
        {offline ? "Jste offline" : "Tohle se nepovedlo"}
      </h1>
      <p className="text-ocel">
        {offline
          ? "Odpovědi a pokrok se ukládají na server, takže teď je nejde uložit. Jakmile budete znovu online, zkuste to prosím znovu."
          : "Omlouváme se, při načítání došlo k chybě. Zkuste to prosím znovu – pokud se to opakuje, vraťte se na přehled."}
      </p>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => reset()} className="btn-primary">
          Zkusit znovu
        </button>
        <Link href="/prehled" className="btn-secondary">
          Zpět na přehled
        </Link>
      </div>
    </div>
  );
}
