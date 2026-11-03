// Střelivo: kulový náboj, brokový náboj (broky / Brenneke), provedení dna nábojnice.
// Vlastní schematické kresby; horní polovina náboje je v řezu, dolní zvenku.

import { ACCENT, INK, TONE, Textured, tint, url, type DrawingProps } from "./primitives";

/* ------------------------------------------------------------------ */
/* Kulový náboj (lahvovitá nábojnice s drážkou), osa y = 120           */
/* ------------------------------------------------------------------ */

const K = {
  caseSection:
    "M52 101 L52 78 L60 78 L60 87 L67 87 L75 78.4 L329 79.7 L353 88.5 L409 88.5 L409 92.7 L351 92.7 L327 85.7 L84 84.5 L84 117 L75 117 L75 101 Z",
  powder: "M84 120 L84 84.5 L327 85.7 L351 92.7 L360 92.7 L360 120 Z",
  flash: "M75 117 L84 117 L84 120 L75 120 Z",
  primer: "M52 120 L52 101 L75 101 L75 120 Z",
  bulletUp: "M360 120 L360 92.7 L437 92.7 C490 92.7 535 108 549 118.6 L549 120 Z",
  coreUp: "M360 120 L360 97.5 L437 97.5 C483 97.5 521 109 537 120 Z",
  caseLow: "M52 120 L52 162 L60 162 L60 153 L67 153 L75 161.6 L329 160.3 L353 151.5 L409 151.5 L409 120 Z",
  bulletLow: "M409 120 L409 147.3 L437 147.3 C490 147.3 535 132 549 121.4 L549 120 Z",
  neckUp: "M353 88.5 L409 88.5 L409 92.7 L351 92.7 Z",
  neckLow: "M353 151.5 L409 151.5 L409 120 L353 120 Z",
  grooveUp: "M60 78 L60 87 L67 87 L75 78.4 Z",
  grooveLow: "M60 162 L60 153 L67 153 L75 161.6 Z",
  outline:
    "M52 78 L60 78 L60 87 L67 87 L75 78.4 L329 79.7 L353 88.5 L409 88.5 L409 92.7 L437 92.7 C490 92.7 535 108 549 118.6 L549 121.4 C535 132 490 147.3 437 147.3 L409 147.3 L409 151.5 L353 151.5 L329 160.3 L75 161.6 L67 153 L60 153 L60 162 L52 162 Z",
};

export function KulovyNaboj({ hl, uid }: DrawingProps) {
  const caseFill = tint(hl, "nabojnice", TONE.brass);
  const bulletFill = tint(hl, "strela", TONE.steel);
  return (
    <g>
      {/* osa */}
      <line x1="36" y1="120" x2="566" y2="120" strokeWidth="1" strokeDasharray="14 4 2 4" strokeOpacity="0.6" />
      {/* horní polovina v řezu */}
      <path d={K.powder} fill={tint(hl, "prach", TONE.white)} stroke="none" />
      <path d={K.powder} fill={url(uid, "powder")} stroke="none" />
      <path d={K.flash} fill={TONE.white} stroke="none" />
      <Textured d={K.caseSection} fill={caseFill} pattern="hatch" uid={uid} />
      <path d={K.primer} fill={tint(hl, "zapalka", TONE.dark)} />
      <path d={K.bulletUp} fill={bulletFill} />
      <path d={K.bulletUp} fill={url(uid, "hatch2")} stroke="none" />
      <path d={K.coreUp} fill={tint(hl, "strela", TONE.lead)} strokeWidth="1.4" />
      {/* dolní polovina zvenku */}
      <path d={K.caseLow} fill={caseFill} stroke="none" />
      <path d={K.bulletLow} fill={bulletFill} stroke="none" />
      <path d="M86 138 L326 139" stroke={TONE.white} strokeWidth="5" strokeOpacity="0.55" />
      <path d="M415 134 L440 134 C470 134 500 130 520 126" fill="none" stroke={TONE.white} strokeWidth="4" strokeOpacity="0.5" />
      {/* zvýraznění krčku a drážky */}
      {hl === "krcek" && <path d={K.neckUp} fill={ACCENT} />}
      {hl === "krcek" && <path d={K.neckLow} fill={ACCENT} stroke="none" />}
      {hl === "drazka" && <path d={K.grooveUp} fill={ACCENT} stroke="none" />}
      {hl === "drazka" && <path d={K.grooveLow} fill={ACCENT} stroke="none" />}
      {/* obrysy */}
      <path d="M329 160.3 L329 120 M353 151.5 L353 120 M60 153 L60 120 M75 161.6 L75 120" fill="none" strokeWidth="1" strokeOpacity="0.45" />
      <path d="M409 120 L409 151.5" fill="none" strokeWidth="1.6" />
      <path d={K.outline} fill="none" strokeWidth="2.2" />
      <line x1="52" y1="120" x2="409" y2="120" strokeWidth="1.4" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Brokový náboj, osa y = 140                                          */
/* ------------------------------------------------------------------ */

const B = {
  brassUp: "M70 114 L70 66 L80 66 L80 71 L152 71 L152 74.5 L84 74.5 L84 118 L76 118 L76 114 Z",
  baseWad: "M84 74.5 L148 74.5 L148 137 L112 137 L112 118 L84 118 Z",
  primer: "M70 140 L70 114 L76 114 L76 118 L112 118 L112 140 Z",
  flash: "M112 137 L148 137 L148 140 L112 140 Z",
  powder: "M148 140 L148 79.5 L206 79.5 L206 140 Z",
  shotWad: "M206 140 L206 79.5 L268 79.5 L268 140 Z",
  slugWad: "M206 140 L206 79.5 L330 79.5 L330 140 Z",
  hullStar:
    "M148 74.5 L152 74.5 L152 73 L486 73 C494 73 501 80 502 92 L502 132 L496 132 L496 95 C495 86 490 79.5 484 79.5 L148 79.5 Z",
  hullRoll:
    "M148 74.5 L152 74.5 L152 73 L486 73 C497 73 503 84 503 97 C503 106 498 111 491 110 L491 104 C495 104 497 101 497 97 C496 86 490 79.5 484 79.5 L148 79.5 Z",
  shotClip: "M268 140 L268 79.5 L484 79.5 C490 79.5 495 86 496 95 L496 140 Z",
  slug: "M330 140 L330 80 L446 80 C472 80 488 100 490 140 Z",
  brassLow: "M70 140 L70 214 L80 214 L80 209 L152 209 L152 140 Z",
  hullLow: "M152 140 L152 207 L486 207 C494 207 501 200 502 188 L502 140 Z",
  outlineStar:
    "M70 66 L80 66 L80 71 L152 71 L152 73 L486 73 C494 73 501 80 502 92 L502 188 C501 200 494 207 486 207 L152 207 L152 209 L80 209 L80 214 L70 214 Z",
  outlineRoll:
    "M70 66 L80 66 L80 71 L152 71 L152 73 L486 73 C497 73 503 84 503 97 L503 183 C503 196 497 207 486 207 L152 207 L152 209 L80 209 L80 214 L70 214 Z",
};

function shotPellets() {
  const out: { x: number; y: number }[] = [];
  const r = 8;
  const dy = 13.9;
  for (let row = 0; row < 5; row++) {
    const y = 79.5 + r + 0.5 + row * dy;
    const off = row % 2 ? r : 0;
    for (let x = 268 + r + 1 + off; x < 500; x += 2 * r) out.push({ x, y });
  }
  return out;
}
const PELLETS = shotPellets();

export function BrokovyNaboj({ hl, uid, load = "broky" }: DrawingProps & { load?: "broky" | "brenneke" }) {
  const slug = load === "brenneke";
  const hull = tint(hl, "nabojnice", TONE.white);
  const brass = tint(hl, "kovani", TONE.brass);
  return (
    <g>
      <line x1="56" y1="140" x2="530" y2="140" strokeWidth="1" strokeDasharray="14 4 2 4" strokeOpacity="0.6" />
      {/* horní polovina v řezu */}
      <path d={B.powder} fill={tint(hl, "prach", TONE.white)} stroke="none" />
      <path d={B.powder} fill={url(uid, "powder")} />
      <path d={B.flash} fill={TONE.white} stroke="none" />
      <Textured d={slug ? B.slugWad : B.shotWad} fill={tint(hl, "ucpavka", TONE.felt)} pattern="fiber" uid={uid} />
      {slug ? (
        <g>
          <Textured d={B.slug} fill={tint(hl, "brenneke", TONE.lead)} pattern="hatch2" uid={uid} />
          {[344, 370, 396, 422].map((x) => (
            <path key={x} d={`M${x} 80 L${x + 10} 80 L${x + 2} 92 Z`} fill={TONE.white} strokeWidth="1.4" />
          ))}
        </g>
      ) : (
        <g>
          <clipPath id={`${uid}-shot`}>
            <path d={B.shotClip} />
          </clipPath>
          <path d={B.shotClip} fill={TONE.white} stroke="none" />
          <g clipPath={`url(#${uid}-shot)`}>
            {PELLETS.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="7.2" fill={tint(hl, "broky", TONE.lead)} strokeWidth="1.3" />
            ))}
          </g>
        </g>
      )}
      <Textured d={slug ? B.hullRoll : B.hullStar} fill={hull} pattern="hatch2" uid={uid} />
      <Textured d={B.baseWad} fill={hull} pattern="hatch2" uid={uid} />
      <Textured d={B.brassUp} fill={brass} pattern="hatch" uid={uid} />
      <path d={B.primer} fill={tint(hl, "zapalka", TONE.dark)} />
      {/* dolní polovina zvenku */}
      <path d={B.hullLow} fill={hull} stroke="none" />
      <path d={B.brassLow} fill={brass} stroke="none" />
      <path d="M80 140 L80 209 M140 140 L140 209" fill="none" strokeWidth="1.2" strokeOpacity="0.5" />
      <path d="M160 190 L480 190" stroke={INK} strokeWidth="1" strokeOpacity="0.12" />
      <text x="330" y="177" textAnchor="middle" fontSize="15" fontWeight="600" fill={hl === "nabojnice" ? TONE.white : INK} fillOpacity="0.55" stroke="none" letterSpacing="1">
        12/70
      </text>
      {/* obrysy */}
      <path d={slug ? B.outlineRoll : B.outlineStar} fill="none" strokeWidth="2.2" />
      <line x1="70" y1="140" x2="503" y2="140" strokeWidth="1.4" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Provedení dna nábojnice (tři zvětšené zadní části nábojnic)          */
/* ------------------------------------------------------------------ */

const TOP = 40;
const BASE = 226;
const W = 58; // poloviční průměr těla

function zigTop(cx: number) {
  return `L${cx + W} ${TOP} L${cx + 28} ${TOP - 8} L${cx + 6} ${TOP + 6} L${cx - 20} ${TOP - 7} L${cx - W} ${TOP}`;
}

function casePath(kind: "okraj" | "polookraj" | "drazka", cx: number) {
  if (kind === "okraj") {
    // okraj výrazně přesahuje průměr těla
    return `M${cx - 76} ${BASE} L${cx + 76} ${BASE} L${cx + 76} 211 Q${cx + 76} 208 ${cx + 73} 208 L${cx + W} 208 L${cx + W} ${TOP} ${zigTop(cx)} L${cx - W} 208 L${cx - 73} 208 Q${cx - 76} 208 ${cx - 76} 211 Z`;
  }
  if (kind === "polookraj") {
    // drážka a okraj jen mírně přesahující tělo
    return `M${cx - 66} ${BASE} L${cx + 66} ${BASE} L${cx + 66} 210 L${cx + 46} 210 L${cx + 46} 200 L${cx + W} 188 L${cx + W} ${TOP} ${zigTop(cx)} L${cx - W} 188 L${cx - 46} 200 L${cx - 46} 210 L${cx - 66} 210 Z`;
  }
  // drážka, dno stejného průměru jako tělo
  return `M${cx - 54} ${BASE} L${cx + 54} ${BASE} L${cx + W} 222 L${cx + W} 210 L${cx + 46} 210 L${cx + 46} 200 L${cx + W} 188 L${cx + W} ${TOP} ${zigTop(cx)} L${cx - W} 188 L${cx - 46} 200 L${cx - 46} 210 L${cx - W} 210 L${cx - W} 222 Z`;
}

const CASES = [
  { kind: "okraj", cx: 110 },
  { kind: "polookraj", cx: 300 },
  { kind: "drazka", cx: 490 },
] as const;

export function DnaNabojnic({ hl }: DrawingProps) {
  return (
    <g>
      <line x1="16" y1={BASE} x2="584" y2={BASE} strokeWidth="1" strokeOpacity="0.35" />
      {CASES.map(({ kind, cx }) => (
        <g key={kind}>
          <path d={casePath(kind, cx)} fill={tint(hl, kind, TONE.brass)} strokeWidth="2.2" />
          <path d={`M${cx - 36} 66 L${cx - 36} 176`} stroke={TONE.white} strokeWidth="8" strokeOpacity="0.55" />
          <path d={`M${cx - W} 170 L${cx - W} 244 M${cx + W} 170 L${cx + W} 244`} strokeWidth="1.3" strokeDasharray="5 4" strokeOpacity="0.75" />
        </g>
      ))}
    </g>
  );
}
