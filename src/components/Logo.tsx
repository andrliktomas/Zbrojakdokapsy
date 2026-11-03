// Značka „Terč“: terč se zásahem mimo střed – cílem je trefit správnou odpověď, ne dokonalost.

type Tone = "light" | "dark";

const INK = "#15181D";
const PAPER = "#F3F1EC";
const SIGNAL = "#E8590C";

/**
 * Samotný terč. `detail` = verze z archu značky (tenčí kruhy + 4 rysky), vhodná od ~48 px.
 * Bez `detail` jde o silnější variantu pro hlavičku a malé velikosti.
 */
export function LogoMark({
  size = 36,
  detail = false,
  tone = "light",
  title,
  className,
}: {
  size?: number;
  detail?: boolean;
  tone?: Tone;
  title?: string;
  className?: string;
}) {
  const fg = tone === "light" ? INK : PAPER;
  const ground = tone === "light" ? PAPER : INK;
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true };
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" className={className} {...a11y}>
      {detail ? (
        <>
          <circle cx="48" cy="48" r="44" fill="none" stroke={fg} strokeWidth="5" />
          <circle cx="48" cy="48" r="29" fill="none" stroke={fg} strokeWidth="5" />
          <circle cx="48" cy="48" r="14" fill={fg} />
          <line x1="48" y1="0" x2="48" y2="10" stroke={fg} strokeWidth="5" />
          <line x1="48" y1="86" x2="48" y2="96" stroke={fg} strokeWidth="5" />
          <line x1="0" y1="48" x2="10" y2="48" stroke={fg} strokeWidth="5" />
          <line x1="86" y1="48" x2="96" y2="48" stroke={fg} strokeWidth="5" />
          <circle cx="57" cy="40" r="9" fill={SIGNAL} stroke={ground} strokeWidth="3" />
        </>
      ) : (
        <>
          <circle cx="48" cy="48" r="44" fill="none" stroke={fg} strokeWidth="7" />
          <circle cx="48" cy="48" r="27" fill="none" stroke={fg} strokeWidth="7" />
          <circle cx="48" cy="48" r="12" fill={fg} />
          <circle cx="58" cy="38" r="11" fill={SIGNAL} stroke={ground} strokeWidth="4" />
        </>
      )}
    </svg>
  );
}

const SIZES = {
  sm: { mark: 28, word: "text-lg tracking-[-0.03em]", tag: "text-[10px] tracking-[0.18em]" },
  md: { mark: 36, word: "text-[22px] tracking-[-0.03em]", tag: "text-[11px] tracking-[0.18em]" },
  lg: { mark: 72, word: "text-[40px] tracking-[-0.04em]", tag: "text-sm tracking-[0.28em]" },
} as const;

/** Terč + slovní značka „zbroják“ + mono „do kapsy“. */
export function Logo({
  size = "md",
  tone = "light",
  tagline = "always",
}: {
  size?: keyof typeof SIZES;
  tone?: Tone;
  /** Kdy zobrazit „do kapsy“: vždy, nebo až od šířky sm (úspora místa v mobilu). */
  tagline?: "always" | "sm";
}) {
  const s = SIZES[size];
  const stacked = size === "lg";
  return (
    <span className={`inline-flex items-center ${stacked ? "gap-4" : "gap-2.5"}`}>
      <LogoMark size={s.mark} tone={tone} detail={stacked} />
      <span className={`flex ${stacked ? "flex-col gap-1" : "items-baseline gap-2"}`}>
        <span className={`${s.word} leading-none font-black ${tone === "light" ? "text-ink" : "text-paper"}`}>zbroják</span>
        <span
          className={`${s.tag} font-mono leading-none font-semibold whitespace-nowrap uppercase ${tone === "light" ? "text-ocel" : "text-ocel-light"} ${
            tagline === "sm" ? "max-sm:sr-only" : ""
          }`}
        >
          do kapsy
        </span>
      </span>
    </span>
  );
}
