"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { reviewCard } from "@/app/actions/learning";
import type { AchievementDef } from "@/lib/gamification";
import { XpToast } from "./XpToast";

export type DeckCard = { id: string; front: string; back: string; topicTitle: string; box: number };

export function FlashcardDeck({ cards }: { cards: DeckCard[] }) {
  const router = useRouter();
  const [queue, setQueue] = useState(cards);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [toast, setToast] = useState<{ xp: number; unlocked: AchievementDef[] }>({ xp: 0, unlocked: [] });
  const [pending, startTransition] = useTransition();

  if (!queue.length) {
    return (
      <div className="card mx-auto max-w-lg text-center">
        <div className="text-5xl">🃏</div>
        <h2 className="mt-2 text-xl font-bold">{reviewed ? `Hotovo! Zopakováno ${reviewed} kartiček.` : "Teď nemáte nic k opakování."}</h2>
        <p className="mt-1 text-stone-600">Kartičky se vrací v rostoucích intervalech (1, 2, 4, 7 a 14 dní) podle toho, jak dobře je umíte.</p>
        <button className="btn-secondary mt-4" onClick={() => router.refresh()}>Načíst další</button>
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
      <div className="mb-2 flex justify-between text-sm text-stone-500">
        <span>{card.topicTitle}</span>
        <span>Zbývá {queue.length} · přihrádka {card.box}/5</span>
      </div>
      <button
        onClick={() => setFlipped((f) => !f)}
        className="card grid min-h-64 w-full place-items-center p-8 text-center transition hover:shadow-md"
        aria-label="Otočit kartičku"
      >
        {flipped ? (
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-600">Odpověď</div>
            <p className="whitespace-pre-line text-lg">{card.back}</p>
          </div>
        ) : (
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">Otázka</div>
            <p className="text-xl font-semibold">{card.front}</p>
            <p className="mt-4 text-sm text-stone-400">Klikněte pro otočení</p>
          </div>
        )}
      </button>
      {flipped && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button className="btn bg-red-100 text-red-800 hover:bg-red-200" disabled={pending} onClick={() => answer(false)}>Ještě neumím</button>
          <button className="btn-primary" disabled={pending} onClick={() => answer(true)}>Umím ✔</button>
        </div>
      )}
      <XpToast {...toast} />
    </div>
  );
}
