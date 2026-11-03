# Zbrojní oprávnění 2026 – rešerše legislativy a zkoušky

Stav k: **3. 11. 2026** (revize; první verze 13. 10. 2026). Účel: podklad pro výukovou aplikaci (výklad,
kartičky, testové otázky). Přehled změn proti první verzi je v kap. 7.

## 0. Metodika a míra ověření (čtěte jako první)

**Zdroje:**

1. **Konsolidované znění předpisů z e-Sbírky** (verze účinná od 1. 1. 2026, u zákona č. 90/2024 Sb. včetně
   novel 173/2025, 220/2025 a 270/2025 Sb.). Weby e-sbirka.cz, zakonyprolidi.cz, mv.gov.cz a policie.gov.cz
   byly ze sandboxu nedostupné, proto byl text čten z veřejných strojových zrcadel otevřených dat e-Sbírky na
   GitHubu. Tři nezávislá zrcadla se ve všech ověřovaných ustanoveních shodují a nesou odkaz ELI na e-Sbírku:
   - <https://github.com/legalize-dev/legalize-cz> (`cz/SB-2024-90.md`, `cz/SB-2025-238.md`, …),
   - <https://github.com/lexifina/czechia-law> (`sb/2024/90.md`; větev `future` obsahuje vyhlášené změny
     s pozdější účinností),
   - <https://github.com/flatiocom/czech-law-md>.
2. **Oficiální soubor testových otázek MV ČR (verze 15. 12. 2025)** se správnými odpověďmi, ve strojově
   rozparsované kopii <https://github.com/zbrojak-2026/zbrojak-2026.github.io> (`data/questions.json`;
   SHA-256 zdrojového PDF `edd539ef…a04a4`). „MV ot. č. N“ = číslo otázky v tomto PDF.
3. **Webové vyhledávání** (úryvky stránek mv.gov.cz, policie.gov.cz, důvodové zprávy, odborné weby).

**Značky spolehlivosti:**
- **[OVĚŘENO-TEXT]** – doslovně ověřeno v konsolidovaném textu předpisu (zrcadlo e-Sbírky).
- **[OVĚŘENO-MV]** – potvrzuje správná odpověď v oficiálním souboru otázek MV.
- **[ČÁSTEČNĚ]** – shodují se dva nebo více sekundárních zdrojů, případně úryvek bez plného textu.
- **[NEOVĚŘENO]** – jeden sekundární zdroj nebo odvozené tvrzení.

> **Před ostrým spuštěním:** jednou ručně porovnat klíčová ustanovení (§ 18, § 19, § 20, § 24–29, § 83,
> přílohy 2 a 3) přímo na <https://www.e-sbirka.cz/eli/cz/sb/2024/90/2026-01-01>. Zrcadla jsou spolehlivá,
> ale nejsou úředním zdrojem.

---

## 1. Právní rámec a zbrojní oprávnění

### 1.1 Předpisy a novely

| Fakt | Zdroj | Stav |
|---|---|---|
| Zákon č. **90/2024 Sb., o zbraních a střelivu**, je účinný od **1. 1. 2026** a nahradil zákon č. 119/2002 Sb. | e-Sbírka (ELI `/eli/cz/sb/2024/90/2026-01-01`) | [OVĚŘENO-TEXT] |
| Souběžně platí samostatný **zákon č. 91/2024 Sb., o munici**. | MV ot. č. 236, 620 | [OVĚŘENO-MV] |
| Zákon mění jen tři novely, všechny účinné od 1. 1. 2026: **173/2025 Sb.** (doplnila do § 19 písm. d) bod 10 – neoprávněné nošení stejnokroje), **220/2025 Sb.** (doprovodný zákon: posudek pro 15leté může vydat i praktický lékař pro děti a dorost, ověřování v eZdraví, evidence ZL, nová položka 30 sazebníku poplatků) a **270/2025 Sb.** (bezúhonnost u ZL, hranice peněžitého trestu). | metadata e-Sbírky; texty novel (lexifina `sb/2025/173.md`, `220.md`, `270.md`) | [OVĚŘENO-TEXT] |
| **Od 1. 1. 2028** nabudou účinnosti body zákona 220/2025 Sb. o **identifikátoru střeliva**: každé balení střeliva ponese 1D/2D kód (§ 89 odst. 2), vznikne číselník identifikátorů (§ 133a) a zbrojní list bude obsahovat přehled převodů střeliva za 12 měsíců (§ 147). Obchodníci mají na označení zásob čas do 31. 12. 2029. | čl. XXXVI zák. 220/2025 Sb.; větev `future` | [OVĚŘENO-TEXT] |
| V roce 2026 **nebyla vyhlášena žádná novela** zákona 90/2024 Sb. ani jeho prováděcích předpisů (stav Sbírky k 28. 10. 2026). Zda je ve Sněmovně projednáván návrh, se ověřit nepodařilo (psp.cz nedostupné). | zrcadlo e-Sbírky, větve `main` a `future` | [OVĚŘENO-TEXT] / Sněmovna [NEOVĚŘENO] |
| Právo nabývat, držet a nosit zbraně je zaručeno **za podmínek stanovených zákonem o zbraních a střelivu**; právo bránit život svůj i jiného i se zbraní – čl. 6 odst. 4 LZPS (ústavní zák. 295/2021 Sb.). | MV ot. č. 1, 610, 611 | [OVĚŘENO-MV] |

### 1.2 Zbrojní průkaz → zbrojní oprávnění

| Fakt | Ustanovení | Stav |
|---|---|---|
| Fyzický zbrojní průkaz zanikl, oprávnění se vede jen v **CRZ**. U rozhodnutí o přiznání práva se písemné rozhodnutí nevyhotovuje, KŘP jen zapíše údaj do CRZ. | MV ot. č. 445 | [OVĚŘENO-MV] |
| ZO je **obecné** nebo **rozšířené**; **součástí rozšířeného je i obecné**. | § 12 odst. 1 a 2 | [OVĚŘENO-TEXT] |
| Rozšířené ZO se vyžaduje pro **a)** zkušebního komisaře, **b)** hlavního zbrojíře ZL1 nebo ZL3, **c)** **skryté nošení** zbraně podléhající registraci, **d)** osoby plnící úkoly držitele ZL podle **§ 90**. | § 12 odst. 2 | [OVĚŘENO-TEXT] |
| Prokázání oprávnění: **zbrojní list** (výstup z CRZ, § 147) s dokladem totožnosti, ověření u policie nebo držitelem ZL, evropský zbrojní pas. | § 146, § 147; MV ot. č. 433–443 | [OVĚŘENO-TEXT] |

### 1.3 Přechod starých zbrojních průkazů

**§ 150 odst. 8** [OVĚŘENO-TEXT]: „Zbrojní průkaz skupiny D nebo E … se … považuje za rozšířené zbrojní
oprávnění. Zbrojní průkaz skupiny A, B nebo C … se … považuje za obecné zbrojní oprávnění.“ Starý zákon měl
skupiny A–F; skupina F (pyrotechnický průzkum) se týkala munice. § 150 odst. 9 ukládá KŘP vyzvat dosavadní
držitele ZP k předložení lékařského posudku podle nového zákona. Soubor MV se na přechod skupin **neptá**.

### 1.4 Kategorie zbraní a střeliva (§ 4, § 7, přílohy č. 1 a 2)

Zbraně **R1–R4, PO, NO**; R1–R4 podléhají registraci, **R1 a R2 jsou zakázané**. Střelivo **S1–S4**, **S1 a S2
jsou zakázané** (§ 4; MV ot. č. 18–22). [OVĚŘENO-TEXT]

| Kat. | Typické příklady (příloha č. 2, soubor MV) | Kdo smí nakládat (§ 7) |
|---|---|---|
| **R1** | samočinné zbraně, zákeřné zbraně, zbraně zvláště účinné | ZL1; ZL2 s **výjimkou R1** na každý kus; **držiteli ZO výjimku R1 vydat nelze** (§ 46: výjimka R1/S1 jen pro ZL2). Pozn.: MV ot. č. 197 uvádí „ZL2 nebo ZL3“ – zákon v § 46 jmenuje jen ZL2, ZL3 se týká jen přechodného ustanovení § 150 odst. 24. U zkoušky volit odpověď MV. |
| **R2** | samonabíjecí se středovým zápalem s **nadlimitním zásobníkem**, samonabíjecí upravená ze samočinné, dlouhá samonabíjecí se sklopnou pažbou zkrátitelná pod 600 mm | ZL1; ZO nebo ZL2 s **výjimkou R2** (§ 48) na každý kus |
| **R3** | běžné samonabíjecí pistole; **samonabíjecí dlouhé zbraně, jejichž zásobník a nábojová komora pojmou dohromady více než 3 a nejvýše 10 nábojů**; krátké jednotlivě nabíjené se středovým zápalem; signální 26,5 mm | ZL1; ZO nebo ZL2 s **povolením R3** (§ 50) na každý kus |
| **R4** | opakovací kulovnice, malorážky, brokové kozlice a dvojky; **samonabíjecí s drážkovaným vývrtem, jejichž zásobovací ústrojí a komora pojmou nejvýše 3 náboje** a nejdou běžně upravit (MV ot. č. 530); krátké jednotlivě nabíjené s okrajovým zápalem ≥ 280 mm | ZL nebo **ZO bez dalšího povolení** |
| **PO** | poplašné a signalizační zbraně, neletální prostředky na principu palné či plynové zbraně, jedno- a dvouranové pro dělené střelivo, zbraně znehodnocené podle předpisu EU | ZO, ZL, zapsaná autorizace; ohlášení (§ 72) |
| **NO** | expanzní přístroje, historické zbraně (do 31. 12. 1890), plynové do 6,35 mm, airsoft, paintball | každá plně svéprávná zletilá osoba s pobytem v ČR |

Další definice [OVĚŘENO-MV]: krátká zbraň ≤ 600 mm celkem nebo hlaveň ≤ 300 mm; nadlimitní zásobník > 20
(krátká) / > 10 (dlouhá) nábojů; tlumič = regulovaná součást, nakládá se s ním jako s R4 (§ 9 odst. 4);
nadlimitní zásobník v režimu S2 (§ 9 odst. 5); **S2** = náboje pro krátké zbraně se střelou s **řízenou
deformací nebo fragmentací** určenou ke zvýšení ranivého účinku a svítící náboje (MV ot. č. 544, 545) –
**běžné SP náboje jsou S3** (MV ot. č. 551).

### 1.5 Podmínky zbrojního oprávnění (§ 13–20) [OVĚŘENO-TEXT]

§ 13 odst. 1: pobyt na území ČR (občanství se nevyžaduje), věk, plná svéprávnost, zdravotní způsobilost,
bezúhonnost a spolehlivost, odborná způsobilost.

- **Věk (§ 14):** obecné ZO 18 let, rozšířené 21 let, výjimečně 15 let (žák SŠ s výukou myslivosti, puškařství,
  sportovní střelby, bezpečnostně-právního oboru nebo vojenství, nebo člen sportovně-střeleckého spolku se ZL;
  písemný souhlas zákonného zástupce a školy/spolku).
- **Zdravotní způsobilost (§ 15–17, NV 351/2025 Sb.):** posudek od registrujícího poskytovatele (§ 15 odst. 5;
  u 15letých i praktický lékař pro děti a dorost), platnost **5 let** (§ 15 odst. 2), nový posudek se předkládá
  nejpozději ke dni skončení platnosti předchozího (§ 15 odst. 3), jinak lze ZO **pozastavit** (§ 21 odst. 1
  písm. b)). **Ochranné léčení / zabezpečovací detence** = nezpůsobilost (**§ 16**). **Oznamovací povinnost
  ošetřujícího lékaře** a ověření v CRZ nebo eZdraví (**§ 17**). Lhůta „posudek ne starší 90 dnů“ a „prohlídka
  nejdříve 90 dnů před koncem platnosti“ vyplývá ze zákona č. 373/2011 Sb. (MV ot. č. 91, 92).

**Bezúhonnost (§ 18)** – za bezúhonného se nepovažuje ten, kdo byl pravomocně odsouzen a od vykonání,
promlčení nebo prominutí trestu neuplynula doba:

| Druh činu a trestu | Obecně | Úmyslný čin spáchaný násilím, pohrůžkou násilí či jiné těžké újmy, nebo v souvislosti se zbraní, střelivem, municí či výbušninou (odst. 2) |
|---|---|---|
| čin, za který lze uložit **výjimečný trest** | **bez časového omezení** | – |
| úmyslný, odnětí svobody **nad 5 let** | 20 let | **30 let** |
| úmyslný, odnětí svobody **nad 2 do 5 let** | 10 let | 15 let |
| úmyslný, odnětí svobody **do 2 let** | 5 let | 10 let |
| úmyslný, **podmíněné odsouzení** (od konce zkušební doby, při osvědčení) | 3 roky | 10 let |
| úmyslný, **jiný trest** než odnětí svobody | 3 roky | 10 let |
| **nedbalostní** čin v souvislosti se zbraní, střelivem, municí nebo výbušninou | 3 roky | – |

Odsouzení v cizině se posuzuje obdobně (odst. 3); **k zahlazení se nepřihlíží** (odst. 4). Jiné nedbalostní
činy bezúhonnost nezakládají [odvozeno z textu]. Pozor: u **zapsané autorizace** se naopak k zahlazení
přihlíží (§ 55 odst. 3). Rozhodnutí, která nabyla právní moci před 1. 1. 2026, se posuzují podle starého zákona
(§ 150 odst. 7). Shoda s MV ot. č. 102–107. Formulace MV ot. č. 104 („až 30 let“) je u zkoušky správná.

**Spolehlivost (§ 19)** – za spolehlivého se nepovažuje ten:
- a) jehož trestní stíhání pro úmyslný čin (nebo nedbalostní čin se zbraní, střelivem, municí, výbušninou) bylo
  podmíněně zastaveno a od osvědčení neuplynuly 3 roky, nebo v posledních 3 letech skončilo narovnáním,
  odstoupením od stíhání mladistvého nebo upuštěním od potrestání; b) obdobně u podmíněného odložení návrhu na
  potrestání;
- c) kdo **nadměrně požívá alkohol** nebo zneužívá jiné návykové látky;
- d) kdo byl v posledních **3 letech** pravomocně uznán vinným z **více než 1 přestupku**, **pokud je s ohledem na
  povahu činů třeba jej považovat za vážné nebezpečí pro vnitřní pořádek nebo bezpečnost**, a jde-li o přestupek
  na úseku zbraní a střeliva, munice, pyrotechnického průzkumu, výbušnin; alkohol nebo návykové látky při
  činnosti ohrožující život, zdraví či majetek a odmítnutí vyšetření; proti veřejnému pořádku; proti
  občanskému soužití; proti majetku; neoprávněný lov; neoprávněné nošení stejnokroje policie, Vězeňské služby,
  ozbrojených sil nebo Vojenské policie (bod 10 doplnila novela 173/2025 Sb.);
- e) komu byl uložen **zákaz činnosti** související se zbraněmi nebo střelivem, po dobu zákazu.

Shoda s MV ot. č. 108–113 (např. ot. 109: opakované překročení rychlosti spolehlivost neovlivní).

### 1.6 Pozastavení, odnětí, zánik, kontroly

| Fakt | Ustanovení | Stav |
|---|---|---|
| Pozastavení / odnětí / zánik ZO | § 21 / § 22 / § 23 | [OVĚŘENO-TEXT] |
| Odevzdání zbraní **do 10 pracovních dnů**; nenaloží-li vlastník se zbraní **do 12 měsíců**, připadne státu | § 125 odst. 1 a 3 | [OVĚŘENO-TEXT] |
| KŘP prověří podmínky ZO **nejméně jednou za 5 let** a vyzve k předložení zbraní **alespoň jednou za 10 let** | § 145 odst. 1 a 2 | [OVĚŘENO-TEXT] |
| ZO nemá časově omezenou platnost; periodicky se dokládá jen posudek (5 let) | § 15; MV FAQ | [OVĚŘENO-TEXT] / [ČÁSTEČNĚ] |

### 1.7 Registrace a CRZ

- **CRZ** spravuje **Policejní prezidium** (§ 128 odst. 2). [OVĚŘENO-TEXT]
- Nabytí zbraně R1–R4 se ohlašuje **do 10 pracovních dnů** a zbraň se předkládá k prohlídce (§ 70 odst. 1);
  převod obdobně (§ 70 odst. 2); hlavní a vedlejší držitel (§ 71); ohlášení PO bez předložení (§ 72).
  [OVĚŘENO-TEXT]
- **NV č. 504/2025 Sb.** je **nařízení vlády** ze dne 27. 11. 2025 o zápisu a vedení údajů v CRZ a o vzorech
  některých dokumentů: formát dokumentů vkládaných do CRZ (PDF/PDF/A s uznávaným podpisem), údaje o munici,
  vzory kontrolního průkazu, **ohlášení nabytí a převodu zbraně**, zbrojního průvodního listu, evropského
  zbrojního pasu a **zbrojního listu**. Účinné od 1. 1. 2026. [OVĚŘENO-TEXT]

### 1.8 Nošení, přenechání, svěření, zabezpečení, přeprava

- **Nošení** = mít zbraň na místě veřejnosti přístupném při sobě nabitou nebo viditelně (§ 3 písm. b)). Zbraň se
  nosí **skrytě (§ 80 odst. 1)**; skryté nošení zbraně podléhající registraci vyžaduje **rozšířené ZO** (§ 80
  odst. 2, § 12 odst. 2 písm. c)); **viditelně** jen při lovu, sportu, výcviku, kulturních akcích apod.
  (**§ 81 odst. 1**). [OVĚŘENO-TEXT]
- **Přenechání** (§ 78): R4 držiteli ZO nejvýše na **30 po sobě jdoucích dnů** (§ 78 odst. 3 písm. c)).
  **Svěření** (§ 79): dohled nad svěřenou R2–R4 u osoby mladší 18 let bez ZO vykonává osoba, která **dosáhla
  věku 21 let** a je držitelem ZO **déle než 3 roky** (§ 79 odst. 3 písm. c); MV ot. č. 319). [OVĚŘENO-TEXT]
- **Zabezpečení (§ 83, technické parametry NV 187/2025 Sb.)** [OVĚŘENO-TEXT]:
  - rozhoduje počet **současně ukládaných** zbraní (odst. 2; MV ot. č. 336): **do 10** – uzamčená ocelová
    schránka/skříň nebo zvláštní zařízení; **11–20** – skříňový trezor, uzamčená místnost nebo objekt; **nad 20**
    – trezor, místnost nebo objekt chráněné **EZS** (MV ot. č. 339: komorový trezor s EZS);
  - střelivo S1–S3 obdobně: do 10 000 / 10 001–20 000 / nad 20 000 nábojů (odst. 3);
  - **„vhodným způsobem“** (odst. 4): nejvýše **2 zbraně R2–R4 nebo 1 000 nábojů S2/S3**, a to když osoba
    **celkem** nenakládá s více (MV ot. č. 341), při **dočasném uložení v obydlí** nebo **krátkodobém uložení ve
    vozidle** (MV ot. č. 340); dále krátkodobě při akci s viditelným nošením pod dohledem držitele ZO.
  - **Vozidlo** (NV 187/2025; MV ot. č. 598–602): nejvýše **4 hodiny**, max. 2 zbraně a 1 000 nábojů, zamčený
    plastový či kovový kufr nebo schránka **upevněná ke karoserii**, neotevíratelná ani neoddělitelná bez
    dílenského nářadí, zvenku ani částečně neviditelná, v části chráněné pevnou kovovou karoserií, okna zavřená,
    vozidlo zamčené, zbraň nenabitá, střelivo odděleně.
  - **Aktivní komponenty** (NV 187/2025; MV ot. č. 606, 607): fyzická osoba bez ZL smí v kterýkoli okamžik
    nakládat nejvýše s **10 kg bezdýmného prachu, 3 kg černého prachu, 15 000 zápalek pro kulové, 10 000 pro
    brokové a 15 000 perkusních zápalek**; limity se **nesčítají**.
- **Přeprava** většího množství (> 100 zbraní nebo > 200 000 nábojů) – ohlášení přes CRZ nejméně **1 hodinu
  předem** (§ 111). **Evropský zbrojní pas** 5 + 5 let (§ 102 odst. 3). [OVĚŘENO-TEXT]
- Ohlášení ztráty, odcizení a použití zbraně v nutné obraně či krajní nouzi; zákaz nabývání na dálku
  (MV ot. č. 53, 58–60). [OVĚŘENO-MV]
- **Alkohol:** nikdo nesmí **střílet nebo nosit** zbraň pod vlivem alkoholu či návykové látky (MV ot. č. 72) ani
  manipulovat se zbraní pod vlivem tak, že ohrozí život, zdraví nebo majetek jiného (MV ot. č. 71). [OVĚŘENO-MV]

### 1.9 Zbrojní licence (pro úplnost)

ZL1 podnikání, ZL2 ostatní subjekty, ZL3 jednorázová či účelová; hlavní zbrojíř (§ 39); zapsaná autorizace pro
subjekty nakládající jen s PO (MV ot. č. 157–181, 219–227). [OVĚŘENO-MV]

---

## 2. Zkouška odborné způsobilosti (ZOZ)

### 2.1 Organizace [OVĚŘENO-TEXT]

| Fakt | Ustanovení |
|---|---|
| Na úspěšné složení ZOZ je **12 měsíců** od zápisu do CRZ; ZOZ lze **jednou opakovat**; v téže lhůtě lze složit i komisionální zkoušku. Řízení o žádosti je mezitím přerušeno. | § 24 odst. 2 a 4 |
| **Komisionální zkouška**: kdo neuspěl ani při opakované ZOZ, ale **alespoň jednou uspěl v teoretické části**; přihlašuje se přes KŘP, termín určuje PP zpravidla jednou za 60 dní, koná se na střelnici vyňaté instituce. | § 24 odst. 3; § 25 odst. 4 a 5 |
| **Komise je tříčlenná**, určuje ji **Policejní prezidium** ze seznamu odborných osob vedeného MV (zástupci MV, PP, KŘP a zkušební komisaři). V komisi je vždy alespoň 1 zástupce MV, PP nebo KŘP a alespoň 1 zkušební komisař; předsedu určí PP; rozhoduje se většinou hlasů. MV ot. č. 135 tedy vyjmenovává skupiny, z nichž se komise skládá, ne čtyři členy. | § 26 odst. 3 zákona; § 26 NV 238/2025 |
| Žadatel smí být současně přihlášen jen na **1 termín** ZOZ. | § 25 odst. 1 |
| ZOZ se koná na **zapsané zkouškové střelnici**; právo ji provozovat přizná KŘP **držiteli ZL nebo nevyňaté veřejnoprávní instituci** (§ 33 odst. 1 písm. a); MV ot. č. 147). MV ot. č. 243 uvádí jen držitele ZL – u zkoušky volit odpověď MV. | § 25, § 33 |
| Zkoušky jsou **neveřejné** (§ 26 odst. 4); **dozor** KŘP, u komisionální MV nebo PP (§ 28). | § 26, § 28 |
| **Protest** jen u ZOZ, **ihned po oznámení výsledku**, s uvedením nedostatků; je-li důvodný, KŘP umožní opakovat příslušnou část. | § 29 |
| **Úhrady:** odměnu zkušebního komisaře (i u komisionální zkoušky) a náklady střelnice u komisionální zkoušky hradí **policie**; náklady na využití zapsané zkouškové střelnice u ZOZ hradí **žadatel**. | § 31 odst. 1 |
| **Zkušební komisař**: jmenuje MV na 5 let; věk 30 let, zkouška komisaře, **rozšířené ZO nejméně 3 roky**, maturita, neodvolán v posledních 5 letech. Test komisaře 57/60 za 60 minut. | § 34 odst. 1 a 5 |

Průběh podle **NV č. 238/2025 Sb.**: zákaz nedovolených pomůcek a opouštění místa (§ 9 odst. 2 – při hrubém
nebo opakovaném porušení ukončení a „neprospěl“); zdravotnický prostředek nutno ohlásit a doložit (§ 9 odst. 3);
nesmazatelné psací potřeby (§ 10); kdo neprokáže totožnost nebo je ve stavu ohrožujícím bezpečnost, není
připuštěn, ale o termín nepřichází (§ 11); losování testového souboru (§ 12 odst. 3); po odevzdání nelze opravovat
(§ 13); **právo nahlédnout do testu** po vyhlášení výsledku (§ 14 odst. 4); kdo neuspěje v teorii, praktickou
část nekoná (§ 14 odst. 5). Mobilní telefony ani pozdní příchod předpisy výslovně neupravují.

### 2.2 Teoretická část [OVĚŘENO-TEXT]

| Parametr | Hodnota | Ustanovení |
|---|---|---|
| Počet otázek, čas, hranice | **30 otázek, nejdéle 40 minut; obecné ZO ≥ 26, rozšířené ZO ≥ 28 správných** | **§ 20 odst. 3 písm. a) zákona** |
| Forma | písemný test, **1 správná ze 3 možností** | § 12 odst. 2 NV 238/2025 |
| Skladba | **17** právní předpisy (vč. ověřování zbraní a trestněprávních aspektů) + **5** nauka o zbraních a střelivu + **5** zásady bezpečného nakládání + **3** zdravotnické minimum | § 12 odst. 2 písm. a)–d) NV 238/2025 |

Staré bodové hranice podle zákona 119/2002 Sb. platily do 31. 12. 2025.

### 2.3 Praktická část [OVĚŘENO-TEXT]

- **Bezpečné nakládání** (§ 20 odst. 3 písm. b) zákona; § 17–19 a příloha č. 2 NV 238/2025): kontrola
  samonabíjecí pistole, revolveru, samonabíjecí a opakovací dlouhé kulové zbraně, závady (selhač ≥ 10 s, slabá
  rána, zádržka), příprava k rozebrání. Používají se školní náboje (§ 17 odst. 4); úkony nad rámec povinných
  postupů nejsou důvodem k „neprospěl“ (§ 18 odst. 2). Po kontrole pistole lze závěr nechat vzadu, nebo vypustit
  dopředu a provést ránu jistoty (MV ot. č. 578, 583).
- **Střelba** (§ 20 odst. 3 písm. c) zákona): kruhový terč **500 mm**, **5 ran krátkou kulovou zbraní na 10 m a 5 ran
  dlouhou kulovou zbraní na 25 m**, celkem **do 5 minut**; **obecné ZO ≥ 6 zásahů, rozšířené ZO ≥ 8 zásahů
  celkem** (za obě zbraně dohromady).
- Podle NV 238/2025: střelba vstoje, ze zdravotních důvodů vsedě (§ 22 odst. 1); **3 zkušební výstřely z každé
  zbraně** (§ 22 odst. 3); limit se přerušuje při přechodu na druhou zbraň (§ 22 odst. 4); doba odstraňování
  závady se nepočítá (§ 23); **tečný zásah se počítá** (§ 24 odst. 1); opora jen u dlouhé zbraně ze zdravotních
  důvodů (§ 21 odst. 5); zbraně u zkoušky – pistole DA/SA s kohoutem, pistole s úderníkem, revolver DA/SA,
  samonabíjecí a opakovací (otočně-odsuvný závěr) dlouhá zbraň, i v ráži .22 LR / .22 WMR, povolen kolimátor,
  optika i tlumič (§ 43); terč 50/20 nebo jiný kruh 500 mm (§ 44).

### 2.4 Poplatky [OVĚŘENO-TEXT]

| Položka | Částka | Ustanovení |
|---|---|---|
| Přijetí žádosti o vydání zbrojního oprávnění | **3 000 Kč** | položka **30 bod 1** sazebníku zák. 634/2004 Sb. (zavedena zák. 220/2025 Sb.) |
| Podání na elektronickém formuláři (Podací portál MV) | **2 400 Kč** | § 9 zák. 634/2004 Sb. – sleva 20 %, max. 1 000 Kč |
| Jmenování zkušebním komisařem | 600 Kč | položka 30 bod 2 |
| Zbrojní licence (za skupinu) / zbrojní průvodní list / evropský zbrojní pas | 3 000 / 300 / 300 Kč | položka 30 |
| Odměna komisaře (3 500 Kč paušál + 350 Kč za žadatele v teoretické a 350 Kč v praktické části) | hradí policie | § 31 zákona; § 4 NV 238/2025 |
| Použití zapsané zkouškové střelnice, lékařský posudek | hradí žadatel | § 31 zákona |

Samostatný poplatek za komisionální zkoušku ani za přechod z obecného na rozšířené ZO sazebník nezná; přechod
je pravděpodobně nová žádost (3 000 Kč) a nová ZOZ s přísnější hranicí. [NEOVĚŘENO]

### 2.5 Oficiální soubor testových otázek

| Fakt | Hodnota |
|---|---|
| Vydavatel, povinnost zveřejnit | MV; soubor otázek zpracovává a **se správnými odpověďmi zveřejňuje na svých stránkách** (§ 27 odst. 1) |
| Verze | **15. 12. 2025**, platná od 1. 1. 2026; novější verze do 2. 11. 2026 nenalezena [ČÁSTEČNĚ – mv.gov.cz nedostupné] |
| Rozcestník / PDF | <https://mv.gov.cz/zbrojni-opravneni>, <https://mv.gov.cz/soubor/mv-soubor-testovych-otazek-pro-teoretickou-cast-zkousky-odborne-zpusobilosti-a-komisionalni-zkousku.aspx> |
| Rozsah | **837 otázek**, 3 odpovědi / 1 správná, 71 otázek s obrázkem |
| Oddíly | I. zákon 1–561 (561), II. prováděcí předpisy 562–609 (48), III. jiné předpisy 610–648 (39), IV. nauka 649–799 (151, z toho 69 obrazových), V. zdravotnické minimum 800–837 (38) |

**Autorské právo a šíření** (není právní rada; doporučeno potvrdit u advokáta):
- **§ 11 odst. 3 písm. h)** zakazuje „jakkoli šířit nebo dále poskytnout **ministerstvem sestavené písemné
  testy**“ (sankce § 142, až 1 000 000 Kč při cíli získat majetkový prospěch). Zákon rozlišuje veřejný **soubor
  otázek** (§ 27 odst. 1) a **sestavené testy** (§ 27 odst. 2–4). Důvodová zpráva podle úryvku výslovně
  nevylučuje, aby školicí zařízení a weby sestavovaly z veřejného souboru vlastní cvičné testy. [OVĚŘENO-TEXT /
  důvodová zpráva ČÁSTEČNĚ]
- Soubor je s vysokou pravděpodobností **úřední dílo** (§ 3 písm. a) autorského zákona; vzniká ze zákonné
  povinnosti a zveřejňuje se ve veřejném zájmu; analogie: stanovisko MK k testům CERMAT 2017). Závazné
  rozhodnutí neexistuje. Na trhu jej doslovně přebírá řada webů a aplikací. [ČÁSTEČNĚ]
- **Doporučení:** doslovné převzetí souboru je obhajitelné, pokud aplikace uvede zdroj a verzi, znění nemění,
  nevzbuzuje dojem oficiality a **nikdy nešíří testy sestavené MV** (testy nanečisto generovat náhodně).
  Obrázkové otázky posoudit zvlášť. Aplikace zatím používá vlastní parafráze; žádná otázka není doslovnou
  kopií MV.

---

## 3. Související předpisy

### 3.1 Prováděcí předpisy (všechny NV, účinné 1. 1. 2026, v roce 2026 neměněné) [OVĚŘENO-TEXT]

| Předpis | Téma | Zmocnění |
|---|---|---|
| **NV 187/2025 Sb.** | technické požadavky pro některé zbraně, střelivo a střelnice a pro zabezpečení zbraní a střeliva (trezory, vozidlo, aktivní komponenty, znehodnocovací značky) | § 6, 61, 83, 84, 86, 93–96, 111, 113 |
| **NV 238/2025 Sb.** | provádění zkoušek; příloha č. 2 postupy manipulace | § 32, § 33 odst. 5, § 34 odst. 7 |
| **NV 351/2025 Sb.** | nemoci, vady a stavy vylučující zdravotní způsobilost, náležitosti posudku | § 15 odst. 6; § 13 odst. 6 zák. o munici |
| **NV 504/2025 Sb.** | zápis a vedení údajů v CRZ, vzory dokumentů | zák. 90/2024, 91/2024, 14/2021 |
| NV 158/2025 a 162/2025 Sb. | jen k zákonu o munici | – |

Ministerská vyhláška k zákonu 90/2024 Sb. neexistuje. **Technické a organizační požadavky na střelnice stanoví
příloha č. 3 zákona** (MV ot. č. 556), NV 187/2025 k nim doplňuje specifikace.

### 3.2 Jiné předpisy relevantní pro zkoušku

| Předpis | Obsah | Stav |
|---|---|---|
| Trestní zákoník 40/2009 Sb. – **§ 28 krajní nouze**, **§ 29 nutná obrana**, § 150 a 151 neposkytnutí pomoci, § 279 nedovolené ozbrojování | viz MV ot. č. 629, 632–648, 817 | [OVĚŘENO-TEXT] |
| Přestupky podle zák. 90/2024 (§ 142, § 143) | pokuty do 30 000 / 50 000 / 100 000 / 1 000 000 Kč, max. 5 000 000 Kč (ZL); příslušnost ORP, příkaz na místě | [OVĚŘENO-TEXT] |
| Zák. 14/2021 Sb. + NV 255/2021 Sb. | zákaz ozbrojených skupin, záloha státu | [OVĚŘENO-MV] |
| Zák. 156/2000 Sb. + vyhl. 335/2004 Sb. | ověřování zbraní, ČÚZZS, značky C.I.P. | [OVĚŘENO-MV] |
| Zák. 38/1994 a 228/2005 Sb.; 449/2001 Sb. (myslivost); 373/2011 Sb. (posudky) | dle MV ot. č. 91–93, 110, 234, 621–623 | [OVĚŘENO-MV] |

### 3.3 Zdravotnické minimum: soubor MV vs. odborná doporučení

Soubor MV je pro zkoušku rozhodující. V několika bodech se liší od obecně šířených doporučení (ERC 2021) nebo od
toho, co aplikace původně učila. Aplikace nyní učí odpovědi MV a rozdíl vysvětluje v tipu:

| Situace | Správná odpověď MV | Ot. č. |
|---|---|---|
| střelné poranění hrudníku | 155, **polosed, rána nezakrytá**; neprodyšný obvaz je chybná odpověď; jen v nezbytnosti speciální prodyšné krytí nebo krytí s chlopní | 819 |
| zlomeniny | **nedlahujeme, nezatěžujeme, nehýbeme**; horní končetina u těla nebo v šátku; dolní – volat 155 | 815, 816, 822 |
| otevřená zlomenina | 155, nehýbat; masivní krvácení zaškrcovadlo, jinak lehce přikrýt bez tlaku | 813 |
| otrava léky | 155, **pokusit se vyvolat zvracení, je-li při vědomí**, lze podat černé uhlí (odborná doporučení vyvolávání zvracení obecně nedoporučují) | 830 |
| kdy zvracení nevyvolávat | kyseliny, zásady, pěnidla | 831 |
| popálenina malé plochy | tekoucí voda **15–20 minut**, ne led, sundat šperky, sterilně překrýt | 800 |
| bezvědomí | na záda, záklon hlavy, kontrola dýchání; dýchá → 155, držet záklon; nedýchá → 155 a KPR | 805 |
| zotavovací poloha | jen dýchající v bezvědomí, **když zachránce musí odejít nebo hrozí vdechnutí** | 811 |
| KPR | **před zahájením vždy volat 155**; 30 : 2, 100–120/min, 5–6 cm | 806, 807 |

---

## 4. Stav dřívějších nejistot

| # | Nejistota (verze 13. 10. 2026) | Výsledek revize |
|---|---|---|
| 1 | Čísla § v zákoně 90/2024 Sb. | **Vyřešeno** – viz tabulka v kap. 6. Opraveny citace v aplikaci (§ 16, § 17, § 80, § 12 odst. 2). |
| 2 | Parametry testu | **Vyřešeno** – § 20 odst. 3 zákona (30 / 40 min / 26 / 28, střelba 6 / 8) a § 12 odst. 2 NV 238/2025 (3 možnosti, 17/5/5/3). |
| 3 | Obsah a účinnost novel | **Vyřešeno** – kap. 1.1; v roce 2026 žádná novela; identifikátor střeliva od 1. 1. 2028. Otevřené: návrhy ve Sněmovně. |
| 4 | Forma předpisu 504/2025 Sb. | **Vyřešeno** – nařízení vlády (kap. 1.7). |
| 5 | Lhůty bezúhonnosti | **Vyřešeno** – § 18 (kap. 1.5). |
| 6 | Složení komise | **Vyřešeno** – tříčlenná komise (kap. 2.1). |
| 7 | Autorskoprávní status souboru MV | **Částečně** – zákaz šíření sestavených testů ověřen; status úředního díla pravděpodobný, ale bez závazného rozhodnutí. Doporučeno potvrdit u advokáta. |
| 8 | Položka sazebníku | **Vyřešeno** – položka 30 bod 1, sleva podle § 9 (kap. 2.4). |

**Zbývá ověřit:** jednorázová kontrola klíčových ustanovení přímo v e-Sbírce; aktuální verze PDF souboru otázek
na mv.gov.cz; případné sněmovní návrhy novel; právní posouzení doslovného převzetí souboru otázek (vč. obrázků).

---

## 5. Taxonomie témat aplikace

| # | Slug | Kapitola | ~ot. MV |
|---|---|---|---|
| 1 | `zaklady` | Základy zákona a obecné povinnosti | 1–77 |
| 2 | `kategorie` | Kategorie zbraní, střeliva a definice | 18–54, 446–555 |
| 3 | `opravneni` | Zbrojní oprávnění, výjimky a povolení | 78–132, 157–227 |
| 4 | `zkouska` | Zkouška odborné způsobilosti | 114–156 |
| 5 | `nakladani` | Registrace, CRZ a nakládání v praxi | 268–445 |
| 6 | `strelnice` | Střelnice | 228–267, 556–561 |
| 7 | `nauka` | Nauka o zbraních a střelivu | 649–783 |
| 8 | `bezpecna-manipulace` | Bezpečné zacházení a praktická zkouška | 562–596, 784–799 |
| 9 | `trestni-pravo` | Nutná obrana, krajní nouze a související předpisy | 610–648 |
| 10 | `zdravoveda` | Zdravotnické minimum | 800–837 |

Test nanečisto: 17 (`zaklady` … `trestni-pravo`) + 5 (`nauka`) + 5 (`bezpecna-manipulace`) + 3 (`zdravoveda`),
40 minut, obecné 26/30, rozšířené 28/30.

**Pokrytí souboru MV v aplikaci** (podle čísel otázek, na které obsah odkazuje; stav 3. 11. 2026):
oddíl I 561/561, II 48/48, III 39/39, IV 146/151, V 38/38 – **celkem 832 z 837 otázek (99,4 %)**. Chybí jen
5 čistě obrazových otázek oddílu IV (674, 676, 677, 679, 680 – směr šipek a čísla dílů na fotografii, předmět
munice), jejichž pojmy výklad pokrývá textem. Obsah aplikace: 61 lekcí, 203 pojmů, 451 kartiček, 405 otázek
(vlastní parafráze).
---

## 6. Ustanovení zákona č. 90/2024 Sb. podle témat [OVĚŘENO-TEXT]

| Téma | § |
|---|---|
| nakládání, nošení (definice) | § 3 písm. a), b) |
| regulované součásti | § 2 odst. 4, § 9 |
| kategorie; kdo smí nakládat | § 4 a přílohy 1 a 2; § 7 |
| zakázané jednání (vč. šíření sestavených testů) | § 11 odst. 3 |
| druhy ZO; podmínky; věk | § 12; § 13; § 14 |
| zdravotní způsobilost; ochranné léčení; oznamovací povinnost lékaře | § 15; § 16; § 17 |
| bezúhonnost; spolehlivost; odborná způsobilost (parametry zkoušky) | § 18; § 19; § 20 |
| pozastavení; odnětí; zánik ZO | § 21; § 22; § 23 |
| zkoušky: lhůty, zkouškové střelnice, komise, soubor otázek, dozor, protest, úhrady | § 24; § 25; § 26; § 27; § 28; § 29; § 31 |
| zmocnění NV 238/2025; zapsaná zkoušková střelnice; zkušební komisař | § 32; § 33; § 34–36 |
| hlavní zbrojíř | § 39 |
| výjimka R1/S1; R2; S2 a nadlimitní zásobník; povolení R3 | § 46–47; § 48; § 49; § 50 |
| registrace a ohlášení; hlavní a vedlejší držitel; ohlášení PO | § 70; § 71; § 72 |
| evidenční soupis a evidence ZL | § 75, § 76 |
| přenechání; svěření | § 78; § 79 |
| skryté nošení; viditelné nošení | § 80; § 81 |
| zabezpečení | § 83–85 |
| označení zbraní; identifikátor střeliva (od 2028) | § 86; § 89 |
| osoby podílející se na činnosti ZL | § 90 |
| přeshraniční přemístění; evropský zbrojní pas | § 97 a násl.; § 101–107 |
| přeprava | § 110–114 (hlášení § 111) |
| odevzdání zbraní a propadnutí státu | § 125 |
| CRZ | § 128 |
| přestupky; příslušnost | § 142; § 143 |
| prokazování bezúhonnosti; prověřování podmínek | § 144; § 145 |
| prokázání oprávnění; zbrojní list | § 146; § 147 |
| přechodná ustanovení | § 150 (odst. 7 bezúhonnost, odst. 8 skupiny ZP, odst. 9 posudky) |

---

## 7. Revize 3. 11. 2026 – co se změnilo v obsahu aplikace

**Věcné chyby opravené podle souboru MV a textu zákona:**
- Zdravověda: střelné poranění hrudníku (rána nezakrytá, ne neprodyšné krytí), zlomeniny (nedlahovat), otrava
  léky (vyvolání zvracení podle MV), popáleniny (15–20 min), bezvědomí a zotavovací poloha, volání 155 před KPR.
- Kategorie: hranice R3/R4 u samonabíjecích dlouhých zbraní (> 3 až 10 nábojů včetně komory), vymezení S2.
- Nakládání: zabezpečení podle § 83 (stupně 10/20, výjimka „vhodným způsobem“), vozidlo, aktivní komponenty,
  „dosáhla 21 let“ u dohledu.
- Střelnice: technické požadavky v příloze č. 3 zákona; krytá vs. otevřená střelnice; provozovatel zkouškové
  střelnice (§ 33); kdo hradí odměnu komisaře (§ 31).
- Bezpečná manipulace: odložení pistole (závěr vzadu, nebo vpředu po ráně jistoty); alkohol (střílet a nosit);
  otázka o zastavení palby přeformulována.
- Oprávnění: plná pravidla bezúhonnosti (§ 18) a spolehlivosti (§ 19); přechod skupin A–C výslovně v zákoně.
- Zkouška: parametry s přesnými § (§ 20 odst. 3, § 12 NV), komise, pravidla průběhu a střelby podle NV 238/2025,
  poplatky (položka 30); odstraněny výhrady „ověřte aktuální znění“.
- Citace: § 16, § 17, § 21, § 80/§ 81, § 12 odst. 2, § 34 (místo MV ot. č. 154 → 149).

**Nauka o zbraních (doplněno 3. 11. 2026):** okruh `nauka` rozšířen ze 4 na 7 lekcí (hlavní části podle
zákona, rozložení pistole, funkční cykly, závorník a nosič, brokový náboj a kování, záměna ráže 20/12, typy
nábojnic, školní náboj, Flobert, dostřely podle MV, krytí a zahrdlení, lovecké názvosloví, historické zámky,
havárie zbraně, zkušební značky, pojmy ze střelnice), pojmy z 14 na 49, kartičky z 25 na 55, otázky z 18 na 54.
Okruh `bezpecna-manipulace` doplněn o zásady bezpečného zacházení z ot. č. 784–799 (+6 otázek, +5 kartiček).

**Doplnění zbývajících oblastí (3. 11. 2026):** základy a obecné povinnosti (§ 11), kategorie a práva ke
střelivu, zbrojní licence, výjimky a povolení R3, zkušební komisař, střelnice (§ 59–69, příloha č. 3),
registrace a evidence u držitelů ZL, označování zbraní, úpravy a znehodnocení, přebíjení, přeshraniční
přemístění, nález, zadržení a zajištění zbraně, státní správa a přestupky, zdravotnické minimum (mdloba,
páteř, krvácení z nosu, poleptání aj.). Drobné nesoulady MV × zákon zjištěné při psaní (učí se odpověď MV,
zákon je uveden v tipu): MV 185/186 (horní hranice pokuty u ZL), MV 197/201 (ZL3 u výjimek – opora v § 37
odst. 5), MV 384 (trvalý dovoz jen držitel ZL × § 108 odst. 1 věta druhá), MV 407 (postup při zajištění ×
§ 123 a § 15 odst. 4), MV 250 (provozní kniha 36 měsíců), MV 51/52 (nadlimitní zásobník a výjimka R2/S2).

**Doporučeno dál:** přeformulovat blízké parafráze otázek MV v `research-questions.json` (seznam v auditu: opravneni-10,
zkouska-08, strelnice-x04, kategorie-01/02/05, opravneni-04, nakladani-08, nauka-02, zdravoveda-01/03/04,
bezpecna-manipulace-02/03, zkouska-07, zaklady-x08, nakladani-x02) – nebo, po právním posouzení, nabídnout
přímo oficiální znění otázek s uvedením zdroje.

---

## 8. Hlavní zdroje

- Zákon č. 90/2024 Sb. – <https://www.e-sbirka.cz/eli/cz/sb/2024/90/2026-01-01>; zrcadla
  <https://raw.githubusercontent.com/legalize-dev/legalize-cz/HEAD/cz/SB-2024-90.md>,
  <https://raw.githubusercontent.com/lexifina/czechia-law/HEAD/sb/2024/90.md>
- NV 238/2025 Sb. – <https://www.e-sbirka.cz/eli/cz/sb/2025/238>; zrcadlo
  <https://raw.githubusercontent.com/legalize-dev/legalize-cz/HEAD/cz/SB-2025-238.md>
- NV 504/2025 Sb. – <https://www.e-sbirka.cz/eli/cz/sb/2025/504>
- Novely: <https://www.e-sbirka.cz/eli/cz/sb/2025/173>, …/2025/220, …/2025/270
- Zákon č. 634/2004 Sb. (sazebník) – <https://raw.githubusercontent.com/lexifina/czechia-law/HEAD/sb/2004/634.md>
- Trestní zákoník – <https://raw.githubusercontent.com/legalize-dev/legalize-cz/HEAD/cz/SB-2009-40.md>
- MV – Zbrojní oprávnění: <https://mv.gov.cz/zbrojni-opravneni>; Soubor testových otázek (PDF):
  <https://mv.gov.cz/soubor/mv-soubor-testovych-otazek-pro-teoretickou-cast-zkousky-odborne-zpusobilosti-a-komisionalni-zkousku.aspx>
- Strojová kopie souboru MV: <https://github.com/zbrojak-2026/zbrojak-2026.github.io>
- Důvodová zpráva k 90/2024 Sb.: <https://www.paragrafiq.cz/duvodove-zpravy/90-2024-sb>
- Stanovisko MK k testům CERMAT (analogie úředního díla):
  <https://www.eduin.cz/clanky/tiskova-zprava-ministerstvo-kultury-potvrdilo-ze-test-neni-autorske-ale-uredni-dilo/>
