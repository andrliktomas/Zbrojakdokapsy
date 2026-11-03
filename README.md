# Zbroják do kapsy

Interaktivní učebnice pro přípravu na zkoušku odborné způsobilosti ke **zbrojnímu oprávnění** podle
zákona č. 90/2024 Sb., o zbraních a střelivu (účinný od 1. 1. 2026). Vizuální styl „Terč“ (grafit, papír,
signální oranžová; písma Archivo a IBM Plex Mono).

## Funkce

**Učení**
- **Výklad** 10 okruhů (61 lekcí) s odkazy na paragrafy a chytáky ze zkoušky, **slovníček** (200+ pojmů),
  vlastní **technické ilustrace** (náboje, pistole, revolver, brokovnice, kulovnice) a obrázkové otázky.
- **Kartičky** s Leitnerovým systémem (intervaly 1–2–4–7–14 dní).
- **Procvičování** (400+ vlastních otázek) s okamžitým vysvětlením, režim slabých míst a **AI vysvětlení
  chyby** („Proč je to špatně?“, volitelné – viz proměnné prostředí).
- **Oficiální otázky MV** (`/otazky-mv`): soubor MV verze 15. 12. 2025 v doslovném znění se zdrojem –
  procházení, procvičování a náhodně generovaný test 17/5/5/3. Otázky s fotografiemi MV (71) jsou vynechány.
- **Test nanečisto** – 30 otázek ve skladbě 17/5/5/3, 40 minut, hranice 26/30 (obecné ZO) nebo 28/30 (rozšířené ZO).
- **Trenažér praktické části** (`/trenazer`): seřazení kroků kontroly zbraně podle přílohy č. 2 NV 238/2025,
  řešení závad (selhač s odpočtem 10 s) a „co je špatně“.
- **Plán podle termínu zkoušky** na přehledu: odpočet, denní plán podle slabých míst, odhad výsledku.

**Motivace** – XP, levely, série dní, odznaky, zvládnutí okruhů, připravenost ke zkoušce.

**Obchod** – jednorázové balíčky 3 týdny / 1 / 2 / 3 měsíce (Stripe Checkout), **skupiny pro instruktory a
střelnice** s hromadnými aktivačními kódy (`/skupiny`, `/aktivovat`) a **doporučovací program** (`/r/<kód>`).

**Web** – **instalovatelná aplikace (PWA)** s offline režimem, **články** ke zkoušce (`/clanky`), sitemap,
robots, Open Graph obrázky a strukturovaná data.

## Spuštění

```bash
npm install
cp .env.example .env
npx prisma db push      # u existující databáze případně --accept-data-loss (nové unikátní sloupce, hodnoty NULL)
npm run dev             # http://localhost:3000
npm test                # testy logiky a integrity obsahu
```

Bez `STRIPE_SECRET_KEY` běží aplikace v **testovacím režimu plateb** – tlačítko „Koupit“ balíček rovnou aktivuje
(mimo produkci; v produkčním buildu jen s `ALLOW_FAKE_PAYMENTS=1` pro ukázková nasazení).

### Proměnné prostředí

| Proměnná | Účel |
|---|---|
| `DATABASE_URL` | SQLite pro vývoj; v produkci PostgreSQL (změnit `provider` v `prisma/schema.prisma`). |
| `APP_URL` | Veřejná adresa – návrat ze Stripe, kanonické URL, sitemap, odkazy na doporučení. **V produkci nutné.** |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Platby (viz níže). |
| `ALLOW_FAKE_PAYMENTS` | `1` = testovací platby i v produkčním buildu (jen demo). |
| `ANTHROPIC_API_KEY` | Zapne AI vysvětlení chyb; prázdné = funkce vypnutá. |
| `ANTHROPIC_MODEL` | Výchozí `claude-opus-5-5`; levnější `claude-sonnet-5-5` / `claude-haiku-5-5`. |
| `AI_EXPLAIN_DAILY_LIMIT` | Nová AI vysvětlení na uživatele a den (výchozí 30; z cache se nepočítají). |

### Stripe

1. Nastavte `STRIPE_SECRET_KEY`, `APP_URL`.
2. Webhook na `POST /api/stripe/webhook`, událost `checkout.session.completed`
   (+ `checkout.session.async_payment_succeeded`), secret do `STRIPE_WEBHOOK_SECRET`.
   Lokálně: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.
3. Aktivace je idempotentní (balíčky i nákup aktivačních kódů) – připíše ji webhook i návratová stránka jen jednou.

### Skripty

- `node scripts/build-mv-questions.mjs <questions.json>` – vygeneruje `src/content/mv/questions.json` ze
  strojově zpracovaného souboru MV (deterministicky, opravy převodu z PDF jsou v `meta.fixes`).
- `node scripts/gen-icons.cjs .` – vykreslí ikony PWA z loga (Playwright/Chromium).
- Při změně `public/sw.js` nebo offline stránky zvyšte `VERSION` v `public/sw.js`.

## Obsah

Obsah je v kódu (verzovaný v gitu), databáze drží jen pokrok uživatelů:

- `src/content/topics.ts` – okruhy, `src/content/exam.ts` – parametry zkoušky,
- `src/content/data/<okruh>.ts` – lekce, slovníček, kartičky a otázky okruhu,
- `src/content/trainer.ts` – postupy trenažéru, `src/content/mv/` – oficiální otázky MV,
- `src/content/articles/` – články, `src/components/figures/` – ilustrace,
- `docs/research/legislativa.md` – **rešerše legislativy se zdroji a mírou ověření** (pokrytí souboru MV
  832 z 837 otázek, seznam nesouladů mezi odpověďmi MV a zákonem).

## Před ostrým spuštěním

- Jednorázově porovnat klíčová ustanovení s e-Sbírkou a opravy převodu otázek MV s PDF na mv.gov.cz.
- Právně posoudit doslovné užití souboru otázek MV (rešerše kap. 2.5) a doplnit zásady ochrany osobních
  údajů (sdílení pokroku se skupinou, doporučovací program).
- Odborně (instruktor) zkontrolovat hodnocení „neprospěl“ v trenažéru.
- Potvrdit ceny balíčků a aktivačních kódů (`src/lib/plans.ts`), fakturaci pro firmy (IČO/DIČ).
- Nastavit `APP_URL`, Stripe a případně `ANTHROPIC_API_KEY`; přejít na PostgreSQL.

> Zbroják do kapsy není oficiálním materiálem Ministerstva vnitra ani Policie ČR.
