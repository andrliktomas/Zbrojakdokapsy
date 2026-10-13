# Zbroják do kapsy

Interaktivní učebnice pro přípravu na zkoušku odborné způsobilosti ke **zbrojnímu oprávnění** podle
zákona č. 90/2024 Sb., o zbraních a střelivu (účinný od 1. 1. 2026).

## Funkce

- **Účty** – registrace, přihlášení (heslo bcrypt, session v DB, httpOnly cookie).
- **Předplatné** – jednorázové balíčky 3 týdny / 1 / 2 / 3 měsíce přes Stripe Checkout; nový balíček navazuje na běžící.
  Ukázkové okruhy (`free: true` v `src/content/topics.ts`) jsou zdarma.
- **Výklad** po okruzích s tipy a odkazy na předpisy, **slovníček** pojmů.
- **Učební kartičky** s Leitnerovým systémem (intervaly 1–2–4–7–14 dní).
- **Procvičování** náhodných otázek s okamžitým vysvětlením; vážený výběr upřednostňuje chybované a neviděné otázky.
  Režim „slabá místa“.
- **Test nanečisto** – 30 otázek ve skladbě 17/5/5/3, 40 minut, hranice 26/30 (obecné ZO) nebo 28/30 (rozšířené ZO).
- **Gamifikace** – XP, levely, série dní, odznaky, zvládnutí okruhů, trend zlepšení/zhoršení, slabá místa, připravenost ke zkoušce.

## Spuštění

```bash
npm install
cp .env.example .env
npx prisma db push
npm run dev        # http://localhost:3000
npm test           # testy logiky gamifikace a validace obsahu
```

Bez `STRIPE_SECRET_KEY` běží aplikace v **testovacím režimu plateb** – tlačítko „Koupit“ balíček rovnou aktivuje
(jen mimo produkci).

### Stripe

1. Nastavte `STRIPE_SECRET_KEY`, `APP_URL`.
2. Webhook na `POST /api/stripe/webhook`, událost `checkout.session.completed`
   (+ `checkout.session.async_payment_succeeded`), secret do `STRIPE_WEBHOOK_SECRET`.
   Lokálně: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.
3. Aktivace je idempotentní – připíše ji webhook i návratová stránka, balíček se připíše jen jednou.

### Produkce

V `prisma/schema.prisma` změňte `provider` na `postgresql` a nastavte `DATABASE_URL`.

## Obsah

Obsah je v kódu (verzovaný v gitu), databáze drží jen pokrok uživatelů:

- `src/content/topics.ts` – okruhy,
- `src/content/data/<okruh>.ts` – lekce, slovníček, kartičky a otázky okruhu,
- `src/content/data/research-questions.json` – otázky z rešerše,
- `src/content/exam.ts` – parametry zkoušky,
- `docs/research/legislativa.md` – **rešerše legislativy se zdroji a mírou ověření**.

> ⚠️ Před ostrým spuštěním je potřeba projít body v kap. 4 rešerše („Shrnutí nejistot“) – zejména ověřit
> parametry testu v plném znění NV č. 238/2025 Sb. a čísla paragrafů v zákoně č. 90/2024 Sb.
> Otázky jsou vlastní parafráze, ne doslovné znění oficiálního souboru MV ČR.
