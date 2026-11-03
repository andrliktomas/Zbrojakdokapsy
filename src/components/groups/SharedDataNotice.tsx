/** Co přesně instruktor ve skupině vidí – stejný text při připojení i v přehledu skupin. */
export const SHARED_DATA = [
  "jméno a e-mail",
  "body XP a počet zodpovězených otázek",
  "úspěšnost v jednotlivých částech zkoušky (právo, nauka o zbraních, bezpečné zacházení, zdravověda)",
  "počet přečtených lekcí a zopakovaných kartiček",
  "nejlepší výsledek testu nanečisto a zda by vyšel",
  "datum poslední aktivity",
];

export const NOT_SHARED = "Instruktor nevidí vaše heslo, platby ani odpovědi na jednotlivé otázky.";

export function SharedDataNotice({ instructorName, id }: { instructorName: string; id?: string }) {
  return (
    <div id={id} className="rounded-xl bg-amber-50 p-4 text-sm ring-1 ring-amber-200">
      <p className="font-semibold text-stone-900">Instruktor {instructorName} uvidí:</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-stone-700">
        {SHARED_DATA.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <p className="mt-2 text-stone-700">{NOT_SHARED} Ze skupiny můžete kdykoli odejít v sekci Moje skupiny – instruktor tím váš pokrok přestane vidět.</p>
    </div>
  );
}
