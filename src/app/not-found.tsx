import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl space-y-4 py-10">
      <p className="eyebrow">Chyba 404</p>
      <h1 className="text-3xl font-black tracking-tight text-ink">Tahle stránka vedle</h1>
      <p className="text-ocel">Stránku jsme nenašli. Možná byla přesunuta, nebo je v adrese překlep.</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">Na úvodní stránku</Link>
        <Link href="/okruhy" className="btn-secondary">Přehled okruhů</Link>
      </div>
    </div>
  );
}
