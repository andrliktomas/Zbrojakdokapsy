import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { ARTICLES, articleLinks, articlePlainText, wordCount } from "../content/articles";
import { TOPICS } from "../content";
import sitemap from "../app/sitemap";
import { typo } from "../components/articles/typo";
import {
  articleJsonLd,
  articleListJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  ROBOTS_DISALLOW,
  serializeJsonLd,
  websiteJsonLd,
} from "./seo";

const topicSlugs = new Set(TOPICS.map((t) => t.slug));
const articleSlugs = new Set(ARTICLES.map((a) => a.slug));
/** Kotvy, které šablona článku používá sama (sekce nesmí mít stejné id). */
const RESERVED_IDS = new Set(["shrnuti", "caste-otazky", "zdroje", "souvisejici", "cta"]);

/** Trasy aplikace odvozené ze souborů page.tsx v src/app ([slug] = dynamický segment). */
function appRoutes(): RegExp[] {
  const appDir = join(__dirname, "..", "app");
  const out: RegExp[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === "page.tsx") {
        const route = "/" + relative(appDir, dir).split(sep).filter(Boolean).join("/");
        const pattern = route.replace(/\[[^\]]+\]/g, "[^/]+");
        out.push(new RegExp(`^${pattern === "/" ? "/" : pattern}$`));
      }
    }
  };
  walk(appDir);
  return out;
}

test("slugy článků jsou unikátní a mají tvar URL", () => {
  const slugs = ARTICLES.map((a) => a.slug);
  assert.equal(new Set(slugs).size, slugs.length, `duplicitní slug: ${slugs.join(", ")}`);
  for (const s of slugs) assert.match(s, /^[a-z0-9]+(-[a-z0-9]+)*$/, s);
});

test("články mají povinná pole a rozumné délky", () => {
  for (const a of ARTICLES) {
    for (const key of ["title", "metaTitle", "description", "perex"] as const) {
      assert.ok(a[key].trim().length > 10, `${a.slug}: chybí ${key}`);
    }
    assert.ok(a.metaTitle.length <= 60, `${a.slug}: metaTitle má ${a.metaTitle.length} znaků (max. 60)`);
    assert.ok(a.description.length >= 110 && a.description.length <= 170, `${a.slug}: description má ${a.description.length} znaků`);
    for (const d of [a.publishedAt, a.updatedAt]) {
      assert.match(d, /^\d{4}-\d{2}-\d{2}$/, `${a.slug}: datum ${d}`);
      assert.ok(!Number.isNaN(Date.parse(d)), `${a.slug}: neplatné datum ${d}`);
    }
    assert.ok(a.updatedAt >= a.publishedAt, `${a.slug}: revize před publikací`);
    assert.ok(a.summary.length >= 3 && a.summary.length <= 6, `${a.slug}: shrnutí má mít 3–6 bodů`);
    assert.ok(a.sections.length >= 4, `${a.slug}: málo sekcí`);
    assert.ok(a.faq.length >= 3, `${a.slug}: FAQ má mít alespoň 3 otázky`);
    assert.ok(a.sources.length >= 1, `${a.slug}: chybí zdroje`);
    for (const f of a.faq) assert.ok(f.q.endsWith("?") && f.a.length > 40, `${a.slug}: FAQ „${f.q}“`);
    const ids = a.sections.map((s) => s.id);
    assert.equal(new Set(ids).size, ids.length, `${a.slug}: duplicitní id sekcí`);
    for (const id of ids) {
      assert.match(id, /^[a-z0-9-]+$/, `${a.slug}: id ${id}`);
      assert.ok(!RESERVED_IDS.has(id), `${a.slug}: id ${id} koliduje se šablonou`);
    }
    for (const s of a.sections) assert.ok(s.heading.trim() && s.blocks.length > 0, `${a.slug}: prázdná sekce ${s.id}`);
  }
});

test("rozsah článků je 800–1500 slov", () => {
  for (const a of ARTICLES) {
    const n = wordCount(a);
    assert.ok(n >= 800 && n <= 1500, `${a.slug}: ${n} slov`);
  }
});

test("obsah cituje předpisy, je bez emoji a bez HTML", () => {
  for (const a of ARTICLES) {
    const text = articlePlainText(a);
    assert.ok((text.match(/§/g) ?? []).length >= 5, `${a.slug}: málo odkazů na §`);
    assert.doesNotMatch(text, /\p{Extended_Pictographic}/u, `${a.slug}: obsahuje emoji`);
    assert.doesNotMatch(text, /<\/?[a-z][^>]*>/i, `${a.slug}: obsahuje HTML`);
  }
});

test("okruhy a související články existují", () => {
  for (const a of ARTICLES) {
    assert.ok(a.topics.length > 0, `${a.slug}: bez okruhu`);
    for (const t of a.topics) assert.ok(topicSlugs.has(t), `${a.slug}: neznámý okruh ${t}`);
    assert.ok(a.related.length > 0, `${a.slug}: bez souvisejících článků`);
    assert.equal(new Set(a.related).size, a.related.length, `${a.slug}: duplicitní související`);
    for (const r of a.related) {
      assert.notEqual(r, a.slug, `${a.slug}: odkazuje sám na sebe`);
      assert.ok(articleSlugs.has(r), `${a.slug}: neznámý související článek ${r}`);
    }
    const topicBlocks = a.sections.flatMap((s) => s.blocks).filter((b) => b.type === "topic");
    assert.ok(topicBlocks.length > 0, `${a.slug}: chybí odkaz na okruh v aplikaci`);
  }
});

test("každý interní odkaz vede na existující trasu, okruh nebo článek", () => {
  const routes = appRoutes();
  assert.ok(routes.length > 5, "nenašly se trasy v src/app");
  for (const a of ARTICLES) {
    for (const href of articleLinks(a)) {
      if (/^https:\/\//.test(href)) continue;
      assert.ok(href.startsWith("/"), `${a.slug}: odkaz ${href} není interní ani https`);
      const [path, hash] = href.split("#");
      const pathname = path.split("?")[0];
      assert.ok(routes.some((r) => r.test(pathname)), `${a.slug}: odkaz ${href} nevede na existující stránku`);
      const okruh = pathname.match(/^\/okruhy\/([^/]+)$/)?.[1];
      if (okruh) assert.ok(topicSlugs.has(okruh), `${a.slug}: odkaz na neexistující okruh ${okruh}`);
      const clanek = pathname.match(/^\/clanky\/([^/]+)$/)?.[1];
      if (clanek) {
        assert.ok(articleSlugs.has(clanek), `${a.slug}: odkaz na neexistující článek ${clanek}`);
        if (hash) {
          const target = ARTICLES.find((x) => x.slug === clanek)!;
          assert.ok(target.sections.some((s) => s.id === hash), `${a.slug}: kotva #${hash} v ${clanek} neexistuje`);
        }
      }
    }
  }
});

test("JSON-LD je validní JSON se správnými typy", () => {
  const a = ARTICLES[0];
  const docs = [
    organizationJsonLd(),
    websiteJsonLd(),
    articleListJsonLd(ARTICLES),
    articleJsonLd(a),
    faqJsonLd(a.faq),
    breadcrumbJsonLd([
      { name: "Úvod", path: "/" },
      { name: "Články", path: "/clanky" },
    ]),
  ];
  const types = docs.map((d) => JSON.parse(serializeJsonLd(d))["@type"]);
  assert.deepEqual(types, ["Organization", "WebSite", "CollectionPage", "Article", "FAQPage", "BreadcrumbList"]);
  const faq = JSON.parse(serializeJsonLd(faqJsonLd(a.faq)));
  assert.equal(faq.mainEntity.length, a.faq.length);
  assert.equal(faq.mainEntity[0].acceptedAnswer["@type"], "Answer");
  assert.ok(!serializeJsonLd({ x: "</script>" }).includes("</script>"), "JSON-LD musí escapovat </script>");
});

test("typografie: nezlomitelné mezery u předložek, §, zkratek, dat a jednotek", () => {
  const N = " ";
  assert.equal(typo("zkouška v aplikaci"), `zkouška v${N}aplikaci`);
  assert.equal(typo("a v Praze"), `a${N}v${N}Praze`);
  assert.equal(typo("(§ 26 odst. 1)"), `(§${N}26${N}odst.${N}1)`);
  assert.equal(typo("NV č. 238/2025 Sb."), `NV č.${N}238/2025 Sb.`);
  assert.equal(typo("od 1. 1. 2026"), `od 1.${N}1.${N}2026`);
  assert.equal(typo("3 000 Kč"), `3${N}000${N}Kč`);
  assert.equal(typo("10 s a 25 m"), `10${N}s a${N}25${N}m`);
  assert.equal(typo("Ověřte"), "Ověřte");
});

test("sitemapa obsahuje všechny články a nic z robots disallow", () => {
  const urls = sitemap().map((e) => new URL(e.url).pathname);
  for (const a of ARTICLES) assert.ok(urls.includes(`/clanky/${a.slug}`), `sitemapa: chybí ${a.slug}`);
  assert.ok(urls.includes("/clanky") && urls.includes("/"), "sitemapa: chybí rozcestník nebo úvod");
  for (const u of urls) {
    assert.ok(!ROBOTS_DISALLOW.some((d) => u.startsWith(d)), `sitemapa obsahuje zakázanou cestu ${u}`);
  }
});
