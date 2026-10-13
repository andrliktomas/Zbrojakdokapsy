import type { TopicContent } from "../types";

// Zdroj faktů: docs/research/legislativa.md (kap. 1.2, 1.6, 1.7, 1.8, 3.2).
// Čísla § uvádíme jen tam, kde je rešerše označuje jako jistá (§ 78, § 81, § 97, § 111).

const T = "nakladani";

export const content: TopicContent = {
  lessons: [
    {
      id: "nakladani-l1",
      topic: T,
      title: "Centrální registr zbraní a ohlašovací povinnosti",
      sections: [
        {
          heading: "Co je CRZ",
          paragraphs: [
            "Centrální registr zbraní (CRZ) je neveřejný informační systém veřejné správy. Jeho správcem je Policejní prezidium ČR. Vede se v něm, kdo má zbrojní oprávnění, jaké zbraně drží a další údaje.",
            "Od 1. 1. 2026 už neexistuje fyzický zbrojní průkaz. Vaše oprávnění „žije“ jen elektronicky v CRZ. Staré zbrojní průkazy ztratily platnost a není nutné je odevzdávat.",
          ],
          tip: "Správcem CRZ není Ministerstvo vnitra ani krajské ředitelství, ale Policejní prezidium ČR.",
          source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 415, 416",
        },
        {
          heading: "Jak prokážete, že máte oprávnění",
          paragraphs: [
            "Místo průkazu slouží zbrojní list. Je to ověřený výstup z CRZ, který spolu s dokladem totožnosti prokazuje vaše oprávnění. Získáte ho zdarma na Portálu veřejné správy (přihlášení přes eIdentitu), případně na KŘP nebo na Czech POINT. Zbrojní list nemá omezenou platnost.",
          ],
          bullets: [
            "zbrojní list + doklad totožnosti,",
            "ověření přímo u KŘP nebo Policejního prezidia,",
            "ověření v CRZ, které provede držitel zbrojní licence (např. prodejce),",
            "evropský zbrojní pas.",
          ],
          tip: "Při vydání zbrojního oprávnění, licence nebo registraci zbraně se písemné rozhodnutí nevyhotovuje. KŘP jen zapíše údaj do CRZ.",
          source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 433–443, 445",
        },
        {
          heading: "Nabytí a převod zbraně – 10 pracovních dnů",
          paragraphs: [
            "Když nabudete zbraň podléhající registraci (R1–R4), musíte to ohlásit krajskému ředitelství policie do 10 pracovních dnů ode dne, kdy jste se zbraní začali nakládat. Zbraň zároveň předložíte k prohlídce označení a technického stavu.",
            "Převod zbraně se hlásí rovněž do 10 pracovních dnů. U zbraní kategorie PO (zbraně podléhající ohlášení, např. poplašné) stačí ohlášení do 10 pracovních dnů, zbraň se nepředkládá.",
            "Podání můžete udělat u kteréhokoli KŘP. Pro samotné řízení o zbrojním oprávnění je ale místně příslušné KŘP podle místa vašeho pobytu.",
          ],
          tip: "Lhůta je v PRACOVNÍCH dnech, ne v kalendářních. A u PO se zbraň k prohlídce nepředkládá.",
          source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 268–273, 283, 286, 421–423",
        },
        {
          heading: "Hlavní a vedlejší držitel",
          paragraphs: [
            "Hlavní držitel je osoba, které byla zbraň zaregistrována. Na jeho žádost lze zapsat jednoho nebo více vedlejších držitelů – například partnera, se kterým zbraň sdílíte.",
            "Vedlejší držitel musí se zápisem souhlasit a musí být oprávněn se zbraní nakládat. U zbraně R3 tedy potřebuje i vlastní povolení R3.",
          ],
          source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 276–281",
        },
        {
          heading: "Pravidelné kontroly",
          bullets: [
            "Zbrojní oprávnění nemá časově omezenou platnost, zdravotní posudek se ale dokládá každých 5 let.",
            "KŘP prověří, zda splňujete podmínky oprávnění, nejméně jednou za 5 let.",
            "KŘP vás vyzve k předložení držených zbraní alespoň jednou za 10 let.",
          ],
          source: "soubor MV ot. č. 90, 431, 432",
        },
      ],
    },
    {
      id: "nakladani-l2",
      topic: T,
      title: "Nošení, přenechání a svěření zbraně",
      sections: [
        {
          heading: "Kdy zbraň „nosíte“",
          paragraphs: [
            "Nošení zbraně má v zákoně přesný význam: zbraň máte na místě veřejnosti přístupném při sobě nabitou nebo viditelně. Pokud jen převážíte nenabitou dlouhou zbraň v neprůhledném pouzdře, zbraň podle zákona nenosíte.",
          ],
          tip: "Stačí jedna z podmínek: buď nabitá, nebo viditelná. Nenabitá pistole viditelně na opasku je tedy také nošení.",
          source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 15, 16",
        },
        {
          heading: "Skrytě, nebo viditelně?",
          paragraphs: [
            "Zbraň se obecně nosí skrytě. Viditelně ji smíte nosit jen při akcích, kde je to přirozené – například při lovu, sportovní střelbě, výcviku, kulturních akcích nebo rekonstrukcích bitev.",
            "Pro skryté nošení zbraně podléhající registraci k ochraně života, zdraví a majetku potřebujete rozšířené zbrojní oprávnění.",
          ],
          source: "§ 81 zákona č. 90/2024 Sb.; soubor MV ot. č. 80, 322–328",
        },
        {
          heading: "Přenechání – samostatné nakládání",
          paragraphs: [
            "Přenechání znamená, že někomu dočasně umožníte se zbraní samostatně nakládat (bez vašeho dohledu). Zbraň R4 můžete přenechat držiteli zbrojního oprávnění nejvýše na 30 po sobě jdoucích dnů.",
          ],
          tip: "Kdo zbraň dostal přenechanou, nesmí ji přenechat dál dalšímu člověku.",
          source: "§ 78 zákona č. 90/2024 Sb.; soubor MV ot. č. 304–309",
        },
        {
          heading: "Svěření – pod dohledem",
          paragraphs: [
            "Svěření znamená, že druhý se zbraní nakládá pod dohledem oprávněné osoby – typicky na střelnici.",
            "Pokud jde o zbraň R2–R4 svěřenou osobě mladší 18 let bez zbrojního oprávnění, dohled smí vykonávat jen osoba starší 21 let, která je držitelem zbrojního oprávnění déle než 3 roky.",
          ],
          tip: "Zapamatujte si dvojici čísel 21 let a 3 roky.",
          source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 314–319",
        },
      ],
    },
    {
      id: "nakladani-l3",
      topic: T,
      title: "Zabezpečení, vozidlo, přeprava a cesty do zahraničí",
      sections: [
        {
          heading: "Zabezpečení doma",
          paragraphs: [
            "Podrobnosti zabezpečení stanoví nařízení vlády č. 187/2025 Sb. Rozhoduje počet zbraní a střeliva, které ukládáte současně na jednom místě, nikoli kolik zbraní máte celkem registrováno.",
          ],
          bullets: [
            "nejvýše 2 zbraně R2–R4 a 1 000 nábojů S2 nebo S3: stačí zabezpečení „vhodným způsobem“,",
            "více zbraní: platí technické požadavky nařízení vlády (trezory podle počtu),",
            "více než 20 zbraní: komorový trezor s elektronickou zabezpečovací signalizací (EZS).",
          ],
          tip: "Chyták: rozhoduje počet SOUČASNĚ ukládaných zbraní, ne celkový počet zbraní v registru.",
          source: "NV č. 187/2025 Sb.; soubor MV ot. č. 336–341",
        },
        {
          heading: "Zbraň ve vozidle",
          paragraphs: [
            "Ve vozidle je možné jen krátkodobé uložení, nejvýše 4 hodiny. Zbraň musí být v uzamčeném kufru pevně spojeném s karoserií, mimo dohled, nenabitá a střelivo uložené odděleně. Dlouhodobé uložení ve vozidle zákon nepřipouští.",
          ],
          source: "NV č. 187/2025 Sb.; soubor MV ot. č. 598–602",
        },
        {
          heading: "Aktivní komponenty (přebíjení)",
          paragraphs: [
            "Pro skladování aktivních komponentů platí obecné limity, například nejvýše 10 kg bezdýmného prachu a 3 kg černého prachu.",
          ],
          source: "NV č. 187/2025 Sb.; soubor MV ot. č. 606",
        },
        {
          heading: "Přeprava většího množství",
          paragraphs: [
            "Přepravu více než 100 zbraní nebo více než 200 000 nábojů je nutné ohlásit přes CRZ nejméně 1 hodinu předem. Běžný převoz pár zbraní na střelnici se takto nehlásí.",
          ],
          source: "§ 111 zákona č. 90/2024 Sb.; soubor MV ot. č. 385–387",
        },
        {
          heading: "Evropský zbrojní pas",
          paragraphs: [
            "Evropský zbrojní pas se vydává na 5 let a lze ho prodloužit o dalších 5 let. Slouží k dočasnému přemístění zbraně do jiného státu EU, například kvůli lovu nebo sportovní střelbě.",
          ],
          source: "§ 97 a násl. zákona č. 90/2024 Sb.; soubor MV ot. č. 375–379",
        },
      ],
    },
    {
      id: "nakladani-l4",
      topic: T,
      title: "Povinnosti, ztráta oprávnění a přestupky",
      sections: [
        {
          heading: "Co musíte ohlásit neprodleně",
          paragraphs: [
            "Každý musí neprodleně ohlásit Policii ČR ztrátu nebo odcizení zbraně podléhající registraci nebo zbraně PO. Stejně tak musí neprodleně ohlásit použití zbraně k ostré střelbě v nutné obraně nebo krajní nouzi.",
            "Nález zbraně je nutné neprodleně oznámit policii. Pokud zbraň najdete ve vojenském objektu, oznamujete to Vojenské policii.",
          ],
          tip: "U ztráty, odcizení, nálezu a použití v nutné obraně neplatí lhůta 10 pracovních dnů – musíte jednat neprodleně.",
          source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 58–60, 389, 390",
        },
        {
          heading: "Zákaz nákupu na dálku",
          paragraphs: [
            "Zbraně kategorií R1–R4 a PO, palné zbraně kategorie NO a střelivo nelze nabývat na dálku – tedy například objednat z e-shopu s doručením. Předání musí proběhnout osobně.",
          ],
          source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 53",
        },
        {
          heading: "Pozastavení nebo zánik oprávnění",
          paragraphs: [
            "Pokud vám bylo zbrojní oprávnění pozastaveno nebo zaniklo, musíte do 10 pracovních dnů odevzdat zbraně a střelivo KŘP, případně umožnit jejich převzetí či zabezpečení.",
            "Pokud vlastník se zbraní nenaloží (např. ji neprodá oprávněné osobě) do 12 měsíců, zbraň připadne státu.",
          ],
          tip: "Odvolání proti pozastavení nebo odnětí oprávnění nemá odkladný účinek – zbraně musíte odevzdat i tehdy, když se odvoláte.",
          source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 121, 124, 411, 414",
        },
        {
          heading: "Přestupky a pokuty",
          paragraphs: [
            "Přestupky držitele zbrojního oprávnění projednává obecní úřad obce s rozšířenou působností. Policista může uložit pokutu příkazem na místě. Kromě pokuty lze uložit i propadnutí věci.",
          ],
          bullets: [
            "fyzická osoba obecně: pokuta do 30 000 Kč,",
            "při opakování: do 50 000 Kč,",
            "při zvlášť hrubém ohrožení života nebo zdraví: do 100 000 Kč,",
            "pokud byl cílem majetkový prospěch: do 1 000 000 Kč,",
            "nejvyšší sazba zákona (držitel zbrojní licence): do 5 000 000 Kč.",
          ],
          source: "zákon č. 90/2024 Sb., přestupky; soubor MV ot. č. 426–430, 631",
        },
      ],
    },
  ],

  glossary: [
    { term: "Centrální registr zbraní (CRZ)", topic: T, definition: "Neveřejný informační systém veřejné správy s údaji o oprávněních a zbraních. Spravuje ho Policejní prezidium ČR.", source: "soubor MV ot. č. 415, 416" },
    { term: "Zbrojní list", topic: T, definition: "Ověřený výstup z CRZ, který spolu s dokladem totožnosti prokazuje zbrojní oprávnění. Je zdarma a nemá omezenou platnost.", source: "soubor MV ot. č. 433–443" },
    { term: "Hlavní držitel", topic: T, definition: "Osoba, které byla zbraň zaregistrována.", source: "soubor MV ot. č. 276" },
    { term: "Vedlejší držitel", topic: T, definition: "Osoba zapsaná ke zbrani na žádost hlavního držitele a se svým souhlasem. Musí být oprávněna se zbraní nakládat.", source: "soubor MV ot. č. 277–281" },
    { term: "Nošení zbraně", topic: T, definition: "Mít zbraň na místě veřejnosti přístupném při sobě nabitou nebo viditelně.", source: "soubor MV ot. č. 15" },
    { term: "Přenechání zbraně", topic: T, definition: "Dočasné umožnění samostatně nakládat se zbraní. Zbraň R4 lze držiteli ZO přenechat nejvýše na 30 po sobě jdoucích dnů.", source: "§ 78 zákona č. 90/2024 Sb." },
    { term: "Svěření zbraně", topic: T, definition: "Nakládání se zbraní pod dohledem oprávněné osoby, např. při výcviku na střelnici.", source: "soubor MV ot. č. 314–319" },
    { term: "Zabezpečení „vhodným způsobem“", topic: T, definition: "Nejmírnější úroveň zabezpečení. Stačí při současném uložení nejvýše 2 zbraní R2–R4 a 1 000 nábojů S2/S3.", source: "NV č. 187/2025 Sb.; soubor MV ot. č. 340" },
    { term: "Evropský zbrojní pas", topic: T, definition: "Doklad pro dočasné přemístění zbraně do jiného státu EU. Vydává se na 5 let s možností prodloužení o 5 let.", source: "§ 97 a násl. zákona č. 90/2024 Sb." },
    { term: "Nabývání na dálku", topic: T, definition: "Nákup bez osobního předání (např. e-shop se zásilkou). Je zakázané u zbraní R1–R4, PO, palných NO a u střeliva.", source: "soubor MV ot. č. 53" },
  ],

  flashcards: [
    { id: "nakladani-k01", topic: T, front: "Kdo je správcem CRZ?", back: "Policejní prezidium ČR." },
    { id: "nakladani-k02", topic: T, front: "Lhůta pro ohlášení nabytí zbraně R1–R4", back: "Do 10 pracovních dnů ode dne, kdy jste se zbraní začali nakládat. Zbraň se předkládá k prohlídce." },
    { id: "nakladani-k03", topic: T, front: "Nabytí zbraně PO – co a kdy?", back: "Ohlásit do 10 pracovních dnů. Zbraň se k prohlídce nepředkládá." },
    { id: "nakladani-k04", topic: T, front: "U kterého KŘP lze podat ohlášení nebo registraci?", back: "U kteréhokoli KŘP. Řízení o ZO vede KŘP podle místa pobytu." },
    { id: "nakladani-k05", topic: T, front: "Platnost zbrojního listu", back: "Není omezená. Je zdarma (Portál veřejné správy, KŘP, Czech POINT)." },
    { id: "nakladani-k06", topic: T, front: "Podmínky pro vedlejšího držitele", back: "Zápis na žádost hlavního držitele, vlastní souhlas a oprávnění se zbraní nakládat (u R3 povolení R3)." },
    { id: "nakladani-k07", topic: T, front: "Nošení zbraně = ?", back: "Mít ji na místě veřejnosti přístupném při sobě nabitou NEBO viditelně." },
    { id: "nakladani-k08", topic: T, front: "Nenabitá dlouhá zbraň v neprůhledném pouzdře", back: "Podle zákona se nenosí." },
    { id: "nakladani-k09", topic: T, front: "Kdy smíte nosit zbraň viditelně?", back: "Jen při akcích typu lov, sport, výcvik, kultura, rekonstrukce bitev (§ 81). Jinak skrytě." },
    { id: "nakladani-k10", topic: T, front: "Maximální doba přenechání zbraně R4 držiteli ZO", back: "30 po sobě jdoucích dnů (§ 78). Dál se přenechat nesmí." },
    { id: "nakladani-k11", topic: T, front: "Dohled nad svěřenou zbraní u osoby mladší 18 let bez ZO", back: "Osoba starší 21 let, držitel ZO déle než 3 roky." },
    { id: "nakladani-k12", topic: T, front: "Limit pro zabezpečení „vhodným způsobem“", back: "Nejvýše 2 zbraně R2–R4 a 1 000 nábojů S2/S3 uložené současně." },
    { id: "nakladani-k13", topic: T, front: "Od kolika zbraní je nutný komorový trezor s EZS?", back: "Při více než 20 současně ukládaných zbraních." },
    { id: "nakladani-k14", topic: T, front: "Krátkodobé uložení zbraně ve vozidle", back: "Nejvýše 4 hodiny, uzamčený kufr pevně spojený s karoserií, mimo dohled, nenabitá, střelivo odděleně." },
    { id: "nakladani-k15", topic: T, front: "Limity prachu (obecně)", back: "10 kg bezdýmného prachu, 3 kg černého prachu." },
    { id: "nakladani-k16", topic: T, front: "Kdy a jak hlásit přepravu?", back: "Více než 100 zbraní nebo 200 000 nábojů – přes CRZ nejméně 1 hodinu předem (§ 111)." },
    { id: "nakladani-k17", topic: T, front: "Platnost evropského zbrojního pasu", back: "5 let, lze prodloužit o dalších 5 let." },
    { id: "nakladani-k18", topic: T, front: "Ztráta nebo odcizení zbraně", back: "Neprodleně ohlásit Policii ČR." },
    { id: "nakladani-k19", topic: T, front: "Nález zbraně", back: "Neprodleně oznámit policii (ve vojenském objektu Vojenské policii)." },
    { id: "nakladani-k20", topic: T, front: "Pozastavení nebo zánik ZO – zbraně?", back: "Do 10 pracovních dnů odevzdat KŘP nebo umožnit převzetí. Když vlastník nenaloží do 12 měsíců, zbraň připadne státu." },
    { id: "nakladani-k21", topic: T, front: "Jak často KŘP prověřuje podmínky ZO?", back: "Nejméně jednou za 5 let." },
    { id: "nakladani-k22", topic: T, front: "Jak často KŘP vyzve k předložení zbraní?", back: "Alespoň jednou za 10 let." },
    { id: "nakladani-k23", topic: T, front: "Základní pokuta pro fyzickou osobu", back: "Do 30 000 Kč (opakování 50 000, hrubé ohrožení 100 000, majetkový prospěch 1 000 000 Kč)." },
    { id: "nakladani-k24", topic: T, front: "Kdo projednává přestupky držitele ZO?", back: "Obecní úřad obce s rozšířenou působností; policista může uložit příkaz na místě." },
  ],

  questions: [
    {
      id: "nakladani-x01", topic: T,
      question: "Pořídili jste si poplašnou zbraň kategorie PO. Jakou máte povinnost?",
      options: [
        "Do 10 pracovních dnů ji ohlásit, zbraň se k prohlídce nepředkládá.",
        "Do 10 pracovních dnů ji ohlásit a předložit k prohlídce.",
        "Žádnou, zbraně PO se nikam nehlásí.",
      ],
      correct: 0,
      explanation: "U zbraní PO stačí ohlášení do 10 pracovních dnů. Předložení k prohlídce označení a technického stavu se vyžaduje u zbraní podléhajících registraci (R1–R4).",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 283, 286",
    },
    {
      id: "nakladani-x02", topic: T,
      question: "Kdo spravuje Centrální registr zbraní?",
      options: [
        "Ministerstvo vnitra ČR",
        "Policejní prezidium ČR",
        "Český úřad pro zkoušení zbraní a střeliva",
      ],
      correct: 1,
      explanation: "CRZ je neveřejný informační systém veřejné správy a jeho správcem je Policejní prezidium ČR.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 415, 416",
    },
    {
      id: "nakladani-x03", topic: T,
      question: "Kdo může být zapsán jako vedlejší držitel vaší pistole kategorie R3?",
      options: [
        "Kterýkoli zletilý člověk, pokud s tím hlavní držitel souhlasí.",
        "Pouze člen domácnosti hlavního držitele.",
        "Osoba, která se zápisem souhlasí a je oprávněna se zbraní nakládat, tedy má i povolení R3.",
      ],
      correct: 2,
      explanation: "Vedlejší držitel se zapisuje na žádost hlavního držitele a se svým souhlasem. Musí být oprávněn se zbraní nakládat – u zbraně R3 to znamená mít povolení R3.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 276–281",
    },
    {
      id: "nakladani-x04", topic: T,
      question: "Kdy podle zákona zbraň „nosíte“?",
      options: [
        "Když ji máte na místě veřejnosti přístupném při sobě nabitou nebo viditelně.",
        "Kdykoli je zbraň mimo trezor.",
        "Jen když ji máte v pouzdře na opasku a je nabitá.",
      ],
      correct: 0,
      explanation: "Nošení je definováno jako mít zbraň na veřejně přístupném místě při sobě nabitou nebo viditelně. Stačí splnit jednu z těchto podmínek.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 15",
    },
    {
      id: "nakladani-x05", topic: T,
      question: "Jdete přes město s nenabitou kulovnicí v neprůhledném pouzdře. Nosíte zbraň?",
      options: [
        "Ano, jakákoli zbraň na veřejnosti se nosí.",
        "Ne, nenabitá dlouhá zbraň v neprůhledném pouzdře se nenosí.",
        "Ano, ale jen pokud máte u sebe i střelivo.",
      ],
      correct: 1,
      explanation: "Zbraň není nabitá ani viditelná, takže nejde o nošení ve smyslu zákona.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 16",
    },
    {
      id: "nakladani-x06", topic: T,
      question: "Jakým způsobem se zbraň v běžném životě nosí?",
      options: [
        "Viditelně, aby okolí vědělo, že jste ozbrojeni.",
        "Je to zcela na rozhodnutí držitele.",
        "Skrytě; viditelně jen při akcích jako lov, sportovní střelba, výcvik nebo kulturní akce.",
      ],
      correct: 2,
      explanation: "Zbraň se obecně nosí skrytě. Viditelné nošení zákon připouští jen u vyjmenovaných typů akcí.",
      source: "§ 81 zákona č. 90/2024 Sb.; soubor MV ot. č. 322–328",
    },
    {
      id: "nakladani-x07", topic: T,
      question: "Kdo smí dohlížet na šestnáctiletého střelce bez zbrojního oprávnění, kterému byla svěřena zbraň R4?",
      options: [
        "Osoba starší 21 let, která je držitelem zbrojního oprávnění déle než 3 roky.",
        "Kterýkoli zletilý držitel zbrojního oprávnění.",
        "Pouze jeho zákonný zástupce, i bez zbrojního oprávnění.",
      ],
      correct: 0,
      explanation: "Dohled nad svěřenou zbraní R2–R4 u osoby mladší 18 let bez ZO smí vykonávat jen osoba starší 21 let s oprávněním drženým déle než 3 roky.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 314–319",
    },
    {
      id: "nakladani-x08", topic: T,
      question: "Podle čeho se určuje, jak musíte zbraně zabezpečit?",
      options: [
        "Podle celkového počtu zbraní, které máte zaregistrované.",
        "Podle počtu zbraní a střeliva, které ukládáte současně na jednom místě.",
        "Podle toho, zda máte obecné, nebo rozšířené zbrojní oprávnění.",
      ],
      correct: 1,
      explanation: "Požadavky na zabezpečení se odvíjejí od počtu současně ukládaných zbraní a střeliva, nikoli od celkového počtu registrovaných zbraní.",
      source: "NV č. 187/2025 Sb.; soubor MV ot. č. 336",
    },
    {
      id: "nakladani-x09", topic: T,
      question: "Při jakém počtu současně uložených zbraní je nutný komorový trezor s elektronickou zabezpečovací signalizací?",
      options: [
        "Při více než 5 zbraních",
        "Při více než 10 zbraních",
        "Při více než 20 zbraních",
      ],
      correct: 2,
      explanation: "Komorový trezor s EZS se vyžaduje až při ukládání více než 20 zbraní. Pro nižší počty platí mírnější požadavky.",
      source: "NV č. 187/2025 Sb.; soubor MV ot. č. 339",
    },
    {
      id: "nakladani-x10", topic: T,
      question: "Kdy je nutné přepravu zbraní nebo střeliva předem ohlásit přes CRZ?",
      options: [
        "Při přepravě více než 100 zbraní nebo 200 000 nábojů, a to nejméně 1 hodinu předem.",
        "Při každém převozu zbraně na střelnici, a to 24 hodin předem.",
        "Při přepravě více než 10 zbraní, a to 3 dny předem.",
      ],
      correct: 0,
      explanation: "Ohlašovací povinnost se týká jen přepravy většího množství – více než 100 zbraní nebo 200 000 nábojů. Hlásí se přes CRZ nejméně hodinu předem.",
      source: "§ 111 zákona č. 90/2024 Sb.; soubor MV ot. č. 385–387",
    },
    {
      id: "nakladani-x11", topic: T,
      question: "Na procházce v lese najdete pistoli. Jak postupujete?",
      options: [
        "Vezmete ji domů a do 10 pracovních dnů nález ohlásíte.",
        "Nález neprodleně oznámíte policii.",
        "Necháte ji ležet, žádnou povinnost nemáte.",
      ],
      correct: 1,
      explanation: "Nález zbraně je třeba oznámit policii neprodleně. Pokud by šlo o vojenský objekt, oznamuje se Vojenské policii.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 389, 390",
    },
    {
      id: "nakladani-x12", topic: T,
      question: "Zjistíte, že vám někdo ukradl kulovnici kategorie R4. Kdy musíte krádež ohlásit Policii ČR?",
      options: [
        "Do 10 pracovních dnů",
        "Do 30 dnů",
        "Neprodleně",
      ],
      correct: 2,
      explanation: "Ztrátu nebo odcizení zbraně podléhající registraci nebo zbraně PO musí každý ohlásit Policii ČR neprodleně.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 58–60",
    },
    {
      id: "nakladani-x13", topic: T,
      question: "Smíte si jako držitel zbrojního oprávnění objednat náboje z e-shopu s doručením kurýrem?",
      options: [
        "Ne, střelivo nelze nabývat na dálku.",
        "Ano, pokud zásilku osobně převezme držitel zbrojního oprávnění.",
        "Ano, zákaz nabývání na dálku se týká jen zbraní, ne střeliva.",
      ],
      correct: 0,
      explanation: "Zákaz nabývání na dálku platí pro zbraně R1–R4, PO, palné zbraně NO i pro střelivo.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 53",
    },
    {
      id: "nakladani-x14", topic: T,
      question: "Bylo vám pozastaveno zbrojní oprávnění. Co musíte udělat se zbraněmi a střelivem?",
      options: [
        "Do 30 dnů je prodat jinému držiteli oprávnění.",
        "Do 10 pracovních dnů je odevzdat KŘP nebo umožnit jejich převzetí či zabezpečení.",
        "Nic, dokud rozhodnutí o pozastavení nenabude právní moci po odvolání.",
      ],
      correct: 1,
      explanation: "Lhůta je 10 pracovních dnů. Odvolání proti pozastavení nemá odkladný účinek, takže nečekáte na jeho výsledek.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 124, 411",
    },
    {
      id: "nakladani-x15", topic: T,
      question: "Jak často KŘP prověřuje, zda držitel stále splňuje podmínky zbrojního oprávnění?",
      options: [
        "Nikdy, oprávnění platí bez omezení.",
        "Jednou ročně",
        "Nejméně jednou za 5 let",
      ],
      correct: 2,
      explanation: "Zbrojní oprávnění sice nemá omezenou platnost, ale KŘP splnění podmínek prověřuje nejméně jednou za 5 let.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 431",
    },
    {
      id: "nakladani-x16", topic: T,
      question: "Jak často vás KŘP vyzve, abyste předložili zbraně, které držíte?",
      options: [
        "Alespoň jednou za 10 let",
        "Každé 2 roky",
        "Pouze při podezření na trestný čin",
      ],
      correct: 0,
      explanation: "Zákon ukládá KŘP vyzvat držitele k předložení zbraní alespoň jednou za 10 let.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 432",
    },
    {
      id: "nakladani-x17", topic: T,
      question: "Kolik bezdýmného prachu smíte podle obecného limitu skladovat?",
      options: [
        "Nejvýše 1 kg",
        "Nejvýše 10 kg",
        "Nejvýše 50 kg",
      ],
      correct: 1,
      explanation: "Obecný limit aktivních komponentů je 10 kg bezdýmného prachu a 3 kg černého prachu.",
      source: "NV č. 187/2025 Sb.; soubor MV ot. č. 606",
    },
    {
      id: "nakladani-x18", topic: T,
      question: "Jak se dozvíte, že vám KŘP vydala zbrojní oprávnění?",
      options: [
        "Přijde vám písemné rozhodnutí doporučeným dopisem.",
        "Dostanete plastovou kartu zbrojního průkazu.",
        "Písemné rozhodnutí se nevyhotovuje, KŘP zapíše oprávnění do CRZ.",
      ],
      correct: 2,
      explanation: "U rozhodnutí, kterým se právo přiznává (vydání ZO, licence, registrace), se písemné rozhodnutí nevyhotovuje. Údaj se jen zapíše do CRZ a prokážete ho např. zbrojním listem.",
      source: "zákon č. 90/2024 Sb.; soubor MV ot. č. 445",
    },
  ],
};
