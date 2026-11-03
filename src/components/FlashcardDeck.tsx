"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { reviewCard } from "@/app/actions/learning";
import type { AchievementDef } from "@/lib/gamification";
import { XpToast } from "./XpToast";
import { LogoMark } from "./Logo";

export type DeckCard = { id: string; front: string; back: string; topicTitle: string; box: number };

const BOXES = [1, 2, 3, 4, 5];

export function FlashcardDeck({ cards }: { cards: DeckCard[] }) {
  const router = useRouter();
  const [queue, setQueue] = useState(cards);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [toast, setToast] = useState<{ xp: number; unlocked: AchievementDef[] }>({ xp: 0, unlocked: [] });
  const [pending, startTransition] = useTransition();

  if (!queue.length) {
    return (
      <div className="card mx-auto max-w-lg p-6 text-center sm:p-8">
        <LogoMark size={56} detail className="mx-auto" />
        <h2 className="mt-4 text-2xl font-black tracking-tight">
          {reviewed ? "Hotovo, sada je za vámi." : "Teď nemáte nic k opakování."}
        </h2>
        {reviewed > 0 && (
          <p className="mt-1 font-mono text-sm font-semibold text-ocel">ZOPAKOVÁNO: {reviewed}</p>
        )}
        <p className="mt-3 text-stone-700">
          Kartičky se vracejí v rostoucích intervalech (<span className="num">1, 2, 4, 7 a 14</span> dní) podle
          toho, jak dobře je umíte.
        </p>
        <button className="btn-secondary mt-5" onClick={() => router.refresh()}>
          Načíst další
        </button>
        <XpToast {...toast} />
      </div>
    );
  }

  const card = queue[0];

  function answer(known: boolean) {
    startTransition(async () => {
      const res = await reviewCard(card.id, known);
      setReviewed((r) => r + 1);
      setFlipped(false);
      // Neznámou kartičku vrátíme na konec fronty, ať se v téže lekci zopakuje.
      setQueue((q) => (known ? q.slice(1) : [...q.slice(1), { ...card, box: 1 }]));
      setToast({ xp: res.xp, unlocked: res.unlocked });
      setTimeout(() => setToast({ xp: 0, unlocked: [] }), 2000);
    });
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="chip min-w-0 truncate">{card.topicTitle}</span>
        <span className="shrink-0 font-mono text-xs font-semibold text-ocel">ZBÝVÁ {queue.length}</span>
      </div>
      <div className="mb-3 flex items-center gap-2" aria-label={`Přihrádka ${card.box} z 5`} role="img">
        {BOXES.map((b) => (
          <span key={b} className={`h-1.5 flex-1 rounded-full ${b <= card.box ? "bg-ink" : "bg-line"}`} />
        ))}
        <span className="ml-1 shrink-0 font-mono text-xs font-semibold text-ocel">PŘIHRÁDKA {card.box}/5</span>
      </div>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        className={`card grid min-h-72 w-full place-items-center p-6 text-center transition-colors sm:p-10 ${
          flipped ? "ring-2 ring-ink" : "hover:ring-2 hover:ring-ink"
        }`}
      >
        {flipped ? (
          <div>
            <div className="eyebrow text-zasah">Odpověď</div>
            <p className="mt-3 text-lg leading-relaxed whitespace-pre-line">{card.back}</p>
          </div>
        ) : (
          <div>
            <div className="eyebrow">Otázka</div>
            <p className="mt-3 text-xl leading-snug font-bold sm:text-2xl">{card.front}</p>
            <p className="mt-6 text-sm text-ocel">Klepnutím kartičku otočíte</p>
          </div>
        )}
      </button>
      {flipped && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            className="btn min-h-13 border-chyba bg-white text-red-700 hover:bg-chyba-50"
            disabled={pending}
            onClick={() => answer(false)}
          >
            Ještě neumím
          </button>
          <button className="btn min-h-13 bg-zasah text-white hover:bg-zasah-700" disabled={pending} onClick={() => answer(true)}>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M3 9.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Umím
          </button>
        </div>
      )}
      <XpToast {...toast} />
    </div>
  );
}
