import Link from "next/link";
import type { ArticleBlock, ArticleSection, RichText } from "@/content/articles";
import { TopicCard } from "./TopicCard";
import { typo } from "./typo";

export const LINK_CLASS =
  "font-semibold text-brand-700 underline decoration-accent-400 decoration-2 underline-offset-[3px] hover:decoration-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500";

export function Rich({ text }: { text: RichText }) {
  if (typeof text === "string") return <>{typo(text)}</>;
  return (
    <>
      {text.map((part, i) => {
        if (typeof part === "string") return <span key={i}>{typo(part)}</span>;
        if ("strong" in part) return <strong key={i} className="font-semibold text-stone-900">{typo(part.strong)}</strong>;
        return part.href.startsWith("/") ? (
          <Link key={i} href={part.href} className={LINK_CLASS}>
            {typo(part.text)}
          </Link>
        ) : (
          <a key={i} href={part.href} className={LINK_CLASS} rel="noopener">
            {typo(part.text)}
          </a>
        );
      })}
    </>
  );
}

/**
 * Tabulka: od šířky sm klasická, na telefonu se řádky skládají pod sebe a buňky dostanou popisek ze záhlaví.
 * Explicitní ARIA role zachovávají sémantiku tabulky i při změně display.
 */
function Table({ block, id }: { block: Extract<ArticleBlock, { type: "table" }>; id: string }) {
  const captionId = `${id}-caption`;
  return (
    <figure className="my-6">
      <div
        role="region"
        aria-labelledby={captionId}
        tabIndex={0}
        className="overflow-hidden rounded-xl ring-1 ring-stone-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 sm:overflow-x-auto"
      >
        <table role="table" className="w-full border-collapse text-left text-[0.92em] leading-snug max-sm:block">
          <caption id={captionId} className="bg-stone-100 px-4 py-2.5 text-left font-mono text-xs font-medium uppercase tracking-wide text-stone-600 max-sm:block">
            {typo(block.caption)}
          </caption>
          <thead role="rowgroup" className="bg-stone-50 max-sm:sr-only">
            <tr role="row">
              {block.head.map((h, i) => (
                <th key={i} role="columnheader" scope="col" className="border-b border-stone-200 px-4 py-2.5 font-semibold text-stone-700">
                  {h ? typo(h) : <span className="sr-only">Položka</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody role="rowgroup" className="bg-white max-sm:block">
            {block.rows.map((row, r) => (
              <tr key={r} role="row" className="border-b border-stone-100 align-top last:border-b-0 max-sm:block max-sm:px-4 max-sm:py-3">
                {row.map((cell, c) =>
                  c === 0 ? (
                    <th key={c} role="rowheader" scope="row" className="px-4 py-3 font-semibold text-stone-900 max-sm:block max-sm:p-0 sm:min-w-[7rem]">
                      <Rich text={cell} />
                    </th>
                  ) : (
                    <td
                      key={c}
                      role="cell"
                      data-label={block.head[c] || undefined}
                      className="px-4 py-3 text-stone-700 max-sm:block max-sm:px-0 max-sm:pb-0 max-sm:pt-1.5 max-sm:before:block max-sm:before:font-mono max-sm:before:text-[0.7rem] max-sm:before:uppercase max-sm:before:tracking-wide max-sm:before:text-stone-500 max-sm:before:content-[attr(data-label)] sm:min-w-[9rem]"
                    >
                      <Rich text={cell} />
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

function Block({ block, id }: { block: ArticleBlock; id: string }) {
  switch (block.type) {
    case "p":
      return (
        <p className="my-4">
          <Rich text={block.text} />
        </p>
      );
    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag
          className={`my-4 space-y-2 pl-6 ${block.ordered ? "list-decimal marker:font-mono marker:font-semibold marker:text-brand-700" : "list-disc marker:text-accent-500"}`}
        >
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">
              <Rich text={item} />
            </li>
          ))}
        </ListTag>
      );
    }
    case "steps":
      return (
        <div className="my-6">
          {block.title && <h3 className="mb-3 text-[1.1em] font-bold text-stone-900">{typo(block.title)}</h3>}
          <ol className="space-y-5">
            {block.items.map((step, i) => (
              <li key={i} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3">
                <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-stone-900 font-mono text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="pt-1 font-bold text-stone-900">
                    <span className="sr-only">Krok {i + 1}: </span>
                    {typo(step.title)}
                  </p>
                  <p className="mt-1 text-stone-700">
                    <Rich text={step.text} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      );
    case "table":
      return <Table block={block} id={id} />;
    case "note": {
      const label = block.title ?? (block.tone === "tip" ? "Na co si dát pozor u zkoušky" : "Důležité");
      return (
        <div
          role="note"
          aria-label={label}
          className={`my-6 rounded-r-xl border-l-4 bg-stone-100 px-4 py-3 text-[0.95em] ${block.tone === "tip" ? "border-accent-400" : "border-stone-900"}`}
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-wide text-stone-600">{typo(label)}</p>
          <p className="mt-1 text-stone-800">
            <Rich text={block.text} />
          </p>
        </div>
      );
    }
    case "topic":
      return <TopicCard slug={block.topic} text={block.text} />;
  }
}

export function ArticleSections({ sections }: { sections: ArticleSection[] }) {
  return (
    <>
      {sections.map((s) => (
        <section key={s.id} aria-labelledby={s.id} className="mt-12">
          <h2 id={s.id} className="scroll-mt-24 text-[1.45em] font-extrabold leading-tight tracking-tight text-stone-900">
            {typo(s.heading)}
          </h2>
          {s.blocks.map((b, i) => (
            <Block key={i} block={b} id={`${s.id}-${i}`} />
          ))}
        </section>
      ))}
    </>
  );
}
